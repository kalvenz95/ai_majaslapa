import type { DetailMarketingCourse } from "@/content/marketing/marketingDetailCourse.types";

export const websiteChatbotMarketingCourseEn: DetailMarketingCourse = {
  title: "Website Chatbot",
  subtitle: "An intelligent AI chatbot for company websites",
  description:
    "Learn how to build an AI chatbot that answers customer questions 24/7 — using Voiceflow without code, or n8n plus the Claude API when you want full control. A complete service you can sell to businesses in Latvia for €300–€800 per month.",
  earn: "€300–€800/mo",
  difficulty: "Intermediate",
  tag: "Strong demand",
  totalDuration: "7h 20 min",
  totalLessons: 22,
  totalModules: 6,
  students: 89,
  rating: 4.8,
  instructor: {
    name: "Kārlis Bērziņš",
    role: "AI automation expert",
    avatar: "KB",
    bio: "5+ years in digital marketing and the last two focused on AI solutions for Latvian companies. Has shipped 40+ chatbots across e-commerce, services, and healthcare.",
    students: 420,
    courses: 3,
  },
  tools: [
    { name: "Voiceflow", desc: "No-code AI chatbot builder", color: "#00ff88" },
    { name: "n8n", desc: "Automation backend", color: "#00d4ff" },
    { name: "Claude API", desc: "Anthropic AI model", color: "#a855f7" },
    { name: "Tidio", desc: "Live chat + chatbot platform", color: "#00ff88" },
    { name: "JavaScript", desc: "Custom widget crafting", color: "#f59e0b" },
    { name: "Google Sheets", desc: "Store conversation history", color: "#22c55e" },
    { name: "Framer / WP", desc: "Embed integration on any site", color: "#ec4899" },
  ],
  learn: [
    "Build a full-featured AI chatbot in Voiceflow without writing code",
    "Connect the bot to Claude API through an n8n workflow",
    "Create a knowledge base from your client’s website content",
    "Embed the assistant on Framer, WordPress, or plain HTML sites",
    "Capture leads with name, email, and intent questions",
    "Price and sell a website chatbot package for €300–€800 upfront",
    "Offer €50–120/month maintenance retainers",
    "Ship a demo bot that showcases the offering on its own",
  ],
  modules: [
    {
      id: 1,
      title: "Kickoff & setup",
      duration: "50 min",
      lessons: [
        {
          id: "1-1",
          title: "What a website chatbot is and why it converts",
          type: "video",
          duration: "14 min",
          free: true,
          description:
            "Compare forms vs phone vs AI assistants. Conversation stats plus real Latvian SMB examples.",
        },
        {
          id: "1-2",
          title: "Tool stack checklist & accounts",
          type: "video",
          duration: "10 min",
          free: true,
          description:
            "Spin up Voiceflow, n8n, Anthropic, and Tidio accounts — what free tiers cover and hidden limits.",
        },
        {
          id: "1-3",
          title: "Client onboarding playbook",
          type: "text",
          duration: "8 min",
          description:
            "Downloadable intake template covering business goals, audience, and FAQs before you prototype.",
        },
        {
          id: "1-4",
          title: "Pricing your chatbot service",
          type: "video",
          duration: "18 min",
          description:
            "One-off build vs recurring care. Why €300+ is a sane starting anchor and how to move toward €800+ engagements.",
        },
      ],
    },
    {
      id: 2,
      title: "Voiceflow fundamentals",
      duration: "1h 25 min",
      lessons: [
        {
          id: "2-1",
          title: "Voiceflow workspace tour & first canvas",
          type: "video",
          duration: "18 min",
          description:
            "Navigate Flows, Knowledge Base blocks, Variables, and scaffold your starter project.",
        },
        {
          id: "2-2",
          title: "AI block — prompt design & model choice",
          type: "video",
          duration: "22 min",
          description:
            "Tune the AI Response block, compare GPT‑4o mini vs Claude Haiku, and assemble a hardened system prompt.",
        },
        {
          id: "2-3",
          title: "Quick replies & branching UX",
          type: "video",
          duration: "16 min",
          description:
            "Friendly greeting chips for About / Pricing / Contact with dedicated conversation paths.",
        },
        {
          id: "2-4",
          title: "Preview mode testing playbook",
          type: "video",
          duration: "12 min",
          description:
            "Use Preview to emulate customers and run ten smoke-test questions before hand-off.",
        },
        {
          id: "2-5",
          title: "Build challenge: MVP bot",
          type: "task",
          duration: "17 min",
          description:
            "Ship a conversational bot for a local business (café, salon, clinic) covering at least three flows.",
        },
      ],
    },
    {
      id: 3,
      title: "Knowledge base & personalization",
      duration: "1h 5 min",
      lessons: [
        {
          id: "3-1",
          title: "Knowledge ingestion from real sites",
          type: "video",
          duration: "20 min",
          description:
            "Attach URLs, PDFs, or manual excerpts to Voiceflow KB. Understand vector search nuances.",
        },
        {
          id: "3-2",
          title: "System prompt tuning from live data",
          type: "video",
          duration: "18 min",
          description:
            "Eight-block template that bakes pricing tables, opening hours, and compliance footers.",
        },
        {
          id: "3-3",
          title: "Lead capture flows with Capture blocks",
          type: "video",
          duration: "14 min",
          description:
            "Gather name/email fields and dispatch them to Sheets or transactional email endpoints.",
        },
        {
          id: "3-4",
          title: "Practice: KB for a Latvian storefront",
          type: "task",
          duration: "13 min",
          description:
            "Rebuild a Latvian-facing site dataset (realistic sample is fine), then poke it with fifteen edge-case questions.",
        },
      ],
    },
    {
      id: 4,
      title: "Embedding & rollout",
      duration: "55 min",
      lessons: [
        {
          id: "4-1",
          title: "Voiceflow embed + visual polish",
          type: "video",
          duration: "15 min",
          description:
            "Publish → Web Chat → copy embed snippets, align colors/names/widget placement with brand UX.",
        },
        {
          id: "4-2",
          title: "Framer — custom code snippet",
          type: "video",
          duration: "14 min",
          description: "Site Settings → Custom Code footer injection to go live inside five minutes.",
        },
        {
          id: "4-3",
          title: "WordPress plus other SaaS builders",
          type: "video",
          duration: "14 min",
          description:
            "Theme/footer hooks, Squarespace injections, Wix custom blocks — repeatable checklist.",
        },
        {
          id: "4-4",
          title: "Mobile QA & troubleshooting",
          type: "text",
          duration: "12 min",
          description:
            "Five common regressions post-embed (hidden trays, CLS shifts, Safari quirks) plus fixes.",
        },
      ],
    },
    {
      id: 5,
      title: "Custom Claude stack with n8n",
      duration: "1h 40 min",
      lessons: [
        {
          id: "5-1",
          title: "HTML/JS bubble + transcript UI",
          type: "video",
          duration: "25 min",
          description:
            "From floating launcher to streamed responses — lightweight CSS layering on any static host.",
        },
        {
          id: "5-2",
          title: "n8n webhook + Claude API backbone",
          type: "video",
          duration: "28 min",
          description:
            "Wire Webhook Trigger → Claude node → latency-safe response headers, configure CORS for static frontends.",
        },
        {
          id: "5-3",
          title: "Session memory with Sheets",
          type: "video",
          duration: "18 min",
          description:
            "sessionId keys so n8n replays Sheets history inside each Claude invocation for continuity.",
        },
        {
          id: "5-4",
          title: "Go-live checklist & QA",
          type: "video",
          duration: "16 min",
          description:
            "Activate workflows, reconnect embeds, and run end-to-end regression scripts with multilingual prompts.",
        },
        {
          id: "5-5",
          title: "Capstone: deploy your n8n bot",
          type: "task",
          duration: "13 min",
          description:
            "Host Claude + n8n on staging or prod and capture screenshots as proof-of-delivery artefacts.",
        },
      ],
    },
    {
      id: 6,
      title: "Clients & monetization",
      duration: "55 min",
      lessons: [
        {
          id: "6-1",
          title: "Where to hunt first Latvian pilots",
          type: "video",
          duration: "20 min",
          description:
            "Site audits highlighting missing conversational UX, LinkedIn prospecting circles, curated Facebook groups.",
        },
        {
          id: "6-2",
          title: "Demo bots that close retainers",
          type: "video",
          duration: "18 min",
          description:
            "Stage a personalised widget before discovery calls — “it already speaks your brand tonight.”",
        },
        {
          id: "6-3",
          title: "Proposals, contract, recurring care tiers",
          type: "text",
          duration: "17 min",
          description:
            "Includes tri-tier PDF quoting (€150/350/700) plus a Latvian-ready maintenance appendix.",
        },
      ],
    },
  ],
};
