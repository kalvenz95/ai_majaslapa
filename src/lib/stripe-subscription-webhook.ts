import { Prisma, SubscriptionStatus, type Plan } from "@prisma/client";

const MAX_RETRIES = 5;

type StripeSubscriptionLike = {
  id: string;
  status: string;
  customer?: string | null;
  metadata?: { clerkId?: string | null };
  cancel_at_period_end?: boolean;
  current_period_start?: number;
  current_period_end?: number;
  items?: { data?: Array<{ price?: { id?: string } }> };
};

export type SubscriptionWebhookEventInput = {
  eventId: string;
  eventCreated: number;
  eventType: "customer.subscription.created" | "customer.subscription.updated" | "customer.subscription.deleted";
  subscription: StripeSubscriptionLike;
};

export type ApplySubscriptionWebhookDeps = {
  prisma: {
    $transaction: <T>(fn: (tx: Prisma.TransactionClient) => Promise<T>) => Promise<T>;
  };
  getPlanFromPriceId: (priceId?: string) => Plan | null;
};

export type ApplySubscriptionWebhookResult = {
  applied: boolean;
  reason:
    | "APPLIED"
    | "NO_USER"
    | "NO_PLAN"
    | "SUBSCRIPTION_NOT_FOUND"
    | "DUPLICATE_EVENT"
    | "STALE_EVENT"
    | "IGNORED_REPLACED_SUBSCRIPTION_UPDATE";
};

type EventCursor = {
  eventCreated: number;
  eventId: string;
};

type StoredCursor = {
  lastStripeEventCreated: number;
  lastStripeEventId: string | null;
  stripeSubscriptionId: string;
};

function compareEventRecency(stored: StoredCursor, incoming: EventCursor): 1 | 0 | -1 {
  if (incoming.eventCreated > stored.lastStripeEventCreated) return 1;
  if (incoming.eventCreated < stored.lastStripeEventCreated) return -1;

  if (incoming.eventId === stored.lastStripeEventId) return 0;
  return -1;
}

function toSubscriptionStatus(status: string): SubscriptionStatus {
  const statusMap: Record<string, SubscriptionStatus> = {
    active: SubscriptionStatus.ACTIVE,
    trialing: SubscriptionStatus.TRIALING,
    canceled: SubscriptionStatus.CANCELED,
    past_due: SubscriptionStatus.PAST_DUE,
    incomplete: SubscriptionStatus.INCOMPLETE,
  };

  return statusMap[status] ?? SubscriptionStatus.INCOMPLETE;
}

function isRetryableUniqueConflict(err: unknown): boolean {
  return (
    err instanceof Prisma.PrismaClientKnownRequestError
    || (typeof err === "object" && err !== null && (err as { code?: unknown }).code === "P2002")
  );
}

function isRetrySignal(err: unknown): boolean {
  return err instanceof Error && err.message === "SUBSCRIPTION_CONCURRENT_RETRY";
}

async function resolveUserId(tx: Prisma.TransactionClient, sub: StripeSubscriptionLike) {
  const clerkId = sub.metadata?.clerkId;
  if (clerkId) {
    const user = await tx.user.findUnique({ where: { clerkId }, select: { id: true } });
    if (user) return user.id;
  }

  const customerId = typeof sub.customer === "string" ? sub.customer : null;
  if (customerId) {
    const user = await tx.user.findUnique({ where: { stripeCustomerId: customerId }, select: { id: true } });
    if (user) return user.id;
  }

  return null;
}

