import test from "node:test";
import assert from "node:assert/strict";
import { PrismaClient, SubscriptionStatus } from "@prisma/client";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  test("DATABASE_URL nav iestatits canonical stripe webhook testam", { skip: true }, () => {});
} else {
  const prisma = new PrismaClient({ datasources: { db: { url: databaseUrl } } });

  process.env.STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "whsec_test";
  process.env.STRIPE_PRICE_PAMATI = process.env.STRIPE_PRICE_PAMATI || "price_basic";
  process.env.STRIPE_PRICE_IZAUGSME = process.env.STRIPE_PRICE_IZAUGSME || "price_growth";
  process.env.STRIPE_PRICE_MEISTARS = process.env.STRIPE_PRICE_MEISTARS || "price_master";

  let seed = 0;

  test.after(async () => {
    await prisma.$disconnect();
  });

  async function loadWebhookRoute() {
    const routeModule = await import("../src/app/api/stripe/webhook/route.ts");
    const stripeModule = await import("../src/lib/stripe.ts");

    return {
      post: routeModule.POST,
      stripe: stripeModule.stripe,
    };
  }

  async function resetData() {
    await prisma.subscription.deleteMany();
    await prisma.user.deleteMany();
  }

  async function seedUser() {
    seed += 1;
    return prisma.user.create({
      data: {
        clerkId: `clerk_route_${seed}`,
        email: `route_${seed}@example.test`,
        stripeCustomerId: `cus_route_${seed}`,
      },
    });
  }

  function buildSubscription(overrides?: Partial<any>) {
    const base = {
      id: "sub_route_base",
      status: "active",
      customer: "cus_route_base",
      metadata: { clerkId: "clerk_route_base" },
      cancel_at_period_end: false,
      current_period_start: 1_700_000_000,
      current_period_end: 1_700_086_400,
      items: {
        data: [{ price: { id: "price_basic" } }],
      },
    };

    return {
      ...base,
      ...overrides,
      metadata: {
        ...base.metadata,
        ...(overrides?.metadata ?? {}),
      },
      items: overrides?.items ?? base.items,
    };
  }

  async function sendWebhookEvent(post: (req: Request) => Promise<Response>, event: any) {
    const request = new Request("http://localhost/api/stripe/webhook", {
      method: "POST",
      headers: {
        "stripe-signature": "sig_test",
      },
      body: JSON.stringify(event),
    });

    return post(request);
  }

  async function withMockedStripe(
    stripe: any,
    retrieve: (subscriptionId: string) => Promise<any>,
    run: () => Promise<void>
  ) {
    const originalConstructEvent = stripe.webhooks.constructEvent;
    const originalRetrieve = stripe.subscriptions.retrieve;

    stripe.webhooks.constructEvent = (body: string) => JSON.parse(body);
    stripe.subscriptions.retrieve = async (subscriptionId: string) => retrieve(subscriptionId);

    try {
      await run();
    } finally {
      stripe.webhooks.constructEvent = originalConstructEvent;
      stripe.subscriptions.retrieve = originalRetrieve;
    }
  }

  test("vienads event.created/start/end ar atškirigiem update nelauj vecaka payload replay parrakstit canonical stavokli", async () => {
    const { post, stripe } = await loadWebhookRoute();

    for (const order of ["older-first", "newer-first"] as const) {
      await resetData();
      const user = await seedUser();
      const subscriptionId = `sub_same_ts_${order}`;
      const clerkId = user.clerkId;
      const customerId = user.stripeCustomerId!;

      const olderPayload = buildSubscription({
        id: subscriptionId,
        customer: customerId,
        metadata: { clerkId },
        status: "active",
        cancel_at_period_end: false,
        items: { data: [{ price: { id: "price_basic" } }] },
        current_period_start: 1_710_000_000,
        current_period_end: 1_710_086_400,
      });

      const newerPayload = buildSubscription({
        id: subscriptionId,
        customer: customerId,
        metadata: { clerkId },
        status: "past_due",
        cancel_at_period_end: true,
        items: { data: [{ price: { id: "price_master" } }] },
        current_period_start: 1_710_000_000,
        current_period_end: 1_710_086_400,
      });

      const canonical = buildSubscription({
        id: subscriptionId,
        customer: customerId,
        metadata: { clerkId },
        status: "past_due",
        cancel_at_period_end: true,
        items: { data: [{ price: { id: "price_master" } }] },
        current_period_start: 1_710_000_000,
        current_period_end: 1_710_086_400,
      });

      const olderEvent = {
        id: `evt_older_${order}`,
        created: 6_000,
        type: "customer.subscription.updated",
        data: { object: olderPayload },
      };

      const newerEvent = {
        id: `evt_newer_${order}`,
        created: 6_000,
        type: "customer.subscription.updated",
        data: { object: newerPayload },
      };

      await withMockedStripe(stripe, async () => canonical, async () => {
        if (order === "older-first") {
          const first = await sendWebhookEvent(post, olderEvent);
          const second = await sendWebhookEvent(post, newerEvent);
          assert.equal(first.status, 200);
          assert.equal(second.status, 200);
        } else {
          const first = await sendWebhookEvent(post, newerEvent);
          const second = await sendWebhookEvent(post, olderEvent);
          assert.equal(first.status, 200);
          assert.equal(second.status, 200);
        }

        const replay = await sendWebhookEvent(post, olderEvent);
        assert.equal(replay.status, 200);
      });

      const subscription = await prisma.subscription.findUnique({ where: { userId: user.id } });
      assert.ok(subscription);
      assert.equal(subscription.status, SubscriptionStatus.PAST_DUE);
      assert.equal(subscription.plan, "MEISTARS");
      assert.equal(subscription.cancelAtPeriodEnd, true);
      assert.equal(subscription.currentPeriodStart.getTime(), new Date(1_710_000_000 * 1000).getTime());
      assert.equal(subscription.currentPeriodEnd.getTime(), new Date(1_710_086_400 * 1000).getTime());
      assert.equal(subscription.lastStripeEventCreated, 6_000);
    }
  });

  test("kanoniska Stripe retrieve klume neatjaunina DB un pec veiksmiga retry korekti atkopjas", async () => {
    const { post, stripe } = await loadWebhookRoute();

    await resetData();
    const user = await seedUser();
    const subscriptionId = "sub_retry_canonical";
    const clerkId = user.clerkId;
    const customerId = user.stripeCustomerId!;

    const initialCanonical = buildSubscription({
      id: subscriptionId,
      customer: customerId,
      metadata: { clerkId },
      status: "active",
      cancel_at_period_end: false,
      items: { data: [{ price: { id: "price_basic" } }] },
      current_period_start: 1_720_000_000,
      current_period_end: 1_720_086_400,
    });

    const seedEvent = {
      id: "evt_retry_seed",
      created: 7_000,
      type: "customer.subscription.created",
      data: { object: initialCanonical },
    };

    await withMockedStripe(stripe, async () => initialCanonical, async () => {
      const response = await sendWebhookEvent(post, seedEvent);
      assert.equal(response.status, 200);
    });

    const failedRetrievePayload = buildSubscription({
      id: subscriptionId,
      customer: customerId,
      metadata: { clerkId },
      status: "active",
      cancel_at_period_end: false,
      items: { data: [{ price: { id: "price_basic" } }] },
      current_period_start: 1_720_000_000,
      current_period_end: 1_720_086_400,
    });

    const canonicalAfterRecovery = buildSubscription({
      id: subscriptionId,
      customer: customerId,
      metadata: { clerkId },
      status: "past_due",
      cancel_at_period_end: true,
      items: { data: [{ price: { id: "price_master" } }] },
      current_period_start: 1_720_000_000,
      current_period_end: 1_720_086_400,
    });

    const retryEvent = {
      id: "evt_retry_target",
      created: 7_500,
      type: "customer.subscription.updated",
      data: { object: failedRetrievePayload },
    };

    let firstAttempt = true;
    await withMockedStripe(
      stripe,
      async () => {
        if (firstAttempt) {
          firstAttempt = false;
          throw new Error("temporary stripe retrieve failure");
        }
        return canonicalAfterRecovery;
      },
      async () => {
        const failedResponse = await sendWebhookEvent(post, retryEvent);
        assert.equal(failedResponse.status, 500);

        const afterFailure = await prisma.subscription.findUnique({ where: { userId: user.id } });
        assert.ok(afterFailure);
        assert.equal(afterFailure.status, SubscriptionStatus.ACTIVE);
        assert.equal(afterFailure.plan, "PAMATI");
        assert.equal(afterFailure.cancelAtPeriodEnd, false);
        assert.equal(afterFailure.lastStripeEventCreated, 7_000);
        assert.equal(afterFailure.lastStripeEventId, "evt_retry_seed");

        const successResponse = await sendWebhookEvent(post, retryEvent);
        assert.equal(successResponse.status, 200);
      }
    );

    const finalSubscription = await prisma.subscription.findUnique({ where: { userId: user.id } });
    assert.ok(finalSubscription);
    assert.equal(finalSubscription.status, SubscriptionStatus.PAST_DUE);
    assert.equal(finalSubscription.plan, "MEISTARS");
    assert.equal(finalSubscription.cancelAtPeriodEnd, true);
    assert.equal(finalSubscription.lastStripeEventCreated, 7_500);
    assert.equal(finalSubscription.lastStripeEventId, "evt_retry_target");
  });
}
