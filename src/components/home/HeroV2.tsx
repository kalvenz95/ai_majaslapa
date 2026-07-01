"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useHasMounted } from "@/hooks/useHasMounted";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { Magnetic } from "@/components/Magnetic";
import { Globe, Mic, Images } from "lucide-react";

const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

const parent = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

/** H1 words cascade in — blur-to-sharp with rising stagger. */
function StaggerTitle({
  parts,
  skipMotion,
}: {
  parts: { text: string; grad?: boolean }[];
  skipMotion: boolean;
}) {
  const words: { w: string; grad: boolean }[] = [];
  parts.forEach((p) =>
    p.text.split(/\s+/).filter(Boolean).forEach((w) => words.push({ w, grad: !!p.grad })),
  );
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={`${word.w}-${i}`}
          initial={skipMotion ? false : { opacity: 0, y: 34, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.65, ease: EASE_OUT, delay: 0.12 + i * 0.07 }}
          className={word.grad ? "v2-grad" : undefined}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {word.w}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </>
  );
}

/* What you learn — the three service directions, made explicit up front. */
const DIRECTIONS = [
  { icon: Images, label: "AI saturs", sub: "Video, attēli, soc. tīkli" },
  { icon: Globe, label: "Mājaslapas & automatizācija", sub: "Lapas + lead apstrāde" },
  { icon: Mic, label: "AI balss aģenti", sub: "Zvani un rezervācijas" },
];

const BULLETS = ["Latviešu valodā", "Bez programmēšanas", "Bez pieredzes", "Gatavas veidnes"];

