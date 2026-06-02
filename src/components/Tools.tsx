"use client";

import { Bot, Zap, Film, Mic2, MessageSquare, Link2, Palette, Volume2 } from "lucide-react";

const tools = [
  {
    name: "Claude",
    desc: "AI asistents & skripting",
    Icon: Bot,
    color: "#C6FF3D",
  },
  {
    name: "ChatGPT",
    desc: "Teksts & satura ģenerēšana",
    Icon: MessageSquare,
    color: "#7FF6E0",
  },
  {
    name: "Vapi",
    desc: "Balss AI aģenti",
    Icon: Mic2,
    color: "#a78bfa",
  },
  {
    name: "Make.com",
    desc: "Vizuālā automatizācija",
    Icon: Zap,
    color: "#C6FF3D",
  },
  {
    name: "n8n",
    desc: "Workflow Builder",
    Icon: Link2,
    color: "#7FF6E0",
  },
  {
    name: "Midjourney",
    desc: "AI attēlu ģenerēšana",
    Icon: Palette,
    color: "#a78bfa",
  },
  {
    name: "ElevenLabs",
    desc: "AI balss sintēze",
    Icon: Volume2,
    color: "#C6FF3D",
  },
  {
    name: "Runway",
    desc: "AI video ģenerēšana",
    Icon: Film,
    color: "#7FF6E0",
  },
];

export default function Tools() {
  return (
    <section id="tools" style={{ padding: "120px 0", position: "relative", overflow: "hidden", borderTop: "1px solid var(--line)" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 50% 50% at 50% 50%, color-mix(in oklab, var(--accent) 5%, transparent), transparent 70%)" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.15em", color: "var(--ink-3)", textTransform: "uppercase" as const, marginBottom: 20 }}>
            <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--accent)" }} />
            Platformu stack
            <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--accent)" }} />
          </div>
          <h2 style={{ fontFamily: "Inter Tight, sans-serif", fontSize: "clamp(32px, 5vw, 68px)", fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 16 }}>
            Rīki, kurus{" "}
            <span style={{ color: "var(--ink-2)", fontStyle: "italic", fontFamily: "Fraunces, Georgia, serif", fontWeight: 500 }}>
              apgūsi
            </span>
          </h2>
          <p style={{ color: "var(--ink-3)", fontSize: 16, lineHeight: 1.6, maxWidth: 480, margin: "0 auto" }}>
            Platformas, kuras tiek izmantotas modernu AI pakalpojumu veidošanā
          </p>
        </div>

        {/* 4×2 tool grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 12,
            maxWidth: 900,
            margin: "0 auto",
          }}
          className="tools-grid"
        >
          {tools.map((tool) => (
            <div
              key={tool.name}
              style={{
                padding: "22px 20px",
                background: "var(--bg-1)",
                border: "1px solid var(--line)",
                borderRadius: 18,
                display: "flex",
                flexDirection: "column",
                gap: 14,
                transition: "border-color 0.2s ease, transform 0.2s ease, background 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "color-mix(in oklab, var(--accent) 28%, transparent)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLElement).style.background = "var(--bg-2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--line)";
                (e.currentTarget as HTMLElement).style.transform = "";
                (e.currentTarget as HTMLElement).style.background = "var(--bg-1)";
              }}
            >
              {/* Icon */}
              <div style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: `color-mix(in oklab, ${tool.color} 12%, var(--bg-2))`,
                border: `1px solid color-mix(in oklab, ${tool.color} 20%, transparent)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                <tool.Icon size={18} color={tool.color} />
              </div>

              {/* Text */}
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", marginBottom: 4, letterSpacing: "-0.01em" }}>{tool.name}</div>
                <div style={{ fontSize: 12, color: "var(--ink-3)", lineHeight: 1.4 }}>{tool.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Subtle note */}
        <p style={{ textAlign: "center", marginTop: 32, fontSize: 12, color: "var(--ink-4)", fontFamily: "JetBrains Mono, monospace" }}>
          Visi rīki pieejami ar bezmaksas plāniem vai izmēģinājuma periodiem
        </p>
      </div>
    </section>
  );
}
