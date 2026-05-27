"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

export default function CTA() {
  const t = useTranslations("CTA");
  const bullets = ((t.raw("bullets") ?? []) as string[]);

  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      className="cta-section"
      style={{
        padding: "160px 0",
        borderTop: "1px solid var(--line)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* BIG background glow */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", bottom: "-10%", left: "50%", transform: "translateX(-50%)", width: 1200, height: 700, background: "radial-gradient(ellipse, color-mix(in oklab, var(--accent) 18%, transparent) 0%, transparent 65%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", top: "15%", left: "10%", width: 400, height: 400, background: "radial-gradient(circle, rgba(127,246,224,0.07) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", top: "20%", right: "8%", width: 350, height: 350, background: "radial-gradient(circle, rgba(167,139,250,0.07) 0%, transparent 70%)", filter: "blur(60px)" }} />
        {/* Grid overlay */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(198,255,61,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(198,255,61,0.03) 1px, transparent 1px)", backgroundSize: "72px 72px", maskImage: "radial-gradient(ellipse 70% 50% at 50% 100%, black 30%, transparent 100%)" }} />
      </div>

      {/* Image collage — 3 floating photos */}
      <div
        className="cta-img-row"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 16,
          margin: "0 auto 80px",
          maxWidth: 860,
          padding: "0 32px",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(32px)",
          transition: "all 0.7s cubic-bezier(0.215,0.61,0.355,1)",
        }}
      >
        {[
          { src: "https://images.unsplash.com/photo-1542435503-956c469947f6?w=600&auto=format&fit=crop&q=80", mt: 0, border: "rgba(198,255,61,0.15)" },
          { src: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=80", mt: 36, border: "rgba(127,246,224,0.15)" },
          { src: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&auto=format&fit=crop&q=80", mt: 0, border: "rgba(167,139,250,0.15)" },
        ].map((img, i) => (
          <div
            key={i}
            style={{
              aspectRatio: "1/1",
              borderRadius: 24,
              overflow: "hidden",
              border: `1px solid ${img.border}`,
              background: "var(--bg-2)",
              marginTop: img.mt,
              position: "relative",
              boxShadow: `0 24px 64px -20px rgba(0,0,0,0.6)`,
            }}
          >
            <img
              src={img.src}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              loading="lazy"
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(5,5,5,0.5) 0%, transparent 60%)" }} />
          </div>
        ))}
      </div>

      <div
        ref={ref}
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 32px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Kicker */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s cubic-bezier(0.215,0.61,0.355,1) 0.05s",
            marginBottom: 24,
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.15em", color: "var(--ink-3)", textTransform: "uppercase" as const }}>
            <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--accent)" }} />
            {t("kicker")}
            <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--accent)" }} />
          </span>
        </div>

        {/* Big heading */}
        <h2
          style={{
            fontSize: "clamp(56px, 9vw, 128px)",
            lineHeight: 1.03,
            letterSpacing: "-0.048em",
            fontWeight: 700,
            margin: "0 auto 30px",
            maxWidth: "13ch",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            transition: "all 0.65s cubic-bezier(0.215,0.61,0.355,1) 0.1s",
          }}
        >
          {t("titleA")}
          <span
            style={{
              background: "linear-gradient(120deg, var(--accent) 0%, #7FF6E0 40%, #a78bfa 70%, var(--accent) 100%)",
              backgroundSize: "300% auto",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              fontStyle: "italic",
              fontFamily: "Fraunces, Georgia, serif",
              fontWeight: 500,
              animation: "gradient-shift 6s ease infinite",
            }}
          >
            {t("titleB")}
          </span>
        </h2>

        {/* Sub */}
        <p
          style={{
            fontSize: 19,
            color: "var(--ink-2)",
            maxWidth: 520,
            margin: "0 auto 48px",
            lineHeight: 1.6,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s cubic-bezier(0.215,0.61,0.355,1) 0.18s",
          }}
        >
          {t("lead")}
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s cubic-bezier(0.215,0.61,0.355,1) 0.24s",
          }}
        >
          <a
            href="#pricing"
            className="btn-primary"
            style={{
              textDecoration: "none",
              fontSize: 16,
              padding: "17px 36px",
              borderRadius: 16,
              fontWeight: 700,
            }}
          >
            {t("ctaPrimary")}
          </a>
          <a
            href="#courses"
            className="btn-ghost"
            style={{
              textDecoration: "none",
              fontSize: 16,
              padding: "17px 32px",
              borderRadius: 16,
            }}
          >
            {t("ctaSecondary")}
          </a>
        </div>

        {/* Trust bullets */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 28,
            flexWrap: "wrap",
            marginTop: 44,
            fontSize: 13,
            color: "var(--ink-3)",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.35s",
          }}
        >
          {bullets.map((item) => (
            <span key={item} style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3">
                <polyline points="20,6 9,17 4,12" />
              </svg>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
