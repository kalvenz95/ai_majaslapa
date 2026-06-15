import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { requireAdmin, can } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/admin/ui";
import CourseEditor from "@/components/admin/CourseEditor";
import { PLAN_LABELS } from "@/lib/format";

export default async function CourseEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const admin = await requireAdmin();
  const { id } = await params;

  const course = await prisma.course.findUnique({
    where: { id },
    include: { lessons: { orderBy: { order: "asc" } } },
  });
  if (!course) notFound();

  const canEdit = can(admin.role, "courses.edit");

  return (
    <div>
      <Link
        href="/admin/courses"
        className="mb-4 inline-flex items-center gap-1.5 text-[13px] text-white/45 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" /> Atpakaļ uz kursiem
      </Link>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-white">{course.title}</h1>
        <Badge tone={course.published ? "green" : "neutral"}>
          {course.published ? "Publicēts" : "Paslēpts"}
        </Badge>
        <Badge tone="neutral">{PLAN_LABELS[course.planRequired]}</Badge>
      </div>

      <CourseEditor
        course={{
          id: course.id,
          title: course.title,
          description: course.description,
          category: course.category,
          level: course.level,
          planRequired: course.planRequired,
          color: course.color,
        }}
        lessons={course.lessons.map((l) => ({
          id: l.id,
          title: l.title,
          videoUrl: l.videoUrl,
          duration: l.duration,
          isFree: l.isFree,
          order: l.order,
        }))}
        canEdit={canEdit}
      />
    </div>
  );
}
