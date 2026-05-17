"use client";

const P  = "#a855f7";
const P2 = "#ec4899";
const G  = "#00ff88";
const C  = "#00d4ff";
const AM = "#f59e0b";

function GlowDot({ color }: { color: string }) {
  return <div style={{ width: 7, height: 7, borderRadius: "50%", background: color, boxShadow: `0 0 8px ${color}, 0 0 18px ${color}55`, flexShrink: 0 }} />;
}
function Check({ color = P }: { color?: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3.5" style={{ flexShrink: 0 }}>
      <polyline points="20,6 9,17 4,12" />
    </svg>
  );
}
function GridBg({ color, size = 28 }: { color: string; size?: number }) {
  return <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`, backgroundSize: `${size}px ${size}px` }} />;
}

const freeTools = [
  { icon: "💬", name: "ChatGPT", plan: "Bezmaksas", color: G,  use: "Skripti, captions, e-pasti",   limit: "40 ziņ / 3 stundas", starter: true },
  { icon: "🎨", name: "Canva",   plan: "Bezmaksas", color: P2, use: "Banneri, posti, carousels",     limit: "Daļa veidņu slēgta", starter: true },
  { icon: "✂️", name: "CapCut",  plan: "Bezmaksas", color: C,  use: "Video montāža + subtitri",      limit: "Neliels ūdenszīmogs", starter: true },
  { icon: "📅", name: "Buffer",  plan: "Bezmaksas", color: AM, use: "Publicēšana 3 kanālos",         limit: "Maks. 10 plānoti posti", starter: true },
  { icon: "🤖", name: "Gemini",  plan: "Bezmaksas", color: "#4285f4", use: "Teksts, idejas, analīze", limit: "Bezmaksas bez limits", starter: false },
  { icon: "📝", name: "Notion",  plan: "Bezmaksas", color: "#fff",    use: "Klientu pārvaldība",       limit: "Personīgs plāns bez limits", starter: false },
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
      <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(0,212,255,0.2)", padding: "24px 26px" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(5,5,8,1) 0%, rgba(5,12,18,1) 100%)" }} />
        <div style={{ position: "absolute", top: -70, right: -50, width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,212,255,0.18) 0%, transparent 65%)", pointerEvents: "none" }} />
        <GridBg color="rgba(0,212,255,0.03)" size={26} />
        <div style={{ position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 12px", borderRadius: 20, background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.25)", marginBottom: 14 }}>
            <GlowDot color={C} />
            <span style={{ fontSize: 10, fontWeight: 700, color: C, letterSpacing: "0.08em", textTransform: "uppercase" }}>Nodarbība 1.3 · Rīki</span>
          </div>
          <h2 style={{ fontSize: "clamp(18px,3vw,26px)", fontWeight: 900, letterSpacing: "-0.025em", lineHeight: 1.2, marginBottom: 10, color: "#fff" }}>
            Pilns rīku komplekts —{" "}
            <span style={{ background: "linear-gradient(135deg, #00d4ff, #a855f7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>sāc ar €0</span>
          </h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: 540, margin: 0 }}>
            Pirmajiem 2 mēnešiem vajag tikai <strong style={{ color: "#ddd" }}>4 bezmaksas rīkus</strong>. Maksas rīkus pievieno tikai kad pirmā nauda no klientiem jau ir kontā.
          </p>
        </div>
      </div>

      {/* ── BEZMAKSAS RĪKI ── */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: G, textTransform: "uppercase", letterSpacing: "0.09em" }}>Bezmaksas rīki — sāc šodien</div>
          <div style={{ flex: 1, height: 1, background: "rgba(0,255,136,0.12)" }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {freeTools.map((t) => (
            <div key={t.name} style={{ padding: "14px 15px", borderRadius: 12, background: `${t.color}08`, border: `1px solid ${t.color}${t.starter ? "28" : "16"}`, position: "relative", overflow: "hidden" }}>
              {t.starter && (
                <div style={{ position: "absolute", top: 8, right: 10, fontSize: 8, fontWeight: 800, color: G, background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.22)", borderRadius: 20, padding: "2px 7px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Starter</div>
              )}
              <div style={{ fontSize: 20, marginBottom: 8 }}>{t.icon}</div>
              <div style={{ fontSize: 13, fontWeight: 800, color: "#fff", marginBottom: 2 }}>{t.name}</div>
              <div style={{ fontSize: 11, color: "#666", marginBottom: 8, lineHeight: 1.4 }}>{t.use}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 8px", borderRadius: 7, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none"><circle cx="4.5" cy="4.5" r="4" stroke="#555" strokeWidth="1"/><path d="M4.5 3v2l1 1" stroke="#555" strokeWidth="1" strokeLinecap="round"/></svg>
                <span style={{ fontSize: 10, color: "#555" }}>{t.limit}</span>
              </div>
              <div style={{ height: 2, borderRadius: 2, background: `linear-gradient(90deg, ${t.color}50, transparent)`, marginTop: 10 }} />
            </div>
          ))}
        </div>
      </div>

      {/* ── MAKSAS RĪKI (kad upgrade) ── */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: AM, textTransform: "uppercase", letterSpacing: "0.09em" }}>Maksas rīki — pievienot vēlāk</div>
          <div style={{ flex: 1, height: 1, background: "rgba(245,158,11,0.12)" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {paidTools.map((t) => (
            <div key={t.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 15px", borderRadius: 11, background: `${t.color}07`, border: `1px solid ${t.color}18` }}>
              <div style={{ fontSize: 20, flexShrink: 0 }}>{t.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{t.name}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: t.color, background: `${t.color}12`, border: `1px solid ${t.color}25`, borderRadius: 20, padding: "1px 8px" }}>{t.price}</span>
                </div>
                <div style={{ fontSize: 11, color: "#555", marginBottom: 3 }}>🕐 {t.when}</div>
                <div style={{ fontSize: 11, color: "#777" }}>✦ {t.gain}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── IKMĒNEŠA IZMAKSAS ── */}
      <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", border: "1px solid rgba(168,85,247,0.12)", padding: "20px 22px" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(5,5,8,1), rgba(10,5,20,1))" }} />
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: P, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 14 }}>Izmaksu augšana pa mēnešiem</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {monthlyCost.map((row, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "90px 50px 1fr", gap: 10, alignItems: "center" }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "#555" }}>{row.phase}</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: row.color, textAlign: "center", textShadow: `0 0 12px ${row.color}50` }}>{row.cost}</div>
                <div style={{ fontSize: 11, color: "#555", paddingLeft: 4, borderLeft: `2px solid ${row.color}30` }}>{row.tools}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, padding: "10px 14px", borderRadius: 9, background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.12)", display: "flex", gap: 10 }}>
            <GlowDot color={G} />
            <span style={{ fontSize: 11.5, color: "#666" }}>Pirmie <strong style={{ color: "#ccc" }}>2 mēneši = €0 izmaksas</strong>. Maksas rīkus pievieno tikai pēc pirmā klienta samaksas.</span>
          </div>
        </div>
      </div>

      {/* ── STARTER STACK ── */}
      <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", border: "1px solid rgba(0,255,136,0.15)", padding: "20px 22px" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(5,8,5,1), rgba(5,12,8,1))" }} />
        <GridBg color="rgba(0,255,136,0.025)" size={22} />
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: G, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 14 }}>Ieteicamais sākuma rīku komplekts</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {starterStack.map((s) => (
              <div key={s.step} style={{ display: "flex", gap: 12, alignItems: "center", padding: "11px 13px", borderRadius: 9, background: `${s.color}07`, border: `1px solid ${s.color}18` }}>
                <div style={{ width: 22, height: 22, borderRadius: 7, background: `${s.color}14`, border: `1px solid ${s.color}28`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, color: s.color, flexShrink: 0 }}>{s.step}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: "#fff" }}>{s.tool}</div>
                  <div style={{ fontSize: 11, color: "#555", marginTop: 1 }}>{s.task}</div>
                </div>
                <Check color={s.color} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, display: "flex", gap: 6, flexWrap: "wrap" }}>
            {[{ c: G, t: "€0 sākumā" }, { c: C, t: "Instalē šodien" }, { c: AM, t: "Viss latviski" }].map(b => (
              <div key={b.t} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 12px", borderRadius: 20, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <GlowDot color={b.c} /><span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>{b.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
