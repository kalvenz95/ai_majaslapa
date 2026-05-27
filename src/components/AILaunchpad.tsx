"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

type CardCopy = {
  label: string;
  range: string;
  desc: string;
  color?: string;
};

export default function AILaunchpad() {
  const t = useTranslations("AILaunchpad");
  const cardColors = ["#C6FF3D", "#7FF6E0", "#a78bfa"];
  const cards = ((t.raw("cards") ?? []) as CardCopy[]).map((c, i) => ({
    ...c,
    color: c.color ?? cardColors[i] ?? "#C6FF3D",
  }));

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
      style={{
        padding: "140px 0",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid var(--line)",
      }}
    >
      {/* Background */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", width: 1000, height: 500, background: "radial-gradient(ellipse, rgba(127,246,224,0.06) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: 0, left: "-5%", width: 500, height: 400, background: "radial-gradient(circle, color-mix(in oklab, var(--accent) 7%, transparent) 0%, transparent 70%)", filter: "blur(80px)" }} />
      </div>

      <div ref={ref} style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div
          style={{
            marginBottom: 80,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: "all 0.6s cubic-bezier(0.215,0.61,0.355,1)",
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.15em", color: "var(--ink-3)", textTransform: "uppercase" as const, marginBottom: 20 }}>
            <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--accent)" }} />
            Ienākumi
          </span>
          <h2 style={{ fontSize: "clamp(40px, 6vw, 88px)", lineHeight: 1.05, letterSpacing: "-0.038em", fontWeight: 700, margin: "0 0 24px", maxWidth: "15ch" }}>
            {t("titleA")}
            <span style={{ background: "linear-gradient(120deg, var(--accent), #7FF6E0 50%, var(--accent))", backgroundSize: "200% auto", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", fontStyle: "italic", fontFamily: "Fraunces, Georgia, serif", fontWeight: 500, animation: "gradient-shift 5s ease infinite" }}>
              {t("titleB")}
            </span>
          </h2>

          <div style={{ display: "flex", alignItems: "flex-start", gap: 12, maxWidth: 680 }}>
            <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--accent)", marginTop: 10, flexShrink: 0 }} />
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 13, letterSpacing: "0.04em", color: "var(--ink-2)", lineHeight: 1.65 }}>
              {t("kicker")}
            </span>
          </div>
        </div>

        {/* Income cards — large horizontal */}
        <div
          className="lp-three-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}
        >
          {cards.map((item, i) => (
            <div
              key={`${item.label}-${i}`}
              style={{
                padding: "36px 32px",
                borderRadius: 24,
                background: "rgba(255,255,255,0.025)",
                backdropFilter: "blur(20px)",
                border: `1px solid color-mix(in oklab, ${item.color} 18%, transparent)`,
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.3s cubic-bezier(0.215,0.61,0.355,1), box-shadow 0.3s ease",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transitionDelay: `${0.1 + i * 0.12}s`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(-6px)";
                el.style.boxShadow = `0 24px 64px -16px color-mix(in oklab, ${item.color} 22%, transparent)`;
                el.style.borderColor = `color-mix(in oklab, ${item.color} 35%, transparent)`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "";
                el.style.boxShadow = "";
                el.style.borderColor = `color-mix(in oklab, ${item.color} 18%, transparent)`;
              }}
            >
              {/* Ambient glow bg */}
              <div style={{ position: "absolute", top: 0, right: 0, width: 220, height: 220, background: `radial-gradient(circle, color-mix(in oklab, ${item.color} 10%, transparent) 0%, transparent 70%)`, filter: "blur(40px)", pointerEvents: "none" }} />

              {/* Top line */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${item.color}, transparent)` }} />

              <div style={{ position: "relative", zIndex: 1 }}>
                {/* Label */}
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: item.color, textTransform: "uppercase" as const, letterSpacing: "0.12em", marginBottom: 20, fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 5, height: 5, borderRadius: 999, background: item.color, display: "inline-block" }} />
                  {item.label}
                </div>

                {/* Income range */}
                <div style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, letterSpacing: "-0.04em", color: item.color, lineHeight: 1, marginBottom: 8, fontFamily: "Inter Tight, sans-serif" }}>
                  {item.range}
                </div>

                <div style={{ fontSize: 13, color: "var(--ink-3)", marginBottom: 20, fontFamily: "JetBrains Mono, monospace" }}>
                  {t("perMonth")}
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: `color-mix(in oklab, ${item.color} 12%, transparent)`, marginBottom: 20 }} />

                <div style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div
          style={{
            marginTop: 24,
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.5s",
          }}
        >
          <p style={{ fontSize: 11, color: "var(--ink-4)", fontFamily: "JetBrains Mono, monospace", lineHeight: 1.7 }}>
            {t("footer")}
          </p>
        </div>
      </div>
    </section>
  );
}
