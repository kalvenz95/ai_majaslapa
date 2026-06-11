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
  /** Visual style of the curriculum module list — "showcase" trades the plain accordion for a more illustrated, landing-page-style block design */
  curriculumVariant?: "standard" | "showcase";
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
  curriculumVariant = "standard",
}: StackPlanMarketingShellProps) {
  const tc = useTranslations("CourseStackCommon");
  // Only the first (free) module opens by default — keeps the page scannable;
  // locked modules expand on demand instead of dumping all content at once.
  const [openModules, setOpenModules] = useState<number[]>([1]);

  const toggle = (id: number) =>
    setOpenModules((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const skills =
    skillsListMode === "first3" ? plan.skills.slice(0, 3) : plan.skills;

  // Rich per-lesson content is collapsible so the page stays scannable instead
  // of rendering every free lesson's full block content at once. The first free
  // lesson opens by default as a preview; the rest collapse behind a toggle.
  const firstFreeLessonId = plan.modules
    .flatMap((m) => m.lessons)
    .find((l) => l.free)?.id;
  const [openLessons, setOpenLessons] = useState<string[]>(
    firstFreeLessonId ? [firstFreeLessonId] : [],
  );
  const toggleLesson = (id: string) =>
    setOpenLessons((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const getLessonContent = (id: string): React.ReactNode =>
    lessonExtraContent?.[id] ?? extraAfterFreeLesson;

  const renderLessonExtra = (id: string) => {
    const content = getLessonContent(id);
    if (!content) return null;
    const isOpen = openLessons.includes(id);
    return (
      <div style={{ marginTop: 14 }}>
        <button
          type="button"
          onClick={() => toggleLesson(id)}
          aria-expanded={isOpen}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "9px 16px", borderRadius: 10, cursor: "pointer",
            background: isOpen ? "transparent" : `rgba(${plan.glow},0.07)`,
            border: `1px solid rgba(${plan.glow},${isOpen ? 0.18 : 0.22})`,
            color: plan.color, fontSize: 12.5, fontWeight: 700,
            transition: "background 0.18s ease, border-color 0.18s ease",
          }}
        >
          {isOpen ? tc("hideLessonContent") : tc("showLessonContent")}
          <span style={{ display: "inline-flex", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s ease" }}>▾</span>
        </button>
        {isOpen && <div style={{ marginTop: 4 }}>{content}</div>}
      </div>
    );
  };

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--ink)", fontFamily: "Inter, sans-serif" }}>

      <div style={{ borderBottom: "1px solid var(--line)", background: "var(--bg)", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            onMouseEnter={(e) => {
              const a = e.currentTarget.querySelector("a");
              if (a) (a as HTMLElement).style.color = "var(--ink)";
            }}
            onMouseLeave={(e) => {
              const a = e.currentTarget.querySelector("a");
              if (a) (a as HTMLElement).style.color = "var(--ink-3)";
            }}
          >
            <CourseTopBarHomeLink
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: "var(--ink-3)",
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 500,
                transition: "color 0.2s",
              }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: `rgba(${plan.glow},0.10)`, border: `1px solid rgba(${plan.glow},0.25)`, borderRadius: 20, padding: "5px 14px" }}>
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

      <div style={{ background: `linear-gradient(180deg, rgba(${plan.glow},${heroGlowAlpha}) 0%, transparent 100%)`, borderBottom: "1px solid var(--line)", padding: "56px 24px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `rgba(${plan.glow},0.08)`, border: `1px solid rgba(${plan.glow},0.22)`, borderRadius: 20, padding: "5px 14px", marginBottom: 20 }}>
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
                <p style={{ fontSize: 16, color: "var(--ink-2)", lineHeight: 1.7, marginBottom: 24, maxWidth: 580 }}>{plan.lead}</p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
                  {plan.courses.map((c) => (
                    <span key={c} style={{ background: `rgba(${plan.glow},0.07)`, border: `1px solid rgba(${plan.glow},0.18)`, borderRadius: 8, padding: "5px 12px", fontSize: 12, fontWeight: 600, color: plan.color }}>
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
                      <div style={{ fontSize: 20, fontWeight: 900, color: "var(--ink)" }}>{s.val}</div>
                      <div style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 500 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: `rgba(${plan.glow},0.06)`, border: `1px solid rgba(${plan.glow},0.18)`, borderRadius: 20, padding: "20px 28px", textAlign: "center", minWidth: 180, display: "none" }} className="md:block">
                <div style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>{tc("potentialEarnings")}</div>
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
              <p style={{ fontSize: 16, color: "var(--ink-2)", lineHeight: 1.7, marginBottom: 24, maxWidth: 580 }}>{plan.lead}</p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
                {plan.courses.map((c) => (
                  <span key={c} style={{ background: `rgba(${plan.glow},0.07)`, border: `1px solid rgba(${plan.glow},0.18)`, borderRadius: 8, padding: "5px 12px", fontSize: 12, fontWeight: 600, color: plan.color }}>
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
                    <div style={{ fontSize: 20, fontWeight: 900, color: "var(--ink)" }}>{s.val}</div>
                    <div style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 500 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="course-grid-main" style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px", display: "grid", gridTemplateColumns: "1fr 340px", gap: 40, alignItems: "start" }}>

        <div>
          <div style={{ background: "var(--bg-1)", border: "1px solid var(--line)", borderRadius: 20, padding: "28px 32px", marginBottom: 32 }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 20, color: "var(--ink)" }}>{tc("whatYouLearn")}</h2>
            <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px" }}>
              {plan.learn.map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ marginTop: 2, flexShrink: 0 }}>
                    <polyline points="20,6 9,17 4,12" stroke={plan.color} strokeWidth="3" />
                  </svg>
                  <span style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16, color: "var(--ink)" }}>{tc("curriculum")}</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {plan.modules.map((mod) => {
              const isOpen = openModules.includes(mod.id);

              if (curriculumVariant === "showcase") {
                return (
                  <div
                    key={mod.id}
                    style={{
                      position: "relative",
                      background: mod.free
                        ? `linear-gradient(160deg, rgba(${plan.glow},0.05) 0%, var(--bg-1) 60%)`
                        : "var(--bg-1)",
                      border: `1px solid ${isOpen ? `rgba(${plan.glow},0.32)` : "var(--line)"}`,
                      borderRadius: 22,
                      overflow: "hidden",
                      boxShadow: isOpen ? `0 20px 56px -26px rgba(${plan.glow},0.4)` : "none",
                      transition: "border-color 0.25s ease, box-shadow 0.25s ease",
                    }}
                  >
                    {/* glowing accent line across the top — lights up when expanded */}
                    <div
                      aria-hidden
                      style={{
                        position: "absolute", top: 0, left: 0, right: 0, height: 2,
                        background: `linear-gradient(90deg, transparent, ${plan.color}, transparent)`,
                        opacity: isOpen ? 0.9 : 0,
                        transition: "opacity 0.3s ease",
                      }}
                    />

                    <button
                      type="button"
                      onClick={() => toggle(mod.id)}
                      style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 26px", background: "transparent", border: "none", cursor: "pointer", color: "var(--ink)", gap: 16, textAlign: "left" }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 18, minWidth: 0 }}>
                        <div style={{
                          width: 50, height: 50, borderRadius: 16, flexShrink: 0,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 18, fontWeight: 800, letterSpacing: "-0.02em",
                          background: mod.free
                            ? `linear-gradient(135deg, ${plan.color}, color-mix(in oklab, ${plan.color} 45%, white))`
                            : "var(--bg-2)",
                          color: mod.free ? ctaTextColor : "var(--ink-3)",
                          border: mod.free ? "none" : "1px solid var(--line-2)",
                          boxShadow: mod.free ? `0 10px 28px -8px rgba(${plan.glow},0.55)` : "none",
                        }}>
                          {mod.free ? `0${mod.id}`.slice(-2) : "🔒"}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--ink)", lineHeight: 1.3 }}>
                            {mod.title}
                          </div>
                          <div style={{ marginTop: 8 }}>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 600, color: "var(--ink-3)", background: "var(--bg-2)", border: "1px solid var(--line)", borderRadius: 999, padding: "4px 10px" }}>
                              📚 {tc("lessonsMeta", { count: mod.lessons.length, duration: mod.duration })}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span style={{
                        width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 14, color: isOpen ? plan.color : "var(--ink-4)",
                        background: isOpen ? `rgba(${plan.glow},0.12)` : "var(--bg-2)",
                        border: `1px solid ${isOpen ? `rgba(${plan.glow},0.25)` : "var(--line)"}`,
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.25s ease, color 0.2s ease, background 0.2s ease",
                      }}>▾</span>
                    </button>

                    {isOpen && (
                      <div style={{ borderTop: "1px solid var(--line)" }}>
                        {mod.lessons.map((lesson, li) => (
                          <div key={lesson.id}>
                            {lesson.free ? (
                              <div>
                                <div style={{ margin: "18px 24px 0", borderRadius: 16, overflow: "hidden", border: `1px solid rgba(${plan.glow},0.2)`, position: "relative", aspectRatio: "16/9", background: "var(--bg-3)" }}>
                                  <div style={{ position: "absolute", inset: 0, background: `linear-gradient(140deg, rgba(${plan.glow},0.16) 0%, var(--bg-1) 100%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
                                    <div style={{ width: 64, height: 64, borderRadius: "50%", background: plan.color, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: `0 12px 40px -8px rgba(${plan.glow},0.6)`, transition: "transform 0.2s" }}
                                      onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.08)"; }}
                                      onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}>
                                      <svg width="22" height="22" viewBox="0 0 24 24" fill={playIconFill}><polygon points="5,3 19,12 5,21" /></svg>
                                    </div>
                                    <div style={{ textAlign: "center" }}>
                                      <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>{lesson.title}</div>
                                      <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 4 }}>
                                        {tc("freePreview", { duration: lesson.duration })}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div style={{ padding: "18px 24px 24px" }}>
                                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                                    <span style={{ fontSize: 11, fontWeight: 700, background: `rgba(${plan.glow},0.12)`, color: plan.color, border: `1px solid rgba(${plan.glow},0.25)`, borderRadius: 999, padding: "3px 10px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{tc("freeBadge")}</span>
                                    <span style={{ fontSize: 12, color: "var(--ink-3)" }}>
                                      {tc("videoMeta", { icon: STACK_TYPE_ICONS[lesson.type], duration: lesson.duration })}
                                    </span>
                                  </div>
                                  {lesson.description ? (
                                    <p style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.65, margin: 0 }}>{lesson.description}</p>
                                  ) : null}
                                  {renderLessonExtra(lesson.id)}
                                </div>
                              </div>
                            ) : (
                              <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 26px", borderTop: li === 0 ? "none" : "1px solid var(--line)" }}>
                                <div style={{ width: 34, height: 34, borderRadius: 10, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, background: "var(--bg-2)", border: "1px solid var(--line)", color: "var(--ink-4)" }}>
                                  {STACK_TYPE_ICONS[lesson.type]}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div style={{ fontSize: 13.5, color: "var(--ink-2)", fontWeight: 600, lineHeight: 1.4 }}>{lesson.title}</div>
                                </div>
                                <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--ink-4)", background: "var(--bg-2)", borderRadius: 999, padding: "4px 9px", flexShrink: 0, whiteSpace: "nowrap" }}>
                                  🔒 {lesson.duration}
                                </span>
                              </div>
                            )}
                          </div>
                        ))}
                        {!mod.free && (
                          <div style={{ margin: "8px 24px 22px", padding: "16px 20px", borderRadius: 14, background: `rgba(${plan.glow},0.05)`, border: `1px solid rgba(${plan.glow},0.16)`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                            <span style={{ fontSize: 12.5, color: "var(--ink-2)", fontWeight: 500 }}>
                              {tc("unlockLessons", { count: mod.lessons.length })}
                            </span>
                            <a href="#checkout" style={{ fontSize: 12.5, fontWeight: 700, color: ctaTextColor, textDecoration: "none", background: `linear-gradient(135deg, ${plan.color}, color-mix(in oklab, ${plan.color} 60%, white))`, borderRadius: 10, padding: "9px 18px", whiteSpace: "nowrap", boxShadow: `0 8px 22px -6px rgba(${plan.glow},0.5)`, transition: "transform 0.15s ease" }}
                              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; }}
                              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}>
                              {tc("purchaseCta")}
                            </a>
                          </div>
                        )}
                        {moduleExtraContent?.[mod.id] && (
                          <div style={{ padding: "4px 24px 24px" }}>
                            {moduleExtraContent[mod.id]}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <React.Fragment key={mod.id}>
                <div style={{ background: "var(--bg-1)", border: `1px solid ${isOpen && mod.free ? `rgba(${plan.glow},0.28)` : "var(--line)"}`, borderRadius: 16, overflow: "hidden", transition: "border-color 0.2s" }}>
                  <button
                    type="button"
                    onClick={() => toggle(mod.id)}
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", background: "transparent", border: "none", cursor: "pointer", color: "var(--ink)", gap: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 13, fontWeight: 800,
                        background: mod.free ? `rgba(${plan.glow},0.10)` : "var(--bg-2)",
                        color: mod.free ? plan.color : "var(--ink-3)",
                        border: mod.free ? `1px solid rgba(${plan.glow},0.22)` : "1px solid var(--line)" }}>
                        {mod.free ? mod.id : "🔒"}
                      </div>
                      <div style={{ textAlign: "left", minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>{mod.title}</div>
                        <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 2 }}>
                          {tc("lessonsMeta", { count: mod.lessons.length, duration: mod.duration })}
                        </div>
                      </div>
                    </div>
                    <span style={{ fontSize: 18, color: "var(--ink-4)", flexShrink: 0, transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>▾</span>
                  </button>

                  {isOpen && (
                    <div style={{ borderTop: "1px solid var(--line)" }}>
                      {mod.lessons.map((lesson) => (
                        <div key={lesson.id}>
                          {lesson.free ? (
                            <div>
                              <div style={{ margin: "0", background: "var(--bg-3)", position: "relative", aspectRatio: "16/9" }}>
                                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, rgba(${plan.glow},0.12) 0%, var(--bg-1) 100%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
                                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: plan.color, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: `0 0 40px rgba(${plan.glow},0.4)`, transition: "transform 0.2s" }}
                                    onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.1)"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}>
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill={playIconFill}><polygon points="5,3 19,12 5,21" /></svg>
                                  </div>
                                  <div style={{ textAlign: "center" }}>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>{lesson.title}</div>
                                    <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 4 }}>
                                      {tc("freePreview", { duration: lesson.duration })}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div style={{ padding: "20px 24px", background: `rgba(${plan.glow},0.03)`, borderTop: `1px solid rgba(${plan.glow},0.08)` }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                                  <span style={{ fontSize: 11, fontWeight: 700, background: `rgba(${plan.glow},0.10)`, color: plan.color, border: `1px solid rgba(${plan.glow},0.22)`, borderRadius: 6, padding: "2px 8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{tc("freeBadge")}</span>
                                  <span style={{ fontSize: 12, color: "var(--ink-3)" }}>
                                    {tc("videoMeta", {
                                      icon: STACK_TYPE_ICONS[lesson.type],
                                      duration: lesson.duration,
                                    })}
                                  </span>
                                </div>
                                {lesson.description ? (
                                  <p style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.65 }}>{lesson.description}</p>
                                ) : null}
                                {renderLessonExtra(lesson.id)}
                              </div>
                            </div>
                          ) : (
                            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 24px", borderTop: "1px solid var(--line)", opacity: 0.5 }}>
                              <span style={{ fontSize: 13, color: "var(--ink-4)", minWidth: 24, textAlign: "center" }}>🔒</span>
                              <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 13, color: "var(--ink-2)", fontWeight: 500 }}>{lesson.title}</div>
                              </div>
                              <div style={{ fontSize: 11, color: "var(--ink-4)", flexShrink: 0 }}>
                                {`${STACK_TYPE_ICONS[lesson.type]} ${lesson.duration}`}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                      {!mod.free && (
                        <div style={{ padding: "16px 24px", borderTop: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <span style={{ fontSize: 12, color: "var(--ink-3)" }}>
                            {tc("unlockLessons", { count: mod.lessons.length })}
                          </span>
                          <a href="#checkout" style={{ fontSize: 12, fontWeight: 700, color: plan.color, textDecoration: "none", background: `rgba(${plan.glow},0.08)`, border: `1px solid rgba(${plan.glow},0.18)`, borderRadius: 8, padding: "6px 14px", transition: "background 0.2s" }}>
                            {tc("purchaseCta")}
                          </a>
                        </div>
                      )}
                      {moduleExtraContent?.[mod.id] && (
                        <div style={{ padding: "16px 24px", borderTop: "1px solid var(--line)" }}>
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
          <div style={{ background: "var(--bg-1)", border: `1px solid rgba(${plan.glow},0.22)`, borderRadius: 24, overflow: "hidden", boxShadow: `0 0 40px rgba(${plan.glow},0.06)` }}>

            <div style={{ background: `rgba(${plan.glow},0.06)`, padding: "20px 24px", borderBottom: `1px solid rgba(${plan.glow},0.12)` }}>
              <div style={{ fontSize: 11, color: "var(--ink-3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>{tc("potentialEarnings")}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {plan.earningRows.map((row, i) => (
                  <div key={row.label}>
                    {i > 0 ? <div style={{ height: 1, background: `rgba(${plan.glow},0.15)`, marginBottom: 10 }} /> : null}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 12, color: "var(--ink-3)", fontFamily: "JetBrains Mono, monospace" }}>{row.label}</span>
                      <span style={{ fontSize: i === plan.earningRows.length - 1 ? 18 : 15, fontWeight: i === plan.earningRows.length - 1 ? 900 : 800, color: plan.color }}>{row.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ padding: "24px" }}>
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: 40, fontWeight: 900, color: "var(--ink)" }}>€{plan.price}</span>
                  <span style={{ fontSize: 14, color: "var(--ink-3)", fontWeight: 500 }}>{tc("perMonth")}</span>
                </div>
                <div style={{ fontSize: 12, color: "var(--ink-4)" }}>{tc("cancelAnytime")}</div>
              </div>

              <a href="#checkout" style={{ display: "block", width: "100%", background: `linear-gradient(135deg, ${plan.color}, ${ctaGradientEnd})`, color: ctaTextColor, border: "none", borderRadius: 14, padding: "15px 24px", fontSize: 15, fontWeight: 800, cursor: "pointer", textDecoration: "none", textAlign: "center", boxShadow: `0 4px 24px rgba(${plan.glow},0.25)`, marginBottom: 12, transition: "transform 0.15s, box-shadow 0.15s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 8px 32px rgba(${plan.glow},0.35)`; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 4px 24px rgba(${plan.glow},0.25)`; }}>
                {plan.ctaPrimary}
              </a>
              <div style={{ fontSize: 11, color: "var(--ink-4)", textAlign: "center", marginBottom: 24 }}>{tc("refundNote")}</div>

              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>{tc("includedCourses")}</div>
                {plan.includedCourses.map((c) => (
                  <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
                    <span style={{ fontSize: 18 }}>{c.icon}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{c.name}</div>
                      <div style={{ fontSize: 11, color: "var(--ink-3)" }}>{c.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {plan.premiumBonuses && plan.premiumBonuses.length > 0 ? (
                <div style={{ background: `rgba(${plan.glow},0.05)`, border: `1px solid rgba(${plan.glow},0.10)`, borderRadius: 12, padding: "12px 16px", marginBottom: 16 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: plan.color, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{tc("premiumBonuses")}</div>
                  {plan.premiumBonuses.map((b) => (
                    <div key={b} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <span style={{ color: plan.color, fontSize: 12 }}>★</span>
                      <span style={{ fontSize: 12, color: "var(--ink-2)", fontWeight: 500 }}>{b}</span>
                    </div>
                  ))}
                </div>
              ) : null}

              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>{tc("alsoIncluded")}</div>
                {skills.map((s) => (
                  <div key={s} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ marginTop: 2, flexShrink: 0 }}>
                      <polyline points="20,6 9,17 4,12" stroke={plan.color} strokeWidth="3" />
                    </svg>
                    <span style={{ fontSize: 12, color: "var(--ink-2)" }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            style={{ textAlign: "center", marginTop: 16 }}
            onMouseEnter={(e) => {
              const a = e.currentTarget.querySelector("a");
              if (a) (a as HTMLElement).style.color = "var(--ink-2)";
            }}
            onMouseLeave={(e) => {
              const a = e.currentTarget.querySelector("a");
              if (a) (a as HTMLElement).style.color = "var(--ink-4)";
            }}
          >
            <CourseFooterComparePlans
              style={{
                fontSize: 12,
                color: "var(--ink-4)",
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
