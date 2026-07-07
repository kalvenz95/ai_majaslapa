import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  findActiveAffiliateByCode,
  normalizeCode,
  REF_COOKIE,
  REF_COOKIE_MAX_AGE,
} from "@/lib/affiliate";

const schema = z.object({ code: z.string().min(1).max(24) });

// Publisks — pārbauda partnera kodu un ieliek to cookie ar atlaidi.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code } = schema.parse(body);

    const affiliate = await findActiveAffiliateByCode(code);
    if (!affiliate) {
      return NextResponse.json(
        { valid: false, message: "Kods nav derīgs vai vairs nav aktīvs." },
        { status: 404 }
      );
    }

    const res = NextResponse.json({
      valid: true,
      code: affiliate.code,
      discountPct: affiliate.discountPct,
      partnerName: affiliate.user?.name ?? null,
    });

    res.cookies.set(REF_COOKIE, normalizeCode(affiliate.code), {
      maxAge: REF_COOKIE_MAX_AGE,
      path: "/",
      sameSite: "lax",
      httpOnly: false, // klients var nolasīt, lai parādītu aktīvo atlaidi
    });

    return res;
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ valid: false, message: "Ievadi kodu" }, { status: 400 });
    }
    console.error("[AFFILIATE_VALIDATE]", err);
    return NextResponse.json({ valid: false, message: "Servera kļūda" }, { status: 500 });
  }
}
