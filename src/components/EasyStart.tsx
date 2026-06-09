"use client";

const checks = [
  "Nav nepieciešama programmēšana",
  "Soli pa solim sistēma",
  "Praktiski piemēri un veidnes",
  "Viss latviešu valodā",
];

export default function EasyStart() {
  return (
    <section style={{ padding: "120px 0", background: "var(--bg)", borderTop: "1px solid var(--line)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div
          className="easystart-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}
        >
          {/* Left: copy */}
          <div>
            <h2 style={{
              fontSize: "clamp(40px, 6.5vw, 76px)",
              fontWeight: 900,
              fontFamily: "Inter Tight, sans-serif",
              letterSpacing: "-0.04em",
              lineHeight: 1.06,
              color: "var(--ink)",
              margin: "0 0 20px",
            }}>
              Nav jābūt <span style={{ color: "var(--accent)" }}>programmētājam</span>
            </h2>

            <p style={{ fontSize: 18, color: "var(--ink-3)", lineHeight: 1.65, maxWidth: 460, marginBottom: 36 }}>
              Lielākā daļa studentu sāk bez tehniskām zināšanām.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 40 }}>
              {checks.map((c) => (
                <div key={c} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: 999, flexShrink: 0,
                    background: "color-mix(in oklab, var(--accent) 12%, transparent)",
                    border: "1px solid color-mix(in oklab, var(--accent) 25%, transparent)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3">
                      <polyline points="20,6 9,17 4,12" />
                    </svg>
                  </div>
                  <span style={{ fontSize: 16, color: "var(--ink-2)", fontWeight: 500 }}>{c}</span>
                </div>
              ))}
            </div>

            <a href="#pricing" className="btn-primary" style={{ textDecoration: "none", fontSize: 16, padding: "16px 28px" }}>
              Pievienoties platformai →
            </a>
          </div>

          {/* Right: image */}
          <div className="easystart-visual">
            <div style={{
              borderRadius: 28, overflow: "hidden",
              border: "1px solid var(--line-2)",
              boxShadow: "0 28px 72px -20px rgba(17,17,17,0.12)",
              aspectRatio: "4/3", background: "var(--bg-2)",
            }}>
              <img
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&auto=format&fit=crop&q=80"
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .easystart-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .easystart-visual { order: -1; }
        }
      `}</style>
    </section>
  );
}
