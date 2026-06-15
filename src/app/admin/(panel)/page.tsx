import {
  Users,
  UserCheck,
  CreditCard,
  AlertCircle,
  Euro,
  UserPlus,
  XCircle,
  Crown,
} from "lucide-react";
import { requireAdmin } from "@/lib/admin";
import { getDashboardStats } from "@/lib/admin-stats";
import { prisma } from "@/lib/prisma";
import { StatCard, PageHeader, Card, Badge, LinkButton } from "@/components/admin/ui";
import {
  formatMoney,
  formatDateTime,
  PLAN_LABELS,
  subscriptionTone,
  SUBSCRIPTION_LABELS,
} from "@/lib/format";

export default async function AdminDashboard() {
  const admin = await requireAdmin();
  const stats = await getDashboardStats();

  // Pēdējie reģistrētie lietotāji
  const recentUsers = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 6,
    include: { subscription: true },
  });

  return (
    <div>
      <PageHeader
        title={`Sveiks, ${admin.name?.split(" ")[0] || "admin"}!`}
        description="Pārskats par platformas lietotājiem, maksājumiem un abonementiem."
      />

      {/* Galvenās statistikas kartītes */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Kopā lietotāji" value={stats.totalUsers} icon={Users} />
        <StatCard
          label="Aktīvie abonenti"
          value={stats.activeSubscribers}
          icon={UserCheck}
          accent="text-emerald-400"
        />
        <StatCard
          label="Samaksājuši"
          value={stats.paidUsers}
          icon={CreditCard}
          accent="text-sky-400"
        />
        <StatCard
          label="Nav samaksājuši"
          value={stats.unpaidUsers}
          icon={AlertCircle}
          accent="text-amber-400"
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Mēneša ieņēmumi"
          value={formatMoney(stats.monthlyRevenue)}
          sub="Samaksātie maksājumi šomēnes"
          icon={Euro}
          accent="text-neon-green"
        />
        <StatCard
          label="Jauni šomēnes"
          value={stats.newUsersThisMonth}
          icon={UserPlus}
          accent="text-purple-400"
        />
        <StatCard
          label="Atceltie abonementi"
          value={stats.canceledSubscriptions}
          icon={XCircle}
          accent="text-red-400"
        />
        <StatCard
          label="Populārākā paka"
          value={stats.topPlan ? PLAN_LABELS[stats.topPlan.plan] : "—"}
          sub={stats.topPlan ? `${stats.topPlan.count} abonenti` : "Nav datu"}
          icon={Crown}
          accent="text-amber-400"
        />
      </div>

      {/* Pēdējie lietotāji */}
      <div className="mt-8">
        <PageHeader title="Jaunākie lietotāji">
          <LinkButton href="/admin/users">Visi lietotāji</LinkButton>
        </PageHeader>
        <Card>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5 text-left text-[12px] uppercase tracking-wide text-white/35">
                <th className="px-5 py-3 font-medium">Lietotājs</th>
                <th className="px-5 py-3 font-medium">Abonements</th>
                <th className="px-5 py-3 font-medium">Reģistrējās</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((u) => (
                <tr
                  key={u.id}
                  className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
                >
                  <td className="px-5 py-3.5">
                    <div className="font-medium text-white">{u.name || "—"}</div>
                    <div className="text-[12px] text-white/40">{u.email}</div>
                  </td>
                  <td className="px-5 py-3.5">
                    {u.subscription ? (
                      <Badge tone={subscriptionTone(u.subscription.status)}>
                        {PLAN_LABELS[u.subscription.plan]} ·{" "}
                        {SUBSCRIPTION_LABELS[u.subscription.status]}
                      </Badge>
                    ) : (
                      <Badge tone="neutral">Bez abonementa</Badge>
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-white/50">
                    {formatDateTime(u.createdAt)}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <LinkButton href={`/admin/users/${u.id}`}>Apskatīt</LinkButton>
                  </td>
                </tr>
              ))}
              {recentUsers.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center text-white/40">
                    Vēl nav neviena lietotāja.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
}
