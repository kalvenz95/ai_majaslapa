import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getCommunityAccess } from "@/lib/community";
import { getCategories, postInclude, serializePost } from "@/lib/community-data";
import { CommunityLocked } from "@/components/community/CommunityLocked";
import PostClient from "./PostClient";
import type { CommunityMe } from "@/components/community/types";

export const dynamic = "force-dynamic";

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  // ── Vārti ──────────────────────────────────────────────────
  // Tiešs ieraksta URL bez apmaksas rāda aizslēgto stāvokli;
  // ieraksts netiek ielādēts vispār.
  const access = await getCommunityAccess();
  if (!access.ok) return <CommunityLocked reason={access.reason} />;

  const viewer = access.viewer;
  const { id } = await params;

  const post = await prisma.post
    .findUnique({
      where: { id },
      include: {
        ...postInclude(viewer.id),
        comments: {
          orderBy: { createdAt: "asc" },
          include: {
            author: { select: { id: true, name: true, avatarUrl: true, role: true } },
          },
        },
      },
    })
    .catch(() => null);

  if (!post) notFound();

  const categories = await getCategories();

  const me: CommunityMe = {
    id: viewer.id,
    name: viewer.name ?? "Dalībnieks",
    avatarUrl: viewer.avatarUrl,
    isStaff: viewer.isStaff,
    canPost: viewer.canPost,
    restrictedReason: viewer.restrictedReason,
    plan: viewer.plan,
  };

  const comments = post.comments.map((c) => ({
    id: c.id,
    body: c.body,
    parentId: c.parentId,
    createdAt: c.createdAt,
    editedAt: c.editedAt,
    author: {
      id: c.author.id,
      name: c.author.name,
      avatarUrl: c.author.avatarUrl,
      isStaff: c.author.role === "OWNER" || c.author.role === "ADMIN",
    },
  }));

  return (
    <PostClient
      post={JSON.parse(JSON.stringify(serializePost(post)))}
      initialComments={JSON.parse(JSON.stringify(comments))}
      categories={categories}
      me={me}
    />
  );
}
