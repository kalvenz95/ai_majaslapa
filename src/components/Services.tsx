"use client";
import Link from "next/link";
import { Share2, Globe, Phone } from "lucide-react";

const directions = [
  {
    num: "01",
    title: "Sociālo tīklu pārvaldība",
    desc: "Veido video, vizuāļus un reklāmas saturu uzņēmumiem.",
    tags: ["AI video", "Reklāmas vizuāļi", "Postu dizains"],
    earn: "€300–€800/mēn",
    level: "Iesācējs",
    Icon: Share2,
    link: "/kursi/satura-specialists",
  },
  {
    num: "02",
    title: "Mājaslapas & automatizācija",
    desc: "Izveido modernu mājaslapu un automatizē klientu pieteikumus.",
    tags: ["Mājaslapas", "Klientu pieteikumi", "Automatizācija"],
    earn: "€500–€1500+",
    level: "Vidējs",
    Icon: Globe,
    link: "/kursi/digitalais-specialists",
  },
  {
    num: "03",
    title: "Balss aģenti & WhatsApp",
    desc: "Automatizē zvanus un ziņas — komunikācija strādā 24/7.",
    tags: ["Balss aģenti", "WhatsApp", "Klientu komunikācija"],
    earn: "€1000–€3000+",
    level: "Premium",
    Icon: Phone,
    link: "/kursi/ai-agentu-eksperts",
  },
];

export default function Services() {
  return (
    <section id="courses" style={{ padding: "96px 24px", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, var(--line-2), transparent)" }} />

      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="chip chip-dot" style={{ marginBottom: 16 }}>🎯 Virzieni</div>
          <h2 style={{ fontFamily: "Inter Tight, sans-serif", fontSize: "clamp(32px,5vw,48px)", fontWeight: 600, color: "var(--ink)", letterSpacing: "-0.03em", marginBottom: 16 }}>
            Izvēlies savu <span style={{ color: "var(--accent)" }}>virzienu</span>
          </h2>
          <p style={{ color: "var(--ink-3)", fontSize: 16, maxWidth: 480, margin: "0 auto", lineHeight: 1.6 }}>
            Sāc ar pakalpojumu, kas tev šķiet tuvākais, un apgūsti to soli pa solim.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {directions.map((d) => (
            <div
              key={d.title}
              className="card"
              style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16, transition: "border-color 0.15s, transform 0.15s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--line-2)"; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--line)"; (e.currentTarget as HTMLDivElement).style.transform = ""; }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ width: 40, height: 40, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", background: "color-mix(in oklab, var(--accent) 10%, transparent)", border: "1px solid color-mix(in oklab, var(--accent) 20%, transparent)" }}>
                  <d.Icon size={18} color="var(--accent)" />
                </div>
                <span className="chip" style={{ fontSize: 10 }}>{d.level}</span>
              </div>

              <div>
                <h3 style={{ fontFamily: "Inter Tight, sans-serif", fontSize: 18, fontWeight: 700, color: "var(--ink)", marginBottom: 8, letterSpacing: "-0.01em" }}>{d.title}</h3>
                <p style={{ fontSize: 14, color: "var(--ink-3)", lineHeight: 1.55 }}>{d.desc}</p>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {d.tags.map((tag) => (
                  <span key={tag} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 8, background: "var(--bg-2)", border: "1px solid var(--line)", color: "var(--ink-3)", fontFamily: "JetBrains Mono, monospace" }}>
                    {tag}
                  </span>
                ))}
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 12, marginTop: "auto", borderTop: "1px solid var(--line)" }}>
                <span style={{ fontSize: 14, fontWeight: 700, color: "var(--accent)", fontFamily: "Inter Tight, sans-serif" }}>{d.earn}</span>
                <Link href={d.link} style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--ink-3)", textDecoration: "none", fontFamily: "JetBrains Mono, monospace", transition: "color 0.15s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-3)")}>
                  Skatīt kursu →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
