import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getOrCreateAffiliate, getAffiliateStats } from "@/lib/affiliate";

// Autorizēts — atgriež lietotāja partnera kodu, statistiku un pieteikumu sarakstu.
export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Nav autorizēts" }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!dbUser) {
      return NextResponse.json({ message: "Lietotājs nav atrasts" }, { status: 404 });
    }

    const affiliate = await getOrCreateAffiliate(dbUser.id);
    const stats = await getAffiliateStats(affiliate.id);

    const referrals = await prisma.referral.findMany({
      where: { affiliateId: affiliate.id },
      orderBy: { joinedAt: "desc" },
      take: 100,
      include: { referredUser: { select: { name: true, email: true } } },
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    return NextResponse.json({
      code: affiliate.code,
      discountPct: affiliate.discountPct,
      active: affiliate.active,
      shareUrl: `${appUrl}/lv/partneri?ref=${affiliate.code}`,
      stats,
      referrals: referrals.map((r) => ({
        id: r.id,
        // Privātums: rāda tikai maskētu identitāti, ne pilnu e-pastu
        name: r.referredUser?.name || maskEmail(r.referredUser?.email),
        status: r.status,
        plan: r.plan,
        amountCents: r.amountCents,
        joinedAt: r.joinedAt,
        purchasedAt: r.purchasedAt,
      })),
    });
  } catch (err) {
    console.error("[AFFILIATE_ME]", err);
    return NextResponse.json({ message: "Servera kļūda" }, { status: 500 });
  }
}

function maskEmail(email?: string | null): string {
  if (!email) return "Lietotājs";
  const [name, domain] = email.split("@");
  if (!domain) return "Lietotājs";
  const shown = name.slice(0, 2);
  return `${shown}${"•".repeat(Math.max(1, name.length - 2))}@${domain}`;
}
