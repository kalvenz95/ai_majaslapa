"use client";

import { useState } from "react";

const categories = [
  {
    label: "🤖 AI Assistenti",
    color: "#7c3aed",
    tools: [
      { name: "ChatGPT", desc: "Skripting & Sales", icon: "💬" },
      { name: "Claude", desc: "AI rakstīšana", icon: "🤖" },
      { name: "Perplexity", desc: "AI Meklēšana", icon: "🔍" },
      { name: "Jasper", desc: "Mārketinga teksti", icon: "🖊️" },
      { name: "Copy.ai", desc: "AI Teksts", icon: "✍️" },
    ],
  },
  {
    label: "⚡ Automatizācija",
    color: "#6366f1",
    tools: [
      { name: "Make.com", desc: "Visual workflow", icon: "⚡" },
      { name: "n8n", desc: "Workflow Builder", icon: "🔗" },
      { name: "Zapier", desc: "App integrācijas", icon: "🔌" },
      { name: "Airtable", desc: "Datu bāze", icon: "📊" },
      { name: "Notion AI", desc: "AI Darbvieta", icon: "📝" },
    ],
  },
  {
    label: "🎬 AI Video & Attēli",
    color: "#ec4899",
    tools: [
      { name: "Midjourney", desc: "AI Attēli", icon: "🎨" },
      { name: "Runway", desc: "AI Video", icon: "🎬" },
      { name: "HeyGen", desc: "Avatar Video", icon: "👤" },
      { name: "Pika Labs", desc: "Video ģenerēšana", icon: "✨" },
      { name: "Synthesia", desc: "Video avatāri", icon: "🎭" },
      { name: "Sora", desc: "AI Video", icon: "🎥" },
      { name: "Stable Diffusion", desc: "AI Attēli", icon: "🖼️" },
      { name: "Adobe Firefly", desc: "AI Radošums", icon: "🔥" },
    ],
  },
  {
    label: "🔊 AI Balss & Chat",
    color: "#06b6d4",
    tools: [
      { name: "Vapi", desc: "Voice Agents", icon: "🎙️" },
      { name: "ElevenLabs", desc: "AI Balss", icon: "🔊" },
      { name: "Manychat", desc: "Chat automācija", icon: "💌" },
      { name: "Vonage", desc: "LV numuri", icon: "📞" },
      { name: "Twilio", desc: "SMS & Zvani", icon: "📲" },
    ],
  },
  {
    label: "📣 Mārketings & SEO",
    color: "#10b981",
    tools: [
      { name: "Buffer", desc: "Sociālie tīkli", icon: "📱" },
      { name: "Surfer SEO", desc: "SEO Optimizācija", icon: "🌊" },
      { name: "ActiveCampaign", desc: "E-pasta mārketings", icon: "📧" },
      { name: "Typeform", desc: "Viedās formas", icon: "📋" },
    ],
  },
  {
    label: "💳 Bizness & Maksājumi",
    color: "#f59e0b",
    tools: [
      { name: "Stripe", desc: "Maksājumi", icon: "💳" },
      { name: "Calendly", desc: "Tikšanās booking", icon: "📅" },
      { name: "Canva AI", desc: "AI Dizains", icon: "🖌️" },
      { name: "Figma AI", desc: "UI/UX Dizains", icon: "🎯" },
      { name: "Descript", desc: "Audio/Video edit", icon: "✂️" },
    ],
  },
];

const row1 = categories.flatMap((c) => c.tools).slice(0, 16);
const row2 = categories.flatMap((c) => c.tools).slice(16);

export default function Tools() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="tools" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d0d1a]/60 to-transparent pointer-events-none" />

      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-10">
          <div className="badge-neon mb-4 inline-block">🛠️ Rīki</div>
          <h2
            className="text-3xl md:text-4xl font-black text-white mb-3"
            style={{ letterSpacing: "-0.02em" }}
          >
            Rīki, kurus{" "}
            <span className="gradient-text-cyan neon-text-cyan">izmantosi kursā</span>
          </h2>
          <p className="text-gray-400 text-sm">
            Praktiski rīki, kas palīdz izveidot AI pakalpojumus, automatizācijas un saturu uzņēmumiem.
          </p>
        </div>

        {/* Dropdown accordion */}
        <div className="space-y-2">
          {categories.map((cat, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="rounded-2xl border border-white/10 overflow-hidden"
                style={{
                  background: isOpen
                    ? `linear-gradient(135deg, ${cat.color}14, ${cat.color}06)`
                    : "rgba(255,255,255,0.03)",
                  boxShadow: isOpen ? `0 0 0 1px ${cat.color}30` : "none",
                  transition: "background 0.3s, box-shadow 0.3s",
                }}
              >
                {/* Header */}
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ background: cat.color, boxShadow: `0 0 6px ${cat.color}` }}
                    />
                    <span className="text-white font-semibold text-sm">{cat.label}</span>
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                      style={{ background: `${cat.color}20`, color: cat.color }}
                    >
                      {cat.tools.length}
                    </span>
                  </div>
                  <svg
                    className="w-4 h-4 text-gray-400 shrink-0"
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)",
                    }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Tools list */}
                <div
                  style={{
                    maxHeight: isOpen ? `${cat.tools.length * 56 + 16}px` : "0px",
                    overflow: "hidden",
                    transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)",
                  }}
                >
                  <div className="px-4 pb-4 space-y-1">
                    {cat.tools.map((tool) => (
                      <div
                        key={tool.name}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                        style={{ background: "rgba(255,255,255,0.04)" }}
                      >
                        <span className="text-base w-7 text-center">{tool.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-white">{tool.name}</div>
                          <div className="text-xs text-gray-500">{tool.desc}</div>
                        </div>
                        <div
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ background: cat.color, opacity: 0.6 }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full-width double marquee */}
      <div className="relative mt-16 space-y-3">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#050508] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#050508] to-transparent z-10 pointer-events-none" />

        <div className="overflow-hidden">
          <div
            className="flex gap-3 whitespace-nowrap w-max"
            style={{ animation: "marqueeScroll 22s linear infinite" }}
          >
            {[...row1, ...row1].map((tool, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/8 shrink-0"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <span className="text-sm">{tool.icon}</span>
                <span className="text-xs font-medium text-gray-300">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex gap-3 whitespace-nowrap w-max"
            style={{ animation: "marqueeReverse 18s linear infinite" }}
          >
            {[...row2, ...row2].map((tool, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/8 shrink-0"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <span className="text-sm">{tool.icon}</span>
                <span className="text-xs font-medium text-gray-300">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
