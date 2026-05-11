import type { AppLocale } from "@/i18n/routing";

type OvCard = { icon: string; title: string; desc: string };

export type WebsiteChatOverviewCopy = {
  heroBadge: string;
  heroLine1: string;
  heroAccent: string;
  heroSub: string;
  promiseHeading: string;
  promiseBody: string;
  diffTitle: string;
  diffCards: OvCard[];
  gainsTitle: string;
  gainsList: string[];
  autoTitle: string;
  autoList: string[];
  resultEyebrow: string;
  resultChips: { icon: string; text: string }[];
  audienceTitle: string;
  audienceBullets: string[];
  closingMuted: string;
  closingBoldBefore: string;
  closingAccent: string;
  closingBoldAfter: string;
  closingCta: string;
  whyEyebrow: string;
  whyHeading: string;
  whyCards: OvCard[];
};

export const websiteChatbotOverviewByLocale: Record<AppLocale, WebsiteChatOverviewCopy> =
  {
    lv: {
      heroBadge: "Web chatbots",
      heroLine1: "Palīdz apmeklētājiem arī tad, kad tu miega režīmā",
      heroAccent: "un nosedz neapstrādātus LEAD kontaktus.",
      heroSub:
        "Pamācība ved cauri Voiceflow bez koda, jaudīgam RAG un Claude + n8n stackam tādos projektos, kur klientiem vajag pilnu kontroli.",
      promiseHeading: "Solījums",
      promiseBody:
        "Izveidosi funkcionējošu līdz galam — dzīvus leadus, strukturētus prompts, saprātīgas atbildes un skaidru komercpaketi, ko pārdot.",
      diffTitle: "Kas šo nodala no parastā FAQ loga",
      diffCards: [
        {
          icon: "🤖",
          title: "Īsts valodas models, ne vien klikšķkoristi",
          desc: "Saprot līdzību, piedāvā alternatīvas un zina, kad novirzīt cilvēkam pie operatora.",
        },
        {
          icon: "⚡",
          title: "n8n + Sheets atmiņa",
          desc: "Logs, kā savienot web žetonu backendu ar CRM, webhookiem un atkārtotiem pieprasījumiem.",
        },
        {
          icon: "💰",
          title: "Komerciālais frame €300–800",
          desc: "Iepriekš strukturētas pakas, SLA un piemēri, kā parādīt ROI uzņēmējam vienā tikšanās laikā.",
        },
      ],
      gainsTitle: "Ko tu iegūsi praksē",
      gainsList: [
        "Sapratni kā veidot mājaslapas chatbot bez programmētājiem vai ar mini JS widgetiem",
        "Prasmes savienot zināšanu bāzes ar Claude API vai Voiceflow rag blokiem",
        "Skaidrus setup piegādes soļus Framer/WP/stack un mobilajiem edge case",
        "Pārdošanas šablonu un demo playbook pirmā klienta aizvēršanai",
      ],
      autoTitle: "Automatikas, ko aktivizēsi",
      autoList: [
        "FAQ + lead capture blokus ar captcha-free pieredzi mobilajā web",
        "Notification un lead routingu Gmail/CRM/Sheet kanālos",
        "Retry un fallback līnijas gadījumos, kad modelis vai API kļūdās",
      ],
      resultEyebrow: "Rezultāts — strukturēti leadi bez haosa",
      resultChips: [
        { icon: "⚡️", text: "Atbilde zem 3 s mobilajā" },
        { icon: "🧭", text: "Kvalificētie jautājumi pirms zvana" },
        { icon: "📈", text: "Skaidrs uzcenojums SLA līmenī" },
      ],
      audienceTitle: "Šis būs pareizais, ja…",
      audienceBullets: [
        "Ja gribi pārdot augstākas klases digitālo automatizāciju ar skaidru scope",
        "Ja jau šobrīd pārdoti satura pakalpojumi un vajag add-on piedāvājumu",
        "Ja esi gatavs 5–10 h nedēļā pielabot promptus un rollout",
      ],
      closingMuted: "Uzņēmumi joprojām pazaudē apmeklētājus nakts stundās.",
      closingBoldBefore: "Tu piedāvā līdzīgu pieredzi",
      closingAccent: ", kas tirgojas pati:",
      closingBoldAfter: "",
      closingCta: "Sāc ar pirmā moduļa bezmaksas nodarbībām",
      whyEyebrow: "Kāpēc šis kurss",
      whyHeading: "Reāli rezultāti, ne tikai teorija",
      whyCards: [
        {
          icon: "🎯",
          title: "Projektu bāzēta",
          desc: "Katram modulim līdzi vai nu deploys, vai pārdošanas artefakts ko ielikt Behance līmenī klientiem.",
        },
        {
          icon: "📦",
          title: "Gatavi dokumenti",
          desc: "RAG šabloni, pārlikšanas dokumenti uz EN/LV tirgiem un pitch slaidi vienā vietā.",
        },
        {
          icon: "🇱🇻",
          title: "Uz lokālu kontekstu",
          desc: "Īsti piemēri no LV maziem ecommerce un pakalpojumiem, pieskaņoti pie ikdienās likuma un etiķetes.",
        },
      ],
    },
    en: {
      heroBadge: "Web chatbots",
      heroLine1: "Answers visitors around the clock",
      heroAccent: "and qualifies leads before humans ever wake up.",
      heroSub:
        "Walkthroughs span Voiceflow’s no-code builder, rich knowledge ingestion, plus optional Claude API + n8n stacks whenever clients expect full control.",
      promiseHeading: "What you unlock",
      promiseBody:
        "You graduate with prompts, onboarding scripts, embeddings hygiene, QA checklists, and a commercial storyline you can sell this week—not a toy demo trapped in localhost.",
      diffTitle: "Why this differs from canned FAQ bots",
      diffCards: [
        {
          icon: "🤖",
          title: "Semantic answers, not just buttons",
          desc: "Understands synonyms, summarizes policy pages politely, knows when to hand off to humans.",
        },
        {
          icon: "⚡",
          title: "n8n telemetry & memory lanes",
          desc: "Webhooks → Sheets → retry logic teaches you resilient delivery for demanding SMBs.",
        },
        {
          icon: "💰",
          title: "Offers structured at €300–800",
          desc: "Pre-built packaging, SLAs, and ROI talking points calibrated for Latvian buyers without sounding generic.",
        },
      ],
      gainsTitle: "Concrete outcomes after the sprint",
      gainsList: [
        "Ability to pitch, scope, deliver, and support a multilingual web assistant solo",
        "Hands-on embeddings hygiene + guardrails playbook for Claude + Voiceflow",
        "Responsive embed rollout patterns for Framer, WordPress, and headless setups",
      ],
      autoTitle: "Automations wired in-course",
      autoList: [
        "FAQ + concierge flows with graceful mobile ergonomics",
        "Lead ingestion into Gmail triage boards or Sheets CRM templates",
        "Escalations when models timeout or quotas spike",
      ],
      resultEyebrow: "Result — conversational revenue system",
      resultChips: [
        { icon: "⚡️", text: "Sub‑3‑second UX on LTE" },
        { icon: "🧭", text: "Pre-qualified intents pre-call" },
        { icon: "📈", text: "Clear upsell ladders" },
      ],
      audienceTitle: "Designed for builders who…",
      audienceBullets: [
        "Already sell automation but need a repeatable website wedge",
        "Want bilingual marketing collateral without rewriting from scratch nightly",
        "Can commit roughly a focused evening block per sprint",
      ],
      closingMuted: "Most Latvian SMEs still bleed leads after hours.",
      closingBoldBefore: "You ship a responsive assistant ",
      closingAccent: "that earns while you recharge",
      closingBoldAfter: ".",
      closingCta: "Start free with the opening module",
      whyEyebrow: "Why this course now",
      whyHeading: "It’s calibrated for freelancers selling AI—not hobbyists tweaking prompts",
      whyCards: [
        {
          icon: "🎯",
          title: "Delivery-first pacing",
          desc: "Each sprint ends with a deployable artefact plus Loom teardown you can recycle in proposals.",
        },
        {
          icon: "📦",
          title: "Operational templates",
          desc: "RAG hygiene checklists, change logs, SLA math, onboarding PDFs—all bilingual where it matters.",
        },
        {
          icon: "🇱🇻",
          title: "Anchored locally",
          desc: "Talking points cite Baltic buyer psychology, tooling spend reality, not Silicon Valley anecdotes.",
        },
      ],
    },
  };
