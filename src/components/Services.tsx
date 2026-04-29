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

const ClaudeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z" fill="url(#g5)" opacity="0.15" stroke="url(#g5)" strokeWidth="1.2"/>
    <path d="M8 10h8M8 13h5" stroke="url(#g5)" strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="17" cy="8" r="2.5" fill="url(#g5)" opacity="0.9"/>
    <path d="M16 8.5l1 1 2-2" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="g5" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#a78bfa"/>
        <stop offset="1" stopColor="#ec4899"/>
      </linearGradient>
    </defs>
  </svg>
);

const AppIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <rect x="5" y="2" width="14" height="20" rx="3" fill="url(#app-g)" opacity="0.15" stroke="url(#app-g)" strokeWidth="1.5"/>
    <rect x="8" y="6" width="8" height="5" rx="1.5" fill="url(#app-g)" opacity="0.6"/>
    <line x1="8" y1="14" x2="16" y2="14" stroke="url(#app-g)" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="8" y1="17" x2="13" y2="17" stroke="url(#app-g)" strokeWidth="1.5" strokeLinecap="round"/>
    <defs>
      <linearGradient id="app-g" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
        <stop stopColor="#38bdf8"/><stop offset="1" stopColor="#818cf8"/>
      </linearGradient>
    </defs>
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
    border: "rgba(168,85,247,0.25)",
    glow: "rgba(168,85,247,0.08)",
    glowHover: "rgba(168,85,247,0.15)",
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
    border: "rgba(34,197,94,0.25)",
    glow: "rgba(34,197,94,0.06)",
    glowHover: "rgba(34,197,94,0.12)",
    tag: "Populārs LV",
    tagColor: "text-[#22c55e] bg-[#22c55e]/10 border-[#22c55e]/25",
    includes: ["Automātiski atbilde", "Lead notifikācijas", "Vonage integrācija"],
    link: null,
  },
  {
    Icon: VoiceIcon,
    title: "AI Balss Aģenti",
    desc: "AI balss aģents, kas pieņem zvanus, rezervē tikšanās un atbild klientiem automātiski — 24/7.",
    earn: "€500–€1800/projekts",
    difficulty: "Vidējs",
    gradient: "from-[#f97316]/20 to-[#ef4444]/20",
    border: "rgba(249,115,22,0.25)",
    glow: "rgba(249,115,22,0.06)",
    glowHover: "rgba(249,115,22,0.14)",
    tag: "Premium",
    tagColor: "text-[#f97316] bg-[#f97316]/10 border-[#f97316]/25",
    includes: ["AI balss ģenerēšana", "LV numura integrācija", "Zvanu analytics"],
    link: "/kursi/voice-agents",
  },
  {
    Icon: ClaudeIcon,
    title: "Claude AI Asistents",
    desc: "Iemācies izmantot Claude e-pasta rakstīšanai, dizaina briifiem, satura veidošanai un ikdienas darbu automatizācijai.",
    earn: "200€–800€/mēn",
    difficulty: "Iesācējs",
    gradient: "from-[#a78bfa]/20 to-[#ec4899]/20",
    border: "rgba(167,139,250,0.25)",
    glow: "rgba(167,139,250,0.06)",
    glowHover: "rgba(167,139,250,0.14)",
    tag: "Iesācējiem",
    tagColor: "text-[#a78bfa] bg-[#a78bfa]/10 border-[#a78bfa]/25",
    includes: ["E-pasta veidnes", "Dizaina briifi", "Satura ģenerēšana"],
    link: null,
  },
  {
    Icon: AppIcon,
    title: "Izveido savu Aplikāciju ar A.I.",
    desc: "No idejas līdz darbojošai lietotnei — bez programmēšanas. AI palīdz tev veidot, dizainēt un laist klajā produktu.",
    earn: "€800–€3000/projekts",
    difficulty: "Vidējs",
    gradient: "from-[#38bdf8]/20 to-[#818cf8]/20",
    border: "rgba(56,189,248,0.25)",
    glow: "rgba(56,189,248,0.06)",
    glowHover: "rgba(56,189,248,0.14)",
    tag: "Drīzumā",
    tagColor: "text-[#38bdf8] bg-[#38bdf8]/10 border-[#38bdf8]/25",
    includes: [
      "Izveido lietotni bez koda",
      "AI ģenerē dizainu automātiski",
      "Publicē App Store un Web",
      "Monetizē no pirmās dienas",
    ],
    link: null,
    comingSoon: true,
  },
];

const difficultyColor: Record<string, string> = {
  "Iesācējs":   "text-[#6633ee] bg-[#6633ee]/8 border-[#6633ee]/20",
  "Vidējs":     "text-[#4f46e5] bg-[#4f46e5]/8 border-[#4f46e5]/20",
  "Progresīvs": "text-[#7c3aed] bg-[#7c3aed]/8 border-[#7c3aed]/20",
};

