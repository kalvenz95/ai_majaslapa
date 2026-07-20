import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getViewerAccess, canAccessPlan } from "@/lib/subscriptions";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Nav autorizēts" }, { status: 401 });
    }

    const viewer = await getViewerAccess(userId);

    const courses = await prisma.course.findMany({
      // Personāls redz visu (arī nepublicēto); lietotājs — tikai publicēto
      where: viewer.isStaff ? undefined : { published: true },
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

    // Visas pakas redzamas; hasAccess norāda, vai saturs ir atslēgts
    const coursesWithAccess = courses.map((course) => ({
      ...course,
      hasAccess: canAccessPlan(viewer, course.planRequired),
    }));

    return NextResponse.json({ courses: coursesWithAccess });
  } catch (err) {
    console.error("[COURSES_GET]", err);
    return NextResponse.json({ message: "Servera kļūda" }, { status: 500 });
  }
}
