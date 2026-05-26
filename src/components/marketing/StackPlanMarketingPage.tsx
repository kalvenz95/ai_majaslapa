"use client";

import React from "react";
import {
  CourseFooterComparePlans,
  CourseTopBarHomeLink,
} from "@/components/CourseMarketingLinks";
import type { StackPlanModel } from "@/content/marketing/stackTypes";
import { STACK_TYPE_ICONS } from "@/content/marketing/stackTypes";
import { useTranslations } from "next-intl";
import { useState } from "react";

export type StackPlanMarketingShellProps = {
  plan: StackPlanModel;
  heroLayout: "split" | "simple";
  topBarRight: "hiddenCta" | "spacer";
  playIconFill: string;
  ctaGradientEnd: string;
  ctaTextColor: string;
  skillsListMode: "all" | "first3";
  /** Opacity for hero glow band (e.g. digitalais 0.07) */
  heroGlowAlpha?: number;
  /** Optional content rendered below the free lesson description */
  extraAfterFreeLesson?: React.ReactNode;
  /** Per-lesson content keyed by lesson id — takes precedence over extraAfterFreeLesson */
  lessonExtraContent?: Record<string, React.ReactNode>;
  /** Per-module content rendered below the module accordion card, keyed by module id */
  moduleExtraContent?: Record<number, React.ReactNode>;
};

