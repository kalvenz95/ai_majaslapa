import test from "node:test";
import assert from "node:assert/strict";
import {
  applySubscriptionWebhookEvent,
  type ApplySubscriptionWebhookDeps,
  type ApplySubscriptionWebhookResult,
  type SubscriptionWebhookEventInput,
} from "../src/lib/stripe-subscription-webhook.ts";
import { SubscriptionStatus, type Plan } from "@prisma/client";

type UserRow = {
  id: string;
  clerkId: string;
  stripeCustomerId: string | null;
};

type SubscriptionRow = {
  id: string;
  userId: string;
  stripeSubscriptionId: string;
  stripePriceId: string;
  plan: Plan;
  status: SubscriptionStatus;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  lastStripeEventCreated: number;
  lastStripeEventId: string | null;
};

function createDeps() {
  const users = new Map<string, UserRow>();
  const usersByClerk = new Map<string, string>();
  const usersByCustomer = new Map<string, string>();
  const subscriptionsByUser = new Map<string, SubscriptionRow>();
  const subscriptionsByStripe = new Map<string, string>();
  let nextSubId = 1;

  const getUserById = (id: string) => users.get(id) ?? null;
  const getSubscriptionByUserId = (userId: string) => subscriptionsByUser.get(userId) ?? null;
  const getSubscriptionByStripeId = (stripeId: string) => {
    const userId = subscriptionsByStripe.get(stripeId);
    if (!userId) return null;
    return subscriptionsByUser.get(userId) ?? null;
  };

  const insertUser = (row: UserRow) => {
    users.set(row.id, row);
    usersByClerk.set(row.clerkId, row.id);
    if (row.stripeCustomerId) usersByCustomer.set(row.stripeCustomerId, row.id);
  };

  const upsertSubscriptionSeed = (row: Omit<SubscriptionRow, "id">) => {
    const existing = subscriptionsByUser.get(row.userId);
    const id = existing?.id ?? `sub_row_${nextSubId++}`;
    if (existing) subscriptionsByStripe.delete(existing.stripeSubscriptionId);
    subscriptionsByUser.set(row.userId, { id, ...row });
    subscriptionsByStripe.set(row.stripeSubscriptionId, row.userId);
  };

  const deps: ApplySubscriptionWebhookDeps = {
    prisma: {
      $transaction: async (fn) => {
        const tx = {
          user: {
            findUnique: async ({ where }: any) => {
              await Promise.resolve();
              if (where?.clerkId) {
                const userId = usersByClerk.get(where.clerkId);
                if (!userId) return null;
                const user = getUserById(userId);
                return user ? { id: user.id } : null;
              }

              if (where?.stripeCustomerId) {
                const userId = usersByCustomer.get(where.stripeCustomerId);
                if (!userId) return null;
                const user = getUserById(userId);
                return user ? { id: user.id } : null;
              }

              return null;
            },
          },
          subscription: {
            findUnique: async ({ where, select }: any) => {
              await Promise.resolve();
              let row: SubscriptionRow | null = null;
              if (where?.userId) {
                row = getSubscriptionByUserId(where.userId);
              } else if (where?.stripeSubscriptionId) {
                row = getSubscriptionByStripeId(where.stripeSubscriptionId);
              }
              if (!row) return null;

              if (!select) return { ...row };
              const picked: Record<string, unknown> = {};
              for (const [key, needed] of Object.entries(select)) {
                if (!needed) continue;
                picked[key] = (row as any)[key];
              }
              return picked;
            },
            create: async ({ data }: any) => {
              await Promise.resolve();
              if (subscriptionsByUser.has(data.userId) || subscriptionsByStripe.has(data.stripeSubscriptionId)) {
                const err: any = new Error("unique");
                err.code = "P2002";
                throw err;
              }

              const row: SubscriptionRow = {
                id: `sub_row_${nextSubId++}`,
                userId: data.userId,
                stripeSubscriptionId: data.stripeSubscriptionId,
                stripePriceId: data.stripePriceId,
                plan: data.plan,
                status: data.status,
                currentPeriodStart: data.currentPeriodStart,
                currentPeriodEnd: data.currentPeriodEnd,
                cancelAtPeriodEnd: data.cancelAtPeriodEnd,
                lastStripeEventCreated: data.lastStripeEventCreated,
                lastStripeEventId: data.lastStripeEventId,
              };
              subscriptionsByUser.set(row.userId, row);
              subscriptionsByStripe.set(row.stripeSubscriptionId, row.userId);
              return { id: row.id };
            },
            updateMany: async ({ where, data }: any) => {
              await Promise.resolve();
              const row = [...subscriptionsByUser.values()].find((candidate) => candidate.id === where.id) ?? null;
              if (!row) return { count: 0 };

              if (row.lastStripeEventCreated !== where.lastStripeEventCreated) return { count: 0 };
              if (row.lastStripeEventId !== where.lastStripeEventId) return { count: 0 };

              if (data.stripeSubscriptionId && data.stripeSubscriptionId !== row.stripeSubscriptionId) {
                if (subscriptionsByStripe.has(data.stripeSubscriptionId)) {
                  const owner = subscriptionsByStripe.get(data.stripeSubscriptionId);
                  if (owner !== row.userId) {
                    const err: any = new Error("unique");
                    err.code = "P2002";
                    throw err;
                  }
                }
                subscriptionsByStripe.delete(row.stripeSubscriptionId);
                subscriptionsByStripe.set(data.stripeSubscriptionId, row.userId);
              }

              Object.assign(row, data);
              subscriptionsByUser.set(row.userId, row);
              return { count: 1 };
            },
          },
        } as any;

        return fn(tx);
      },
    },
    getPlanFromPriceId: (priceId?: string) => {
      const map: Record<string, Plan> = {
        price_basic: "PAMATI",
        price_growth: "IZAUGSME",
        price_master: "MEISTARS",
      };
      return priceId ? map[priceId] ?? null : null;
    },
  };

  const mkEvent = (event: {
    eventId: string;
    created: number;
    type: SubscriptionWebhookEventInput["eventType"];
    subscriptionId: string;
    clerkId?: string;
    customerId?: string;
    status?: string;
    priceId?: string;
    start?: number;
    end?: number;
    cancelAtPeriodEnd?: boolean;
  }): SubscriptionWebhookEventInput => ({
    eventId: event.eventId,
    eventCreated: event.created,
    eventType: event.type,
    subscription: {
      id: event.subscriptionId,
      status: event.status ?? "active",
      customer: event.customerId ?? null,
      metadata: event.clerkId ? { clerkId: event.clerkId } : undefined,
      items:
        event.type === "customer.subscription.deleted"
          ? undefined
          : { data: [{ price: { id: event.priceId ?? "price_basic" } }] },
      current_period_start: event.start ?? 1700000000,
      current_period_end: event.end ?? 1702592000,
      cancel_at_period_end: event.cancelAtPeriodEnd ?? false,
    },
  });

  const apply = (event: SubscriptionWebhookEventInput): Promise<ApplySubscriptionWebhookResult> =>
    applySubscriptionWebhookEvent(event, deps);

  return {
    insertUser,
    upsertSubscriptionSeed,
    apply,
    getSubscriptionByUserId,
    mkEvent,
  };
}

