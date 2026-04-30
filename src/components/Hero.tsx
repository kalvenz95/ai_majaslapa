"use client";

const bullets = [
  "Pieprasīti pakalpojumi",
  "Gatavi piedāvājumi",
  "Skaidrs ceļš līdz pirmajam klientam",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00d4ff] opacity-[0.05] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#00ff88] opacity-[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#0891b2] opacity-[0.03] rounded-full blur-3xl pointer-events-none" />

      {/* Badge */}
      <div className="badge-neon mb-8">
        🇱🇻 Latvijas pirmā AI monetizācijas platforma
      </div>

      {/* Headline */}
      <h1 className="text-center max-w-4xl mx-auto mb-6">
        <span className="block text-5xl md:text-6xl lg:text-7xl font-black leading-tight text-white" style={{ letterSpacing: "-0.02em" }}>
          Iemācies veidot AI pakalpojumus
        </span>
        <span className="block text-5xl md:text-6xl lg:text-7xl font-black leading-tight mt-1" style={{ letterSpacing: "-0.02em", background: "linear-gradient(90deg, #00ff88, #00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          un pelnīt ar tiem uzņēmumiem
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-center max-w-xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-8">
        Praktiska apmācība latviešu valodā.<br />
        Sāc ar vienu pakalpojumu un pārvērt to ienākumos.
      </p>

      {/* Bullets */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 items-center mb-10">
        {bullets.map((b) => (
          <div key={b} className="flex items-center gap-2">
            <span className="text-[#00ff88] font-black text-base">+</span>
            <span className="text-sm text-gray-300 font-medium">{b}</span>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 items-center mb-16">
        <a
          href="#pricing"
          className="btn-primary px-8 py-4 rounded-xl font-bold text-base"
        >
          Sākt bez maksas →
        </a>
        <a
          href="#courses"
          className="btn-secondary px-8 py-4 rounded-xl font-semibold text-base"
        >
          Skatīt kursus
        </a>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap justify-center gap-10">
        {[
          { number: "3", label: "AI pakalpojumu virzieni" },
          { number: "100%", label: "Praktisks saturs" },
          { number: "LV", label: "Latviešu valodā" },
          { number: "€0", label: "Sākt var bez pieredzes" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-3xl font-black gradient-text-green">{stat.number}</div>
            <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Floating cards */}
      <div className="absolute right-8 top-1/3 hidden xl:block" style={{ animation: "float 6s ease-in-out infinite" }}>
        <div className="glass rounded-2xl p-4 w-48">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-[#00ff88]" />
            <span className="text-xs text-gray-400">Jaunākais darījums</span>
          </div>
          <div className="text-2xl font-black text-white">€850</div>
          <div className="text-xs text-gray-500 mb-2">WhatsApp Bot · Rīga</div>
          <div className="h-1 rounded-full bg-gray-800">
            <div className="h-1 rounded-full bg-gradient-to-r from-[#00ff88] to-[#00d4ff]" style={{ width: "75%" }} />
          </div>
        </div>
      </div>

      <div className="absolute left-8 top-1/2 hidden xl:block" style={{ animation: "float 6s ease-in-out infinite 2s" }}>
        <div className="glass rounded-2xl p-4 w-52">
          <div className="text-xs text-gray-500 mb-2">✓ Pirmais klients</div>
          <div className="font-semibold text-white text-sm">AI Balss Aģents · Zobārsts</div>
          <div className="mt-2 badge-neon text-xs inline-block">+€1200/mēn</div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <span className="text-xs text-gray-500 uppercase tracking-widest">Ritini</span>
        <div className="w-0.5 h-8 bg-gradient-to-b from-[#00ff88] to-transparent" />
      </div>
    </section>
  );
}
