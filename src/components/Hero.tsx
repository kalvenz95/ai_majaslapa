"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";

const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;
/** ease-in-out cubic — continuous on-screen motion */
const EASE_IN_OUT = [0.645, 0.045, 0.355, 1] as const;

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

function HeroFloatLayer({
  style,
  children,
  delay = 0,
  duration = 5.5,
  amplitude = 10,
}: {
  style: CSSProperties;
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  amplitude?: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      style={{ position: "absolute", ...style }}
      animate={reduceMotion ? undefined : { y: [0, -amplitude, 0] }}
      transition={{
        duration,
        repeat: Infinity,
        ease: EASE_IN_OUT,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const t = useTranslations("Hero");

  return (
    <header style={{ padding: "96px 0 80px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 60% 50% at 80% 20%, color-mix(in oklab, var(--accent) 18%, transparent), transparent 60%), radial-gradient(ellipse 50% 50% at 10% 80%, color-mix(in oklab, var(--accent) 8%, transparent), transparent 60%)" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 64, alignItems: "center" }} className="hero-grid-responsive">
          {/* Left */}
          <motion.div
            initial={reduceMotion ? false : "hidden"}
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
              style={{ fontSize: "clamp(48px, 8.5vw, 124px)", lineHeight: 1.05, letterSpacing: "-0.045em", fontWeight: 600, margin: "0 0 28px", maxWidth: "14ch" }}
            >
              {t("h1Line1")}
              <span style={{ color: "var(--accent)", fontFamily: "Inter Tight, sans-serif", fontWeight: 600 }}>
                {t("h1Gradient")}
              </span>
              {t("h1Line2")}
            </motion.h1>

            <motion.p
              variants={fadeUpItem}
              style={{ fontSize: 19, lineHeight: 1.55, color: "var(--ink-2)", maxWidth: 560 }}
            >
              {t("sub")}
            </motion.p>

            <motion.div variants={fadeUpItem} style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 36 }}>
              <a href="#pricing" className="btn-primary" style={{ textDecoration: "none" }}>{t("ctaPrimary")}</a>
              <a href="#how" className="btn-ghost" style={{ textDecoration: "none" }}>{t("ctaSecondary")}</a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUpItem}
              className="hero-stats-grid"
              style={{ marginTop: 64, paddingTop: 28, borderTop: "1px solid var(--line)", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}
            >
              <div>
                <div style={{ fontSize: 44, fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1 }}>{t("stat1Val")}</div>
                <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 10, lineHeight: 1.4 }}>{t("stat1Label")}</div>
              </div>
              <div>
                <div style={{ fontSize: 44, fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1 }}>
                  <span style={{ color: "var(--accent)" }}>{t("stat2Val")}</span><span style={{ fontSize: 24, color: "var(--ink-3)" }}>{t("stat2Percent")}</span>
                </div>
                <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 10, lineHeight: 1.4 }}>{t("stat2Label")}</div>
              </div>
              <div>
                <div style={{ fontSize: 44, fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1 }}>
                  350<span style={{ fontSize: 24, color: "var(--accent)" }}>+</span>
                </div>
                <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 10, lineHeight: 1.4 }}>{t("stat3Label")}</div>
              </div>
              <div>
                <div style={{ fontSize: 44, fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1 }}>{t("stat4Val")}</div>
                <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 10, lineHeight: 1.4 }}>{t("stat4Label")}</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: image collage */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.15 }}
            className="hero-img-col"
            style={{ position: "relative", aspectRatio: "1/1", marginTop: 48 }}
          >
            {/* Card 1 */}
            <HeroFloatLayer
              duration={5.8}
              amplitude={11}
              delay={0}
              style={{ left: "5%", top: 0, width: "62%", aspectRatio: "4 / 5", zIndex: 2 }}
            >
              <div style={{ width: "100%", height: "100%", borderRadius: 24, overflow: "hidden", border: "1px solid var(--line-2)", boxShadow: "0 16px 48px -12px rgba(0,0,0,0.12), 0 4px 16px -4px rgba(0,0,0,0.07)", transform: "rotate(-2.5deg)", background: "var(--bg-2)" }}>
                <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=900&auto=format&fit=crop&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
              </div>
            </HeroFloatLayer>
            {/* Card 2 */}
            <HeroFloatLayer
              duration={6.4}
              amplitude={14}
              delay={0.85}
              style={{ right: 0, top: "18%", width: "50%", aspectRatio: "1 / 1", zIndex: 3 }}
            >
              <div style={{ width: "100%", height: "100%", borderRadius: 24, overflow: "hidden", border: "1px solid var(--line-2)", boxShadow: "0 16px 48px -12px rgba(0,0,0,0.12), 0 4px 16px -4px rgba(0,0,0,0.07)", transform: "rotate(3deg)", background: "var(--bg-2)" }}>
                <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&auto=format&fit=crop&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
              </div>
            </HeroFloatLayer>
            {/* Card 3 */}
            <HeroFloatLayer
              duration={5.2}
              amplitude={9}
              delay={1.65}
              style={{ left: "18%", bottom: 0, width: "48%", aspectRatio: "4 / 3", zIndex: 4 }}
            >
              <div style={{ width: "100%", height: "100%", borderRadius: 24, overflow: "hidden", border: "1px solid var(--line-2)", boxShadow: "0 16px 48px -12px rgba(0,0,0,0.12), 0 4px 16px -4px rgba(0,0,0,0.07)", transform: "rotate(-1.5deg)", background: "var(--bg-2)" }}>
                <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&auto=format&fit=crop&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
              </div>
            </HeroFloatLayer>
            {/* Floating tag 1 */}
            <HeroFloatLayer duration={4.8} amplitude={6} delay={0.35} style={{ top: "8%", right: "-2%", zIndex: 10 }}>
              <div style={{ background: "white", border: "1px solid var(--line-2)", borderRadius: 14, padding: "10px 14px", fontSize: 12, fontWeight: 500, display: "flex", alignItems: "center", gap: 8, boxShadow: "0 6px 20px -6px rgba(0,0,0,0.10)" }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--accent)", flexShrink: 0 }} />
                {t("floatTag1")}
              </div>
            </HeroFloatLayer>
            {/* Floating tag 2 */}
            <HeroFloatLayer duration={5.4} amplitude={7} delay={1.1} style={{ bottom: "12%", left: "-4%", zIndex: 10 }}>
              <div style={{ background: "white", border: "1px solid var(--line-2)", borderRadius: 14, padding: "10px 14px", fontSize: 12, fontWeight: 500, display: "flex", alignItems: "center", gap: 8, boxShadow: "0 6px 20px -6px rgba(0,0,0,0.10)" }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--accent)", flexShrink: 0 }} />
                {t("floatTag2")}
              </div>
            </HeroFloatLayer>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
