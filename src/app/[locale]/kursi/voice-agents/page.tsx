"use client";

import { useState } from "react";
import type {
  DetailLesson,
  DetailLessonType,
} from "@/content/marketing/marketingDetailCourse.types";
import { voiceMarketingCourseByLocale } from "@/content/marketing/voiceMarketingCourseByLocale";
import {
  MarketingCourseCurriculumTab,
  MarketingCourseLessonView,
  MarketingCourseToolsTab,
  LessonChevronIcon,
  LessonLockIcon,
} from "@/components/marketing/MarketingCourseDetailTabs";
import { VOICE_MARKET_THEME } from "@/components/marketing/marketingCourseVisualThemes";
import {
  VoiceMarketingOverviewPanelEn,
  VoiceMarketingOverviewPanelLv,
} from "@/components/marketing/VoiceMarketingOverviewPanel";
import { VoiceLessonExtraBelowDescription } from "@/components/marketing/VoiceLessonEnrichment";
import type { AppLocale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { useLocale, useMessages, useTranslations } from "next-intl";

type LessonType = DetailLessonType;

const theme = VOICE_MARKET_THEME;
const A = theme.accentHex;
const AG = theme.accentGradientCss;
const ABg = theme.tintBg;
const ABg2 = theme.tintBg2;
const ABorder = theme.tintBorder;
const ABorder2 = theme.tintBorderSecondary;

function StarIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" stroke="none"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" /></svg>;
}

function MicSidebarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="9" y="2" width="6" height="12" rx="3" fill="url(#voice-mic-g)" opacity="0.9"/>
      <path d="M5 10a7 7 0 0 0 14 0" stroke="url(#voice-mic-g)" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="12" y1="17" x2="12" y2="21" stroke="url(#voice-mic-g)" strokeWidth="1.8" strokeLinecap="round"/>
      <line x1="8" y1="21" x2="16" y2="21" stroke="url(#voice-mic-g)" strokeWidth="1.8" strokeLinecap="round"/>
      <defs>
        <linearGradient id="voice-mic-g" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f97316"/><stop offset="1" stopColor="#fbbf24"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

