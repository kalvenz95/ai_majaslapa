import test from "node:test";
import assert from "node:assert/strict";
import {
  processPaymentSucceeded,
  recordStripePayment,
  type PaymentWebhookContext,
} from "../src/lib/stripe-webhook-payment.ts";

type FakeInvoice = {
  id: string;
  customer?: string;
  amount_paid?: number;
  amount_due?: number;
  currency?: string;
  hosted_invoice_url?: string;
  billing_reason?: string;
  lines?: { data?: Array<{ price?: { id?: string } }> };
};

function createRecordDeps() {
  const payments = new Map<string, { id: string; status: "PAID" | "FAILED" }>();
  let nextId = 1;

  return {
    payments,
    deps: {
      findUserByStripeCustomerId: async (customerId: string) => {
        if (customerId !== "cus_1") return null;
        return {
          id: "user_1",
          email: "user@example.com",
          name: "Test User",
          subscriptionPlan: "PAMATI" as const,
        };
      },
      createPayment: async (data: any) => {
        if (data.providerPaymentId && payments.has(data.providerPaymentId)) {
          const err: any = new Error("unique");
          err.code = "P2002";
          throw err;
        }
        const id = `pay_${nextId++}`;
        if (data.providerPaymentId) {
          payments.set(data.providerPaymentId, { id, status: data.status });
        }
        return { id };
      },
      promotePaymentToPaid: async ({ providerPaymentId }: any) => {
        const existing = payments.get(providerPaymentId);
        if (!existing || existing.status === "PAID") return { count: 0 };
        existing.status = "PAID";
        return { count: 1 };
      },
      updatePaymentByProviderPaymentId: async ({ providerPaymentId, status }: any) => {
        const existing = payments.get(providerPaymentId);
        if (!existing) throw new Error("payment missing");
        existing.status = status;
        return { id: existing.id };
      },
      findPaymentByProviderPaymentId: async (providerPaymentId: string) => {
        const existing = payments.get(providerPaymentId);
        return existing ? { id: existing.id } : null;
      },
      isUniqueConstraintError: (err: any) => err?.code === "P2002",
    },
  };
}

function createProcessDeps() {
  const { deps } = createRecordDeps();
  const creditedPaymentIds = new Set<string>();
  let credits = 0;
  let welcomeEmails = 0;
  let paymentEmails = 0;

  const processDeps = {
    recordPayment: async (invoice: unknown): Promise<PaymentWebhookContext | null> =>
      recordStripePayment(invoice, "PAID", {
        deps,
        getPlanFromPriceId: () => "PAMATI",
        planNames: { PAMATI: "P", IZAUGSME: "I", MEISTARS: "M" },
      }),
    sendWelcomeEmail: async () => {
      welcomeEmails++;
    },
    sendPaymentConfirmationEmail: async () => {
      paymentEmails++;
    },
    markReferralPurchased: async (_userId: string, paymentId: string) => {
      if (creditedPaymentIds.has(paymentId)) {
        return { credited: false, reason: "ALREADY_CREDITED" };
      }
      creditedPaymentIds.add(paymentId);
      credits++;
      return { credited: true, reason: "CREDITED" };
    },
    logError: () => {},
  };

  return {
    deps: processDeps,
    counters: {
      credits: () => credits,
      welcomeEmails: () => welcomeEmails,
      paymentEmails: () => paymentEmails,
    },
  };
}

test("recordStripePayment apstrādā dublikātu caur P2002 un saglabā vienu payment", async () => {
  const { deps, payments } = createRecordDeps();
  const invoice: FakeInvoice = {
    id: "in_dup",
    customer: "cus_1",
    amount_paid: 5900,
    amount_due: 5900,
    currency: "eur",
    lines: { data: [{ price: { id: "price_1" } }] },
  };

  const first = await recordStripePayment(invoice, "PAID", {
    deps,
    getPlanFromPriceId: () => "PAMATI",
    planNames: { PAMATI: "P", IZAUGSME: "I", MEISTARS: "M" },
  });

  const second = await recordStripePayment(invoice, "PAID", {
    deps,
    getPlanFromPriceId: () => "PAMATI",
    planNames: { PAMATI: "P", IZAUGSME: "I", MEISTARS: "M" },
  });

  assert.ok(first);
  assert.ok(second);
  assert.equal(first?.isNewPayment, true);
  assert.equal(second?.isNewPayment, false);
  assert.equal(first?.paymentId, second?.paymentId);
  assert.equal(payments.size, 1);
});


test("invoice.payment_succeeded bez invoice.id tiek noraidīts", async () => {
  const { deps } = createRecordDeps();

  await assert.rejects(
    () =>
      recordStripePayment(
        {
          customer: "cus_1",
          amount_paid: 5900,
          amount_due: 5900,
          lines: { data: [{ price: { id: "price_1" } }] },
        } as any,
        "PAID",
        {
          deps,
          getPlanFromPriceId: () => "PAMATI",
          planNames: { PAMATI: "P", IZAUGSME: "I", MEISTARS: "M" },
        }
      ),
    /invoice\.id/i
  );
});
test("FAILED ieraksts tiek paaugstināts uz PAID un neizveido dublikātu", async () => {
  const { deps, payments } = createRecordDeps();
  payments.set("in_failed_then_paid", { id: "pay_seed", status: "FAILED" });

  const invoice: FakeInvoice = {
    id: "in_failed_then_paid",
    customer: "cus_1",
    amount_paid: 5900,
    amount_due: 5900,
    currency: "eur",
    lines: { data: [{ price: { id: "price_1" } }] },
  };

  const result = await recordStripePayment(invoice, "PAID", {
    deps,
    getPlanFromPriceId: () => "PAMATI",
    planNames: { PAMATI: "P", IZAUGSME: "I", MEISTARS: "M" },
  });

  assert.ok(result);
  assert.equal(result?.isNewPayment, false);
  assert.equal(result?.paymentId, "pay_seed");
  assert.equal(payments.get("in_failed_then_paid")?.status, "PAID");
});


