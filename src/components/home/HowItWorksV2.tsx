"use client";

import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Reveal } from "@/components/home/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { useTranslations } from "next-intl";

type Step = { num: string; title: string; desc: string };

const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

export default function HowItWorksV2() {
  const t = useTranslations("FastWin");
  const steps = (t.raw("steps") ?? []) as Step[];

  /* Scroll-driven scene: the wrap is N×80vh tall, the viewport pins, steps advance */
  const wrapRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length)));
    if (idx !== active) setActive(idx);
  });
  const railFill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const step = steps[active];

  return (
    <section id="how" style={{ background: "#fff", borderTop: "1px solid var(--line)" }}>
      {/* ── Desktop: pinned scroll scene ─────────────────────────── */}
      <div ref={wrapRef} className="how-sticky-wrap" style={{ height: `${steps.length * 80}vh`, position: "relative" }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
          <div className="lp-container" style={{ maxWidth: 1160, margin: "0 auto", padding: "0 28px", width: "100%" }}>
            {/* Header */}
            <div style={{ marginBottom: 56 }}>
              <span className="v2-eyebrow">{t("kicker")}</span>
              <h2 className="v2-h2" style={{ fontSize: "clamp(36px, 4.6vw, 60px)", color: "var(--ink)", margin: "16px 0 0", maxWidth: "20ch" }}>
                {t("titleA")}<span style={{ color: "var(--accent)" }}>{t("titleB")}</span>
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 80, alignItems: "center" }}>
              {/* Active step — giant outlined number + copy */}
              <div style={{ position: "relative", minHeight: 280, display: "flex", alignItems: "center" }}>
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 34 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE_OUT }}
                  style={{ position: "relative" }}
                >
                  <span aria-hidden style={{
                    position: "absolute", top: -110, left: -16,
                    fontFamily: "Inter Tight, sans-serif", fontWeight: 900,
                    fontSize: 230, lineHeight: 1, letterSpacing: "-0.05em",
                    color: "transparent",
                    WebkitTextStroke: "1.5px color-mix(in oklab, var(--accent) 32%, transparent)",
                    userSelect: "none", pointerEvents: "none",
                  }}>
                    {step?.num}
                  </span>
                  <div style={{ position: "relative", paddingTop: 64 }}>
                    <h3 style={{ fontSize: "clamp(30px, 3.4vw, 46px)", fontWeight: 850, fontFamily: "Inter Tight, sans-serif", letterSpacing: "-0.035em", color: "var(--ink)", margin: "0 0 14px" }}>
                      {step?.title}
                    </h3>
                    <p style={{ fontSize: 18, color: "var(--ink-3)", lineHeight: 1.7, maxWidth: 420, margin: 0 }}>
                      {step?.desc}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Step rail — all steps listed, progress line fills with scroll */}
              <div style={{ display: "flex", gap: 26 }}>
                <div style={{ position: "relative", width: 2, borderRadius: 999, background: "var(--line)", overflow: "hidden", flexShrink: 0 }}>
                  <motion.div style={{
                    position: "absolute", top: 0, left: 0, width: "100%", height: railFill,
                    background: "linear-gradient(180deg, var(--accent), var(--accent-2))",
                  }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
                  {steps.map((s, i) => (
                    <div key={s.num} style={{ display: "flex", alignItems: "center", gap: 14, opacity: i === active ? 1 : 0.38, transition: "opacity 0.35s ease" }}>
                      <span style={{
                        width: 34, height: 34, borderRadius: 999, flexShrink: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "JetBrains Mono, monospace", fontSize: 11.5, fontWeight: 700,
                        background: i <= active ? "linear-gradient(135deg, var(--accent), #8B7BFF)" : "var(--bg-2)",
                        color: i <= active ? "#fff" : "var(--ink-3)",
                        border: i <= active ? "none" : "1px solid var(--line-2)",
                        boxShadow: i === active ? "0 10px 24px -8px rgba(109,94,243,0.55)" : "none",
                        transition: "background 0.3s ease, box-shadow 0.3s ease",
                      }}>
                        {s.num}
                      </span>
                      <span style={{ fontSize: 15.5, fontWeight: 700, fontFamily: "Inter Tight, sans-serif", letterSpacing: "-0.015em", color: "var(--ink)" }}>
                        {s.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile: simple vertical list ──────────────────────────── */}
      <div className="how-mobile lp-container" style={{ maxWidth: 1160, margin: "0 auto", padding: "96px 28px 0", display: "none" }}>
        <span className="v2-eyebrow">{t("kicker")}</span>
        <h2 className="v2-h2" style={{ fontSize: "clamp(36px, 6vw, 60px)", color: "var(--ink)", margin: "16px 0 36px" }}>
          {t("titleA")}<span style={{ color: "var(--accent)" }}>{t("titleB")}</span>
        </h2>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {steps.map((s) => (
            <Reveal key={s.num}>
              <div style={{ display: "grid", gridTemplateColumns: "48px 1fr", gap: 18, padding: "18px 0", alignItems: "start" }}>
                <span style={{
                  width: 48, height: 48, borderRadius: 999,
                  background: "linear-gradient(135deg, var(--accent), #8B7BFF)",
                  color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "JetBrains Mono, monospace", fontSize: 13, fontWeight: 700,
                  boxShadow: "0 12px 28px -10px rgba(109,94,243,0.5)", border: "3px solid #fff",
                }}>
                  {s.num}
                </span>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, fontFamily: "Inter Tight, sans-serif", letterSpacing: "-0.02em", color: "var(--ink)", margin: "0 0 7px" }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: 14, color: "var(--ink-3)", lineHeight: 1.6, margin: 0 }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* CTA — shared */}
      <div style={{ textAlign: "center", padding: "0 28px 120px" }} className="how-cta">
        <Magnetic>
          <a href="#courses" className="btn-primary" style={{ textDecoration: "none", fontSize: 16, padding: "16px 32px", borderRadius: 14 }}>
            {t("cta")}
          </a>
        </Magnetic>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .how-sticky-wrap { display: none; }
          .how-mobile { display: block !important; }
          .how-cta { padding-top: 40px !important; padding-bottom: 96px !important; }
        }
      `}</style>
    </section>
  );
}
