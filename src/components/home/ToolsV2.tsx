"use client";

import { Reveal } from "@/components/home/Reveal";
import { Bot, Zap, Film, Mic2, MessageSquare, Link2, Palette, Volume2 } from "lucide-react";

const tools = [
  { name: "Claude", desc: "AI asistents & skripting", Icon: Bot, color: "#6D5EF3", glow: "109,94,243" },
  { name: "ChatGPT", desc: "Teksts & satura ģenerēšana", Icon: MessageSquare, color: "#00BFA5", glow: "0,191,165" },
  { name: "Vapi", desc: "Balss AI aģenti", Icon: Mic2, color: "#6D5EF3", glow: "109,94,243" },
  { name: "Make.com", desc: "Vizuālā automatizācija", Icon: Zap, color: "#E8923C", glow: "232,146,60" },
  { name: "n8n", desc: "Workflow Builder", Icon: Link2, color: "#E8923C", glow: "232,146,60" },
  { name: "Midjourney", desc: "AI attēlu ģenerēšana", Icon: Palette, color: "#00BFA5", glow: "0,191,165" },
  { name: "ElevenLabs", desc: "AI balss sintēze", Icon: Volume2, color: "#6D5EF3", glow: "109,94,243" },
  { name: "Runway", desc: "AI video ģenerēšana", Icon: Film, color: "#00BFA5", glow: "0,191,165" },
];

export default function ToolsV2() {
  return (
    <section id="tools" style={{ padding: "130px 0", background: "#fff", borderTop: "1px solid var(--line)" }}>
      <div className="lp-container" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 28px" }}>
        {/* Header */}
        <div style={{ maxWidth: 660, margin: "0 auto 60px", textAlign: "center" }}>
          <Reveal><span className="v2-eyebrow">Tavs AI rīku komplekts</span></Reveal>
          <Reveal delay={0.08}>
            <h2 className="v2-h2" style={{ fontSize: "clamp(38px, 6vw, 72px)", color: "var(--ink)", margin: "18px 0 20px" }}>
              Rīki, kurus <span className="v2-grad">apgūsi</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p style={{ fontSize: 17, color: "var(--ink-3)", lineHeight: 1.7, maxWidth: 440, margin: "0 auto" }}>
              Platformas, ko izmanto modernu AI pakalpojumu veidošanā.
            </p>
          </Reveal>
        </div>

        {/* Tool tiles */}
        <div className="tools-v2-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {tools.map((tool, i) => (
            <Reveal key={tool.name} delay={0.04 * (i % 4)}>
              <div
                style={{
                  padding: "24px 22px", height: "100%",
                  background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 19,
                  display: "flex", flexDirection: "column", gap: 14,
                  boxShadow: "var(--shadow-sm)",
                  transition: "transform 0.28s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s ease, border-color 0.22s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-4px)";
                  el.style.borderColor = `rgba(${tool.glow},0.4)`;
                  el.style.boxShadow = `0 22px 50px -18px rgba(${tool.glow},0.4), 0 6px 16px -8px rgba(17,17,17,0.08)`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "";
                  el.style.borderColor = "var(--line)";
                  el.style.boxShadow = "var(--shadow-sm)";
                }}
              >
                <span style={{
                  width: 42, height: 42, borderRadius: 13, flexShrink: 0,
                  background: `linear-gradient(150deg, rgba(${tool.glow},0.16) 0%, rgba(${tool.glow},0.06) 100%)`,
                  border: `1px solid rgba(${tool.glow},0.26)`,
                  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.7), 0 6px 16px -8px rgba(${tool.glow},0.45)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <tool.Icon size={18} color={tool.color} strokeWidth={2} />
                </span>
                <span>
                  <span style={{ display: "block", fontSize: 14.5, fontWeight: 800, color: "var(--ink)", marginBottom: 3, letterSpacing: "-0.015em", fontFamily: "Inter Tight, sans-serif" }}>{tool.name}</span>
                  <span style={{ display: "block", fontSize: 12, color: "var(--ink-3)", lineHeight: 1.45 }}>{tool.desc}</span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <p style={{ textAlign: "center", marginTop: 32, fontSize: 12.5, color: "var(--ink-4)", fontFamily: "JetBrains Mono, monospace" }}>
            Visi rīki pieejami ar bezmaksas plāniem vai izmēģinājuma periodiem
          </p>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .tools-v2-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
