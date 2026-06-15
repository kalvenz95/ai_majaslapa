import Link from "next/link";
import { requireAdmin, can } from "@/lib/admin";
import { prisma } from "@/lib/prisma";
import { PageHeader, Card, Badge, EmptyState } from "@/components/admin/ui";
import CoursePublishToggle from "@/components/admin/CoursePublishToggle";
import NewCourseButton from "@/components/admin/NewCourseButton";
import { PLAN_LABELS } from "@/lib/format";
import { Settings2 } from "lucide-react";

export default async function CoursesPage() {
  const admin = await requireAdmin();
  const canEdit = can(admin.role, "courses.edit");

  const courses = await prisma.course.findMany({
    include: { _count: { select: { lessons: true } } },
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <PageHeader title="Kursi" description="Kursu un nodarbību pārvaldība.">
        {canEdit && <NewCourseButton />}
      </PageHeader>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-white/5 text-left text-[12px] uppercase tracking-wide text-white/35">
                <th className="px-5 py-3 font-medium">Kurss</th>
                <th className="px-5 py-3 font-medium">Kategorija</th>
                <th className="px-5 py-3 font-medium">Līmenis</th>
                <th className="px-5 py-3 font-medium">Paka</th>
                <th className="px-5 py-3 font-medium">Nodarbības</th>
                <th className="px-5 py-3 font-medium">Publicēts</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {courses.map((c) => (
                <tr key={c.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="inline-block h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: c.color }}
                      />
                      <div>
                        <div className="font-medium text-white">{c.title}</div>
                        <div className="text-[12px] text-white/35">/{c.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-white/55">{c.category || "—"}</td>
                  <td className="px-5 py-3.5 text-white/55">{c.level || "—"}</td>
                  <td className="px-5 py-3.5">
                    <Badge tone="neutral">{PLAN_LABELS[c.planRequired]}</Badge>
                  </td>
                  <td className="px-5 py-3.5 text-white/55">{c._count.lessons}</td>
                  <td className="px-5 py-3.5">
                    <CoursePublishToggle courseId={c.id} published={c.published} canEdit={canEdit} />
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <Link
                      href={`/admin/courses/${c.id}`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-[13px] font-medium text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      <Settings2 className="h-3.5 w-3.5" /> Pārvaldīt
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {courses.length === 0 && (
          <EmptyState
            title="Vēl nav neviena kursa"
            hint={canEdit ? "Izveido pirmo kursu ar pogu augšā." : undefined}
          />
        )}
      </Card>
    </div>
  );
}
