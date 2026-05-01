import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { stripe, PLAN_PRICE_MAP } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { Plan } from "@prisma/client";

const schema = z.object({
  plan: z.enum(["PAMATI", "IZAUGSME", "MEISTARS"]),
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Nav autorizēts" }, { status: 401 });
    }

    const body = await req.json();
    const { plan } = schema.parse(body);

    const clerkUser = await currentUser();
    if (!clerkUser) {
      return NextResponse.json({ message: "Lietotājs nav atrasts" }, { status: 404 });
    }

    const email = clerkUser.emailAddresses[0]?.emailAddress;
    const name = `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim();

    // Izveido vai atrod lietotāju DB
    const dbUser = await prisma.user.upsert({
      where: { clerkId: userId },
      create: { clerkId: userId, email: email!, name },
      update: { email: email!, name },
    });

    // Izveido vai atrod Stripe klientu
    let stripeCustomerId = dbUser.stripeCustomerId;
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: email!,
        name,
        metadata: { clerkId: userId },
      });
      stripeCustomerId = customer.id;
      await prisma.user.update({
        where: { id: dbUser.id },
        data: { stripeCustomerId },
      });
    }

    // Pārbauda vai jau ir aktīvs abonements
    const existingSub = await prisma.subscription.findUnique({
      where: { userId: dbUser.id },
    });
    if (existingSub && ["ACTIVE", "TRIALING"].includes(existingSub.status)) {
      return NextResponse.json(
        { message: "Jau ir aktīvs abonements. Izmanto portālu, lai mainītu plānu." },
        { status: 400 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: PLAN_PRICE_MAP[plan as Plan], quantity: 1 }],
      success_url: `${appUrl}/dashboard?success=true&plan=${plan.toLowerCase()}`,
      cancel_url: `${appUrl}/#pricing`,
      subscription_data: {
        metadata: { clerkId: userId, plan },
      },
      metadata: { clerkId: userId, plan },
      allow_promotion_codes: true,
      locale: "lv",
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: "Nepareizi dati" }, { status: 400 });
    }
    console.error("[STRIPE_CHECKOUT]", err);
    return NextResponse.json({ message: "Servera kļūda" }, { status: 500 });
  }
}
