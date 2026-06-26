"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";
import { Reveal } from "@/components/home/Reveal";
import { Mic, Phone, PhoneOff, Loader2, Check, Radio } from "lucide-react";
import { VAPI_PUBLIC_KEY, VOICE_AGENTS, type VoiceAgent } from "@/lib/vapiAgents";

type Status = "idle" | "connecting" | "active";

export default function LiveVoiceAgents() {
  const vapiRef = useRef<Vapi | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [volume, setVolume] = useState(0);
  const [assistantSpeaking, setAssistantSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** Lazily build a single Vapi instance once the public key is present. */
  const getVapi = useCallback((): Vapi | null => {
    if (vapiRef.current) return vapiRef.current;
    if (!VAPI_PUBLIC_KEY) return null;

    const v = new Vapi(VAPI_PUBLIC_KEY);
    v.on("call-start", () => setStatus("active"));
    v.on("call-end", () => {
      setStatus("idle");
      setActiveId(null);
      setVolume(0);
      setAssistantSpeaking(false);
    });
    v.on("speech-start", () => setAssistantSpeaking(true));
    v.on("speech-end", () => setAssistantSpeaking(false));
    v.on("volume-level", (vol: number) => setVolume(vol));
    v.on("error", () => {
      setError("Neizdevās savienoties. Pārbaudi mikrofona atļauju un mēģini vēlreiz.");
      setStatus("idle");
      setActiveId(null);
    });

    vapiRef.current = v;
    return v;
  }, []);

  /* Stop any live call when the section unmounts. */
  useEffect(() => () => { vapiRef.current?.stop(); }, []);

  const startCall = useCallback(
    async (agent: VoiceAgent) => {
      setError(null);
      const v = getVapi();
      if (!v) {
        setError("Demo vēl nav konfigurēts — trūkst Vapi publiskās atslēgas.");
        return;
      }
      if (!agent.assistantId) {
        setError("Šim agentam vēl nav pievienots Vapi Assistant ID.");
        return;
      }
      if (activeId && activeId !== agent.id) v.stop();
      setActiveId(agent.id);
      setStatus("connecting");
      try {
        await v.start(agent.assistantId);
      } catch {
        setError("Neizdevās sākt zvanu. Atļauj mikrofonu un mēģini vēlreiz.");
        setStatus("idle");
        setActiveId(null);
      }
    },
    [activeId, getVapi],
  );

  const endCall = useCallback(() => {
    vapiRef.current?.stop();
  }, []);

  return (
    <section id="balss-agenti" style={{ padding: "120px 0", background: "var(--bg)", borderTop: "1px solid var(--line)" }}>
      <div className="lp-container" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px" }}>
        {/* Header */}
        <div style={{ maxWidth: 760, margin: "0 auto 60px", textAlign: "center" }}>
          <Reveal>
            <span className="v2-eyebrow">
              <Radio size={13} strokeWidth={2.4} style={{ marginRight: 7, marginBottom: -2 }} />
              Dzīvs demo
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="v2-h2" style={{ fontSize: "clamp(36px, 5.5vw, 68px)", color: "var(--ink)", margin: "18px 0 22px" }}>
              Parunā ar mūsu <span className="v2-grad">balss aģentiem</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p style={{ fontSize: 18, color: "var(--ink-3)", lineHeight: 1.7, maxWidth: 560, margin: "0 auto" }}>
              Uzspied pogu, atļauj mikrofonu un sarunājies ar AI agentu tieši pārlūkā — tādu pašu mēs uzbūvējam tavam biznesam. Demo zvans, maks. ~2 min.
            </p>
          </Reveal>
        </div>

        {error && (
          <div style={{ maxWidth: 560, margin: "0 auto 28px", textAlign: "center", fontSize: 13.5, fontWeight: 500, color: "#E5484D", background: "rgba(229,72,77,0.08)", border: "1px solid rgba(229,72,77,0.25)", borderRadius: 12, padding: "11px 16px" }}>
            {error}
          </div>
        )}

        <div className="live-voice-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {VOICE_AGENTS.map((agent, i) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              index={i}
              isActive={activeId === agent.id}
              status={activeId === agent.id ? status : "idle"}
              volume={activeId === agent.id ? volume : 0}
              speaking={activeId === agent.id && assistantSpeaking}
              busyElsewhere={activeId !== null && activeId !== agent.id}
              onStart={() => startCall(agent)}
              onEnd={endCall}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes lv-ring-pulse { 0% { transform: scale(1); opacity: 0.55; } 70% { transform: scale(1.9); opacity: 0; } 100% { transform: scale(1.9); opacity: 0; } }
        @keyframes lv-spin { to { transform: rotate(360deg); } }
        .lv-spin { animation: lv-spin 1s linear infinite; }
        @media (max-width: 1024px) { .live-voice-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 680px) { .live-voice-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

function AgentCard({
  agent,
  index,
  status,
  volume,
  speaking,
  busyElsewhere,
  onStart,
  onEnd,
}: {
  agent: VoiceAgent;
  index: number;
  isActive: boolean;
  status: Status;
  volume: number;
  speaking: boolean;
  busyElsewhere: boolean;
  onStart: () => void;
  onEnd: () => void;
}) {
  const live = status === "connecting" || status === "active";
  const ringScale = 1 + Math.min(0.4, volume * 0.55);

  return (
    <Reveal delay={0.05 * index} style={{ height: "100%" }}>
      <article
        style={{
          position: "relative",
          borderRadius: 22,
          overflow: "hidden",
          background: "#0C0C12",
          border: `1px solid ${live ? `rgba(${agent.glow},0.45)` : "rgba(255,255,255,0.10)"}`,
          padding: "22px 22px 20px",
          boxShadow: live
            ? `0 30px 70px -28px rgba(${agent.glow},0.55), inset 0 1px 0 rgba(255,255,255,0.06)`
            : "0 22px 56px -30px rgba(13,13,20,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
          transition: "box-shadow 0.35s ease, border-color 0.35s ease",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          opacity: busyElsewhere ? 0.55 : 1,
        }}
      >
        <div aria-hidden style={{ position: "absolute", top: -70, left: "50%", transform: "translateX(-50%)", width: 280, height: 160, pointerEvents: "none", background: `radial-gradient(50% 60% at 50% 40%, rgba(${agent.glow},${live ? 0.4 : 0.2}), transparent 75%)`, filter: "blur(6px)", transition: "background 0.35s ease" }} />

        {/* header */}
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 11, marginBottom: 18 }}>
          <span style={{ width: 40, height: 40, borderRadius: 12, flexShrink: 0, background: `linear-gradient(135deg, ${agent.accent}, #8B7BFF)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", boxShadow: `0 8px 20px -6px rgba(${agent.glow},0.6)` }}>
            <Phone size={17} strokeWidth={2.2} />
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 14.5, fontWeight: 700, color: "#fff", letterSpacing: "-0.01em", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{agent.biz}</div>
            <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.5)" }}>{agent.scenario}</div>
          </div>
          <span style={{ fontSize: 9.5, fontFamily: "JetBrains Mono, monospace", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#A89DFF", background: "rgba(109,94,243,0.14)", border: "1px solid rgba(109,94,243,0.3)", borderRadius: 999, padding: "4px 9px" }}>AI</span>
        </div>

        {/* mic stage */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: 132, marginBottom: 16 }}>
          <div style={{ position: "relative", width: 76, height: 76, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* volume-reactive ring (assistant speaking) */}
            {status === "active" && (
              <span aria-hidden style={{ position: "absolute", inset: 0, borderRadius: 999, border: `2px solid rgba(${agent.glow},0.6)`, transform: `scale(${speaking ? ringScale : 1})`, opacity: speaking ? 0.7 : 0.3, transition: "transform 0.12s ease, opacity 0.2s ease" }} />
            )}
            {/* pulsing connect ring */}
            {status === "connecting" && (
              <span aria-hidden style={{ position: "absolute", inset: 0, borderRadius: 999, border: `2px solid rgba(${agent.glow},0.5)`, animation: "lv-ring-pulse 1.4s ease-out infinite" }} />
            )}
            <span style={{ width: 60, height: 60, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", background: live ? `linear-gradient(135deg, ${agent.accent}, #8B7BFF)` : "rgba(255,255,255,0.06)", border: live ? "none" : "1px solid rgba(255,255,255,0.14)", color: live ? "#fff" : "rgba(255,255,255,0.6)", boxShadow: live ? `0 10px 28px -8px rgba(${agent.glow},0.7)` : "none", transition: "background 0.3s ease, box-shadow 0.3s ease" }}>
              {status === "connecting" ? <Loader2 size={22} className="lv-spin" /> : <Mic size={22} strokeWidth={2.2} />}
            </span>
          </div>

          {/* status */}
          <div style={{ marginTop: 14, minHeight: 34, width: "100%", textAlign: "center" }}>
            {status === "idle" && (
              <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.5)", margin: 0, lineHeight: 1.5 }}>
                Gatavs sarunai — uzspied «Runāt»
              </p>
            )}
            {status === "connecting" && (
              <p style={{ fontSize: 12.5, color: "#A89DFF", margin: 0, fontWeight: 600 }}>Savienojas…</p>
            )}
            {status === "active" && (
              <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.7)", margin: 0, fontWeight: 600 }}>
                {speaking ? "Agents runā…" : "Klausās — runā brīvi 🎙️"}
              </p>
            )}
          </div>
        </div>

        {/* skills */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
          {agent.skills.map((s) => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 12, color: "rgba(255,255,255,0.62)" }}>
              <span style={{ width: 16, height: 16, borderRadius: 999, flexShrink: 0, background: `rgba(${agent.glow},0.18)`, color: agent.accent, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Check size={10} strokeWidth={3.2} />
              </span>
              {s}
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={live ? onEnd : onStart}
          disabled={busyElsewhere}
          style={{
            position: "relative",
            marginTop: "auto",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 9,
            padding: "12px 16px",
            borderRadius: 12,
            border: "none",
            cursor: busyElsewhere ? "not-allowed" : "pointer",
            fontSize: 13.5,
            fontWeight: 700,
            letterSpacing: "-0.01em",
            color: "#fff",
            background: live ? "linear-gradient(135deg, #E5484D, #C2363B)" : `linear-gradient(135deg, ${agent.accent}, #8B7BFF)`,
            boxShadow: live ? "0 12px 30px -10px rgba(229,72,77,0.6)" : `0 12px 30px -10px rgba(${agent.glow},0.6)`,
            transition: "transform 0.18s ease, box-shadow 0.2s ease, filter 0.2s ease",
          }}
          onMouseEnter={(e) => { if (!busyElsewhere) (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = ""; }}
        >
          {live ? <PhoneOff size={16} strokeWidth={2.3} /> : <Phone size={16} strokeWidth={2.3} />}
          {status === "connecting" ? "Savienojas…" : live ? "Beigt zvanu" : "Runāt ar agentu"}
        </button>
      </article>
    </Reveal>
  );
}
