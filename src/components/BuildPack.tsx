"use client";

const buildModules = [
  {
    num: "01",
    title: "Website Chatbot",
    price: "€250–€900",
    retainer: "€150/mēn",
    icon: "🤖",
    steps: ["Veido chatbot demonstrāciju", "Pielāgo uzņēmuma balsij", "Uzstāda mājas lapā", "Apmāca klientu"],
  },
  {
    num: "02",
    title: "WhatsApp + Voice Agents",
    price: "€400–€1800",
    retainer: "€250/mēn",
    icon: "💬🎙️",
    steps: ["Uzstāda WhatsApp automatizāciju", "Izveido AI balss aģentu", "Integrē ar klienta numuru", "Testē un piegādā klientam"],
  },
  {
    num: "03",
    title: "CRM Automatizācija",
    price: "€400–€1000",
    retainer: "€250/mēn",
    icon: "⚡",
    steps: ["Auditē klienta procesu", "Izveido workflow", "Testa periods", "Nodod un apmāca"],
  },
];

export default function BuildPack() {
  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#a855f7]/30 to-transparent" />
      <div className="absolute -left-40 top-1/3 w-80 h-80 bg-[#a855f7] opacity-[0.05] rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full" style={{ background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.3)" }}>
            <span className="w-2 h-2 rounded-full bg-[#a855f7] animate-pulse" />
            <span className="text-[#a855f7] text-sm font-semibold uppercase tracking-wider">Build Pakete</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Augstvērtīgi pakalpojumi.{" "}
            <br />
            <span className="gradient-text-purple">Lielāki ienākumi.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Kad pamata kursi apgūti — pārej uz premium pakalpojumiem ar ikmēneša reteneru.
            Voice agents, WhatsApp bots, CRM automatizācija — tas ir nākamais līmenis.
          </p>
        </div>

        {/* Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {buildModules.map((mod) => (
            <div
              key={mod.num}
              className="glass rounded-2xl p-6 card-hover relative overflow-hidden group border border-white/5 hover:border-[#a855f7]/30"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#a855f7] opacity-0 group-hover:opacity-[0.04] rounded-full blur-2xl transition-opacity duration-500 pointer-events-none" />

              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.2)" }}>
                  {mod.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#a855f7]">{mod.num}</span>
                    <h3 className="font-bold text-white text-lg">{mod.title}</h3>
                  </div>
                </div>
              </div>

              {/* Steps */}
              <div className="flex flex-col gap-2 mb-4">
                {mod.steps.map((step, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                    <span className="w-5 h-5 rounded-full bg-[#a855f7]/15 text-[#a855f7] text-xs flex items-center justify-center flex-shrink-0 font-semibold">
                      {i + 1}
                    </span>
                    {step}
                  </div>
                ))}
              </div>

              <div className="neon-line mb-4" style={{ background: "linear-gradient(90deg, transparent, rgba(168,85,247,0.4), transparent)" }} />

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">Projekta cena</div>
                  <div className="font-bold text-white">{mod.price}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500 mb-0.5">Ikmēneša reteners</div>
                  <div className="font-bold text-[#a855f7]">{mod.retainer}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Path comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Beginner path */}
          <div className="glass rounded-2xl p-6 border border-[#00ff88]/15">
            <div className="badge-neon text-xs mb-4 inline-block">⚡ Ātrais ceļš</div>
            <h4 className="font-bold text-white text-lg mb-2">Pirmie €500 ar AI</h4>
            <p className="text-sm text-gray-400 mb-4">Iesācējiem. Ātri pārdodami pakalpojumi, minimāls laiks.</p>
            <div className="flex flex-col gap-2">
              {["AI Faceless Video", "AI Attēli sociālajiem medijiem", "Vienkāršs chatbot"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="text-[#00ff88]">→</span> {item}
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-sm text-gray-500">Sagaidāmais rezultāts</span>
              <span className="font-bold text-[#00ff88]">€300–€700/mēn</span>
            </div>
          </div>

          {/* Build path */}
          <div className="glass rounded-2xl p-6 border border-[#a855f7]/25" style={{ background: "rgba(168,85,247,0.03)" }}>
            <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold" style={{ background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.3)", color: "#a855f7" }}>
              💎 Build Pakete
            </div>
            <h4 className="font-bold text-white text-lg mb-2">Aģentūras ceļš</h4>
            <p className="text-sm text-gray-400 mb-4">Progresīviem. Lielāki projekti, ikmēneša reteners, skalēšana.</p>
            <div className="flex flex-col gap-2">
              {["WhatsApp + Voice Agents", "Website Chatbot", "CRM automatizācija", "Ikmēneša support reteners"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-gray-300">
                  <span className="text-[#a855f7]">→</span> {item}
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-sm text-gray-500">Sagaidāmais rezultāts</span>
              <span className="font-bold text-[#a855f7]">€1,500–€4,000/mēn</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
