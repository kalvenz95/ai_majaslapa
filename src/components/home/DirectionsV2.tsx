"use client";

import { Reveal } from "@/components/home/Reveal";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ArrowRight, Check } from "lucide-react";

type Track = {
  num: string;
  level: string;
  badge: string;
  title: string;
  desc: string;
  skills: string[];
  earn: string;
  earnSuffix: string;
  cta: string;
  link: string;
};

/** Visual identity per track — violet / teal (featured) / gold (premium, dark). */
const themes = [
  { color: "#6D5EF3", glow: "109,94,243", featured: false, premium: false },
  { color: "#00BFA5", glow: "0,191,165", featured: true, premium: false },
  { color: "#E3B95B", glow: "227,185,91", featured: false, premium: true },
];

/* Gold gradient tokens for the premium card */
const GOLD_BORDER = "linear-gradient(140deg, #F5DC92 0%, #D9B45B 35%, #B8860B 70%, #7A5A12 100%)";
const GOLD_FILL = "linear-gradient(135deg, #F5DC92 0%, #D9B45B 50%, #B8860B 100%)";
const GOLD_INK = "#1A1407"; // dark brown text on gold fills

export default function DirectionsV2() {
  const t = useTranslations("Services");
  const tracks = (t.raw("tracks") ?? []) as Track[];

  return (
    <section id="courses" style={{ padding: "150px 0 140px", background: "var(--bg)" }}>
      <div className="lp-container" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px" }}>
        {/* Header — editorial split: heading left, lead right */}
        <div className="dir-v2-head" style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: 48, alignItems: "end", marginBottom: 68 }}>
          <div>
            <Reveal><span className="v2-eyebrow">{t("kicker")}</span></Reveal>
            <Reveal delay={0.08}>
              <h2 className="v2-h2" style={{ fontSize: "clamp(40px, 6vw, 78px)", color: "var(--ink)", margin: "18px 0 0", maxWidth: "14ch" }}>
                {t("titleA")}<span style={{ color: "var(--accent)" }}>{t("titleB")}</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <p style={{ fontSize: 17, color: "var(--ink-3)", lineHeight: 1.7, margin: 0, paddingBottom: 10 }}>
              {t("lead")}
            </p>
          </Reveal>
        </div>

        {/* 3 track cards */}
        <div className="dir-v2-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, alignItems: "stretch" }}>
          {tracks.map((track, i) => {
            const th = themes[i] ?? themes[0];
            const premium = th.premium;
            const dark = th.featured || premium;
            return (
              <Reveal key={track.num} delay={0.07 * i} style={{ height: "100%" }}>
                <article
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 26,
                    padding: "34px 30px 30px",
                    position: "relative",
                    overflow: "hidden",
                    background: premium
                      ? `linear-gradient(#0B0A07, #0B0A07) padding-box, ${GOLD_BORDER} border-box`
                      : dark ? "#0D0D14" : "#fff",
                    border: premium
                      ? "1.5px solid transparent"
                      : dark ? `1px solid rgba(${th.glow},0.45)` : "1px solid var(--line)",
                    boxShadow: premium
                      ? `0 36px 90px -26px rgba(184,134,11,0.40), 0 12px 30px -12px rgba(11,10,7,0.55)`
                      : dark
                      ? `0 36px 90px -26px rgba(${th.glow},0.40), 0 12px 30px -12px rgba(13,13,20,0.35)`
                      : "var(--shadow-md)",
                    transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, border-color 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(-7px)";
                    el.style.boxShadow = premium
                      ? `0 48px 110px -28px rgba(184,134,11,0.55), 0 12px 30px -12px rgba(11,10,7,0.5)`
                      : `0 44px 100px -28px rgba(${th.glow},0.5), 0 12px 30px -12px rgba(17,17,17,0.14)`;
                    if (!dark) el.style.borderColor = `rgba(${th.glow},0.45)`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "";
                    el.style.boxShadow = premium
                      ? `0 36px 90px -26px rgba(184,134,11,0.40), 0 12px 30px -12px rgba(11,10,7,0.55)`
                      : dark
                      ? `0 36px 90px -26px rgba(${th.glow},0.40), 0 12px 30px -12px rgba(13,13,20,0.35)`
                      : "var(--shadow-md)";
                    if (!dark) el.style.borderColor = "var(--line)";
                  }}
                >
                  {/* Top glow inside dark card */}
                  {dark && (
                    <div aria-hidden style={{
                      position: "absolute", top: -90, left: "50%", transform: "translateX(-50%)",
                      width: 320, height: 200, pointerEvents: "none",
                      background: `radial-gradient(50% 60% at 50% 40%, rgba(${th.glow},0.35), transparent 75%)`,
                      filter: "blur(8px)",
                    }} />
                  )}

                  {/* Level + badge row */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 22, position: "relative" }}>
                    <span style={{
                      fontFamily: "JetBrains Mono, monospace", fontSize: 10.5, fontWeight: 600,
                      letterSpacing: "0.12em", textTransform: "uppercase",
                      color: premium ? "#E9CE84" : dark ? "rgba(255,255,255,0.55)" : "var(--ink-3)",
                      border: premium
                        ? "1px solid rgba(227,185,91,0.45)"
                        : dark ? "1px solid rgba(255,255,255,0.15)" : "1px solid var(--line-2)",
                      borderRadius: 999, padding: "5px 12px",
                    }}>
                      {track.level}
                    </span>
                    <span style={{
                      fontSize: 11, fontWeight: 700, fontFamily: "var(--font-sans)",
                      color: premium ? GOLD_INK : dark ? "#0D0D14" : th.color,
                      background: premium ? GOLD_FILL : dark ? th.color : `rgba(${th.glow},0.10)`,
                      border: dark ? "none" : `1px solid rgba(${th.glow},0.25)`,
                      borderRadius: 999, padding: "5px 12px", whiteSpace: "nowrap",
                      boxShadow: premium ? "0 6px 18px -6px rgba(184,134,11,0.6)" : "none",
                    }}>
                      {track.badge}
                    </span>
                  </div>

                  {/* Title + desc */}
                  <h3 style={{
                    fontSize: 26, fontWeight: 700, fontFamily: "var(--font-sans)",
                    letterSpacing: "-0.03em", lineHeight: 1.12,
                    color: dark ? "#fff" : "var(--ink)", margin: "0 0 10px", position: "relative",
                  }}>
                    {track.title}
                  </h3>
                  <p style={{ fontSize: 14.5, color: dark ? "rgba(255,255,255,0.55)" : "var(--ink-3)", lineHeight: 1.6, margin: "0 0 24px", position: "relative" }}>
                    {track.desc}
                  </p>

                  {/* Earn range — the money shot */}
                  <div style={{
                    borderRadius: 16, padding: "16px 18px", marginBottom: 24, position: "relative",
                    background: dark ? "rgba(255,255,255,0.05)" : `rgba(${th.glow},0.06)`,
                    border: dark ? "1px solid rgba(255,255,255,0.10)" : `1px solid rgba(${th.glow},0.18)`,
                  }}>
                    <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: dark ? "rgba(255,255,255,0.45)" : "var(--ink-3)", marginBottom: 5, fontFamily: "JetBrains Mono, monospace" }}>
                      Potenciāls
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
                      <span style={{
                        fontSize: 28, fontWeight: 700, fontFamily: "var(--font-sans)", letterSpacing: "-0.04em",
                        color: th.color,
                        ...(premium ? { background: GOLD_FILL, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" } : {}),
                      }}>
                        {track.earn}
                      </span>
                      <span style={{ fontSize: 13, color: dark ? "rgba(255,255,255,0.4)" : "var(--ink-3)" }}>{track.earnSuffix}</span>
                    </div>
                  </div>

                  {/* Skills */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28, flex: 1, position: "relative" }}>
                    {track.skills.map((skill) => (
                      <div key={skill} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <span style={{
                          width: 19, height: 19, borderRadius: 999, flexShrink: 0, marginTop: 1,
                          background: dark ? `rgba(${th.glow},0.20)` : `rgba(${th.glow},0.12)`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          <Check size={11} strokeWidth={3} color={th.color} />
                        </span>
                        <span style={{ fontSize: 13.5, fontWeight: 500, lineHeight: 1.5, color: dark ? "rgba(255,255,255,0.75)" : "var(--ink-2)" }}>
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href={track.link}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      padding: "15px 0", borderRadius: 13, fontSize: 14.5, fontWeight: 700,
                      fontFamily: "var(--font-sans)", letterSpacing: "-0.01em",
                      textDecoration: "none", position: "relative",
                      background: premium
                        ? GOLD_FILL
                        : dark
                        ? `linear-gradient(180deg, ${th.color}, color-mix(in oklab, ${th.color} 80%, #000))`
                        : "var(--bg-2)",
                      color: premium ? GOLD_INK : dark ? "#04221D" : "var(--ink)",
                      border: dark ? "none" : "1px solid var(--line-2)",
                      boxShadow: premium
                        ? `0 14px 34px -10px rgba(184,134,11,0.65), inset 0 1px 0 rgba(255,255,255,0.45)`
                        : dark ? `0 12px 30px -10px rgba(${th.glow},0.6), inset 0 1px 0 rgba(255,255,255,0.3)` : "var(--shadow-sm)",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = ""; }}
                  >
                    {track.cta.replace(" →", "")} <ArrowRight size={15} />
                  </Link>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .dir-v2-grid { grid-template-columns: 1fr !important; max-width: 480px; margin: 0 auto; }
          .dir-v2-head { grid-template-columns: 1fr !important; gap: 16px !important; align-items: start !important; margin-bottom: 44px !important; }
        }
      `}</style>
    </section>
  );
}
