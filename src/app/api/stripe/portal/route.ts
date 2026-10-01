import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { assertNotBlocked, BlockedUserError } from "@/lib/user-access";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Nav autorizēts" }, { status: 401 });
    }

    await assertNotBlocked(userId);

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user?.stripeCustomerId) {
      return NextResponse.json({ message: "Nav Stripe klienta" }, { status: 404 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${appUrl}/dashboard/abonemets`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    if (err instanceof BlockedUserError) {
      return NextResponse.json({ message: "Konts ir bloķēts" }, { status: 403 });
    }
    console.error("[STRIPE_PORTAL]", err);
    return NextResponse.json({ message: "Servera kļūda" }, { status: 500 });
  }
}
