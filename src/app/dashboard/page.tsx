import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCourseProgress } from "@/lib/subscriptions";
import { PLAN_NAMES, PLAN_PRICES } from "@/lib/stripe";
import { Plan } from "@prisma/client";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { success?: string; plan?: string };
}) {
  const { userId } = await auth();
  const clerkUser = await currentUser();

  const user = userId
    ? await prisma.user.findUnique({
        where: { clerkId: userId },
        include: { subscription: true },
      }).catch(() => null)
    : null;

  const sub = user?.subscription;
  const isActive = sub?.status === "ACTIVE" || sub?.status === "TRIALING";

  // Ielādē kursus ar progresu
  const courses = isActive && user
    ? await prisma.course.findMany({
        where: { published: true },
        orderBy: { order: "asc" },
        include: { lessons: { select: { id: true } } },
      }).catch(() => [] as any[])
    : [];

  const progressData = await Promise.all(
    courses.map(async (course) => {
      const p = user ? await getCourseProgress(user.id, course.id).catch(() => null) : null;
      return { ...course, progress: p };
    })
  );

  const name = clerkUser?.firstName || "Studenti";

  return (
    <div>
      {/* Success banner pēc pirkuma */}
      {searchParams.success && (
        <div
          className="mb-6 rounded-2xl p-4 flex items-center gap-3"
          style={{ background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.25)" }}
        >
          <span className="text-2xl">🎉</span>
          <div>
            <div className="font-bold text-white text-sm">Maksājums apstiprināts!</div>
            <div className="text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>
              Abonements aktīvs. Vari sākt mācīties uzreiz.
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-1">
          Sveiks, {name}! 👋
        </h1>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "15px" }}>
          {isActive
            ? `Aktīvs plāns: ${PLAN_NAMES[sub!.plan as Plan]}`
            : "Nav aktīva abonementa"}
        </p>
      </div>

      {/* Nav abonements */}
      {!isActive && (
        <div
          className="rounded-2xl p-6 mb-8"
          style={{
            background: "rgba(168,85,247,0.06)",
            border: "1px solid rgba(168,85,247,0.25)",
          }}
        >
          <div className="text-lg font-bold text-white mb-2">
            Sāc savu AI karjeru šodien
          </div>
          <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>
            Izvēlies plānu, lai piekļūtu kursiem, lekcijām un mentoringa materiāliem.
          </p>
          <Link
            href="/#pricing"
            className="inline-block px-5 py-2.5 rounded-xl text-sm font-bold transition-all"
            style={{ background: "#a855f7", color: "#fff" }}
          >
            Skatīt plānus →
          </Link>
        </div>
      )}

      {/* Stats */}
      {isActive && (
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            {
              label: "Aktīvais plāns",
              value: PLAN_NAMES[sub!.plan as Plan],
              color: "#00ff88",
            },
            {
              label: "Kursi pieejami",
              value: `${courses.length}`,
              color: "#00d4ff",
            },
            {
              label: "Abonements līdz",
              value: sub?.currentPeriodEnd
                ? new Date(sub.currentPeriodEnd).toLocaleDateString("lv-LV", {
                    day: "numeric",
                    month: "long",
                  })
                : "—",
              color: "#a855f7",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl p-4"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div className="text-xs mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                {stat.label}
              </div>
              <div className="text-base font-black" style={{ color: stat.color }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Kursi */}
      {isActive && progressData.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-white mb-4">Mani kursi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {progressData.map((course) => (
              <Link
                key={course.id}
                href={`/dashboard/kursi/${course.slug}`}
                className="block rounded-2xl p-5 transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.border =
                    `1px solid ${course.color}40`;
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.border =
                    "1px solid rgba(255,255,255,0.07)";
                  (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                    style={{
                      background: `${course.color}15`,
                      border: `1px solid ${course.color}30`,
                    }}
                  >
                    {course.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-white text-sm truncate">{course.title}</div>
                    <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {course.lessons.length} lekcijas
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                {course.progress && (
                  <div>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span style={{ color: "rgba(255,255,255,0.4)" }}>Progress</span>
                      <span style={{ color: course.color }}>{course.progress.percent}%</span>
                    </div>
                    <div
                      className="h-1.5 rounded-full overflow-hidden"
                      style={{ background: "rgba(255,255,255,0.07)" }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${course.progress.percent}%`,
                          background: `linear-gradient(90deg, ${course.color}, ${course.color}88)`,
                        }}
                      />
                    </div>
                    <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
                      {course.progress.completed}/{course.progress.total} pabeigtas
                    </div>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
