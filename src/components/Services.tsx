"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

type TrackCopy = {
  num: string;
  level: string;
  badge?: string;
  title: string;
  desc: string;
  skills: string[];
  earn: string;
  earnSuffix: string;
  cta?: string;
  link: string;
  img?: string;
};

/* Premium AI-themed images per track */
const DEFAULT_IMGS = [
  "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=1200&auto=format&fit=crop&q=85",
  "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&auto=format&fit=crop&q=85",
  "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=85",
];

const CARD_ACCENTS = [
  { border: "rgba(198,255,61,0.20)", glow: "rgba(198,255,61,0.14)", top: "#C6FF3D" },
  { border: "rgba(127,246,224,0.20)", glow: "rgba(127,246,224,0.14)", top: "#7FF6E0" },
  { border: "rgba(167,139,250,0.20)", glow: "rgba(167,139,250,0.14)", top: "#a78bfa" },
];

export default function Services() {
  const t = useTranslations("Services");
  const tracksRaw = ((t.raw("tracks") ?? []) as TrackCopy[]).map((tr, idx) => ({
    ...tr,
    img: tr.img ?? DEFAULT_IMGS[idx],
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
      id="courses"
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
        <div style={{ position: "absolute", top: "0%", right: "-10%", width: 600, height: 600, background: "radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "0%", left: "-5%", width: 500, height: 500, background: "radial-gradient(circle, color-mix(in oklab, var(--accent) 8%, transparent) 0%, transparent 70%)", filter: "blur(80px)" }} />
      </div>

      <div className="lp-container" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div
          className="lp-header-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "end",
            marginBottom: 72,
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
            <h2 style={{ fontSize: "clamp(40px, 6vw, 88px)", lineHeight: 1.04, letterSpacing: "-0.038em", fontWeight: 700, margin: 0, maxWidth: "13ch" }}>
              {t("titleA")}
              <span style={{ background: "linear-gradient(120deg, var(--accent), #7FF6E0 50%, var(--accent))", backgroundSize: "200% auto", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", fontStyle: "italic", fontFamily: "Fraunces, Georgia, serif", fontWeight: 500, animation: "gradient-shift 5s ease infinite" }}>
                {t("titleB")}
              </span>
            </h2>
          </div>
          <div style={{ paddingBottom: 8 }}>
            <p style={{ fontSize: 18, color: "var(--ink-2)", maxWidth: 560, lineHeight: 1.65 }}>{t("lead")}</p>
          </div>
        </div>

        {/* Cards */}
        <div
          ref={ref}
          className="lp-three-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}
        >
          {tracksRaw.map((tr, idx) => {
            const accent = CARD_ACCENTS[idx % CARD_ACCENTS.length];

            return (
              <article
                key={tr.title}
                style={{
                  border: `1px solid ${accent.border}`,
                  borderRadius: 28,
                  background: "rgba(255,255,255,0.025)",
                  backdropFilter: "blur(20px)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  transition: "transform 0.3s cubic-bezier(0.215,0.61,0.355,1), box-shadow 0.3s ease, border-color 0.3s ease",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(40px)",
                  transitionDelay: `${0.1 + idx * 0.12}s`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-8px)";
                  el.style.boxShadow = `0 28px 72px -20px ${accent.glow}, 0 0 0 1px ${accent.border}`;
                  el.style.borderColor = accent.border.replace("0.20", "0.40");
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "";
                  el.style.boxShadow = "";
                  el.style.borderColor = accent.border;
                }}
              >
                {/* Top accent bar */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${accent.top}, transparent)`, zIndex: 3 }} />

                {/* Image */}
                <div style={{ aspectRatio: "16/9", position: "relative", overflow: "hidden", background: "var(--bg-3)", flexShrink: 0 }}>
                  <img
                    src={tr.img}
                    alt=""
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
                    loading="lazy"
                    onMouseEnter={(e) => { (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLImageElement).style.transform = ""; }}
                  />
                  {/* Gradient overlay */}
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,5,5,0.85) 0%, rgba(5,5,5,0.2) 55%, transparent 100%)" }} />
                  {/* Color tint */}
                  <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${accent.top}18 0%, transparent 60%)` }} />
                  {/* Track number */}
                  <span style={{ position: "absolute", top: 16, left: 16, zIndex: 2, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(12px)", color: "white", fontFamily: "JetBrains Mono, monospace", fontSize: 11, padding: "5px 10px", borderRadius: 999, letterSpacing: "0.08em", fontWeight: 700 }}>
                    {tr.num}
                  </span>
                </div>

                {/* Content */}
                <div style={{ padding: "24px 26px 28px", flex: 1, display: "flex", flexDirection: "column", gap: 0 }}>
                  {/* Badge */}
                  {tr.badge && (
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      padding: "4px 12px",
                      borderRadius: 999,
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase" as const,
                      fontFamily: "JetBrains Mono, monospace",
                      background: `color-mix(in oklab, ${accent.top} 12%, transparent)`,
                      color: accent.top,
                      border: `1px solid color-mix(in oklab, ${accent.top} 25%, transparent)`,
                      alignSelf: "flex-start",
                      marginBottom: 14,
                    }}>
                      {tr.badge}
                    </span>
                  )}

                  <h3 style={{ fontSize: 22, letterSpacing: "-0.025em", fontWeight: 700, margin: "0 0 8px", lineHeight: 1.15, color: "var(--ink)" }}>
                    {tr.title}
                  </h3>

                  <p style={{ fontSize: 14, color: "var(--ink-3)", lineHeight: 1.55, margin: "0 0 20px" }}>
                    {tr.desc}
                  </p>

                  {/* Income */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 22,
                    padding: "12px 16px",
                    background: `color-mix(in oklab, ${accent.top} 6%, rgba(255,255,255,0.02))`,
                    borderRadius: 12,
                    border: `1px solid color-mix(in oklab, ${accent.top} 18%, transparent)`,
                  }}>
                    <span style={{ fontSize: 22, fontWeight: 700, color: accent.top, letterSpacing: "-0.03em" }}>{tr.earn}</span>
                    <span style={{ fontSize: 12, color: "var(--ink-3)", fontFamily: "JetBrains Mono, monospace" }}>{tr.earnSuffix}</span>
                  </div>

                  {/* Skills */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 26 }}>
                    {tr.skills.map((s) => (
                      <div key={s} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <svg style={{ flexShrink: 0, marginTop: 3 }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={accent.top} strokeWidth="3">
                          <polyline points="20,6 9,17 4,12" />
                        </svg>
                        <span style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.45 }}>{s}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href={tr.link}
                    style={{
                      marginTop: "auto",
                      display: "block",
                      textAlign: "center",
                      textDecoration: "none",
                      padding: "13px 16px",
                      borderRadius: 14,
                      fontSize: 14,
                      fontWeight: 700,
                      letterSpacing: "-0.01em",
                      background: `color-mix(in oklab, ${accent.top} 14%, transparent)`,
                      color: accent.top,
                      border: `1px solid color-mix(in oklab, ${accent.top} 30%, transparent)`,
                      transition: "background 0.2s ease, box-shadow 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.background = accent.top;
                      el.style.color = "#0A0A0A";
                      el.style.boxShadow = `0 8px 28px -8px ${accent.glow}`;
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement;
                      el.style.background = `color-mix(in oklab, ${accent.top} 14%, transparent)`;
                      el.style.color = accent.top;
                      el.style.boxShadow = "";
                    }}
                  >
                    {tr.cta ?? t("viewCourse")}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
