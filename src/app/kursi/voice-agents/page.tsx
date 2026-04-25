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
  title: "Voice Agents ar VAPI",
  subtitle: "AI balss aÄ£enti, kas zvana un atbild klientu vietÄ",
  description:
    "IemÄcies veidot AI balss aÄ£entus ar VAPI platformu ā€” automÄtiskus zvanus, receptus pierakstu, klientu apkalpoÅanu un lead kvalifikÄciju. Pakalpojums, ko pÄrdot Latvijas uzÅ†Ä“mumiem par ā‚¬500ā€“2000 vienreizÄ“ji.",
  earn: "ā‚¬500ā€“2000/projekts",
  difficulty: "VidÄ“js",
  tag: "JaunÄkais",
  totalDuration: "6h 45 min",
  totalLessons: 20,
  totalModules: 6,
  students: 54,
  rating: 4.9,
  instructor: {
    name: "KÄrlis BÄ“rziÅ†Å",
    role: "AI AutomatizÄcijas Eksperts",
    avatar: "KB",
    bio: "5+ gadi digitÄlÄ mÄrketingÄ, pÄ“dÄ“jos 2 gadus specializÄ“joties AI risinÄjumos Latvijas uzÅ†Ä“mumiem. Izveidojis 20+ voice aÄ£entus daÅ¾ÄdÄm niÅÄm ā€” Ärstu kabineti, restorÄni, nekustamais Ä«paÅums.",
    students: 420,
    courses: 3,
  },
  tools: [
    { name: "VAPI",          desc: "Voice AI aÄ£entu platforma",         color: "#f97316" },
    { name: "ElevenLabs",    desc: "ReÄlistiskas AI balsis",             color: "#fbbf24" },
    { name: "Twilio",        desc: "Telefona numura integrÄcija",        color: "#f43f5e" },
    { name: "Claude API",    desc: "Anthropic AI smadzenes",             color: "#a855f7" },
    { name: "n8n",           desc: "Zvanu datu automatizÄcija",          color: "#00d4ff" },
    { name: "Google Cal.",   desc: "Pierakstu rezervÄcija",              color: "#22c55e" },
    { name: "Google Sheets", desc: "Lead datu glabÄÅana",                color: "#34d399" },
  ],
  learn: [
    "Izveidot pilnfunkcionÄlu AI balss aÄ£entu ar VAPI",
    "Pievienot reÄlistisku ElevenLabs balsi aÄ£entam",
    "Savienot aÄ£entu ar Twilio tÄlruÅ†a numuru",
    "Veidot zvanu skriptus un sarunu loÄ£iku",
    "IntegrÄ“t Google Calendar pierakstu rezervÄcijai",
    "SaglabÄt zvanu datus n8n ā†’ Google Sheets",
    "PÄrdot voice aÄ£enta pakalpojumu par ā‚¬500ā€“2000",
    "Izveidot demo zvanu, kas pats pÄrdod pakalpojumu",
  ],
  modules: [
    {
      id: 1,
      title: "Ievads & Setup",
      duration: "50 min",
      lessons: [
        { id: "1-1", title: "Kas ir voice AI aÄ£ents un kÄpÄ“c tas strÄdÄ?", type: "video" as LessonType, duration: "15 min", free: true, description: "SalÄ«dzinÄjums: cilvÄ“ks vs AI aÄ£ents. Stats par zvanu atbildes Ätrumu un konversijÄm. ReÄli Latvijas piemÄ“ri." },
        { id: "1-2", title: "VAPI konts, Twilio numurs & ElevenLabs setup", type: "video" as LessonType, duration: "14 min", free: true, description: "TrÄ«s kontu izveide soli pa solim. Twilio trial numura iegÅ«Åana un savienoÅana ar VAPI." },
        { id: "1-3", title: "Klientu onboarding process", type: "text" as LessonType, duration: "8 min", description: "LejupielÄdÄ“jams onboarding template ā€” jautÄjumi par biznesa scenÄriju, bieÅ¾Äkajiem zvaniem un vÄ“lamo toni." },
        { id: "1-4", title: "Cenas un bizness modelis", type: "video" as LessonType, duration: "13 min", description: "KÄpÄ“c ā‚¬500+ ir saprÄtÄ«gi sÄkumÄ. VienreizÄ“jÄ maksa vs ikmÄ“neÅa apkope. KÄ prezentÄ“t ROI klientam." },
      ],
    },
    {
      id: 2,
      title: "Pirmais Voice AÄ£ents",
      duration: "1h 20 min",
      lessons: [
        { id: "2-1", title: "VAPI dashboard ā€” aÄ£enta izveide", type: "video" as LessonType, duration: "18 min", description: "OrientÄcija VAPI kanvassÄ. Assistant izveide, modeÄ¼a izvÄ“le (GPT-4o mini vs Claude), sistÄ“mas promta lauks." },
        { id: "2-2", title: "SistÄ“mas promts voice aÄ£entam", type: "video" as LessonType, duration: "22 min", description: "KÄ rakstÄ«t sistÄ“mas promptu balsij ā€” Ä«si, dabÄ«gi, bez markdown. Template ar 6 obligÄtajiem blokiem katram biznesam." },
        { id: "2-3", title: "ElevenLabs balss integrÄcija", type: "video" as LessonType, duration: "16 min", description: "Balss izvÄ“le un pielÄgoÅana. Stability, similarity un style parametri. KÄ izvÄ“lÄ“ties balsi konkrÄ“tam biznesam." },
        { id: "2-4", title: "Uzdevums: pirmais aÄ£ents no nulles", type: "task" as LessonType, duration: "24 min", description: "Izveido funkcionÄlu voice aÄ£entu frizÄ“tavai vai restorÄnam. TestÄ“ ar VAPI test call funkciju." },
      ],
    },
    {
      id: 3,
      title: "Sarunu LoÄ£ika & ScenÄriji",
      duration: "1h 10 min",
      lessons: [
        { id: "3-1", title: "Zvanu scenÄriji ā€” pieraksts, info, lead kvalifikÄcija", type: "video" as LessonType, duration: "20 min", description: "3 galvenie voice aÄ£enta use-case veidi. KÄ strukturÄ“t sarunu atkarÄ«bÄ no mÄ“rÄ·a." },
        { id: "3-2", title: "Functions ā€” aÄ£ents, kas var 'darÄ«t lietas'", type: "video" as LessonType, duration: "22 min", description: "VAPI Functions ā€” kÄ aÄ£ents var pÄrbaudÄ«t pieejamÄ«bu, rezervÄ“t laiku vai nosÅ«tÄ«t SMS." },
        { id: "3-3", title: "ReÄlu zvanu simulÄcija un testÄ“Åana", type: "video" as LessonType, duration: "16 min", description: "10 standarta testjautÄjumi katram voice aÄ£entam. KÄ novÄ“rst bieÅ¾i sastopamÄs kÄ¼Å«das balsÄ«." },
        { id: "3-4", title: "Uzdevums: 3 daÅ¾Ädi zvanu scenÄriji", type: "task" as LessonType, duration: "12 min", description: "Izveido 3 aÄ£enta versijas: informatÄ«vs, pieraksts un lead kvalifikÄcija. Kuru klients izvÄ“lÄ“sies?" },
      ],
    },
    {
      id: 4,
      title: "IntegrÄcijas",
      duration: "55 min",
      lessons: [
        { id: "4-1", title: "Google Calendar ā€” automÄtisks pieraksts", type: "video" as LessonType, duration: "22 min", description: "VAPI + Cal.com vai Google Calendar integrÄcija. AÄ£ents pÄrbauda brÄ«vos laikus un rezervÄ“ tikÅanos reÄllaikÄ." },
        { id: "4-2", title: "n8n webhook ā€” zvanu dati uz Google Sheets", type: "video" as LessonType, duration: "18 min", description: "Katrs zvans ā†’ n8n ā†’ Google Sheets. Klienta vÄrds, numurs, tÄ“ma, ilgums ā€” automÄtiski." },
        { id: "4-3", title: "SMS follow-up pÄ“c zvana", type: "video" as LessonType, duration: "15 min", description: "Twilio SMS nosÅ«tÄ«Åana pÄ“c veiksmÄ«ga zvana ā€” apstiprinÄjums, pieraksta laiks, kontaktinformÄcija." },
      ],
    },
    {
      id: 5,
      title: "NiÅas & ReÄli Projekti",
      duration: "1h 15 min",
      lessons: [
        { id: "5-1", title: "FrizÄ“tava / skaistumkopÅana ā€” pierakstu aÄ£ents", type: "video" as LessonType, duration: "22 min", description: "Pilns case study ā€” sistÄ“mas promts, balss, kalendÄra integrÄcija un testÄ“Åana frizÄ“tavas scenÄrijam." },
        { id: "5-2", title: "Nekustamais Ä«paÅums ā€” lead kvalifikÄcija", type: "video" as LessonType, duration: "20 min", description: "Voice aÄ£ents, kas izjautÄ potenciÄlos pircÄ“jus un nosÅ«ta kvalificÄ“tus lead'us brokerim." },
        { id: "5-3", title: "RestorÄns / kafejnÄ«ca ā€” galdiÅ†u rezervÄcija", type: "video" as LessonType, duration: "18 min", description: "VienkÄrÅs aÄ£ents, kas Å†em rezervÄcijas, apstiprina laiku un sÅ«ta SMS apstiprinÄjumu." },
        { id: "5-4", title: "Uzdevums: izveido pilnu niÅas projektu", type: "task" as LessonType, duration: "15 min", description: "IzvÄ“lies vienu niÅu un izveido pilnu voice aÄ£entu ar integrÄcijÄm. Tas bÅ«s tavs portfolio projekts." },
      ],
    },
    {
      id: 6,
      title: "Klientu AtraÅana & Bizness",
      duration: "55 min",
      lessons: [
        { id: "6-1", title: "Kur atrast pirmos klientus LatvijÄ", type: "video" as LessonType, duration: "20 min", description: "KonkrÄ“tas vietas: Ärstu kabineti bez automatizÄcijas, frizÄ“tavas, restorÄni. Cold outreach solis pa solim." },
        { id: "6-2", title: "Demo zvans kÄ pÄrdoÅanas rÄ«ks", type: "video" as LessonType, duration: "18 min", description: "KÄ izveidot demo zvanu konkrÄ“tam klientam pirms tikÅanÄs ā€” 'pazvani Åim numuram un klausies'." },
        { id: "6-3", title: "PiedÄvÄjums, lÄ«gums un apkopes modelis", type: "text" as LessonType, duration: "17 min", description: "LejupielÄdÄ“jams PDF piedÄvÄjums ar 3 paketÄ“m (ā‚¬300/600/1200) un apkopes lÄ«gums latvieÅu valodÄ." },
      ],
    },
  ] as Module[],
};

