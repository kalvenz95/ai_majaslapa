"use client";
import { useState } from "react";
import Link from "next/link";

// ā”€ā”€ā”€ Types ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€
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

// ā”€ā”€ā”€ Course Data ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€
const course = {
  title: "SociÄlo TÄ«klu PÄrvaldÄ«ba",
  subtitle: "AI video, attÄ“li un reklÄmas saturs uzÅ†Ä“mumiem",
  description:
    "IemÄcies veidot pilnu sociÄlo mediju klÄtbÅ«tni uzÅ†Ä“mumiem ar mÄkslÄ«go intelektu. No AI faceless video lÄ«dz reklÄmas banneriem ā€” viss, kas nepiecieÅams, lai iegÅ«tu pirmos klientus un nopelnÄ«tu ā‚¬300ā€“ā‚¬800 mÄ“nesÄ«.",
  earn: "ā‚¬300ā€“ā‚¬800/mÄ“n",
  difficulty: "IesÄcÄ“js",
  tag: "PopulÄrs",
  totalDuration: "8h 5 min",
  totalLessons: 24,
  totalModules: 6,
  students: 127,
  rating: 4.9,
  instructor: {
    name: "KÄrlis BÄ“rziÅ†Å",
    role: "AI AutomatizÄcijas Eksperts",
    avatar: "KB",
    bio: "5+ gadi digitÄlÄ mÄrketingÄ, pÄ“dÄ“jos 2 gadus specializÄ“joties AI risinÄjumos Latvijas uzÅ†Ä“mumiem. PersonÄ«gi pÄrvalda 12 klientu sociÄlo mediju kontus ar AI.",
    students: 420,
    courses: 3,
  },
  tools: [
    { name: "Runway ML", desc: "AI video Ä£enerÄ“Åana", color: "#a855f7" },
    { name: "HeyGen", desc: "AI avatar video", color: "#ec4899" },
    { name: "CapCut", desc: "AutomÄtiskÄ rediÄ£Ä“Åana", color: "#00d4ff" },
    { name: "Midjourney", desc: "AttÄ“lu Ä£enerÄ“Åana", color: "#00ff88" },
    { name: "Canva AI", desc: "ReklÄmu dizains", color: "#f59e0b" },
    { name: "Adobe Firefly", desc: "Produktu attÄ“li", color: "#ef4444" },
    { name: "Buffer", desc: "PublicÄ“Åanas grafiks", color: "#8b5cf6" },
  ],
  learn: [
    "Izveidot AI faceless video bez parÄdÄ«ÅanÄs kamerÄ",
    "Ä¢enerÄ“t profesionÄlus reklÄmas bannerus sekundÄ“s",
    "Veidot konsekventu brand identity ar Midjourney",
    "AutomatizÄ“t publicÄ“Åanu ar Buffer/Later",
    "Atrast pirmos klientus un noteikt cenas",
    "PÄrvaldÄ«t 5+ klientus vienlaicÄ«gi",
    "RakstÄ«t cold outreach skriptus kas strÄdÄ",
    "Veidot klientu atskaites un noturÄ“t attiecÄ«bas",
  ],
  modules: [
    {
      id: 1,
      title: "Ievads & Setup",
      duration: "45 min",
      lessons: [
        { id: "1-1", title: "Kas ir AI sociÄlo mediju menedÅ¾ments?", type: "video" as LessonType, duration: "12 min", free: true, description: "PÄrskats par pakalpojumu, tirgus iespÄ“ju un ko mÄ“s veidosim ÅajÄ kursÄ." },
        { id: "1-2", title: "RÄ«ku saraksts & konta setup", type: "video" as LessonType, duration: "10 min", free: true, description: "UzstÄdÄm visus nepiecieÅamos rÄ«kus ā€” Runway, HeyGen, Canva Pro, Buffer." },
        { id: "1-3", title: "Klienta onboarding process", type: "text" as LessonType, duration: "8 min", description: "LejupielÄdÄ“jams onboarding template ar jautÄjumiem, ko uzdot katram jaunam klientam." },
        { id: "1-4", title: "KÄ noteikt pakalpojumu cenas", type: "video" as LessonType, duration: "15 min", description: "Cenu stratÄ“Ä£ija iesÄcÄ“jiem ā€” kÄpÄ“c ā‚¬300/mÄ“n ir saprÄtÄ«gi sÄkuma un kÄ augt uz ā‚¬800+." },
      ],
    },
    {
      id: 2,
      title: "AI Faceless Video",
      duration: "1h 40 min",
      lessons: [
        { id: "2-1", title: "Kas ir faceless video un kÄpÄ“c tas strÄdÄ?", type: "video" as LessonType, duration: "15 min", description: "PsiholoÄ£ija aiz faceless satura ā€” kÄpÄ“c uzÅ†Ä“mumi to mÄ«l un kÄ tas pÄrdod." },
        { id: "2-2", title: "Runway ML ā€” video Ä£enerÄ“Åana no teksta", type: "video" as LessonType, duration: "25 min", description: "Pilna Runway ML apmÄcÄ«ba: prompting, stila izvÄ“le, video ilgums, eksportÄ“Åana." },
        { id: "2-3", title: "HeyGen ā€” AI avatar prezentÄcijas", type: "video" as LessonType, duration: "22 min", description: "Izveido talking head video ar AI avatÄru ā€” produktu apskati, uzÅ†Ä“muma stÄsti." },
        { id: "2-4", title: "CapCut AI automÄtiskÄ rediÄ£Ä“Åana", type: "video" as LessonType, duration: "18 min", description: "Auto subtitles, auto cut, B-roll pievienoÅana ā€” video gatavs 10 minÅ«tÄ“s." },
        { id: "2-5", title: "Uzdevums: izveido savu pirmo video", type: "task" as LessonType, duration: "20 min", description: "Izveido 30 sek. faceless video kÄdam vietÄ“jam uzÅ†Ä“mumam (restorÄns, veikals, u.c.)." },
      ],
    },
    {
      id: 3,
      title: "ReklÄmas Banneri",
      duration: "1h 15 min",
      lessons: [
        { id: "3-1", title: "Canva AI ā€” reklÄmu dizains sekundÄ“s", type: "video" as LessonType, duration: "20 min", description: "Magic Design, AI background removal, brand kit setup klienta biznesam." },
        { id: "3-2", title: "Midjourney prompts biznesam", type: "video" as LessonType, duration: "22 min", description: "Specifiskas prompt formulas kas dod kommercÄli izmantojamus attÄ“lus pirmajÄ reizÄ“." },
        { id: "3-3", title: "Adobe Firefly ā€” produktu attÄ“li", type: "video" as LessonType, duration: "18 min", description: "Generative fill produktu fotografijÄs ā€” maini fonu, pievieni props, koriÄ£Ä“ apgaismojumu." },
        { id: "3-4", title: "Uzdevums: 5 banneru komplekts klientam", type: "task" as LessonType, duration: "15 min", description: "Izveido pilnu banneru setu: Facebook, Instagram, Stories un LinkedIn formÄtos." },
      ],
    },
    {
      id: 4,
      title: "Post VizuÄÄ¼i & Feed",
      duration: "1h 10 min",
      lessons: [
        { id: "4-1", title: "Instagram & Facebook feed dizains", type: "video" as LessonType, duration: "20 min", description: "KÄ plÄnot feed tÄ, lai 9 posti izskatÄ«tos kÄ viens, saskaÅ†ots dizains." },
        { id: "4-2", title: "Konsistenta brand identity ar AI", type: "video" as LessonType, duration: "18 min", description: "KrÄsu palete, fonti, logo usage ā€” izveido mini brand guide katram klientam." },
        { id: "4-3", title: "Carousels & Stories templates", type: "video" as LessonType, duration: "16 min", description: "Ä€tri carousel un stories templates ko var pielÄgot jebkuram klientam 5 minÅ«tÄ“s." },
        { id: "4-4", title: "AI caption Ä£enerÄ“Åana & publicÄ“Åanas grafiks", type: "video" as LessonType, duration: "16 min", description: "ChatGPT/Claude prompt sistÄ“ma mÄ“neÅa captions Ä£enerÄ“Åanai ā€” iknedÄ“Ä¼as rutÄ«na." },
      ],
    },
    {
      id: 5,
      title: "Klientu AtraÅana & PÄrdoÅana",
      duration: "1h 20 min",
      lessons: [
        { id: "5-1", title: "Kur atrast pirmos klientus LatvijÄ", type: "video" as LessonType, duration: "20 min", description: "KonkrÄ“tas vietas: ss.lv, LinkedIn, Facebook grupas, vietÄ“jie pasÄkumi, cold walk-in." },
        { id: "5-2", title: "Cold outreach skripti (e-pasts & DM)", type: "text" as LessonType, duration: "15 min", description: "5 darbojoÅies skripti ar reÄliem rezultÄtiem ā€” copy-paste gatavi tavam biznesam." },
        { id: "5-3", title: "Proposal & lÄ«guma templates", type: "text" as LessonType, duration: "15 min", description: "LejupielÄdÄ“jams PDF proposal un vienkÄrÅs pakalpojumu lÄ«gums latvieÅu valodÄ." },
        { id: "5-4", title: "Klienta onboarding & pirmÄ tikÅanÄs", type: "video" as LessonType, duration: "30 min", description: "Ko teikt pirmajÄ zvanÄ ā€” klausies reÄlu demo zvanu ar potenciÄlo klientu." },
      ],
    },
    {
      id: 6,
      title: "AutomatizÄcija & SkalÄ“Åana",
      duration: "55 min",
      lessons: [
        { id: "6-1", title: "Buffer/Later ā€” publicÄ“Åanas automatizÄcija", type: "video" as LessonType, duration: "20 min", description: "IeplÄno mÄ“neÅa saturu 2 stundÄs ā€” Buffer setup, apstiprinÄjumu workflow, analytics." },
        { id: "6-2", title: "KÄ veidot ikmÄ“neÅa atskaites klientiem", type: "text" as LessonType, duration: "15 min", description: "LejupielÄdÄ“jams atskaites template ar KPI's ko klienti saprot un novÄ“rtÄ“." },
        { id: "6-3", title: "PÄrvaldÄ«t 5+ klientus vienlaicÄ«gi", type: "video" as LessonType, duration: "20 min", description: "Laika pÄrvaldÄ«ba, Notion client dashboard, automatizÄcijas kas ietaupa 10+ stundas nedÄ“Ä¼Ä." },
      ],
    },
  ] as Module[],
};

