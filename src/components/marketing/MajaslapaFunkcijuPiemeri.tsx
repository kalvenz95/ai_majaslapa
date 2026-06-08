"use client";

const G = "#00ff88";
const G2 = "#00d4ff";
const AM = "#f59e0b";

function GlowDot({ color }: { color: string }) {
  return <div style={{ width: 7, height: 7, borderRadius: "50%", background: color, boxShadow: `0 0 8px ${color}, 0 0 18px ${color}55`, flexShrink: 0 }} />;
}
function Check({ color = G }: { color?: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3.5" style={{ flexShrink: 0 }}>
      <polyline points="20,6 9,17 4,12" />
    </svg>
  );
}

/* ── Stilizēti mājaslapas funkciju priekšskatījumi ── */

function BookingPreview({ accent }: { accent: string; accent2: string }) {
  const slots = ["09:00", "10:30", "13:00", "15:30"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, padding: "16px 18px", height: "100%", justifyContent: "center" }}>
      <div style={{ display: "flex", gap: 5 }}>
        {["P", "O", "T", "C", "P", "S", "Sv"].map((d, i) => (
          <div key={i} style={{ width: 22, height: 22, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: i === 3 ? "#04140c" : "rgba(255,255,255,0.4)", background: i === 3 ? accent : "rgba(255,255,255,0.05)" }}>
            {d}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
        {slots.map((s, i) => (
          <div key={s} style={{ fontSize: 10, fontWeight: 600, padding: "5px 9px", borderRadius: 7, color: i === 1 ? "#04140c" : "rgba(255,255,255,0.6)", background: i === 1 ? accent : "rgba(255,255,255,0.06)", border: i === 1 ? "none" : "1px solid rgba(255,255,255,0.08)" }}>
            {s}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 4, fontSize: 10, color: "rgba(255,255,255,0.4)" }}>✓ Apstiprināts uz <strong style={{ color: "rgba(255,255,255,0.75)" }}>10:30</strong></div>
    </div>
  );
}

function PaymentPreview({ accent }: { accent: string; accent2: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "16px 18px", height: "100%", justifyContent: "center" }}>
      <div style={{ borderRadius: 10, padding: "12px 14px", background: "linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))", border: "1px solid rgba(255,255,255,0.09)" }}>
        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", letterSpacing: "0.06em", marginBottom: 6 }}>KARTES NUMURS</div>
        <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.7)", letterSpacing: "0.12em" }}>•••• •••• •••• 4242</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.38)" }}>Pakalpojums: Konsultācija</div>
          <div style={{ fontSize: 14, fontWeight: 800, color: "#fff", marginTop: 2 }}>€45,00</div>
        </div>
        <div style={{ fontSize: 10, fontWeight: 700, padding: "6px 12px", borderRadius: 8, color: "#04140c", background: accent }}>Apmaksāts ✓</div>
      </div>
    </div>
  );
}

function AnalyticsPreview({ accent, accent2 }: { accent: string; accent2: string }) {
  const bars = [38, 52, 31, 64, 47, 70, 58];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "16px 18px", height: "100%", justifyContent: "center" }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 56 }}>
        {bars.map((h, i) => (
          <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: "3px 3px 1px 1px", background: i === 5 ? accent : "rgba(255,255,255,0.12)" }} />
        ))}
      </div>
      <div style={{ display: "flex", gap: 16 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, color: accent }}>+128</div>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>jauni apmeklētāji</div>
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, color: accent2 }}>17</div>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.4)" }}>jauni pieprasījumi</div>
        </div>
      </div>
    </div>
  );
}

const examples = [
  {
    accent: G, accent2: G2,
    Preview: BookingPreview,
    title: "Tiešsaistes pieraksts",
    desc: "Klients izvēlas brīvu laiku un piesakās tieši no mājaslapas — bez zvaniem un sarakstes turp un atpakaļ.",
    points: ["Kalendārs ar brīvajiem laikiem", "Automātisks apstiprinājums e-pastā vai SMS", "Atgādinājums pirms vizītes"],
  },
  {
    accent: G2, accent2: AM,
    Preview: PaymentPreview,
    title: "Maksājumi tiešsaistē",
    desc: "Klients var samaksāt par pakalpojumu vai avansu uzreiz mājaslapā — droši, bez skaidras naudas un kavētiem maksājumiem.",
    points: ["Stripe vai cits maksājumu rīks", "Avansa maksājumi par pakalpojumu", "Automātisks rēķins uz e-pastu"],
  },
  {
    accent: AM, accent2: G,
    Preview: AnalyticsPreview,
    title: "Apmeklētāju statistika",
    desc: "Uzņēmums redz, cik cilvēku apmeklē mājaslapu, no kurienes tie nāk un kuras lapas pārvērš apmeklētājus par klientiem.",
    points: ["Google Analytics — apmeklētāju dati", "Pieprasījumu apkopošana vienuviet", "Skaidri dati labāku lēmumu pieņemšanai"],
  },
];

