import { PrismaClient } from "@prisma/client";
import { digitalaisStack } from "../src/content/marketing/digitalaisStack";

const prisma = new PrismaClient();

/** "22 min" / "2h 40 min" / "2h" → sekundes (Lesson.duration glabā sekundes). */
function toSeconds(duration: string): number {
  const h = /(\d+)\s*h/.exec(duration);
  const m = /(\d+)\s*min/.exec(duration);
  return (h ? Number(h[1]) * 3600 : 0) + (m ? Number(m[1]) * 60 : 0);
}

/**
 * IZAUGSME ("AI Biznesa Automatizācija") kursi nāk no mārketinga programmas, nevis
 * tiek pārrakstīti šeit ar roku — citādi pārdotā programma un platformas saturs
 * aizietu šķirtos ceļos. Mārketinga MODULIS = DB KURSS (DB nav atsevišķa moduļa
 * līmeņa: Course → Lesson).
 *
 * Slug un ikona katram modulim ir šeit, jo tie ir platformas lietas (URL un
 * vizuālis), ne mārketinga teksts. Kārtība sakrīt ar moduļa `id`.
 */
const IZAUGSME_MODULE_META: Record<number, { slug: string; icon: string }> = {
  1: { slug: "ai-revolucija-majaslapu-izstrade", icon: "🚀" },
  2: { slug: "majaslapa-ar-claude-code", icon: "🌐" },
  3: { slug: "dizains-un-publicesana", icon: "🎨" },
  4: { slug: "ai-funkcijas-biznesiem", icon: "🤖" },
  5: { slug: "ai-personigie-asistenti", icon: "🧠" },
  6: { slug: "portfolio-klienti-pardosana", icon: "💼" },
};

const izaugsmeCourses = digitalaisStack.lv.modules.map((module) => {
  const meta = IZAUGSME_MODULE_META[module.id];
  if (!meta) throw new Error(`IZAUGSME modulim ${module.id} nav slug/ikonas — papildini IZAUGSME_MODULE_META`);

  return {
    slug: meta.slug,
    title: module.title,
    description: `${module.lessons.length} nodarbības · ${module.duration}`,
    icon: meta.icon,
    color: "#00BFA5",
    planRequired: "IZAUGSME" as const,
    order: module.id,
    published: true,
    lessons: module.lessons.map((lesson, i) => ({
      title: lesson.title,
      description: lesson.description ?? null,
      order: i + 1,
      isFree: lesson.free ?? false,
      duration: toSeconds(lesson.duration),
      videoUrl: null,
    })),
  };
});

/**
 * Bez argumentiem seed publicē VISU trīs plānu saturu. PAMATI un MEISTARS saturs
 * te vēl ir vecs melnraksts, tāpēc ar `--plan=IZAUGSME` var publicēt tikai vienu
 * plānu un pārējos neaiztikt. `--dry-run` parāda, kas tiktu rakstīts, un neraksta
 * neko (DB savienojums netiek atvērts):
 *   npm run db:seed -- --plan=IZAUGSME --dry-run
 *   npm run db:seed -- --plan=IZAUGSME
 *
 * UZMANĪBU: .env.local DATABASE_URL rāda uz PRODUKCIJAS Supabase — lokālas DB nav.
 */
const PLANS = ["PAMATI", "IZAUGSME", "MEISTARS"] as const;
type PlanName = (typeof PLANS)[number];

function planFilter(): PlanName | null {
  const arg = process.argv.find((a) => a.startsWith("--plan="));
  if (!arg) return null;

  const value = arg.slice("--plan=".length).toUpperCase();
  if (!PLANS.includes(value as PlanName)) {
    throw new Error(`Nezinams plans "${value}". Atlautie: ${PLANS.join(", ")}`);
  }
  return value as PlanName;
}

