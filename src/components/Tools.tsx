"use client";

import { Bot, Zap, Film, Mic2, MessageSquare, Link2, Palette, Volume2 } from "lucide-react";

const tools = [
  { name: "Claude", desc: "AI asistents & skripting", Icon: Bot, color: "var(--accent)" },
  { name: "ChatGPT", desc: "Teksts & satura ģenerēšana", Icon: MessageSquare, color: "var(--accent-2)" },
  { name: "Vapi", desc: "Balss AI aģenti", Icon: Mic2, color: "var(--accent)" },
  { name: "Make.com", desc: "Vizuālā automatizācija", Icon: Zap, color: "var(--accent-2)" },
  { name: "n8n", desc: "Workflow Builder", Icon: Link2, color: "var(--accent)" },
  { name: "Midjourney", desc: "AI attēlu ģenerēšana", Icon: Palette, color: "var(--accent-2)" },
  { name: "ElevenLabs", desc: "AI balss sintēze", Icon: Volume2, color: "var(--accent)" },
  { name: "Runway", desc: "AI video ģenerēšana", Icon: Film, color: "var(--accent-2)" },
];

export default function Tools() {
  return (
    <section id="tools" style={{ padding: "100px 0", background: "var(--bg)", borderTop: "1px solid var(--line)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>

        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{
            fontSize: "clamp(36px, 6vw, 68px)",
            fontWeight: 900,
            fontFamily: "Inter Tight, sans-serif",
            letterSpacing: "-0.04em",
            lineHeight: 1.06,
            color: "var(--ink)",
            margin: "0 0 16px",
          }}>
            Rīki, kurus <span style={{ color: "var(--accent)" }}>apgūsi</span>
          </h2>
          <p style={{ color: "var(--ink-3)", fontSize: 17, lineHeight: 1.6, maxWidth: 440, margin: "0 auto" }}>
            Platformas, ko izmanto modern AI pakalpojumu veidošanā.
          </p>
        </div>

        <div
          className="tools-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, maxWidth: 860, margin: "0 auto" }}
        >
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="lp-card-sm"
              style={{
                padding: "22px 20px",
                background: "#fff",
                border: "1px solid var(--line)",
                borderRadius: 18,
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "color-mix(in oklab, var(--accent) 28%, transparent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--line)";
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                background: `color-mix(in oklab, ${tool.color} 12%, var(--bg-2))`,
                border: `1px solid color-mix(in oklab, ${tool.color} 20%, transparent)`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <tool.Icon size={18} color={tool.color} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", marginBottom: 3, letterSpacing: "-0.01em" }}>{tool.name}</div>
                <div style={{ fontSize: 12, color: "var(--ink-3)", lineHeight: 1.4 }}>{tool.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center", marginTop: 28, fontSize: 12, color: "var(--ink-4)", fontFamily: "Inter, sans-serif" }}>
          Visi rīki pieejami ar bezmaksas plāniem vai izmēģinājuma periodiem
        </p>
      </div>
    </section>
  );
}
