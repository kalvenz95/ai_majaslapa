"use client";

import { EmojiIcon } from "@/components/EmojiIcon";

const services = [
  {
    emoji: "📱",
    title: "AI saturs",
    desc: "Faceless video, reklāmu vizuāļi un sociālo tīklu saturs uzņēmumiem.",
    color: "var(--accent)",
  },
  {
    emoji: "🌐",
    title: "AI mājaslapas",
    desc: "Modernas mājaslapas, kas piesaista klientus — bez koda zināšanām.",
    color: "var(--accent-2)",
  },
  {
    emoji: "🤖",
    title: "Automatizācija",
    desc: "WhatsApp, e-pasti un lead apstrāde — automātiski, bez cilvēka iesaistes.",
    color: "var(--accent)",
  },
  {
    emoji: "🎙️",
    title: "AI balss aģenti",
    desc: "Zvanu pieņemšana un rezervācijas 24/7 — ar AI balss tehnoloģiju.",
    color: "var(--accent-2)",
  },
];

export default function WhyAI() {
  return (
    <section id="about" style={{ padding: "120px 0", background: "var(--bg)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 64px" }}>
          <h2 className="h-display" style={{
            fontSize: "clamp(42px, 7vw, 80px)",
            lineHeight: 1.08,
            color: "var(--ink)",
            margin: "0 0 20px",
          }}>
            Ko tu iegūsi <span style={{ color: "var(--accent)" }}>Chademy?</span>
          </h2>
          <p style={{ fontSize: 18, color: "var(--ink-3)", lineHeight: 1.65, maxWidth: 520, margin: "0 auto" }}>
            Ne tikai teoriju. Tu soli pa solim izveido pakalpojumu, portfolio un iegūsti sistēmu klientu piesaistei.
          </p>
        </div>

        {/* 4 cards — 2×2 on desktop */}
        <div
          className="whyai-cards"
          style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}
        >
          {services.map((s, i) => (
            <div
              key={s.title}
              style={{
                background: "#fff",
                border: "1px solid var(--line)",
                borderRadius: 24,
                padding: "36px 32px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                boxShadow: "var(--shadow-md)",
                transition: "border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "color-mix(in oklab, var(--accent) 30%, transparent)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-lg)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--line)";
                (e.currentTarget as HTMLElement).style.transform = "";
                (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)";
              }}
            >
              <div style={{
                width: 60, height: 60, borderRadius: 18,
                background: "linear-gradient(150deg, color-mix(in oklab, var(--accent) 18%, #fff) 0%, color-mix(in oklab, var(--accent) 9%, #fff) 100%)",
                border: "1px solid color-mix(in oklab, var(--accent) 22%, transparent)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.7), 0 6px 16px -8px color-mix(in oklab, var(--accent) 45%, transparent)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <EmojiIcon emoji={s.emoji} size={26} color="var(--accent)" strokeWidth={1.75} />
              </div>
              <div>
                <h3 style={{
                  fontSize: 24, fontWeight: 800, fontFamily: "Inter Tight, sans-serif",
                  letterSpacing: "-0.025em", color: "var(--ink)", margin: "0 0 8px",
                }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: 15, color: "var(--ink-3)", lineHeight: 1.6, margin: 0 }}>
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: 48 }}>
          <a href="#courses" className="btn-primary" style={{ textDecoration: "none", fontSize: 16, padding: "16px 32px" }}>
            Skatīt kursus →
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .whyai-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
