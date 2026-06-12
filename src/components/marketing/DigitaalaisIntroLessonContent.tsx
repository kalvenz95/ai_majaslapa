"use client";

import { EmojiIcon } from "@/components/EmojiIcon";
import { AnimatedNumber } from "@/components/AnimatedNumber";

/* Brand-derived light palette */
const G  = "#00BFA5";
const G2 = "#33D4BF";
const P  = "#6D5EF3";
const AM = "#FFB86B";
const PK = "#9B8FF7";

function Dot({ color }: { color: string }) {
  return <div style={{ width: 7, height: 7, borderRadius: "50%", background: color, flexShrink: 0 }} />;
}
function Check({ color = G }: { color?: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3.5" style={{ flexShrink: 0 }}>
      <polyline points="20,6 9,17 4,12" />
    </svg>
  );
}

const cardShadow = "0 12px 36px -20px rgba(17,17,17,0.16)";
const sectionLabel = (color: string): React.CSSProperties => ({
  fontSize: 10, fontWeight: 800, color, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 14,
});

const services = [
  {
    accent: G, accent2: G2,
    label: "Pakalpojums #1",
    title: "Mājaslapa",
    earn: "€300–€900", per: "projekts + €100/mēn atbalsts",
    desc: "Profesionāla mājaslapa bez programmēšanas — Framer vai Webflow, GEO optimizācija, mobilā versija. Klients maksā projektu un ikmēneša atbalstu.",
    points: ["Framer / Webflow — bez koda", "GEO (Generative Engine Optimization)", "Nodošana ar rēķinu un līgumu"],
  },
  {
    accent: P, accent2: PK,
    label: "Pakalpojums #2",
    title: "AI Asistenti",
    earn: "€200–€500", per: "uzstādīšana + €100–€200/mēn",
    desc: "AI asistenti mājas lapai, Instagram, Facebook un WhatsApp — atbild 24/7, vāc kontaktus un samazina manuālo darbu par 60%.",
    points: ["Mājaslapa, Instagram, Facebook & WhatsApp", "Lead vākšana automātiski", "Voiceflow — vizuāls, bez koda"],
  },
  {
    accent: AM, accent2: G2,
    label: "Pakalpojums #3",
    title: "AI E-pasta Asistents",
    earn: "€150–€400", per: "mēnesī / klients",
    desc: "Automātiskas atbildes, klientu komunikācija un ikmēneša e-pasta veidnes ar Claude — ietaupa 10+ stundas nedēļā.",
    points: ["Claude AI — jaudīgākais asistents", "Veidnes jebkurai situācijai", "Pārdod kā ikmēneša pakalpojumu"],
  },
];

const niches = [
  { icon: "💇", title: "Frizētavas & Spa",       need: "Mājaslapa + rezervācijas chatbot",   price: "€400–€700" },
  { icon: "🦷", title: "Zobārsti & Klīnikas",    need: "Mājaslapa + automātiskas atbildes",  price: "€600–€1 200" },
  { icon: "🍕", title: "Restorāni & Kafejnīcas", need: "Ēdienkarte online + AI atbildes",    price: "€350–€600" },
  { icon: "🏗️", title: "Būvniecība & Remonts",   need: "Portfolio mājaslapa + lead chatbot", price: "€500–€900" },
];

const stats = [
  { value: "58%",  label: "Latvijas uzņēmumu nav profesionālas mājaslapas",  color: G },
  { value: "83%",  label: "neizmanto chatbot vai automātiskas atbildes",      color: G2 },
  { value: "€600", label: "vidējais mēneša budžets digitālajiem pakalpojumiem", color: AM },
  { value: "91%",  label: "klientu atkārto pasūtījumu pēc 1. darba",         color: P },
];

const tools = [
  { icon: "🌐", name: "Framer / Webflow", desc: "Mājaslapa bez koda",   color: G },
  { icon: "🤖", name: "Voiceflow",        desc: "AI chatbot būvēšana",  color: G2 },
  { icon: "✉️", name: "Claude / ChatGPT", desc: "E-pasti un saturs",    color: AM },
  { icon: "💻", name: "Cursor",           desc: "AI koda palīgs",       color: P },
  { icon: "📊", name: "Google Analytics", desc: "Mājaslapa statistika", color: PK },
  { icon: "📋", name: "Notion",           desc: "Klientu onboarding",   color: "#5B5B5B" },
];

