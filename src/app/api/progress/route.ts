import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getUserPlan } from "@/lib/subscriptions";
import { hasAccessToPlan } from "@/lib/stripe";

const schema = z.object({
  lessonId: z.string(),
  completed: z.boolean().optional(),
  watchedSeconds: z.number().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Nav autorizēts" }, { status: 401 });
    }

    const body = await req.json();
    const { lessonId, completed, watchedSeconds } = schema.parse(body);

    // Pārbauda vai lietotājam ir piekļuve šai lekcijai
    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: { course: true },
    });
    if (!lesson) {
      return NextResponse.json({ message: "Lekcija nav atrasta" }, { status: 404 });
    }

    if (!lesson.isFree) {
      const userPlan = await getUserPlan(userId);
      if (!userPlan || !hasAccessToPlan(userPlan, lesson.course.planRequired)) {
        return NextResponse.json({ message: "Nav piekļuves" }, { status: 403 });
      }
    }

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) {
      return NextResponse.json({ message: "Lietotājs nav atrasts" }, { status: 404 });
    }

    const progress = await prisma.lessonProgress.upsert({
      where: { userId_lessonId: { userId: user.id, lessonId } },
      create: {
        userId: user.id,
        lessonId,
        completed: completed ?? false,
        watchedSeconds: watchedSeconds ?? 0,
        completedAt: completed ? new Date() : null,
      },
      update: {
        ...(completed !== undefined && { completed }),
        ...(watchedSeconds !== undefined && { watchedSeconds }),
        ...(completed && { completedAt: new Date() }),
      },
    });

    return NextResponse.json({ progress });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ message: "Nepareizi dati" }, { status: 400 });
    }
    console.error("[PROGRESS_POST]", err);
    return NextResponse.json({ message: "Servera kļūda" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Nav autorizēts" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });
    if (!user) return NextResponse.json({ progress: [] });

    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");

    const whereClause = courseId
      ? { userId: user.id, lesson: { courseId } }
      : { userId: user.id };

    const progress = await prisma.lessonProgress.findMany({
      where: whereClause,
      include: { lesson: { select: { courseId: true, order: true } } },
    });

    return NextResponse.json({ progress });
  } catch (err) {
    console.error("[PROGRESS_GET]", err);
    return NextResponse.json({ message: "Servera kļūda" }, { status: 500 });
  }
}
