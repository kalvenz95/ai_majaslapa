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

const services = [
  {
    accent: P, accent2: P2,
    label: "Pakalpojums #1",
    title: "AI Faceless Video",
    earn: "€200–€600", per: "par video pakotni",
    desc: "Video bez kameras — scenārijs ar AI, ģenerēšana Runway/HeyGen, montāža CapCut. Klients saņem gatavu pakotni.",
    points: ["Bez sejas, bez kameras, bez pieredzes", "Runway ML + HeyGen + CapCut workflow", "30 min darbs = pilna video pakotne"],
  },
  {
    accent: P2, accent2: AM,
    label: "Pakalpojums #2",
    title: "Sociālo Tīklu Pārvaldība",
    earn: "€300–€800", per: "mēnesī / klients",
    desc: "Ikmēneša satura grafiks, banneri, carousels un captions. Klients apstiprina, tu publicē automātiski ar Buffer.",
    points: ["Canva AI + Midjourney vizuāļi", "Buffer automātiskā publicēšana", "Ikmēneša atskaite un statistika"],
  },
  {
    accent: G, accent2: C,
    label: "Pakalpojums #3",
    title: "Klientu Atrašana",
    earn: "€300–€1 500", per: "mēnesī (3–4 klienti)",
    desc: "Portfolio no nulles, cold outreach skripti un pirmā tikšanās. No kontakta līdz parakstītam līgumam.",
    points: ["Copy-paste outreach veidnes (e-pasts + DM)", "Reāls piemērs no pirmā zvana", "Kā celt cenu pēc pirmā mēneša"],
  },
];

const stats = [
  { value: "26 000", label: "aktīvu uzņēmumu Latvijā bez regulāra satura", color: P },
  { value: "€350",   label: "vidējais mēneša budžets satura radīšanai",     color: P2 },
  { value: "3 ned.", label: "vidēji līdz pirmajam klientam pēc kursa",       color: G },
  { value: "82%",    label: "studentu iegūst ienākumus 60 dienās",           color: C },
];

const tools = [
  { icon: "✂️", name: "CapCut",      desc: "Auto montāža + subtitri",     color: C },
  { icon: "🎬", name: "Runway ML",   desc: "AI video ģenerēšana",          color: P },
  { icon: "🤖", name: "HeyGen",      desc: "AI avatar prezentācijas",      color: P2 },
  { icon: "🖌️", name: "Canva AI",    desc: "Banneri + feed dizains",       color: AM },
  { icon: "🎨", name: "Midjourney",  desc: "Profesionāli attēli",          color: "#f97316" },
  { icon: "📅", name: "Buffer",      desc: "Auto publicēšana",             color: "#8b5cf6" },
];

const modules = [
  { num: "1", color: P,   title: "Ievads & Tirgus",           milestone: "Saproti iespējas, uzstādā rīkus" },
  { num: "2", color: P2,  title: "AI Faceless Video",         milestone: "Pirmais gatavs video klientam" },
  { num: "3", color: AM,  title: "Sociālo Tīklu Pārvaldība",  milestone: "Mēneša saturs 2 stundās" },
  { num: "4", color: G,   title: "Portfolio & Pirmā Nauda",   milestone: "Pirmais klients un samaksa" },
];

const income = [
  { period: "1.–3. ned.", desc: "Apgūsti rīkus, veido pirmo demo",       amount: "€0",           pct: 4 },
  { period: "4. ned.",    desc: "Sūti outreach, veido portfolio",          amount: "€0–€200",     pct: 14 },
  { period: "2. mēn.",    desc: "1–2 klienti, stabils process",            amount: "€300–€600",   pct: 40 },
  { period: "3.–4. mēn.", desc: "Pievieno klientus, cel cenas",            amount: "€600–€1 500", pct: 72 },
  { period: "6. mēn.+",   desc: "4–6 klienti, automatizēts darbs",        amount: "€1 500–€3 600", pct: 100 },
];

