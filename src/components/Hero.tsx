"use client";

export default function Hero() {
  return (
    <header style={{ padding: "96px 0 80px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 60% 50% at 80% 20%, color-mix(in oklab, var(--accent) 18%, transparent), transparent 60%), radial-gradient(ellipse 50% 50% at 10% 80%, color-mix(in oklab, var(--accent) 8%, transparent), transparent 60%)" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 64, alignItems: "center" }} className="hero-grid-responsive">
          {/* Left */}
          <div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "6px 14px 6px 6px", background: "color-mix(in oklab, var(--accent) 12%, transparent)", border: "1px solid color-mix(in oklab, var(--accent) 35%, transparent)", borderRadius: 999, fontSize: 12, color: "var(--ink)", fontWeight: 500, marginBottom: 28 }}>
              <span style={{ background: "var(--accent)", color: "var(--accent-ink)", padding: "3px 9px", borderRadius: 999, fontFamily: "JetBrains Mono, monospace", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em" }}>LV</span>
              Latvijas pirmā AI monetizācijas akadēmija
            </span>

            <h1 style={{ fontSize: "clamp(48px, 8.5vw, 124px)", lineHeight: 0.92, letterSpacing: "-0.045em", fontWeight: 600, margin: "0 0 28px", maxWidth: "14ch" }}>
              Iemācies veidot AI pakalpojumus un{" "}
              <span style={{ background: "linear-gradient(120deg, var(--accent), color-mix(in oklab, var(--accent) 70%, white))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", fontStyle: "italic", fontFamily: "Fraunces, Georgia, serif", fontWeight: 500 }}>
                pelnīt
              </span>{" "}
              ar tiem.
            </h1>

            <p style={{ fontSize: 19, lineHeight: 1.55, color: "var(--ink-2)", maxWidth: 560 }}>
              Praktiska apmācība latviešu valodā. Soli pa solim — no pirmās prasmes līdz pirmajam klientam.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 36 }}>
              <a href="#pricing" className="btn-primary" style={{ textDecoration: "none" }}>Sākt bez maksas →</a>
              <a href="#how" className="btn-ghost" style={{ textDecoration: "none" }}>Kā tas strādā</a>
            </div>

            {/* Stats */}
            <div className="hero-stats-grid" style={{ marginTop: 64, paddingTop: 28, borderTop: "1px solid var(--line)", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
              <div>
                <div style={{ fontSize: 44, fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1 }}>3</div>
                <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 10, lineHeight: 1.4 }}>AI pakalpojumu virzieni</div>
              </div>
              <div>
                <div style={{ fontSize: 44, fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1 }}>
                  <span style={{ color: "var(--accent)" }}>100</span><span style={{ fontSize: 24, color: "var(--ink-3)" }}>%</span>
                </div>
                <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 10, lineHeight: 1.4 }}>Praktisks saturs</div>
              </div>
              <div>
                <div style={{ fontSize: 44, fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1 }}>
                  350<span style={{ fontSize: 24, color: "var(--accent)" }}>+</span>
                </div>
                <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 10, lineHeight: 1.4 }}>Aktīvi studenti</div>
              </div>
              <div>
                <div style={{ fontSize: 44, fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1 }}>€0</div>
                <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 10, lineHeight: 1.4 }}>Sākt bez pieredzes</div>
              </div>
            </div>
          </div>

          {/* Right: image collage */}
          <div className="hero-img-col" style={{ position: "relative", aspectRatio: "1/1", marginTop: 48 }}>
            {/* Card 1 */}
            <div style={{ position: "absolute", left: "5%", top: 0, width: "62%", aspectRatio: "4/5", borderRadius: 24, overflow: "hidden", border: "1px solid var(--line-2)", boxShadow: "0 30px 80px -20px rgba(0,0,0,0.6), 0 8px 24px -8px rgba(0,0,0,0.4)", transform: "rotate(-2.5deg)", zIndex: 2, background: "var(--bg-2)" }}>
              <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=900&auto=format&fit=crop&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
            </div>
            {/* Card 2 */}
            <div style={{ position: "absolute", right: 0, top: "18%", width: "50%", aspectRatio: "1/1", borderRadius: 24, overflow: "hidden", border: "1px solid var(--line-2)", boxShadow: "0 30px 80px -20px rgba(0,0,0,0.6), 0 8px 24px -8px rgba(0,0,0,0.4)", transform: "rotate(3deg)", zIndex: 3, background: "var(--bg-2)" }}>
              <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&auto=format&fit=crop&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
            </div>
            {/* Card 3 */}
            <div style={{ position: "absolute", left: "18%", bottom: 0, width: "48%", aspectRatio: "4/3", borderRadius: 24, overflow: "hidden", border: "1px solid var(--line-2)", boxShadow: "0 30px 80px -20px rgba(0,0,0,0.6), 0 8px 24px -8px rgba(0,0,0,0.4)", transform: "rotate(-1.5deg)", zIndex: 4, background: "var(--bg-2)" }}>
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&auto=format&fit=crop&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
            </div>
            {/* Floating tag 1 */}
            <div style={{ position: "absolute", top: "8%", right: "-2%", background: "var(--bg-1)", border: "1px solid var(--line-2)", borderRadius: 14, padding: "10px 14px", fontSize: 12, fontWeight: 500, display: "flex", alignItems: "center", gap: 8, boxShadow: "0 12px 32px -8px rgba(0,0,0,0.5)", zIndex: 10 }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--accent)", flexShrink: 0 }} />
              Build · Sell · Scale
            </div>
            {/* Floating tag 2 */}
            <div style={{ position: "absolute", bottom: "12%", left: "-4%", background: "var(--bg-1)", border: "1px solid var(--line-2)", borderRadius: 14, padding: "10px 14px", fontSize: 12, fontWeight: 500, display: "flex", alignItems: "center", gap: 8, boxShadow: "0 12px 32px -8px rgba(0,0,0,0.5)", zIndex: 10 }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--accent)", flexShrink: 0 }} />
              Pirmais klients 3 nedēļās
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
