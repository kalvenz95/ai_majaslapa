"use client";

import { useTranslations } from "next-intl";

/** Three "we do it for you" pillars — flips the burden from student to Chademy. */
const pillars = [
  {
    no: "01",
    over: "Mēs iemācīsim",
    icon: "🎓",
    accent: "var(--accent)",
    tint: "color-mix(in oklab, var(--accent) 12%, transparent)",
    title: "Tev tikai jāskatās un jāatkārto",
    desc: "Soli pa solim video latviešu valodā. Bez priekšzināšanām un bez programmēšanas — sākam no pilnīgas nulles.",
    points: ["Viss no nulles", "Latviešu valodā", "Savā tempā"],
  },
  {
    no: "02",
    over: "Mēs parādīsim",
    icon: "📋",
    accent: "var(--accent-2)",
    tint: "color-mix(in oklab, var(--accent-2) 14%, transparent)",
    title: "Gatavas veidnes — nekas nav jāizdomā",
    desc: "Reāli piemēri, precīzi ziņu skripti un cenu piedāvājumi. Tu vienkārši pielāgo savam vārdam un izmanto.",
    points: ["Gatavas veidnes", "Ziņu skripti", "Cenu piedāvājumi"],
  },
  {
    no: "03",
    over: "Mēs visu izdarīsim kopā",
    icon: "🤝",
    accent: "var(--accent-3)",
    tint: "color-mix(in oklab, var(--accent-3) 18%, transparent)",
    title: "Pie pirmā klienta — kopā ar tevi",
    desc: "Palīdzam uzstādīt rīkus, atrast pirmo klientu un pabeigt pirmo projektu. Tu nepaliec viens nevienā solī.",
    points: ["Pirmais klients", "Rīku uzstādīšana", "Atbalsts visu laiku"],
  },
];

/** What's tiny: the student's actual effort. */
const yourPart = [
  { n: "1", label: "Skaties", sub: "īsas video nodarbības" },
  { n: "2", label: "Atkārto", sub: "ar gatavām veidnēm" },
  { n: "3", label: "Pelni", sub: "no pirmā klienta" },
];

