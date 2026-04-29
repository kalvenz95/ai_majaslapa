"use client";
import { useState } from "react";
import Link from "next/link";

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

const course = {
  title: "AI Balss Aģenti",
  subtitle: "Izveido sistēmu, kas zvana klientiem tavā vietā",
  description:
    "Iemācies no nulles izveidot AI balss aģentu, kas automātiski pieņem zvanus, rezervē pierakstus un atbild uz jautājumiem 24/7. Nav nepieciešamas programmēšanas zināšanas. Gatavs pakalpojums, ko pārdot Latvijas uzņēmumiem par 500€–1800€.",
  earn: "500€–1800€/projekts",
  difficulty: "Vidējs",
  tag: "Jaunākais",
  totalDuration: "7h 10 min",
  totalLessons: 22,
  totalModules: 6,
  students: 61,
  rating: 4.9,
  instructor: {
    name: "Kārlis Bērziņš",
    role: "AI Automatizācijas Eksperts",
    avatar: "KB",
    bio: "5+ gadi digitālā mārketingā, pēdējos 2 gadus specializējoties AI risinājumos Latvijas uzņēmumiem. Izveidojis 20+ balss aģentus dažādām nišām — ārstu kabineti, restorāni, nekustamais īpašums.",
    students: 420,
    courses: 3,
  },
  tools: [
    { name: "ElevenLabs",    desc: "Reālistiskas AI balsis latviski",  color: "#f97316" },
    { name: "n8n",           desc: "Zvanu automatizācijas backend",     color: "#00d4ff" },
    { name: "Claude API",    desc: "AI smadzenes aģentam",             color: "#a855f7" },
    { name: "Twilio / Vonage", desc: "Latvijas numura integrācija",    color: "#f43f5e" },
    { name: "Google Cal.",   desc: "Automātiska pierakstu rezervācija", color: "#22c55e" },
    { name: "Google Sheets", desc: "Zvanu datu glabāšana",             color: "#34d399" },
    { name: "Retell AI",     desc: "Balss aģenta platforma",           color: "#fbbf24" },
  ],
  learn: [
    "Izveidot pilnfunkcionālu AI balss aģentu bez koda",
    "Pievienot reālistisku latviski runājošu balsi",
    "Savienot aģentu ar Latvijas tālruņa numuru",
    "Veidot sarunu skriptus un loģiku",
    "Integrēt Google Calendar pierakstu rezervācijai",
    "Saglabāt zvanu datus CRM automātiski",
    "Pārdot pakalpojumu par 500€–1800€",
    "Izveidot demo, kas pats pārdod klientam",
  ],
  modules: [
    {
      id: 1,
      title: "Ievads",
      duration: "55 min",
      lessons: [
        { id: "1-1", title: "Kas ir AI balss aģents un kā tas darbojas?", type: "video" as LessonType, duration: "14 min", free: true, description: "Salīdzinājums: cilvēks vs AI aģents zvanos. Reāli piemēri — zobārsta kabinets, restorāns, nekustamais īpašums. Kāpēc uzņēmumi maksā par šo." },
        { id: "1-2", title: "Kādiem biznesiem tas ir piemērots Latvijā?", type: "video" as LessonType, duration: "12 min", free: true, description: "Top 10 nišas, kur balss aģenti darbojas vislabāk Latvijā. Tirgus lielums un iespēja." },
        { id: "1-3", title: "Cenas, bizness modelis un ROI klientam", type: "video" as LessonType, duration: "15 min", description: "Kāpēc 500€+ ir saprātīgi sākumā. Vienreizējā maksa vs ikmēneša atbalsts. Kā aprēķināt ROI klientam." },
        { id: "1-4", title: "Klienta onboarding dokuments", type: "text" as LessonType, duration: "8 min", description: "Lejupielādējams template — jautājumi par biznesa scenāriju, biežākajiem zvaniem un vēlamo toni." },
        { id: "1-5", title: "Uzdevums: izvēlies savu pirmo nišu", type: "task" as LessonType, duration: "6 min", description: "Izvēlies 1 nišu (restorāns, zobārstniecība, u.c.) un apraksti 3 scenārijus, kad balss aģents var aizstāt cilvēku." },
      ],
    },
    {
      id: 2,
      title: "Setup — Rīki, konti un pirmais aģents",
      duration: "1h 25 min",
      lessons: [
        { id: "2-1", title: "Rīku saraksts un kontu izveide", type: "video" as LessonType, duration: "16 min", description: "ElevenLabs, Retell AI, n8n un Twilio kontu setup. Bezmaksas plāni un izmēģinājuma periodi." },
        { id: "2-2", title: "Pirmais aģents: sveiciens un pamata atbildes", type: "video" as LessonType, duration: "22 min", description: "Platforma no nulles — pirmais flow, AI modeļa pievienošana, sveiciena ziņa, pamata jautājumu apstrāde." },
        { id: "2-3", title: "Zvanu skripts un sarunu loģika", type: "video" as LessonType, duration: "20 min", description: "Kā rakstīt sarunu skriptus, kas izklausās dabiski. Jautājumu un atbilžu struktūra. Edge case apstrāde." },
        { id: "2-4", title: "Testēšana ar īstu zvanu", type: "video" as LessonType, duration: "14 min", description: "Kā piezvanīt savam aģentam un novērtēt kvalitāti. 10 testjautājumi ko vienmēr pārbaudīt." },
        { id: "2-5", title: "Uzdevums: pirmais darba aģents", type: "task" as LessonType, duration: "13 min", description: "Izveido darba aģentu izvēlētajai nišai, kurš spēj atbildēt uz vismaz 5 biežiem jautājumiem." },
      ],
    },
    {
      id: 3,
      title: "Balss & Identitāte — Izskan profesionāli",
      duration: "1h 5 min",
      lessons: [
        { id: "3-1", title: "ElevenLabs — reālistisku balsi aģentam", type: "video" as LessonType, duration: "20 min", description: "ElevenLabs voice cloning un balss bibliotēka. Latviskai izrunai piemērotas balsis. API savienošana ar aģentu." },
        { id: "3-2", title: "Tona un personības pielāgošana", type: "video" as LessonType, duration: "18 min", description: "Sistēmas promts aģenta personībai. Formāls vs draudzīgs tonis. Kā pielāgot klienta zīmolam." },
        { id: "3-3", title: "Latviešu valoda un izruna", type: "video" as LessonType, duration: "15 min", description: "Kā nodrošināt pareizu latviešu valodas apstrādi. Biežākās kļūdas un to labošana." },
        { id: "3-4", title: "Uzdevums: balss demo klientam", type: "task" as LessonType, duration: "12 min", description: "Izveidot 60 sekunžu audio demo, ko var nosūtīt potenciālajam klientam." },
      ],
    },
    {
      id: 4,
      title: "Integrācijas — Kalendarss, CRM un dati",
      duration: "1h 20 min",
      lessons: [
        { id: "4-1", title: "Google Calendar — automātiska pierakstu rezervācija", type: "video" as LessonType, duration: "24 min", description: "n8n workflow: aģents piedāvā brīvos laikus, klients izvēlas, tikšanās izveidojas automātiski. Pilns setup." },
        { id: "4-2", title: "Google Sheets — zvanu dati un lead capture", type: "video" as LessonType, duration: "18 min", description: "Kā saglabāt zvanu vēsturi, klienta vārdu, vajadzību un kontaktu automātiski pēc katra zvana." },
        { id: "4-3", title: "E-pasta apstiprinājums pēc zvana", type: "video" as LessonType, duration: "14 min", description: "Automātisks apstiprinājuma e-pasts klientam pēc pieraksta — n8n + Gmail integrācija." },
        { id: "4-4", title: "Latvijas numurs ar Twilio vai Vonage", type: "video" as LessonType, duration: "12 min", description: "Kā iegūt Latvijas (+371) numuru un pievienot aģentam. Cenas un atšķirības starp Twilio un Vonage." },
        { id: "4-5", title: "Uzdevums: pilna integrācija", type: "task" as LessonType, duration: "12 min", description: "Savienot aģentu ar Google Calendar un Sheets. Veikt testa zvanu un pārliecināties, ka dati tiek saglabāti." },
      ],
    },
    {
      id: 5,
      title: "Reāli Scenāriji — Zobārstniecība, Restorāns, Nekustamais",
      duration: "55 min",
      lessons: [
        { id: "5-1", title: "Zobārstniecības aģents — pieraksti un atgādinājumi", type: "video" as LessonType, duration: "22 min", description: "Pilns use case: pacients zvana, aģents piedāvā laikus, rezervē, nosūta atgādinājumu. Kā pārdot šo zobārstam." },
        { id: "5-2", title: "Restorāna aģents — galda rezervācijas", type: "video" as LessonType, duration: "18 min", description: "Galda rezervācija, jautājumi par ēdienkarti, darba laiki. Aģents, kas 'zina' visu par restorānu." },
        { id: "5-3", title: "Nekustamā īpašuma aģents — lead kvalifikācija", type: "video" as LessonType, duration: "15 min", description: "Automātiska lead filtrēšana — aģents uzdod jautājumus un sagatavo apkopojumu brokerim." },
      ],
    },
    {
      id: 6,
      title: "Klientu Atrašana & Pirmais Pārdošanas Zvans",
      duration: "1h",
      lessons: [
        { id: "6-1", title: "Kur atrast pirmos klientus Latvijā", type: "video" as LessonType, duration: "20 min", description: "Konkrētas vietas: Lursoft biznesi bez automātiskiem zvaniem, LinkedIn, vietējo ārstu katalogi, ss.lv." },
        { id: "6-2", title: "Demo aģents, kas pats pārdod pakalpojumu", type: "video" as LessonType, duration: "18 min", description: "Kā izveidot demo zvanu konkrētam klientam 'skatieties, tas jau zina par jūsu biznesu'. Psiholoģija aiz tā." },
        { id: "6-3", title: "Proposal, līgums un piegāde", type: "text" as LessonType, duration: "12 min", description: "Lejupielādējams PDF proposal ar 3 paketēm un vienkāršs apkopes līgums latviešu valodā." },
        { id: "6-4", title: "Uzdevums: pirmais klientu demo", type: "task" as LessonType, duration: "10 min", description: "Izveidot personalizētu demo aģentu vienam konkrētam uzņēmumam Latvijā un nosūtīt proposal." },
      ],
    },
  ] as Module[],
};

