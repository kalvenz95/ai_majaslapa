"use client";

const P = "#a855f7";
const P2 = "#ec4899";
const GREEN = "#00ff88";
const CYAN = "#00d4ff";
const AMBER = "#f59e0b";

const IMG = {
  hero:    "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1400&q=90&fit=crop&crop=center",
  video:   "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=800&q=85&fit=crop&crop=center",
  social:  "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=800&q=85&fit=crop&crop=center",
  clients: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=85&fit=crop&crop=center",
  tools:   "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=85&fit=crop&crop=center",
};

function GlowDot({ color }: { color: string }) {
  return <div style={{ width: 7, height: 7, borderRadius: "50%", background: color, boxShadow: `0 0 10px ${color}, 0 0 20px ${color}55`, flexShrink: 0 }} />;
}

function Check({ color = P }: { color?: string }) {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3.5" style={{ flexShrink: 0 }}>
      <polyline points="20,6 9,17 4,12" />
    </svg>
  );
}

export function SaturaIntroLessonContent() {

  const services = [
    {
      img: IMG.video,
      accent: P,
      label: "Pakalpojums #1",
      title: "AI Faceless Video",
      desc: "Veido video bez kameras — scenārijs, ģenerēšana ar Runway & HeyGen, montāža CapCut. Klients saņem gatavu video.",
      earn: "€200–€600",
      per: "par video pakotni",
      points: ["Bez sejas, bez kameras, bez pieredzes", "Runway ML + HeyGen + CapCut", "30 min darbs = pilna video pakotne"],
    },
    {
      img: IMG.social,
      accent: P2,
      label: "Pakalpojums #2",
      title: "Sociālo Tīklu Pārvaldība",
      desc: "Ikmēneša satura grafiks, banneri, carousels un captions. Klients apstiprina, tu publicē automātiski.",
      earn: "€300–€800",
      per: "mēnesī / klients",
      points: ["Canva AI + Midjourney vizuāļi", "Buffer automātiskā publicēšana", "Ikmēneša atskaite un statistika"],
    },
    {
      img: IMG.clients,
      accent: GREEN,
      label: "Pakalpojums #3",
      title: "Portfolio & Klienti",
      desc: "Reāls portfolio no nulles, cold outreach skripti un pirmā tikšanās — no kontakta līdz parakstītam līgumam.",
      earn: "€300–€1 500",
      per: "mēnesī (3–4 klienti)",
      points: ["Copy-paste outreach veidnes", "Reāls piemērs no pirmā zvana", "Kā celt cenu pēc pirmā mēneša"],
    },
  ];

  const stats = [
    { value: "26 000", label: "aktīvu uzņēmumu Latvijā bez regulāra satura", color: P },
    { value: "€350", label: "vidējais mēneša budžets satura radīšanai", color: P2 },
    { value: "3 ned.", label: "vidēji līdz pirmajam klientam", color: GREEN },
    { value: "82%", label: "studentu iegūst ienākumus 60 dienās", color: CYAN },
  ];

  const tools = [
    { icon: "✂️", name: "CapCut", desc: "Auto montāža + subtitri", color: CYAN },
    { icon: "🎬", name: "Runway ML", desc: "AI video ģenerēšana", color: P },
    { icon: "🤖", name: "HeyGen", desc: "AI avatar prezentācijas", color: P2 },
    { icon: "🖌️", name: "Canva AI", desc: "Banneri + feed dizains", color: AMBER },
    { icon: "🎨", name: "Midjourney", desc: "Profesionāli attēli", color: "#f97316" },
    { icon: "📅", name: "Buffer", desc: "Auto publicēšana", color: "#8b5cf6" },
  ];

  const modules = [
    { num: "1", color: P,    title: "Ievads & Tirgus",          milestone: "Saproti iespējas, uzstādā rīkus" },
    { num: "2", color: P2,   title: "AI Faceless Video",        milestone: "Pirmais gatavs video klientam" },
    { num: "3", color: AMBER, title: "Sociālo Tīklu Pārvaldība", milestone: "Mēneša saturs 2 stundās" },
    { num: "4", color: GREEN, title: "Portfolio & Pirmā Nauda", milestone: "Pirmais klients un samaksa" },
  ];

  const income = [
    { period: "1.–3. ned.", desc: "Apgūsti rīkus, pirmo demo projektu", amount: "€0",          note: "Mācību fāze",    pct: 4 },
    { period: "4. ned.",    desc: "Sūti outreach, veido portfolio",      amount: "€0–€200",     note: "Pirmie kontakti", pct: 14 },
    { period: "2. mēn.",    desc: "1–2 klienti, stabils process",        amount: "€300–€600",   note: "Stabils sākums", pct: 40 },
    { period: "3.–4. mēn.", desc: "Pievieno klientus, cel cenas",        amount: "€600–€1 500", note: "Izaugsme",       pct: 72 },
    { period: "6. mēn.+",   desc: "4–6 klienti, automatizēts darbs",    amount: "€1 500–€3 600", note: "Pilns ienākums", pct: 100 },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28, paddingTop: 24, fontFamily: "'Inter', sans-serif" }}>

      {/* ── HERO VISUAL ── */}
      <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", boxShadow: "0 32px 80px rgba(168,85,247,0.18), 0 8px 32px rgba(0,0,0,0.5)" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${IMG.hero})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.35) saturate(0.7)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(168,85,247,0.55) 0%, rgba(236,72,153,0.25) 50%, rgba(5,5,8,0.85) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(168,85,247,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.04) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div style={{ position: "relative", padding: "44px 40px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 14px", borderRadius: 20, background: "rgba(168,85,247,0.18)", border: "1px solid rgba(168,85,247,0.4)", marginBottom: 20, backdropFilter: "blur(8px)" }}>
            <GlowDot color={P} />
            <span style={{ fontSize: 10.5, fontWeight: 700, color: P, letterSpacing: "0.08em", textTransform: "uppercase" }}>Satura Speciālists · 4 bloki · 28 nodarbības</span>
          </div>
          <h2 style={{ fontSize: "clamp(22px, 4vw, 34px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14, color: "#fff" }}>
            Kā AI maina<br />
            <span style={{ background: "linear-gradient(135deg, #c084fc, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>satura radīšanas industriju</span>
          </h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.75, maxWidth: 520, marginBottom: 28 }}>
            Uzņēmumi katru dienu meklē cilvēkus kas viņiem palīdz ar saturu. Tu apgūsi 3 pakalpojumus, pelnīsi <strong style={{ color: "#fff" }}>€300–€1 500 mēnesī</strong> un visu procesu automatizēsi.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {[
              { color: P,     text: "Bez kameras vai sejas" },
              { color: GREEN, text: "Pirmais klients 3 nedēļās" },
              { color: CYAN,  text: "Pilnībā latviski" },
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
        <div style={{ fontSize: 10, fontWeight: 700, color: P, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 16 }}>3 pakalpojumi ko tu apgūsi un pārdosi</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {services.map((s, i) => (
            <div
              key={i}
              style={{ borderRadius: 18, overflow: "hidden", border: `1px solid ${s.accent}20`, boxShadow: `0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.04)` }}
            >
              {/* Image strip */}
              <div style={{ position: "relative", height: 140, overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${s.img})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.3) saturate(0.5)" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${s.accent}40 0%, rgba(5,5,8,0.7) 100%)` }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(5,5,8,0.95) 100%)" }} />
                <div style={{ position: "absolute", top: 18, left: 20 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: `${s.accent}20`, border: `1px solid ${s.accent}40`, color: s.accent, letterSpacing: "0.07em", textTransform: "uppercase", backdropFilter: "blur(6px)" }}>{s.label}</span>
                </div>
                <div style={{ position: "absolute", bottom: 18, left: 20, right: 20, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 900, letterSpacing: "-0.02em", color: "#fff", lineHeight: 1, margin: 0 }}>{s.title}</h3>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 18, fontWeight: 900, background: `linear-gradient(135deg, ${s.accent}, ${s.accent}bb)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-0.01em" }}>{s.earn}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 1 }}>{s.per}</div>
                  </div>
                </div>
              </div>
              {/* Content */}
              <div style={{ padding: "16px 20px 20px", background: "#0d0d1a" }}>
                <p style={{ fontSize: 13, color: "#888", lineHeight: 1.7, marginBottom: 14 }}>{s.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {s.points.map((pt, pi) => (
                    <div key={pi} style={{ display: "flex", alignItems: "center", gap: 9 }}>
                      <div style={{ width: 18, height: 18, borderRadius: 5, background: `${s.accent}12`, border: `1px solid ${s.accent}28`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
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

      {/* ── TIRGUS STATISTIKA ── */}
      <div style={{ position: "relative", borderRadius: 18, overflow: "hidden", border: "1px solid rgba(168,85,247,0.15)" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${IMG.tools})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.08) saturate(0.3)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(168,85,247,0.08), rgba(5,5,8,0.97))" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(168,85,247,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.025) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
        <div style={{ position: "relative", padding: "28px 32px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: P, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 22 }}>Latvijas tirgus iespēja</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 20 }}>
            {stats.map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 6, background: `linear-gradient(135deg, ${s.color} 0%, ${s.color}99 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: `drop-shadow(0 0 12px ${s.color}60)` }}>
                  {s.value}
                </div>
                <div style={{ fontSize: 12, color: "#666", lineHeight: 1.55 }}>{s.label}</div>
                <div style={{ height: 2, borderRadius: 2, background: `linear-gradient(90deg, ${s.color}60, transparent)`, marginTop: 10 }} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24, padding: "14px 18px", borderRadius: 12, background: "rgba(168,85,247,0.06)", border: "1px solid rgba(168,85,247,0.15)", display: "flex", alignItems: "flex-start", gap: 12, backdropFilter: "blur(8px)" }}>
            <span style={{ fontSize: 18, flexShrink: 0 }}>💡</span>
            <p style={{ fontSize: 12.5, color: "#888", lineHeight: 1.7, margin: 0 }}>
              Latvijā ir ap <strong style={{ color: "#ddd" }}>26 000 aktīvu uzņēmumu</strong>. Lielākā daļa maksā par saturu tikai tad, kad kāds piedāvā. Tu esi tas cilvēks, kas piedāvā.
            </p>
          </div>
        </div>
      </div>

      {/* ── AI RĪKI ── */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: P, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 16 }}>AI rīki ko tu apgūsi</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10 }}>
          {tools.map((t) => (
            <div
              key={t.name}
              style={{ padding: "14px 16px", borderRadius: 14, background: "rgba(13,13,26,0.9)", border: `1px solid ${t.color}18`, display: "flex", alignItems: "center", gap: 12, cursor: "default", backdropFilter: "blur(8px)", boxShadow: `0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)`, transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 32px rgba(0,0,0,0.3), 0 0 0 1px ${t.color}30`; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)"; }}
            >
              <div style={{ width: 38, height: 38, borderRadius: 10, background: `${t.color}14`, border: `1px solid ${t.color}28`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
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
      <div style={{ padding: "26px 28px", borderRadius: 18, background: "linear-gradient(135deg, rgba(13,13,26,0.95), rgba(9,9,18,0.98))", border: "1px solid rgba(168,85,247,0.12)", boxShadow: "0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: P, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 20 }}>Reāla ienākumu trajektorija</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {income.map((row, i) => (
            <div key={i} style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <div style={{ width: 76, flexShrink: 0 }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: "#444" }}>{row.period}</div>
              </div>
              <div style={{ flex: 1, position: "relative", height: 34, borderRadius: 8, background: "rgba(255,255,255,0.025)", overflow: "hidden", border: "1px solid rgba(255,255,255,0.04)" }}>
                <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${row.pct}%`, background: `linear-gradient(90deg, rgba(168,85,247,0.5), rgba(236,72,153,0.35))`, borderRadius: 7, boxShadow: row.pct > 50 ? "inset 0 1px 0 rgba(255,255,255,0.1)" : "none" }} />
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 12px" }}>
                  <span style={{ fontSize: 11, color: row.pct > 20 ? "rgba(255,255,255,0.75)" : "#666", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{row.desc}</span>
                </div>
              </div>
              <div style={{ width: 120, flexShrink: 0, textAlign: "right" }}>
                <div style={{ fontSize: 13, fontWeight: 800, color: row.pct > 30 ? GREEN : "#555", letterSpacing: "-0.01em" }}>{row.amount}</div>
                <div style={{ fontSize: 10, color: "#3a3a4a", marginTop: 1 }}>{row.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MODUĻU CEĻA KARTE ── */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: P, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 18 }}>Tavs ceļš caur 4 blokiem</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 10 }}>
          {modules.map((m) => (
            <div key={m.num} style={{ padding: "18px 20px", borderRadius: 14, background: "rgba(13,13,26,0.9)", border: `1px solid ${m.color}18`, boxShadow: `0 4px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.03)`, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -40, right: -40, width: 110, height: 110, borderRadius: "50%", background: `radial-gradient(circle, ${m.color}10, transparent 70%)`, pointerEvents: "none" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 30, height: 30, borderRadius: 9, background: `${m.color}14`, border: `1px solid ${m.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 900, color: m.color, flexShrink: 0, boxShadow: `0 0 12px ${m.color}20` }}>
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
      <div style={{ position: "relative", padding: "26px 28px", borderRadius: 18, overflow: "hidden", border: "1px solid rgba(168,85,247,0.2)", boxShadow: "0 16px 48px rgba(168,85,247,0.1)" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(168,85,247,0.1) 0%, rgba(236,72,153,0.06) 50%, rgba(5,5,8,0.95) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(168,85,247,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.03) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div style={{ position: "relative", display: "flex", alignItems: "flex-start", gap: 18 }}>
          <div style={{ width: 46, height: 46, borderRadius: 13, background: "linear-gradient(135deg, rgba(168,85,247,0.3), rgba(236,72,153,0.3))", border: "1px solid rgba(168,85,247,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 22, boxShadow: "0 8px 24px rgba(168,85,247,0.2)" }}>
            🎯
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 7, letterSpacing: "-0.01em" }}>
              Pēc šīs nodarbības tu saproti, kāpēc šis ir tavs labākais sākums
            </div>
            <p style={{ fontSize: 13, color: "#888", lineHeight: 1.75, margin: "0 0 14px" }}>
              Nākamajā nodarbībā — <strong style={{ color: "#ddd" }}>kādus pakalpojumus vari piedāvāt uzreiz</strong> un kā noteikt cenu pat bez pieredzes.
            </p>
            <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
              {[
                { dot: P,     text: "28 nodarbības" },
                { dot: GREEN, text: "Bez kodēšanas" },
                { dot: CYAN,  text: "Latvijas tirgum" },
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
