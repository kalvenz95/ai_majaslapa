"use client";

const items = [
  {
    label: "Sociālie tīkli",
    range: "€800–€1 600",
    desc: "Saturs, vizuāļi, feed pārvaldība",
    color: "var(--accent)",
  },
  {
    label: "WhatsApp automatizācija",
    range: "€1 000–€2 000",
    desc: "Automātiskas atbildes, lead apstrāde",
    color: "#7FF6E0",
  },
  {
    label: "Balss aģenti",
    range: "€1 000–€3 000+",
    desc: "Zvanu automatizācija, rezervācijas",
    color: "#a78bfa",
  },
];

export default function AILaunchpad() {
  return (
    <section style={{ padding: "64px 24px", position: "relative", overflow: "hidden", borderTop: "1px solid var(--line)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        {/* Label */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 24 }}>
          <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--accent)", marginTop: 7, flexShrink: 0 }} />
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.08em", color: "var(--ink-2)", lineHeight: 1.6 }}>
            Piemērs, kā var izskatīties ienākumi ar 2–4 klientiem mēnesī
          </span>
        </div>

        {/* Cards */}
        <div className="lp-three-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
          {items.map((item, i) => (
            <div
              key={item.label}
              style={{
                padding: "24px 20px",
                background: "var(--bg-1)",
                borderTop: `2px solid ${item.color}`,
                borderRight: i < 2 ? "1px solid var(--line)" : "none",
              }}
            >
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "var(--ink-2)", textTransform: "uppercase", letterSpacing: "0.10em", marginBottom: 12 }}>
                {item.label}
              </div>
              <div style={{ fontSize: "clamp(18px, 4vw, 26px)", fontWeight: 700, letterSpacing: "-0.03em", color: item.color, lineHeight: 1.1, marginBottom: 4 }}>
                {item.range}
              </div>
              <div style={{ fontSize: 12, color: "var(--ink-3)", marginBottom: 10 }}>/ mēnesī</div>
              <div style={{ fontSize: 12, color: "var(--ink-2)", lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ marginTop: 14 }}>
          <p style={{ fontSize: 10, color: "var(--ink-3)", fontFamily: "JetBrains Mono, monospace", lineHeight: 1.6 }}>
            Rezultāti nav garantēti. Atkarīgi no ieguldītā darba un klientu piesaistes.
          </p>
        </div>

      </div>
    </section>
  );
}
