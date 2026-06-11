"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useHasMounted } from "@/hooks/useHasMounted";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { EmojiIcon } from "@/components/EmojiIcon";
import { Check, Play, Lock } from "lucide-react";
import { Magnetic } from "@/components/Magnetic";

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
      {/* Atmospheric depth — animated aurora washes + faint dot grid */}
      <div
        aria-hidden
        className="hero-aurora"
        style={{
          position: "absolute",
          inset: "-10%",
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
              <Magnetic>
                <a href="#pricing" className="btn-primary" style={{ textDecoration: "none", fontSize: 16, padding: "16px 28px", borderRadius: 14 }}>
                  {t("ctaPrimary")}
                </a>
              </Magnetic>
              <Magnetic>
                <a href="#courses" className="btn-ghost" style={{ textDecoration: "none", fontSize: 16, padding: "16px 24px", borderRadius: 14 }}>
                  {t("ctaSecondary")}
                </a>
              </Magnetic>
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
                  <AnimatedNumber
                    value={s.val}
                    style={{ display: "block", fontSize: 34, fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1, fontFamily: "Inter Tight, sans-serif", color: i === 0 ? "var(--accent)" : "var(--ink)" }}
                  />
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
              {/* Product preview — stylised course dashboard in a browser frame */}
              <div className="float-soft" style={{
                borderRadius: 20,
                overflow: "hidden",
                border: "1px solid var(--line-2)",
                boxShadow: "0 40px 90px -24px rgba(45,35,95,0.30), 0 14px 34px -12px rgba(17,17,17,0.12)",
                background: "#fff",
              }}>
                {/* Browser chrome */}
                <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "12px 16px", borderBottom: "1px solid var(--line)", background: "var(--bg)" }}>
                  <span style={{ width: 11, height: 11, borderRadius: 999, background: "#FF5F57" }} />
                  <span style={{ width: 11, height: 11, borderRadius: 999, background: "#FEBC2E" }} />
                  <span style={{ width: 11, height: 11, borderRadius: 999, background: "#28C840" }} />
                  <div style={{ marginLeft: 10, flex: 1, maxWidth: 230, display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--ink-3)", background: "var(--bg-2)", border: "1px solid var(--line)", borderRadius: 8, padding: "5px 12px" }}>
                    <Lock size={11} strokeWidth={2.2} /> chademy.lv/dashboard
                  </div>
                </div>

                {/* App body */}
                <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 12 }}>
                  {/* Progress card */}
                  <div style={{ borderRadius: 14, padding: "16px 18px", background: "linear-gradient(135deg, color-mix(in oklab, var(--accent) 12%, #fff) 0%, #fff 70%)", border: "1px solid color-mix(in oklab, var(--accent) 18%, var(--line))" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>Tavs progress</span>
                      <span style={{ fontSize: 15, fontWeight: 900, color: "var(--accent)", fontFamily: "Inter Tight, sans-serif" }}>68%</span>
                    </div>
                    <div style={{ height: 8, borderRadius: 999, background: "var(--bg-2)", overflow: "hidden" }}>
                      <div style={{ height: "100%", width: "68%", borderRadius: 999, background: "linear-gradient(90deg, var(--accent), color-mix(in oklab, var(--accent) 55%, #fff))" }} />
                    </div>
                  </div>

                  {/* Lesson rows */}
                  {[
                    { t: "AI satura pamati", done: true },
                    { t: "Pirmais faceless video", done: true },
                    { t: "Klientu piesaiste", done: false },
                  ].map((l) => (
                    <div key={l.t} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderRadius: 12, background: l.done ? "color-mix(in oklab, var(--accent-2) 7%, #fff)" : "var(--bg)", border: `1px solid ${l.done ? "color-mix(in oklab, var(--accent-2) 22%, transparent)" : "var(--line)"}` }}>
                      <span style={{ width: 26, height: 26, borderRadius: 8, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: l.done ? "var(--accent-2)" : "color-mix(in oklab, var(--accent) 12%, transparent)", color: l.done ? "#fff" : "var(--accent)" }}>
                        {l.done ? <Check size={14} strokeWidth={3} /> : <Play size={12} strokeWidth={2.5} fill="currentColor" />}
                      </span>
                      <span style={{ flex: 1, fontSize: 12.5, fontWeight: 600, color: "var(--ink)" }}>{l.t}</span>
                      <span style={{ fontSize: 11, color: "var(--ink-4)" }}>{l.done ? "Pabeigts" : "12 min"}</span>
                    </div>
                  ))}

                  {/* Mini earnings stats */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 2 }}>
                    <div style={{ borderRadius: 12, padding: "12px 14px", background: "var(--bg)", border: "1px solid var(--line)" }}>
                      <div style={{ fontSize: 18, fontWeight: 900, color: "var(--ink)", fontFamily: "Inter Tight, sans-serif", letterSpacing: "-0.03em" }}>€840</div>
                      <div style={{ fontSize: 10.5, color: "var(--ink-3)" }}>Šomēnes nopelnīts</div>
                    </div>
                    <div style={{ borderRadius: 12, padding: "12px 14px", background: "var(--bg)", border: "1px solid var(--line)" }}>
                      <div style={{ fontSize: 18, fontWeight: 900, color: "var(--accent-2)", fontFamily: "Inter Tight, sans-serif", letterSpacing: "-0.03em" }}>3 klienti</div>
                      <div style={{ fontSize: 10.5, color: "var(--ink-3)" }}>Aktīvi projekti</div>
                    </div>
                  </div>
                </div>
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
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}><EmojiIcon emoji="🎯" size={18} color="var(--accent)" strokeWidth={1.85} /></div>
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