// ā”€ā”€ā”€ Accent colors ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€
const A = "#f97316";
const A2 = "#fbbf24";
const AG = `linear-gradient(135deg, ${A}, ${A2})`;
const ABg = `rgba(249,115,22,0.1)`;
const ABg2 = `rgba(251,191,36,0.07)`;
const ABorder = `rgba(249,115,22,0.3)`;

// ā”€ā”€ā”€ Icon Components ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€
function VideoIcon({ size = 14 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><polygon points="5,3 19,12 5,21" fill="currentColor" /></svg>;
}
function TextIcon({ size = 14 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="16" y2="12" /><line x1="3" y1="18" x2="13" y2="18" /></svg>;
}
function TaskIcon({ size = 14 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></svg>;
}
function LockIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>;
}
function ChevronIcon({ open }: { open: boolean }) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}><polyline points="6,9 12,15 18,9" /></svg>;
}
function StarIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" stroke="none"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" /></svg>;
}
function VoiceIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill="url(#v-g)" opacity="0.9"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="url(#v-g)" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="12" y1="19" x2="12" y2="23" stroke="url(#v-g)" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="8" y1="23" x2="16" y2="23" stroke="url(#v-g)" strokeWidth="1.8" strokeLinecap="round"/>
      <defs>
        <linearGradient id="v-g" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f97316"/><stop offset="1" stopColor="#fbbf24"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