export default function FastWin() {
  const t = useTranslations("FastWin");

  return (
    <section id="how" style={{ padding: "120px 0", background: "#FFFFFF", borderTop: "1px solid var(--line)" }}>
      <div className="lp-container" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 64px" }}>
          <span
            style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              padding: "7px 14px", borderRadius: 999,
              background: "color-mix(in oklab, var(--accent) 10%, transparent)",
              border: "1px solid color-mix(in oklab, var(--accent) 22%, transparent)",
              color: "var(--accent)", fontSize: 12.5, fontWeight: 700,
              letterSpacing: "0.02em", marginBottom: 22,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--accent)" }} />
            Tev jādara minimums
          </span>

          <h2 style={{
            fontSize: "clamp(40px, 6.5vw, 76px)",
            fontWeight: 900,
            fontFamily: "Inter Tight, sans-serif",
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            color: "var(--ink)",
            margin: "0 0 20px",
          }}>
            Tev nekas nav jāzina iepriekš.<br />
            <span style={{ color: "var(--accent)" }}>Pārējo izdarīsim mēs.</span>
          </h2>
          <p style={{ fontSize: 18, color: "var(--ink-3)", lineHeight: 1.65, maxWidth: 560, margin: "0 auto" }}>
            Tu nesāc viens un neapmaldies. Mēs tevi vedam pie rokas — no pirmās nodarbības līdz pirmajam apmaksātajam klientam.
          </p>
        </div>

        {/* 3 pillars */}
        <div className="fastwin-pillars" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {pillars.map((p) => (
            <article
              key={p.no}
              style={{
                background: "var(--bg)",
                border: "1px solid var(--line)",
                borderRadius: 24,
                padding: "32px 28px 30px",
                display: "flex",
                flexDirection: "column",
                gap: 18,
                position: "relative",
                overflow: "hidden",
                boxShadow: "var(--shadow-md)",
                transition: "border-color 0.22s ease, transform 0.22s ease, box-shadow 0.22s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = `color-mix(in oklab, ${p.accent} 45%, transparent)`;
                el.style.transform = "translateY(-6px)";
                el.style.boxShadow = `0 26px 60px -22px color-mix(in oklab, ${p.accent} 55%, transparent), 0 6px 16px -8px rgba(17,17,17,0.08)`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--line)";
                el.style.transform = "";
                el.style.boxShadow = "var(--shadow-md)";
              }}
            >
              {/* top accent bar */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: p.accent }} />

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div
                  style={{
                    width: 56, height: 56, borderRadius: 16,
                    background: p.tint,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 28,
                  }}
                >
                  {p.icon}
                </div>
                <span style={{
                  fontSize: 34, fontWeight: 900, fontFamily: "Inter Tight, sans-serif",
                  letterSpacing: "-0.04em", color: "color-mix(in oklab, var(--ink) 12%, transparent)",
                }}>
                  {p.no}
                </span>
              </div>

              <div>
                <div style={{
                  fontSize: 13, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase",
                  color: p.accent, marginBottom: 8,
                }}>
                  {p.over}
                </div>
                <h3 style={{
                  fontSize: 21, fontWeight: 800, fontFamily: "Inter Tight, sans-serif",
                  color: "var(--ink)", margin: "0 0 10px", letterSpacing: "-0.02em", lineHeight: 1.2,
                }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: 14.5, color: "var(--ink-3)", lineHeight: 1.6, margin: 0 }}>
                  {p.desc}
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 9, marginTop: "auto", paddingTop: 6 }}>
                {p.points.map((pt) => (
                  <div key={pt} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{
                      width: 18, height: 18, borderRadius: 999, flexShrink: 0,
                      background: p.tint,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <svg width="11" height="11" viewBox="0 0 14 14" fill="none" style={{ color: p.accent }}>
                        <path d="M3 7.5L6 10.5L11 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "var(--ink-2)" }}>{pt}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* "Your only job" minimal band */}
        <div
          className="fastwin-yourpart"
          style={{
            marginTop: 20,
            background: "var(--ink)",
            borderRadius: 24,
            padding: "36px 40px",
            display: "grid",
            gridTemplateColumns: "auto 1px repeat(3, 1fr)",
            alignItems: "center",
            gap: 32,
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div style={{
            position: "absolute", top: -60, right: -40, width: 280, height: 280,
            background: "radial-gradient(circle, color-mix(in oklab, var(--accent) 40%, transparent) 0%, transparent 70%)",
            pointerEvents: "none",
          }} />

          <div style={{ position: "relative" }}>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--accent-3)", marginBottom: 8 }}>
              Tavs vienīgais uzdevums
            </div>
            <div style={{ fontSize: 26, fontWeight: 900, fontFamily: "Inter Tight, sans-serif", letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.1 }}>
              Tikai 3 lietas.<br />Pārējais ir mūsu ziņā.
            </div>
          </div>

          <div className="fastwin-divider" style={{ width: 1, height: 64, background: "rgba(255,255,255,0.12)" }} />

          {yourPart.map((y) => (
            <div key={y.n} style={{ position: "relative" }}>
              <div style={{
                width: 38, height: 38, borderRadius: 11,
                background: "color-mix(in oklab, var(--accent) 24%, transparent)",
                border: "1px solid color-mix(in oklab, var(--accent) 40%, transparent)",
                color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 900, fontSize: 16, fontFamily: "Inter Tight, sans-serif", marginBottom: 12,
              }}>
                {y.n}
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, fontFamily: "Inter Tight, sans-serif", color: "#fff", letterSpacing: "-0.02em", marginBottom: 3 }}>
                {y.label}
              </div>
              <div style={{ fontSize: 13.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.45 }}>
                {y.sub}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 18, marginTop: 48 }}>
          <a href="#courses" className="btn-primary" style={{ textDecoration: "none", fontSize: 16, padding: "16px 32px" }}>
            {t("cta")}
          </a>
          <div className="fastwin-reassure" style={{ display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap", justifyContent: "center" }}>
            {["Bez priekšzināšanām", "Latviešu valodā", "Atbalsts visu ceļu"].map((r) => (
              <span key={r} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13.5, color: "var(--ink-3)", fontWeight: 500 }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ color: "var(--accent-2)" }}>
                  <path d="M3 7.5L6 10.5L11 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {r}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .fastwin-pillars { grid-template-columns: 1fr !important; gap: 14px !important; }
          .fastwin-yourpart {
            grid-template-columns: 1fr 1fr !important;
            gap: 24px !important;
            padding: 28px 24px !important;
          }
          .fastwin-yourpart > div:first-child { grid-column: 1 / -1 !important; }
          .fastwin-divider { display: none !important; }
        }
        @media (max-width: 480px) {
          .fastwin-yourpart { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
