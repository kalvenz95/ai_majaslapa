"use client";

/* Brand-derived light palette */
const P  = "#6D5EF3";
const P2 = "#9B8FF7";
const G  = "#00BFA5";
const C  = "#33D4BF";
const AM = "#FFB86B";

function Dot({ color }: { color: string }) {
  return <div style={{ width: 7, height: 7, borderRadius: "50%", background: color, flexShrink: 0 }} />;
}
function Check({ color = P }: { color?: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3.5" style={{ flexShrink: 0 }}>
      <polyline points="20,6 9,17 4,12" />
    </svg>
  );
}

const cardShadow = "0 12px 36px -20px rgba(17,17,17,0.16)";
const sectionLabel = (color: string): React.CSSProperties => ({
  fontSize: 10, fontWeight: 800, color, textTransform: "uppercase", letterSpacing: "0.09em",
});

const freeTools = [
  { icon: "💬", name: "ChatGPT", plan: "Bezmaksas", color: G,  use: "Skripti, captions, e-pasti",   limit: "40 ziņ / 3 stundas", starter: true },
  { icon: "🎨", name: "Canva",   plan: "Bezmaksas", color: P2, use: "Banneri, posti, carousels",     limit: "Daļa veidņu slēgta", starter: true },
  { icon: "✂️", name: "CapCut",  plan: "Bezmaksas", color: C,  use: "Video montāža + subtitri",      limit: "Neliels ūdenszīmogs", starter: true },
  { icon: "📅", name: "Buffer",  plan: "Bezmaksas", color: AM, use: "Publicēšana 3 kanālos",         limit: "Maks. 10 plānoti posti", starter: true },
  { icon: "🤖", name: "Gemini",  plan: "Bezmaksas", color: P, use: "Teksts, idejas, analīze", limit: "Bezmaksas bez limits", starter: false },
  { icon: "📝", name: "Notion",  plan: "Bezmaksas", color: "#5B5B5B",    use: "Klientu pārvaldība",       limit: "Personīgs plāns bez limits", starter: false },
];

const paidTools = [
  { icon: "💬", name: "ChatGPT Plus", price: "$20/mēn", color: G,  when: "Kad ir 1.–2. klients", gain: "GPT-4o, ātrāks, attēli" },
  { icon: "🎨", name: "Canva Pro",    price: "€11.99/mēn", color: P2, when: "Kad vajag premium veidnes", gain: "5 000+ Pro veidnes, BG noņemšana" },
  { icon: "🎬", name: "Runway ML",   price: "no $15/mēn", color: P, when: "Kad piedāvā AI video", gain: "5s video ģenerēšana no prompta" },
  { icon: "🤖", name: "HeyGen",      price: "no $29/mēn", color: P2, when: "Kad vajag avatar video", gain: "AI cilvēka prezentācija" },
];

const starterStack = [
  { step: "1", tool: "ChatGPT (bezmaksas)", task: "Raksti skriptus un captions", color: G },
  { step: "2", tool: "Canva (bezmaksas)", task: "Veido post dizainus un bannerus", color: P2 },
  { step: "3", tool: "CapCut (bezmaksas)", task: "Montē video, pievieno subtitrus", color: C },
  { step: "4", tool: "Buffer (bezmaksas)", task: "Plāno publicēšanu klientam", color: AM },
];

const monthlyCost = [
  { phase: "1.–2. mēn.", cost: "€0", tools: "Tikai bezmaksas rīki", color: G },
  { phase: "3. mēnesis", cost: "€20", tools: "ChatGPT Plus (pirmā nauda jau ieradusies)", color: C },
  { phase: "4.–5. mēn.", cost: "€32", tools: "+ Canva Pro", color: P },
  { phase: "6+ mēneši", cost: "€67–96", tools: "+ Runway vai HeyGen", color: AM },
];

