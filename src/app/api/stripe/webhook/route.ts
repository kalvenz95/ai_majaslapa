import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe, PLAN_NAMES, getPlanFromPriceId } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { sendWelcomeEmail, sendPaymentConfirmationEmail } from "@/lib/resend";
import { SubscriptionStatus, Plan } from "@prisma/client";

// Stripe prasa raw body — NextJS App Router automātiski neparsē
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
        await handleSubscriptionChange(sub);
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as any;
        await prisma.subscription.updateMany({
          where: { stripeSubscriptionId: sub.id },
          data: { status: SubscriptionStatus.CANCELED },
        });
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

async function handleSubscriptionChange(sub: any) {
  const clerkId = sub.metadata?.clerkId;
  if (!clerkId) return;

  const priceId = sub.items.data[0]?.price.id;
  const plan = getPlanFromPriceId(priceId);
  if (!plan) return;

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) return;

  const statusMap: Record<string, SubscriptionStatus> = {
    active: SubscriptionStatus.ACTIVE,
    trialing: SubscriptionStatus.TRIALING,
    canceled: SubscriptionStatus.CANCELED,
    past_due: SubscriptionStatus.PAST_DUE,
    incomplete: SubscriptionStatus.INCOMPLETE,
  };

  await prisma.subscription.upsert({
    where: { userId: user.id },
    create: {
      userId: user.id,
      plan,
      status: statusMap[sub.status] ?? SubscriptionStatus.INCOMPLETE,
      stripeSubscriptionId: sub.id,
      stripePriceId: priceId,
      currentPeriodStart: new Date(sub.current_period_start * 1000),
      currentPeriodEnd: new Date(sub.current_period_end * 1000),
      cancelAtPeriodEnd: sub.cancel_at_period_end,
    },
    update: {
      plan,
      status: statusMap[sub.status] ?? SubscriptionStatus.INCOMPLETE,
      stripePriceId: priceId,
      currentPeriodStart: new Date(sub.current_period_start * 1000),
      currentPeriodEnd: new Date(sub.current_period_end * 1000),
      cancelAtPeriodEnd: sub.cancel_at_period_end,
    },
  });
}

async function handlePaymentSucceeded(invoice: any) {
  // Ieraksta KATRU veiksmīgu maksājumu (arī atjaunošanas) admin vēsturei
  await recordPayment(invoice, "PAID");

  const customerId = invoice.customer as string;
  const user = await prisma.user.findUnique({
    where: { stripeCustomerId: customerId },
    include: { subscription: true },
  });
  if (!user || !user.email) return;

  const isFirstPayment = invoice.billing_reason === "subscription_create";
  if (isFirstPayment) {
    await sendWelcomeEmail(user.email, user.name ?? "");
  }

  const plan = user.subscription?.plan;
  if (plan) {
    await sendPaymentConfirmationEmail(
      user.email,
      user.name ?? "",
      PLAN_NAMES[plan],
      (invoice.amount_paid ?? 0) / 100,
      invoice.hosted_invoice_url ?? undefined
    );
  }
}

/** Saglabā maksājuma ierakstu Payment tabulā (admin maksājumu vēsturei). */
async function recordPayment(invoice: any, status: "PAID" | "FAILED") {
  const customerId = invoice.customer as string | undefined;
  if (!customerId) return;

  const user = await prisma.user.findUnique({
    where: { stripeCustomerId: customerId },
    include: { subscription: true },
  });
  if (!user) return;

  const priceId = invoice.lines?.data?.[0]?.price?.id as string | undefined;
  const plan =
    (priceId ? getPlanFromPriceId(priceId) : null) ?? user.subscription?.plan ?? null;
  const amount =
    status === "PAID"
      ? invoice.amount_paid ?? invoice.amount_due ?? 0
      : invoice.amount_due ?? 0;
  const providerPaymentId = (invoice.id as string) ?? null;

  // Idempotents — atkārtoti webhook'i neveido dublikātus
  if (providerPaymentId) {
    const existing = await prisma.payment.findUnique({
      where: { providerPaymentId },
    });
    if (existing) {
      await prisma.payment.update({
        where: { providerPaymentId },
        data: {
          status,
          amount,
          paidAt: status === "PAID" ? new Date() : existing.paidAt,
          invoiceUrl: invoice.hosted_invoice_url ?? existing.invoiceUrl,
        },
      });
      return;
    }
  }

  await prisma.payment.create({
    data: {
      userId: user.id,
      amount,
      currency: invoice.currency ?? "eur",
      plan,
      status,
      provider: "stripe",
      providerPaymentId,
      invoiceUrl: invoice.hosted_invoice_url ?? null,
      paidAt: status === "PAID" ? new Date() : null,
    },
  });
}
