import type { Plan, SubscriptionStatus, PaymentStatus, UserStatus, Role } from "@prisma/client";

// Lomu nosaukumi latviski (klienta-drošs — bez server-only)
export const ROLE_LABELS: Record<Role, string> = {
  OWNER: "Īpašnieks",
  ADMIN: "Administrators",
  SUPPORT: "Atbalsts",
  USER: "Lietotājs",
};

/** Naudas formatēšana — summa centos → "€29,00" */
export function formatMoney(cents: number, currency = "EUR"): string {
  return new Intl.NumberFormat("lv-LV", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100);
}

/** Datums latviešu formātā */
export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "—";
  return new Intl.DateTimeFormat("lv-LV", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}

export function formatDateTime(date: Date | string | null | undefined): string {
  if (!date) return "—";
  return new Intl.DateTimeFormat("lv-LV", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
}

export const PLAN_LABELS: Record<Plan, string> = {
  PAMATI: "Pamati",
  IZAUGSME: "Izaugsme",
  MEISTARS: "Meistars",
};

export const SUBSCRIPTION_LABELS: Record<SubscriptionStatus, string> = {
  ACTIVE: "Aktīvs",
  CANCELED: "Atcelts",
  PAST_DUE: "Kavēts maksājums",
  TRIALING: "Izmēģinājums",
  INCOMPLETE: "Nepabeigts",
};

export const PAYMENT_LABELS: Record<PaymentStatus, string> = {
  PAID: "Samaksāts",
  PENDING: "Gaida",
  FAILED: "Neizdevās",
  REFUNDED: "Atmaksāts",
  CANCELED: "Atcelts",
};

export const USER_STATUS_LABELS: Record<UserStatus, string> = {
  ACTIVE: "Aktīvs",
  BLOCKED: "Bloķēts",
};

type Tone = "green" | "amber" | "red" | "blue" | "neutral" | "purple";

export function subscriptionTone(status: SubscriptionStatus | null | undefined): Tone {
  switch (status) {
    case "ACTIVE":
      return "green";
    case "TRIALING":
      return "blue";
    case "PAST_DUE":
      return "amber";
    case "CANCELED":
    case "INCOMPLETE":
      return "red";
    default:
      return "neutral";
  }
}

export function paymentTone(status: PaymentStatus): Tone {
  switch (status) {
    case "PAID":
      return "green";
    case "PENDING":
      return "amber";
    case "FAILED":
    case "CANCELED":
      return "red";
    case "REFUNDED":
      return "purple";
    default:
      return "neutral";
  }
}

export const PLAN_TONE: Record<Plan, Tone> = {
  PAMATI: "blue",
  IZAUGSME: "purple",
  MEISTARS: "green",
};
