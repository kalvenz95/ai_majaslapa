"use client";

const directions = [
  {
    icon: "📱",
    title: "Sociālo tīklu pārvaldība",
    desc: "Veido video, vizuāļus un reklāmas saturu uzņēmumiem",
    color: "#a855f7",
    border: "rgba(168,85,247,0.2)",
    glow: "rgba(168,85,247,0.12)",
  },
  {
    icon: "🌐",
    title: "Mājaslapas & automatizācija",
    desc: "Izveido modernu mājaslapu un automatizē klientu pieteikumus un komunikāciju",
    color: "#00d4ff",
    border: "rgba(0,212,255,0.2)",
    glow: "rgba(0,212,255,0.10)",
  },
  {
    icon: "📞",
    title: "Balss aģenti & WhatsApp",
    desc: "Automatizē zvanus un ziņas — uzņēmumu komunikācija darbojas 24/7",
    color: "#00ff88",
    border: "rgba(0,255,136,0.2)",
    glow: "rgba(0,255,136,0.10)",
  },
];

const steps = [
  {
    number: "01",
    icon: "🧭",
    title: "Izvēlies virzienu",
    desc: "Izvēlies pakalpojumu, kas tev šķiet interesantākais.",
    color: "#00ff88",
  },
  {
    number: "02",
    icon: "🛠️",
    title: "Apgūsti struktūru",
    desc: "Saproti, kā šis pakalpojums darbojas un kā to piedāvāt biznesiem.",
    color: "#00d4ff",
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
    color: "#f97316",
  },
  {
    number: "05",
    icon: "💰",
    title: "Sāc strādāt ar klientiem",
    desc: "Pielieto apgūto un uzsāc pirmās sadarbības.",
    color: "#00ff88",
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
    color: "#00d4ff",
    border: "rgba(0,212,255,0.2)",
    bg: "rgba(0,212,255,0.06)",
  },
  {
    icon: "📞",
    service: "Balss aģenti",
    range: "€1 000 – €3 000+",
    period: "/ mēn",
    color: "#00ff88",
    border: "rgba(0,255,136,0.2)",
    bg: "rgba(0,255,136,0.06)",
  },
];

export default function AILaunchpad() {
  return (
    <section className="py-28 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ff88]/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#00ff88] opacity-[0.025] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto">

        {/* ── HEADER ── */}
        <div className="text-center mb-16">
          <div className="badge-neon mb-6 inline-block">🚀 AI Launchpad</div>
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6 text-balance">
            No nulles līdz{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #00ff88, #00d4ff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              pirmajam klientam
            </span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Strukturēta apmācība, kur tu apgūsti vienu pieprasītu pakalpojumu
            un sagatavojies darbam ar uzņēmumiem.
          </p>
        </div>

        {/* ── DIRECTIONS ── */}
        <div className="mb-6 text-center">
          <p className="text-gray-500 text-sm uppercase tracking-widest font-semibold">
            Tu vari izvēlēties sev tuvāko virzienu
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
          {directions.map((d) => (
            <div
              key={d.title}
              className="rounded-2xl p-6 transition-all duration-300 group cursor-pointer"
              style={{
                background: `linear-gradient(135deg, #0d0d1a, #0f0f20)`,
                border: `1px solid ${d.border}`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 40px rgba(0,0,0,0.3), 0 0 40px ${d.glow}`;
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                (e.currentTarget as HTMLDivElement).style.transform = "";
              }}
            >
              <div className="text-3xl mb-4">{d.icon}</div>
              <h3 className="font-bold text-white text-base mb-2 leading-snug">{d.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{d.desc}</p>
            </div>
          ))}
        </div>

        {/* ── STEPS ── */}
        <div className="mb-20">
          <p className="text-center text-gray-500 text-sm uppercase tracking-widest font-semibold mb-10">
            Katrs virziens ir skaidrs ceļš — no pamatiem līdz pirmajam klientam
          </p>
          <div className="flex flex-col gap-0">
            {steps.map((step, idx) => (
              <div key={step.number} className="flex items-stretch gap-6 group">
                {/* Left: number + connector */}
                <div className="flex flex-col items-center flex-shrink-0 w-14">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `${step.color}18`,
                      border: `1px solid ${step.color}35`,
                      color: step.color,
                    }}
                  >
                    {step.number}
                  </div>
                  {idx < steps.length - 1 && (
                    <div
                      className="w-px flex-1 my-1"
                      style={{ background: `linear-gradient(to bottom, ${step.color}30, ${steps[idx + 1].color}20)` }}
                    />
                  )}
                </div>

                {/* Right: content */}
                <div className={`pb-8 ${idx === steps.length - 1 ? "pb-0" : ""}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{step.icon}</span>
                    <h3 className="font-bold text-white text-base">{step.title}</h3>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed max-w-lg">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── INCOME BLOCKS ── */}
        <div
          className="rounded-3xl p-8 md:p-12"
          style={{
            background: "linear-gradient(135deg, #0d0d1a, #0f0f20)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="text-center mb-10">
            <div className="badge-neon mb-4 inline-block">💰 Potenciālie ienākumi</div>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
              2–3 klienti var izskatīties šādi
            </h3>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
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
                <div className="text-xs text-gray-500 uppercase tracking-widest mb-3 font-semibold">
                  {block.service}
                </div>
                <div
                  className="text-3xl md:text-4xl font-black leading-none mb-1"
                  style={{ color: block.color }}
                >
                  {block.range}
                </div>
                <div className="text-gray-500 text-sm">{block.period}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
