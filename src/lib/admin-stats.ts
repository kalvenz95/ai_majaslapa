import "server-only";
import { prisma } from "@/lib/prisma";
import { Plan } from "@prisma/client";

/** Mēneša sākums (lokāli) */
function startOfMonth(): Date {
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

export type DashboardStats = {
  totalUsers: number;
  activeSubscribers: number;
  paidUsers: number;
  unpaidUsers: number;
  monthlyRevenue: number; // centos
  newUsersThisMonth: number;
  canceledSubscriptions: number;
  topPlan: { plan: Plan; count: number } | null;
};

export async function getDashboardStats(): Promise<DashboardStats> {
  const monthStart = startOfMonth();

  const [
    totalUsers,
    activeSubscribers,
    paidUsers,
    newUsersThisMonth,
    canceledSubscriptions,
    revenueAgg,
    planGroups,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.subscription.count({ where: { status: { in: ["ACTIVE", "TRIALING"] } } }),
    // "Samaksājuši" = lietotāji ar vismaz vienu PAID maksājumu
    prisma.user.count({ where: { payments: { some: { status: "PAID" } } } }),
    prisma.user.count({ where: { createdAt: { gte: monthStart } } }),
    prisma.subscription.count({ where: { status: "CANCELED" } }),
    prisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: "PAID", paidAt: { gte: monthStart } },
    }),
    prisma.subscription.groupBy({
      by: ["plan"],
      where: { status: { in: ["ACTIVE", "TRIALING"] } },
      _count: { plan: true },
    }),
  ]);

  const topPlanGroup = planGroups.sort((a, b) => b._count.plan - a._count.plan)[0];

  return {
    totalUsers,
    activeSubscribers,
    paidUsers,
    unpaidUsers: totalUsers - paidUsers,
    monthlyRevenue: revenueAgg._sum.amount ?? 0,
    newUsersThisMonth,
    canceledSubscriptions,
    topPlan: topPlanGroup
      ? { plan: topPlanGroup.plan, count: topPlanGroup._count.plan }
      : null,
  };
}
