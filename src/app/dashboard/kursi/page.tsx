import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getUserPlan } from "@/lib/subscriptions";
import { hasAccessToPlan, PLAN_NAMES } from "@/lib/stripe";
import { Plan } from "@prisma/client";

export default async function KursiPage() {
  const { userId } = await auth();
  const userPlan = userId ? await getUserPlan(userId).catch(() => null) : null;

  const courses = await prisma.course.findMany({
    where: { published: true },
    orderBy: [{ planRequired: "asc" }, { order: "asc" }],
    include: { lessons: { select: { id: true } } },
  }).catch(() => [] as any[]);

  const planColors: Record<Plan, string> = {
    PAMATI: "#a855f7",
    IZAUGSME: "#00ff88",
    MEISTARS: "#f97316",
  };

  return (
    <div>
      <h1 className="text-3xl font-black text-white mb-2">Mani kursi</h1>
      <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.4)" }}>
        {userPlan
          ? `Aktīvais plāns: ${PLAN_NAMES[userPlan]} — tu vari piekļūt visiem zemākiem plāniem`
          : "Nav aktīva abonementa"}
      </p>

      {/* Grupes pēc plāna */}
      {(["PAMATI", "IZAUGSME", "MEISTARS"] as Plan[]).map((plan) => {
        const planCourses = courses.filter((c) => c.planRequired === plan);
        if (planCourses.length === 0) return null;

        const hasAccess = userPlan ? hasAccessToPlan(userPlan, plan) : false;
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
                <div key={course.id}>
                  {hasAccess ? (
                    <Link
                      href={`/dashboard/kursi/${course.slug}`}
                      className="block rounded-2xl p-5 transition-all duration-200"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.border = `1px solid ${color}40`;
                        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.border =
                          "1px solid rgba(255,255,255,0.07)";
                        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                      }}
                    >
                      <CourseCard course={course} color={color} locked={false} />
                    </Link>
                  ) : (
                    <div
                      className="rounded-2xl p-5 opacity-50"
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <CourseCard course={course} color={color} locked />
                    </div>
                  )}
                </div>
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
}: {
  course: { icon: string; title: string; description: string; lessons: { id: string }[] };
  color: string;
  locked: boolean;
}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
        style={{ background: `${color}15`, border: `1px solid ${color}30` }}
      >
        {locked ? "🔒" : course.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-bold text-white text-sm">{course.title}</div>
        <div
          className="text-xs mt-0.5 leading-relaxed line-clamp-2"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          {course.description}
        </div>
        <div className="text-xs mt-1.5" style={{ color: "rgba(255,255,255,0.3)" }}>
          {course.lessons.length} lekcijas
        </div>
      </div>
    </div>
  );
}
