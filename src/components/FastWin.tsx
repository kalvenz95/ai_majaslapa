"use client";

import { useTranslations } from "next-intl";

const steps = [
  { num: "1", title: "Izvēlies virzienu", desc: "Atrodi sev piemērotāko pakalpojumu." },
  { num: "2", title: "Apgūsti prasmi", desc: "Video, piemēri un veidnes." },
  { num: "3", title: "Izveido portfolio", desc: "Parādi klientiem savu darbu." },
  { num: "4", title: "Atrodi klientus", desc: "Gatavi skripti un uzrunas." },
  { num: "5", title: "Sāc pelnīt", desc: "Attīsti savu pakalpojumu." },
];

export default function FastWin() {
  const t = useTranslations("FastWin");

  return (
    <section id="how" style={{ padding: "120px 0", background: "#FFFFFF", borderTop: "1px solid var(--line)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 72px" }}>
          <h2 style={{
            fontSize: "clamp(42px, 7vw, 80px)",
            fontWeight: 900,
            fontFamily: "Inter Tight, sans-serif",
            letterSpacing: "-0.04em",
            lineHeight: 1.06,
            color: "var(--ink)",
            margin: "0 0 20px",
          }}>
            Kā tas <span style={{ color: "var(--accent)" }}>strādā?</span>
          </h2>
          <p style={{ fontSize: 18, color: "var(--ink-3)", lineHeight: 1.65 }}>
            Skaidrs ceļš no nulles līdz pirmajam klientam.
          </p>
        </div>

        {/* Steps */}
        <div className="fastwin-steps" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
          {steps.map((s, i) => (
            <div
              key={s.num}
              style={{
                background: "var(--bg)",
                border: "1px solid var(--line)",
                borderRadius: 20,
                padding: "28px 22px 26px",
                display: "flex",
                flexDirection: "column",
                gap: 14,
                position: "relative",
                transition: "border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "color-mix(in oklab, var(--accent) 35%, transparent)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 40px -16px rgba(17,17,17,0.10)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "var(--line)";
                (e.currentTarget as HTMLElement).style.transform = "";
                (e.currentTarget as HTMLElement).style.boxShadow = "";
              }}
            >
              {i === 0 && (
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "var(--accent)", borderRadius: "20px 20px 0 0" }} />
              )}
              <div style={{
                fontSize: 28, fontWeight: 900, fontFamily: "Inter Tight, sans-serif",
                letterSpacing: "-0.03em",
                color: i === 0 ? "var(--accent)" : "var(--ink-3)",
              }}>
                {s.num}.
              </div>
              <div>
                <h4 style={{ fontSize: 17, fontWeight: 800, fontFamily: "Inter Tight, sans-serif", color: "var(--ink)", margin: "0 0 7px", letterSpacing: "-0.01em" }}>
                  {s.title}
                </h4>
                <p style={{ fontSize: 13.5, color: "var(--ink-3)", lineHeight: 1.55, margin: 0 }}>
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 48 }}>
          <a href="#courses" className="btn-primary" style={{ textDecoration: "none", fontSize: 16, padding: "16px 32px" }}>
            {t("cta")}
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .fastwin-steps { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
        }
        @media (max-width: 480px) {
          .fastwin-steps { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
