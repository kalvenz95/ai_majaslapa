"use client";

const bullets = [
  "Pieprasīti pakalpojumi",
  "Gatavi piedāvājumi",
  "Skaidrs ceļš līdz pirmajam klientam",
];

export default function Hero() {
  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "128px 24px 80px", overflow: "hidden" }}>
      {/* Badge */}
      <div className="chip chip-dot" style={{ marginBottom: 32 }}>
        Latvijas pirmā AI monetizācijas platforma
      </div>

      {/* Headline */}
      <h1 style={{ textAlign: "center", maxWidth: 800, margin: "0 auto 24px" }}>
        <span className="font-display" style={{ display: "block", fontSize: "clamp(38px,5.5vw,68px)", lineHeight: 1.04, color: "var(--ink)", letterSpacing: "-0.03em" }}>
          Iemācies veidot AI pakalpojumus
        </span>
        <span className="font-display" style={{ display: "block", fontSize: "clamp(38px,5.5vw,68px)", lineHeight: 1.04, color: "var(--accent)", letterSpacing: "-0.03em", marginTop: 4 }}>
          un pelnīt ar tiem uzņēmumiem
        </span>
      </h1>

      {/* Subtitle */}
      <p style={{ textAlign: "center", maxWidth: 480, margin: "0 auto 32px", color: "var(--ink-2)", fontSize: 17, lineHeight: 1.6 }}>
        Praktiska apmācība latviešu valodā.<br />
        Sāc ar vienu pakalpojumu un pārvērt to ienākumos.
      </p>

      {/* Bullets */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px", alignItems: "center", justifyContent: "center", marginBottom: 40 }}>
        {bullets.map((b) => (
          <div key={b} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "var(--accent)", fontWeight: 600, fontSize: 13, fontFamily: "JetBrains Mono, monospace" }}>+</span>
            <span style={{ fontSize: 14, color: "var(--ink-2)" }}>{b}</span>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", justifyContent: "center", marginBottom: 64 }}>
        <a href="#pricing" className="btn-primary" style={{ textDecoration: "none" }}>
          Sākt bez maksas →
        </a>
        <a href="#courses" className="btn-ghost" style={{ textDecoration: "none" }}>
          Skatīt kursus
        </a>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px 48px" }}>
        {[
          { number: "3", label: "AI pakalpojumu virzieni" },
          { number: "100%", label: "Praktisks saturs" },
          { number: "LV", label: "Latviešu valodā" },
          { number: "€0", label: "Sākt var bez pieredzes" },
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: "center" }}>
            <div className="metric" style={{ fontSize: 28, color: "var(--accent)" }}>{stat.number}</div>
            <div style={{ fontSize: 10, color: "var(--ink-4)", marginTop: 5, textTransform: "uppercase", letterSpacing: "0.12em", fontFamily: "JetBrains Mono, monospace" }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Floating cards */}
      <div className="hidden xl:block" style={{ position: "absolute", right: 32, top: "33%", animation: "float 6s ease-in-out infinite" }}>
        <div className="card" style={{ padding: 16, width: 192 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: 999, background: "var(--accent)", flexShrink: 0 }} />
            <span style={{ fontSize: 10, color: "var(--ink-3)", fontFamily: "JetBrains Mono, monospace", textTransform: "uppercase", letterSpacing: "0.04em" }}>Jaunākais darījums</span>
          </div>
          <div className="metric" style={{ fontSize: 28, color: "var(--ink)" }}>€850</div>
          <div style={{ fontSize: 11, color: "var(--ink-4)", marginBottom: 10, fontFamily: "JetBrains Mono, monospace" }}>WhatsApp Bot · Rīga</div>
          <div style={{ height: 3, borderRadius: 999, background: "var(--bg-3)" }}>
            <div style={{ width: "75%", height: "100%", borderRadius: 999, background: "var(--accent)" }} />
          </div>
        </div>
      </div>

      <div className="hidden xl:block" style={{ position: "absolute", left: 32, top: "50%", animation: "float 6s ease-in-out infinite 2s" }}>
        <div className="card" style={{ padding: 16, width: 208 }}>
          <div style={{ fontSize: 10, color: "var(--ink-4)", marginBottom: 8, fontFamily: "JetBrains Mono, monospace", textTransform: "uppercase", letterSpacing: "0.04em" }}>✓ Pirmais klients</div>
          <div style={{ fontWeight: 600, color: "var(--ink)", fontSize: 14 }}>AI Balss Aģents · Zobārsts</div>
          <div className="chip chip-accent" style={{ marginTop: 10, fontSize: 11 }}>+€1200/mēn</div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.3 }}>
        <span style={{ fontSize: 9, color: "var(--ink-4)", textTransform: "uppercase", letterSpacing: "0.15em", fontFamily: "JetBrains Mono, monospace" }}>Ritini</span>
        <div style={{ width: 1, height: 28, background: "linear-gradient(to bottom, var(--accent), transparent)" }} />
      </div>
    </section>
  );
}