export function SaturaLesson13Content() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22, paddingTop: 22 }}>

      {/* ── INTRO ── */}
      <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", border: `1px solid ${C}33`, padding: "24px 26px", background: "linear-gradient(135deg, rgba(51,212,191,0.10) 0%, rgba(0,191,165,0.05) 55%, #fff 100%)", boxShadow: cardShadow }}>
        <div style={{ position: "absolute", top: -70, right: -50, width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,191,165,0.10) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 12px", borderRadius: 20, background: `${G}14`, border: `1px solid ${G}33`, marginBottom: 14 }}>
            <Dot color={G} />
            <span style={{ fontSize: 10, fontWeight: 700, color: G, letterSpacing: "0.08em", textTransform: "uppercase" }}>Nodarbība 1.3 · Rīki</span>
          </div>
          <h2 style={{ fontSize: "clamp(18px,3vw,26px)", fontWeight: 900, letterSpacing: "-0.025em", lineHeight: 1.2, marginBottom: 10, color: "var(--ink)" }}>
            Pilns rīku komplekts —{" "}
            <span style={{ background: "linear-gradient(135deg, #00BFA5, #6D5EF3)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>sāc ar €0</span>
          </h2>
          <p style={{ fontSize: 13, color: "var(--ink-3)", lineHeight: 1.75, maxWidth: 540, margin: 0 }}>
            Pirmajiem 2 mēnešiem vajag tikai <strong style={{ color: "var(--ink)" }}>4 bezmaksas rīkus</strong>. Maksas rīkus pievieno tikai kad pirmā nauda no klientiem jau ir kontā.
          </p>
        </div>
      </div>

      {/* ── BEZMAKSAS RĪKI ── */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={sectionLabel(G)}>Bezmaksas rīki — sāc šodien</div>
          <div style={{ flex: 1, height: 1, background: "var(--line)" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {freeTools.map((t) => (
            <div key={t.name} style={{ padding: "14px 15px", borderRadius: 12, background: "#fff", border: `1px solid ${t.color}${t.starter ? "33" : "22"}`, position: "relative", overflow: "hidden", boxShadow: cardShadow }}>
              {t.starter && (
                <div style={{ position: "absolute", top: 8, right: 10, fontSize: 8, fontWeight: 800, color: G, background: `${G}14`, border: `1px solid ${G}33`, borderRadius: 20, padding: "2px 7px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Starter</div>
              )}
              <div style={{ fontSize: 20, marginBottom: 8 }}>{t.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: "var(--ink)", marginBottom: 2 }}>{t.name}</div>
              <div style={{ fontSize: 11, color: "var(--ink-3)", marginBottom: 8, lineHeight: 1.4 }}>{t.use}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 8px", borderRadius: 7, background: "var(--bg)", border: "1px solid var(--line)" }}>
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><circle cx="4.5" cy="4.5" r="4" stroke="var(--ink-4)" strokeWidth="1"/><path d="M4.5 3v2l1 1" stroke="var(--ink-4)" strokeWidth="1" strokeLinecap="round"/></svg>
                <span style={{ fontSize: 10, color: "var(--ink-3)" }}>{t.limit}</span>
              </div>
              <div style={{ height: 2, borderRadius: 2, background: `linear-gradient(90deg, ${t.color}, transparent)`, marginTop: 10 }} />
            </div>
          ))}
        </div>
      </div>

      {/* ── MAKSAS RĪKI (kad upgrade) ── */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={sectionLabel(AM)}>Maksas rīki — pievienot vēlāk</div>
          <div style={{ flex: 1, height: 1, background: "var(--line)" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {paidTools.map((t) => (
            <div key={t.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 15px", borderRadius: 11, background: "#fff", border: `1px solid ${t.color}2a`, boxShadow: cardShadow }}>
              <div style={{ fontSize: 20, flexShrink: 0 }}>{t.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>{t.name}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: t.color, background: `${t.color}16`, border: `1px solid ${t.color}33`, borderRadius: 20, padding: "1px 8px" }}>{t.price}</span>
                </div>
                <div style={{ fontSize: 11, color: "var(--ink-3)", marginBottom: 3 }}>🕐 {t.when}</div>
                <div style={{ fontSize: 11, color: "var(--ink-2)" }}>✦ {t.gain}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── IKMĒNEŠA IZMAKSAS ── */}
      <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", border: "1px solid var(--line)", padding: "20px 22px", background: "#fff", boxShadow: cardShadow }}>
        <div style={{ position: "relative" }}>
          <div style={{ ...sectionLabel(P), marginBottom: 14 }}>Izmaksu augšana pa mēnešiem</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {monthlyCost.map((row, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "90px 50px 1fr", gap: 10, alignItems: "center" }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "var(--ink-3)" }}>{row.phase}</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: row.color, textAlign: "center" }}>{row.cost}</div>
                <div style={{ fontSize: 11, color: "var(--ink-2)", paddingLeft: 8, borderLeft: `2px solid ${row.color}55` }}>{row.tools}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, padding: "10px 14px", borderRadius: 9, background: `${G}10`, border: `1px solid ${G}2e`, display: "flex", gap: 10 }}>
            <Dot color={G} />
            <span style={{ fontSize: 11.5, color: "var(--ink-2)" }}>Pirmie <strong style={{ color: "var(--ink)" }}>2 mēneši = €0 izmaksas</strong>. Maksas rīkus pievieno tikai pēc pirmā klienta samaksas.</span>
          </div>
        </div>
      </div>

      {/* ── STARTER STACK ── */}
      <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", border: `1px solid ${G}2a`, padding: "20px 22px", background: "linear-gradient(135deg, rgba(0,191,165,0.06) 0%, #fff 60%)", boxShadow: cardShadow }}>
        <div style={{ position: "relative" }}>
          <div style={{ ...sectionLabel(G), marginBottom: 14 }}>Ieteicamais sākuma rīku komplekts</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {starterStack.map((s) => (
              <div key={s.step} style={{ display: "flex", gap: 12, alignItems: "center", padding: "11px 13px", borderRadius: 9, background: "#fff", border: `1px solid ${s.color}2a` }}>
                <div style={{ width: 22, height: 22, borderRadius: 7, background: `${s.color}18`, border: `1px solid ${s.color}3a`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, color: s.color, flexShrink: 0 }}>{s.step}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>{s.tool}</div>
                  <div style={{ fontSize: 11, color: "var(--ink-3)", marginTop: 1 }}>{s.task}</div>
                </div>
                <Check color={s.color} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, display: "flex", gap: 6, flexWrap: "wrap" }}>
            {[{ c: G, t: "€0 sākumā" }, { c: C, t: "Instalē šodien" }, { c: AM, t: "Viss latviski" }].map(b => (
              <div key={b.t} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 20, background: "#fff", border: "1px solid var(--line)" }}>
                <Dot color={b.c} /><span style={{ fontSize: 11, fontWeight: 600, color: "var(--ink-2)" }}>{b.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
