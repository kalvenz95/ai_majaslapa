"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

type BigStat = { v: string; suffix: string; l: string; accent?: boolean; accentPlus?: boolean };
type Quote = { tag: string; text: string; name: string; role: string; amt: string };

function getInitials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

const AVATAR_PALETTES = [
  { bg: "linear-gradient(135deg, rgba(198,255,61,0.25), rgba(198,255,61,0.08))", color: "#C6FF3D", border: "rgba(198,255,61,0.25)" },
  { bg: "linear-gradient(135deg, rgba(127,246,224,0.20), rgba(127,246,224,0.06))", color: "#7FF6E0", border: "rgba(127,246,224,0.22)" },
  { bg: "linear-gradient(135deg, rgba(167,139,250,0.22), rgba(167,139,250,0.07))", color: "#a78bfa", border: "rgba(167,139,250,0.22)" },
];

const CARD_ACCENTS = [
  { color: "#C6FF3D", border: "rgba(198,255,61,0.12)", glow: "rgba(198,255,61,0.12)" },
  { color: "#7FF6E0", border: "rgba(127,246,224,0.12)", glow: "rgba(127,246,224,0.12)" },
  { color: "#a78bfa", border: "rgba(167,139,250,0.12)", glow: "rgba(167,139,250,0.12)" },
];

function StarRow({ color }: { color: string }) {
  return (
    <div style={{ display: "flex", gap: 3, marginBottom: 18 }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={color} stroke="none">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const t = useTranslations("Testimonials");
  const bigStats = (t.raw("bigStats") ?? []) as BigStat[];
  const quotes = (t.raw("quotes") ?? []) as Quote[];

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
      id="results"
      className="lp-section"
      style={{
        padding: "140px 0",
        position: "relative",
        borderTop: "1px solid var(--line)",
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 900, height: 500, background: "radial-gradient(ellipse, color-mix(in oklab, var(--accent) 8%, transparent) 0%, transparent 65%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "-5%", width: 400, height: 400, background: "radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 70%)", filter: "blur(60px)" }} />
      </div>

      <div ref={ref} className="lp-container" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div
          className="lp-header-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "end",
            marginBottom: 0,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: "all 0.6s cubic-bezier(0.215,0.61,0.355,1)",
          }}
        >
          <div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.15em", color: "var(--ink-3)", textTransform: "uppercase" as const, marginBottom: 20 }}>
              <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--accent)" }} />
              {t("kicker")}
            </span>
            <h2 style={{ fontSize: "clamp(36px, 5.5vw, 82px)", lineHeight: 1.06, letterSpacing: "-0.038em", fontWeight: 700, margin: 0, maxWidth: "15ch" }}>
              {t("titleA")}
              <span style={{ background: "linear-gradient(120deg, var(--accent), #7FF6E0 50%, var(--accent))", backgroundSize: "200% auto", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", fontStyle: "italic", fontFamily: "Fraunces, Georgia, serif", fontWeight: 500, animation: "gradient-shift 5s ease infinite" }}>
                {t("titleB")}
              </span>
            </h2>
          </div>
          <div style={{ paddingBottom: 8 }}>
            <p style={{ fontSize: 17, color: "var(--ink-2)", maxWidth: 520, lineHeight: 1.65 }}>{t("lead")}</p>
          </div>
        </div>

        {/* Stats row */}
        <div
          className="lp-four-stats"
          style={{
            marginTop: 56,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            background: "rgba(255,255,255,0.02)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 24,
            overflow: "hidden",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.1s",
          }}
        >
          {bigStats.map((s, i) => (
            <div
              key={String(i)}
              style={{
                padding: "40px 32px",
                borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
                display: "flex",
                flexDirection: "column",
                gap: 12,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Accent top line */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${["#C6FF3D","#7FF6E0","#a78bfa","#C6FF3D"][i]}, transparent)` }} />

              <div className="lp-stat-num" style={{ fontSize: 56, fontWeight: 700, letterSpacing: "-0.048em", lineHeight: 1.0, fontVariantNumeric: "tabular-nums" }}>
                {s.accent ? <span style={{ color: "var(--accent)" }}>{s.v}</span> : s.v}
                <span style={{ fontSize: 26, color: "var(--ink-4)" }}>{s.suffix}</span>
                {s.accentPlus ? <span style={{ fontSize: 26, color: "var(--accent)" }}>+</span> : null}
              </div>
              <div style={{ fontSize: 13, color: "var(--ink-3)", lineHeight: 1.5 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Testimonial cards */}
        <div
          className="lp-three-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 48 }}
        >
          {quotes.map((q, idx) => {
            const av = AVATAR_PALETTES[idx % AVATAR_PALETTES.length];
            const ca = CARD_ACCENTS[idx % CARD_ACCENTS.length];

            return (
              <div
                key={q.name + q.role}
                style={{
                  padding: "30px",
                  border: `1px solid ${ca.border}`,
                  borderRadius: 24,
                  background: "rgba(255,255,255,0.025)",
                  backdropFilter: "blur(20px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 0,
                  transition: "transform 0.28s cubic-bezier(0.215,0.61,0.355,1), box-shadow 0.28s ease, border-color 0.28s ease",
                  position: "relative",
                  overflow: "hidden",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(32px)",
                  transitionDelay: `${0.2 + idx * 0.1}s`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-6px)";
                  el.style.borderColor = `color-mix(in oklab, ${ca.color} 30%, transparent)`;
                  el.style.boxShadow = `0 20px 56px -16px ${ca.glow}`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "";
                  el.style.borderColor = ca.border;
                  el.style.boxShadow = "";
                }}
              >
                {/* Top accent */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${ca.color}, transparent)` }} />

                {/* Stars */}
                <StarRow color={ca.color} />

                {/* Tag */}
                <span style={{
                  display: "inline-flex",
                  alignItems: "center",
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 10,
                  padding: "4px 10px",
                  borderRadius: 999,
                  background: `color-mix(in oklab, ${ca.color} 10%, transparent)`,
                  color: ca.color,
                  border: `1px solid color-mix(in oklab, ${ca.color} 22%, transparent)`,
                  marginBottom: 18,
                  alignSelf: "flex-start",
                  fontWeight: 700,
                  letterSpacing: "0.07em",
                }}>
                  {q.tag}
                </span>

                {/* Quote */}
                <p style={{ fontSize: 15, color: "var(--ink)", lineHeight: 1.7, margin: "0 0 26px", fontWeight: 400 }}>
                  "{q.text}"
                </p>

                {/* Footer */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: 999,
                      background: av.bg,
                      border: `1px solid ${av.border}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      fontWeight: 700,
                      color: av.color,
                      flexShrink: 0,
                    }}>
                      {getInitials(q.name)}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>{q.name}</div>
                      <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 2 }}>{q.role}</div>
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: ca.color, letterSpacing: "-0.025em", flexShrink: 0 }}>
                    {q.amt}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
