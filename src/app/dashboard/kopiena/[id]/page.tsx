import { auth, currentUser } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PostClient from "./PostClient";

export default async function PostPage({ params }: { params: { id: string } }) {
  const { userId } = await auth();
  const clerkUser = await currentUser();

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

  if (!post) notFound();

  const user = userId ? await prisma.user.findUnique({ where: { clerkId: userId } }) : null;

  let liked = false;
  if (user) {
    const like = await prisma.postLike.findUnique({
      where: { postId_userId: { postId: post.id, userId: user.id } },
    });
    liked = !!like;
  }

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
    <PostClient
      post={{ ...post, liked }}
      currentUser={currentUserData}
    />
  );
}
