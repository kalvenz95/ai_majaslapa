"use client";

import { Reveal } from "@/components/home/Reveal";
import E from "@/components/E";
import { PricingCheckoutButton } from "@/components/PricingCheckoutButton";
import { useTranslations } from "next-intl";
import { Check } from "lucide-react";

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

const themes: Record<string, { color: string; glow: string }> = {
  pamati: { color: "#6D5EF3", glow: "109,94,243" },
  izaugsme: { color: "#6D5EF3", glow: "109,94,243" },
  meistars: { color: "#E8923C", glow: "232,146,60" },
};

export default function PricingV2() {
  const t = useTranslations("Pricing");
  const plans = (t.raw("plans") ?? []) as PlanJson[];

  return (
    <section id="pricing" style={{ padding: "150px 0 140px", background: "var(--bg)", borderTop: "1px solid var(--line)", position: "relative", overflow: "hidden" }}>
      {/* soft aurora behind the featured card */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(44% 36% at 50% 42%, color-mix(in oklab, var(--accent) 8%, transparent), transparent 70%)",
      }} />

      <div className="lp-container" style={{ maxWidth: 1180, margin: "0 auto", padding: "0 28px", position: "relative" }}>
        {/* Header */}
        <div style={{ maxWidth: 700, margin: "0 auto 72px", textAlign: "center" }}>
          <Reveal><span className="v2-eyebrow">{t("label")}</span></Reveal>
          <Reveal delay={0.08}>
            <h2 className="v2-h2" style={{ fontSize: "clamp(40px, 6.5vw, 80px)", color: "var(--ink)", margin: "18px 0 22px" }}>
              {t("titleA")}<span style={{ color: "var(--accent)" }}>{t("titleB")}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p style={{ fontSize: 18, color: "var(--ink-3)", lineHeight: 1.7, maxWidth: 540, margin: "0 auto" }}>
              <E id="pricing-sub">{t("subtitle")}</E>
            </p>
          </Reveal>
        </div>

        {/* Cards */}
        <div className="pricing-v2-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, alignItems: "stretch" }}>
          {plans.map((plan, i) => {
            const dark = plan.highlight;
            const th = themes[plan.id] ?? themes.pamati;
            return (
              <Reveal key={plan.id} delay={0.07 * i} style={{ height: "100%" }}>
                <div
                  style={{
                    height: "100%", display: "flex", flexDirection: "column",
                    background: dark ? "#0D0D14" : "#fff",
                    border: dark ? "1px solid rgba(109,94,243,0.55)" : "1px solid var(--line)",
                    borderRadius: 26,
                    padding: dark ? "40px 30px 32px" : "34px 30px 32px",
                    position: "relative", overflow: "hidden",
                    boxShadow: dark
                      ? "0 44px 110px -30px rgba(109,94,243,0.45), 0 14px 36px -14px rgba(13,13,20,0.4)"
                      : "var(--shadow-md)",
                    transform: dark ? "scale(1.035)" : "none",
                    transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, border-color 0.25s ease",
                    zIndex: dark ? 2 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (dark) return;
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(-5px)";
                    el.style.borderColor = `rgba(${th.glow},0.4)`;
                    el.style.boxShadow = "var(--shadow-lg)";
                  }}
                  onMouseLeave={(e) => {
                    if (dark) return;
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "";
                    el.style.borderColor = "var(--line)";
                    el.style.boxShadow = "var(--shadow-md)";
                  }}
                >
                  {/* featured glow */}
                  {dark && (
                    <div aria-hidden style={{
                      position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)",
                      width: 360, height: 220, pointerEvents: "none",
                      background: "radial-gradient(50% 60% at 50% 40%, rgba(109,94,243,0.4), transparent 75%)",
                      filter: "blur(10px)",
                    }} />
                  )}

                  {/* badge */}
                  {plan.badge && (
                    <span style={{
                      alignSelf: "flex-start",
                      fontSize: 11, fontWeight: 700, fontFamily: "var(--font-sans)",
                      borderRadius: 999, padding: "6px 14px", marginBottom: 20, position: "relative",
                      background: dark ? "linear-gradient(135deg, var(--accent), #8B7BFF)" : `rgba(${th.glow},0.09)`,
                      color: dark ? "#fff" : th.color,
                      border: dark ? "none" : `1px solid rgba(${th.glow},0.22)`,
                      boxShadow: dark ? "0 8px 22px -8px rgba(109,94,243,0.6)" : "none",
                    }}>
                      {plan.badge}
                    </span>
                  )}

                  {/* name + tagline */}
                  <h3 style={{
                    fontSize: 21, fontWeight: 700, fontFamily: "var(--font-sans)",
                    letterSpacing: "-0.025em", color: dark ? "#fff" : "var(--ink)", margin: "0 0 5px", position: "relative",
                  }}>
                    <E id={`plan-${plan.id}-name`}>{plan.name}</E>
                  </h3>
                  <p style={{ fontSize: 13, color: dark ? "rgba(255,255,255,0.5)" : "var(--ink-3)", margin: "0 0 24px", lineHeight: 1.5, position: "relative" }}>
                    <E id={`plan-${plan.id}-tagline`}>{plan.tagline}</E>
                  </p>

                  {/* price */}
                  <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 14, position: "relative" }}>
                    <span style={{
                      fontSize: 56, fontWeight: 700, fontFamily: "var(--font-sans)",
                      letterSpacing: "-0.05em", lineHeight: 1,
                      color: dark ? "#fff" : "var(--ink)",
                    }}>
                      €{plan.price}
                    </span>
                    <span style={{ fontSize: 15, color: dark ? "rgba(255,255,255,0.45)" : "var(--ink-3)" }}>{t("monthly")}</span>
                  </div>

                  {/* earn chip */}
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 8, alignSelf: "flex-start",
                    fontFamily: "JetBrains Mono, monospace", fontSize: 11.5, fontWeight: 600,
                    borderRadius: 9, padding: "8px 12px", marginBottom: 26, position: "relative",
                    color: dark ? "#34D9C3" : "var(--teal-ink)",
                    background: dark ? "rgba(0,191,165,0.10)" : "rgba(0,191,165,0.07)",
                    border: dark ? "1px solid rgba(0,191,165,0.28)" : "1px solid rgba(0,191,165,0.2)",
                  }}>
                    {t("earnLabel")}: {plan.earn}
                  </div>

                  {/* items */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 11, marginBottom: 30, flex: 1, position: "relative" }}>
                    {plan.items.map((item) => (
                      <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <span style={{
                          width: 18, height: 18, borderRadius: 999, flexShrink: 0, marginTop: 1.5,
                          background: dark ? "rgba(109,94,243,0.28)" : `rgba(${th.glow},0.10)`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          <Check size={10.5} strokeWidth={3.2} color={dark ? "#A89DFF" : th.color} />
                        </span>
                        <span style={{ fontSize: 13.5, lineHeight: 1.5, color: dark ? "rgba(255,255,255,0.72)" : "var(--ink-2)" }}>{item}</span>
                      </div>
                    ))}
                  </div>

                  <PricingCheckoutButton
                    plan={plan.id === "pamati" ? "PAMATI" : plan.id === "izaugsme" ? "IZAUGSME" : "MEISTARS"}
                    href={plan.href}
                    label={plan.cta}
                    style={
                      dark
                        ? {
                            background: "linear-gradient(180deg, color-mix(in oklab, var(--accent) 88%, #fff) 0%, var(--accent) 45%, color-mix(in oklab, var(--accent) 86%, #000) 100%)",
                            color: "#fff", borderRadius: 13, padding: "15px 0", fontWeight: 700, fontSize: 14.5,
                            width: "100%", display: "block", textAlign: "center", position: "relative",
                            fontFamily: "var(--font-sans)", letterSpacing: "-0.01em",
                            boxShadow: "0 14px 34px -10px rgba(109,94,243,0.6), inset 0 1px 0 rgba(255,255,255,0.25)",
                          }
                        : {
                            background: "var(--bg-2)", border: "1px solid var(--line-2)", color: "var(--ink)",
                            borderRadius: 13, padding: "15px 0", fontWeight: 700, fontSize: 14.5,
                            width: "100%", display: "block", textAlign: "center",
                            fontFamily: "var(--font-sans)", letterSpacing: "-0.01em",
                          }
                    }
                  />
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Trust micro */}
        <Reveal delay={0.18}>
          <div style={{ display: "flex", justifyContent: "center", gap: 28, flexWrap: "wrap", marginTop: 48 }}>
            {["Saturs latviešu valodā", "Piekļuve uzreiz", "Kopienas piekļuve", "Praktiski materiāli"].map((badge) => (
              <span key={badge} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--ink-3)", fontWeight: 500 }}>
                <Check size={13} strokeWidth={3} color="var(--accent)" /> {badge}
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .pricing-v2-grid { grid-template-columns: 1fr !important; max-width: 460px; margin: 0 auto; }
          .pricing-v2-grid > div > div { transform: none !important; }
        }
      `}</style>
    </section>
  );
}
