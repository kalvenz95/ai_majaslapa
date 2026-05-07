"use client";

const incomeBlocks = [
  { icon: "📱", service: "Sociālie tīkli", range: "€800–€1 600", period: "/ mēn" },
  { icon: "💬", service: "WhatsApp automatizācija", range: "€1 000–€2 000", period: "/ mēn" },
  { icon: "📞", service: "Balss aģenti", range: "€1 000–€3 000+", period: "/ mēn" },
];

export default function AILaunchpad() {
  return (
    <section style={{ padding: "80px 24px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, var(--line-2), transparent)" }} />

      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <div className="card" style={{ padding: "clamp(32px, 6vw, 64px)", borderColor: "color-mix(in oklab, var(--accent) 15%, transparent)" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div className="chip chip-dot" style={{ marginBottom: 16 }}>💰 Ienākumu piemērs</div>
            <h2 style={{ fontFamily: "Inter Tight, sans-serif", fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.02em", marginBottom: 12 }}>
              2–3 klienti var izskatīties šādi
            </h2>
            <p style={{ color: "var(--ink-3)", fontSize: 15, maxWidth: 400, margin: "0 auto" }}>
              Šie ir pakalpojumi, par kuriem uzņēmumi jau maksā šodien.
            </p>
          </div>

          {/* Income cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 32 }}>
            {incomeBlocks.map((block, i) => (
              <div key={block.service} style={{ padding: 24, textAlign: "center", background: "var(--bg-2)", border: "1px solid var(--line)", borderRadius: 14 }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{block.icon}</div>
                <div style={{ fontSize: 11, color: "var(--ink-4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12, fontFamily: "JetBrains Mono, monospace" }}>{block.service}</div>
                <div className="metric" style={{ color: "var(--accent)", fontSize: "clamp(20px, 3vw, 32px)", whiteSpace: "nowrap", marginBottom: 4 }}>{block.range}</div>
                <div style={{ color: "var(--ink-3)", fontSize: 13 }}>{block.period}</div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <p style={{ color: "var(--ink-2)", fontSize: 15, fontWeight: 500 }}>
              Šie ir pakalpojumi, kurus uzņēmumi jau šobrīd meklē.
            </p>
            <p style={{ color: "var(--ink-3)", fontSize: 14, marginTop: 8 }}>
              Tu apgūsti, kā tos izveidot un piedāvāt praksē.
            </p>
          </div>

          <p style={{ textAlign: "center", fontSize: 11, color: "var(--ink-4)", maxWidth: 480, margin: "0 auto", lineHeight: 1.6, fontFamily: "JetBrains Mono, monospace" }}>
            Rezultāti nav garantēti. Ienākumi atkarīgi no ieguldītā darba, piedāvājuma un klientu piesaistes.
          </p>
        </div>
      </div>
    </section>
  );
}
