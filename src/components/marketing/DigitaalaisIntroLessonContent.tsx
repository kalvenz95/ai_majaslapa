"use client";

const G  = "#00ff88";
const G2 = "#00d4ff";
const P  = "#a855f7";
const AMBER = "#f59e0b";
const PINK  = "#ec4899";

const IMG = {
  hero:     "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=90&fit=crop&crop=center",
  website:  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=85&fit=crop&crop=center",
  chatbot:  "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=85&fit=crop&crop=center",
  clients:  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=85&fit=crop&crop=center",
  niches:   "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=85&fit=crop&crop=center",
};

function GlowDot({ color }: { color: string }) {
  return <div style={{ width: 7, height: 7, borderRadius: "50%", background: color, boxShadow: `0 0 10px ${color}, 0 0 22px ${color}55`, flexShrink: 0 }} />;
}

function Check({ color = G }: { color?: string }) {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3.5" style={{ flexShrink: 0 }}>
      <polyline points="20,6 9,17 4,12" />
    </svg>
  );
}

export function DigitaalaisIntroLessonContent() {

  const services = [
    {
      img: IMG.website,
      accent: G,
      label: "Pakalpojums #1",
      title: "Mājaslapa",
      desc: "Profesionāla mājaslapa bez programmēšanas — Framer vai Webflow, SEO, mobilā versija. Klients maksā vienu reizi un ikmēneša atbalsts.",
      earn: "€300–€900",
      per: "projekts + €100/mēn atbalsts",
      points: ["Framer / Webflow — bez koda", "SEO pamati + Google meklēšana", "Nodošana ar rēķinu un līgumu"],
    },
    {
      img: IMG.chatbot,
      accent: G2,
      label: "Pakalpojums #2",
      title: "Web Chatbot",
      desc: "AI chatbot kas atbild klientiem 24/7, vāc kontaktinformāciju un samazina uzņēmuma telefona zvanus par 60%.",
      earn: "€200–€500",
      per: "uzstādīšana + €100–€200/mēn",
      points: ["Voiceflow — vizuāls, bez koda", "Lead vākšana automātiski", "1 koda rinda integrācijai mājaslapā"],
    },
    {
      img: IMG.clients,
      accent: AMBER,
      label: "Pakalpojums #3",
      title: "AI E-pasta Asistents",
      desc: "Automātiskas atbildes, klientu komunikācija un ikmēneša e-pasta veidnes ar Claude — ietaupa 10+ stundas nedēļā.",
      earn: "€150–€400",
      per: "mēnesī / klients",
      points: ["Claude AI — jaudīgākais asistents", "Veidnes jebkurai situācijai", "Pārdod kā ikmēneša pakalpojumu"],
    },
  ];

  const niches = [
    { icon: "💇", title: "Frizētavas & Spa",         need: "Mājaslapa + rezervācijas chatbot",    price: "€400–€700" },
    { icon: "🦷", title: "Zobārsti & Klīnikas",      need: "Mājaslapa + automātiskas atbildes",   price: "€600–€1 200" },
    { icon: "🍕", title: "Restorāni & Kafejnīcas",   need: "Ēdienkarte online + AI atbildes",     price: "€350–€600" },
    { icon: "🏗️", title: "Būvniecība & Remonts",     need: "Portfolio mājaslapa + lead chatbot",  price: "€500–€900" },
  ];

  const stats = [
    { value: "58%", label: "Latvijas uzņēmumu nav profesionālas mājaslapas", color: G },
    { value: "83%", label: "neizmanto chatbot vai automātiskas atbildes",    color: G2 },
    { value: "€600", label: "vidējais mēneša budžets digitālajiem pakalpojumiem", color: AMBER },
    { value: "91%", label: "klientu atkārto pasūtījumu pēc 1. darba",       color: P },
  ];

  const tools = [
    { icon: "🌐", name: "Framer / Webflow", desc: "Mājaslapa bez koda",    color: G },
    { icon: "🤖", name: "Voiceflow",        desc: "AI chatbot būvēšana",   color: G2 },
    { icon: "✉️", name: "Claude / ChatGPT", desc: "E-pasti un saturs",     color: AMBER },
    { icon: "💻", name: "Cursor",           desc: "AI koda palīgs",        color: P },
    { icon: "📊", name: "Google Analytics", desc: "Mājaslapa statistika",  color: PINK },
    { icon: "📋", name: "Notion",           desc: "Klientu onboarding",    color: "#64748b" },
  ];

  const modules = [
    { num: "1", color: G,     title: "Ievads & Tirgus",      milestone: "Saproti iespējas, uzstādā rīkus" },
    { num: "2", color: G2,    title: "Mājaslapa",            milestone: "Gatava mājaslapa pirmajam klientam" },
    { num: "3", color: AMBER, title: "Web Chatbot",          milestone: "Chatbot uzstādīts un testēts" },
    { num: "4", color: P,     title: "AI E-pasta Asistents", milestone: "Automatizēta klientu komunikācija" },
    { num: "5", color: PINK,  title: "Bizness & Klienti",    milestone: "90 dienu plāns līdz €1 000/mēn" },
  ];

  const income = [
    { period: "1.–3. ned.", desc: "Mācies rīkus, veido pirmo mājaslapa demo",  amount: "€0",           note: "Mācību fāze",    pct: 4 },
    { period: "4. ned.",    desc: "Sūti outreach, piedāvā bezmaksas auditu",    amount: "€0–€300",      note: "Pirmie kontakti", pct: 10 },
    { period: "2. mēn.",    desc: "Pirmais klients — mājaslapa vai chatbot",    amount: "€300–€800",    note: "Pirmie ienākumi", pct: 35 },
    { period: "3.–4. mēn.", desc: "2–3 klienti, atbalsta paketes",             amount: "€1 000–€2 500", note: "Stabils ienākums", pct: 65 },
    { period: "6. mēn.+",   desc: "4–6 klienti, ikmēneša retainer",           amount: "€2 000–€7 200", note: "Pilna slodze",    pct: 100 },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28, paddingTop: 24, fontFamily: "'Inter', sans-serif" }}>

      {/* ── HERO VISUAL ── */}
      <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", boxShadow: "0 32px 80px rgba(0,255,136,0.12), 0 8px 32px rgba(0,0,0,0.55)" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${IMG.hero})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.3) saturate(0.6)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,255,136,0.45) 0%, rgba(0,212,255,0.2) 50%, rgba(5,5,8,0.9) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,255,136,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.035) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div style={{ position: "relative", padding: "44px 40px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 14px", borderRadius: 20, background: "rgba(0,255,136,0.14)", border: "1px solid rgba(0,255,136,0.35)", marginBottom: 20, backdropFilter: "blur(8px)" }}>
            <GlowDot color={G} />
            <span style={{ fontSize: 10.5, fontWeight: 700, color: G, letterSpacing: "0.08em", textTransform: "uppercase" }}>Digitālais Speciālists · 5 bloki · 38 nodarbības</span>
          </div>
          <h2 style={{ fontSize: "clamp(22px, 4vw, 34px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14, color: "#fff" }}>
            Kā uzņēmumi maksā<br />
            <span style={{ background: "linear-gradient(135deg, #00ff88, #00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>par tevi katru mēnesi</span>
          </h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.62)", lineHeight: 1.75, maxWidth: 520, marginBottom: 28 }}>
            Tu apgūsi 3 konkrētus digitālos pakalpojumus — mājaslapa, chatbot, e-pasta automatizācija. Uzņēmumi maksā par šiem pakalpojumiem <strong style={{ color: "#fff" }}>€500–€7 200 mēnesī</strong>.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { color: G,    text: "Bez programmēšanas" },
              { color: G2,   text: "Pirmais klients 4 nedēļās" },
              { color: AMBER, text: "Latvijas reāli piemēri" },
            ].map((b) => (
              <div key={b.text} style={{ display: "flex", alignItems: "center", gap: 7, padding: "7px 14px", borderRadius: 10, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}>
                <GlowDot color={b.color} />
                <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3 PAKALPOJUMI ── */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: G, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 16 }}>3 pakalpojumi ko tu apgūsi un pārdosi</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {services.map((s, i) => (
            <div
              key={i}
              style={{ borderRadius: 18, overflow: "hidden", border: `1px solid ${s.accent}20`, boxShadow: `0 8px 32px rgba(0,0,0,0.32), 0 0 0 1px rgba(255,255,255,0.04)` }}
            >
              <div style={{ position: "relative", height: 140, overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${s.img})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.28) saturate(0.45)" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${s.accent}42 0%, rgba(5,5,8,0.72) 100%)` }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 35%, rgba(5,5,8,0.96) 100%)" }} />
                <div style={{ position: "absolute", top: 18, left: 20 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: `${s.accent}1e`, border: `1px solid ${s.accent}40`, color: s.accent, letterSpacing: "0.07em", textTransform: "uppercase", backdropFilter: "blur(6px)" }}>{s.label}</span>
                </div>
                <div style={{ position: "absolute", bottom: 18, left: 20, right: 20, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 900, letterSpacing: "-0.02em", color: "#fff", lineHeight: 1, margin: 0 }}>{s.title}</h3>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 17, fontWeight: 900, background: `linear-gradient(135deg, ${s.accent}, ${s.accent}bb)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.earn}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.38)", marginTop: 1 }}>{s.per}</div>
                  </div>
                </div>
              </div>
              <div style={{ padding: "16px 20px 20px", background: "#0d0d1a" }}>
                <p style={{ fontSize: 13, color: "#888", lineHeight: 1.7, marginBottom: 14 }}>{s.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {s.points.map((pt, pi) => (
                    <div key={pi} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <div style={{ width: 18, height: 18, borderRadius: 5, background: `${s.accent}10`, border: `1px solid ${s.accent}28`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Check color={s.accent} />
                      </div>
                      <span style={{ fontSize: 12.5, color: "#aaa" }}>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── NIŠAS ── */}
      <div style={{ position: "relative", borderRadius: 18, overflow: "hidden", border: "1px solid rgba(0,255,136,0.12)" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${IMG.niches})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.07) saturate(0.2)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,255,136,0.06), rgba(5,5,8,0.97))" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,255,136,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.02) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
        <div style={{ position: "relative", padding: "28px 32px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: G, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 8 }}>Kam pārdot — reālas nišas Latvijā</div>
          <p style={{ fontSize: 13, color: "#666", lineHeight: 1.65, marginBottom: 20 }}>
            Šie uzņēmumi ir gatavi maksāt — tiem ir budžets, vajadzība un nav laika risināt digitālo pašiem.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 10 }}>
            {niches.map((n) => (
              <div key={n.title} style={{ padding: "16px 18px", borderRadius: 13, background: "rgba(13,13,26,0.85)", border: "1px solid rgba(0,255,136,0.1)", backdropFilter: "blur(8px)", boxShadow: "0 4px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.03)" }}>
                <div style={{ fontSize: 22, marginBottom: 10 }}>{n.icon}</div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: "#fff", marginBottom: 5 }}>{n.title}</div>
                <div style={{ fontSize: 11.5, color: "#555", lineHeight: 1.55, marginBottom: 10 }}>{n.need}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <GlowDot color={G} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: G }}>{n.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TIRGUS STATISTIKA ── */}
      <div style={{ padding: "28px 32px", borderRadius: 18, background: "linear-gradient(135deg, rgba(13,13,26,0.95), rgba(9,9,18,0.98))", border: "1px solid rgba(0,255,136,0.12)", boxShadow: "0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: G, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 22 }}>Latvijas tirgus iespēja</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(155px, 1fr))", gap: 20 }}>
          {stats.map((s) => (
            <div key={s.label}>
              <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 6, background: `linear-gradient(135deg, ${s.color} 0%, ${s.color}99 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: `drop-shadow(0 0 12px ${s.color}55)` }}>
                {s.value}
              </div>
              <div style={{ fontSize: 12, color: "#666", lineHeight: 1.55 }}>{s.label}</div>
              <div style={{ height: 2, borderRadius: 2, background: `linear-gradient(90deg, ${s.color}55, transparent)`, marginTop: 10 }} />
            </div>
          ))}
        </div>
        <div style={{ marginTop: 24, padding: "14px 18px", borderRadius: 12, background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.12)", display: "flex", alignItems: "flex-start", gap: 12 }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>💡</span>
          <p style={{ fontSize: 12.5, color: "#888", lineHeight: 1.7, margin: 0 }}>
            Lielākā daļa uzņēmumu nekad nav dzirdējuši par <strong style={{ color: "#ddd" }}>Voiceflow, Framer vai Claude</strong>. Tu nāc ar risinājumu, par kuru viņi nezina ka eksistē — tas ir tavs konkurences pārākums.
          </p>
        </div>
      </div>

      {/* ── AI RĪKI ── */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: G, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 16 }}>AI rīki ko tu apgūsi</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10 }}>
          {tools.map((t) => (
            <div
              key={t.name}
              style={{ padding: "14px 16px", borderRadius: 14, background: "rgba(13,13,26,0.9)", border: `1px solid ${t.color}18`, display: "flex", alignItems: "center", gap: 12, backdropFilter: "blur(8px)", boxShadow: "0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 32px rgba(0,0,0,0.3), 0 0 0 1px ${t.color}30`; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)"; }}
            >
              <div style={{ width: 38, height: 38, borderRadius: 10, background: `${t.color}12`, border: `1px solid ${t.color}28`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                {t.icon}
              </div>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: "#fff" }}>{t.name}</div>
                <div style={{ fontSize: 10.5, color: "#555", marginTop: 2 }}>{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── IENĀKUMU TRAJEKTORIJA ── */}
      <div style={{ padding: "26px 28px", borderRadius: 18, background: "linear-gradient(135deg, rgba(13,13,26,0.95), rgba(9,9,18,0.98))", border: "1px solid rgba(0,255,136,0.1)", boxShadow: "0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: G, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 20 }}>Reāla ienākumu trajektorija</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {income.map((row, i) => (
            <div key={i} style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <div style={{ width: 76, flexShrink: 0 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "#444" }}>{row.period}</div>
              </div>
              <div style={{ flex: 1, position: "relative", height: 34, borderRadius: 8, background: "rgba(255,255,255,0.025)", overflow: "hidden", border: "1px solid rgba(255,255,255,0.04)" }}>
                <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${row.pct}%`, background: "linear-gradient(90deg, rgba(0,255,136,0.5), rgba(0,212,255,0.32))", borderRadius: 7, boxShadow: row.pct > 50 ? "inset 0 1px 0 rgba(255,255,255,0.1)" : "none" }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 12px" }}>
                  <span style={{ fontSize: 11, color: row.pct > 20 ? "rgba(255,255,255,0.75)" : "#666", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{row.desc}</span>
                </div>
              </div>
              <div style={{ width: 130, flexShrink: 0, textAlign: "right" }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: row.pct > 30 ? G : "#555", letterSpacing: "-0.01em" }}>{row.amount}</div>
                <div style={{ fontSize: 10, color: "#3a3a4a", marginTop: 1 }}>{row.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MODUĻU CEĻA KARTE ── */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: G, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 18 }}>Tavs ceļš caur 5 blokiem</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 10 }}>
          {modules.map((m) => (
            <div key={m.num} style={{ padding: "18px 20px", borderRadius: 14, background: "rgba(13,13,26,0.9)", border: `1px solid ${m.color}18`, boxShadow: `0 4px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.03)`, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -40, right: -40, width: 110, height: 110, borderRadius: "50%", background: `radial-gradient(circle, ${m.color}10, transparent 70%)`, pointerEvents: "none" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 30, height: 30, borderRadius: 9, background: `${m.color}12`, border: `1px solid ${m.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900, color: m.color, flexShrink: 0, boxShadow: `0 0 12px ${m.color}20` }}>
                  {m.num}
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{m.title}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <Check color={m.color} />
                <span style={{ fontSize: 11.5, color: "#666" }}>{m.milestone}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── NOSLĒGUMS ── */}
      <div style={{ position: "relative", padding: "26px 28px", borderRadius: 18, overflow: "hidden", border: "1px solid rgba(0,255,136,0.18)", boxShadow: "0 16px 48px rgba(0,255,136,0.08)" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,255,136,0.08) 0%, rgba(0,212,255,0.04) 50%, rgba(5,5,8,0.96) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(0,255,136,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.02) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div style={{ position: "relative", display: "flex", alignItems: "flex-start", gap: 18 }}>
          <div style={{ width: 46, height: 46, borderRadius: 13, background: "linear-gradient(135deg, rgba(0,255,136,0.25), rgba(0,212,255,0.25))", border: "1px solid rgba(0,255,136,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 22, boxShadow: "0 8px 24px rgba(0,255,136,0.15)" }}>
            🎯
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 7, letterSpacing: "-0.01em" }}>
              Pēc šīs nodarbības tu saproti, kāpēc šis ir vērtīgākais pakalpojums Latvijā
            </div>
            <p style={{ fontSize: 13, color: "#888", lineHeight: 1.75, margin: "0 0 14px" }}>
              Nākamajā nodarbībā — <strong style={{ color: "#ddd" }}>3 konkrēti pakalpojumi</strong> ko vari piedāvāt jau šonedēļ un kā noteikt pirmo cenu.
            </p>
            <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
              {[
                { dot: G,    text: "38 nodarbības" },
                { dot: G2,   text: "Bez programmēšanas" },
                { dot: AMBER, text: "Latvijas tirgum" },
              ].map((b) => (
                <div key={b.text} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <GlowDot color={b.dot} />
                  <span style={{ fontSize: 12, color: "#666", fontWeight: 500 }}>{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
