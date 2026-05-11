import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { getCourseProgress } from "@/lib/subscriptions";
import { PLAN_NAMES } from "@/lib/stripe";
import { Plan } from "@prisma/client";

function Avatar({ name, avatarUrl, size = 80 }: { name: string; avatarUrl?: string | null; size?: number }) {
  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        width={size}
        height={size}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  return (
    <div
      className="rounded-full flex items-center justify-center font-black text-white"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.35,
        background: "linear-gradient(135deg, #a855f7, #ec4899)",
      }}
    >
      {initials}
    </div>
  );
}

export default async function ProfilsPage() {
  const { userId } = await auth();
  const clerkUser = await currentUser();

  const user = userId
    ? await prisma.user.findUnique({
        where: { clerkId: userId },
        include: {
          subscription: true,
          streak: true,
        },
      }).catch(() => null)
    : null;

  const sub = user?.subscription;
  const isActive = sub?.status === "ACTIVE" || sub?.status === "TRIALING";

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

  const startedCourses = progressData.filter((c) => (c.progress?.completed ?? 0) > 0 && (c.progress?.percent ?? 0) < 100);
  const completedCourses = progressData.filter((c) => c.progress?.percent === 100);

  const streak = user?.streak;
  const name = clerkUser?.firstName && clerkUser?.lastName
    ? `${clerkUser.firstName} ${clerkUser.lastName}`
    : clerkUser?.firstName || user?.name || "Lietotājs";
  const email = clerkUser?.emailAddresses?.[0]?.emailAddress || user?.email || "";
  const avatarUrl = clerkUser?.imageUrl || user?.avatarUrl;
  const joinDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("lv-LV", { year: "numeric", month: "long", day: "numeric" })
    : null;

  const totalLessonsCompleted = progressData.reduce((acc, c) => acc + (c.progress?.completed ?? 0), 0);

  return (
    <div className="max-w-3xl">
      {/* Profila galvene */}
      <div
        className="rounded-2xl p-6 mb-6 flex items-center gap-5"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="relative shrink-0">
          <Avatar name={name} avatarUrl={avatarUrl} size={80} />
          <div
            className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 flex items-center justify-center"
            style={{ background: "#00ff88", borderColor: "#05080f" }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-black text-white truncate">{name}</h1>
          <p className="text-sm truncate" style={{ color: "rgba(255,255,255,0.45)" }}>{email}</p>
          <div className="flex items-center gap-3 mt-2">
            {isActive && sub && (
              <span
                className="text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ background: "rgba(168,85,247,0.15)", color: "#a855f7", border: "1px solid rgba(168,85,247,0.3)" }}
              >
                {PLAN_NAMES[sub.plan as Plan]}
              </span>
            )}
            {joinDate && (
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>
                Pievienojās {joinDate}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Statistika */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          {
            label: "Dienu sērija",
            value: streak?.currentStreak ?? 0,
            suffix: "🔥",
            color: "#f97316",
            sub: `Garākā: ${streak?.longestStreak ?? 0}`,
          },
          {
            label: "Kopā dienas",
            value: streak?.totalDays ?? 0,
            suffix: "📅",
            color: "#00d4ff",
            sub: "aktīvās dienas",
          },
          {
            label: "Pabeigtas lekcijas",
            value: totalLessonsCompleted,
            suffix: "✅",
            color: "#00ff88",
            sub: `no ${progressData.reduce((a, c) => a + (c.progress?.total ?? 0), 0)} kopā`,
          },
          {
            label: "Pabeigti kursi",
            value: completedCourses.length,
            suffix: "🏆",
            color: "#f59e0b",
            sub: `${startedCourses.length} uzsākti`,
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl p-4"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{stat.label}</span>
              <span>{stat.suffix}</span>
            </div>
            <div className="text-2xl font-black" style={{ color: stat.color }}>{stat.value}</div>
            <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Uzsāktie kursi */}
      {startedCourses.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-bold text-white mb-3">Uzsāktie kursi</h2>
          <div className="space-y-3">
            {startedCourses.map((course) => (
              <a
                key={course.id}
                href={`/dashboard/kursi/${course.slug}`}
                className="flex items-center gap-3 rounded-xl p-4 transition-all duration-150"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", textDecoration: "none" }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0"
                  style={{ background: `${course.color}15`, border: `1px solid ${course.color}30` }}
                >
                  {course.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-white truncate">{course.title}</div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.07)" }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${course.progress?.percent ?? 0}%`, background: `linear-gradient(90deg, ${course.color}, ${course.color}88)` }}
                      />
                    </div>
                    <span className="text-xs shrink-0" style={{ color: course.color }}>{course.progress?.percent}%</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Pabeigtie kursi */}
      {completedCourses.length > 0 && (
        <div className="mb-6">
          <h2 className="text-base font-bold text-white mb-3">Pabeigtie kursi 🏆</h2>
          <div className="space-y-2">
            {completedCourses.map((course) => (
              <div
                key={course.id}
                className="flex items-center gap-3 rounded-xl p-4"
                style={{ background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.15)" }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0"
                  style={{ background: `${course.color}15` }}
                >
                  {course.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-white truncate">{course.title}</div>
                  <div className="text-xs" style={{ color: "#00ff88" }}>Pabeigts ✓</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Nav kursu */}
      {!isActive && (
        <div
          className="rounded-2xl p-5"
          style={{ background: "rgba(168,85,247,0.06)", border: "1px solid rgba(168,85,247,0.2)" }}
        >
          <p className="text-sm font-bold text-white mb-1">Nav aktīva abonementa</p>
          <p className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.4)" }}>
            Abonē plānu, lai sāktu mācīties un izsekotu savu progresu.
          </p>
          <a
            href="/#pricing"
            className="inline-block text-xs font-bold px-4 py-2 rounded-xl"
            style={{ background: "#a855f7", color: "#fff" }}
          >
            Skatīt plānus →
          </a>
        </div>
      )}
    </div>
  );
}
