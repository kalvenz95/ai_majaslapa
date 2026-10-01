
import test from "node:test";
import assert from "node:assert/strict";
import { PrismaClient, type Plan } from "@prisma/client";
import {
  processPaymentSucceeded,
  recordStripePayment,
  type PaymentWebhookContext,
} from "../src/lib/stripe-webhook-payment.ts";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  test("DATABASE_URL nav iestatits integracijas testam", { skip: true }, () => {});
} else {
  const prisma = new PrismaClient({ datasources: { db: { url: databaseUrl } } });

  const planNames: Record<Plan, string> = {
    PAMATI: "Pamati",
    IZAUGSME: "Izaugsme",
    MEISTARS: "Meistars",
  };

  async function resetData() {
    await prisma.referralPaymentCredit.deleteMany();
    await prisma.payment.deleteMany();
    await prisma.referral.deleteMany();
    await prisma.affiliate.deleteMany();
    await prisma.user.deleteMany();
  }

  async function seedReferral(params: {
    affiliateClerkId: string;
    affiliateEmail: string;
    affiliateCode: string;
    referredClerkId: string;
    referredEmail: string;
    referredStripeCustomerId: string;
  }) {
    const affiliateOwner = await prisma.user.create({
      data: {
        clerkId: params.affiliateClerkId,
        email: params.affiliateEmail,
        name: "Affiliate Owner",
      },
    });

    const affiliate = await prisma.affiliate.create({
      data: {
        userId: affiliateOwner.id,
        code: params.affiliateCode,
      },
    });

    const referredUser = await prisma.user.create({
      data: {
        clerkId: params.referredClerkId,
        email: params.referredEmail,
        name: "Referred User",
        stripeCustomerId: params.referredStripeCustomerId,
      },
    });

    const referral = await prisma.referral.create({
      data: {
        affiliateId: affiliate.id,
        referredUserId: referredUser.id,
      },
    });

    return { referredUser, referral };
  }

  function createProcessDeps(opts?: { failFirstAffiliateAttempt?: boolean }) {
    let affiliateAttempts = 0;
    let welcomeEmails = 0;
    let paymentEmails = 0;

    return {
      deps: {
        recordPayment: async (invoice: unknown): Promise<PaymentWebhookContext | null> =>
          recordStripePayment(invoice as any, "PAID", {
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
              updatePaymentByProviderPaymentId: async ({ providerPaymentId, status, amount, invoiceUrl }) => {
                if (status === "FAILED") {
                  await prisma.payment.updateMany({
                    where: { providerPaymentId, status: { not: "PAID" } },
                    data: { status: "FAILED", amount, invoiceUrl },
                  });
                  const existing = await prisma.payment.findUnique({
                    where: { providerPaymentId },
                    select: { id: true },
                  });
                  if (!existing) throw new Error("Payment nav atrasts pec FAILED update");
                  return existing;
                }

                return prisma.payment.update({
                  where: { providerPaymentId },
                  data: { status, amount, invoiceUrl },
                });
              },
              findPaymentByProviderPaymentId: (providerPaymentId) =>
                prisma.payment.findUnique({ where: { providerPaymentId }, select: { id: true } }),
              isUniqueConstraintError: (err: unknown) => (err as any)?.code === "P2002",
            },
            getPlanFromPriceId: () => "PAMATI",
            planNames,
          }),
        sendWelcomeEmail: async () => {
          welcomeEmails++;
        },
        sendPaymentConfirmationEmail: async () => {
          paymentEmails++;
        },
        markReferralPurchased: async (referredUserId: string, paymentId: string, amountCents: number, plan: Plan | null) => {
          affiliateAttempts++;
          if (opts?.failFirstAffiliateAttempt && affiliateAttempts === 1) {
            throw new Error("simulated affiliate failure");
          }

          return prisma.$transaction(async (tx) => {
            const referral = await tx.referral.findUnique({ where: { referredUserId } });
            if (!referral) {
              return { credited: false as const, reason: "NO_REFERRAL" as const };
            }

            const insertedRows = await tx.$executeRaw`
              INSERT INTO "ReferralPaymentCredit" ("paymentId", "referralId", "amountCents", "plan")
              VALUES (${paymentId}, ${referral.id}, ${amountCents}, ${plan}::"Plan")
              ON CONFLICT ("paymentId") DO NOTHING
            `;

            if (insertedRows === 0) {
              return { credited: false as const, reason: "ALREADY_CREDITED" as const };
            }

            await tx.referral.update({
              where: { referredUserId },
              data: {
                status: "PURCHASED",
                amountCents: { increment: amountCents },
                plan: plan ?? referral.plan,
                purchasedAt: referral.purchasedAt ?? new Date(),
              },
            });

            return { credited: true as const, reason: "CREDITED" as const };
          });
        },
        logError: () => {},
      },
      counters: {
        affiliateAttempts: () => affiliateAttempts,
        welcomeEmails: () => welcomeEmails,
        paymentEmails: () => paymentEmails,
      },
    };
  }

  const baseInvoice = {
    customer: "cus_referred_1",
    amount_paid: 5900,
    amount_due: 5900,
    currency: "eur",
    lines: { data: [{ price: { id: "price_1" } }] },
  };

  test.before(async () => {
    await prisma.$connect();
  });

  test.after(async () => {
    await prisma.$disconnect();
  });

  test("konkurentas dublikata piegades kredite vienreiz", async () => {
    await resetData();
    const { referredUser } = await seedReferral({
      affiliateClerkId: "clerk_aff_1",
      affiliateEmail: "aff1@example.test",
      affiliateCode: "AFF001",
      referredClerkId: "clerk_ref_1",
      referredEmail: "ref1@example.test",
      referredStripeCustomerId: "cus_referred_1",
    });

    const { deps, counters } = createProcessDeps();
    const invoice = { ...baseInvoice, id: "in_same_concurrent", billing_reason: "subscription_create" };

    await Promise.all([processPaymentSucceeded(invoice, deps), processPaymentSucceeded(invoice, deps)]);

    const paymentRows = await prisma.payment.count({ where: { providerPaymentId: "in_same_concurrent" } });
    const ledgerRows = await prisma.referralPaymentCredit.count();
    const referral = await prisma.referral.findUnique({ where: { referredUserId: referredUser.id } });

    assert.equal(paymentRows, 1);
    assert.equal(ledgerRows, 1);
    assert.equal(referral?.amountCents, 5900);
    assert.equal(counters.affiliateAttempts(), 2);
    assert.equal(counters.welcomeEmails(), 1);
    assert.equal(counters.paymentEmails(), 1);
  });

  test("atškirigi invoice id veido atseviškus kreditus", async () => {
    await resetData();
    const { referredUser } = await seedReferral({
      affiliateClerkId: "clerk_aff_2",
      affiliateEmail: "aff2@example.test",
      affiliateCode: "AFF002",
      referredClerkId: "clerk_ref_2",
      referredEmail: "ref2@example.test",
      referredStripeCustomerId: "cus_referred_1",
    });

    const { deps } = createProcessDeps();

    await processPaymentSucceeded({ ...baseInvoice, id: "in_distinct_1" }, deps);
    await processPaymentSucceeded({ ...baseInvoice, id: "in_distinct_2" }, deps);

    const paymentRows = await prisma.payment.count({
      where: { providerPaymentId: { in: ["in_distinct_1", "in_distinct_2"] } },
    });
    const ledgerRows = await prisma.referralPaymentCredit.count();
    const referral = await prisma.referral.findUnique({ where: { referredUserId: referredUser.id } });

    assert.equal(paymentRows, 2);
    assert.equal(ledgerRows, 2);
    assert.equal(referral?.amountCents, 11800);
  });

  test("affiliate klume pec Payment izveides tiek pabeigta ar retry", async () => {
    await resetData();
    const { referredUser } = await seedReferral({
      affiliateClerkId: "clerk_aff_3",
      affiliateEmail: "aff3@example.test",
      affiliateCode: "AFF003",
      referredClerkId: "clerk_ref_3",
      referredEmail: "ref3@example.test",
      referredStripeCustomerId: "cus_referred_1",
    });

    const { deps, counters } = createProcessDeps({ failFirstAffiliateAttempt: true });
    const invoice = { ...baseInvoice, id: "in_retry_after_affiliate_failure", billing_reason: "subscription_create" };

    await assert.rejects(() => processPaymentSucceeded(invoice, deps));
    await processPaymentSucceeded(invoice, deps);

    const payment = await prisma.payment.findUnique({
      where: { providerPaymentId: "in_retry_after_affiliate_failure" },
      select: { id: true },
    });
    const ledgerRows = await prisma.referralPaymentCredit.count({ where: { paymentId: payment?.id } });
    const referral = await prisma.referral.findUnique({ where: { referredUserId: referredUser.id } });

    assert.ok(payment?.id);
    assert.equal(ledgerRows, 1);
    assert.equal(referral?.amountCents, 5900);
    assert.equal(counters.affiliateAttempts(), 2);
  });

  test("legacy PAID payment ar backfill netiek parkreditets pie replay", async () => {
    await resetData();
    const { referredUser, referral } = await seedReferral({
      affiliateClerkId: "clerk_aff_4",
      affiliateEmail: "aff4@example.test",
      affiliateCode: "AFF004",
      referredClerkId: "clerk_ref_4",
      referredEmail: "ref4@example.test",
      referredStripeCustomerId: "cus_referred_1",
    });

    const payment = await prisma.payment.create({
      data: {
        userId: referredUser.id,
        amount: 5900,
        currency: "eur",
        plan: "PAMATI",
        status: "PAID",
        provider: "stripe",
        providerPaymentId: "in_legacy_paid",
        paidAt: new Date(),
      },
      select: { id: true },
    });

    await prisma.referral.update({
      where: { id: referral.id },
      data: {
        status: "PURCHASED",
        amountCents: 5900,
        plan: "PAMATI",
        purchasedAt: new Date(),
      },
    });

    await prisma.$executeRaw`
      INSERT INTO "ReferralPaymentCredit" ("paymentId", "referralId", "amountCents", "plan", "createdAt")
      SELECT
        p."id",
        r."id",
        p."amount",
        COALESCE(p."plan", r."plan"),
        COALESCE(p."paidAt", p."createdAt", CURRENT_TIMESTAMP)
      FROM "Payment" p
      JOIN "Referral" r ON r."referredUserId" = p."userId"
      WHERE p."status" = 'PAID'::"PaymentStatus"
      ON CONFLICT ("paymentId") DO NOTHING
    `;

    const { deps, counters } = createProcessDeps();
    await processPaymentSucceeded({ ...baseInvoice, id: "in_legacy_paid" }, deps);

    const ledgerRows = await prisma.referralPaymentCredit.count({ where: { paymentId: payment.id } });
    const updatedReferral = await prisma.referral.findUnique({ where: { referredUserId: referredUser.id } });

    assert.equal(ledgerRows, 1);
    assert.equal(updatedReferral?.amountCents, 5900);
    assert.equal(counters.welcomeEmails(), 0);
    assert.equal(counters.paymentEmails(), 0);
  });
}

