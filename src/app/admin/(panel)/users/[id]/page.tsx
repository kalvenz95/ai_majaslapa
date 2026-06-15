import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, Calendar, Clock, CreditCard } from "lucide-react";
import { requireAdmin, can, ROLE_LABELS } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { Card, Badge } from "@/components/admin/ui";
import UserActions from "@/components/admin/UserActions";
import UserNotes from "@/components/admin/UserNotes";
import {
  formatDate,
  formatDateTime,
  formatMoney,
  PLAN_LABELS,
  subscriptionTone,
  SUBSCRIPTION_LABELS,
  paymentTone,
  PAYMENT_LABELS,
} from "@/lib/format";

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const admin = await requireAdmin();
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      subscription: true,
      payments: { orderBy: { createdAt: "desc" } },
      notes: { include: { admin: true }, orderBy: { createdAt: "desc" } },
    },
  });
  if (!user) notFound();

  // Kursu progress
  const courses = await prisma.course.findMany({
    include: { _count: { select: { lessons: true } } },
    orderBy: { order: "asc" },
  });
  const completedProgress = await prisma.lessonProgress.findMany({
    where: { userId: id, completed: true },
    include: { lesson: { select: { courseId: true, title: true } } },
    orderBy: { completedAt: "desc" },
  });
  const completedByCourse = new Map<string, number>();
  for (const p of completedProgress) {
    const c = p.lesson.courseId;
    completedByCourse.set(c, (completedByCourse.get(c) ?? 0) + 1);
  }

  const canEdit = can(admin.role, "users.edit");
  const canEditPayments = can(admin.role, "payments.edit");
  const canNotes = can(admin.role, "users.notes");

  return (
    <div>
      <Link
        href="/admin/users"
        className="mb-4 inline-flex items-center gap-1.5 text-[13px] text-white/45 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" /> Atpakaļ uz lietotājiem
      </Link>

      {/* Galvene */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-neon-green/10 text-xl font-semibold text-neon-green ring-1 ring-neon-green/20">
            {(user.name || user.email).charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-white">{user.name || "Nav vārda"}</h1>
              {user.status === "BLOCKED" && <Badge tone="red">Bloķēts</Badge>}
              {user.role !== "USER" && <Badge tone="purple">{ROLE_LABELS[user.role]}</Badge>}
            </div>
            <p className="text-sm text-white/45">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Kreisā kolonna */}
        <div className="space-y-6 lg:col-span-2">
          {/* Pamatinformācija */}
          <Card className="p-5">
            <h2 className="mb-4 text-sm font-semibold text-white">Pamatinformācija</h2>
            <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              <Info icon={Mail} label="E-pasts" value={user.email} />
              <Info icon={Phone} label="Telefons" value={user.phone || "—"} />
              <Info icon={Calendar} label="Reģistrējās" value={formatDateTime(user.createdAt)} />
              <Info icon={Clock} label="Pēdējā aktivitāte" value={formatDateTime(user.lastLoginAt)} />
            </dl>
          </Card>

          {/* Abonements */}
          <Card className="p-5">
            <h2 className="mb-4 text-sm font-semibold text-white">Abonements</h2>
            {user.subscription ? (
              <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                <Info label="Paka" value={PLAN_LABELS[user.subscription.plan]} />
                <Info
                  label="Statuss"
                  value={
                    <Badge tone={subscriptionTone(user.subscription.status)}>
                      {SUBSCRIPTION_LABELS[user.subscription.status]}
                    </Badge>
                  }
                />
                <Info label="Sākās" value={formatDate(user.subscription.currentPeriodStart)} />
                <Info label="Beidzas" value={formatDate(user.subscription.currentPeriodEnd)} />
              </dl>
            ) : (
              <p className="text-sm text-white/40">Lietotājam nav aktīva abonementa.</p>
            )}
          </Card>

          {/* Maksājumu vēsture */}
          <Card>
            <div className="border-b border-white/5 px-5 py-3.5">
              <h2 className="text-sm font-semibold text-white">Maksājumu vēsture</h2>
            </div>
            {user.payments.length === 0 ? (
              <p className="px-5 py-8 text-center text-sm text-white/40">Nav maksājumu.</p>
            ) : (
              <table className="w-full text-sm">
                <tbody>
                  {user.payments.map((p) => (
                    <tr key={p.id} className="border-b border-white/5 last:border-0">
                      <td className="px-5 py-3">
                        <div className="font-medium text-white">
                          {formatMoney(p.amount, p.currency)}
                        </div>
                        <div className="text-[12px] text-white/40">
                          {p.plan ? PLAN_LABELS[p.plan] : "—"} · {formatDateTime(p.paidAt ?? p.createdAt)}
                        </div>
                      </td>
                      <td className="px-5 py-3">
                        <Badge tone={paymentTone(p.status)}>{PAYMENT_LABELS[p.status]}</Badge>
                      </td>
                      <td className="px-5 py-3 text-right">
                        {p.invoiceUrl ? (
                          <a
                            href={p.invoiceUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[13px] text-neon-green hover:underline"
                          >
                            <CreditCard className="h-3.5 w-3.5" /> Rēķins
                          </a>
                        ) : (
                          <span className="text-white/25">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Card>

          {/* Kursu progress */}
          <Card className="p-5">
            <h2 className="mb-4 text-sm font-semibold text-white">Kursu progress</h2>
            <div className="space-y-3">
              {courses.length === 0 && (
                <p className="text-sm text-white/40">Nav kursu.</p>
              )}
              {courses.map((c) => {
                const done = completedByCourse.get(c.id) ?? 0;
                const tot = c._count.lessons;
                const pct = tot > 0 ? Math.round((done / tot) * 100) : 0;
                return (
                  <div key={c.id}>
                    <div className="mb-1 flex items-center justify-between text-[13px]">
                      <span className="text-white/70">{c.title}</span>
                      <span className="text-white/40">
                        {done}/{tot} ({pct}%)
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-neon-green"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Labā kolonna — darbības + piezīmes */}
        <div className="space-y-6">
          <Card className="p-5">
            <h2 className="mb-4 text-sm font-semibold text-white">Darbības</h2>
            <UserActions
              userId={user.id}
              isBlocked={user.status === "BLOCKED"}
              hasSubscription={!!user.subscription}
              currentPlan={user.subscription?.plan ?? null}
              canEdit={canEdit}
              canEditPayments={canEditPayments}
            />
          </Card>

          <Card className="p-5">
            <h2 className="mb-4 text-sm font-semibold text-white">Admin piezīmes</h2>
            <UserNotes
              userId={user.id}
              canAdd={canNotes}
              initialNotes={user.notes.map((n) => ({
                id: n.id,
                note: n.note,
                createdAt: n.createdAt.toISOString(),
                adminName: n.admin.name || n.admin.email,
              }))}
            />
          </Card>
        </div>
      </div>
    </div>
  );
}

function Info({
  icon: Icon,
  label,
  value,
}: {
  icon?: React.ComponentType<{ className?: string }>;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-[12px] uppercase tracking-wide text-white/35">
        {Icon && <Icon className="h-3.5 w-3.5" />}
        {label}
      </dt>
      <dd className="mt-1 text-sm text-white/80">{value}</dd>
    </div>
  );
}
