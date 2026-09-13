import { requirePermission } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { PageHeader, StatCard } from "@/components/admin/ui";
import CommunityCategoryManager from "@/components/admin/CommunityCategoryManager";
import CommunityRestrictions from "@/components/admin/CommunityRestrictions";
import { DEFAULT_CATEGORIES } from "@/lib/community-categories";
import { MessageSquare, Users, Flag } from "lucide-react";

export const dynamic = "force-dynamic";

/** Kopienas moderācija — kategorijas, statistika, ierobežotie dalībnieki. */
export default async function AdminCommunityPage() {
  await requirePermission("community.moderate");

  const [categories, posts, comments, restricted] = await Promise.all([
    prisma.communityCategory.findMany({ orderBy: { order: "asc" } }).catch(() => []),
    prisma.post.count().catch(() => 0),
    prisma.postComment.count().catch(() => 0),
    prisma.user
      .findMany({
        where: { communityRestrictedAt: { not: null } },
        select: {
          id: true,
          name: true,
          email: true,
          communityRestrictedAt: true,
          communityRestrictedReason: true,
        },
        orderBy: { communityRestrictedAt: "desc" },
      })
      .catch(() => []),
  ]);

  return (
    <div>
      <PageHeader
        title="Kopiena"
        description="Chademy Community moderācija — kategorijas un dalībnieku tiesības."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard label="Ieraksti" value={posts} icon={MessageSquare} />
        <StatCard label="Komentāri" value={comments} icon={Users} />
        <StatCard
          label="Ierobežoti dalībnieki"
          value={restricted.length}
          icon={Flag}
          accent="text-amber-400"
        />
      </div>

      <h2 className="mb-3 text-sm font-semibold text-white/80">Kategorijas</h2>
      {categories.length === 0 ? (
        <div className="mb-8 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-[13px] text-amber-400/90">
          Kategorijas vēl nav DB. Kopiena pagaidām lieto {DEFAULT_CATEGORIES.length} noklusējuma
          kategorijas — palaid <code className="font-mono">npm run db:seed</code>, lai tās ierakstītu
          un varētu rediģēt šeit.
        </div>
      ) : (
        <div className="mb-8">
          <CommunityCategoryManager
            initial={categories.map((c) => ({
              id: c.id,
              slug: c.slug,
              label: c.label,
              emoji: c.emoji,
              color: c.color,
              order: c.order,
              adminOnly: c.adminOnly,
              active: c.active,
            }))}
          />
        </div>
      )}

      <h2 className="mb-3 text-sm font-semibold text-white/80">Ierobežotie dalībnieki</h2>
      <CommunityRestrictions
        initial={restricted.map((u) => ({
          id: u.id,
          name: u.name,
          email: u.email,
          restrictedAt: u.communityRestrictedAt!.toISOString(),
          reason: u.communityRestrictedReason,
        }))}
      />
    </div>
  );
}
