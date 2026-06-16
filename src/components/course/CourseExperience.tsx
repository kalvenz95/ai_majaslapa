"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { Reveal } from "@/components/home/Reveal";
import { MarketingCourseLessonView } from "@/components/marketing/MarketingCourseDetailTabs";
import type { MarketingCourseVisualTheme } from "@/components/marketing/marketingCourseDetailTabs.types";
import type {
  DetailLesson,
  DetailLessonType,
  DetailMarketingCourse,
} from "@/content/marketing/marketingDetailCourse.types";
import { Link } from "@/i18n/navigation";

/* ──────────────────────────────────────────────────────────────────
   Course Experience — a course page that feels like a direct extension
   of the homepage. Same palette, type scale, cards, hovers, animations.
   ────────────────────────────────────────────────────────────────── */

type IncomeStep = { clients: string; price: string; note?: string };
type ResourceItem = { icon: ReactNode; title: string; desc: string };

export type CourseExperienceProps = {
  course: DetailMarketingCourse;
  /** Homepage-palette accent (e.g. #6D5EF3) */
  accent: string;
  /** Secondary accent (e.g. #00BFA5) */
  accent2: string;
  /** Accent rgb triplet for glows, e.g. "109,94,243" */
  glow: string;
  /** Eyebrow category label */
  category: string;
  /** Existing per-course theme — reused only for the focused lesson reader */
  lessonTheme: MarketingCourseVisualTheme;
  /** Per-lesson rich content keyed by lesson id (LV only) */
  lessonExtras?: Record<string, ReactNode>;
  /** Per-module rich content rendered below a module block, keyed by module id (LV only) */
  moduleExtras?: Record<number, ReactNode>;
  /** Income ladder for the "Real examples" section */
  incomeLadder?: IncomeStep[];
};

