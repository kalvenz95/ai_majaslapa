"use client";

import { Reveal } from "@/components/home/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { useTranslations } from "next-intl";

type Step = { num: string; title: string; desc: string };

export default function HowItWorksV2() {
  const t = useTranslations("FastWin");
  const steps = (t.raw("steps") ?? []) as Step[];

  return (
    <section id="how" style={{ background: "#fff", borderTop: "1px solid var(--line)" }}>
      {/* ── Desktop: compact horizontal stepper — all steps on one screen ── */}
      <div className="how-desktop lp-container" style={{ maxWidth: 1160, margin: "0 auto", padding: "130px 28px 0" }}>
        {/* Header */}
        <div style={{ marginBottom: 72, textAlign: "center" }}>
          <Reveal><span className="v2-eyebrow">{t("kicker")}</span></Reveal>
          <Reveal delay={0.08}>
            <h2 className="v2-h2" style={{ fontSize: "clamp(36px, 4.6vw, 60px)", color: "var(--ink)", margin: "16px auto 0", maxWidth: "20ch" }}>
              {t("titleA")}<span style={{ color: "var(--accent)" }}>{t("titleB")}</span>
            </h2>
          </Reveal>
        </div>

        {/* Horizontal stepper */}
        <div className="how-stepper" style={{ position: "relative", display: "grid", gridTemplateColumns: `repeat(${steps.length}, 1fr)`, gap: 24 }}>
          {/* connector line — runs through badge centres (first → last) */}
          <div aria-hidden style={{
            position: "absolute", top: 27, height: 2, borderRadius: 999,
            left: `calc(${100 / steps.length / 2}% )`, right: `calc(${100 / steps.length / 2}% )`,
            background: "linear-gradient(90deg, var(--accent) 0%, var(--accent-2) 100%)", opacity: 0.28,
          }} />

          {steps.map((s, i) => (
            <Reveal key={s.num} delay={0.06 * i}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative" }}>
                <span style={{
                  width: 56, height: 56, borderRadius: 999, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "JetBrains Mono, monospace", fontSize: 15, fontWeight: 700,
                  background: "linear-gradient(135deg, var(--accent), #8B7BFF)", color: "#fff",
                  boxShadow: "0 14px 30px -10px rgba(109,94,243,0.5)",
                  border: "4px solid #fff",
                  marginBottom: 22,
                }}>
                  {s.num}
                </span>
                <h3 style={{ fontSize: 18.5, fontWeight: 700, fontFamily: "var(--font-sans)", letterSpacing: "-0.025em", color: "var(--ink)", margin: "0 0 9px" }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: 14.5, color: "var(--ink-3)", lineHeight: 1.6, margin: 0, maxWidth: 190 }}>
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
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
                  <h3 style={{ fontSize: 18, fontWeight: 700, fontFamily: "var(--font-sans)", letterSpacing: "-0.02em", color: "var(--ink)", margin: "0 0 7px" }}>
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
      <div style={{ textAlign: "center", padding: "72px 28px 120px" }} className="how-cta">
        <Magnetic>
          <a href="#courses" className="btn-primary" style={{ textDecoration: "none", fontSize: 16, padding: "16px 32px", borderRadius: 14 }}>
            {t("cta")}
          </a>
        </Magnetic>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .how-desktop { display: none; }
          .how-mobile { display: block !important; }
          .how-cta { padding-top: 40px !important; padding-bottom: 96px !important; }
        }
      `}</style>
    </section>
  );
}
