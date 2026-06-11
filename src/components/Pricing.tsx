"use client";

import E from "@/components/E";
import { PricingCheckoutButton } from "@/components/PricingCheckoutButton";
import { useTranslations } from "next-intl";

type PlanJson = {
  id: string;
  badge?: string;
  name: string;
  tagline: string;
  price: string;
  earn: string;
  highlight: boolean;
  href: string;
  items: string[];
  cta: string;
};

export default function Pricing() {
  const t = useTranslations("Pricing");
  const plans = (t.raw("plans") ?? []) as PlanJson[];

  return (
    <section id="pricing" style={{ padding: "120px 0", background: "#FFFFFF", borderTop: "1px solid var(--line)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 64px" }}>
          <h2 style={{
            fontSize: "clamp(42px, 7vw, 80px)",
            fontWeight: 900,
            fontFamily: "Inter Tight, sans-serif",
            letterSpacing: "-0.04em",
            lineHeight: 1.06,
            color: "var(--ink)",
            margin: "0 0 20px",
          }}>
            {t("titleA")}
            <span style={{ color: "var(--accent)" }}>{t("titleB")}</span>
          </h2>
          <p style={{ fontSize: 18, color: "var(--ink-3)", lineHeight: 1.65 }}>
            <E id="pricing-sub">{t("subtitle")}</E>
          </p>
        </div>

        {/* 3 pricing cards */}
        <div
          className="lp-pricing-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, alignItems: "stretch" }}
        >
          {plans.map((plan) => {
            const isHighlight = plan.highlight;
            const isPremium = plan.id === "meistars";

            return (
              <div
                key={plan.id}
                style={{
                  background: isHighlight ? "var(--ink)" : "var(--bg-1)",
                  border: `${isHighlight ? 2 : 1}px solid ${isHighlight ? "var(--accent)" : "var(--line)"}`,
                  borderRadius: 24,
                  padding: "32px 28px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 0,
                  position: "relative",
                  transform: isHighlight ? "scale(1.03)" : "none",
                  boxShadow: isHighlight
                    ? "0 32px 80px -20px rgba(109,94,243,0.32), 0 8px 24px -8px rgba(109,94,243,0.22)"
                    : "var(--shadow-md)",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isHighlight) {
                    (e.currentTarget as HTMLElement).style.borderColor = "color-mix(in oklab, var(--accent) 28%, transparent)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-lg)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isHighlight) {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--line)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)";
                    (e.currentTarget as HTMLElement).style.transform = "none";
                  }
                }}
              >
                {/* Badge */}
                {isHighlight && plan.badge && (
                  <span style={{
                    position: "absolute", top: -1, left: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "inline-flex", alignItems: "center",
                    padding: "7px 18px", borderRadius: 999,
                    fontSize: 12, fontWeight: 700, fontFamily: "Inter Tight, sans-serif",
                    background: "var(--accent)", color: "#fff",
                    whiteSpace: "nowrap",
                    boxShadow: "0 8px 24px -8px color-mix(in oklab, var(--accent) 55%, transparent)",
                  }}>
                    {plan.badge}
                  </span>
                )}
                {isHighlight && <div style={{ height: 16 }} />}

                {/* Price */}
                <div style={{ marginBottom: 8 }}>
                  <span style={{
                    fontSize: 52, fontWeight: 900, fontFamily: "Inter Tight, sans-serif",
                    letterSpacing: "-0.04em", lineHeight: 1,
                    color: isHighlight ? "#fff" : "var(--ink)",
                  }}>
                    €{plan.price}
                  </span>
                  <span style={{ fontSize: 15, color: isHighlight ? "rgba(255,255,255,0.5)" : "var(--ink-3)", marginLeft: 4 }}>
                    {t("monthly")}
                  </span>
                </div>

                {/* Name + tagline */}
                <h3 style={{
                  fontSize: 20, fontWeight: 800, fontFamily: "Inter Tight, sans-serif",
                  letterSpacing: "-0.02em", color: isHighlight ? "#fff" : "var(--ink)",
                  margin: "0 0 6px",
                }}>
                  <E id={`plan-${plan.id}-name`}>{plan.name}</E>
                </h3>
                <p style={{ fontSize: 13, color: isHighlight ? "rgba(255,255,255,0.55)" : "var(--ink-3)", margin: "0 0 24px", lineHeight: 1.4 }}>
                  <E id={`plan-${plan.id}-tagline`}>{plan.tagline}</E>
                </p>

                {/* Items */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28, flex: 1 }}>
                  {plan.items.map((item) => (
                    <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <svg style={{ flexShrink: 0, marginTop: 3 }} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={isHighlight ? "color-mix(in oklab, var(--accent) 80%, #fff)" : "var(--accent)"} strokeWidth="3">
                        <polyline points="20,6 9,17 4,12" />
                      </svg>
                      <span style={{ fontSize: 13.5, color: isHighlight ? "rgba(255,255,255,0.75)" : "var(--ink-2)", lineHeight: 1.45 }}>{item}</span>
                    </div>
                  ))}
                </div>

                <PricingCheckoutButton
                  plan={plan.id === "pamati" ? "PAMATI" : plan.id === "izaugsme" ? "IZAUGSME" : "MEISTARS"}
                  href={plan.href}
                  label={plan.cta}
                  style={
                    isHighlight
                      ? { background: "var(--accent)", color: "#fff", borderRadius: 12, padding: "14px 0", fontWeight: 700, fontSize: 14, width: "100%", display: "block", textAlign: "center" }
                      : { background: "var(--bg-2)", border: "1px solid var(--line-2)", color: "var(--ink)", borderRadius: 12, padding: "14px 0", fontWeight: 600, fontSize: 14, width: "100%", display: "block", textAlign: "center" }
                  }
                />
              </div>
            );
          })}
        </div>

        {/* Trust micro */}
        <div style={{ display: "flex", justifyContent: "center", gap: 28, flexWrap: "wrap", marginTop: 40 }}>
          {["Saturs latviešu valodā", "Piekļuve uzreiz", "Kopienas piekļuve", "Praktiski materiāli"].map((badge) => (
            <span key={badge} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--ink-3)" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.8">
                <polyline points="20,6 9,17 4,12" />
              </svg>
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
