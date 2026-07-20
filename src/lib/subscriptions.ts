import { prisma } from "@/lib/prisma";
import { Plan, SubscriptionStatus, Role } from "@prisma/client";
import { hasAccessToPlan } from "@/lib/stripe";

// Personāls (owner/admin) redz un pārvalda VISU saturu neatkarīgi no abonementa.
const STAFF_ROLES: Role[] = [Role.OWNER, Role.ADMIN];

export type ViewerAccess = {
  role: Role | null;
  plan: Plan | null;
  isStaff: boolean;
};

/**
 * Vienota piekļuves konteksta ielāde satura pakām.
 * Atgriež skatītāja lomu, aktīvā abonementa plānu un vai tas ir personāls.
 * OWNER_EMAIL sakritība tiek uzskatīta par personālu arī tad, ja DB loma
 * vēl nav bootstrapēta (drošības tīkls īpašniekam).
 */
export async function getViewerAccess(clerkId: string): Promise<ViewerAccess> {
  const user = await prisma.user
    .findUnique({
      where: { clerkId },
      select: {
        email: true,
        role: true,
        subscription: { select: { plan: true, status: true } },
      },
    })
    .catch(() => null);

  const sub = user?.subscription;
  const activePlan =
    sub && (sub.status === SubscriptionStatus.ACTIVE || sub.status === SubscriptionStatus.TRIALING)
      ? sub.plan
      : null;

  const ownerEmails = (process.env.OWNER_EMAIL ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  const isOwnerByEmail = user?.email
    ? ownerEmails.includes(user.email.toLowerCase())
    : false;

  const isStaff = (user ? STAFF_ROLES.includes(user.role) : false) || isOwnerByEmail;

  return { role: user?.role ?? null, plan: activePlan, isStaff };
}

/** Vai skatītājs drīkst piekļūt konkrēta plāna saturam. Personāls — vienmēr. */
export function canAccessPlan(viewer: ViewerAccess, requiredPlan: Plan): boolean {
  if (viewer.isStaff) return true;
  return viewer.plan ? hasAccessToPlan(viewer.plan, requiredPlan) : false;
}

export async function getUserSubscription(userId: string) {
  return prisma.subscription.findFirst({
    where: {
      user: { clerkId: userId },
      status: { in: ["ACTIVE", "TRIALING"] },
    },
  });
}

export async function getUserByClerkId(clerkId: string) {
  return prisma.user.findUnique({
    where: { clerkId },
    include: { subscription: true },
  });
}

// Izveido vai atjaunina lietotāju DB (izsauc pēc pirmās pieteikšanās)
export async function upsertUser(data: {
  clerkId: string;
  email: string;
  name?: string;
  avatarUrl?: string;
}) {
  return prisma.user.upsert({
    where: { clerkId: data.clerkId },
    create: { ...data, lastLoginAt: new Date() },
    update: {
      email: data.email,
      name: data.name,
      avatarUrl: data.avatarUrl,
      lastLoginAt: new Date(),
    },
    include: { subscription: true },
  });
}

export async function hasActiveSubscription(clerkId: string): Promise<boolean> {
  const sub = await prisma.subscription.findFirst({
    where: {
      user: { clerkId },
      status: { in: [SubscriptionStatus.ACTIVE, SubscriptionStatus.TRIALING] },
    },
  });
  return !!sub;
}

export async function getUserPlan(clerkId: string): Promise<Plan | null> {
  const sub = await prisma.subscription.findFirst({
    where: {
      user: { clerkId },
      status: { in: [SubscriptionStatus.ACTIVE, SubscriptionStatus.TRIALING] },
    },
  });
  return sub?.plan ?? null;
}

// Kursa progresa statistika
export async function getCourseProgress(userId: string, courseId: string) {
  const lessons = await prisma.lesson.findMany({ where: { courseId } });
  const completed = await prisma.lessonProgress.count({
    where: { userId, lessonId: { in: lessons.map((l) => l.id) }, completed: true },
  });
  return {
    total: lessons.length,
    completed,
    percent: lessons.length > 0 ? Math.round((completed / lessons.length) * 100) : 0,
  };
}
