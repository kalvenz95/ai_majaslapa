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
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
          <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--accent)" }} />
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.15em", color: "var(--ink-3)", textTransform: "uppercase" }}>
            Tirgus likmes
          </span>
        </div>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
          {items.map((item, i) => (
            <div
              key={item.label}
              style={{
                padding: "28px 24px",
                background: "var(--bg-1)",
                borderTop: `2px solid ${item.color}`,
                borderRight: i < 2 ? "1px solid var(--line)" : "none",
                position: "relative",
              }}
            >
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "var(--ink-4)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 14 }}>
                {item.label}
              </div>
              <div style={{ fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 700, letterSpacing: "-0.03em", color: item.color, lineHeight: 1, marginBottom: 10 }}>
                {item.range}
                <span style={{ fontSize: 13, color: "var(--ink-4)", fontWeight: 400, letterSpacing: 0 }}> / mēn</span>
              </div>
              <div style={{ fontSize: 12, color: "var(--ink-4)", lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end" }}>
          <p style={{ fontSize: 10, color: "var(--ink-4)", fontFamily: "JetBrains Mono, monospace", lineHeight: 1.6 }}>
            Rezultāti nav garantēti. Atkarīgi no ieguldītā darba un klientu piesaistes.
          </p>
        </div>

      </div>
    </section>
  );
}
