"use client";

import { useTranslations } from "next-intl";

export default function FastWin() {
  const t = useTranslations("FastWin");
  const steps = (t.raw("steps") ?? []) as { num: string; title: string; desc: string }[];
  const cta = t("cta") as string;

  return (
    <section id="how" className="lp-section" style={{ padding: "120px 0", position: "relative", borderTop: "1px solid var(--line)", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 55% 60% at 0% 100%, color-mix(in oklab, var(--accent) 10%, transparent), transparent 65%), radial-gradient(ellipse 40% 40% at 90% 10%, color-mix(in oklab, var(--accent) 5%, transparent), transparent 60%)" }} />

      <div className="lp-container" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div className="lp-header-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "end", marginBottom: 64 }}>
          <div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.15em", color: "var(--ink-3)", textTransform: "uppercase" as const }}>
              <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--accent)" }} />
              {t("kicker")}
            </span>
            <h2 style={{ fontSize: "clamp(36px, 5.5vw, 78px)", lineHeight: 1.08, letterSpacing: "-0.035em", fontWeight: 600, margin: "16px 0 0", maxWidth: "15ch" }}>
              {t("titleA")}
              <span style={{ background: "linear-gradient(120deg, var(--accent), color-mix(in oklab, var(--accent) 70%, white))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", fontStyle: "italic", fontFamily: "Fraunces, Georgia, serif", fontWeight: 500 }}>
                {t("titleB")}
              </span>
            </h2>
          </div>
          <div style={{ paddingBottom: 8, display: "flex", flexDirection: "column", gap: 12 }}>
            <p style={{ fontSize: 17, color: "var(--ink-2)", maxWidth: 520, lineHeight: 1.65, margin: 0 }}>{t("lead1")}</p>
            <p style={{ fontSize: 17, color: "var(--ink-3)", maxWidth: 520, lineHeight: 1.65, margin: 0 }}>{t("lead2")}</p>
          </div>
        </div>

        {/* Step cards — compact */}
        <div className="lp-five-steps" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
          {steps.map((s, i) => (
            <div
              key={s.num}
              style={{
                padding: "20px 18px 22px",
                background: "var(--bg-1)",
                border: "1px solid var(--line)",
                borderRadius: 18,
                display: "flex",
                flexDirection: "column",
                gap: 12,
                position: "relative",
                overflow: "hidden",
                transition: "border-color 0.2s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "color-mix(in oklab, var(--accent) 30%, transparent)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--line)";
                (e.currentTarget as HTMLElement).style.transform = "";
              }}
            >
              {/* Connector line — subtle top border accent on first card */}
              {i === 0 && (
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, var(--accent), color-mix(in oklab, var(--accent) 40%, transparent))", borderRadius: "18px 18px 0 0" }} />
              )}

              {/* Step number */}
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 32,
                height: 32,
                borderRadius: 10,
                background: i === 0 ? "var(--accent)" : "var(--bg-2)",
                border: i === 0 ? "none" : "1px solid var(--line-2)",
                fontFamily: "JetBrains Mono, monospace",
                fontSize: 12,
                fontWeight: 700,
                color: i === 0 ? "var(--accent-ink)" : "var(--ink-3)",
                flexShrink: 0,
              }}>
                {s.num}
              </div>

              <div>
                <h4 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 6px", letterSpacing: "-0.01em", color: "var(--ink)", lineHeight: 1.2 }}>{s.title}</h4>
                <p style={{ fontSize: 13, color: "var(--ink-3)", lineHeight: 1.5, margin: 0 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 48 }}>
          <a href="#courses" className="btn-primary" style={{ textDecoration: "none", fontSize: 15, padding: "14px 28px" }}>
            {cta}
          </a>
        </div>
      </div>
    </section>
  );
}
