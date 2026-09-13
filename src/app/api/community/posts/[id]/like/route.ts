import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireCommunityWriter, communityApiError } from "@/lib/community";

/** POST — pārslēdz patīk/nepatīk. Prasa apmaksātu piekļuvi. */
export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const viewer = await requireCommunityWriter();
    const { id } = await params;

    const post = await prisma.post.findUnique({ where: { id }, select: { id: true } });
    if (!post) return NextResponse.json({ error: "Nav atrasts" }, { status: 404 });

    const existing = await prisma.postLike.findUnique({
      where: { postId_userId: { postId: id, userId: viewer.id } },
    });

    if (existing) {
      await prisma.postLike.delete({ where: { id: existing.id } });
    } else {
      await prisma.postLike.create({ data: { postId: id, userId: viewer.id } });
    }

    const count = await prisma.postLike.count({ where: { postId: id } });
    return NextResponse.json({ liked: !existing, count });
  } catch (err) {
    return communityApiError(err);
  }
}