test("jaunaks update neļauj vecākam update pārrakstīt abonementu", async () => {
  const ctx = createDeps();
  ctx.insertUser({ id: "u1", clerkId: "clerk_1", stripeCustomerId: "cus_1" });

  const newer = ctx.mkEvent({
    eventId: "evt_new",
    created: 200,
    type: "customer.subscription.updated",
    subscriptionId: "sub_1",
    clerkId: "clerk_1",
    status: "past_due",
  });
  const older = ctx.mkEvent({
    eventId: "evt_old",
    created: 100,
    type: "customer.subscription.updated",
    subscriptionId: "sub_1",
    clerkId: "clerk_1",
    status: "active",
  });

  await ctx.apply(newer);
  const stale = await ctx.apply(older);

  const sub = ctx.getSubscriptionByUserId("u1");
  assert.ok(sub);
  assert.equal(stale.applied, false);
  assert.equal(stale.reason, "STALE_EVENT");
  assert.equal(sub.status, SubscriptionStatus.PAST_DUE);
  assert.equal(sub.lastStripeEventCreated, 200);
  assert.equal(sub.lastStripeEventId, "evt_new");
});

test("dublikāta piegāde tiek ignorēta idempotenti", async () => {
  const ctx = createDeps();
  ctx.insertUser({ id: "u1", clerkId: "clerk_1", stripeCustomerId: "cus_1" });

  const event = ctx.mkEvent({
    eventId: "evt_dup",
    created: 300,
    type: "customer.subscription.updated",
    subscriptionId: "sub_1",
    clerkId: "clerk_1",
    status: "active",
  });

  const first = await ctx.apply(event);
  const second = await ctx.apply(event);
  const sub = ctx.getSubscriptionByUserId("u1");

  assert.equal(first.applied, true);
  assert.equal(second.applied, false);
  assert.equal(second.reason, "DUPLICATE_EVENT");
  assert.ok(sub);
  assert.equal(sub.lastStripeEventId, "evt_dup");
});

