"use client";

const members = [
  {
    name: "Kalvis Ēnbergs",
    role: "Dibinātājs & AI Stratēģis",
    tag: "Vadītājs",
    desc: "7+ gadu pieredze digitālajā mārketingā. Palīdz uzņēmumiem integrēt AI ikdienas darbā un palielināt produktivitāti 3×.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=85&fit=crop&crop=face",
    accent: true,
  },
  {
    name: "Lauma Bērziņa",
    role: "Satura & AI Kursu Speciāliste",
    tag: "Kursi",
    desc: "Veido AI apmācību saturu, kas ir saprotams ikvienam — no nulles līdz profesionālim. Bijušā žurnāliste.",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=85&fit=crop&crop=face",
    accent: false,
  },
  {
    name: "Mārtiņš Ozols",
    role: "Tehnoloģiju vadītājs",
    tag: "Tech",
    desc: "Full-stack izstrādātājs ar aizraušanos ar AI automatizāciju. Izveido rīkus, kas tiešām darbojas uzņēmumu vidē.",
    photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=85&fit=crop&crop=face",
    accent: false,
  },
  {
    name: "Ilze Kalniņa",
    role: "Kopienas & Atbalsta vadītāja",
    tag: "Kopiena",
    desc: "Nodrošina, ka katrs students saņem atbildes uz saviem jautājumiem. Latvijas lielākās AI kopienas moderatore.",
    photo: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=85&fit=crop&crop=face",
    accent: false,
  },
];

export default function Team() {
  return (
    <section
      id="team"
      style={{
        padding: "120px 0",
        position: "relative",
        borderTop: "1px solid var(--line)",
        overflow: "hidden",
      }}
    >
      {/* subtle bg glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 60% 40% at 80% 50%, color-mix(in oklab, var(--accent) 5%, transparent), transparent 70%)",
        }}
      />

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 32px",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "end",
            marginBottom: 64,
          }}
          className="team-header-grid"
        >
          <div>
            <span className="v2-eyebrow">Chademy</span>
            <h2
              className="v2-h2"
              style={{
                fontSize: "clamp(40px, 6vw, 80px)",
                margin: "16px 0 0",
                maxWidth: "14ch",
                color: "var(--ink)",
              }}
            >
              Mūsu{" "}
              <span style={{ color: "var(--accent)" }}>
                komanda
              </span>
            </h2>
          </div>
          <div style={{ paddingBottom: 8 }}>
            <p
              style={{
                fontSize: 18,
                color: "var(--ink-2)",
                maxWidth: 480,
                lineHeight: 1.6,
              }}
            >
              Cilvēki aiz Chademy — praktiķi, kas paši ikdienā strādā ar AI un
              prot to izskaidrot vienkārši.
            </p>
          </div>
        </div>

        {/* cards grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 16,
          }}
          className="team-grid"
        >
          {members.map((m) => (
            <div
              key={m.name}
              className="lp-card"
              style={{
                border: "1px solid var(--line)",
                borderRadius: 22,
                background: "var(--bg-1)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "var(--line-2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "var(--line)";
              }}
            >
              {/* photo */}
              <div
                style={{
                  position: "relative",
                  aspectRatio: "4/3",
                  overflow: "hidden",
                  background: "var(--bg-2)",
                }}
              >
                <img
                  src={m.photo}
                  alt={m.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                  loading="lazy"
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 55%)",
                  }}
                />
                {/* tag badge */}
                <span
                  style={{
                    position: "absolute",
                    top: 14,
                    left: 14,
                    display: "inline-flex",
                    alignItems: "center",
                    fontFamily: "var(--font-sans)",
                    fontSize: 10,
                    padding: "4px 10px",
                    borderRadius: 999,
                    background: m.accent ? "var(--accent)" : "var(--bg-3)",
                    color: m.accent ? "var(--accent-ink)" : "var(--ink-3)",
                    border: m.accent ? "none" : "1px solid var(--line-2)",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                  }}
                >
                  {m.tag}
                </span>
              </div>

              {/* body */}
              <div style={{ padding: "22px 22px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.01em", color: "var(--ink)" }}>
                    {m.name}
                  </div>
                  <div style={{ fontSize: 12, color: "var(--accent)", marginTop: 3, fontFamily: "var(--font-sans)", fontWeight: 600, letterSpacing: "0.01em" }}>
                    {m.role}
                  </div>
                </div>
                <p style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.55, marginTop: "auto" }}>
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .team-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .team-header-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
        @media (max-width: 600px) {
          .team-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
