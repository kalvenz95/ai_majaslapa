"use client";

const P  = "#a855f7";
const P2 = "#ec4899";
const G  = "#00ff88";
const C  = "#00d4ff";
const AM = "#f59e0b";

function GlowDot({ color }: { color: string }) {
  return <div style={{ width: 7, height: 7, borderRadius: "50%", background: color, boxShadow: `0 0 8px ${color}, 0 0 18px ${color}55`, flexShrink: 0 }} />;
}
function GridBg({ color, size = 28 }: { color: string; size?: number }) {
  return <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`, backgroundSize: `${size}px ${size}px` }} />;
}

const timeline = [
  { week: "1. ned.", title: "Apgūst rīkus", desc: "ChatGPT, Canva, CapCut uzstādīts. Veido demo video fiktīvam kafejnīcas zīmolam.", income: "€0", color: "#444", done: true },
  { week: "2. ned.", title: "Sūta 15 ziņas", desc: "15 DM uz Instagram uzņēmumiem bez aktīva satura. Atbild 4. Tikšanās ar 2.", income: "€0", color: C, done: true },
  { week: "3. ned.", title: "Pirmā tikšanās", desc: "Zoom zvans 30 min ar skaistumkopšanas salonu Rīgā. Parāda demo. Klients ieinteresēts.", income: "€0", color: P, done: true },
  { week: "4. ned.", title: "Piedāvājums nosūtīts", desc: "PDF piedāvājums €300/mēn par 20 postiem + 4 video. Klients paraksta pēc 2 dienām.", income: "€300", color: AM, done: true },
  { week: "2. mēn.", title: "2. klients pievienots", desc: "Outreach turpinājums. Noslēgts 2. klients friziera salonā par €250/mēn.", income: "€550", color: G, done: false },
];

const dmTemplate = `Sveiki [Vārds],

redzēju jūsu [uzņēmuma nosaukums] Instagram — patīk jūsu produkts/pakalpojums.

Ievēroju, ka saturs nav ļoti regulārs — tas ir pilnīgi normāli, jo tas aizņem laiku.

Es veidoju AI saturu maziem Latvijas uzņēmumiem — video, banneri, posti — bez lielas pūles no jūsu puses.

Vai drīkstu nosūtīt 3 piemēru darbus bez maksas, lai redzat vai tas noderētu?

[Jūsu vārds]`;

const callPoints = [
  { q: "Kāds saturs jums patīk pie citiem?", why: "Saproti gaumi pirms piedāvā" },
  { q: "Cik bieži publicējat tagad?", why: "Identificē sāpju punktu" },
  { q: "Kāds ir mērķis — klienti, zīmols vai viss?", why: "Saprot prioritāti" },
  { q: "Vai esat izmēģinājuši kādu palīdzību iepriekš?", why: "Saproti iepriekšējo pieredzi" },
  { q: "Kāds budžets aptuveni ir paredzēts?", why: "Pārliecinies par gatavību maksāt" },
];

const proposalBlocks = [
  { icon: "📋", title: "Par mani", content: "1–2 teikumi + demo darbs (link vai PDF)", color: P },
  { icon: "🎯", title: "Ko piedāvāju", content: "Konkrēts pakalpojums, skaits, frekvence", color: C },
  { icon: "💰", title: "Cena", content: "Viena skaidra cena. Nav variantu.", color: AM },
  { icon: "📅", title: "Kā strādājam", content: "Klients apstiprina, tu publicē. 1 revīzija.", color: P2 },
  { icon: "✅", title: "Nākamais solis", content: "Paraksta vai raksta ja ir jautājumi", color: G },
];

const results = [
  { label: "Nosūtītas ziņas", value: "15", color: "#555" },
  { label: "Atbildes", value: "4", color: C },
  { label: "Tikšanās", value: "2", color: P },
  { label: "Klients 1. mēnesī", value: "1", color: AM },
  { label: "Ienākumi mēn. 1", value: "€300", color: G },
];

export function SaturaLesson14Content() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 22, paddingTop: 22 }}>

      {/* ── INTRO ── */}
      <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", border: "1px solid rgba(245,158,11,0.22)", padding: "24px 26px" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(5,5,8,1) 0%, rgba(12,8,3,1) 100%)" }} />
        <div style={{ position: "absolute", top: -70, right: -50, width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,158,11,0.18) 0%, transparent 65%)", pointerEvents: "none" }} />
        <GridBg color="rgba(245,158,11,0.03)" size={26} />
        <div style={{ position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "4px 12px", borderRadius: 20, background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.28)", marginBottom: 14 }}>
            <GlowDot color={AM} />
            <span style={{ fontSize: 10, fontWeight: 700, color: AM, letterSpacing: "0.08em", textTransform: "uppercase" }}>Nodarbība 1.4 · Reāls piemērs</span>
          </div>
          <h2 style={{ fontSize: "clamp(18px,3vw,26px)", fontWeight: 900, letterSpacing: "-0.025em", lineHeight: 1.2, marginBottom: 10, color: "#fff" }}>
            No <span style={{ color: "#555" }}>€0</span> līdz{" "}
            <span style={{ background: "linear-gradient(135deg, #f59e0b, #00ff88)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>€300 pirmajā mēnesī</span>
          </h2>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: 540, margin: "0 0 16px" }}>
            Šis ir <strong style={{ color: "#ddd" }}>reāls piemērs</strong> no studentes Rīgā — bez iepriekšējas pieredzes, bez portfolio, ar 15 ziņām un 4 nedēļām.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8 }}>
            {results.map((r) => (
              <div key={r.label} style={{ textAlign: "center", padding: "10px 8px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: 18, fontWeight: 900, color: r.color, letterSpacing: "-0.02em", marginBottom: 3, textShadow: r.color !== "#555" ? `0 0 12px ${r.color}60` : "none" }}>{r.value}</div>
                <div style={{ fontSize: 9.5, color: "#444", lineHeight: 1.3 }}>{r.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── LAIKA LĪNIJA ── */}
      <div>
        <div style={{ fontSize: 10, fontWeight: 700, color: AM, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 14 }}>Nedēļu laika līnija — kas notika</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {timeline.map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 0 }}>
              {/* vertical line + dot */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 32, flexShrink: 0 }}>
                <div style={{ width: 11, height: 11, borderRadius: "50%", background: t.color, boxShadow: t.color !== "#444" ? `0 0 10px ${t.color}70` : "none", border: `2px solid ${t.color === "#444" ? "#2a2a3a" : t.color}`, marginTop: i === 0 ? 16 : 0, flexShrink: 0, zIndex: 1 }} />
                {i < timeline.length - 1 && <div style={{ flex: 1, width: 1, background: `linear-gradient(${t.color}40, ${timeline[i+1].color}40)`, minHeight: 24 }} />}
              </div>
              {/* content */}
              <div style={{ flex: 1, padding: `${i === 0 ? 12 : 0}px 0 20px 14px` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: t.color === "#444" ? "#444" : t.color, textTransform: "uppercase", letterSpacing: "0.06em" }}>{t.week}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: t.color === "#444" ? "#666" : "#fff" }}>{t.title}</span>
                  {t.income !== "€0" && (
                    <span style={{ fontSize: 11, fontWeight: 800, color: G, background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.2)", borderRadius: 20, padding: "1px 9px" }}>+{t.income}</span>
                  )}
                </div>
                <p style={{ fontSize: 12, color: "#555", lineHeight: 1.6, margin: 0 }}>{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DM VEIDNE ── */}
      <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", border: "1px solid rgba(168,85,247,0.2)", padding: "20px 22px" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(5,5,8,1), rgba(10,5,20,1))" }} />
        <div style={{ position: "absolute", top: -60, right: -40, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: P, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 14 }}>Copy-paste uzrunas ziņa (DM / e-pasts)</div>
          <div style={{ background: "rgba(168,85,247,0.06)", border: "1px solid rgba(168,85,247,0.18)", borderRadius: 11, padding: "16px 18px", fontFamily: "JetBrains Mono, 'Courier New', monospace", fontSize: 12, color: "#888", lineHeight: 1.85, whiteSpace: "pre-wrap" }}>
            {dmTemplate}
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: 12, flexWrap: "wrap" }}>
            {[
              { c: G, t: "Personiski — ne mass-message" },
              { c: C, t: "Bez cenas pirmajā ziņā" },
              { c: AM, t: "Demo bez maksas = zems slieksnis" },
            ].map(b => (
              <div key={b.t} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <GlowDot color={b.c} /><span style={{ fontSize: 11, color: "#555", fontWeight: 500 }}>{b.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── PIRMĀ TIKŠANĀS ── */}
      <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", border: "1px solid rgba(0,212,255,0.15)", padding: "20px 22px" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(5,5,8,1), rgba(5,12,18,1))" }} />
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: C, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 14 }}>Discovery zvans — 5 jautājumi (30 min)</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {callPoints.map((pt, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "12px 14px", borderRadius: 10, background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.1)" }}>
                <div style={{ fontSize: 11, fontWeight: 900, color: C, flexShrink: 0, minWidth: 18, marginTop: 1 }}>{i + 1}.</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#ddd", marginBottom: 3 }}>"{pt.q}"</div>
                  <div style={{ fontSize: 11, color: "#555" }}>→ {pt.why}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 9, background: "rgba(0,212,255,0.04)", border: "1px solid rgba(0,212,255,0.12)", display: "flex", gap: 10, alignItems: "center" }}>
            <GlowDot color={C} />
            <span style={{ fontSize: 11.5, color: "#666" }}>Zvana beigās saki: <strong style={{ color: "#bbb" }}>"Nosūtīšu jums piedāvājumu šodien vai rīt."</strong></span>
          </div>
        </div>
      </div>

      {/* ── PIEDĀVĀJUMA STRUKTŪRA ── */}
      <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", border: "1px solid rgba(0,255,136,0.14)", padding: "20px 22px" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(5,8,5,1), rgba(5,12,8,1))" }} />
        <GridBg color="rgba(0,255,136,0.025)" size={22} />
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: G, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 14 }}>PDF piedāvājuma struktūra (1 lapa)</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {proposalBlocks.map((b) => (
              <div key={b.title} style={{ padding: "13px 14px", borderRadius: 10, background: `${b.color}07`, border: `1px solid ${b.color}18` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
                  <span style={{ fontSize: 16 }}>{b.icon}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: b.color }}>{b.title}</span>
                </div>
                <p style={{ fontSize: 11.5, color: "#666", lineHeight: 1.55, margin: 0 }}>{b.content}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, padding: "10px 14px", borderRadius: 9, background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.12)", display: "flex", gap: 10, alignItems: "center" }}>
            <GlowDot color={G} />
            <span style={{ fontSize: 11.5, color: "#666" }}>Piedāvājums max. <strong style={{ color: "#bbb" }}>1 lapa</strong>. Jo garāks, jo mazāk lasa. Skaidrība = uzticība.</span>
          </div>
        </div>
      </div>

      {/* ── REZULTĀTS ── */}
      <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", border: "1px solid rgba(0,255,136,0.25)", padding: "22px 24px", boxShadow: "0 0 40px rgba(0,255,136,0.06)" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(3,8,5,1), rgba(5,14,8,1))" }} />
        <div style={{ position: "absolute", top: -60, right: -40, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,255,136,0.18) 0%, transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: G, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 14 }}>Rezultāts pēc 4 nedēļām</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 14 }}>
            {[
              { val: "€300", lab: "1. mēnesī", c: G },
              { val: "€550", lab: "2. mēnesī", c: AM },
              { val: "€900+", lab: "3. mēnesī", c: P },
            ].map(r => (
              <div key={r.lab} style={{ textAlign: "center", padding: "14px 10px", borderRadius: 11, background: `${r.c}08`, border: `1px solid ${r.c}20` }}>
                <div style={{ fontSize: 26, fontWeight: 900, color: r.c, letterSpacing: "-0.03em", textShadow: `0 0 20px ${r.c}60` }}>{r.val}</div>
                <div style={{ fontSize: 10.5, color: "#555", marginTop: 3 }}>{r.lab}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12.5, color: "#666", lineHeight: 1.7, margin: "0 0 12px" }}>
            Pēc 3 mēnešiem ar 2 klientiem — stabili <strong style={{ color: "#bbb" }}>€500–900/mēnesī</strong>. Ar 3.–4. klientu jau pārsniedzam <strong style={{ color: G }}>€1 000</strong>.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {[{ c: G, t: "Bez iepriekšējas pieredzes" }, { c: C, t: "Tikai bezmaksas rīki sākumā" }, { c: AM, t: "4 nedēļas līdz pirmajam klientam" }].map(b => (
              <div key={b.t} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <GlowDot color={b.c} /><span style={{ fontSize: 11.5, color: "#555", fontWeight: 500 }}>{b.t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
