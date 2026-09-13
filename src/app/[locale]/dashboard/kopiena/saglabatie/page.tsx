import { prisma } from "@/lib/prisma";
import { getCommunityAccess } from "@/lib/community";
import { getCategories, postInclude, serializePost } from "@/lib/community-data";
import { CommunityLocked } from "@/components/community/CommunityLocked";
import { CommunityFeed } from "@/components/community/CommunityFeed";
import type { CommunityMe } from "@/components/community/types";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 20;

/** Saglabātie ieraksti — tikai paša lietotāja grāmatzīmes. */
export default async function SaglabatiePage() {
  const access = await getCommunityAccess();
  if (!access.ok) return <CommunityLocked reason={access.reason} />;

  const viewer = access.viewer;
  const where = { saves: { some: { userId: viewer.id } } };

  const [posts, total, categories] = await Promise.all([
    prisma.post
      .findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: PAGE_SIZE,
        include: postInclude(viewer.id),
      })
      .catch(() => []),
    prisma.post.count({ where }).catch(() => 0),
    getCategories(),
  ]);

  const me: CommunityMe = {
    id: viewer.id,
    name: viewer.name ?? "Dalībnieks",
    avatarUrl: viewer.avatarUrl,
    isStaff: viewer.isStaff,
    canPost: viewer.canPost,
    restrictedReason: viewer.restrictedReason,
    plan: viewer.plan,
  };

  return (
    <CommunityFeed
      initialPosts={JSON.parse(JSON.stringify(posts.map(serializePost)))}
      initialTotal={total}
      initialPages={Math.max(1, Math.ceil(total / PAGE_SIZE))}
      categories={categories}
      me={me}
      savedOnly
    />
  );
}
