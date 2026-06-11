"use client";

import { useState } from "react";

/* Brand-derived light palette */
const G = "#00BFA5";
const G2 = "#33D4BF";
const AM = "#FFB86B";
const INK = "var(--ink)";
const INK2 = "var(--ink-3)";
const ON_ACCENT = "#053D34"; // dark teal text for chips on accent bg

const DISPLAY = '"Inter Tight", sans-serif';

function Dot({ color }: { color: string }) {
  return <div style={{ width: 7, height: 7, borderRadius: "50%", background: color, flexShrink: 0 }} />;
}
function Check({ color = G, size = 10 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" style={{ flexShrink: 0 }}>
      <polyline points="20,6 9,17 4,12" />
    </svg>
  );
}

function Eyebrow({ color, children }: { color: string; children: string }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "8px 18px 8px 13px", borderRadius: 30, background: `${color}17`, border: `1px solid ${color}45`, marginBottom: 20 }}>
      <Dot color={color} />
      <span style={{ fontSize: 11.5, fontWeight: 800, color, textTransform: "uppercase", letterSpacing: "0.18em" }}>{children}</span>
    </div>
  );
}

function SectionHead({ accent, eyebrow, title, lede }: { accent: string; eyebrow: string; title: string; lede: string }) {
  return (
    <div style={{ marginBottom: 30, maxWidth: 640 }}>
      <Eyebrow color={accent}>{eyebrow}</Eyebrow>
      <h3 style={{ fontFamily: DISPLAY, fontSize: "clamp(28px, 5vw, 46px)", fontWeight: 900, letterSpacing: "-0.035em", lineHeight: 1.08, color: INK, margin: 0 }}>
        {title}
      </h3>
      <div style={{ width: 64, height: 3, borderRadius: 3, background: `linear-gradient(90deg, ${accent}, transparent)`, margin: "18px 0" }} />
      <p style={{ fontSize: 16, color: INK2, lineHeight: 1.7, margin: 0 }}>{lede}</p>
    </div>
  );
}

/* ── Stilizēti mājaslapas funkciju priekšskatījumi ── */

function BookingPreview({ accent }: { accent: string; accent2: string }) {
  const slots = ["09:00", "10:30", "13:00", "15:30"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 9, padding: "18px 20px", height: "100%", justifyContent: "center" }}>
      <div style={{ display: "flex", gap: 5 }}>
        {["P", "O", "T", "C", "P", "S", "Sv"].map((d, i) => (
          <div key={i} style={{ width: 22, height: 22, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: i === 3 ? ON_ACCENT : "var(--ink-4)", background: i === 3 ? accent : "var(--bg-2)" }}>
            {d}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
        {slots.map((s, i) => (
          <div key={s} style={{ fontSize: 10, fontWeight: 600, padding: "5px 9px", borderRadius: 7, color: i === 1 ? ON_ACCENT : "var(--ink-3)", background: i === 1 ? accent : "var(--bg-2)", border: i === 1 ? "none" : "1px solid var(--line)" }}>
            {s}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 4, fontSize: 10, color: "var(--ink-3)" }}>✓ Apstiprināts uz <strong style={{ color: "var(--ink)" }}>10:30</strong></div>
    </div>
  );
}

function PaymentPreview({ accent }: { accent: string; accent2: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 11, padding: "18px 20px", height: "100%", justifyContent: "center" }}>
      <div style={{ borderRadius: 10, padding: "12px 14px", background: "var(--bg-2)", border: "1px solid var(--line)" }}>
        <div style={{ fontSize: 9, color: "var(--ink-4)", letterSpacing: "0.06em", marginBottom: 6 }}>KARTES NUMURS</div>
        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-2)", letterSpacing: "0.12em" }}>•••• •••• •••• 4242</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 9, color: "var(--ink-3)" }}>Pakalpojums: Konsultācija</div>
          <div style={{ fontSize: 14, fontWeight: 800, color: "var(--ink)", marginTop: 2 }}>€45,00</div>
        </div>
        <div style={{ fontSize: 10, fontWeight: 700, padding: "6px 12px", borderRadius: 8, color: ON_ACCENT, background: accent }}>Apmaksāts ✓</div>
      </div>
    </div>
  );
}

