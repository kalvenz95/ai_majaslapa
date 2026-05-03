import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(_req: NextRequest, { params }: { params: { id: string } }) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const existing = await prisma.postLike.findUnique({
    where: { postId_userId: { postId: params.id, userId: user.id } },
  });

  if (existing) {
    await prisma.postLike.delete({ where: { id: existing.id } });
    const count = await prisma.postLike.count({ where: { postId: params.id } });
    return NextResponse.json({ liked: false, count });
  }

  await prisma.postLike.create({ data: { postId: params.id, userId: user.id } });
  const count = await prisma.postLike.count({ where: { postId: params.id } });
  return NextResponse.json({ liked: true, count });
}
