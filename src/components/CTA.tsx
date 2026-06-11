"use client";

export default function CTA() {
  return (
    <>
      {/* Block: Pievienojies kopienai */}
      <section style={{ padding: "120px 0", background: "var(--bg)", borderTop: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
          <div
            className="cta-community-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}
          >
            {/* Left */}
            <div>
              <h2 className="h-display" style={{
                fontSize: "clamp(40px, 6.5vw, 76px)",
                lineHeight: 1.08,
                color: "var(--ink)",
                margin: "0 0 20px",
              }}>
                Pievienojies <span style={{ color: "var(--accent)" }}>kopienai</span>
              </h2>
              <p style={{ fontSize: 18, color: "var(--ink-3)", lineHeight: 1.65, maxWidth: 440, marginBottom: 36 }}>
                Mācies kopā ar citiem, saņem atbildes uz jautājumiem un seko līdzi jaunākajiem AI rīkiem.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 40 }}>
                {["Aktīva studentu kopiena", "Jautājumi un atbildes", "Jauni rīki un atjauninājumi", "Mentoru atbalsts"].map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: 999, flexShrink: 0,
                      background: "color-mix(in oklab, var(--accent) 12%, transparent)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3">
                        <polyline points="20,6 9,17 4,12" />
                      </svg>
                    </div>
                    <span style={{ fontSize: 15, color: "var(--ink-2)", fontWeight: 500 }}>{item}</span>
                  </div>
                ))}
              </div>
              <a href="#pricing" className="btn-primary" style={{ textDecoration: "none", fontSize: 16, padding: "16px 28px" }}>
                Pievienoties →
              </a>
            </div>

            {/* Right: community image */}
            <div className="cta-community-img">
              <div style={{
                borderRadius: 28, overflow: "hidden",
                border: "1px solid var(--line-2)",
                boxShadow: "0 28px 72px -20px rgba(17,17,17,0.10)",
                aspectRatio: "4/3", background: "var(--bg-2)",
              }}>
                <img
                  src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=900&auto=format&fit=crop&q=80"
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Block: Final CTA — Sāc jau šodien */}
      <section style={{
        padding: "120px 0", textAlign: "center",
        background: "var(--ink)", position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 60% 60% at 50% 100%, color-mix(in oklab, var(--accent) 20%, transparent), transparent 65%)" }} />
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }}>
          <h2 className="h-display" style={{
            fontSize: "clamp(48px, 8vw, 92px)",
            lineHeight: 1.04,
            color: "#FFFFFF",
            margin: "0 0 20px",
          }}>
            Sāc jau <span style={{ color: "color-mix(in oklab, var(--accent) 80%, #fff)" }}>šodien</span>
          </h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.6)", lineHeight: 1.65, marginBottom: 44 }}>
            Izvēlies sev piemērotāko virzienu un sper pirmo soli AI jomā.
          </p>
          <a
            href="#pricing"
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              background: "var(--accent)", color: "#fff",
              padding: "18px 40px", borderRadius: 16,
              fontSize: 18, fontWeight: 800, fontFamily: "Inter Tight, sans-serif",
              letterSpacing: "-0.01em", textDecoration: "none",
              transition: "filter 0.15s ease, transform 0.15s ease",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.filter = "brightness(1.1)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.filter = ""; }}
          >
            Sākt bezmaksas →
          </a>
          <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap", marginTop: 28, fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
            {["Latviešu valodā", "Bez programmēšanas", "Aktīva kopiena", "Gatavas veidnes"].map((item) => (
              <span key={item} style={{ display: "inline-flex", gap: 7, alignItems: "center" }}>
                <span style={{ width: 5, height: 5, borderRadius: 999, background: "var(--accent)", display: "inline-block", opacity: 0.8 }} />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 860px) {
          .cta-community-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .cta-community-img { order: -1; }
        }
      `}</style>
    </>
  );
}
