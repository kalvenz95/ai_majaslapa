import { auth } from "@clerk/nextjs/server";
import { Link } from "@/i18n/navigation";
import { CourseLinkCard } from "@/components/dashboard/CourseLinkCard";
import { prisma } from "@/lib/prisma";
import { getViewerAccess, canAccessPlan } from "@/lib/subscriptions";
import { PLAN_NAMES } from "@/lib/stripe";
import { Plan } from "@prisma/client";

export default async function KursiPage() {
  const { userId } = await auth();
  const viewer = userId
    ? await getViewerAccess(userId).catch(() => null)
    : null;
  const isStaff = viewer?.isStaff ?? false;

  const courses = await prisma.course
    .findMany({
      // Personāls redz arī nepublicētos kursus (satura pārvaldībai)
      where: isStaff ? undefined : { published: true },
      orderBy: [{ planRequired: "asc" }, { order: "asc" }],
      include: { lessons: { select: { id: true, isFree: true } } },
    })
    .catch(() => [] as any[]);

  const planColors: Record<Plan, string> = {
    PAMATI: "#a855f7",
    IZAUGSME: "#00ff88",
    MEISTARS: "#f97316",
  };

  return (
    <div>
      <div className="flex items-start justify-between gap-4 mb-2">
        <h1 className="text-3xl font-black text-white">Mani kursi</h1>
        {isStaff && (
          <Link
            href="/admin/courses"
            className="shrink-0 inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-semibold transition-all"
            style={{
              background: "rgba(168,85,247,0.12)",
              border: "1px solid rgba(168,85,247,0.3)",
              color: "#c084fc",
              textDecoration: "none",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
            </svg>
            Rediģēt kursus
          </Link>
        )}
      </div>
      <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
        {isStaff
          ? "Administratora skats — redzamas visas satura pakas (arī nepublicētās)"
          : viewer?.plan
          ? `Aktīvais plāns: ${PLAN_NAMES[viewer.plan]} — tev ir pieejami visi zemākie plāni`
          : "Nav aktīva abonementa — vari apskatīt ievadvideo katram kursam"}
      </p>

      {/* Grupas pēc plāna */}
      {(["PAMATI", "IZAUGSME", "MEISTARS"] as Plan[]).map((plan) => {
        const planCourses = courses.filter((c) => c.planRequired === plan);
        if (planCourses.length === 0) return null;

        const hasAccess = isStaff || (viewer ? canAccessPlan(viewer, plan) : false);
        const color = planColors[plan];

        return (
          <div key={plan} className="mb-10">
            {/* Plan header */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="h-px flex-1"
                style={{ background: `linear-gradient(to right, ${color}40, transparent)` }}
              />
              <div
                className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{
                  background: `${color}15`,
                  border: `1px solid ${color}30`,
                  color,
                }}
              >
                {PLAN_NAMES[plan]}
                {!hasAccess && " 🔒"}
              </div>
              <div
                className="h-px flex-1"
                style={{ background: `linear-gradient(to left, ${color}40, transparent)` }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {planCourses.map((course) => (
                <CourseLinkCard
                  key={course.id}
                  href={`/dashboard/kursi/${course.slug}`}
                  color={color}
                >
                  <CourseCard
                    course={course}
                    color={color}
                    locked={!hasAccess}
                    draft={isStaff && !course.published}
                  />
                </CourseLinkCard>
              ))}
            </div>

            {!hasAccess && (
              <div className="mt-3 text-center">
                <Link
                  href="/#pricing"
                  className="inline-block text-xs px-4 py-2 rounded-lg font-semibold transition-all"
                  style={{
                    background: `${color}15`,
                    border: `1px solid ${color}30`,
                    color,
                    textDecoration: "none",
                  }}
                >
                  Jaunināt uz {PLAN_NAMES[plan]} →
                </Link>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function CourseCard({
  course,
  color,
  locked,
  draft,
}: {
  course: {
    icon: string;
    title: string;
    description: string;
    lessons: { id: string; isFree: boolean }[];
  };
  color: string;
  locked: boolean;
  draft: boolean;
}) {
  const hasIntro = course.lessons.some((l) => l.isFree);

  return (
    <div className={`flex items-start gap-3 ${locked ? "opacity-70" : ""}`}>
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
        style={{ background: `${color}15`, border: `1px solid ${color}30` }}
      >
        {locked ? "🔒" : course.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-white text-sm flex items-center gap-2">
          {course.title}
          {draft && (
            <span
              className="text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wide"
              style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
            >
              Melnraksts
            </span>
          )}
        </div>
        <div
          className="text-xs mt-0.5 leading-relaxed line-clamp-2"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          {course.description}
        </div>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
            {course.lessons.length} lekcijas
          </span>
          {locked && hasIntro && (
            <span
              className="text-[10px] px-1.5 py-0.5 rounded font-semibold"
              style={{ background: `${color}18`, color }}
            >
              ▶ Ievadvideo bezmaksas
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
