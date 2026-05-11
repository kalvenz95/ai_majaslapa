import type { AppLocale } from "@/i18n/routing";
import type { DetailMarketingCourse } from "@/content/marketing/marketingDetailCourse.types";

const socialoLv: DetailMarketingCourse = {
  title: "Sociālo Tīklu Pārvaldība",
  subtitle: "AI video, attēli un reklāmas saturs uzņēmumiem",
  description:
    "Iemācies veidot pilnu sociālo mediju klātbūtni uzņēmumiem ar mākslīgo intelektu. No AI faceless video līdz reklāmas banneriem — viss, kas nepieciešams, lai iegūtu pirmos klientus un nopelnītu 300€–1500€ mēnesī.",
  earn: "300€–1500€/mēn",
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
        { id: "1-1", title: "Kas ir AI sociālo mediju menedžments?", type: "video", duration: "12 min", free: true, description: "Pārskats par pakalpojumu, tirgus iespēju un ko mēs veidosim šajā kursā." },
        { id: "1-2", title: "Rīku saraksts & konta setup", type: "video", duration: "10 min", free: true, description: "Uzstādām visus nepieciešamos rīkus — Runway, HeyGen, Canva Pro, Buffer." },
        { id: "1-3", title: "Klienta onboarding process", type: "text", duration: "8 min", description: "Lejupielādējams onboarding template ar jautājumiem, ko uzdot katram jaunam klientam." },
        { id: "1-4", title: "Kā noteikt pakalpojumu cenas", type: "video", duration: "15 min", description: "Cenu stratēģija iesācējiem — kāpēc €300/mēn ir saprātīgi sākuma un kā augt uz €800+." },
      ],
    },
    {
      id: 2,
      title: "AI Faceless Video",
      duration: "1h 40 min",
      lessons: [
        { id: "2-1", title: "Kas ir faceless video un kāpēc tas strādā?", type: "video", duration: "15 min", description: "Psiholoģija aiz faceless satura — kāpēc uzņēmumi to mīl un kā tas pārdod." },
        { id: "2-2", title: "Runway ML — video ģenerēšana no teksta", type: "video", duration: "25 min", description: "Pilna Runway ML apmācība: prompting, stila izvēle, video ilgums, eksportēšana." },
        { id: "2-3", title: "HeyGen — AI avatar prezentācijas", type: "video", duration: "22 min", description: "Izveido talking head video ar AI avatāru — produktu apskati, uzņēmuma stāsti." },
        { id: "2-4", title: "CapCut AI automātiskā rediģēšana", type: "video", duration: "18 min", description: "Auto subtitles, auto cut, B-roll pievienošana — video gatavs 10 minūtēs." },
        { id: "2-5", title: "Uzdevums: izveido savu pirmo video", type: "task", duration: "20 min", description: "Izveido 30 sek. faceless video kādam vietējam uzņēmumam (restorāns, veikals, u.c.)." },
      ],
    },
    {
      id: 3,
      title: "Reklāmas Banneri",
      duration: "1h 15 min",
      lessons: [
        { id: "3-1", title: "Canva AI — reklāmu dizains sekundēs", type: "video", duration: "20 min", description: "Magic Design, AI background removal, brand kit setup klienta biznesam." },
        { id: "3-2", title: "Midjourney prompts biznesam", type: "video", duration: "22 min", description: "Specifiskas prompt formulas kas dod kommercāli izmantojamus attēlus pirmajā reizē." },
        { id: "3-3", title: "Adobe Firefly — produktu attēli", type: "video", duration: "18 min", description: "Generative fill produktu fotografijās — maini fonu, pievieni props, koriģē apgaismojumu." },
        { id: "3-4", title: "Uzdevums: 5 banneru komplekts klientam", type: "task", duration: "15 min", description: "Izveido pilnu banneru setu: Facebook, Instagram, Stories un LinkedIn formātos." },
      ],
    },
    {
      id: 4,
      title: "Post Vizuāļi & Feed",
      duration: "1h 10 min",
      lessons: [
        { id: "4-1", title: "Instagram & Facebook feed dizains", type: "video", duration: "20 min", description: "Kā plānot feed tā, lai 9 posti izskatītos kā viens, saskaņots dizains." },
        { id: "4-2", title: "Konsistenta brand identity ar AI", type: "video", duration: "18 min", description: "Krāsu palete, fonti, logo usage — izveido mini brand guide katram klientam." },
        { id: "4-3", title: "Carousels & Stories templates", type: "video", duration: "16 min", description: "Ātri carousel un stories templates ko var pielāgot jebkuram klientam 5 minūtēs." },
        { id: "4-4", title: "AI caption ģenerēšana & publicēšanas grafiks", type: "video", duration: "16 min", description: "ChatGPT/Claude prompt sistēma mēneša captions ģenerēšanai — iknedēļas rutīna." },
      ],
    },
    {
      id: 5,
      title: "Klientu Atrašana & Pārdošana",
      duration: "1h 20 min",
      lessons: [
        { id: "5-1", title: "Kur atrast pirmos klientus Latvijā", type: "video", duration: "20 min", description: "Konkrētas vietas: ss.lv, LinkedIn, Facebook grupas, vietējie pasākumi, cold walk-in." },
        { id: "5-2", title: "Cold outreach skripti (e-pasts & DM)", type: "text", duration: "15 min", description: "5 darbojošies skripti ar reāliem rezultātiem — copy-paste gatavi tavam biznesam." },
        { id: "5-3", title: "Proposal & līguma templates", type: "text", duration: "15 min", description: "Lejupielādējams PDF proposal un vienkāršs pakalpojumu līgums latviešu valodā." },
        { id: "5-4", title: "Klienta onboarding & pirmā tikšanās", type: "video", duration: "30 min", description: "Ko teikt pirmajā zvanā — klausies reālu demo zvanu ar potenciālo klientu." },
      ],
    },
    {
      id: 6,
      title: "Automatizācija & Skalēšana",
      duration: "55 min",
      lessons: [
        { id: "6-1", title: "Buffer/Later — publicēšanas automatizācija", type: "video", duration: "20 min", description: "Ieplāno mēneša saturu 2 stundās — Buffer setup, apstiprinājumu workflow, analytics." },
        { id: "6-2", title: "Kā veidot ikmēneša atskaites klientiem", type: "text", duration: "15 min", description: "Lejupielādējams atskaites template ar KPI's ko klienti saprot un novērtē." },
        { id: "6-3", title: "Pārvaldīt 5+ klientus vienlaicīgi", type: "video", duration: "20 min", description: "Laika pārvaldība, Notion client dashboard, automatizācijas kas ietaupa 10+ stundas nedēļā." },
      ],
    },
  ],
};

