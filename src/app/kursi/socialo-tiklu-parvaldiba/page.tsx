"use client";
import { useState } from "react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────
type LessonType = "video" | "text" | "task" | "quiz";
interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  duration: string;
  free?: boolean;
  description?: string;
}
interface Module {
  id: number;
  title: string;
  duration: string;
  lessons: Lesson[];
}

// ─── Course Data ──────────────────────────────────────────────────────────────
const course = {
  title: "Sociālo Tīklu Pārvaldība",
  subtitle: "AI video, attēli un reklāmas saturs uzņēmumiem",
  description:
    "Iemācies veidot pilnu sociālo mediju klātbūtni uzņēmumiem ar mākslīgo intelektu. No AI faceless video līdz reklāmas banneriem — viss, kas nepieciešams, lai iegūtu pirmos klientus un nopelnītu €300–€800 mēnesī.",
  earn: "€300–€800/mēn",
  difficulty: "Iesācējs",
  tag: "Populārs",
  totalDuration: "8h 5 min",
  totalLessons: 24,
  totalModules: 6,
  students: 127,
  rating: 4.9,
  instructor: {
    name: "Kārlis Bērziņš",
    role: "AI Automatizācijas Eksperts",
    avatar: "KB",
    bio: "5+ gadi digitālā mārketingā, pēdējos 2 gadus specializējoties AI risinājumos Latvijas uzņēmumiem. Personīgi pārvalda 12 klientu sociālo mediju kontus ar AI.",
    students: 420,
    courses: 3,
  },
  tools: [
    { name: "Runway ML", desc: "AI video ģenerēšana", color: "#a855f7" },
    { name: "HeyGen", desc: "AI avatar video", color: "#ec4899" },
    { name: "CapCut", desc: "Automātiskā rediģēšana", color: "#00d4ff" },
    { name: "Midjourney", desc: "Attēlu ģenerēšana", color: "#00ff88" },
    { name: "Canva AI", desc: "Reklāmu dizains", color: "#f59e0b" },
    { name: "Adobe Firefly", desc: "Produktu attēli", color: "#ef4444" },
    { name: "Buffer", desc: "Publicēšanas grafiks", color: "#8b5cf6" },
  ],
  learn: [
    "Izveidot AI faceless video bez parādīšanās kamerā",
    "Ģenerēt profesionālus reklāmas bannerus sekundēs",
    "Veidot konsekventu brand identity ar Midjourney",
    "Automatizēt publicēšanu ar Buffer/Later",
    "Atrast pirmos klientus un noteikt cenas",
    "Pārvaldīt 5+ klientus vienlaicīgi",
    "Rakstīt cold outreach skriptus kas strādā",
    "Veidot klientu atskaites un noturēt attiecības",
  ],
  modules: [
    {
      id: 1,
      title: "Ievads & Setup",
      duration: "45 min",
      lessons: [
        { id: "1-1", title: "Kas ir AI sociālo mediju menedžments?", type: "video" as LessonType, duration: "12 min", free: true, description: "Pārskats par pakalpojumu, tirgus iespēju un ko mēs veidosim šajā kursā." },
        { id: "1-2", title: "Rīku saraksts & konta setup", type: "video" as LessonType, duration: "10 min", free: true, description: "Uzstādām visus nepieciešamos rīkus — Runway, HeyGen, Canva Pro, Buffer." },
        { id: "1-3", title: "Klienta onboarding process", type: "text" as LessonType, duration: "8 min", description: "Lejupielādējams onboarding template ar jautājumiem, ko uzdot katram jaunam klientam." },
        { id: "1-4", title: "Kā noteikt pakalpojumu cenas", type: "video" as LessonType, duration: "15 min", description: "Cenu stratēģija iesācējiem — kāpēc €300/mēn ir saprātīgi sākuma un kā augt uz €800+." },
      ],
    },
    {
      id: 2,
      title: "AI Faceless Video",
      duration: "1h 40 min",
      lessons: [
        { id: "2-1", title: "Kas ir faceless video un kāpēc tas strādā?", type: "video" as LessonType, duration: "15 min", description: "Psiholoģija aiz faceless satura — kāpēc uzņēmumi to mīl un kā tas pārdod." },
        { id: "2-2", title: "Runway ML — video ģenerēšana no teksta", type: "video" as LessonType, duration: "25 min", description: "Pilna Runway ML apmācība: prompting, stila izvēle, video ilgums, eksportēšana." },
        { id: "2-3", title: "HeyGen — AI avatar prezentācijas", type: "video" as LessonType, duration: "22 min", description: "Izveido talking head video ar AI avatāru — produktu apskati, uzņēmuma stāsti." },
        { id: "2-4", title: "CapCut AI automātiskā rediģēšana", type: "video" as LessonType, duration: "18 min", description: "Auto subtitles, auto cut, B-roll pievienošana — video gatavs 10 minūtēs." },
        { id: "2-5", title: "Uzdevums: izveido savu pirmo video", type: "task" as LessonType, duration: "20 min", description: "Izveido 30 sek. faceless video kādam vietējam uzņēmumam (restorāns, veikals, u.c.)." },
      ],
    },
    {
      id: 3,
      title: "Reklāmas Banneri",
      duration: "1h 15 min",
      lessons: [
        { id: "3-1", title: "Canva AI — reklāmu dizains sekundēs", type: "video" as LessonType, duration: "20 min", description: "Magic Design, AI background removal, brand kit setup klienta biznesam." },
        { id: "3-2", title: "Midjourney prompts biznesam", type: "video" as LessonType, duration: "22 min", description: "Specifiskas prompt formulas kas dod kommercāli izmantojamus attēlus pirmajā reizē." },
        { id: "3-3", title: "Adobe Firefly — produktu attēli", type: "video" as LessonType, duration: "18 min", description: "Generative fill produktu fotografijās — maini fonu, pievieni props, koriģē apgaismojumu." },
        { id: "3-4", title: "Uzdevums: 5 banneru komplekts klientam", type: "task" as LessonType, duration: "15 min", description: "Izveido pilnu banneru setu: Facebook, Instagram, Stories un LinkedIn formātos." },
      ],
    },
    {
      id: 4,
      title: "Post Vizuāļi & Feed",
      duration: "1h 10 min",
      lessons: [
        { id: "4-1", title: "Instagram & Facebook feed dizains", type: "video" as LessonType, duration: "20 min", description: "Kā plānot feed tā, lai 9 posti izskatītos kā viens, saskaņots dizains." },
        { id: "4-2", title: "Konsistenta brand identity ar AI", type: "video" as LessonType, duration: "18 min", description: "Krāsu palete, fonti, logo usage — izveido mini brand guide katram klientam." },
        { id: "4-3", title: "Carousels & Stories templates", type: "video" as LessonType, duration: "16 min", description: "Ātri carousel un stories templates ko var pielāgot jebkuram klientam 5 minūtēs." },
        { id: "4-4", title: "AI caption ģenerēšana & publicēšanas grafiks", type: "video" as LessonType, duration: "16 min", description: "ChatGPT/Claude prompt sistēma mēneša captions ģenerēšanai — iknedēļas rutīna." },
      ],
    },
    {
      id: 5,
      title: "Klientu Atrašana & Pārdošana",
      duration: "1h 20 min",
      lessons: [
        { id: "5-1", title: "Kur atrast pirmos klientus Latvijā", type: "video" as LessonType, duration: "20 min", description: "Konkrētas vietas: ss.lv, LinkedIn, Facebook grupas, vietējie pasākumi, cold walk-in." },
        { id: "5-2", title: "Cold outreach skripti (e-pasts & DM)", type: "text" as LessonType, duration: "15 min", description: "5 darbojošies skripti ar reāliem rezultātiem — copy-paste gatavi tavam biznesam." },
        { id: "5-3", title: "Proposal & līguma templates", type: "text" as LessonType, duration: "15 min", description: "Lejupielādējams PDF proposal un vienkāršs pakalpojumu līgums latviešu valodā." },
        { id: "5-4", title: "Klienta onboarding & pirmā tikšanās", type: "video" as LessonType, duration: "30 min", description: "Ko teikt pirmajā zvanā — klausies reālu demo zvanu ar potenciālo klientu." },
      ],
    },
    {
      id: 6,
      title: "Automatizācija & Skalēšana",
      duration: "55 min",
      lessons: [
        { id: "6-1", title: "Buffer/Later — publicēšanas automatizācija", type: "video" as LessonType, duration: "20 min", description: "Ieplāno mēneša saturu 2 stundās — Buffer setup, apstiprinājumu workflow, analytics." },
        { id: "6-2", title: "Kā veidot ikmēneša atskaites klientiem", type: "text" as LessonType, duration: "15 min", description: "Lejupielādējams atskaites template ar KPI's ko klienti saprot un novērtē." },
        { id: "6-3", title: "Pārvaldīt 5+ klientus vienlaicīgi", type: "video" as LessonType, duration: "20 min", description: "Laika pārvaldība, Notion client dashboard, automatizācijas kas ietaupa 10+ stundas nedēļā." },
      ],
    },
  ] as Module[],
};

