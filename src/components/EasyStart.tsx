"use client";
import { useEffect, useRef, useState } from "react";

const features = [
  { icon: "✦", title: "Nav nepieciešama programmēšana" },
  { icon: "✦", title: "Soli pa solim struktūra" },
  { icon: "✦", title: "Praktisks pielietojums" },
];

export default function EasyStart() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{ position: "relative", padding: "80px 24px", display: "flex", justifyContent: "center", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 400, background: "color-mix(in oklab, var(--accent) 4%, transparent)", filter: "blur(80px)", pointerEvents: "none" }} />
      <div className="grid-overlay" style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.4 }} />

      <div
        ref={sectionRef}
        className="card"
        style={{
          position: "relative", width: "100%", maxWidth: 920,
          padding: "clamp(28px, 6vw, 64px)",
          borderColor: "color-mix(in oklab, var(--accent) 20%, transparent)",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 192, height: 1, background: "linear-gradient(90deg, transparent, color-mix(in oklab, var(--accent) 50%, transparent), transparent)" }} />

        {/* Badge */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <div className="chip chip-dot">Sāc bez tehniskām zināšanām</div>
        </div>

        {/* Title */}
        <h2 style={{ textAlign: "center", fontFamily: "Inter Tight, sans-serif", fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 32, fontSize: "clamp(24px, 3.5vw, 40px)" }}>
          Nav jābūt <span style={{ color: "var(--accent)" }}>tehniskam,</span> lai sāktu
        </h2>

        {/* Text block */}
        <div style={{ background: "var(--bg-2)", border: "1px solid var(--line)", borderRadius: 14, padding: "clamp(18px, 3vw, 28px)", marginBottom: 40 }}>
          <p style={{ color: "var(--ink-2)", fontSize: 15, lineHeight: 1.75, marginBottom: 16 }}>
            Nav nepieciešamas programmēšanas vai sarežģītas datorprasmes. Apmācība ir veidota{" "}
            <span style={{ color: "var(--accent)", fontWeight: 600 }}>soli pa solim</span>{" "}
            — vari sekot līdzi un uzreiz pielietot.
          </p>
          <p style={{ color: "var(--ink-2)", fontSize: 15, lineHeight: 1.75 }}>
            Tu apgūsti prasmes, kuras jau šobrīd tiek izmantotas uzņēmumos, un kļūsti par daļu no
            jomas, kas strauji attīstās.
          </p>
        </div>

        {/* Feature points */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 40 }}>
          {features.map((f, i) => (
            <div key={f.title} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "12px 16px", borderRadius: 12,
              background: "var(--bg-2)", border: "1px solid color-mix(in oklab, var(--accent) 15%, transparent)",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: `opacity 0.5s ease ${0.2 + i * 0.12}s, transform 0.5s ease ${0.2 + i * 0.12}s`,
            }}>
              <span style={{ color: "var(--accent)", fontWeight: 600, fontSize: 12 }}>{f.icon}</span>
              <span style={{ fontSize: 14, fontWeight: 500, color: "var(--ink-2)" }}>{f.title}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <a href="#pricing" className="btn-primary" style={{ textDecoration: "none" }}>
            Pievienoties platformai →
          </a>
        </div>
      </div>
    </section>
  );
}
