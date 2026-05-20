"use client";

import { useTranslations } from "next-intl";

type BigStat = { v: string; suffix: string; l: string; accent?: boolean; accentPlus?: boolean };
type Quote = { tag: string; text: string; name: string; role: string; amt: string };

export default function Testimonials() {
  const t = useTranslations("Testimonials");
  const bigStats = (t.raw("bigStats") ?? []) as BigStat[];
  const quotes = (t.raw("quotes") ?? []) as Quote[];

  return (
    <section id="results" className="lp-section" style={{ padding: "120px 0", position: "relative", borderTop: "1px solid var(--line)", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 60% 45% at 50% 0%, color-mix(in oklab, var(--accent) 13%, transparent), transparent 60%), radial-gradient(ellipse 30% 50% at 5% 80%, color-mix(in oklab, var(--accent) 5%, transparent), transparent 55%)" }} />
      <div className="lp-container" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }}>
        <div className="lp-header-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "end", marginBottom: 0 }}>
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
          <div style={{ paddingBottom: 8 }}>
            <p style={{ fontSize: 18, color: "var(--ink-2)", maxWidth: 640, lineHeight: 1.5 }}>{t("lead")}</p>
          </div>
        </div>

        <div className="lp-four-stats" style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
          {bigStats.map((s, i) => (
            <div key={String(i)} style={{ padding: "40px 24px", borderRight: i < 3 ? "1px solid var(--line)" : "none", display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="lp-stat-num" style={{ fontSize: 64, fontWeight: 600, letterSpacing: "-0.045em", lineHeight: 1.0, fontVariantNumeric: "tabular-nums" }}>
                {s.accent ? <span style={{ color: "var(--accent)" }}>{s.v}</span> : s.v}
                <span style={{ fontSize: 32, color: "var(--ink-3)" }}>{s.suffix}</span>
                {s.accentPlus ? <span style={{ fontSize: 32, color: "var(--accent)" }}>+</span> : null}
              </div>
              <div style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.45 }}>{s.l}</div>
            </div>
          ))}
        </div>

        <div className="lp-three-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 56 }}>
          {quotes.map((q) => (
            <div key={q.name + q.role} style={{ padding: 28, border: "1px solid var(--line)", borderRadius: 22, background: "var(--bg-1)", display: "flex", flexDirection: "column" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "JetBrains Mono, monospace", fontSize: 10, padding: "5px 10px", borderRadius: 999, background: "var(--accent)", color: "var(--accent-ink)", marginBottom: 16, alignSelf: "flex-start", fontWeight: 700, letterSpacing: "0.08em" }}>
                {q.tag}
              </span>
              <p style={{ fontSize: 14.5, color: "var(--ink)", lineHeight: 1.6, margin: "0 0 22px", fontWeight: 400 }}>{q.text}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: 18, borderTop: "1px solid var(--line)" }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{q.name}</div>
                  <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 2 }}>{q.role}</div>
                </div>
                <div style={{ fontWeight: 600, fontSize: 17, color: "var(--accent)", letterSpacing: "-0.02em" }}>{q.amt}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
