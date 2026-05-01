import { prisma } from "@/lib/prisma";
import { Plan, SubscriptionStatus } from "@prisma/client";

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
    create: data,
    update: {
      email: data.email,
      name: data.name,
      avatarUrl: data.avatarUrl,
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
