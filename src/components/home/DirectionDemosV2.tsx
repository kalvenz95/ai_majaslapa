"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { Reveal } from "@/components/home/Reveal";
import { useHasMounted } from "@/hooks/useHasMounted";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import {
  Lock,
  Check,
  Mic,
  Phone,
  Zap,
  Mail,
  Database,
  FileText,
  ArrowDown,
} from "lucide-react";

const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;
const VP = { once: true, margin: "-60px" } as const;

/* Per-demo visual identity — teal (websites) / gold (voice agent). */
const TEAL = { hex: "#00BFA5", soft: "#34D9C3", glow: "0,191,165", body: "#0C1311" };
const GOLD = { hex: "#E3B95B", soft: "#F5C56B", glow: "227,185,91", body: "#100C05" };

/* ── Shared browser-window shell ───────────────────────────────────── */
function BrowserFrame({
  url,
  glow,
  body,
  reduce,
  children,
}: {
  url: string;
  glow: string;
  body: string;
  reduce: boolean;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        position: "relative",
        borderRadius: 20,
        overflow: "hidden",
        background: body,
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow: `0 50px 120px -40px rgba(${glow},0.35), 0 22px 50px -24px rgba(8,8,12,0.55), inset 0 1px 0 rgba(255,255,255,0.07)`,
      }}
    >
      {/* Chrome */}
      <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)" }}>
        <span style={{ width: 10, height: 10, borderRadius: 999, background: "#FF5F57" }} />
        <span style={{ width: 10, height: 10, borderRadius: 999, background: "#FEBC2E" }} />
        <span style={{ width: 10, height: 10, borderRadius: 999, background: "#28C840" }} />
        <div style={{ marginLeft: 10, display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "rgba(255,255,255,0.45)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "5px 13px" }}>
          <Lock size={10} strokeWidth={2.4} /> {url}
        </div>
      </div>

      {children}

      {/* Reveal sheen */}
      {!reduce && (
        <motion.div
          aria-hidden
          initial={{ x: "-130%" }}
          whileInView={{ x: "175%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], delay: 0.5 }}
          style={{
            position: "absolute", top: 0, bottom: 0, left: 0, width: "55%", pointerEvents: "none",
            background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.09) 48%, rgba(255,255,255,0.16) 52%, transparent 70%)",
          }}
        />
      )}
    </div>
  );
}

/* ── Demo A — Websites & automation ────────────────────────────────── */
const SITE_BARS = [38, 52, 44, 66, 58, 80, 72, 95];

