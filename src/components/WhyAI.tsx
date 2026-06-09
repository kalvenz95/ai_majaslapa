"use client";
import { TrendingDown, Cpu, Briefcase, Banknote } from "lucide-react";

const points = [
  {
    num: "01",
    Icon: Briefcase,
    title: "Pieprasīta prasme biznesā",
    desc: "AI zināšanas kļūst par obligātu prasību daudzos amatos un nozarēs — gan privātajā, gan valsts sektorā.",
  },
  {
    num: "02",
    Icon: Cpu,
    title: "Praktisks pielietojums uzņēmumos",
    desc: "Apgūsti rīkus, ko reāli uzņēmumi lieto jau šodien — ne teoriju, bet konkrētus darba procesus.",
  },
  {
    num: "03",
    Icon: TrendingDown,
    title: "Nav nepieciešama programmēšana",
    desc: "Sāc no nulles — bez jebkādas tehniskas pieredzes vai IT fona. Pietiek ar vēlmi mācīties.",
  },
  {
    num: "04",
    Icon: Banknote,
    title: "Iespēja veidot pakalpojumus klientiem",
    desc: "Pārvērt AI prasmes papildu ienākumos vai pilna laika darbā — piedāvājot pakalpojumus uzņēmumiem.",
  },
];

export default function WhyAI() {
  return (
    <section style={{ position: "relative", padding: "96px 24px", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "10%", right: "0%", width: 600, height: 500, background: "color-mix(in oklab, var(--accent) 6%, transparent)", filter: "blur(120px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", left: "0%", width: 400, height: 400, background: "color-mix(in oklab, var(--accent-2) 5%, transparent)", filter: "blur(100px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1180, margin: "0 auto", position: "relative" }}>

        {/* Header */}
        <div style={{ marginBottom: 56, maxWidth: 680 }}>
          <div className="chip chip-dot" style={{ marginBottom: 22 }}>AI prasmes biznesam</div>
          <h2 style={{ fontFamily: "Inter Tight, sans-serif", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1.1, color: "var(--ink)", marginBottom: 18, fontSize: "clamp(30px, 4.5vw, 54px)" }}>
            Uzņēmumiem vajag cilvēkus,<br />
            kas prot izmantot{" "}
            <span style={{ color: "var(--accent)" }}>AI praksē</span>
          </h2>
          <p style={{ fontSize: 17, color: "var(--ink-2)", lineHeight: 1.65, maxWidth: 560 }}>
            AI kļūst par vienu no pieprasītākajām prasmēm biznesā — tā palīdz uzņēmumiem{" "}
            <span style={{ color: "var(--accent)", fontWeight: 600 }}>samazināt izmaksas</span> un{" "}
            <span style={{ color: "var(--accent-2)", fontWeight: 600 }}>iegūt vairāk klientu</span>.
          </p>
        </div>

        {/* 2×2 large feature grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="whyai-cards-grid">
          {points.map((p) => (
            <div
              key={p.num}
              style={{
                position: "relative",
                padding: "36px 36px 32px",
                borderRadius: 24,
                background: "var(--bg-2)",
                border: "1px solid var(--line)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              {/* large faded number */}
              <span style={{
                position: "absolute",
                right: 20,
                top: 16,
                fontSize: 88,
                fontWeight: 800,
                letterSpacing: "-0.06em",
                lineHeight: 1,
                color: "color-mix(in oklab, var(--accent) 9%, transparent)",
                pointerEvents: "none",
                userSelect: "none",
                fontFamily: "Inter Tight, sans-serif",
              }}>{p.num}</span>

              {/* icon */}
              <div style={{
                width: 60,
                height: 60,
                borderRadius: 18,
                background: "color-mix(in oklab, var(--accent) 13%, transparent)",
                border: "1px solid color-mix(in oklab, var(--accent) 28%, transparent)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                <p.Icon size={26} color="var(--accent)" />
              </div>

              {/* text */}
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.2, marginBottom: 10, color: "var(--ink)" }}>
                  {p.title}
                </div>
                <div style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.65 }}>
                  {p.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: 44 }}>
          <a href="#courses" className="btn-primary" style={{ textDecoration: "none" }}>
            Skatīt, kā tas strādā →
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .whyai-cards-grid { grid-template-columns: 1fr !important; gap: 14px !important; }
        }
      `}</style>
    </section>
  );
}
