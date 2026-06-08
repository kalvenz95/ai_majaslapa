"use client";
import { TrendingDown, Cpu, Briefcase, Banknote } from "lucide-react";

const points = [
  { Icon: Briefcase, text: "Pieprasīta prasme biznesā" },
  { Icon: Cpu, text: "Praktisks pielietojums uzņēmumos" },
  { Icon: TrendingDown, text: "Nav nepieciešama programmēšana" },
  { Icon: Banknote, text: "Iespēja veidot pakalpojumu klientiem" },
];

export default function WhyAI() {
  return (
    <section style={{ position: "relative", padding: "96px 24px", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "20%", right: "5%", width: 520, height: 420, background: "color-mix(in oklab, var(--accent) 6%, transparent)", filter: "blur(90px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", position: "relative" }} className="whyai-grid">
        {/* Left: copy */}
        <div>
          <div className="chip chip-dot" style={{ marginBottom: 22 }}>AI prasmes biznesam</div>

          <h2 style={{ fontFamily: "Inter Tight, sans-serif", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.12, color: "var(--ink)", marginBottom: 20, fontSize: "clamp(28px, 4.2vw, 48px)" }}>
            Uzņēmumiem vajag cilvēkus, kas prot izmantot{" "}
            <span style={{ color: "var(--accent)" }}>AI praksē</span>
          </h2>

          <p style={{ fontSize: 17, color: "var(--ink-2)", lineHeight: 1.65, maxWidth: 480, marginBottom: 32 }}>
            AI kļūst par vienu no pieprasītākajām prasmēm biznesā — tā palīdz uzņēmumiem{" "}
            <span style={{ color: "var(--accent)", fontWeight: 600 }}>samazināt izmaksas</span> un{" "}
            <span style={{ color: "var(--accent-2)", fontWeight: 600 }}>iegūt vairāk klientu</span>.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14, marginBottom: 36 }} className="whyai-points-grid">
            {points.map((p) => (
              <div key={p.text} style={{ display: "flex", alignItems: "center", gap: 11, padding: "14px 16px", borderRadius: 14, background: "var(--bg-1)", border: "1px solid var(--line)" }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "color-mix(in oklab, var(--accent) 12%, transparent)" }}>
                  <p.Icon size={15} color="var(--accent)" />
                </div>
                <span style={{ fontSize: 13.5, fontWeight: 500, color: "var(--ink-2)", lineHeight: 1.3 }}>{p.text}</span>
              </div>
            ))}
          </div>

          <a href="#courses" className="btn-primary" style={{ textDecoration: "none" }}>
            Skatīt, kā tas strādā →
          </a>
        </div>

        {/* Right: visual — AI business dashboard mockup */}
        <div style={{ position: "relative", aspectRatio: "1/1" }} className="whyai-visual">
          <div style={{ position: "absolute", inset: "6% 4%", borderRadius: 26, overflow: "hidden", border: "1px solid var(--line-2)", boxShadow: "0 28px 80px -20px rgba(17,17,17,0.16), 0 8px 24px -8px rgba(17,17,17,0.08)", background: "var(--bg-2)" }}>
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1100&auto=format&fit=crop&q=80"
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              loading="lazy"
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, color-mix(in oklab, var(--accent) 22%, transparent) 0%, transparent 55%)", mixBlendMode: "multiply" }} />
          </div>

          {/* Floating metric card */}
          <div style={{ position: "absolute", left: "-6%", bottom: "12%", background: "white", border: "1px solid var(--line-2)", borderRadius: 16, padding: "14px 18px", boxShadow: "0 16px 40px -12px rgba(17,17,17,0.14)", display: "flex", alignItems: "center", gap: 12, zIndex: 2 }}>
            <div style={{ width: 38, height: 38, borderRadius: 11, background: "color-mix(in oklab, var(--accent-2) 16%, transparent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <TrendingDown size={17} color="var(--accent-2)" style={{ transform: "scaleY(-1)" }} />
            </div>
            <div>
              <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: "-0.02em", color: "var(--ink)" }}>−38% izmaksu</div>
              <div style={{ fontSize: 11, color: "var(--ink-3)" }}>ar AI automatizāciju</div>
            </div>
          </div>

          {/* Floating tag */}
          <div style={{ position: "absolute", top: "10%", right: "-4%", background: "var(--accent)", color: "var(--accent-ink)", borderRadius: 14, padding: "10px 16px", fontSize: 13, fontWeight: 600, boxShadow: "0 12px 32px -10px color-mix(in oklab, var(--accent) 50%, transparent)", zIndex: 2 }}>
            +4 klienti / mēn.
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .whyai-grid { grid-template-columns: 1fr !important; }
          .whyai-visual { order: -1; max-width: 420px; margin: 0 auto 12px; }
          .whyai-points-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
