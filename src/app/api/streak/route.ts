import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const streak = await prisma.userStreak.findUnique({ where: { userId: user.id } });
  return NextResponse.json(streak ?? { currentStreak: 0, longestStreak: 0, totalDays: 0 });
}

export async function POST() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const existing = await prisma.userStreak.findUnique({ where: { userId: user.id } });

  if (!existing) {
    const streak = await prisma.userStreak.create({
      data: { userId: user.id, currentStreak: 1, longestStreak: 1, totalDays: 1, lastActiveDate: today },
    });
    return NextResponse.json(streak);
  }

  const lastActive = existing.lastActiveDate
    ? new Date(new Date(existing.lastActiveDate).getFullYear(), new Date(existing.lastActiveDate).getMonth(), new Date(existing.lastActiveDate).getDate())
    : null;

  const isToday = lastActive?.getTime() === today.getTime();
  if (isToday) return NextResponse.json(existing);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const wasYesterday = lastActive?.getTime() === yesterday.getTime();

  const newCurrent = wasYesterday ? existing.currentStreak + 1 : 1;
  const newLongest = Math.max(existing.longestStreak, newCurrent);

  const streak = await prisma.userStreak.update({
    where: { userId: user.id },
    data: {
      currentStreak: newCurrent,
      longestStreak: newLongest,
      totalDays: existing.totalDays + 1,
      lastActiveDate: today,
    },
  });
  return NextResponse.json(streak);
}
