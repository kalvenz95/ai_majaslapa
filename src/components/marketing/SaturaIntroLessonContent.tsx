"use client";

import { EmojiIcon } from "@/components/EmojiIcon";
import { AnimatedNumber } from "@/components/AnimatedNumber";

/* Brand-derived light palette (no neon, no default Tailwind hues) */
const P  = "#6D5EF3"; // accent
const P2 = "#9B8FF7"; // accent light
const G  = "#00BFA5"; // accent-2 teal
const C  = "#33D4BF"; // teal light
const AM = "#FFB86B"; // accent-3 warm

function Dot({ color }: { color: string }) {
  return <div style={{ width: 7, height: 7, borderRadius: "50%", background: color, flexShrink: 0 }} />;
}
function Check({ color = P }: { color?: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3.5" style={{ flexShrink: 0 }}>
      <polyline points="20,6 9,17 4,12" />
    </svg>
  );
}

const services = [
  {
    accent: P, accent2: P2,
    label: "Pakalpojums #1",
    title: "AI Faceless Video",
    earn: "€200–€600", per: "par video pakotni",
    desc: "Video bez kameras — scenārijs ar AI, ģenerēšana Runway/HeyGen, montāža CapCut. Klients saņem gatavu pakotni.",
    points: ["Bez sejas, bez kameras, bez pieredzes", "Runway ML + HeyGen + CapCut workflow", "30 min darbs = pilna video pakotne"],
    img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=900&q=85&fit=crop",
  },
  {
    accent: G, accent2: C,
    label: "Pakalpojums #2",
    title: "Sociālo Tīklu Pārvaldība",
    earn: "€300–€800", per: "mēnesī / klients",
    desc: "Ikmēneša satura grafiks, banneri, carousels un captions. Klients apstiprina, tu publicē automātiski ar Buffer.",
    points: ["Canva AI + Midjourney vizuāļi", "Buffer automātiskā publicēšana", "Ikmēneša atskaite un statistika"],
    img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=900&q=85&fit=crop",
  },
  {
    accent: AM, accent2: P,
    label: "Pakalpojums #3",
    title: "Klientu Atrašana",
    earn: "€300–€1 500", per: "mēnesī (3–4 klienti)",
    desc: "Portfolio no nulles, cold outreach skripti un pirmā tikšanās. No kontakta līdz parakstītam līgumam.",
    points: ["Copy-paste outreach veidnes (e-pasts + DM)", "Reāls piemērs no pirmā zvana", "Kā celt cenu pēc pirmā mēneša"],
    img: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=85&fit=crop",
  },
];

const stats = [
  { value: "26 000", label: "aktīvu uzņēmumu Latvijā bez regulāra satura", color: P },
  { value: "€350",   label: "vidējais mēneša budžets satura radīšanai",     color: G },
  { value: "3 ned.", label: "vidēji līdz pirmajam klientam pēc kursa",       color: AM },
  { value: "82%",    label: "studentu iegūst ienākumus 60 dienās",           color: P },
];

