import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding kursu dati...");

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

    // ── IZAUGSME plāns ──────────────────────────────────
    {
      slug: "majaslapa",
      title: "Mājaslapa",
      description: "AI dizains, SEO, mobilā versija — mājaslapa uzņēmumiem bez programmēšanas.",
      icon: "🌐",
      color: "#00ff88",
      planRequired: "IZAUGSME" as const,
      order: 1,
      published: true,
      lessons: [
        {
          title: "Ievads: kāpēc uzņēmumi maksā par mājaslapa",
          description: "Tirgus izpēte, pieprasījums Latvijā, cenu piemēri.",
          order: 1,
          isFree: true,
          duration: 480,
          videoUrl: null,
        },
        {
          title: "Framer / Webflow ar AI — pirmā mājaslapa",
          description: "No tukša lapas līdz publicētai mājaslapa 2 stundās.",
          order: 2,
          isFree: false,
          duration: 1500,
          videoUrl: null,
        },
        {
          title: "SEO pamati ar AI rīkiem",
          description: "Google meklēšana, atslēgvārdi, meta tagi — bez aģentūras.",
          order: 3,
          isFree: false,
          duration: 720,
          videoUrl: null,
        },
      ],
    },
    {
      slug: "website-chatbot",
      title: "Web Chatbot",
      description: "Pievieno AI chatbot jebkurai mājaslapa — atbild klientiem 24/7.",
      icon: "💬",
      color: "#00ff88",
      planRequired: "IZAUGSME" as const,
      order: 2,
      published: true,
      lessons: [
        {
          title: "Chatbot tirgus Latvijā — ko uzņēmumi vēlas",
          description: "Nišas, klientu typi, cenu stratēģija.",
          order: 1,
          isFree: true,
          duration: 420,
          videoUrl: null,
        },
        {
          title: "Voiceflow chatbot no 0",
          description: "Kā izveidot, testēt un pievienot mājaslapa.",
          order: 2,
          isFree: false,
          duration: 1200,
          videoUrl: null,
        },
        {
          title: "Lead ģenerēšana ar chatbot",
          description: "Kā chatbot savāc kontaktus un nosūta tev paziņojumus.",
          order: 3,
          isFree: false,
          duration: 900,
          videoUrl: null,
        },
      ],
    },

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

  for (const course of courses) {
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
