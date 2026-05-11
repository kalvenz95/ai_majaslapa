"use client";
import { useState } from "react";

const SCRIPTS = [
  {
    title: "DM — Restorāniem (Faceless video)",
    channel: "Instagram DM",
    open: 64, reply: 18,
    body: `Sveiki, [Vārds]. Pamanīju, ka jūsu IG nav publicēts pēdējās 3 nedēļās. Esmu testējis AI faceless formātu restorāniem — vidēji 80–240k views par 6 dienām. Vai būtu interesanti redzēt 2 demo video tieši jūsu vietai? Bez maksas.`,
    tags: ["Restorāni", "Faceless video", "Instagram"],
    color: "#00ff88",
  },
  {
    title: "Email — Klīnikām (Voice agent)",
    channel: "Cold email",
    open: 41, reply: 12,
    body: `Sveiki, [Vārds]. Cik klientu zvanu jūs nokavējat dienā pēc 18:00? Esmu uzbūvējis AI balss aģentu zobārstu klīnikai Rīgā, kas pieraksta 18 klientus nedēļā automātiski. 12 min demo zvans?`,
    tags: ["Klīnikas", "Voice agent", "Email"],
    color: "#00d4ff",
  },
  {
    title: "LinkedIn — E-com (Make.com)",
    channel: "LinkedIn",
    open: 38, reply: 9,
    body: `Sveiki, [Vārds]. Redzu, ka jums Shopify + Klaviyo + Slack. Ja varētu jums uztaupīt ~14h/ned. uz lead routing un order alerts, vai būtu vērts 15 min saruna?`,
    tags: ["E-com", "Make.com", "LinkedIn"],
    color: "#a855f7",
  },
  {
    title: "WhatsApp — Skaistumkopšana",
    channel: "WhatsApp DM",
    open: 71, reply: 22,
    body: `Čau, [Vārds]! Redzēju jūsu Instagram. Esmu palīdzējis 3 skaistuma saloniem automatizēt pierakstus ar AI — klientes saņem atbildes 24/7, bez manuāla darba. Vai vēlaties redzēt demo?`,
    tags: ["Salons", "WhatsApp", "Automatizācija"],
    color: "#f59e0b",
  },
  {
    title: "Cold email — Real estate",
    channel: "Cold email",
    open: 35, reply: 8,
    body: `Sveiki, [Vārds]. Redzēju, ka jūs tirgojat īpašumus Rīgā. Esmu uzbūvējis AI chatbotu nekustamā īpašuma aģentūrai, kas kvalificē lead 24/7 un nosūta pārvaldniekam tikai gatavos klientus. Vai tas risinātu kādu problēmu?`,
    tags: ["Real estate", "Chatbot", "Email"],
    color: "#ec4899",
  },
];

export default function OutreachPage() {
  const [copied, setCopied] = useState<number | null>(null);

  const copy = (i: number, text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(i);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <div style={{ color: "var(--d-ink)" }}>
      <h1 className="d-section-title">Outreach skripti</h1>
      <p style={{ color: "var(--d-ink3)", fontSize: 14, marginBottom: 28 }}>
        Kopēt, pielāgot, sūtīt. Reāli atbilžu rādītāji no studentiem.
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {SCRIPTS.map((s, i) => (
          <div key={i} className="d-card" style={{ padding: 22 }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <div className="d-mono" style={{ fontSize: 10, color: "var(--d-ink3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
                  {s.channel}
                </div>
                <div className="d-display" style={{ fontSize: 20, color: "var(--d-ink)" }}>{s.title}</div>
              </div>
              <div style={{ display: "flex", gap: 20, flexShrink: 0 }}>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 10, color: "var(--d-ink3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>OPEN</div>
                  <div className="d-metric" style={{ fontSize: 22, color: s.color }}>{s.open}%</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 10, color: "var(--d-ink3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>REPLY</div>
                  <div className="d-metric" style={{ fontSize: 22, color: s.color }}>{s.reply}%</div>
                </div>
              </div>
            </div>

            {/* Script body */}
            <div style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid var(--d-border)",
              borderRadius: 12,
              padding: "16px 18px",
              marginBottom: 16,
            }}>
              <p className="d-mono" style={{ fontSize: 13, lineHeight: 1.7, color: "var(--d-ink2)", margin: 0 }}>
                "{s.body}"
              </p>
            </div>

            {/* Tags + buttons */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {s.tags.map(tag => (
                  <span key={tag} className="d-chip" style={{ fontSize: 10 }}>{tag}</span>
                ))}
              </div>
              <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
                <button
                  onClick={() => copy(i, s.body)}
                  className="d-btn d-btn-primary"
                  style={{ padding: "9px 16px", fontSize: 12 }}
                >
                  {copied === i ? "✓ Nokopēts!" : "Kopēt skriptu"}
                </button>
                <button className="d-btn d-btn-ghost" style={{ padding: "9px 16px", fontSize: 12 }}>
                  ✦ Pielāgot ar AI
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
