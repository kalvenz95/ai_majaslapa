"use client";

import E from "@/components/E";
import { useTranslations } from "next-intl";

type ColLink = string | { name: string; href: string };
type Col = { title: string; links: ColLink[] };

export default function Footer() {
  const t = useTranslations("Footer");
  const columns = (t.raw("columns") ?? []) as Col[];

  return (
    <footer style={{ borderTop: "1px solid var(--line)", paddingTop: 64, paddingBottom: 32, padding: "64px 24px 32px", position: "relative" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 48, marginBottom: 48 }}>
          <div style={{ gridColumn: "span 2" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 11,
                  background: "var(--accent)",
                  color: "var(--accent-ink)",
                  display: "grid",
                  placeItems: "center",
                  fontWeight: 900,
                  fontSize: 20,
                  fontFamily: "Inter Tight, sans-serif",
                  boxShadow: "0 0 14px color-mix(in oklab, var(--accent) 25%, transparent)",
                }}
              >
                C
              </div>
              <span className="font-display" style={{ fontSize: 20, color: "var(--ink)", fontWeight: 800, letterSpacing: "-0.02em" }}>
                Chademy
              </span>
            </div>
            <p style={{ color: "var(--ink-3)", fontSize: 14, lineHeight: 1.6, maxWidth: 260 }}>
              <E id="footer-brand-desc">{t("brandDesc")}</E>
            </p>
            <div style={{ marginTop: 24, display: "flex", gap: 8 }}>
              {["𝕏", "in", "▶"].map((icon) => (
                <a
                  key={icon}
                  href="#"
                  className="card"
                  style={{
                    width: 32,
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 13,
                    color: "var(--ink-3)",
                    borderRadius: 9,
                    textDecoration: "none",
                    transition: "color 0.15s ease, border-color 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "var(--accent)";
                    e.currentTarget.style.borderColor = "color-mix(in oklab, var(--accent) 30%, transparent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "var(--ink-3)";
                    e.currentTarget.style.borderColor = "var(--line)";
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>

            <div style={{ marginTop: 24 }}>
              <p style={{ fontSize: 11, color: "var(--ink-4)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "Inter Tight, sans-serif", fontWeight: 700 }}>
                <E id="footer-newsletter-label">{t("newsletterLabel")}</E>
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  style={{
                    flex: 1,
                    background: "var(--bg-2)",
                    border: "1px solid var(--line)",
                    borderRadius: 10,
                    padding: "9px 12px",
                    fontSize: 14,
                    color: "var(--ink)",
                    outline: "none",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--line-2)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
                />
                <button type="button" className="btn-primary" style={{ padding: "9px 16px", borderRadius: 10, fontSize: 14 }}>
                  →
                </button>
              </div>
            </div>
          </div>

          {columns.map((category) => (
            <div key={category.title}>
              <h4 style={{ fontWeight: 700, color: "var(--ink)", fontSize: 12, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "Inter Tight, sans-serif" }}>{category.title}</h4>
              <ul style={{ display: "flex", flexDirection: "column", gap: 8, listStyle: "none", padding: 0, margin: 0 }}>
                {category.links.map((link) => {
                  const name = typeof link === "string" ? link : link.name;
                  const href = typeof link === "string" ? "#" : link.href;
                  return (
                    <li key={name}>
                      <a
                        href={href}
                        style={{ fontSize: 14, color: "var(--ink-3)", textDecoration: "none", transition: "color 0.15s ease" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-3)")}
                      >
                        {name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="neon-line" style={{ marginBottom: 24 }} />
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16, fontSize: 13, color: "var(--ink-4)" }}>
          <span><E id="footer-copyright">{t("copyright")}</E></span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span>{t("madeIn")}</span>
            <span style={{ color: "var(--accent)" }}>♥</span>
            <span>{t("inLatvia")}</span>
            <span>🇱🇻</span>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <a
              href="#"
              style={{ color: "var(--ink-4)", textDecoration: "none", transition: "color 0.15s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink-3)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-4)")}
            >
              {t("terms")}
            </a>
            <a
              href="#"
              style={{ color: "var(--ink-4)", textDecoration: "none", transition: "color 0.15s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink-3)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-4)")}
            >
              {t("privacy")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
