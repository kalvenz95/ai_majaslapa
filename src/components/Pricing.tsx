"use client";
import E from "@/components/E";
import Link from "next/link";

const plans = [
  {
    id: "pamati",
    name: "Satura Speciālists",
    tagline: "Sāc pelnīt ar sociālo mediju saturu",
    price: "29",
    earn: "300€–1 500€/mēn",
    color: "#a855f7",
    glow: "rgba(168,85,247,0.15)",
    border: "rgba(168,85,247,0.25)",
    bg: "rgba(168,85,247,0.06)",
    highlight: false,
    badge: null,
    href: "/kursi/satura-specialists",
    courses: [
      { icon: "🎬", name: "AI Faceless Video", desc: "Satura veidošana bez kameras" },
      { icon: "📱", name: "Sociālo Tīklu Pārvaldība", desc: "AI video, banneri, feed dizains" },
    ],
    skills: [
      "Kā izveidot portfolio no 0",
      "Kā uzrunāt pirmos klientus",
      "Kā sagatavot cenu piedāvājumu",
      "Copy-paste ziņu veidnes",
    ],
    cta: "Sākt →",
  },
  {
    id: "izaugsme",
    name: "Digitālais Speciālists",
    tagline: "Izveido AI risinājumus biznesiem",
    price: "59",
    earn: "500€–1 800€/mēn",
    color: "#00ff88",
    glow: "rgba(0,255,136,0.15)",
    border: "rgba(0,255,136,0.3)",
    bg: "rgba(0,255,136,0.06)",
    highlight: true,
    badge: null,
    href: "/kursi/digitalais-specialists",
    courses: [
      { icon: "🌐", name: "Mājaslapa", desc: "AI dizains, SEO, mobilā versija" },
      { icon: "💬", name: "Web Chatbot", desc: "24/7 automātiskas atbildes, lead ģenerēšana" },
      { icon: "🤖", name: "AI Asistents uz E-pastiem", desc: "Automatizēti e-pasti un komunikācija" },
    ],
    skills: [
      "Kā izveidot portfolio ar reāliem darbiem",
      "Kā uzrunāt klientus (aukstie zvani + DM)",
      "Kā sagatavot profesionālu piedāvājumu",
      "Klientu onboarding process",
      "Ikmēneša atbalsta paketes",
    ],
    cta: "Sākt →",
  },
  {
    id: "meistars",
    name: "AI Aģentu Eksperts",
    tagline: "Augstvērtīgi aģentu risinājumi",
    price: "149",
    earn: "800€–3 500€/mēn",
    color: "#f97316",
    glow: "rgba(249,115,22,0.15)",
    border: "rgba(249,115,22,0.28)",
    bg: "rgba(249,115,22,0.06)",
    highlight: false,
    badge: null,
    href: "/kursi/ai-agentu-eksperts",
    courses: [
      { icon: "🎙️", name: "AI Balss Aģenti", desc: "Automātiski zvani un pierakstu rezervācija" },
      { icon: "💬", name: "WhatsApp Automatizācija", desc: "Automātiskas atbildes un lead apstrāde" },
      { icon: "📱", name: "Izveido savu Aplikāciju ar AI", desc: "No idejas līdz darbojošai lietotnei" },
    ],
    skills: [
      "Kā izveidot portfolio ar demo aģentiem",
      "Kā uzrunāt augstvērtīgus klientus",
      "Kā sagatavot premium piedāvājumu",
      "1:1 mentorings (2× mēnesī)",
      "Privāta kopiena",
      "Aģentūras augšanas ceļvedis",
    ],
    cta: "Sākt →",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 relative">
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#a855f7]/30 to-transparent" />
      <div className="absolute -right-32 top-1/2 w-96 h-96 bg-[#a855f7] opacity-[0.03] rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="badge-neon mb-4 inline-block" style={{ background: "rgba(168,85,247,0.1)", borderColor: "rgba(168,85,247,0.3)", color: "#a855f7" }}>
            💎 <E id="pricing-badge">Pakas</E>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            <E id="pricing-h2">Izvēlies savu</E>{" "}
            <span className="gradient-text-purple"><E id="pricing-h2-accent">ceļu</E></span>
          </h2>
          <p className="text-gray-400 text-lg max-w-lg mx-auto">
            <E id="pricing-sub">Katrai pakai iekšā — kursi, piemēri, piedāvājumu veidnes un klientu uzrunāšanas materiāli.</E>
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="relative rounded-3xl flex flex-col overflow-hidden"
              style={{
                background: plan.highlight
                  ? `linear-gradient(160deg, rgba(0,255,136,0.08) 0%, rgba(5,5,8,0.95) 60%)`
                  : "rgba(13,13,26,0.9)",
                border: `1px solid ${plan.border}`,
                boxShadow: plan.highlight ? `0 0 40px ${plan.glow}` : "none",
              }}
            >
              {/* Shimmer on highlight */}
              {plan.highlight && (
                <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${plan.color}66, transparent)`, animation: "shimmer 3s ease-in-out infinite" }} />
                </div>
              )}

              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full text-xs font-bold"
                  style={{ background: plan.color, color: plan.highlight ? "#000" : "#fff" }}>
                  {plan.highlight ? "⭐ " : "🔥 "}{plan.badge}
                </div>
              )}

              <div className="p-6 flex flex-col gap-5 flex-1">

                {/* Header */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: plan.color }}>
                    €{plan.price}/mēn
                  </div>
                  <h3 className="text-xl font-black text-white leading-tight mb-1">
                    <E id={`plan-${plan.id}-name`}>{plan.name}</E>
                  </h3>
                  <p className="text-xs text-gray-500">
                    <E id={`plan-${plan.id}-tagline`}>{plan.tagline}</E>
                  </p>
                </div>

                {/* Earn */}
                <div className="rounded-xl px-4 py-3" style={{ background: `${plan.color}12`, border: `1px solid ${plan.color}25` }}>
                  <div className="text-xs text-gray-500 mb-0.5">Potenciālie ienākumi</div>
                  <div className="text-lg font-black" style={{ color: plan.color }}>{plan.earn}</div>
                </div>

                {/* Courses */}
                <div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">Iekļautie kursi</div>
                  <div className="flex flex-col gap-2">
                    {plan.courses.map((c) => (
                      <div key={c.name} className="flex items-center gap-2.5 rounded-lg px-3 py-2"
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}>
                        <span className="text-base shrink-0">{c.icon}</span>
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-white truncate">{c.name}</div>
                          <div className="text-[10px] text-gray-500 truncate">{c.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5">Ko vēl iegūsti</div>
                  <div className="flex flex-col gap-1.5">
                    {plan.skills.map((s) => (
                      <div key={s} className="flex items-start gap-2">
                        <svg className="shrink-0 mt-0.5" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={plan.color} strokeWidth="3">
                          <polyline points="20,6 9,17 4,12" />
                        </svg>
                        <span className="text-xs text-gray-300 leading-relaxed">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href={plan.href}
                  className="mt-auto w-full py-3.5 rounded-xl font-bold text-sm transition-all text-center block"
                  style={plan.highlight
                    ? { background: `linear-gradient(135deg, ${plan.color}, #00d4ff)`, color: "#000", boxShadow: `0 4px 20px ${plan.glow}`, textDecoration: "none" }
                    : { background: `${plan.color}18`, border: `1px solid ${plan.color}40`, color: plan.color, textDecoration: "none" }
                  }
                  onMouseEnter={(e) => {
                    if (!plan.highlight) (e.currentTarget as HTMLAnchorElement).style.background = `${plan.color}30`;
                  }}
                  onMouseLeave={(e) => {
                    if (!plan.highlight) (e.currentTarget as HTMLAnchorElement).style.background = `${plan.color}18`;
                  }}
                >
                  <E id={`plan-${plan.id}-cta`}>{plan.cta}</E>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Service pricing toggle */}
        <ServicePricing />

        {/* Disclaimer */}
        <p className="mt-6 text-center text-xs text-gray-600 max-w-lg mx-auto leading-relaxed">
          Norādītie ienākumi ir potenciāls pakalpojumu cenu piemērs, nevis garantēta peļņa.
        </p>

        {/* Guarantee */}
        <div className="mt-4 glass rounded-2xl p-5 text-center border border-[#00ff88]/10">
          <span className="text-2xl">🛡️</span>
          <div className="font-bold text-white mt-1 mb-1">
            <E id="pricing-guarantee-title">30 dienu garantija</E>
          </div>
          <p className="text-sm text-gray-400 max-w-sm mx-auto">
            <E id="pricing-guarantee-desc">Ja pirmajās 30 dienās neesi apmierināts, atmaksāsim visu. Bez jautājumiem.</E>
          </p>
        </div>
      </div>
    </section>
  );
}

