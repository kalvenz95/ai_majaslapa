import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const page = parseInt(searchParams.get("page") ?? "1");
  const limit = 20;

  const where = category && category !== "Visi" ? { category } : {};

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where,
      orderBy: [{ pinned: "desc" }, { createdAt: "desc" }],
      skip: (page - 1) * limit,
      take: limit,
      include: {
        author: { select: { id: true, name: true, avatarUrl: true } },
        _count: { select: { likes: true, comments: true } },
      },
    }),
    prisma.post.count({ where }),
  ]);

  // Pievienojam current user likes
  const { userId } = await auth();
  let likedPostIds: string[] = [];
  if (userId) {
    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (user) {
      const likes = await prisma.postLike.findMany({
        where: { userId: user.id, postId: { in: posts.map((p) => p.id) } },
        select: { postId: true },
      });
      likedPostIds = likes.map((l) => l.postId);
    }
  }

  return NextResponse.json({
    posts: posts.map((p) => ({ ...p, liked: likedPostIds.includes(p.id) })),
    total,
    pages: Math.ceil(total / limit),
  });
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const { title, body, category } = await req.json();
  if (!title?.trim() || !body?.trim()) {
    return NextResponse.json({ error: "Virsraksts un teksts ir obligāti" }, { status: 400 });
  }

  const post = await prisma.post.create({
    data: { authorId: user.id, title: title.trim(), body: body.trim(), category: category ?? "Vispārīgi" },
    include: {
      author: { select: { id: true, name: true, avatarUrl: true } },
      _count: { select: { likes: true, comments: true } },
    },
  });

  return NextResponse.json({ ...post, liked: false }, { status: 201 });
}
