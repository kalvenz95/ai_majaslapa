"use client";
import E from "@/components/E";

const plans = [
  {
    id: "pamati",
    name: "Satura Speciālists",
    tagline: "Sāc pelnīt ar sociālo mediju saturu",
    price: "29",
    earn: "300€–1 500€/mēn",
    color: "#a855f7",
    glow: "rgba(168,85,247,0.12)",
    border: "rgba(168,85,247,0.22)",
    bg: "rgba(168,85,247,0.04)",
    highlight: false,
    badge: null,
    courses: [
      { icon: "📱", name: "Sociālo Tīklu Pārvaldība", desc: "AI video, banneri, feed dizains" },
      { icon: "🤖", name: "Claude AI Asistents", desc: "E-pasti, teksti, dizaina briifi" },
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
    color: "#6633ee",
    glow: "rgba(102,51,238,0.15)",
    border: "rgba(102,51,238,0.3)",
    bg: "rgba(102,51,238,0.05)",
    highlight: true,
    badge: "Populārākais",
    courses: [
      { icon: "🌐", name: "Mājaslapa + AI Chatbot", desc: "24/7 automātiskas atbildes" },
      { icon: "📱", name: "Sociālo Tīklu Pārvaldība", desc: "AI video, banneri, feed" },
      { icon: "🤖", name: "Claude AI Asistents", desc: "Automatizēts saturs un e-pasti" },
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
    glow: "rgba(249,115,22,0.12)",
    border: "rgba(249,115,22,0.22)",
    bg: "rgba(249,115,22,0.04)",
    highlight: false,
    badge: "Vislielākie ienākumi",
    courses: [
      { icon: "💬", name: "WhatsApp Automatizācija", desc: "Automātiskas atbildes un lead apstrāde" },
      { icon: "🎙️", name: "AI Balss Aģenti", desc: "Automātiski zvani un pieraksti" },
      { icon: "🌐", name: "Mājaslapa + AI Chatbot", desc: "24/7 klientu apkalpošana" },
      { icon: "📱", name: "Sociālo Tīklu Pārvaldība", desc: "AI video, banneri, feed" },
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

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6633ee]/20 to-transparent" />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="badge-neon mb-4 inline-block">
            💎 <E id="pricing-badge">Pakas</E>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-[#18181b] mb-4">
            <E id="pricing-h2">Izvēlies savu</E>{" "}
            <span className="gradient-text-purple"><E id="pricing-h2-accent">ceļu</E></span>
          </h2>
          <p className="text-[#52525b] text-lg max-w-lg mx-auto">
            <E id="pricing-sub">Katrai pakai iekšā — kursi, portfolio izveide, klientu uzrunāšana un piedāvājumu veidnes.</E>
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
                  ? `linear-gradient(160deg, rgba(102,51,238,0.06) 0%, rgba(255,255,255,0.96) 60%)`
                  : "rgba(255,255,255,0.85)",
                border: `1px solid ${plan.border}`,
                boxShadow: plan.highlight ? `0 0 40px ${plan.glow}` : "none",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Shimmer on highlight */}
              {plan.highlight && (
                <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${plan.color}55, transparent)`, animation: "shimmer 3s ease-in-out infinite" }} />
                </div>
              )}

              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full text-xs font-bold text-white"
                  style={{ background: plan.color }}>
                  {plan.highlight ? "⭐ " : "🔥 "}{plan.badge}
                </div>
              )}

              <div className="p-6 flex flex-col gap-5 flex-1">

                {/* Header */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: plan.color }}>
                    €{plan.price}/mēn
                  </div>
                  <h3 className="text-xl font-black text-[#18181b] leading-tight mb-1">
                    <E id={`plan-${plan.id}-name`}>{plan.name}</E>
                  </h3>
                  <p className="text-xs text-[#71717a]">
                    <E id={`plan-${plan.id}-tagline`}>{plan.tagline}</E>
                  </p>
                </div>

                {/* Earn */}
                <div className="rounded-xl px-4 py-3" style={{ background: `${plan.color}0f`, border: `1px solid ${plan.color}22` }}>
                  <div className="text-xs text-[#71717a] mb-0.5">Potenciālie ienākumi</div>
                  <div className="text-lg font-black" style={{ color: plan.color }}>{plan.earn}</div>
                </div>

                {/* Courses */}
                <div>
                  <div className="text-xs font-bold text-[#71717a] uppercase tracking-wider mb-2.5">Iekļautie kursi</div>
                  <div className="flex flex-col gap-2">
                    {plan.courses.map((c) => (
                      <div key={c.name} className="flex items-center gap-2.5 rounded-lg px-3 py-2"
                        style={{ background: "rgba(0,0,0,0.03)", border: "1px solid rgba(0,0,0,0.05)" }}>
                        <span className="text-base shrink-0">{c.icon}</span>
                        <div className="min-w-0">
                          <div className="text-xs font-semibold text-[#18181b] truncate">{c.name}</div>
                          <div className="text-[10px] text-[#71717a] truncate">{c.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <div className="text-xs font-bold text-[#71717a] uppercase tracking-wider mb-2.5">Ko vēl iegūsti</div>
                  <div className="flex flex-col gap-1.5">
                    {plan.skills.map((s) => (
                      <div key={s} className="flex items-start gap-2">
                        <svg className="shrink-0 mt-0.5" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={plan.color} strokeWidth="3">
                          <polyline points="20,6 9,17 4,12" />
                        </svg>
                        <span className="text-xs text-[#374151] leading-relaxed">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <button
                  className="mt-auto w-full py-3.5 rounded-xl font-bold text-sm transition-all"
                  style={plan.highlight
                    ? { background: `linear-gradient(135deg, ${plan.color}, #4f46e5)`, color: "#fff", boxShadow: `0 4px 20px ${plan.glow}` }
                    : { background: `${plan.color}12`, border: `1px solid ${plan.color}35`, color: plan.color }
                  }
                  onMouseEnter={(e) => {
                    if (!plan.highlight) (e.currentTarget as HTMLButtonElement).style.background = `${plan.color}22`;
                  }}
                  onMouseLeave={(e) => {
                    if (!plan.highlight) (e.currentTarget as HTMLButtonElement).style.background = `${plan.color}12`;
                  }}
                >
                  <E id={`plan-${plan.id}-cta`}>{plan.cta}</E>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Service pricing toggle */}
        <ServicePricing />

        {/* Guarantee */}
        <div className="mt-6 glass rounded-2xl p-5 text-center border border-[#6633ee]/12">
          <span className="text-2xl">🛡️</span>
          <div className="font-bold text-[#18181b] mt-1 mb-1">
            <E id="pricing-guarantee-title">30 dienu garantija</E>
          </div>
          <p className="text-sm text-[#52525b] max-w-sm mx-auto">
            <E id="pricing-guarantee-desc">Ja pirmajās 30 dienās neesi apmierināts, atmaksāsim visu. Bez jautājumiem.</E>
          </p>
        </div>
      </div>
    </section>
  );
}

function ServicePricing() {
  const services = [
    { num: "01", icon: "📱", name: "Sociālie tīkli", price: "300€–1 500€", monthly: "150€–400€", color: "#a855f7", glow: "168,85,247" },
    { num: "02", icon: "🌐", name: "Mājaslapa + Chatbot", price: "250€–900€", monthly: "150€–200€", color: "#6633ee", glow: "102,51,238" },
    { num: "03", icon: "💬", name: "WhatsApp Automatizācija", price: "300€–1 200€", monthly: "200€–300€", color: "#4f46e5", glow: "79,70,229" },
    { num: "04", icon: "🎙️", name: "Voice Agents", price: "500€–1 800€", monthly: "250€–400€", color: "#f97316", glow: "249,115,22" },
  ];

  return (
    <div className="mt-8">
      <div className="text-center mb-5">
        <div className="text-xs font-bold text-[#71717a] uppercase tracking-widest mb-1">Ko vari iekasēt no klientiem</div>
        <div className="text-sm text-[#52525b]">Ieteicamās cenas Latvijā</div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {services.map((s) => (
          <div key={s.name} className="rounded-xl p-4 flex items-center gap-4"
            style={{ background: `rgba(${s.glow},0.05)`, border: `1px solid rgba(${s.glow},0.15)` }}>
            <div className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center text-xl"
              style={{ background: `rgba(${s.glow},0.1)`, border: `1px solid rgba(${s.glow},0.2)` }}>
              {s.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-[#71717a] mb-0.5">{s.num} · {s.name}</div>
              <div className="flex items-baseline gap-2 flex-wrap">
                <span className="text-base font-black" style={{ color: s.color }}>{s.price}</span>
                <span className="text-xs text-[#9ca3af]">vai {s.monthly}/mēn atbalsts</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
