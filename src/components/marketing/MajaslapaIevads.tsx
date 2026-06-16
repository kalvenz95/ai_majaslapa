"use client";

import { useState } from "react";

/* Brand-derived palette (Digitālā speciālista kurss) */
const G = "#00BFA5"; // teal
const G2 = "#6D5EF3"; // purple
const AM = "#FFB86B"; // amber
const INK = "var(--ink)";
const INK2 = "var(--ink-3)";

const DISPLAY = '"Inter Tight", sans-serif';

/* ── Inline ikonas ── */
function Icon({ d, size = 20, color = G }: { d: string; size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {d.split("|").map((p, i) => (
        <path key={i} d={p} />
      ))}
    </svg>
  );
}
function Check({ color = "#fff", size = 16 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <polyline points="20,6 9,17 4,12" />
    </svg>
  );
}

/* ── Process soļi: kā top mājaslapa ── */
const STEPS = [
  {
    color: G2,
    icon: "M12 2v4|M12 18v4|M2 12h4|M18 12h4|M5 5l2.5 2.5|M16.5 16.5L19 19|M19 5l-2.5 2.5|M7.5 16.5L5 19",
    title: "Ideja un struktūra",
    desc: "Aprakstit AI, ko vajag — un tas sagatavo lapas struktūru, sadaļas un saturu pareizajā secībā.",
  },
  {
    color: G,
    icon: "M2 3h20v14H2z|M8 21h8|M12 17v4",
    title: "Dizains ar AI",
    desc: "Mākslīgais intelekts ģenerē izkārtojumu, krāsas un fontus — profesionāli, bez dizaina pieredzes.",
  },
  {
    color: AM,
    icon: "M4 7h16|M4 12h10|M4 17h13",
    title: "Saturs un teksti",
    desc: "Pārdodoši virsraksti, pakalpojumu apraksti un aicinājumi rīkoties — visu uzraksta AI latviski.",
  },
  {
    color: G2,
    icon: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20|M2 12h20|M12 2a15 15 0 0 1 0 20|M12 2a15 15 0 0 0 0 20",
    title: "Publicēšana",
    desc: "Pieslēdz domēnu un publicē — lapa ir tiešsaistē, gatava pieņemt pirmos klientus.",
  },
];