const A = "#f97316";
const A2 = "#fbbf24";
const AG = `linear-gradient(135deg, ${A}, ${A2})`;
const ABg = `rgba(249,115,22,0.10)`;
const ABg2 = `rgba(251,191,36,0.07)`;
const ABorder = `rgba(249,115,22,0.28)`;

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
function MicIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="9" y="2" width="6" height="12" rx="3" fill="url(#mic-g)" opacity="0.9"/>
      <path d="M5 10a7 7 0 0 0 14 0" stroke="url(#mic-g)" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="12" y1="17" x2="12" y2="21" stroke="url(#mic-g)" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="8" y1="21" x2="16" y2="21" stroke="url(#mic-g)" strokeWidth="1.8" strokeLinecap="round"/>
      <defs>
        <linearGradient id="mic-g" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
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
const lessonTypeColor: Record<LessonType, string> = { video: "#f97316", text: "#00d4ff", task: "#00ff88", quiz: "#f59e0b" };

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
        @keyframes waveBar {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1); }
        }
        @keyframes pulseRing {
          0% { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>

      {/* Navbar */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, height: 56, background: "rgba(5,5,8,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", padding: "0 20px", gap: 12 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, color: "#888", fontSize: 13, fontWeight: 500, textDecoration: "none", padding: "5px 10px", borderRadius: 8, transition: "color 0.2s, background 0.2s" }}
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
          <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: ABg, border: ABorder, color: A, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>{course.difficulty}</span>
          <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.25)", color: "#00ff88", fontWeight: 700 }}>{course.earn}</span>
        </div>
      </nav>

      <div className="course-layout" style={{ display: "flex", height: "calc(100vh - 56px)" }}>
        {sidebarOpen && <div className="sidebar-overlay-bg" onClick={() => setSidebarOpen(false)} />}

        {/* Sidebar */}
        <aside className={`course-sidebar${sidebarOpen ? " open" : ""}`} style={{ width: 300, flexShrink: 0, background: "#07070f", borderRight: "1px solid rgba(255,255,255,0.05)", overflowY: "auto", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "20px 16px 16px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, background: `linear-gradient(135deg, ${ABg}, ${ABg2})`, border: ABorder, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <MicIcon />
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
                  <button onClick={() => toggleModule(mod.id)}
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
                          <button key={lesson.id} onClick={() => setActiveLesson(lesson)}
                            style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "8px 16px 8px 24px", border: "none", cursor: "pointer", textAlign: "left", background: isActive ? ABg : "transparent", borderLeft: isActive ? `2px solid ${A}` : "2px solid transparent", transition: "background 0.15s" }}
                            onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.03)"; }}
                            onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                          >
                            <div style={{ width: 20, height: 20, borderRadius: 5, flexShrink: 0, background: isActive ? ABg : "rgba(255,255,255,0.04)", border: `1px solid ${isActive ? ABorder : "rgba(255,255,255,0.06)"}`, display: "flex", alignItems: "center", justifyContent: "center", color: isActive ? A : lessonTypeColor[lesson.type] }}>
                              {lessonIcon(lesson.type)}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: 11.5, fontWeight: isActive ? 600 : 400, color: isActive ? "#fff" : "#888", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{lesson.title}</div>
                              <div style={{ fontSize: 10, color: "#444", marginTop: 1 }}>{lessonTypeLabel[lesson.type]} · {lesson.duration}</div>
                            </div>
                            {lesson.free ? (
                              <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 4, background: "rgba(0,255,136,0.1)", color: "#00ff88", fontWeight: 700, flexShrink: 0 }}>BEZMAKSAS</span>
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
            <button style={{ width: "100%", padding: "11px 0", borderRadius: 10, border: "none", cursor: "pointer", background: AG, color: "#000", fontWeight: 700, fontSize: 13, letterSpacing: "0.02em", boxShadow: "0 4px 20px rgba(249,115,22,0.3)", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 30px rgba(249,115,22,0.4)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(249,115,22,0.3)"; }}
            >
              Sākt kursu — {course.earn}
            </button>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 10, color: "#444" }}>✓ Bezmaksas pirmās 2 nodarbības · ✓ Nav vajadzīga programmēšana</div>
          </div>
        </aside>

        {/* Main */}
        <main className="course-main" style={{ flex: 1, overflowY: "auto" }}>
          <button className="mobile-sidebar-btn" onClick={() => setSidebarOpen(true)}
            style={{ position: "fixed", bottom: 20, right: 20, zIndex: 150, alignItems: "center", gap: 8, padding: "12px 20px", borderRadius: 50, border: "none", cursor: "pointer", background: AG, color: "#000", fontWeight: 700, fontSize: 13, boxShadow: "0 4px 20px rgba(249,115,22,0.4)" }}
          >
            📋 Programma
          </button>

          {activeLesson ? (
            <LessonView lesson={activeLesson} onBack={() => setActiveLesson(null)} />
          ) : (
            <div>
              {/* Hero */}
              <div className="course-hero" style={{ position: "relative", padding: "48px 48px 40px", background: `linear-gradient(135deg, ${ABg} 0%, ${ABg2} 50%, rgba(5,5,8,0) 100%)`, borderBottom: "1px solid rgba(255,255,255,0.05)", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(${ABg} 1px, transparent 1px), linear-gradient(90deg, ${ABg} 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
                <div style={{ position: "absolute", top: -80, right: -80, width: 320, height: 320, borderRadius: "50%", background: `radial-gradient(circle, rgba(249,115,22,0.12), transparent 70%)`, pointerEvents: "none" }} />

                <div style={{ position: "relative" }}>
                  <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 11, padding: "4px 12px", borderRadius: 20, background: ABg, border: ABorder, color: A, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>{course.tag}</span>
                    <span style={{ fontSize: 11, padding: "4px 12px", borderRadius: 20, background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", color: "#00d4ff", fontWeight: 600 }}>{course.difficulty}</span>
                    <span style={{ fontSize: 11, padding: "4px 12px", borderRadius: 20, background: "rgba(0,255,136,0.07)", border: "1px solid rgba(0,255,136,0.2)", color: "#00ff88", fontWeight: 600 }}>Nav vajadzīga programmēšana</span>
                  </div>
                  <h1 className="hero-h1" style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 10, lineHeight: 1.1 }}>{course.title}</h1>
                  <p style={{ fontSize: 17, fontWeight: 700, color: "#bbb", marginBottom: 8, letterSpacing: "-0.01em" }}>{course.subtitle}</p>
                  <p className="hero-desc" style={{ fontSize: 15, color: "#777", maxWidth: 640, lineHeight: 1.7, marginBottom: 28 }}>{course.description}</p>

                  <div className="stat-row" style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
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
                    <div className="earn-display" style={{ marginLeft: "auto", display: "flex", alignItems: "baseline", gap: 4 }}>
                      <span style={{ fontSize: 24, fontWeight: 900, background: AG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{course.earn}</span>
                      <span style={{ fontSize: 12, color: "#555" }}>potenciāls</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="course-tabs" style={{ padding: "0 48px", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", gap: 0 }}>
                {(["overview", "curriculum", "tools"] as const).map((tab) => {
                  const labels = { overview: "Pārskats", curriculum: "Programma", tools: "Rīki" };
                  const isActive = activeTab === tab;
                  return (
                    <button key={tab} onClick={() => setActiveTab(tab)}
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

function OverviewTab() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>

      {/* Hero image + headline */}
      <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", border: `1px solid ${ABorder}` }}>
        <img
          src="https://images.unsplash.com/photo-1589254065878-42c9da997008?w=900&q=80"
          alt="AI balss aģents"
          style={{ width: "100%", height: 280, objectFit: "cover", display: "block" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(5,5,8,0.1) 0%, rgba(5,5,8,0.85) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(249,115,22,0.08)", mixBlendMode: "multiply" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px 32px" }}>
          {/* Animated sound wave */}
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 3, marginRight: 10 }}>
              {[0.4, 0.7, 1, 0.6, 0.9, 0.5, 0.8, 1, 0.6, 0.4].map((h, i) => (
                <div key={i} style={{ width: 3, height: 18 * h, borderRadius: 2, background: A, animation: `waveBar 0.8s ease-in-out ${i * 0.08}s infinite`, transformOrigin: "bottom" }} />
              ))}
            </div>
            <span style={{ fontSize: 11, color: A, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Balss aģents aktīvs</span>
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.15, color: "#fff", marginBottom: 8 }}>
            Tavs AI asistents zvana,<br />
            <span style={{ background: AG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>kamēr tu dari citu darbu.</span>
          </h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
            Automatizēti zvani, pieraksti un klientu apkalpošana — 24/7, bez koda, bez kavēšanās.
          </p>
        </div>
      </div>

      {/* Platform promise */}
      <div style={{ padding: "22px 28px", borderRadius: 14, background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "flex-start", gap: 16 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, flexShrink: 0, background: `linear-gradient(135deg, ${ABg}, ${ABg2})`, border: ABorder, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🎯</div>
        <p style={{ fontSize: 14, color: "#ccc", lineHeight: 1.75 }}>
          Šajā kursā tu mācies un <strong style={{ color: "#fff" }}>uzreiz liec zināšanas darbībā</strong>. Tu apgūsi pakalpojumu, ko vari piedāvāt uzņēmumiem par <span style={{ color: A, fontWeight: 700 }}>500€ – 1800€</span>. Nav nepieciešamas programmēšanas zināšanas — tikai vēlme darīt.
        </p>
      </div>

      {/* 3 differentiators */}
      <div>
        <SectionLabel>Kas padara šo atšķirīgu</SectionLabel>
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
          {[
            { icon: "🤖", color: A, title: "Īsts AI, ne ieraksts", desc: "Aģents saprot jautājumus un atbild dinamiski — ne tikai atskaņo iepriekš ierakstītas frāzes" },
            { icon: "🇱🇻", color: "#00d4ff", title: "Latviešu valodā", desc: "Konfigurē aģentu, kurš sarunājas latviešu valodā — pielāgots Latvijas uzņēmumiem" },
            { icon: "⚡", color: "#00ff88", title: "No nulles 1 dienā", desc: "Pirmais darba aģents ir gatavs jau pēc 2–3 stundām. Bez programmēšanas pieredzes" },
          ].map((item) => (
            <div key={item.title} style={{ padding: "22px 20px", borderRadius: 14, background: "#0d0d1a", border: `1px solid ${item.color}22`, transition: "border-color 0.2s, transform 0.2s" }}
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

      {/* Step by step — how it works */}
      <div>
        <SectionLabel>Kā tu uzbuildo pirmo aģentu</SectionLabel>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24, letterSpacing: "-0.02em" }}>6 soļi no nulles līdz darbojošam aģentam</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {[
            { step: "01", title: "Izvēlies nišu un scenāriju", desc: "Zobārstniecība, restorāns, nekustamais īpašums — izlem, kādam biznesam tu veidosi aģentu. Jo konkrētāk, jo labāk.", icon: "🎯", time: "15 min" },
            { step: "02", title: "Izveido kontu un pievienosi balsi", desc: "Reģistrējies instrumentos, izvēlies latviskai ausij patīkamu balsi un konfigurē aģenta personību.", icon: "🎙️", time: "20 min" },
            { step: "03", title: "Uzraksti sarunu skriptu", desc: "Kādus jautājumus klients uzdos? Kā aģents atbildēs? Tev palīdzēs gatavi template.", icon: "📝", time: "30 min" },
            { step: "04", title: "Savienoji ar tālruņa numuru", desc: "Latvijas (+371) numurs ir pieejams. Pēc 10 minūtēm aģentam var piezvanīt no jebkura telefona.", icon: "📞", time: "20 min" },
            { step: "05", title: "Integrē Calendar un CRM", desc: "Aģents automātiski rezervē pierakstus Google Calendar un saglabā klientu datus Google Sheets.", icon: "📅", time: "40 min" },
            { step: "06", title: "Pārdod klientam", desc: "Demo zvans, proposal, līgums — visi dokumenti ir gatavi, tu tikai nosūti un sagaidi 'jā'.", icon: "💰", time: "pārdošana" },
          ].map((s, i, arr) => (
            <div key={s.step} style={{ display: "flex", gap: 20, position: "relative" }}>
              {/* Connector line */}
              {i < arr.length - 1 && (
                <div style={{ position: "absolute", left: 19, top: 56, bottom: 0, width: 2, background: `linear-gradient(to bottom, ${A}44, transparent)`, zIndex: 0 }} />
              )}
              <div style={{ flexShrink: 0, zIndex: 1 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: `linear-gradient(135deg, ${ABg}, ${ABg2})`, border: ABorder, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                  {s.icon}
                </div>
              </div>
              <div style={{ paddingBottom: i < arr.length - 1 ? 28 : 0, flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: A, letterSpacing: "0.1em" }}>SOLIS {s.step}</span>
                  <span style={{ fontSize: 10, color: "#444", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", padding: "1px 8px", borderRadius: 4 }}>~{s.time}</span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 5 }}>{s.title}</div>
                <div style={{ fontSize: 13, color: "#666", lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Use cases image */}
      <div>
        <SectionLabel>Reālie pielietojumi</SectionLabel>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20, letterSpacing: "-0.02em" }}>Kādi biznesi maksā par šo Latvijā</h2>
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
          {[
            {
              img: "https://images.unsplash.com/photo-1629909615184-74f495363b67?w=500&q=80",
              title: "Zobārstniecība",
              desc: "Pierakstu rezervācija, atgādinājumi, atbildes uz biežiem jautājumiem",
              price: "800€–1200€",
              color: "#00d4ff",
            },
            {
              img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80",
              title: "Restorāns",
              desc: "Galda rezervācija, ēdienkartes informācija, darba laiki",
              price: "500€–900€",
              color: "#00ff88",
            },
            {
              img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&q=80",
              title: "Nekustamais īpašums",
              desc: "Lead kvalifikācija, apskates pieteikšana, cenu informācija",
              price: "1000€–1800€",
              color: A,
            },
          ].map((uc) => (
            <div key={uc.title} style={{ borderRadius: 16, overflow: "hidden", border: `1px solid rgba(255,255,255,0.07)`, background: "#0d0d1a" }}>
              <div style={{ position: "relative", height: 140 }}>
                <img src={uc.img} alt={uc.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 30%, rgba(13,13,26,0.95) 100%)" }} />
                <div style={{ position: "absolute", inset: 0, background: `rgba(${uc.color === A ? "249,115,22" : uc.color === "#00d4ff" ? "0,212,255" : "0,255,136"},0.07)`, mixBlendMode: "multiply" }} />
              </div>
              <div style={{ padding: "14px 16px" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{uc.title}</div>
                <div style={{ fontSize: 12, color: "#666", lineHeight: 1.5, marginBottom: 12 }}>{uc.desc}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: uc.color }}>{uc.price}</div>
                <div style={{ fontSize: 10, color: "#444" }}>projekta cena</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What you learn */}
      <div>
        <SectionLabel>Ko tu iemācīsies</SectionLabel>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20, letterSpacing: "-0.02em" }}>No nulles līdz pirmajam klientam</h2>
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {course.learn.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "14px 16px", borderRadius: 10, background: ABg, border: ABorder }}>
              <div style={{ width: 18, height: 18, borderRadius: 5, background: `rgba(249,115,22,0.2)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={A} strokeWidth="3"><polyline points="20,6 9,17 4,12" /></svg>
              </div>
              <span style={{ fontSize: 13, color: "#ccc", lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* No coding needed callout */}
      <div style={{ padding: "28px 32px", borderRadius: 16, background: "linear-gradient(135deg, rgba(0,255,136,0.05), rgba(0,212,255,0.04))", border: "1px solid rgba(0,255,136,0.15)", display: "flex", gap: 20, alignItems: "flex-start" }}>
        <div style={{ fontSize: 32, flexShrink: 0 }}>✋</div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Nav nepieciešamas programmēšanas zināšanas</div>
          <p style={{ fontSize: 13, color: "#777", lineHeight: 1.7, marginBottom: 12 }}>
            Viss kurss ir veidots cilvēkiem bez tehniskas pieredzes. Tu izmantosi vizuālas, no-code platformas — bez koda rakstīšanas, bez termināļa, bez datorzinātnes grādiem. Ja tu spēj izmantot Google Docs, tu spēsi izveidot AI balss aģentu.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["No-code rīki", "Vizuāls interfeiss", "Soli pa solim", "Latviešu valodā"].map((tag) => (
              <span key={tag} style={{ fontSize: 11, padding: "4px 12px", borderRadius: 20, background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.2)", color: "#00ff88", fontWeight: 600 }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Tech setup visual */}
      <div>
        <SectionLabel>Kā darbojas sistēma</SectionLabel>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20, letterSpacing: "-0.02em" }}>Aģenta arhitektūra — vienkārši</h2>
        <div style={{ padding: "28px", borderRadius: 16, background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 0, justifyContent: "center", flexWrap: "wrap", rowGap: 16 }}>
            {[
              { label: "Klients zvana", icon: "📱", color: "#00ff88" },
              { label: "→" },
              { label: "AI apstrādā", icon: "🧠", color: A },
              { label: "→" },
              { label: "Atbild / Rezervē", icon: "📅", color: "#00d4ff" },
              { label: "→" },
              { label: "Saglabā datus", icon: "📊", color: "#a855f7" },
            ].map((node, i) =>
              "label" in node && node.label === "→" ? (
                <div key={i} style={{ fontSize: 18, color: "#333", padding: "0 8px" }}>→</div>
              ) : (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: `${"color" in node ? node.color : "#fff"}18`, border: `1px solid ${"color" in node ? node.color : "#fff"}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
                    {"icon" in node ? node.icon : ""}
                  </div>
                  <span style={{ fontSize: 11, color: "#555", fontWeight: 600, textAlign: "center", maxWidth: 70 }}>{"label" in node ? node.label : ""}</span>
                </div>
              )
            )}
          </div>
          <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
            <p style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>Viss notiek automātiski. Tu iestatī sistēmu vienreiz — tā strādā mūžīgi bez tava iesaistīšanās.</p>
          </div>
        </div>
      </div>

      {/* Course modules overview */}
      <div>
        <SectionLabel>Kursa saturs</SectionLabel>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20, letterSpacing: "-0.02em" }}>{course.totalModules} moduļi · {course.totalLessons} nodarbības</h2>
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {course.modules.map((mod) => (
            <div key={mod.id} style={{ padding: "16px", borderRadius: 12, background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: ABg, border: ABorder, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: A }}>{mod.id}</div>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{mod.title}</span>
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

      {/* Why this course */}
      <div>
        <SectionLabel>Kāpēc šis kurss</SectionLabel>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20, letterSpacing: "-0.02em" }}>Reāli rezultāti, ne tikai teorija</h2>
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {[
            { icon: "🎯", title: "Projektu bāzēta", desc: "Katra moduļa beigās ir praktisks uzdevums — portfolio, ko rādīt klientiem." },
            { icon: "📦", title: "Gatavi template", desc: "Sarunu skripti, proposal PDF, onboarding dokuments — viss latviski." },
            { icon: "🇱🇻", title: "Latvijas tirgum", desc: "Cenas, klientu meklēšanas veidi un skripti ir pielāgoti LV realitātei." },
          ].map((item) => (
            <div key={item.title} style={{ padding: "20px", borderRadius: 12, background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.06)" }}>
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
        <div style={{ display: "flex", alignItems: "flex-start", gap: 20, padding: "24px", borderRadius: 16, background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, flexShrink: 0, background: AG, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, color: "#000" }}>
            {course.instructor.avatar}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <span style={{ fontSize: 16, fontWeight: 800 }}>{course.instructor.name}</span>
              <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 6, background: ABg, border: ABorder, color: A }}>{course.instructor.role}</span>
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
      <div style={{ padding: "40px", borderRadius: 20, background: `linear-gradient(135deg, ${ABg}, ${ABg2})`, border: ABorder, textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(${ABg} 1px, transparent 1px), linear-gradient(90deg, ${ABg} 1px, transparent 1px)`, backgroundSize: "32px 32px" }} />
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: A, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 12 }}>Mērķis</div>
          <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 8, letterSpacing: "-0.02em" }}>
            Pēc kursa tu esi gatavs izveidot un<br />
            <span style={{ background: AG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>pārdot AI balss aģentu.</span>
          </h3>
          <p style={{ fontSize: 14, color: "#777", marginBottom: 28 }}>Pievienojies {course.students} studentiem, kas jau apgūst šo kursu.</p>
          <button
            style={{ padding: "15px 44px", borderRadius: 12, border: "none", cursor: "pointer", background: AG, color: "#000", fontWeight: 700, fontSize: 15, letterSpacing: "0.01em", boxShadow: "0 8px 32px rgba(249,115,22,0.35)", transition: "transform 0.2s, box-shadow 0.2s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 14px 40px rgba(249,115,22,0.5)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 32px rgba(249,115,22,0.35)"; }}
          >
            Sākt kursu — pirmās 2 nodarbības bezmaksas
          </button>
        </div>
      </div>

    </div>
  );
}

function CurriculumTab({ onSelectLesson }: { onSelectLesson: (l: Lesson) => void }) {
  const [open, setOpen] = useState<number[]>(course.modules.map((m) => m.id));
  const toggle = (id: number) => setOpen((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <SectionLabel>Mācību programma</SectionLabel>
          <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em" }}>{course.totalModules} moduļi · {course.totalLessons} nodarbības · {course.totalDuration}</h2>
        </div>
        <button onClick={() => setOpen(open.length === course.modules.length ? [] : course.modules.map((m) => m.id))}
          style={{ fontSize: 12, color: A, background: "transparent", border: "none", cursor: "pointer", fontWeight: 600 }}>
          {open.length === course.modules.length ? "Aizvērt visus" : "Atvērt visus"}
        </button>
      </div>

      {course.modules.map((mod) => {
        const isOpen = open.includes(mod.id);
        return (
          <div key={mod.id} style={{ borderRadius: 12, overflow: "hidden", border: isOpen ? ABorder : "1px solid rgba(255,255,255,0.06)", background: "#0d0d1a", transition: "border-color 0.2s" }}>
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
                  <button key={lesson.id} onClick={() => onSelectLesson(lesson)}
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
                      {lesson.free && <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 4, background: "rgba(0,255,136,0.1)", color: "#00ff88", fontWeight: 700 }}>BEZMAKSAS</span>}
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

function ToolsTab() {
  const toolEmoji: Record<string, string> = {
    "ElevenLabs": "🎙️", "n8n": "⚡", "Claude API": "🧠",
    "Twilio / Vonage": "📞", "Google Cal.": "📅", "Google Sheets": "📊", "Retell AI": "🤖",
  };
  return (
    <div>
      <SectionLabel>Izmantotie rīki</SectionLabel>
      <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, letterSpacing: "-0.02em" }}>7 rīki, ko apgūsi kursā</h2>
      <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7, marginBottom: 32 }}>Visi rīki ar bezmaksas plāniem vai izmēģinājuma periodiem. Nav jāmaksā pirms pirmā klienta.</p>
      <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 40 }}>
        {course.tools.map((tool) => (
          <div key={tool.name}
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
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[
            "Dators vai klēpjdators (Windows/Mac)",
            "Stabils interneta savienojums",
            "E-pasta adrese kontiem",
            "~€15–40/mēn rīku izmaksas sākumā",
            "4–8 stundas nedēļā ieguldījumam",
            "Nekādas programmēšanas zināšanas",
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

function LessonView({ lesson, onBack }: { lesson: Lesson; onBack: () => void }) {
  return (
    <div className="lesson-pad" style={{ maxWidth: 860, margin: "0 auto", padding: "40px 48px" }}>
      <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28, background: "transparent", border: "none", cursor: "pointer", color: "#666", fontSize: 13, fontWeight: 500, padding: "6px 0", transition: "color 0.2s" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15,18 9,12 15,6" /></svg>
        Atpakaļ uz kursa pārskatu
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, padding: "4px 10px", borderRadius: 6, background: `${lessonTypeColor[lesson.type]}18`, border: `1px solid ${lessonTypeColor[lesson.type]}33`, color: lessonTypeColor[lesson.type], fontWeight: 600 }}>
          {lessonIcon(lesson.type)}{lessonTypeLabel[lesson.type]}
        </span>
        <span style={{ fontSize: 11, color: "#444" }}>{lesson.duration}</span>
      </div>

      <h1 style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.025em", marginBottom: 24, lineHeight: 1.2 }}>{lesson.title}</h1>

      {lesson.type === "video" && (
        <div style={{ width: "100%", aspectRatio: "16/9", borderRadius: 16, marginBottom: 32, background: "linear-gradient(135deg, #0f0a05 0%, #150a00 100%)", border: ABorder, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, cursor: "pointer", position: "relative", overflow: "hidden", transition: "border-color 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = A)}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = ABorder)}
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

      {lesson.id === "1-1" && <Lesson1Content />}
      {lesson.id === "1-2" && <Lesson2Content />}

      {lesson.type === "task" && (
        <div style={{ padding: "24px", borderRadius: 12, marginBottom: 24, background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.15)" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#00ff88", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>🎯 Praktiskais uzdevums</div>
          <div style={{ fontSize: 13, color: "#888", lineHeight: 1.8 }}>Izpildi uzdevumu un augšupielādē savu darbu — tas būs daļa no tava portfolio, ko rādīt klientiem.</div>
          <button style={{ marginTop: 16, padding: "10px 24px", borderRadius: 8, cursor: "pointer", background: "rgba(0,255,136,0.15)", border: "1px solid rgba(0,255,136,0.3)", color: "#00ff88", fontWeight: 700, fontSize: 13, transition: "background 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,255,136,0.25)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,255,136,0.15)")}
          >Iesniegt uzdevumu</button>
        </div>
      )}

      {lesson.type === "text" && (
        <div style={{ padding: "24px", borderRadius: 12, marginBottom: 24, background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.12)" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#00d4ff", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>📄 Lejupielādājams materiāls</div>
          <div style={{ fontSize: 13, color: "#888", lineHeight: 1.8, marginBottom: 14 }}>Šī nodarbība ietver lejupielādājamu template, ko vari tūlīt izmantot darbā ar klientiem.</div>
          <button style={{ padding: "10px 24px", borderRadius: 8, cursor: "pointer", background: "rgba(0,212,255,0.12)", border: "1px solid rgba(0,212,255,0.25)", color: "#00d4ff", fontWeight: 700, fontSize: 13, transition: "background 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,212,255,0.2)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,212,255,0.12)")}
          >↓ Lejupielādēt (PDF)</button>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: 8 }}>
        <button onClick={onBack}
          style={{ padding: "10px 20px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", background: "transparent", color: "#666", fontSize: 13, cursor: "pointer", fontWeight: 500, transition: "color 0.2s, border-color 0.2s" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#fff"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.2)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.color = "#666"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)"; }}
        >← Atpakaļ</button>
        <button style={{ padding: "10px 24px", borderRadius: 8, border: "none", cursor: "pointer", background: AG, color: "#000", fontSize: 13, fontWeight: 700, boxShadow: "0 4px 16px rgba(249,115,22,0.3)", transition: "transform 0.2s, box-shadow 0.2s" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 24px rgba(249,115,22,0.4)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 16px rgba(249,115,22,0.3)"; }}
        >Nākamā nodarbība →</button>
      </div>
    </div>
  );
}

function Lesson2Content() {
  const niches = [
    {
      icon: "🦷",
      title: "Zobārstniecība",
      color: "#00d4ff",
      earn: "800€–1 200€",
      volume: "Ļoti augsts",
      why: "Pacientu pieprasījums pēc pierakstiem ir nemainīgs un bieži notiek ārpus darba laika. Aģents pieņem zvanus vakarā un nedēļas nogalēs, kad receptore nav.",
      useCases: ["Pierakstu rezervācija", "Atgādinājumi par vizīti", "Atbildes par cenām un pakalpojumiem", "Steidzamu gadījumu filtrēšana"],
      stat: "~70% zvanu = pieraksts vai jautājums par cenām",
    },
    {
      icon: "🍽️",
      title: "Restorāni & Kafejnīcas",
      color: "#00ff88",
      earn: "500€–900€",
      volume: "Augsts",
      why: "Restorāni saņem simtiem zvanu par galda rezervāciju, ēdienkarti un darba laikiem — it īpaši vakarios, kad darbinieki ir aizņemti. AI aģents atbild uz visiem vienlaicīgi.",
      useCases: ["Galda rezervācija", "Ēdienkartes informācija", "Darba laiki un adrese", "Pasūtījumu pieņemšana (bāze)"],
      stat: "Vidēji 40–80 zvani/dienā vakara stundās",
    },
    {
      icon: "💆",
      title: "Skaistumkopšana & SPA",
      color: "#a855f7",
      earn: "400€–800€",
      volume: "Augsts",
      why: "Skaistumkopšanas saloni bieži palaiž garām klientus, jo meistari nevar atbildēt pie darba. AI aģents rezervē pierakstus pat tad, kad visi speciālisti ir aizņemti.",
      useCases: ["Pierakstu rezervācija pie konkrēta meistara", "Pakalpojumu un cenu skaidrošana", "Atgādinājumi par apmeklējumu", "Atcelšanas apstrāde"],
      stat: "Saloni zaudē 20–30% klientu neatbildētu zvanu dēļ",
    },
    {
      icon: "🏠",
      title: "Nekustamais Īpašums",
      color: "#f97316",
      earn: "1 000€–1 800€",
      volume: "Vidējs",
      why: "Brokeri nevar atbildēt uz katru pirmizrādīšanas pieprasījumu. AI aģents kvalificē lead — noskaidro budžetu, meklēto rajonu un vajadzīgos kvadrātmetrus — pirms brokerim vispār jāsazinās.",
      useCases: ["Lead kvalifikācija (budžets, rajons, istabas)", "Apskates pieteikšana", "Informācija par konkrētiem objektiem", "Kontaktinformācijas vākšana"],
      stat: "Brokeri ietaupa 3–5 st./dienā uz nekvalificētiem zvaniem",
    },
    {
      icon: "🚗",
      title: "Auto Serviss",
      color: "#fbbf24",
      earn: "600€–1 000€",
      volume: "Vidējs",
      why: "Auto servisi saņem daudz zvanu par servisa laiku, cenu aptuveni un automašīnas statusa pārbaudēm. Mehāniķi nevar atbildēt darba laikā — AI aģents to dara.",
      useCases: ["Servisa pierakstu rezervācija", "Aptuvenie cenu aprēķini", "Automašīnas gatavības statuss", "Darba laiki un pakalpojumu saraksts"],
      stat: "30–50% zvanu = standarta jautājumi, kas neprasa mehāniķi",
    },
    {
      icon: "🏥",
      title: "Ģimenes Ārsti & Klīnikas",
      color: "#f43f5e",
      earn: "800€–1 500€",
      volume: "Ļoti augsts",
      why: "Medicīnas iestādēs telefons zvana pastāvīgi. Aģents nodrošina, ka neviens pacients netiek ignorēts — pat agrā rītā vai vakarā, filtrē steidzamas situācijas un novirza uz ārstiem.",
      useCases: ["Pierakstu rezervācija pie ārstiem", "Analīžu rezultātu pieprasījumi", "Recepšu atjaunošanas pieprasījumi", "Steidzamu gadījumu identifikācija"],
      stat: "Klīnikas saņem 100–300 zvanus dienā",
    },
    {
      icon: "🏋️",
      title: "Sporta Zāles & Fitnesa Centri",
      color: "#22c55e",
      earn: "400€–700€",
      volume: "Vidējs",
      why: "Potenciālie biedri bieži zvana vakaros, lai uzzinātu par cenām un nodarbībām. Reģistrators nevar atbildēt pēc darba laika — AI aģents pārdod abonementus 24/7.",
      useCases: ["Cenu un abonementa informācija", "Nodarbību grafika skaidrošana", "Pieteikšanās uz izmēģinājuma treniņu", "Adrese un darba laiki"],
      stat: "50% jaunu biedru lēmums rodas pēc 18:00",
    },
    {
      icon: "⚖️",
      title: "Juridiskie Pakalpojumi",
      color: "#818cf8",
      earn: "1 000€–2 000€",
      volume: "Zems–Vidējs",
      why: "Juristi maksā augstu cenu par savu laiku. AI aģents veic pirmo klientu filtru — noskaidro lietas veidu, steidzamību un budžetu, pirms jurists iesaistās.",
      useCases: ["Konsultācijas pieteikšana", "Lietas veida noskaidrošana", "Juridiskās jomas informācija", "Dokumentu pieprasījumu apstrāde"],
      stat: "Jurists ietaupa 2–4 st./dienā uz sākotnējo filtrēšanu",
    },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40, marginTop: 8 }}>

      {/* Intro image */}
      <div style={{ borderRadius: 16, overflow: "hidden", border: ABorder, position: "relative" }}>
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=85&fit=crop"
          alt="Latvijas biznesi"
          style={{ width: "100%", height: 220, objectFit: "cover", display: "block" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(5,5,8,0.85) 0%, rgba(5,5,8,0.2) 70%)" }} />
        <div style={{ position: "absolute", inset: 0, background: `rgba(249,115,22,0.07)`, mixBlendMode: "multiply" }} />
        <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, padding: "28px 32px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontSize: 11, color: A, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>Latvijas tirgus</div>
          <div style={{ fontSize: 20, fontWeight: 900, color: "#fff", lineHeight: 1.25, marginBottom: 8 }}>
            8 nišas ar augstu<br />
            <span style={{ background: AG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>pieprasījumu pēc AI zvaniem</span>
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>Katrs bizness, kas saņem zvanus, ir potenciālais klients.</div>
        </div>
      </div>

      {/* Why these businesses callout */}
      <div style={{ padding: "20px 24px", borderRadius: 14, background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.07)", display: "flex", gap: 16 }}>
        <span style={{ fontSize: 28, flexShrink: 0 }}>🎯</span>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Kāpēc tieši šie biznesi?</div>
          <p style={{ fontSize: 13, color: "#888", lineHeight: 1.75 }}>
            AI balss aģents atmaksājas tur, kur ir <strong style={{ color: "#fff" }}>augsts zvanu apjoms</strong>, <strong style={{ color: "#fff" }}>atkārtoti jautājumi</strong> un <strong style={{ color: "#fff" }}>nepieciešamība strādāt ārpus darba laika</strong>. Šie trīs kritēriji nosaka, kurš bizness ir ideāls pirmais klients.
          </p>
          <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
            {["Augsts zvanu apjoms", "Atkārtoti jautājumi", "24/7 pieejamība", "Pierakstu vajadzība"].map((t) => (
              <span key={t} style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: ABg, border: ABorder, color: A, fontWeight: 600 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Niche cards */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: A, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>8 galvenās nišas</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 20 }}>Kādiem biznesiem tas der Latvijā?</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {niches.map((niche, i) => (
            <div key={niche.title}
              style={{ borderRadius: 16, border: `1px solid ${niche.color}20`, background: "#0d0d1a", overflow: "hidden", transition: "border-color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${niche.color}45`)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = `${niche.color}20`)}
            >
              <div style={{ display: "flex", gap: 0 }}>
                {/* Left accent bar */}
                <div style={{ width: 4, flexShrink: 0, background: `linear-gradient(to bottom, ${niche.color}, ${niche.color}44)` }} />

                <div style={{ padding: "20px 22px", flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 12 }}>
                    {/* Icon + number */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, flexShrink: 0 }}>
                      <div style={{ width: 48, height: 48, borderRadius: 14, background: `${niche.color}14`, border: `1px solid ${niche.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
                        {niche.icon}
                      </div>
                      <span style={{ fontSize: 9, fontWeight: 800, color: niche.color, letterSpacing: "0.06em" }}>#{i + 1}</span>
                    </div>

                    {/* Title + badges */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>{niche.title}</span>
                        <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 6, background: `${niche.color}14`, border: `1px solid ${niche.color}30`, color: niche.color, fontWeight: 700 }}>
                          {niche.earn}
                        </span>
                        <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 6, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#555", fontWeight: 600 }}>
                          Zvanu apjoms: {niche.volume}
                        </span>
                      </div>
                      <p style={{ fontSize: 13, color: "#888", lineHeight: 1.7 }}>{niche.why}</p>
                    </div>
                  </div>

                  {/* Use cases + stat */}
                  <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>Ko aģents dara</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {niche.useCases.map((uc) => (
                          <div key={uc} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={niche.color} strokeWidth="3"><polyline points="20,6 9,17 4,12" /></svg>
                            <span style={{ fontSize: 12, color: "#aaa" }}>{uc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div style={{ padding: "10px 14px", borderRadius: 10, background: `${niche.color}08`, border: `1px solid ${niche.color}18`, alignSelf: "flex-start", maxWidth: 280 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: niche.color, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>📊 Fakts</div>
                      <div style={{ fontSize: 12, color: "#aaa", lineHeight: 1.5 }}>{niche.stat}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary table */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: A, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Kopsavilkums</div>
        <div style={{ borderRadius: 14, border: "1px solid rgba(255,255,255,0.07)", overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", background: "#0d0d1a", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            {["Niša", "Projekta cena", "Zvanu apjoms", "Prioritāte"].map((h) => (
              <div key={h} style={{ padding: "10px 14px", fontSize: 10, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.05em", borderRight: "1px solid rgba(255,255,255,0.04)" }}>{h}</div>
            ))}
          </div>
          {[
            { name: "Zobārstniecība", price: "800€–1 200€", volume: "Ļoti augsts", priority: "⭐⭐⭐", pColor: "#00d4ff" },
            { name: "Ģimenes ārsti", price: "800€–1 500€", volume: "Ļoti augsts", priority: "⭐⭐⭐", pColor: "#f43f5e" },
            { name: "Restorāni", price: "500€–900€", volume: "Augsts", priority: "⭐⭐⭐", pColor: "#00ff88" },
            { name: "Skaistumkopšana", price: "400€–800€", volume: "Augsts", priority: "⭐⭐⭐", pColor: "#a855f7" },
            { name: "Nekustamais īpašums", price: "1 000€–1 800€", volume: "Vidējs", priority: "⭐⭐", pColor: "#f97316" },
            { name: "Auto serviss", price: "600€–1 000€", volume: "Vidējs", priority: "⭐⭐", pColor: "#fbbf24" },
            { name: "Sporta zāles", price: "400€–700€", volume: "Vidējs", priority: "⭐⭐", pColor: "#22c55e" },
            { name: "Juridiskie pakalpojumi", price: "1 000€–2 000€", volume: "Zems–Vidējs", priority: "⭐", pColor: "#818cf8" },
          ].map((row, i) => (
            <div key={row.name} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", borderTop: i > 0 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
              <div style={{ padding: "10px 14px", fontSize: 13, color: "#ddd", borderRight: "1px solid rgba(255,255,255,0.04)" }}>{row.name}</div>
              <div style={{ padding: "10px 14px", fontSize: 13, color: row.pColor, fontWeight: 600, borderRight: "1px solid rgba(255,255,255,0.04)" }}>{row.price}</div>
              <div style={{ padding: "10px 14px", fontSize: 13, color: "#666", borderRight: "1px solid rgba(255,255,255,0.04)" }}>{row.volume}</div>
              <div style={{ padding: "10px 14px", fontSize: 13 }}>{row.priority}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Final tip */}
      <div style={{ padding: "20px 24px", borderRadius: 12, background: ABg, border: ABorder, display: "flex", gap: 14 }}>
        <span style={{ fontSize: 24, flexShrink: 0 }}>💡</span>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Ieteikums pirmajai nišai</div>
          <p style={{ fontSize: 13, color: "#888", lineHeight: 1.75 }}>
            Sāc ar <strong style={{ color: A }}>zobārstniecību vai skaistumkopšanu</strong> — augsts zvanu apjoms, vienkārša saruna (tikai pieraksts), un uzņēmumi labi saprot ROI. Šīs nišas ir ideālas pirmajam demo, ko vari izveidot un parādīt 1 dienā.
          </p>
        </div>
      </div>

    </div>
  );
}

function Lesson1Content() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40, marginTop: 8 }}>

      {/* Section 1 — Kas ir AI balss aģents */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: A, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>1. sadaļa</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 20 }}>Kas ir AI balss aģents?</h2>

        {/* Image */}
        <div style={{ borderRadius: 16, overflow: "hidden", border: ABorder, marginBottom: 24, position: "relative" }}>
          <img
            src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=85&fit=crop"
            alt="AI valodas modelis"
            style={{ width: "100%", height: 260, objectFit: "cover", display: "block" }}
          />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(5,5,8,0.7) 0%, rgba(5,5,8,0.1) 60%)" }} />
          <div style={{ position: "absolute", inset: 0, background: `rgba(249,115,22,0.07)`, mixBlendMode: "multiply" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, padding: "24px 28px" }}>
            <div style={{ fontSize: 11, color: A, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6 }}>Mākslīgais intelekts + balss</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: "#fff", lineHeight: 1.2 }}>AI, kas runā kā cilvēks —<br />bet strādā 24/7</div>
          </div>
        </div>

        <div style={{ fontSize: 15, color: "#ccc", lineHeight: 1.85, marginBottom: 20 }}>
          <strong style={{ color: "#fff" }}>AI balss aģents</strong> ir programmatūra, kas spēj sarunāties ar cilvēkiem pa tālruni <em>reāllaikā</em> — bez cilvēka klātbūtnes. Tas saprot dabisko valodu, uzdod jautājumus, pieņem lēmumus un atbild ar sintētisku, dabiski skanošu balsi.
        </div>

        {/* 3 key properties */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 24 }} className="grid-3">
          {[
            { icon: "🧠", color: "#a855f7", title: "Saprot valodu", desc: "Atpazīst jautājumus, akcents, saīsinājumus un nestandarta frāzes" },
            { icon: "🎙️", color: A, title: "Runā dabīgi", desc: "ElevenLabs balsis ir tik reālistiskas, ka 80% cilvēku neatpazīst AI" },
            { icon: "⚡", color: "#00ff88", title: "Reaģē nekavējoties", desc: "Atbildes tiek ģenerētas 300–600ms laikā — ātrāk nekā cilvēks domā" },
          ].map((p) => (
            <div key={p.title} style={{ padding: "18px 16px", borderRadius: 12, background: "#0d0d1a", border: `1px solid ${p.color}22` }}>
              <div style={{ fontSize: 22, marginBottom: 10 }}>{p.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 5 }}>{p.title}</div>
              <div style={{ fontSize: 12, color: "#666", lineHeight: 1.6 }}>{p.desc}</div>
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div style={{ borderRadius: 14, border: "1px solid rgba(255,255,255,0.07)", overflow: "hidden" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: "#0d0d1a", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ padding: "12px 16px", fontSize: 11, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.06em" }}>Aspekts</div>
            <div style={{ padding: "12px 16px", fontSize: 11, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.06em", borderLeft: "1px solid rgba(255,255,255,0.05)" }}>Cilvēks receptors</div>
            <div style={{ padding: "12px 16px", fontSize: 11, fontWeight: 700, color: A, textTransform: "uppercase", letterSpacing: "0.06em", borderLeft: "1px solid rgba(255,255,255,0.05)" }}>AI balss aģents</div>
          </div>
          {[
            ["Darba laiks", "8h/dienā, 5 dienas", "24/7, bez pārtraukumiem"],
            ["Vienlaicīgie zvani", "1", "Neierobežoti"],
            ["Izmaksas/mēn", "800€–1500€ (alga)", "15€–60€ (rīki)"],
            ["Kļūdas", "Nogurums, aizmirstība", "Konsistents katru reizi"],
            ["Valodas", "1–2", "Jebkura (latviešu ieskaitot)"],
          ].map(([aspect, human, ai], i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
              <div style={{ padding: "11px 16px", fontSize: 13, color: "#aaa" }}>{aspect}</div>
              <div style={{ padding: "11px 16px", fontSize: 13, color: "#666", borderLeft: "1px solid rgba(255,255,255,0.04)" }}>{human}</div>
              <div style={{ padding: "11px 16px", fontSize: 13, color: "#00ff88", fontWeight: 600, borderLeft: "1px solid rgba(255,255,255,0.04)" }}>{ai}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(249,115,22,0.3), transparent)" }} />

      {/* Section 2 — Kā tas darbojas */}
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, color: A, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>2. sadaļa</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 8 }}>Kā tas darbojas?</h2>
        <p style={{ fontSize: 14, color: "#888", lineHeight: 1.7, marginBottom: 28 }}>
          AI balss aģents strādā kā konveijers — katrs zvans iziet cauri 5 posmiem mazāk kā 1 sekundē.
        </p>

        {/* Flow diagram */}
        <div style={{ borderRadius: 16, border: `1px solid ${ABorder}`, background: "#0a0a14", padding: "32px 24px", marginBottom: 28, overflowX: "auto" }}>
          <div style={{ display: "flex", alignItems: "stretch", gap: 0, minWidth: 560, justifyContent: "center" }}>
            {[
              { step: "01", icon: "📱", label: "Klients zvana", sublabel: "Latvijas numurs", color: "#00ff88" },
              { step: "02", icon: "🎙️", label: "Balss → Teksts", sublabel: "Deepgram / Whisper", color: "#00d4ff" },
              { step: "03", icon: "🧠", label: "AI domā", sublabel: "Claude / GPT-4", color: A },
              { step: "04", icon: "🔊", label: "Teksts → Balss", sublabel: "ElevenLabs", color: "#a855f7" },
              { step: "05", icon: "✅", label: "Atbild klientam", sublabel: "< 600ms", color: "#f43f5e" },
            ].map((node, i, arr) => (
              <div key={i} style={{ display: "flex", alignItems: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, width: 90 }}>
                  <div style={{ fontSize: 9, fontWeight: 800, color: node.color, letterSpacing: "0.1em" }}>SOLIS {node.step}</div>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: `${node.color}14`, border: `1.5px solid ${node.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
                    {node.icon}
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#fff", lineHeight: 1.3 }}>{node.label}</div>
                    <div style={{ fontSize: 10, color: "#555", marginTop: 2 }}>{node.sublabel}</div>
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 4px", marginTop: -20 }}>
                    <div style={{ width: 28, height: 1.5, background: `linear-gradient(to right, ${node.color}60, ${arr[i+1].color}60)` }} />
                    <div style={{ fontSize: 10, color: "#333", marginTop: 2 }}>→</div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
            <span style={{ fontSize: 12, color: "#555" }}>Viss process aizņem </span>
            <span style={{ fontSize: 12, color: A, fontWeight: 700 }}>300–600 milisekundes</span>
            <span style={{ fontSize: 12, color: "#555" }}> — cilvēks to nejūt kā pauzi</span>
          </div>
        </div>

        {/* 3 layers explanation */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            {
              layer: "Kārta 1",
              title: "Balss atpazīšana (STT)",
              desc: "Kad klients sāk runāt, mikrofons uztver audio un Deepgram vai Whisper pārveido to tekstā reāllaikā. Šis process ir tik ātrs, ka var apstrādāt 3–5 vārdus jau pirms teikums beidzies.",
              tools: ["Deepgram", "Whisper", "AssemblyAI"],
              color: "#00d4ff",
              icon: "🎙️",
            },
            {
              layer: "Kārta 2",
              title: "AI smadzenes (LLM)",
              desc: "Teksts nonāk valodas modelī (Claude, GPT-4), kuram ir iepriekš iestatīts sistēmas promts ar biznesa informāciju — darba laiki, pakalpojumi, cenas. AI izlemj, ko atbildēt vai kādu darbību veikt.",
              tools: ["Claude Sonnet", "GPT-4o", "Gemini"],
              color: A,
              icon: "🧠",
            },
            {
              layer: "Kārta 3",
              title: "Balss sintēze (TTS)",
              desc: "AI atbilde tiek nosūtīta ElevenLabs, kas to pārvērš dabiskā balsī ar izvēlētu personību un toni. Klients dzird atbildi ar tādu pašu plūstamību kā no dzīva cilvēka.",
              tools: ["ElevenLabs", "Azure TTS", "OpenAI TTS"],
              color: "#a855f7",
              icon: "🔊",
            },
          ].map((layer) => (
            <div key={layer.layer} style={{ display: "flex", gap: 16, padding: "20px", borderRadius: 14, background: "#0d0d1a", border: `1px solid ${layer.color}18` }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: `${layer.color}14`, border: `1px solid ${layer.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                {layer.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: layer.color, letterSpacing: "0.08em" }}>{layer.layer.toUpperCase()}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{layer.title}</span>
                </div>
                <p style={{ fontSize: 13, color: "#888", lineHeight: 1.75, marginBottom: 10 }}>{layer.desc}</p>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {layer.tools.map((t) => (
                    <span key={t} style={{ fontSize: 10, padding: "3px 8px", borderRadius: 6, background: `${layer.color}10`, border: `1px solid ${layer.color}25`, color: layer.color, fontWeight: 600 }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Callout */}
        <div style={{ marginTop: 24, padding: "20px 24px", borderRadius: 12, background: ABg, border: ABorder, display: "flex", gap: 14, alignItems: "flex-start" }}>
          <span style={{ fontSize: 24, flexShrink: 0 }}>💡</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Ko tas nozīmē tavai nišai?</div>
            <p style={{ fontSize: 13, color: "#888", lineHeight: 1.7 }}>
              Zobārstam tas nozīmē: pacients zvana, aģents piedāvā brīvos laikus, rezervē tikšanos un nosūta apstiprinājumu — bez receptores. Restorānam — galda rezervācija naktī plkst. 2:00, kad neviens neatbild.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 11, fontWeight: 700, color: A, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{children}</div>;
}
