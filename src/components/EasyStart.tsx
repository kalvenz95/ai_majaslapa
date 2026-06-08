"use client";
import { useEffect, useRef, useState } from "react";

const features = [
  { icon: "✦", title: "Nav nepieciešama programmēšana" },
  { icon: "✦", title: "Soli pa solim sistēma" },
  { icon: "✦", title: "Pielieto uzreiz, ko iemācies" },
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
    <section style={{ position: "relative", padding: "96px 24px", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "30%", left: "8%", width: 480, height: 380, background: "color-mix(in oklab, var(--accent-2) 5%, transparent)", filter: "blur(85px)", pointerEvents: "none" }} />

      <div
        ref={sectionRef}
        style={{
          position: "relative", maxWidth: 1180, margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(28px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
        className="easystart-grid"
      >
        {/* Visual: persona at laptop / learning workspace */}
        <div style={{ position: "relative", aspectRatio: "1/1" }} className="easystart-visual">
          <div style={{ position: "absolute", inset: "6% 4%", borderRadius: 26, overflow: "hidden", border: "1px solid var(--line-2)", boxShadow: "0 28px 80px -20px rgba(17,17,17,0.16), 0 8px 24px -8px rgba(17,17,17,0.08)", background: "var(--bg-2)" }}>
            <img
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1100&auto=format&fit=crop&q=80"
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              loading="lazy"
            />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, color-mix(in oklab, var(--accent-2) 22%, transparent) 0%, transparent 55%)", mixBlendMode: "multiply" }} />
          </div>

          {/* Floating progress card */}
          <div style={{ position: "absolute", right: "-6%", top: "14%", background: "white", border: "1px solid var(--line-2)", borderRadius: 16, padding: "14px 18px", boxShadow: "0 16px 40px -12px rgba(17,17,17,0.14)", minWidth: 168, zIndex: 2 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--ink-3)", letterSpacing: "0.04em" }}>MODULIS 2/6</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--accent-2)" }}>34%</span>
            </div>
            <div style={{ height: 6, borderRadius: 999, background: "var(--bg-2)", overflow: "hidden" }}>
              <div style={{ width: "34%", height: "100%", borderRadius: 999, background: "var(--accent-2)" }} />
            </div>
          </div>

          {/* Floating chip */}
          <div style={{ position: "absolute", left: "-5%", bottom: "10%", background: "var(--accent-2)", color: "white", borderRadius: 14, padding: "10px 16px", fontSize: 13, fontWeight: 600, boxShadow: "0 12px 32px -10px color-mix(in oklab, var(--accent-2) 50%, transparent)", zIndex: 2 }}>
            ✓ Bez koda zināšanām
          </div>
        </div>

        {/* Copy */}
        <div>
          <div className="chip chip-dot" style={{ marginBottom: 22 }}>Sāc bez tehniskām zināšanām</div>

          <h2 style={{ fontFamily: "Inter Tight, sans-serif", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.12, color: "var(--ink)", marginBottom: 20, fontSize: "clamp(28px, 4.2vw, 48px)" }}>
            Nav jābūt <span style={{ color: "var(--accent)" }}>tehniskam,</span> lai sāktu
          </h2>

          <p style={{ fontSize: 17, color: "var(--ink-2)", lineHeight: 1.65, maxWidth: 460, marginBottom: 32 }}>
            Apmācība veidota soli pa solim — seko līdzi un pielieto uzreiz, ko iemācies.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 36 }}>
            {features.map((f, i) => (
              <div key={f.title} style={{
                display: "flex", alignItems: "center", gap: 13,
                padding: "14px 18px", borderRadius: 14,
                background: "var(--bg-1)", border: "1px solid var(--line)",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.5s ease ${0.2 + i * 0.12}s, transform 0.5s ease ${0.2 + i * 0.12}s`,
              }}>
                <div style={{ width: 34, height: 34, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "color-mix(in oklab, var(--accent-2) 14%, transparent)" }}>
                  <span style={{ color: "var(--accent-2)", fontWeight: 700, fontSize: 14 }}>{f.icon}</span>
                </div>
                <span style={{ fontSize: 14.5, fontWeight: 500, color: "var(--ink-2)" }}>{f.title}</span>
              </div>
            ))}
          </div>

          <a href="#pricing" className="btn-primary" style={{ textDecoration: "none" }}>
            Pievienoties platformai →
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .easystart-grid { grid-template-columns: 1fr !important; }
          .easystart-visual { order: -1; max-width: 420px; margin: 0 auto 12px; }
        }
      `}</style>
    </section>
  );
}
