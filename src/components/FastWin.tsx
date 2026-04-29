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
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6633ee]/15 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: content */}
          <div>
            <div className="badge-neon mb-4 inline-block"><E id="fastwin-badge">⚡ AI Launchpad</E></div>
            <h2 className="text-4xl md:text-5xl font-black text-[#18181b] leading-tight mb-6">
              <E id="fastwin-h2-1">No nulles līdz</E>{" "}
              <br />
              <span className="gradient-text-green"><E id="fastwin-h2-accent">pirmajam klientam</E></span>
              <br />
              <span className="text-2xl md:text-3xl font-semibold text-[#52525b]"><E id="fastwin-h2-days">14 dienās.</E></span>
            </h2>
            <p className="text-[#52525b] text-lg mb-8 leading-relaxed">
              <E id="fastwin-subtitle">Strukturēts iesācēju ceļš — no pirmās nodarbības līdz nosūtītajam piedāvājumam. Bez teorijas. Tikai soļi, kas strādā Latvijā.</E>
            </p>

            {/* Steps */}
            <div className="flex flex-col gap-2">
              {steps.map((s, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border border-[#6633ee]/20"
                      style={{ background: "rgba(102,51,238,0.06)" }}>
                      {s.icon}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-px h-6 bg-gradient-to-b from-[#6633ee]/20 to-transparent mt-1" />
                    )}
                  </div>
                  <div className="pb-3 pt-1 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-[#6633ee] font-black font-mono tracking-wider">{s.step}</span>
                      <h3 className="font-bold text-[#18181b] text-base leading-tight"><E id={`step-${i}-title`}>{s.title}</E></h3>
                      <span className="text-xs text-[#9ca3af] ml-auto font-mono shrink-0">{s.time}</span>
                    </div>
                    <p className="text-sm text-[#52525b] leading-relaxed"><E id={`step-${i}-desc`}>{s.desc}</E></p>
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

          {/* Right */}
          <div className="flex flex-col gap-4">
            {/* Niches */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">🎯</span>
                <h3 className="font-bold text-[#18181b]">Mērķa tirgi Latvijā</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {niches.map((n) => (
                  <div key={n} className="flex items-center gap-2 py-1.5 px-3 rounded-lg border border-black/5 hover:border-[#6633ee]/25 hover:text-[#6633ee] transition-all cursor-default"
                    style={{ background: "rgba(0,0,0,0.02)" }}>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#6633ee] opacity-40 shrink-0" />
                    <span className="text-sm text-[#374151]">{n}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Income calc */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg">💡</span>
                <h3 className="font-bold text-[#18181b]">Ienākumu piemērs</h3>
              </div>
              <div className="flex flex-col gap-1.5 mb-3">
                {[
                  { label: "AI Video · 2 klienti", val: "€400" },
                  { label: "Sociālie tīkli · 2 klienti", val: "€700" },
                  { label: "WhatsApp Bot · 2 klienti", val: "€600" },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between items-center py-2 border-b border-black/5 last:border-0">
                    <span className="text-sm text-[#52525b]">{r.label}</span>
                    <span className="text-sm font-bold text-[#6633ee]">{r.val}/mēn</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-sm font-semibold text-[#18181b]">Kopā</span>
                <span className="text-2xl font-black gradient-text-green">€1 700/mēn</span>
              </div>
            </div>

            {/* Quote */}
            <div className="glass rounded-2xl p-4 border-l-2 border-[#6633ee]">
              <p className="text-[#374151] text-sm italic leading-relaxed">
                "Pēc 3 nedēļām ieguvu pirmo klientu — restorānu Rīgā. €350 par chatbot. Tagad 4 klienti."
              </p>
              <div className="mt-2 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#6633ee] to-[#4f46e5] flex items-center justify-center text-xs font-bold text-white shrink-0">M</div>
                <span className="text-xs text-[#71717a]">Mārtiņš, 24 — Rīga</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
