import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const { body } = await req.json();
  if (!body?.trim()) return NextResponse.json({ error: "Teksts ir tukšs" }, { status: 400 });

  const comment = await prisma.postComment.create({
    data: { postId: params.id, authorId: user.id, body: body.trim() },
    include: { author: { select: { id: true, name: true, avatarUrl: true } } },
  });

  return NextResponse.json(comment, { status: 201 });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const { commentId } = await req.json();
  const comment = await prisma.postComment.findUnique({ where: { id: commentId } });
  if (!comment || comment.authorId !== user.id) {
    return NextResponse.json({ error: "Aizliegts" }, { status: 403 });
  }

  await prisma.postComment.delete({ where: { id: commentId } });
  return NextResponse.json({ success: true });
}
