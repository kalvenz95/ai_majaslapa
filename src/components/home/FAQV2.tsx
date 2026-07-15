"use client";

import { useState } from "react";
import { Reveal } from "@/components/home/Reveal";
import { Link } from "@/i18n/navigation";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";

type Faq = { q: string; a: string };

export default function FAQV2() {
  const [open, setOpen] = useState<number | null>(0);
  const t = useTranslations("FAQ");
  const faqs = (t.raw("items") ?? []) as Faq[];

  return (
    <section id="faq" style={{ padding: "140px 0", background: "#fff", borderTop: "1px solid var(--line)" }}>
      <div className="lp-container" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 28px" }}>
        <div className="faq-v2-grid" style={{ display: "grid", gridTemplateColumns: "0.85fr 1.15fr", gap: 72, alignItems: "start" }}>
          {/* Left — sticky heading */}
          <div className="faq-v2-head" style={{ position: "sticky", top: 120 }}>
            <Reveal><span className="v2-eyebrow">{t("kicker")}</span></Reveal>
            <Reveal delay={0.08}>
              <h2 className="v2-h2" style={{ fontSize: "clamp(38px, 5.5vw, 64px)", color: "var(--ink)", margin: "18px 0 18px" }}>
                {t("titleA")}<span style={{ color: "var(--accent)" }}>{t("titleB")}</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p style={{ fontSize: 16.5, color: "var(--ink-3)", lineHeight: 1.7, maxWidth: 340 }}>
                {t("lead")}{" "}
                <Link href="/kontakti" style={{ color: "var(--accent)", fontWeight: 600, textDecoration: "none", borderBottom: "1px solid color-mix(in oklab, var(--accent) 40%, transparent)" }}>
                  {t("leadLink")}
                </Link>
              </p>
            </Reveal>
          </div>

          {/* Right — hairline accordion */}
          <div>
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <Reveal key={item.q} delay={0.04 * i}>
                  <div style={{ borderBottom: "1px solid var(--line)" }}>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      style={{
                        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                        gap: 18, padding: "24px 4px", background: "none", border: "none",
                        cursor: "pointer", textAlign: "left", font: "inherit",
                      }}
                    >
                      <span style={{
                        fontSize: 16.5, fontWeight: 700, letterSpacing: "-0.015em",
                        fontFamily: "var(--font-sans)",
                        color: isOpen ? "var(--accent)" : "var(--ink)",
                        transition: "color 0.2s ease",
                      }}>
                        {item.q}
                      </span>
                      <span style={{
                        flexShrink: 0, width: 32, height: 32, borderRadius: 999,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: isOpen ? "linear-gradient(135deg, var(--accent), #8B7BFF)" : "var(--bg-2)",
                        color: isOpen ? "#fff" : "var(--ink-3)",
                        border: isOpen ? "none" : "1px solid var(--line-2)",
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                        transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), background 0.2s ease, color 0.2s ease",
                        boxShadow: isOpen ? "0 8px 20px -6px rgba(109,94,243,0.5)" : "none",
                      }}>
                        <Plus size={15} strokeWidth={2.5} />
                      </span>
                    </button>
                    <div style={{
                      display: "grid",
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      transition: "grid-template-rows 0.35s cubic-bezier(0.16,1,0.3,1)",
                    }}>
                      <div style={{ overflow: "hidden" }}>
                        <p style={{ margin: 0, padding: "0 44px 24px 4px", fontSize: 15, color: "var(--ink-2)", lineHeight: 1.7, maxWidth: "58ch" }}>
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .faq-v2-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .faq-v2-head { position: static !important; }
        }
      `}</style>
    </section>
  );
}