function StepCard({ step, index }: { step: (typeof STEPS)[number]; index: number }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        borderRadius: 18,
        padding: "26px 24px 28px",
        background: "#fff",
        border: `1px solid ${step.color}${hover ? "55" : "26"}`,
        boxShadow: hover
          ? `0 24px 56px -26px ${step.color}66, 0 6px 16px -8px rgba(17,17,17,0.10)`
          : "0 12px 36px -22px rgba(17,17,17,0.16)",
        transform: hover ? "translateY(-4px)" : "translateY(0)",
        transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, border-color 0.3s ease",
        height: "100%",
      }}
    >
      <span
        aria-hidden
        style={{
          position: "absolute", top: 18, right: 22,
          fontFamily: DISPLAY, fontSize: 46, fontWeight: 900, lineHeight: 1,
          color: `${step.color}1f`, letterSpacing: "-0.04em",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div style={{ width: 48, height: 48, borderRadius: 14, background: `${step.color}16`, border: `1px solid ${step.color}3a`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
        <Icon d={step.icon} color={step.color} size={22} />
      </div>
      <h4 style={{ fontFamily: DISPLAY, fontSize: 19, fontWeight: 800, color: INK, margin: "0 0 9px", letterSpacing: "-0.02em" }}>{step.title}</h4>
      <p style={{ fontSize: 14.5, color: INK2, lineHeight: 1.65, margin: 0 }}>{step.desc}</p>
    </div>
  );
}

/* ── "No prompta līdz lapai" stilizēts vizuālis ── */
function PromptToSite() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: 18 }} className="mi-prompt-grid">
      {/* Prompts */}
      <div style={{ borderRadius: 16, padding: "20px 20px", background: "var(--bg)", border: "1px solid var(--line)", boxShadow: "0 12px 36px -24px rgba(17,17,17,0.18)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: G2 }} />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-4)" }}>Tavs uzdevums AI</span>
        </div>
        <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.7, margin: 0, fontFamily: "JetBrains Mono, monospace" }}>
          „Izveido mājaslapu skaistumkopšanas salonam ar pierakstu, galeriju un cenrādi.“
        </p>
      </div>

      {/* Arrow */}
      <div className="mi-prompt-arrow" style={{ width: 46, height: 46, borderRadius: "50%", background: `linear-gradient(135deg, ${G}, ${G2})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: `0 12px 28px -10px ${G}` }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" /></svg>
      </div>

      {/* Mini site mockup */}
      <div style={{ borderRadius: 16, overflow: "hidden", background: "#fff", border: "1px solid var(--line)", boxShadow: `0 18px 48px -24px ${G2}55` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "9px 12px", borderBottom: "1px solid var(--line)", background: "var(--bg-2)" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#FF5F57" }} />
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#FEBC2E" }} />
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#28C840" }} />
        </div>
        <div style={{ padding: 16 }}>
          <div style={{ height: 10, width: "55%", borderRadius: 4, background: `linear-gradient(90deg, ${G}, ${G2})`, marginBottom: 9 }} />
          <div style={{ height: 7, width: "82%", borderRadius: 4, background: "var(--bg-3)", marginBottom: 6 }} />
          <div style={{ height: 7, width: "70%", borderRadius: 4, background: "var(--bg-3)", marginBottom: 14 }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
            <div style={{ height: 38, borderRadius: 8, background: `${G}14`, border: `1px solid ${G}30` }} />
            <div style={{ height: 38, borderRadius: 8, background: `${G2}14`, border: `1px solid ${G2}30` }} />
          </div>
          <div style={{ height: 26, width: "44%", borderRadius: 8, background: `linear-gradient(135deg, ${G}, ${G2})` }} />
        </div>
      </div>
    </div>
  );
}

export function MajaslapaIevads() {
  const [hover, setHover] = useState(false);
  return (
    <div
      style={{
        position: "relative",
        marginTop: 4,
        borderRadius: 28,
        overflow: "hidden",
        border: "1px solid var(--line)",
        boxShadow: "0 28px 70px -36px rgba(17,17,17,0.22)",
        background: "var(--bg-1)",
      }}
    >
      {/* ── HERO JOSLA ar attēlu ── */}
      <div style={{ position: "relative", overflow: "hidden", padding: "clamp(36px, 6vw, 64px) clamp(26px, 5vw, 52px)", background: "#0A0A0E" }}>
        <img
          src="/ai/websites.jpg"
          alt=""
          aria-hidden
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }}
          loading="lazy"
        />
        <div aria-hidden style={{ position: "absolute", inset: 0, background: `linear-gradient(110deg, rgba(10,10,14,0.94) 30%, rgba(10,10,14,0.55) 100%), radial-gradient(70% 90% at 90% 10%, ${G}33, transparent 60%)` }} />
        <div style={{ position: "relative", maxWidth: 640 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "8px 18px 8px 13px", borderRadius: 30, background: "rgba(255,255,255,0.08)", border: `1px solid ${G}55`, marginBottom: 22, backdropFilter: "blur(8px)" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: G }} />
            <span style={{ fontSize: 11.5, fontWeight: 800, color: "#fff", textTransform: "uppercase", letterSpacing: "0.18em" }}>Ievads · 2. bloks</span>
          </div>
          <h3 style={{ fontFamily: DISPLAY, fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 900, letterSpacing: "-0.035em", lineHeight: 1.06, color: "#fff", margin: 0 }}>
            Mājaslapa no nulles —<br />
            <span style={{ background: `linear-gradient(120deg, ${G}, ${G2})`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>ar mākslīgā intelekta palīdzību</span>
          </h3>
          <p style={{ fontSize: 16.5, color: "rgba(255,255,255,0.72)", lineHeight: 1.7, margin: "20px 0 0" }}>
            Vēl pirms gada profesionālas mājaslapas izveide prasīja nedēļas darba un dārgu dizaineri. Šodien ar pareizajiem AI rīkiem tu vari uzbūvēt un publicēt pilnvērtīgu mājaslapu dažu stundu laikā — pat ja nekad neesi rakstījis nevienu koda rindiņu.
          </p>
        </div>
      </div>

      {/* ── SATURS ── */}
      <div style={{ padding: "clamp(30px, 5vw, 48px)", background: `radial-gradient(ellipse 120% 60% at 10% -10%, ${G}0d, transparent 55%), var(--bg-1)` }}>
        {/* No prompta līdz lapai */}
        <div style={{ marginBottom: 44 }}>
          <h4 style={{ fontFamily: DISPLAY, fontSize: 13, fontWeight: 800, color: G, textTransform: "uppercase", letterSpacing: "0.16em", margin: "0 0 18px" }}>No idejas līdz lapai — minūtēs, nevis nedēļās</h4>
          <PromptToSite />
        </div>

        {/* Process soļi */}
        <h4 style={{ fontFamily: DISPLAY, fontSize: "clamp(22px, 3.5vw, 30px)", fontWeight: 900, letterSpacing: "-0.03em", color: INK, margin: "0 0 6px" }}>Kā top mājaslapa — 4 soļi</h4>
        <div style={{ width: 64, height: 3, borderRadius: 3, background: `linear-gradient(90deg, ${G}, transparent)`, marginBottom: 28 }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 }}>
          {STEPS.map((s, i) => (
            <StepCard key={s.title} step={s} index={i} />
          ))}
        </div>

        {/* Reāls rezultāts */}
        <div style={{ marginTop: 44, position: "relative", borderRadius: 22, overflow: "hidden", border: `1px solid ${G2}30`, background: "#fff", boxShadow: `0 24px 60px -30px ${G2}55`, display: "grid", gridTemplateColumns: "1.05fr 0.95fr" }} className="mi-result">
          <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{ position: "relative", minHeight: 240, overflow: "hidden", borderRight: `1px solid ${G2}1e` }}
          >
            <img
              src="/portfolio/la-skrundo.png"
              alt="La Skrundo — mājaslapa, kas izveidota kursā"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block", transform: hover ? "scale(1.04)" : "scale(1)", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" }}
              loading="lazy"
            />
            <span style={{ position: "absolute", top: 14, left: 14, fontSize: 10.5, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", padding: "5px 11px", borderRadius: 7, background: `linear-gradient(135deg, ${G}, ${G2})`, color: "#fff" }}>Reāls darbs</span>
          </div>
          <div style={{ padding: "clamp(26px, 4vw, 40px)" }}>
            <h4 style={{ fontFamily: DISPLAY, fontSize: "clamp(20px, 3vw, 26px)", fontWeight: 900, letterSpacing: "-0.025em", color: INK, margin: "0 0 12px" }}>Tieši tādu mājaslapu tu izveidosi pats</h4>
            <p style={{ fontSize: 15, color: INK2, lineHeight: 1.7, margin: "0 0 20px" }}>
              „La Skrundo“ — itāļu kafejnīcas mājaslapa, kas tapa tieši ar šajā blokā apgūtajiem rīkiem. Beigās tev būs sava mājaslapa, ko parādīt pirmajiem klientiem.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {["Profesionāls dizains bez koda", "Pielāgots mobilajām ierīcēm", "Gatava publicēšanai uz sava domēna"].map((pt) => (
                <div key={pt} style={{ display: "flex", alignItems: "center", gap: 13 }}>
                  <span style={{ width: 30, height: 30, borderRadius: 9, flexShrink: 0, background: `linear-gradient(135deg, ${G}, ${G2})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Check color="#fff" size={15} />
                  </span>
                  <span style={{ fontSize: 14.5, color: "var(--ink-2)", lineHeight: 1.5 }}>{pt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .mi-prompt-grid { grid-template-columns: 1fr !important; }
          .mi-prompt-arrow { transform: rotate(90deg); margin: 0 auto; }
          .mi-result { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
