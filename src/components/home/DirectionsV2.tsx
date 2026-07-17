"use client";

import { Reveal } from "@/components/home/Reveal";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { ArrowRight, Check, Code2, Bot } from "lucide-react";

type ClaudeSkill = { title: string; desc: string; tag: string };

type Track = {
  num: string;
  level: string;
  badge: string;
  title: string;
  /** Neobligāts — rāda tikai paka, kurai ir vairāki virzieni zem viena nosaukuma. */
  subtitle?: string;
  desc: string;
  skills: string[];
  earn: string;
  earnSuffix: string;
  cta: string;
  link: string;
};

/** Visual identity per track — violet / Claude warm (featured) / gold (premium, dark). */
const themes = [
  { color: "#6D5EF3", glow: "109,94,243", featured: false, premium: false, claude: false },
  { color: "#D97757", glow: "217,119,87", featured: true, premium: false, claude: true },
  { color: "#E3B95B", glow: "227,185,91", featured: false, premium: true, claude: false },
];

/* Gold gradient tokens for the premium card */
const GOLD_BORDER = "linear-gradient(140deg, #F5DC92 0%, #D9B45B 35%, #B8860B 70%, #7A5A12 100%)";
const GOLD_FILL = "linear-gradient(135deg, #F5DC92 0%, #D9B45B 50%, #B8860B 100%)";
const GOLD_INK = "#1A1407"; // dark brown text on gold fills

/* Claude warm palette — cream → light yellow → terracotta */
const CLAUDE_INK = "#2B1B12";
const CLAUDE_FILL = "linear-gradient(135deg, #E9A23B 0%, #D97757 55%, #BD5D3A 100%)";
const CLAUDE_SKILL_ICONS = [Code2, Bot];

/** Sunburst mark — the Claude-adjacent motif, drawn as plain geometry. */
function Sunburst({ size = 22, color = "#D97757", opacity = 1 }: { size?: number; color?: string; opacity?: number }) {
  const spokes = Array.from({ length: 12 }, (_, i) => (i * 180) / 12);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden style={{ opacity, display: "block" }}>
      {spokes.map((a) => (
        <rect
          key={a}
          x="11.1" y="1.6" width="1.8" height="20.8" rx="0.9"
          fill={color}
          transform={`rotate(${a} 12 12)`}
        />
      ))}
    </svg>
  );
}

