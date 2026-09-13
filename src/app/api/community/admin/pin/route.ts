import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireCommunityStaff, communityApiError } from "@/lib/community";

const schema = z.object({
  postId: z.string().cuid(),
  pinned: z.boolean(),
});

/** POST — piesprauž / atsprauž ierakstu. Tikai moderatoriem. */
export async function POST(req: NextRequest) {
  try {
    await requireCommunityStaff();

    const parsed = schema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Nederīgi dati" }, { status: 400 });
    }

    const post = await prisma.post.update({
      where: { id: parsed.data.postId },
      data: { pinned: parsed.data.pinned },
      select: { id: true, pinned: true },
    });

    return NextResponse.json(post);
  } catch (err) {
    return communityApiError(err);
  }
}
