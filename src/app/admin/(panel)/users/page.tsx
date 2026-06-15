import { Prisma } from "@prisma/client";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { PageHeader, Card, Badge, EmptyState } from "@/components/admin/ui";
import UsersFilterBar from "@/components/admin/UsersFilterBar";
import ExportButton from "@/components/admin/ExportButton";
import Link from "next/link";
import {
  formatDate,
  formatDateTime,
  PLAN_LABELS,
  subscriptionTone,
  SUBSCRIPTION_LABELS,
  USER_STATUS_LABELS,
} from "@/lib/format";

const PAGE_SIZE = 25;

type SearchParams = {
  search?: string;
  filter?: string;
  plan?: string;
  page?: string;
};

function buildWhere(sp: SearchParams): Prisma.UserWhereInput {
  const where: Prisma.UserWhereInput = {};
  const and: Prisma.UserWhereInput[] = [];

  if (sp.search) {
    and.push({
      OR: [
        { name: { contains: sp.search, mode: "insensitive" } },
        { email: { contains: sp.search, mode: "insensitive" } },
        { phone: { contains: sp.search, mode: "insensitive" } },
      ],
    });
  }

  if (sp.plan) {
    and.push({ subscription: { plan: sp.plan as Prisma.EnumPlanFilter["equals"] } });
  }

  switch (sp.filter) {
    case "paid":
      and.push({ payments: { some: { status: "PAID" } } });
      break;
    case "unpaid":
      and.push({ payments: { none: { status: "PAID" } } });
      break;
    case "active":
      and.push({ subscription: { status: { in: ["ACTIVE", "TRIALING"] } } });
      break;
    case "expired":
      and.push({
        subscription: { status: { in: ["CANCELED", "PAST_DUE", "INCOMPLETE"] } },
      });
      break;
  }

  if (and.length) where.AND = and;
  return where;
}

export default async function UsersPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  await requireAdmin();
  const sp = await searchParams;
  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);
  const where = buildWhere(sp);

  const [users, total, totalLessons] = await Promise.all([
    prisma.user.findMany({
      where,
      include: { subscription: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.user.count({ where }),
    prisma.lesson.count(),
  ]);

  // Progresa skaitļi vienā vaicājumā (nevis N+1)
  const ids = users.map((u) => u.id);
  const progressGroups = ids.length
    ? await prisma.lessonProgress.groupBy({
        by: ["userId"],
        where: { userId: { in: ids }, completed: true },
        _count: { _all: true },
      })
    : [];
  const completedByUser = new Map(
    progressGroups.map((g) => [g.userId, g._count._all])
  );

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div>
      <PageHeader title="Lietotāji" description={`Kopā ${total} lietotāji`}>
        <ExportButton type="users" label="Eksportēt CSV" />
      </PageHeader>

      <UsersFilterBar />

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-sm">
            <thead>
              <tr className="border-b border-white/5 text-left text-[12px] uppercase tracking-wide text-white/35">
                <th className="px-5 py-3 font-medium">Vārds / E-pasts</th>
                <th className="px-5 py-3 font-medium">Telefons</th>
                <th className="px-5 py-3 font-medium">Paka</th>
                <th className="px-5 py-3 font-medium">Abonements</th>
                <th className="px-5 py-3 font-medium">Reģistrēts</th>
                <th className="px-5 py-3 font-medium">Aktivitāte</th>
                <th className="px-5 py-3 font-medium">Progress</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const completed = completedByUser.get(u.id) ?? 0;
                const percent =
                  totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;
                return (
                  <tr
                    key={u.id}
                    className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-medium text-white">{u.name || "—"}</span>
                        {u.status === "BLOCKED" && (
                          <Badge tone="red">{USER_STATUS_LABELS.BLOCKED}</Badge>
                        )}
                      </div>
                      <div className="text-[12px] text-white/40">{u.email}</div>
                    </td>
                    <td className="px-5 py-3.5 text-white/55">{u.phone || "—"}</td>
                    <td className="px-5 py-3.5">
                      {u.subscription ? (
                        <Badge tone="neutral">{PLAN_LABELS[u.subscription.plan]}</Badge>
                      ) : (
                        <span className="text-white/30">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      {u.subscription ? (
                        <Badge tone={subscriptionTone(u.subscription.status)}>
                          {SUBSCRIPTION_LABELS[u.subscription.status]}
                        </Badge>
                      ) : (
                        <Badge tone="neutral">Nav</Badge>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-white/50">{formatDate(u.createdAt)}</td>
                    <td className="px-5 py-3.5 text-white/50">
                      {formatDateTime(u.lastLoginAt)}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full bg-neon-green"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <span className="text-[12px] text-white/45">{percent}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <Link
                        href={`/admin/users/${u.id}`}
                        className="rounded-lg border border-white/10 px-3 py-1.5 text-[13px] font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                      >
                        Profils
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {users.length === 0 && (
          <EmptyState
            title="Nav atrasts neviens lietotājs"
            hint="Pamēģini mainīt filtrus vai meklēšanas vārdu."
          />
        )}
      </Card>

      {/* Lapošana */}
      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm text-white/45">
          <span>
            Lapa {page} no {totalPages}
          </span>
          <div className="flex gap-2">
            <PageLink sp={sp} page={page - 1} disabled={page <= 1}>
              ← Iepriekšējā
            </PageLink>
            <PageLink sp={sp} page={page + 1} disabled={page >= totalPages}>
              Nākamā →
            </PageLink>
          </div>
        </div>
      )}
    </div>
  );
}

function PageLink({
  sp,
  page,
  disabled,
  children,
}: {
  sp: SearchParams;
  page: number;
  disabled: boolean;
  children: React.ReactNode;
}) {
  if (disabled) {
    return (
      <span className="cursor-not-allowed rounded-lg border border-white/5 px-3 py-1.5 text-white/20">
        {children}
      </span>
    );
  }
  const params = new URLSearchParams();
  if (sp.search) params.set("search", sp.search);
  if (sp.filter) params.set("filter", sp.filter);
  if (sp.plan) params.set("plan", sp.plan);
  params.set("page", String(page));
  return (
    <Link
      href={`/admin/users?${params.toString()}`}
      className="rounded-lg border border-white/10 px-3 py-1.5 text-white/70 transition-colors hover:bg-white/5 hover:text-white"
    >
      {children}
    </Link>
  );
}
