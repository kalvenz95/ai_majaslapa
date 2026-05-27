"use client";

import { useEffect, useRef, useState } from "react";
import { Bot, Zap, Film, Mic2, MessageSquare, Link2, Palette, Volume2 } from "lucide-react";

const tools = [
  { name: "Claude", desc: "AI asistents & skripting", Icon: Bot, color: "#C6FF3D", glow: "rgba(198,255,61,0.18)" },
  { name: "ChatGPT", desc: "Teksts & satura ģenerēšana", Icon: MessageSquare, color: "#7FF6E0", glow: "rgba(127,246,224,0.15)" },
  { name: "Vapi", desc: "Balss AI aģenti", Icon: Mic2, color: "#a78bfa", glow: "rgba(167,139,250,0.15)" },
  { name: "Make.com", desc: "Vizuālā automatizācija", Icon: Zap, color: "#C6FF3D", glow: "rgba(198,255,61,0.18)" },
  { name: "n8n", desc: "Workflow Builder", Icon: Link2, color: "#7FF6E0", glow: "rgba(127,246,224,0.15)" },
  { name: "Midjourney", desc: "AI attēlu ģenerēšana", Icon: Palette, color: "#a78bfa", glow: "rgba(167,139,250,0.15)" },
  { name: "ElevenLabs", desc: "AI balss sintēze", Icon: Volume2, color: "#C6FF3D", glow: "rgba(198,255,61,0.18)" },
  { name: "Runway", desc: "AI video ģenerēšana", Icon: Film, color: "#7FF6E0", glow: "rgba(127,246,224,0.15)" },
];

export default function Tools() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="tools"
      style={{
        padding: "140px 0",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid var(--line)",
      }}
    >
      {/* Background */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 600, background: "radial-gradient(ellipse, rgba(127,246,224,0.05) 0%, transparent 70%)", filter: "blur(80px)" }} />
      </div>

      <div ref={ref} style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 64,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: "all 0.6s cubic-bezier(0.215,0.61,0.355,1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.15em", color: "var(--ink-3)", textTransform: "uppercase" as const, marginBottom: 24 }}>
            <span style={{ display: "inline-block", width: 32, height: 1, background: "linear-gradient(90deg, transparent, var(--accent))" }} />
            Platformu stack
            <span style={{ display: "inline-block", width: 32, height: 1, background: "linear-gradient(90deg, var(--accent), transparent)" }} />
          </div>
          <h2 style={{ fontFamily: "Inter Tight, sans-serif", fontSize: "clamp(34px, 5vw, 72px)", fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.038em", lineHeight: 1.08, marginBottom: 18 }}>
            Rīki, kurus{" "}
            <span style={{ background: "linear-gradient(120deg, var(--accent), #7FF6E0 50%, var(--accent))", backgroundSize: "200% auto", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", fontStyle: "italic", fontFamily: "Fraunces, Georgia, serif", fontWeight: 500, animation: "gradient-shift 5s ease infinite" }}>
              apgūsi
            </span>
          </h2>
          <p style={{ color: "var(--ink-3)", fontSize: 16, lineHeight: 1.65, maxWidth: 480, margin: "0 auto" }}>
            Platformas, kuras tiek izmantotas modernu AI pakalpojumu veidošanā
          </p>
        </div>

        {/* Tool grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 14,
            maxWidth: 960,
            margin: "0 auto",
          }}
          className="tools-grid"
        >
          {tools.map((tool, i) => (
            <div
              key={tool.name}
              style={{
                padding: "26px 22px",
                background: "rgba(255,255,255,0.025)",
                backdropFilter: "blur(20px)",
                border: `1px solid color-mix(in oklab, ${tool.color} 12%, transparent)`,
                borderRadius: 20,
                display: "flex",
                flexDirection: "column",
                gap: 16,
                transition: "transform 0.28s cubic-bezier(0.215,0.61,0.355,1), box-shadow 0.28s ease, border-color 0.28s ease, background 0.28s ease",
                position: "relative",
                overflow: "hidden",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: `${0.05 + i * 0.05}s`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(-6px)";
                el.style.borderColor = `color-mix(in oklab, ${tool.color} 35%, transparent)`;
                el.style.boxShadow = `0 20px 48px -16px ${tool.glow}`;
                el.style.background = `color-mix(in oklab, ${tool.color} 5%, rgba(255,255,255,0.03))`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "";
                el.style.borderColor = `color-mix(in oklab, ${tool.color} 12%, transparent)`;
                el.style.boxShadow = "";
                el.style.background = "rgba(255,255,255,0.025)";
              }}
            >
              {/* Ambient top glow on hover */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${tool.color}40, transparent)` }} />

              {/* Icon */}
              <div
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 14,
                  background: `color-mix(in oklab, ${tool.color} 12%, transparent)`,
                  border: `1px solid color-mix(in oklab, ${tool.color} 22%, transparent)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: `0 4px 20px color-mix(in oklab, ${tool.color} 15%, transparent)`,
                }}
              >
                <tool.Icon size={20} color={tool.color} />
              </div>

              {/* Text */}
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", marginBottom: 5, letterSpacing: "-0.01em" }}>
                  {tool.name}
                </div>
                <div style={{ fontSize: 12, color: "var(--ink-3)", lineHeight: 1.45 }}>
                  {tool.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <p
          style={{
            textAlign: "center",
            marginTop: 32,
            fontSize: 12,
            color: "var(--ink-4)",
            fontFamily: "JetBrains Mono, monospace",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.5s",
          }}
        >
          Visi rīki pieejami ar bezmaksas plāniem vai izmēģinājuma periodiem
        </p>
      </div>
    </section>
  );
}
