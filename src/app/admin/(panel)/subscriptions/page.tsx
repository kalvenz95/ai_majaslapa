import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { Prisma, SubscriptionStatus } from "@prisma/client";
import { PageHeader, Card, Badge, EmptyState, StatCard } from "@/components/admin/ui";
import ExportButton from "@/components/admin/ExportButton";
import {
  formatDate,
  PLAN_LABELS,
  subscriptionTone,
  SUBSCRIPTION_LABELS,
} from "@/lib/format";
import { Repeat, AlertTriangle } from "lucide-react";

const TABS: { value: string; label: string }[] = [
  { value: "", label: "Visi" },
  { value: "ACTIVE", label: "Aktīvs" },
  { value: "TRIALING", label: "Izmēģinājums" },
  { value: "PAST_DUE", label: "Kavēts" },
  { value: "CANCELED", label: "Atcelts" },
  { value: "INCOMPLETE", label: "Nepabeigts" },
];

export default async function SubscriptionsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  await requireAdmin();
  const sp = await searchParams;
  const status = sp.status as SubscriptionStatus | undefined;
  const where: Prisma.SubscriptionWhereInput = status ? { status } : {};

  const [subs, activeCount, pastDueCount] = await Promise.all([
    prisma.subscription.findMany({
      where,
      include: { user: true },
      orderBy: { currentPeriodEnd: "desc" },
      take: 100,
    }),
    prisma.subscription.count({ where: { status: { in: ["ACTIVE", "TRIALING"] } } }),
    prisma.subscription.count({ where: { status: "PAST_DUE" } }),
  ]);

  return (
    <div>
      <PageHeader title="Abonementi" description="Lietotāju abonementu pārvaldība.">
        <ExportButton type="subscriptions" label="Eksportēt CSV" />
      </PageHeader>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatCard label="Aktīvie abonementi" value={activeCount} icon={Repeat} accent="text-emerald-400" />
        <StatCard label="Kavēti maksājumi" value={pastDueCount} icon={AlertTriangle} accent="text-amber-400" />
      </div>

      <div className="mb-4 flex flex-wrap gap-1 rounded-lg border border-white/10 bg-[#10101c] p-1">
        {TABS.map((t) => {
          const active = (sp.status ?? "") === t.value;
          return (
            <Link
              key={t.value}
              href={t.value ? `/admin/subscriptions?status=${t.value}` : "/admin/subscriptions"}
              className={`rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors ${
                active ? "bg-neon-green/10 text-neon-green" : "text-white/50 hover:text-white"
              }`}
            >
              {t.label}
            </Link>
          );
        })}
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-white/5 text-left text-[12px] uppercase tracking-wide text-white/35">
                <th className="px-5 py-3 font-medium">Lietotājs</th>
                <th className="px-5 py-3 font-medium">Paka</th>
                <th className="px-5 py-3 font-medium">Statuss</th>
                <th className="px-5 py-3 font-medium">Sākās</th>
                <th className="px-5 py-3 font-medium">Beidzas</th>
                <th className="px-5 py-3 font-medium">Atcelšana</th>
              </tr>
            </thead>
            <tbody>
              {subs.map((s) => (
                <tr key={s.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                  <td className="px-5 py-3.5">
                    <Link
                      href={`/admin/users/${s.userId}`}
                      className="font-medium text-white hover:text-neon-green"
                    >
                      {s.user.name || s.user.email}
                    </Link>
                    <div className="text-[12px] text-white/40">{s.user.email}</div>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge tone="neutral">{PLAN_LABELS[s.plan]}</Badge>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge tone={subscriptionTone(s.status)}>{SUBSCRIPTION_LABELS[s.status]}</Badge>
                  </td>
                  <td className="px-5 py-3.5 text-white/55">{formatDate(s.currentPeriodStart)}</td>
                  <td className="px-5 py-3.5 text-white/55">{formatDate(s.currentPeriodEnd)}</td>
                  <td className="px-5 py-3.5">
                    {s.cancelAtPeriodEnd ? (
                      <Badge tone="amber">Atcels perioda beigās</Badge>
                    ) : (
                      <span className="text-white/30">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {subs.length === 0 && <EmptyState title="Nav abonementu" />}
      </Card>
    </div>
  );
}
