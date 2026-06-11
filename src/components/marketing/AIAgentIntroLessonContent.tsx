"use client";

import { EmojiIcon } from "@/components/EmojiIcon";

/* Brand-derived light palette (warm "premium" accent) */
const O  = "#E8924A"; // deep warm (legible on white)
const O2 = "#FFB86B"; // brand orange light
const G  = "#00BFA5";
const C  = "#33D4BF";
const P  = "#6D5EF3";

function Dot({ color }: { color: string }) {
  return <div style={{ width: 7, height: 7, borderRadius: "50%", background: color, flexShrink: 0 }} />;
}
function Check({ color = O }: { color?: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3.5" style={{ flexShrink: 0 }}>
      <polyline points="20,6 9,17 4,12" />
    </svg>
  );
}

const cardShadow = "0 12px 36px -20px rgba(17,17,17,0.16)";
const sectionLabel = (color: string): React.CSSProperties => ({
  fontSize: 10, fontWeight: 800, color, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 14,
});

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
    accent: P, accent2: O2,
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
  { icon: "🗄️", name: "Supabase",        desc: "Backend bez koda",            color: G },
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
      <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", border: `1px solid ${O}40`, background: "linear-gradient(135deg, rgba(232,146,74,0.12) 0%, rgba(255,184,107,0.06) 55%, #fff 100%)", boxShadow: "0 24px 64px -32px rgba(232,146,74,0.4)" }}>
        <div style={{ position: "absolute", top: -120, right: -80, width: 460, height: 460, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,146,74,0.14) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", padding: "40px 36px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 13px", borderRadius: 20, background: `${O}1f`, border: `1px solid ${O}4d`, marginBottom: 18 }}>
            <Dot color={O} />
            <span style={{ fontSize: 10, fontWeight: 700, color: O, letterSpacing: "0.08em", textTransform: "uppercase" }}>AI Aģentu Eksperts · 5 bloki · 44 nodarbības · Premium</span>
          </div>
          <h2 style={{ fontSize: "clamp(20px,4vw,32px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 12, color: "var(--ink)" }}>
            Kā AI aģenti maina<br />
            <span style={{ background: "linear-gradient(135deg, #E8924A, #FFB86B)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>uzņēmumu darbību Latvijā</span>
          </h2>
          <p style={{ fontSize: 13.5, color: "var(--ink-3)", lineHeight: 1.75, maxWidth: 540, marginBottom: 24 }}>
            Tu apgūsi 3 augstvērtīgus pakalpojumus — balss aģenti, WhatsApp automatizācija, AI aplikācijas. Klienti maksā <strong style={{ color: "var(--ink)" }}>€800–€9 000 mēnesī</strong>. Plus 1:1 mentorings un privāta kopiena.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[{ c: O, t: "Premium klienti" }, { c: O2, t: "€800+ / projekts" }, { c: G, t: "1:1 Mentorings" }].map((b) => (
              <div key={b.t} style={{ display: "flex", alignItems: "center", gap: 7, padding: "6px 13px", borderRadius: 9, background: "#fff", border: "1px solid var(--line)" }}>
                <Dot color={b.c} /><span style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink-2)" }}>{b.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3 PAKALPOJUMI ── */}
      <div>
        <div style={sectionLabel(O)}>3 premium pakalpojumi ko tu apgūsi un pārdosi</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {services.map((s, i) => (
            <div key={i} style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${s.accent}2e`, background: "#fff", boxShadow: cardShadow }}>
              <div style={{ position: "relative", height: 96, overflow: "hidden", background: `linear-gradient(135deg, ${s.accent}1f 0%, ${s.accent2}0f 100%)` }}>
                <div style={{ position: "absolute", top: -60, right: -40, width: 220, height: 220, borderRadius: "50%", background: `radial-gradient(circle, ${s.accent}26 0%, transparent 65%)`, pointerEvents: "none" }} />
                <div style={{ position: "absolute", top: 16, left: 18 }}>
                  <span style={{ fontSize: 9.5, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: `${s.accent}1f`, border: `1px solid ${s.accent}40`, color: s.accent, letterSpacing: "0.07em", textTransform: "uppercase" }}>{s.label}</span>
                </div>
                <div style={{ position: "absolute", top: 14, right: 18, display: "flex", alignItems: "baseline", gap: 4 }}>
                  <span style={{ fontSize: 15, fontWeight: 900, color: s.accent, letterSpacing: "-0.02em" }}>{s.earn}</span>
                </div>
                <div style={{ position: "absolute", bottom: 14, left: 18, right: 18 }}>
                  <h3 style={{ fontSize: 19, fontWeight: 900, letterSpacing: "-0.02em", color: "var(--ink)", margin: 0 }}>{s.title}</h3>
                  <div style={{ fontSize: 10.5, color: "var(--ink-3)", marginTop: 2 }}>{s.per}</div>
                </div>
              </div>
              <div style={{ padding: "16px 18px 18px" }}>
                <p style={{ fontSize: 12.5, color: "var(--ink-3)", lineHeight: 1.7, marginBottom: 12 }}>{s.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {s.points.map((pt, pi) => (
                    <div key={pi} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 17, height: 17, borderRadius: 5, background: `${s.accent}16`, border: `1px solid ${s.accent}38`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Check color={s.accent} />
                      </div>
                      <span style={{ fontSize: 12, color: "var(--ink-2)" }}>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── NIŠAS ── */}
      <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", border: "1px solid var(--line)", background: "#fff", boxShadow: cardShadow }}>
        <div style={{ position: "relative", padding: "24px 26px" }}>
          <div style={sectionLabel(O)}>Augstvērtīgas nišas Latvijā</div>
          <p style={{ fontSize: 12.5, color: "var(--ink-3)", lineHeight: 1.65, marginBottom: 16, marginTop: -8 }}>Premium klienti ar lieliem budžetiem — viņi zina, ka AI ietaupa tūkstošus eiro mēnesī.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(185px, 1fr))", gap: 9 }}>
            {niches.map((n) => (
              <div key={n.title} style={{ padding: "15px 16px", borderRadius: 12, background: "var(--bg)", border: "1px solid var(--line)" }}>
                <div style={{ marginBottom: 9 }}><EmojiIcon emoji={n.icon} size={20} color={O} strokeWidth={1.75} /></div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)", marginBottom: 4 }}>{n.title}</div>
                <div style={{ fontSize: 11, color: "var(--ink-3)", lineHeight: 1.55, marginBottom: 9 }}>{n.need}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}><Dot color={O} /><span style={{ fontSize: 12, fontWeight: 700, color: O }}>{n.price}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── STATISTIKA ── */}
      <div style={{ position: "relative", padding: "26px 28px", borderRadius: 16, overflow: "hidden", border: `1px solid ${O}2e`, background: "linear-gradient(135deg, rgba(232,146,74,0.07) 0%, #fff 60%)", boxShadow: cardShadow }}>
        <div style={{ position: "absolute", bottom: -70, left: -50, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,184,107,0.12) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <div style={sectionLabel(O)}>Premium tirgus iespēja</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 16 }}>
            {stats.map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 6, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 11.5, color: "var(--ink-3)", lineHeight: 1.5 }}>{s.label}</div>
                <div style={{ height: 2, borderRadius: 2, background: `linear-gradient(90deg, ${s.color}, transparent)`, marginTop: 9 }} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, padding: "13px 16px", borderRadius: 11, background: "#fff", border: "1px solid var(--line)", display: "flex", gap: 10 }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>💡</span>
            <p style={{ fontSize: 12, color: "var(--ink-2)", lineHeight: 1.7, margin: 0 }}>Latvijas uzņēmumi tērē <strong style={{ color: "var(--ink)" }}>tūkstošiem eiro</strong> darbiniekiem kas atbild uz zvaniem un raksta e-pastus. AI aģents to izdarīs labāk un lētāk. Tu to instalē.</p>
          </div>
        </div>
      </div>

      {/* ── IENĀKUMI ── */}
      <div style={{ position: "relative", padding: "24px 26px", borderRadius: 16, overflow: "hidden", border: "1px solid var(--line)", background: "#fff", boxShadow: cardShadow }}>
        <div style={{ position: "relative" }}>
          <div style={sectionLabel(O)}>Reāla ienākumu trajektorija</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {income.map((row, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 76, flexShrink: 0, fontSize: 10, fontWeight: 700, color: "var(--ink-3)" }}>{row.period}</div>
                <div style={{ flex: 1, position: "relative", height: 32, borderRadius: 7, background: "var(--bg-2)", overflow: "hidden", border: "1px solid var(--line)" }}>
                  <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${row.pct}%`, background: "linear-gradient(90deg, #E8924A, #FFB86B)", borderRadius: 6 }} />
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 10px" }}>
                    <span style={{ fontSize: 10.5, color: row.pct > 20 ? "#fff" : "var(--ink-3)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: 500 }}>{row.desc}</span>
                  </div>
                </div>
                <div style={{ width: 130, flexShrink: 0, textAlign: "right", fontSize: 12.5, fontWeight: 800, color: row.pct > 30 ? O : "var(--ink-3)", letterSpacing: "-0.01em" }}>{row.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PREMIUM BONUSES ── */}
      <div>
        <div style={sectionLabel(O)}>Premium bonusi — iekļauti plānā</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {bonuses.map((b, i) => (
            <div key={i} style={{ position: "relative", padding: "16px 18px", borderRadius: 13, background: "#fff", border: `1px solid ${O}33`, display: "flex", alignItems: "flex-start", gap: 14, overflow: "hidden", boxShadow: cardShadow }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: `${O}1a`, border: `1px solid ${O}40`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><EmojiIcon emoji={b.icon} size={18} color={O} strokeWidth={1.75} /></div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 4 }}>{b.title}</div>
                <div style={{ fontSize: 12, color: "var(--ink-3)", lineHeight: 1.6 }}>{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MODUĻI ── */}
      <div>
        <div style={sectionLabel(O)}>Tavs ceļš caur 5 blokiem</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(185px, 1fr))", gap: 9 }}>
          {modules.map((m) => (
            <div key={m.num} style={{ position: "relative", padding: "16px 18px", borderRadius: 13, background: "#fff", border: `1px solid ${m.color}2e`, overflow: "hidden", boxShadow: cardShadow }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: `${m.color}16`, border: `1px solid ${m.color}3a`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 900, color: m.color, flexShrink: 0 }}>{m.num}</div>
                <span style={{ fontSize: 12.5, fontWeight: 700, color: "var(--ink)" }}>{m.title}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <Check color={m.color} /><span style={{ fontSize: 11, color: "var(--ink-3)" }}>{m.milestone}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ position: "relative", padding: "24px 26px", borderRadius: 16, overflow: "hidden", border: `1px solid ${O}40`, background: "linear-gradient(135deg, rgba(232,146,74,0.12) 0%, rgba(255,184,107,0.06) 55%, #fff 100%)", boxShadow: "0 16px 44px -24px rgba(232,146,74,0.4)" }}>
        <div style={{ position: "absolute", top: -50, right: -40, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,184,107,0.12), transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", display: "flex", alignItems: "flex-start", gap: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg, #E8924A, #FFB86B)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 20, boxShadow: "0 8px 22px -8px rgba(232,146,74,0.6)" }}>🎯</div>
          <div>
            <div style={{ fontSize: 14.5, fontWeight: 800, color: "var(--ink)", marginBottom: 6, letterSpacing: "-0.01em" }}>Pēc šīs nodarbības tu saproti, kāpēc AI aģenti ir augstākā līmeņa pakalpojums</div>
            <p style={{ fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.75, margin: "0 0 12px" }}>Nākamajā nodarbībā — <strong style={{ color: "var(--ink)" }}>3 vispieprasītākie AI aģentu veidi</strong> un kuri no tiem der tavam pirmajam klientam.</p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {[{ c: O, t: "44 nodarbības" }, { c: O2, t: "Premium plāns" }, { c: G, t: "1:1 Mentorings" }].map((b) => (
                <div key={b.t} style={{ display: "flex", alignItems: "center", gap: 6 }}><Dot color={b.c} /><span style={{ fontSize: 11.5, color: "var(--ink-3)", fontWeight: 500 }}>{b.t}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
