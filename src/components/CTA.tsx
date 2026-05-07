"use client";

const trust = [
  "+ Latviešu valodā",
  "+ Praktiski kursi",
  "+ Gatavas veidnes",
  "+ Kopiena",
];

export default function CTA() {
  return (
    <section style={{ padding: "96px 24px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, color-mix(in oklab, var(--accent) 20%, transparent), transparent)" }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 600, height: 300, background: "var(--accent)", opacity: 0.03, borderRadius: 999, filter: "blur(80px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative" }}>
        {/* Badge */}
        <div className="chip chip-dot" style={{ marginBottom: 24 }}>🚀 Sāc šodien</div>

        {/* Headline */}
        <h2 style={{ fontFamily: "Inter Tight, sans-serif", fontSize: "clamp(36px,6vw,60px)", fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 24 }}>
          Tavs pirmais klients{" "}
          <span style={{ color: "var(--accent)" }}>sākas šeit</span>
        </h2>

        <p style={{ color: "var(--ink-3)", fontSize: 18, maxWidth: 480, margin: "0 auto 40px", lineHeight: 1.6 }}>
          Izvēlies virzienu,<br />
          apgūsti prasmes<br />
          un pārvērt tās ienākumos.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginBottom: 48 }}>
          <a href="#pricing" className="btn-primary" style={{ textDecoration: "none", fontSize: 16, padding: "16px 32px" }}>
            Sākt bez maksas →
          </a>
          <a href="#courses" className="btn-ghost" style={{ textDecoration: "none", fontSize: 16, padding: "16px 32px" }}>
            Skatīt visus kursus
          </a>
        </div>

        {/* Trust signals */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px 24px", marginBottom: 56 }}>
          {trust.map((item) => (
            <span key={item} style={{ fontSize: 13, color: "var(--ink-3)", fontWeight: 500, fontFamily: "JetBrains Mono, monospace" }}>{item}</span>
          ))}
        </div>

        {/* Feature cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
          {[
            { icon: "🎓", title: "Praktiski kursi", desc: "Apgūsti vienu pakalpojumu no A līdz Z" },
            { icon: "📋", title: "Gatavas veidnes", desc: "Piedāvājumi, ziņu skripti, onboarding" },
            { icon: "🤝", title: "Kopiena", desc: "Latvieši, kas strādā ar AI pakalpojumiem" },
          ].map((item) => (
            <div key={item.title} className="card" style={{ padding: 20, textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <div style={{ fontWeight: 600, color: "var(--ink)", marginBottom: 4, fontSize: 14 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: "var(--ink-3)", lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
