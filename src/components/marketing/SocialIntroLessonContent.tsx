"use client";

const P = "#a855f7";
const P2 = "#ec4899";
const GREEN = "#00ff88";
const CYAN = "#00d4ff";

function Badge({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 20, background: `${color}15`, border: `1px solid ${color}30`, color, textTransform: "uppercase", letterSpacing: "0.06em" }}>
      {children}
    </span>
  );
}

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

function ArrowRight({ color = "#444" }: { color?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" style={{ flexShrink: 0 }}>
      <polyline points="9,18 15,12 9,6" />
    </svg>
  );
}

export function SocialIntroLessonContent() {
  const pillars = [
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={P} strokeWidth="1.8">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
      title: "Saturs",
      desc: "Video, banneri, karouseli, stories — viss ko uzņēmums liek sociālajos tīklos.",
      color: P,
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={P2} strokeWidth="1.8">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4l3 3" />
        </svg>
      ),
      title: "Plānošana",
      desc: "Ikmēneša publicēšanas grafiks — pareizais saturs, pareizajā laikā, pareizajai auditorijai.",
      color: P2,
    },
    {
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="1.8">
          <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
        </svg>
      ),
      title: "Rezultāti",
      desc: "Ikmēneša atskaite klientam — sekotāji, sasniedzamība, klikšķi, pārdošanas dati.",
      color: GREEN,
    },
  ];

  const workflow = [
    { step: "1", title: "Pieņem uzdevumu", desc: "Klients sūta informāciju par mēneša akcijām, produktiem vai jaunumiem", time: "~30 min" },
    { step: "2", title: "Ģenerē saturu ar AI", desc: "Runway, HeyGen video + Canva AI banneri + Claude captions — viss automātiski", time: "~2 st." },
    { step: "3", title: "Nosūti apstiprināšanai", desc: "Klients pārskata un apstiprina, tu veic labojumus ja nepieciešams", time: "~15 min" },
    { step: "4", title: "Ieplāno publicēšanu", desc: "Buffer vai Later automātiski publicē katru dienu pareizajā laikā", time: "~20 min" },
    { step: "5", title: "Nosūti atskaiti", desc: "Mēneša beigās — skaitļi, izaugsme, ieteikumi nākamajam mēnesim", time: "~30 min" },
  ];

  const marketStats = [
    { label: "Latvijas uzņēmumu nav aktīvi sociālajos tīklos", value: "67%", color: P },
    { label: "Vidējais mēneša budžets sociālajiem tīkliem", value: "€400", color: P2 },
    { label: "Uzņēmumi kas atkārtoti pieņem darbā menedžerus", value: "89%", color: GREEN },
    { label: "Vidēji meklē pirmo klientu pēc kursa", value: "3 ned.", color: CYAN },
  ];

  const tools = [
    { name: "Runway ML", what: "AI video no teksta", color: P, icon: "🎬" },
    { name: "HeyGen", what: "AI avatar prezentācijas", color: P2, icon: "🤖" },
    { name: "CapCut", what: "Auto video rediģēšana", color: CYAN, icon: "✂️" },
    { name: "Midjourney", what: "Profesionāli attēli", color: GREEN, icon: "🎨" },
    { name: "Canva AI", what: "Reklāmu dizains", color: "#f59e0b", icon: "🖌️" },
    { name: "Buffer", what: "Auto publicēšana", color: "#8b5cf6", icon: "📅" },
  ];

  const roadmap = [
    { num: "1", title: "Ievads & Setup", milestone: "Rīki uzstādīti, cenas noteiktas", color: P },
    { num: "2", title: "AI Faceless Video", milestone: "Pirmais video gatavs", color: P2 },
    { num: "3", title: "Reklāmas Banneri", milestone: "5 banneru komplekts klientam", color: "#f59e0b" },
    { num: "4", title: "Post Vizuāļi", milestone: "Mēneša satura grafiks", color: CYAN },
    { num: "5", title: "Klienta Atrašana", milestone: "Pirmais klients pieņemts", color: GREEN },
    { num: "6", title: "Automatizācija", milestone: "5+ klienti vienlaicīgi", color: "#8b5cf6" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32, paddingTop: 8 }}>

      {/* ─── 1. KAS IR ŠIS PAKALPOJUMS ─── */}
      <div>
        <SectionTitle>Kas ir sociālo tīklu pārvaldība</SectionTitle>
        <p style={{ fontSize: 14, color: "#999", lineHeight: 1.75, marginBottom: 20, maxWidth: 620 }}>
          Uzņēmumi zina, ka sociālie tīkli ir svarīgi — bet nav laika vai prasmju to darīt pašiem.
          Tev maksā par to, ko tu apgūsi šajā kursā: saturu, plānošanu un rezultātus.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
          {pillars.map((p) => (
            <div key={p.title} style={{ padding: "20px", borderRadius: 14, background: "#0d0d1a", border: `1px solid ${p.color}22`, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -30, right: -30, width: 100, height: 100, borderRadius: "50%", background: `radial-gradient(circle, ${p.color}10, transparent 70%)`, pointerEvents: "none" }} />
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${p.color}12`, border: `1px solid ${p.color}25`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                {p.icon}
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{p.title}</div>
              <div style={{ fontSize: 12.5, color: "#666", lineHeight: 1.6 }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── 2. LATVIJAS TIRGUS ─── */}
      <div style={{ padding: "24px 28px", borderRadius: 16, background: "#0a0a14", border: "1px solid rgba(168,85,247,0.15)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(168,85,247,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.025) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div style={{ position: "relative" }}>
          <SectionTitle>Latvijas tirgus iespēja</SectionTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
            {marketStats.map((s) => (
              <div key={s.label} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ fontSize: 28, fontWeight: 900, background: `linear-gradient(135deg, ${s.color}, ${s.color}99)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-0.02em" }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 12, color: "#666", lineHeight: 1.5 }}>{s.label}</div>
                <div style={{ height: 2, borderRadius: 2, background: `linear-gradient(90deg, ${s.color}60, transparent)`, marginTop: 4 }} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, padding: "12px 16px", borderRadius: 10, background: "rgba(168,85,247,0.06)", border: "1px solid rgba(168,85,247,0.15)", display: "flex", alignItems: "flex-start", gap: 10 }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>💡</span>
            <p style={{ fontSize: 12.5, color: "#888", lineHeight: 1.65, margin: 0 }}>
              Latvijā ir ap <strong style={{ color: "#ccc" }}>26 000 aktīvu uzņēmumu</strong>. Pat ja tev ir 5 klienti, tu strādā ar niecīgu daļu no tirgus. Konkurence ir zema — pieprasījums aug.
            </p>
          </div>
        </div>
      </div>

      {/* ─── 3. DIENAS DARBA PLŪSMA ─── */}
      <div>
        <SectionTitle>Kā izskatās reāla darba diena</SectionTitle>
        <p style={{ fontSize: 13, color: "#666", marginBottom: 18, lineHeight: 1.6 }}>
          Viens klients — aptuveni <strong style={{ color: "#aaa" }}>4–5 stundas mēnesī.</strong> Ar 4 klientiem tu strādā ~20 stundas mēnesī un pelni €1 200+.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {workflow.map((w, i) => (
            <div key={w.step} style={{ display: "flex", gap: 16, position: "relative" }}>
              {/* Vertikālā līnija */}
              {i < workflow.length - 1 && (
                <div style={{ position: "absolute", left: 13, top: 32, bottom: 0, width: 1, background: "rgba(168,85,247,0.15)" }} />
              )}
              <div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: P, zIndex: 1 }}>
                {w.step}
              </div>
              <div style={{ flex: 1, paddingBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{w.title}</span>
                  <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 20, background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.18)", color: P, fontWeight: 600 }}>{w.time}</span>
                </div>
                <p style={{ fontSize: 12.5, color: "#666", lineHeight: 1.6, margin: 0 }}>{w.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── 5. IENĀKUMU TRAJEKTORIJA ─── */}
      <div style={{ padding: "24px 28px", borderRadius: 16, background: "#0a0a14", border: "1px solid rgba(0,255,136,0.12)" }}>
        <SectionTitle>Reāla ienākumu trajektorija</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { week: "1.–3. nedēļa", action: "Apgūsti rīkus, izveido portfolio paraugu", income: "€0", note: "Mācību fāze", barPct: 5 },
            { week: "4. nedēļa", action: "Nosūti pirmos outreach ziņojumus", income: "€0–€300", note: "Pirmie kontakti", barPct: 20 },
            { week: "2. mēnesis", action: "1–2 klienti, apkal. nodrošinājums", income: "€300–€600", note: "Stabils sākums", barPct: 40 },
            { week: "3.–4. mēnesis", action: "Cel cenas, pievieno klientus", income: "€600–€1 500", note: "Izaugsme", barPct: 75 },
            { week: "6. mēnesis+", action: "4–5 klienti, automatizēts process", income: "€1 500–€3 500", note: "Pilns ienākums", barPct: 100 },
          ].map((row, i) => (
            <div key={i} style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <div style={{ width: 80, flexShrink: 0 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "#555" }}>{row.week}</div>
              </div>
              <div style={{ flex: 1, position: "relative", height: 32, borderRadius: 8, background: "rgba(255,255,255,0.03)", overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${row.barPct}%`, background: `linear-gradient(90deg, rgba(168,85,247,0.4), rgba(0,255,136,0.3))`, borderRadius: 8, transition: "width 0.5s ease" }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 10px", gap: 8 }}>
                  <span style={{ fontSize: 11, color: "#aaa", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{row.action}</span>
                </div>
              </div>
              <div style={{ width: 110, flexShrink: 0, textAlign: "right" }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: row.barPct > 30 ? GREEN : "#666" }}>{row.income}</div>
                <div style={{ fontSize: 10, color: "#444" }}>{row.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── 6. KURSA CEĻA KARTE ─── */}
      <div>
        <SectionTitle>Tavs ceļš šajā kursā</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
          {roadmap.map((r, i) => (
            <div key={r.num} style={{ padding: "16px 18px", borderRadius: 12, background: "#0d0d1a", border: `1px solid ${r.color}18`, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: `radial-gradient(circle, ${r.color}08, transparent 70%)`, pointerEvents: "none" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ width: 24, height: 24, borderRadius: 7, background: `${r.color}15`, border: `1px solid ${r.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: r.color }}>
                  {r.num}
                </div>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: "#fff" }}>{r.title}</span>
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
                <Check color={r.color} />
                <span style={{ fontSize: 11.5, color: "#666", lineHeight: 1.5 }}>{r.milestone}</span>
              </div>
              {i < roadmap.length - 1 && (
                <div style={{ position: "absolute", bottom: -1, right: -1, padding: "3px 5px", background: "#0d0d1a" }}>
                  <ArrowRight color={`${r.color}50`} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ─── 7. APAKŠĒJA MOTIVĀCIJA ─── */}
      <div style={{ padding: "24px 28px", borderRadius: 16, background: "linear-gradient(135deg, rgba(168,85,247,0.08), rgba(236,72,153,0.05))", border: "1px solid rgba(168,85,247,0.18)", display: "flex", alignItems: "flex-start", gap: 20 }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: "linear-gradient(135deg, rgba(168,85,247,0.25), rgba(236,72,153,0.25))", border: "1px solid rgba(168,85,247,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 22 }}>
          🎯
        </div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 6, letterSpacing: "-0.01em" }}>
            Pēc šīs lekcijas tu saproti, ko dari un kāpēc
          </div>
          <p style={{ fontSize: 13, color: "#888", lineHeight: 1.7, margin: 0 }}>
            Nākamajā nodarbībā — <strong style={{ color: "#ccc" }}>uzstādīsim visus rīkus</strong> un izveidosim pirmo test projektu. Tas aizņems apmēram 30 minūtes un tu redzēsi, ka viss ir daudz vienkāršāk nekā izskatās.
          </p>
          <div style={{ display: "flex", gap: 16, marginTop: 14 }}>
            {[
              { icon: "⏱", text: "Nodarbība: 12 min" },
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
