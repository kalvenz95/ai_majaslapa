-- CreateTable
CREATE TABLE "ReferralPaymentCredit" (
    "paymentId" TEXT NOT NULL,
    "referralId" TEXT NOT NULL,
    "amountCents" INTEGER NOT NULL,
    "plan" "Plan",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ReferralPaymentCredit_pkey" PRIMARY KEY ("paymentId")
);

-- CreateIndex
CREATE INDEX "ReferralPaymentCredit_referralId_idx" ON "ReferralPaymentCredit"("referralId");

-- AddForeignKey
ALTER TABLE "ReferralPaymentCredit" ADD CONSTRAINT "ReferralPaymentCredit_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "Payment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReferralPaymentCredit" ADD CONSTRAINT "ReferralPaymentCredit_referralId_fkey" FOREIGN KEY ("referralId") REFERENCES "Referral"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Backfill ledger for historical paid referral payments so replayed Stripe events
-- do not increment partner earnings again after rollout.
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
ON CONFLICT ("paymentId") DO NOTHING;