async function main() {
  const onlyPlan = planFilter();
  console.log(
    onlyPlan ? `🌱 Seeding kursu dati — TIKAI ${onlyPlan}...` : "🌱 Seeding kursu dati — visi plani..."
  );

  const courses = [
    // ── PAMATI plāns ─────────────────────��────────────────
    {
      slug: "ai-faceless-video",
      title: "AI Faceless Video",
      description: "Veido AI video saturu sociālajiem tīkliem bez sejas un kameras.",
      icon: "🎬",
      color: "#a855f7",
      planRequired: "PAMATI" as const,
      order: 1,
      published: true,
      lessons: [
        {
          title: "Ievads — ko tu iemācīsies",
          description: "Pārskats par kursu, instrumentiem un reāliem ienākumu piemēriem.",
          order: 1,
          isFree: true,
          duration: 420,
          // Nomainī uz savu YouTube unlisted video URL
          videoUrl: null,
        },
        {
          title: "Instrumenti: ElevenLabs, Pictory, CapCut",
          description: "Kā izveidot kontu un sākt lietot galvenos AI video rīkus.",
          order: 2,
          isFree: false,
          duration: 900,
          videoUrl: null,
        },
        {
          title: "Pirmais video no 0 līdz publicēšanai",
          description: "Step-by-step — skripta rakstīšana, balss, montāža, publicēšana.",
          order: 3,
          isFree: false,
          duration: 1200,
          videoUrl: null,
        },
        {
          title: "Kā atrast un noturēt klientus",
          description: "Portfolio, cenas, vēstule pirmajam klientam.",
          order: 4,
          isFree: false,
          duration: 780,
          videoUrl: null,
        },
      ],
    },
    {
      slug: "socialo-tiklu-parvaldiba",
      title: "Sociālo Tīklu Pārvaldība",
      description: "AI video, attēli un reklāmas saturs. Veido pilnu sociālo mediju klātbūtni.",
      icon: "📱",
      color: "#a855f7",
      planRequired: "PAMATI" as const,
      order: 2,
      published: true,
      lessons: [
        {
          title: "Kā AI maina sociālo mediju pārvaldību",
          description: "Rīki, tendences un kāpēc uzņēmumi maksā par šo.",
          order: 1,
          isFree: true,
          duration: 360,
          videoUrl: null,
        },
        {
          title: "Content plāns ar AI — 30 dienas uzreiz",
          description: "Kā ģenerēt mēneša saturu vienā dienā.",
          order: 2,
          isFree: false,
          duration: 840,
          videoUrl: null,
        },
        {
          title: "AI vizuāļi: Midjourney, Canva AI, Adobe Firefly",
          description: "Kā izveidot profesionālus banneri un post attēlus.",
          order: 3,
          isFree: false,
          duration: 960,
          videoUrl: null,
        },
      ],
    },

    // ── IZAUGSME plāns ("AI Biznesa Automatizācija") ────
    // Saturs ģenerēts no mārketinga programmas — skat. izaugsmeCourses augšā.
    ...izaugsmeCourses,

    // ── MEISTARS plāns ──────────────────────────────────
    {
      slug: "ai-balss-agenti",
      title: "AI Balss Aģenti",
      description: "AI balss aģents, kas pieņem zvanus, rezervē tikšanās un atbild 24/7.",
      icon: "🎙️",
      color: "#f97316",
      planRequired: "MEISTARS" as const,
      order: 1,
      published: true,
      lessons: [
        {
          title: "AI balss aģentu tirgus 2025",
          description: "Potenciāls, klienti, Latvijas piemēri.",
          order: 1,
          isFree: true,
          duration: 540,
          videoUrl: null,
        },
        {
          title: "Vapi.ai setup — pirmais aģents",
          description: "Kā izveidot un konfigurēt AI zvanu aģentu.",
          order: 2,
          isFree: false,
          duration: 1800,
          videoUrl: null,
        },
        {
          title: "Latvijas numura integrācija",
          description: "Kā pievienot LV tālruņa numuru aģentam.",
          order: 3,
          isFree: false,
          duration: 720,
          videoUrl: null,
        },
        {
          title: "Klientam prezentēt un pārdot",
          description: "Demo video, piedāvājums, monthly retainer.",
          order: 4,
          isFree: false,
          duration: 960,
          videoUrl: null,
        },
      ],
    },
    {
      slug: "whatsapp-automatizacija",
      title: "WhatsApp Automatizācija",
      description: "Automatizē klientu komunikāciju WhatsApp ar Make.com vai n8n.",
      icon: "💬",
      color: "#f97316",
      planRequired: "MEISTARS" as const,
      order: 2,
      published: true,
      lessons: [
        {
          title: "WhatsApp Business API ievads",
          description: "Kā darbojas, ko var automatizēt, klienti.",
          order: 1,
          isFree: true,
          duration: 480,
          videoUrl: null,
        },
        {
          title: "Make.com + WhatsApp workflow",
          description: "Automātiskas atbildes, lead paziņojumi, booking.",
          order: 2,
          isFree: false,
          duration: 1440,
          videoUrl: null,
        },
      ],
    },
  ];

  const selected = onlyPlan ? courses.filter((c) => c.planRequired === onlyPlan) : courses;
  if (selected.length === 0) throw new Error(`Planam ${onlyPlan} nav neviena kursa`);

  if (process.argv.includes("--dry-run")) {
    const lessonCount = selected.reduce((a, c) => a + c.lessons.length, 0);
    console.log(`\n🔍 DRY RUN — netiek rakstits nekas. Tiktu upsertoti ${selected.length} kursi, ${lessonCount} nodarbibas:\n`);
    for (const c of selected) {
      const free = c.lessons.filter((l) => l.isFree).length;
      console.log(`  [${c.planRequired}] ${c.slug.padEnd(34)} "${c.title}" — ${c.lessons.length} nod. (bezmaksas: ${free})`);
    }
    return;
  }

  for (const course of selected) {
    const { lessons, ...courseData } = course;
    const created = await prisma.course.upsert({
      where: { slug: course.slug },
      create: courseData,
      update: courseData,
    });

    for (const lesson of lessons) {
      await prisma.lesson.upsert({
        where: {
          // Upsert pēc courseId + order kombinācijas nav iespējams ar @unique
          // Izmantojam create-only pieeju ar delete
          id: `${created.id}_${lesson.order}`,
        },
        create: { ...lesson, courseId: created.id, id: `${created.id}_${lesson.order}` },
        update: { ...lesson },
      });
    }

    console.log(`✓ ${course.title} (${lessons.length} lekcijas)`);
  }

  console.log("✅ Seed pabeigts!");
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