// ā”€ā”€ā”€ Icon Components ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€
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

// ā”€ā”€ā”€ Main Page ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€
export default function CourseDetailPage() {
  const [openModules, setOpenModules] = useState<number[]>([1, 2]);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "curriculum" | "tools">("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleModule = (id: number) =>
    setOpenModules((prev) => (prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]));

  const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);

  return (
    <div style={{ background: "#050508", minHeight: "100vh", color: "#fff", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @media (max-width: 768px) {
          .course-sidebar { display: none !important; }
          .course-sidebar.open { display: flex !important; position: fixed; inset: 0; z-index: 200; width: 100% !important; height: 100vh; }
          .course-layout { height: auto !important; min-height: calc(100vh - 56px); }
          .course-main { overflow-y: visible !important; }
          .course-hero { padding: 24px 16px 20px !important; }
          .course-tabs { padding: 0 12px !important; }
          .course-content { padding: 24px 16px !important; }
          .grid-3 { grid-template-columns: 1fr !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .grid-2-fixed { grid-template-columns: 1fr !important; }
          .hero-h1 { font-size: 26px !important; }
          .hero-desc { font-size: 14px !important; }
          .stat-row { gap: 12px !important; }
          .earn-display { margin-left: 0 !important; }
          .sidebar-overlay-bg { display: block; position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 199; }
          .mobile-sidebar-btn { display: flex !important; }
          .lesson-pad { padding: 24px 16px !important; }
        }
        @media (min-width: 769px) {
          .sidebar-overlay-bg { display: none; }
          .mobile-sidebar-btn { display: none !important; }
        }
      `}</style>

      {/* ā”€ā”€ Top Navbar ā”€ā”€ */}
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
          AtpakaÄ¼
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

      {/* ā”€ā”€ Layout: Sidebar + Main ā”€ā”€ */}
      <div className="course-layout" style={{ display: "flex", height: "calc(100vh - 56px)" }}>

        {sidebarOpen && <div className="sidebar-overlay-bg" onClick={() => setSidebarOpen(false)} />}

        {/* ā”€ā”€ LEFT SIDEBAR ā”€ā”€ */}
        <aside
          className={`course-sidebar${sidebarOpen ? " open" : ""}`}
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
                <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{totalLessons} nodarbÄ«bas Ā· {course.totalDuration}</div>
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
                        {mod.lessons.length} nodarbÄ«bas Ā· {mod.duration}
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
                                {lessonTypeLabel[lesson.type]} Ā· {lesson.duration}
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
              SÄkt kursu ā€” {course.earn}
            </button>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 10, color: "#444" }}>
              ā“ Bezmaksas pirmÄs 2 nodarbÄ«bas Ā· ā“ Pilna piekÄ¼uve ar Pro
            </div>
          </div>
        </aside>

        {/* ā”€ā”€ MAIN CONTENT ā”€ā”€ */}
        <main className="course-main" style={{ flex: 1, overflowY: "auto" }}>
          <button
            className="mobile-sidebar-btn"
            onClick={() => setSidebarOpen(true)}
            style={{ position: "fixed", bottom: 20, right: 20, zIndex: 150, alignItems: "center", gap: 8, padding: "12px 20px", borderRadius: 50, border: "none", cursor: "pointer", background: "linear-gradient(135deg, #a855f7, #ec4899)", color: "#fff", fontWeight: 700, fontSize: 13, boxShadow: "0 4px 20px rgba(168,85,247,0.4)" }}
          >
            š“‹ Programma
          </button>

          {activeLesson ? (
            /* ā”€ā”€ LESSON VIEW ā”€ā”€ */
            <LessonView lesson={activeLesson} onBack={() => setActiveLesson(null)} />
          ) : (
            /* ā”€ā”€ COURSE OVERVIEW ā”€ā”€ */
            <div>
              {/* Hero banner */}
              <div
                className="course-hero"
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

                  <h1 className="hero-h1" style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 10, lineHeight: 1.1 }}>
                    {course.title}
                  </h1>
                  <p className="hero-desc" style={{ fontSize: 16, color: "#888", maxWidth: 640, lineHeight: 1.7, marginBottom: 28 }}>
                    {course.description}
                  </p>

                  {/* Stats row */}
                  <div className="stat-row" style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                    {[
                      { label: "ModuÄ¼i", value: course.totalModules },
                      { label: "NodarbÄ«bas", value: totalLessons },
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
                      <span style={{ fontSize: 12, color: "#555" }}>vÄ“rtÄ“jums</span>
                    </div>
                    <div className="earn-display" style={{ marginLeft: "auto", display: "flex", alignItems: "baseline", gap: 4 }}>
                      <span style={{ fontSize: 28, fontWeight: 900, background: "linear-gradient(135deg, #a855f7, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                        {course.earn}
                      </span>
                      <span style={{ fontSize: 12, color: "#555" }}>potenciÄls</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="course-tabs" style={{ padding: "0 48px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: 0 }}>
                {(["overview", "curriculum", "tools"] as const).map((tab) => {
                  const labels = { overview: "PÄrskats", curriculum: "Programma", tools: "RÄ«ki" };
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
              <div className="course-content" style={{ padding: "40px 48px", maxWidth: 900 }}>
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

// ā”€ā”€ā”€ Overview Tab ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€
function OverviewTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>

      {/* ā”€ā”€ HERO SALES SECTION ā”€ā”€ */}
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

        {/* Virsraksts + apakÅvirsraksts */}
        <div
          style={{
            position: "relative", padding: "40px", borderRadius: 20,
            background: "linear-gradient(135deg, rgba(168,85,247,0.1) 0%, rgba(236,72,153,0.06) 60%, rgba(5,5,8,0) 100%)",
            border: "1px solid rgba(168,85,247,0.18)", overflow: "hidden",
          }}
        >
          {/* bg grid */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(168,85,247,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.04) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          {/* glow */}
          <div style={{ position: "absolute", top: -60, right: -60, width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle, rgba(236,72,153,0.12), transparent 70%)", pointerEvents: "none" }} />

          <div style={{ position: "relative" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 20, background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.3)", marginBottom: 20 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#a855f7", boxShadow: "0 0 8px #a855f7" }} />
              <span style={{ fontSize: 11, color: "#a855f7", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>DigitÄlÄ sistÄ“ma</span>
            </div>

            <h2 style={{ fontSize: 32, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 14, color: "#fff" }}>
              Izveido digitÄlas sistÄ“mas,<br />
              <span style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>kas strÄdÄ tavÄ vietÄ</span>
            </h2>

            <p style={{ fontSize: 15, color: "#888", lineHeight: 1.75, maxWidth: 620 }}>
              Nevis vienkÄrÅi mÄjaslapas ā€” bet modernus, vizuÄli spÄ“cÄ«gus un klientus piesaistoÅus risinÄjumus
            </p>
          </div>
        </div>

        {/* SolÄ«jums */}
        <div
          style={{
            padding: "28px 32px", borderRadius: 16,
            background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.06)",
            display: "flex", alignItems: "flex-start", gap: 20,
          }}
        >
          <div style={{ width: 48, height: 48, borderRadius: 14, flexShrink: 0, background: "linear-gradient(135deg, rgba(168,85,247,0.25), rgba(236,72,153,0.25))", border: "1px solid rgba(168,85,247,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
            šˇÆ
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#a855f7", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>SolÄ«jums</div>
            <p style={{ fontSize: 15, color: "#ccc", lineHeight: 1.75 }}>
              Tu iemÄcÄ«sies izveidot mÅ«sdienÄ«gas, dinamiskas un vizuÄli pievilcÄ«gas mÄjaslapas kopÄ ar automatizÄcijÄm, kas pÄrvÄ“rÅ apmeklÄ“tÄjus klientos
            </p>
          </div>
        </div>

        {/* Kas padara atÅÄ·irÄ«gu */}
        <div>
          <SectionLabel>Kas padara Åo atÅÄ·irÄ«gu</SectionLabel>
          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
            {[
              { icon: "ā¦", color: "#a855f7", title: "Premium dizains", desc: "Dizains, kas izskatÄs kÄ premium startupiem" },
              { icon: "š’°", color: "#ec4899", title: "PÄrdod, ne tikai izskatÄs", desc: "Lapas, kas ne tikai izskatÄs labi, bet pÄrdod" },
              { icon: "ā", color: "#f59e0b", title: "24/7 automatizÄcija", desc: "AutomatizÄcijas, kas strÄdÄ fonÄ visu diennakti" },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  padding: "22px 20px", borderRadius: 14,
                  background: "#0d0d1a",
                  border: `1px solid ${item.color}22`,
                  transition: "border-color 0.2s, transform 0.2s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = `${item.color}55`; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = `${item.color}22`; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
              >
                <div style={{ fontSize: 24, marginBottom: 12 }}>{item.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{item.title}</div>
                <div style={{ fontSize: 12, color: "#666", lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Ko tu iegÅ«si + AutomatizÄcijas */}
        <div className="grid-2-fixed" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {/* Ko tu iegÅ«si */}
          <div style={{ padding: "24px", borderRadius: 16, background: "#0d0d1a", border: "1px solid rgba(168,85,247,0.12)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#a855f7", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 16 }}>Ko tu iegÅ«si</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                'SpÄ“ju veidot modernu, "wow" lÄ«meÅ†a mÄjaslapu',
                "Sapratni, kÄ pÄrvÄ“rst apmeklÄ“tÄjus klientos",
                "AutomatizÄ“tu klientu komunikÄciju",
                "SistÄ“mu, kas savÄc un apstrÄdÄ pieteikumus",
                "IespÄ“ju piedÄvÄt biznesiem pilnu digitÄlo risinÄjumu",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{ width: 18, height: 18, borderRadius: 5, background: "rgba(168,85,247,0.2)", border: "1px solid rgba(168,85,247,0.35)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="3.5"><polyline points="20,6 9,17 4,12" /></svg>
                  </div>
                  <span style={{ fontSize: 12.5, color: "#bbb", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AutomatizÄcijas */}
          <div style={{ padding: "24px", borderRadius: 16, background: "#0d0d1a", border: "1px solid rgba(236,72,153,0.12)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#ec4899", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 16 }}>AutomatizÄcijas, ko apgÅ«si</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                "WhatsApp atbildes klientiem",
                "Pieteikumu apstrÄde automÄtiski",
                "Follow-up ziÅ†as",
                "Klientu filtrÄ“Åana",
                "DaÅ¾Ädi automatizÄ“ti scenÄriji biznesiem",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{ width: 18, height: 18, borderRadius: 5, background: "rgba(236,72,153,0.15)", border: "1px solid rgba(236,72,153,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="3.5"><polyline points="20,6 9,17 4,12" /></svg>
                  </div>
                  <span style={{ fontSize: 12.5, color: "#bbb", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RezultÄts */}
        <div
          style={{
            padding: "28px 32px", borderRadius: 16,
            background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.14)",
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, color: "#00ff88", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 16 }}>RezultÄts ā€” tu pÄrdosi sistÄ“mu, ne mÄjaslapu</div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { icon: "š“", text: "Atved klientus" },
              { icon: "š’¬", text: "Atbild klientiem" },
              { icon: "ā¸±ļø¸", text: "Ietaupa laiku" },
            ].map((r) => (
              <div key={r.text} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 18px", borderRadius: 10, background: "rgba(0,255,136,0.07)", border: "1px solid rgba(0,255,136,0.15)", flex: 1, minWidth: 140 }}>
                <span style={{ fontSize: 18 }}>{r.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#00ff88" }}>{r.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Kam tas paredzÄ“ts */}
        <div>
          <SectionLabel>Kam tas paredzÄ“ts</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              "Ja gribi pÄriet uz augstÄku lÄ«meni",
              "Ja gribi pelnÄ«t vairÄk no viena klienta",
              "Ja gribi piedÄvÄt kaut ko, ko citi nepiedÄvÄ",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", borderRadius: 10, background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#a855f7", flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: "#ccc" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tagline + CTA */}
        <div
          style={{
            padding: "40px", borderRadius: 20, textAlign: "center",
            background: "linear-gradient(135deg, rgba(168,85,247,0.1), rgba(236,72,153,0.08))",
            border: "1px solid rgba(168,85,247,0.2)",
            position: "relative", overflow: "hidden",
          }}
        >
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(168,85,247,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.03) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          <div style={{ position: "relative" }}>
            <p style={{ fontSize: 14, color: "#666", marginBottom: 6 }}>LielÄkÄ daÄ¼a taisa mÄjaslapas.</p>
            <p style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 28, color: "#fff" }}>
              Tu taisÄ«si sistÄ“mas,{" "}
              <span style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                kas pelna naudu.
              </span>
            </p>
            <button
              style={{
                padding: "15px 44px", borderRadius: 12, border: "none", cursor: "pointer",
                background: "linear-gradient(135deg, #a855f7, #ec4899)",
                color: "#fff", fontWeight: 700, fontSize: 15, letterSpacing: "0.01em",
                boxShadow: "0 8px 32px rgba(168,85,247,0.4)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 14px 40px rgba(168,85,247,0.5)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 32px rgba(168,85,247,0.4)"; }}
            >
              Izveidot savu pirmo digitÄlo sistÄ“mu
            </button>
          </div>
        </div>

      </div>

      {/* Ko tu iemÄcÄ«sies */}
      <div>
        <SectionLabel>Ko tu iemÄcÄ«sies</SectionLabel>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20, letterSpacing: "-0.02em" }}>
          No nulles lÄ«dz pirmajam klientam
        </h2>
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
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
          {course.totalModules} moduÄ¼i Ā· {course.totalLessons} nodarbÄ«bas
        </h2>
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
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
                {mod.lessons.length} nodarbÄ«bas Ā· {mod.duration}
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
                    {l.type === "task" ? "šˇÆ" : l.type === "text" ? "š“„" : "ā–¶"} {l.duration}
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

      {/* PriekÅrocÄ«bas */}
      <div>
        <SectionLabel>KÄpÄ“c Åis kurss</SectionLabel>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20, letterSpacing: "-0.02em" }}>
          ReÄli rezultÄti, ne tikai teorija
        </h2>
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {[
            { icon: "šˇÆ", title: "Projektu bÄzÄ“ta", desc: "Katra moduÄ¼a beigÄs ir praktisks uzdevums, ko vari iekÄ¼aut portfolio." },
            { icon: "š“¦", title: "Gatavi templates", desc: "Proposal, lÄ«gums, onboarding, atskaite ā€” viss lejupielÄdÄjams." },
            { icon: "š‡±š‡»", title: "Latvijas tirgum", desc: "Cold outreach skripti, cenas un stratÄ“Ä£ijas Latvijas realitÄtei." },
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
        <SectionLabel>PasniedzÄ“js</SectionLabel>
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
                <div style={{ fontSize: 18, fontWeight: 800, color: "#f59e0b" }}>4.9 ā…</div>
                <div style={{ fontSize: 11, color: "#555" }}>vidÄ“jais vÄ“rtÄ“jums</div>
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
          Gatavs sÄkt nopelnÄ«t {course.earn}?
        </h3>
        <p style={{ fontSize: 14, color: "#777", marginBottom: 24 }}>
          Pievienojies {course.students} studentiem kas jau apgÅ«st Åo kursu.
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
          SÄkt kursu ā€” pirmÄs 2 nodarbÄ«bas bezmaksas
        </button>
      </div>
    </div>
  );
}

// ā”€ā”€ā”€ Curriculum Tab ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€
function CurriculumTab({ onSelectLesson }: { onSelectLesson: (l: Lesson) => void }) {
  const [open, setOpen] = useState<number[]>(course.modules.map((m) => m.id));
  const toggle = (id: number) => setOpen((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <SectionLabel>MÄcÄ«bu programma</SectionLabel>
          <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em" }}>
            {course.totalModules} moduÄ¼i Ā· {course.totalLessons} nodarbÄ«bas Ā· {course.totalDuration}
          </h2>
        </div>
        <button
          onClick={() => setOpen(open.length === course.modules.length ? [] : course.modules.map((m) => m.id))}
          style={{ fontSize: 12, color: "#a855f7", background: "transparent", border: "none", cursor: "pointer", fontWeight: 600 }}
        >
          {open.length === course.modules.length ? "AizvÄ“rt visus" : "AtvÄ“rt visus"}
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
                  {mod.lessons.length} nodarbÄ«bas Ā· {mod.duration}
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

// ā”€ā”€ā”€ Tools Tab ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€
function ToolsTab() {
  return (
    <div>
      <SectionLabel>Izmantotie rÄ«ki</SectionLabel>
      <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, letterSpacing: "-0.02em" }}>
        7 AI rÄ«ki ko apgÅ«si kursÄ
      </h2>
      <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7, marginBottom: 32 }}>
        Visi nepiecieÅamie rÄ«ki ar bezmaksas plÄniem vai izmÄ“Ä£inÄjuma periodiem. Setup instrukcijas iekÄ¼autas kursÄ.
      </p>
      <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 40 }}>
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
              {tool.name === "Runway ML" ? "šˇ¬" : tool.name === "HeyGen" ? "š¤–" : tool.name === "CapCut" ? "ā‚ļø¸" : tool.name === "Midjourney" ? "šˇØ" : tool.name === "Canva AI" ? "š–ļø¸" : tool.name === "Adobe Firefly" ? "š”" : "š“…"}
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
          ā“ Kas nepiecieÅams lai sÄktu
        </div>
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[
            "Dators vai klÄ“pjdators (Windows/Mac)",
            "Stabils interneta savienojums",
            "E-pasta adrese kontiem",
            "~ā‚¬20ā€“50/mÄ“n rÄ«ku izmaksas (sÄkumÄ)",
            "5ā€“10 stundas nedÄ“Ä¼Ä ieguldÄ«jumam",
            "NekÄdas programmÄ“Åanas zinÄÅanas nav vajadzÄ«gas",
          ].map((req) => (
            <div key={req} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12, color: "#888" }}>
              <span style={{ color: "#00ff88", flexShrink: 0, marginTop: 1 }}>ā“</span>
              {req}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ā”€ā”€ā”€ Lesson View ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€
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
        AtpakaÄ¼ uz kursa pÄrskatu
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
              Video ā€” {lesson.duration}
            </div>
            <div style={{ fontSize: 12, color: "#555" }}>Pieejams ar Pro plÄnu</div>
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
            Par Åo nodarbÄ«bu
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
            šˇÆ Praktiskais uzdevums
          </div>
          <div style={{ fontSize: 13, color: "#888", lineHeight: 1.8 }}>
            Izpildi uzdevumu un augÅupielÄdÄ“ savu darbu ā€” tas bÅ«s daÄ¼a no tava portfolio, ko vari rÄdÄ«t potenciÄlajiem klientiem.
          </div>
          <button
            style={{
              marginTop: 16, padding: "10px 24px", borderRadius: 8, cursor: "pointer",
              background: "rgba(0,255,136,0.15)", border: "1px solid rgba(0,255,136,0.3)",
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
            š“„ LejupielÄdÄjams materiÄls
          </div>
          <div style={{ fontSize: 13, color: "#888", lineHeight: 1.8, marginBottom: 14 }}>
            Å Ä« nodarbÄ«ba ietver lejupielÄdÄjamu template, ko vari tÅ«lÄ«t izmantot darbÄ ar klientiem.
          </div>
          <button
            style={{
              padding: "10px 24px", borderRadius: 8, cursor: "pointer",
              background: "rgba(0,212,255,0.12)", border: "1px solid rgba(0,212,255,0.25)",
              color: "#00d4ff", fontWeight: 700, fontSize: 13,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,212,255,0.2)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,212,255,0.12)")}
          >
            ā†“ LejupielÄdÄ“t (PDF)
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
          ā† AtpakaÄ¼
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
          NÄkamÄ nodarbÄ«ba ā†’
        </button>
      </div>
    </div>
  );
}

// ā”€ā”€ā”€ Section Label Helper ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€
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
