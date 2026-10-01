import type { Plan } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function markReferralPurchasedForPayment(
  referredUserId: string,
  paymentId: string,
  amountCents: number,
  plan: Plan | null
) {
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
}
