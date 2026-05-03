import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const { userId } = await auth();

  const post = await prisma.post.findUnique({
    where: { id: params.id },
    include: {
      author: { select: { id: true, name: true, avatarUrl: true } },
      _count: { select: { likes: true, comments: true } },
      comments: {
        orderBy: { createdAt: "asc" },
        include: { author: { select: { id: true, name: true, avatarUrl: true } } },
      },
    },
  });

  if (!post) return NextResponse.json({ error: "Nav atrasts" }, { status: 404 });

  let liked = false;
  if (userId) {
    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (user) {
      const like = await prisma.postLike.findUnique({ where: { postId_userId: { postId: post.id, userId: user.id } } });
      liked = !!like;
    }
  }

  return NextResponse.json({ ...post, liked });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const post = await prisma.post.findUnique({ where: { id: params.id } });
  if (!post || post.authorId !== user.id) {
    return NextResponse.json({ error: "Aizliegts" }, { status: 403 });
  }

  await prisma.post.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
