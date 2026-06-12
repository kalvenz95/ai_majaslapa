"use client";

import { Reveal } from "@/components/home/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { useTranslations } from "next-intl";

type Step = { num: string; title: string; desc: string };

export default function HowItWorksV2() {
  const t = useTranslations("FastWin");
  const steps = (t.raw("steps") ?? []) as Step[];

  return (
    <section id="how" style={{ padding: "140px 0", background: "#fff", borderTop: "1px solid var(--line)" }}>
      <div className="lp-container" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px" }}>
        {/* Header */}
        <div style={{ maxWidth: 760, margin: "0 auto 80px", textAlign: "center" }}>
          <Reveal><span className="v2-eyebrow">{t("kicker")}</span></Reveal>
          <Reveal delay={0.08}>
            <h2 className="v2-h2" style={{ fontSize: "clamp(40px, 6.5vw, 80px)", color: "var(--ink)", margin: "18px 0 22px" }}>
              {t("titleA")}<span className="v2-grad">{t("titleB")}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p style={{ fontSize: 18, color: "var(--ink-3)", lineHeight: 1.7, maxWidth: 580, margin: "0 auto" }}>
              {t("lead2")}
            </p>
          </Reveal>
        </div>

        {/* Steps — horizontal rail with gradient connector */}
        <div className="how-v2-rail" style={{ position: "relative", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 24 }}>
          {/* connector line behind the number bubbles */}
          <div aria-hidden className="how-v2-line" style={{
            position: "absolute", top: 27, left: "10%", right: "10%", height: 2, zIndex: 0,
            background: "linear-gradient(90deg, var(--accent) 0%, #8B7BFF 40%, var(--accent-2) 100%)",
            opacity: 0.25,
          }} />

          {steps.map((s, i) => (
            <Reveal key={s.num} delay={0.08 * i} style={{ position: "relative", zIndex: 1 }}>
              <div className="how-v2-step" style={{ textAlign: "center" }}>
                <div style={{
                  width: 54, height: 54, borderRadius: 999, margin: "0 auto 20px",
                  background: i === steps.length - 1
                    ? "linear-gradient(135deg, var(--accent-2), #34D9C3)"
                    : "linear-gradient(135deg, var(--accent), #8B7BFF)",
                  color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: "JetBrains Mono, monospace", fontSize: 14, fontWeight: 700,
                  boxShadow: i === steps.length - 1
                    ? "0 14px 32px -10px rgba(0,191,165,0.55), inset 0 1px 0 rgba(255,255,255,0.35)"
                    : "0 14px 32px -10px rgba(109,94,243,0.55), inset 0 1px 0 rgba(255,255,255,0.35)",
                  border: "3px solid #fff",
                }}>
                  {s.num}
                </div>
                <div>
                  <h3 style={{ fontSize: 17.5, fontWeight: 800, fontFamily: "Inter Tight, sans-serif", letterSpacing: "-0.02em", color: "var(--ink)", margin: "0 0 8px" }}>
                    {s.title}
                  </h3>
                  <p className="how-v2-desc" style={{ fontSize: 13.5, color: "var(--ink-3)", lineHeight: 1.6, margin: "0 auto", maxWidth: 190 }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal delay={0.2}>
          <div style={{ textAlign: "center", marginTop: 72 }}>
            <Magnetic>
              <a href="#courses" className="btn-primary" style={{ textDecoration: "none", fontSize: 16, padding: "16px 32px", borderRadius: 14 }}>
                {t("cta")}
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .how-v2-rail { grid-template-columns: 1fr !important; gap: 0 !important; max-width: 420px; margin: 0 auto; }
          .how-v2-line { display: none; }
          .how-v2-step { display: grid !important; grid-template-columns: 54px 1fr; gap: 18px; text-align: left !important; padding: 18px 0; align-items: start; }
          .how-v2-step > div:first-child { margin: 0 !important; }
          .how-v2-desc { margin: 0 !important; max-width: none !important; }
        }
      `}</style>
    </section>
  );
}
