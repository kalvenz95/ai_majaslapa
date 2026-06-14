"use client";

import { Reveal } from "@/components/home/Reveal";
import { Mic, Heart, MessageCircle, Sparkles, Check, Lock, Send, Bookmark, Bot, TrendingUp, Globe, Play } from "lucide-react";

/* ── Crafted mini-mockups (no stock photos) ─────────────────────── */

function SiteMock() {
  return (
    <div className="v2-float-a" style={{ width: "84%", borderRadius: 12, overflow: "hidden", background: "#fff", border: "1px solid var(--line-2)", boxShadow: "0 22px 48px -18px rgba(109,94,243,0.38), 0 4px 12px -5px rgba(17,17,17,0.12)" }}>
      {/* Browser chrome */}
      <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 11px", background: "linear-gradient(180deg,#fff,#FAFAF8)", borderBottom: "1px solid var(--line)" }}>
        <div style={{ display: "flex", gap: 4 }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => <span key={c} style={{ width: 7, height: 7, borderRadius: 999, background: c }} />)}
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 5, height: 14, borderRadius: 999, background: "var(--bg-2)", border: "1px solid var(--line)", padding: "0 8px" }}>
          <Lock size={7} color="var(--ink-4)" />
          <div style={{ height: 4, width: "46%", borderRadius: 2, background: "var(--bg-3)" }} />
        </div>
      </div>
      {/* Page */}
      <div style={{ padding: 12 }}>
        {/* nav */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 11 }}>
          <span style={{ width: 14, height: 14, borderRadius: 5, background: "linear-gradient(135deg,var(--accent),#8B7BFF)" }} />
          <div style={{ height: 4, width: 26, borderRadius: 2, background: "var(--bg-3)" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginLeft: "auto" }}>
            {[16, 16].map((w, i) => <div key={i} style={{ height: 3.5, width: w, borderRadius: 2, background: "var(--bg-3)" }} />)}
            <div style={{ height: 12, width: 30, borderRadius: 4, background: "var(--accent)" }} />
          </div>
        </div>
        {/* hero */}
        <div style={{ position: "relative", borderRadius: 9, padding: 12, background: "radial-gradient(120% 140% at 100% 0%, rgba(109,94,243,0.20), transparent 60%), linear-gradient(135deg,#F3F1FF,#FBFAFF)", border: "1px solid rgba(109,94,243,0.14)", overflow: "hidden" }}>
          <span style={{ position: "absolute", top: 8, right: 8, display: "inline-flex", alignItems: "center", gap: 3, fontSize: 6.5, fontWeight: 700, letterSpacing: "0.06em", color: "var(--accent)", background: "rgba(255,255,255,0.88)", border: "1px solid rgba(109,94,243,0.25)", borderRadius: 999, padding: "2px 6px" }}>
            <Sparkles size={6} /> AI
          </span>
          <div style={{ height: 8, width: "60%", borderRadius: 4, background: "linear-gradient(90deg,var(--accent),#8B7BFF)", marginBottom: 6 }} />
          <div style={{ height: 4.5, width: "78%", borderRadius: 2, background: "var(--bg-3)", marginBottom: 4 }} />
          <div style={{ height: 4.5, width: "54%", borderRadius: 2, background: "var(--bg-3)", marginBottom: 11 }} />
          <div style={{ display: "flex", gap: 6 }}>
            <div style={{ height: 15, width: 50, borderRadius: 6, background: "var(--accent)", boxShadow: "0 6px 14px -4px rgba(109,94,243,0.55)" }} />
            <div style={{ height: 15, width: 40, borderRadius: 6, background: "#fff", border: "1px solid var(--line-2)" }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialMock() {
  return (
    <div className="v2-float-b" style={{ width: "66%", borderRadius: 16, background: "#fff", border: "1px solid var(--line-2)", boxShadow: "0 22px 48px -18px rgba(0,191,165,0.34), 0 4px 12px -5px rgba(17,17,17,0.12)", overflow: "hidden" }}>
      {/* header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 11px" }}>
        <span style={{ width: 24, height: 24, borderRadius: 999, padding: 1.5, background: "linear-gradient(135deg,#00BFA5,#FFB86B)" }}>
          <span style={{ display: "block", width: "100%", height: "100%", borderRadius: 999, background: "linear-gradient(135deg,var(--accent-2),#34D9C3)", border: "1.5px solid #fff" }} />
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ height: 5, width: 54, borderRadius: 3, background: "var(--bg-3)", marginBottom: 3 }} />
          <div style={{ height: 3.5, width: 34, borderRadius: 2, background: "var(--bg-2)" }} />
        </div>
        <div style={{ display: "flex", gap: 2.5 }}>{[0, 1, 2].map((i) => <span key={i} style={{ width: 3, height: 3, borderRadius: 999, background: "var(--ink-4)" }} />)}</div>
      </div>
      {/* image */}
      <div style={{ position: "relative", aspectRatio: "1/1", background: "linear-gradient(135deg, rgba(0,191,165,0.6), rgba(109,94,243,0.5) 65%, rgba(255,184,107,0.55))", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ position: "absolute", top: 9, left: 9, display: "inline-flex", alignItems: "center", gap: 3, fontSize: 6.5, fontWeight: 700, color: "#fff", background: "rgba(0,0,0,0.28)", borderRadius: 999, padding: "2.5px 7px" }}>
          <Sparkles size={6} /> AI veidots
        </span>
        <Sparkles size={26} color="rgba(255,255,255,0.92)" />
      </div>
      {/* actions */}
      <div style={{ padding: "9px 11px 11px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--ink-3)", marginBottom: 7 }}>
          <Heart size={14} fill="#FF5F8F" color="#FF5F8F" />
          <MessageCircle size={14} />
          <Send size={13} />
          <Bookmark size={14} style={{ marginLeft: "auto" }} />
        </div>
        <div style={{ height: 4, width: "42%", borderRadius: 2, background: "var(--bg-3)", marginBottom: 4 }} />
        <div style={{ height: 3.5, width: "72%", borderRadius: 2, background: "var(--bg-2)" }} />
      </div>
    </div>
  );
}

function ChatMock() {
  return (
    <div style={{ width: "72%", borderRadius: 16, overflow: "hidden", background: "#fff", border: "1px solid var(--line-2)", boxShadow: "0 22px 48px -18px rgba(0,191,165,0.32), 0 4px 12px -5px rgba(17,17,17,0.12)" }}>
      {/* WhatsApp header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 11px", background: "linear-gradient(135deg,#0B7D6E,#075E54)" }}>
        <span style={{ width: 22, height: 22, borderRadius: 999, background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Bot size={12} color="#fff" />
        </span>
        <div>
          <div style={{ fontSize: 9, fontWeight: 700, color: "#fff" }}>AI Asistents</div>
          <div style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 7.5, color: "rgba(255,255,255,0.72)" }}>
            <span className="v2-pulse" style={{ width: 4, height: 4, borderRadius: 999, background: "#5CFF9E" }} /> tiešsaistē
          </div>
        </div>
      </div>
      {/* chat body */}
      <div style={{ background: "#E7E2DA", padding: "11px 10px", display: "flex", flexDirection: "column", gap: 6 }}>
        {[
          { me: false, w: "84%", t: "Sveiki! Vai ir brīvi galdiņi šovakar?" },
          { me: true, w: "78%", t: "Jā! 19:00 brīvs galds 4 personām 🤖" },
        ].map((m, i) => (
          <div key={i} style={{
            alignSelf: m.me ? "flex-end" : "flex-start", maxWidth: m.w,
            padding: "6px 9px", fontSize: 9, lineHeight: 1.4, fontWeight: 500,
            borderRadius: m.me ? "10px 10px 2px 10px" : "10px 10px 10px 2px",
            background: m.me ? "#DCF8C6" : "#fff", color: "#1A1A1A",
            boxShadow: "0 1px 2px rgba(0,0,0,0.12)",
          }}>
            {m.t}
          </div>
        ))}
        {/* typing indicator */}
        <div style={{ alignSelf: "flex-end", padding: "7px 10px", borderRadius: "10px 10px 2px 10px", background: "#DCF8C6", display: "flex", gap: 3.5, boxShadow: "0 1px 2px rgba(0,0,0,0.12)" }}>
          {[0, 1, 2].map((i) => <span key={i} className="v2-typing-dot" style={{ width: 4, height: 4, borderRadius: 999, background: "#4A8A3A", animationDelay: `${i * 0.18}s` }} />)}
        </div>
      </div>
    </div>
  );
}

function VoiceMock() {
  return (
    <div style={{ width: "66%", borderRadius: 16, background: "#0D0D14", border: "1px solid rgba(255,255,255,0.12)", padding: "16px 18px", boxShadow: "0 18px 44px -14px rgba(13,13,20,0.5)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
        <span style={{ width: 30, height: 30, borderRadius: 999, background: "linear-gradient(135deg, var(--accent), #8B7BFF)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Mic size={13} color="#fff" />
        </span>
        <div>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: "#fff" }}>Ienākošais zvans</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 8.5, color: "rgba(255,255,255,0.45)" }}>
            <span className="v2-pulse" style={{ width: 5, height: 5, borderRadius: 999, background: "#28C840", display: "inline-block" }} />
            AI atbild · 0:18
          </div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 2.5, height: 22 }}>
        {[0.4, 0.8, 0.55, 1, 0.65, 0.4, 0.9, 0.6, 0.95, 0.45, 0.7, 0.5].map((s, i) => (
          <span key={i} className="v2-wave-bar" style={{ flex: 1, height: "100%", borderRadius: 2, background: "linear-gradient(180deg, var(--accent), var(--accent-2))", animationDelay: `${i * 0.09}s`, transform: `scaleY(${s})` }} />
        ))}
      </div>
    </div>
  );
}

