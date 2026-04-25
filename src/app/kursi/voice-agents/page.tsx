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
  title: "Voice Agents ar VAPI",
  subtitle: "AI balss aģenti, kas zvana un atbild klientu vietā",
  description:
    "Iemācies veidot AI balss aģentus ar VAPI platformu — automātiskus zvanus, receptus pierakstu, klientu apkalpošanu un lead kvalifikāciju. Pakalpojums, ko pārdot Latvijas uzņēmumiem par €500–2000 vienreizēji.",
  earn: "€500–2000/projekts",
  difficulty: "Vidējs",
  tag: "Jaunākais",
  totalDuration: "6h 45 min",
  totalLessons: 20,
  totalModules: 6,
  students: 54,
  rating: 4.9,
  instructor: {
    name: "Kārlis Bērziņš",
    role: "AI Automatizācijas Eksperts",
    avatar: "KB",
    bio: "5+ gadi digitālā mārketingā, pēdējos 2 gadus specializējoties AI risinājumos Latvijas uzņēmumiem. Izveidojis 20+ voice aģentus dažādām nišām — ārstu kabineti, restorāni, nekustamais īpašums.",
    students: 420,
    courses: 3,
  },
  tools: [
    { name: "VAPI",          desc: "Voice AI aģentu platforma",         color: "#f97316" },
    { name: "ElevenLabs",    desc: "Reālistiskas AI balsis",             color: "#fbbf24" },
    { name: "Twilio",        desc: "Telefona numura integrācija",        color: "#f43f5e" },
    { name: "Claude API",    desc: "Anthropic AI smadzenes",             color: "#a855f7" },
    { name: "n8n",           desc: "Zvanu datu automatizācija",          color: "#00d4ff" },
    { name: "Google Cal.",   desc: "Pierakstu rezervācija",              color: "#22c55e" },
    { name: "Google Sheets", desc: "Lead datu glabāšana",                color: "#34d399" },
  ],
  learn: [
    "Izveidot pilnfunkcionālu AI balss aģentu ar VAPI",
    "Pievienot reālistisku ElevenLabs balsi aģentam",
    "Savienot aģentu ar Twilio tālruņa numuru",
    "Veidot zvanu skriptus un sarunu loģiku",
    "Integrēt Google Calendar pierakstu rezervācijai",
    "Saglabāt zvanu datus n8n → Google Sheets",
    "Pārdot voice aģenta pakalpojumu par €500–2000",
    "Izveidot demo zvanu, kas pats pārdod pakalpojumu",
  ],
  modules: [
    {
      id: 1,
      title: "Ievads & Setup",
      duration: "50 min",
      lessons: [
        { id: "1-1", title: "Kas ir voice AI aģents un kāpēc tas strādā?", type: "video" as LessonType, duration: "15 min", free: true, description: "Salīdzinājums: cilvēks vs AI aģents. Stats par zvanu atbildes ātrumu un konversijām. Reāli Latvijas piemēri." },
        { id: "1-2", title: "VAPI konts, Twilio numurs & ElevenLabs setup", type: "video" as LessonType, duration: "14 min", free: true, description: "Trīs kontu izveide soli pa solim. Twilio trial numura iegūšana un savienošana ar VAPI." },
        { id: "1-3", title: "Klientu onboarding process", type: "text" as LessonType, duration: "8 min", description: "Lejupielādējams onboarding template — jautājumi par biznesa scenāriju, biežākajiem zvaniem un vēlamo toni." },
        { id: "1-4", title: "Cenas un bizness modelis", type: "video" as LessonType, duration: "13 min", description: "Kāpēc €500+ ir saprātīgi sākumā. Vienreizējā maksa vs ikmēneša apkope. Kā prezentēt ROI klientam." },
      ],
    },
    {
      id: 2,
      title: "Pirmais Voice Aģents",
      duration: "1h 20 min",
      lessons: [
        { id: "2-1", title: "VAPI dashboard — aģenta izveide", type: "video" as LessonType, duration: "18 min", description: "Orientācija VAPI kanvassā. Assistant izveide, modeļa izvēle (GPT-4o mini vs Claude), sistēmas promta lauks." },
        { id: "2-2", title: "Sistēmas promts voice aģentam", type: "video" as LessonType, duration: "22 min", description: "Kā rakstīt sistēmas promptu balsij — īsi, dabīgi, bez markdown. Template ar 6 obligātajiem blokiem katram biznesam." },
        { id: "2-3", title: "ElevenLabs balss integrācija", type: "video" as LessonType, duration: "16 min", description: "Balss izvēle un pielāgošana. Stability, similarity un style parametri. Kā izvēlēties balsi konkrētam biznesam." },
        { id: "2-4", title: "Uzdevums: pirmais aģents no nulles", type: "task" as LessonType, duration: "24 min", description: "Izveido funkcionālu voice aģentu frizētavai vai restorānam. Testē ar VAPI test call funkciju." },
      ],
    },
    {
      id: 3,
      title: "Sarunu Loģika & Scenāriji",
      duration: "1h 10 min",
      lessons: [
        { id: "3-1", title: "Zvanu scenāriji — pieraksts, info, lead kvalifikācija", type: "video" as LessonType, duration: "20 min", description: "3 galvenie voice aģenta use-case veidi. Kā strukturēt sarunu atkarībā no mērķa." },
        { id: "3-2", title: "Functions — aģents, kas var 'darīt lietas'", type: "video" as LessonType, duration: "22 min", description: "VAPI Functions — kā aģents var pārbaudīt pieejamību, rezervēt laiku vai nosūtīt SMS." },
        { id: "3-3", title: "Reālu zvanu simulācija un testēšana", type: "video" as LessonType, duration: "16 min", description: "10 standarta testjautājumi katram voice aģentam. Kā novērst bieži sastopamās kļūdas balsī." },
        { id: "3-4", title: "Uzdevums: 3 dažādi zvanu scenāriji", type: "task" as LessonType, duration: "12 min", description: "Izveido 3 aģenta versijas: informatīvs, pieraksts un lead kvalifikācija. Kuru klients izvēlēsies?" },
      ],
    },
    {
      id: 4,
      title: "Integrācijas",
      duration: "55 min",
      lessons: [
        { id: "4-1", title: "Google Calendar — automātisks pieraksts", type: "video" as LessonType, duration: "22 min", description: "VAPI + Cal.com vai Google Calendar integrācija. Aģents pārbauda brīvos laikus un rezervē tikšanos reāllaikā." },
        { id: "4-2", title: "n8n webhook — zvanu dati uz Google Sheets", type: "video" as LessonType, duration: "18 min", description: "Katrs zvans → n8n → Google Sheets. Klienta vārds, numurs, tēma, ilgums — automātiski." },
        { id: "4-3", title: "SMS follow-up pēc zvana", type: "video" as LessonType, duration: "15 min", description: "Twilio SMS nosūtīšana pēc veiksmīga zvana — apstiprinājums, pieraksta laiks, kontaktinformācija." },
      ],
    },
    {
      id: 5,
      title: "Nišas & Reāli Projekti",
      duration: "1h 15 min",
      lessons: [
        { id: "5-1", title: "Frizētava / skaistumkopšana — pierakstu aģents", type: "video" as LessonType, duration: "22 min", description: "Pilns case study — sistēmas promts, balss, kalendāra integrācija un testēšana frizētavas scenārijam." },
        { id: "5-2", title: "Nekustamais īpašums — lead kvalifikācija", type: "video" as LessonType, duration: "20 min", description: "Voice aģents, kas izjautā potenciālos pircējus un nosūta kvalificētus lead'us brokerim." },
        { id: "5-3", title: "Restorāns / kafejnīca — galdiņu rezervācija", type: "video" as LessonType, duration: "18 min", description: "Vienkāršs aģents, kas ņem rezervācijas, apstiprina laiku un sūta SMS apstiprinājumu." },
        { id: "5-4", title: "Uzdevums: izveido pilnu nišas projektu", type: "task" as LessonType, duration: "15 min", description: "Izvēlies vienu nišu un izveido pilnu voice aģentu ar integrācijām. Tas būs tavs portfolio projekts." },
      ],
    },
    {
      id: 6,
      title: "Klientu Atrašana & Bizness",
      duration: "55 min",
      lessons: [
        { id: "6-1", title: "Kur atrast pirmos klientus Latvijā", type: "video" as LessonType, duration: "20 min", description: "Konkrētas vietas: ārstu kabineti bez automatizācijas, frizētavas, restorāni. Cold outreach solis pa solim." },
        { id: "6-2", title: "Demo zvans kā pārdošanas rīks", type: "video" as LessonType, duration: "18 min", description: "Kā izveidot demo zvanu konkrētam klientam pirms tikšanās — 'pazvani šim numuram un klausies'." },
        { id: "6-3", title: "Piedāvājums, līgums un apkopes modelis", type: "text" as LessonType, duration: "17 min", description: "Lejupielādējams PDF piedāvājums ar 3 paketēm (€300/600/1200) un apkopes līgums latviešu valodā." },
      ],
    },
  ] as Module[],
};

