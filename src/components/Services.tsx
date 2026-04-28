"use client";
import Link from "next/link";
import E from "@/components/E";

const SocialMediaIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="9" height="9" rx="2" fill="url(#g1)" opacity="0.9"/>
    <rect x="13" y="2" width="9" height="9" rx="2" fill="url(#g1)" opacity="0.6"/>
    <rect x="2" y="13" width="9" height="9" rx="2" fill="url(#g1)" opacity="0.6"/>
    <rect x="13" y="13" width="9" height="9" rx="2" fill="url(#g1)" opacity="0.3"/>
    <circle cx="17.5" cy="17.5" r="2" fill="url(#g1)"/>
    <defs>
      <linearGradient id="g1" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#a855f7"/>
        <stop offset="1" stopColor="#ec4899"/>
      </linearGradient>
    </defs>
  </svg>
);


const WhatsAppIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l5.12-1.34A9.96 9.96 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" fill="url(#g3)" opacity="0.15" stroke="url(#g3)" strokeWidth="1.5"/>
    <path d="M16.5 14.5c-.3.8-1.5 1.5-2.1 1.6-.6.1-1.3.1-2-.2-.7-.3-1.8-.7-3.1-2-1.3-1.3-1.7-2.4-2-3.1-.3-.7-.3-1.4-.2-2 .1-.6.8-1.8 1.6-2.1.3-.1.6-.1.8 0l.9 2c.1.2.1.4 0 .6l-.6.7c-.1.1-.1.3 0 .4.3.6.9 1.4 1.6 2 .7.7 1.5 1.2 2 1.5.1.1.3.1.4 0l.7-.5c.2-.1.4-.1.6 0l2 .9c.1.1.2.4.1.7z" fill="url(#g3)"/>
    <defs>
      <linearGradient id="g3" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#22c55e"/>
        <stop offset="1" stopColor="#00d4ff"/>
      </linearGradient>
    </defs>
  </svg>
);

const VoiceIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="9" y="2" width="6" height="12" rx="3" fill="url(#g4)" opacity="0.8"/>
    <path d="M5 10a7 7 0 0 0 14 0" stroke="url(#g4)" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="12" y1="17" x2="12" y2="21" stroke="url(#g4)" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="8" y1="21" x2="16" y2="21" stroke="url(#g4)" strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M2 10c0 0 1-1 2 0M20 10c0 0 1-1 2 0" stroke="url(#g4)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    <defs>
      <linearGradient id="g4" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f97316"/>
        <stop offset="1" stopColor="#ef4444"/>
      </linearGradient>
    </defs>
  </svg>
);

const WorkflowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="5" cy="12" r="3" fill="url(#g5)" opacity="0.9"/>
    <circle cx="19" cy="6" r="3" fill="url(#g5)" opacity="0.7"/>
    <circle cx="19" cy="18" r="3" fill="url(#g5)" opacity="0.7"/>
    <line x1="8" y1="11" x2="16" y2="7" stroke="url(#g5)" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="8" y1="13" x2="16" y2="17" stroke="url(#g5)" strokeWidth="1.5" strokeLinecap="round"/>
    <defs>
      <linearGradient id="g5" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#f59e0b"/>
        <stop offset="1" stopColor="#f97316"/>
      </linearGradient>
    </defs>
  </svg>
);

const AppIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="5" y="2" width="14" height="20" rx="3" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>
    <rect x="8" y="6" width="8" height="5" rx="1.5" fill="rgba(255,255,255,0.15)"/>
    <line x1="8" y1="14" x2="16" y2="14" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="8" y1="17" x2="13" y2="17" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const LockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <rect x="3" y="11" width="18" height="11" rx="2"/>
    <path d="M7 11V7a5 5 0 0110 0v4"/>
  </svg>
);

type Service = {
  Icon: () => JSX.Element;
  title: string;
  desc: string;
  earn: string;
  difficulty: string;
  gradient: string;
  border: string;
  glow: string;
  glowHover: string;
  tag: string;
  tagColor: string;
  includes: string[];
  link: string | null;
  comingSoon?: boolean;
};

