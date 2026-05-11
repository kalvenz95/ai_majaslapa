"use client";

const steps = [
  { num: "01", title: "Izvēlies virzienu", desc: "Saturs, mājaslapas vai balss aģenti — sāc ar to, kas tev tuvāks.", img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&auto=format&fit=crop&q=80" },
  { num: "02", title: "Apgūsti prasmi", desc: "Praktiskas nodarbības, video un veidnes latviešu valodā.", img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80" },
  { num: "03", title: "Izveido demo", desc: "Reāls darba piemērs, ko vari rādīt potenciālajiem klientiem.", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80" },
  { num: "04", title: "Uzrunā uzņēmumus", desc: "Gatavas veidnes ziņām, e-pastiem un sarunām.", img: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=600&auto=format&fit=crop&q=80" },
  { num: "05", title: "Noslēdz darījumu", desc: "Pirmais klients un pirmais ienākums no AI pakalpojuma.", img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&auto=format&fit=crop&q=80" },
];

export default function FastWin() {
  return (
    <section id="how" className="lp-section" style={{ padding: "120px 0", position: "relative", borderTop: "1px solid var(--line)" }}>
      <div className="lp-container" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        {/* Header */}
        <div className="lp-header-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "end", marginBottom: 72 }}>
          <div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.15em", color: "var(--ink-3)", textTransform: "uppercase" as const }}>
              <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--accent)" }} />
              Soli pa solim
            </span>
            <h2 style={{ fontSize: "clamp(40px, 6vw, 84px)", lineHeight: 1.05, letterSpacing: "-0.035em", fontWeight: 600, margin: "16px 0 0", maxWidth: "14ch" }}>
              No nulles līdz{" "}
              <span style={{ background: "linear-gradient(120deg, var(--accent), color-mix(in oklab, var(--accent) 70%, white))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", fontStyle: "italic", fontFamily: "Fraunces, Georgia, serif", fontWeight: 500 }}>
                pirmajam klientam
              </span>
            </h2>
          </div>
          <div style={{ paddingBottom: 8 }}>
            <p style={{ fontSize: 18, color: "var(--ink-2)", maxWidth: 640, lineHeight: 1.5 }}>
              5 skaidri soļi. Katrā solī apgūsti vienu prasmi un sagatavojies darbam ar uzņēmumiem.
            </p>
          </div>
        </div>

        {/* Roadmap */}
        <div style={{ position: "relative" }}>
          {/* Horizontal connector line */}
          <div className="lp-steps-connector" style={{ position: "absolute", left: 0, right: 0, top: 28, height: 1, background: "linear-gradient(to right, transparent, var(--line-2) 8%, var(--line-2) 92%, transparent)", zIndex: 0 }} />

          <div className="lp-five-steps" style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 24, position: "relative", zIndex: 1 }}>
            {steps.map((s) => (
              <div key={s.num} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Circle */}
                <div style={{
                  width: 56, height: 56, borderRadius: 999,
                  background: "var(--accent)",
                  border: "1px solid var(--accent)",
                  display: "grid", placeItems: "center",
                  fontFamily: "JetBrains Mono, monospace", fontSize: 18, fontWeight: 700,
                  color: "var(--accent-ink)",
                  boxShadow: "0 0 0 8px var(--bg), 0 0 0 12px color-mix(in oklab, var(--accent) 30%, transparent)",
                  flexShrink: 0,
                }}>
                  {s.num}
                </div>
                {/* Image box */}
                <div style={{ aspectRatio: "4/3", borderRadius: 14, overflow: "hidden", background: "var(--bg-2)", border: "1px solid var(--line)" }}>
                  <img src={s.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
                </div>
                <h4 style={{ fontSize: 18, fontWeight: 600, margin: "4px 0 0", letterSpacing: "-0.01em" }}>{s.title}</h4>
                <p style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.5, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
