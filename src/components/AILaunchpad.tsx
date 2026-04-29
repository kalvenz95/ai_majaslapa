"use client";

const directions = [
  {
    icon: "📱",
    title: "Sociālo tīklu pārvaldība",
    desc: "Veido video, vizuāļus un reklāmas saturu uzņēmumiem",
    color: "#a855f7",
    border: "rgba(168,85,247,0.2)",
  },
  {
    icon: "🌐",
    title: "Mājaslapas & automatizācija",
    desc: "Izveido modernu mājaslapu un automatizē klientu pieteikumus un komunikāciju",
    color: "#6633ee",
    border: "rgba(102,51,238,0.2)",
  },
  {
    icon: "📞",
    title: "Balss aģenti & WhatsApp",
    desc: "Automatizē zvanus un ziņas — uzņēmumu komunikācija darbojas 24/7",
    color: "#4f46e5",
    border: "rgba(79,70,229,0.2)",
  },
];

const steps = [
  {
    number: "01",
    icon: "🧭",
    title: "Izvēlies virzienu",
    desc: "Izvēlies pakalpojumu, kas tev šķiet interesantākais.",
    color: "#6633ee",
  },
  {
    number: "02",
    icon: "🛠️",
    title: "Apgūsti struktūru",
    desc: "Saproti, kā šis pakalpojums darbojas un kā to piedāvāt biznesiem.",
    color: "#7c3aed",
  },
  {
    number: "03",
    icon: "📋",
    title: "Sagatavo piemēru",
    desc: "Izveido savu pirmo demo, ko vari parādīt klientiem.",
    color: "#a855f7",
  },
  {
    number: "04",
    icon: "📩",
    title: "Izveido piedāvājumu",
    desc: "Izmanto gatavas veidnes un struktūras.",
    color: "#6633ee",
  },
  {
    number: "05",
    icon: "💰",
    title: "Sāc strādāt ar klientiem",
    desc: "Pielieto apgūto un uzsāc pirmās sadarbības.",
    color: "#4f46e5",
  },
];

const incomeBlocks = [
  {
    icon: "📱",
    service: "Sociālie tīkli",
    range: "€800 – €1 600",
    period: "/ mēn",
    color: "#a855f7",
    border: "rgba(168,85,247,0.2)",
    bg: "rgba(168,85,247,0.06)",
  },
  {
    icon: "💬",
    service: "WhatsApp automatizācija",
    range: "€1 000 – €2 000",
    period: "/ mēn",
    color: "#6633ee",
    border: "rgba(102,51,238,0.2)",
    bg: "rgba(102,51,238,0.06)",
  },
  {
    icon: "📞",
    service: "Balss aģenti",
    range: "€1 000 – €3 000+",
    period: "/ mēn",
    color: "#4f46e5",
    border: "rgba(79,70,229,0.2)",
    bg: "rgba(79,70,229,0.06)",
  },
];

export default function AILaunchpad() {
  return (
    <section className="py-28 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6633ee]/12 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/5 to-transparent" />

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="badge-neon mb-6 inline-block">🚀 AI Launchpad</div>
          <h2 className="text-4xl md:text-6xl font-black text-[#18181b] leading-tight mb-6 text-balance">
            No nulles līdz{" "}
            <span className="gradient-text-green">
              pirmajam klientam
            </span>
          </h2>
          <p className="text-[#52525b] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Strukturēta apmācība, kur tu apgūsti vienu pieprasītu pakalpojumu
            un sagatavojies darbam ar uzņēmumiem.
          </p>
        </div>

        {/* Directions label */}
        <div className="mb-6 text-center">
          <p className="text-[#71717a] text-sm uppercase tracking-widest font-semibold">
            Tu vari izvēlēties sev tuvāko virzienu
          </p>
        </div>

        {/* Directions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
          {directions.map((d) => (
            <div
              key={d.title}
              className="rounded-2xl p-6 transition-all duration-300 group cursor-pointer"
              style={{
                background: "rgba(255,255,255,0.82)",
                border: `1px solid ${d.border}`,
                backdropFilter: "blur(12px)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 16px 40px rgba(0,0,0,0.08), 0 0 32px rgba(102,51,238,0.1)`;
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                (e.currentTarget as HTMLDivElement).style.transform = "";
              }}
            >
              <div className="text-3xl mb-4">{d.icon}</div>
              <h3 className="font-bold text-[#18181b] text-base mb-2 leading-snug">{d.title}</h3>
              <p className="text-[#52525b] text-sm leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>

        {/* Steps */}
        <div className="mb-20">
          <p className="text-center text-[#71717a] text-sm uppercase tracking-widest font-semibold mb-10">
            Katrs virziens ir skaidrs ceļš — no pamatiem līdz pirmajam klientam
          </p>
          <div className="flex flex-col gap-0">
            {steps.map((step, idx) => (
              <div key={step.number} className="flex items-stretch gap-6 group">
                <div className="flex flex-col items-center flex-shrink-0 w-14">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `${step.color}12`,
                      border: `1px solid ${step.color}28`,
                      color: step.color,
                    }}
                  >
                    {step.number}
                  </div>
                  {idx < steps.length - 1 && (
                    <div
                      className="w-px flex-1 my-1"
                      style={{ background: `linear-gradient(to bottom, ${step.color}25, ${steps[idx + 1].color}15)` }}
                    />
                  )}
                </div>

                <div className={`pb-8 ${idx === steps.length - 1 ? "pb-0" : ""}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{step.icon}</span>
                    <h3 className="font-bold text-[#18181b] text-base">{step.title}</h3>
                  </div>
                  <p className="text-[#52525b] text-sm leading-relaxed max-w-lg">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Income Blocks */}
        <div
          className="rounded-3xl p-8 md:p-12"
          style={{
            background: "rgba(255,255,255,0.85)",
            border: "1px solid rgba(0,0,0,0.07)",
            backdropFilter: "blur(12px)",
          }}
        >
          <div className="text-center mb-10">
            <div className="badge-neon mb-4 inline-block">💰 Potenciālie ienākumi</div>
            <h3 className="text-2xl md:text-3xl font-black text-[#18181b] mb-3">
              2–3 klienti var izskatīties šādi
            </h3>
            <p className="text-[#71717a] text-sm max-w-md mx-auto">
              Šie ir pakalpojumi, par kuriem uzņēmumi jau maksā šodien.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {incomeBlocks.map((block) => (
              <div
                key={block.service}
                className="rounded-2xl p-6 text-center transition-all duration-300"
                style={{
                  background: block.bg,
                  border: `1px solid ${block.border}`,
                }}
              >
                <div className="text-3xl mb-3">{block.icon}</div>
                <div className="text-xs text-[#71717a] uppercase tracking-widest mb-3 font-semibold">
                  {block.service}
                </div>
                <div
                  className="text-3xl md:text-4xl font-black leading-none mb-1"
                  style={{ color: block.color }}
                >
                  {block.range}
                </div>
                <div className="text-[#71717a] text-sm">{block.period}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
