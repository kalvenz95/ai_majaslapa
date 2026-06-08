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
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "Inter Tight, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "var(--ink-3)", textTransform: "uppercase" as const }}>
              <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--accent)" }} />
              {t("kicker")}
            </span>
            <h2 style={{ fontSize: "clamp(36px, 5.5vw, 78px)", lineHeight: 1.08, letterSpacing: "-0.035em", fontWeight: 600, margin: "16px 0 0", maxWidth: "15ch" }}>
              {t("titleA")}
              <span style={{ color: "var(--accent)", fontFamily: "Inter Tight, sans-serif", fontWeight: 600 }}>
                {t("titleB")}
              </span>
            </h2>
          </div>
          <div style={{ paddingBottom: 8, display: "flex", flexDirection: "column", gap: 12 }}>
            <p style={{ fontSize: 17, color: "var(--ink-2)", maxWidth: 520, lineHeight: 1.65, margin: 0 }}>{t("lead1")}</p>
            <p style={{ fontSize: 17, color: "var(--ink-3)", maxWidth: 520, lineHeight: 1.65, margin: 0 }}>{t("lead2")}</p>
          </div>
        </div>

        {/* Step cards — with a literal connecting path through the numbered stations */}
        <div className="lp-five-steps" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, position: "relative" }}>
          {/* The "path" — a line running through every station, drawn behind the badges (badge center sits at 24px padding + 22px half-height = 46px) */}
          <div className="lp-steps-connector" aria-hidden style={{ position: "absolute", top: 45, left: "10%", right: "10%", height: 2, background: "repeating-linear-gradient(90deg, color-mix(in oklab, var(--accent) 38%, var(--line)) 0 10px, transparent 10px 18px)", zIndex: 0 }} />

          {steps.map((s, i) => (
            <div
              key={s.num}
              style={{
                padding: "24px 20px 26px",
                background: "var(--bg-1)",
                border: "1px solid var(--line)",
                borderRadius: 20,
                display: "flex",
                flexDirection: "column",
                gap: 16,
                position: "relative",
                overflow: "hidden",
                transition: "border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "color-mix(in oklab, var(--accent) 30%, transparent)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 20px 48px -20px color-mix(in oklab, var(--accent) 28%, transparent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--line)";
                (e.currentTarget as HTMLElement).style.transform = "";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {/* Connector line — subtle top border accent on first card */}
              {i === 0 && (
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, var(--accent), color-mix(in oklab, var(--accent) 40%, transparent))", borderRadius: "20px 20px 0 0" }} />
              )}

              {/* Step number — sits on the connecting path like a station */}
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 44,
                borderRadius: 13,
                background: i === 0 ? "var(--accent)" : "var(--bg-2)",
                border: i === 0 ? "none" : "1px solid var(--line-2)",
                fontFamily: "Inter Tight, sans-serif",
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: i === 0 ? "var(--accent-ink)" : "var(--ink-2)",
                flexShrink: 0,
                position: "relative",
                zIndex: 1,
                boxShadow: i === 0 ? "0 8px 24px -8px color-mix(in oklab, var(--accent) 60%, transparent)" : "0 0 0 6px var(--bg-1)",
              }}>
                {s.num}
              </div>

              <div>
                <h4 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 8px", letterSpacing: "-0.015em", color: "var(--ink)", lineHeight: 1.25 }}>{s.title}</h4>
                <p style={{ fontSize: 14, color: "var(--ink-3)", lineHeight: 1.55, margin: 0 }}>{s.desc}</p>
              </div>
            </div>
          ))}

          {/* Arrows between stations — overlaid on the path, centered in the gap between each pair of cards (cards clip overflow, so these live as siblings instead) */}
          {steps.slice(0, -1).map((_, i) => (
            <span key={`arrow-${i}`} className="lp-steps-arrow" aria-hidden style={{
              position: "absolute",
              top: 46,
              left: `calc((100% - 48px) / 5 * ${i + 1} + ${i * 12 + 6}px)`,
              transform: "translate(-50%, -50%)",
              zIndex: 2,
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 26, height: 26, borderRadius: "50%",
              background: "var(--bg-1)", border: "1px solid var(--line-2)",
              color: "var(--ink-3)", fontSize: 12,
              boxShadow: "0 4px 14px -6px rgba(0,0,0,0.18)",
            }}>→</span>
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