function AdMock() {
  return (
    <div className="v2-float-a" style={{ width: "74%", borderRadius: 14, overflow: "hidden", background: "#fff", border: "1px solid var(--line-2)", boxShadow: "0 22px 48px -18px rgba(255,138,92,0.42), 0 4px 12px -5px rgba(17,17,17,0.12)", position: "relative" }}>
      {/* floating performance chip */}
      <span style={{ position: "absolute", top: 10, right: 10, zIndex: 2, display: "inline-flex", alignItems: "center", gap: 3, fontSize: 8, fontWeight: 800, color: "#fff", background: "linear-gradient(135deg,#28C840,#1FA838)", borderRadius: 999, padding: "3px 8px", boxShadow: "0 6px 14px -4px rgba(40,200,64,0.6)" }}>
        <TrendingUp size={8} /> +127%
      </span>
      {/* creative */}
      <div style={{ aspectRatio: "16/9", background: "linear-gradient(125deg,#FFC27A 0%,#FF8A5C 52%,#FF5F8F 98%)", position: "relative", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 13 }}>
        <span style={{ position: "absolute", top: 10, left: 11, fontSize: 7, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", background: "rgba(255,255,255,0.92)", borderRadius: 999, padding: "2.5px 8px", color: "#1A1A1A" }}>Reklāma</span>
        <span style={{ position: "absolute", top: "24%", right: "13%", width: 34, height: 34, borderRadius: 10, background: "rgba(255,255,255,0.22)", border: "1px solid rgba(255,255,255,0.42)", transform: "rotate(-12deg)" }} />
        <div style={{ height: 8, width: "58%", borderRadius: 4, background: "rgba(255,255,255,0.96)", marginBottom: 5 }} />
        <div style={{ height: 4.5, width: "40%", borderRadius: 3, background: "rgba(255,255,255,0.72)" }} />
      </div>
      {/* stats + CTA */}
      <div style={{ background: "#fff", padding: "9px 12px", display: "flex", alignItems: "center", gap: 11 }}>
        <div>
          <div style={{ fontSize: 6.5, color: "var(--ink-4)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 2 }}>CTR</div>
          <div style={{ fontSize: 10, fontWeight: 800, color: "var(--ink)", fontFamily: "JetBrains Mono, monospace" }}>4.8%</div>
        </div>
        <div style={{ width: 1, height: 18, background: "var(--line)" }} />
        <div>
          <div style={{ fontSize: 6.5, color: "var(--ink-4)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 2 }}>Klikšķi</div>
          <div style={{ fontSize: 10, fontWeight: 800, color: "var(--ink)", fontFamily: "JetBrains Mono, monospace" }}>1.2k</div>
        </div>
        <div style={{ marginLeft: "auto", height: 19, padding: "0 12px", borderRadius: 6, background: "var(--accent-3)", display: "flex", alignItems: "center", fontSize: 8, fontWeight: 700, color: "#1A1A1A", boxShadow: "0 6px 14px -5px rgba(255,184,107,0.7)" }}>Uzzināt</div>
      </div>
    </div>
  );
}

function PortfolioMock() {
  const tiles = [
    { bg: "linear-gradient(135deg,#8B7BFF,#6D5EF3)", icon: <Globe size={12} color="#fff" /> },
    { bg: "linear-gradient(135deg,#34D9C3,#00BFA5)", icon: <Sparkles size={12} color="#fff" /> },
    { bg: "linear-gradient(135deg,#FFC27A,#FF8A5C)", icon: <Play size={11} color="#fff" fill="#fff" /> },
    { bg: "linear-gradient(135deg,#3A3A44,#16161C)", icon: <MessageCircle size={11} color="#fff" /> },
  ];
  return (
    <div style={{ width: "80%", borderRadius: 14, background: "#fff", border: "1px solid var(--line-2)", boxShadow: "0 22px 48px -18px rgba(255,138,92,0.34), 0 4px 12px -5px rgba(17,17,17,0.12)", padding: 11 }}>
      {/* header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <span style={{ width: 22, height: 22, borderRadius: 999, background: "linear-gradient(135deg,var(--accent-3),#FF8A5C)" }} />
        <div style={{ flex: 1 }}>
          <div style={{ height: 5, width: 48, borderRadius: 3, background: "var(--bg-3)", marginBottom: 3 }} />
          <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
            <span style={{ width: 4, height: 4, borderRadius: 999, background: "#28C840" }} />
            <div style={{ height: 3, width: 40, borderRadius: 2, background: "var(--bg-2)" }} />
          </div>
        </div>
        <span style={{ fontSize: 7, fontWeight: 700, color: "#C26B2E", background: "rgba(255,184,107,0.18)", border: "1px solid rgba(255,184,107,0.4)", borderRadius: 999, padding: "2.5px 7px" }}>12 darbi</span>
      </div>
      {/* grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
        {tiles.map((t, i) => (
          <div key={i} style={{ aspectRatio: "4/3", borderRadius: 9, background: t.bg, display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: 7, boxShadow: "0 8px 18px -8px rgba(17,17,17,0.35)" }}>
            <div style={{ height: 3.5, width: "45%", borderRadius: 2, background: "rgba(255,255,255,0.9)" }} />
            <span style={{ opacity: 0.92, display: "flex" }}>{t.icon}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Projects data — copy kept from the original section ─────────── */

const projects = [
  { tag: "Mājaslapa", title: "AI mājaslapa uzņēmumam", desc: "Moderna lapa ar AI integrācijām — gatava dažu dienu laikā.", glow: "109,94,243", Mock: SiteMock },
  { tag: "Sociālie tīkli", title: "Mēneša satura pakete", desc: "Vizuāļi, teksti un publicēšanas grafiks, veidots ar AI rīkiem.", glow: "0,191,165", Mock: SocialMock },
  { tag: "Automatizācija", title: "WhatsApp automatizācija", desc: "Automātiskas atbildes un pieteikumu apstrāde uzņēmumam.", glow: "0,191,165", Mock: ChatMock },
  { tag: "Balss AI", title: "AI balss aģents", desc: "Zvanu pieņemšana un rezervācijas — bez cilvēka iesaistes.", glow: "109,94,243", Mock: VoiceMock },
  { tag: "Reklāma", title: "AI reklāmu vizuāļi", desc: "Bildes un video reklāmām, kas piesaista uzmanību un pārdod.", glow: "255,184,107", Mock: AdMock },
  { tag: "Portfolio", title: "Tavs personīgais portfolio", desc: "Darbu krājums, kas palīdz iegūt pirmos klientus jau kursa laikā.", glow: "255,184,107", Mock: PortfolioMock },
];

export default function ProjectsV2() {
  return (
    <section id="examples" style={{ padding: "140px 0", background: "#fff", borderTop: "1px solid var(--line)" }}>
      <div className="lp-container" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px" }}>
        {/* Header */}
        <div style={{ maxWidth: 720, margin: "0 auto 72px", textAlign: "center" }}>
          <Reveal><span className="v2-eyebrow">Reāli projekti</span></Reveal>
          <Reveal delay={0.08}>
            <h2 className="v2-h2" style={{ fontSize: "clamp(40px, 6.5vw, 80px)", color: "var(--ink)", margin: "18px 0 22px" }}>
              Ko iespējams <span style={{ color: "var(--teal-ink)" }}>izveidot</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p style={{ fontSize: 18, color: "var(--ink-3)", lineHeight: 1.7, maxWidth: 520, margin: "0 auto" }}>
              Reāli projekti, kurus vari piedāvāt klientiem jau pirmajos mēnešos.
            </p>
          </Reveal>
        </div>

        {/* Cards */}
        <div className="projects-v2-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={0.05 * (i % 3)}>
              <article
                style={{
                  borderRadius: 24, overflow: "hidden", height: "100%",
                  background: "var(--bg)", border: "1px solid var(--line)",
                  display: "flex", flexDirection: "column",
                  boxShadow: "var(--shadow-sm)",
                  transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, border-color 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-6px)";
                  el.style.borderColor = `rgba(${p.glow},0.4)`;
                  el.style.boxShadow = `0 30px 70px -24px rgba(${p.glow},0.45), 0 10px 24px -10px rgba(17,17,17,0.1)`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "";
                  el.style.borderColor = "var(--line)";
                  el.style.boxShadow = "var(--shadow-sm)";
                }}
              >
                {/* Visual header — crafted mockup on tinted gradient */}
                <div style={{
                  aspectRatio: "16/10", display: "flex", alignItems: "center", justifyContent: "center",
                  position: "relative", overflow: "hidden",
                  background: `radial-gradient(90% 110% at 50% 115%, rgba(${p.glow},0.22), transparent 70%), linear-gradient(180deg, var(--bg-2), var(--bg))`,
                  borderBottom: "1px solid var(--line)",
                  padding: 18,
                }}>
                  <p.Mock />
                </div>

                {/* Body */}
                <div style={{ padding: "22px 24px 26px", display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                  <span style={{
                    alignSelf: "flex-start",
                    fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, fontWeight: 600,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    color: `rgb(${p.glow.split(",").map((n, j) => j < 3 ? Math.round(Number(n) * 0.82) : n).join(",")})`,
                    background: `rgba(${p.glow},0.09)`, border: `1px solid rgba(${p.glow},0.22)`,
                    borderRadius: 999, padding: "4px 11px", marginBottom: 6,
                  }}>
                    {p.tag}
                  </span>
                  <h3 style={{ fontSize: 18, fontWeight: 700, fontFamily: "var(--font-sans)", letterSpacing: "-0.02em", color: "var(--ink)", margin: 0 }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: 13.5, color: "var(--ink-3)", lineHeight: 1.6, margin: 0 }}>
                    {p.desc}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Reassure strip */}
        <Reveal delay={0.15}>
          <div style={{ display: "flex", justifyContent: "center", gap: 26, flexWrap: "wrap", marginTop: 48 }}>
            {["Veidots kursa laikā", "Gatavs rādīt klientiem", "Ar mentoru atbalstu"].map((r) => (
              <span key={r} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--ink-3)", fontWeight: 500 }}>
                <Check size={13} strokeWidth={3} color="var(--accent-2)" /> {r}
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .projects-v2-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .projects-v2-grid { grid-template-columns: 1fr !important; }
        }
        @keyframes v2Typing {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.45; }
          30% { transform: translateY(-3px); opacity: 1; }
        }
        .v2-typing-dot { animation: v2Typing 1.2s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .v2-typing-dot { animation: none; }
        }
      `}</style>
    </section>
  );
}
