import { NextRequest, NextResponse } from "next/server";
import { stripe, PLAN_NAMES, getPlanFromPriceId } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { sendWelcomeEmail, sendPaymentConfirmationEmail } from "@/lib/resend";
import { markReferralPurchasedForPayment } from "@/lib/affiliate-credit";
import { SubscriptionStatus } from "@prisma/client";
import { processPaymentSucceeded, recordStripePayment } from "@/lib/stripe-webhook-payment";
import { applySubscriptionWebhookEvent } from "@/lib/stripe-subscription-webhook";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ message: "Nav paraksta" }, { status: 400 });
  }

  let event: any;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("[WEBHOOK_SIGNATURE_ERROR]", err);
    return NextResponse.json({ message: "Paraksts nav derīgs" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const sub = event.data.object as any;
        await handleSubscriptionChange(event, sub);
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as any;
        await handleSubscriptionDeletion(event, sub);
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as any;
        await handlePaymentSucceeded(invoice);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as any;
        if (invoice.subscription) {
          await prisma.subscription.updateMany({
            where: { stripeSubscriptionId: invoice.subscription as string },
            data: { status: SubscriptionStatus.PAST_DUE },
          });
        }
        await recordPayment(invoice, "FAILED");
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[WEBHOOK_HANDLER_ERROR]", err);
    return NextResponse.json({ message: "Apstrādes kļūda" }, { status: 500 });
  }
}

export async function fetchCanonicalSubscriptionSnapshot(subscriptionId: string, fallback: any) {
  try {
    return await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ["items.data.price"],
    });
  } catch (error) {
    console.warn("[STRIPE_SUBSCRIPTION_RETRIEVE_FAILED]", { subscriptionId, error });
    return fallback;
  }
}

async function handleSubscriptionChange(event: any, sub: any) {
  const canonicalSubscription = await fetchCanonicalSubscriptionSnapshot(sub.id, sub);

  await applySubscriptionWebhookEvent(
    {
      eventId: event.id,
      eventCreated: event.created,
      eventType: event.type,
      subscription: canonicalSubscription,
    },
    {
      prisma,
      getPlanFromPriceId,
    }
  );
}

async function handleSubscriptionDeletion(event: any, sub: any) {
  const canonicalSubscription = await fetchCanonicalSubscriptionSnapshot(sub.id, sub);

  await applySubscriptionWebhookEvent(
    {
      eventId: event.id,
      eventCreated: event.created,
      eventType: event.type,
      subscription: canonicalSubscription,
    },
    {
      prisma,
      getPlanFromPriceId,
    }
  );
}

async function handlePaymentSucceeded(invoice: any) {
  await processPaymentSucceeded(invoice, {
    recordPayment: async (currentInvoice) => recordPayment(currentInvoice, "PAID"),
    sendWelcomeEmail,
    sendPaymentConfirmationEmail,
    markReferralPurchased: markReferralPurchasedForPayment,
    logError: (label, err) => console.error(label, err),
  });
}

async function recordPayment(invoice: any, status: "PAID" | "FAILED") {
  return recordStripePayment(invoice, status, {
    deps: {
      findUserByStripeCustomerId: async (customerId: string) => {
        const user = await prisma.user.findUnique({
          where: { stripeCustomerId: customerId },
          include: { subscription: true },
        });
        if (!user) return null;
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          subscriptionPlan: user.subscription?.plan ?? null,
        };
      },
      createPayment: (data) => prisma.payment.create({ data }),
      promotePaymentToPaid: ({ providerPaymentId, amount, invoiceUrl }) =>
        prisma.payment.updateMany({
          where: { providerPaymentId, status: { not: "PAID" } },
          data: { status: "PAID", amount, paidAt: new Date(), invoiceUrl },
        }),
      updatePaymentByProviderPaymentId: async ({
        providerPaymentId,
        status: currentStatus,
        amount,
        invoiceUrl,
      }) => {
        if (currentStatus === "FAILED") {
          const failedUpdate = await prisma.payment.updateMany({
            where: { providerPaymentId, status: { not: "PAID" } },
            data: { status: "FAILED", amount, invoiceUrl },
          });
          const existing = await prisma.payment.findUnique({
            where: { providerPaymentId },
            select: { id: true },
          });
          if (!existing) throw new Error("Payment nav atrasts pēc FAILED update");
          return existing;
        }

        return prisma.payment.update({
          where: { providerPaymentId },
          data: { status: currentStatus, amount, invoiceUrl },
        });
      },
      findPaymentByProviderPaymentId: (providerPaymentId) =>
        prisma.payment.findUnique({
          where: { providerPaymentId },
          select: { id: true },
        }),
      isUniqueConstraintError: (err: unknown) => (err as any)?.code === "P2002",
    },
    getPlanFromPriceId,
    planNames: PLAN_NAMES,
  });
}
