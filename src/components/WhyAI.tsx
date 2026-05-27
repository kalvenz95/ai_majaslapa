"use client";
import { useEffect, useRef, useState } from "react";

const points = [
  {
    icon: "↓",
    color: "#C6FF3D",
    title: "Samazini izmaksas",
    text: "Palīdzi uzņēmumiem strādāt efektīvāk ar AI rīkiem",
  },
  {
    icon: "⚡",
    color: "#7FF6E0",
    title: "Efektivitāte × 10",
    text: "Automatizē atkārtotus procesus un strādā ar AI palīdzību",
  },
  {
    icon: "💼",
    color: "#a78bfa",
    title: "Pieprasīti pakalpojumi",
    text: "Piedāvā risinājumus, ko biznesi jau aktīvi meklē",
  },
  {
    icon: "€",
    color: "#C6FF3D",
    title: "Ikmēneša ienākumi",
    text: "Izveido savu stabilu pakalpojumu virzienu ar AI",
  },
];

export default function WhyAI() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        padding: "140px 0",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid var(--line)",
      }}
    >
      {/* Background orbs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 600, background: "radial-gradient(ellipse, color-mix(in oklab, var(--accent) 6%, transparent) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", top: "20%", right: "-5%", width: 400, height: 400, background: "radial-gradient(circle, rgba(127,246,224,0.08) 0%, transparent 70%)", filter: "blur(60px)" }} />
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }}>
        {/* Kicker */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 32,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s cubic-bezier(0.215,0.61,0.355,1)",
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 999, background: "color-mix(in oklab, var(--accent) 10%, transparent)", border: "1px solid color-mix(in oklab, var(--accent) 25%, transparent)", fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.12em", color: "var(--accent)", textTransform: "uppercase" as const, fontWeight: 700 }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--accent)", animation: "flicker 1.6s ease-in-out infinite" }} />
            AI prasmes biznesam
          </span>
        </div>

        {/* Big heading */}
        <h2
          style={{
            textAlign: "center",
            fontSize: "clamp(36px, 6vw, 88px)",
            lineHeight: 1.06,
            letterSpacing: "-0.04em",
            fontWeight: 700,
            margin: "0 auto 24px",
            maxWidth: "18ch",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(28px)",
            transition: "all 0.65s cubic-bezier(0.215,0.61,0.355,1) 0.08s",
          }}
        >
          Apgūsti prasmes,{" "}
          <span
            style={{
              background: "linear-gradient(120deg, var(--accent) 0%, #7FF6E0 50%, var(--accent) 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              animation: "gradient-shift 5s ease infinite",
              fontStyle: "italic",
              fontFamily: "Fraunces, Georgia, serif",
              fontWeight: 500,
            }}
          >
            kas uzņēmumiem šobrīd ir vajadzīgas
          </span>
        </h2>

        {/* Subline */}
        <p
          style={{
            textAlign: "center",
            fontSize: 18,
            color: "var(--ink-3)",
            maxWidth: 560,
            margin: "0 auto 80px",
            lineHeight: 1.65,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s cubic-bezier(0.215,0.61,0.355,1) 0.15s",
          }}
        >
          Mākslīgais intelekts kļūst par vienu no augstāk novērtētajām prasmēm biznesā — tev ir iespēja būt pirmajam.
        </p>

        {/* 4-col feature grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
          }}
          className="lp-four-why"
        >
          {points.map((p, i) => (
            <div
              key={p.title}
              className="hover-glow-card"
              style={{
                padding: "32px 28px",
                borderRadius: 24,
                background: "rgba(255,255,255,0.025)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,0.07)",
                display: "flex",
                flexDirection: "column",
                gap: 20,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(32px)",
                transition: `opacity 0.6s ease ${0.12 + i * 0.09}s, transform 0.6s cubic-bezier(0.215,0.61,0.355,1) ${0.12 + i * 0.09}s`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Top accent line */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${p.color}, transparent)`, opacity: 0.7 }} />

              {/* Icon */}
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  fontWeight: 700,
                  background: `color-mix(in oklab, ${p.color} 12%, transparent)`,
                  border: `1px solid color-mix(in oklab, ${p.color} 22%, transparent)`,
                  color: p.color,
                  flexShrink: 0,
                }}
              >
                {p.icon}
              </div>

              <div>
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: 700,
                    color: "var(--ink)",
                    letterSpacing: "-0.02em",
                    marginBottom: 8,
                  }}
                >
                  {p.title}
                </h3>
                <p style={{ fontSize: 14, color: "var(--ink-3)", lineHeight: 1.55, margin: 0 }}>
                  {p.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Body text block */}
        <div
          style={{
            maxWidth: 860,
            margin: "64px auto 0",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 32,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.6s ease 0.5s",
          }}
          className="lp-why-body"
        >
          <p style={{ fontSize: 17, color: "var(--ink-2)", lineHeight: 1.7 }}>
            Uzņēmumiem ir vajadzīgi cilvēki, kas ar AI palīdz{" "}
            <span style={{ color: "var(--accent)", fontWeight: 600 }}>samazināt izmaksas</span>,{" "}
            <span style={{ color: "var(--accent)", fontWeight: 600 }}>strādāt efektīvāk</span> un{" "}
            <span style={{ color: "var(--accent)", fontWeight: 600 }}>iegūt vairāk klientu</span>.
          </p>
          <p style={{ fontSize: 17, color: "var(--ink-3)", lineHeight: 1.7 }}>
            Mēs parādām, kā izveidot augstvērtīgu AI pakalpojumu un soli pa solim iemācām, kā to
            piedāvāt uzņēmumiem un attīstīt kā savu ikmēneša ienākumu virzienu.
          </p>
        </div>

        {/* CTA */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 48, opacity: visible ? 1 : 0, transition: "opacity 0.6s ease 0.6s" }}>
          <a
            href="#courses"
            className="btn-primary"
            style={{ textDecoration: "none", fontSize: 15, padding: "15px 30px" }}
          >
            Skatīt, kā tas strādā →
          </a>
        </div>
      </div>
    </section>
  );
}
