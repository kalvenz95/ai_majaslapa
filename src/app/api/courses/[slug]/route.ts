import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserPlan } from "@/lib/subscriptions";
import { hasAccessToPlan } from "@/lib/stripe";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Nav autorizēts" }, { status: 401 });
    }

    const course = await prisma.course.findUnique({
      where: { slug: params.slug },
      include: {
        lessons: {
          orderBy: { order: "asc" },
        },
      },
    });

    if (!course) {
      return NextResponse.json({ message: "Kurss nav atrasts" }, { status: 404 });
    }

    const userPlan = await getUserPlan(userId);
    const hasAccess = userPlan ? hasAccessToPlan(userPlan, course.planRequired) : false;

    // Slēpj videoUrl ja nav piekļuves (drošība)
    const courseWithAccess = {
      ...course,
      hasAccess,
      lessons: course.lessons.map((lesson) => ({
        ...lesson,
        videoUrl: hasAccess || lesson.isFree ? lesson.videoUrl : null,
      })),
    };

    return NextResponse.json({ course: courseWithAccess });
  } catch (err) {
    console.error("[COURSE_GET]", err);
    return NextResponse.json({ message: "Servera kļūda" }, { status: 500 });
  }
}
