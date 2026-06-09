"use client";

import { useTranslations } from "next-intl";

type CardCopy = {
  label: string;
  range: string;
  desc: string;
  math?: string;
  color?: string;
};

export default function AILaunchpad() {
  const t = useTranslations("AILaunchpad");
  const cardColors = ["var(--accent)", "var(--accent-2)", "var(--accent-3)"];
  const cards = (
    ((t.raw("cards") ?? []) as CardCopy[]).map((c, i) => ({
      ...c,
      color: c.color ?? cardColors[i] ?? "var(--accent)",
    }))
  );

  return (
    <section style={{ padding: "120px 0 64px", position: "relative", overflow: "hidden", borderTop: "1px solid var(--line)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        {/* big heading */}
        <div style={{ marginBottom: 64 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "Inter Tight, sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: "var(--ink-3)", textTransform: "uppercase" as const }}>
            <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--accent)" }} />
            Ienākumi
          </span>
          <h2 style={{ fontSize: "clamp(40px, 6vw, 84px)", lineHeight: 1.05, letterSpacing: "-0.035em", fontWeight: 600, margin: "16px 0 0", maxWidth: "16ch" }}>
            {t("titleA")}
            <span style={{ color: "var(--accent)", fontFamily: "Inter Tight, sans-serif", fontWeight: 600 }}>
              {t("titleB")}
            </span>
          </h2>
        </div>

        <div style={{ maxWidth: 900 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 24 }}>
            <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--accent)", marginTop: 7, flexShrink: 0 }} />
            <span style={{ fontFamily: "Inter, sans-serif", fontSize: 14, letterSpacing: "0", color: "var(--ink-2)", lineHeight: 1.6 }}>
              {t("kicker")}
            </span>
          </div>

        <div className="lp-three-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {cards.map((item, i) => (
            <div
              key={`${item.label}-${i}`}
              style={{
                padding: "32px 28px",
                background: "var(--bg-2)",
                border: `1px solid color-mix(in oklab, ${item.color} 22%, var(--line))`,
                borderRadius: 22,
                position: "relative",
                overflow: "hidden",
                transition: "transform 0.22s cubic-bezier(0.32,0.72,0,1), box-shadow 0.22s",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 40px -12px color-mix(in oklab, ${item.color} 22%, transparent)`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "";
                (e.currentTarget as HTMLElement).style.boxShadow = "";
              }}
            >
              {/* Subtle gradient accent in corner */}
              <div style={{ position: "absolute", top: 0, right: 0, width: 120, height: 120, background: `radial-gradient(circle at top right, color-mix(in oklab, ${item.color} 14%, transparent), transparent 70%)`, pointerEvents: "none" }} />

              <div style={{ fontFamily: "Inter Tight, sans-serif", fontWeight: 700, fontSize: 11, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 20 }}>
                {item.label}
              </div>
              <div style={{ fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 800, letterSpacing: "-0.04em", color: item.color, lineHeight: 1, marginBottom: 6, fontFamily: "Inter Tight, sans-serif" }}>
                {item.range}
              </div>
              <div style={{ fontSize: 12, color: "var(--ink-3)", marginBottom: 16, fontWeight: 500 }}>{t("perMonth")}</div>
              <div style={{ width: 32, height: 2, background: `color-mix(in oklab, ${item.color} 40%, transparent)`, borderRadius: 999, marginBottom: 16 }} />
              <div style={{ fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.6, marginBottom: 20 }}>{item.desc}</div>
              {item.math && (
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 14px", borderRadius: 999, background: `color-mix(in oklab, ${item.color} 10%, transparent)`, border: `1px solid color-mix(in oklab, ${item.color} 22%, transparent)`, fontSize: 12, fontWeight: 600, color: item.color, fontFamily: "Inter Tight, sans-serif", letterSpacing: "-0.01em" }}>
                  {item.math}
                </div>
              )}
            </div>
          ))}
        </div>

          <div style={{ marginTop: 14 }}>
            <p style={{ fontSize: 12, color: "var(--ink-3)", fontFamily: "Inter, sans-serif", lineHeight: 1.6 }}>
              {t("footer")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