const services: Service[] = [
  {
    Icon: SocialMediaIcon,
    title: "Sociālo Tīklu Pārvaldība",
    desc: "AI video, attēli un reklāmas saturs. Veido pilnu sociālo mediju klātbūtni uzņēmumiem ar mākslīgo intelektu.",
    earn: "€300–€800/mēn",
    difficulty: "Iesācējs",
    gradient: "from-[#a855f7]/20 to-[#ec4899]/20",
    border: "rgba(168,85,247,0.2)",
    glow: "rgba(168,85,247,0.12)",
    glowHover: "rgba(168,85,247,0.2)",
    tag: "Populārs",
    tagColor: "text-[#a855f7] bg-[#a855f7]/10 border-[#a855f7]/25",
    includes: ["AI faceless video", "Reklāmas banneri", "Post vizuāļi"],
    link: "/kursi/socialo-tiklu-parvaldiba",
  },
  {
    Icon: WhatsAppIcon,
    title: "WhatsApp Automatizācija",
    desc: "Automatizē klientu komunikāciju WhatsApp ar Make.com vai n8n. Latvijas uzņēmumiem.",
    earn: "€400–€900/mēn",
    difficulty: "Vidējs",
    gradient: "from-[#22c55e]/20 to-[#00d4ff]/20",
    border: "rgba(34,197,94,0.2)",
    glow: "rgba(34,197,94,0.08)",
    glowHover: "rgba(34,197,94,0.15)",
    tag: "Populārs LV",
    tagColor: "text-[#22c55e] bg-[#22c55e]/10 border-[#22c55e]/25",
    includes: ["Automātiski atbilde", "Lead notifikācijas", "Vonage integrācija"],
    link: null,
  },
  {
    Icon: VoiceIcon,
    title: "Voice Agents ar Vapi",
    desc: "AI balss aģents, kas pieņem zvanus, rezervē tikšanās un atbild klientiem automātiski.",
    earn: "€500–€1500/mēn",
    difficulty: "Progresīvs",
    gradient: "from-[#f97316]/20 to-[#ef4444]/20",
    border: "rgba(249,115,22,0.2)",
    glow: "rgba(249,115,22,0.08)",
    glowHover: "rgba(249,115,22,0.18)",
    tag: "Premium",
    tagColor: "text-[#f97316] bg-[#f97316]/10 border-[#f97316]/25",
    includes: ["Vapi platforma", "LV numurs Vonage", "Zvanu analytics"],
    link: null,
  },
  {
    Icon: WorkflowIcon,
    title: "Make.com / n8n Workflow",
    desc: "Pilna biznesa automatizācija — e-pasts, CRM, rēķini, rezervācijas. Viss bez cilvēka.",
    earn: "€300–€700/mēn",
    difficulty: "Vidējs",
    gradient: "from-[#f59e0b]/20 to-[#f97316]/20",
    border: "rgba(245,158,11,0.2)",
    glow: "rgba(245,158,11,0.08)",
    glowHover: "rgba(245,158,11,0.15)",
    tag: "Atkārtoti ienākumi",
    tagColor: "text-[#f59e0b] bg-[#f59e0b]/10 border-[#f59e0b]/25",
    includes: ["Make.com vai n8n", "CRM savienojums", "E-pasta automācija"],
    link: null,
  },
  {
    Icon: AppIcon,
    title: "Izveido savu Aplikāciju ar A.I.",
    desc: "Veido mobilās un web aplikācijas ar AI — no idejas līdz darbojošam produktam bez tradicionālās programmēšanas.",
    earn: "€800–€3000/projekts",
    difficulty: "Vidējs",
    gradient: "from-white/5 to-white/3",
    border: "rgba(255,255,255,0.08)",
    glow: "rgba(255,255,255,0.02)",
    glowHover: "rgba(255,255,255,0.04)",
    tag: "Drīzumā",
    tagColor: "text-gray-500 bg-white/4 border-white/10",
    includes: ["No-code AI rīki", "Prototype izveide", "Monetizācija"],
    link: null,
    comingSoon: true,
  },
];

const difficultyColor: Record<string, string> = {
  "Iesācējs":   "text-[#00ff88] bg-[#00ff88]/8 border-[#00ff88]/20",
  "Vidējs":     "text-[#00d4ff] bg-[#00d4ff]/8 border-[#00d4ff]/20",
  "Progresīvs": "text-[#a855f7] bg-[#a855f7]/8 border-[#a855f7]/20",
};

