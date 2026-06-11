"use client";

const services = [
  {
    emoji: "📱",
    label: "AI saturs",
    range: "300€–1500€",
    desc: "Sociālie tīkli, faceless video, reklāmu vizuāļi",
  },
  {
    emoji: "🌐",
    label: "AI mājaslapas",
    range: "500€–1800€",
    desc: "Modernu lapu izstrāde un palaišana uzņēmumiem",
  },
  {
    emoji: "🤖",
    label: "WhatsApp automatizācija",
    range: "1000€–2000€",
    desc: "Automātiskas atbildes un pieteikumu apstrāde",
  },
  {
    emoji: "🎙️",
    label: "AI balss aģenti",
    range: "1000€–3000€+",
    desc: "Zvanu pieņemšana, rezervācijas un atgādinājumi",
  },
];

export default function AILaunchpad() {
  return (
    <section style={{ padding: "120px 0", background: "#FFFFFF", borderTop: "1px solid var(--line)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 64px" }}>
          <h2 style={{
            fontSize: "clamp(38px, 6.5vw, 76px)",
            fontWeight: 900,
            fontFamily: "Inter Tight, sans-serif",
            letterSpacing: "-0.04em",
            lineHeight: 1.06,
            color: "var(--ink)",
            margin: "0 0 20px",
          }}>
            Kurus pakalpojumus uzņēmumi <span style={{ color: "var(--accent)" }}>jau pērk?</span>
          </h2>
          <p style={{ fontSize: 18, color: "var(--ink-3)", lineHeight: 1.65 }}>
            Šie ir pakalpojumi, kurus uzņēmumi jau šobrīd izmanto un par kuriem maksā.
          </p>
        </div>

        {/* 4 price cards */}
        <div
          className="ailaunchpad-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}
        >
          {services.map((s, i) => (
            <div
              key={s.label}
              style={{
                background: "var(--bg)",
                border: "1px solid var(--line)",
                borderRadius: 24,
                padding: "32px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 14,
                transition: "border-color 0.2s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "color-mix(in oklab, var(--accent) 35%, transparent)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--line)";
                (e.currentTarget as HTMLElement).style.transform = "";
              }}
            >
              <div style={{ fontSize: 32 }}>{s.emoji}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6, fontFamily: "Inter Tight, sans-serif" }}>
                  {s.label}
                </div>
                <div style={{
                  fontSize: "clamp(22px, 3.5vw, 30px)",
                  fontWeight: 900,
                  fontFamily: "Inter Tight, sans-serif",
                  letterSpacing: "-0.03em",
                  color: "var(--accent)",
                  lineHeight: 1.1,
                  marginBottom: 4,
                }}>
                  {s.range}
                </div>
                <div style={{ fontSize: 12, color: "var(--ink-3)", marginBottom: 10 }}>/mēn</div>
                <div style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p style={{
          textAlign: "center", marginTop: 24,
          fontSize: 12, color: "var(--ink-4)", fontFamily: "Inter, sans-serif",
        }}>
          Ienākumi atkarīgi no pieredzes, klientiem un ieguldītā darba.
        </p>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .ailaunchpad-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .ailaunchpad-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
