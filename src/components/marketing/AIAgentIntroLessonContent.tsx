"use client";

const O  = "#f97316";
const O2 = "#fbbf24";
const G  = "#00ff88";
const C  = "#00d4ff";
const P  = "#a855f7";

function GlowDot({ color }: { color: string }) {
  return <div style={{ width: 7, height: 7, borderRadius: "50%", background: color, boxShadow: `0 0 8px ${color}, 0 0 18px ${color}55`, flexShrink: 0 }} />;
}
function Check({ color = O }: { color?: string }) {
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
    accent: O, accent2: O2,
    label: "Pakalpojums #1",
    title: "AI Balss Aģents",
    earn: "€800–€2 500", per: "projekts + €300/mēn uzturēšana",
    desc: "AI aģents kas pats zvana klientiem, pieraksta vizītes un atbild uz jautājumiem 24/7 — latviešu valodā.",
    points: ["Retell AI + ElevenLabs latviešu balss", "Latvijas +371 numura integrācija (Vonage)", "Google Calendar automātiskā rezervācija"],
  },
  {
    accent: O2, accent2: G,
    label: "Pakalpojums #2",
    title: "WhatsApp Automatizācija",
    earn: "€500–€1 200", per: "projekts + €150/mēn",
    desc: "Automātiskas atbildes, lead apstrāde un klientu komunikācija WhatsApp — bez manuāla darba.",
    points: ["Make.com vai n8n — vizuāla automatizācija", "WhatsApp Business API integrācija", "Lead notifikācijas uz e-pastu un CRM"],
  },
  {
    accent: G, accent2: C,
    label: "Pakalpojums #3",
    title: "AI Mobilā Aplikācija",
    earn: "€800–€3 000", per: "projekts (MVP 1 dienā)",
    desc: "Mobilā vai web aplikācija no idejas līdz App Store — Bolt.new, Lovable vai Cursor, bez programmēšanas.",
    points: ["Bolt.new / Lovable — no idejas 1 dienā", "Supabase vai Firebase — backend bez koda", "App Store un Google Play publicēšana"],
  },
];

const niches = [
  { icon: "🦷", title: "Zobārsti & Klīnikas",     need: "Balss aģents → pierakstu rezervācija",  price: "€1 500–€3 000" },
  { icon: "🏠", title: "Nekustamais Īpašums",      need: "Aģents → apskates un jautājumi",        price: "€1 000–€2 500" },
  { icon: "🏥", title: "Privātās Klīnikas",        need: "WhatsApp + balss → pacientu plūsma",    price: "€1 200–€2 800" },
  { icon: "🍽️", title: "Restorāni & Viesnīcas",   need: "Rezervācijas + atbildes automātiski",    price: "€800–€1 800" },
];

const stats = [
  { value: "€2 400", label: "vidējais projekta honorārs AI aģentam Latvijā",    color: O },
  { value: "94%",    label: "uzņēmumu kas nopērk, turpina ar ikmēneša atbalstu", color: O2 },
  { value: "12 st.", label: "vidēji aizņem pilna balss aģenta izveide",          color: G },
  { value: "3×",    label: "vairāk maksā augstvērtīgs klients vs. vidusmēra",    color: C },
];

const tools = [
  { icon: "🎙️", name: "Retell AI",      desc: "Balss aģentu platforma",       color: O },
  { icon: "🔊", name: "ElevenLabs",     desc: "Reālistiskas AI balsis",       color: O2 },
  { icon: "⚡", name: "n8n / Make.com", desc: "Automatizācijas platformas",   color: G },
  { icon: "📞", name: "Vonage / Twilio", desc: "Latvijas tālruņa numuri",     color: C },
  { icon: "📱", name: "Bolt.new",        desc: "AI aplikāciju veidošana",     color: P },
  { icon: "🗄️", name: "Supabase",        desc: "Backend bez koda",            color: "#10b981" },
];

const modules = [
  { num: "1", color: O,   title: "Ievads & AI Aģentu tirgus",   milestone: "Saproti iespējas un premium cenas" },
  { num: "2", color: O2,  title: "AI Balss Aģenti",             milestone: "Darbojošs balss aģents klientam" },
  { num: "3", color: G,   title: "WhatsApp Automatizācija",     milestone: "Pilns automatizācijas workflow" },
  { num: "4", color: C,   title: "AI Mobilā Aplikācija",        milestone: "MVP publicēts App Store" },
  { num: "5", color: P,   title: "Premium Bizness & Aģentūra",  milestone: "6 mēnešu plāns līdz €3 000/mēn" },
];

