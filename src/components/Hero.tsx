"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useRef, type CSSProperties } from "react";

const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;
const EASE_IN_OUT = [0.645, 0.045, 0.355, 1] as const;

const staggerParent = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

function FloatCard({
  style,
  children,
  delay = 0,
  duration = 5.5,
  amplitude = 10,
}: {
  style: CSSProperties;
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  amplitude?: number;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      style={{ position: "absolute", ...style }}
      animate={reduceMotion ? undefined : { y: [0, -amplitude, 0] }}
      transition={{ duration, repeat: Infinity, ease: EASE_IN_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

/* Ambient orb behind hero */
function AmbientOrb({ style }: { style: CSSProperties }) {
  return (
    <motion.div
      style={{
        position: "absolute",
        borderRadius: "50%",
        filter: "blur(80px)",
        pointerEvents: "none",
        ...style,
      }}
      animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const t = useTranslations("Hero");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* Subtle particle dots */
  useEffect(() => {
    if (reduceMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const dots = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.3,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = canvas.width;
        if (d.x > canvas.width) d.x = 0;
        if (d.y < 0) d.y = canvas.height;
        if (d.y > canvas.height) d.y = 0;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(198,255,61,${d.alpha})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, [reduceMotion]);

  return (
    <header
      style={{
        padding: "120px 0 100px",
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Grid mesh background */}
      <div
        className="hero-grid-bg"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Ambient glow orbs */}
      <AmbientOrb
        style={{
          width: 640,
          height: 640,
          top: "-10%",
          right: "-5%",
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--accent) 22%, transparent) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />
      <AmbientOrb
        style={{
          width: 480,
          height: 480,
          bottom: "5%",
          left: "-8%",
          background:
            "radial-gradient(circle, rgba(127,246,224,0.14) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />
      <AmbientOrb
        style={{
          width: 360,
          height: 360,
          top: "30%",
          left: "25%",
          background:
            "radial-gradient(circle, rgba(167,139,250,0.09) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      {/* Radial vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 90% 70% at 50% 50%, transparent 30%, rgba(5,5,5,0.7) 100%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 32px",
          position: "relative",
          zIndex: 1,
          width: "100%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: 72,
            alignItems: "center",
          }}
          className="hero-grid-responsive"
        >
          {/* ── Left column ── */}
          <motion.div
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            variants={staggerParent}
          >
            {/* Badge */}
            <motion.span
              variants={fadeUpItem}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                padding: "6px 16px 6px 6px",
                background: "color-mix(in oklab, var(--accent) 10%, transparent)",
                border: "1px solid color-mix(in oklab, var(--accent) 30%, transparent)",
                borderRadius: 999,
                fontSize: 12,
                color: "var(--ink-2)",
                fontWeight: 500,
                marginBottom: 32,
                backdropFilter: "blur(12px)",
              }}
            >
              <span
                style={{
                  background: "var(--accent)",
                  color: "var(--accent-ink)",
                  padding: "3px 10px",
                  borderRadius: 999,
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.09em",
                }}
              >
                {t("badgeRegion")}
              </span>
              {t("badgeLine")}
            </motion.span>

            {/* H1 */}
            <motion.h1
              variants={fadeUpItem}
              style={{
                fontSize: "clamp(52px, 9vw, 132px)",
                lineHeight: 1.02,
                letterSpacing: "-0.048em",
                fontWeight: 700,
                margin: "0 0 30px",
                maxWidth: "13ch",
              }}
            >
              {t("h1Line1")}
              <span
                style={{
                  background:
                    "linear-gradient(120deg, var(--accent) 20%, #7FF6E0 60%, var(--accent) 100%)",
                  backgroundSize: "200% auto",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  fontStyle: "italic",
                  fontFamily: "Fraunces, Georgia, serif",
                  fontWeight: 500,
                  animation: "gradient-shift 5s ease infinite",
                }}
              >
                {t("h1Gradient")}
              </span>
              {t("h1Line2")}
            </motion.h1>

            {/* Subline */}
            <motion.p
              variants={fadeUpItem}
              style={{
                fontSize: 20,
                lineHeight: 1.6,
                color: "var(--ink-2)",
                maxWidth: 540,
                marginBottom: 40,
              }}
            >
              {t("sub")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUpItem}
              style={{ display: "flex", gap: 14, flexWrap: "wrap" }}
            >
              <a
                href="#pricing"
                className="btn-primary"
                style={{
                  textDecoration: "none",
                  fontSize: 15,
                  padding: "16px 28px",
                  borderRadius: 14,
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                }}
              >
                {t("ctaPrimary")}
              </a>
              <a
                href="#how"
                className="btn-ghost"
                style={{
                  textDecoration: "none",
                  fontSize: 15,
                  padding: "16px 24px",
                  borderRadius: 14,
                }}
              >
                {t("ctaSecondary")}
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUpItem}
              className="hero-stats-grid"
              style={{
                marginTop: 64,
                paddingTop: 32,
                borderTop: "1px solid rgba(255,255,255,0.07)",
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 24,
              }}
            >
              {[
                { val: t("stat1Val"), label: t("stat1Label"), color: "var(--ink)" },
                { val: t("stat2Val"), suffix: t("stat2Percent"), label: t("stat2Label"), color: "var(--accent)" },
                { val: "350", suffix: "+", label: t("stat3Label"), color: "var(--accent)" },
                { val: t("stat4Val"), label: t("stat4Label"), color: "var(--ink)" },
              ].map((s, i) => (
                <div key={i}>
                  <div
                    style={{
                      fontSize: 42,
                      fontWeight: 700,
                      letterSpacing: "-0.045em",
                      lineHeight: 1,
                      color: s.color,
                    }}
                  >
                    {s.val}
                    {s.suffix && (
                      <span style={{ fontSize: 22, color: "var(--accent)" }}>
                        {s.suffix}
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "var(--ink-3)",
                      marginTop: 10,
                      lineHeight: 1.45,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right column: image collage ── */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.2 }}
            className="hero-img-col"
            style={{ position: "relative", aspectRatio: "1/1", marginTop: 48 }}
          >
            {/* Card 1 */}
            <FloatCard
              duration={5.8}
              amplitude={12}
              delay={0}
              style={{ left: "4%", top: 0, width: "63%", aspectRatio: "4/5", zIndex: 2 }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 28,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.10)",
                  boxShadow:
                    "0 32px 80px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(198,255,61,0.08)",
                  transform: "rotate(-2.5deg)",
                  background: "var(--bg-2)",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=900&auto=format&fit=crop&q=80"
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  loading="lazy"
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(5,5,5,0.6) 0%, transparent 50%)",
                  }}
                />
              </div>
            </FloatCard>

            {/* Card 2 */}
            <FloatCard
              duration={6.4}
              amplitude={14}
              delay={0.9}
              style={{ right: 0, top: "16%", width: "52%", aspectRatio: "1/1", zIndex: 3 }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 28,
                  overflow: "hidden",
                  border: "1px solid rgba(127,246,224,0.15)",
                  boxShadow:
                    "0 32px 80px -20px rgba(0,0,0,0.7), 0 0 30px rgba(127,246,224,0.06)",
                  transform: "rotate(3deg)",
                  background: "var(--bg-2)",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&auto=format&fit=crop&q=80"
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  loading="lazy"
                />
              </div>
            </FloatCard>

            {/* Card 3 */}
            <FloatCard
              duration={5.2}
              amplitude={9}
              delay={1.7}
              style={{ left: "17%", bottom: 0, width: "50%", aspectRatio: "4/3", zIndex: 4 }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 28,
                  overflow: "hidden",
                  border: "1px solid rgba(167,139,250,0.15)",
                  boxShadow:
                    "0 32px 80px -20px rgba(0,0,0,0.7), 0 0 30px rgba(167,139,250,0.06)",
                  transform: "rotate(-1.5deg)",
                  background: "var(--bg-2)",
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&auto=format&fit=crop&q=80"
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  loading="lazy"
                />
              </div>
            </FloatCard>

            {/* Floating pill 1 — Live */}
            <FloatCard
              duration={4.8}
              amplitude={6}
              delay={0.4}
              style={{ top: "6%", right: "-4%", zIndex: 10 }}
            >
              <div
                style={{
                  background: "rgba(10,10,10,0.75)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(198,255,61,0.25)",
                  borderRadius: 14,
                  padding: "10px 16px",
                  fontSize: 12,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(198,255,61,0.08)",
                  whiteSpace: "nowrap",
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: 999,
                    background: "var(--accent)",
                    flexShrink: 0,
                    boxShadow: "0 0 8px var(--accent)",
                    animation: "flicker 1.6s ease-in-out infinite",
                  }}
                />
                {t("floatTag1")}
              </div>
            </FloatCard>

            {/* Floating pill 2 */}
            <FloatCard
              duration={5.4}
              amplitude={7}
              delay={1.2}
              style={{ bottom: "10%", left: "-6%", zIndex: 10 }}
            >
              <div
                style={{
                  background: "rgba(10,10,10,0.75)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(127,246,224,0.20)",
                  borderRadius: 14,
                  padding: "10px 16px",
                  fontSize: 12,
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(127,246,224,0.06)",
                  whiteSpace: "nowrap",
                  color: "#7FF6E0",
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: 999,
                    background: "#7FF6E0",
                    flexShrink: 0,
                    boxShadow: "0 0 8px #7FF6E0",
                  }}
                />
                {t("floatTag2")}
              </div>
            </FloatCard>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 200,
          background:
            "linear-gradient(to bottom, transparent, var(--bg))",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
    </header>
  );
}
