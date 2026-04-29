"use client";

const tools = [
  { name: "Vapi", desc: "Voice Agents", icon: "🎙️", color: "#ff6b35" },
  { name: "Make.com", desc: "Automatizācija", icon: "⚡", color: "#6366f1" },
  { name: "n8n", desc: "Workflow Builder", icon: "🔗", color: "#ef4444" },
  { name: "Claude", desc: "AI rakstīšana", icon: "🤖", color: "#7c3aed" },
  { name: "ChatGPT", desc: "Skripting & Sales", icon: "💬", color: "#10b981" },
  { name: "Vonage", desc: "LV numuri", icon: "📞", color: "#f59e0b" },
  { name: "Midjourney", desc: "AI Attēli", icon: "🎨", color: "#ec4899" },
  { name: "Runway", desc: "AI Video", icon: "🎬", color: "#8b5cf6" },
  { name: "ElevenLabs", desc: "AI Balss", icon: "🔊", color: "#06b6d4" },
  { name: "Pika Labs", desc: "Video ģenerēšana", icon: "✨", color: "#84cc16" },
  { name: "HeyGen", desc: "Avatar Video", icon: "👤", color: "#f97316" },
  { name: "Manychat", desc: "Chat automācija", icon: "💌", color: "#3b82f6" },
];

export default function Tools() {
  return (
    <section id="tools" className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d0d1a] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="badge-neon mb-4 inline-block">🛠️ AI Rīku Direktorijs</div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            Instrumenti, kurus <span className="gradient-text-cyan neon-text-cyan">tu apgūsi</span>
          </h2>
          <p className="text-gray-400">Visi rīki, kas nepieciešami profesionālai AI pakalpojumu piegādei</p>
        </div>

        {/* Tools grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="glass rounded-xl p-4 text-center card-hover group cursor-default"
            >
              <div
                className="w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center text-xl"
                style={{ background: `${tool.color}20`, border: `1px solid ${tool.color}30` }}
              >
                {tool.icon}
              </div>
              <div className="text-sm font-semibold text-white">{tool.name}</div>
              <div className="text-xs text-gray-500 mt-0.5">{tool.desc}</div>
            </div>
          ))}
        </div>

        {/* Marquee strip */}
        <div className="mt-16 relative overflow-hidden py-4">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050508] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050508] to-transparent z-10" />
          <div
            className="flex gap-8 whitespace-nowrap"
            style={{ animation: "marqueeScroll 30s linear infinite" }}
          >
            {["AI Video", "Chatbot", "Voice Agent", "WhatsApp Bot", "Automācija", "AI Attēli", "Sales Scripts", "Proposal Builder", "Income Calculator", "Client Finder",
              "AI Video", "Chatbot", "Voice Agent", "WhatsApp Bot", "Automācija", "AI Attēli", "Sales Scripts", "Proposal Builder"
            ].map((item, i) => (
              <span key={i} className="text-gray-600 font-medium text-sm">
                {item} <span className="text-[#00ff88]/30 mx-4">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
