"use client";

const tools = [
  "Claude", "Vapi", "Make.com", "n8n", "ElevenLabs", "Vonage",
  "Midjourney", "Voiceflow", "Runway", "HeyGen", "Manychat",
  "Twilio", "Stripe", "Calendly",
];

export default function Marquee() {
  const doubled = [...tools, ...tools];
  return (
    <div style={{ padding: "30px 0 32px", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", overflow: "hidden", background: "var(--bg-1)", position: "relative" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 30% 120% at 50% 50%, color-mix(in oklab, var(--accent) 6%, transparent), transparent 70%)" }} />

      <div style={{ textAlign: "center", marginBottom: 20, position: "relative" }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-4)", fontFamily: "var(--font-sans)" }}>
          Rīki, ko apgūsi un izmanto ikdienā
        </span>
      </div>

      {/* Edge-faded track */}
      <div
        style={{
          position: "relative",
          maskImage: "linear-gradient(to right, transparent 0%, #000 9%, #000 91%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, #000 9%, #000 91%, transparent 100%)",
        }}
      >
        <div style={{ display: "flex", gap: 44, animation: "marquee 55s linear infinite", width: "max-content" }}>
          {doubled.map((t, i) => (
            <span
              key={i}
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                fontSize: 18, color: "var(--ink-2)", whiteSpace: "nowrap",
                fontWeight: 600, letterSpacing: "-0.01em",
                fontFamily: "var(--font-sans)",
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: 999, background: i % 3 === 0 ? "var(--accent)" : i % 3 === 1 ? "var(--accent-2)" : "var(--accent-3)", flexShrink: 0, display: "inline-block" }} />
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