const tools = [
  { icon: "✂️", name: "CapCut",      desc: "Auto montāža + subtitri",     color: G },
  { icon: "🎬", name: "Runway ML",   desc: "AI video ģenerēšana",          color: P },
  { icon: "🤖", name: "HeyGen",      desc: "AI avatar prezentācijas",      color: P2 },
  { icon: "🖌️", name: "Canva AI",    desc: "Banneri + feed dizains",       color: AM },
  { icon: "🎨", name: "Midjourney",  desc: "Profesionāli attēli",          color: AM },
  { icon: "📅", name: "Buffer",      desc: "Auto publicēšana",             color: G },
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

const workflow = [
  { step: "01", icon: "✍️", label: "Skripts",      tool: "ChatGPT",   color: G },
  { step: "02", icon: "🎬", label: "Video",        tool: "Runway ML", color: P },
  { step: "03", icon: "✂️", label: "Montāža",      tool: "CapCut",    color: C },
  { step: "04", icon: "📱", label: "Publicēšana",  tool: "Buffer",    color: AM },
];

const cardShadow = "0 12px 36px -20px rgba(17,17,17,0.16)";
const sectionLabel = (color: string): React.CSSProperties => ({
  fontSize: 10, fontWeight: 800, color, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 14,
});

export function SaturaIntroLessonContent() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, paddingTop: 24 }}>

      {/* ── DARBA PLŪSMA ── */}
      <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", border: "1px solid var(--line)", background: "#fff", boxShadow: cardShadow }}>
        <div style={{ position: "relative", padding: "22px 22px 18px" }}>
          <div style={sectionLabel(P)}>No nulles līdz publicētam video — 4 soļi</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
            {workflow.map((w, i) => (
              <div key={i} style={{ position: "relative" }}>
                {i < workflow.length - 1 && (
                  <div style={{ position: "absolute", top: 26, right: -5, width: 8, height: 2, background: `${w.color}66`, zIndex: 2, borderRadius: 2 }} />
                )}
                <div style={{ padding: "14px 12px", borderRadius: 12, background: `${w.color}0d`, border: `1px solid ${w.color}2e`, display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 8.5, fontWeight: 800, color: w.color, letterSpacing: "0.06em" }}>{w.step}</span>
                  <EmojiIcon emoji={w.icon} size={22} color={w.color} strokeWidth={1.75} />
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 800, color: "var(--ink)", marginBottom: 2 }}>{w.label}</div>
                    <div style={{ fontSize: 10, color: w.color, fontWeight: 700 }}>{w.tool}</div>
                  </div>
                  <div style={{ height: 2, width: "100%", borderRadius: 2, background: `linear-gradient(90deg, ${w.color}, transparent)` }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 9, background: `${G}10`, border: `1px solid ${G}2e`, display: "flex", alignItems: "center", gap: 10 }}>
            <Dot color={G} />
            <span style={{ fontSize: 11.5, color: "var(--ink-2)" }}>Vidēji <strong style={{ color: "var(--ink)" }}>30–45 minūtes</strong> no sākuma līdz gatavam video klientam.</span>
          </div>
        </div>
      </div>

      {/* ── AI RĪKU EKOSISTĒMA ── */}
      <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", border: "1px solid var(--line)", background: "#fff", boxShadow: cardShadow }}>
        <div style={{ position: "relative", padding: "22px 22px 18px" }}>
          <div style={sectionLabel(G)}>AI rīku ekosistēma — visi bezmaksas sākumā</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
            {tools.map((t) => (
              <div key={t.name} style={{ padding: "14px 14px", borderRadius: 12, background: "var(--bg)", border: "1px solid var(--line)", display: "flex", flexDirection: "column", gap: 6 }}>
                <EmojiIcon emoji={t.icon} size={22} color={t.color} strokeWidth={1.75} />
                <div style={{ fontSize: 12.5, fontWeight: 800, color: "var(--ink)" }}>{t.name}</div>
                <div style={{ fontSize: 10.5, color: "var(--ink-3)", lineHeight: 1.4 }}>{t.desc}</div>
                <div style={{ height: 2, borderRadius: 2, background: `linear-gradient(90deg, ${t.color}, transparent)`, marginTop: 2 }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── STATISTIKA ── */}
      <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", border: `1px solid ${P}22`, background: "linear-gradient(135deg, rgba(109,94,243,0.06) 0%, #fff 60%)", boxShadow: cardShadow }}>
        <div style={{ position: "absolute", top: -80, right: -60, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(109,94,243,0.10) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", padding: "26px 28px" }}>
          <div style={sectionLabel(P)}>Latvijas tirgus iespēja</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(155px, 1fr))", gap: 18 }}>
            {stats.map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: 30, fontWeight: 900, letterSpacing: "-0.02em", marginBottom: 6, color: s.color }}><AnimatedNumber value={s.value} /></div>
                <div style={{ fontSize: 11.5, color: "var(--ink-3)", lineHeight: 1.5 }}>{s.label}</div>
                <div style={{ height: 2, borderRadius: 2, background: `linear-gradient(90deg, ${s.color}, transparent)`, marginTop: 9 }} />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 22, padding: "13px 16px", borderRadius: 11, background: "#fff", border: "1px solid var(--line)", display: "flex", gap: 10 }}>
            <EmojiIcon emoji="💡" size={16} color={P} strokeWidth={1.75} className="shrink-0" />
            <p style={{ fontSize: 12, color: "var(--ink-2)", lineHeight: 1.7, margin: 0 }}>Latvijā ir ap <strong style={{ color: "var(--ink)" }}>26 000 aktīvu uzņēmumu</strong>. Lielākā daļa maksā par saturu tikai tad, kad kāds piedāvā. Tu esi tas cilvēks.</p>
          </div>
        </div>
      </div>

      {/* ── IENĀKUMI ── */}
      <div style={{ position: "relative", padding: "24px 26px", borderRadius: 16, overflow: "hidden", border: "1px solid var(--line)", background: "#fff", boxShadow: cardShadow }}>
        <div style={{ position: "relative" }}>
          <div style={sectionLabel(P)}>Reāla ienākumu trajektorija</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {income.map((row, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 72, flexShrink: 0, fontSize: 10, fontWeight: 700, color: "var(--ink-3)" }}>{row.period}</div>
                <div style={{ flex: 1, position: "relative", height: 32, borderRadius: 7, background: "var(--bg-2)", overflow: "hidden", border: "1px solid var(--line)" }}>
                  <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${row.pct}%`, background: "linear-gradient(90deg, #6D5EF3, #9B8FF7)", borderRadius: 6 }} />
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 10px" }}>
                    <span style={{ fontSize: 10.5, color: row.pct > 20 ? "#fff" : "var(--ink-3)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontWeight: 500 }}>{row.desc}</span>
                  </div>
                </div>
                <div style={{ width: 110, flexShrink: 0, textAlign: "right", fontSize: 12.5, fontWeight: 800, color: row.pct > 30 ? G : "var(--ink-3)", letterSpacing: "-0.01em" }}>{row.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MODUĻI ── */}
      <div>
        <div style={sectionLabel(P)}>Tavs ceļš caur 4 blokiem</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 9 }}>
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
      <div style={{ position: "relative", padding: "24px 26px", borderRadius: 16, overflow: "hidden", border: `1px solid ${P}2e`, background: "linear-gradient(135deg, rgba(109,94,243,0.10) 0%, rgba(155,143,247,0.05) 55%, #fff 100%)", boxShadow: "0 16px 44px -24px rgba(109,94,243,0.4)" }}>
        <div style={{ position: "absolute", top: -60, right: -50, width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, rgba(109,94,243,0.12), transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", display: "flex", alignItems: "flex-start", gap: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg, #6D5EF3, #9B8FF7)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 8px 22px -8px rgba(109,94,243,0.6)" }}><EmojiIcon emoji="🎯" size={20} color="#fff" strokeWidth={2} /></div>
          <div>
            <div style={{ fontSize: 14.5, fontWeight: 800, color: "var(--ink)", marginBottom: 6, letterSpacing: "-0.01em" }}>Pēc šīs nodarbības tu saproti, kāpēc šis ir tavs labākais sākums</div>
            <p style={{ fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.75, margin: "0 0 12px" }}>Nākamajā nodarbībā — <strong style={{ color: "var(--ink)" }}>kādus pakalpojumus vari piedāvāt uzreiz</strong> un kā noteikt cenu pat bez pieredzes.</p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {[{ c: P, t: "28 nodarbības" }, { c: G, t: "Bez kodēšanas" }, { c: AM, t: "Latvijas tirgum" }].map((b) => (
                <div key={b.t} style={{ display: "flex", alignItems: "center", gap: 6 }}><Dot color={b.c} /><span style={{ fontSize: 11.5, color: "var(--ink-3)", fontWeight: 500 }}>{b.t}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── HERO ── */}
      <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", border: `1px solid ${P}26`, boxShadow: "0 24px 64px -32px rgba(109,94,243,0.4)" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(109,94,243,0.10) 0%, rgba(155,143,247,0.05) 55%, #fff 100%)" }} />
        <img
          src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=85&fit=crop"
          alt=""
          style={{ position: "absolute", top: 0, right: 0, width: "46%", height: "100%", objectFit: "cover", opacity: 0.14, maskImage: "linear-gradient(to left, #000, transparent)", WebkitMaskImage: "linear-gradient(to left, #000, transparent)" }}
        />
        <div style={{ position: "absolute", top: -120, right: -80, width: 460, height: 460, borderRadius: "50%", background: "radial-gradient(circle, rgba(109,94,243,0.14) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", padding: "40px 36px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "5px 13px", borderRadius: 20, background: `${P}14`, border: `1px solid ${P}33`, marginBottom: 18 }}>
            <Dot color={P} />
            <span style={{ fontSize: 10, fontWeight: 700, color: P, letterSpacing: "0.08em", textTransform: "uppercase" }}>Satura Speciālists · 4 bloki · 28 nodarbības</span>
          </div>
          <h2 style={{ fontSize: "clamp(20px,4vw,32px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 12, color: "var(--ink)" }}>
            Kā AI maina<br />
            <span style={{ background: "linear-gradient(135deg, #6D5EF3, #9B8FF7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>satura radīšanas industriju</span>
          </h2>
          <p style={{ fontSize: 13.5, color: "var(--ink-3)", lineHeight: 1.75, maxWidth: 520, marginBottom: 24 }}>
            Uzņēmumi katru dienu meklē cilvēkus kas palīdz ar saturu. Tu apgūsi 3 pakalpojumus, pelnīsi <strong style={{ color: "var(--ink)" }}>€300–€1 500 mēnesī</strong> un automatizēsi visu procesu.
          </p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[{ c: P, t: "Bez kameras vai sejas" }, { c: G, t: "Klients 3 nedēļās" }, { c: AM, t: "Pilnībā latviski" }].map((b) => (
              <div key={b.t} style={{ display: "flex", alignItems: "center", gap: 7, padding: "6px 13px", borderRadius: 9, background: "#fff", border: "1px solid var(--line)" }}>
                <Dot color={b.c} /><span style={{ fontSize: 11.5, fontWeight: 600, color: "var(--ink-2)" }}>{b.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 3 PAKALPOJUMI ── */}
      <div>
        <div style={sectionLabel(P)}>3 pakalpojumi ko tu apgūsi un pārdosi</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {services.map((s, i) => (
            <div key={i} style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${s.accent}2e`, background: "#fff", boxShadow: cardShadow }}>
              {/* Image header */}
              <div style={{ position: "relative", height: 130, overflow: "hidden" }}>
                <img
                  src={s.img}
                  alt={s.title}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(17,17,17,0.78) 0%, rgba(17,17,17,0.25) 55%, rgba(17,17,17,0.05) 100%)` }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(120deg, ${s.accent}33 0%, transparent 60%)`, mixBlendMode: "multiply" }} />
                {/* earn badge top-right */}
                <div style={{ position: "absolute", top: 14, right: 16, display: "flex", alignItems: "baseline", gap: 4, background: "rgba(255,255,255,0.92)", borderRadius: 8, padding: "4px 9px" }}>
                  <span style={{ fontSize: 14, fontWeight: 900, color: s.accent, letterSpacing: "-0.02em" }}>{s.earn}</span>
                  <span style={{ fontSize: 9, color: "var(--ink-3)", fontWeight: 500 }}>{s.per}</span>
                </div>
                {/* label + title bottom */}
                <div style={{ position: "absolute", bottom: 14, left: 18 }}>
                  <span style={{ display: "inline-block", fontSize: 9.5, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.35)", color: "#fff", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 6, backdropFilter: "blur(4px)" }}>{s.label}</span>
                  <h3 style={{ fontSize: 19, fontWeight: 900, letterSpacing: "-0.02em", color: "#fff", margin: 0 }}>{s.title}</h3>
                </div>
              </div>
              {/* Content */}
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

    </div>
  );
}
