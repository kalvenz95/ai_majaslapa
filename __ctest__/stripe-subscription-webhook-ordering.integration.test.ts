import test from "node:test";
import assert from "node:assert/strict";
import { PrismaClient, type Plan, SubscriptionStatus } from "@prisma/client";
import { applySubscriptionWebhookEvent } from "../src/lib/stripe-subscription-webhook.ts";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  test("DATABASE_URL nav iestatits stripe subscription webhook integracijas testam", { skip: true }, () => {});
} else {
  const prisma = new PrismaClient({ datasources: { db: { url: databaseUrl } } });

  const PRICE_TO_PLAN: Record<string, Plan> = {
    price_pamati: "PAMATI",
    price_izaugsme: "IZAUGSME",
    price_meistars: "MEISTARS",
  };

  function getPlanFromPriceId(priceId?: string) {
    return (priceId ? PRICE_TO_PLAN[priceId] : null) ?? null;
  }

  async function resetData() {
    await prisma.subscription.deleteMany();
    await prisma.user.deleteMany();
  }

  let userSeed = 0;

  async function seedUser(params?: {
    clerkId?: string;
    stripeCustomerId?: string;
    email?: string;
  }) {
    userSeed += 1;
    return prisma.user.create({
      data: {
        clerkId: params?.clerkId ?? `clerk_seed_${userSeed}`,
        email: params?.email ?? `seed_${userSeed}@example.test`,
        stripeCustomerId: params?.stripeCustomerId ?? `cus_seed_${userSeed}`,
      },
    });
  }

  function buildSubscriptionFixture(overrides?: Partial<any>) {
    const base = {
      id: "sub_base",
      status: "active",
      customer: "cus_base",
      metadata: { clerkId: "clerk_base" },
      cancel_at_period_end: false,
      current_period_start: 1_700_000_000,
      current_period_end: 1_700_086_400,
      items: {
        data: [{ price: { id: "price_pamati" } }],
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

  async function apply(event: {
    eventId: string;
    eventCreated: number;
    eventType: "customer.subscription.created" | "customer.subscription.updated" | "customer.subscription.deleted";
    subscription: any;
  }) {
    return applySubscriptionWebhookEvent(event, {
      prisma,
      getPlanFromPriceId,
    });
  }

  test("jaunaks update neļauj vecākam update pārrakstīt stāvokli", async () => {
    await resetData();
    const user = await seedUser({ clerkId: "clerk_order_1", stripeCustomerId: "cus_order_1" });

    await apply({
      eventId: "evt_create_150",
      eventCreated: 150,
      eventType: "customer.subscription.created",
      subscription: buildSubscriptionFixture({
        id: "sub_order_1",
        customer: "cus_order_1",
        metadata: { clerkId: "clerk_order_1" },
        items: { data: [{ price: { id: "price_pamati" } }] },
      }),
    });

    await apply({
      eventId: "evt_update_220",
      eventCreated: 220,
      eventType: "customer.subscription.updated",
      subscription: buildSubscriptionFixture({
        id: "sub_order_1",
        status: "past_due",
        customer: "cus_order_1",
        metadata: { clerkId: "clerk_order_1" },
        cancel_at_period_end: true,
        items: { data: [{ price: { id: "price_izaugsme" } }] },
      }),
    });

    const stale = await apply({
      eventId: "evt_update_210",
      eventCreated: 210,
      eventType: "customer.subscription.updated",
      subscription: buildSubscriptionFixture({
        id: "sub_order_1",
        status: "active",
        customer: "cus_order_1",
        metadata: { clerkId: "clerk_order_1" },
        cancel_at_period_end: false,
        items: { data: [{ price: { id: "price_pamati" } }] },
      }),
    });

    const subscription = await prisma.subscription.findUnique({ where: { userId: user.id } });

    assert.equal(stale.applied, false);
    assert.equal(stale.reason, "STALE_EVENT");
    assert.equal(subscription?.status, SubscriptionStatus.PAST_DUE);
    assert.equal(subscription?.plan, "IZAUGSME");
    assert.equal(subscription?.cancelAtPeriodEnd, true);
    assert.equal(subscription?.lastStripeEventCreated, 220);
    assert.equal(subscription?.lastStripeEventId, "evt_update_220");
  });

  test("duplicate event netiek piemērots atkārtoti", async () => {
    await resetData();
    const user = await seedUser({ clerkId: "clerk_dup_1", stripeCustomerId: "cus_dup_1" });

    const event = {
      eventId: "evt_dup_same",
      eventCreated: 600,
      eventType: "customer.subscription.created" as const,
      subscription: buildSubscriptionFixture({
        id: "sub_dup_1",
        customer: "cus_dup_1",
        metadata: { clerkId: "clerk_dup_1" },
        items: { data: [{ price: { id: "price_meistars" } }] },
      }),
    };

    const first = await apply(event);
    const second = await apply(event);

    const subscription = await prisma.subscription.findUnique({ where: { userId: user.id } });

    assert.equal(first.applied, true);
    assert.equal(second.applied, false);
    assert.equal(second.reason, "DUPLICATE_EVENT");
    assert.equal(subscription?.plan, "MEISTARS");
    assert.equal(subscription?.lastStripeEventCreated, 600);
    assert.equal(subscription?.lastStripeEventId, "evt_dup_same");
  });

  test("konkurenti vienā sekundē apstrādājas deterministiski", async () => {
    await resetData();
    const user = await seedUser({ clerkId: "clerk_conc_1", stripeCustomerId: "cus_conc_1" });

    await apply({
      eventId: "evt_conc_create",
      eventCreated: 100,
      eventType: "customer.subscription.created",
      subscription: buildSubscriptionFixture({
        id: "sub_conc_1",
        customer: "cus_conc_1",
        metadata: { clerkId: "clerk_conc_1" },
        items: { data: [{ price: { id: "price_pamati" } }] },
      }),
    });

    const [resultA, resultB] = await Promise.all([
      apply({
        eventId: "evt_same_ts_aaa",
        eventCreated: 700,
        eventType: "customer.subscription.updated",
        subscription: buildSubscriptionFixture({
          id: "sub_conc_1",
          status: "active",
          customer: "cus_conc_1",
          metadata: { clerkId: "clerk_conc_1" },
          items: { data: [{ price: { id: "price_pamati" } }] },
        }),
      }),
      apply({
        eventId: "evt_same_ts_zzz",
        eventCreated: 700,
        eventType: "customer.subscription.updated",
        subscription: buildSubscriptionFixture({
          id: "sub_conc_1",
          status: "past_due",
          customer: "cus_conc_1",
          metadata: { clerkId: "clerk_conc_1" },
          items: { data: [{ price: { id: "price_izaugsme" } }] },
        }),
      }),
    ]);

    const subscription = await prisma.subscription.findUnique({ where: { userId: user.id } });

    assert.equal([resultA.applied, resultB.applied].filter(Boolean).length, 1);
    assert.equal([resultA.reason, resultB.reason].filter((reason) => reason === "STALE_EVENT").length, 1);
    assert.equal(subscription?.lastStripeEventCreated, 700);
    assert.ok(
      subscription?.lastStripeEventId === "evt_same_ts_aaa"
      || subscription?.lastStripeEventId === "evt_same_ts_zzz"
    );

    if (subscription?.lastStripeEventId === "evt_same_ts_aaa") {
      assert.equal(subscription.status, SubscriptionStatus.ACTIVE);
      assert.equal(subscription.plan, "PAMATI");
    } else {
      assert.equal(subscription?.status, SubscriptionStatus.PAST_DUE);
      assert.equal(subscription?.plan, "IZAUGSME");
    }
  });

  test("dzēšana un pēc tam novēlots vecāks update neatceļ atcelšanu", async () => {
    await resetData();
    const user = await seedUser({ clerkId: "clerk_delete_1", stripeCustomerId: "cus_delete_1" });

    await apply({
      eventId: "evt_del_create",
      eventCreated: 100,
      eventType: "customer.subscription.created",
      subscription: buildSubscriptionFixture({
        id: "sub_delete_1",
        customer: "cus_delete_1",
        metadata: { clerkId: "clerk_delete_1" },
      }),
    });

    const deleted = await apply({
      eventId: "evt_del_300",
      eventCreated: 300,
      eventType: "customer.subscription.deleted",
      subscription: buildSubscriptionFixture({
        id: "sub_delete_1",
        customer: "cus_delete_1",
        metadata: { clerkId: "clerk_delete_1" },
      }),
    });

    const staleUpdate = await apply({
      eventId: "evt_del_stale_250",
      eventCreated: 250,
      eventType: "customer.subscription.updated",
      subscription: buildSubscriptionFixture({
        id: "sub_delete_1",
        status: "active",
        customer: "cus_delete_1",
        metadata: { clerkId: "clerk_delete_1" },
      }),
    });

    const subscription = await prisma.subscription.findUnique({ where: { userId: user.id } });

    assert.equal(deleted.applied, true);
    assert.equal(staleUpdate.applied, false);
    assert.equal(staleUpdate.reason, "STALE_EVENT");
    assert.equal(subscription?.status, SubscriptionStatus.CANCELED);
    assert.equal(subscription?.lastStripeEventCreated, 300);
    assert.equal(subscription?.lastStripeEventId, "evt_del_300");
  });

  test("renewal, plāna maiņa un replacement tiek apstrādāti korekti", async () => {
    await resetData();
    const user = await seedUser({ clerkId: "clerk_replace_1", stripeCustomerId: "cus_replace_1" });

    await apply({
      eventId: "evt_replace_create",
      eventCreated: 100,
      eventType: "customer.subscription.created",
      subscription: buildSubscriptionFixture({
        id: "sub_old_1",
        customer: "cus_replace_1",
        metadata: { clerkId: "clerk_replace_1" },
        current_period_start: 1_700_000_000,
        current_period_end: 1_700_086_400,
        items: { data: [{ price: { id: "price_pamati" } }] },
      }),
    });

    await apply({
      eventId: "evt_renewal_200",
      eventCreated: 200,
      eventType: "customer.subscription.updated",
      subscription: buildSubscriptionFixture({
        id: "sub_old_1",
        customer: "cus_replace_1",
        metadata: { clerkId: "clerk_replace_1" },
        current_period_start: 1_700_086_401,
        current_period_end: 1_700_172_800,
        items: { data: [{ price: { id: "price_pamati" } }] },
      }),
    });

    await apply({
      eventId: "evt_plan_change_300",
      eventCreated: 300,
      eventType: "customer.subscription.updated",
      subscription: buildSubscriptionFixture({
        id: "sub_old_1",
        customer: "cus_replace_1",
        metadata: { clerkId: "clerk_replace_1" },
        items: { data: [{ price: { id: "price_izaugsme" } }] },
      }),
    });

    await apply({
      eventId: "evt_zzz_old_same_ts",
      eventCreated: 500,
      eventType: "customer.subscription.updated",
      subscription: buildSubscriptionFixture({
        id: "sub_old_1",
        customer: "cus_replace_1",
        metadata: { clerkId: "clerk_replace_1" },
        items: { data: [{ price: { id: "price_izaugsme" } }] },
      }),
    });

    const replacement = await apply({
      eventId: "evt_000_new_created_same_ts",
      eventCreated: 500,
      eventType: "customer.subscription.created",
      subscription: buildSubscriptionFixture({
        id: "sub_new_1",
        customer: "cus_replace_1",
        metadata: { clerkId: "clerk_replace_1" },
        items: { data: [{ price: { id: "price_meistars" } }] },
      }),
    });

    const oldDelete = await apply({
      eventId: "evt_old_delete_600",
      eventCreated: 600,
      eventType: "customer.subscription.deleted",
      subscription: buildSubscriptionFixture({
        id: "sub_old_1",
        customer: "cus_replace_1",
        metadata: { clerkId: "clerk_replace_1" },
      }),
    });

    const staleOldUpdate = await apply({
      eventId: "evt_old_update_550",
      eventCreated: 550,
      eventType: "customer.subscription.updated",
      subscription: buildSubscriptionFixture({
        id: "sub_old_1",
        customer: "cus_replace_1",
        metadata: { clerkId: "clerk_replace_1" },
      }),
    });

    const subscription = await prisma.subscription.findUnique({ where: { userId: user.id } });

    assert.equal(replacement.applied, true);
    assert.equal(oldDelete.applied, false);
    assert.equal(oldDelete.reason, "SUBSCRIPTION_NOT_FOUND");
    assert.equal(staleOldUpdate.applied, false);
    assert.equal(staleOldUpdate.reason, "IGNORED_REPLACED_SUBSCRIPTION_UPDATE");
    assert.equal(subscription?.stripeSubscriptionId, "sub_new_1");
    assert.equal(subscription?.plan, "MEISTARS");
    assert.equal(subscription?.status, SubscriptionStatus.ACTIVE);
    assert.equal(subscription?.lastStripeEventCreated, 500);
    assert.equal(subscription?.lastStripeEventId, "evt_000_new_created_same_ts");
  });
}