test("vienlaicīga piegāde patur jaunāko stāvokli", async () => {
  const ctx = createDeps();
  ctx.insertUser({ id: "u1", clerkId: "clerk_1", stripeCustomerId: "cus_1" });

  const older = ctx.mkEvent({
    eventId: "evt_older_concurrent",
    created: 400,
    type: "customer.subscription.updated",
    subscriptionId: "sub_1",
    clerkId: "clerk_1",
    status: "trialing",
  });
  const newer = ctx.mkEvent({
    eventId: "evt_newer_concurrent",
    created: 500,
    type: "customer.subscription.updated",
    subscriptionId: "sub_1",
    clerkId: "clerk_1",
    status: "active",
  });

  await Promise.all([ctx.apply(older), ctx.apply(newer)]);
  const sub = ctx.getSubscriptionByUserId("u1");

  assert.ok(sub);
  assert.equal(sub.status, SubscriptionStatus.ACTIVE);
  assert.equal(sub.lastStripeEventCreated, 500);
  assert.equal(sub.lastStripeEventId, "evt_newer_concurrent");
});

test("dzēšana pēc tam novēlots update neatjauno atceltu abonementu", async () => {
  const ctx = createDeps();
  ctx.insertUser({ id: "u1", clerkId: "clerk_1", stripeCustomerId: "cus_1" });

  await ctx.apply(
    ctx.mkEvent({
      eventId: "evt_seed",
      created: 600,
      type: "customer.subscription.updated",
      subscriptionId: "sub_1",
      clerkId: "clerk_1",
      status: "active",
    })
  );

  const deletion = await ctx.apply(
    ctx.mkEvent({
      eventId: "evt_delete",
      created: 700,
      type: "customer.subscription.deleted",
      subscriptionId: "sub_1",
      clerkId: "clerk_1",
      status: "canceled",
    })
  );

  const delayedUpdate = await ctx.apply(
    ctx.mkEvent({
      eventId: "evt_delayed_update",
      created: 650,
      type: "customer.subscription.updated",
      subscriptionId: "sub_1",
      clerkId: "clerk_1",
      status: "active",
    })
  );

  const sub = ctx.getSubscriptionByUserId("u1");
  assert.equal(deletion.applied, true);
  assert.equal(delayedUpdate.applied, false);
  assert.equal(delayedUpdate.reason, "STALE_EVENT");
  assert.ok(sub);
  assert.equal(sub.status, SubscriptionStatus.CANCELED);
  assert.equal(sub.lastStripeEventId, "evt_delete");
});

