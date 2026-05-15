"use client";

const G = "#00ff88";
const G2 = "#00d4ff";
const P = "#a855f7";
const AMBER = "#f59e0b";
const PINK = "#ec4899";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 10, fontWeight: 700, color: G, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 14 }}>
      {children}
    </div>
  );
}

function Check({ color = G }: { color?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" style={{ flexShrink: 0 }}>
      <polyline points="20,6 9,17 4,12" />
    </svg>
  );
}

export function DigitaalaisIntroLessonContent() {
  const pillars = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.8">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
      title: "Mājaslapa",
      desc: "Profesionāla mājaslapa no nulles — bez programmēšanas. Framer vai Webflow, SEO un mobilā versija.",
      color: G,
      earn: "€300–€800 / projekts",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={G2} strokeWidth="1.8">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      ),
      title: "Web Chatbot",
      desc: "AI chatbot kas atbild klientiem 24/7, vāc lead'us un ietaupa uzņēmumam 10+ st. nedēļā.",
      color: G2,
      earn: "€200–€500 / uzstādīšana + €100/mēn",
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={AMBER} strokeWidth="1.8">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      ),
      title: "AI E-pasta Asistents",
      desc: "Automātiskas atbildes, klientu komunikācija un e-pasta veidnes ar Claude — ikmēneša pakalpojums.",
      color: AMBER,
      earn: "€150–€400 / mēnesī",
    },
  ];

  const marketStats = [
    { label: "Latvijas uzņēmumu nav profesionālas mājaslapas", value: "58%", color: G },
    { label: "Uzņēmumi kas neizmanto chatbot vai automātiskas atbildes", value: "83%", color: G2 },
    { label: "Vidējais budžets digitālajiem pakalpojumiem mēnesī", value: "€600", color: AMBER },
    { label: "Klienti kas atkārto pasūtījumu pēc 1. darba", value: "91%", color: P },
  ];

  const tools = [
    { name: "Framer / Webflow", what: "Mājaslapa bez koda", color: G, icon: "🌐" },
    { name: "Voiceflow", what: "AI chatbot būvēšana", color: G2, icon: "🤖" },
    { name: "Claude / ChatGPT", what: "E-pasti un saturs", color: AMBER, icon: "✉️" },
    { name: "Cursor", what: "AI koda palīgs", color: P, icon: "💻" },
    { name: "Google Analytics", what: "Mājaslapa statistika", color: PINK, icon: "📊" },
    { name: "Notion", what: "Klientu onboarding", color: "#64748b", icon: "📋" },
  ];

  const roadmap = [
    {
      num: "1", title: "Ievads & Tirgus", color: G,
      items: ["Ko nozīmē būt Digitālajam Speciālistam", "3 pakalpojumi ko var pārdot uzreiz", "Rīku komplekts iesācējam"],
    },
    {
      num: "2", title: "Mājaslapa", color: G2,
      items: ["Framer, Webflow vai Cursor — kas der tev", "SEO pamati un mobilā versija", "Nodošana klientam un rēķins"],
    },
    {
      num: "3", title: "Web Chatbot", color: AMBER,
      items: ["Voiceflow pamati 30 minūtēs", "Lead vākšana automātiski", "Kā pamatot chatbot cenu klientam"],
    },
    {
      num: "4", title: "AI E-pasta Asistents", color: P,
      items: ["Claude kā ikdienas darba rīks", "E-pasta veidnes un automatizācija", "10 automatizācijas kas ietaupa laiku"],
    },
    {
      num: "5", title: "Bizness & Klienti", color: PINK,
      items: ["Portfolio ar reāliem darbiem", "Aukstie zvani + DM veidnes", "90 dienu plāns līdz €1 000/mēn"],
    },
  ];

  const incomeRows = [
    { period: "1.–3. ned.", action: "Mācies rīkus, veido pirmo mājaslapa demo", income: "€0", note: "Mācību fāze", pct: 4 },
    { period: "4. ned.", action: "Sūti outreach, piedāvā bezmaksas auditu", income: "€0–€300", note: "Pirmie kontakti", pct: 10 },
    { period: "2. mēn.", action: "Pirmais klients — mājaslapa vai chatbot", income: "€300–€800", note: "Pirmie ienākumi", pct: 35 },
    { period: "3.–4. mēn.", action: "2–3 klienti, atbalsta paketes", income: "€1 000–€2 500", note: "Stabils ienākums", pct: 65 },
    { period: "6. mēn.+", action: "4–6 klienti, ikmēneša retainer", income: "€2 000–€7 200", note: "Pilna slodze", pct: 100 },
  ];

  const niches = [
    { icon: "💇", title: "Frizētavas & Skaistumkopšana", need: "Mājaslapa + rezervācijas chatbot", price: "€400–€700" },
    { icon: "🦷", title: "Zobārsti & Klīnikas", need: "Mājaslapa + atbilžu automatizācija", price: "€600–€1 200" },
    { icon: "🍕", title: "Restorāni & Kafejnīcas", need: "Ēdienkarte online + AI atbildes", price: "€350–€600" },
    { icon: "🏗️", title: "Būvniecība & Remontdarbi", need: "Portfolio mājaslapa + e-pasts", price: "€500–€900" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, paddingTop: 20 }}>

      {/* ─── 1. 3 PAKALPOJUMI ─── */}
      <div>
        <SectionTitle>3 pakalpojumi ko tu apgūsi un pārdosi</SectionTitle>
        <p style={{ fontSize: 14, color: "#999", lineHeight: 1.75, marginBottom: 20, maxWidth: 620 }}>
          Katrs pakalpojums ir atsevišķi pārdodams — bet kopā tie veido spēcīgu pakotni, par kuru uzņēmumi maksā atkārtoti katru mēnesi.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {pillars.map((p) => (
            <div key={p.title} style={{ padding: "18px 20px", borderRadius: 14, background: "#0d0d1a", border: `1px solid ${p.color}20`, display: "flex", alignItems: "flex-start", gap: 16, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -30, right: -30, width: 100, height: 100, borderRadius: "50%", background: `radial-gradient(circle, ${p.color}08, transparent 70%)`, pointerEvents: "none" }} />
              <div style={{ width: 42, height: 42, borderRadius: 11, background: `${p.color}10`, border: `1px solid ${p.color}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {p.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{p.title}</span>
                  <span style={{ fontSize: 10.5, fontWeight: 700, padding: "2px 9px", borderRadius: 20, background: `${p.color}12`, border: `1px solid ${p.color}28`, color: p.color }}>{p.earn}</span>
                </div>
                <p style={{ fontSize: 12.5, color: "#666", lineHeight: 1.65, margin: 0 }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── 2. NIŠAS — KAM PĀRDOT ─── */}
      <div>
        <SectionTitle>Kam pārdot — reālas nišas Latvijā</SectionTitle>
        <p style={{ fontSize: 13, color: "#666", lineHeight: 1.65, marginBottom: 16 }}>
          Šie uzņēmumi ir gatavi maksāt — tiem ir budžets, vajadzība un nav laika risināt digitālo pašiem.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
          {niches.map((n) => (
            <div key={n.title} style={{ padding: "16px 18px", borderRadius: 12, background: "#0d0d1a", border: "1px solid rgba(0,255,136,0.1)" }}>
              <div style={{ fontSize: 22, marginBottom: 10 }}>{n.icon}</div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "#fff", marginBottom: 5 }}>{n.title}</div>
              <div style={{ fontSize: 11.5, color: "#555", lineHeight: 1.55, marginBottom: 8 }}>{n.need}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: G, boxShadow: `0 0 6px ${G}` }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: G }}>{n.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── 3. LATVIJAS TIRGUS ─── */}
      <div style={{ padding: "24px 28px", borderRadius: 16, background: "#0a0a14", border: "1px solid rgba(0,255,136,0.15)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(0,255,136,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,136,0.02) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div style={{ position: "relative" }}>
          <SectionTitle>Latvijas tirgus iespēja</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
            {marketStats.map((s) => (
              <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ fontSize: 28, fontWeight: 900, background: `linear-gradient(135deg, ${s.color}, ${s.color}88)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-0.02em" }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 12, color: "#666", lineHeight: 1.5 }}>{s.label}</div>
                <div style={{ height: 2, borderRadius: 2, background: `linear-gradient(90deg, ${s.color}55, transparent)`, marginTop: 4 }} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, padding: "12px 16px", borderRadius: 10, background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.12)", display: "flex", alignItems: "flex-start", gap: 10 }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>💡</span>
            <p style={{ fontSize: 12.5, color: "#888", lineHeight: 1.65, margin: 0 }}>
              Lielākā daļa vietējo uzņēmumu nekad nav dzirdējuši par <strong style={{ color: "#ccc" }}>Voiceflow, Framer vai Claude</strong>. Tu nāc ar risinājumu, par kuru viņi nezina ka tas eksistē — tas ir tavs pārākums.
            </p>
          </div>
        </div>
      </div>

      {/* ─── 4. AI RĪKI ─── */}
      <div>
        <SectionTitle>AI rīki ko tu apgūsi</SectionTitle>
        <p style={{ fontSize: 13, color: "#666", marginBottom: 16, lineHeight: 1.6 }}>
          Visi rīki pieejami bezmaksas vai lētā trial versijā. Maksas plāni nepieciešami tikai aktīviem projektiem.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(155px, 1fr))", gap: 10 }}>
          {tools.map((t) => (
            <div
              key={t.name}
              style={{ padding: "14px 16px", borderRadius: 12, background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: 12, transition: "border-color 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = `${t.color}35`; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.05)"; }}
            >
              <div style={{ width: 36, height: 36, borderRadius: 9, background: `${t.color}12`, border: `1px solid ${t.color}25`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>
                {t.icon}
              </div>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: "#fff" }}>{t.name}</div>
                <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{t.what}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── 5. IENĀKUMU TRAJEKTORIJA ─── */}
      <div style={{ padding: "24px 28px", borderRadius: 16, background: "#0a0a14", border: "1px solid rgba(0,255,136,0.12)" }}>
        <SectionTitle>Reāla ienākumu trajektorija</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {incomeRows.map((row, i) => (
            <div key={i} style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <div style={{ width: 80, flexShrink: 0 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "#555" }}>{row.period}</div>
              </div>
              <div style={{ flex: 1, position: "relative", height: 32, borderRadius: 8, background: "rgba(255,255,255,0.03)", overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${row.pct}%`, background: "linear-gradient(90deg, rgba(0,255,136,0.4), rgba(0,212,255,0.3))", borderRadius: 8 }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 10px" }}>
                  <span style={{ fontSize: 11, color: "#888", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{row.action}</span>
                </div>
              </div>
              <div style={{ width: 130, flexShrink: 0, textAlign: "right" }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: row.pct > 30 ? G : "#666" }}>{row.income}</div>
                <div style={{ fontSize: 10, color: "#444" }}>{row.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── 6. 5 BLOKU CEĻA KARTE ─── */}
      <div>
        <SectionTitle>Tavs ceļš caur 5 blokiem</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {roadmap.map((r, i) => (
            <div key={r.num} style={{ display: "flex", gap: 16, position: "relative" }}>
              {i < roadmap.length - 1 && (
                <div style={{ position: "absolute", left: 13, top: 30, bottom: 0, width: 1, background: `${r.color}20` }} />
              )}
              <div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: `${r.color}15`, border: `1px solid ${r.color}35`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: r.color, zIndex: 1 }}>
                {r.num}
              </div>
              <div style={{ flex: 1, paddingBottom: 22 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{r.title}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  {r.items.map((item, ii) => (
                    <div key={ii} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Check color={r.color} />
                      <span style={{ fontSize: 12, color: "#777" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── 7. NOSLĒGUMS ─── */}
      <div style={{ padding: "22px 26px", borderRadius: 16, background: "linear-gradient(135deg, rgba(0,255,136,0.07), rgba(0,212,255,0.04))", border: "1px solid rgba(0,255,136,0.18)", display: "flex", alignItems: "flex-start", gap: 18 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg, rgba(0,255,136,0.2), rgba(0,212,255,0.2))", border: "1px solid rgba(0,255,136,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 20 }}>
          🎯
        </div>
        <div>
          <div style={{ fontSize: 14.5, fontWeight: 800, color: "#fff", marginBottom: 6 }}>
            Pēc šīs nodarbības tu saproti, kāpēc šis ir vērtīgākais pakalpojums
          </div>
          <p style={{ fontSize: 12.5, color: "#888", lineHeight: 1.7, margin: "0 0 12px" }}>
            Nākamajā nodarbībā — <strong style={{ color: "#ccc" }}>3 konkrēti pakalpojumi</strong> ko vari piedāvāt jau šonedēļ un kā noteikt pirmo cenu.
          </p>
          <div style={{ display: "flex", gap: 16 }}>
            {[
              { icon: "📦", text: "38 nodarbības" },
              { icon: "🟢", text: "Bez programmēšanas" },
              { icon: "🇱🇻", text: "Latvijas tirgum" },
            ].map((b) => (
              <div key={b.text} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ fontSize: 13 }}>{b.icon}</span>
                <span style={{ fontSize: 11.5, color: "#666" }}>{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
