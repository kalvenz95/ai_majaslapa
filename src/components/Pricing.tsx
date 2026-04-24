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
      "Ikmēneša retenera paketes",
      "1:1 mentorings (2x/mēn)",
      "Privāta kopiena",
      "Proposal generator",
      "Aģentūras augšanas ceļvedis",
    ],
    cta: "Sākt Build Pack",
    ctaStyle: "btn-secondary",
  },
];

const oneTimeServices = [
  { name: "AI Faceless Video", starter: "€150", standard: "€300", premium: "€500+" },
  { name: "AI Attēlu pakete", starter: "€80", standard: "€200", premium: "€400" },
  { name: "Website Chatbot", starter: "€250", standard: "€500", premium: "€900" },
  { name: "WhatsApp Automācija", starter: "€300", standard: "€600", premium: "€1200" },
  { name: "Voice Agent", starter: "€500", standard: "€900", premium: "€1800" },
  { name: "Make.com Workflow", starter: "€200", standard: "€450", premium: "€800" },
];

export default function Pricing() {
  const [showServicePrices, setShowServicePrices] = useState(false);

  return (
    <section id="pricing" className="py-24 px-6 relative">
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
              <div className="font-semibold text-white">💰 Ieteicamās pakalpojumu cenas Latvijā</div>
              <div className="text-sm text-gray-500">Ko iekasēt no saviem klientiem</div>
            </div>
            <span className={`text-[#00ff88] transition-transform ${showServicePrices ? "rotate-180" : ""}`}>▼</span>
          </button>

          {showServicePrices && (
            <div className="mt-4 glass rounded-2xl overflow-hidden">
              <div className="grid grid-cols-4 gap-4 p-4 border-b border-white/5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <div>Pakalpojums</div>
                <div className="text-center">Starter</div>
                <div className="text-center">Standard</div>
                <div className="text-center text-[#00ff88]">Premium</div>
              </div>
              {oneTimeServices.map((s, i) => (
                <div key={s.name} className={`grid grid-cols-4 gap-4 p-4 text-sm ${i % 2 === 0 ? "bg-white/[0.01]" : ""}`}>
                  <div className="text-gray-300 font-medium">{s.name}</div>
                  <div className="text-center text-gray-400">{s.starter}</div>
                  <div className="text-center text-gray-300">{s.standard}</div>
                  <div className="text-center text-[#00ff88] font-semibold">{s.premium}</div>
                </div>
              ))}
              <div className="p-4 bg-[#00ff88]/5 border-t border-[#00ff88]/10">
                <p className="text-xs text-gray-500">* Cenas norādītas kā vienreizēji maksājumi. Ikmēneša abonements = 40-60% no projekta cenas.</p>
              </div>
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
