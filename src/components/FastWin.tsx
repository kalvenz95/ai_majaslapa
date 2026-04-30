"use client";

const steps = [
  { step: "01", title: "Izvēlies virzienu", desc: "Sociālie tīkli, automatizācija vai balss aģenti.", icon: "🧭", color: "#00ff88" },
  { step: "02", title: "Izveido demo", desc: "Reāls piemērs uzņēmumam.", icon: "🛠️", color: "#00d4ff" },
  { step: "03", title: "Sagatavo piedāvājumu", desc: "Gatavas veidnes un struktūra.", icon: "📋", color: "#a855f7" },
  { step: "04", title: "Uzrunā uzņēmumus", desc: "Vienkārši teksti un pieeja.", icon: "📩", color: "#f97316" },
  { step: "05", title: "Noslēdz darījumu", desc: "Pirmais klients un ienākums.", icon: "💰", color: "#00ff88" },
];

export default function FastWin() {
  return (
    <section id="start" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ff88]/20 to-transparent" />
      <div className="absolute -left-32 top-1/2 w-64 h-64 bg-[#00d4ff] opacity-[0.03] rounded-full blur-3xl" />

      <div className="max-w-3xl mx-auto text-center">

        {/* Hook quote */}
        <div className="mb-10">
          <p className="text-gray-500 text-base md:text-lg italic leading-relaxed border-l-2 border-[#00ff88]/40 pl-4 text-left max-w-lg mx-auto">
            "Pirmais klients nāk no darbības,<br />
            nevis no perfekta plāna."
          </p>
        </div>

        {/* Header */}
        <div className="badge-neon mb-5 inline-block">🚀 Ceļvedis</div>
        <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-5" style={{ letterSpacing: "-0.02em" }}>
          No nulles līdz{" "}
          <span style={{ background: "linear-gradient(90deg, #00ff88, #00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            pirmajam klientam
          </span>
        </h2>
        <p className="text-gray-400 text-lg mb-14 max-w-xl mx-auto leading-relaxed">
          Strukturēta apmācība, kur apgūsti vienu pieprasītu pakalpojumu
          un sagatavojies darbam ar uzņēmumiem.
        </p>

        {/* Steps */}
        <div className="flex flex-col gap-0 text-left max-w-lg mx-auto mb-12">
          {steps.map((s, i) => (
            <div key={s.step} className="flex items-stretch gap-5 group">
              {/* Number + connector */}
              <div className="flex flex-col items-center flex-shrink-0 w-12">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                  style={{ background: `${s.color}18`, border: `1px solid ${s.color}35`, color: s.color }}
                >
                  {s.step}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className="w-px flex-1 my-1"
                    style={{ background: `linear-gradient(to bottom, ${s.color}30, ${steps[i + 1].color}20)` }}
                  />
                )}
              </div>

              {/* Content */}
              <div className={`pb-7 pt-1 flex-1 ${i === steps.length - 1 ? "pb-0" : ""}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{s.icon}</span>
                  <h3 className="font-bold text-white text-base">{s.title}</h3>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <a href="#courses" className="btn-primary inline-flex px-8 py-4 rounded-xl font-bold text-base">
          Skatīt virzienus →
        </a>
      </div>
    </section>
  );
}
