"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

export default function FastWin() {
  const t = useTranslations("FastWin");
  const steps = (t.raw("steps") ?? []) as { num: string; title: string; desc: string }[];
  const cta = t("cta") as string;

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

  const stepColors = ["#C6FF3D", "#7FF6E0", "#a78bfa", "#C6FF3D", "#7FF6E0"];

  return (
    <section
      id="how"
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
        <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 900, height: 400, background: "radial-gradient(ellipse, color-mix(in oklab, var(--accent) 7%, transparent) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", top: "10%", right: "-5%", width: 400, height: 400, background: "radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 70%)", filter: "blur(60px)" }} />
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
            marginBottom: 80,
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
            <h2 style={{ fontSize: "clamp(36px, 5.5vw, 82px)", lineHeight: 1.06, letterSpacing: "-0.038em", fontWeight: 700, margin: 0, maxWidth: "14ch" }}>
              {t("titleA")}
              <span style={{ background: "linear-gradient(120deg, var(--accent), #7FF6E0 50%, var(--accent))", backgroundSize: "200% auto", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", fontStyle: "italic", fontFamily: "Fraunces, Georgia, serif", fontWeight: 500, animation: "gradient-shift 5s ease infinite" }}>
                {t("titleB")}
              </span>
            </h2>
          </div>
          <div style={{ paddingBottom: 8, display: "flex", flexDirection: "column", gap: 14 }}>
            <p style={{ fontSize: 17, color: "var(--ink-2)", maxWidth: 520, lineHeight: 1.65, margin: 0 }}>{t("lead1")}</p>
            <p style={{ fontSize: 17, color: "var(--ink-3)", maxWidth: 520, lineHeight: 1.65, margin: 0 }}>{t("lead2")}</p>
          </div>
        </div>

        {/* Steps */}
        <div
          className="lp-five-steps"
          style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 4, position: "relative" }}
        >
          {/* Connector line */}
          <div
            style={{
              position: "absolute",
              top: 36,
              left: "calc(10% + 16px)",
              right: "calc(10% + 16px)",
              height: 1,
              background: "linear-gradient(90deg, var(--accent), #7FF6E0, #a78bfa, #7FF6E0, var(--accent))",
              opacity: visible ? 0.3 : 0,
              transition: "opacity 0.8s ease 0.4s",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {steps.map((s, i) => {
            const color = stepColors[i] ?? "var(--accent)";
            const isFirst = i === 0;

            return (
              <div
                key={s.num}
                style={{
                  padding: "22px 20px 26px",
                  background: isFirst
                    ? `color-mix(in oklab, ${color} 8%, rgba(255,255,255,0.025))`
                    : "rgba(255,255,255,0.025)",
                  border: `1px solid ${isFirst ? `color-mix(in oklab, ${color} 30%, transparent)` : "rgba(255,255,255,0.07)"}`,
                  borderRadius: 20,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  position: "relative",
                  zIndex: 1,
                  backdropFilter: "blur(16px)",
                  transition:
                    "transform 0.28s cubic-bezier(0.215,0.61,0.355,1), border-color 0.28s ease, box-shadow 0.28s ease",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(28px)",
                  transitionDelay: `${0.1 + i * 0.08}s`,
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-6px)";
                  el.style.borderColor = `color-mix(in oklab, ${color} 35%, transparent)`;
                  el.style.boxShadow = `0 20px 48px -16px color-mix(in oklab, ${color} 20%, transparent)`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "";
                  el.style.boxShadow = "";
                  el.style.borderColor = isFirst
                    ? `color-mix(in oklab, ${color} 30%, transparent)`
                    : "rgba(255,255,255,0.07)";
                }}
              >
                {/* Accent top */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${color}, transparent)`, opacity: isFirst ? 1 : 0.4 }} />

                {/* Number */}
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 12,
                    background: isFirst ? color : `color-mix(in oklab, ${color} 12%, rgba(255,255,255,0.04))`,
                    border: isFirst ? "none" : `1px solid color-mix(in oklab, ${color} 25%, transparent)`,
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 13,
                    fontWeight: 700,
                    color: isFirst ? "#0A0A0A" : color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    boxShadow: isFirst ? `0 4px 16px color-mix(in oklab, ${color} 35%, transparent)` : "none",
                  }}
                >
                  {s.num}
                </div>

                <div>
                  <h4
                    style={{
                      fontSize: 14,
                      fontWeight: 700,
                      margin: "0 0 7px",
                      letterSpacing: "-0.01em",
                      color: "var(--ink)",
                      lineHeight: 1.25,
                    }}
                  >
                    {s.title}
                  </h4>
                  <p style={{ fontSize: 12.5, color: "var(--ink-3)", lineHeight: 1.55, margin: 0 }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 56,
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.6s",
          }}
        >
          <a
            href="#courses"
            className="btn-primary"
            style={{ textDecoration: "none", fontSize: 15, padding: "15px 32px" }}
          >
            {cta}
          </a>
        </div>
      </div>
    </section>
  );
}
