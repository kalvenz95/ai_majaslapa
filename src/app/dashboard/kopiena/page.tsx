import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import CommunityClient from "./CommunityClient";

const CATEGORIES = ["Visi", "Vispārīgi", "Jautājumi", "Dalies ar progresu", "Padomi", "Inspirācija"];

export default async function KopienasPage() {
  const { userId } = await auth();
  const clerkUser = await currentUser();

  const user = userId ? await prisma.user.findUnique({ where: { clerkId: userId } }).catch(() => null) : null;

  const posts = await prisma.post.findMany({
    orderBy: [{ pinned: "desc" }, { createdAt: "desc" }],
    take: 30,
    include: {
      author: { select: { id: true, name: true, avatarUrl: true } },
      _count: { select: { likes: true, comments: true } },
    },
  }).catch(() => [] as any[]);

  let likedPostIds: string[] = [];
  if (user) {
    const likes = await prisma.postLike.findMany({
      where: { userId: user.id, postId: { in: posts.map((p: any) => p.id) } },
      select: { postId: true },
    }).catch(() => [] as any[]);
    likedPostIds = likes.map((l: any) => l.postId);
  }

  const postsWithLiked = posts.map((p) => ({ ...p, liked: likedPostIds.includes(p.id) }));

  const currentUserData = user
    ? {
        id: user.id,
        name: clerkUser?.firstName
          ? `${clerkUser.firstName} ${clerkUser.lastName ?? ""}`.trim()
          : user.name ?? "Lietotājs",
        avatarUrl: clerkUser?.imageUrl ?? user.avatarUrl,
      }
    : null;

  return (
    <CommunityClient
      initialPosts={postsWithLiked}
      categories={CATEGORIES}
      currentUser={currentUserData}
    />
  );
}