function GroupedCourses() {
  const groups = [
    {
      plan: "Satura Speciālists",
      price: "€29/mēn",
      color: "#a855f7",
      borderColor: "rgba(168,85,247,0.25)",
      bg: "rgba(168,85,247,0.06)",
      courses: [
        {
          icon: "🎬",
          title: "AI Faceless Video",
          tag: "Populārs",
          tagColor: "#a855f7",
          earn: "€300–€800/mēn",
          difficulty: "Iesācējs",
          diffColor: "#00ff88",
          desc: "Veido AI video saturu sociālajiem tīkliem bez sejas. Pilna automatizācija no skripta līdz publicēšanai.",
          includes: ["AI video ģenerēšana", "Reklāmas banneri", "Post vizuāļi"],
          link: "/kursi/socialo-tiklu-parvaldiba",
        },
        {
          icon: "📱",
          title: "Sociālo Tīklu Pārvaldība",
          tag: "Iesācējiem",
          tagColor: "#a855f7",
          earn: "€300–€800/mēn",
          difficulty: "Iesācējs",
          diffColor: "#00ff88",
          desc: "AI video, attēli un reklāmas saturs. Veido pilnu sociālo mediju klātbūtni uzņēmumiem ar mākslīgo intelektu.",
          includes: ["Content plāns", "AI copy", "Feed dizains"],
          link: "/kursi/socialo-tiklu-parvaldiba",
        },
      ],
    },
    {
      plan: "Digitālais Speciālists",
      price: "€59/mēn",
      color: "#00ff88",
      borderColor: "rgba(0,255,136,0.3)",
      bg: "rgba(0,255,136,0.06)",
      courses: [
        {
          icon: "🌐",
          title: "Mājaslapa",
          tag: "Pieprasīts",
          tagColor: "#00d4ff",
          earn: "€300–€800/projekts",
          difficulty: "Iesācējs",
          diffColor: "#00ff88",
          desc: "Iemācies izveidot profesionālu mājaslapa vietējiem uzņēmumiem — no dizaina līdz publicēšanai, bez programmēšanas.",
          includes: ["Dizains bez koda", "SEO optimizācija", "Mobilā versija", "Satura pārvaldība"],
          link: null,
        },
        {
          icon: "💬",
          title: "Web Chatbot",
          tag: "Populārs",
          tagColor: "#00d4ff",
          earn: "€200–€500/mēn",
          difficulty: "Vidējs",
          diffColor: "#00d4ff",
          desc: "Pievieno AI chatbot jebkurai mājaslapa — atbild klientiem 24/7 un ģenerē lead automātiski.",
          includes: ["AI chatbot integrācija", "Lead veidlapas", "24/7 atbildes"],
          link: "/kursi/website-chatbot",
        },
        {
          icon: "🤖",
          title: "AI Asistents uz E-pastiem",
          tag: "Iesācējiem",
          tagColor: "#a78bfa",
          earn: "€200–€800/mēn",
          difficulty: "Iesācējs",
          diffColor: "#00ff88",
          desc: "Iemācies izmantot Claude e-pasta rakstīšanai, dizaina briifiem, satura veidošanai un ikdienas darbu automatizācijai.",
          includes: ["E-pasta veidnes", "Dizaina briifi", "Satura ģenerēšana"],
          link: null,
        },
      ],
    },
    {
      plan: "AI Aģentu Eksperts",
      price: "€149/mēn",
      color: "#f97316",
      borderColor: "rgba(249,115,22,0.28)",
      bg: "rgba(249,115,22,0.06)",
      courses: [
        {
          icon: "🎙️",
          title: "AI Balss Aģenti",
          tag: "Premium",
          tagColor: "#f97316",
          earn: "€500–€1800/projekts",
          difficulty: "Vidējs",
          diffColor: "#00d4ff",
          desc: "AI balss aģents, kas pieņem zvanus, rezervē tikšanās un atbild klientiem automātiski — 24/7.",
          includes: ["AI balss ģenerēšana", "LV numura integrācija", "Zvanu analytics"],
          link: "/kursi/voice-agents",
        },
        {
          icon: "💬",
          title: "WhatsApp Automatizācija",
          tag: "Populārs LV",
          tagColor: "#22c55e",
          earn: "€400–€900/mēn",
          difficulty: "Vidējs",
          diffColor: "#00d4ff",
          desc: "Automatizē klientu komunikāciju WhatsApp ar Make.com vai n8n. Latvijas uzņēmumiem.",
          includes: ["Automātiski atbildes", "Lead notifikācijas", "Vonage integrācija"],
          link: null,
        },
        {
          icon: "📱",
          title: "Izveido savu Aplikāciju ar AI",
          tag: "Drīzumā",
          tagColor: "#38bdf8",
          earn: "€800–€3000/projekts",
          difficulty: "Vidējs",
          diffColor: "#00d4ff",
          desc: "No idejas līdz darbojošai lietotnei — bez programmēšanas. AI palīdz veidot, dizainēt un laist klajā produktu.",
          includes: ["Lietotne bez koda", "AI dizains", "App Store publicēšana"],
          link: null,
          comingSoon: true,
        },
      ],
    },
  ];

  return (
    <div className="mt-16 mb-4">
      <div className="flex flex-col gap-10">
        {groups.map((group) => (
          <div key={group.plan}>
            {/* Group header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${group.borderColor}, transparent)` }} />
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider"
                style={{ background: group.bg, border: `1px solid ${group.borderColor}`, color: group.color }}>
                {group.plan} · {group.price}
              </div>
              <div className="h-px flex-1" style={{ background: `linear-gradient(to left, ${group.borderColor}, transparent)` }} />
            </div>

            {/* Course cards */}
            <div className={`grid gap-4 ${group.courses.length === 3 ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2"}`}>
              {group.courses.map((c) => (
                <div key={c.title}
                  className="relative rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300"
                  style={{ background: "rgba(13,13,26,0.9)", border: `1px solid rgba(255,255,255,0.07)` }}
                  onMouseEnter={(e) => {
                    if (!c.comingSoon) {
                      (e.currentTarget as HTMLDivElement).style.border = `1px solid ${group.borderColor}`;
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.border = "1px solid rgba(255,255,255,0.07)";
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  }}
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                      style={{ background: group.bg, border: `1px solid ${group.borderColor}` }}>
                      {c.icon}
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-lg font-semibold"
                      style={{ background: `${c.tagColor}18`, border: `1px solid ${c.tagColor}30`, color: c.tagColor }}>
                      {c.tag}
                    </span>
                  </div>

                  {/* Title + desc */}
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">{c.title}</h4>
                    <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>{c.desc}</p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {c.includes.map((tag) => (
                      <span key={tag} className="text-[11px] px-2 py-0.5 rounded-md"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Bottom */}
                  <div className="flex items-center justify-between pt-2 mt-auto" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <span className="text-sm font-bold" style={{ color: c.comingSoon ? "#38bdf8" : "#00ff88" }}>{c.earn}</span>
                    <span className="text-xs px-2 py-0.5 rounded-md font-semibold"
                      style={{ background: `${c.diffColor}12`, border: `1px solid ${c.diffColor}25`, color: c.diffColor }}>
                      {c.difficulty}
                    </span>
                  </div>

                  {c.comingSoon ? (
                    <div className="text-xs text-gray-600 font-semibold uppercase tracking-wide">🔒 Drīzumā pieejams</div>
                  ) : c.link ? (
                    <a href={c.link} className="text-xs font-semibold uppercase tracking-wide transition-colors"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = group.color)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>
                      Skatīt kursu →
                    </a>
                  ) : (
                    <div className="text-xs font-semibold uppercase tracking-wide" style={{ color: "rgba(255,255,255,0.4)" }}>Skatīt kursu →</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ServicePricing() {
  const services = [
    { num: "01", icon: "📱", name: "Sociālie tīkli", price: "300€–1 500€", monthly: "150€–400€", color: "#a855f7", glow: "168,85,247" },
    { num: "02", icon: "🌐", name: "Mājaslapa + Chatbot", price: "250€–900€", monthly: "150€–200€", color: "#00d4ff", glow: "0,212,255" },
    { num: "03", icon: "💬", name: "WhatsApp Automatizācija", price: "300€–1 200€", monthly: "200€–300€", color: "#00ff88", glow: "0,255,136" },
    { num: "04", icon: "🎙️", name: "Voice Agents", price: "500€–1 800€", monthly: "250€–400€", color: "#f97316", glow: "249,115,22" },
  ];

  return (
    <div className="mt-8">
      <div className="text-center mb-5">
        <div className="text-xs font-bold text-gray-300 uppercase tracking-widest mb-1">Ko vari iekasēt no klientiem</div>
        <div className="text-sm text-gray-400">Ieteicamās cenas Latvijā</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {services.map((s) => (
          <div key={s.name} className="rounded-xl p-4 flex items-center gap-4"
            style={{ background: `rgba(${s.glow},0.05)`, border: `1px solid rgba(${s.glow},0.18)` }}>
            <div className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center text-xl"
              style={{ background: `rgba(${s.glow},0.12)`, border: `1px solid rgba(${s.glow},0.25)` }}>
              {s.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-400 mb-0.5">{s.num} · {s.name}</div>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-base font-black" style={{ color: s.color }}>{s.price}</span>
                <span className="text-xs text-gray-400">vai {s.monthly}/mēn atbalsts</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
