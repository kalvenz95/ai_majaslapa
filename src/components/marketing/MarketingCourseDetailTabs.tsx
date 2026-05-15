"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import type {
  DetailLesson,
  DetailLessonType,
  DetailMarketingCourse,
} from "@/content/marketing/marketingDetailCourse.types";
import { useMessages, useTranslations } from "next-intl";
import type { MarketingCourseVisualTheme } from "./marketingCourseDetailTabs.types";

type LessonType = DetailLessonType;

function VideoIcon({ size = 14 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><polygon points="5,3 19,12 5,21" fill="currentColor" /></svg>;
}
function TextIcon({ size = 14 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="16" y2="12" /><line x1="3" y1="18" x2="13" y2="18" /></svg>;
}
function TaskIcon({ size = 14 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></svg>;
}
export function LessonLockIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" /></svg>;
}
export function LessonChevronIcon({ open }: { open: boolean }) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}><polyline points="6,9 12,15 18,9" /></svg>;
}

const lessonIconInner = (type: LessonType) => {
  if (type === "video") return <VideoIcon />;
  if (type === "text") return <TextIcon />;
  if (type === "task") return <TaskIcon />;
  return <TextIcon />;
};

export type MarketingIntl = (key: string, values?: Record<string, string | number>) => string;

export function MarketingCourseSectionLabel({
  accent,
  children,
}: {
  accent: string;
  children: ReactNode;
}) {
  return (
    <div style={{ fontSize: 11, fontWeight: 700, color: accent, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>
      {children}
    </div>
  );
}

export function MarketingCourseCurriculumTab({
  course,
  lessonTypeLabel,
  lessonTypeColor,
  theme,
  onSelectLesson,
  introBefore,
}: {
  course: DetailMarketingCourse;
  lessonTypeLabel: Record<LessonType, string>;
  lessonTypeColor: Record<LessonType, string>;
  theme: MarketingCourseVisualTheme;
  onSelectLesson: (l: DetailLesson) => void;
  introBefore?: ReactNode;
}) {
  const detail = useTranslations("CourseMarketingChrome");
  const [open, setOpen] = useState<number[]>(course.modules.map((m) => m.id));
  const toggle = (id: number) => setOpen((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const { tintBg, tintBorder } = theme;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {introBefore && <div style={{ marginBottom: 16 }}>{introBefore}</div>}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <MarketingCourseSectionLabel accent={theme.accentHex}>{detail("curriculumLeadTitle")}</MarketingCourseSectionLabel>
          <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em" }}>
            {detail("curriculumHeadline", {
              modules: course.totalModules,
              lessons: course.totalLessons,
              duration: course.totalDuration,
            })}
          </h2>
        </div>
        <button
          onClick={() => setOpen(open.length === course.modules.length ? [] : course.modules.map((m) => m.id))}
          style={{ fontSize: 12, color: theme.accentHex, background: "transparent", border: "none", cursor: "pointer", fontWeight: 600 }}
        >
          {open.length === course.modules.length ? detail("collapseAllModules") : detail("expandAllModules")}
        </button>
      </div>

      {course.modules.map((mod) => {
        const isOpen = open.includes(mod.id);
        return (
          <div
            key={mod.id}
            style={{
              borderRadius: 12,
              overflow: "hidden",
              border: isOpen ? theme.curriculumModuleBorderOpen : "1px solid rgba(255,255,255,0.06)",
              background: "#0d0d1a",
              transition: "border-color 0.2s",
            }}
          >
            <button onClick={() => toggle(mod.id)} style={{ width: "100%", padding: "16px 20px", display: "flex", alignItems: "center", gap: 12, background: "transparent", border: "none", cursor: "pointer", color: "#fff" }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  flexShrink: 0,
                  background: isOpen ? tintBg : "rgba(255,255,255,0.05)",
                  border: `1px solid ${isOpen ? tintBorder : "rgba(255,255,255,0.1)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 800,
                  color: isOpen ? theme.accentHex : "#555",
                }}
              >
                {mod.id}
              </div>
              <div style={{ flex: 1, textAlign: "left" }}>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{mod.title}</div>
                <div style={{ fontSize: 12, color: "#555", marginTop: 2 }}>{detail("lessonsDuration", { lessons: mod.lessons.length, duration: mod.duration })}</div>
              </div>
              <div style={{ color: "#444" }}>
                <LessonChevronIcon open={isOpen} />
              </div>
            </button>

            {isOpen && (
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                {mod.lessons.map((lesson, idx) => (
                  <button
                    key={lesson.id}
                    onClick={() => onSelectLesson(lesson)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: "12px 20px",
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                      borderTop: idx > 0 ? "1px solid rgba(255,255,255,0.03)" : "none",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = tintBg)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        flexShrink: 0,
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: lessonTypeColor[lesson.type],
                      }}
                    >
                      {lessonIconInner(lesson.type)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "#ddd", marginBottom: 2 }}>{lesson.title}</div>
                      {lesson.description && <div style={{ fontSize: 11, color: "#555", lineHeight: 1.5 }}>{lesson.description}</div>}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                      {lesson.free && (
                        <span style={{ fontSize: 10, padding: "2px 7px", borderRadius: 4, background: tintBg, color: theme.accentHex, fontWeight: 700 }}>
                          {detail("freeLessonBadge")}
                        </span>
                      )}
                      <span style={{ fontSize: 11, color: "#444" }}>{lesson.duration}</span>
                      {!lesson.free && (
                        <span style={{ color: "#333" }}>
                          <LessonLockIcon />
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

const DEFAULT_TOOL_EMOJI: Record<string, string> = {
  Voiceflow: "🤖",
  n8n: "⚡",
  "Claude API": "🧠",
  Tidio: "💬",
  JavaScript: "💻",
  "Google Sheets": "📊",
  "Framer / WP": "🌐",
};

export function MarketingCourseToolsTab({
  course,
  m,
  theme,
  toolEmojiOverrides,
  requirementItemsOverride,
}: {
  course: DetailMarketingCourse;
  m: MarketingIntl;
  theme: MarketingCourseVisualTheme;
  toolEmojiOverrides?: Record<string, string>;
  requirementItemsOverride?: string[];
}) {
  const messages = useMessages();
  const startingReqDefault =
    ((messages as { CourseMarketingChrome?: { startingRequirements?: unknown } }).CourseMarketingChrome?.startingRequirements ?? []) as string[];
  const startingReq = requirementItemsOverride ?? startingReqDefault;
  const toolEmoji = { ...DEFAULT_TOOL_EMOJI, ...(toolEmojiOverrides ?? {}) };

  const {
    requirementsBoxBg,
    requirementsBoxBorder,
    requirementsCheckColor,
    requirementsHeadingColor,
  } = theme;

  return (
    <div>
      <MarketingCourseSectionLabel accent={theme.accentHex}>{m("marketingToolsEyebrow")}</MarketingCourseSectionLabel>
      <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 8, letterSpacing: "-0.02em" }}>
        {m("toolsHeadlineCount", { count: course.tools.length })}
      </h2>
      <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7, marginBottom: 32 }}>{m("toolsIntroDefault")}</p>
      <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 40 }}>
        {course.tools.map((tool) => (
          <div
            key={tool.name}
            style={{ padding: "20px", borderRadius: 14, background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 16, transition: "border-color 0.2s, transform 0.2s", cursor: "default" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = `${tool.color}33`;
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)";
              (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
            }}
          >
            <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: `${tool.color}18`, border: `1px solid ${tool.color}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
              {toolEmoji[tool.name] || "🔧"}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 3 }}>{tool.name}</div>
              <div style={{ fontSize: 12, color: "#555" }}>{tool.desc}</div>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: tool.color, boxShadow: `0 0 8px ${tool.color}` }} />
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: "24px", borderRadius: 14, background: requirementsBoxBg, border: requirementsBoxBorder }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: requirementsHeadingColor, marginBottom: 12 }}>
          ✓ {m("startingRequirementsHeading")}
        </div>
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {startingReq.map((req) => (
            <div key={req} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 12, color: "#888" }}>
              <span style={{ color: requirementsCheckColor, flexShrink: 0, marginTop: 1 }}>✓</span>
              {req}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Keep task/teal cyan aligned with canonical marketing chrome (readable on any brand hero) */
const TASK_HEX = "#00ff88";

export function MarketingCourseLessonView({
  lesson,
  lessonTypeLabel,
  lessonTypeColor,
  theme,
  onBack,
  extraBelowDescription,
}: {
  lesson: DetailLesson;
  lessonTypeLabel: Record<LessonType, string>;
  lessonTypeColor: Record<LessonType, string>;
  theme: MarketingCourseVisualTheme;
  onBack: () => void;
  extraBelowDescription?: ReactNode;
}) {
  const detail = useTranslations("CourseMarketingChrome");
  const c = useTranslations("CoursesChrome");
  const videoTitle = `${c("lessonTypeVideo")} — ${lesson.duration}`;
  const accent2 = "#00d4ff";
  const sr = theme.orbRgbComma;
  const sr2 = theme.accentSecondaryRgbComma;
  const { accentGradientCss, tintBg, tintBorder } = theme;
  const nextShadow = theme.lessonNextBtnShadowRgb;

  return (
    <div className="lesson-pad" style={{ maxWidth: 860, margin: "0 auto", padding: "40px 48px" }}>
      <button
        type="button"
        onClick={onBack}
        style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28, background: "transparent", border: "none", cursor: "pointer", color: "#666", fontSize: 13, fontWeight: 500, padding: "6px 0", transition: "color 0.2s" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#666")}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15,18 9,12 15,6" /></svg>
        {detail("backToOverview")}
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, padding: "4px 10px", borderRadius: 6, background: `${lessonTypeColor[lesson.type]}18`, border: `1px solid ${lessonTypeColor[lesson.type]}33`, color: lessonTypeColor[lesson.type], fontWeight: 600 }}>
          {lessonIconInner(lesson.type)}
          {lessonTypeLabel[lesson.type]}
        </span>
        <span style={{ fontSize: 11, color: "#444" }}>{lesson.duration}</span>
      </div>

      <h1 style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.025em", marginBottom: 24, lineHeight: 1.2 }}>{lesson.title}</h1>

      {lesson.type === "video" && (
        <div
          style={{
            width: "100%",
            aspectRatio: "16/9",
            borderRadius: 16,
            marginBottom: 32,
            background: theme.videoBgGradient,
            border: `1px solid rgba(${sr},0.2)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
            transition: "border-color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = tintBorder)}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = `rgba(${sr},0.2)`)}
        >
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(${tintBg} 1px, transparent 1px), linear-gradient(90deg, ${tintBg} 1px, transparent 1px)`, backgroundSize: "50px 50px" }} />
          <div style={{ position: "absolute", width: 300, height: 300, background: `radial-gradient(circle, rgba(${sr},0.08), transparent 70%)`, pointerEvents: "none" }} />
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: `linear-gradient(135deg, rgba(${sr},0.25), rgba(${sr2},0.25))`, border: `2px solid ${tintBorder}`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <div style={{ marginLeft: 4 }}>
              <VideoIcon size={28} />
            </div>
          </div>
          <div style={{ textAlign: "center", position: "relative" }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{videoTitle}</div>
            <div style={{ fontSize: 12, color: "#555" }}>{detail("proOnlyVideo")}</div>
          </div>
        </div>
      )}

      {lesson.description && (
        <div style={{ padding: "24px", borderRadius: 12, marginBottom: 24, background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: theme.accentHex, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 10 }}>
            {detail("lessonAboutHeading")}
          </div>
          <p style={{ fontSize: 14, color: "#aaa", lineHeight: 1.8 }}>{lesson.description}</p>
        </div>
      )}

      {extraBelowDescription}

      {lesson.type === "task" && (
        <div style={{ padding: "24px", borderRadius: 12, marginBottom: 24, background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.15)" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: TASK_HEX, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>
            🎯 {detail("practiceTaskBadge")}
          </div>
          <div style={{ fontSize: 13, color: "#888", lineHeight: 1.8 }}>{detail("practiceTaskHelp")}</div>
          <button
            type="button"
            style={{ marginTop: 16, padding: "10px 24px", borderRadius: 8, cursor: "pointer", background: "rgba(0,255,136,0.15)", border: "1px solid rgba(0,255,136,0.3)", color: TASK_HEX, fontWeight: 700, fontSize: 13, transition: "background 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,255,136,0.25)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,255,136,0.15)")}
          >
            {detail("submitAssignment")}
          </button>
        </div>
      )}

      {lesson.type === "text" && (
        <div style={{ padding: "24px", borderRadius: 12, marginBottom: 24, background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.12)" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: accent2, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>
            📄 {detail("materialHeading")}
          </div>
          <div style={{ fontSize: 13, color: "#888", lineHeight: 1.8, marginBottom: 14 }}>{detail("materialIntro")}</div>
          <button
            type="button"
            style={{ padding: "10px 24px", borderRadius: 8, cursor: "pointer", background: "rgba(0,212,255,0.12)", border: `1px solid rgba(0,212,255,0.25)`, color: accent2, fontWeight: 700, fontSize: 13, transition: "background 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,212,255,0.2)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(0,212,255,0.12)")}
          >
            {detail("downloadPdf")}
          </button>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: 8 }}>
        <button
          type="button"
          onClick={onBack}
          style={{ padding: "10px 20px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)", background: "transparent", color: "#666", fontSize: 13, cursor: "pointer", fontWeight: 500, transition: "color 0.2s, border-color 0.2s" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "#fff";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.2)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.color = "#666";
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)";
          }}
        >
          {detail("backChevronLabel")}
        </button>
        <button
          type="button"
          style={{
            padding: "10px 24px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            background: accentGradientCss,
            color: theme.lessonNextBtnTextColor,
            fontSize: 13,
            fontWeight: 700,
            boxShadow: `0 4px 16px rgba(${nextShadow},0.25)`,
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 8px 24px rgba(${nextShadow},0.35)`;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 4px 16px rgba(${nextShadow},0.25)`;
          }}
        >
          {detail("nextLessonCta")}
        </button>
      </div>
    </div>
  );
}
