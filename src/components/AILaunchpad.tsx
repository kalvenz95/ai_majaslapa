"use client";

const steps = [
  {
    number: "01",
    title: "Izvēlies pakalpojumu",
    desc: "Sociālie mediji, balss aģenti, WhatsApp — izvēlies vienu un apgūsti to pilnībā.",
    color: "#00ff88",
  },
  {
    number: "02",
    title: "Izveido pirmo demo",
    desc: "Kursa laikā uzveido reālu piemēru, ko vari uzrādīt potenciālajam klientam.",
    color: "#00d4ff",
  },
  {
    number: "03",
    title: "Uzrunā pirmo klientu",
    desc: "Izmanto gatavos skriptus un cenu sarakstu — tu esi gatavs pārdot jau pēc pirmās nedēļas.",
    color: "#a855f7",
  },
];

export default function AILaunchpad() {
  return (
    <section className="py-28 px-6 relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#00ff88] opacity-[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#a855f7] opacity-[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ff88]/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-5xl mx-auto">
        {/* Badge */}
        <div className="flex justify-center mb-10">
          <div className="badge-neon">🚀 AI Launchpad</div>
        </div>

        {/* Quote */}
        <div className="relative text-center mb-20">
          {/* Decorative quote mark */}
          <div
            className="absolute -top-6 left-1/2 -translate-x-1/2 text-[120px] leading-none font-black select-none pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, rgba(0,255,136,0.12), transparent)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            "
          </div>

          <blockquote className="relative z-10">
            <p className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight text-balance">
              Pirmais klients nāk no{" "}
              <span
                className="neon-text-green"
                style={{
                  background: "linear-gradient(90deg, #00ff88, #00d4ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                darbības,
              </span>
              <br className="hidden md:block" />
              {" "}nevis no perfekta plāna.
            </p>
          </blockquote>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative rounded-2xl p-6 group transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #0d0d1a, #0f0f20)",
                border: `1px solid rgba(255,255,255,0.06)`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = `${step.color}30`;
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 20px 40px rgba(0,0,0,0.3), 0 0 30px ${step.color}15`;
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                (e.currentTarget as HTMLDivElement).style.transform = "";
              }}
            >
              <div
                className="text-5xl font-black mb-4 leading-none"
                style={{ color: step.color, opacity: 0.25 }}
              >
                {step.number}
              </div>
              <h3
                className="text-base font-bold mb-2"
                style={{ color: step.color }}
              >
                {step.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="#start"
            className="btn-primary inline-block px-10 py-4 rounded-xl font-bold text-lg"
          >
            Sākt darbību šodien →
          </a>
          <p className="mt-4 text-xs text-gray-600">
            Pirmā nedēļa bezmaksas · 14 dienu naudas atdošanas garantija
          </p>
        </div>
      </div>
    </section>
  );
}