function SiteAutomationMock({ reduce }: { reduce: boolean }) {
  const t = TEAL;
  const nodes = [
    { icon: <FileText size={13} strokeWidth={2.4} />, label: "Lead forma", sub: "Klients aizpilda", done: true },
    { icon: <Zap size={13} strokeWidth={2.4} />, label: "AI atbild", sub: "Personīga ziņa", done: true },
    { icon: <Database size={13} strokeWidth={2.4} />, label: "CRM ieraksts", sub: "Saglabāts", done: true },
    { icon: <Mail size={13} strokeWidth={2.4} />, label: "E-pasts", sub: "Nosūtīts < 1 min", done: false },
  ];
  return (
    <BrowserFrame url="ai-klients.lv" glow={t.glow} body={t.body} reduce={reduce}>
      <div className="dd-body" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
        {/* Left — live website preview */}
        <div style={{ padding: 16, borderRight: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: 11 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", fontFamily: "JetBrains Mono, monospace" }}>
            Tava izveidotā lapa
          </div>
          <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.03)" }}>
            {/* mini site navbar */}
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 11px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <span style={{ width: 16, height: 16, borderRadius: 5, background: `linear-gradient(135deg, ${t.hex}, ${t.soft})` }} />
              {[18, 18, 18].map((w, i) => (
                <span key={i} style={{ width: w, height: 4, borderRadius: 3, background: "rgba(255,255,255,0.18)" }} />
              ))}
              <span style={{ marginLeft: "auto", padding: "4px 9px", borderRadius: 6, background: `rgba(${t.glow},0.22)`, border: `1px solid rgba(${t.glow},0.4)`, fontSize: 8, fontWeight: 700, color: t.soft }}>Pieteikties</span>
            </div>
            {/* mini hero */}
            <div style={{ padding: "14px 12px 16px", display: "flex", flexDirection: "column", gap: 7 }}>
              <span style={{ width: "82%", height: 8, borderRadius: 4, background: "rgba(255,255,255,0.85)" }} />
              <span style={{ width: "60%", height: 8, borderRadius: 4, background: "rgba(255,255,255,0.55)" }} />
              <span style={{ width: "92%", height: 4, borderRadius: 3, background: "rgba(255,255,255,0.2)", marginTop: 3 }} />
              <span style={{ width: "70%", height: 4, borderRadius: 3, background: "rgba(255,255,255,0.2)" }} />
              <motion.span
                initial={reduce ? false : { opacity: 0, y: 8 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.5 }}
                style={{ marginTop: 8, alignSelf: "flex-start", padding: "7px 14px", borderRadius: 8, background: `linear-gradient(135deg, ${t.hex}, ${t.soft})`, fontSize: 9, fontWeight: 800, color: "#04221D", boxShadow: `0 6px 16px -5px rgba(${t.glow},0.6)` }}
              >
                Sazināties →
              </motion.span>
            </div>
          </div>

          {/* conversion stat */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            <div style={{ borderRadius: 11, padding: "10px 12px", background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <span style={{ display: "block", fontSize: 16, fontWeight: 700, color: t.soft, fontFamily: "var(--font-sans)", letterSpacing: "-0.03em" }}>4.8%</span>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>Konversija</div>
            </div>
            <div style={{ borderRadius: 11, padding: "10px 12px", background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <AnimatedNumber value="38" style={{ display: "block", fontSize: 16, fontWeight: 700, color: "#fff", fontFamily: "var(--font-sans)", letterSpacing: "-0.03em" }} />
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>Leadi šonedēļ</div>
            </div>
          </div>
        </div>

        {/* Right — automation pipeline */}
        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 9 }} className="dd-right">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", fontFamily: "JetBrains Mono, monospace" }}>Automatizācija</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 9.5, fontWeight: 600, color: t.soft }}>
              <span className="v2-pulse" style={{ width: 6, height: 6, borderRadius: 999, background: t.hex, display: "inline-block" }} /> Aktīva
            </span>
          </div>

          {nodes.map((n, i) => (
            <div key={n.label}>
              <motion.div
                initial={reduce ? false : { opacity: 0, x: 12 }}
                whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
                viewport={VP}
                transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.4 + i * 0.13 }}
                style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 11px", borderRadius: 11, background: "rgba(255,255,255,0.035)", border: `1px solid ${n.done ? `rgba(${t.glow},0.28)` : "rgba(255,255,255,0.07)"}` }}
              >
                <span style={{ width: 24, height: 24, borderRadius: 7, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: n.done ? `rgba(${t.glow},0.2)` : "rgba(255,255,255,0.06)", color: n.done ? t.soft : "rgba(255,255,255,0.45)" }}>
                  {n.icon}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11.5, fontWeight: 600, color: "rgba(255,255,255,0.88)" }}>{n.label}</div>
                  <div style={{ fontSize: 9.5, color: "rgba(255,255,255,0.4)" }}>{n.sub}</div>
                </div>
                {n.done && (
                  <span style={{ width: 17, height: 17, borderRadius: 999, flexShrink: 0, background: t.hex, color: "#04221D", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Check size={10} strokeWidth={3.2} />
                  </span>
                )}
              </motion.div>
              {i < nodes.length - 1 && (
                <div style={{ display: "flex", justifyContent: "center", color: `rgba(${t.glow},0.5)`, height: 14, alignItems: "center" }}>
                  <ArrowDown size={12} strokeWidth={2.5} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </BrowserFrame>
  );
}

/* ── Demo B — AI voice agent ───────────────────────────────────────── */
const WAVE = [0.5, 0.85, 0.6, 1, 0.7, 0.4, 0.9, 0.55, 0.95, 0.5, 0.75, 0.45, 0.88, 0.6, 0.5, 0.8, 0.42, 0.7];

function VoiceAgentMock({ reduce }: { reduce: boolean }) {
  const g = GOLD;
  const transcript = [
    { who: "Klients", text: "Sveiki, gribu rezervēt galdiņu sestdienai.", them: true },
    { who: "AI aģents", text: "Protams! Cikiem un cik personām?", them: false },
  ];
  const log = [
    { num: "+371 2•• ••• 41", out: "Rezervācija", dur: "1:12", ok: true },
    { num: "+371 2•• ••• 08", out: "Pieteikums", dur: "0:47", ok: true },
  ];
  return (
    <BrowserFrame url="ai-agents.lv/zvani" glow={g.glow} body={g.body} reduce={reduce}>
      <div className="dd-body" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
        {/* Left — live call */}
        <div style={{ padding: 16, borderRight: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: 11 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 34, height: 34, borderRadius: 10, flexShrink: 0, background: `linear-gradient(135deg, ${g.hex}, ${g.soft})`, display: "flex", alignItems: "center", justifyContent: "center", color: "#1A1407", boxShadow: `0 6px 16px -5px rgba(${g.glow},0.6)` }}>
              <Mic size={15} strokeWidth={2.3} />
            </span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>Aktīvs zvans</div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: "rgba(255,255,255,0.5)" }}>
                <span className="v2-pulse" style={{ width: 6, height: 6, borderRadius: 999, background: "#28C840", display: "inline-block" }} />
                Notiek · 0:42
              </div>
            </div>
          </div>

          {/* live waveform */}
          <div style={{ display: "flex", alignItems: "center", gap: 3, height: 30, padding: "0 2px" }}>
            {WAVE.map((s, i) => (
              <span key={i} className="v2-wave-bar" style={{ flex: 1, height: "100%", borderRadius: 2, background: `linear-gradient(180deg, ${g.hex}, ${g.soft})`, animationDelay: `${i * 0.07}s`, transform: `scaleY(${s})` }} />
            ))}
          </div>

          {/* transcript */}
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {transcript.map((line, i) => (
              <motion.div
                key={i}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={VP}
                transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.45 + i * 0.18 }}
                style={{ alignSelf: line.them ? "flex-start" : "flex-end", maxWidth: "92%", padding: "8px 11px", borderRadius: 11, borderTopLeftRadius: line.them ? 4 : 11, borderTopRightRadius: line.them ? 11 : 4, background: line.them ? "rgba(255,255,255,0.05)" : `rgba(${g.glow},0.16)`, border: `1px solid ${line.them ? "rgba(255,255,255,0.08)" : `rgba(${g.glow},0.3)`}` }}
              >
                <div style={{ fontSize: 9, fontWeight: 700, color: line.them ? "rgba(255,255,255,0.45)" : g.soft, marginBottom: 2, textTransform: "uppercase", letterSpacing: "0.06em" }}>{line.who}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.85)", lineHeight: 1.4 }}>{line.text}</div>
              </motion.div>
            ))}
          </div>

          <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 7, fontSize: 11, fontWeight: 700, color: g.soft }}>
            <span style={{ width: 17, height: 17, borderRadius: 999, background: g.hex, color: "#1A1407", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Check size={10} strokeWidth={3.2} />
            </span>
            Rezervācija apstiprināta
          </div>
        </div>

        {/* Right — call log + stats */}
        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 9 }} className="dd-right">
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", fontFamily: "JetBrains Mono, monospace" }}>
            Šodienas zvani
          </div>
          {log.map((row, i) => (
            <motion.div
              key={i}
              initial={reduce ? false : { opacity: 0, x: 12 }}
              whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
              viewport={VP}
              transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.4 + i * 0.14 }}
              style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 11px", borderRadius: 11, background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <span style={{ width: 24, height: 24, borderRadius: 7, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: `rgba(${g.glow},0.18)`, color: g.soft }}>
                <Phone size={12} strokeWidth={2.3} />
              </span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.85)", fontFamily: "JetBrains Mono, monospace", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{row.num}</div>
                <div style={{ fontSize: 9.5, color: g.soft, fontWeight: 600 }}>{row.out}</div>
              </div>
              <span style={{ fontSize: 9.5, color: "rgba(255,255,255,0.4)", fontFamily: "JetBrains Mono, monospace" }}>{row.dur}</span>
            </motion.div>
          ))}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 2 }}>
            <div style={{ borderRadius: 11, padding: "10px 12px", background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <AnimatedNumber value="1 240" style={{ display: "block", fontSize: 16, fontWeight: 700, color: "#fff", fontFamily: "var(--font-sans)", letterSpacing: "-0.03em" }} />
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>Atbildēti zvani</div>
            </div>
            <div style={{ borderRadius: 11, padding: "10px 12px", background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <span style={{ display: "block", fontSize: 16, fontWeight: 700, color: g.soft, fontFamily: "var(--font-sans)", letterSpacing: "-0.03em" }}>87%</span>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>Rezervācijas</div>
            </div>
          </div>
        </div>
      </div>
    </BrowserFrame>
  );
}

/* ── Labelled demo block ───────────────────────────────────────────── */
function DemoBlock({
  accent,
  glow,
  icon,
  title,
  tag,
  caption,
  delay,
  children,
}: {
  accent: string;
  glow: string;
  icon: ReactNode;
  title: string;
  tag: string;
  caption: string;
  delay: number;
  children: ReactNode;
}) {
  return (
    <Reveal delay={delay} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ width: 42, height: 42, borderRadius: 13, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: `rgba(${glow},0.12)`, border: `1px solid rgba(${glow},0.28)`, color: accent }}>
          {icon}
        </span>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 19, fontWeight: 700, fontFamily: "var(--font-sans)", letterSpacing: "-0.02em", color: "var(--ink)", margin: 0, lineHeight: 1.2 }}>{title}</h3>
          <span style={{ fontSize: 11, fontFamily: "JetBrains Mono, monospace", color: "var(--ink-3)", letterSpacing: "0.02em" }}>{tag}</span>
        </div>
      </div>

      {children}

      <p style={{ fontSize: 13.5, color: "var(--ink-3)", lineHeight: 1.6, margin: 0, maxWidth: "44ch" }}>
        {caption}
      </p>
    </Reveal>
  );
}

