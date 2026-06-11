"use client";

/* Brand-derived light palette */
const P  = "#6D5EF3";
const P2 = "#9B8FF7";
const G  = "#00BFA5";
const C  = "#33D4BF";
const AM = "#FFB86B";
const MUTED = "#B3B0A9";

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

const cardShadow = "0 12px 36px -20px rgba(17,17,17,0.16)";
const sectionLabel = (color: string): React.CSSProperties => ({
  fontSize: 10, fontWeight: 800, color, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 14,
});

const packages = [
  {
    icon: "🎬", accent: P, accent2: P2,
    name: "AI Faceless Video",
    price: "€200–€600", period: "mēnesī",
    time: "2–3 h/ned.",
    img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=800&q=80&fit=crop",
    desc: "Izveido 4–8 īsus AI video klientam mēnesī. Skripti ar ChatGPT, video ar Runway, montāža CapCut.",
    include: ["4–8 short-form video/mēn", "Scenārijs + AI balss + subtitri", "Publicēšanas grafiks", "Formāts TikTok/Reels/Shorts"],
    tools: ["ChatGPT", "Runway ML", "CapCut"],
  },
  {
    icon: "📱", accent: G, accent2: C,
    name: "Sociālo Tīklu Pārvaldība",
    price: "€300–€800", period: "mēnesī",
    time: "4–6 h/ned.",
    img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80&fit=crop",
    desc: "20–30 posti mēnesī — teksti, banneri, carousels. Klients apstiprina, tu publicē ar Buffer automātiski.",
    include: ["Content plāns 30 dienām", "20–30 posti + captions", "Banneri un carousels (Canva AI)", "Ikmēneša atskaite PDF"],
    tools: ["Canva AI", "ChatGPT", "Buffer"],
  },
  {
    icon: "🖼️", accent: AM, accent2: G,
    name: "AI Reklāmas Materiāli",
    price: "€150–€400", period: "par pakotni",
    time: "2–4 h/projekt.",
    img: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80&fit=crop",
    desc: "10–20 reklāmas banneri vai feed vizuāļi. Vienreizējs projekts vai ikmēneša pakotne.",
    include: ["10–20 AI banneri/vizuāļi", "3 dažādu formātu versijas", "Rediģējami Canva faili", "Delivery 3–5 dienās"],
    tools: ["Canva AI", "Midjourney", "Adobe Firefly"],
  },
];

const pricingLevels = [
  { level: "1. mēnesis", tag: "Iesācējs", range: "€150–€400", sub: "vienam klientam", pct: 20, color: MUTED },
  { level: "2.–3. mēnesis", tag: "Sācis", range: "€300–€650", sub: "vienam klientam", pct: 45, color: C },
  { level: "4.–6. mēnesis", tag: "Stabils", range: "€500–€900", sub: "vienam klientam", pct: 65, color: P },
  { level: "6+ mēneši", tag: "Profesionālis", range: "€800–€2 000", sub: "vienam klientam", pct: 100, color: G },
];

const steps = [
  { num: "01", color: P,  title: "Izvēlies 1 pakalpojumu", tip: "Sāc ar video — augstākā pieprasījums" },
  { num: "02", color: C,  title: "Izveido 1 demo darbu", tip: "Izmanto fiktīvu zīmolu kā piemēru" },
  { num: "03", color: AM, title: "Uzstādi rīkus (bezmaksas)", tip: "ChatGPT + Canva + CapCut = €0" },
  { num: "04", color: P2, title: "Atrodi 3 potenciālus klientus", tip: "Instagram, Google Maps, Facebook" },
  { num: "05", color: G,  title: "Nosūti pirmo ziņu šodien", tip: "Gatava veidne nākamajā nodarbībā" },
];

const timeCalc = [
  { clients: "1 klients", service: "AI Video", hours: "8 h/mēn", earn: "€300", color: P },
  { clients: "2 klienti", service: "Video + Social", hours: "22 h/mēn", earn: "€700", color: C },
  { clients: "3 klienti", service: "Jaukts miks", hours: "36 h/mēn", earn: "€1 100", color: G },
  { clients: "4 klienti", service: "Automatizēts", hours: "44 h/mēn", earn: "€1 600", color: AM },
];