function VideoIcon({ size = 14 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none"><polygon points="5,3 19,12 5,21" fill="currentColor" /></svg>;
}
function TextIcon({ size = 14 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="16" y2="12" /><line x1="3" y1="18" x2="13" y2="18" /></svg>;
}
function TaskIcon({ size = 14 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" /></svg>;
}

const lessonIcon = (type: LessonType) => {
  if (type === "video") return <VideoIcon />;
  if (type === "text") return <TextIcon />;
  if (type === "task") return <TaskIcon />;
  return <TextIcon />;
};

const lessonTypeColor: Record<LessonType, string> = {
  video: "#f97316",
  text: "#00d4ff",
  task: "#00ff88",
  quiz: "#f59e0b",
};

export default function CourseDetailPage() {
  const locale = useLocale() as AppLocale;
  const course = voiceMarketingCourseByLocale[locale];
  const chrome = useTranslations("CoursesChrome");
  const m = useTranslations("CourseMarketingChrome");

  const voiceRequirements = (
    useMessages() as { CourseMarketingChrome?: { startingRequirementsVoice?: string[] } }
  ).CourseMarketingChrome?.startingRequirementsVoice;

  const lessonTypeLabel: Record<LessonType, string> = {
    video: chrome("lessonTypeVideo"),
    text: chrome("lessonTypeText"),
    task: chrome("lessonTypeTask"),
    quiz: chrome("lessonTypeQuiz"),
  };

  const [openModules, setOpenModules] = useState<number[]>([1, 2]);
  const [activeLesson, setActiveLesson] = useState<DetailLesson | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "curriculum" | "tools">("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleModule = (id: number) =>
    setOpenModules((prev) => (prev.includes(id) ? prev.filter((mid) => mid !== id) : [...prev, id]));

  const totalLessons = course.modules.reduce((acc, mod) => acc + mod.lessons.length, 0);

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--ink)", fontFamily: "'Inter', sans-serif" }}>

      <nav style={{ position: "sticky", top: 0, zIndex: 50, height: 56, background: "var(--bg)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", padding: "0 20px", gap: 12 }}>
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--ink-3)", fontSize: 13, fontWeight: 500, textDecoration: "none", padding: "5px 10px", borderRadius: 8, transition: "color 0.2s, background 0.2s" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink)"; (e.currentTarget as HTMLAnchorElement).style.background = "var(--bg-2)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--ink-3)"; (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15,18 9,12 15,6" /></svg>
          {chrome("navBackShort")}
        </Link>
        <span style={{ color: "var(--line-2)", fontSize: 13 }}>/</span>
        <span style={{ color: "var(--ink-3)", fontSize: 13 }}>{chrome("breadcrumbCourses")}</span>
        <span style={{ color: "var(--line-2)", fontSize: 13 }}>/</span>
        <span style={{ color: "var(--ink)", fontSize: 13, fontWeight: 600 }}>{course.title}</span>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: ABg, border: ABorder, color: A, fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" }}>
            {course.difficulty}
          </span>
          <span style={{ fontSize: 11, padding: "3px 10px", borderRadius: 20, background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.25)", color: "#00a855", fontWeight: 700 }}>
            {course.earn}
          </span>
        </div>
      </nav>

      <div className="course-layout" style={{ display: "flex", height: "calc(100vh - 56px)" }}>

        {sidebarOpen && <div className="sidebar-overlay-bg" onClick={() => setSidebarOpen(false)} />}

        <aside className={`course-sidebar${sidebarOpen ? " open" : ""}`} style={{ width: 300, flexShrink: 0, background: "var(--bg-1)", borderRight: "1px solid var(--line)", overflowY: "auto", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "20px 16px 16px", borderBottom: "1px solid var(--line)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, flexShrink: 0, background: `linear-gradient(135deg, ${ABg}, ${ABg2})`, border: ABorder, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <MicSidebarIcon />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", lineHeight: 1.2 }}>{course.title}</div>
                <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 2 }}>{m("lessonsDuration", { lessons: totalLessons, duration: course.totalDuration })}</div>
              </div>
            </div>
            <div style={{ marginBottom: 4 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: "var(--ink-3)" }}>{m("progressLabel")}</span>
                <span style={{ fontSize: 11, color: A, fontWeight: 600 }}>0%</span>
              </div>
              <div style={{ height: 4, background: "var(--bg-2)", borderRadius: 4 }}>
                <div style={{ width: "0%", height: "100%", borderRadius: 4, background: AG }} />
              </div>
            </div>
          </div>

          <div style={{ padding: "8px 0", flex: 1 }}>
            {course.modules.map((mod) => {
              const isOpen = openModules.includes(mod.id);
              return (
                <div key={mod.id}>
                  <button
                    type="button"
                    onClick={() => toggleModule(mod.id)}
                    style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", background: "transparent", border: "none", cursor: "pointer", color: "var(--ink)", textAlign: "left", transition: "background 0.15s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "var(--bg-2)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                  >
                    <div style={{ width: 22, height: 22, borderRadius: 6, flexShrink: 0, background: isOpen ? ABg : "var(--bg-2)", border: `1px solid ${isOpen ? ABorder : "var(--line)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: isOpen ? A : "var(--ink-3)" }}>
                      {mod.id}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: isOpen ? "var(--ink)" : "var(--ink-3)" }}>{mod.title}</div>
                      <div style={{ fontSize: 10, color: "var(--ink-4)", marginTop: 1 }}>{m("lessonsDuration", { lessons: mod.lessons.length, duration: mod.duration })}</div>
                    </div>
                    <div style={{ color: "var(--ink-4)", flexShrink: 0 }}><LessonChevronIcon open={isOpen} /></div>
                  </button>

                  {isOpen && (
                    <div style={{ borderBottom: "1px solid var(--line)" }}>
                      {mod.lessons.map((lesson) => {
                        const isActive = activeLesson?.id === lesson.id;
                        return (
                          <button
                            type="button"
                            key={lesson.id}
                            onClick={() => setActiveLesson(lesson)}
                            style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "8px 16px 8px 24px", border: "none", cursor: "pointer", textAlign: "left", background: isActive ? ABg : "transparent", borderLeft: isActive ? `2px solid ${A}` : "2px solid transparent", transition: "background 0.15s" }}
                            onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "var(--bg-2)"; }}
                            onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
                          >
                            <div style={{ width: 20, height: 20, borderRadius: 5, flexShrink: 0, background: isActive ? ABg : "var(--bg-2)", border: `1px solid ${isActive ? ABorder : "var(--line)"}`, display: "flex", alignItems: "center", justifyContent: "center", color: isActive ? A : lessonTypeColor[lesson.type] }}>
                              {lessonIcon(lesson.type)}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontSize: 11.5, fontWeight: isActive ? 600 : 400, color: isActive ? "var(--ink)" : "var(--ink-3)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                {lesson.title}
                              </div>
                              <div style={{ fontSize: 10, color: "var(--ink-4)", marginTop: 1 }}>{lessonTypeLabel[lesson.type]} · {lesson.duration}</div>
                            </div>
                            {lesson.free ? (
                              <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 4, background: ABg, color: A, fontWeight: 700, flexShrink: 0 }}>{m("freeLessonBadge")}</span>
                            ) : (
                              <span style={{ color: "var(--ink-4)", flexShrink: 0 }}><LessonLockIcon /></span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div style={{ padding: 16, borderTop: "1px solid var(--line)" }}>
            <button
              type="button"
              style={{ width: "100%", padding: "11px 0", borderRadius: 10, border: "none", cursor: "pointer", background: AG, color: "#000", fontWeight: 700, fontSize: 13, letterSpacing: "0.02em", boxShadow: "0 4px 20px rgba(249,115,22,0.3)", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 30px rgba(249,115,22,0.4)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 20px rgba(249,115,22,0.3)"; }}
            >
              {m("enrollCta", { earn: course.earn })}
            </button>
            <div style={{ textAlign: "center", marginTop: 8, fontSize: 10, color: "var(--ink-4)" }}>
              {m("enrollFootnoteNoCoding")}
            </div>
          </div>
        </aside>

        <main className="course-main" style={{ flex: 1, overflowY: "auto" }}>
          <button
            type="button"
            className="mobile-sidebar-btn"
            onClick={() => setSidebarOpen(true)}
            style={{ position: "fixed", bottom: 20, right: 20, zIndex: 150, alignItems: "center", gap: 8, padding: "12px 20px", borderRadius: 50, border: "none", cursor: "pointer", background: AG, color: "#000", fontWeight: 700, fontSize: 13, boxShadow: "0 4px 20px rgba(249,115,22,0.4)" }}
          >
            {m("mobileProgram")}
          </button>

          {activeLesson ? (
            <MarketingCourseLessonView
              lesson={activeLesson}
              lessonTypeLabel={lessonTypeLabel}
              lessonTypeColor={lessonTypeColor}
              theme={theme}
              onBack={() => setActiveLesson(null)}
              extraBelowDescription={
                locale === "lv" ? <VoiceLessonExtraBelowDescription lessonId={activeLesson.id} /> : null
              }
            />
          ) : (
            <div>
              <div
                className="course-hero"
                style={{
                  position: "relative", padding: "48px 48px 40px",
                  background: `linear-gradient(135deg, ${ABg} 0%, ${ABg2} 50%, transparent 100%)`,
                  borderBottom: "1px solid var(--line)", overflow: "hidden",
                }}
              >
                <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(${ABg} 1px, transparent 1px), linear-gradient(90deg, ${ABg} 1px, transparent 1px)`, backgroundSize: "40px 40px" }} />
                <div style={{ position: "absolute", top: -80, right: -80, width: 320, height: 320, borderRadius: "50%", background: `radial-gradient(circle, rgba(${theme.orbRgbComma},0.10), transparent 70%)`, pointerEvents: "none" }} />

                <div style={{ position: "relative" }}>
                  <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 11, padding: "4px 12px", borderRadius: 20, background: ABg, border: ABorder, color: A, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {course.tag}
                    </span>
                    <span style={{ fontSize: 11, padding: "4px 12px", borderRadius: 20, background: ABg, border: ABorder2, color: A, fontWeight: 600 }}>
                      {course.difficulty}
                    </span>
                    <span style={{ fontSize: 11, padding: "4px 12px", borderRadius: 20, background: "rgba(163,230,53,0.08)", border: "1px solid rgba(163,230,53,0.2)", color: "#5a8a00", fontWeight: 600 }}>
                      {m("heroPillNoCoding")}
                    </span>
                  </div>

                  <h1 className="hero-h1" style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 10, lineHeight: 1.1, color: "var(--ink)" }}>
                    {course.title}
                  </h1>
                  <p style={{ fontSize: 17, fontWeight: 700, color: "var(--ink-2)", marginBottom: 8, letterSpacing: "-0.01em" }}>{course.subtitle}</p>
                  <p className="hero-desc" style={{ fontSize: 16, color: "var(--ink-3)", maxWidth: 640, lineHeight: 1.7, marginBottom: 28 }}>
                    {course.description}
                  </p>

                  <div className="stat-row" style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                    {[
                      { label: m("statModules"), value: course.totalModules },
                      { label: m("statLessons"), value: totalLessons },
                      { label: m("statDuration"), value: course.totalDuration },
                      { label: m("statStudents"), value: course.students },
                    ].map((stat) => (
                      <div key={stat.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 20, fontWeight: 800, color: "var(--ink)" }}>{stat.value}</span>
                        <span style={{ fontSize: 12, color: "var(--ink-3)" }}>{stat.label}</span>
                      </div>
                    ))}
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <StarIcon />
                      <span style={{ fontSize: 14, fontWeight: 700, color: "#f59e0b" }}>{course.rating}</span>
                      <span style={{ fontSize: 12, color: "var(--ink-3)" }}>{m("ratingLabel")}</span>
                    </div>
                    <div className="earn-display" style={{ marginLeft: "auto", display: "flex", alignItems: "baseline", gap: 4 }}>
                      <span style={{ fontSize: 28, fontWeight: 900, background: AG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                        {course.earn}
                      </span>
                      <span style={{ fontSize: 12, color: "var(--ink-3)" }}>{m("earnPotentialSuffix")}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="course-tabs" style={{ padding: "0 48px", borderBottom: "1px solid var(--line)", display: "flex", gap: 0 }}>
                {(["overview", "curriculum", "tools"] as const).map((tab) => {
                  const labels = { overview: m("tabOverview"), curriculum: m("tabCurriculum"), tools: m("tabTools") } as const;
                  const isActive = activeTab === tab;
                  return (
                    <button
                      type="button"
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      style={{ padding: "14px 20px", border: "none", background: "transparent", cursor: "pointer", fontSize: 13, fontWeight: isActive ? 600 : 400, color: isActive ? "var(--ink)" : "var(--ink-3)", borderBottom: isActive ? `2px solid ${A}` : "2px solid transparent", transition: "color 0.2s, border-color 0.2s" }}
                    >
                      {labels[tab]}
                    </button>
                  );
                })}
              </div>

              <div className="course-content" style={{ padding: "40px 48px", maxWidth: 900 }}>
                {activeTab === "overview" && (
                  locale === "lv"
                    ? <VoiceMarketingOverviewPanelLv course={course} />
                    : <VoiceMarketingOverviewPanelEn course={course} />
                )}
                {activeTab === "curriculum" && (
                  <MarketingCourseCurriculumTab
                    course={course}
                    lessonTypeLabel={lessonTypeLabel}
                    lessonTypeColor={lessonTypeColor}
                    theme={theme}
                    onSelectLesson={setActiveLesson}
                  />
                )}
                {activeTab === "tools" && (
                  <MarketingCourseToolsTab
                    course={course}
                    m={m}
                    theme={theme}
                    requirementItemsOverride={voiceRequirements}
                    toolEmojiOverrides={{
                      ElevenLabs: "🎙️",
                      n8n: "⚡",
                      "Claude API": "🧠",
                      "Twilio / Vonage": "📞",
                      "Google Cal.": "📅",
                      "Google Sheets": "📊",
                      "Retell AI": "🤖",
                    }}
                  />
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
