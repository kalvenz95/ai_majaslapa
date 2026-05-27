"use client";
import { useEffect, useRef, useState } from "react";

const features = [
  { color: "#C6FF3D", icon: "✦", title: "Nav nepieciešama programmēšana", desc: "Visas apmācības ir veidotas saprotamā valodā bez tehniskiem terminiem" },
  { color: "#7FF6E0", icon: "◈", title: "Soli pa solim struktūra", desc: "Skaidra secība no nulles līdz gatavam pakalpojumam" },
  { color: "#a78bfa", icon: "◆", title: "Praktiski piemēri", desc: "Reāli uzdevumi un projekti, ko vari uzreiz pielietot darbā" },
];

export default function EasyStart() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      style={{
        padding: "140px 0",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid var(--line)",
      }}
    >
      {/* Background */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 900, height: 600, background: "radial-gradient(ellipse, color-mix(in oklab, var(--accent) 5%, transparent) 0%, transparent 70%)", filter: "blur(80px)" }} />
      </div>

      <div
        ref={sectionRef}
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 32px",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: 80,
            alignItems: "center",
          }}
          className="lp-easy-grid"
        >
          {/* Left — text */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(28px)",
              transition: "all 0.65s cubic-bezier(0.215,0.61,0.355,1)",
            }}
          >
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 999, background: "color-mix(in oklab, var(--accent) 10%, transparent)", border: "1px solid color-mix(in oklab, var(--accent) 25%, transparent)", fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.12em", color: "var(--accent)", textTransform: "uppercase" as const, fontWeight: 700, marginBottom: 28 }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--accent)", animation: "flicker 1.6s ease-in-out infinite" }} />
              Sāc bez tehniskām zināšanām
            </span>

            <h2
              style={{
                fontSize: "clamp(36px, 5vw, 76px)",
                lineHeight: 1.08,
                letterSpacing: "-0.038em",
                fontWeight: 700,
                margin: "0 0 28px",
                maxWidth: "14ch",
              }}
            >
              Nav jābūt{" "}
              <span
                style={{
                  background: "linear-gradient(120deg, var(--accent), #7FF6E0)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  fontStyle: "italic",
                  fontFamily: "Fraunces, Georgia, serif",
                  fontWeight: 500,
                }}
              >
                tehniskam,
              </span>
              {" "}lai sāktu
            </h2>

            <p style={{ fontSize: 17, color: "var(--ink-2)", lineHeight: 1.7, marginBottom: 16 }}>
              Nav nepieciešamas programmēšanas vai sarežģītas datorprasmes. Apmācība ir veidota{" "}
              <span style={{ color: "var(--accent)", fontWeight: 600 }}>soli pa solim</span>
              {" "}— vari sekot līdzi un uzreiz pielietot.
            </p>
            <p style={{ fontSize: 17, color: "var(--ink-3)", lineHeight: 1.7, marginBottom: 40 }}>
              Tu apgūsti prasmes, kuras jau šobrīd tiek izmantotas uzņēmumos.
            </p>

            <a
              href="#pricing"
              className="btn-primary"
              style={{ textDecoration: "none", fontSize: 15, padding: "15px 30px" }}
            >
              Pievienoties platformai →
            </a>
          </div>

          {/* Right — feature cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {features.map((f, i) => (
              <div
                key={f.title}
                style={{
                  padding: "24px 28px",
                  borderRadius: 20,
                  background: "rgba(255,255,255,0.025)",
                  backdropFilter: "blur(20px)",
                  border: `1px solid color-mix(in oklab, ${f.color} 15%, transparent)`,
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 20,
                  transition: "transform 0.28s cubic-bezier(0.215,0.61,0.355,1), box-shadow 0.28s ease, border-color 0.28s ease",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(28px)",
                  transitionDelay: `${0.15 + i * 0.1}s`,
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateX(6px)";
                  el.style.borderColor = `color-mix(in oklab, ${f.color} 35%, transparent)`;
                  el.style.boxShadow = `0 12px 40px -12px color-mix(in oklab, ${f.color} 20%, transparent)`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "";
                  el.style.borderColor = `color-mix(in oklab, ${f.color} 15%, transparent)`;
                  el.style.boxShadow = "";
                }}
              >
                {/* Left border accent */}
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: `linear-gradient(180deg, ${f.color}, transparent)`, borderRadius: "20px 0 0 20px" }} />

                {/* Icon */}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    background: `color-mix(in oklab, ${f.color} 12%, transparent)`,
                    border: `1px solid color-mix(in oklab, ${f.color} 22%, transparent)`,
                    color: f.color,
                    flexShrink: 0,
                  }}
                >
                  {f.icon}
                </div>

                <div>
                  <h4 style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.01em", margin: "0 0 6px" }}>
                    {f.title}
                  </h4>
                  <p style={{ fontSize: 13.5, color: "var(--ink-3)", lineHeight: 1.55, margin: 0 }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
