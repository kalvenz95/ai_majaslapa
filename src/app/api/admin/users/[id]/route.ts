import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireApiPermission, adminApiError } from "@/lib/admin";
import { Plan, SubscriptionStatus } from "@prisma/client";

const bodySchema = z.discriminatedUnion("action", [
  z.object({ action: z.literal("block") }),
  z.object({ action: z.literal("unblock") }),
  z.object({ action: z.literal("setPlan"), plan: z.nativeEnum(Plan) }),
  z.object({ action: z.literal("grantAccess"), plan: z.nativeEnum(Plan), months: z.number().min(1).max(36).optional() }),
  z.object({ action: z.literal("revokeAccess") }),
  z.object({
    action: z.literal("updateProfile"),
    name: z.string().max(120).optional(),
    phone: z.string().max(40).optional(),
  }),
]);

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const json = await req.json();
    const data = bodySchema.parse(json);

    // Bloķēšana/atbloķēšana un profila izmaiņas — users.edit
    // Pakas/piekļuves izmaiņas — payments.edit (SUPPORT nedrīkst)
    const needsPayments = ["setPlan", "grantAccess", "revokeAccess"].includes(data.action);
    await requireApiPermission(needsPayments ? "payments.edit" : "users.edit");

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return NextResponse.json({ message: "Lietotājs nav atrasts" }, { status: 404 });
    }

    switch (data.action) {
      case "block":
        await prisma.user.update({
          where: { id },
          data: { status: "BLOCKED", blockedAt: new Date() },
        });
        break;

      case "unblock":
        await prisma.user.update({
          where: { id },
          data: { status: "ACTIVE", blockedAt: null },
        });
        break;

      case "updateProfile":
        await prisma.user.update({
          where: { id },
          data: { name: data.name ?? user.name, phone: data.phone ?? user.phone },
        });
        break;

      case "setPlan":
        await prisma.subscription.update({
          where: { userId: id },
          data: { plan: data.plan },
        });
        break;

      case "grantAccess": {
        // Manuāla piekļuves piešķiršana (admin override, bez Stripe)
        const now = new Date();
        const end = new Date(now);
        end.setMonth(end.getMonth() + (data.months ?? 12));
        await prisma.subscription.upsert({
          where: { userId: id },
          create: {
            userId: id,
            plan: data.plan,
            status: SubscriptionStatus.ACTIVE,
            stripeSubscriptionId: `manual_${id}`,
            stripePriceId: "manual",
            currentPeriodStart: now,
            currentPeriodEnd: end,
            cancelAtPeriodEnd: false,
          },
          update: {
            plan: data.plan,
            status: SubscriptionStatus.ACTIVE,
            currentPeriodStart: now,
            currentPeriodEnd: end,
            cancelAtPeriodEnd: false,
          },
        });
        break;
      }

      case "revokeAccess":
        await prisma.subscription.updateMany({
          where: { userId: id },
          data: { status: SubscriptionStatus.CANCELED, cancelAtPeriodEnd: true },
        });
        break;
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: "Nederīgi dati" }, { status: 400 });
    }
    return adminApiError(err);
  }
}
