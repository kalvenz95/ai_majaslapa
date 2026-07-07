import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import type { Plan } from "@prisma/client";

// Cookie, kurā glabā ievadīto partnera kodu (30 dienas)
export const REF_COOKIE = "chademy_ref";
export const REF_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 dienas sekundēs

// Noklusētā atlaide, ko saņem apmeklētājs, izmantojot kodu.
export const DEFAULT_DISCOUNT_PCT = 15;

// Kodā atļautie simboli — bez neskaidriem (0/O, 1/I) lai viegli nolasīt/pateikt.
const CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

/** Notīra brīvi ievadītu kodu uz kanonisko formu (lielie burti, tikai alfanum). */
export function normalizeCode(raw: string): string {
  return (raw || "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 24);
}

function randomSuffix(len = 4): string {
  let out = "";
  for (let i = 0; i < len; i++) {
    out += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
  }
  return out;
}

/** Ģenerē cilvēkam draudzīgu bāzi no vārda/e-pasta (piem. "KALVIS"). */
function codeBase(name?: string | null, email?: string | null): string {
  const source =
    (name && name.trim()) ||
    (email ? email.split("@")[0] : "") ||
    "CHADEMY";
  const base = normalizeCode(source).slice(0, 6);
  return base.length >= 3 ? base : "PARTN";
}

/**
 * Atgriež lietotāja partnera profilu, vajadzības gadījumā to izveidojot.
 * Kods tiek ģenerēts unikāls (bāze + nejaušs sufikss).
 */
export async function getOrCreateAffiliate(userId: string) {
  const existing = await prisma.affiliate.findUnique({ where: { userId } });
  if (existing) return existing;

  const user = await prisma.user.findUnique({ where: { id: userId } });
  const base = codeBase(user?.name, user?.email);

  // Mēģina dažas reizes, ja kods sakrīt
  for (let attempt = 0; attempt < 6; attempt++) {
    const code = `${base}${randomSuffix(attempt < 2 ? 3 : 5)}`;
    const clash = await prisma.affiliate.findUnique({ where: { code } });
    if (clash) continue;
    try {
      return await prisma.affiliate.create({
        data: { userId, code, discountPct: DEFAULT_DISCOUNT_PCT },
      });
    } catch {
      // sacensība uz unikālo kodu — mēģina vēlreiz
    }
  }
  throw new Error("Neizdevās izveidot unikālu partnera kodu");
}

/** Meklē aktīvu partnera profilu pēc koda (validācijai). */
export async function findActiveAffiliateByCode(rawCode: string) {
  const code = normalizeCode(rawCode);
  if (!code) return null;
  const affiliate = await prisma.affiliate.findUnique({
    where: { code },
    include: { user: { select: { name: true } } },
  });
  if (!affiliate || !affiliate.active) return null;
  return affiliate;
}

export interface AffiliateStats {
  signups: number; // cik pievienojušies ar kodu
  purchases: number; // cik iegādājušies
  revenueCents: number; // kopējais ieņēmums caur kodu (centos)
  conversionPct: number; // pirkumi / pievienošanās
}

/** Apkopo partnera statistiku. */
export async function getAffiliateStats(affiliateId: string): Promise<AffiliateStats> {
  const [signups, purchases, agg] = await Promise.all([
    prisma.referral.count({ where: { affiliateId } }),
    prisma.referral.count({ where: { affiliateId, status: "PURCHASED" } }),
    prisma.referral.aggregate({
      where: { affiliateId },
      _sum: { amountCents: true },
    }),
  ]);
  return {
    signups,
    purchases,
    revenueCents: agg._sum.amountCents ?? 0,
    conversionPct: signups > 0 ? Math.round((purchases / signups) * 100) : 0,
  };
}

/**
 * Piesaista lietotāju partnera kodam (statuss JOINED), ja viņš vēl nav
 * piesaistīts un tas nav pašpiesaiste. Droši izsaucams atkārtoti.
 */
export async function claimReferral(referredUserId: string, rawCode: string) {
  const affiliate = await findActiveAffiliateByCode(rawCode);
  if (!affiliate) return null;

  // Nedrīkst piesaistīt sev pašam
  if (affiliate.userId === referredUserId) return null;

  const already = await prisma.referral.findUnique({ where: { referredUserId } });
  if (already) return already;

  try {
    return await prisma.referral.create({
      data: { affiliateId: affiliate.id, referredUserId, status: "JOINED" },
    });
  } catch {
    // sacensība — jau izveidots citā pieprasījumā
    return prisma.referral.findUnique({ where: { referredUserId } });
  }
}

/**
 * Atzīmē lietotāja referral kā PURCHASED un pieskaita samaksāto summu.
 * Izsauc no Stripe webhook pēc veiksmīga maksājuma.
 */
export async function markReferralPurchased(
  referredUserId: string,
  amountCents: number,
  plan: Plan | null
) {
  const referral = await prisma.referral.findUnique({ where: { referredUserId } });
  if (!referral) return null;

  return prisma.referral.update({
    where: { referredUserId },
    data: {
      status: "PURCHASED",
      amountCents: { increment: amountCents },
      plan: plan ?? referral.plan,
      purchasedAt: referral.purchasedAt ?? new Date(),
    },
  });
}

// ── Stripe atlaides kupons ───────────────────────────────────
// Vienu atkārtoti lietojamu kuponu katram atlaides procentam.
const couponCache = new Map<number, string>();

/** Atrod vai izveido Stripe kuponu ar norādīto atlaidi (%). */
export async function getOrCreateDiscountCoupon(percent: number): Promise<string> {
  const pct = Math.max(1, Math.min(100, Math.round(percent)));
  const cached = couponCache.get(pct);
  if (cached) return cached;

  const couponId = `chademy-aff-${pct}`;
  try {
    const existing = await stripe.coupons.retrieve(couponId);
    couponCache.set(pct, existing.id);
    return existing.id;
  } catch {
    const coupon = await stripe.coupons.create({
      id: couponId,
      percent_off: pct,
      duration: "once", // atlaide pirmajam maksājumam
      name: `Partnera atlaide -${pct}%`,
    });
    couponCache.set(pct, coupon.id);
    return coupon.id;
  }
}
