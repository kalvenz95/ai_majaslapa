"use client";
import { useState } from "react";
import {
  Bot, Zap, Film, Mic2, Megaphone, CreditCard,
  MessageSquare, Search, PenTool, Edit3,
  Link2, Plug, Database, FileText,
  Palette, Video, User, Sparkles, Camera, Image, Flame,
  Volume2, Mail, Phone, Smartphone,
  TrendingUp, Calendar, Paintbrush, Target, Scissors,
  ChevronDown,
} from "lucide-react";

const categories = [
  {
    label: "AI Assistenti",
    Icon: Bot,
    tools: [
      { name: "ChatGPT", desc: "Skripting & Sales", Icon: MessageSquare },
      { name: "Claude", desc: "AI rakstīšana", Icon: Bot },
      { name: "Perplexity", desc: "AI Meklēšana", Icon: Search },
      { name: "Jasper", desc: "Mārketinga teksti", Icon: PenTool },
      { name: "Copy.ai", desc: "AI Teksts", Icon: Edit3 },
    ],
  },
  {
    label: "Automatizācija",
    Icon: Zap,
    tools: [
      { name: "Make.com", desc: "Visual workflow", Icon: Zap },
      { name: "n8n", desc: "Workflow Builder", Icon: Link2 },
      { name: "Zapier", desc: "App integrācijas", Icon: Plug },
      { name: "Airtable", desc: "Datu bāze", Icon: Database },
      { name: "Notion AI", desc: "AI Darbvieta", Icon: FileText },
    ],
  },
  {
    label: "AI Video & Attēli",
    Icon: Film,
    tools: [
      { name: "Midjourney", desc: "AI Attēli", Icon: Palette },
      { name: "Runway", desc: "AI Video", Icon: Film },
      { name: "HeyGen", desc: "Avatar Video", Icon: User },
      { name: "Pika Labs", desc: "Video ģenerēšana", Icon: Sparkles },
      { name: "Synthesia", desc: "Video avatāri", Icon: Video },
      { name: "Sora", desc: "AI Video", Icon: Camera },
      { name: "Stable Diffusion", desc: "AI Attēli", Icon: Image },
      { name: "Adobe Firefly", desc: "AI Radošums", Icon: Flame },
    ],
  },
  {
    label: "AI Balss & Chat",
    Icon: Mic2,
    tools: [
      { name: "Vapi", desc: "Voice Agents", Icon: Mic2 },
      { name: "ElevenLabs", desc: "AI Balss", Icon: Volume2 },
      { name: "Manychat", desc: "Chat automācija", Icon: MessageSquare },
      { name: "Vonage", desc: "LV numuri", Icon: Phone },
      { name: "Twilio", desc: "SMS & Zvani", Icon: Smartphone },
    ],
  },
  {
    label: "Mārketings & SEO",
    Icon: Megaphone,
    tools: [
      { name: "Buffer", desc: "Sociālie tīkli", Icon: Smartphone },
      { name: "Surfer SEO", desc: "SEO Optimizācija", Icon: TrendingUp },
      { name: "ActiveCampaign", desc: "E-pasta mārketings", Icon: Mail },
      { name: "Typeform", desc: "Viedās formas", Icon: Target },
    ],
  },
  {
    label: "Bizness & Maksājumi",
    Icon: CreditCard,
    tools: [
      { name: "Stripe", desc: "Maksājumi", Icon: CreditCard },
      { name: "Calendly", desc: "Tikšanās booking", Icon: Calendar },
      { name: "Canva AI", desc: "AI Dizains", Icon: Paintbrush },
      { name: "Figma AI", desc: "UI/UX Dizains", Icon: Target },
      { name: "Descript", desc: "Audio/Video edit", Icon: Scissors },
    ],
  },
];

const allTools = categories.flatMap((c) => c.tools);
const row1 = allTools.slice(0, 16);
const row2 = allTools.slice(16);

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
              <div key={i} className="card" style={{
                overflow: "hidden",
                borderColor: isOpen ? "var(--line-2)" : "var(--line)",
                background: isOpen ? "var(--bg-2)" : "var(--bg-1)",
                transition: "background 0.2s ease, border-color 0.2s ease",
              }}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", textAlign: "left", background: "none", border: "none", cursor: "pointer" }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                      background: isOpen ? "color-mix(in oklab, var(--accent) 12%, transparent)" : "var(--bg-3)",
                      border: `1px solid ${isOpen ? "color-mix(in oklab, var(--accent) 20%, transparent)" : "var(--line)"}`,
                      transition: "background 0.2s, border-color 0.2s",
                    }}>
                      <cat.Icon size={14} color={isOpen ? "var(--accent)" : "var(--ink-3)"} />
                    </div>
                    <span style={{ color: "var(--ink)", fontWeight: 600, fontSize: 14 }}>{cat.label}</span>
                    <span className="chip" style={{ fontSize: 10, padding: "2px 8px" }}>{cat.tools.length}</span>
                  </div>
                  <ChevronDown size={16} color="var(--ink-3)"
                    style={{ flexShrink: 0, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.3s ease" }} />
                </button>

                <div style={{ maxHeight: isOpen ? `${cat.tools.length * 52 + 16}px` : "0px", overflow: "hidden", transition: "max-height 0.4s ease" }}>
                  <div style={{ padding: "0 12px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
                    {cat.tools.map((tool) => (
                      <div key={tool.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 10, background: "var(--bg-3)" }}>
                        <div style={{
                          width: 28, height: 28, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                          background: "var(--bg-2)", border: "1px solid var(--line)",
                        }}>
                          <tool.Icon size={14} color="var(--ink-2)" />
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{tool.name}</div>
                          <div style={{ fontSize: 11, color: "var(--ink-3)" }}>{tool.desc}</div>
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

        <div style={{ overflow: "hidden", marginBottom: 10 }}>
          <div style={{ display: "flex", gap: 8, whiteSpace: "nowrap", width: "max-content", animation: "marqueeScroll 22s linear infinite" }}>
            {[...row1, ...row1].map((tool, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 10, border: "1px solid var(--line)", background: "var(--bg-1)", flexShrink: 0 }}>
                <tool.Icon size={13} color="var(--ink-3)" />
                <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ink-2)", fontFamily: "JetBrains Mono, monospace" }}>{tool.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ overflow: "hidden" }}>
          <div style={{ display: "flex", gap: 8, whiteSpace: "nowrap", width: "max-content", animation: "marqueeReverse 18s linear infinite" }}>
            {[...row2, ...row2].map((tool, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", borderRadius: 10, border: "1px solid var(--line)", background: "var(--bg-1)", flexShrink: 0 }}>
                <tool.Icon size={13} color="var(--ink-3)" />
                <span style={{ fontSize: 12, fontWeight: 500, color: "var(--ink-2)", fontFamily: "JetBrains Mono, monospace" }}>{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
