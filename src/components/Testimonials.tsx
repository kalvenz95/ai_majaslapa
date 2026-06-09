"use client";

import { useTranslations } from "next-intl";

type BigStat = { v: string; suffix: string; l: string; accent?: boolean; accentPlus?: boolean };
type Quote = { tag: string; text: string; name: string; role: string; amt: string };

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

const AVATAR_COLORS = [
  { bg: "color-mix(in oklab, var(--accent) 18%, var(--bg-2))", color: "var(--accent)" },
  { bg: "color-mix(in oklab, var(--accent-2) 16%, var(--bg-2))", color: "var(--accent-2)" },
  { bg: "color-mix(in oklab, var(--accent-3) 20%, var(--bg-2))", color: "var(--accent-3)" },
];

export default function Testimonials() {
  const t = useTranslations("Testimonials");
  const bigStats = (t.raw("bigStats") ?? []) as BigStat[];
  const quotes = (t.raw("quotes") ?? []) as Quote[];

  return (
    <section id="results" className="lp-section" style={{ padding: "120px 0", position: "relative", borderTop: "1px solid var(--line)", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 60% 45% at 50% 0%, color-mix(in oklab, var(--accent) 10%, transparent), transparent 60%)" }} />

      <div className="lp-container" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div className="lp-header-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "end", marginBottom: 0 }}>
          <div>
            <h2 style={{ fontSize: "clamp(36px, 5.5vw, 78px)", lineHeight: 1.08, letterSpacing: "-0.035em", fontWeight: 600, margin: "0 0 0", maxWidth: "16ch" }}>
              {t("titleA")}
              <span style={{ color: "var(--accent)", fontFamily: "Inter Tight, sans-serif", fontWeight: 600 }}>
                {t("titleB")}
              </span>
            </h2>
          </div>
          <div style={{ paddingBottom: 8 }}>
            <p style={{ fontSize: 17, color: "var(--ink-2)", maxWidth: 520, lineHeight: 1.6 }}>{t("lead")}</p>
          </div>
        </div>

        {/* Stats row */}
        <div className="lp-four-stats" style={{ marginTop: 52, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
          {bigStats.map((s, i) => (
            <div key={String(i)} style={{ padding: "36px 24px", borderRight: i < 3 ? "1px solid var(--line)" : "none", display: "flex", flexDirection: "column", gap: 12 }}>
              <div className="lp-stat-num" style={{ fontSize: 58, fontWeight: 600, letterSpacing: "-0.045em", lineHeight: 1.0, fontVariantNumeric: "tabular-nums" }}>
                {s.accent ? <span style={{ color: "var(--accent)" }}>{s.v}</span> : s.v}
                <span style={{ fontSize: 28, color: "var(--ink-3)" }}>{s.suffix}</span>
                {s.accentPlus ? <span style={{ fontSize: 28, color: "var(--accent)" }}>+</span> : null}
              </div>
              <div style={{ fontSize: 13, color: "var(--ink-3)", lineHeight: 1.45 }}>{s.l}</div>
            </div>
          ))}
        </div>

        {/* Testimonial cards */}
        <div className="lp-three-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 48 }}>
          {quotes.map((q, idx) => {
            const av = AVATAR_COLORS[idx % AVATAR_COLORS.length];
            return (
              <div
                key={q.name + q.role}
                style={{
                  padding: "28px",
                  border: "1px solid var(--line)",
                  borderRadius: 22,
                  background: "var(--bg-1)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 0,
                  transition: "border-color 0.2s ease, transform 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--line-2)";
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--line)";
                  (e.currentTarget as HTMLElement).style.transform = "";
                }}
              >
                {/* Tag */}
                <span style={{ display: "inline-flex", alignItems: "center", fontFamily: "Inter Tight, sans-serif", fontSize: 10, padding: "4px 9px", borderRadius: 999, background: "color-mix(in oklab, var(--accent) 12%, transparent)", color: "var(--accent)", border: "1px solid color-mix(in oklab, var(--accent) 25%, transparent)", marginBottom: 20, alignSelf: "flex-start", fontWeight: 700, letterSpacing: "0.07em" }}>
                  {q.tag}
                </span>

                {/* Quote */}
                <p style={{ fontSize: 14.5, color: "var(--ink)", lineHeight: 1.65, margin: "0 0 24px", fontWeight: 400, fontStyle: "italic" }}>
                  {q.text}
                </p>

                {/* Footer */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: 18, borderTop: "1px solid var(--line)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {/* Avatar */}
                    <div style={{
                      width: 36,
                      height: 36,
                      borderRadius: 999,
                      background: av.bg,
                      border: "1px solid var(--line-2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      fontWeight: 700,
                      color: av.color,
                      flexShrink: 0,
                      fontFamily: "Inter Tight, sans-serif",
                    }}>
                      {getInitials(q.name)}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{q.name}</div>
                      <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 1 }}>{q.role}</div>
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "var(--accent)", letterSpacing: "-0.02em", flexShrink: 0 }}>{q.amt}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
