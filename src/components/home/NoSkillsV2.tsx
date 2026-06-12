"use client";

import { Reveal } from "@/components/home/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { Check, Play, Pause, Captions } from "lucide-react";

const checks = [
  "Nav nepieciešama programmēšana",
  "Soli pa solim sistēma",
  "Praktiski piemēri un veidnes",
  "Viss latviešu valodā",
];

/** Crafted lesson-player mockup — replaces a generic stock photo. */
function LessonMock() {
  return (
    <div className="v2-float-a" style={{
      borderRadius: 24, overflow: "hidden", background: "#fff",
      border: "1px solid var(--line-2)",
      boxShadow: "0 48px 110px -32px rgba(45,35,95,0.30), 0 16px 40px -16px rgba(17,17,17,0.14)",
    }}>
      {/* Video area */}
      <div style={{ position: "relative", aspectRatio: "16/9", background: "linear-gradient(135deg, #1A1730 0%, #0D0D14 60%, #11221F 100%)" }}>
        {/* faux UI inside the video — slide with LV title */}
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14 }}>
          <span style={{
            fontFamily: "JetBrains Mono, monospace", fontSize: 10, fontWeight: 600, letterSpacing: "0.14em",
            textTransform: "uppercase", color: "rgba(255,255,255,0.45)",
            border: "1px solid rgba(255,255,255,0.15)", borderRadius: 999, padding: "5px 13px",
          }}>
            2. nodarbība
          </span>
          <div style={{ fontSize: "clamp(17px, 2.4vw, 24px)", fontWeight: 850, fontFamily: "Inter Tight, sans-serif", letterSpacing: "-0.03em", color: "#fff", textAlign: "center", padding: "0 24px" }}>
            Tavs pirmais AI projekts<br />
            <span className="v2-grad">soli pa solim</span>
          </div>
          <span style={{
            width: 58, height: 58, borderRadius: 999, marginTop: 6,
            background: "linear-gradient(135deg, var(--accent), #8B7BFF)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 16px 40px -10px rgba(109,94,243,0.7), inset 0 1px 0 rgba(255,255,255,0.3)",
          }}>
            <Play size={20} fill="#fff" color="#fff" strokeWidth={0} style={{ marginLeft: 3 }} />
          </span>
        </div>
        {/* progress bar */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "0 16px 12px" }}>
          <div style={{ height: 4, borderRadius: 999, background: "rgba(255,255,255,0.18)", position: "relative", marginBottom: 9 }}>
            <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: "37%", borderRadius: 999, background: "linear-gradient(90deg, var(--accent), var(--accent-2))" }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, color: "rgba(255,255,255,0.75)" }}>
            <Pause size={13} fill="currentColor" strokeWidth={0} />
            <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10 }}>04:21 / 11:48</span>
            <span style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 5, fontSize: 9.5, fontWeight: 700, background: "rgba(255,255,255,0.14)", borderRadius: 5, padding: "3px 8px" }}>
              <Captions size={11} /> LV
            </span>
          </div>
        </div>
      </div>

      {/* Below video — step checklist */}
      <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: 9 }}>
        {[
          { t: "Atver rīku un izveido kontu", done: true },
          { t: "Atkārto redzamo piemēru", done: true },
          { t: "Pielāgo savam klientam", done: false },
        ].map((s, i) => (
          <div key={s.t} style={{ display: "flex", alignItems: "center", gap: 11, padding: "10px 13px", borderRadius: 11, background: s.done ? "rgba(0,191,165,0.06)" : "var(--bg)", border: `1px solid ${s.done ? "rgba(0,191,165,0.2)" : "var(--line)"}` }}>
            <span style={{ width: 21, height: 21, borderRadius: 999, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: s.done ? "var(--accent-2)" : "var(--bg-2)", color: s.done ? "#fff" : "var(--ink-4)", fontSize: 10, fontWeight: 800 }}>
              {s.done ? <Check size={11} strokeWidth={3.4} /> : i + 1}
            </span>
            <span style={{ fontSize: 12.5, fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.01em" }}>{s.t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function NoSkillsV2() {
  return (
    <section style={{ padding: "140px 0", background: "var(--bg)", borderTop: "1px solid var(--line)", overflow: "hidden" }}>
      <div className="lp-container" style={{ maxWidth: 1160, margin: "0 auto", padding: "0 28px" }}>
        <div className="noskills-v2-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 76, alignItems: "center" }}>
          {/* Copy */}
          <div>
            <Reveal><span className="v2-eyebrow">Bez priekšzināšanām</span></Reveal>
            <Reveal delay={0.08}>
              <h2 className="v2-h2" style={{ fontSize: "clamp(38px, 5.5vw, 68px)", color: "var(--ink)", margin: "18px 0 20px" }}>
                Nav jābūt <span className="v2-grad">programmētājam</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p style={{ fontSize: 18, color: "var(--ink-3)", lineHeight: 1.7, maxWidth: 440, marginBottom: 36 }}>
                Lielākā daļa studentu sāk bez tehniskām zināšanām.
              </p>
            </Reveal>

            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 40 }}>
              {checks.map((c, i) => (
                <Reveal key={c} delay={0.16 + i * 0.06}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{
                      width: 28, height: 28, borderRadius: 999, flexShrink: 0,
                      background: "linear-gradient(135deg, rgba(109,94,243,0.14), rgba(0,191,165,0.12))",
                      border: "1px solid rgba(109,94,243,0.25)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <Check size={13} strokeWidth={3} color="var(--accent)" />
                    </span>
                    <span style={{ fontSize: 16, color: "var(--ink-2)", fontWeight: 600, letterSpacing: "-0.01em" }}>{c}</span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.4}>
              <Magnetic>
                <a href="#pricing" className="btn-primary" style={{ textDecoration: "none", fontSize: 16, padding: "16px 30px", borderRadius: 14 }}>
                  Pievienoties platformai →
                </a>
              </Magnetic>
            </Reveal>
          </div>

          {/* Lesson player mockup */}
          <Reveal delay={0.15} className="noskills-v2-visual">
            <LessonMock />
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .noskills-v2-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .noskills-v2-visual { order: -1; max-width: 520px; margin: 0 auto; width: 100%; }
        }
      `}</style>
    </section>
  );
}
