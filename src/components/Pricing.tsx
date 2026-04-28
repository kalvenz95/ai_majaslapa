"use client";
import { useState } from "react";
import E from "@/components/E";

const plans = [
  {
    name: "Starter",
    price: "29",
    period: "/mēn",
    desc: "Iesāc savu AI ienākumu ceļu",
    highlight: false,
    color: "border-white/10",
    features: [
      "Piekļuve 3 kursiem",
      "Gatavi pārdošanas skripti",
      "Copy-paste ziņu veidnes",
      "Cenu rekomendācijas LV tirgum",
      "Kopienas piekļuve",
      "Progresu izsekošana",
    ],
    cta: "Sākt ar Starter",
    ctaStyle: "btn-secondary",
  },
  {
    name: "Pro",
    price: "59",
    period: "/mēn",
    desc: "Viss, kas nepieciešams pirmajiem €1000",
    highlight: true,
    color: "border-[#00ff88]/40",
    badge: "Populārākais",
    features: [
      "Visi 8 AI pakalpojumu kursi",
      "\"Pirmie €500\" ātrais ceļš",
      "Veidņu glabātuve (50+ faili)",
      "Klientu piesaistes sistēma",
      "Piedāvājumu veidotājs",
      "Cenu kalkulators",
      "Sertifikāti pēc pabeigšanas",
      "Iknedēļas live sesijas",
      "Prioritāra atbalsta",
    ],
    cta: "Sākt Pro →",
    ctaStyle: "btn-primary",
  },
  {
    name: "Build Pack",
    price: "149",
    period: "/mēn",
    desc: "Augstvērtīgi pakalpojumi un aģentūras ceļš",
    highlight: false,
    color: "border-[#a855f7]/30",
    features: [
      "Viss no Pro",
      "\"Build pakete\" ekskluzīvs ceļš",
      "Voice Agent meistarklass",
      "WhatsApp Agents (Vonage)",
      "CRM automatizācija",
      "Ikmēneša atbalsta paketes",
      "1:1 mentorings (2x/mēn)",
      "Privāta kopiena",
      "Proposal generator",
      "Aģentūras augšanas ceļvedis",
    ],
    cta: "Sākt Build Pack",
    ctaStyle: "btn-secondary",
  },
];

const services = [
  {
    num: "01",
    icon: "📱",
    name: "Sociālie tīkli",
    desc: "AI video, banneri un satura pārvaldība uzņēmumiem",
    price: "300€–1500€",
    monthly: "150€–400€",
    color: "#a855f7",
    bg: "rgba(168,85,247,0.07)",
    border: "rgba(168,85,247,0.22)",
    glow: "168,85,247",
  },
  {
    num: "02",
    icon: "🌐",
    name: "Mājaslapa + Chatbot",
    desc: "AI chatbots, lead ģenerēšana un 24/7 automātiskas atbildes",
    price: "250€–900€",
    monthly: "150€–200€",
    color: "#00d4ff",
    bg: "rgba(0,212,255,0.05)",
    border: "rgba(0,212,255,0.18)",
    glow: "0,212,255",
  },
  {
    num: "03",
    icon: "💬",
    name: "WhatsApp Automatizācija",
    desc: "Automātiskas atbildes, pieteikumu apstrāde un klientu filtrēšana",
    price: "300€–1200€",
    monthly: "200€–300€",
    color: "#00ff88",
    bg: "rgba(0,255,136,0.05)",
    border: "rgba(0,255,136,0.18)",
    glow: "0,255,136",
  },
  {
    num: "04",
    icon: "🎙️",
    name: "Voice Agents",
    desc: "AI balss aģenti zvanu automatizācijai un atgādinājumiem",
    price: "500€–1800€",
    monthly: "250€–400€",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.05)",
    border: "rgba(245,158,11,0.18)",
    glow: "245,158,11",
  },
];

