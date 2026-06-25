"use client";

import { AnimatedNumber } from "@/components/AnimatedNumber";

/* Brand-derived light palette */
const G  = "#00BFA5";
const G2 = "#33D4BF";
const P  = "#6D5EF3";
const AM = "#FFB86B";
const PK = "#9B8FF7";

function Dot({ color }: { color: string }) {
  return <div style={{ width: 7, height: 7, borderRadius: "50%", background: color, flexShrink: 0 }} />;
}
function Check({ color = G }: { color?: string }) {
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

/* Toreiz vs Tagad — kā mainījās mājaslapu izstrāde */
const before = [
  "Nedēļas vai mēneši darba",
  "Dārga izstrādātāju komanda",
  "€2 000–€10 000 par vienu lapu",
  "Jāprot programmēt vai jāmaksā tam, kas prot",
];
const after = [
  "Dažas stundas, ne mēneši",
  "Viens cilvēks + AI",
  "Sāc pat bez budžeta",
  "Bez koda — tu vadi AI ar vārdiem",
];

const stats = [
  { value: "10×",   label: "ātrāk uzbūvē mājaslapu ar AI nekā ar roku",       color: G },
  { value: "0",     label: "koda rindu tev pašam jāraksta",                    color: G2 },
  { value: "58%",   label: "Latvijas uzņēmumu nav profesionālas mājaslapas",   color: AM },
  { value: "€500+", label: "ko biznesi maksā par vienu mājaslapu",             color: P },
];

const whyClaude = [
  {
    accent: P, accent2: PK,
    icon: "💬",
    title: "Tu runā — AI būvē",
    desc: "Apraksti parastā valodā, ko vēlies, un Claude Code uzraksta visu kodu. Tev nav jāzina neviena programmēšanas valoda.",
  },
  {
    accent: G, accent2: G2,
    icon: "✨",
    title: "Īsta lapa, ne šablons",
    desc: "Nevis vienkārša veidne, bet pilnvērtīga, pielāgota mājaslapa — tieši tāda, kādu vēlas tavs klients.",
  },
  {
    accent: AM, accent2: G2,
    icon: "⚡",
    title: "Ātrums + kvalitāte",
    desc: "Profesionāls rezultāts stundās, nevis nedēļās. Tieši tā prasme, par kuru biznesi šodien ir gatavi maksāt.",
  },
];

/* Ko tu uzbūvēsi — kursa ceļojums (atspoguļo 5 moduļus) */
const journey = [
  { num: "1", color: G,   title: "Saproti iespēju",       milestone: "Kāpēc AI mainīja mājaslapu izstrādi" },
  { num: "2", color: G2,  title: "Uzbūvē mājaslapu",      milestone: "Īsta lapa ar Claude Code, no nulles" },
  { num: "3", color: AM,  title: "Uzlabo un publicē",     milestone: "Premium dizains, domēns, tiešsaistē" },
  { num: "4", color: P,   title: "Pievieno AI funkcijas", milestone: "Čatbots, asistents, automatizācijas" },
  { num: "5", color: PK,  title: "Pārdod biznesiem",      milestone: "Portfolio, klienti, reāls bizness" },
];

const income = [
  { period: "1.–2. ned.", desc: "Apgūsti Claude Code, uzbūvē pirmo lapu",      amount: "€0",            pct: 8 },
  { period: "3.–4. ned.", desc: "Pabeidz un publicē, veido portfolio",         amount: "€0",            pct: 18 },
  { period: "2. mēn.",    desc: "Pirmais klients — mājaslapa ar AI funkcijām", amount: "€500–€900",     pct: 40 },
  { period: "3.–4. mēn.", desc: "2–3 klienti + ikmēneša uzturēšana",          amount: "€1 000–€3 600", pct: 70 },
  { period: "6. mēn.+",   desc: "4–6 klienti, atkārtots ienākums",            amount: "€2 000–€7 200", pct: 100 },
];

export function DigitaalaisIntroLessonContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, paddingTop: 24 }}>

      {/* ── HERO ── */}
      <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", border: `1px solid ${G}33`, background: "linear-gradient(135deg, rgba(0,191,165,0.10) 0%, rgba(51,212,191,0.05) 55%, #fff 100%)", boxShadow: "0 24px 64px -32px rgba(0,191,165,0.4)" }}>
        <div style={{ position: "absolute", top: -120, right: -80, width: 460, height: 460, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,191,165,0.12) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", padding: "40px 36px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 13px", borderRadius: 20, background: `${G}14`, border: `1px solid ${G}33`, marginBottom: 18 }}>
            <Dot color={G} />
            <span style={{ fontSize: 10, fontWeight: 700, color: G, letterSpacing: "0.08em", textTransform: "uppercase" }}>AI revolūcija · 1. nodarbība</span>
          </div>
          <h2 style={{ fontSize: "clamp(20px,4vw,32px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 12, color: "var(--ink)" }}>
            Kā AI pilnībā mainīja<br />
            <span style={{ background: "linear-gradient(135deg, #00BFA5, #33D4BF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>mājaslapu izstrādi</span>
          </h2>
          <p style={{ fontSize: 13.5, color: "var(--ink-3)", lineHeight: 1.75, maxWidth: 540, marginBottom: 24 }}>
            Vēl pirms dažiem gadiem mājaslapas būvēja nedēļām un par to maksāja tūkstošiem. Šodien ar tādiem rīkiem kā <strong style={{ color: "var(--ink)" }}>Claude Code</strong> jebkurš var uzbūvēt modernu mājaslapu dažu stundu laikā. Tieši to tu apgūsi šeit — un pārvērtīsi par pakalpojumu biznesiem.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[{ c: G, t: "Bez programmēšanas" }, { c: G2, t: "Īsts projekts no 1. dienas" }, { c: AM, t: "Pārdod biznesiem" }].map((b) => (
              <div key={b.t} style={{ display: "flex", alignItems: "center", gap: 7, padding: "6px 13px", borderRadius: 9, background: "#fff", border: "1px solid var(--line)" }}>
                <Dot color={b.c} /><span style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink-2)" }}>{b.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TOREIZ vs TAGAD ── */}
      <div>
        <div style={sectionLabel(G)}>Kas mainījās — toreiz pret tagad</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
          {/* Toreiz */}
          <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid var(--line)", background: "#fff", boxShadow: cardShadow }}>
            <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--line)", background: "var(--bg-2)", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14 }}>🐌</span>
              <span style={{ fontSize: 12.5, fontWeight: 800, color: "var(--ink-2)", letterSpacing: "-0.01em" }}>Toreiz — vecā pasaule</span>
            </div>
            <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 11 }}>
              {before.map((b) => (
                <div key={b} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 17, height: 17, borderRadius: 5, background: "#F4F4F6", border: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#B5B5BD", fontSize: 11, fontWeight: 800 }}>✕</span>
                  <span style={{ fontSize: 12.5, color: "var(--ink-3)" }}>{b}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Tagad */}
          <div style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${G}3a`, background: "#fff", boxShadow: `0 16px 44px -24px ${G}66` }}>
            <div style={{ padding: "14px 18px", borderBottom: `1px solid ${G}26`, background: `linear-gradient(135deg, ${G}16, ${G2}0a)`, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14 }}>⚡</span>
              <span style={{ fontSize: 12.5, fontWeight: 800, color: G, letterSpacing: "-0.01em" }}>Tagad — ar AI</span>
            </div>
            <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 11 }}>
              {after.map((a) => (
                <div key={a} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 17, height: 17, borderRadius: 5, background: `${G}16`, border: `1px solid ${G}38`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Check color={G} />
                  </span>
                  <span style={{ fontSize: 12.5, color: "var(--ink-2)", fontWeight: 500 }}>{a}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── STATISTIKA ── */}
      <div style={{ position: "relative", padding: "26px 28px", borderRadius: 16, overflow: "hidden", border: `1px solid ${G}22`, background: "linear-gradient(135deg, rgba(0,191,165,0.06) 0%, #fff 60%)", boxShadow: cardShadow }}>
        <div style={{ position: "absolute", bottom: -70, left: -50, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(51,212,191,0.10) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <div style={sectionLabel(G)}>Kāpēc tieši tagad ir labākais brīdis</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 16 }}>
            {stats.map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 6, color: s.color }}><AnimatedNumber value={s.value} /></div>
                <div style={{ fontSize: 11.5, color: "var(--ink-3)", lineHeight: 1.5 }}>{s.label}</div>
                <div style={{ height: 2, borderRadius: 2, background: `linear-gradient(90deg, ${s.color}, transparent)`, marginTop: 9 }} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, padding: "13px 16px", borderRadius: 11, background: "#fff", border: "1px solid var(--line)", display: "flex", gap: 10 }}>
            <span style={{ fontSize: 16, flexShrink: 0 }}>💡</span>
            <p style={{ fontSize: 12, color: "var(--ink-2)", lineHeight: 1.7, margin: 0 }}>Lielākā daļa uzņēmumu vēl nezina, ka mājaslapu šodien var uzbūvēt stundās ar <strong style={{ color: "var(--ink)" }}>Claude Code</strong>. Tu nāc ar risinājumu, par kura iespējām viņi vēl nav dzirdējuši.</p>
          </div>
        </div>
      </div>

      {/* ── KĀPĒC CLAUDE CODE ── */}
      <div>
        <div style={sectionLabel(G)}>Kāpēc Claude Code maina visu</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
          {whyClaude.map((c) => (
            <div key={c.title} style={{ position: "relative", borderRadius: 16, overflow: "hidden", border: `1px solid ${c.accent}2e`, background: "#fff", boxShadow: cardShadow, padding: "20px 20px 22px" }}>
              <div style={{ position: "absolute", top: -50, right: -40, width: 160, height: 160, borderRadius: "50%", background: `radial-gradient(circle, ${c.accent}1c 0%, transparent 65%)`, pointerEvents: "none" }} />
              <div style={{ position: "relative" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `linear-gradient(135deg, ${c.accent}1f, ${c.accent2}12)`, border: `1px solid ${c.accent}38`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14, fontSize: 20 }}>{c.icon}</div>
                <h3 style={{ fontSize: 15.5, fontWeight: 800, letterSpacing: "-0.02em", color: "var(--ink)", margin: "0 0 7px" }}>{c.title}</h3>
                <p style={{ fontSize: 12.5, color: "var(--ink-3)", lineHeight: 1.65, margin: 0 }}>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── KO TU UZBŪVĒSI — CEĻOJUMS ── */}
      <div>
        <div style={sectionLabel(G)}>Tavs ceļojums — no idejas līdz biznesam</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(185px, 1fr))", gap: 9 }}>
          {journey.map((m) => (
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

      {/* ── KĀ TAS KĻŪST PAR PAKALPOJUMU ── */}
      <div style={{ position: "relative", padding: "24px 26px", borderRadius: 16, overflow: "hidden", border: "1px solid var(--line)", background: "#fff", boxShadow: cardShadow }}>
        <div style={{ position: "relative" }}>
          <div style={sectionLabel(G)}>Kā prasme kļūst par reālu pakalpojumu</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {income.map((row, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 72, flexShrink: 0, fontSize: 10, fontWeight: 700, color: "var(--ink-3)" }}>{row.period}</div>
                <div style={{ flex: 1, position: "relative", height: 32, borderRadius: 7, background: "var(--bg-2)", overflow: "hidden", border: "1px solid var(--line)" }}>
                  <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${row.pct}%`, background: "linear-gradient(90deg, #00BFA5, #33D4BF)", borderRadius: 6 }} />
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 10px" }}>
                    <span style={{ fontSize: 10.5, color: row.pct > 20 ? "#fff" : "var(--ink-3)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: 500 }}>{row.desc}</span>
                  </div>
                </div>
                <div style={{ width: 120, flexShrink: 0, textAlign: "right", fontSize: 12.5, fontWeight: 800, color: row.pct > 30 ? G : "var(--ink-3)", letterSpacing: "-0.01em" }}>{row.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{ position: "relative", padding: "24px 26px", borderRadius: 16, overflow: "hidden", border: `1px solid ${G}33`, background: "linear-gradient(135deg, rgba(0,191,165,0.10) 0%, rgba(51,212,191,0.05) 55%, #fff 100%)", boxShadow: "0 16px 44px -24px rgba(0,191,165,0.4)" }}>
        <div style={{ position: "absolute", top: -50, right: -40, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,191,165,0.12), transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", display: "flex", alignItems: "flex-start", gap: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg, #00BFA5, #33D4BF)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 20, boxShadow: "0 8px 22px -8px rgba(0,191,165,0.6)" }}>🚀</div>
          <div>
            <div style={{ fontSize: 14.5, fontWeight: 800, color: "var(--ink)", marginBottom: 6, letterSpacing: "-0.01em" }}>Nākamajā nodarbībā jau sākam būvēt</div>
            <p style={{ fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.75, margin: "0 0 12px" }}>Saproti, <strong style={{ color: "var(--ink)" }}>kāpēc biznesiem vairs nevajag mēnešus un izstrādātāju komandu</strong> — un kāpēc tieši tu vari piedāvāt ātrāku risinājumu.</p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {[{ c: G, t: "29 nodarbības" }, { c: G2, t: "Īsta mājaslapa" }, { c: AM, t: "Pārdod biznesiem" }].map((b) => (
                <div key={b.t} style={{ display: "flex", alignItems: "center", gap: 6 }}><Dot color={b.c} /><span style={{ fontSize: 11.5, color: "var(--ink-3)", fontWeight: 500 }}>{b.t}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
