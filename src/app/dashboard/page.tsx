import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCourseProgress } from "@/lib/subscriptions";
import { PLAN_NAMES } from "@/lib/stripe";
import { Plan } from "@prisma/client";

const FLAGSHIP = [
  {
    id: "faceless", num: "01", title: "AI Faceless Video",
    promise: "Veido virālus video bez sejas un pārdod tos zīmoliem.",
    duration: "18 nodarbības · 4h 20min", level: "Iesācējs",
    color: "#00ff88", slug: "socialo-tiklu-parvaldiba",
  },
  {
    id: "chatbot", num: "02", title: "Mājas lapas chatbot",
    promise: "Uzstādi AI chatbotu klienta mājas lapā 1 dienā un pārdod par €1500.",
    duration: "14 nodarbības · 3h 10min", level: "Vidējs",
    color: "#00d4ff", slug: "website-chatbot",
  },
  {
    id: "voice", num: "03", title: "Voice aģenti ar Vapi",
    promise: "Atbild uz klientu zvaniem 24/7 ar AI balss aģentu.",
    duration: "22 nodarbības · 5h 02min", level: "Pieredzējis",
    color: "#a855f7", slug: "voice-agents",
  },
];

const ROADMAP = [
  { label: "Izvēlies AI pakalpojumu", done: true },
  { label: "Apgūsti vienu praktisku nodarbību", done: true },
  { label: "Uztaisi 1 reālu demo", done: true },
  { label: "Saņem outreach skriptus", done: false, active: true },
  { label: "Sūti 30 ziņas", done: false },
  { label: "Aizver pirmo klientu", done: false },
];

