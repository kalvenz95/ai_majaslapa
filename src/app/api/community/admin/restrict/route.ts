import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import {
  requireCommunityStaff,
  communityApiError,
  CommunityError,
} from "@/lib/community";
import { Role } from "@prisma/client";

const schema = z.object({
  userId: z.string().cuid(),
  /** true = aizliegt publicēt, false = atjaunot */
  restricted: z.boolean(),
  reason: z.string().trim().max(200).optional(),
});

/**
 * POST — ierobežo vai atjauno dalībnieka tiesības publicēt.
 * Lasīt kopienu viņš joprojām drīkst — tikai rakstīšana tiek apturēta.
 */
export async function POST(req: NextRequest) {
  try {
    const staff = await requireCommunityStaff();

    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Nederīgi dati" }, { status: 400 });
    }
    const { userId, restricted, reason } = parsed.data;

    if (userId === staff.id) {
      throw new CommunityError("Nevar ierobežot pats sevi", 400);
    }

    const target = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, role: true },
    });
    if (!target) return NextResponse.json({ error: "Nav atrasts" }, { status: 404 });

    // Moderatoru nevar apklusināt — tikai īpašnieks maina lomas admin panelī
    if (target.role === Role.OWNER || target.role === Role.ADMIN) {
      throw new CommunityError("Moderatoru nevar ierobežot", 403);
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        communityRestrictedAt: restricted ? new Date() : null,
        communityRestrictedReason: restricted
          ? reason || "Tava iespēja publicēt kopienā ir īslaicīgi ierobežota."
          : null,
      },
      select: { id: true, communityRestrictedAt: true, communityRestrictedReason: true },
    });

    return NextResponse.json(updated);
  } catch (err) {
    return communityApiError(err);
  }
}