export default function Services() {
  return (
    <section id="courses" className="py-24 px-6 relative">
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="badge-neon mb-4 inline-block"><E id="services-badge">5 AI Pakalpojumi</E></div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            <E id="services-h2-1">Ko tu iemācīsies</E>{" "}
            <span className="gradient-text-green"><E id="services-h2-accent">pārdot</E></span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            <E id="services-subtitle">Katrs kurss beidzas ar gatavu pakalpojumu, cenu sarakstu un klientu piesaistes skriptiem.</E>
          </p>
        </div>

        {/* Grid — 3 top, 2 bottom centred */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, idx) => (
            <div
              key={s.title}
              className={`relative rounded-2xl p-6 group overflow-hidden transition-all duration-300
                ${idx === 3 ? "lg:col-start-1" : ""}
                ${idx === 4 ? "lg:col-start-2" : ""}
                ${s.comingSoon ? "cursor-default opacity-60" : "cursor-pointer"}
              `}
              style={{
                background: s.comingSoon
                  ? "linear-gradient(135deg, #0d0d12, #0f0f14)"
                  : `linear-gradient(135deg, #0d0d1a, #0f0f20)`,
                border: `1px solid ${s.border}`,
              }}
              onMouseEnter={(e) => {
                if (!s.comingSoon) {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 40px rgba(0,0,0,0.3), 0 0 40px ${s.glowHover}`;
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                (e.currentTarget as HTMLDivElement).style.transform = "";
              }}
            >
              {/* Gradient blob on hover (not for coming soon) */}
              {!s.comingSoon && (
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at 30% 0%, ${s.glowHover}, transparent 65%)` }}
                />
              )}

              {/* Coming soon lock overlay */}
              {s.comingSoon && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 text-gray-500">
                  <LockIcon />
                </div>
              )}

              {/* Top row: icon + tag */}
              <div className="flex items-start justify-between mb-5">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br ${s.gradient}`}
                  style={{ border: `1px solid ${s.border}` }}
                >
                  <s.Icon />
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-lg border font-semibold ${s.tagColor}`}>
                  {s.tag}
                </span>
              </div>

              {/* Title + no-coding badge + desc */}
              <h3 className="text-[1.05rem] font-bold text-white mb-2 leading-snug">
                <E id={`srv-${idx}-title`}>{s.title}</E>
              </h3>
              {/* Nav programmēšanas teksts */}
              <div className="flex items-center gap-1.5 mb-3">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="3">
                  <polyline points="20,6 9,17 4,12"/>
                </svg>
                <span className="text-[11px] text-gray-500 font-medium">
                  Nav nepieciešamas programmēšanas vai citas sarežģītas datorprasmes
                </span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                <E id={`srv-${idx}-desc`}>{s.desc}</E>
              </p>

              {/* Includes pills */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {s.includes.map((item) => (
                  <span
                    key={item}
                    className="text-[11px] px-2 py-0.5 rounded-md text-gray-500 font-medium"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Bottom: earn + difficulty */}
              <div
                className="flex items-center justify-between pt-4"
                style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
              >
                <span className={`font-bold text-sm ${s.comingSoon ? "text-gray-600" : "text-[#00ff88]"}`}>
                  <E id={`srv-${idx}-earn`}>{s.earn}</E>
                </span>
                <span className={`text-xs px-2.5 py-1 rounded-lg border font-semibold ${s.comingSoon ? "text-gray-600 bg-white/4 border-white/8" : difficultyColor[s.difficulty]}`}>
                  {s.difficulty}
                </span>
              </div>

              {/* CTA row */}
              {s.comingSoon ? (
                <div className="mt-3 flex items-center gap-1.5 text-gray-600 text-xs font-semibold tracking-wide uppercase">
                  <LockIcon />
                  Drīzumā pieejams
                </div>
              ) : s.link ? (
                <Link
                  href={s.link}
                  className="mt-3 flex items-center gap-1 text-gray-600 group-hover:text-[#00ff88] transition-colors text-xs font-semibold tracking-wide uppercase"
                >
                  Skatīt kursu
                  <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                </Link>
              ) : (
                <div className="mt-3 flex items-center gap-1 text-gray-600 group-hover:text-[#00ff88] transition-colors text-xs font-semibold tracking-wide uppercase">
                  Skatīt kursu
                  <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Coming soon */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: "📱", title: "AI App Building", desc: "Izveido pilnvērtīgas mobilās un web lietotnes ar AI" },
            { icon: "🤝", title: "WhatsApp Agents (Vonage)", desc: "Progresīvi WhatsApp AI aģenti Latvijas numuriem" },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-4 rounded-2xl p-4 opacity-50 border border-dashed border-white/10"
              style={{ background: "rgba(255,255,255,0.015)" }}
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white text-sm">{item.title}</span>
                  <span className="text-xs px-2 py-0.5 rounded-md font-semibold" style={{ background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.25)", color: "#a855f7" }}>Drīzumā</span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
