import test from "node:test";
import assert from "node:assert/strict";
import { fetchCanonicalSubscriptionSnapshot } from "../src/app/api/stripe/webhook/route.ts";
import { stripe } from "../src/lib/stripe.ts";

type StripeRetrieve = (subscriptionId: string, options?: unknown) => Promise<unknown>;

function withMockedRetrieve(mockImpl: StripeRetrieve, run: () => Promise<void>) {
  const subscriptions = (stripe as any).subscriptions;
  const originalRetrieve = subscriptions.retrieve;

  subscriptions.retrieve = mockImpl;

  return run().finally(() => {
    subscriptions.retrieve = originalRetrieve;
  });
}

test("fetchCanonicalSubscriptionSnapshot izmanto canonical Stripe snapshot, ja pieejams", async () => {
  const fallback = { id: "sub_fallback", status: "active" };
  const canonical = { id: "sub_canonical", status: "past_due" };

  await withMockedRetrieve(async (subscriptionId, options) => {
    assert.equal(subscriptionId, "sub_123");
    assert.deepEqual(options, { expand: ["items.data.price"] });
    return canonical;
  }, async () => {
    const result = await fetchCanonicalSubscriptionSnapshot("sub_123", fallback);
    assert.deepEqual(result, canonical);
  });
});

test("fetchCanonicalSubscriptionSnapshot Stripe API klume droši atgriež event payload fallback", async () => {
  const fallback = {
    id: "sub_evt_payload",
    status: "active",
    items: { data: [{ price: { id: "price_basic" } }] },
  };

  await withMockedRetrieve(async () => {
    throw new Error("stripe retrieve timeout");
  }, async () => {
    const result = await fetchCanonicalSubscriptionSnapshot("sub_456", fallback);
    assert.equal(result, fallback);
  });
});