/* ── Inline icons (match homepage stroke style) ── */
const Check = ({ c = "currentColor", s = 14 }: { c?: string; s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20,6 9,17 4,12" /></svg>
);
const ArrowRight = ({ s = 15 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" /></svg>
);
const Play = ({ s = 16, c = "currentColor" }: { s?: number; c?: string }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill={c}><polygon points="6,4 20,12 6,20" /></svg>
);
const TextLines = ({ s = 16 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="16" y2="12" /><line x1="4" y1="17" x2="13" y2="17" /></svg>
);
const TaskCheck = ({ s = 16 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
);
const Lock = ({ s = 13 }: { s?: number }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
);
const Chevron = ({ open }: { open: boolean }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform 0.25s ease" }}><polyline points="6,9 12,15 18,9" /></svg>
);
const Star = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#FFB86B"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" /></svg>
);

const typeIcon = (t: DetailLessonType, s = 16) => {
  if (t === "video") return <Play s={s} />;
  if (t === "task") return <TaskCheck s={s} />;
  return <TextLines s={s} />;
};

export function CourseExperience({
  course, accent, accent2, glow, category, lessonTheme, lessonExtras, moduleExtras, incomeLadder,
}: CourseExperienceProps) {
  const [openModules, setOpenModules] = useState<number[]>([course.modules[0]?.id].filter(Boolean) as number[]);
  const [activeLesson, setActiveLesson] = useState<DetailLesson | null>(null);

  const totalLessons = course.modules.reduce((a, m) => a + m.lessons.length, 0);
  const toggle = (id: number) =>
    setOpenModules((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const gradient = `linear-gradient(120deg, ${accent} 10%, ${accent2} 95%)`;

  const lessonTypeLabel: Record<DetailLessonType, string> = {
    video: "Video", text: "Teksts", task: "Uzdevums", quiz: "Tests",
  };
  const lessonTypeColor: Record<DetailLessonType, string> = {
    video: accent, text: accent2, task: "#00BFA5", quiz: "#FFB86B",
  };

  const resources: ResourceItem[] = [
    { icon: <TextLines s={18} />, title: "Skriptu veidnes", desc: "Gatavi video un saziņas skripti — tikai aizpildi." },
    { icon: <TaskCheck s={18} />, title: "Čeklisti", desc: "Soli-pa-solim čeklisti katram darba posmam." },
    { icon: <Play s={18} />, title: "Prompt pakas", desc: "Pārbaudīti AI prompti, kas dod rezultātu pirmajā reizē." },
    { icon: <Check s={18} />, title: "Klientu veidnes", desc: "Piedāvājumi, līgumi un rēķini latviešu valodā." },
  ];

  const ladder: IncomeStep[] = incomeLadder ?? [
    { clients: "1. klients", price: "€300–€500", note: "Iesācēja cena" },
    { clients: "2 klienti", price: "€600–€1 000", note: "Pēc 1. mēneša" },
    { clients: "3 klienti", price: "€1 200–€1 800", note: "Paceltas cenas" },
    { clients: "4+ klienti", price: course.earn, note: "Premium + upsell" },
  ];

  const community = [
    { title: "Privātā kopiena", desc: "Slēgta kopiena, kur dalies ar darbiem un saņem atgriezenisko saiti." },
    { title: "1:1 mentorings", desc: "Personīgas sesijas par taviem projektiem un pirmajiem klientiem." },
    { title: "Tiešs atbalsts", desc: "Iestrēdzi? Saņem atbildi dažu stundu laikā — ne dienās." },
    { title: "Networking", desc: "Iepazīsti citus speciālistus, sadarbojies un dali darījumus." },
  ];

  /* ── Focused lesson reader (reuses existing rich content) ── */
  if (activeLesson) {
    return (
      <div style={{ background: "var(--bg)", minHeight: "100vh", color: "var(--ink)" }}>
        <MarketingCourseLessonView
          lesson={activeLesson}
          lessonTypeLabel={lessonTypeLabel}
          lessonTypeColor={lessonTypeColor}
          theme={lessonTheme}
          onBack={() => setActiveLesson(null)}
          extraBelowDescription={lessonExtras?.[activeLesson.id]}
        />
      </div>
    );
  }

  const sectionPad = "clamp(72px, 11vw, 130px)";

  return (
    <div style={{ background: "var(--bg)", color: "var(--ink)", overflowX: "clip", fontFamily: "var(--font-sans)" }}>
      {/* ════ 1 · HERO ════ */}
      <section style={{ position: "relative", padding: `clamp(56px,8vw,96px) 0 ${sectionPad}`, overflow: "hidden" }}>
        <div aria-hidden className="v2-mesh-blob v2-mesh-1" style={{ width: 520, height: 520, top: -160, right: -120, background: `radial-gradient(circle, rgba(${glow},0.20), transparent 70%)` }} />
        <div aria-hidden className="v2-mesh-blob v2-mesh-2" style={{ width: 440, height: 440, bottom: -180, left: -140, background: "radial-gradient(circle, rgba(0,191,165,0.14), transparent 70%)" }} />

        <div className="lp-container" style={{ maxWidth: 1180, margin: "0 auto", padding: "0 28px", position: "relative" }}>
          <div className="ce-hero-grid" style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 56, alignItems: "center" }}>
            <div>
              <Reveal><span className="v2-eyebrow">{category}</span></Reveal>
              <Reveal delay={0.06}>
                <h1 className="v2-h2" style={{ fontSize: "clamp(38px, 5.4vw, 66px)", margin: "18px 0 0", color: "var(--ink)" }}>
                  {course.title.split(" ").slice(0, -1).join(" ")} <span className="v2-grad">{course.title.split(" ").slice(-1)}</span>
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p style={{ fontSize: 18, color: "var(--ink-3)", lineHeight: 1.7, margin: "20px 0 0", maxWidth: 520 }}>
                  {course.description}
                </p>
              </Reveal>

              {/* progress */}
              <Reveal delay={0.24}>
                <div style={{ margin: "28px 0 0", maxWidth: 440 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 12, color: "var(--ink-3)", fontWeight: 500 }}>Tava progresija</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: accent }}>0% · sāc tagad</span>
                  </div>
                  <div style={{ height: 6, borderRadius: 6, background: "var(--bg-2)", overflow: "hidden", border: "1px solid var(--line)" }}>
                    <div style={{ width: "4%", height: "100%", borderRadius: 6, background: gradient }} />
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, margin: "32px 0 0", alignItems: "center" }}>
                  <button type="button" className="btn-primary" style={{ background: gradient, boxShadow: `0 10px 30px -8px rgba(${glow},0.5)` }} onClick={() => { const first = course.modules[0]?.lessons[0]; if (first) setActiveLesson(first); }}>
                    Sākt kursu <ArrowRight />
                  </button>
                  <a href="#programma" className="btn-ghost">Skatīt programmu</a>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#0E9E88", padding: "6px 12px", borderRadius: 999, background: "rgba(0,191,165,0.08)", border: "1px solid rgba(0,191,165,0.22)" }}>
                    {course.earn}
                  </span>
                </div>
              </Reveal>
            </div>

            {/* Cover visual */}
            <Reveal delay={0.18} y={20}>
              <CourseCover course={course} accent={accent} accent2={accent2} glow={glow} gradient={gradient} totalLessons={totalLessons} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════ 2 · WHAT YOU WILL LEARN ════ */}
      <section style={{ padding: `${sectionPad} 0`, background: "var(--bg-1)", borderTop: "1px solid var(--line)" }}>
        <div className="lp-container" style={{ maxWidth: 1180, margin: "0 auto", padding: "0 28px" }}>
          <SectionHead eyebrow="Ko tu apgūsi" title={<>Prasmes, par kurām <span className="v2-grad">maksā</span></>} />
          <div className="ce-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 48 }}>
            {course.learn.map((item, i) => (
              <Reveal key={i} delay={0.04 * (i % 2)}>
                <div className="lp-card-sm" style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "20px 22px", borderRadius: 18, background: "var(--bg-1)", border: "1px solid var(--line)", height: "100%" }}>
                  <span style={{ width: 28, height: 28, borderRadius: 9, flexShrink: 0, background: `rgba(${glow},0.12)`, border: `1px solid rgba(${glow},0.28)`, color: accent, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                    <Check c={accent} s={14} />
                  </span>
                  <span style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.55, fontWeight: 500 }}>{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════ 3 · ROADMAP ════ */}
      <section style={{ padding: `${sectionPad} 0` }}>
        <div className="lp-container" style={{ maxWidth: 1180, margin: "0 auto", padding: "0 28px" }}>
          <SectionHead eyebrow="Tavs ceļš" title={<>No nulles līdz <span className="v2-grad">pirmajiem klientiem</span></>} />
          <div className="ce-roadmap" style={{ display: "grid", gridTemplateColumns: `repeat(${course.modules.length}, 1fr)`, gap: 14, marginTop: 48 }}>
            {course.modules.map((mod, i) => (
              <Reveal key={mod.id} delay={0.06 * i} style={{ height: "100%" }}>
                <div style={{ position: "relative", height: "100%", padding: "26px 22px", borderRadius: 20, background: "var(--bg-1)", border: "1px solid var(--line)", boxShadow: "var(--shadow-sm)" }}>
                  <div style={{ width: 38, height: 38, borderRadius: 12, background: gradient, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 16, marginBottom: 16, boxShadow: `0 8px 20px -8px rgba(${glow},0.6)` }}>{i + 1}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)", lineHeight: 1.3, marginBottom: 8, letterSpacing: "-0.01em" }}>{mod.title}</div>
                  <div style={{ fontSize: 12.5, color: "var(--ink-3)" }}>{mod.lessons.length} nodarbības · {mod.duration}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════ 4+5 · MODULES & LESSONS ════ */}
      <section id="programma" style={{ padding: `${sectionPad} 0`, background: "var(--bg-1)", borderTop: "1px solid var(--line)" }}>
        <div className="lp-container" style={{ maxWidth: 1180, margin: "0 auto", padding: "0 28px" }}>
          <SectionHead eyebrow="Programma" title={<>{course.totalModules} moduļi · <span className="v2-grad">{totalLessons} nodarbības</span></>} />
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 48 }}>
            {course.modules.map((mod, i) => {
              const open = openModules.includes(mod.id);
              const extra = moduleExtras?.[mod.id];
              return (
                <div key={mod.id}>
                <Reveal delay={0.03 * i}>
                  <div style={{ borderRadius: 22, background: "var(--bg-1)", border: `1px solid ${open ? `rgba(${glow},0.4)` : "var(--line)"}`, boxShadow: open ? `0 24px 60px -34px rgba(${glow},0.45)` : "var(--shadow-md)", overflow: "hidden", transition: "border-color 0.25s ease, box-shadow 0.25s ease" }}>
                    <button type="button" onClick={() => toggle(mod.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 18, padding: "24px 26px", textAlign: "left", background: "transparent", cursor: "pointer" }}>
                      <span style={{ width: 46, height: 46, borderRadius: 14, flexShrink: 0, background: open ? gradient : `rgba(${glow},0.10)`, border: open ? "none" : `1px solid rgba(${glow},0.25)`, color: open ? "#fff" : accent, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 17 }}>{mod.id}</span>
                      <span style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ display: "block", fontSize: 18, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.015em", marginBottom: 4 }}>{mod.title}</span>
                        <span style={{ display: "block", fontSize: 13, color: "var(--ink-3)" }}>{mod.lessons.length} nodarbības · {mod.duration}</span>
                      </span>
                      <span style={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 14 }}>
                        <span style={{ width: 90, height: 5, borderRadius: 5, background: "var(--bg-2)", overflow: "hidden", display: "none" }} className="ce-modprog">
                          <span style={{ display: "block", width: "0%", height: "100%", background: gradient }} />
                        </span>
                        <span style={{ width: 34, height: 34, borderRadius: 10, background: "var(--bg-2)", border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink-3)" }}><Chevron open={open} /></span>
                      </span>
                    </button>

                    {open && (
                      <div style={{ padding: "0 26px 26px" }}>
                        <div className="ce-lessons" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                          {mod.lessons.map((lesson) => {
                            const locked = !lesson.free;
                            return (
                              <button
                                type="button"
                                key={lesson.id}
                                onClick={() => setActiveLesson(lesson)}
                                className="lp-card-sm"
                                style={{ textAlign: "left", display: "flex", flexDirection: "column", borderRadius: 16, overflow: "hidden", background: "var(--bg)", border: "1px solid var(--line)", cursor: "pointer" }}
                              >
                                {/* thumbnail */}
                                <div style={{ position: "relative", aspectRatio: "16/8", background: `linear-gradient(135deg, rgba(${glow},0.18), rgba(0,191,165,0.10))`, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                                  <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(${glow},0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(${glow},0.10) 1px, transparent 1px)`, backgroundSize: "26px 26px" }} />
                                  <span style={{ width: 46, height: 46, borderRadius: "50%", background: "rgba(255,255,255,0.9)", color: accent, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 8px 20px -6px rgba(${glow},0.5)`, position: "relative" }}>
                                    {typeIcon(lesson.type, 18)}
                                  </span>
                                  <span style={{ position: "absolute", bottom: 8, right: 8, fontSize: 10.5, fontWeight: 600, padding: "2px 8px", borderRadius: 6, background: "rgba(17,17,17,0.6)", color: "#fff", backdropFilter: "blur(4px)" }}>{lesson.duration}</span>
                                  {lesson.free ? (
                                    <span style={{ position: "absolute", top: 8, left: 8, fontSize: 9.5, fontWeight: 800, letterSpacing: "0.05em", textTransform: "uppercase", padding: "3px 8px", borderRadius: 6, background: gradient, color: "#fff" }}>Bezmaksas</span>
                                  ) : (
                                    <span style={{ position: "absolute", top: 8, left: 8, width: 22, height: 22, borderRadius: 7, background: "rgba(17,17,17,0.55)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}><Lock /></span>
                                  )}
                                </div>
                                <div style={{ padding: "14px 16px 16px" }}>
                                  <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", lineHeight: 1.35, marginBottom: 8 }}>{lesson.title}</div>
                                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <span style={{ fontSize: 11, fontWeight: 600, color: lessonTypeColor[lesson.type], display: "inline-flex", alignItems: "center", gap: 4 }}>{typeIcon(lesson.type, 12)} {lessonTypeLabel[lesson.type]}</span>
                                    <span style={{ marginLeft: "auto", fontSize: 12, fontWeight: 600, color: locked ? "var(--ink-4)" : accent, display: "inline-flex", alignItems: "center", gap: 4 }}>
                                      {locked ? "Atvērt" : "Skatīt"} <ArrowRight s={13} />
                                    </span>
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                </Reveal>
                {extra && <div style={{ marginTop: 16 }}>{extra}</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════ 7 · RESOURCES (dark) ════ */}
      <section style={{ padding: `${sectionPad} 0`, background: "#0A0A0E", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", background: `radial-gradient(40% 50% at 85% 0%, rgba(${glow},0.18), transparent 64%), radial-gradient(38% 50% at 6% 100%, rgba(0,191,165,0.12), transparent 62%)` }} />
        <div className="lp-container" style={{ maxWidth: 1180, margin: "0 auto", padding: "0 28px", position: "relative" }}>
          <SectionHead dark eyebrow="Resursi" title={<>Viss, kas <span className="v2-grad">paātrina darbu</span></>} />
          <div className="ce-grid-4" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginTop: 48 }}>
            {resources.map((r, i) => (
              <Reveal key={r.title} delay={0.04 * i}>
                <div className="v2-glass" style={{ padding: "24px 22px", borderRadius: 20, height: "100%" }}>
                  <span style={{ width: 42, height: 42, borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(150deg, rgba(${glow},0.24), rgba(${glow},0.07))`, border: `1px solid rgba(${glow},0.35)`, color: "#fff", marginBottom: 16 }}>{r.icon}</span>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{r.title}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.55 }}>{r.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════ 8 · REAL BUSINESS EXAMPLES ════ */}
      <section style={{ padding: `${sectionPad} 0` }}>
        <div className="lp-container" style={{ maxWidth: 1180, margin: "0 auto", padding: "0 28px" }}>
          <SectionHead eyebrow="Reāli piemēri" title={<>Cik vari <span className="v2-grad">nopelnīt</span></>} />
          <div className="ce-grid-4" style={{ display: "grid", gridTemplateColumns: `repeat(${ladder.length}, 1fr)`, gap: 14, marginTop: 48 }}>
            {ladder.map((step, i) => {
              const top = i === ladder.length - 1;
              return (
                <Reveal key={i} delay={0.05 * i}>
                  <div style={{ position: "relative", height: "100%", padding: "26px 22px", borderRadius: 20, background: top ? gradient : "var(--bg-1)", border: top ? "none" : "1px solid var(--line)", boxShadow: top ? `0 24px 60px -28px rgba(${glow},0.5)` : "var(--shadow-sm)", color: top ? "#fff" : "var(--ink)" }}>
                    <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: top ? "rgba(255,255,255,0.8)" : "var(--ink-3)", marginBottom: 10 }}>{step.clients}</div>
                    <div className="metric" style={{ fontSize: 28, color: top ? "#fff" : accent, marginBottom: 6 }}>{step.price}</div>
                    {step.note && <div style={{ fontSize: 12.5, color: top ? "rgba(255,255,255,0.85)" : "var(--ink-3)" }}>{step.note}</div>}
                  </div>
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={0.1}>
            <p style={{ marginTop: 22, fontSize: 14, color: "var(--ink-3)", lineHeight: 1.7, maxWidth: 620 }}>
              Lielākajai daļai studentu pirmais klients nāk <strong style={{ color: "var(--ink)" }}>3 nedēļu laikā</strong>. Ar 3–4 klientiem un paceltām cenām reāli sasniedzams <strong style={{ color: accent }}>{course.earn}</strong>.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ════ 9 · COMMUNITY ════ */}
      <section style={{ padding: `${sectionPad} 0`, background: "var(--bg-1)", borderTop: "1px solid var(--line)" }}>
        <div className="lp-container" style={{ maxWidth: 1180, margin: "0 auto", padding: "0 28px" }}>
          <SectionHead eyebrow="Kopiena" title={<>Tu <span className="v2-grad">neesi viens</span></>} />
          <div className="ce-grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 48 }}>
            {community.map((c, i) => (
              <Reveal key={c.title} delay={0.05 * (i % 2)}>
                <div className="lp-card-sm" style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: "24px", borderRadius: 18, background: "var(--bg-1)", border: "1px solid var(--line)", height: "100%" }}>
                  <span style={{ width: 44, height: 44, borderRadius: 13, flexShrink: 0, background: `rgba(${glow},0.10)`, border: `1px solid rgba(${glow},0.25)`, color: accent, display: "flex", alignItems: "center", justifyContent: "center" }}><Check c={accent} s={18} /></span>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)", marginBottom: 6 }}>{c.title}</div>
                    <div style={{ fontSize: 14, color: "var(--ink-3)", lineHeight: 1.6 }}>{c.desc}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════ 10 · FINAL CTA (dark premium) ════ */}
      <section style={{ padding: `${sectionPad} 0`, background: "#0A0A0E", position: "relative", overflow: "hidden" }}>
        <div aria-hidden className="v2-mesh-blob v2-mesh-1" style={{ width: 600, height: 600, top: -200, left: "50%", transform: "translateX(-50%)", background: `radial-gradient(circle, rgba(${glow},0.22), transparent 70%)` }} />
        <div className="lp-container" style={{ maxWidth: 760, margin: "0 auto", padding: "0 28px", position: "relative", textAlign: "center" }}>
          <Reveal><span className="v2-eyebrow v2-eyebrow--light" style={{ justifyContent: "center" }}>Sāc šodien</span></Reveal>
          <Reveal delay={0.08}>
            <h2 className="v2-h2" style={{ fontSize: "clamp(34px, 5vw, 60px)", color: "#fff", margin: "18px 0 0" }}>
              Gatavs nopelnīt <span className="v2-grad">{course.earn}</span>?
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: "20px auto 0", maxWidth: 480 }}>
              Pievienojies {course.students}+ studentiem. Pirmās nodarbības ir bez maksas.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginTop: 34 }}>
              <button type="button" className="btn-primary" style={{ background: gradient, boxShadow: `0 14px 40px -10px rgba(${glow},0.6)` }} onClick={() => { const first = course.modules[0]?.lessons[0]; if (first) setActiveLesson(first); }}>
                Sākt bez maksas <ArrowRight />
              </button>
              <Link href="/" className="btn-ghost" style={{ background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.14)", color: "#fff" }}>Atpakaļ uz sākumu</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        @media (max-width: 980px) {
          .ce-hero-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .ce-roadmap { grid-template-columns: repeat(2, 1fr) !important; }
          .ce-tools, .ce-grid-4 { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 680px) {
          .ce-grid-2, .ce-lessons, .ce-tools, .ce-grid-4, .ce-roadmap { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

/* ── Reusable section heading (homepage editorial style) ── */
function SectionHead({ eyebrow, title, dark }: { eyebrow: string; title: ReactNode; dark?: boolean }) {
  return (
    <div style={{ maxWidth: 640 }}>
      <Reveal><span className={`v2-eyebrow${dark ? " v2-eyebrow--light" : ""}`}>{eyebrow}</span></Reveal>
      <Reveal delay={0.08}>
        <h2 className="v2-h2" style={{ fontSize: "clamp(30px, 4.4vw, 52px)", color: dark ? "#fff" : "var(--ink)", margin: "16px 0 0" }}>{title}</h2>
      </Reveal>
    </div>
  );
}

/* ── Hero course cover visual ── */
function CourseCover({ course, accent, accent2, glow, gradient, totalLessons }: { course: DetailMarketingCourse; accent: string; accent2: string; glow: string; gradient: string; totalLessons: number }) {
  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "relative", borderRadius: 26, overflow: "hidden", border: "1px solid var(--line)", background: "var(--bg-1)", boxShadow: "var(--shadow-lg)" }}>
        <div style={{ position: "relative", aspectRatio: "4/3", background: gradient, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          <div aria-hidden style={{ position: "absolute", top: -60, right: -60, width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,255,255,0.25), transparent 70%)" }} />
          <span style={{ width: 84, height: 84, borderRadius: "50%", background: "rgba(255,255,255,0.92)", color: accent, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 16px 40px -10px rgba(0,0,0,0.3)", position: "relative" }}>
            <Play s={32} />
          </span>
          <div style={{ position: "absolute", left: 20, bottom: 18, color: "#fff" }}>
            <div style={{ fontSize: 12, fontWeight: 600, opacity: 0.85, letterSpacing: "0.04em", textTransform: "uppercase" }}>{course.totalModules} moduļi · {totalLessons} nodarbības</div>
            <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em", marginTop: 2 }}>{course.title}</div>
          </div>
        </div>
      </div>

      {/* Floating chips */}
      <div className="v2-float-a" style={{ position: "absolute", top: 18, right: -14, padding: "10px 14px", borderRadius: 14, background: "var(--bg-1)", border: "1px solid var(--line)", boxShadow: "var(--shadow-md)", display: "flex", alignItems: "center", gap: 8 }}>
        <Star /><span style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>{course.rating}</span>
        <span style={{ fontSize: 12, color: "var(--ink-3)" }}>vērtējums</span>
      </div>
      <div className="v2-float-b" style={{ position: "absolute", bottom: -16, left: -14, padding: "12px 16px", borderRadius: 14, background: "var(--bg-1)", border: "1px solid var(--line)", boxShadow: "var(--shadow-md)" }}>
        <div style={{ fontSize: 11, color: "var(--ink-3)", marginBottom: 2 }}>Potenciāls</div>
        <div className="metric" style={{ fontSize: 18, color: accent }}>{course.earn}</div>
      </div>
    </div>
  );
}