export function SaturaLesson12Content() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22, paddingTop: 22 }}>

      {/* ── INTRO ── */}
      <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", border: `1px solid ${P}26`, padding: "26px 28px", background: "linear-gradient(135deg, rgba(109,94,243,0.10) 0%, rgba(155,143,247,0.05) 55%, #fff 100%)", boxShadow: cardShadow }}>
        <div style={{ position: "absolute", top: -80, right: -60, width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(109,94,243,0.12) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 12px", borderRadius: 20, background: `${P}14`, border: `1px solid ${P}33`, marginBottom: 14 }}>
            <Dot color={P} />
            <span style={{ fontSize: 10, fontWeight: 700, color: P, letterSpacing: "0.08em", textTransform: "uppercase" }}>Nodarbība 1.2 · Pakalpojumi</span>
          </div>
          <h2 style={{ fontSize: "clamp(18px,3vw,26px)", fontWeight: 900, letterSpacing: "-0.025em", lineHeight: 1.2, marginBottom: 10, color: "var(--ink)" }}>
            3 pakalpojumi, ko vari <span style={{ background: "linear-gradient(135deg, #6D5EF3, #9B8FF7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>sākt šodien</span>
          </h2>
          <p style={{ fontSize: 13, color: "var(--ink-3)", lineHeight: 1.75, maxWidth: 540, margin: 0 }}>
            Uzņēmumi nemaksā par <em>ideāliem</em> speciālistiem — tie maksā par <strong style={{ color: "var(--ink)" }}>konkrētu rezultātu</strong>. Katrs no šiem 3 pakalpojumiem sniedz to uzreiz.
          </p>
        </div>
      </div>

      {/* ── 3 PAKALPOJUMU KARTES ── */}
      <div>
        <div style={sectionLabel(P)}>Pakalpojumi ar cenām un laiku</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {packages.map((pkg, i) => (
            <div key={i} style={{ borderRadius: 14, overflow: "hidden", border: `1px solid ${pkg.accent}2e`, background: "#fff", boxShadow: cardShadow }}>
              {/* Image header */}
              <div style={{ position: "relative", height: 110, overflow: "hidden" }}>
                <img src={pkg.img} alt={pkg.name} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(17,17,17,0.8) 0%, rgba(17,17,17,0.28) 55%, rgba(17,17,17,0.05) 100%)` }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(120deg, ${pkg.accent}30 0%, transparent 60%)`, mixBlendMode: "multiply" }} />
                {/* Price badge */}
                <div style={{ position: "absolute", top: 12, right: 14, textAlign: "right", background: "rgba(255,255,255,0.92)", borderRadius: 8, padding: "4px 9px" }}>
                  <div style={{ fontSize: 15, fontWeight: 900, color: pkg.accent, letterSpacing: "-0.02em" }}>{pkg.price}</div>
                  <div style={{ fontSize: 9, color: "var(--ink-3)", fontWeight: 500 }}>{pkg.period}</div>
                </div>
                {/* Time badge */}
                <div style={{ position: "absolute", top: 12, left: 14, display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 9, fontWeight: 700, padding: "3px 9px", borderRadius: 20, background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.35)", color: "#fff", textTransform: "uppercase", letterSpacing: "0.06em", backdropFilter: "blur(4px)" }}>{pkg.time}</span>
                </div>
                {/* Name */}
                <div style={{ position: "absolute", bottom: 12, left: 14 }}>
                  <div style={{ fontSize: 8.5, fontWeight: 700, color: "rgba(255,255,255,0.85)", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 3 }}>{pkg.icon} Pakalpojums #{i + 1}</div>
                  <div style={{ fontSize: 17, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em" }}>{pkg.name}</div>
                </div>
              </div>
              {/* Body */}
              <div style={{ padding: "14px 16px 16px" }}>
                <p style={{ fontSize: 12.5, color: "var(--ink-3)", lineHeight: 1.68, marginBottom: 12 }}>{pkg.desc}</p>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 16px", marginBottom: 12 }}>
                  {pkg.include.map((it, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                      <div style={{ width: 16, height: 16, borderRadius: 5, background: `${pkg.accent}16`, border: `1px solid ${pkg.accent}38`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Check color={pkg.accent} />
                      </div>
                      <span style={{ fontSize: 11.5, color: "var(--ink-2)" }}>{it}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {pkg.tools.map(t => (
                    <span key={t} style={{ fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 20, background: `${pkg.accent}12`, border: `1px solid ${pkg.accent}2e`, color: pkg.accent }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── LAIKA KALKULATORS ── */}
      <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", border: "1px solid var(--line)", padding: "22px 22px", background: "#fff", boxShadow: cardShadow }}>
        <div style={{ position: "relative" }}>
          <div style={sectionLabel(G)}>Cik stundas = cik nauda?</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {timeCalc.map((row, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "110px 1fr 80px 70px", gap: 10, alignItems: "center", padding: "8px 10px", borderRadius: 8, background: "var(--bg)" }}>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: "var(--ink)" }}>{row.clients}</div>
                <div style={{ fontSize: 10.5, color: "var(--ink-3)" }}>{row.service}</div>
                <div style={{ fontSize: 11, color: "var(--ink-3)", textAlign: "center" }}>{row.hours}</div>
                <div style={{ fontSize: 13, fontWeight: 800, color: row.color, textAlign: "right" }}>{row.earn}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, padding: "10px 14px", borderRadius: 9, background: `${G}10`, border: `1px solid ${G}2e`, display: "flex", alignItems: "center", gap: 10 }}>
            <Dot color={G} />
            <span style={{ fontSize: 11.5, color: "var(--ink-2)" }}>Pēc 3 mēnešiem ar <strong style={{ color: "var(--ink)" }}>2–3 klientiem</strong> un automatizāciju — 35–40 h mēnesī = €700–1 100.</span>
          </div>
        </div>
      </div>

      {/* ── PIEREDZES CENU LĪMEŅI ── */}
      <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", border: "1px solid var(--line)", padding: "22px 22px", background: "#fff", boxShadow: cardShadow }}>
        <div style={{ position: "relative" }}>
          <div style={sectionLabel(P)}>Kā cenas aug ar pieredzi</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {pricingLevels.map((lvl, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 90, flexShrink: 0 }}>
                  <div style={{ fontSize: 9.5, fontWeight: 700, color: lvl.color === MUTED ? "var(--ink-3)" : lvl.color, textTransform: "uppercase", letterSpacing: "0.05em" }}>{lvl.tag}</div>
                  <div style={{ fontSize: 9, color: "var(--ink-4)" }}>{lvl.level}</div>
                </div>
                <div style={{ flex: 1, height: 28, borderRadius: 6, background: "var(--bg-2)", overflow: "hidden", border: "1px solid var(--line)", position: "relative" }}>
                  <div style={{ height: "100%", width: `${lvl.pct}%`, background: `linear-gradient(90deg, ${lvl.color}, ${lvl.color}88)`, borderRadius: 5 }} />
                </div>
                <div style={{ width: 100, flexShrink: 0, textAlign: "right" }}>
                  <div style={{ fontSize: 12.5, fontWeight: 800, color: lvl.color === MUTED ? "var(--ink-3)" : lvl.color }}>{lvl.range}</div>
                  <div style={{ fontSize: 9, color: "var(--ink-4)" }}>{lvl.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 5 SOĻI KĀ SĀKT ── */}
      <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", border: "1px solid var(--line)", padding: "22px 22px", background: "#fff", boxShadow: cardShadow }}>
        <div style={{ position: "relative" }}>
          <div style={sectionLabel(G)}>Kā sākt — 5 konkrēti soļi</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {steps.map((s) => (
              <div key={s.num} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 14px", borderRadius: 10, background: `${s.color}0d`, border: `1px solid ${s.color}2a` }}>
                <div style={{ fontSize: 11, fontWeight: 900, color: s.color, flexShrink: 0, width: 22, marginTop: 1 }}>{s.num}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", marginBottom: 2 }}>{s.title}</div>
                  <div style={{ fontSize: 11, color: "var(--ink-3)" }}>💡 {s.tip}</div>
                </div>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: s.color, marginTop: 6, flexShrink: 0 }} />
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
