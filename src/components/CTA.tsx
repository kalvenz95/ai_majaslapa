"use client";

const trust = [
  "+ Latviešu valodā",
  "+ Praktiski kursi",
  "+ Gatavas veidnes",
  "+ Kopiena",
];

export default function CTA() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#00ff88] opacity-[0.04] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ff88]/20 to-transparent" />

      <div className="max-w-3xl mx-auto text-center relative">
        {/* Badge */}
        <div className="badge-neon mb-6 inline-block animate-glow-pulse">
          🚀 Sāc šodien
        </div>

        {/* Headline */}
        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-6" style={{ letterSpacing: "-0.02em" }}>
          Tavs pirmais klients{" "}
          <span className="gradient-text-green neon-text-green">sākas šeit</span>
        </h2>

        <p className="text-gray-400 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
          Izvēlies virzienu,<br />
          apgūsti prasmes<br />
          un pārvērt tās ienākumos.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a href="#pricing" className="btn-primary px-10 py-4 rounded-xl font-bold text-lg">
            Sākt bez maksas →
          </a>
          <a href="#courses" className="btn-secondary px-10 py-4 rounded-xl font-semibold text-lg">
            Skatīt visus kursus
          </a>
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 mb-14">
          {trust.map((item) => (
            <span key={item} className="hover:text-[#00ff88] transition-colors font-medium">{item}</span>
          ))}
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: "🎓", title: "Praktiski kursi", desc: "Apgūsti vienu pakalpojumu no A līdz Z" },
            { icon: "📋", title: "Gatavas veidnes", desc: "Piedāvājumi, ziņu skripti, onboarding" },
            { icon: "🤝", title: "Kopiena", desc: "Latvieši, kas strādā ar AI pakalpojumiem" },
          ].map((item) => (
            <div key={item.title} className="glass rounded-2xl p-5 text-center card-hover">
              <div className="text-3xl mb-2">{item.icon}</div>
              <div className="font-semibold text-white mb-1">{item.title}</div>
              <div className="text-xs text-gray-500">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
