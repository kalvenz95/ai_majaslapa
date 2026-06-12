"use client";

import { Reveal } from "@/components/home/Reveal";
import { Mic, Heart, MessageCircle, Sparkles, Check } from "lucide-react";

/* ── Crafted mini-mockups (no stock photos) ─────────────────────── */

function SiteMock() {
  return (
    <div style={{ width: "78%", borderRadius: 10, overflow: "hidden", background: "#fff", border: "1px solid var(--line-2)", boxShadow: "0 18px 40px -16px rgba(17,17,17,0.25)" }}>
      <div style={{ display: "flex", gap: 4, padding: "7px 10px", borderBottom: "1px solid var(--line)" }}>
        {["#FF5F57", "#FEBC2E", "#28C840"].map((c) => <span key={c} style={{ width: 7, height: 7, borderRadius: 999, background: c }} />)}
      </div>
      <div style={{ padding: 12 }}>
        <div style={{ height: 9, width: "55%", borderRadius: 4, background: "linear-gradient(90deg, var(--accent), #8B7BFF)", marginBottom: 6 }} />
        <div style={{ height: 5, width: "85%", borderRadius: 3, background: "var(--bg-3)", marginBottom: 4 }} />
        <div style={{ height: 5, width: "70%", borderRadius: 3, background: "var(--bg-3)", marginBottom: 10 }} />
        <div style={{ display: "flex", gap: 6 }}>
          <div style={{ height: 16, width: 48, borderRadius: 5, background: "var(--accent)" }} />
          <div style={{ height: 16, width: 48, borderRadius: 5, background: "var(--bg-2)", border: "1px solid var(--line-2)" }} />
        </div>
      </div>
    </div>
  );
}

function SocialMock() {
  return (
    <div style={{ width: "64%", borderRadius: 14, background: "#fff", border: "1px solid var(--line-2)", padding: 12, boxShadow: "0 18px 40px -16px rgba(17,17,17,0.25)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 9 }}>
        <span style={{ width: 22, height: 22, borderRadius: 999, background: "linear-gradient(135deg, var(--accent-2), #34D9C3)" }} />
        <div>
          <div style={{ height: 6, width: 58, borderRadius: 3, background: "var(--bg-3)", marginBottom: 3 }} />
          <div style={{ height: 4, width: 38, borderRadius: 2, background: "var(--bg-2)" }} />
        </div>
      </div>
      <div style={{ aspectRatio: "5/3", borderRadius: 9, background: "linear-gradient(135deg, rgba(0,191,165,0.5), rgba(109,94,243,0.45))", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 9 }}>
        <Sparkles size={20} color="#fff" />
      </div>
      <div style={{ display: "flex", gap: 12, color: "var(--ink-3)" }}>
        <Heart size={13} fill="#FF5F8F" color="#FF5F8F" />
        <MessageCircle size={13} />
        <span style={{ marginLeft: "auto", fontFamily: "JetBrains Mono, monospace", fontSize: 9, color: "var(--ink-4)" }}>2.4k</span>
      </div>
    </div>
  );
}

function ChatMock() {
  return (
    <div style={{ width: "72%", display: "flex", flexDirection: "column", gap: 7 }}>
      {[
        { me: false, w: "82%", t: "Sveiki! Vai ir brīvi galdiņi šovakar?" },
        { me: true, w: "88%", t: "Jā! 19:00 ir brīvs galds 4 personām 🤖" },
        { me: false, w: "55%", t: "Lieliski, rezervēju!" },
        { me: true, w: "72%", t: "✓ Rezervācija apstiprināta" },
      ].map((m, i) => (
        <div key={i} style={{
          alignSelf: m.me ? "flex-end" : "flex-start", maxWidth: m.w,
          padding: "7px 11px", fontSize: 10, lineHeight: 1.45, fontWeight: 500,
          borderRadius: m.me ? "12px 12px 3px 12px" : "12px 12px 12px 3px",
          background: m.me ? "#DCF8C6" : "#fff",
          color: "#1A1A1A",
          border: "1px solid rgba(17,17,17,0.07)",
          boxShadow: "0 3px 10px -4px rgba(17,17,17,0.18)",
        }}>
          {m.t}
        </div>
      ))}
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
    <div style={{ width: "70%", borderRadius: 13, overflow: "hidden", border: "1px solid var(--line-2)", boxShadow: "0 18px 40px -16px rgba(17,17,17,0.25)" }}>
      <div style={{ aspectRatio: "16/8", background: "linear-gradient(120deg, #FFB86B 0%, #FF8A5C 55%, #6D5EF3 130%)", position: "relative", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: 12 }}>
        <span style={{ position: "absolute", top: 9, left: 10, fontSize: 7.5, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", background: "rgba(255,255,255,0.9)", borderRadius: 999, padding: "2.5px 8px", color: "#1A1A1A" }}>Reklāma</span>
        <div style={{ height: 8, width: "62%", borderRadius: 4, background: "rgba(255,255,255,0.95)", marginBottom: 5 }} />
        <div style={{ height: 5, width: "42%", borderRadius: 3, background: "rgba(255,255,255,0.6)" }} />
      </div>
      <div style={{ background: "#fff", padding: "8px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ height: 5, width: "40%", borderRadius: 3, background: "var(--bg-3)" }} />
        <div style={{ height: 14, width: 44, borderRadius: 5, background: "var(--accent)" }} />
      </div>
    </div>
  );
}

function PortfolioMock() {
  return (
    <div style={{ width: "72%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7 }}>
      {[
        "linear-gradient(135deg, rgba(109,94,243,0.7), rgba(139,123,255,0.45))",
        "linear-gradient(135deg, rgba(0,191,165,0.65), rgba(52,217,195,0.4))",
        "linear-gradient(135deg, rgba(255,184,107,0.7), rgba(255,138,92,0.45))",
        "linear-gradient(135deg, rgba(17,17,17,0.75), rgba(60,60,70,0.5))",
      ].map((bg, i) => (
        <div key={i} style={{ aspectRatio: "4/3", borderRadius: 10, background: bg, border: "1px solid rgba(255,255,255,0.4)", boxShadow: "0 10px 26px -10px rgba(17,17,17,0.3)", display: "flex", alignItems: "flex-end", padding: 8 }}>
          <div style={{ height: 4, width: "55%", borderRadius: 2, background: "rgba(255,255,255,0.85)" }} />
        </div>
      ))}
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
              Ko iespējams <span className="v2-grad">izveidot</span>
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
                  <h3 style={{ fontSize: 18, fontWeight: 800, fontFamily: "Inter Tight, sans-serif", letterSpacing: "-0.02em", color: "var(--ink)", margin: 0 }}>
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
      `}</style>
    </section>
  );
}
