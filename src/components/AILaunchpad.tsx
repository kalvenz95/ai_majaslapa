"use client";

import { useTranslations } from "next-intl";

type CardCopy = {
  label: string;
  range: string;
  desc: string;
  color?: string;
};

export default function AILaunchpad() {
  const t = useTranslations("AILaunchpad");
  const cardColors = ["var(--accent)", "var(--ink-2)", "var(--ink-3)"];
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
          <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.15em", color: "var(--ink-3)", textTransform: "uppercase" as const }}>
            <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--accent)" }} />
            Ienākumi
          </span>
          <h2 style={{ fontSize: "clamp(40px, 6vw, 84px)", lineHeight: 1.05, letterSpacing: "-0.035em", fontWeight: 600, margin: "16px 0 0", maxWidth: "16ch" }}>
            {t("titleA")}
            <span style={{ color: "var(--ink-2)", fontStyle: "italic", fontFamily: "Fraunces, Georgia, serif", fontWeight: 500 }}>
              {t("titleB")}
            </span>
          </h2>
        </div>

        <div style={{ maxWidth: 900 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 24 }}>
            <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--accent)", marginTop: 7, flexShrink: 0 }} />
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 13, letterSpacing: "0.06em", color: "var(--ink-2)", lineHeight: 1.6 }}>
              {t("kicker")}
            </span>
          </div>

        <div className="lp-three-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
          {cards.map((item, i) => (
            <div
              key={`${item.label}-${i}`}
              style={{
                padding: "24px 20px",
                background: "var(--bg-1)",
                borderTop: `2px solid ${item.color}`,
                borderRight: i < 2 ? "1px solid var(--line)" : "none",
              }}
            >
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "var(--ink-2)", textTransform: "uppercase", letterSpacing: "0.10em", marginBottom: 12 }}>
                {item.label}
              </div>
              <div style={{ fontSize: "clamp(18px, 4vw, 26px)", fontWeight: 700, letterSpacing: "-0.03em", color: item.color, lineHeight: 1.1, marginBottom: 4 }}>
                {item.range}
              </div>
              <div style={{ fontSize: 12, color: "var(--ink-3)", marginBottom: 10 }}>{t("perMonth")}</div>
              <div style={{ fontSize: 12, color: "var(--ink-2)", lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>

          <div style={{ marginTop: 14 }}>
            <p style={{ fontSize: 10, color: "var(--ink-3)", fontFamily: "JetBrains Mono, monospace", lineHeight: 1.6 }}>
              {t("footer")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
