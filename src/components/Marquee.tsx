"use client";

const tools = [
  "Claude", "Vapi", "Make.com", "n8n", "ElevenLabs", "Vonage",
  "Midjourney", "Voiceflow", "Runway", "HeyGen", "Manychat",
  "Twilio", "Stripe", "Calendly",
];

export default function Marquee() {
  const doubled = [...tools, ...tools];
  return (
    <div style={{ padding: "28px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", overflow: "hidden", background: "var(--bg-1)", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 30% 100% at 50% 50%, color-mix(in oklab, var(--accent) 6%, transparent), transparent 70%)" }} />
      <div style={{ display: "flex", gap: 48, animation: "marquee 50s linear infinite", width: "max-content" }}>
        {doubled.map((t, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 17, color: "var(--ink-2)", whiteSpace: "nowrap", fontWeight: 500 }}>
            <span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--accent)", flexShrink: 0, display: "inline-block" }} />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
