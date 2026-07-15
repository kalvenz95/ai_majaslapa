"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";
import { Reveal } from "@/components/home/Reveal";
import { Mic, Phone, Check, Radio, Globe } from "lucide-react";
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
    v.on("error", (e: unknown) => {
      // Surface the real reason so we can diagnose (mic / assistant / billing).
      let detail = "";
      try {
        if (typeof e === "string") detail = e;
        else if (e && typeof e === "object") {
          const o = e as Record<string, unknown>;
          const nested = o.error as Record<string, unknown> | undefined;
          detail =
            (o.errorMsg as string) ||
            (o.message as string) ||
            (nested?.message as string) ||
            (nested?.msg as string) ||
            JSON.stringify(o);
        }
      } catch {
        /* ignore */
      }
      console.error("[Vapi error]", e);
      setError("Neizdevās savienoties: " + (detail || "nezināma kļūda"));
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
        setError("Šim aģentam vēl nav pievienots Vapi Assistant ID.");
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
              Uzspied pogu, atļauj mikrofonu un sarunājies ar AI aģentu tieši pārlūkā — tieši šādu aģentu tu iemācīsies uzbūvēt savam biznesam. Demo zvans, maks. ~2 min.
            </p>
          </Reveal>
        </div>

        {error && (
          <div style={{ maxWidth: 560, margin: "0 auto 28px", textAlign: "center", fontSize: 13.5, fontWeight: 500, color: "#E5484D", background: "rgba(229,72,77,0.08)", border: "1px solid rgba(229,72,77,0.25)", borderRadius: 12, padding: "11px 16px" }}>
            {error}
          </div>
        )}

        <div className="live-voice-grid" style={{ display: "flex", flexWrap: "wrap", gap: 52, justifyContent: "center", alignItems: "flex-start" }}>
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
        @keyframes lv-mic-pulse { 0% { box-shadow: 0 0 0 0 rgba(255,255,255,0.18); } 70% { box-shadow: 0 0 0 16px rgba(255,255,255,0); } 100% { box-shadow: 0 0 0 0 rgba(255,255,255,0); } }
        @keyframes lv-call-ring { 0% { transform: scale(1); opacity: 0.55; } 100% { transform: scale(1.7); opacity: 0; } }
        @media (max-width: 760px) { .live-voice-grid { gap: 36px; } }
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
  const isActive = status === "active";

  const statusText =
    status === "idle"
      ? "Gatavs sarunai — uzspied «Runāt»"
      : status === "connecting"
        ? "Savienojas…"
        : speaking
          ? "Aģents runā…"
          : "Klausās — runā brīvi 🎙️";

  const buttonLabel =
    status === "idle" ? "Runāt ar aģentu" : status === "connecting" ? "Savienojas…" : "Beigt zvanu";

  const buttonBg = isActive
    ? "linear-gradient(135deg,#e5484d,#c93a3f)"
    : `linear-gradient(135deg,${agent.accent},${agent.accent2})`;

  const locked = busyElsewhere || status === "connecting";

  const handleClick = () => {
    if (locked) return;
    if (isActive) onEnd();
    else onStart();
  };

  // Skaļuma reaktīvā mikrofona pulsācija, kad aģents runā
  const micScale = speaking ? 1 + Math.min(0.16, volume * 0.4) : 1;

  return (
    <Reveal delay={0.08 * index}>
      {/* Telefona rāmis */}
      <div
        style={{
          position: "relative",
          width: "min(340px, 88vw)",
          padding: 13,
          borderRadius: 56,
          background: "linear-gradient(160deg,#26262e,#111114)",
          boxShadow: "0 40px 70px -20px rgba(20,20,30,0.35), inset 0 0 0 1px rgba(255,255,255,0.06)",
          opacity: busyElsewhere ? 0.5 : 1,
          transition: "opacity 0.35s ease",
        }}
      >
        {/* Sānu pogas */}
        <span aria-hidden style={{ position: "absolute", left: -3, top: 132, width: 3, height: 30, borderRadius: 2, background: "#3a3a42" }} />
        <span aria-hidden style={{ position: "absolute", left: -3, top: 172, width: 3, height: 52, borderRadius: 2, background: "#3a3a42" }} />
        <span aria-hidden style={{ position: "absolute", right: -3, top: 150, width: 3, height: 64, borderRadius: 2, background: "#3a3a42" }} />

        {/* Ekrāns */}
        <div
          style={{
            position: "relative",
            height: 660,
            borderRadius: 44,
            overflow: "hidden",
            background: "linear-gradient(165deg,#1b1a24 0%,#0a0a0f 62%)",
            display: "flex",
            flexDirection: "column",
            padding: "22px 22px 18px",
          }}
        >
          {/* Notch */}
          <div aria-hidden style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", width: 92, height: 24, borderRadius: 14, background: "#000" }} />

          {/* Galvene */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginTop: 26 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 11, minWidth: 0 }}>
              <span style={{ width: 42, height: 42, borderRadius: 12, flex: "none", background: agent.avatarGrad, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                <Phone size={18} strokeWidth={2} />
              </span>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{agent.biz}</div>
                <div style={{ fontSize: 11.5, fontWeight: 600, color: "#9299ab", marginTop: 1 }}>{agent.scenario}</div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6, flex: "none" }}>
              {agent.lang && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "#c7cbd6", background: "rgba(255,255,255,0.08)", padding: "4px 8px", borderRadius: 20, whiteSpace: "nowrap" }}>
                  <Globe size={9} strokeWidth={2.4} />
                  {agent.lang}
                </span>
              )}
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, fontWeight: 700, letterSpacing: "0.06em", color: "#c7cbd6", background: "rgba(255,255,255,0.08)", padding: "4px 9px", borderRadius: 20 }}>AI</span>
            </div>
          </div>

          {/* Mikrofons */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transform: `scale(${micScale})`,
                transition: "transform 0.12s ease",
                animation: live ? "lv-mic-pulse 1.5s ease-in-out infinite" : "none",
              }}
            >
              <Mic size={24} strokeWidth={1.8} color="#e7e9f0" />
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#aeb3c2", textAlign: "center", minHeight: 16 }}>{statusText}</div>
          </div>

          {/* Atdalītājs */}
          <div style={{ height: 1, background: "rgba(255,255,255,0.08)", margin: "4px 0 16px" }} />

          {/* Prasmes */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
            {agent.skills.map((s) => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <span style={{ width: 17, height: 17, borderRadius: "50%", flex: "none", background: agent.avatarGrad, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Check size={9} strokeWidth={3} color="#fff" />
                </span>
                <span style={{ fontSize: 12.5, color: "#d3d6e0", fontWeight: 500 }}>{s}</span>
              </div>
            ))}
          </div>

          {/* Zvana poga */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <div style={{ position: "relative", width: 76, height: 76 }}>
              {status === "idle" && !busyElsewhere && (
                <span aria-hidden style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `2px solid ${agent.accent}`, animation: "lv-call-ring 1.8s ease-out infinite" }} />
              )}
              <button
                type="button"
                onClick={handleClick}
                disabled={locked}
                aria-label={buttonLabel}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  border: "none",
                  cursor: locked ? "default" : "pointer",
                  background: buttonBg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 10px 24px -6px rgba(0,0,0,0.5)",
                  transition: "filter 0.18s ease, transform 0.12s ease",
                }}
                onMouseEnter={(e) => { if (!locked) (e.currentTarget as HTMLButtonElement).style.filter = "brightness(1.08)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.filter = ""; }}
                onMouseDown={(e) => { if (!locked) (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.96)"; }}
                onMouseUp={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = ""; }}
              >
                <Phone size={26} strokeWidth={2} color="#fff" style={{ transform: isActive ? "rotate(135deg)" : "none" }} />
              </button>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{buttonLabel}</div>
          </div>

          {/* Home indikators */}
          <div aria-hidden style={{ width: 110, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.28)", margin: "14px auto 0" }} />
        </div>
      </div>
    </Reveal>
  );
}
