"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useHasMounted } from "@/hooks/useHasMounted";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { Magnetic } from "@/components/Magnetic";
import { Check, Play, Lock, Mic, TrendingUp, Zap } from "lucide-react";

const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

const parent = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

/** Dark product dashboard — the hero's centrepiece "platform shot". */
function DashboardMock() {
  return (
    <div
      style={{
        borderRadius: 22,
        overflow: "hidden",
        background: "#0D0D14",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow:
          "0 60px 140px -40px rgba(45,35,95,0.45), 0 24px 60px -24px rgba(17,17,17,0.30), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      {/* Browser chrome */}
      <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "13px 18px", borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)" }}>
        <span style={{ width: 11, height: 11, borderRadius: 999, background: "#FF5F57" }} />
        <span style={{ width: 11, height: 11, borderRadius: 999, background: "#FEBC2E" }} />
        <span style={{ width: 11, height: 11, borderRadius: 999, background: "#28C840" }} />
        <div style={{ marginLeft: 12, display: "flex", alignItems: "center", gap: 7, fontSize: 11.5, color: "rgba(255,255,255,0.45)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "5px 14px" }}>
          <Lock size={10} strokeWidth={2.4} /> chademy.lv/dashboard
        </div>
      </div>

      {/* App body — sidebar + content */}
      <div style={{ display: "grid", gridTemplateColumns: "52px 1fr 1fr", gap: 0 }} className="hero-mock-body">
        {/* Mini sidebar */}
        <div style={{ borderRight: "1px solid rgba(255,255,255,0.06)", padding: "18px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
          <span style={{ width: 26, height: 26, borderRadius: 8, background: "linear-gradient(135deg, var(--accent), #8B7BFF)", boxShadow: "0 4px 14px -3px rgba(109,94,243,0.6)" }} />
          {[0.5, 0.28, 0.28, 0.28].map((op, i) => (
            <span key={i} style={{ width: 18, height: 18, borderRadius: 6, background: `rgba(255,255,255,${op * 0.28})`, border: i === 0 ? "1px solid rgba(255,255,255,0.25)" : "1px solid transparent" }} />
          ))}
        </div>

        {/* Left column — progress + lessons */}
        <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 11, borderRight: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ borderRadius: 13, padding: "13px 15px", background: "linear-gradient(135deg, rgba(109,94,243,0.22) 0%, rgba(109,94,243,0.05) 100%)", border: "1px solid rgba(109,94,243,0.30)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>Tavs progress</span>
              <span style={{ fontSize: 14, fontWeight: 900, color: "#A89DFF", fontFamily: "Inter Tight, sans-serif" }}>68%</span>
            </div>
            <div style={{ height: 6, borderRadius: 999, background: "rgba(255,255,255,0.10)", overflow: "hidden" }}>
              <div style={{ height: "100%", width: "68%", borderRadius: 999, background: "linear-gradient(90deg, var(--accent), var(--accent-2))" }} />
            </div>
          </div>

          {[
            { t: "AI satura pamati", done: true },
            { t: "Pirmais faceless video", done: true },
            { t: "Klientu piesaiste", done: false },
          ].map((l) => (
            <div key={l.t} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 11, background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <span style={{ width: 23, height: 23, borderRadius: 7, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: l.done ? "var(--accent-2)" : "rgba(109,94,243,0.25)", color: l.done ? "#04221D" : "#A89DFF" }}>
                {l.done ? <Check size={12} strokeWidth={3.2} /> : <Play size={10} strokeWidth={2.5} fill="currentColor" />}
              </span>
              <span style={{ flex: 1, fontSize: 11.5, fontWeight: 600, color: "rgba(255,255,255,0.85)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{l.t}</span>
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>{l.done ? "✓" : "12 min"}</span>
            </div>
          ))}
        </div>

        {/* Right column — earnings chart + stats */}
        <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 11 }} className="hero-mock-right">
          <div style={{ borderRadius: 13, padding: "13px 15px", background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.07)", flex: 1, display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>Ienākumi</span>
              <span style={{ fontSize: 10.5, color: "var(--accent-2)", fontWeight: 700, fontFamily: "JetBrains Mono, monospace" }}>+24%</span>
            </div>
            {/* Bar chart */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: 6, flex: 1, minHeight: 64 }}>
              {[28, 42, 36, 55, 48, 70, 62, 88].map((h, i) => (
                <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: 4, background: i >= 6 ? "linear-gradient(180deg, var(--accent-2), rgba(0,191,165,0.35))" : "linear-gradient(180deg, rgba(109,94,243,0.85), rgba(109,94,243,0.25))" }} />
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div style={{ borderRadius: 12, padding: "11px 13px", background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ fontSize: 17, fontWeight: 900, color: "#fff", fontFamily: "Inter Tight, sans-serif", letterSpacing: "-0.03em" }}>€840</div>
              <div style={{ fontSize: 9.5, color: "rgba(255,255,255,0.4)" }}>Šomēnes</div>
            </div>
            <div style={{ borderRadius: 12, padding: "11px 13px", background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ fontSize: 17, fontWeight: 900, color: "var(--accent-2)", fontFamily: "Inter Tight, sans-serif", letterSpacing: "-0.03em" }}>3</div>
              <div style={{ fontSize: 9.5, color: "rgba(255,255,255,0.4)" }}>Aktīvi klienti</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Floating voice-agent card with live waveform. */
function VoiceCard() {
  return (
    <div className="v2-float-a" style={{
      background: "#fff", borderRadius: 18, padding: "16px 18px",
      border: "1px solid var(--line-2)",
      boxShadow: "0 24px 60px -18px rgba(17,17,17,0.18), 0 8px 20px -8px rgba(109,94,243,0.15)",
      width: 230,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <span style={{ width: 34, height: 34, borderRadius: 11, background: "linear-gradient(135deg, var(--accent), #8B7BFF)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", boxShadow: "0 6px 16px -5px rgba(109,94,243,0.55)" }}>
          <Mic size={15} strokeWidth={2.2} />
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.01em" }}>AI balss aģents</div>
          <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: "var(--ink-3)" }}>
            <span className="v2-pulse" style={{ width: 6, height: 6, borderRadius: 999, background: "#28C840", display: "inline-block" }} />
            Aktīvs zvans · 0:42
          </div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 3, height: 26, marginBottom: 10 }}>
        {[0.5, 0.9, 0.6, 1, 0.7, 0.45, 0.85, 0.6, 0.95, 0.5, 0.75, 0.4, 0.9, 0.65, 0.5].map((s, i) => (
          <span key={i} className="v2-wave-bar" style={{ flex: 1, height: "100%", borderRadius: 2, background: "linear-gradient(180deg, var(--accent), var(--accent-2))", animationDelay: `${i * 0.08}s`, transform: `scaleY(${s})` }} />
        ))}
      </div>
      <div style={{ fontSize: 10.5, fontWeight: 700, color: "var(--teal-ink)", display: "flex", alignItems: "center", gap: 6 }}>
        <Check size={11} strokeWidth={3} /> Rezervācija apstiprināta
      </div>
    </div>
  );
}

/** Floating earnings notification card. */
function EarnCard() {
  return (
    <div className="v2-float-b" style={{
      background: "#fff", borderRadius: 18, padding: "15px 18px",
      border: "1px solid var(--line-2)",
      boxShadow: "0 24px 60px -18px rgba(17,17,17,0.18), 0 8px 20px -8px rgba(0,191,165,0.18)",
      display: "flex", alignItems: "center", gap: 12, width: 225,
    }}>
      <span style={{ width: 38, height: 38, borderRadius: 12, flexShrink: 0, background: "linear-gradient(135deg, var(--accent-2), #34D9C3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", boxShadow: "0 6px 16px -5px rgba(0,191,165,0.5)" }}>
        <TrendingUp size={16} strokeWidth={2.4} />
      </span>
      <div>
        <div style={{ fontSize: 16, fontWeight: 900, color: "var(--ink)", fontFamily: "Inter Tight, sans-serif", letterSpacing: "-0.03em", lineHeight: 1.1 }}>+€400</div>
        <div style={{ fontSize: 10.5, color: "var(--ink-3)", fontWeight: 500 }}>Jauns klients · Mājaslapa</div>
      </div>
    </div>
  );
}

/** Tiny AI workflow chip. */
function FlowChip() {
  return (
    <div className="v2-float-a" style={{
      background: "#0D0D14", borderRadius: 14, padding: "11px 16px",
      border: "1px solid rgba(255,255,255,0.14)",
      boxShadow: "0 18px 44px -14px rgba(13,13,20,0.5)",
      display: "flex", alignItems: "center", gap: 9,
      fontFamily: "JetBrains Mono, monospace", fontSize: 10.5, fontWeight: 600,
      color: "rgba(255,255,255,0.85)", whiteSpace: "nowrap",
    }}>
      <Zap size={12} color="#FFB86B" fill="#FFB86B" />
      Lead <span style={{ color: "rgba(255,255,255,0.3)" }}>→</span> AI <span style={{ color: "rgba(255,255,255,0.3)" }}>→</span> CRM
      <span className="v2-pulse" style={{ width: 6, height: 6, borderRadius: 999, background: "var(--accent-2)" }} />
    </div>
  );
}

export default function HeroV2() {
  const hasMounted = useHasMounted();
  const reduceMotion = useReducedMotion();
  const skipMotion = hasMounted && reduceMotion;
  const t = useTranslations("Hero");

  return (
    <header style={{ position: "relative", overflow: "hidden", background: "var(--bg)", padding: "150px 0 0" }}>
      {/* Atmosphere */}
      <div aria-hidden className="hero-aurora" style={{
        position: "absolute", inset: "-12%", zIndex: 0, pointerEvents: "none",
        background:
          "radial-gradient(44% 42% at 18% 0%, color-mix(in oklab, var(--accent) 17%, transparent), transparent 62%)," +
          "radial-gradient(38% 40% at 88% 8%, color-mix(in oklab, var(--accent-2) 13%, transparent), transparent 60%)," +
          "radial-gradient(46% 50% at 55% 105%, color-mix(in oklab, var(--accent-3) 11%, transparent), transparent 64%)",
      }} />
      <div aria-hidden className="dot-grid" style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.38,
        maskImage: "radial-gradient(75% 55% at 50% 18%, #000 0%, transparent 78%)",
        WebkitMaskImage: "radial-gradient(75% 55% at 50% 18%, #000 0%, transparent 78%)",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px", position: "relative", zIndex: 1, textAlign: "center" }}>
        <motion.div initial={skipMotion ? false : "hidden"} animate="visible" variants={parent}>
          {/* Badge */}
          <motion.div variants={item}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 9,
              padding: "7px 16px 7px 7px",
              background: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)",
              border: "1px solid color-mix(in oklab, var(--accent) 24%, transparent)",
              borderRadius: 999, fontSize: 12.5, color: "var(--ink-2)", fontWeight: 600,
              boxShadow: "0 4px 18px -6px rgba(109,94,243,0.25)",
              marginBottom: 30,
            }}>
              <span style={{
                background: "linear-gradient(135deg, var(--accent), #8B7BFF)", color: "#fff",
                padding: "3px 10px", borderRadius: 999,
                fontFamily: "Inter Tight, sans-serif", fontSize: 10, fontWeight: 800, letterSpacing: "0.1em",
              }}>
                {t("badgeRegion")}
              </span>
              {t("badgeLine")}
            </span>
          </motion.div>

          {/* H1 — massive */}
          <motion.h1 variants={item} className="v2-h2" style={{
            fontSize: "clamp(46px, 8.5vw, 104px)",
            margin: "0 auto 26px",
            maxWidth: "15ch",
            color: "var(--ink)",
            fontWeight: 850,
          }}>
            {t("h1Line1")}
            <span className="v2-grad">{t("h1Gradient")}</span>
            {t("h1Line2")}
          </motion.h1>

          {/* Sub */}
          <motion.p variants={item} style={{ fontSize: "clamp(16px, 2.2vw, 19px)", lineHeight: 1.65, color: "var(--ink-3)", maxWidth: 520, margin: "0 auto 38px" }}>
            {t("sub")}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Magnetic>
              <a href="#pricing" className="btn-primary" style={{ textDecoration: "none", fontSize: 16.5, padding: "17px 34px", borderRadius: 15 }}>
                {t("ctaPrimary")}
              </a>
            </Magnetic>
            <Magnetic>
              <a href="#courses" className="btn-ghost" style={{ textDecoration: "none", fontSize: 16.5, padding: "17px 28px", borderRadius: 15 }}>
                {t("ctaSecondary")}
              </a>
            </Magnetic>
          </motion.div>

          {/* Product composition — dashboard + floating cards */}
          <motion.div
            variants={item}
            style={{ position: "relative", maxWidth: 880, margin: "72px auto 0" }}
          >
            <DashboardMock />

            {/* Floating cards — desktop only */}
            <div className="hero-float-cards">
              <div style={{ position: "absolute", left: -76, top: 64 }}><VoiceCard /></div>
              <div style={{ position: "absolute", right: -64, bottom: 44 }}><EarnCard /></div>
              <div style={{ position: "absolute", right: -28, top: -24 }}><FlowChip /></div>
            </div>

            {/* Glow under the mock */}
            <div aria-hidden style={{
              position: "absolute", left: "8%", right: "8%", bottom: -36, height: 80, zIndex: -1,
              background: "radial-gradient(50% 100% at 50% 0%, color-mix(in oklab, var(--accent) 28%, transparent), transparent 75%)",
              filter: "blur(22px)",
            }} />
          </motion.div>

          {/* Stats strip */}
          <motion.div variants={item} className="hero-v2-stats" style={{
            maxWidth: 880, margin: "64px auto 0",
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
            borderTop: "1px solid var(--line)",
          }}>
            {[
              { val: t("stat3Val") + "+", label: t("stat3Label"), accent: true },
              { val: "3", label: t("stat1Label") },
              { val: "100%", label: t("stat2Label") },
              { val: t("stat4Val"), label: t("stat4Label") },
            ].map((s, i) => (
              <div key={i} style={{ padding: "26px 12px 0", borderRight: i < 3 ? "1px solid var(--line)" : "none" }} className="hero-v2-stat">
                <AnimatedNumber
                  value={s.val}
                  style={{ display: "block", fontSize: "clamp(28px, 3.5vw, 38px)", fontWeight: 850, letterSpacing: "-0.045em", lineHeight: 1, fontFamily: "Inter Tight, sans-serif", color: s.accent ? "var(--accent)" : "var(--ink)" }}
                />
                <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 9, lineHeight: 1.4 }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div style={{ height: 96 }} />

      <style>{`
        @media (max-width: 1080px) {
          .hero-float-cards { display: none; }
        }
        @media (max-width: 760px) {
          .hero-mock-body { grid-template-columns: 44px 1fr !important; }
          .hero-mock-right { display: none !important; }
          .hero-v2-stats { grid-template-columns: repeat(2, 1fr) !important; }
          .hero-v2-stat { border-right: none !important; padding: 22px 8px 0 !important; }
          .hero-v2-stat:nth-child(odd) { border-right: 1px solid var(--line) !important; }
        }
      `}</style>
    </header>
  );
}
