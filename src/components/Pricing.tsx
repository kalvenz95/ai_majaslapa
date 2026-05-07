"use client";
import E from "@/components/E";
import Link from "next/link";
import { PricingCheckoutButton } from "@/components/PricingCheckoutButton";

const plans = [
  {
    id: "pamati",
    name: "Satura Speciālists",
    tagline: "Sāc pelnīt ar sociālo mediju saturu",
    price: "29",
    earn: "300€–1 500€/mēn",
    highlight: false,
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
    highlight: true,
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
    highlight: false,
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
    <section id="pricing" style={{ padding: "96px 24px", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, var(--line-2), transparent)" }} />

      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="chip chip-dot" style={{ marginBottom: 16 }}>
            💎 <E id="pricing-badge">Pakas</E>
          </div>
          <h2 style={{ fontFamily: "Inter Tight, sans-serif", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.03em", marginBottom: 16 }}>
            <E id="pricing-h2">Izvēlies savu</E>{" "}
            <span style={{ color: "var(--accent)" }}><E id="pricing-h2-accent">ceļu</E></span>
          </h2>
          <p style={{ color: "var(--ink-3)", fontSize: 16, maxWidth: 480, margin: "0 auto", lineHeight: 1.6 }}>
            <E id="pricing-sub">Katrai pakai iekšā — kursi, piemēri, piedāvājumu veidnes un klientu uzrunāšanas materiāli.</E>
          </p>
        </div>

        {/* Plans */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, alignItems: "start" }}>
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="card"
              style={{
                display: "flex", flexDirection: "column", overflow: "hidden",
                borderColor: plan.highlight ? "color-mix(in oklab, var(--accent) 40%, transparent)" : "var(--line)",
                background: plan.highlight ? "color-mix(in oklab, var(--accent) 5%, var(--bg-1))" : "var(--bg-1)",
                boxShadow: plan.highlight ? "0 0 0 1px color-mix(in oklab, var(--accent) 25%, transparent), 0 8px 40px -8px color-mix(in oklab, var(--accent) 20%, transparent)" : "none",
              }}
            >
              {/* Top accent line on featured */}
              {plan.highlight && (
                <div style={{ height: 2, background: "var(--accent)", borderRadius: "18px 18px 0 0", marginBottom: -2 }} />
              )}

              <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20, flex: 1 }}>
                {/* Header */}
                <div>
                  <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, fontWeight: 700, color: "var(--accent)", marginBottom: 6 }}>
                    €{plan.price}/mēn
                  </div>
                  <h3 style={{ fontFamily: "Inter Tight, sans-serif", fontSize: 20, fontWeight: 800, color: "var(--ink)", marginBottom: 4, letterSpacing: "-0.01em" }}>
                    <E id={`plan-${plan.id}-name`}>{plan.name}</E>
                  </h3>
                  <p style={{ fontSize: 13, color: "var(--ink-3)" }}>
                    <E id={`plan-${plan.id}-tagline`}>{plan.tagline}</E>
                  </p>
                </div>

                {/* Earn */}
                <div style={{ background: "var(--bg-2)", border: "1px solid var(--line)", borderRadius: 12, padding: "12px 16px" }}>
                  <div style={{ fontSize: 11, color: "var(--ink-4)", marginBottom: 4, fontFamily: "JetBrains Mono, monospace" }}>Potenciālie ienākumi</div>
                  <div className="metric" style={{ fontSize: 20, color: "var(--accent)" }}>{plan.earn}</div>
                </div>

                {/* Courses */}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-4)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10, fontFamily: "JetBrains Mono, monospace" }}>Iekļautie kursi</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {plan.courses.map((c) => (
                      <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 10, background: "var(--bg-2)", border: "1px solid var(--line)" }}>
                        <span style={{ fontSize: 16, flexShrink: 0 }}>{c.icon}</span>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.name}</div>
                          <div style={{ fontSize: 11, color: "var(--ink-4)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-4)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10, fontFamily: "JetBrains Mono, monospace" }}>Ko vēl iegūsti</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {plan.skills.map((s) => (
                      <div key={s} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                        <svg style={{ flexShrink: 0, marginTop: 2 }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3">
                          <polyline points="20,6 9,17 4,12" />
                        </svg>
                        <span style={{ fontSize: 12, color: "var(--ink-2)", lineHeight: 1.5 }}>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <PricingCheckoutButton
                  plan={plan.id === "pamati" ? "PAMATI" : plan.id === "izaugsme" ? "IZAUGSME" : "MEISTARS"}
                  href={plan.href}
                  label={plan.cta}
                  className="mt-auto w-full py-3 rounded-xl font-bold text-sm text-center block"
                  style={plan.highlight
                    ? { background: "var(--accent)", color: "var(--accent-ink)", borderRadius: 12, padding: "12px 0", fontWeight: 700, fontSize: 14 }
                    : { background: "var(--bg-2)", border: "1px solid var(--line)", color: "var(--ink-2)", borderRadius: 12, padding: "12px 0", fontWeight: 600, fontSize: 14, transition: "border-color 0.15s ease, color 0.15s ease" }
                  }
                  onMouseEnter={(e) => {
                    if (!plan.highlight) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--line-2)";
                      (e.currentTarget as HTMLButtonElement).style.color = "var(--ink)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!plan.highlight) {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--line)";
                      (e.currentTarget as HTMLButtonElement).style.color = "var(--ink-2)";
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