export function StackPlanMarketingPage({
  plan,
  heroLayout,
  topBarRight,
  playIconFill,
  ctaGradientEnd,
  ctaTextColor,
  skillsListMode,
  heroGlowAlpha = 0.08,
  extraAfterFreeLesson,
  lessonExtraContent,
  moduleExtraContent,
}: StackPlanMarketingShellProps) {
  const tc = useTranslations("CourseStackCommon");
  const [openModules, setOpenModules] = useState<number[]>([1, 2]);

  const toggle = (id: number) =>
    setOpenModules((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const skills =
    skillsListMode === "first3" ? plan.skills.slice(0, 3) : plan.skills;

  return (
    <div style={{ background: "#050508", minHeight: "100vh", color: "#fff", fontFamily: "Inter, sans-serif" }}>

      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(5,5,8,0.95)", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            onMouseEnter={(e) => {
              const a = e.currentTarget.querySelector("a");
              if (a) (a as HTMLElement).style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              const a = e.currentTarget.querySelector("a");
              if (a) (a as HTMLElement).style.color = "rgba(255,255,255,0.5)";
            }}
          >
            <CourseTopBarHomeLink
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: "rgba(255,255,255,0.5)",
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 500,
                transition: "color 0.2s",
              }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: `rgba(${plan.glow},0.12)`, border: `1px solid rgba(${plan.glow},0.3)`, borderRadius: 20, padding: "5px 14px" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: plan.color, textTransform: "uppercase", letterSpacing: "0.08em" }}>{plan.topBarPlanLine}</span>
          </div>
          {topBarRight === "hiddenCta" ? (
            <a href="#checkout" style={{ background: plan.color, color: "#fff", border: "none", borderRadius: 10, padding: "9px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer", textDecoration: "none", display: "none" }}>
              {tc("buyHidden")}
            </a>
          ) : (
            <div style={{ width: 120 }} />
          )}
        </div>
      </div>

      <div style={{ background: `linear-gradient(180deg, rgba(${plan.glow},${heroGlowAlpha}) 0%, transparent 100%)`, borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "56px 24px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `rgba(${plan.glow},0.1)`, border: `1px solid rgba(${plan.glow},0.25)`, borderRadius: 20, padding: "5px 14px", marginBottom: 20 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: plan.color, textTransform: "uppercase", letterSpacing: "0.1em" }}>{plan.heroPill}</span>
          </div>

          {heroLayout === "split" ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "start" }}>
              <div>
                <h1 style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 900, lineHeight: 1.15, marginBottom: 16, letterSpacing: "-0.02em" }}>
                  {plan.heroBefore}
                  <span style={{ color: plan.color }}>{plan.heroHighlight}</span>
                  {plan.heroAfter}
                </h1>
                <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: 24, maxWidth: 580 }}>{plan.lead}</p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
                  {plan.courses.map((c) => (
                    <span key={c} style={{ background: `rgba(${plan.glow},0.08)`, border: `1px solid rgba(${plan.glow},0.2)`, borderRadius: 8, padding: "5px 12px", fontSize: 12, fontWeight: 600, color: plan.color }}>
                      {c}
                    </span>
                  ))}
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
                  {[
                    { label: tc("statsLessons"), val: plan.stats.lessons },
                    { label: tc("statsModules"), val: plan.stats.modules },
                    { label: tc("statsHours"), val: plan.stats.hours },
                    { label: tc("statsStudents"), val: plan.stats.students },
                  ].map((s) => (
                    <div key={s.label}>
                      <div style={{ fontSize: 20, fontWeight: 900, color: "#fff" }}>{s.val}</div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: `rgba(${plan.glow},0.07)`, border: `1px solid rgba(${plan.glow},0.2)`, borderRadius: 20, padding: "20px 28px", textAlign: "center", minWidth: 180, display: "none" }} className="md:block">
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{tc("potentialEarnings")}</div>
                <div style={{ fontSize: 26, fontWeight: 900, color: plan.color }}>{plan.earn}</div>
              </div>
            </div>
          ) : (
            <div>
              <h1 style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 900, lineHeight: 1.15, marginBottom: 16, letterSpacing: "-0.02em", maxWidth: 700 }}>
                {plan.heroBefore}
                <span style={{ color: plan.color }}>{plan.heroHighlight}</span>
                {plan.heroAfter}
              </h1>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: 24, maxWidth: 580 }}>{plan.lead}</p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
                {plan.courses.map((c) => (
                  <span key={c} style={{ background: `rgba(${plan.glow},0.08)`, border: `1px solid rgba(${plan.glow},0.2)`, borderRadius: 8, padding: "5px 12px", fontSize: 12, fontWeight: 600, color: plan.color }}>
                    {c}
                  </span>
                ))}
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
                {[
                  { label: tc("statsLessons"), val: plan.stats.lessons },
                  { label: tc("statsModules"), val: plan.stats.modules },
                  { label: tc("statsHours"), val: plan.stats.hours },
                  { label: tc("statsStudents"), val: plan.stats.students },
                ].map((s) => (
                  <div key={s.label}>
                    <div style={{ fontSize: 20, fontWeight: 900, color: "#fff" }}>{s.val}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="course-grid-main" style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px", display: "grid", gridTemplateColumns: "1fr 340px", gap: 40, alignItems: "start" }}>

        <div>
          <div style={{ background: "rgba(13,13,26,0.9)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "28px 32px", marginBottom: 32 }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 20 }}>{tc("whatYouLearn")}</h2>
            <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px" }}>
              {plan.learn.map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ marginTop: 2, flexShrink: 0 }}>
                    <polyline points="20,6 9,17 4,12" stroke={plan.color} strokeWidth="3" />
                  </svg>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>{tc("curriculum")}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {plan.modules.map((mod) => {
              const isOpen = openModules.includes(mod.id);
              return (
                <React.Fragment key={mod.id}>
                <div style={{ background: "rgba(13,13,26,0.9)", border: `1px solid ${isOpen && mod.free ? `rgba(${plan.glow},0.3)` : "rgba(255,255,255,0.07)"}`, borderRadius: 16, overflow: "hidden", transition: "border-color 0.2s" }}>
                  <button
                    type="button"
                    onClick={() => toggle(mod.id)}
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", background: "transparent", border: "none", cursor: "pointer", color: "#fff", gap: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 13, fontWeight: 800,
                        background: mod.free ? `rgba(${plan.glow},0.12)` : "rgba(255,255,255,0.05)",
                        color: mod.free ? plan.color : "rgba(255,255,255,0.4)",
                        border: mod.free ? `1px solid rgba(${plan.glow},0.25)` : "1px solid rgba(255,255,255,0.08)" }}>
                        {mod.free ? mod.id : "🔒"}
                      </div>
                      <div style={{ textAlign: "left", minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{mod.title}</div>
                        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>
                          {tc("lessonsMeta", { count: mod.lessons.length, duration: mod.duration })}
                        </div>
                      </div>
                    </div>
                    <span style={{ fontSize: 18, color: "rgba(255,255,255,0.3)", flexShrink: 0, transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>▾</span>
                  </button>

                  {isOpen && (
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                      {mod.lessons.map((lesson) => (
                        <div key={lesson.id}>
                          {lesson.free ? (
                            <div>
                              <div style={{ margin: "0", background: "#000", position: "relative", aspectRatio: "16/9" }}>
                                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, rgba(${plan.glow},0.15) 0%, #0a0a14 100%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
                                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: plan.color, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: `0 0 40px rgba(${plan.glow},0.5)`, transition: "transform 0.2s" }}
                                    onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.1)"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}>
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill={playIconFill}><polygon points="5,3 19,12 5,21" /></svg>
                                  </div>
                                  <div style={{ textAlign: "center" }}>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{lesson.title}</div>
                                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>
                                      {tc("freePreview", { duration: lesson.duration })}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div style={{ padding: "20px 24px", background: `rgba(${plan.glow},0.03)`, borderTop: `1px solid rgba(${plan.glow},0.1)` }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                                  <span style={{ fontSize: 11, fontWeight: 700, background: `rgba(${plan.glow},0.12)`, color: plan.color, border: `1px solid rgba(${plan.glow},0.25)`, borderRadius: 6, padding: "2px 8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{tc("freeBadge")}</span>
                                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                                    {tc("videoMeta", {
                                      icon: STACK_TYPE_ICONS[lesson.type],
                                      duration: lesson.duration,
                                    })}
                                  </span>
                                </div>
                                {lesson.description ? (
                                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.65 }}>{lesson.description}</p>
                                ) : null}
                                {lessonExtraContent?.[lesson.id] ?? extraAfterFreeLesson}
                              </div>
                            </div>
                          ) : (
                            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 24px", borderTop: "1px solid rgba(255,255,255,0.04)", opacity: 0.5 }}>
                              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", minWidth: 24, textAlign: "center" }}>🔒</span>
                              <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>{lesson.title}</div>
                              </div>
                              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", flexShrink: 0 }}>
                                {`${STACK_TYPE_ICONS[lesson.type]} ${lesson.duration}`}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                      {!mod.free && (
                        <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
                            {tc("unlockLessons", { count: mod.lessons.length })}
                          </span>
                          <a href="#checkout" style={{ fontSize: 12, fontWeight: 700, color: plan.color, textDecoration: "none", background: `rgba(${plan.glow},0.1)`, border: `1px solid rgba(${plan.glow},0.2)`, borderRadius: 8, padding: "6px 14px", transition: "background 0.2s" }}>
                            {tc("purchaseCta")}
                          </a>
                        </div>
                      )}
                      {moduleExtraContent?.[mod.id] && (
                        <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                          {moduleExtraContent[mod.id]}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div style={{ position: "sticky", top: 80 }}>
          <div style={{ background: "rgba(13,13,26,0.95)", border: `1px solid rgba(${plan.glow},0.25)`, borderRadius: 24, overflow: "hidden", boxShadow: `0 0 60px rgba(${plan.glow},0.08)` }}>

            <div style={{ background: `rgba(${plan.glow},0.08)`, padding: "20px 24px", borderBottom: `1px solid rgba(${plan.glow},0.15)` }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>{tc("potentialEarnings")}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {plan.earningRows.map((row, i) => (
                  <div key={row.label}>
                    {i > 0 ? <div style={{ height: 1, background: `rgba(${plan.glow},0.2)`, marginBottom: 10 }} /> : null}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", fontFamily: "JetBrains Mono, monospace" }}>{row.label}</span>
                      <span style={{ fontSize: i === plan.earningRows.length - 1 ? 18 : 15, fontWeight: i === plan.earningRows.length - 1 ? 900 : 800, color: plan.color }}>{row.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ padding: "24px" }}>
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: 40, fontWeight: 900 }}>€{plan.price}</span>
                  <span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>{tc("perMonth")}</span>
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{tc("cancelAnytime")}</div>
              </div>

              <a href="#checkout" style={{ display: "block", width: "100%", background: `linear-gradient(135deg, ${plan.color}, ${ctaGradientEnd})`, color: ctaTextColor, border: "none", borderRadius: 14, padding: "15px 24px", fontSize: 15, fontWeight: 800, cursor: "pointer", textDecoration: "none", textAlign: "center", boxShadow: `0 4px 24px rgba(${plan.glow},0.3)`, marginBottom: 12, transition: "transform 0.15s, box-shadow 0.15s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 8px 32px rgba(${plan.glow},0.4)`; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 4px 24px rgba(${plan.glow},0.3)`; }}>
                {plan.ctaPrimary}
              </a>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textAlign: "center", marginBottom: 24 }}>{tc("refundNote")}</div>

              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>{tc("includedCourses")}</div>
                {plan.includedCourses.map((c) => (
                  <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <span style={{ fontSize: 18 }}>{c.icon}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{c.name}</div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{c.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {plan.premiumBonuses && plan.premiumBonuses.length > 0 ? (
                <div style={{ background: `rgba(${plan.glow},0.05)`, border: `1px solid rgba(${plan.glow},0.12)`, borderRadius: 12, padding: "12px 16px", marginBottom: 16 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: plan.color, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{tc("premiumBonuses")}</div>
                  {plan.premiumBonuses.map((b) => (
                    <div key={b} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <span style={{ color: plan.color, fontSize: 12 }}>★</span>
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", fontWeight: 500 }}>{b}</span>
                    </div>
                  ))}
                </div>
              ) : null}

              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>{tc("alsoIncluded")}</div>
                {skills.map((s) => (
                  <div key={s} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ marginTop: 2, flexShrink: 0 }}>
                      <polyline points="20,6 9,17 4,12" stroke={plan.color} strokeWidth="3" />
                    </svg>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            style={{ textAlign: "center", marginTop: 16 }}
            onMouseEnter={(e) => {
              const a = e.currentTarget.querySelector("a");
              if (a) (a as HTMLElement).style.color = "rgba(255,255,255,0.6)";
            }}
            onMouseLeave={(e) => {
              const a = e.currentTarget.querySelector("a");
              if (a) (a as HTMLElement).style.color = "rgba(255,255,255,0.3)";
            }}
          >
            <CourseFooterComparePlans
              style={{
                fontSize: 12,
                color: "rgba(255,255,255,0.3)",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
            />
          </div>
        </div>
      </div>

    </div>
  );
}
