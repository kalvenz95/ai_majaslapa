"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useHasMounted } from "@/hooks/useHasMounted";

const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

const staggerParent = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.04 },
  },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.52, ease: EASE_OUT },
  },
};

const featureVariant = {
  hidden: { opacity: 0, x: 28 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.48, ease: EASE_OUT, delay: i * 0.1 + 0.2 },
  }),
};

function IconBriefcase() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
      <line x1="12" y1="12" x2="12" y2="12.01" />
    </svg>
  );
}

function IconCpu() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="2" x2="9" y2="4" /><line x1="15" y1="2" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="22" /><line x1="15" y1="20" x2="15" y2="22" />
      <line x1="2" y1="9" x2="4" y2="9" /><line x1="2" y1="15" x2="4" y2="15" />
      <line x1="20" y1="9" x2="22" y2="9" /><line x1="20" y1="15" x2="22" y2="15" />
    </svg>
  );
}

function IconShieldOff() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
  );
}

function IconTrendingUp() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

const ICONS = [IconBriefcase, IconCpu, IconShieldOff, IconTrendingUp];

export default function Hero() {
  const hasMounted = useHasMounted();
  const reduceMotion = useReducedMotion();
  const skipMotion = hasMounted && reduceMotion;
  const t = useTranslations("Hero");

  const features = [
    { num: "01", title: t("feat1Title"), desc: t("feat1Desc") },
    { num: "02", title: t("feat2Title"), desc: t("feat2Desc") },
    { num: "03", title: t("feat3Title"), desc: t("feat3Desc") },
    { num: "04", title: t("feat4Title"), desc: t("feat4Desc") },
  ];

  return (
    <header style={{ padding: "120px 0 96px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 60% 50% at 80% 20%, color-mix(in oklab, var(--accent) 18%, transparent), transparent 60%), radial-gradient(ellipse 50% 50% at 10% 80%, color-mix(in oklab, var(--accent) 8%, transparent), transparent 60%)" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 72, alignItems: "center" }} className="hero-grid-responsive">

          {/* Left — text */}
          <motion.div
            initial={skipMotion ? false : "hidden"}
            animate="visible"
            variants={staggerParent}
          >
            <motion.span
              variants={fadeUpItem}
              style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 14px 6px 6px", background: "color-mix(in oklab, var(--accent) 12%, transparent)", border: "1px solid color-mix(in oklab, var(--accent) 35%, transparent)", borderRadius: 999, fontSize: 12, color: "var(--ink)", fontWeight: 500, marginBottom: 28 }}
            >
              <span style={{ background: "var(--accent)", color: "var(--accent-ink)", padding: "3px 9px", borderRadius: 999, fontFamily: "Inter Tight, sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em" }}>{t("badgeRegion")}</span>
              {t("badgeLine")}
            </motion.span>

            <motion.h1
              variants={fadeUpItem}
              style={{ fontSize: "clamp(36px, 5.5vw, 72px)", lineHeight: 1.07, letterSpacing: "-0.04em", fontWeight: 700, margin: "0 0 24px", maxWidth: "16ch" }}
            >
              {t("h1Line1")}
              <span style={{ color: "var(--accent)", fontFamily: "Inter Tight, sans-serif", fontWeight: 700 }}>
                {t("h1Gradient")}
              </span>
              {t("h1Line2")}
            </motion.h1>

            <motion.p
              variants={fadeUpItem}
              style={{ fontSize: 18, lineHeight: 1.6, color: "var(--ink-2)", maxWidth: 520, margin: "0 0 36px" }}
            >
              {t("sub")}
            </motion.p>

            <motion.div variants={fadeUpItem} style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href="#pricing" className="btn-primary" style={{ textDecoration: "none" }}>{t("ctaPrimary")}</a>
              <a href="#how" className="btn-ghost" style={{ textDecoration: "none" }}>{t("ctaSecondary")}</a>
            </motion.div>
          </motion.div>

          {/* Right — feature bullets */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }} className="hero-features-col">
            {features.map((f, i) => {
              const Icon = ICONS[i];
              return (
                <motion.div
                  key={i}
                  custom={i}
                  initial={skipMotion ? false : "hidden"}
                  animate="visible"
                  variants={featureVariant}
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 20,
                    padding: "22px 24px",
                    background: "var(--bg-2)",
                    borderRadius: 18,
                    border: "1px solid var(--line)",
                    overflow: "hidden",
                  }}
                >
                  {/* large faded number */}
                  <span style={{
                    position: "absolute",
                    right: 18,
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: 64,
                    fontWeight: 800,
                    letterSpacing: "-0.06em",
                    lineHeight: 1,
                    color: "color-mix(in oklab, var(--accent) 10%, transparent)",
                    pointerEvents: "none",
                    userSelect: "none",
                    fontFamily: "Inter Tight, sans-serif",
                  }}>{f.num}</span>

                  {/* icon block */}
                  <div style={{
                    width: 52,
                    height: 52,
                    flexShrink: 0,
                    borderRadius: 14,
                    background: "color-mix(in oklab, var(--accent) 14%, transparent)",
                    border: "1px solid color-mix(in oklab, var(--accent) 30%, transparent)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--accent)",
                  }}>
                    <Icon />
                  </div>

                  {/* text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 5, letterSpacing: "-0.02em", lineHeight: 1.2 }}>{f.title}</div>
                    <div style={{ fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.55 }}>{f.desc}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </header>
  );
}
