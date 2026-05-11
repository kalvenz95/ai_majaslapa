"use client";
import Link from "next/link";

const tracks = [
  {
    num: "01 · IESĀCĒJS",
    level: "3–5 ned.",
    title: "Sociālo tīklu pārvaldība",
    desc: "Apgūsti vispārējas SMM prasmes un veido AI video, vizuāļus un reklāmas saturu uzņēmumiem — bez kameras, bez pieredzes.",
    skills: ["SMM pārvaldība", "Faceless video", "AI bildes", "Postu dizains", "Reklāmas"],
    earn: "€300–€800",
    earnSuffix: "/mēn",
    img: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=900&auto=format&fit=crop&q=80",
    link: "/kursi/satura-specialists",
  },
  {
    num: "02 · VIDĒJS",
    level: "5–8 ned.",
    title: "Mājaslapas & chatboti",
    desc: "Iemācies veidot mājaslapas ar mākslīgā intelekta palīdzību, pievienot chatbotus, kas atbild klientiem 24/7, automatizēt pieteikumu plūsmu un veidot profesionālas prezentācijas ar MI.",
    skills: ["Mājaslapa ar MI", "Chatboti", "Klientu piesaiste", "Automatizācija", "Prezentācijas ar MI"],
    earn: "€500–€1 500",
    earnSuffix: "+",
    img: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=900&auto=format&fit=crop&q=80",
    link: "/kursi/digitalais-specialists",
  },
  {
    num: "03 · PREMIUM",
    level: "6–10 ned.",
    title: "Balss aģenti & WhatsApp",
    desc: "Automatizē klientu zvanus un ziņas — augstvērtīgi pakalpojumi ar lielāko peļņas potenciālu.",
    skills: ["Voice agenti", "WhatsApp", "Vapi", "Vonage"],
    earn: "€1 000–€3 000",
    earnSuffix: "+",
    img: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=900&auto=format&fit=crop&q=80",
    link: "/kursi/ai-agentu-eksperts",
  },
];

export default function Services() {
  return (
    <section id="courses" className="lp-section" style={{ padding: "120px 0", position: "relative", borderTop: "1px solid var(--line)" }}>
      <div className="lp-container" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        {/* Header */}
        <div className="lp-header-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "end", marginBottom: 64 }}>
          <div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.15em", color: "var(--ink-3)", textTransform: "uppercase" as const }}>
              <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--accent)" }} />
              Trīs virzieni
            </span>
            <h2 style={{ fontSize: "clamp(40px, 6vw, 84px)", lineHeight: 1.05, letterSpacing: "-0.035em", fontWeight: 600, margin: "16px 0 0", maxWidth: "14ch" }}>
              Izvēlies, ko pārdot{" "}
              <span style={{ background: "linear-gradient(120deg, var(--accent), color-mix(in oklab, var(--accent) 70%, white))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", fontStyle: "italic", fontFamily: "Fraunces, Georgia, serif", fontWeight: 500 }}>
                uzņēmumiem
              </span>
            </h2>
          </div>
          <div style={{ paddingBottom: 8 }}>
            <p style={{ fontSize: 18, color: "var(--ink-2)", maxWidth: 640, lineHeight: 1.5 }}>
              Katrs virziens — ar pieprasītiem pakalpojumiem, kuriem ir reāls pieprasījums Latvijas un Eiropas tirgū.
            </p>
          </div>
        </div>

        {/* Track cards */}
        <div className="lp-three-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {tracks.map((t) => (
            <article key={t.title} style={{ border: "1px solid var(--line)", borderRadius: 28, background: "var(--bg-1)", overflow: "hidden", display: "flex", flexDirection: "column", transition: "transform 0.3s ease, border-color 0.3s ease" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.borderColor = "var(--line-2)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.borderColor = "var(--line)"; }}>
              {/* Image */}
              <div style={{ aspectRatio: "5/3", position: "relative", overflow: "hidden", background: "var(--bg-3)" }}>
                <img src={t.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--bg-1) 0%, transparent 40%)", pointerEvents: "none" }} />
                <span style={{ position: "absolute", top: 18, left: 18, zIndex: 2, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(10px)", color: "white", fontFamily: "JetBrains Mono, monospace", fontSize: 11, padding: "6px 12px", borderRadius: 999, letterSpacing: "0.1em", fontWeight: 600 }}>{t.num}</span>
                <span style={{ position: "absolute", top: 18, right: 18, zIndex: 2, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(10px)", color: "white", fontSize: 11, padding: "6px 12px", borderRadius: 999, fontWeight: 500 }}>{t.level}</span>
              </div>
              {/* Body */}
              <div style={{ padding: "24px 26px 26px", flex: 1, display: "flex", flexDirection: "column" }}>
                <h3 style={{ fontSize: 26, letterSpacing: "-0.02em", fontWeight: 600, margin: "0 0 10px", lineHeight: 1.1 }}>{t.title}</h3>
                <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.55, margin: "0 0 22px" }}>{t.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
                  {t.skills.map((s) => (
                    <span key={s} style={{ padding: "5px 11px", borderRadius: 999, fontSize: 11, border: "1px solid var(--line-2)", color: "var(--ink-2)", fontFamily: "JetBrains Mono, monospace" }}>{s}</span>
                  ))}
                </div>
                <div style={{ marginTop: "auto", paddingTop: 18, borderTop: "1px solid var(--line)" }}>
                  <Link href={t.link} style={{ fontSize: 13, color: "var(--accent)", fontWeight: 600, display: "inline-flex", gap: 6, alignItems: "center", textDecoration: "none" }}>
                    Skatīt kursu →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
