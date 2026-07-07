import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { stripe, PLAN_PRICE_MAP } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { Plan } from "@prisma/client";
import {
  REF_COOKIE,
  findActiveAffiliateByCode,
  getOrCreateDiscountCoupon,
  claimReferral,
} from "@/lib/affiliate";

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

    // ── Partnera kods: atlaide + atribūcija ──────────────────
    // Nolasa kodu no cookie; ja derīgs un nav pašpiesaiste — pielieto
    // Stripe atlaidi un piesaista lietotāju partnerim (JOINED), lai
    // pēc maksājuma webhook to atzīmētu kā PURCHASED.
    const refCode = req.cookies.get(REF_COOKIE)?.value;
    let discountCoupon: string | null = null;
    let affiliateCode: string | null = null;

    if (refCode) {
      const affiliate = await findActiveAffiliateByCode(refCode);
      if (affiliate && affiliate.userId !== dbUser.id) {
        affiliateCode = affiliate.code;
        try {
          discountCoupon = await getOrCreateDiscountCoupon(affiliate.discountPct);
        } catch (e) {
          console.error("[AFFILIATE_COUPON]", e);
        }
        await claimReferral(dbUser.id, affiliate.code).catch(() => null);
      }
    }

    const metadata: Record<string, string> = { clerkId: userId, plan };
    if (affiliateCode) metadata.affiliateCode = affiliateCode;

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: PLAN_PRICE_MAP[plan as Plan], quantity: 1 }],
      success_url: `${appUrl}/dashboard?success=true&plan=${plan.toLowerCase()}`,
      cancel_url: `${appUrl}/#pricing`,
      subscription_data: {
        metadata,
      },
      metadata,
      // Stripe neatļauj vienlaikus atlaides kuponu un promo kodu ievadi
      ...(discountCoupon
        ? { discounts: [{ coupon: discountCoupon }] }
        : { allow_promotion_codes: true }),
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
