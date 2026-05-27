"use client";

const tools = [
  { name: "Claude", color: "#C6FF3D" },
  { name: "Vapi", color: "#7FF6E0" },
  { name: "Make.com", color: "#a78bfa" },
  { name: "n8n", color: "#C6FF3D" },
  { name: "ElevenLabs", color: "#7FF6E0" },
  { name: "Vonage", color: "#a78bfa" },
  { name: "Midjourney", color: "#C6FF3D" },
  { name: "Voiceflow", color: "#7FF6E0" },
  { name: "Runway", color: "#a78bfa" },
  { name: "HeyGen", color: "#C6FF3D" },
  { name: "Manychat", color: "#7FF6E0" },
  { name: "Twilio", color: "#a78bfa" },
  { name: "Stripe", color: "#C6FF3D" },
  { name: "Calendly", color: "#7FF6E0" },
];

export default function Marquee() {
  const doubled = [...tools, ...tools];

  return (
    <div
      style={{
        padding: "0",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
        overflow: "hidden",
        position: "relative",
        background: "rgba(255,255,255,0.015)",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Edge fade masks */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 160, background: "linear-gradient(90deg, var(--bg), transparent)", zIndex: 2, pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 160, background: "linear-gradient(-90deg, var(--bg), transparent)", zIndex: 2, pointerEvents: "none" }} />

      <div
        style={{
          display: "flex",
          gap: 0,
          animation: "marquee 55s linear infinite",
          width: "max-content",
          padding: "22px 0",
        }}
      >
        {doubled.map((t, i) => (
          <span
            key={i}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              fontSize: 15,
              color: "var(--ink-3)",
              whiteSpace: "nowrap",
              fontWeight: 500,
              padding: "0 36px",
              borderRight: "1px solid rgba(255,255,255,0.05)",
              letterSpacing: "-0.01em",
              transition: "color 0.2s ease",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: 999,
                background: t.color,
                flexShrink: 0,
                display: "inline-block",
                boxShadow: `0 0 8px ${t.color}80`,
              }}
            />
            {t.name}
          </span>
        ))}
      </div>
    </div>
  );
}