function EarningsChart() {
  const data = [12, 18, 14, 22, 26, 30, 28, 38, 42, 48, 56, 62];
  const max = 64;
  const w = 560;
  const h = 140;
  const step = w / (data.length - 1);
  const points = data.map((d, i) => `${i * step},${h - (d / max) * h}`).join(" ");
  const area = `M0,${h} L${points} L${w},${h} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} style={{ width: "100%", height: 140, display: "block" }}>
      <defs>
        <linearGradient id="eg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#00ff88" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#00ff88" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#eg)" />
      <polyline fill="none" stroke="#00ff88" strokeWidth="2" points={points} />
      {data.map((d, i) => (
        <circle key={i} cx={i * step} cy={h - (d / max) * h}
          r={i === data.length - 1 ? 4 : 0}
          fill="#00ff88" stroke="#05080F" strokeWidth="2" />
      ))}
    </svg>
  );
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; plan?: string }>;
}) {
  const params = await searchParams;
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

  const courses = isActive && user
    ? await prisma.course.findMany({
        where: { published: true },
        orderBy: { order: "asc" },
        include: { lessons: { select: { id: true } } },
      }).catch(() => [] as any[])
    : [];

  const progressData = await Promise.all(
    courses.map(async (course: any) => {
      const p = user ? await getCourseProgress(user.id, course.id).catch(() => null) : null;
      return { ...course, progress: p };
    })
  );

  const totalLessons = progressData.reduce((a: number, c: any) => a + (c.progress?.total ?? 0), 0);
  const doneLessons = progressData.reduce((a: number, c: any) => a + (c.progress?.completed ?? 0), 0);
  const xp = doneLessons * 90 + (isActive ? 500 : 0);

  const name = clerkUser?.firstName || "Student";

  return (
    <div style={{ color: "var(--d-ink)" }}>

      {/* Success banner */}
      {params.success && (
        <div className="d-card" style={{ padding: "14px 18px", marginBottom: 20, display: "flex", alignItems: "center", gap: 12, borderColor: "rgba(0,255,136,0.25)", background: "rgba(0,255,136,0.06)" }}>
          <span style={{ fontSize: 22 }}>🎉</span>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Maksājums apstiprināts!</div>
            <div style={{ fontSize: 12, color: "var(--d-ink3)" }}>Abonements aktīvs. Vari sākt mācīties uzreiz.</div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <div style={{ fontSize: 13, color: "var(--d-ink3)", marginBottom: 6 }}>Sveiki, {name}</div>
          <h1 className="d-display" style={{ fontSize: 30, color: "var(--d-ink)" }}>Tava AI biznesa vadība</h1>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {isActive && (
            <span className="d-chip d-chip-accent">
              🔥 {isActive ? (PLAN_NAMES[sub!.plan as Plan] || "Pro") : ""} plāns
            </span>
          )}
          {!isActive && (
            <Link href="/#pricing" className="d-btn d-btn-primary" style={{ textDecoration: "none", fontSize: 12 }}>
              Iegūt plānu →
            </Link>
          )}
        </div>
      </div>

      {/* 4 stat cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 16 }}>
        {[
          {
            label: "Pabeigtas nodarbības",
            value: totalLessons > 0 ? `${doneLessons}/${totalLessons}` : "0",
            sub: totalLessons > 0 ? `${Math.round((doneLessons / totalLessons) * 100)}%` : "Sāc mācīties",
            color: "#00ff88",
          },
          {
            label: "Aktīvais plāns",
            value: isActive ? (PLAN_NAMES[sub!.plan as Plan] || "Pro") : "Nav",
            sub: isActive ? "aktīvs" : "izvēlies plānu",
            color: "#00d4ff",
          },
          {
            label: "Abonements līdz",
            value: sub?.currentPeriodEnd
              ? new Date(sub.currentPeriodEnd).toLocaleDateString("lv-LV", { day: "numeric", month: "short" })
              : "—",
            sub: isActive ? "nākamais rēķins" : "nav aktīvs",
            color: "#a855f7",
          },
          {
            label: "XP",
            value: xp.toLocaleString("lv-LV"),
            sub: isActive ? "Top 10% LV" : "+90 par lekciju",
            color: "#f59e0b",
          },
        ].map((s, i) => (
          <div key={i} className="d-card" style={{ padding: 18 }}>
            <div style={{ fontSize: 10, color: "var(--d-ink3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>{s.label}</div>
            <div className="d-metric" style={{ fontSize: 28, color: "var(--d-ink)", marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: s.color }}>↑ {s.sub}</div>
          </div>
        ))}
      </div>

      {/* Chart + Roadmap */}
      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 14, marginBottom: 16 }}>

        {/* Earnings chart */}
        <div className="d-card" style={{ padding: 22 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 10, color: "var(--d-ink3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Potenciālie ienākumi · Pēdējās 12 ned.</div>
              <div className="d-metric" style={{ fontSize: 36, color: "var(--d-ink)" }}>€7 850</div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              {["12N", "6M", "1G"].map((p, i) => (
                <span key={p} className={`d-chip${i === 0 ? " d-chip-accent" : ""}`} style={{ fontSize: 10, cursor: "pointer" }}>{p}</span>
              ))}
            </div>
          </div>
          <EarningsChart />
          <div style={{ display: "flex", gap: 18, marginTop: 14, fontSize: 12, color: "var(--d-ink3)" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 8, height: 8, background: "#00ff88", borderRadius: 999, display: "inline-block" }} />
              Setup līgumi
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 8, height: 8, background: "var(--d-ink3)", borderRadius: 999, display: "inline-block" }} />
              Retaineri
            </span>
          </div>
        </div>

        {/* First client roadmap */}
        <div className="d-card" style={{ padding: 22 }}>
          <span className="d-chip d-chip-accent" style={{ marginBottom: 12, display: "inline-flex" }}>CEĻVEDIS</span>
          <div className="d-display" style={{ fontSize: 20, marginBottom: 18, color: "var(--d-ink)" }}>Pirmā klienta ceļš</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {ROADMAP.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{
                  width: 22, height: 22, borderRadius: 999, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: step.done ? "#00ff88" : step.active ? "transparent" : "rgba(255,255,255,0.05)",
                  border: step.done ? "none" : step.active ? "2px solid #00ff88" : "1px solid rgba(255,255,255,0.12)",
                }}>
                  {step.done && (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3"><polyline points="20,6 9,17 4,12" /></svg>
                  )}
                </div>
                <span style={{
                  fontSize: 13,
                  color: step.done ? "var(--d-ink3)" : "var(--d-ink)",
                  textDecoration: step.done ? "line-through" : "none",
                }}>{step.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Flagship course cards */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h2 className="d-display" style={{ fontSize: 18, color: "var(--d-ink)" }}>Turpini mācīties</h2>
          <Link href="/dashboard/kursi" style={{ fontSize: 12, color: "#00ff88", textDecoration: "none" }}>Visi kursi →</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }}>
          {FLAGSHIP.map((c) => (
            <Link key={c.id} href={`/kursi/${c.slug}`} className="d-card d-card-hover" style={{ overflow: "hidden", textDecoration: "none", display: "block" }}>
              {/* Cover */}
              <div style={{
                height: 96, position: "relative",
                background: `linear-gradient(135deg, ${c.color}22 0%, rgba(5,8,15,0.95) 100%)`,
                borderBottom: "1px solid var(--d-border)",
              }}>
                <div className="d-mono" style={{ position: "absolute", left: 14, top: 14, fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: c.color }}>{c.num}</div>
                <div className="d-display" style={{ position: "absolute", left: 14, bottom: 12, right: 14, fontSize: 16, lineHeight: 1.1, color: "#fff" }}>{c.title}</div>
              </div>
              {/* Body */}
              <div style={{ padding: 14 }}>
                <div style={{ fontSize: 12, color: "var(--d-ink2)", lineHeight: 1.5, marginBottom: 12 }}>{c.promise}</div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--d-ink3)" }}>
                  <span>{c.duration}</span>
                  <span style={{ color: c.color }}>{c.level}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
