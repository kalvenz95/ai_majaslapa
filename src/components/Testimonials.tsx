"use client";

const quotes = [
  {
    initials: "MK",
    name: "Mārtiņš K.",
    role: "Freelancer · Rīga",
    text: "Pēc 3 nedēļām uzrunāju pirmo klientu — restorānu Rīgā. Tagad strādāju ar 4 klientiem paralēli pamata darbam.",
    amt: "€1 400/mēn",
  },
  {
    initials: "LB",
    name: "Laura B.",
    role: "Satura veidotāja · Jūrmala",
    text: "AI video kurss bija tieši tas, ko meklēju. Tagad vadu sociālo mediju saturu 3 uzņēmumiem un pati plānoju savu laiku.",
    amt: "€900/mēn",
  },
  {
    initials: "RD",
    name: "Raivis D.",
    role: "Mārketings · Liepāja",
    text: "Voice aģentu sistēmu zobārstniecībai saliku kopā pēc kursa. Klients ir sajūsmā — automātiski zvanu atgādinājumi strādā bez iejaukšanās.",
    amt: "€800 + €200/mēn",
  },
];

function Stars() {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {[0,1,2,3,4].map((i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#F4B942" stroke="none">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="results" style={{ padding: "120px 0", background: "#FFFFFF", borderTop: "1px solid var(--line)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 64px" }}>
          <h2 className="h-display" style={{
            fontSize: "clamp(42px, 7vw, 80px)",
            lineHeight: 1.08,
            color: "var(--ink)",
            margin: "0 0 20px",
          }}>
            Ko saka mūsu <span style={{ color: "var(--accent)" }}>studenti?</span>
          </h2>
          <p style={{ fontSize: 18, color: "var(--ink-3)", lineHeight: 1.65 }}>
            Reālas pieredzes no cilvēkiem, kas jau strādā ar AI pakalpojumiem.
          </p>
        </div>

        {/* Stats row */}
        <div
          className="testimonials-stats"
          style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
            borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)",
            marginBottom: 56,
          }}
        >
          {[
            { val: "350+", label: "Aktīvi studenti Latvijā" },
            { val: "3 ned.", label: "Vidēji līdz pirmajam klientam" },
            { val: "94%", label: "Studentu apmierinātība" },
          ].map((s, i) => (
            <div key={i} style={{
              padding: "32px 24px", textAlign: "center",
              borderRight: i < 2 ? "1px solid var(--line)" : "none",
            }}>
              <div style={{ fontSize: 48, fontWeight: 900, fontFamily: "Inter Tight, sans-serif", letterSpacing: "-0.04em", color: i === 1 ? "var(--accent)" : "var(--ink)", lineHeight: 1 }}>
                {s.val}
              </div>
              <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 8 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Quote cards */}
        <div
          className="testimonials-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}
        >
          {quotes.map((q) => (
            <div
              key={q.name}
              className="lp-card"
              style={{
                background: "var(--bg-1)",
                border: "1px solid var(--line)",
                borderRadius: 24,
                padding: "28px 26px",
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--line-2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--line)";
              }}
            >
              <Stars />
              <p style={{ fontSize: 15, color: "var(--ink)", lineHeight: 1.65, margin: 0, fontStyle: "italic" }}>
                "{q.text}"
              </p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: 16, borderTop: "1px solid var(--line)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 999, flexShrink: 0,
                    background: "color-mix(in oklab, var(--accent) 14%, transparent)",
                    border: "1px solid color-mix(in oklab, var(--accent) 20%, transparent)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 13, fontWeight: 800, color: "var(--accent)",
                    fontFamily: "Inter Tight, sans-serif",
                  }}>
                    {q.initials}
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>{q.name}</div>
                    <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 1 }}>{q.role}</div>
                  </div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: "var(--accent)", letterSpacing: "-0.02em", fontFamily: "Inter Tight, sans-serif" }}>
                  {q.amt}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .testimonials-grid { grid-template-columns: 1fr !important; }
          .testimonials-stats { grid-template-columns: 1fr !important; }
          .testimonials-stats > div { border-right: none !important; border-bottom: 1px solid var(--line); }
          .testimonials-stats > div:last-child { border-bottom: none; }
        }
      `}</style>
    </section>
  );
}