export async function applySubscriptionWebhookEvent(
  input: SubscriptionWebhookEventInput,
  deps: ApplySubscriptionWebhookDeps
): Promise<ApplySubscriptionWebhookResult> {
  const incoming = {
    eventCreated: input.eventCreated,
    eventId: input.eventId,
    subscriptionId: input.subscription.id,
  };

  const isDeletion = input.eventType === "customer.subscription.deleted";

  const priceId = input.subscription.items?.data?.[0]?.price?.id;
  const plan = isDeletion ? null : deps.getPlanFromPriceId(priceId);
  if (!isDeletion && !plan) {
    return { applied: false, reason: "NO_PLAN" };
  }

  const targetStatus = isDeletion
    ? SubscriptionStatus.CANCELED
    : toSubscriptionStatus(input.subscription.status);

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      return await deps.prisma.$transaction(async (tx) => {
        if (isDeletion) {
          const existingByStripeId = await tx.subscription.findUnique({
            where: { stripeSubscriptionId: input.subscription.id },
            select: {
              id: true,
              lastStripeEventCreated: true,
              lastStripeEventId: true,
              stripeSubscriptionId: true,
            },
          });

          if (!existingByStripeId) {
            return { applied: false as const, reason: "SUBSCRIPTION_NOT_FOUND" as const };
          }

          const recency = compareEventRecency(existingByStripeId, incoming);
          if (recency === 0) {
            return { applied: false as const, reason: "DUPLICATE_EVENT" as const };
          }
          if (recency < 0) {
            return { applied: false as const, reason: "STALE_EVENT" as const };
          }

          const result = await tx.subscription.updateMany({
            where: {
              id: existingByStripeId.id,
              lastStripeEventCreated: existingByStripeId.lastStripeEventCreated,
              lastStripeEventId: existingByStripeId.lastStripeEventId,
            },
            data: {
              status: targetStatus,
              cancelAtPeriodEnd: true,
              lastStripeEventCreated: input.eventCreated,
              lastStripeEventId: input.eventId,
            },
          });

          if (result.count === 0) throw new Error("SUBSCRIPTION_CONCURRENT_RETRY");

          return { applied: true as const, reason: "APPLIED" as const };
        }

        const userId = await resolveUserId(tx, input.subscription);
        if (!userId) {
          return { applied: false as const, reason: "NO_USER" as const };
        }

        const existing = await tx.subscription.findUnique({
          where: { userId },
          select: {
            id: true,
            stripeSubscriptionId: true,
            stripePriceId: true,
            lastStripeEventCreated: true,
            lastStripeEventId: true,
          },
        });

        const currentPeriodStart = new Date((input.subscription.current_period_start ?? 0) * 1000);
        const currentPeriodEnd = new Date((input.subscription.current_period_end ?? 0) * 1000);
        const cancelAtPeriodEnd = !!input.subscription.cancel_at_period_end;

        if (!existing) {
          await tx.subscription.create({
            data: {
              userId,
              stripeSubscriptionId: input.subscription.id,
              stripePriceId: priceId ?? "",
              plan: plan!,
              status: targetStatus,
              currentPeriodStart,
              currentPeriodEnd,
              cancelAtPeriodEnd,
              lastStripeEventCreated: input.eventCreated,
              lastStripeEventId: input.eventId,
            },
          });

          return { applied: true as const, reason: "APPLIED" as const };
        }

        const isDifferentSubscription = existing.stripeSubscriptionId !== input.subscription.id;

        if (isDifferentSubscription) {
          if (input.eventType !== "customer.subscription.created") {
            return {
              applied: false as const,
              reason: "IGNORED_REPLACED_SUBSCRIPTION_UPDATE" as const,
            };
          }

          if (incoming.eventCreated < existing.lastStripeEventCreated) {
            return { applied: false as const, reason: "STALE_EVENT" as const };
          }

          if (
            incoming.eventCreated === existing.lastStripeEventCreated
            && incoming.eventId === existing.lastStripeEventId
          ) {
            return { applied: false as const, reason: "DUPLICATE_EVENT" as const };
          }

          const replacementResult = await tx.subscription.updateMany({
            where: {
              id: existing.id,
              lastStripeEventCreated: existing.lastStripeEventCreated,
              lastStripeEventId: existing.lastStripeEventId,
            },
            data: {
              stripeSubscriptionId: input.subscription.id,
              stripePriceId: priceId ?? existing.stripePriceId,
              plan: plan!,
              status: targetStatus,
              currentPeriodStart,
              currentPeriodEnd,
              cancelAtPeriodEnd,
              lastStripeEventCreated: input.eventCreated,
              lastStripeEventId: input.eventId,
            },
          });

          if (replacementResult.count === 0) throw new Error("SUBSCRIPTION_CONCURRENT_RETRY");

          return { applied: true as const, reason: "APPLIED" as const };
        }

        const recency = compareEventRecency(existing, incoming);
        if (recency === 0) {
          return { applied: false as const, reason: "DUPLICATE_EVENT" as const };
        }
        if (recency < 0) {
          return { applied: false as const, reason: "STALE_EVENT" as const };
        }

        const result = await tx.subscription.updateMany({
          where: {
            id: existing.id,
            lastStripeEventCreated: existing.lastStripeEventCreated,
            lastStripeEventId: existing.lastStripeEventId,
          },
          data: {
            stripeSubscriptionId: input.subscription.id,
            stripePriceId: priceId ?? existing.stripePriceId,
            plan: plan!,
            status: targetStatus,
            currentPeriodStart,
            currentPeriodEnd,
            cancelAtPeriodEnd,
            lastStripeEventCreated: input.eventCreated,
            lastStripeEventId: input.eventId,
          },
        });

        if (result.count === 0) throw new Error("SUBSCRIPTION_CONCURRENT_RETRY");

        return { applied: true as const, reason: "APPLIED" as const };
      });
    } catch (err) {
      if (isRetrySignal(err) || isRetryableUniqueConflict(err)) {
        continue;
      }
      throw err;
    }
  }

  throw new Error("Neizdevas drosi apstradat Stripe subscription notikumu konkurences del");
}
