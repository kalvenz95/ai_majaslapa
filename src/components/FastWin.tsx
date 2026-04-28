"use client";
import E from "@/components/E";

const steps = [
  { step: "01", title: "Izvēlies pakalpojumu", desc: "Faceless video vai AI attēli — ātri apgūstami, augsts pieprasījums.", time: "1 d.", icon: "🎯" },
  { step: "02", title: "Izveido demo", desc: "Reāls piemērs vietējam uzņēmumam — zobārstniecībai vai restorānam.", time: "2–3 d.", icon: "🛠️" },
  { step: "03", title: "Nosūti piedāvājumu", desc: "Gatavi cenu un piedāvājumu template. Copy-paste, pielāgo, sūti.", time: "1 d.", icon: "📋" },
  { step: "04", title: "Kontaktē 10 biznesi", desc: "Gatavas ziņu veidnes — tikai aizpildi vārdu un nosūti.", time: "2 d.", icon: "📩" },
  { step: "05", title: "Noslēdz darījumu", desc: "Pirmie €300–€800. Pievieno ikmēneša atbalstu un sāc augt.", time: "1–2 ned.", icon: "💰" },
];

const niches = [
  "Zobārstniecība", "Skaistumkopšana", "Restorāni", "E-komercija",
  "Auto serviss", "Nekustamais īpašums", "Medicīna", "Sporta zāles",
  "Coaching", "Vietējie pakalpojumi",
];

export default function FastWin() {
  return (
    <section id="start" className="py-24 px-6 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ff88]/30 to-transparent" />
      <div className="absolute -left-32 top-1/2 w-64 h-64 bg-[#00ff88] opacity-[0.04] rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: content */}
          <div>
            <div className="badge-neon mb-4 inline-block"><E id="fastwin-badge">⚡ AI Launchpad</E></div>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
              <E id="fastwin-h2-1">No nulles līdz</E>{" "}
              <br />
              <span className="gradient-text-green"><E id="fastwin-h2-accent">pirmajam klientam</E></span>
              <br />
              <span className="text-2xl md:text-3xl font-semibold text-gray-400"><E id="fastwin-h2-days">14 dienās.</E></span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              <E id="fastwin-subtitle">Strukturēts iesācēju ceļš — no pirmās nodarbības līdz nosūtītajam piedāvājumam. Bez teorijas. Tikai soļi, kas strādā Latvijā.</E>
            </p>

            {/* Steps */}
            <div className="flex flex-col gap-2">
              {steps.map((s, i) => (
                <div key={i} className="flex gap-4 items-start">
                  {/* Icon + connector */}
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border border-[#00ff88]/25"
                      style={{ background: "rgba(0,255,136,0.07)" }}>
                      {s.icon}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-px h-6 bg-gradient-to-b from-[#00ff88]/25 to-transparent mt-1" />
                    )}
                  </div>
                  {/* Text */}
                  <div className="pb-3 pt-1 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-[#00ff88] font-black font-mono tracking-wider">{s.step}</span>
                      <h3 className="font-bold text-white text-base leading-tight"><E id={`step-${i}-title`}>{s.title}</E></h3>
                      <span className="text-xs text-gray-600 ml-auto font-mono shrink-0">{s.time}</span>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed"><E id={`step-${i}-desc`}>{s.desc}</E></p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#pricing"
              className="mt-8 btn-primary inline-flex px-8 py-4 rounded-xl font-bold text-lg"
            >
              Sākt tagad →
            </a>
          </div>

          {/* Right: target niches */}
          <div>
            <div className="glass rounded-3xl p-8">
              <h3 className="font-bold text-white text-xl mb-2">🎯 Mērķa tirgi Latvijā</h3>
              <p className="text-gray-500 text-sm mb-6">Šie uzņēmumi maksā par AI pakalpojumiem visvairāk:</p>

              <div className="flex flex-wrap gap-2 mb-8">
                {niches.map((n) => (
                  <span key={n} className="px-3 py-1.5 rounded-full glass text-sm text-gray-300 border border-white/5 hover:border-[#00ff88]/30 hover:text-[#00ff88] transition-all cursor-default">
                    {n}
                  </span>
                ))}
              </div>

              <div className="neon-line mb-6" />

              {/* Income calculator preview */}
              <h4 className="font-semibold text-white mb-4">💡 Ienākumu kalkulators</h4>
              <div className="flex flex-col gap-3">
                {[
                  { service: "AI Video (2 klienti)", price: "€400/mēn" },
                  { service: "Chatbot (3 klienti)", price: "€900/mēn" },
                  { service: "WhatsApp Bot (2 klienti)", price: "€600/mēn" },
                ].map((item) => (
                  <div key={item.service} className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-sm text-gray-400">{item.service}</span>
                    <span className="text-sm font-bold text-[#00ff88]">{item.price}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-2">
                  <span className="font-semibold text-white">Kopā</span>
                  <span className="text-xl font-black gradient-text-green">€1,900/mēn</span>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="mt-4 glass rounded-2xl p-5 border-l-2 border-[#00ff88]">
              <p className="text-gray-300 text-sm italic">
                "Pēc 3 nedēļām Chademy ieguvu pirmo klientu — restorānu Rīgā. €350 par chatbot. Tagad strādāju ar 4 klientiem."
              </p>
              <div className="mt-3 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#00ff88] to-[#00d4ff] flex items-center justify-center text-xs font-bold text-black">M</div>
                <span className="text-xs text-gray-500">Mārtiņš, 24 — Rīga</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