const modules = [
  { num: "1", color: G,   title: "Ievads & Tirgus",       milestone: "Saproti iespējas, uzstādā rīkus" },
  { num: "2", color: G2,  title: "Mājaslapa",             milestone: "Gatava mājaslapa pirmajam klientam" },
  { num: "3", color: AM,  title: "AI Asistenti",          milestone: "Asistenti mājas lapai & soc. tīkliem" },
  { num: "4", color: P,   title: "AI E-pasta Asistents",  milestone: "Automatizēta klientu komunikācija" },
  { num: "5", color: PK,  title: "Bizness & Klienti",     milestone: "90 dienu plāns līdz €1 000/mēn" },
];

const income = [
  { period: "1.–3. ned.", desc: "Mācies rīkus, veido pirmo mājaslapa demo",  amount: "€0",            pct: 4 },
  { period: "4. ned.",    desc: "Sūti outreach, piedāvā bezmaksas auditu",    amount: "€0–€300",      pct: 10 },
  { period: "2. mēn.",    desc: "Pirmais klients — mājaslapa vai chatbot",    amount: "€300–€800",    pct: 35 },
  { period: "3.–4. mēn.", desc: "2–3 klienti, atbalsta paketes",             amount: "€1 000–€2 500", pct: 65 },
  { period: "6. mēn.+",   desc: "4–6 klienti, ikmēneša retainer",           amount: "€2 000–€7 200", pct: 100 },
];

export function DigitaalaisIntroLessonContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, paddingTop: 24 }}>

      {/* ── HERO ── */}
      <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", border: `1px solid ${G}33`, background: "linear-gradient(135deg, rgba(0,191,165,0.10) 0%, rgba(51,212,191,0.05) 55%, #fff 100%)", boxShadow: "0 24px 64px -32px rgba(0,191,165,0.4)" }}>
        <div style={{ position: "absolute", top: -120, right: -80, width: 460, height: 460, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,191,165,0.12) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", padding: "40px 36px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 13px", borderRadius: 20, background: `${G}14`, border: `1px solid ${G}33`, marginBottom: 18 }}>
            <Dot color={G} />
            <span style={{ fontSize: 10, fontWeight: 700, color: G, letterSpacing: "0.08em", textTransform: "uppercase" }}>Digitālais Speciālists · 5 bloki · 38 nodarbības</span>
          </div>
          <h2 style={{ fontSize: "clamp(20px,4vw,32px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 12, color: "var(--ink)" }}>
            Kā uzņēmumi maksā<br />
            <span style={{ background: "linear-gradient(135deg, #00BFA5, #33D4BF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>par tevi katru mēnesi</span>
          </h2>
          <p style={{ fontSize: 13.5, color: "var(--ink-3)", lineHeight: 1.75, maxWidth: 520, marginBottom: 24 }}>
            Tu apgūsi 3 konkrētus digitālos pakalpojumus — mājaslapa, chatbot, e-pasta automatizācija. Uzņēmumi maksā <strong style={{ color: "var(--ink)" }}>€500–€7 200 mēnesī</strong>.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[{ c: G, t: "Bez programmēšanas" }, { c: G2, t: "Klients 4 nedēļās" }, { c: AM, t: "Latvijas reāli piemēri" }].map((b) => (
              <div key={b.t} style={{ display: "flex", alignItems: "center", gap: 7, padding: "6px 13px", borderRadius: 9, background: "#fff", border: "1px solid var(--line)" }}>
                <Dot color={b.c} /><span style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink-2)" }}>{b.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3 PAKALPOJUMI ── */}
      <div>
        <div style={sectionLabel(G)}>3 pakalpojumi ko tu apgūsi un pārdosi</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {services.map((s, i) => (
            <div key={i} style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${s.accent}2e`, background: "#fff", boxShadow: cardShadow }}>
              <div style={{ position: "relative", height: 96, overflow: "hidden", background: `linear-gradient(135deg, ${s.accent}1f 0%, ${s.accent2}0f 100%)` }}>
                <div style={{ position: "absolute", top: -60, right: -40, width: 220, height: 220, borderRadius: "50%", background: `radial-gradient(circle, ${s.accent}26 0%, transparent 65%)`, pointerEvents: "none" }} />
                <div style={{ position: "absolute", top: 16, left: 18 }}>
                  <span style={{ fontSize: 9.5, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: `${s.accent}1f`, border: `1px solid ${s.accent}40`, color: s.accent, letterSpacing: "0.07em", textTransform: "uppercase" }}>{s.label}</span>
                </div>
                <div style={{ position: "absolute", top: 14, right: 18, display: "flex", alignItems: "baseline", gap: 4 }}>
                  <span style={{ fontSize: 15, fontWeight: 900, color: s.accent, letterSpacing: "-0.02em" }}>{s.earn}</span>
                </div>
                <div style={{ position: "absolute", bottom: 14, left: 18, right: 18 }}>
                  <h3 style={{ fontSize: 19, fontWeight: 900, letterSpacing: "-0.02em", color: "var(--ink)", margin: 0 }}>{s.title}</h3>
                  <div style={{ fontSize: 10.5, color: "var(--ink-3)", marginTop: 2 }}>{s.per}</div>
                </div>
              </div>
              <div style={{ padding: "16px 18px 18px" }}>
                <p style={{ fontSize: 12.5, color: "var(--ink-3)", lineHeight: 1.7, marginBottom: 12 }}>{s.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {s.points.map((pt, pi) => (
                    <div key={pi} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 17, height: 17, borderRadius: 5, background: `${s.accent}16`, border: `1px solid ${s.accent}38`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Check color={s.accent} />
                      </div>
                      <span style={{ fontSize: 12, color: "var(--ink-2)" }}>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── NIŠAS ── */}
      <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", border: "1px solid var(--line)", background: "#fff", boxShadow: cardShadow }}>
        <div style={{ position: "relative", padding: "24px 26px" }}>
          <div style={sectionLabel(G)}>Kam pārdot — reālas nišas Latvijā</div>
          <p style={{ fontSize: 12.5, color: "var(--ink-3)", lineHeight: 1.65, marginBottom: 16, marginTop: -8 }}>Šie uzņēmumi ir gatavi maksāt — tiem ir budžets, vajadzība un nav laika risināt digitālo pašiem.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(185px, 1fr))", gap: 9 }}>
            {niches.map((n) => (
              <div key={n.title} style={{ padding: "15px 16px", borderRadius: 12, background: "var(--bg)", border: "1px solid var(--line)" }}>
                <div style={{ marginBottom: 9 }}><EmojiIcon emoji={n.icon} size={20} color={G} strokeWidth={1.75} /></div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)", marginBottom: 4 }}>{n.title}</div>
                <div style={{ fontSize: 11, color: "var(--ink-3)", lineHeight: 1.55, marginBottom: 9 }}>{n.need}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}><Dot color={G} /><span style={{ fontSize: 12, fontWeight: 700, color: G }}>{n.price}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── STATISTIKA ── */}
      <div style={{ position: "relative", padding: "26px 28px", borderRadius: 16, overflow: "hidden", border: `1px solid ${G}22`, background: "linear-gradient(135deg, rgba(0,191,165,0.06) 0%, #fff 60%)", boxShadow: cardShadow }}>
        <div style={{ position: "absolute", bottom: -70, left: -50, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(51,212,191,0.10) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <div style={sectionLabel(G)}>Latvijas tirgus iespēja</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 16 }}>
            {stats.map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 6, color: s.color }}><AnimatedNumber value={s.value} /></div>
                <div style={{ fontSize: 11.5, color: "var(--ink-3)", lineHeight: 1.5 }}>{s.label}</div>
                <div style={{ height: 2, borderRadius: 2, background: `linear-gradient(90deg, ${s.color}, transparent)`, marginTop: 9 }} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, padding: "13px 16px", borderRadius: 11, background: "#fff", border: "1px solid var(--line)", display: "flex", gap: 10 }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>💡</span>
            <p style={{ fontSize: 12, color: "var(--ink-2)", lineHeight: 1.7, margin: 0 }}>Lielākā daļa uzņēmumu nekad nav dzirdējuši par <strong style={{ color: "var(--ink)" }}>Voiceflow, Framer vai Claude</strong>. Tu nāc ar risinājumu, par kuru viņi nezina ka eksistē.</p>
          </div>
        </div>
      </div>

      {/* ── IENĀKUMI ── */}
      <div style={{ position: "relative", padding: "24px 26px", borderRadius: 16, overflow: "hidden", border: "1px solid var(--line)", background: "#fff", boxShadow: cardShadow }}>
        <div style={{ position: "relative" }}>
          <div style={sectionLabel(G)}>Reāla ienākumu trajektorija</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {income.map((row, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 72, flexShrink: 0, fontSize: 10, fontWeight: 700, color: "var(--ink-3)" }}>{row.period}</div>
                <div style={{ flex: 1, position: "relative", height: 32, borderRadius: 7, background: "var(--bg-2)", overflow: "hidden", border: "1px solid var(--line)" }}>
                  <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${row.pct}%`, background: "linear-gradient(90deg, #00BFA5, #33D4BF)", borderRadius: 6 }} />
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 10px" }}>
                    <span style={{ fontSize: 10.5, color: row.pct > 20 ? "#fff" : "var(--ink-3)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: 500 }}>{row.desc}</span>
                  </div>
                </div>
                <div style={{ width: 120, flexShrink: 0, textAlign: "right", fontSize: 12.5, fontWeight: 800, color: row.pct > 30 ? G : "var(--ink-3)", letterSpacing: "-0.01em" }}>{row.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MODUĻI ── */}
      <div>
        <div style={sectionLabel(G)}>Tavs ceļš caur 5 blokiem</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(185px, 1fr))", gap: 9 }}>
          {modules.map((m) => (
            <div key={m.num} style={{ position: "relative", padding: "16px 18px", borderRadius: 13, background: "#fff", border: `1px solid ${m.color}2e`, overflow: "hidden", boxShadow: cardShadow }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: `${m.color}16`, border: `1px solid ${m.color}3a`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, color: m.color, flexShrink: 0 }}>{m.num}</div>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>{m.title}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <Check color={m.color} /><span style={{ fontSize: 11, color: "var(--ink-3)" }}>{m.milestone}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ position: "relative", padding: "24px 26px", borderRadius: 16, overflow: "hidden", border: `1px solid ${G}33`, background: "linear-gradient(135deg, rgba(0,191,165,0.10) 0%, rgba(51,212,191,0.05) 55%, #fff 100%)", boxShadow: "0 16px 44px -24px rgba(0,191,165,0.4)" }}>
        <div style={{ position: "absolute", top: -50, right: -40, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,191,165,0.12), transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", display: "flex", alignItems: "flex-start", gap: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg, #00BFA5, #33D4BF)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 20, boxShadow: "0 8px 22px -8px rgba(0,191,165,0.6)" }}>🎯</div>
          <div>
            <div style={{ fontSize: 14.5, fontWeight: 800, color: "var(--ink)", marginBottom: 6, letterSpacing: "-0.01em" }}>Pēc šīs nodarbības tu saproti, kāpēc šis ir vērtīgākais pakalpojums Latvijā</div>
            <p style={{ fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.75, margin: "0 0 12px" }}>Nākamajā nodarbībā — <strong style={{ color: "var(--ink)" }}>3 konkrēti pakalpojumi</strong> ko vari piedāvāt jau šonedēļ un kā noteikt pirmo cenu.</p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {[{ c: G, t: "38 nodarbības" }, { c: G2, t: "Bez programmēšanas" }, { c: AM, t: "Latvijas tirgum" }].map((b) => (
                <div key={b.t} style={{ display: "flex", alignItems: "center", gap: 6 }}><Dot color={b.c} /><span style={{ fontSize: 11.5, color: "var(--ink-3)", fontWeight: 500 }}>{b.t}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