export default function HeroV2() {
  const hasMounted = useHasMounted();
  const reduceMotion = useReducedMotion();
  const skipMotion = hasMounted && reduceMotion;
  const t = useTranslations("Hero");

  return (
    <header style={{ position: "relative", overflow: "hidden", background: "#0A0A0E", padding: "150px 0 110px", textAlign: "center" }}>
      {/* AI imagery — subtle starfield texture */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.5 }}>
        <Image src="/ai/cta-bg.jpg" alt="" fill priority sizes="100vw" style={{ objectFit: "cover", objectPosition: "center top" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(78% 70% at 50% 30%, rgba(10,10,14,0.5), #0A0A0E 86%)" }} />
      </div>

      {/* Atmosphere */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background:
          "radial-gradient(50% 55% at 50% 112%, rgba(109,94,243,0.30), transparent 70%)," +
          "radial-gradient(38% 42% at 12% 4%, rgba(0,191,165,0.12), transparent 60%)," +
          "radial-gradient(34% 40% at 88% 2%, rgba(255,184,107,0.08), transparent 62%)",
      }} />
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.4,
        backgroundImage: "radial-gradient(rgba(255,255,255,0.10) 1px, transparent 1px)",
        backgroundSize: "30px 30px",
        maskImage: "radial-gradient(68% 60% at 50% 32%, #000 0%, transparent 82%)",
        WebkitMaskImage: "radial-gradient(68% 60% at 50% 32%, #000 0%, transparent 82%)",
      }} />

      <div style={{ maxWidth: 940, margin: "0 auto", padding: "0 28px", position: "relative", zIndex: 1 }}>
        <motion.div initial={skipMotion ? false : "hidden"} animate="visible" variants={parent}>
          {/* Badge */}
          <motion.div variants={item}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 9,
              padding: "7px 16px 7px 7px",
              background: "rgba(255,255,255,0.06)", backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 999, fontSize: 12.5, color: "rgba(255,255,255,0.75)", fontWeight: 600,
              marginBottom: 30,
            }}>
              <span style={{
                background: "linear-gradient(135deg, var(--accent), #8B7BFF)", color: "#fff",
                padding: "3px 10px", borderRadius: 999,
                fontFamily: "var(--font-sans)", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em",
              }}>
                {t("badgeRegion")}
              </span>
              {t("badgeLine")}
            </span>
          </motion.div>

          {/* H1 — massive, word-cascade entrance */}
          <h1 className="v2-h2" style={{
            fontSize: "clamp(46px, 8.5vw, 100px)",
            margin: "0 auto 26px",
            maxWidth: "15ch",
            color: "#fff",
          }}>
            <StaggerTitle
              skipMotion={!!skipMotion}
              parts={[
                { text: t("h1Line1") },
                { text: t("h1Gradient"), grad: true },
                { text: t("h1Line2") },
              ]}
            />
          </h1>

          {/* Sub */}
          <motion.p variants={item} style={{ fontSize: "clamp(16px, 2.2vw, 19px)", lineHeight: 1.7, color: "rgba(255,255,255,0.62)", maxWidth: 620, margin: "0 auto 36px" }}>
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
              <a href="#courses" className="btn-ghost btn-ghost--dark" style={{ textDecoration: "none", fontSize: 16.5, padding: "17px 28px", borderRadius: 15 }}>
                {t("ctaSecondary")}
              </a>
            </Magnetic>
          </motion.div>

          {/* Feature bullets */}
          <motion.div variants={item} style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap", marginTop: 28, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
            {BULLETS.map((b) => (
              <span key={b} style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
                <span style={{ width: 5, height: 5, borderRadius: 999, background: "linear-gradient(135deg, var(--accent), var(--accent-2))", display: "inline-block" }} />
                {b}
              </span>
            ))}
          </motion.div>

          {/* What you learn — three directions, so it's instantly clear */}
          <motion.div variants={item} className="hero-dir-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, maxWidth: 720, margin: "56px auto 0" }}>
            {DIRECTIONS.map((d) => {
              const Icon = d.icon;
              return (
                <div key={d.label} style={{
                  display: "flex", alignItems: "center", gap: 13, textAlign: "left",
                  padding: "16px 18px", borderRadius: 16,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  backdropFilter: "blur(8px)",
                }}>
                  <span style={{
                    width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: "linear-gradient(135deg, rgba(109,94,243,0.28), rgba(0,191,165,0.18))",
                    border: "1px solid rgba(255,255,255,0.12)", color: "#fff",
                  }}>
                    <Icon size={18} strokeWidth={2} />
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em", lineHeight: 1.2 }}>{d.label}</div>
                    <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{d.sub}</div>
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* Stats strip */}
          <motion.div variants={item} className="hero-v2-stats" style={{
            maxWidth: 720, margin: "48px auto 0",
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
            borderTop: "1px solid rgba(255,255,255,0.10)",
          }}>
            {[
              { val: t("stat3Val") + "+", label: t("stat3Label"), accent: true },
              { val: "3", label: t("stat1Label") },
              { val: "100%", label: t("stat2Label") },
              { val: t("stat4Val"), label: t("stat4Label") },
            ].map((s, i) => (
              <div key={i} style={{ padding: "22px 12px 0", borderRight: i < 3 ? "1px solid rgba(255,255,255,0.10)" : "none" }} className="hero-v2-stat">
                <AnimatedNumber
                  value={s.val}
                  style={{ display: "block", fontSize: "clamp(24px, 3.2vw, 34px)", fontWeight: 700, letterSpacing: "-0.045em", lineHeight: 1, fontFamily: "var(--font-sans)", color: s.accent ? "var(--accent-2)" : "#fff" }}
                />
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 9, lineHeight: 1.4 }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .hero-dir-grid { grid-template-columns: 1fr !important; max-width: 420px; }
          .hero-v2-stats { grid-template-columns: repeat(2, 1fr) !important; max-width: 420px; }
          .hero-v2-stat { border-right: none !important; padding: 20px 8px 0 !important; }
          .hero-v2-stat:nth-child(odd) { border-right: 1px solid rgba(255,255,255,0.10) !important; }
        }
      `}</style>
    </header>
  );
}
