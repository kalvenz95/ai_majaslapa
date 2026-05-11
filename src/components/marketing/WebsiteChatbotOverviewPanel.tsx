"use client";

import React from "react";
import type { DetailMarketingCourse } from "@/content/marketing/marketingDetailCourse.types";
import type { WebsiteChatOverviewCopy } from "@/content/marketing/websiteChatbotOverview.byLocale";

type MarketingIntl = (
  key: string,
  values?: Record<string, string | number>
) => string;

const A = "#00ff88";
const A2 = "#00d4ff";
const AG = `linear-gradient(135deg, ${A}, ${A2})`;
const ABg = `rgba(0,255,136,0.12)`;
const ABg2 = `rgba(0,212,255,0.08)`;
const ABorder = `rgba(0,255,136,0.3)`;

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 11,
        fontWeight: 700,
        color: A,
        textTransform: "uppercase",
        letterSpacing: "0.08em",
        marginBottom: 8,
      }}
    >
      {children}
    </div>
  );
}

export function WebsiteChatbotOverviewPanel({
  course,
  m,
  overview,
}: {
  course: DetailMarketingCourse;
  m: MarketingIntl;
  overview: WebsiteChatOverviewCopy;
}) {
  const diffAccents = [A, A2, "#f59e0b"] as const;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <div
          style={{
            position: "relative",
            padding: "40px",
            borderRadius: 20,
            background:
              "linear-gradient(135deg, rgba(0,255,136,0.08) 0%, rgba(0,212,255,0.05) 60%, rgba(5,5,8,0) 100%)",
            border: `1px solid ${ABorder}`,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              backgroundImage: `linear-gradient(${ABg} 1px, transparent 1px), linear-gradient(90deg, ${ABg} 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
            }}
          />
          <div style={{ position: "relative" }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 12px",
                borderRadius: 20,
                background: ABg,
                border: ABorder,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: A,
                  boxShadow: `0 0 8px ${A}`,
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  color: A,
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                }}
              >
                {overview.heroBadge}
              </span>
            </div>

            <h2
              style={{
                fontSize: 32,
                fontWeight: 900,
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
                marginBottom: 14,
                color: "#fff",
              }}
            >
              {overview.heroLine1}
              <br />
              <span style={{ background: AG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {overview.heroAccent}
              </span>
            </h2>

            <p style={{ fontSize: 15, color: "#888", lineHeight: 1.75, maxWidth: 620 }}>{overview.heroSub}</p>
          </div>
        </div>

        <div
          style={{
            padding: "28px 32px",
            borderRadius: 16,
            background: "#0d0d1a",
            border: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "flex-start",
            gap: 20,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              flexShrink: 0,
              background: "linear-gradient(135deg, rgba(0,255,136,0.2), rgba(0,212,255,0.2))",
              border: `1px solid ${ABorder}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
            }}
          >
            💬
          </div>
          <div>
            <SectionEyebrow>{overview.promiseHeading}</SectionEyebrow>
            <p style={{ fontSize: 15, color: "#ccc", lineHeight: 1.75 }}>{overview.promiseBody}</p>
          </div>
        </div>

        <div>
          <SectionEyebrow>{overview.diffTitle}</SectionEyebrow>
          <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
            {overview.diffCards.map((item, idx) => {
              const accent = diffAccents[idx % diffAccents.length];
              return (
                <div
                  key={item.title}
                  style={{
                    padding: "22px 20px",
                    borderRadius: 14,
                    background: "#0d0d1a",
                    border: `1px solid ${accent}22`,
                    transition: "border-color 0.2s, transform 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}55`;
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = `${accent}22`;
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  }}
                >
                  <div style={{ fontSize: 24, marginBottom: 12 }}>{item.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: "#666", lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid-2-fixed" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div style={{ padding: "24px", borderRadius: 16, background: "#0d0d1a", border: `1px solid rgba(0,255,136,0.12)` }}>
            <SectionEyebrow>{overview.gainsTitle}</SectionEyebrow>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {overview.gainsList.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 5,
                      background: "rgba(0,255,136,0.15)",
                      border: "1px solid rgba(0,255,136,0.35)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: 1,
                    }}
                  >
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={A} strokeWidth="3.5">
                      <polyline points="20,6 9,17 4,12" />
                    </svg>
                  </div>
                  <span style={{ fontSize: 12.5, color: "#bbb", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: "24px", borderRadius: 16, background: "#0d0d1a", border: `1px solid rgba(0,212,255,0.12)` }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: A2, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 16 }}>
              {overview.autoTitle}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {overview.autoList.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 5,
                      background: "rgba(0,212,255,0.12)",
                      border: "1px solid rgba(0,212,255,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: 1,
                    }}
                  >
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={A2} strokeWidth="3.5">
                      <polyline points="20,6 9,17 4,12" />
                    </svg>
                  </div>
                  <span style={{ fontSize: 12.5, color: "#bbb", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding: "28px 32px", borderRadius: 16, background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.14)" }}>
          <SectionEyebrow>{overview.resultEyebrow}</SectionEyebrow>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {overview.resultChips.map((r) => (
              <div
                key={r.text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 18px",
                  borderRadius: 10,
                  background: "rgba(0,255,136,0.07)",
                  border: "1px solid rgba(0,255,136,0.15)",
                  flex: 1,
                  minWidth: 140,
                }}
              >
                <span style={{ fontSize: 18 }}>{r.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: A }}>{r.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <SectionEyebrow>{overview.audienceTitle}</SectionEyebrow>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {overview.audienceBullets.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "14px 18px",
                  borderRadius: 10,
                  background: "#0d0d1a",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: A, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: "#ccc" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: "40px", borderRadius: 20, textAlign: "center", background: `linear-gradient(135deg, ${ABg}, ${ABg2})`, border: ABorder, position: "relative", overflow: "hidden" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              backgroundImage: `linear-gradient(${ABg} 1px, transparent 1px), linear-gradient(90deg, ${ABg} 1px, transparent 1px)`,
              backgroundSize: "32px 32px",
            }}
          />
          <div style={{ position: "relative" }}>
            <p style={{ fontSize: 14, color: "#555", marginBottom: 6 }}>{overview.closingMuted}</p>
            <p style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 28, color: "#fff" }}>
              {overview.closingBoldBefore}{" "}
              <span style={{ background: AG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {overview.closingAccent}
              </span>
              {overview.closingBoldAfter}
            </p>
            <button
              type="button"
              style={{
                padding: "15px 44px",
                borderRadius: 12,
                border: "none",
                cursor: "pointer",
                background: AG,
                color: "#000",
                fontWeight: 700,
                fontSize: 15,
                letterSpacing: "0.01em",
                boxShadow: "0 8px 32px rgba(0,255,136,0.3)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 14px 40px rgba(0,255,136,0.45)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 32px rgba(0,255,136,0.3)";
              }}
            >
              {overview.closingCta}
            </button>
          </div>
        </div>
      </div>

      <div>
        <SectionEyebrow>{m("learnSectionLabel")}</SectionEyebrow>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20, letterSpacing: "-0.02em" }}>{m("headingFromZero")}</h2>
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {course.learn.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                padding: "14px 16px",
                borderRadius: 10,
                background: ABg,
                border: "1px solid rgba(0,255,136,0.1)",
              }}
            >
              <div
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 5,
                  background: "rgba(0,255,136,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: 1,
                }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={A} strokeWidth="3">
                  <polyline points="20,6 9,17 4,12" />
                </svg>
              </div>
              <span style={{ fontSize: 13, color: "#ccc", lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionEyebrow>{m("contentSectionLabel")}</SectionEyebrow>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20, letterSpacing: "-0.02em" }}>
          {m("contentHeadlineModules", { modules: course.totalModules, lessons: course.totalLessons })}
        </h2>
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {course.modules.map((mod) => (
            <div key={mod.id} style={{ padding: "16px", borderRadius: 12, background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 6,
                    background: ABg,
                    border: `1px solid ${ABorder}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    fontWeight: 800,
                    color: A,
                  }}
                >
                  {mod.id}
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{mod.title}</span>
              </div>
              <div style={{ fontSize: 11, color: "#555", marginBottom: 8 }}>{m("lessonsDuration", { lessons: mod.lessons.length, duration: mod.duration })}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {mod.lessons.slice(0, 3).map((l) => (
                  <span
                    key={l.id}
                    style={{ fontSize: 10, padding: "2px 7px", borderRadius: 4, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", color: "#666" }}
                  >
                    {l.type === "task" ? "🎯" : l.type === "text" ? "📄" : "▶"} {l.duration}
                  </span>
                ))}
                {mod.lessons.length > 3 && <span style={{ fontSize: 10, color: "#444", padding: "2px 4px" }}>+{mod.lessons.length - 3}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionEyebrow>{overview.whyEyebrow}</SectionEyebrow>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20, letterSpacing: "-0.02em" }}>{overview.whyHeading}</h2>
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {overview.whyCards.map((item) => (
            <div key={item.title} style={{ padding: "20px", borderRadius: 12, background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: "#666", lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionEyebrow>{m("instructorSectionLabel")}</SectionEyebrow>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 20, padding: "24px", borderRadius: 16, background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, flexShrink: 0, background: AG, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, color: "#000" }}>
            {course.instructor.avatar}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <span style={{ fontSize: 16, fontWeight: 800 }}>{course.instructor.name}</span>
              <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 6, background: ABg, border: ABorder, color: A }}>{course.instructor.role}</span>
            </div>
            <p style={{ fontSize: 13, color: "#777", lineHeight: 1.7, marginBottom: 14 }}>{course.instructor.bio}</p>
            <div style={{ display: "flex", gap: 20 }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: A }}>{course.instructor.students}+</div>
                <div style={{ fontSize: 11, color: "#555" }}>{m("instructorStatStudents")}</div>
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: A }}>{course.instructor.courses}</div>
                <div style={{ fontSize: 11, color: "#555" }}>{m("instructorStatCourses")}</div>
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#f59e0b" }}>4.8 ★</div>
                <div style={{ fontSize: 11, color: "#555" }}>{m("instructorAvgRating")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: "36px", borderRadius: 20, background: `linear-gradient(135deg, ${ABg}, ${ABg2})`, border: `1px solid ${ABorder}`, textAlign: "center" }}>
        <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 8, letterSpacing: "-0.02em" }}>{m("footerEarnTitle", { earn: course.earn })}</h3>
        <p style={{ fontSize: 14, color: "#777", marginBottom: 24 }}>{m("footerEarnSubtitle", { students: course.students })}</p>
        <button
          type="button"
          style={{
            padding: "14px 40px",
            borderRadius: 12,
            border: "none",
            cursor: "pointer",
            background: AG,
            color: "#000",
            fontWeight: 700,
            fontSize: 15,
            boxShadow: "0 8px 30px rgba(0,255,136,0.3)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 40px rgba(0,255,136,0.4)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 30px rgba(0,255,136,0.3)";
          }}
        >
          {m("footerStartFree")}
        </button>
      </div>
    </div>
  );
}
