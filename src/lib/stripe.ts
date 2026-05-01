import Stripe from "stripe";
import type { Plan } from "@prisma/client";

// Lazy initialization — novērš build kļūdas bez .env
let _stripe: InstanceType<typeof Stripe> | null = null;

export function getStripe() {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
      apiVersion: "2026-04-22.dahlia" as any,
    });
  }
  return _stripe;
}

export const stripe = new Proxy({} as InstanceType<typeof Stripe>, {
  get(_, prop: string) {
    return (getStripe() as any)[prop];
  },
});

// Plāna → Stripe Price ID kartēšana
export const PLAN_PRICE_MAP: Record<Plan, string> = {
  PAMATI: process.env.STRIPE_PRICE_PAMATI || "",
  IZAUGSME: process.env.STRIPE_PRICE_IZAUGSME || "",
  MEISTARS: process.env.STRIPE_PRICE_MEISTARS || "",
};

// Plāna nosaukumi latviski
export const PLAN_NAMES: Record<Plan, string> = {
  PAMATI: "Satura Speciālists",
  IZAUGSME: "Digitālais Speciālists",
  MEISTARS: "AI Aģentu Eksperts",
};

// Plāna cenas (EUR)
export const PLAN_PRICES: Record<Plan, number> = {
  PAMATI: 29,
  IZAUGSME: 59,
  MEISTARS: 149,
};

// Augstāks plāns iekļauj zemākos
export function hasAccessToPlan(userPlan: Plan, requiredPlan: Plan): boolean {
  const order: Plan[] = ["PAMATI", "IZAUGSME", "MEISTARS"];
  return order.indexOf(userPlan) >= order.indexOf(requiredPlan);
}

export function getPlanFromPriceId(priceId: string): Plan | null {
  const entry = Object.entries(PLAN_PRICE_MAP).find(([, id]) => id === priceId);
  return entry ? (entry[0] as Plan) : null;
}
