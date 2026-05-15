"use client";

const G  = "#00ff88";
const G2 = "#00d4ff";
const P  = "#a855f7";
const AM = "#f59e0b";
const PK = "#ec4899";

function GlowDot({ color }: { color: string }) {
  return <div style={{ width: 7, height: 7, borderRadius: "50%", background: color, boxShadow: `0 0 8px ${color}, 0 0 18px ${color}55`, flexShrink: 0 }} />;
}
function Check({ color = G }: { color?: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3.5" style={{ flexShrink: 0 }}>
      <polyline points="20,6 9,17 4,12" />
    </svg>
  );
}
function GridBg({ color, size = 26 }: { color: string; size?: number }) {
  return <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`, backgroundSize: `${size}px ${size}px` }} />;
}

const services = [
  {
    accent: G, accent2: G2,
    label: "Pakalpojums #1",
    title: "Mājaslapa",
    earn: "€300–€900", per: "projekts + €100/mēn atbalsts",
    desc: "Profesionāla mājaslapa bez programmēšanas — Framer vai Webflow, SEO, mobilā versija. Klients maksā projektu un ikmēneša atbalstu.",
    points: ["Framer / Webflow — bez koda", "SEO pamati + Google meklēšana", "Nodošana ar rēķinu un līgumu"],
  },
  {
    accent: G2, accent2: P,
    label: "Pakalpojums #2",
    title: "Web Chatbot",
    earn: "€200–€500", per: "uzstādīšana + €100–€200/mēn",
    desc: "AI chatbot kas atbild klientiem 24/7, vāc kontaktinformāciju un samazina uzņēmuma telefona zvanus par 60%.",
    points: ["Voiceflow — vizuāls, bez koda", "Lead vākšana automātiski", "1 koda rinda integrācijai mājaslapā"],
  },
  {
    accent: AM, accent2: PK,
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
  { icon: "📋", name: "Notion",           desc: "Klientu onboarding",   color: "#64748b" },
];

const modules = [
  { num: "1", color: G,   title: "Ievads & Tirgus",       milestone: "Saproti iespējas, uzstādā rīkus" },
  { num: "2", color: G2,  title: "Mājaslapa",             milestone: "Gatava mājaslapa pirmajam klientam" },
  { num: "3", color: AM,  title: "Web Chatbot",           milestone: "Chatbot uzstādīts un testēts" },
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
      <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(0,255,136,0.22)", boxShadow: "0 24px 64px rgba(0,255,136,0.1), 0 4px 16px rgba(0,0,0,0.4)" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(5,8,5,1) 0%, rgba(5,8,10,1) 100%)" }} />
        <div style={{ position: "absolute", top: -120, right: -80, width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,255,136,0.18) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -80, left: -60, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 65%)", pointerEvents: "none" }} />
        <GridBg color="rgba(0,255,136,0.035)" size={30} />
        <div style={{ position: "relative", padding: "40px 36px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 13px", borderRadius: 20, background: "rgba(0,255,136,0.1)", border: "1px solid rgba(0,255,136,0.28)", marginBottom: 18 }}>
            <GlowDot color={G} />
            <span style={{ fontSize: 10, fontWeight: 700, color: G, letterSpacing: "0.08em", textTransform: "uppercase" }}>Digitālais Speciālists · 5 bloki · 38 nodarbības</span>
          </div>
          <h2 style={{ fontSize: "clamp(20px,4vw,32px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 12, color: "#fff" }}>
            Kā uzņēmumi maksā<br />
            <span style={{ background: "linear-gradient(135deg, #00ff88, #00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>par tevi katru mēnesi</span>
          </h2>
          <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.52)", lineHeight: 1.75, maxWidth: 520, marginBottom: 24 }}>
            Tu apgūsi 3 konkrētus digitālos pakalpojumus — mājaslapa, chatbot, e-pasta automatizācija. Uzņēmumi maksā <strong style={{ color: "#ddd" }}>€500–€7 200 mēnesī</strong>.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[{ c: G, t: "Bez programmēšanas" }, { c: G2, t: "Klients 4 nedēļās" }, { c: AM, t: "Latvijas reāli piemēri" }].map((b) => (
              <div key={b.t} style={{ display: "flex", alignItems: "center", gap: 7, padding: "6px 13px", borderRadius: 9, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)" }}>
                <GlowDot color={b.c} /><span style={{ fontSize: 11.5, fontWeight: 600, color: "rgba(255,255,255,0.78)" }}>{b.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3 PAKALPOJUMI ── */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: G, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 14 }}>3 pakalpojumi ko tu apgūsi un pārdosi</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {services.map((s, i) => (
            <div key={i} style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${s.accent}20`, boxShadow: "0 6px 24px rgba(0,0,0,0.3)" }}>
              <div style={{ position: "relative", height: 110, overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(5,8,5,0.92), rgba(5,8,12,0.96))" }} />
                <div style={{ position: "absolute", top: -60, right: -40, width: 240, height: 240, borderRadius: "50%", background: `radial-gradient(circle, ${s.accent}32 0%, transparent 65%)`, pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: -40, left: -30, width: 180, height: 180, borderRadius: "50%", background: `radial-gradient(circle, ${s.accent2}1a 0%, transparent 65%)`, pointerEvents: "none" }} />
                <GridBg color={`${s.accent}04`} size={20} />
                <div style={{ position: "absolute", top: 16, left: 18 }}>
                  <span style={{ fontSize: 9.5, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: `${s.accent}16`, border: `1px solid ${s.accent}36`, color: s.accent, letterSpacing: "0.07em", textTransform: "uppercase" }}>{s.label}</span>
                </div>
                <div style={{ position: "absolute", bottom: 14, left: 18, right: 18, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 10 }}>
                  <h3 style={{ fontSize: 19, fontWeight: 900, letterSpacing: "-0.02em", color: "#fff", margin: 0 }}>{s.title}</h3>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 16, fontWeight: 900, background: `linear-gradient(135deg, ${s.accent}, ${s.accent2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.earn}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.32)", marginTop: 1 }}>{s.per}</div>
                  </div>
                </div>
              </div>
              <div style={{ padding: "14px 18px 18px", background: "#05080a" }}>
                <p style={{ fontSize: 12.5, color: "#677", lineHeight: 1.7, marginBottom: 12 }}>{s.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  {s.points.map((pt, pi) => (
                    <div key={pi} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 17, height: 17, borderRadius: 5, background: `${s.accent}10`, border: `1px solid ${s.accent}26`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Check color={s.accent} />
                      </div>
                      <span style={{ fontSize: 12, color: "#8a9a8a" }}>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── NIŠAS ── */}
      <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(0,255,136,0.12)", boxShadow: "0 6px 28px rgba(0,0,0,0.3)" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(5,8,5,1), rgba(5,10,8,1))" }} />
        <div style={{ position: "absolute", top: -60, right: -40, width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,255,136,0.1) 0%, transparent 65%)", pointerEvents: "none" }} />
        <GridBg color="rgba(0,255,136,0.025)" size={22} />
        <div style={{ position: "relative", padding: "24px 26px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: G, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 6 }}>Kam pārdot — reālas nišas Latvijā</div>
          <p style={{ fontSize: 12.5, color: "#566", lineHeight: 1.65, marginBottom: 16 }}>Šie uzņēmumi ir gatavi maksāt — tiem ir budžets, vajadzība un nav laika risināt digitālo pašiem.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(185px, 1fr))", gap: 9 }}>
            {niches.map((n) => (
              <div key={n.title} style={{ padding: "15px 16px", borderRadius: 12, background: "rgba(10,16,12,0.85)", border: "1px solid rgba(0,255,136,0.1)", boxShadow: "0 3px 12px rgba(0,0,0,0.22), inset 0 1px 0 rgba(0,255,136,0.03)" }}>
                <div style={{ fontSize: 20, marginBottom: 9 }}>{n.icon}</div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: "#ddd", marginBottom: 4 }}>{n.title}</div>
                <div style={{ fontSize: 11, color: "#455", lineHeight: 1.55, marginBottom: 9 }}>{n.need}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}><GlowDot color={G} /><span style={{ fontSize: 12, fontWeight: 700, color: G }}>{n.price}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── STATISTIKA ── */}
      <div style={{ position: "relative", padding: "26px 28px", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(0,255,136,0.12)", boxShadow: "0 6px 32px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.03)" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(5,8,5,1), rgba(5,10,8,1))" }} />
        <div style={{ position: "absolute", bottom: -70, left: -50, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: G, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 20 }}>Latvijas tirgus iespēja</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 16 }}>
            {stats.map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 6, background: `linear-gradient(135deg, ${s.color}, ${s.color}99)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: `drop-shadow(0 0 10px ${s.color}55)` }}>{s.value}</div>
                <div style={{ fontSize: 11.5, color: "#455", lineHeight: 1.5 }}>{s.label}</div>
                <div style={{ height: 2, borderRadius: 2, background: `linear-gradient(90deg, ${s.color}50, transparent)`, marginTop: 9 }} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, padding: "13px 16px", borderRadius: 11, background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.11)", display: "flex", gap: 10 }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>💡</span>
            <p style={{ fontSize: 12, color: "#677", lineHeight: 1.7, margin: 0 }}>Lielākā daļa uzņēmumu nekad nav dzirdējuši par <strong style={{ color: "#bbb" }}>Voiceflow, Framer vai Claude</strong>. Tu nāc ar risinājumu, par kuru viņi nezina ka eksistē.</p>
          </div>
        </div>
      </div>

      {/* ── RĪKI ── */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: G, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 14 }}>AI rīki ko tu apgūsi</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(148px, 1fr))", gap: 9 }}>
          {tools.map((t) => (
            <div key={t.name}
              style={{ padding: "13px 15px", borderRadius: 13, background: "rgba(8,12,10,0.9)", border: `1px solid ${t.color}15`, display: "flex", alignItems: "center", gap: 11, boxShadow: "0 3px 12px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.025)", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 10px 28px rgba(0,0,0,0.28), 0 0 0 1px ${t.color}28`; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 3px 12px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.025)"; }}
            >
              <div style={{ width: 36, height: 36, borderRadius: 9, background: `${t.color}10`, border: `1px solid ${t.color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>{t.icon}</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#ddd" }}>{t.name}</div>
                <div style={{ fontSize: 10.5, color: "#3a4a3a", marginTop: 2 }}>{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── IENĀKUMI ── */}
      <div style={{ position: "relative", padding: "24px 26px", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(0,255,136,0.1)", boxShadow: "0 6px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.025)" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(5,8,5,1), rgba(5,10,8,1))" }} />
        <div style={{ position: "absolute", top: -50, right: -40, width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,255,136,0.08), transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: G, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 18 }}>Reāla ienākumu trajektorija</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {income.map((row, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 72, flexShrink: 0, fontSize: 10, fontWeight: 600, color: "#2a3a2a" }}>{row.period}</div>
                <div style={{ flex: 1, position: "relative", height: 32, borderRadius: 7, background: "rgba(255,255,255,0.02)", overflow: "hidden", border: "1px solid rgba(255,255,255,0.035)" }}>
                  <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${row.pct}%`, background: "linear-gradient(90deg, rgba(0,255,136,0.45), rgba(0,212,255,0.28))", borderRadius: 6 }} />
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 10px" }}>
                    <span style={{ fontSize: 10.5, color: row.pct > 20 ? "rgba(200,240,200,0.7)" : "#3a5a3a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{row.desc}</span>
                  </div>
                </div>
                <div style={{ width: 120, flexShrink: 0, textAlign: "right", fontSize: 12.5, fontWeight: 800, color: row.pct > 30 ? G : "#2a4a2a", letterSpacing: "-0.01em" }}>{row.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MODUĻI ── */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: G, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 14 }}>Tavs ceļš caur 5 blokiem</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(185px, 1fr))", gap: 9 }}>
          {modules.map((m) => (
            <div key={m.num} style={{ position: "relative", padding: "16px 18px", borderRadius: 13, background: "rgba(8,12,10,0.9)", border: `1px solid ${m.color}16`, overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.025)" }}>
              <div style={{ position: "absolute", top: -35, right: -35, width: 100, height: 100, borderRadius: "50%", background: `radial-gradient(circle, ${m.color}10, transparent 70%)`, pointerEvents: "none" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: `${m.color}10`, border: `1px solid ${m.color}2a`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, color: m.color, flexShrink: 0, boxShadow: `0 0 10px ${m.color}18` }}>{m.num}</div>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: "#ddd" }}>{m.title}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <Check color={m.color} /><span style={{ fontSize: 11, color: "#3a5a3a" }}>{m.milestone}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ position: "relative", padding: "24px 26px", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(0,255,136,0.18)", boxShadow: "0 12px 40px rgba(0,255,136,0.07)" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,255,136,0.07) 0%, rgba(0,212,255,0.04) 50%, rgba(5,8,5,0.97) 100%)" }} />
        <GridBg color="rgba(0,255,136,0.02)" size={22} />
        <div style={{ position: "absolute", top: -50, right: -40, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,212,255,0.1), transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", display: "flex", alignItems: "flex-start", gap: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg, rgba(0,255,136,0.22), rgba(0,212,255,0.22))", border: "1px solid rgba(0,255,136,0.35)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 20, boxShadow: "0 6px 20px rgba(0,255,136,0.12)" }}>🎯</div>
          <div>
            <div style={{ fontSize: 14.5, fontWeight: 800, color: "#ddd", marginBottom: 6, letterSpacing: "-0.01em" }}>Pēc šīs nodarbības tu saproti, kāpēc šis ir vērtīgākais pakalpojums Latvijā</div>
            <p style={{ fontSize: 12.5, color: "#566", lineHeight: 1.75, margin: "0 0 12px" }}>Nākamajā nodarbībā — <strong style={{ color: "#bbb" }}>3 konkrēti pakalpojumi</strong> ko vari piedāvāt jau šonedēļ un kā noteikt pirmo cenu.</p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {[{ c: G, t: "38 nodarbības" }, { c: G2, t: "Bez programmēšanas" }, { c: AM, t: "Latvijas tirgum" }].map((b) => (
                <div key={b.t} style={{ display: "flex", alignItems: "center", gap: 6 }}><GlowDot color={b.c} /><span style={{ fontSize: 11.5, color: "#3a5a3a", fontWeight: 500 }}>{b.t}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
