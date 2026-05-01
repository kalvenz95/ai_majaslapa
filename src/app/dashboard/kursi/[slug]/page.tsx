import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getUserPlan } from "@/lib/subscriptions";
import { hasAccessToPlan } from "@/lib/stripe";

export default async function CoursePage({
  params,
}: {
  params: { slug: string };
}) {
  const { userId } = await auth();
  if (!userId) redirect("/login");

  const course = await prisma.course.findUnique({
    where: { slug: params.slug },
    include: { lessons: { orderBy: { order: "asc" } } },
  });

  if (!course) notFound();

  const userPlan = await getUserPlan(userId);
  const hasAccess = userPlan ? hasAccessToPlan(userPlan, course.planRequired) : false;

  // Ielādē progresu
  const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  const progress = user
    ? await prisma.lessonProgress.findMany({
        where: {
          userId: user.id,
          lessonId: { in: course.lessons.map((l) => l.id) },
        },
      })
    : [];

  const completedIds = new Set(
    progress.filter((p) => p.completed).map((p) => p.lessonId)
  );

  const completedCount = completedIds.size;
  const progressPercent =
    course.lessons.length > 0
      ? Math.round((completedCount / course.lessons.length) * 100)
      : 0;

  return (
    <div>
      {/* Back */}
      <Link
        href="/dashboard/kursi"
        className="inline-flex items-center gap-2 text-sm mb-6 transition-colors"
        style={{ color: "rgba(255,255,255,0.4)" }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        Atpakaļ uz kursiem
      </Link>

      {/* Course header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
            style={{
              background: `${course.color}15`,
              border: `1px solid ${course.color}30`,
            }}
          >
            {course.icon}
          </div>
          <div>
            <h1 className="text-2xl font-black text-white">{course.title}</h1>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              {course.lessons.length} lekcijas
            </p>
          </div>
        </div>

        {/* Progress bar */}
        {hasAccess && (
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1.5">
              <span style={{ color: "rgba(255,255,255,0.4)" }}>
                {completedCount}/{course.lessons.length} pabeigtas
              </span>
              <span style={{ color: course.color }}>{progressPercent}%</span>
            </div>
            <div
              className="h-2 rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.07)" }}
            >
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${progressPercent}%`,
                  background: `linear-gradient(90deg, ${course.color}, ${course.color}88)`,
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Nav access */}
      {!hasAccess && (
        <div
          className="rounded-2xl p-6 mb-8 text-center"
          style={{
            background: "rgba(168,85,247,0.06)",
            border: "1px solid rgba(168,85,247,0.25)",
          }}
        >
          <div className="text-3xl mb-2">🔒</div>
          <div className="font-bold text-white mb-1">Kursam nav piekļuves</div>
          <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
            Jaunini abonementu, lai piekļūtu šim kursam.
          </p>
          <Link
            href="/#pricing"
            className="inline-block px-5 py-2.5 rounded-xl text-sm font-bold"
            style={{ background: "#a855f7", color: "#fff", textDecoration: "none" }}
          >
            Skatīt plānus →
          </Link>
        </div>
      )}

      {/* Lesson list */}
      <div className="space-y-2">
        {course.lessons.map((lesson, i) => {
          const isCompleted = completedIds.has(lesson.id);
          const isAccessible = hasAccess || lesson.isFree;

          return (
            <div key={lesson.id}>
              {isAccessible ? (
                <Link
                  href={`/dashboard/kursi/${course.slug}/${lesson.id}`}
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-150"
                  style={{
                    background: isCompleted
                      ? `${course.color}08`
                      : "rgba(255,255,255,0.03)",
                    border: isCompleted
                      ? `1px solid ${course.color}25`
                      : "1px solid rgba(255,255,255,0.07)",
                    textDecoration: "none",
                  }}
                >
                  <LessonRow
                    index={i}
                    lesson={lesson}
                    completed={isCompleted}
                    color={course.color}
                    locked={false}
                  />
                </Link>
              ) : (
                <div
                  className="flex items-center gap-4 p-4 rounded-xl opacity-40"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <LessonRow
                    index={i}
                    lesson={lesson}
                    completed={false}
                    color={course.color}
                    locked
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function LessonRow({
  index,
  lesson,
  completed,
  color,
  locked,
}: {
  index: number;
  lesson: { title: string; duration?: number | null; isFree: boolean };
  completed: boolean;
  color: string;
  locked: boolean;
}) {
  return (
    <>
      {/* Number / check */}
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0"
        style={
          completed
            ? { background: color, color: "#000" }
            : { background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.4)" }
        }
      >
        {completed ? (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <polyline points="20,6 9,17 4,12" />
          </svg>
        ) : locked ? (
          "🔒"
        ) : (
          index + 1
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-white truncate">{lesson.title}</div>
        {lesson.isFree && (
          <span
            className="text-xs px-1.5 py-0.5 rounded"
            style={{ background: `${color}20`, color }}
          >
            Bezmaksas
          </span>
        )}
      </div>

      {lesson.duration && (
        <div className="text-xs shrink-0" style={{ color: "rgba(255,255,255,0.3)" }}>
          {Math.floor(lesson.duration / 60)} min
        </div>
      )}

      {!locked && !completed && (
        <svg
          className="shrink-0"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
        >
          <polygon points="5,3 19,12 5,21" />
        </svg>
      )}
    </>
  );
}
