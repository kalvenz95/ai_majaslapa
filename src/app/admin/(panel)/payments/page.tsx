import Link from "next/link";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { Prisma, PaymentStatus } from "@prisma/client";
import { PageHeader, Card, Badge, EmptyState, StatCard } from "@/components/admin/ui";
import ExportButton from "@/components/admin/ExportButton";
import {
  formatMoney,
  formatDateTime,
  PLAN_LABELS,
  paymentTone,
  PAYMENT_LABELS,
} from "@/lib/format";
import { Euro, CheckCircle2 } from "lucide-react";

const TABS: { value: string; label: string }[] = [
  { value: "", label: "Visi" },
  { value: "PAID", label: "Samaksāts" },
  { value: "PENDING", label: "Gaida" },
  { value: "FAILED", label: "Neizdevās" },
  { value: "REFUNDED", label: "Atmaksāts" },
  { value: "CANCELED", label: "Atcelts" },
];

export default async function PaymentsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  await requireAdmin();
  const sp = await searchParams;
  const status = sp.status as PaymentStatus | undefined;

  const where: Prisma.PaymentWhereInput = status ? { status } : {};

  const [payments, totalPaidAgg, paidCount] = await Promise.all([
    prisma.payment.findMany({
      where,
      include: { user: true },
      orderBy: { createdAt: "desc" },
      take: 100,
    }),
    prisma.payment.aggregate({ _sum: { amount: true }, where: { status: "PAID" } }),
    prisma.payment.count({ where: { status: "PAID" } }),
  ]);

  return (
    <div>
      <PageHeader title="Maksājumi" description="Visi platformas maksājumi caur Stripe.">
        <ExportButton type="payments" label="Eksportēt CSV" />
      </PageHeader>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <StatCard
          label="Kopējie ieņēmumi"
          value={formatMoney(totalPaidAgg._sum.amount ?? 0)}
          icon={Euro}
          accent="text-neon-green"
        />
        <StatCard
          label="Samaksātie maksājumi"
          value={paidCount}
          icon={CheckCircle2}
          accent="text-emerald-400"
        />
      </div>

      {/* Statusa filtru cilnes */}
      <div className="mb-4 flex flex-wrap gap-1 rounded-lg border border-white/10 bg-[#10101c] p-1">
        {TABS.map((t) => {
          const active = (sp.status ?? "") === t.value;
          return (
            <Link
              key={t.value}
              href={t.value ? `/admin/payments?status=${t.value}` : "/admin/payments"}
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
          <table className="w-full min-w-[760px] text-sm">
            <thead>
              <tr className="border-b border-white/5 text-left text-[12px] uppercase tracking-wide text-white/35">
                <th className="px-5 py-3 font-medium">Datums</th>
                <th className="px-5 py-3 font-medium">Lietotājs</th>
                <th className="px-5 py-3 font-medium">Summa</th>
                <th className="px-5 py-3 font-medium">Paka</th>
                <th className="px-5 py-3 font-medium">Statuss</th>
                <th className="px-5 py-3 font-medium">Provaiders</th>
                <th className="px-5 py-3 font-medium">Rēķins</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                  <td className="px-5 py-3.5 text-white/55">
                    {formatDateTime(p.paidAt ?? p.createdAt)}
                  </td>
                  <td className="px-5 py-3.5">
                    <Link
                      href={`/admin/users/${p.userId}`}
                      className="font-medium text-white hover:text-neon-green"
                    >
                      {p.user.name || p.user.email}
                    </Link>
                    <div className="text-[12px] text-white/40">{p.user.email}</div>
                  </td>
                  <td className="px-5 py-3.5 font-medium text-white">
                    {formatMoney(p.amount, p.currency)}
                  </td>
                  <td className="px-5 py-3.5 text-white/55">
                    {p.plan ? PLAN_LABELS[p.plan] : "—"}
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge tone={paymentTone(p.status)}>{PAYMENT_LABELS[p.status]}</Badge>
                  </td>
                  <td className="px-5 py-3.5 capitalize text-white/55">{p.provider}</td>
                  <td className="px-5 py-3.5">
                    {p.invoiceUrl ? (
                      <a
                        href={p.invoiceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[13px] text-neon-green hover:underline"
                      >
                        Atvērt
                      </a>
                    ) : (
                      <span className="text-white/25">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {payments.length === 0 && (
          <EmptyState
            title="Nav maksājumu"
            hint="Maksājumi parādīsies šeit, kad lietotāji veiks pirkumus caur Stripe."
          />
        )}
      </Card>
    </div>
  );
}