// ─── Icon Components ──────────────────────────────────────────────────────────
function VideoIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <polygon points="5,3 19,12 5,21" fill="currentColor" />
    </svg>
  );
}
function TextIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="16" y2="12" /><line x1="3" y1="18" x2="13" y2="18" />
    </svg>
  );
}
function TaskIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
    </svg>
  );
}
function LockIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
}
function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}
    >
      <polyline points="6,9 12,15 18,9" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" stroke="none">
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );
}

const lessonIcon = (type: LessonType) => {
  if (type === "video") return <VideoIcon />;
  if (type === "text") return <TextIcon />;
  if (type === "task") return <TaskIcon />;
  return <TextIcon />;
};

const lessonTypeLabel: Record<LessonType, string> = {
  video: "Video",
  text: "Teksts",
  task: "Uzdevums",
  quiz: "Tests",
};

const lessonTypeColor: Record<LessonType, string> = {
  video: "#a855f7",
  text: "#00d4ff",
  task: "#00ff88",
  quiz: "#f59e0b",
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CourseDetailPage() {
  const [openModules, setOpenModules] = useState<number[]>([1, 2]);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "curriculum" | "tools">("overview");

  const toggleModule = (id: number) =>
    setOpenModules((prev) => (prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]));

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <div style={{ background: "#050508", minHeight: "100vh", color: "#fff", fontFamily: "'Inter', sans-serif" }}>
      {/* ── Top Navbar ── */}
      <nav
        style={{
          position: "sticky", top: 0, zIndex: 50, height: 56,
          background: "rgba(5,5,8,0.92)", backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex", alignItems: "center", padding: "0 20px", gap: 12,
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex", alignItems: "center", gap: 8,
            color: "#888", fontSize: 13, fontWeight: 500, textDecoration: "none",
            padding: "5px 10px", borderRadius: 8,
            transition: "color 0.2s, background 0.2s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.05)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#888"; (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15,18 9,12 15,6" />
          </svg>
          Atpakaļ
        </Link>
        <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 13 }}>/</span>
        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>Kursi</span>
        <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 13 }}>/</span>
        <span style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>{course.title}</span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              fontSize: 11, padding: "3px 10px", borderRadius: 20,
              background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.3)",
              color: "#a855f7", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase",
            }}
          >
            {course.difficulty}
          </span>
          <span
            style={{
              fontSize: 11, padding: "3px 10px", borderRadius: 20,
              background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.25)",
              color: "#00ff88", fontWeight: 700,
            }}
          >
            {course.earn}
          </span>
        </div>
      </nav>

      {/* ── Layout: Sidebar + Main ── */}
      <div style={{ display: "flex", height: "calc(100vh - 56px)" }}>

        {/* ── LEFT SIDEBAR ── */}
        <aside
          style={{
            width: 300, flexShrink: 0,
            background: "#07070f",
            borderRight: "1px solid rgba(255,255,255,0.05)",
            overflowY: "auto", display: "flex", flexDirection: "column",
          }}
        >
          {/* Sidebar header */}
          <div style={{ padding: "20px 16px 16px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div
                style={{
                  width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                  background: "linear-gradient(135deg, rgba(168,85,247,0.3), rgba(236,72,153,0.3))",
                  border: "1px solid rgba(168,85,247,0.3)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="2" width="9" height="9" rx="2" fill="url(#sidebar-g1)" opacity="0.9"/>
                  <rect x="13" y="2" width="9" height="9" rx="2" fill="url(#sidebar-g1)" opacity="0.6"/>
                  <rect x="2" y="13" width="9" height="9" rx="2" fill="url(#sidebar-g1)" opacity="0.6"/>
                  <rect x="13" y="13" width="9" height="9" rx="2" fill="url(#sidebar-g1)" opacity="0.3"/>
                  <circle cx="17.5" cy="17.5" r="2" fill="url(#sidebar-g1)"/>
                  <defs>
                    <linearGradient id="sidebar-g1" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#a855f7"/><stop offset="1" stopColor="#ec4899"/>
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>{course.title}</div>
                <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{totalLessons} nodarbības · {course.totalDuration}</div>
              </div>
            </div>
            {/* Progress bar */}
            <div style={{ marginBottom: 4 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: "#555" }}>Progress</span>
                <span style={{ fontSize: 11, color: "#a855f7", fontWeight: 600 }}>0%</span>
              </div>
              <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 4 }}>
                <div style={{ width: "0%", height: "100%", borderRadius: 4, background: "linear-gradient(90deg, #a855f7, #ec4899)" }} />
              </div>
            </div>
          </div>

          {/* Module list */}
          <div style={{ padding: "8px 0", flex: 1 }}>
            {course.modules.map((mod) => {
              const isOpen = openModules.includes(mod.id);
              return (
                <div key={mod.id}>
                  {/* Module header */}
                  <button
                    onClick={() => toggleModule(mod.id)}
                    style={{
                      width: "100%", display: "flex", alignItems: "center", gap: 10,
                      padding: "10px 16px", background: "transparent", border: "none",
                      cursor: "pointer", color: "#fff", textAlign: "left",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <div
                      style={{
                        width: 22, height: 22, borderRadius: 6, flexShrink: 0,
                        background: isOpen ? "rgba(168,85,247,0.2)" : "rgba(255,255,255,0.05)",
                        border: `1px solid ${isOpen ? "rgba(168,85,247,0.4)" : "rgba(255,255,255,0.08)"}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 10, fontWeight: 800,
                        color: isOpen ? "#a855f7" : "#555",
                      }}
                    >
                      {mod.id}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: isOpen ? "#fff" : "#aaa" }}>{mod.title}</div>
                      <div style={{ fontSize: 10, color: "#444", marginTop: 1 }}>
                        {mod.lessons.length} nodarbības · {mod.duration}
                      </div>
                    </div>
                    <div style={{ color: "#444", flexShrink: 0 }}>
                      <ChevronIcon open={isOpen} />
                    </div>
                  </button>

                  {/* Lesson list */}
                  {isOpen && (
                    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                      {mod.lessons.map((lesson) => {
                        const isActive = activeLesson?.id === lesson.id;
                        return (
                          <button
                            key={lesson.id}
                            onClick={() => setActiveLesson(lesson)}
                            style={{
                              width: "100%", display: "flex", alignItems: "center", gap: 10,
                              padding: "8px 16px 8px 24px", border: "none", cursor: "pointer", textAlign: "left",
                              background: isActive
                                ? "rgba(168,85,247,0.1)"
                                : "transparent",
                              borderLeft: isActive
                                ? "2px solid #a855f7"
                                : "2px solid transparent",
                              transition: "background 0.15s",
                            }}
                            onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.03)"; }}
                            onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                          >
                            <div
                              style={{
                                width: 20, height: 20, borderRadius: 5, flexShrink: 0,
                                background: isActive ? "rgba(168,85,247,0.2)" : "rgba(255,255,255,0.04)",
                                border: `1px solid ${isActive ? "rgba(168,85,247,0.3)" : "rgba(255,255,255,0.06)"}`,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                color: isActive ? "#a855f7" : lessonTypeColor[lesson.type],
                              }}
                            >
                              {lessonIcon(lesson.type)}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div
                                style={{
                                  fontSize: 11.5, fontWeight: isActive ? 600 : 400,
                                  color: isActive ? "#fff" : "#888",
                                  whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                                }}
                              >
                                {lesson.title}
                              </div>
                              <div style={{ fontSize: 10, color: "#444", marginTop: 1 }}>
                                {lessonTypeLabel[lesson.type]} · {lesson.duration}
                              </div>
                            </div>
                            {lesson.free ? (
                              <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 4, background: "rgba(0,255,136,0.1)", color: "#00ff88", fontWeight: 700, flexShrink: 0 }}>
                                BEZMAKSAS
                              </span>
                            ) : (
                              <span style={{ color: "#333", flexShrink: 0 }}><LockIcon /></span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Enroll CTA */}
          <div style={{ padding: 16, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <button
              style={{
                width: "100%", padding: "11px 0", borderRadius: 10, border: "none", cursor: "pointer",
                background: "linear-gradient(135deg, #a855f7, #ec4899)",
                color: "#fff", fontWeight: 700, fontSize: 13, letterSpacing: "0.02em",
                boxShadow: "0 4px 20px rgba(168,85,247,0.3)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 30px rgba(168,85,247,0.4)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(168,85,247,0.3)"; }}
            >
              Sākt kursu — {course.earn}
            </button>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 10, color: "#444" }}>
              ✓ Bezmaksas pirmās 2 nodarbības · ✓ Pilna piekļuve ar Pro
            </div>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main style={{ flex: 1, overflowY: "auto" }}>
          {activeLesson ? (
            /* ── LESSON VIEW ── */
            <LessonView lesson={activeLesson} onBack={() => setActiveLesson(null)} />
          ) : (
            /* ── COURSE OVERVIEW ── */
            <div>
              {/* Hero banner */}
              <div
                style={{
                  position: "relative", padding: "48px 48px 40px",
                  background: "linear-gradient(135deg, rgba(168,85,247,0.12) 0%, rgba(236,72,153,0.08) 50%, rgba(5,5,8,0) 100%)",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  overflow: "hidden",
                }}
              >
                {/* Background grid */}
                <div
                  style={{
                    position: "absolute", inset: 0, pointerEvents: "none",
                    backgroundImage: "linear-gradient(rgba(168,85,247,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.04) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />
                {/* Glow orb */}
                <div
                  style={{
                    position: "absolute", top: -80, right: -80, width: 320, height: 320, borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(168,85,247,0.15), transparent 70%)",
                    pointerEvents: "none",
                  }}
                />

                <div style={{ position: "relative" }}>
                  {/* Tags */}
                  <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 11, padding: "4px 12px", borderRadius: 20, background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.3)", color: "#a855f7", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {course.tag}
                    </span>
                    <span style={{ fontSize: 11, padding: "4px 12px", borderRadius: 20, background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.2)", color: "#00ff88", fontWeight: 600 }}>
                      {course.difficulty}
                    </span>
                  </div>

                  <h1 style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 10, lineHeight: 1.1 }}>
                    {course.title}
                  </h1>
                  <p style={{ fontSize: 16, color: "#888", maxWidth: 640, lineHeight: 1.7, marginBottom: 28 }}>
                    {course.description}
                  </p>

                  {/* Stats row */}
                  <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                    {[
                      { label: "Moduļi", value: course.totalModules },
                      { label: "Nodarbības", value: totalLessons },
                      { label: "Ilgums", value: course.totalDuration },
                      { label: "Studenti", value: course.students },
                    ].map((stat) => (
                      <div key={stat.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>{stat.value}</span>
                        <span style={{ fontSize: 12, color: "#555" }}>{stat.label}</span>
                      </div>
                    ))}
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <StarIcon />
                      <span style={{ fontSize: 14, fontWeight: 700, color: "#f59e0b" }}>{course.rating}</span>
                      <span style={{ fontSize: 12, color: "#555" }}>vērtējums</span>
                    </div>
                    <div style={{ marginLeft: "auto", display: "flex", alignItems: "baseline", gap: 4 }}>
                      <span style={{ fontSize: 28, fontWeight: 900, background: "linear-gradient(135deg, #a855f7, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                        {course.earn}
                      </span>
                      <span style={{ fontSize: 12, color: "#555" }}>potenciāls</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div style={{ padding: "0 48px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: 0 }}>
                {(["overview", "curriculum", "tools"] as const).map((tab) => {
                  const labels = { overview: "Pārskats", curriculum: "Programma", tools: "Rīki" };
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      style={{
                        padding: "14px 20px", border: "none", background: "transparent", cursor: "pointer",
                        fontSize: 13, fontWeight: isActive ? 600 : 400,
                        color: isActive ? "#fff" : "#555",
                        borderBottom: isActive ? "2px solid #a855f7" : "2px solid transparent",
                        transition: "color 0.2s, border-color 0.2s",
                      }}
                    >
                      {labels[tab]}
                    </button>
                  );
                })}
              </div>

              {/* Tab content */}
              <div style={{ padding: "40px 48px", maxWidth: 900 }}>
                {activeTab === "overview" && <OverviewTab />}
                {activeTab === "curriculum" && <CurriculumTab onSelectLesson={setActiveLesson} />}
                {activeTab === "tools" && <ToolsTab />}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// ─── Overview Tab ─────────────────────────────────────────────────────────────
function OverviewTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
      {/* Ko tu iemācīsies */}
      <div>
        <SectionLabel>Ko tu iemācīsies</SectionLabel>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20, letterSpacing: "-0.02em" }}>
          No nulles līdz pirmajam klientam
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {course.learn.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex", alignItems: "flex-start", gap: 10,
                padding: "14px 16px", borderRadius: 10,
                background: "rgba(168,85,247,0.04)", border: "1px solid rgba(168,85,247,0.1)",
              }}
            >
              <div style={{ width: 18, height: 18, borderRadius: 5, background: "rgba(168,85,247,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="3">
                  <polyline points="20,6 9,17 4,12" />
                </svg>
              </div>
              <span style={{ fontSize: 13, color: "#ccc", lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Kursa saturs kopsavilkums */}
      <div>
        <SectionLabel>Kursa saturs</SectionLabel>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20, letterSpacing: "-0.02em" }}>
          {course.totalModules} moduļi · {course.totalLessons} nodarbības
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {course.modules.map((mod) => (
            <div
              key={mod.id}
              style={{
                padding: "16px", borderRadius: 12,
                background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#a855f7" }}>
                  {mod.id}
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{mod.title}</span>
              </div>
              <div style={{ fontSize: 11, color: "#555", marginBottom: 8 }}>
                {mod.lessons.length} nodarbības · {mod.duration}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {mod.lessons.slice(0, 3).map((l) => (
                  <span
                    key={l.id}
                    style={{
                      fontSize: 10, padding: "2px 7px", borderRadius: 4,
                      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)",
                      color: "#666",
                    }}
                  >
                    {l.type === "task" ? "🎯" : l.type === "text" ? "📄" : "▶"} {l.duration}
                  </span>
                ))}
                {mod.lessons.length > 3 && (
                  <span style={{ fontSize: 10, color: "#444", padding: "2px 4px" }}>+{mod.lessons.length - 3}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Priekšrocības */}
      <div>
        <SectionLabel>Kāpēc šis kurss</SectionLabel>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20, letterSpacing: "-0.02em" }}>
          Reāli rezultāti, ne tikai teorija
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {[
            { icon: "🎯", title: "Projektu bāzēta", desc: "Katra moduļa beigās ir praktisks uzdevums, ko vari iekļaut portfolio." },
            { icon: "📦", title: "Gatavi templates", desc: "Proposal, līgums, onboarding, atskaite — viss lejupielādājams." },
            { icon: "🇱🇻", title: "Latvijas tirgum", desc: "Cold outreach skripti, cenas un stratēģijas Latvijas realitātei." },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                padding: "20px", borderRadius: 12,
                background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: "#666", lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Instructor */}
      <div>
        <SectionLabel>Pasniedzējs</SectionLabel>
        <div
          style={{
            display: "flex", alignItems: "flex-start", gap: 20, padding: "24px",
            borderRadius: 16, background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            style={{
              width: 64, height: 64, borderRadius: 16, flexShrink: 0,
              background: "linear-gradient(135deg, #a855f7, #ec4899)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20, fontWeight: 800, color: "#fff",
            }}
          >
            {course.instructor.avatar}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <span style={{ fontSize: 16, fontWeight: 800 }}>{course.instructor.name}</span>
              <span
                style={{
                  fontSize: 11, padding: "2px 8px", borderRadius: 6,
                  background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.25)",
                  color: "#a855f7",
                }}
              >
                {course.instructor.role}
              </span>
            </div>
            <p style={{ fontSize: 13, color: "#777", lineHeight: 1.7, marginBottom: 14 }}>
              {course.instructor.bio}
            </p>
            <div style={{ display: "flex", gap: 20 }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#a855f7" }}>{course.instructor.students}+</div>
                <div style={{ fontSize: 11, color: "#555" }}>studenti</div>
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#a855f7" }}>{course.instructor.courses}</div>
                <div style={{ fontSize: 11, color: "#555" }}>kursi</div>
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#f59e0b" }}>4.9 ★</div>
                <div style={{ fontSize: 11, color: "#555" }}>vidējais vērtējums</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div
        style={{
          padding: "36px", borderRadius: 20,
          background: "linear-gradient(135deg, rgba(168,85,247,0.12), rgba(236,72,153,0.08))",
          border: "1px solid rgba(168,85,247,0.2)",
          textAlign: "center",
        }}
      >
        <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 8, letterSpacing: "-0.02em" }}>
          Gatavs sākt nopelnīt {course.earn}?
        </h3>
        <p style={{ fontSize: 14, color: "#777", marginBottom: 24 }}>
          Pievienojies {course.students} studentiem kas jau apgūst šo kursu.
        </p>
        <button
          style={{
            padding: "14px 40px", borderRadius: 12, border: "none", cursor: "pointer",
            background: "linear-gradient(135deg, #a855f7, #ec4899)",
            color: "#fff", fontWeight: 700, fontSize: 15,
            boxShadow: "0 8px 30px rgba(168,85,247,0.35)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 40px rgba(168,85,247,0.45)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 30px rgba(168,85,247,0.35)"; }}
        >
          Sākt kursu — pirmās 2 nodarbības bezmaksas
        </button>
      </div>
    </div>
  );
}

// ─── Curriculum Tab ───────────────────────────────────────────────────────────
function CurriculumTab({ onSelectLesson }: { onSelectLesson: (l: Lesson) => void }) {
  const [open, setOpen] = useState<number[]>(course.modules.map((m) => m.id));
  const toggle = (id: number) => setOpen((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <SectionLabel>Mācību programma</SectionLabel>
          <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em" }}>
            {course.totalModules} moduļi · {course.totalLessons} nodarbības · {course.totalDuration}
          </h2>
        </div>
        <button
          onClick={() => setOpen(open.length === course.modules.length ? [] : course.modules.map((m) => m.id))}
          style={{ fontSize: 12, color: "#a855f7", background: "transparent", border: "none", cursor: "pointer", fontWeight: 600 }}
        >
          {open.length === course.modules.length ? "Aizvērt visus" : "Atvērt visus"}
        </button>
      </div>

      {course.modules.map((mod) => {
        const isOpen = open.includes(mod.id);
        return (
          <div
            key={mod.id}
            style={{
              borderRadius: 12, overflow: "hidden",
              border: isOpen ? "1px solid rgba(168,85,247,0.2)" : "1px solid rgba(255,255,255,0.06)",
              background: "#0d0d1a",
              transition: "border-color 0.2s",
            }}
          >
            <button
              onClick={() => toggle(mod.id)}
              style={{
                width: "100%", padding: "16px 20px", display: "flex", alignItems: "center", gap: 12,
                background: "transparent", border: "none", cursor: "pointer", color: "#fff",
              }}
            >
              <div
                style={{
                  width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                  background: isOpen ? "rgba(168,85,247,0.2)" : "rgba(255,255,255,0.05)",
                  border: `1px solid ${isOpen ? "rgba(168,85,247,0.4)" : "rgba(255,255,255,0.1)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 800, color: isOpen ? "#a855f7" : "#555",
                }}
              >
                {mod.id}
              </div>
              <div style={{ flex: 1, textAlign: "left" }}>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{mod.title}</div>
                <div style={{ fontSize: 12, color: "#555", marginTop: 2 }}>
                  {mod.lessons.length} nodarbības · {mod.duration}
                </div>
              </div>
              <div style={{ color: "#444" }}><ChevronIcon open={isOpen} /></div>
            </button>

            {isOpen && (
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                {mod.lessons.map((lesson, idx) => (
                  <button
                    key={lesson.id}
                    onClick={() => onSelectLesson(lesson)}
                    style={{
                      width: "100%", display: "flex", alignItems: "center", gap: 14,
                      padding: "12px 20px", background: "transparent", border: "none",
                      cursor: "pointer", textAlign: "left",
                      borderTop: idx > 0 ? "1px solid rgba(255,255,255,0.03)" : "none",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(168,85,247,0.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <div
                      style={{
                        width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                        background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: lessonTypeColor[lesson.type],
                      }}
                    >
                      {lessonIcon(lesson.type)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "#ddd", marginBottom: 2 }}>
                        {lesson.title}
                      </div>
                      {lesson.description && (
                        <div style={{ fontSize: 11, color: "#555", lineHeight: 1.5 }}>
                          {lesson.description}
                        </div>
                      )}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                      {lesson.free && (
                        <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 4, background: "rgba(0,255,136,0.1)", color: "#00ff88", fontWeight: 700 }}>
                          BEZMAKSAS
                        </span>
                      )}
                      <span style={{ fontSize: 11, color: "#444" }}>{lesson.duration}</span>
                      {!lesson.free && <span style={{ color: "#333" }}><LockIcon /></span>}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Tools Tab ────────────────────────────────────────────────────────────────
function ToolsTab() {
  return (
    <div>
      <SectionLabel>Izmantotie rīki</SectionLabel>
      <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, letterSpacing: "-0.02em" }}>
        7 AI rīki ko apgūsi kursā
      </h2>
      <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7, marginBottom: 32 }}>
        Visi nepieciešamie rīki ar bezmaksas plāniem vai izmēģinājuma periodiem. Setup instrukcijas iekļautas kursā.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 40 }}>
        {course.tools.map((tool) => (
          <div
            key={tool.name}
            style={{
              padding: "20px", borderRadius: 14,
              background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.06)",
              display: "flex", alignItems: "center", gap: 16,
              transition: "border-color 0.2s, transform 0.2s",
              cursor: "default",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = `${tool.color}33`; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
          >
            <div
              style={{
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                background: `${tool.color}18`, border: `1px solid ${tool.color}33`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20,
              }}
            >
              {tool.name === "Runway ML" ? "🎬" : tool.name === "HeyGen" ? "🤖" : tool.name === "CapCut" ? "✂️" : tool.name === "Midjourney" ? "🎨" : tool.name === "Canva AI" ? "🖌️" : tool.name === "Adobe Firefly" ? "🔥" : "📅"}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 3 }}>{tool.name}</div>
              <div style={{ fontSize: 12, color: "#555" }}>{tool.desc}</div>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: tool.color, boxShadow: `0 0 8px ${tool.color}` }} />
            </div>
          </div>
        ))}
      </div>

      {/* What you need */}
      <div
        style={{
          padding: "24px", borderRadius: 14,
          background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.12)",
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 700, color: "#00ff88", marginBottom: 12 }}>
          ✓ Kas nepieciešams lai sāktu
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[
            "Dators vai klēpjdators (Windows/Mac)",
            "Stabils interneta savienojums",
            "E-pasta adrese kontiem",
            "~€20–50/mēn rīku izmaksas (sākumā)",
            "5–10 stundas nedēļā ieguldījumam",
            "Nekādas programmēšanas zināšanas nav vajadzīgas",
          ].map((req) => (
            <div key={req} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12, color: "#888" }}>
              <span style={{ color: "#00ff88", flexShrink: 0, marginTop: 1 }}>✓</span>
              {req}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Lesson View ──────────────────────────────────────────────────────────────
function LessonView({ lesson, onBack }: { lesson: Lesson; onBack: () => void }) {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 48px" }}>
      <button
        onClick={onBack}
        style={{
          display: "flex", alignItems: "center", gap: 8, marginBottom: 28,
          background: "transparent", border: "none", cursor: "pointer",
          color: "#666", fontSize: 13, fontWeight: 500,
          padding: "6px 0", transition: "color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <polyline points="15,18 9,12 15,6" />
        </svg>
        Atpakaļ uz kursa pārskatu
      </button>

      {/* Lesson type badge */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <span
          style={{
            display: "flex", alignItems: "center", gap: 5,
            fontSize: 11, padding: "4px 10px", borderRadius: 6,
            background: `${lessonTypeColor[lesson.type]}18`,
            border: `1px solid ${lessonTypeColor[lesson.type]}33`,
            color: lessonTypeColor[lesson.type], fontWeight: 600,
          }}
        >
          {lessonIcon(lesson.type)}
          {lessonTypeLabel[lesson.type]}
        </span>
        <span style={{ fontSize: 11, color: "#444" }}>{lesson.duration}</span>
      </div>

      <h1 style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.025em", marginBottom: 24, lineHeight: 1.2 }}>
        {lesson.title}
      </h1>

      {/* Video player placeholder */}
      {lesson.type === "video" && (
        <div
          style={{
            width: "100%", aspectRatio: "16/9", borderRadius: 16, marginBottom: 32,
            background: "linear-gradient(135deg, #0d0d1a 0%, #12081f 100%)",
            border: "1px solid rgba(168,85,247,0.2)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            gap: 16, cursor: "pointer", position: "relative", overflow: "hidden",
            transition: "border-color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(168,85,247,0.4)")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(168,85,247,0.2)")}
        >
          {/* Grid bg */}
          <div
            style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              backgroundImage: "linear-gradient(rgba(168,85,247,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.03) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
          {/* Glow */}
          <div
            style={{
              position: "absolute", width: 300, height: 300,
              background: "radial-gradient(circle, rgba(168,85,247,0.1), transparent 70%)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              width: 72, height: 72, borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(168,85,247,0.3), rgba(236,72,153,0.3))",
              border: "2px solid rgba(168,85,247,0.5)",
              display: "flex", alignItems: "center", justifyContent: "center",
              position: "relative",
            }}
          >
            <div style={{ marginLeft: 4 }}>
              <VideoIcon size={28} />
            </div>
          </div>
          <div style={{ textAlign: "center", position: "relative" }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 4 }}>
              Video — {lesson.duration}
            </div>
            <div style={{ fontSize: 12, color: "#555" }}>Pieejams ar Pro plānu</div>
          </div>
        </div>
      )}

      {/* Lesson content */}
      {lesson.description && (
        <div
          style={{
            padding: "24px", borderRadius: 12, marginBottom: 24,
            background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 700, color: "#a855f7", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>
            Par šo nodarbību
          </div>
          <p style={{ fontSize: 14, color: "#aaa", lineHeight: 1.8 }}>{lesson.description}</p>
        </div>
      )}

      {/* Task specific */}
      {lesson.type === "task" && (
        <div
          style={{
            padding: "24px", borderRadius: 12, marginBottom: 24,
            background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.15)",
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 700, color: "#00ff88", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>
            🎯 Praktiskais uzdevums
          </div>
          <div style={{ fontSize: 13, color: "#888", lineHeight: 1.8 }}>
            Izpildi uzdevumu un augšupielādē savu darbu — tas būs daļa no tava portfolio, ko vari rādīt potenciālajiem klientiem.
          </div>
          <button
            style={{
              marginTop: 16, padding: "10px 24px", borderRadius: 8, border: "none", cursor: "pointer",
              background: "rgba(0,255,136,0.15)", border: "1px solid rgba(0,255,136,0.3)" as never,
              color: "#00ff88", fontWeight: 700, fontSize: 13,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,255,136,0.25)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,255,136,0.15)")}
          >
            Iesniegt uzdevumu
          </button>
        </div>
      )}

      {/* Text content placeholder */}
      {lesson.type === "text" && (
        <div
          style={{
            padding: "24px", borderRadius: 12, marginBottom: 24,
            background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.12)",
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 700, color: "#00d4ff", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>
            📄 Lejupielādājams materiāls
          </div>
          <div style={{ fontSize: 13, color: "#888", lineHeight: 1.8, marginBottom: 14 }}>
            Šī nodarbība ietver lejupielādājamu template, ko vari tūlīt izmantot darbā ar klientiem.
          </div>
          <button
            style={{
              padding: "10px 24px", borderRadius: 8, border: "none", cursor: "pointer",
              background: "rgba(0,212,255,0.12)", border: "1px solid rgba(0,212,255,0.25)" as never,
              color: "#00d4ff", fontWeight: 700, fontSize: 13,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,212,255,0.2)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,212,255,0.12)")}
          >
            ↓ Lejupielādēt (PDF)
          </button>
        </div>
      )}

      {/* Navigation */}
      <div
        style={{
          display: "flex", justifyContent: "space-between", paddingTop: 24,
          borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: 8,
        }}
      >
        <button
          onClick={onBack}
          style={{
            padding: "10px 20px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)",
            background: "transparent", color: "#666", fontSize: 13, cursor: "pointer", fontWeight: 500,
            transition: "color 0.2s, border-color 0.2s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#fff"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.2)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#666"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
        >
          ← Atpakaļ
        </button>
        <button
          style={{
            padding: "10px 24px", borderRadius: 8, border: "none", cursor: "pointer",
            background: "linear-gradient(135deg, #a855f7, #ec4899)",
            color: "#fff", fontSize: 13, fontWeight: 700,
            boxShadow: "0 4px 16px rgba(168,85,247,0.3)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 24px rgba(168,85,247,0.4)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 16px rgba(168,85,247,0.3)"; }}
        >
          Nākamā nodarbība →
        </button>
      </div>
    </div>
  );
}

// ─── Section Label Helper ─────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 11, fontWeight: 700, color: "#a855f7",
        textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8,
      }}
    >
      {children}
    </div>
  );
}