const portfolio = [
  {
    title: "La Skrundo",
    niche: "Itāļu kafejnīca un restorāns",
    img: "/portfolio/la-skrundo.png",
    url: "https://la-skrundo.vercel.app",
    accent: AM,
  },
  {
    title: "Dessert Eagle",
    niche: "Premium auto detailing studija",
    img: "/portfolio/dessert-deagle.png",
    url: "https://dessert-deagle-site.vercel.app",
    accent: G2,
  },
  {
    title: "Pity Store",
    niche: "Luksusa mājdzīvnieku zīmols",
    img: "/portfolio/pity-store.png",
    url: "https://pity-store.vercel.app/",
    accent: G,
  },
];

function PortfolioCard({ site }: { site: (typeof portfolio)[number] }) {
  return (
    <a
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: "block", borderRadius: 16, overflow: "hidden", border: `1px solid ${site.accent}22`, boxShadow: "0 6px 24px rgba(0,0,0,0.3)", textDecoration: "none", background: "#05080a", transition: "transform 0.2s ease, border-color 0.2s ease" }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = `${site.accent}55`; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = `${site.accent}22`; }}
    >
      <div style={{ position: "relative", height: 150, overflow: "hidden", borderBottom: `1px solid ${site.accent}1c` }}>
        <img src={site.img} alt={site.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }} loading="lazy" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(5,8,10,0.92) 100%)" }} />
        <div style={{ position: "absolute", bottom: 10, left: 14, right: 14, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 13.5, fontWeight: 800, color: "#fff", letterSpacing: "-0.01em" }}>{site.title}</span>
          <span style={{ fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 20, color: site.accent, background: `${site.accent}16`, border: `1px solid ${site.accent}36` }}>↗ Atvērt</span>
        </div>
      </div>
      <div style={{ padding: "12px 16px 14px" }}>
        <p style={{ fontSize: 11.5, color: "#677", margin: 0 }}>{site.niche}</p>
      </div>
    </a>
  );
}

export function MajaslapaFunkcijuPiemeri() {
  return (
    <div style={{ marginTop: 20 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: G, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 6 }}>
        Piemēri no šī bloka
      </div>
      <h3 style={{ fontSize: "clamp(18px, 2.6vw, 24px)", fontWeight: 900, letterSpacing: "-0.02em", color: "#fff", margin: "0 0 8px" }}>
        Funkcijas, ko iemācīsies pievienot klienta mājaslapai
      </h3>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: 560, marginBottom: 16 }}>
        Tukša mājaslapa nepārdod. Šajā blokā tu iemācies pievienot funkcijas, par kurām uzņēmumi ir gatavi maksāt vairāk —
        un kuras tieši palīdz tiem iegūt jaunus klientus.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
        {examples.map((ex) => {
          const Preview = ex.Preview;
          return (
            <div key={ex.title} style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${ex.accent}22`, boxShadow: "0 6px 24px rgba(0,0,0,0.3)" }}>
              <div style={{ position: "relative", height: 130, overflow: "hidden", borderBottom: `1px solid ${ex.accent}1c` }}>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(5,8,5,0.97), rgba(5,8,12,0.99))" }} />
                <div style={{ position: "absolute", top: -50, right: -40, width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle, ${ex.accent}28 0%, transparent 65%)`, pointerEvents: "none" }} />
                <div style={{ position: "relative", height: "100%" }}>
                  <Preview accent={ex.accent} accent2={ex.accent2} />
                </div>
              </div>
              <div style={{ padding: "16px 18px 18px", background: "#05080a" }}>
                <h4 style={{ fontSize: 14.5, fontWeight: 800, color: "#fff", margin: "0 0 6px", letterSpacing: "-0.01em" }}>{ex.title}</h4>
                <p style={{ fontSize: 12, color: "#677", lineHeight: 1.65, marginBottom: 12 }}>{ex.desc}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                  {ex.points.map((pt) => (
                    <div key={pt} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 17, height: 17, borderRadius: 5, background: `${ex.accent}10`, border: `1px solid ${ex.accent}26`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Check color={ex.accent} />
                      </div>
                      <span style={{ fontSize: 11.5, color: "#8a9a8a" }}>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 12, padding: "13px 16px", borderRadius: 11, background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.11)", display: "flex", alignItems: "center", gap: 10 }}>
        <GlowDot color={G} />
        <p style={{ fontSize: 12, color: "#677", lineHeight: 1.6, margin: 0 }}>
          Visas šīs funkcijas tu pievienosi <strong style={{ color: "#bbb" }}>bez programmēšanas</strong> — izmantojot rīkus, kurus apgūsi šajā blokā.
        </p>
      </div>

      {/* ── REĀLI PIEMĒRI ── */}
      <div style={{ marginTop: 28 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: G2, textTransform: "uppercase", letterSpacing: "0.09em", marginBottom: 6 }}>
          Reāli darbi
        </div>
        <h3 style={{ fontSize: "clamp(18px, 2.6vw, 24px)", fontWeight: 900, letterSpacing: "-0.02em", color: "#fff", margin: "0 0 8px" }}>
          Mājaslapas, ko jau esam izveidojuši
        </h3>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: 560, marginBottom: 16 }}>
          Šādas mājaslapas tu mācīsies veidot pats — noklikšķini un apskaties tās dzīvē.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          {portfolio.map((site) => (
            <PortfolioCard key={site.title} site={site} />
          ))}
        </div>
      </div>
    </div>
  );
}