/* ── Section ───────────────────────────────────────────────────────── */
export default function DirectionDemosV2() {
  const t = useTranslations("DirectionDemos");
  const hasMounted = useHasMounted();
  const reduceMotion = useReducedMotion();
  const reduce = !!(hasMounted && reduceMotion);

  return (
    <section style={{ padding: "20px 0 140px", background: "var(--bg)" }}>
      <div className="lp-container" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px" }}>
        {/* Header */}
        <div className="dd-head" style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: 48, alignItems: "end", marginBottom: 56 }}>
          <div>
            <Reveal><span className="v2-eyebrow">{t("kicker")}</span></Reveal>
            <Reveal delay={0.08}>
              <h2 className="v2-h2" style={{ fontSize: "clamp(34px, 5vw, 62px)", color: "var(--ink)", margin: "18px 0 0", maxWidth: "16ch" }}>
                {t("titleA")}<span className="v2-grad">{t("titleB")}</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <p style={{ fontSize: 16, color: "var(--ink-3)", lineHeight: 1.7, margin: 0, paddingBottom: 8 }}>
              {t("lead")}
            </p>
          </Reveal>
        </div>

        {/* Two demos */}
        <div className="dd-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "start" }}>
          <DemoBlock
            accent={TEAL.hex}
            glow={TEAL.glow}
            icon={<Zap size={20} strokeWidth={2.2} />}
            title={t("siteTitle")}
            tag={t("siteTag")}
            caption={t("siteCaption")}
            delay={0.05}
          >
            <SiteAutomationMock reduce={reduce} />
          </DemoBlock>

          <DemoBlock
            accent={GOLD.hex}
            glow={GOLD.glow}
            icon={<Mic size={20} strokeWidth={2.2} />}
            title={t("voiceTitle")}
            tag={t("voiceTag")}
            caption={t("voiceCaption")}
            delay={0.12}
          >
            <VoiceAgentMock reduce={reduce} />
          </DemoBlock>
        </div>
      </div>

      <style>{`
        @media (max-width: 980px) {
          .dd-head { grid-template-columns: 1fr !important; gap: 16px !important; align-items: start !important; margin-bottom: 40px !important; }
          .dd-grid { grid-template-columns: 1fr !important; gap: 56px !important; max-width: 540px; margin: 0 auto; }
        }
        @media (max-width: 460px) {
          .dd-right { display: none !important; }
          .dd-body { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
