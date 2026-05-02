"use client";

const incomeBlocks = [
  {
    icon: "📱",
    service: "Sociālie tīkli",
    range: "€800–€1 600",
    period: "/ mēn",
    color: "#a855f7",
    border: "rgba(168,85,247,0.22)",
    bg: "rgba(168,85,247,0.06)",
  },
  {
    icon: "💬",
    service: "WhatsApp automatizācija",
    range: "€1 000–€2 000",
    period: "/ mēn",
    color: "#00d4ff",
    border: "rgba(0,212,255,0.22)",
    bg: "rgba(0,212,255,0.06)",
  },
  {
    icon: "📞",
    service: "Balss aģenti",
    range: "€1 000–€3 000+",
    period: "/ mēn",
    color: "#00ff88",
    border: "rgba(0,255,136,0.22)",
    bg: "rgba(0,255,136,0.06)",
  },
];

export default function AILaunchpad() {
  return (
    <section className="py-20 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-4xl mx-auto">
        <div
          className="rounded-3xl p-8 md:p-12"
          style={{
            background: "linear-gradient(135deg, #0d0d1a, #0f0f20)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* Header */}
          <div className="text-center mb-10">
            <div className="badge-neon mb-4 inline-block">💰 Ienākumu piemērs</div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3" style={{ letterSpacing: "-0.02em" }}>
              2–3 klienti var izskatīties šādi
            </h2>
            <p className="text-gray-500 text-base max-w-md mx-auto">
              Šie ir pakalpojumi, par kuriem uzņēmumi jau maksā šodien.
            </p>
          </div>

          {/* Income cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {incomeBlocks.map((block) => (
              <div
                key={block.service}
                className="rounded-2xl p-6 text-center transition-all duration-300"
                style={{ background: block.bg, border: `1px solid ${block.border}` }}
              >
                <div className="text-3xl mb-3">{block.icon}</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest mb-3 font-semibold">
                  {block.service}
                </div>
                <div
                  className="font-black leading-none mb-1"
                  style={{ color: block.color, fontSize: "clamp(22px, 3.5vw, 36px)", wordBreak: "keep-all", whiteSpace: "nowrap" }}
                >
                  {block.range}
                </div>
                <div className="text-gray-500 text-sm">{block.period}</div>
              </div>
            ))}
          </div>

          {/* Summary text */}
          <div className="text-center mb-4 space-y-2">
            <p className="text-gray-300 text-base font-medium">
              Šie ir pakalpojumi, kurus uzņēmumi jau šobrīd meklē.
            </p>
            <p className="text-gray-400 text-sm">
              Tu apgūsti, kā tos izveidot un piedāvāt praksē.
            </p>
          </div>

          {/* Disclaimer */}
          <p className="text-center text-xs text-gray-600 max-w-lg mx-auto leading-relaxed">
            Rezultāti nav garantēti. Ienākumi atkarīgi no ieguldītā darba, piedāvājuma un klientu piesaistes.
          </p>
        </div>
      </div>
    </section>
  );
}
