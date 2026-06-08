"use client";

const projects = [
  {
    tag: "Mājaslapa",
    title: "AI mājaslapa uzņēmumam",
    desc: "Moderna lapa ar AI integrācijām — gatava dažu dienu laikā.",
    price: "no 400€",
    photo: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=900&auto=format&fit=crop&q=80",
    color: "var(--accent)",
  },
  {
    tag: "Sociālie tīkli",
    title: "Mēneša satura pakete",
    desc: "Vizuāļi, teksti un publicēšanas grafiks, veidots ar AI rīkiem.",
    price: "no 350€",
    photo: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=900&auto=format&fit=crop&q=80",
    color: "var(--accent-2)",
  },
  {
    tag: "Automatizācija",
    title: "WhatsApp automatizācija",
    desc: "Automātiskas atbildes un pieteikumu apstrāde uzņēmumam.",
    price: "no 500€",
    photo: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=900&auto=format&fit=crop&q=80",
    color: "var(--accent-3)",
  },
  {
    tag: "Balss AI",
    title: "AI balss aģents",
    desc: "Zvanu pieņemšana un rezervācijas — bez cilvēka iesaistes.",
    price: "no 600€",
    photo: "https://images.unsplash.com/photo-1581092919535-f0c69ed1ed99?w=900&auto=format&fit=crop&q=80",
    color: "var(--accent)",
  },
  {
    tag: "Reklāma",
    title: "AI reklāmu vizuāļi",
    desc: "Bildes un video reklāmām, kas piesaista uzmanību un pārdod.",
    price: "no 300€",
    photo: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=900&auto=format&fit=crop&q=80",
    color: "var(--accent-2)",
  },
  {
    tag: "Portfolio",
    title: "Tavs personīgais portfolio",
    desc: "Darbu krājums, kas palīdz iegūt pirmos klientus jau kursa laikā.",
    price: "iekļauts kursā",
    photo: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=900&auto=format&fit=crop&q=80",
    color: "var(--accent-3)",
  },
];

export default function ProjectExamples() {
  return (
    <section id="examples" style={{ padding: "120px 24px", position: "relative", borderTop: "1px solid var(--line)", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", width: 760, height: 360, background: "color-mix(in oklab, var(--accent-2) 5%, transparent)", filter: "blur(100px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 56px" }}>
          <div className="chip chip-dot" style={{ marginBottom: 20, display: "inline-flex" }}>Portfolio piemēri</div>
          <h2 style={{ fontFamily: "Inter Tight, sans-serif", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.1, color: "var(--ink)", marginBottom: 16, fontSize: "clamp(28px, 5vw, 52px)" }}>
            Ko iespējams <span style={{ color: "var(--accent)" }}>izveidot</span>
          </h2>
          <p style={{ fontSize: 17, color: "var(--ink-2)", lineHeight: 1.6 }}>
            Reāli projekti, kurus vari piedāvāt klientiem jau pirmajos mēnešos.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="examples-grid">
          {projects.map((p) => (
            <div
              key={p.title}
              className="card"
              style={{
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease, box-shadow 0.25s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(-6px)";
                el.style.borderColor = "color-mix(in oklab, var(--accent) 28%, var(--line))";
                el.style.boxShadow = "0 24px 60px -20px rgba(17,17,17,0.16)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(0)";
                el.style.borderColor = "var(--line)";
                el.style.boxShadow = "none";
              }}
            >
              <div style={{ position: "relative", aspectRatio: "16/11", overflow: "hidden", background: "var(--bg-2)" }}>
                <img src={p.photo} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,10,0.55) 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(160deg, color-mix(in oklab, ${p.color} 26%, transparent) 0%, transparent 55%)`, mixBlendMode: "multiply" }} />
                <span style={{ position: "absolute", top: 14, left: 14, display: "inline-flex", alignItems: "center", fontFamily: "Inter Tight, sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "5px 11px", borderRadius: 999, background: "rgba(255,255,255,0.92)", color: "var(--ink)" }}>
                  {p.tag}
                </span>
                <span style={{ position: "absolute", bottom: 14, right: 14, display: "inline-flex", alignItems: "center", fontFamily: "Inter Tight, sans-serif", fontSize: 12, fontWeight: 700, padding: "6px 12px", borderRadius: 999, background: p.color, color: "white" }}>
                  {p.price}
                </span>
              </div>

              <div style={{ padding: "20px 22px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.015em", color: "var(--ink)", marginBottom: 8 }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.55 }}>
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .examples-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .examples-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
