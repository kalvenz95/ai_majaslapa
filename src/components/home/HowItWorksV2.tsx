"use client";

import Image from "next/image";
import { Reveal } from "@/components/home/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { useTranslations } from "next-intl";

type Step = { num: string; title: string; desc: string };

export default function HowItWorksV2() {
  const t = useTranslations("FastWin");
  const steps = (t.raw("steps") ?? []) as Step[];

  return (
    <section id="how" style={{ position: "relative", overflow: "hidden", background: "#0A0A0E" }}>
      {/* AI imagery — subtle texture behind the section */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.5 }}>
        <Image src="/ai/cta-bg.jpg" alt="" fill sizes="100vw" style={{ objectFit: "cover", objectPosition: "center right" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(72% 80% at 50% 42%, rgba(10,10,14,0.55), #0A0A0E 84%)" }} />
      </div>

      {/* Atmosphere */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background:
          "radial-gradient(55% 55% at 50% 108%, rgba(109,94,243,0.28), transparent 70%)," +
          "radial-gradient(35% 40% at 12% 0%, rgba(0,191,165,0.10), transparent 60%)",
      }} />
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.4,
        backgroundImage: "radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px)",
        backgroundSize: "30px 30px",
        maskImage: "radial-gradient(70% 60% at 50% 45%, #000 0%, transparent 82%)",
        WebkitMaskImage: "radial-gradient(70% 60% at 50% 45%, #000 0%, transparent 82%)",
      }} />

      {/* ── Desktop: compact horizontal stepper — all steps on one screen ── */}
      <div className="how-desktop lp-container" style={{ position: "relative", zIndex: 1, maxWidth: 1160, margin: "0 auto", padding: "130px 28px 0" }}>
        {/* Header */}
        <div style={{ marginBottom: 72, textAlign: "center" }}>
          <Reveal><span className="v2-eyebrow v2-eyebrow--light">{t("kicker")}</span></Reveal>
          <Reveal delay={0.08}>
            <h2 className="v2-h2" style={{ fontSize: "clamp(36px, 4.6vw, 60px)", color: "#fff", margin: "16px auto 0", maxWidth: "20ch" }}>
              {t("titleA")}<span className="v2-grad">{t("titleB")}</span>
            </h2>
          </Reveal>
        </div>

        {/* Horizontal stepper */}
        <div className="how-stepper" style={{ position: "relative", display: "grid", gridTemplateColumns: `repeat(${steps.length}, 1fr)`, gap: 24 }}>
          {/* connector line — runs through badge centres (first → last) */}
          <div aria-hidden style={{
            position: "absolute", top: 27, height: 2, borderRadius: 999,
            left: `calc(${100 / steps.length / 2}% )`, right: `calc(${100 / steps.length / 2}% )`,
            background: "linear-gradient(90deg, var(--accent) 0%, var(--accent-2) 100%)", opacity: 0.4,
          }} />

          {steps.map((s, i) => (
            <Reveal key={s.num} delay={0.06 * i}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative" }}>
                <span style={{
                  width: 56, height: 56, borderRadius: 999, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "JetBrains Mono, monospace", fontSize: 15, fontWeight: 700,
                  background: "linear-gradient(135deg, var(--accent), #8B7BFF)", color: "#fff",
                  boxShadow: "0 14px 34px -8px rgba(109,94,243,0.65)",
                  border: "4px solid #0A0A0E",
                  marginBottom: 22,
                }}>
                  {s.num}
                </span>
                <h3 style={{ fontSize: 18.5, fontWeight: 700, fontFamily: "var(--font-sans)", letterSpacing: "-0.025em", color: "#fff", margin: "0 0 9px" }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: 14.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, margin: 0, maxWidth: 190 }}>
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── Mobile: simple vertical list ──────────────────────────── */}
      <div className="how-mobile lp-container" style={{ position: "relative", zIndex: 1, maxWidth: 1160, margin: "0 auto", padding: "96px 28px 0", display: "none" }}>
        <span className="v2-eyebrow v2-eyebrow--light">{t("kicker")}</span>
        <h2 className="v2-h2" style={{ fontSize: "clamp(36px, 6vw, 60px)", color: "#fff", margin: "16px 0 36px" }}>
          {t("titleA")}<span className="v2-grad">{t("titleB")}</span>
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
                  boxShadow: "0 12px 30px -8px rgba(109,94,243,0.65)", border: "3px solid #0A0A0E",
                }}>
                  {s.num}
                </span>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, fontFamily: "var(--font-sans)", letterSpacing: "-0.02em", color: "#fff", margin: "0 0 7px" }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, margin: 0 }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* CTA — shared */}
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "72px 28px 120px" }} className="how-cta">
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
