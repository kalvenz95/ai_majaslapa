"use client";

import { Link } from "@/i18n/navigation";

const curriculum = [
  {
    num: "1",
    title: "AI saturs uzņēmumiem",
    items: ["Faceless video", "Reklāmu vizuāļi", "Sociālie tīkli", "Portfolio no nulles"],
    link: "/kursi/satura-specialists",
  },
  {
    num: "2",
    title: "AI mājaslapas",
    items: ["Lovable / Claude Code", "Domēni un hosting", "Lead forms", "Publicēšana"],
    link: "/kursi/digitalais-specialists",
  },
  {
    num: "3",
    title: "Automatizācija",
    items: ["WhatsApp automatizācija", "E-pasti un follow-ups", "Lead apstrāde", "Make.com / n8n"],
    link: "/kursi/ai-agentu-eksperts",
  },
  {
    num: "4",
    title: "AI balss aģenti",
    items: ["Vapi iestatīšana", "Zvanu scenāriji", "Rezervācijas sistēmas", "Klientu piesaiste"],
    link: "/kursi/voice-agents",
  },
];

export default function Services() {
  return (
    <section id="courses" style={{ padding: "120px 0", background: "var(--bg)", borderTop: "1px solid var(--line)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 64px" }}>
          <h2 className="h-display" style={{
            fontSize: "clamp(42px, 7vw, 80px)",
            lineHeight: 1.08,
            color: "var(--ink)",
            margin: "0 0 20px",
          }}>
            Ko tu <span style={{ color: "var(--teal-ink)" }}>iemācīsies?</span>
          </h2>
          <p style={{ fontSize: 18, color: "var(--ink-3)", lineHeight: 1.65 }}>
            Četri praktiski virzieni — katrs ar konkrētiem uzdevumiem un veidnēm.
          </p>
        </div>

        {/* Curriculum cards */}
        <div
          className="services-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}
        >
          {curriculum.map((c) => (
            <div
              key={c.num}
              className="lp-card"
              style={{
                background: "#fff",
                border: "1px solid var(--line)",
                borderRadius: 24,
                padding: "36px 32px",
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "color-mix(in oklab, var(--accent) 30%, transparent)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--line)";
              }}
            >
              {/* Number + title */}
              <div>
                <div style={{
                  fontSize: 14, fontWeight: 800, fontFamily: "Inter Tight, sans-serif",
                  color: "var(--accent)", marginBottom: 8, letterSpacing: "-0.01em",
                }}>
                  {c.num}. temats
                </div>
                <h3 style={{
                  fontSize: "clamp(20px, 2.5vw, 26px)",
                  fontWeight: 800,
                  fontFamily: "Inter Tight, sans-serif",
                  letterSpacing: "-0.025em",
                  color: "var(--ink)",
                  margin: 0,
                }}>
                  {c.title}
                </h3>
              </div>

              {/* Bullet list */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {c.items.map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 22, height: 22, borderRadius: 999, flexShrink: 0,
                      background: "color-mix(in oklab, var(--accent) 10%, transparent)",
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

              {/* CTA */}
              <Link
                href={c.link}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  fontSize: 14, fontWeight: 700, color: "var(--accent)",
                  textDecoration: "none", marginTop: "auto", paddingTop: 4,
                  transition: "gap 0.15s ease",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.gap = "10px"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.gap = "6px"; }}
              >
                Uzzināt vairāk →
              </Link>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .services-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