test("FAILED -> PAID promotion nosūta paziņojuma e-pastus tieši vienu reizi", async () => {
  const { deps: recordDeps, payments } = createRecordDeps();
  payments.set("in_failed_promoted_notify", { id: "pay_promoted", status: "FAILED" });

  let welcomeEmails = 0;
  let paymentEmails = 0;
  let credits = 0;
  const seen = new Set<string>();

  const deps = {
    recordPayment: async (invoice: unknown): Promise<PaymentWebhookContext | null> =>
      recordStripePayment(invoice, "PAID", {
        deps: recordDeps,
        getPlanFromPriceId: () => "PAMATI",
        planNames: { PAMATI: "P", IZAUGSME: "I", MEISTARS: "M" },
      }),
    sendWelcomeEmail: async () => {
      welcomeEmails++;
    },
    sendPaymentConfirmationEmail: async () => {
      paymentEmails++;
    },
    markReferralPurchased: async (_userId: string, paymentId: string) => {
      if (!seen.has(paymentId)) {
        seen.add(paymentId);
        credits++;
      }
      return { credited: true, reason: "CREDITED" };
    },
    logError: () => {},
  };

  const invoice: FakeInvoice = {
    id: "in_failed_promoted_notify",
    customer: "cus_1",
    amount_paid: 5900,
    amount_due: 5900,
    billing_reason: "subscription_create",
    lines: { data: [{ price: { id: "price_1" } }] },
  };

  await processPaymentSucceeded(invoice, deps);
  await processPaymentSucceeded(invoice, deps);

  assert.equal(welcomeEmails, 1);
  assert.equal(paymentEmails, 1);
  assert.equal(credits, 1);
});
test("divas paralēlas piegādes tam pašam eventam kreditē partneri tikai vienreiz", async () => {
  const { deps, counters } = createProcessDeps();
  const invoice: FakeInvoice = {
    id: "in_concurrent",
    customer: "cus_1",
    amount_paid: 5900,
    amount_due: 5900,
    billing_reason: "subscription_create",
    lines: { data: [{ price: { id: "price_1" } }] },
  };

  await Promise.all([processPaymentSucceeded(invoice, deps), processPaymentSucceeded(invoice, deps)]);

  assert.equal(counters.credits(), 1);
  assert.equal(counters.welcomeEmails(), 1);
  assert.equal(counters.paymentEmails(), 1);
});

test("ja affiliate kreditēšana neizdodas pēc Payment izveides, retry to droši pabeidz", async () => {
  const { deps: recordDeps } = createRecordDeps();
  let creditAttempts = 0;
  let credited = 0;
  let welcomeEmails = 0;
  const seen = new Set<string>();

  const deps = {
    recordPayment: async (invoice: unknown): Promise<PaymentWebhookContext | null> =>
      recordStripePayment(invoice, "PAID", {
        deps: recordDeps,
        getPlanFromPriceId: () => "PAMATI",
        planNames: { PAMATI: "P", IZAUGSME: "I", MEISTARS: "M" },
      }),
    sendWelcomeEmail: async () => {
      welcomeEmails++;
    },
    sendPaymentConfirmationEmail: async () => {},
    markReferralPurchased: async (_userId: string, paymentId: string) => {
      creditAttempts++;
      if (creditAttempts === 1) {
        throw new Error("temporary db error");
      }
      if (!seen.has(paymentId)) {
        seen.add(paymentId);
        credited++;
      }
      return { credited: true, reason: "CREDITED" };
    },
    logError: () => {},
  };

  const invoice: FakeInvoice = {
    id: "in_retry_credit",
    customer: "cus_1",
    amount_paid: 5900,
    amount_due: 5900,
    billing_reason: "subscription_create",
    lines: { data: [{ price: { id: "price_1" } }] },
  };

  await assert.rejects(() => processPaymentSucceeded(invoice, deps));
  await processPaymentSucceeded(invoice, deps);

  assert.equal(creditAttempts, 2);
  assert.equal(credited, 1);
  assert.equal(welcomeEmails, 1);
});

test("atšķirīgi payment event id joprojām kreditē atsevišķi", async () => {
  const { deps, counters } = createProcessDeps();

  await processPaymentSucceeded(
    {
      id: "in_one",
      customer: "cus_1",
      amount_paid: 2900,
      amount_due: 2900,
      lines: { data: [{ price: { id: "price_1" } }] },
    },
    deps
  );

  await processPaymentSucceeded(
    {
      id: "in_two",
      customer: "cus_1",
      amount_paid: 2900,
      amount_due: 2900,
      lines: { data: [{ price: { id: "price_1" } }] },
    },
    deps
  );

  assert.equal(counters.credits(), 2);
});


