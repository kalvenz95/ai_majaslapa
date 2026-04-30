"use client";
import Link from "next/link";

const directions = [
  {
    icon: "📱",
    title: "Sociālo tīklu pārvaldība",
    desc: "Veido video, vizuāļus un reklāmas saturu uzņēmumiem.",
    tags: ["AI video", "Reklāmas vizuāļi", "Postu dizains"],
    earn: "€300–€800/mēn",
    level: "Iesācējs",
    levelColor: "#00ff88",
    color: "#a855f7",
    border: "rgba(168,85,247,0.22)",
    glow: "rgba(168,85,247,0.12)",
    glowHover: "rgba(168,85,247,0.2)",
    link: "/kursi/satura-specialists",
  },
  {
    icon: "🌐",
    title: "Mājaslapas & automatizācija",
    desc: "Izveido modernu mājaslapu un automatizē klientu pieteikumus.",
    tags: ["Mājaslapas", "Klientu pieteikumi", "Automatizācija"],
    earn: "€500–€1500+",
    level: "Vidējs",
    levelColor: "#00d4ff",
    color: "#00d4ff",
    border: "rgba(0,212,255,0.22)",
    glow: "rgba(0,212,255,0.10)",
    glowHover: "rgba(0,212,255,0.18)",
    link: "/kursi/digitalais-specialists",
  },
  {
    icon: "📞",
    title: "Balss aģenti & WhatsApp",
    desc: "Automatizē zvanus un ziņas — komunikācija strādā 24/7.",
    tags: ["Balss aģenti", "WhatsApp", "Klientu komunikācija"],
    earn: "€1000–€3000+",
    level: "Premium",
    levelColor: "#f97316",
    color: "#f97316",
    border: "rgba(249,115,22,0.22)",
    glow: "rgba(249,115,22,0.10)",
    glowHover: "rgba(249,115,22,0.2)",
    link: "/kursi/ai-agentu-eksperts",
  },
];

export default function Services() {
  return (
    <section id="courses" className="py-24 px-6 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="badge-neon mb-4 inline-block">🎯 Virzieni</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ letterSpacing: "-0.02em" }}>
            Izvēlies savu{" "}
            <span style={{ background: "linear-gradient(90deg, #00ff88, #00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              virzienu
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-lg mx-auto">
            Sāc ar pakalpojumu, kas tev šķiet tuvākais, un apgūsti to soli pa solim.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {directions.map((d) => (
            <div
              key={d.title}
              className="relative rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 group cursor-pointer"
              style={{ background: "linear-gradient(135deg, #0d0d1a, #0f0f20)", border: `1px solid ${d.border}` }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 40px rgba(0,0,0,0.3), 0 0 40px ${d.glowHover}`;
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                (e.currentTarget as HTMLDivElement).style.transform = "";
              }}
            >
              {/* Glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(ellipse at 30% 0%, ${d.glowHover}, transparent 65%)` }}
              />

              {/* Icon + level */}
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background: `${d.color}15`, border: `1px solid ${d.color}30` }}>
                  {d.icon}
                </div>
                <span className="text-xs px-2.5 py-1 rounded-lg font-semibold"
                  style={{ background: `${d.levelColor}12`, border: `1px solid ${d.levelColor}25`, color: d.levelColor }}>
                  {d.level}
                </span>
              </div>

              {/* Title + desc */}
              <div>
                <h3 className="text-base font-bold text-white mb-2 leading-snug">{d.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{d.desc}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {d.tags.map((tag) => (
                  <span key={tag} className="text-[11px] px-2 py-0.5 rounded-md font-medium"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)" }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Bottom: earn + CTA */}
              <div className="flex items-center justify-between pt-3 mt-auto"
                style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <span className="text-sm font-bold" style={{ color: d.color }}>{d.earn}</span>
                <Link
                  href={d.link}
                  className="text-xs font-semibold uppercase tracking-wide flex items-center gap-1 transition-colors"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = d.color)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
                >
                  Skatīt kursu
                  <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
