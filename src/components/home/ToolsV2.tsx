"use client";

import { Reveal } from "@/components/home/Reveal";
import { BrandLogo } from "@/components/BrandLogos";

const tools = [
  { name: "Claude", desc: "AI asistents & skriptēšana", glow: "139,123,255" },
  { name: "Claude Code", desc: "Koda aģents terminālī", glow: "255,184,107" },
  { name: "ChatGPT", desc: "Teksts & satura ģenerēšana", glow: "52,217,195" },
  { name: "Vapi", desc: "Balss AI aģenti", glow: "139,123,255" },
  { name: "Retell AI", desc: "Reāllaika balss aģenti", glow: "139,123,255" },
  { name: "Make.com", desc: "Vizuālā automatizācija", glow: "255,184,107" },
  { name: "n8n", desc: "Darbplūsmu automatizācija", glow: "255,184,107" },
  { name: "Midjourney", desc: "AI attēlu ģenerēšana", glow: "52,217,195" },
  { name: "ElevenLabs", desc: "AI balss sintēze", glow: "139,123,255" },
  { name: "Runway", desc: "AI video ģenerēšana", glow: "52,217,195" },
];

export default function ToolsV2() {
  return (
    <section
      id="tools"
      style={{
        padding: "140px 0",
        background: "#0A0A0E",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Atmospheric glows — echo the dark Income / FinalCTA sections */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background:
          "radial-gradient(42% 50% at 82% 0%, rgba(109,94,243,0.18), transparent 64%)," +
          "radial-gradient(38% 50% at 8% 100%, rgba(0,191,165,0.12), transparent 62%)",
      }} />

      <div className="lp-container" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 28px", position: "relative" }}>
        {/* Header */}
        <div style={{ maxWidth: 660, margin: "0 auto 60px", textAlign: "center" }}>
          <Reveal><span className="v2-eyebrow v2-eyebrow--light">Tavs AI rīku komplekts</span></Reveal>
          <Reveal delay={0.08}>
            <h2 className="v2-h2" style={{ fontSize: "clamp(38px, 6vw, 72px)", color: "#fff", margin: "18px 0 20px" }}>
              Rīki, kurus <span className="v2-grad">apgūsi</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: 440, margin: "0 auto" }}>
              Platformas, ko izmanto modernu AI pakalpojumu veidošanā.
            </p>
          </Reveal>
        </div>

        {/* Tool tiles */}
        <div className="tools-v2-grid" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14 }}>
          {tools.map((tool, i) => (
            <Reveal key={tool.name} delay={0.04 * (i % 5)}>
              <div
                style={{
                  padding: "24px 22px", height: "100%",
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 19,
                  display: "flex", flexDirection: "column", gap: 14,
                  backdropFilter: "blur(12px)",
                  transition: "transform 0.28s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s ease, border-color 0.22s ease, background 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-4px)";
                  el.style.borderColor = `rgba(${tool.glow},0.5)`;
                  el.style.background = "rgba(255,255,255,0.06)";
                  el.style.boxShadow = `0 24px 54px -20px rgba(${tool.glow},0.5)`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "";
                  el.style.borderColor = "rgba(255,255,255,0.09)";
                  el.style.background = "rgba(255,255,255,0.04)";
                  el.style.boxShadow = "none";
                }}
              >
                <span style={{
                  width: 42, height: 42, borderRadius: 13, flexShrink: 0,
                  background: `linear-gradient(150deg, rgba(${tool.glow},0.24) 0%, rgba(${tool.glow},0.07) 100%)`,
                  border: `1px solid rgba(${tool.glow},0.35)`,
                  boxShadow: `0 8px 22px -8px rgba(${tool.glow},0.5)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff",
                }}>
                  <BrandLogo name={tool.name} size={20} />
                </span>
                <span>
                  <span style={{ display: "block", fontSize: 14.5, fontWeight: 700, color: "#fff", marginBottom: 3, letterSpacing: "-0.015em", fontFamily: "var(--font-sans)" }}>{tool.name}</span>
                  <span style={{ display: "block", fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.45 }}>{tool.desc}</span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .tools-v2-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
