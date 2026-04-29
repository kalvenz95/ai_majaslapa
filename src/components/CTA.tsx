"use client";
import E from "@/components/E";

export default function CTA() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6633ee]/15 to-transparent" />

      <div className="max-w-4xl mx-auto text-center relative">
        {/* Badge */}
        <div className="badge-neon mb-6 inline-block">
          <E id="cta-badge">🚀 Sāc šodien — bezmaksas pirmā nedēļa</E>
        </div>

        {/* Headline */}
        <h2 className="text-4xl md:text-6xl font-black text-[#18181b] leading-tight mb-6">
          <E id="cta-h2-1">Tavi pirmie</E>{" "}
          <span className="gradient-text-green"><E id="cta-h2-accent">€500 ar AI</E></span>
          <br />
          <E id="cta-h2-end">sākas šeit.</E>
        </h2>

        <p className="text-[#52525b] text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          <E id="cta-para">Pievienojies simtiem latvijas iedzīvotāju, kas jau pārdod AI pakalpojumus reāliem uzņēmumiem. Kursi latviešu valodā. Praktisks saturs. Reāli ienākumi.</E>
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a
            href="#pricing"
            className="btn-primary px-10 py-4 rounded-xl font-bold text-lg"
          >
            <E id="cta-btn-1">Sākt bezmaksas →</E>
          </a>
          <a
            href="#courses"
            className="btn-secondary px-10 py-4 rounded-xl font-semibold text-lg"
          >
            <E id="cta-btn-2">Skatīt visus kursus</E>
          </a>
        </div>

        {/* Trust signals */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-[#71717a]">
          {[
            "✓ Latviešu valodā",
            "✓ AI jaunākie produkti",
            "✓ 2026. gada aprīlis",
            "✓ 14 dienu garantija",
          ].map((item) => (
            <span key={item} className="hover:text-[#18181b] transition-colors">{item}</span>
          ))}
        </div>

        {/* Final social proof */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { icon: "🎓", title: "8 Praktisko kursu", desc: "No video līdz voice agents" },
            { icon: "📋", title: "50+ Veidnes", desc: "Gatavi skripti un piedāvājumi" },
            { icon: "🤝", title: "Kopiena", desc: "Aktīvi studenti no Latvijas" },
          ].map((item) => (
            <div key={item.title} className="glass rounded-2xl p-5 text-center card-hover">
              <div className="text-3xl mb-2">{item.icon}</div>
              <div className="font-semibold text-[#18181b] mb-1">{item.title}</div>
              <div className="text-xs text-[#71717a]">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
