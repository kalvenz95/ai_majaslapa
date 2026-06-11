"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useHasMounted } from "@/hooks/useHasMounted";

const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

const staggerParent = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.02 } },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};

export default function Hero() {
  const hasMounted = useHasMounted();
  const reduceMotion = useReducedMotion();
  const skipMotion = hasMounted && reduceMotion;
  const t = useTranslations("Hero");
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 860);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <header style={{ padding: "100px 0 0", position: "relative", overflow: "hidden", background: "var(--bg)" }}>
      {/* Atmospheric depth — layered accent radial washes + faint dot grid */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(46% 48% at 8% -8%, color-mix(in oklab, var(--accent) 16%, transparent), transparent 60%)," +
            "radial-gradient(40% 42% at 100% 0%, color-mix(in oklab, var(--accent-2) 12%, transparent), transparent 62%)," +
            "radial-gradient(50% 60% at 78% 110%, color-mix(in oklab, var(--accent-3) 10%, transparent), transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="dot-grid"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          opacity: 0.4,
          maskImage: "radial-gradient(70% 60% at 50% 25%, #000 0%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(70% 60% at 50% 25%, #000 0%, transparent 75%)",
        }}
      />
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }}>
        <div
          style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.15fr 0.85fr", gap: 48, alignItems: "center" }}
        >
          {/* Left */}
          <motion.div
            initial={skipMotion ? false : "hidden"}
            animate="visible"
            variants={staggerParent}
          >
            {/* Badge */}
            <motion.span
              variants={fadeUpItem}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "6px 14px 6px 6px",
                background: "color-mix(in oklab, var(--accent) 10%, transparent)",
                border: "1px solid color-mix(in oklab, var(--accent) 28%, transparent)",
                borderRadius: 999, fontSize: 12, color: "var(--ink)", fontWeight: 500,
                marginBottom: 28,
              }}
            >
              <span style={{
                background: "var(--accent)", color: "#fff",
                padding: "3px 9px", borderRadius: 999,
                fontFamily: "Inter Tight, sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em",
              }}>
                {t("badgeRegion")}
              </span>
              {t("badgeLine")}
            </motion.span>

            {/* H1 */}
            <motion.h1
              variants={fadeUpItem}
              className="h-display"
              style={{
                fontSize: "clamp(48px, 8vw, 92px)",
                lineHeight: 1.02,
                margin: "0 0 24px",
                maxWidth: "13ch",
                color: "var(--ink)",
              }}
            >
              {t("h1Line1")}
              <span style={{ color: "var(--accent)" }}>{t("h1Gradient")}</span>
              {t("h1Line2")}
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={fadeUpItem}
              style={{ fontSize: 18, lineHeight: 1.65, color: "var(--ink-3)", maxWidth: 500, marginBottom: 36 }}
            >
              {t("sub")}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUpItem} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="#pricing" className="btn-primary" style={{ textDecoration: "none", fontSize: 16, padding: "16px 28px", borderRadius: 14 }}>
                {t("ctaPrimary")}
              </a>
              <a href="#courses" className="btn-ghost" style={{ textDecoration: "none", fontSize: 16, padding: "16px 24px", borderRadius: 14 }}>
                {t("ctaSecondary")}
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUpItem}
              className="hero-stats-grid"
              style={{
                marginTop: 52, paddingTop: 28, borderTop: "1px solid var(--line)",
                display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20,
              }}
            >
              {[
                { val: t("stat3Val") + "+", label: t("stat3Label") },
                { val: "3", label: t("stat1Label") },
                { val: "100%", label: t("stat2Label") },
                { val: t("stat4Val"), label: t("stat4Label") },
              ].map((s, i) => (
                <div key={i}>
                  <div style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1, fontFamily: "Inter Tight, sans-serif", color: i === 0 ? "var(--accent)" : "var(--ink)" }}>
                    {s.val}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 8, lineHeight: 1.4 }}>{s.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: single clean image */}
          {!isMobile && (
            <motion.div
              initial={skipMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.2 }}
              className="hero-img-col"
              style={{ position: "relative" }}
            >
              <div style={{
                borderRadius: 28,
                overflow: "hidden",
                border: "1px solid var(--line-2)",
                boxShadow: "0 32px 80px -20px rgba(17,17,17,0.14), 0 8px 24px -8px rgba(17,17,17,0.07)",
                aspectRatio: "4/3",
                background: "var(--bg-2)",
              }}>
                <img
                  src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1000&auto=format&fit=crop&q=80"
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  loading="eager"
                />
              </div>
              {/* Single floating tag */}
              <div style={{
                position: "absolute", bottom: -16, left: 24,
                background: "#fff", border: "1px solid var(--line-2)",
                borderRadius: 16, padding: "14px 18px",
                boxShadow: "0 12px 36px -12px rgba(17,17,17,0.14)",
                display: "flex", alignItems: "center", gap: 12, zIndex: 2,
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: "color-mix(in oklab, var(--accent) 12%, transparent)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                }}>🎯</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.01em" }}>
                    {t("floatTag2")}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--ink-3)" }}>AI pakalpojumi</div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom wave / section separator */}
      <div style={{ height: 80, background: `linear-gradient(to bottom, var(--bg) 0%, var(--bg) 100%)`, marginTop: 80 }} />
    </header>
  );
}