const socialoEn: DetailMarketingCourse = {
  title: "Social Media OS",
  subtitle: "AI clips, creatives, and ad-ready workflows for SMBs",
  description:
    "Launch a portfolio-grade social presence using generative video, banners, and automations—from first faceless reels to repeatable monthly retainers (€300–€1,500 benchmark).",
  earn: "€300–€1,500/mo",
  difficulty: "Beginner",
  tag: "Popular",
  totalDuration: "8h 5 min",
  totalLessons: 24,
  totalModules: 6,
  students: 127,
  rating: 4.9,
  instructor: {
    name: "Kārlis Bērziņš",
    role: "AI Automation Specialist",
    avatar: "KB",
    bio: "Five years in digital growth, focusing on Latvian SMEs with pragmatic AI tooling. Operators 12 simultaneous social mandates with auditing-friendly workflows.",
    students: 420,
    courses: 3,
  },
  tools: [
    { name: "Runway ML", desc: "Generative runway-style video", color: "#a855f7" },
    { name: "HeyGen", desc: "AI presenter clips", color: "#ec4899" },
    { name: "CapCut", desc: "Auto trimming + captions", color: "#00d4ff" },
    { name: "Midjourney", desc: "On-brand visuals", color: "#00ff88" },
    { name: "Canva AI", desc: "Paid social layouts", color: "#f59e0b" },
    { name: "Adobe Firefly", desc: "Product photography fixes", color: "#ef4444" },
    { name: "Buffer", desc: "Publishing calendar", color: "#8b5cf6" },
  ],
  learn: [
    "Publish faceless video without touching a camera rig",
    "Ship ad-banner kits in minutes",
    "Keep brand identity synced through Midjourney systems",
    "Automate approvals with Buffer / Later stacks",
    "Prospect ethically with scripts that survived real tests",
    "Serve 5 parallel retainers without burning out",
    "Report ROI with KPI language finance teams grasp",
    "Maintain relationships through structured check-ins",
  ],
  modules: [
    {
      id: 1,
      title: "Intro & stack setup",
      duration: "45 min",
      lessons: [
        { id: "1-1", title: "Why AI-managed social pods win", type: "video", duration: "12 min", free: true, description: "Service primitives, Baltic demand signals, syllabus map." },
        { id: "1-2", title: "Tooling checklist + tenancy hygiene", type: "video", duration: "10 min", free: true, description: "Runway, HeyGen, Canva Pro, Buffer—trial vs paid tiers." },
        { id: "1-3", title: "Client onboarding questionnaire", type: "text", duration: "8 min", description: "Downloadable template covering tone, KPIs, and approvals." },
        { id: "1-4", title: "Pricing ladders for recurring work", type: "video", duration: "15 min", description: "Why €300/mo nets margin and how to staircase to €800+." },
      ],
    },
    {
      id: 2,
      title: "AI Faceless Video",
      duration: "1h 40 min",
      lessons: [
        { id: "2-1", title: "Psychology behind faceless storytelling", type: "video", duration: "15 min", description: "When anonymized creatives outperform presenter-led spots." },
        { id: "2-2", title: "Runway ML prompting lab", type: "video", duration: "25 min", description: "Camera moves, durations, codecs, QA exports." },
        { id: "2-3", title: "HeyGen avatars & product narration", type: "video", duration: "22 min", description: "Tone cards, multilingual toggles, brand-safe disclaimers." },
        { id: "2-4", title: "CapCut smart cuts", type: "video", duration: "18 min", description: "Captions, b-roll sugaring, pacing macros." },
        { id: "2-5", title: "Build: 30s reel for a local merchant", type: "task", duration: "20 min", description: "Ship hero + hook + caption pack for critique." },
      ],
    },
    {
      id: 3,
      title: "Ad Creatives",
      duration: "1h 15 min",
      lessons: [
        { id: "3-1", title: "Canva AI rapid kits", type: "video", duration: "20 min", description: "Magic Resize, removals, cohesive gradient systems." },
        { id: "3-2", title: "Midjourney briefing formulas", type: "video", duration: "22 min", description: "Commercial-safe prompts plus negative embeddings." },
        { id: "3-3", title: "Firefly corrections on real SKUs", type: "video", duration: "18 min", description: "Relight tabletop shots without reshoot logistics." },
        { id: "3-4", title: "Build: Meta + Stories + LinkedIn pack", type: "task", duration: "15 min", description: "One brand, three aspect ratios, shared CTA taxonomy." },
      ],
    },
    {
      id: 4,
      title: "Feed systems & carousel logic",
      duration: "1h 10 min",
      lessons: [
        { id: "4-1", title: "Designing cohesive 9-grid feeds", type: "video", duration: "20 min", description: "Color rhythm, pacing, Highlights vs Main feed." },
        { id: "4-2", title: "AI-assisted micro brand guides", type: "video", duration: "18 min", description: "Palette, typography, dos/don\'ts snapshots." },
        { id: "4-3", title: "Carousel + Stories atomic templates", type: "video", duration: "16 min", description: "Parameterized Figma / Canva components." },
        { id: "4-4", title: "Caption engines + approvals", type: "video", duration: "16 min", description: "Claude/GPT prompting with compliance guardrails." },
      ],
    },
    {
      id: 5,
      title: "Pipeline & monetization",
      duration: "1h 20 min",
      lessons: [
        { id: "5-1", title: "Where Latvian SMEs discover operators", type: "video", duration: "20 min", description: "Communities, events, outbound triggers that still reply." },
        { id: "5-2", title: "Email + DM scripts with receipts", type: "text", duration: "15 min", description: "Five multilingual skeletons annotated with reply stats." },
        { id: "5-3", title: "Proposals & lightweight MSAs", type: "text", duration: "15 min", description: "Downloadable ENG/LV scaffolding with scope tables." },
        { id: "5-4", title: "First-call playbook + listening demo", type: "video", duration: "30 min", description: "Talk-track + recording review checklist." },
      ],
    },
    {
      id: 6,
      title: "Automation & scale",
      duration: "55 min",
      lessons: [
        { id: "6-1", title: "Buffer / Later autopilot cadences", type: "video", duration: "20 min", description: "Approver flows, SLA timers, escalation hooks." },
        { id: "6-2", title: "Client-ready KPI dashboards", type: "text", duration: "15 min", description: "Notion/Airtable template aligned to ad metrics." },
        { id: "6-3", title: "Running five retainers calmly", type: "video", duration: "20 min", description: "Timeboxing rituals + automation swaps saving 10h/week." },
      ],
    },
  ],
};

export const socialoMarketingCourseByLocale: Record<AppLocale, DetailMarketingCourse> = {
  lv: socialoLv,
  en: socialoEn,
};