const lessonIcon = (type: LessonType) => {
  if (type === "video") return <VideoIcon />;
  if (type === "text") return <TextIcon />;
  if (type === "task") return <TaskIcon />;
  return <TextIcon />;
};
const lessonTypeLabel: Record<LessonType, string> = { video: "Video", text: "Teksts", task: "Uzdevums", quiz: "Tests" };
const lessonTypeColor: Record<LessonType, string> = { video: "#a855f7", text: "#00d4ff", task: "#00ff88", quiz: "#f59e0b" };

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
      <nav style={{ position: "sticky", top: 0, zIndex: 50, height: 56, background: "rgba(5,5,8,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", padding: "0 20px", gap: 12 }}>
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: 8, color: "#888", fontSize: 13, fontWeight: 500, textDecoration: "none", padding: "5px 10px", borderRadius: 8, transition: "color 0.2s, background 0.2s" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.05)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#888"; (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15,18 9,12 15,6" /></svg>
          AtpakaÄ¼
        </Link>
        <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 13 }}>/</span>
        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>Kursi</span>
        <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 13 }}>/</span>
        <span style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>{course.title}</span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: ABg2, border: `1px solid rgba(251,191,36,0.3)`, color: A2, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
            {course.difficulty}
          </span>
          <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: ABg, border: ABorder, color: A, fontWeight: 700 }}>
            {course.earn}
          </span>
        </div>
      </nav>

      {/* ā”€ā”€ Layout ā”€ā”€ */}
      <div className="course-layout" style={{ display: "flex", height: "calc(100vh - 56px)" }}>
        {sidebarOpen && <div className="sidebar-overlay-bg" onClick={() => setSidebarOpen(false)} />}

        {/* ā”€ā”€ LEFT SIDEBAR ā”€ā”€ */}
        <aside className={`course-sidebar${sidebarOpen ? " open" : ""}`} style={{ width: 300, flexShrink: 0, background: "#07070f", borderRight: "1px solid rgba(255,255,255,0.05)", overflowY: "auto", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "20px 16px 16px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, background: "linear-gradient(135deg, rgba(249,115,22,0.25), rgba(251,191,36,0.25))", border: `1px solid ${ABorder}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <VoiceIcon />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>{course.title}</div>
                <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{totalLessons} nodarbÄ«bas Ā· {course.totalDuration}</div>
              </div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: "#555" }}>Progress</span>
                <span style={{ fontSize: 11, color: A, fontWeight: 600 }}>0%</span>
              </div>
              <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 4 }}>
                <div style={{ width: "0%", height: "100%", borderRadius: 4, background: AG }} />
              </div>
            </div>
          </div>

          <div style={{ padding: "8px 0", flex: 1 }}>
            {course.modules.map((mod) => {
              const isOpen = openModules.includes(mod.id);
              return (
                <div key={mod.id}>
                  <button
                    onClick={() => toggleModule(mod.id)}
                    style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", background: "transparent", border: "none", cursor: "pointer", color: "#fff", textAlign: "left", transition: "background 0.15s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <div style={{ width: 22, height: 22, borderRadius: 6, flexShrink: 0, background: isOpen ? ABg : "rgba(255,255,255,0.05)", border: `1px solid ${isOpen ? ABorder : "rgba(255,255,255,0.08)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: isOpen ? A : "#555" }}>
                      {mod.id}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: isOpen ? "#fff" : "#aaa" }}>{mod.title}</div>
                      <div style={{ fontSize: 10, color: "#444", marginTop: 1 }}>{mod.lessons.length} nodarbÄ«bas Ā· {mod.duration}</div>
                    </div>
                    <div style={{ color: "#444", flexShrink: 0 }}><ChevronIcon open={isOpen} /></div>
                  </button>

                  {isOpen && (
                    <div style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                      {mod.lessons.map((lesson) => {
                        const isActive = activeLesson?.id === lesson.id;
                        return (
                          <button
                            key={lesson.id}
                            onClick={() => setActiveLesson(lesson)}
                            style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "8px 16px 8px 24px", border: "none", cursor: "pointer", textAlign: "left", background: isActive ? ABg : "transparent", borderLeft: isActive ? `2px solid ${A}` : "2px solid transparent", transition: "background 0.15s" }}
                            onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.03)"; }}
                            onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                          >
                            <div style={{ width: 20, height: 20, borderRadius: 5, flexShrink: 0, background: isActive ? ABg : "rgba(255,255,255,0.04)", border: `1px solid ${isActive ? ABorder : "rgba(255,255,255,0.06)"}`, display: "flex", alignItems: "center", justifyContent: "center", color: isActive ? A : lessonTypeColor[lesson.type] }}>
                              {lessonIcon(lesson.type)}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: 11.5, fontWeight: isActive ? 600 : 400, color: isActive ? "#fff" : "#888", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {lesson.title}
                              </div>
                              <div style={{ fontSize: 10, color: "#444", marginTop: 1 }}>{lessonTypeLabel[lesson.type]} Ā· {lesson.duration}</div>
                            </div>
                            {lesson.free ? (
                              <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 4, background: ABg, color: A, fontWeight: 700, flexShrink: 0 }}>BEZMAKSAS</span>
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

          <div style={{ padding: 16, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <button
              style={{ width: "100%", padding: "11px 0", borderRadius: 10, border: "none", cursor: "pointer", background: AG, color: "#000", fontWeight: 700, fontSize: 13, letterSpacing: "0.02em", boxShadow: "0 4px 20px rgba(249,115,22,0.3)", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 30px rgba(249,115,22,0.4)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(249,115,22,0.3)"; }}
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
          <button className="mobile-sidebar-btn" onClick={() => setSidebarOpen(true)} style={{ position: "fixed", bottom: 20, right: 20, zIndex: 150, alignItems: "center", gap: 8, padding: "12px 20px", borderRadius: 50, border: "none", cursor: "pointer", background: "linear-gradient(135deg, #f97316, #fbbf24)", color: "#000", fontWeight: 700, fontSize: 13, boxShadow: "0 4px 20px rgba(249,115,22,0.4)" }}>📋 Programma</button>
          {activeLesson ? (
            <LessonView lesson={activeLesson} onBack={() => setActiveLesson(null)} />
          ) : (
            <div>
              {/* Hero banner */}
              <div className="course-hero" style={{ position: "relative", padding: "48px 48px 40px", background: `linear-gradient(135deg, ${ABg} 0%, ${ABg2} 50%, rgba(5,5,8,0) 100%)`, borderBottom: "1px solid rgba(255,255,255,0.05)", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(${ABg} 1px, transparent 1px), linear-gradient(90deg, ${ABg} 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
                <div style={{ position: "absolute", top: -80, right: -80, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(249,115,22,0.12), transparent 70%)", pointerEvents: "none" }} />

                <div style={{ position: "relative" }}>
                  <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 11, padding: "4px 12px", borderRadius: 20, background: ABg, border: ABorder, color: A, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {course.tag}
                    </span>
                    <span style={{ fontSize: 11, padding: "4px 12px", borderRadius: 20, background: ABg2, border: `1px solid rgba(251,191,36,0.3)`, color: A2, fontWeight: 600 }}>
                      {course.difficulty}
                    </span>
                  </div>

                  <h1 className="hero-h1" style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 10, lineHeight: 1.1 }}>
                    {course.title}
                  </h1>
                  <p style={{ fontSize: 16, color: "#888", maxWidth: 640, lineHeight: 1.7, marginBottom: 28 }}>
                    {course.description}
                  </p>

                  <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
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
                    <div style={{ marginLeft: "auto", display: "flex", alignItems: "baseline", gap: 4 }}>
                      <span style={{ fontSize: 28, fontWeight: 900, background: AG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
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
                      style={{ padding: "14px 20px", border: "none", background: "transparent", cursor: "pointer", fontSize: 13, fontWeight: isActive ? 600 : 400, color: isActive ? "#fff" : "#555", borderBottom: isActive ? `2px solid ${A}` : "2px solid transparent", transition: "color 0.2s, border-color 0.2s" }}
                    >
                      {labels[tab]}
                    </button>
                  );
                })}
              </div>

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
        <div style={{ position: "relative", padding: "40px", borderRadius: 20, background: `linear-gradient(135deg, ${ABg} 0%, ${ABg2} 60%, rgba(5,5,8,0) 100%)`, border: ABorder, overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(${ABg} 1px, transparent 1px), linear-gradient(90deg, ${ABg} 1px, transparent 1px)`, backgroundSize: "32px 32px" }} />
          <div style={{ position: "absolute", top: -60, right: -60, width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle, rgba(251,191,36,0.1), transparent 70%)", pointerEvents: "none" }} />

          <div style={{ position: "relative" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 20, background: ABg, border: ABorder, marginBottom: 20 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: A, boxShadow: `0 0 8px ${A}` }} />
              <span style={{ fontSize: 11, color: A, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>Voice AI aÄ£ents</span>
            </div>

            <h2 style={{ fontSize: 32, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 14, color: "#fff" }}>
              Izveido AI, kas zvana<br />
              <span style={{ background: AG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>un runÄ tavÄ vietÄ</span>
            </h2>

            <p style={{ fontSize: 15, color: "#888", lineHeight: 1.75, maxWidth: 620 }}>
              Ne tikai chatbot ā€” bet balss aÄ£ents, kas pats zvana klientiem, pieraksta vizÄ«tes un kvalificÄ“ lead'us 24/7 bez cilvÄ“ka iesaistes
            </p>
          </div>
        </div>

        {/* SolÄ«jums */}
        <div style={{ padding: "28px 32px", borderRadius: 16, background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "flex-start", gap: 20 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, flexShrink: 0, background: `linear-gradient(135deg, rgba(249,115,22,0.2), rgba(251,191,36,0.2))`, border: ABorder, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
            šˇ™ļø¸
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: A, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>SolÄ«jums</div>
            <p style={{ fontSize: 15, color: "#ccc", lineHeight: 1.75 }}>
              Tu iemÄcÄ«sies izveidot pilnu voice aÄ£enta sistÄ“mu ar VAPI un ElevenLabs ā€” no pirmÄ zvana lÄ«dz automÄtiskai pierakstu rezervÄcijai un lead datu apstrÄdei
            </p>
          </div>
        </div>

        {/* Kas padara atÅÄ·irÄ«gu */}
        <div>
          <SectionLabel>Kas padara Åo atÅÄ·irÄ«gu</SectionLabel>
          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
            {[
              { icon: "šˇ™ļø¸", color: A,       title: "ReÄla balss, ne robots", desc: "ElevenLabs nodroÅina tik dabÄ«gu balsi, ka klienti bieÅ¾i vien nepamana, ka runÄ ar AI" },
              { icon: "š“…", color: A2,      title: "AutomÄtisks pieraksts", desc: "AÄ£ents pats pÄrbauda kalendÄru un ieraksta klientu ā€” bez cilvÄ“ka iesaistes" },
              { icon: "š’°", color: "#22c55e", title: "ā‚¬500ā€“2000/projekts", desc: "Viens no augstÄkajiem nopelniem AI pakalpojumu jomÄ LatvijÄ ÅobrÄ«d" },
            ].map((item) => (
              <div
                key={item.title}
                style={{ padding: "22px 20px", borderRadius: 14, background: "#0d0d1a", border: `1px solid ${item.color}22`, transition: "border-color 0.2s, transform 0.2s" }}
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
          <div style={{ padding: "24px", borderRadius: 16, background: "#0d0d1a", border: `1px solid ${ABorder}` }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: A, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 16 }}>Ko tu iegÅ«si</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                "SpÄ“ju izveidot voice aÄ£entu ar VAPI no nulles",
                "ReÄlistisku ElevenLabs balsi konfigurÄ“tu aÄ£entam",
                "IntegrÄciju ar Google Calendar pierakstiem",
                "n8n workflow zvanu datu apstrÄdei",
                "IespÄ“ju pÄrdot par ā‚¬500ā€“2000 par projektu",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{ width: 18, height: 18, borderRadius: 5, background: ABg, border: ABorder, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={A} strokeWidth="3.5"><polyline points="20,6 9,17 4,12" /></svg>
                  </div>
                  <span style={{ fontSize: 12.5, color: "#bbb", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: "24px", borderRadius: 16, background: "#0d0d1a", border: `1px solid rgba(251,191,36,0.15)` }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: A2, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 16 }}>ScenÄriji, ko apgÅ«si</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                "FrizÄ“tava ā€” automÄtisks pierakstu aÄ£ents",
                "RestorÄns ā€” galdiÅ†u rezervÄcija pa tÄlruni",
                "Nekustamais Ä«paÅums ā€” lead kvalifikÄcija",
                "Ä€rstu kabinets ā€” vizÄ«Åu pieraksts",
                "JebkurÅ bizness ar ienÄkoÅajiem zvaniem",
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{ width: 18, height: 18, borderRadius: 5, background: ABg2, border: `1px solid rgba(251,191,36,0.3)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={A2} strokeWidth="3.5"><polyline points="20,6 9,17 4,12" /></svg>
                  </div>
                  <span style={{ fontSize: 12.5, color: "#bbb", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RezultÄts */}
        <div style={{ padding: "28px 32px", borderRadius: 16, background: "rgba(249,115,22,0.04)", border: `1px solid rgba(249,115,22,0.14)` }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: A, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 16 }}>RezultÄts ā€” tu pÄrdosi sistÄ“mu, ne zvanus</div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { icon: "š“˛", text: "Atbild uz zvaniem" },
              { icon: "š“…", text: "RezervÄ“ pierakstus" },
              { icon: "šˇÆ", text: "KvalificÄ“ lead'us" },
            ].map((r) => (
              <div key={r.text} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 18px", borderRadius: 10, background: ABg, border: ABorder, flex: 1, minWidth: 140 }}>
                <span style={{ fontSize: 18 }}>{r.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: A }}>{r.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Kam tas paredzÄ“ts */}
        <div>
          <SectionLabel>Kam tas paredzÄ“ts</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              "Ja gribi piedÄvÄt biznesiem augstvÄ“rtÄ«gu voice AI risinÄjumu",
              "Ja gribi nopelnÄ«t ā‚¬500ā€“2000 par vienu projektu",
              "Ja gribi bÅ«t pirmais LatvijÄ ar Åo pakalpojumu",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 18px", borderRadius: 10, background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: A, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: "#ccc" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tagline + CTA */}
        <div style={{ padding: "40px", borderRadius: 20, textAlign: "center", background: `linear-gradient(135deg, ${ABg}, ${ABg2})`, border: ABorder, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(${ABg} 1px, transparent 1px), linear-gradient(90deg, ${ABg} 1px, transparent 1px)`, backgroundSize: "32px 32px" }} />
          <div style={{ position: "relative" }}>
            <p style={{ fontSize: 14, color: "#555", marginBottom: 6 }}>LielÄkÄ daÄ¼a zvanu paliek neatbildÄ“ti.</p>
            <p style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 28, color: "#fff" }}>
              Tavs aÄ£ents atbildÄ“s{" "}
              <span style={{ background: AG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                pirmajÄ zvana signÄlÄ.
              </span>
            </p>
            <button
              style={{ padding: "15px 44px", borderRadius: 12, border: "none", cursor: "pointer", background: AG, color: "#000", fontWeight: 700, fontSize: 15, letterSpacing: "0.01em", boxShadow: "0 8px 32px rgba(249,115,22,0.35)", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 14px 40px rgba(249,115,22,0.5)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 32px rgba(249,115,22,0.35)"; }}
            >
              Izveidot savu pirmo voice aÄ£entu
            </button>
          </div>
        </div>

      </div>

      {/* Ko tu iemÄcÄ«sies */}
      <div>
        <SectionLabel>Ko tu iemÄcÄ«sies</SectionLabel>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20, letterSpacing: "-0.02em" }}>No nulles lÄ«dz pirmajam klientam</h2>
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {course.learn.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "14px 16px", borderRadius: 10, background: ABg, border: `1px solid rgba(249,115,22,0.1)` }}>
              <div style={{ width: 18, height: 18, borderRadius: 5, background: "rgba(249,115,22,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={A} strokeWidth="3"><polyline points="20,6 9,17 4,12" /></svg>
              </div>
              <span style={{ fontSize: 13, color: "#ccc", lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Kursa saturs */}
      <div>
        <SectionLabel>Kursa saturs</SectionLabel>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20, letterSpacing: "-0.02em" }}>{course.totalModules} moduÄ¼i Ā· {course.totalLessons} nodarbÄ«bas</h2>
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {course.modules.map((mod) => (
            <div key={mod.id} style={{ padding: "16px", borderRadius: 12, background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: ABg, border: ABorder, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: A }}>
                  {mod.id}
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{mod.title}</span>
              </div>
              <div style={{ fontSize: 11, color: "#555", marginBottom: 8 }}>{mod.lessons.length} nodarbÄ«bas Ā· {mod.duration}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {mod.lessons.slice(0, 3).map((l) => (
                  <span key={l.id} style={{ fontSize: 10, padding: "2px 7px", borderRadius: 4, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", color: "#666" }}>
                    {l.type === "task" ? "šˇÆ" : l.type === "text" ? "š“„" : "ā–¶"} {l.duration}
                  </span>
                ))}
                {mod.lessons.length > 3 && <span style={{ fontSize: 10, color: "#444", padding: "2px 4px" }}>+{mod.lessons.length - 3}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* KÄpÄ“c Åis kurss */}
      <div>
        <SectionLabel>KÄpÄ“c Åis kurss</SectionLabel>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20, letterSpacing: "-0.02em" }}>ReÄli rezultÄti, ne tikai teorija</h2>
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {[
            { icon: "šˇÆ", title: "Projektu bÄzÄ“ta", desc: "Katra moduÄ¼a beigÄs ir praktisks uzdevums ā€” portfolio, ko rÄdÄ«t potenciÄlajiem klientiem." },
            { icon: "š“¦", title: "Gatavi templates", desc: "SistÄ“mas promti, piedÄvÄjuma PDF, apkopes lÄ«gums ā€” viss latviski un gatavs lietoÅanai." },
            { icon: "š‡±š‡»", title: "Latvijas tirgum", desc: "KonkrÄ“ti klientu meklÄ“Åanas veidi, cenas LV tirgÅ« un cold outreach skripti." },
          ].map((item) => (
            <div key={item.title} style={{ padding: "20px", borderRadius: 12, background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: "#666", lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PasniedzÄ“js */}
      <div>
        <SectionLabel>PasniedzÄ“js</SectionLabel>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 20, padding: "24px", borderRadius: 16, background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, flexShrink: 0, background: AG, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, color: "#000" }}>
            {course.instructor.avatar}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <span style={{ fontSize: 16, fontWeight: 800 }}>{course.instructor.name}</span>
              <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 6, background: ABg, border: ABorder, color: A }}>
                {course.instructor.role}
              </span>
            </div>
            <p style={{ fontSize: 13, color: "#777", lineHeight: 1.7, marginBottom: 14 }}>{course.instructor.bio}</p>
            <div style={{ display: "flex", gap: 20 }}>
              <div><div style={{ fontSize: 18, fontWeight: 800, color: A }}>{course.instructor.students}+</div><div style={{ fontSize: 11, color: "#555" }}>studenti</div></div>
              <div><div style={{ fontSize: 18, fontWeight: 800, color: A }}>{course.instructor.courses}</div><div style={{ fontSize: 11, color: "#555" }}>kursi</div></div>
              <div><div style={{ fontSize: 18, fontWeight: 800, color: "#f59e0b" }}>4.9 ā…</div><div style={{ fontSize: 11, color: "#555" }}>vidÄ“jais vÄ“rtÄ“jums</div></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{ padding: "36px", borderRadius: 20, background: `linear-gradient(135deg, ${ABg}, ${ABg2})`, border: ABorder, textAlign: "center" }}>
        <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 8, letterSpacing: "-0.02em" }}>Gatavs sÄkt nopelnÄ«t {course.earn}?</h3>
        <p style={{ fontSize: 14, color: "#777", marginBottom: 24 }}>Pievienojies {course.students} studentiem kas jau apgÅ«st Åo kursu.</p>
        <button
          style={{ padding: "14px 40px", borderRadius: 12, border: "none", cursor: "pointer", background: AG, color: "#000", fontWeight: 700, fontSize: 15, boxShadow: "0 8px 30px rgba(249,115,22,0.3)", transition: "transform 0.2s, box-shadow 0.2s" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 40px rgba(249,115,22,0.45)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 30px rgba(249,115,22,0.3)"; }}
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
        <button onClick={() => setOpen(open.length === course.modules.length ? [] : course.modules.map((m) => m.id))} style={{ fontSize: 12, color: A, background: "transparent", border: "none", cursor: "pointer", fontWeight: 600 }}>
          {open.length === course.modules.length ? "AizvÄ“rt visus" : "AtvÄ“rt visus"}
        </button>
      </div>

      {course.modules.map((mod) => {
        const isOpen = open.includes(mod.id);
        return (
          <div key={mod.id} style={{ borderRadius: 12, overflow: "hidden", border: isOpen ? `1px solid rgba(249,115,22,0.2)` : "1px solid rgba(255,255,255,0.06)", background: "#0d0d1a", transition: "border-color 0.2s" }}>
            <button onClick={() => toggle(mod.id)} style={{ width: "100%", padding: "16px 20px", display: "flex", alignItems: "center", gap: 12, background: "transparent", border: "none", cursor: "pointer", color: "#fff" }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0, background: isOpen ? ABg : "rgba(255,255,255,0.05)", border: `1px solid ${isOpen ? ABorder : "rgba(255,255,255,0.1)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: isOpen ? A : "#555" }}>
                {mod.id}
              </div>
              <div style={{ flex: 1, textAlign: "left" }}>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{mod.title}</div>
                <div style={{ fontSize: 12, color: "#555", marginTop: 2 }}>{mod.lessons.length} nodarbÄ«bas Ā· {mod.duration}</div>
              </div>
              <div style={{ color: "#444" }}><ChevronIcon open={isOpen} /></div>
            </button>

            {isOpen && (
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                {mod.lessons.map((lesson, idx) => (
                  <button
                    key={lesson.id}
                    onClick={() => onSelectLesson(lesson)}
                    style={{ width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "12px 20px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left", borderTop: idx > 0 ? "1px solid rgba(255,255,255,0.03)" : "none", transition: "background 0.15s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = ABg)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <div style={{ width: 32, height: 32, borderRadius: 8, flexShrink: 0, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", color: lessonTypeColor[lesson.type] }}>
                      {lessonIcon(lesson.type)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "#ddd", marginBottom: 2 }}>{lesson.title}</div>
                      {lesson.description && <div style={{ fontSize: 11, color: "#555", lineHeight: 1.5 }}>{lesson.description}</div>}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                      {lesson.free && <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 4, background: ABg, color: A, fontWeight: 700 }}>BEZMAKSAS</span>}
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
  const toolEmoji: Record<string, string> = {
    "VAPI": "šˇ™ļø¸", "ElevenLabs": "š”", "Twilio": "š“˛",
    "Claude API": "š§ ", "n8n": "ā", "Google Cal.": "š“…", "Google Sheets": "š“",
  };
  return (
    <div>
      <SectionLabel>Izmantotie rÄ«ki</SectionLabel>
      <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, letterSpacing: "-0.02em" }}>7 rÄ«ki ko apgÅ«si kursÄ</h2>
      <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7, marginBottom: 32 }}>Visi nepiecieÅamie rÄ«ki ar bezmaksas plÄniem vai izmÄ“Ä£inÄjuma periodiem. Setup instrukcijas iekÄ¼autas kursÄ.</p>
      <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 40 }}>
        {course.tools.map((tool) => (
          <div
            key={tool.name}
            style={{ padding: "20px", borderRadius: 14, background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 16, transition: "border-color 0.2s, transform 0.2s", cursor: "default" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = `${tool.color}33`; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
          >
            <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: `${tool.color}18`, border: `1px solid ${tool.color}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
              {toolEmoji[tool.name] || "š”§"}
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

      <div style={{ padding: "24px", borderRadius: 14, background: ABg, border: ABorder }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: A, marginBottom: 12 }}>ā“ Kas nepiecieÅams lai sÄktu</div>
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[
            "Dators vai klÄ“pjdators (Windows/Mac)",
            "Stabils interneta savienojums",
            "VAPI un Twilio trial konti (bezmaksas)",
            "~ā‚¬15ā€“40/mÄ“n rÄ«ku izmaksas (sÄkumÄ)",
            "5ā€“8 stundas nedÄ“Ä¼Ä ieguldÄ«jumam",
            "NekÄdas programmÄ“Åanas zinÄÅanas nav vajadzÄ«gas",
          ].map((req) => (
            <div key={req} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12, color: "#888" }}>
              <span style={{ color: A, flexShrink: 0, marginTop: 1 }}>ā“</span>
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
    <div className="lesson-pad" style={{ maxWidth: 860, margin: "0 auto", padding: "40px 48px" }}>
      <button
        onClick={onBack}
        style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28, background: "transparent", border: "none", cursor: "pointer", color: "#666", fontSize: 13, fontWeight: 500, padding: "6px 0", transition: "color 0.2s" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15,18 9,12 15,6" /></svg>
        AtpakaÄ¼ uz kursa pÄrskatu
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, padding: "4px 10px", borderRadius: 6, background: `${lessonTypeColor[lesson.type]}18`, border: `1px solid ${lessonTypeColor[lesson.type]}33`, color: lessonTypeColor[lesson.type], fontWeight: 600 }}>
          {lessonIcon(lesson.type)}
          {lessonTypeLabel[lesson.type]}
        </span>
        <span style={{ fontSize: 11, color: "#444" }}>{lesson.duration}</span>
      </div>

      <h1 style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.025em", marginBottom: 24, lineHeight: 1.2 }}>{lesson.title}</h1>

      {lesson.type === "video" && (
        <div
          style={{ width: "100%", aspectRatio: "16/9", borderRadius: 16, marginBottom: 32, background: "linear-gradient(135deg, #120a05 0%, #1a0f00 100%)", border: `1px solid rgba(249,115,22,0.2)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, cursor: "pointer", position: "relative", overflow: "hidden", transition: "border-color 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = ABorder)}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(249,115,22,0.2)")}
        >
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(${ABg} 1px, transparent 1px), linear-gradient(90deg, ${ABg} 1px, transparent 1px)`, backgroundSize: "50px 50px" }} />
          <div style={{ position: "absolute", width: 300, height: 300, background: `radial-gradient(circle, rgba(249,115,22,0.08), transparent 70%)`, pointerEvents: "none" }} />
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: `linear-gradient(135deg, rgba(249,115,22,0.25), rgba(251,191,36,0.25))`, border: `2px solid ${ABorder}`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <div style={{ marginLeft: 4 }}><VideoIcon size={28} /></div>
          </div>
          <div style={{ textAlign: "center", position: "relative" }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Video ā€” {lesson.duration}</div>
            <div style={{ fontSize: 12, color: "#555" }}>Pieejams ar Pro plÄnu</div>
          </div>
        </div>
      )}

      {lesson.description && (
        <div style={{ padding: "24px", borderRadius: 12, marginBottom: 24, background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: A, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Par Åo nodarbÄ«bu</div>
          <p style={{ fontSize: 14, color: "#aaa", lineHeight: 1.8 }}>{lesson.description}</p>
        </div>
      )}

      {lesson.type === "task" && (
        <div style={{ padding: "24px", borderRadius: 12, marginBottom: 24, background: ABg, border: ABorder }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: A, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>šˇÆ Praktiskais uzdevums</div>
          <div style={{ fontSize: 13, color: "#888", lineHeight: 1.8 }}>Izpildi uzdevumu un augÅupielÄdÄ“ savu darbu ā€” tas bÅ«s daÄ¼a no tava portfolio, ko vari rÄdÄ«t potenciÄlajiem klientiem.</div>
          <button style={{ marginTop: 16, padding: "10px 24px", borderRadius: 8, cursor: "pointer", background: ABg, border: ABorder, color: A, fontWeight: 700, fontSize: 13, transition: "background 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(249,115,22,0.2)")} onMouseLeave={(e) => (e.currentTarget.style.background = ABg)}>
            Iesniegt uzdevumu
          </button>
        </div>
      )}

      {lesson.type === "text" && (
        <div style={{ padding: "24px", borderRadius: 12, marginBottom: 24, background: ABg2, border: `1px solid rgba(251,191,36,0.2)` }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: A2, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>š“„ LejupielÄdÄjams materiÄls</div>
          <div style={{ fontSize: 13, color: "#888", lineHeight: 1.8, marginBottom: 14 }}>Å Ä« nodarbÄ«ba ietver lejupielÄdÄjamu template, ko vari tÅ«lÄ«t izmantot darbÄ ar klientiem.</div>
          <button style={{ padding: "10px 24px", borderRadius: 8, cursor: "pointer", background: ABg2, border: `1px solid rgba(251,191,36,0.3)`, color: A2, fontWeight: 700, fontSize: 13, transition: "background 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(251,191,36,0.15)")} onMouseLeave={(e) => (e.currentTarget.style.background = ABg2)}>
            ā†“ LejupielÄdÄ“t (PDF)
          </button>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: 8 }}>
        <button
          onClick={onBack}
          style={{ padding: "10px 20px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", background: "transparent", color: "#666", fontSize: 13, cursor: "pointer", fontWeight: 500, transition: "color 0.2s, border-color 0.2s" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#fff"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.2)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#666"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
        >
          ā† AtpakaÄ¼
        </button>
        <button
          style={{ padding: "10px 24px", borderRadius: 8, border: "none", cursor: "pointer", background: AG, color: "#000", fontSize: 13, fontWeight: 700, boxShadow: "0 4px 16px rgba(249,115,22,0.3)", transition: "transform 0.2s, box-shadow 0.2s" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 24px rgba(249,115,22,0.45)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 16px rgba(249,115,22,0.3)"; }}
        >
          NÄkamÄ nodarbÄ«ba ā†’
        </button>
      </div>
    </div>
  );
}

// ā”€ā”€ā”€ Section Label ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€ā”€
function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 11, fontWeight: 700, color: A, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{children}</div>;
}
