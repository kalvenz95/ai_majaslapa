"use client";
import { useState } from "react";

const categories = [
  {
    label: "🤖 AI Assistenti",
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
    tools: [
      { name: "Buffer", desc: "Sociālie tīkli", icon: "📱" },
      { name: "Surfer SEO", desc: "SEO Optimizācija", icon: "🌊" },
      { name: "ActiveCampaign", desc: "E-pasta mārketings", icon: "📧" },
      { name: "Typeform", desc: "Viedās formas", icon: "📋" },
    ],
  },
  {
    label: "💳 Bizness & Maksājumi",
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
    <section id="tools" style={{ padding: "80px 0", position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div className="chip chip-dot" style={{ marginBottom: 16 }}>🛠️ Rīki</div>
          <h2 style={{ fontFamily: "Inter Tight, sans-serif", fontSize: "clamp(28px,4vw,40px)", fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.02em", marginBottom: 12 }}>
            Rīki, kurus{" "}
            <span style={{ color: "var(--accent)" }}>izmantosi kursā</span>
          </h2>
          <p style={{ color: "var(--ink-3)", fontSize: 14, lineHeight: 1.6 }}>
            Praktiski rīki, kas palīdz izveidot AI pakalpojumus, automatizācijas un saturu uzņēmumiem.
          </p>
        </div>

        {/* Accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {categories.map((cat, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className="card"
                style={{
                  overflow: "hidden",
                  borderColor: isOpen ? "var(--line-2)" : "var(--line)",
                  background: isOpen ? "var(--bg-2)" : "var(--bg-1)",
                  transition: "background 0.2s ease, border-color 0.2s ease",
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", textAlign: "left", background: "none", border: "none", cursor: "pointer" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 6, height: 6, borderRadius: 999, background: isOpen ? "var(--accent)" : "var(--ink-4)", flexShrink: 0 }} />
                    <span style={{ color: "var(--ink)", fontWeight: 600, fontSize: 14 }}>{cat.label}</span>
                    <span className="chip" style={{ fontSize: 10, padding: "2px 8px" }}>{cat.tools.length}</span>
                  </div>
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" strokeWidth={2}
                    style={{ flexShrink: 0, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.3s ease" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div style={{ maxHeight: isOpen ? `${cat.tools.length * 52 + 16}px` : "0px", overflow: "hidden", transition: "max-height 0.4s ease" }}>
                  <div style={{ padding: "0 12px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
                    {cat.tools.map((tool) => (
                      <div key={tool.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 10, background: "var(--bg-3)" }}>
                        <span style={{ fontSize: 16, width: 28, textAlign: "center" }}>{tool.icon}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>{tool.name}</div>
                          <div style={{ fontSize: 12, color: "var(--ink-3)" }}>{tool.desc}</div>
                        </div>
                        <div style={{ width: 5, height: 5, borderRadius: 999, background: "var(--accent)", opacity: 0.5, flexShrink: 0 }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Marquee */}
      <div style={{ position: "relative", marginTop: 64 }}>
        <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 96, background: "linear-gradient(to right, var(--bg), transparent)", zIndex: 10, pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 96, background: "linear-gradient(to left, var(--bg), transparent)", zIndex: 10, pointerEvents: "none" }} />

        <div style={{ overflow: "hidden", marginBottom: 12 }}>
          <div style={{ display: "flex", gap: 10, whiteSpace: "nowrap", width: "max-content", animation: "marqueeScroll 22s linear infinite" }}>
            {[...row1, ...row1].map((tool, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 10, border: "1px solid var(--line)", background: "var(--bg-1)", flexShrink: 0 }}>
                <span style={{ fontSize: 14 }}>{tool.icon}</span>
                <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ink-2)", fontFamily: "JetBrains Mono, monospace" }}>{tool.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", gap: 10, whiteSpace: "nowrap", width: "max-content", animation: "marqueeReverse 18s linear infinite" }}>
            {[...row2, ...row2].map((tool, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 10, border: "1px solid var(--line)", background: "var(--bg-1)", flexShrink: 0 }}>
                <span style={{ fontSize: 14 }}>{tool.icon}</span>
                <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ink-2)", fontFamily: "JetBrains Mono, monospace" }}>{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
