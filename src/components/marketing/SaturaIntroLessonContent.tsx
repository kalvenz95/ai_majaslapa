"use client";

const P = "#a855f7";
const P2 = "#ec4899";
const GREEN = "#00ff88";
const CYAN = "#00d4ff";
const AMBER = "#f59e0b";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 10, fontWeight: 700, color: P, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 14 }}>
      {children}
    </div>
  );
}

function Check({ color = P }: { color?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" style={{ flexShrink: 0 }}>
      <polyline points="20,6 9,17 4,12" />
    </svg>
  );
}

export function SaturaIntroLessonContent() {
  const pillars = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={P} strokeWidth="1.8">
          <polygon points="23,7 16,12 23,17" /><rect x="1" y="5" width="15" height="14" rx="2" />
        </svg>
      ),
      title: "AI Faceless Video",
      desc: "Veido video bez kameras — scenārijs, ģenerēšana, montāža un publicēšana ar AI rīkiem.",
      color: P,
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={P2} strokeWidth="1.8">
          <rect x="2" y="2" width="9" height="9" rx="2" /><rect x="13" y="2" width="9" height="9" rx="2" />
          <rect x="2" y="13" width="9" height="9" rx="2" /><rect x="13" y="13" width="9" height="9" rx="2" />
        </svg>
      ),
      title: "Sociālo Tīklu Pārvaldība",
      desc: "Banneri, feed dizains, carousels un ikmēneša satura grafiks uzņēmumiem.",
      color: P2,
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="1.8">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
      title: "Klientu Piesaiste",
      desc: "Portfolio, outreach skripti, cenu piedāvājums un pirmais klients — praktiski un reāli.",
      color: GREEN,
    },
  ];

  const marketStats = [
    { label: "Latvijas uzņēmumu nav regulāra satura stratēģija", value: "71%", color: P },
    { label: "Vidējais budžets satura radīšanai mēnesī", value: "€350", color: P2 },
    { label: "Laiks līdz pirmajam klientam pēc kursa", value: "3 ned.", color: GREEN },
    { label: "Studenti kas iegūst ienākumus 60 dienās", value: "82%", color: CYAN },
  ];

  const tools = [
    { name: "CapCut", what: "Auto montāža + subtitri", color: CYAN, icon: "✂️" },
    { name: "Runway ML", what: "AI video ģenerēšana", color: P, icon: "🎬" },
    { name: "ChatGPT / Claude", what: "Skripti + captions", color: GREEN, icon: "🤖" },
    { name: "Canva AI", what: "Banneri + feed dizains", color: AMBER, icon: "🖌️" },
    { name: "Midjourney", what: "Profesionāli attēli", color: P2, icon: "🎨" },
    { name: "Buffer / Later", what: "Auto publicēšana", color: "#8b5cf6", icon: "📅" },
  ];

  const roadmap = [
    {
      num: "1", title: "Ievads & Tirgus", color: P,
      items: ["Kā darbojas šis pakalpojums", "Kādas pakalpojumus vari pārdot uzreiz", "Rīku komplekts iesācējam"],
    },
    {
      num: "2", title: "AI Faceless Video", color: P2,
      items: ["Scenārija rakstīšana ar AI", "Video ģenerēšana: Runway, Pika, Kling", "Montāža, subtitri, publicēšana"],
    },
    {
      num: "3", title: "Sociālo Tīklu Pārvaldība", color: AMBER,
      items: ["30 dienu content plāns", "Banneri un feed dizains", "AI captions un ikmēneša atskaite"],
    },
    {
      num: "4", title: "Portfolio & Pirmā Nauda", color: GREEN,
      items: ["Portfolio no nulles", "Klientu uzrunāšanas skripti", "Pirmais klients un samaksa"],
    },
  ];

  const incomeRows = [
    { period: "1.–3. nedēļa", action: "Apgūsti rīkus, izveido pirmo video", income: "€0", note: "Mācību fāze", pct: 4 },
    { period: "4. nedēļa", action: "Sūti outreach, veidoj portfolio", income: "€0–€200", note: "Pirmie kontakti", pct: 15 },
    { period: "2. mēnesis", action: "1–2 klienti, stabilizē procesu", income: "€300–€600", note: "Stabils sākums", pct: 40 },
    { period: "3.–4. mēnesis", action: "Pievieno klientus, cel cenas", income: "€600–€1 500", note: "Izaugsme", pct: 75 },
    { period: "6. mēnesis+", action: "4–6 klienti, automatizēts darbs", income: "€1 500–€3 600", note: "Pilns ienākums", pct: 100 },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, paddingTop: 20 }}>

      {/* ─── 1. KAS IR SATURA SPECIĀLISTS ─── */}
      <div>
        <SectionTitle>Ko dara Satura Speciālists</SectionTitle>
        <p style={{ fontSize: 14, color: "#999", lineHeight: 1.75, marginBottom: 20, maxWidth: 620 }}>
          Uzņēmumi zina, ka tiem vajag saturu — bet nav laika, prasmju vai budžeta dārgiem speciālistiem.
          Tu apgūsi trīs pakalpojumus, ko vari pārdot uzreiz pēc kursa.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 12 }}>
          {pillars.map((p) => (
            <div key={p.title} style={{ padding: "20px", borderRadius: 14, background: "#0d0d1a", border: `1px solid ${p.color}22`, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -30, right: -30, width: 100, height: 100, borderRadius: "50%", background: `radial-gradient(circle, ${p.color}10, transparent 70%)`, pointerEvents: "none" }} />
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${p.color}12`, border: `1px solid ${p.color}25`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                {p.icon}
              </div>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{p.title}</div>
              <div style={{ fontSize: 12, color: "#666", lineHeight: 1.65 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── 2. LATVIJAS TIRGUS ─── */}
      <div style={{ padding: "24px 28px", borderRadius: 16, background: "#0a0a14", border: "1px solid rgba(168,85,247,0.15)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(168,85,247,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.025) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
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
          <div style={{ marginTop: 20, padding: "12px 16px", borderRadius: 10, background: "rgba(168,85,247,0.05)", border: "1px solid rgba(168,85,247,0.14)", display: "flex", alignItems: "flex-start", gap: 10 }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>💡</span>
            <p style={{ fontSize: 12.5, color: "#888", lineHeight: 1.65, margin: 0 }}>
              Latvijā ir ap <strong style={{ color: "#ccc" }}>26 000 aktīvu uzņēmumu</strong>. Lielākā daļa maksā par saturu tikai tad, kad kāds piedāvā. Tu esi tas cilvēks, kas piedāvā.
            </p>
          </div>
        </div>
      </div>

      {/* ─── 3. AI RĪKI ─── */}
      <div>
        <SectionTitle>AI rīki ko tu apgūsi</SectionTitle>
        <p style={{ fontSize: 13, color: "#666", marginBottom: 16, lineHeight: 1.6 }}>
          Visi rīki pieejami bezmaksas trial versijā. Maksas plāns vajadzīgs tikai tad, kad tev ir pirmais klients.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(155px, 1fr))", gap: 10 }}>
          {tools.map((t) => (
            <div
              key={t.name}
              style={{ padding: "14px 16px", borderRadius: 12, background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", gap: 12, transition: "border-color 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = `${t.color}30`; }}
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

      {/* ─── 4. IENĀKUMU TRAJEKTORIJA ─── */}
      <div style={{ padding: "24px 28px", borderRadius: 16, background: "#0a0a14", border: "1px solid rgba(0,255,136,0.12)" }}>
        <SectionTitle>Reāla ienākumu trajektorija</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {incomeRows.map((row, i) => (
            <div key={i} style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <div style={{ width: 90, flexShrink: 0 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "#555" }}>{row.period}</div>
              </div>
              <div style={{ flex: 1, position: "relative", height: 32, borderRadius: 8, background: "rgba(255,255,255,0.03)", overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${row.pct}%`, background: "linear-gradient(90deg, rgba(168,85,247,0.4), rgba(0,255,136,0.3))", borderRadius: 8 }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 10px" }}>
                  <span style={{ fontSize: 11, color: "#888", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{row.action}</span>
                </div>
              </div>
              <div style={{ width: 110, flexShrink: 0, textAlign: "right" }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: row.pct > 30 ? GREEN : "#666" }}>{row.income}</div>
                <div style={{ fontSize: 10, color: "#444" }}>{row.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── 5. KURSA BLOKU KARTE ─── */}
      <div>
        <SectionTitle>Tavs ceļš caur 4 blokiem</SectionTitle>
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
                      <span style={{ fontSize: 12, color: "#777", lineHeight: 1.45 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── 6. NOSLĒGUMS ─── */}
      <div style={{ padding: "22px 26px", borderRadius: 16, background: "linear-gradient(135deg, rgba(168,85,247,0.08), rgba(236,72,153,0.05))", border: "1px solid rgba(168,85,247,0.18)", display: "flex", alignItems: "flex-start", gap: 18 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg, rgba(168,85,247,0.25), rgba(236,72,153,0.25))", border: "1px solid rgba(168,85,247,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 20 }}>
          🎯
        </div>
        <div>
          <div style={{ fontSize: 14.5, fontWeight: 800, color: "#fff", marginBottom: 6 }}>
            Pēc šīs nodarbības tu saproti iespējas un plānu
          </div>
          <p style={{ fontSize: 12.5, color: "#888", lineHeight: 1.7, margin: "0 0 12px" }}>
            Nākamajā nodarbībā — <strong style={{ color: "#ccc" }}>kādus pakalpojumus vari piedāvāt uzreiz</strong> un kā noteikt cenu pat bez pieredzes.
          </p>
          <div style={{ display: "flex", gap: 16 }}>
            {[
              { icon: "📦", text: "28 nodarbības" },
              { icon: "🟢", text: "Bez kodēšanas" },
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
