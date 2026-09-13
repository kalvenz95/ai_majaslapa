import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireCommunityAccess, communityApiError } from "@/lib/community";

/** POST — pārslēdz ieraksta saglabāšanu (grāmatzīme). */
export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const viewer = await requireCommunityAccess();
    const { id } = await params;

    const post = await prisma.post.findUnique({ where: { id }, select: { id: true } });
    if (!post) return NextResponse.json({ error: "Nav atrasts" }, { status: 404 });

    const existing = await prisma.savedPost.findUnique({
      where: { userId_postId: { userId: viewer.id, postId: id } },
    });

    if (existing) {
      await prisma.savedPost.delete({ where: { id: existing.id } });
      return NextResponse.json({ saved: false });
    }

    await prisma.savedPost.create({ data: { userId: viewer.id, postId: id } });
    return NextResponse.json({ saved: true });
  } catch (err) {
    return communityApiError(err);
  }
}