export default function Pricing() {
  const [showServicePrices, setShowServicePrices] = useState(false);

  return (
    <section id="pricing" className="py-24 px-6 relative">
      <style>{`
        @keyframes floatOrb {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.4; }
          50% { transform: translateY(-18px) scale(1.06); opacity: 0.7; }
        }
        @keyframes floatOrb2 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          33% { transform: translateY(-12px) translateX(8px); opacity: 0.6; }
          66% { transform: translateY(8px) translateX(-6px); opacity: 0.4; }
        }
        @keyframes pricePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.75; }
        }
        @keyframes scanLine {
          0% { transform: translateY(-100%); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(400%); opacity: 0; }
        }
        @keyframes borderGlow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        @keyframes particleDrift {
          0% { transform: translate(0, 0) scale(1); opacity: 0.6; }
          25% { transform: translate(10px, -15px) scale(0.8); opacity: 0.3; }
          50% { transform: translate(-8px, -28px) scale(1.1); opacity: 0.5; }
          75% { transform: translate(6px, -18px) scale(0.9); opacity: 0.2; }
          100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
        }
        .service-card {
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease;
        }
        .service-card:hover {
          transform: translateY(-4px);
        }
      `}</style>

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#a855f7]/30 to-transparent" />
      <div className="absolute -right-32 top-1/2 w-96 h-96 bg-[#a855f7] opacity-[0.03] rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="badge-neon mb-4 inline-block" style={{background:"rgba(168,85,247,0.1)", borderColor:"rgba(168,85,247,0.3)", color:"#a855f7"}}>
            💎 Cenas
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            <E id="pricing-h2-1">Vienkārša, godīga</E>{" "}
            <span className="gradient-text-purple"><E id="pricing-h2-accent">cena</E></span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            <E id="pricing-subtitle">Investē vienreiz, atgūsti ar pirmo klientu. Latvijas tirgum pielāgotas cenas.</E>
          </p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`glass rounded-3xl p-8 relative card-hover border ${plan.color} ${
                plan.highlight ? "glow-green" : ""
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 badge-neon text-xs whitespace-nowrap">
                  ⭐ {plan.badge}
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-1"><E id={`plan-${plan.name}-name`}>{plan.name}</E></h3>
                <p className="text-sm text-gray-500"><E id={`plan-${plan.name}-desc`}>{plan.desc}</E></p>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-black text-white">€<E id={`plan-${plan.name}-price`}>{plan.price}</E></span>
                <span className="text-gray-500">{plan.period}</span>
              </div>
              <ul className="flex flex-col gap-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-[#00ff88] mt-0.5 flex-shrink-0">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a href="#" className={`${plan.ctaStyle} block text-center py-3.5 rounded-xl font-semibold`}>
                <E id={`plan-${plan.name}-cta`}>{plan.cta}</E>
              </a>
            </div>
          ))}
        </div>

        {/* Service pricing toggle */}
        <div className="mt-16">
          <button
            onClick={() => setShowServicePrices(!showServicePrices)}
            className="w-full glass rounded-2xl p-5 flex items-center justify-between hover:border-[#00ff88]/20 transition-all border border-white/5"
          >
            <div className="text-left">
              <div className="font-semibold text-white">💰 Ko vari iekasēt no klientiem</div>
              <div className="text-sm text-gray-500">Ieteicamās pakalpojumu cenas Latvijā</div>
            </div>
            <span
              className="text-[#00ff88] transition-transform duration-300"
              style={{ display: "inline-block", transform: showServicePrices ? "rotate(180deg)" : "rotate(0deg)" }}
            >▼</span>
          </button>

          {showServicePrices && (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((s) => (
                <div
                  key={s.name}
                  className="service-card relative rounded-2xl overflow-hidden"
                  style={{
                    background: s.bg,
                    border: `1px solid ${s.border}`,
                    boxShadow: `0 0 40px rgba(${s.glow},0.06)`,
                  }}
                >
                  {/* Animated background orbs */}
                  <div
                    style={{
                      position: "absolute", top: -24, right: -24,
                      width: 100, height: 100, borderRadius: "50%",
                      background: `radial-gradient(circle, rgba(${s.glow},0.18), transparent 70%)`,
                      animation: "floatOrb 4s ease-in-out infinite",
                      pointerEvents: "none",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute", bottom: -16, left: 20,
                      width: 60, height: 60, borderRadius: "50%",
                      background: `radial-gradient(circle, rgba(${s.glow},0.12), transparent 70%)`,
                      animation: "floatOrb2 5.5s ease-in-out infinite",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Scan line */}
                  <div
                    style={{
                      position: "absolute", left: 0, right: 0, height: 1,
                      background: `linear-gradient(90deg, transparent, rgba(${s.glow},0.4), transparent)`,
                      animation: "scanLine 6s ease-in-out infinite",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Particles */}
                  {[
                    { top: "20%", left: "75%", delay: "0s", dur: "3.2s" },
                    { top: "60%", left: "85%", delay: "1.1s", dur: "4s" },
                    { top: "80%", left: "65%", delay: "0.6s", dur: "3.6s" },
                  ].map((p, pi) => (
                    <div
                      key={pi}
                      style={{
                        position: "absolute",
                        top: p.top, left: p.left,
                        width: 3, height: 3, borderRadius: "50%",
                        background: s.color,
                        animation: `particleDrift ${p.dur} ease-in-out ${p.delay} infinite`,
                        pointerEvents: "none",
                        opacity: 0.5,
                      }}
                    />
                  ))}

                  <div className="relative p-6">
                    {/* Number + icon */}
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        style={{ fontSize: 11, fontWeight: 800, color: s.color, letterSpacing: "0.1em", opacity: 0.6 }}
                      >
                        {s.num}
                      </span>
                      <div
                        style={{
                          width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                          background: `rgba(${s.glow},0.12)`,
                          border: `1px solid rgba(${s.glow},0.25)`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 20,
                        }}
                      >
                        {s.icon}
                      </div>
                      <div>
                        <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>{s.name}</div>
                      </div>
                    </div>

                    <p style={{ fontSize: 12, color: "#666", lineHeight: 1.6, marginBottom: 20 }}>{s.desc}</p>

                    {/* Price row */}
                    <div
                      style={{
                        display: "grid", gridTemplateColumns: "1fr 1px 1fr", gap: 0,
                        background: `rgba(${s.glow},0.05)`,
                        border: `1px solid rgba(${s.glow},0.12)`,
                        borderRadius: 12, overflow: "hidden",
                      }}
                    >
                      <div style={{ padding: "14px 16px" }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>
                          Projekta cena
                        </div>
                        <div
                          style={{
                            fontSize: 18, fontWeight: 900, color: s.color,
                            animation: "pricePulse 3s ease-in-out infinite",
                          }}
                        >
                          {s.price}
                        </div>
                      </div>

                      <div style={{ background: `rgba(${s.glow},0.12)` }} />

                      <div style={{ padding: "14px 16px" }}>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "#555", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>
                          Ikmēneša atbalsts
                        </div>
                        <div
                          style={{
                            fontSize: 18, fontWeight: 900, color: "#fff",
                          }}
                        >
                          {s.monthly}<span style={{ fontSize: 11, color: "#555", fontWeight: 500 }}>/mēn</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Guarantee */}
        <div className="mt-8 glass rounded-2xl p-6 text-center border border-[#00ff88]/10">
          <div className="text-3xl mb-2">🛡️</div>
          <h4 className="font-bold text-white mb-2"><E id="pricing-guarantee-title">30 dienu garantija</E></h4>
          <p className="text-sm text-gray-400 max-w-md mx-auto">
            <E id="pricing-guarantee-desc">Ja pirmajās 30 dienās neesi apmierināts, atmaksāsim visu. Bez jautājumiem.</E>
          </p>
        </div>
      </div>
    </section>
  );
}
