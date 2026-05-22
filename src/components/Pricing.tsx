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

const PLAN_IMGS: Record<string, string> = {
  pamati: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=900&auto=format&fit=crop&q=80",
  izaugsme: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&auto=format&fit=crop&q=80",
  meistars: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=900&auto=format&fit=crop&q=80",
};

export default function Pricing() {
  const t = useTranslations("Pricing");
  const plans = (t.raw("plans") ?? []) as PlanJson[];

  return (
    <section id="pricing" className="lp-section" style={{ padding: "120px 0", position: "relative", borderTop: "1px solid var(--line)", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 55% 55% at 20% 100%, color-mix(in oklab, var(--accent) 15%, transparent), transparent 60%), radial-gradient(ellipse 40% 40% at 85% 0%, color-mix(in oklab, var(--accent) 6%, transparent), transparent 55%)" }} />
      <div className="lp-container" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }}>
        <div className="lp-header-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "end", marginBottom: 56 }}>
          <div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.15em", color: "var(--ink-3)", textTransform: "uppercase" as const }}>
              <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--accent)" }} />
              {t("label")}
            </span>
            <h2 style={{ fontSize: "clamp(40px, 6vw, 84px)", lineHeight: 1.05, letterSpacing: "-0.035em", fontWeight: 600, margin: "16px 0 0", maxWidth: "14ch" }}>
              {t("titleA")}
              <span style={{ background: "linear-gradient(120deg, var(--accent), color-mix(in oklab, var(--accent) 70%, white))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", fontStyle: "italic", fontFamily: "Fraunces, Georgia, serif", fontWeight: 500 }}>
                {t("titleB")}
              </span>
            </h2>
          </div>
          <div style={{ paddingBottom: 8 }}>
            <p style={{ fontSize: 18, color: "var(--ink-2)", maxWidth: 640, lineHeight: 1.55 }}>
              <E id="pricing-sub">{t("subtitle")}</E>
            </p>
          </div>
        </div>

        <div className="lp-pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, alignItems: "stretch" }}>
          {plans.map((plan) => {
            const isPremium = plan.id === "meistars";
            const isHighlight = plan.highlight;
            const img = PLAN_IMGS[plan.id];

            return (
              <div
                key={plan.id}
                style={{
                  border: `1px solid ${isPremium ? "color-mix(in oklab, var(--accent) 30%, transparent)" : isHighlight ? "var(--accent)" : "var(--line)"}`,
                  borderRadius: 28,
                  background: isPremium
                    ? "linear-gradient(180deg, color-mix(in oklab, var(--accent) 7%, var(--bg-1)) 0%, var(--bg-1) 50%)"
                    : isHighlight
                      ? "linear-gradient(180deg, color-mix(in oklab, var(--accent) 8%, var(--bg-1)) 0%, var(--bg-1) 50%)"
                      : "var(--bg-1)",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  position: "relative",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  if (isPremium) {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 24px 64px -16px color-mix(in oklab, var(--accent) 20%, transparent)";
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "";
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                }}
              >
                {/* Image */}
                <div style={{ aspectRatio: "16/7", position: "relative", overflow: "hidden", background: "var(--bg-3)" }}>
                  <img
                    src={img}
                    alt=""
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    loading="lazy"
                  />
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: isPremium
                      ? "linear-gradient(to top, color-mix(in oklab, var(--accent) 8%, var(--bg-1)) 0%, rgba(0,0,0,0.35) 60%, transparent 100%)"
                      : "linear-gradient(to top, var(--bg-1) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)",
                    pointerEvents: "none",
                  }} />
                </div>

                <div style={{ padding: "20px 22px 22px", display: "flex", flexDirection: "column", gap: 0, flex: 1 }}>
                  {/* Badge */}
                  {plan.badge && (
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      padding: "4px 10px",
                      borderRadius: 999,
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.07em",
                      textTransform: "uppercase" as const,
                      fontFamily: "JetBrains Mono, monospace",
                      background: isPremium ? "var(--accent)" : isHighlight ? "var(--accent)" : "color-mix(in oklab, var(--accent) 12%, transparent)",
                      color: (isPremium || isHighlight) ? "var(--accent-ink)" : "var(--accent)",
                      border: (isPremium || isHighlight) ? "none" : "1px solid color-mix(in oklab, var(--accent) 25%, transparent)",
                      alignSelf: "flex-start",
                      marginBottom: 14,
                    }}>
                      {plan.badge}
                    </span>
                  )}

                  {/* Price + name */}
                  <div style={{ marginBottom: 6 }}>
                    <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 13, fontWeight: 700, color: "var(--accent)", marginBottom: 6 }}>
                      €{plan.price}{t("monthly")}
                    </div>
                    <h3 style={{ fontFamily: "Inter Tight, sans-serif", fontSize: 22, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.025em", lineHeight: 1.1, margin: "0 0 5px" }}>
                      <E id={`plan-${plan.id}-name`}>{plan.name}</E>
                    </h3>
                    <p style={{ fontSize: 13, color: "var(--ink-3)", lineHeight: 1.4, margin: 0 }}>
                      <E id={`plan-${plan.id}-tagline`}>{plan.tagline}</E>
                    </p>
                  </div>

                  {/* Earn badge */}
                  <div style={{ background: "var(--bg-2)", border: `1px solid ${isPremium ? "color-mix(in oklab, var(--accent) 20%, transparent)" : "var(--line)"}`, borderRadius: 10, padding: "10px 14px", margin: "14px 0" }}>
                    <div style={{ fontSize: 10, color: "var(--ink-4)", marginBottom: 3, fontFamily: "JetBrains Mono, monospace", textTransform: "uppercase" as const, letterSpacing: "0.06em" }}>{t("earnLabel")}</div>
                    <div className="metric" style={{ fontSize: 18, color: "var(--accent)" }}>{plan.earn}</div>
                  </div>

                  {/* Items */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                    {plan.items.map((item) => (
                      <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                        <svg style={{ flexShrink: 0, marginTop: 3 }} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.8">
                          <polyline points="20,6 9,17 4,12" />
                        </svg>
                        <span style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.45 }}>{item}</span>
                      </div>
                    ))}
                  </div>

                  <PricingCheckoutButton
                    plan={plan.id === "pamati" ? "PAMATI" : plan.id === "izaugsme" ? "IZAUGSME" : "MEISTARS"}
                    href={plan.href}
                    label={plan.cta}
                    className="mt-auto w-full rounded-xl font-bold text-sm text-center block"
                    style={
                      (isHighlight || isPremium)
                        ? { background: "var(--accent)", color: "var(--accent-ink)", borderRadius: 12, padding: "13px 0", fontWeight: 700, fontSize: 14, marginTop: "auto" }
                        : {
                            background: "var(--bg-2)",
                            border: "1px solid var(--line-2)",
                            color: "var(--ink)",
                            borderRadius: 12,
                            padding: "13px 0",
                            fontWeight: 600,
                            fontSize: 14,
                            marginTop: "auto",
                            transition: "border-color 0.15s ease, color 0.15s ease, background 0.15s ease",
                          }
                    }
                    onMouseEnter={(e) => {
                      if (!isHighlight && !isPremium) {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--accent)";
                        (e.currentTarget as HTMLButtonElement).style.color = "var(--accent)";
                        (e.currentTarget as HTMLButtonElement).style.background = "var(--bg-3)";
                      } else {
                        (e.currentTarget as HTMLButtonElement).style.filter = "brightness(1.07)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isHighlight && !isPremium) {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--line-2)";
                        (e.currentTarget as HTMLButtonElement).style.color = "var(--ink)";
                        (e.currentTarget as HTMLButtonElement).style.background = "var(--bg-2)";
                      } else {
                        (e.currentTarget as HTMLButtonElement).style.filter = "";
                      }
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
