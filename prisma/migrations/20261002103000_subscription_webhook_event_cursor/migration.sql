ALTER TABLE "Subscription"
  ADD COLUMN "lastStripeEventCreated" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "lastStripeEventId" TEXT;