export default function Services() {
  return (
    <section id="courses" className="py-24 px-6 relative">
      <div className="absolute inset-0 dot-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="badge-neon mb-4 inline-block"><E id="services-badge">5 AI Pakalpojumi</E></div>
          <h2 className="text-4xl md:text-5xl font-black text-[#18181b] mb-4">
            <E id="services-h2-1">Ko tu iemācīsies</E>{" "}
            <span className="gradient-text-green"><E id="services-h2-accent">pārdot</E></span>
          </h2>
          <p className="text-[#52525b] text-lg max-w-2xl mx-auto">
            <E id="services-subtitle">Katrs kurss beidzas ar gatavu pakalpojumu, cenu sarakstu un klientu piesaistes skriptiem.</E>
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, idx) => (
            <div
              key={s.title}
              className={`relative rounded-2xl p-6 group overflow-hidden transition-all duration-300
                ${idx === 3 ? "lg:col-start-1" : ""}
                ${idx === 4 ? "lg:col-start-2" : ""}
                ${s.comingSoon ? "cursor-default" : "cursor-pointer"}
              `}
              style={{
                background: "rgba(255,255,255,0.82)",
                border: `1px solid ${s.border}`,
                backdropFilter: "blur(12px)",
              }}
              onMouseEnter={(e) => {
                if (!s.comingSoon) {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 16px 40px rgba(0,0,0,0.08), 0 0 32px ${s.glowHover}`;
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                (e.currentTarget as HTMLDivElement).style.transform = "";
              }}
            >
              {/* Gradient blob on hover */}
              {!s.comingSoon && (
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(ellipse at 30% 0%, ${s.glowHover}, transparent 65%)` }}
                />
              )}

              {/* Coming soon lock overlay */}
              {s.comingSoon && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 text-[#9ca3af]">
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
              <h3 className="text-[1.05rem] font-bold text-[#18181b] mb-2 leading-snug">
                <E id={`srv-${idx}-title`}>{s.title}</E>
              </h3>
              <div className="flex items-center gap-1.5 mb-3">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#6633ee" strokeWidth="3">
                  <polyline points="20,6 9,17 4,12"/>
                </svg>
                <span className="text-[11px] text-[#71717a] font-medium">
                  Nav nepieciešamas programmēšanas vai citas sarežģītas datorprasmes
                </span>
              </div>
              <p className="text-[#52525b] text-sm leading-relaxed mb-4">
                <E id={`srv-${idx}-desc`}>{s.desc}</E>
              </p>

              {/* Includes */}
              {s.comingSoon ? (
                <div className="flex flex-col gap-2.5 mb-5">
                  {s.includes.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-md flex items-center justify-center"
                        style={{ background: "rgba(56,189,248,0.12)", border: "1px solid rgba(56,189,248,0.25)" }}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="3"><polyline points="20,6 9,17 4,12"/></svg>
                      </div>
                      <span className="text-sm font-medium text-[#374151]">{item}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {s.includes.map((item) => (
                    <span
                      key={item}
                      className="text-[11px] px-2 py-0.5 rounded-md text-[#52525b] font-medium"
                      style={{ background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.07)" }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              )}

              {/* Bottom: earn + difficulty */}
              <div
                className="flex items-center justify-between pt-4"
                style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}
              >
                <span className={`font-bold text-sm ${s.comingSoon ? "text-[#38bdf8]" : "text-[#6633ee]"}`}>
                  <E id={`srv-${idx}-earn`}>{s.earn}</E>
                </span>
                <span className={`text-xs px-2.5 py-1 rounded-lg border font-semibold ${s.comingSoon ? "text-[#38bdf8] bg-[#38bdf8]/8 border-[#38bdf8]/20" : difficultyColor[s.difficulty]}`}>
                  {s.difficulty}
                </span>
              </div>

              {/* CTA row */}
              {s.comingSoon ? (
                <div className="mt-3 flex items-center gap-1.5 text-[#9ca3af] text-xs font-semibold tracking-wide uppercase">
                  <LockIcon />
                  Drīzumā pieejams
                </div>
              ) : s.link ? (
                <Link
                  href={s.link}
                  className="mt-3 flex items-center gap-1 text-[#9ca3af] group-hover:text-[#6633ee] transition-colors text-xs font-semibold tracking-wide uppercase"
                >
                  Skatīt kursu
                  <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                </Link>
              ) : (
                <div className="mt-3 flex items-center gap-1 text-[#9ca3af] group-hover:text-[#6633ee] transition-colors text-xs font-semibold tracking-wide uppercase">
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
              className="flex items-center gap-4 rounded-2xl p-4 opacity-60 border border-dashed"
              style={{ background: "rgba(0,0,0,0.02)", borderColor: "rgba(0,0,0,0.1)" }}
            >
              <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center text-xl flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-[#18181b] text-sm">{item.title}</span>
                  <span className="text-xs px-2 py-0.5 rounded-md font-semibold text-[#6633ee] bg-[#6633ee]/8 border border-[#6633ee]/20">Drīzumā</span>
                </div>
                <p className="text-xs text-[#71717a] mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