function AnalyticsPreview({ accent, accent2 }: { accent: string; accent2: string }) {
  const bars = [38, 52, 31, 64, 47, 70, 58];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 11, padding: "18px 20px", height: "100%", justifyContent: "center" }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 56 }}>
        {bars.map((h, i) => (
          <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: "3px 3px 1px 1px", background: i === 5 ? accent : "var(--bg-3)" }} />
        ))}
      </div>
      <div style={{ display: "flex", gap: 16 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, color: accent }}>+128</div>
          <div style={{ fontSize: 9, color: "var(--ink-3)" }}>jauni apmeklētāji</div>
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800, color: "#C77B2B" }}>17</div>
          <div style={{ fontSize: 9, color: "var(--ink-3)" }}>jauni pieprasījumi</div>
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

function ExampleCard({ ex }: { ex: (typeof examples)[number] }) {
  const [hover, setHover] = useState(false);
  const Preview = ex.Preview;
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        borderRadius: 20,
        overflow: "hidden",
        border: `1px solid ${ex.accent}${hover ? "55" : "2e"}`,
        boxShadow: hover
          ? `0 26px 60px -24px ${ex.accent}66, 0 6px 16px -8px rgba(17,17,17,0.10)`
          : "0 12px 36px -20px rgba(17,17,17,0.16)",
        background: "#fff",
        transform: hover ? "translateY(-4px)" : "translateY(0)",
        transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, border-color 0.3s ease",
      }}
    >
      <div style={{ position: "relative", height: 152, overflow: "hidden", borderBottom: `1px solid ${ex.accent}1e`, background: `linear-gradient(135deg, ${ex.accent}14 0%, #fff 80%)` }}>
        <div style={{ position: "absolute", top: -55, right: -45, width: 220, height: 220, borderRadius: "50%", background: `radial-gradient(circle, ${ex.accent}1f 0%, transparent 65%)`, pointerEvents: "none" }} />
        <div style={{ position: "relative", height: "100%" }}>
          <Preview accent={ex.accent} accent2={ex.accent2} />
        </div>
      </div>
      <div style={{ padding: "30px 28px 32px" }}>
        <h4 style={{ fontFamily: DISPLAY, fontSize: 21, fontWeight: 800, color: INK, margin: "0 0 11px", letterSpacing: "-0.02em" }}>{ex.title}</h4>
        <p style={{ fontSize: 15, color: INK2, lineHeight: 1.7, marginBottom: 20 }}>{ex.desc}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
          {ex.points.map((pt) => (
            <div key={pt} style={{ display: "flex", alignItems: "center", gap: 13 }}>
              <div style={{ width: 36, height: 36, borderRadius: 11, background: `${ex.accent}16`, border: `1px solid ${ex.accent}3c`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Check color={ex.accent} size={17} />
              </div>
              <span style={{ fontSize: 14.5, color: "var(--ink-2)", lineHeight: 1.5 }}>{pt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ClosingNote() {
  return (
    <div style={{ marginTop: 22, position: "relative", padding: "24px 28px", borderRadius: 18, overflow: "hidden", background: `linear-gradient(120deg, ${G}14, ${G2}0a)`, border: `1px solid ${G}3a`, display: "flex", alignItems: "center", gap: 18, boxShadow: "0 16px 44px -24px rgba(0,191,165,0.4)" }}>
      <div style={{ width: 44, height: 44, borderRadius: 13, background: `linear-gradient(135deg, ${G}, ${G2})`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: `0 8px 22px -8px ${G}` }}>
        <Check color="#fff" size={19} />
      </div>
      <p style={{ fontSize: 15.5, color: INK2, lineHeight: 1.65, margin: 0 }}>
        Visas šīs funkcijas tu pievienosi <strong style={{ color: INK }}>bez programmēšanas</strong> — izmantojot rīkus, kurus apgūsi šajā blokā.
      </p>
    </div>
  );
}

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
  const [hover, setHover] = useState(false);
  return (
    <a
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "block",
        borderRadius: 20,
        overflow: "hidden",
        border: `1px solid ${site.accent}${hover ? "5c" : "2e"}`,
        boxShadow: hover
          ? `0 28px 64px -26px ${site.accent}66, 0 6px 16px -8px rgba(17,17,17,0.12)`
          : "0 12px 36px -20px rgba(17,17,17,0.16)",
        textDecoration: "none",
        background: "#fff",
        transform: hover ? "translateY(-6px)" : "translateY(0)",
        transition: "transform 0.32s cubic-bezier(0.16,1,0.3,1), box-shadow 0.32s ease, border-color 0.32s ease",
      }}
    >
      <div style={{ position: "relative", height: 184, overflow: "hidden", borderBottom: `1px solid ${site.accent}1e` }}>
        <img src={site.img} alt={site.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", display: "block" }} loading="lazy" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 42%, rgba(17,17,17,0.86) 100%)" }} />
        <div style={{ position: "absolute", bottom: 16, left: 20, right: 20, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
          <span style={{ fontFamily: DISPLAY, fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: "-0.015em" }}>{site.title}</span>
          <span style={{ fontSize: 11.5, fontWeight: 800, padding: "7px 15px", borderRadius: 30, color: ON_ACCENT, background: site.accent, boxShadow: `0 8px 24px -8px ${site.accent}`, whiteSpace: "nowrap" }}>↗ Atvērt</span>
        </div>
      </div>
      <div style={{ padding: "22px 24px 26px" }}>
        <p style={{ fontSize: 14.5, color: INK2, margin: 0 }}>{site.niche}</p>
      </div>
    </a>
  );
}

export function MajaslapaFunkcijuPiemeri() {
  return (
    <div
      style={{
        position: "relative",
        marginTop: 26,
        borderRadius: 28,
        overflow: "hidden",
        padding: "clamp(28px, 5vw, 46px)",
        background:
          `radial-gradient(ellipse 120% 70% at 12% -15%, ${G}10 0%, transparent 55%), ` +
          `radial-gradient(ellipse 90% 70% at 105% 115%, ${G2}0c 0%, transparent 55%), ` +
          `var(--bg)`,
        border: "1px solid var(--line)",
        boxShadow: "0 24px 60px -32px rgba(17,17,17,0.18)",
      }}
    >
      <div style={{ position: "relative" }}>
        <SectionHead
          accent={G}
          eyebrow="Piemēri no šī bloka"
          title="Funkcijas, ko iemācīsies pievienot klienta mājaslapai"
          lede="Tukša mājaslapa nepārdod. Šajā blokā tu iemācies pievienot funkcijas, par kurām uzņēmumi ir gatavi maksāt vairāk — un kuras tieši palīdz tiem iegūt jaunus klientus."
        />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 22 }}>
          {examples.map((ex) => (
            <ExampleCard key={ex.title} ex={ex} />
          ))}
        </div>

        <ClosingNote />

        {/* ── REĀLI PIEMĒRI ── */}
        <div style={{ marginTop: 52 }}>
          <SectionHead
            accent={G2}
            eyebrow="Reāli darbi"
            title="Mājaslapas, ko jau esam izveidojuši"
            lede="Šādas mājaslapas tu mācīsies veidot pats — noklikšķini un apskaties tās dzīvē."
          />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 22 }}>
            {portfolio.map((site) => (
              <PortfolioCard key={site.title} site={site} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
