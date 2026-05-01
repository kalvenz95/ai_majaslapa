import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserPlan } from "@/lib/subscriptions";
import { hasAccessToPlan } from "@/lib/stripe";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Nav autorizēts" }, { status: 401 });
    }

    const userPlan = await getUserPlan(userId);

    const courses = await prisma.course.findMany({
      where: { published: true },
      orderBy: [{ planRequired: "asc" }, { order: "asc" }],
      include: {
        lessons: {
          orderBy: { order: "asc" },
          select: {
            id: true,
            title: true,
            duration: true,
            isFree: true,
            order: true,
          },
        },
      },
    });

    // Pievieno piekļuves informāciju katram kursam
    const coursesWithAccess = courses.map((course) => ({
      ...course,
      hasAccess: userPlan ? hasAccessToPlan(userPlan, course.planRequired) : false,
    }));

    return NextResponse.json({ courses: coursesWithAccess });
  } catch (err) {
    console.error("[COURSES_GET]", err);
    return NextResponse.json({ message: "Servera kļūda" }, { status: 500 });
  }
}