/** Abstract visual band — website build + assistant, in Claude's warm register. */
function ClaudeVisual() {
  return (
    <div
      aria-hidden
      style={{
        position: "relative",
        height: 92,
        borderRadius: 18,
        overflow: "hidden",
        marginBottom: 18,
        background:
          "radial-gradient(120% 140% at 8% 0%, rgba(243,220,160,0.85), transparent 58%)," +
          "radial-gradient(110% 130% at 100% 100%, rgba(217,119,87,0.30), transparent 62%)," +
          "linear-gradient(140deg, #FFFCF5 0%, #FDF0DC 100%)",
        border: "1px solid rgba(217,119,87,0.20)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.85), inset 0 -18px 30px -22px rgba(189,93,58,0.45)",
      }}
    >
      {/* faint sunburst, oversized and cropped */}
      <div style={{ position: "absolute", right: -20, top: -24 }}>
        <Sunburst size={96} color="#D97757" opacity={0.11} />
      </div>

      {/* abstract "browser" — website built with Claude Code */}
      <div style={{
        position: "absolute", left: 16, top: 14, width: 104,
        borderRadius: 9, overflow: "hidden",
        background: "rgba(255,255,255,0.92)",
        border: "1px solid rgba(217,119,87,0.22)",
        boxShadow: "0 10px 22px -10px rgba(189,93,58,0.45)",
      }}>
        <div style={{ display: "flex", gap: 3, padding: "5px 7px", borderBottom: "1px solid rgba(217,119,87,0.14)" }}>
          {["#D97757", "#E9A23B", "#F3DCA0"].map((c) => (
            <span key={c} style={{ width: 4, height: 4, borderRadius: 999, background: c }} />
          ))}
        </div>
        <div style={{ padding: "7px 7px 9px", display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ height: 8, width: "70%", borderRadius: 3, background: "linear-gradient(90deg, #D97757, #E9A23B)" }} />
          <span style={{ height: 4, width: "92%", borderRadius: 3, background: "rgba(43,27,18,0.14)" }} />
          <span style={{ height: 4, width: "60%", borderRadius: 3, background: "rgba(43,27,18,0.10)" }} />
        </div>
      </div>

      {/* abstract assistant reply — AI personal assistant */}
      <div style={{ position: "absolute", left: 136, top: 18, display: "flex", flexDirection: "column", gap: 5 }}>
        <span style={{
          alignSelf: "flex-start", height: 13, width: 62, borderRadius: "8px 8px 8px 2px",
          background: "rgba(255,255,255,0.9)", border: "1px solid rgba(217,119,87,0.22)",
        }} />
        <span style={{
          alignSelf: "flex-end", height: 13, width: 44, borderRadius: "8px 8px 2px 8px",
          background: CLAUDE_FILL, boxShadow: "0 6px 14px -6px rgba(189,93,58,0.6)",
        }} />
        <span style={{
          alignSelf: "flex-start", height: 13, width: 74, borderRadius: "8px 8px 8px 2px",
          background: "rgba(255,255,255,0.9)", border: "1px solid rgba(217,119,87,0.22)",
        }} />
      </div>

      {/* automation flow — three nodes wired together */}
      <div style={{ position: "absolute", right: 18, bottom: 16, display: "flex", alignItems: "center", gap: 5 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{
              width: 9, height: 9, borderRadius: 3,
              background: i === 1 ? CLAUDE_FILL : "rgba(255,255,255,0.95)",
              border: "1px solid rgba(217,119,87,0.35)",
            }} />
            {i < 2 && <span style={{ width: 12, height: 1.5, borderRadius: 2, background: "rgba(217,119,87,0.4)" }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DirectionsV2() {
  const t = useTranslations("Services");
  const tracks = (t.raw("tracks") ?? []) as Track[];
  const claudeSkills = (t.raw("claudeSkills") ?? []) as ClaudeSkill[];

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
            const featured = th.featured;
            const claude = th.claude;
            const dark = premium; // only the premium card is dark now

            const claudeRest = `0 34px 84px -26px rgba(217,119,87,0.42), 0 14px 36px -14px rgba(233,162,59,0.30), inset 0 1px 0 rgba(255,255,255,0.9)`;
            const claudeHover = `0 52px 116px -28px rgba(217,119,87,0.58), 0 18px 44px -14px rgba(233,162,59,0.42), inset 0 1px 0 rgba(255,255,255,0.9)`;
            const restShadow = premium
              ? `0 36px 90px -26px rgba(184,134,11,0.40), 0 12px 30px -12px rgba(11,10,7,0.55)`
              : claude
              ? claudeRest
              : featured
              ? `0 28px 70px -28px rgba(${th.glow},0.32), var(--shadow-md)`
              : "var(--shadow-md)";

            return (
              <Reveal key={track.num} delay={0.07 * i} style={{ height: "100%" }}>
                <div style={{ position: "relative", height: "100%" }}>
                  {/* Premium warm halo — sits behind the Package 2 card only */}
                  {claude && (
                    <div
                      aria-hidden
                      className="claude-halo"
                      style={{
                        position: "absolute", inset: -26, borderRadius: 44, pointerEvents: "none",
                        background:
                          "radial-gradient(56% 46% at 50% 0%, rgba(243,220,160,0.75), transparent 70%)," +
                          "radial-gradient(70% 60% at 50% 106%, rgba(217,119,87,0.45), transparent 72%)",
                        filter: "blur(26px)",
                      }}
                    />
                  )}
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
                      : claude
                      ? "linear-gradient(168deg, #FFFDF9 0%, #FDF6EA 46%, #FAEBD6 100%)"
                      : featured
                      ? `linear-gradient(180deg, rgba(${th.glow},0.07), #fff 70%)`
                      : "#fff",
                    border: premium
                      ? "1.5px solid transparent"
                      : claude
                      ? "1.5px solid rgba(217,119,87,0.34)"
                      : featured ? `1.5px solid rgba(${th.glow},0.40)` : "1px solid var(--line)",
                    boxShadow: restShadow,
                    transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, border-color 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "translateY(-7px)";
                    el.style.boxShadow = premium
                      ? `0 48px 110px -28px rgba(184,134,11,0.55), 0 12px 30px -12px rgba(11,10,7,0.5)`
                      : claude
                      ? claudeHover
                      : `0 44px 100px -28px rgba(${th.glow},0.5), 0 12px 30px -12px rgba(17,17,17,0.14)`;
                    if (!dark) el.style.borderColor = claude ? "rgba(217,119,87,0.5)" : `rgba(${th.glow},0.45)`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = "";
                    el.style.boxShadow = restShadow;
                    if (!dark) el.style.borderColor = claude ? "rgba(217,119,87,0.34)" : featured ? `rgba(${th.glow},0.40)` : "var(--line)";
                  }}
                >
                  {/* Soft warm wash inside the Package 2 card */}
                  {claude && (
                    <div aria-hidden style={{
                      position: "absolute", inset: 0, pointerEvents: "none",
                      background:
                        "radial-gradient(60% 34% at 100% 0%, rgba(243,220,160,0.55), transparent 68%)," +
                        "radial-gradient(52% 30% at 0% 100%, rgba(217,119,87,0.10), transparent 70%)",
                    }} />
                  )}

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
                      color: premium ? "#E9CE84" : claude ? "#8A5638" : dark ? "rgba(255,255,255,0.55)" : "var(--ink-3)",
                      border: premium
                        ? "1px solid rgba(227,185,91,0.45)"
                        : claude ? "1px solid rgba(217,119,87,0.30)"
                        : dark ? "1px solid rgba(255,255,255,0.15)" : "1px solid var(--line-2)",
                      background: claude ? "rgba(255,255,255,0.7)" : "transparent",
                      borderRadius: 999, padding: "5px 12px",
                    }}>
                      {track.level}
                    </span>
                    <span style={{
                      fontSize: 11, fontWeight: 700, fontFamily: "var(--font-sans)",
                      color: premium ? GOLD_INK : claude ? "#FFF8F0" : featured ? "#04221D" : th.color,
                      background: premium ? GOLD_FILL : claude ? CLAUDE_FILL : featured ? th.color : `rgba(${th.glow},0.10)`,
                      border: premium || featured || claude ? "none" : `1px solid rgba(${th.glow},0.25)`,
                      borderRadius: 999, padding: "5px 12px", whiteSpace: "nowrap",
                      boxShadow: premium
                        ? "0 6px 18px -6px rgba(184,134,11,0.6)"
                        : claude ? "0 8px 20px -6px rgba(189,93,58,0.55)"
                        : featured ? `0 6px 18px -6px rgba(${th.glow},0.55)` : "none",
                    }}>
                      {track.badge}
                    </span>
                  </div>

                  {/* Package 2 — abstract Claude Code / assistant / automation visual */}
                  {claude && <ClaudeVisual />}

                  {/* Title + desc */}
                  <h3 style={{
                    fontSize: 26, fontWeight: 700, fontFamily: "var(--font-sans)",
                    letterSpacing: "-0.03em", lineHeight: 1.12,
                    color: dark ? "#fff" : claude ? CLAUDE_INK : "var(--ink)", margin: "0 0 10px", position: "relative",
                  }}>
                    {track.title}
                  </h3>
                  {claude && (
                    <p className="claude-grad" style={{
                      fontFamily: "var(--font-sans)", fontSize: 21, fontWeight: 700,
                      letterSpacing: "-0.03em", lineHeight: 1.1,
                      margin: "0 0 12px", position: "relative",
                    }}>
                      {t("claudeTagline")}
                    </p>
                  )}
                  {track.subtitle && (
                    <p style={{
                      fontFamily: "JetBrains Mono, monospace", fontSize: 11, fontWeight: 600,
                      letterSpacing: "0.06em", lineHeight: 1.5,
                      color: dark ? `rgba(${th.glow},0.85)` : th.color,
                      margin: "0 0 10px", position: "relative",
                    }}>
                      {track.subtitle}
                    </p>
                  )}
                  <p style={{ fontSize: 14.5, color: dark ? "rgba(255,255,255,0.55)" : claude ? "#6E5546" : "var(--ink-3)", lineHeight: 1.6, margin: "0 0 24px", position: "relative" }}>
                    {track.desc}
                  </p>

                  {/* Package 2 — the two skills this track teaches, as distinct blocks */}
                  {claude && claudeSkills.length > 0 && (
                    <div style={{ position: "relative", marginBottom: 24 }}>
                      <div style={{
                        fontFamily: "JetBrains Mono, monospace", fontSize: 10, fontWeight: 600,
                        letterSpacing: "0.12em", textTransform: "uppercase", color: "#9A7358",
                        marginBottom: 10,
                      }}>
                        {t("claudeSkillsLabel")}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {claudeSkills.map((s, si) => {
                          const SkillIcon = CLAUDE_SKILL_ICONS[si] ?? Code2;
                          const warm = si === 0;
                          return (
                            <div key={s.title} style={{
                              display: "flex", alignItems: "flex-start", gap: 13,
                              padding: "14px 15px", borderRadius: 16,
                              background: warm
                                ? "linear-gradient(140deg, rgba(255,255,255,0.95), rgba(253,240,220,0.9))"
                                : "linear-gradient(140deg, rgba(255,255,255,0.95), rgba(250,232,214,0.85))",
                              border: `1px solid rgba(217,119,87,${warm ? 0.20 : 0.28})`,
                              boxShadow: "0 10px 26px -16px rgba(189,93,58,0.55), inset 0 1px 0 rgba(255,255,255,0.9)",
                            }}>
                              <span style={{
                                width: 34, height: 34, borderRadius: 11, flexShrink: 0,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                background: warm
                                  ? "linear-gradient(140deg, #F3DCA0 0%, #E9A23B 100%)"
                                  : CLAUDE_FILL,
                                boxShadow: warm
                                  ? "0 8px 18px -8px rgba(233,162,59,0.8), inset 0 1px 0 rgba(255,255,255,0.6)"
                                  : "0 8px 18px -8px rgba(189,93,58,0.8), inset 0 1px 0 rgba(255,255,255,0.4)",
                              }}>
                                <SkillIcon size={16} strokeWidth={2.2} color={warm ? "#4A2E15" : "#FFF8F0"} />
                              </span>
                              <div style={{ minWidth: 0 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
                                  <span style={{
                                    fontSize: 14, fontWeight: 700, fontFamily: "var(--font-sans)",
                                    letterSpacing: "-0.02em", color: CLAUDE_INK, lineHeight: 1.25,
                                  }}>
                                    {si + 1}. {s.title}
                                  </span>
                                  <span style={{
                                    fontFamily: "JetBrains Mono, monospace", fontSize: 9,
                                    fontWeight: 600, letterSpacing: "0.06em",
                                    color: "#8A5638", background: "rgba(217,119,87,0.10)",
                                    border: "1px solid rgba(217,119,87,0.22)",
                                    borderRadius: 999, padding: "2px 7px", whiteSpace: "nowrap",
                                  }}>
                                    {s.tag}
                                  </span>
                                </div>
                                <div style={{ fontSize: 12, color: "#7C6558", lineHeight: 1.5, marginTop: 4 }}>
                                  {s.desc}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Skills — Package 2 promotes its first two into the blocks above, so they aren't repeated here */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28, flex: 1, position: "relative" }}>
                    {(claude && claudeSkills.length > 0 ? track.skills.slice(claudeSkills.length) : track.skills).map((skill) => (
                      <div key={skill} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <span style={{
                          width: 19, height: 19, borderRadius: 999, flexShrink: 0, marginTop: 1,
                          background: dark ? `rgba(${th.glow},0.20)` : `rgba(${th.glow},0.12)`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          <Check size={11} strokeWidth={3} color={th.color} />
                        </span>
                        <span style={{ fontSize: 13.5, fontWeight: 500, lineHeight: 1.5, color: dark ? "rgba(255,255,255,0.75)" : claude ? "#55423A" : "var(--ink-2)" }}>
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
                        : claude
                        ? CLAUDE_FILL
                        : featured
                        ? `linear-gradient(180deg, ${th.color}, color-mix(in oklab, ${th.color} 80%, #000))`
                        : "var(--bg-2)",
                      color: premium ? GOLD_INK : claude ? "#FFF8F0" : featured ? "#04221D" : "var(--ink)",
                      border: premium || featured || claude ? "none" : "1px solid var(--line-2)",
                      boxShadow: premium
                        ? `0 14px 34px -10px rgba(184,134,11,0.65), inset 0 1px 0 rgba(255,255,255,0.45)`
                        : claude ? `0 14px 34px -10px rgba(189,93,58,0.6), inset 0 1px 0 rgba(255,255,255,0.35)`
                        : featured ? `0 12px 30px -10px rgba(${th.glow},0.6), inset 0 1px 0 rgba(255,255,255,0.3)` : "var(--shadow-sm)",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = ""; }}
                  >
                    {track.cta.replace(" →", "")} <ArrowRight size={15} />
                  </Link>
                </article>
                </div>
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