// ─── Accent colors ─────────────────────────────────────────────────────────────
const A = "#f97316";
const A2 = "#fbbf24";
const AG = `linear-gradient(135deg, ${A}, ${A2})`;
const ABg = `rgba(249,115,22,0.1)`;
const ABg2 = `rgba(251,191,36,0.07)`;
const ABorder = `rgba(249,115,22,0.3)`;

// ─── Icon Components ──────────────────────────────────────────────────────────
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
      <nav style={{ position: "sticky", top: 0, zIndex: 50, height: 56, background: "rgba(5,5,8,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", padding: "0 20px", gap: 12 }}>
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: 8, color: "#888", fontSize: 13, fontWeight: 500, textDecoration: "none", padding: "5px 10px", borderRadius: 8, transition: "color 0.2s, background 0.2s" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#fff"; (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.05)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "#888"; (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15,18 9,12 15,6" /></svg>
          Atpakaļ
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

      {/* ── Layout ── */}
      <div style={{ display: "flex", height: "calc(100vh - 56px)" }}>

        {/* ── LEFT SIDEBAR ── */}
        <aside style={{ width: 300, flexShrink: 0, background: "#07070f", borderRight: "1px solid rgba(255,255,255,0.05)", overflowY: "auto", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "20px 16px 16px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, background: "linear-gradient(135deg, rgba(249,115,22,0.25), rgba(251,191,36,0.25))", border: `1px solid ${ABorder}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <VoiceIcon />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>{course.title}</div>
                <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{totalLessons} nodarbības · {course.totalDuration}</div>
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
                      <div style={{ fontSize: 10, color: "#444", marginTop: 1 }}>{mod.lessons.length} nodarbības · {mod.duration}</div>
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
                              <div style={{ fontSize: 10, color: "#444", marginTop: 1 }}>{lessonTypeLabel[lesson.type]} · {lesson.duration}</div>
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
            <LessonView lesson={activeLesson} onBack={() => setActiveLesson(null)} />
          ) : (
            <div>
              {/* Hero banner */}
              <div style={{ position: "relative", padding: "48px 48px 40px", background: `linear-gradient(135deg, ${ABg} 0%, ${ABg2} 50%, rgba(5,5,8,0) 100%)`, borderBottom: "1px solid rgba(255,255,255,0.05)", overflow: "hidden" }}>
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

                  <h1 style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 10, lineHeight: 1.1 }}>
                    {course.title}
                  </h1>
                  <p style={{ fontSize: 16, color: "#888", maxWidth: 640, lineHeight: 1.7, marginBottom: 28 }}>
                    {course.description}
                  </p>

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
                      <span style={{ fontSize: 28, fontWeight: 900, background: AG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
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
                      style={{ padding: "14px 20px", border: "none", background: "transparent", cursor: "pointer", fontSize: 13, fontWeight: isActive ? 600 : 400, color: isActive ? "#fff" : "#555", borderBottom: isActive ? `2px solid ${A}` : "2px solid transparent", transition: "color 0.2s, border-color 0.2s" }}
                    >
                      {labels[tab]}
                    </button>
                  );
                })}
              </div>

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

      {/* ── HERO SALES SECTION ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

        {/* Virsraksts + apakšvirsraksts */}
        <div style={{ position: "relative", padding: "40px", borderRadius: 20, background: `linear-gradient(135deg, ${ABg} 0%, ${ABg2} 60%, rgba(5,5,8,0) 100%)`, border: ABorder, overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(${ABg} 1px, transparent 1px), linear-gradient(90deg, ${ABg} 1px, transparent 1px)`, backgroundSize: "32px 32px" }} />
          <div style={{ position: "absolute", top: -60, right: -60, width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle, rgba(251,191,36,0.1), transparent 70%)", pointerEvents: "none" }} />

          <div style={{ position: "relative" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 20, background: ABg, border: ABorder, marginBottom: 20 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: A, boxShadow: `0 0 8px ${A}` }} />
              <span style={{ fontSize: 11, color: A, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>Voice AI aģents</span>
            </div>

            <h2 style={{ fontSize: 32, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 14, color: "#fff" }}>
              Izveido AI, kas zvana<br />
              <span style={{ background: AG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>un runā tavā vietā</span>
            </h2>

            <p style={{ fontSize: 15, color: "#888", lineHeight: 1.75, maxWidth: 620 }}>
              Ne tikai chatbot — bet balss aģents, kas pats zvana klientiem, pieraksta vizītes un kvalificē lead'us 24/7 bez cilvēka iesaistes
            </p>
          </div>
        </div>

        {/* Solījums */}
        <div style={{ padding: "28px 32px", borderRadius: 16, background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "flex-start", gap: 20 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, flexShrink: 0, background: `linear-gradient(135deg, rgba(249,115,22,0.2), rgba(251,191,36,0.2))`, border: ABorder, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
            🎙️
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: A, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>Solījums</div>
            <p style={{ fontSize: 15, color: "#ccc", lineHeight: 1.75 }}>
              Tu iemācīsies izveidot pilnu voice aģenta sistēmu ar VAPI un ElevenLabs — no pirmā zvana līdz automātiskai pierakstu rezervācijai un lead datu apstrādei
            </p>
          </div>
        </div>

        {/* Kas padara atšķirīgu */}
        <div>
          <SectionLabel>Kas padara šo atšķirīgu</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
            {[
              { icon: "🎙️", color: A,       title: "Reāla balss, ne robots", desc: "ElevenLabs nodrošina tik dabīgu balsi, ka klienti bieži vien nepamana, ka runā ar AI" },
              { icon: "📅", color: A2,      title: "Automātisks pieraksts", desc: "Aģents pats pārbauda kalendāru un ieraksta klientu — bez cilvēka iesaistes" },
              { icon: "💰", color: "#22c55e", title: "€500–2000/projekts", desc: "Viens no augstākajiem nopelniem AI pakalpojumu jomā Latvijā šobrīd" },
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

        {/* Ko tu iegūsi + Automatizācijas */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ padding: "24px", borderRadius: 16, background: "#0d0d1a", border: `1px solid ${ABorder}` }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: A, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 16 }}>Ko tu iegūsi</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                "Spēju izveidot voice aģentu ar VAPI no nulles",
                "Reālistisku ElevenLabs balsi konfigurētu aģentam",
                "Integrāciju ar Google Calendar pierakstiem",
                "n8n workflow zvanu datu apstrādei",
                "Iespēju pārdot par €500–2000 par projektu",
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
            <div style={{ fontSize: 11, fontWeight: 700, color: A2, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 16 }}>Scenāriji, ko apgūsi</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                "Frizētava — automātisks pierakstu aģents",
                "Restorāns — galdiņu rezervācija pa tālruni",
                "Nekustamais īpašums — lead kvalifikācija",
                "Ārstu kabinets — vizīšu pieraksts",
                "Jebkurš bizness ar ienākošajiem zvaniem",
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

        {/* Rezultāts */}
        <div style={{ padding: "28px 32px", borderRadius: 16, background: "rgba(249,115,22,0.04)", border: `1px solid rgba(249,115,22,0.14)` }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: A, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 16 }}>Rezultāts — tu pārdosi sistēmu, ne zvanus</div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { icon: "📞", text: "Atbild uz zvaniem" },
              { icon: "📅", text: "Rezervē pierakstus" },
              { icon: "🎯", text: "Kvalificē lead'us" },
            ].map((r) => (
              <div key={r.text} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 18px", borderRadius: 10, background: ABg, border: ABorder, flex: 1, minWidth: 140 }}>
                <span style={{ fontSize: 18 }}>{r.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: A }}>{r.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Kam tas paredzēts */}
        <div>
          <SectionLabel>Kam tas paredzēts</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              "Ja gribi piedāvāt biznesiem augstvērtīgu voice AI risinājumu",
              "Ja gribi nopelnīt €500–2000 par vienu projektu",
              "Ja gribi būt pirmais Latvijā ar šo pakalpojumu",
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
            <p style={{ fontSize: 14, color: "#555", marginBottom: 6 }}>Lielākā daļa zvanu paliek neatbildēti.</p>
            <p style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 28, color: "#fff" }}>
              Tavs aģents atbildēs{" "}
              <span style={{ background: AG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                pirmajā zvana signālā.
              </span>
            </p>
            <button
              style={{ padding: "15px 44px", borderRadius: 12, border: "none", cursor: "pointer", background: AG, color: "#000", fontWeight: 700, fontSize: 15, letterSpacing: "0.01em", boxShadow: "0 8px 32px rgba(249,115,22,0.35)", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 14px 40px rgba(249,115,22,0.5)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 32px rgba(249,115,22,0.35)"; }}
            >
              Izveidot savu pirmo voice aģentu
            </button>
          </div>
        </div>

      </div>

      {/* Ko tu iemācīsies */}
      <div>
        <SectionLabel>Ko tu iemācīsies</SectionLabel>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20, letterSpacing: "-0.02em" }}>No nulles līdz pirmajam klientam</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
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
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20, letterSpacing: "-0.02em" }}>{course.totalModules} moduļi · {course.totalLessons} nodarbības</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {course.modules.map((mod) => (
            <div key={mod.id} style={{ padding: "16px", borderRadius: 12, background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: ABg, border: ABorder, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: A }}>
                  {mod.id}
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{mod.title}</span>
              </div>
              <div style={{ fontSize: 11, color: "#555", marginBottom: 8 }}>{mod.lessons.length} nodarbības · {mod.duration}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {mod.lessons.slice(0, 3).map((l) => (
                  <span key={l.id} style={{ fontSize: 10, padding: "2px 7px", borderRadius: 4, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", color: "#666" }}>
                    {l.type === "task" ? "🎯" : l.type === "text" ? "📄" : "▶"} {l.duration}
                  </span>
                ))}
                {mod.lessons.length > 3 && <span style={{ fontSize: 10, color: "#444", padding: "2px 4px" }}>+{mod.lessons.length - 3}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Kāpēc šis kurss */}
      <div>
        <SectionLabel>Kāpēc šis kurss</SectionLabel>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20, letterSpacing: "-0.02em" }}>Reāli rezultāti, ne tikai teorija</h2>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {[
            { icon: "🎯", title: "Projektu bāzēta", desc: "Katra moduļa beigās ir praktisks uzdevums — portfolio, ko rādīt potenciālajiem klientiem." },
            { icon: "📦", title: "Gatavi templates", desc: "Sistēmas promti, piedāvājuma PDF, apkopes līgums — viss latviski un gatavs lietošanai." },
            { icon: "🇱🇻", title: "Latvijas tirgum", desc: "Konkrēti klientu meklēšanas veidi, cenas LV tirgū un cold outreach skripti." },
          ].map((item) => (
            <div key={item.title} style={{ padding: "20px", borderRadius: 12, background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: "#666", lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pasniedzējs */}
      <div>
        <SectionLabel>Pasniedzējs</SectionLabel>
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
              <div><div style={{ fontSize: 18, fontWeight: 800, color: "#f59e0b" }}>4.9 ★</div><div style={{ fontSize: 11, color: "#555" }}>vidējais vērtējums</div></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{ padding: "36px", borderRadius: 20, background: `linear-gradient(135deg, ${ABg}, ${ABg2})`, border: ABorder, textAlign: "center" }}>
        <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 8, letterSpacing: "-0.02em" }}>Gatavs sākt nopelnīt {course.earn}?</h3>
        <p style={{ fontSize: 14, color: "#777", marginBottom: 24 }}>Pievienojies {course.students} studentiem kas jau apgūst šo kursu.</p>
        <button
          style={{ padding: "14px 40px", borderRadius: 12, border: "none", cursor: "pointer", background: AG, color: "#000", fontWeight: 700, fontSize: 15, boxShadow: "0 8px 30px rgba(249,115,22,0.3)", transition: "transform 0.2s, box-shadow 0.2s" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 40px rgba(249,115,22,0.45)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 30px rgba(249,115,22,0.3)"; }}
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
        <button onClick={() => setOpen(open.length === course.modules.length ? [] : course.modules.map((m) => m.id))} style={{ fontSize: 12, color: A, background: "transparent", border: "none", cursor: "pointer", fontWeight: 600 }}>
          {open.length === course.modules.length ? "Aizvērt visus" : "Atvērt visus"}
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
                <div style={{ fontSize: 12, color: "#555", marginTop: 2 }}>{mod.lessons.length} nodarbības · {mod.duration}</div>
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

// ─── Tools Tab ────────────────────────────────────────────────────────────────
function ToolsTab() {
  const toolEmoji: Record<string, string> = {
    "VAPI": "🎙️", "ElevenLabs": "🔊", "Twilio": "📞",
    "Claude API": "🧠", "n8n": "⚡", "Google Cal.": "📅", "Google Sheets": "📊",
  };
  return (
    <div>
      <SectionLabel>Izmantotie rīki</SectionLabel>
      <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, letterSpacing: "-0.02em" }}>7 rīki ko apgūsi kursā</h2>
      <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7, marginBottom: 32 }}>Visi nepieciešamie rīki ar bezmaksas plāniem vai izmēģinājuma periodiem. Setup instrukcijas iekļautas kursā.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 40 }}>
        {course.tools.map((tool) => (
          <div
            key={tool.name}
            style={{ padding: "20px", borderRadius: 14, background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 16, transition: "border-color 0.2s, transform 0.2s", cursor: "default" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = `${tool.color}33`; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
          >
            <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: `${tool.color}18`, border: `1px solid ${tool.color}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
              {toolEmoji[tool.name] || "🔧"}
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
        <div style={{ fontSize: 13, fontWeight: 700, color: A, marginBottom: 12 }}>✓ Kas nepieciešams lai sāktu</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[
            "Dators vai klēpjdators (Windows/Mac)",
            "Stabils interneta savienojums",
            "VAPI un Twilio trial konti (bezmaksas)",
            "~€15–40/mēn rīku izmaksas (sākumā)",
            "5–8 stundas nedēļā ieguldījumam",
            "Nekādas programmēšanas zināšanas nav vajadzīgas",
          ].map((req) => (
            <div key={req} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12, color: "#888" }}>
              <span style={{ color: A, flexShrink: 0, marginTop: 1 }}>✓</span>
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
        style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28, background: "transparent", border: "none", cursor: "pointer", color: "#666", fontSize: 13, fontWeight: 500, padding: "6px 0", transition: "color 0.2s" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15,18 9,12 15,6" /></svg>
        Atpakaļ uz kursa pārskatu
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
            <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Video — {lesson.duration}</div>
            <div style={{ fontSize: 12, color: "#555" }}>Pieejams ar Pro plānu</div>
          </div>
        </div>
      )}

      {lesson.description && (
        <div style={{ padding: "24px", borderRadius: 12, marginBottom: 24, background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: A, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>Par šo nodarbību</div>
          <p style={{ fontSize: 14, color: "#aaa", lineHeight: 1.8 }}>{lesson.description}</p>
        </div>
      )}

      {lesson.type === "task" && (
        <div style={{ padding: "24px", borderRadius: 12, marginBottom: 24, background: ABg, border: ABorder }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: A, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>🎯 Praktiskais uzdevums</div>
          <div style={{ fontSize: 13, color: "#888", lineHeight: 1.8 }}>Izpildi uzdevumu un augšupielādē savu darbu — tas būs daļa no tava portfolio, ko vari rādīt potenciālajiem klientiem.</div>
          <button style={{ marginTop: 16, padding: "10px 24px", borderRadius: 8, cursor: "pointer", background: ABg, border: ABorder, color: A, fontWeight: 700, fontSize: 13, transition: "background 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(249,115,22,0.2)")} onMouseLeave={(e) => (e.currentTarget.style.background = ABg)}>
            Iesniegt uzdevumu
          </button>
        </div>
      )}

      {lesson.type === "text" && (
        <div style={{ padding: "24px", borderRadius: 12, marginBottom: 24, background: ABg2, border: `1px solid rgba(251,191,36,0.2)` }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: A2, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>📄 Lejupielādājams materiāls</div>
          <div style={{ fontSize: 13, color: "#888", lineHeight: 1.8, marginBottom: 14 }}>Šī nodarbība ietver lejupielādājamu template, ko vari tūlīt izmantot darbā ar klientiem.</div>
          <button style={{ padding: "10px 24px", borderRadius: 8, cursor: "pointer", background: ABg2, border: `1px solid rgba(251,191,36,0.3)`, color: A2, fontWeight: 700, fontSize: 13, transition: "background 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(251,191,36,0.15)")} onMouseLeave={(e) => (e.currentTarget.style.background = ABg2)}>
            ↓ Lejupielādēt (PDF)
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
          ← Atpakaļ
        </button>
        <button
          style={{ padding: "10px 24px", borderRadius: 8, border: "none", cursor: "pointer", background: AG, color: "#000", fontSize: 13, fontWeight: 700, boxShadow: "0 4px 16px rgba(249,115,22,0.3)", transition: "transform 0.2s, box-shadow 0.2s" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 24px rgba(249,115,22,0.45)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 16px rgba(249,115,22,0.3)"; }}
        >
          Nākamā nodarbība →
        </button>
      </div>
    </div>
  );
}

// ─── Section Label ────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 11, fontWeight: 700, color: A, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{children}</div>;
}
