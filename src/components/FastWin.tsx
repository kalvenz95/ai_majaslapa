"use client";

import { useTranslations } from "next-intl";

export default function FastWin() {
  const t = useTranslations("FastWin");
  const steps = (t.raw("steps") ?? []) as { num: string; title: string; desc: string }[];

  return (
    <section id="how" className="lp-section" style={{ padding: "120px 0", position: "relative", borderTop: "1px solid var(--line)", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 55% 60% at 0% 100%, color-mix(in oklab, var(--accent) 14%, transparent), transparent 65%), radial-gradient(ellipse 40% 40% at 90% 10%, color-mix(in oklab, var(--accent) 5%, transparent), transparent 60%)" }} />
      <div className="lp-container" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div className="lp-header-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "end", marginBottom: 72 }}>
          <div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.15em", color: "var(--ink-3)", textTransform: "uppercase" as const }}>
              <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--accent)" }} />
              {t("kicker")}
            </span>
            <h2 style={{ fontSize: "clamp(40px, 6vw, 84px)", lineHeight: 1.05, letterSpacing: "-0.035em", fontWeight: 600, margin: "16px 0 0", maxWidth: "14ch" }}>
              {t("titleA")}
              <span style={{ background: "linear-gradient(120deg, var(--accent), color-mix(in oklab, var(--accent) 70%, white))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", fontStyle: "italic", fontFamily: "Fraunces, Georgia, serif", fontWeight: 500 }}>
                {t("titleB")}
              </span>
            </h2>
          </div>
          <div style={{ paddingBottom: 8, display: "flex", flexDirection: "column", gap: 16 }}>
            <p style={{ fontSize: 17, color: "var(--ink-2)", maxWidth: 560, lineHeight: 1.65, margin: 0 }}>{t("lead1")}</p>
            <p style={{ fontSize: 17, color: "var(--ink-2)", maxWidth: 560, lineHeight: 1.65, margin: 0 }}>{t("lead2")}</p>
          </div>
        </div>

        {/* Roadmap */}
        <div style={{ position: "relative" }}>
          <div className="lp-steps-connector" style={{ position: "absolute", left: 0, right: 0, top: 28, height: 1, background: "linear-gradient(to right, transparent, var(--line-2) 8%, var(--line-2) 92%, transparent)", zIndex: 0 }} />

          <div className="lp-five-steps" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 24, position: "relative", zIndex: 1 }}>
            {steps.map((s) => (
              <div key={s.num} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 999,
                    background: "var(--accent)",
                    border: "1px solid var(--accent)",
                    display: "grid",
                    placeItems: "center",
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 18,
                    fontWeight: 700,
                    color: "var(--accent-ink)",
                    boxShadow: "0 0 0 8px var(--bg), 0 0 0 12px color-mix(in oklab, var(--accent) 30%, transparent)",
                    flexShrink: 0,
                  }}
                >
                  {s.num}
                </div>
                <h4 style={{ fontSize: 18, fontWeight: 600, margin: 0, letterSpacing: "-0.01em" }}>{s.title}</h4>
                <p style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.5, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
