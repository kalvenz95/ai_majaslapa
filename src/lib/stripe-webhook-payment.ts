import type { Plan } from "@prisma/client";

export type PaymentWebhookContext = {
  paymentId: string;
  isNewPayment: boolean;
  userId: string;
  userEmail: string | null;
  userName: string | null;
  plan: Plan | null;
  planLabel: string | null;
  amountPaidCents: number;
  invoiceUrl?: string;
  isFirstPayment: boolean;
  shouldSendPaidNotifications: boolean;
};

type PaymentWebhookDeps = {
  recordPayment: (invoice: unknown) => Promise<PaymentWebhookContext | null>;
  sendWelcomeEmail: (to: string, name: string) => Promise<unknown>;
  sendPaymentConfirmationEmail: (
    to: string,
    name: string,
    planName: string,
    amount: number,
    invoiceUrl?: string
  ) => Promise<unknown>;
  markReferralPurchased: (
    referredUserId: string,
    paymentId: string,
    amountCents: number,
    plan: Plan | null
  ) => Promise<unknown>;
  logError: (label: string, err: unknown) => void;
};

export async function recordStripePayment(
  invoice: any,
  status: "PAID" | "FAILED",
  opts: {
    deps: {
      findUserByStripeCustomerId: (customerId: string) => Promise<{
        id: string;
        email: string | null;
        name: string | null;
        subscriptionPlan: Plan | null;
      } | null>;
      createPayment: (data: {
        userId: string;
        amount: number;
        currency: string;
        plan: Plan | null;
        status: "PAID" | "FAILED";
        provider: string;
        providerPaymentId: string | null;
        invoiceUrl: string | null;
        paidAt: Date | null;
      }) => Promise<{ id: string }>;
      promotePaymentToPaid: (args: {
        providerPaymentId: string;
        amount: number;
        invoiceUrl?: string;
      }) => Promise<{ count: number }>;
      updatePaymentByProviderPaymentId: (args: {
        providerPaymentId: string;
        status: "PAID" | "FAILED";
        amount: number;
        invoiceUrl?: string;
      }) => Promise<{ id: string }>;
      findPaymentByProviderPaymentId: (
        providerPaymentId: string
      ) => Promise<{ id: string } | null>;
      isUniqueConstraintError: (err: unknown) => boolean;
    };
    getPlanFromPriceId: (priceId?: string) => Plan | null;
    planNames: Record<Plan, string>;
  }
): Promise<PaymentWebhookContext | null> {
  const customerId = invoice.customer as string | undefined;
  if (!customerId) return null;

  const user = await opts.deps.findUserByStripeCustomerId(customerId);
  if (!user) return null;

  const priceId = invoice.lines?.data?.[0]?.price?.id as string | undefined;
  const plan =
    (priceId ? opts.getPlanFromPriceId(priceId) : null) ?? user.subscriptionPlan ?? null;
  const amount =
    status === "PAID"
      ? invoice.amount_paid ?? invoice.amount_due ?? 0
      : invoice.amount_due ?? 0;
  const providerPaymentId = (invoice.id as string | undefined) ?? null;

  if (status === "PAID" && !providerPaymentId) {
    throw new Error("Stripe invoice.id ir obligāts successful payment idempotencei");
  }

  let isNewPayment = false;
  let shouldSendPaidNotifications = false;
  let paymentId: string;

  if (providerPaymentId) {
    try {
      const created = await opts.deps.createPayment({
        userId: user.id,
        amount,
        currency: invoice.currency ?? "eur",
        plan,
        status,
        provider: "stripe",
        providerPaymentId,
        invoiceUrl: invoice.hosted_invoice_url ?? null,
        paidAt: status === "PAID" ? new Date() : null,
      });
      isNewPayment = true;
      shouldSendPaidNotifications = status === "PAID";
      paymentId = created.id;
    } catch (err) {
      if (!opts.deps.isUniqueConstraintError(err)) throw err;

      if (status === "PAID") {
        const promoted = await opts.deps.promotePaymentToPaid({
          providerPaymentId,
          amount,
          invoiceUrl: invoice.hosted_invoice_url ?? undefined,
        });

        if (promoted.count > 0) {
          const promotedPayment = await opts.deps.findPaymentByProviderPaymentId(providerPaymentId);
          if (!promotedPayment) throw new Error("Payment not found after promote");
          shouldSendPaidNotifications = true;
          paymentId = promotedPayment.id;
        } else {
          const existing = await opts.deps.updatePaymentByProviderPaymentId({
            providerPaymentId,
            status,
            amount,
            invoiceUrl: invoice.hosted_invoice_url ?? undefined,
          });
          paymentId = existing.id;
        }
      } else {
        const existing = await opts.deps.updatePaymentByProviderPaymentId({
          providerPaymentId,
          status,
          amount,
          invoiceUrl: invoice.hosted_invoice_url ?? undefined,
        });
        paymentId = existing.id;
      }
    }
  } else {
    const created = await opts.deps.createPayment({
      userId: user.id,
      amount,
      currency: invoice.currency ?? "eur",
      plan,
      status,
      provider: "stripe",
      providerPaymentId,
      invoiceUrl: invoice.hosted_invoice_url ?? null,
      paidAt: status === "PAID" ? new Date() : null,
    });
    isNewPayment = true;
    shouldSendPaidNotifications = status === "PAID";
    paymentId = created.id;
  }

  return {
    paymentId,
    isNewPayment,
    userId: user.id,
    userEmail: user.email,
    userName: user.name,
    plan,
    planLabel: plan ? opts.planNames[plan] : null,
    amountPaidCents: status === "PAID" ? amount : 0,
    invoiceUrl: invoice.hosted_invoice_url ?? undefined,
    isFirstPayment: invoice.billing_reason === "subscription_create",
    shouldSendPaidNotifications,
  };
}

export async function processPaymentSucceeded(
  invoice: unknown,
  deps: PaymentWebhookDeps
) {
  const ctx = await deps.recordPayment(invoice);
  if (!ctx) return { processed: false as const, reason: "NO_USER" as const };

  if (ctx.shouldSendPaidNotifications && ctx.userEmail) {
    if (ctx.isFirstPayment) {
      await deps
        .sendWelcomeEmail(ctx.userEmail, ctx.userName ?? "")
        .catch((err) => deps.logError("[EMAIL_WELCOME]", err));
    }

    if (ctx.plan && ctx.planLabel) {
      await deps
        .sendPaymentConfirmationEmail(
          ctx.userEmail,
          ctx.userName ?? "",
          ctx.planLabel,
          ctx.amountPaidCents / 100,
          ctx.invoiceUrl
        )
        .catch((err) => deps.logError("[EMAIL_PAYMENT]", err));
    }
  }

  const affiliateResult = await deps
    .markReferralPurchased(ctx.userId, ctx.paymentId, ctx.amountPaidCents, ctx.plan)
    .catch((err) => {
      deps.logError("[AFFILIATE_PURCHASE]", err);
      throw err;
    });

  if (!ctx.isNewPayment) {
    return {
      processed: true as const,
      reason: "DUPLICATE_PAYMENT" as const,
      affiliateResult,
    };
  }
  return { processed: true as const, reason: "NEW_PAYMENT" as const, affiliateResult };
}