export function SaturaIntroLessonContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, paddingTop: 24 }}>

      {/* ── HERO ── */}
      <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(168,85,247,0.25)", boxShadow: "0 24px 64px rgba(168,85,247,0.12), 0 4px 16px rgba(0,0,0,0.4)" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(5,5,8,1) 0%, rgba(9,5,18,1) 100%)" }} />
        <div style={{ position: "absolute", top: -120, right: -80, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.22) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -80, left: -60, width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(236,72,153,0.14) 0%, transparent 65%)", pointerEvents: "none" }} />
        <GridBg color="rgba(168,85,247,0.04)" size={30} />
        <div style={{ position: "relative", padding: "40px 36px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 13px", borderRadius: 20, background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.3)", marginBottom: 18 }}>
            <GlowDot color={P} />
            <span style={{ fontSize: 10, fontWeight: 700, color: P, letterSpacing: "0.08em", textTransform: "uppercase" }}>Satura Speciālists · 4 bloki · 28 nodarbības</span>
          </div>
          <h2 style={{ fontSize: "clamp(20px,4vw,32px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 12, color: "#fff" }}>
            Kā AI maina<br />
            <span style={{ background: "linear-gradient(135deg, #c084fc, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>satura radīšanas industriju</span>
          </h2>
          <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, maxWidth: 520, marginBottom: 24 }}>
            Uzņēmumi katru dienu meklē cilvēkus kas palīdz ar saturu. Tu apgūsi 3 pakalpojumus, pelnīsi <strong style={{ color: "#ddd" }}>€300–€1 500 mēnesī</strong> un automatizēsi visu procesu.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[{ c: P, t: "Bez kameras vai sejas" }, { c: G, t: "Klients 3 nedēļās" }, { c: C, t: "Pilnībā latviski" }].map((b) => (
              <div key={b.t} style={{ display: "flex", alignItems: "center", gap: 7, padding: "6px 13px", borderRadius: 9, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <GlowDot color={b.c} /><span style={{ fontSize: 11.5, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>{b.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3 PAKALPOJUMI ── */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: P, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 14 }}>3 pakalpojumi ko tu apgūsi un pārdosi</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {services.map((s, i) => (
            <div key={i} style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${s.accent}22`, boxShadow: "0 6px 24px rgba(0,0,0,0.3)" }}>
              {/* Gradient header strip */}
              <div style={{ position: "relative", height: 110, overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, rgba(5,5,8,0.9) 0%, rgba(9,5,18,0.95) 100%)` }} />
                <div style={{ position: "absolute", top: -60, right: -40, width: 240, height: 240, borderRadius: "50%", background: `radial-gradient(circle, ${s.accent}35 0%, transparent 65%)`, pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: -40, left: -30, width: 180, height: 180, borderRadius: "50%", background: `radial-gradient(circle, ${s.accent2}20 0%, transparent 65%)`, pointerEvents: "none" }} />
                <GridBg color={`${s.accent}05`} size={22} />
                <div style={{ position: "absolute", top: 16, left: 18 }}>
                  <span style={{ fontSize: 9.5, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: `${s.accent}18`, border: `1px solid ${s.accent}38`, color: s.accent, letterSpacing: "0.07em", textTransform: "uppercase" }}>{s.label}</span>
                </div>
                <div style={{ position: "absolute", bottom: 14, left: 18, right: 18, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 10 }}>
                  <h3 style={{ fontSize: 19, fontWeight: 900, letterSpacing: "-0.02em", color: "#fff", margin: 0 }}>{s.title}</h3>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 16, fontWeight: 900, background: `linear-gradient(135deg, ${s.accent}, ${s.accent2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.earn}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 1 }}>{s.per}</div>
                  </div>
                </div>
              </div>
              {/* Content */}
              <div style={{ padding: "14px 18px 18px", background: "#0a0a14" }}>
                <p style={{ fontSize: 12.5, color: "#777", lineHeight: 1.7, marginBottom: 12 }}>{s.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  {s.points.map((pt, pi) => (
                    <div key={pi} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 17, height: 17, borderRadius: 5, background: `${s.accent}10`, border: `1px solid ${s.accent}28`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Check color={s.accent} />
                      </div>
                      <span style={{ fontSize: 12, color: "#999" }}>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── STATISTIKA ── */}
      <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(168,85,247,0.15)", boxShadow: "0 8px 32px rgba(0,0,0,0.3)" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(5,5,8,1), rgba(10,5,20,1))" }} />
        <div style={{ position: "absolute", top: -80, right: -60, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 65%)", pointerEvents: "none" }} />
        <GridBg color="rgba(168,85,247,0.03)" size={22} />
        <div style={{ position: "relative", padding: "26px 28px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: P, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 20 }}>Latvijas tirgus iespēja</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(155px, 1fr))", gap: 18 }}>
            {stats.map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 6, background: `linear-gradient(135deg, ${s.color} 0%, ${s.color}99 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: `drop-shadow(0 0 10px ${s.color}55)` }}>{s.value}</div>
                <div style={{ fontSize: 11.5, color: "#555", lineHeight: 1.5 }}>{s.label}</div>
                <div style={{ height: 2, borderRadius: 2, background: `linear-gradient(90deg, ${s.color}55, transparent)`, marginTop: 9 }} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 22, padding: "13px 16px", borderRadius: 11, background: "rgba(168,85,247,0.05)", border: "1px solid rgba(168,85,247,0.13)", display: "flex", gap: 10 }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>💡</span>
            <p style={{ fontSize: 12, color: "#777", lineHeight: 1.7, margin: 0 }}>Latvijā ir ap <strong style={{ color: "#ccc" }}>26 000 aktīvu uzņēmumu</strong>. Lielākā daļa maksā par saturu tikai tad, kad kāds piedāvā. Tu esi tas cilvēks.</p>
          </div>
        </div>
      </div>

      {/* ── RĪKI ── */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: P, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 14 }}>AI rīki ko tu apgūsi</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(148px, 1fr))", gap: 9 }}>
          {tools.map((t) => (
            <div key={t.name}
              style={{ padding: "13px 15px", borderRadius: 13, background: "rgba(10,10,20,0.9)", border: `1px solid ${t.color}16`, display: "flex", alignItems: "center", gap: 11, boxShadow: "0 3px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 10px 28px rgba(0,0,0,0.28), 0 0 0 1px ${t.color}28`; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 3px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.03)"; }}
            >
              <div style={{ width: 36, height: 36, borderRadius: 9, background: `${t.color}12`, border: `1px solid ${t.color}25`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>{t.icon}</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{t.name}</div>
                <div style={{ fontSize: 10.5, color: "#4a4a5a", marginTop: 2 }}>{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── IENĀKUMI ── */}
      <div style={{ position: "relative", padding: "24px 26px", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(168,85,247,0.1)", boxShadow: "0 6px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.03)" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(5,5,8,1), rgba(10,5,20,1))" }} />
        <div style={{ position: "absolute", bottom: -60, right: -40, width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: P, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 18 }}>Reāla ienākumu trajektorija</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {income.map((row, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 72, flexShrink: 0, fontSize: 10, fontWeight: 600, color: "#3a3a4a" }}>{row.period}</div>
                <div style={{ flex: 1, position: "relative", height: 32, borderRadius: 7, background: "rgba(255,255,255,0.025)", overflow: "hidden", border: "1px solid rgba(255,255,255,0.04)" }}>
                  <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${row.pct}%`, background: "linear-gradient(90deg, rgba(168,85,247,0.5), rgba(236,72,153,0.32))", borderRadius: 6 }} />
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 10px" }}>
                    <span style={{ fontSize: 10.5, color: row.pct > 20 ? "rgba(255,255,255,0.7)" : "#555", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{row.desc}</span>
                  </div>
                </div>
                <div style={{ width: 110, flexShrink: 0, textAlign: "right", fontSize: 12.5, fontWeight: 800, color: row.pct > 30 ? G : "#444", letterSpacing: "-0.01em" }}>{row.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MODUĻI ── */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: P, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 14 }}>Tavs ceļš caur 4 blokiem</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 9 }}>
          {modules.map((m) => (
            <div key={m.num} style={{ position: "relative", padding: "16px 18px", borderRadius: 13, background: "rgba(10,10,20,0.9)", border: `1px solid ${m.color}18`, overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.03)" }}>
              <div style={{ position: "absolute", top: -35, right: -35, width: 100, height: 100, borderRadius: "50%", background: `radial-gradient(circle, ${m.color}12, transparent 70%)`, pointerEvents: "none" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: `${m.color}12`, border: `1px solid ${m.color}2e`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, color: m.color, flexShrink: 0, boxShadow: `0 0 10px ${m.color}20` }}>{m.num}</div>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: "#fff" }}>{m.title}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <Check color={m.color} /><span style={{ fontSize: 11, color: "#555" }}>{m.milestone}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ position: "relative", padding: "24px 26px", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(168,85,247,0.2)", boxShadow: "0 12px 40px rgba(168,85,247,0.08)" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(168,85,247,0.09) 0%, rgba(236,72,153,0.05) 50%, rgba(5,5,8,0.97) 100%)" }} />
        <GridBg color="rgba(168,85,247,0.025)" size={22} />
        <div style={{ position: "absolute", top: -60, right: -50, width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, rgba(236,72,153,0.12), transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", display: "flex", alignItems: "flex-start", gap: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg, rgba(168,85,247,0.28), rgba(236,72,153,0.28))", border: "1px solid rgba(168,85,247,0.38)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 20, boxShadow: "0 6px 20px rgba(168,85,247,0.18)" }}>🎯</div>
          <div>
            <div style={{ fontSize: 14.5, fontWeight: 800, color: "#fff", marginBottom: 6, letterSpacing: "-0.01em" }}>Pēc šīs nodarbības tu saproti, kāpēc šis ir tavs labākais sākums</div>
            <p style={{ fontSize: 12.5, color: "#777", lineHeight: 1.75, margin: "0 0 12px" }}>Nākamajā nodarbībā — <strong style={{ color: "#ccc" }}>kādus pakalpojumus vari piedāvāt uzreiz</strong> un kā noteikt cenu pat bez pieredzes.</p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {[{ c: P, t: "28 nodarbības" }, { c: G, t: "Bez kodēšanas" }, { c: C, t: "Latvijas tirgum" }].map((b) => (
                <div key={b.t} style={{ display: "flex", alignItems: "center", gap: 6 }}><GlowDot color={b.c} /><span style={{ fontSize: 11.5, color: "#555", fontWeight: 500 }}>{b.t}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