const income = [
  { period: "1.–2. ned.", desc: "Apgūsti Retell AI un ElevenLabs",          amount: "€0",            pct: 4 },
  { period: "3.–4. ned.", desc: "Izveido demo aģentu, sūti outreach",       amount: "€0–€500",      pct: 12 },
  { period: "2. mēn.",    desc: "Pirmais klients — balss aģents vai WA",    amount: "€800–€2 000",  pct: 35 },
  { period: "3.–4. mēn.", desc: "2–3 premium klienti, atbalsta paketes",    amount: "€1 600–€4 500", pct: 65 },
  { period: "6. mēn.+",   desc: "4–6 klienti, aģentūras modelis",          amount: "€3 200–€9 000", pct: 100 },
];

const bonuses = [
  { icon: "🎓", title: "1:1 Mentorings", desc: "2× mēnesī — personīga sesija ar ekspertu par taviem projektiem" },
  { icon: "👥", title: "Privātā Kopiena", desc: "Ekspertu tīkls — sadarbība, darījumi un jautājumu atbildes" },
  { icon: "📈", title: "Aģentūras Ceļvedis", desc: "No solo speciālista uz aģentūru — solis pa solim" },
];

export function AIAgentIntroLessonContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, paddingTop: 24 }}>

      {/* ── HERO ── */}
      <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(249,115,22,0.25)", boxShadow: "0 24px 64px rgba(249,115,22,0.12), 0 4px 16px rgba(0,0,0,0.45)" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(8,5,3,1) 0%, rgba(12,7,3,1) 100%)" }} />
        <div style={{ position: "absolute", top: -120, right: -80, width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle, rgba(249,115,22,0.2) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -80, left: -60, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(251,191,36,0.12) 0%, transparent 65%)", pointerEvents: "none" }} />
        <GridBg color="rgba(249,115,22,0.04)" size={30} />
        <div style={{ position: "relative", padding: "40px 36px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 13px", borderRadius: 20, background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.3)", marginBottom: 18 }}>
            <GlowDot color={O} />
            <span style={{ fontSize: 10, fontWeight: 700, color: O, letterSpacing: "0.08em", textTransform: "uppercase" }}>AI Aģentu Eksperts · 5 bloki · 44 nodarbības · Premium</span>
          </div>
          <h2 style={{ fontSize: "clamp(20px,4vw,32px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 12, color: "#fff" }}>
            Kā AI aģenti maina<br />
            <span style={{ background: "linear-gradient(135deg, #f97316, #fbbf24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>uzņēmumu darbību Latvijā</span>
          </h2>
          <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.52)", lineHeight: 1.75, maxWidth: 540, marginBottom: 24 }}>
            Tu apgūsi 3 augstvērtīgus pakalpojumus — balss aģenti, WhatsApp automatizācija, AI aplikācijas. Klienti maksā <strong style={{ color: "#fff" }}>€800–€9 000 mēnesī</strong>. Plus 1:1 mentorings un privāta kopiena.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[{ c: O, t: "Premium klienti" }, { c: O2, t: "€800+ / projekts" }, { c: G, t: "1:1 Mentorings" }].map((b) => (
              <div key={b.t} style={{ display: "flex", alignItems: "center", gap: 7, padding: "6px 13px", borderRadius: 9, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <GlowDot color={b.c} /><span style={{ fontSize: 11.5, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>{b.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3 PAKALPOJUMI ── */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: O, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 14 }}>3 premium pakalpojumi ko tu apgūsi un pārdosi</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {services.map((s, i) => (
            <div key={i} style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${s.accent}22`, boxShadow: "0 6px 24px rgba(0,0,0,0.32)" }}>
              <div style={{ position: "relative", height: 110, overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(8,5,3,0.92), rgba(12,7,3,0.96))" }} />
                <div style={{ position: "absolute", top: -60, right: -40, width: 240, height: 240, borderRadius: "50%", background: `radial-gradient(circle, ${s.accent}32 0%, transparent 65%)`, pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: -40, left: -30, width: 180, height: 180, borderRadius: "50%", background: `radial-gradient(circle, ${s.accent2}1a 0%, transparent 65%)`, pointerEvents: "none" }} />
                <GridBg color={`${s.accent}04`} size={20} />
                <div style={{ position: "absolute", top: 16, left: 18 }}>
                  <span style={{ fontSize: 9.5, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: `${s.accent}16`, border: `1px solid ${s.accent}36`, color: s.accent, letterSpacing: "0.07em", textTransform: "uppercase" }}>{s.label}</span>
                </div>
                <div style={{ position: "absolute", bottom: 14, left: 18, right: 18, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 10 }}>
                  <h3 style={{ fontSize: 19, fontWeight: 900, letterSpacing: "-0.02em", color: "#fff", margin: 0 }}>{s.title}</h3>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 15, fontWeight: 900, background: `linear-gradient(135deg, ${s.accent}, ${s.accent2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.earn}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.32)", marginTop: 1 }}>{s.per}</div>
                  </div>
                </div>
              </div>
              <div style={{ padding: "14px 18px 18px", background: "#0c0805" }}>
                <p style={{ fontSize: 12.5, color: "#7a6a5a", lineHeight: 1.7, marginBottom: 12 }}>{s.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  {s.points.map((pt, pi) => (
                    <div key={pi} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 17, height: 17, borderRadius: 5, background: `${s.accent}10`, border: `1px solid ${s.accent}26`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Check color={s.accent} />
                      </div>
                      <span style={{ fontSize: 12, color: "#9a8a7a" }}>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── NIŠAS ── */}
      <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(249,115,22,0.14)", boxShadow: "0 6px 28px rgba(0,0,0,0.3)" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(8,5,3,1), rgba(12,7,3,1))" }} />
        <div style={{ position: "absolute", top: -60, right: -40, width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle, rgba(249,115,22,0.1) 0%, transparent 65%)", pointerEvents: "none" }} />
        <GridBg color="rgba(249,115,22,0.025)" size={22} />
        <div style={{ position: "relative", padding: "24px 26px" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: O, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 6 }}>Augstvērtīgas nišas Latvijā</div>
          <p style={{ fontSize: 12.5, color: "#6a5a4a", lineHeight: 1.65, marginBottom: 16 }}>Premium klienti ar lieliem budžetiem — viņi zina, ka AI ietaupa tūkstošus eiro mēnesī.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(185px, 1fr))", gap: 9 }}>
            {niches.map((n) => (
              <div key={n.title} style={{ padding: "15px 16px", borderRadius: 12, background: "rgba(14,9,5,0.9)", border: "1px solid rgba(249,115,22,0.12)", boxShadow: "0 3px 12px rgba(0,0,0,0.22), inset 0 1px 0 rgba(249,115,22,0.03)" }}>
                <div style={{ fontSize: 20, marginBottom: 9 }}>{n.icon}</div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: "#ddd", marginBottom: 4 }}>{n.title}</div>
                <div style={{ fontSize: 11, color: "#5a4a3a", lineHeight: 1.55, marginBottom: 9 }}>{n.need}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}><GlowDot color={O} /><span style={{ fontSize: 12, fontWeight: 700, color: O }}>{n.price}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── STATISTIKA ── */}
      <div style={{ position: "relative", padding: "26px 28px", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(249,115,22,0.12)", boxShadow: "0 6px 32px rgba(0,0,0,0.32), inset 0 1px 0 rgba(255,255,255,0.025)" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(8,5,3,1), rgba(12,7,3,1))" }} />
        <div style={{ position: "absolute", bottom: -70, left: -50, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: O, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 20 }}>Premium tirgus iespēja</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 16 }}>
            {stats.map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 6, background: `linear-gradient(135deg, ${s.color}, ${s.color}99)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", filter: `drop-shadow(0 0 10px ${s.color}55)` }}>{s.value}</div>
                <div style={{ fontSize: 11.5, color: "#5a4a3a", lineHeight: 1.5 }}>{s.label}</div>
                <div style={{ height: 2, borderRadius: 2, background: `linear-gradient(90deg, ${s.color}50, transparent)`, marginTop: 9 }} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, padding: "13px 16px", borderRadius: 11, background: "rgba(249,115,22,0.05)", border: "1px solid rgba(249,115,22,0.13)", display: "flex", gap: 10 }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>💡</span>
            <p style={{ fontSize: 12, color: "#7a6a5a", lineHeight: 1.7, margin: 0 }}>Latvijas uzņēmumi tērē <strong style={{ color: "#ccc" }}>tūkstošiem eiro</strong> darbiniekiem kas atbild uz zvaniem un raksta e-pastus. AI aģents to izdarīs labāk un lētāk. Tu to instalē.</p>
          </div>
        </div>
      </div>

      {/* ── IENĀKUMI ── */}
      <div style={{ position: "relative", padding: "24px 26px", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(249,115,22,0.1)", boxShadow: "0 6px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.025)" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(8,5,3,1), rgba(12,7,3,1))" }} />
        <div style={{ position: "absolute", top: -50, right: -40, width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, rgba(249,115,22,0.09), transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: O, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 18 }}>Reāla ienākumu trajektorija</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {income.map((row, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 76, flexShrink: 0, fontSize: 10, fontWeight: 600, color: "#3a2a1a" }}>{row.period}</div>
                <div style={{ flex: 1, position: "relative", height: 32, borderRadius: 7, background: "rgba(255,255,255,0.02)", overflow: "hidden", border: "1px solid rgba(255,255,255,0.035)" }}>
                  <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${row.pct}%`, background: "linear-gradient(90deg, rgba(249,115,22,0.5), rgba(251,191,36,0.32))", borderRadius: 6 }} />
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 10px" }}>
                    <span style={{ fontSize: 10.5, color: row.pct > 20 ? "rgba(255,220,180,0.7)" : "#3a2a1a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{row.desc}</span>
                  </div>
                </div>
                <div style={{ width: 130, flexShrink: 0, textAlign: "right", fontSize: 12.5, fontWeight: 800, color: row.pct > 30 ? O : "#3a2a1a", letterSpacing: "-0.01em" }}>{row.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PREMIUM BONUSES ── */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: O, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 14 }}>Premium bonusi — iekļauti plānā</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {bonuses.map((b, i) => (
            <div key={i} style={{ position: "relative", padding: "16px 18px", borderRadius: 13, background: "rgba(14,9,5,0.9)", border: `1px solid rgba(249,115,22,0.2)`, display: "flex", alignItems: "flex-start", gap: 14, overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.22), inset 0 1px 0 rgba(249,115,22,0.04)" }}>
              <div style={{ position: "absolute", top: -30, right: -30, width: 100, height: 100, borderRadius: "50%", background: "radial-gradient(circle, rgba(249,115,22,0.08), transparent 70%)", pointerEvents: "none" }} />
              <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.28)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{b.icon}</div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{b.title}</div>
                <div style={{ fontSize: 12, color: "#6a5a4a", lineHeight: 1.6 }}>{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MODUĻI ── */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: O, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 14 }}>Tavs ceļš caur 5 blokiem</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(185px, 1fr))", gap: 9 }}>
          {modules.map((m) => (
            <div key={m.num} style={{ position: "relative", padding: "16px 18px", borderRadius: 13, background: "rgba(14,9,5,0.92)", border: `1px solid ${m.color}18`, overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.025)" }}>
              <div style={{ position: "absolute", top: -35, right: -35, width: 100, height: 100, borderRadius: "50%", background: `radial-gradient(circle, ${m.color}12, transparent 70%)`, pointerEvents: "none" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: `${m.color}10`, border: `1px solid ${m.color}2a`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, color: m.color, flexShrink: 0, boxShadow: `0 0 10px ${m.color}18` }}>{m.num}</div>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: "#ddd" }}>{m.title}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <Check color={m.color} /><span style={{ fontSize: 11, color: "#4a3a2a" }}>{m.milestone}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ position: "relative", padding: "24px 26px", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(249,115,22,0.22)", boxShadow: "0 12px 40px rgba(249,115,22,0.08)" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(249,115,22,0.09) 0%, rgba(251,191,36,0.05) 50%, rgba(8,5,3,0.97) 100%)" }} />
        <GridBg color="rgba(249,115,22,0.025)" size={22} />
        <div style={{ position: "absolute", top: -50, right: -40, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(251,191,36,0.1), transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", display: "flex", alignItems: "flex-start", gap: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg, rgba(249,115,22,0.28), rgba(251,191,36,0.28))", border: "1px solid rgba(249,115,22,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 20, boxShadow: "0 6px 20px rgba(249,115,22,0.18)" }}>🎯</div>
          <div>
            <div style={{ fontSize: 14.5, fontWeight: 800, color: "#ddd", marginBottom: 6, letterSpacing: "-0.01em" }}>Pēc šīs nodarbības tu saproti, kāpēc AI aģenti ir augstākā līmeņa pakalpojums</div>
            <p style={{ fontSize: 12.5, color: "#6a5a4a", lineHeight: 1.75, margin: "0 0 12px" }}>Nākamajā nodarbībā — <strong style={{ color: "#bbb" }}>3 vispieprasītākie AI aģentu veidi</strong> un kuri no tiem der tavam pirmajam klientam.</p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {[{ c: O, t: "44 nodarbības" }, { c: O2, t: "Premium plāns" }, { c: G, t: "1:1 Mentorings" }].map((b) => (
                <div key={b.t} style={{ display: "flex", alignItems: "center", gap: 6 }}><GlowDot color={b.c} /><span style={{ fontSize: 11.5, color: "#4a3a2a", fontWeight: 500 }}>{b.t}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