test("legitīms atjaunojums, plāna maiņa un abonementa nomaiņa tiek apstrādāti korekti", async () => {
  const ctx = createDeps();
  ctx.insertUser({ id: "u1", clerkId: "clerk_1", stripeCustomerId: "cus_1" });

  await ctx.apply(
    ctx.mkEvent({
      eventId: "evt_initial",
      created: 800,
      type: "customer.subscription.created",
      subscriptionId: "sub_old",
      clerkId: "clerk_1",
      status: "active",
      priceId: "price_basic",
      start: 1000,
      end: 2000,
    })
  );

  await ctx.apply(
    ctx.mkEvent({
      eventId: "evt_renewal",
      created: 810,
      type: "customer.subscription.updated",
      subscriptionId: "sub_old",
      clerkId: "clerk_1",
      status: "active",
      priceId: "price_basic",
      start: 2000,
      end: 3000,
    })
  );

  await ctx.apply(
    ctx.mkEvent({
      eventId: "evt_plan_change",
      created: 820,
      type: "customer.subscription.updated",
      subscriptionId: "sub_old",
      clerkId: "clerk_1",
      status: "active",
      priceId: "price_growth",
      start: 2000,
      end: 3000,
    })
  );

  const replacementCreated = await ctx.apply(
    ctx.mkEvent({
      eventId: "evt_replacement_created",
      created: 900,
      type: "customer.subscription.created",
      subscriptionId: "sub_new",
      clerkId: "clerk_1",
      status: "active",
      priceId: "price_master",
      start: 3000,
      end: 4000,
    })
  );

  const replacedUpdate = await ctx.apply(
    ctx.mkEvent({
      eventId: "evt_replaced_same_ts",
      created: 900,
      type: "customer.subscription.updated",
      subscriptionId: "sub_old",
      clerkId: "clerk_1",
      status: "past_due",
      priceId: "price_basic",
      start: 3000,
      end: 4000,
    })
  );

  const sub = ctx.getSubscriptionByUserId("u1");

  assert.equal(replacementCreated.applied, true);
  assert.equal(replacedUpdate.applied, false);
  assert.equal(replacedUpdate.reason, "IGNORED_REPLACED_SUBSCRIPTION_UPDATE");
  assert.ok(sub);
  assert.equal(sub.stripeSubscriptionId, "sub_new");
  assert.equal(sub.plan, "MEISTARS");
  assert.equal(sub.currentPeriodEnd.getTime(), new Date(4000 * 1000).getTime());
});

test("vienāds event.created nepaļaujas uz event.id secību", async () => {
  const ctx = createDeps();
  ctx.insertUser({ id: "u1", clerkId: "clerk_1", stripeCustomerId: "cus_1" });

  await ctx.apply(
    ctx.mkEvent({
      eventId: "evt_b",
      created: 1000,
      type: "customer.subscription.updated",
      subscriptionId: "sub_1",
      clerkId: "clerk_1",
      status: "trialing",
    })
  );

  await ctx.apply(
    ctx.mkEvent({
      eventId: "evt_a",
      created: 1000,
      type: "customer.subscription.updated",
      subscriptionId: "sub_1",
      clerkId: "clerk_1",
      status: "active",
    })
  );

  const sameSecondDifferentEvent = await ctx.apply(
    ctx.mkEvent({
      eventId: "evt_c",
      created: 1000,
      type: "customer.subscription.updated",
      subscriptionId: "sub_1",
      clerkId: "clerk_1",
      status: "past_due",
    })
  );

  const sub = ctx.getSubscriptionByUserId("u1");
  assert.equal(sameSecondDifferentEvent.applied, false);
  assert.equal(sameSecondDifferentEvent.reason, "STALE_EVENT");
  assert.ok(sub);
  assert.equal(sub.status, SubscriptionStatus.TRIALING);
  assert.equal(sub.lastStripeEventId, "evt_b");
});

test("veca aizstāta abonementa update ar jaunāku timestamp netiek pieņemts", async () => {
  const ctx = createDeps();
  ctx.insertUser({ id: "u1", clerkId: "clerk_1", stripeCustomerId: "cus_1" });

  await ctx.apply(
    ctx.mkEvent({
      eventId: "evt_old_created",
      created: 1100,
      type: "customer.subscription.created",
      subscriptionId: "sub_old",
      clerkId: "clerk_1",
      status: "active",
      priceId: "price_basic",
    })
  );

  await ctx.apply(
    ctx.mkEvent({
      eventId: "evt_new_created",
      created: 1200,
      type: "customer.subscription.created",
      subscriptionId: "sub_new",
      clerkId: "clerk_1",
      status: "active",
      priceId: "price_master",
    })
  );

  const delayedOldUpdate = await ctx.apply(
    ctx.mkEvent({
      eventId: "evt_old_late_update",
      created: 1300,
      type: "customer.subscription.updated",
      subscriptionId: "sub_old",
      clerkId: "clerk_1",
      status: "past_due",
      priceId: "price_basic",
    })
  );

  const sub = ctx.getSubscriptionByUserId("u1");
  assert.equal(delayedOldUpdate.applied, false);
  assert.equal(delayedOldUpdate.reason, "IGNORED_REPLACED_SUBSCRIPTION_UPDATE");
  assert.ok(sub);
  assert.equal(sub.stripeSubscriptionId, "sub_new");
  assert.equal(sub.plan, "MEISTARS");
  assert.equal(sub.lastStripeEventId, "evt_new_created");
});
