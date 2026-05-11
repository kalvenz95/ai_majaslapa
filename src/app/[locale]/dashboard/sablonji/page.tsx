"use client";
import { useState } from "react";

const TEMPLATES = [
  { icon: "💬", title: "Chatbot proposal — €1500 paketei", cat: "Proposal", ver: "v2.4", size: "1.2 KB" },
  { icon: "🎬", title: "Faceless skripta šablons (12 hooks)", cat: "Skripts", ver: "v1.8", size: "0.9 KB" },
  { icon: "💰", title: "Cenu kalkulators .xlsx", cat: "Pricing", ver: "v3.1", size: "24 KB" },
  { icon: "🎙️", title: "Voice agenta sistēmas prompt", cat: "Prompt", ver: "v1.2", size: "0.5 KB" },
  { icon: "🖼️", title: "AI bilžu briefa šablons", cat: "Brief", ver: "v1.0", size: "0.8 KB" },
  { icon: "⚙️", title: "Make.com — Lead routing scenario", cat: "Workflow", ver: "v2.0", size: "4.1 KB" },
  { icon: "💬", title: "Objection handling — 12 atbildes", cat: "Skripti", ver: "v1.5", size: "1.1 KB" },
  { icon: "📋", title: "Klienta onboarding ceļvedis", cat: "Onboarding", ver: "v2.2", size: "1.8 KB" },
  { icon: "💰", title: "Retainer līguma šablons (LV)", cat: "Legal", ver: "v1.3", size: "2.4 KB" },
  { icon: "📱", title: "Instagram DM sekvence (7 ziņas)", cat: "Outreach", ver: "v1.9", size: "0.7 KB" },
  { icon: "📧", title: "Cold email sekvence (B2B)", cat: "Outreach", ver: "v2.1", size: "1.0 KB" },
  { icon: "🌐", title: "Mājas lapas audit checklist", cat: "Checklist", ver: "v1.1", size: "0.6 KB" },
  { icon: "🤖", title: "ChatGPT prompt banka (50 prompts)", cat: "Prompt", ver: "v3.0", size: "2.2 KB" },
  { icon: "📊", title: "MRR tracker Google Sheets", cat: "Pricing", ver: "v1.4", size: "18 KB" },
  { icon: "🎯", title: "Klienta ICP šablons", cat: "Strategy", ver: "v1.0", size: "0.9 KB" },
  { icon: "📞", title: "Discovery call skripta veidne", cat: "Skripts", ver: "v2.3", size: "1.3 KB" },
  { icon: "✅", title: "Projekta nodošanas checklist", cat: "Onboarding", ver: "v1.7", size: "0.8 KB" },
  { icon: "💼", title: "Portfolio case study šablons", cat: "Brief", ver: "v1.2", size: "1.6 KB" },
  { icon: "🔔", title: "WhatsApp follow-up sekvence", cat: "Outreach", ver: "v1.1", size: "0.5 KB" },
  { icon: "📈", title: "Klienta mēneša atskaite", cat: "Proposal", ver: "v2.0", size: "1.4 KB" },
  { icon: "🎙️", title: "Vapi balss agenta sistēmas prompt (LV)", cat: "Prompt", ver: "v1.0", size: "0.7 KB" },
  { icon: "⚙️", title: "n8n webhook sekvence šablons", cat: "Workflow", ver: "v1.3", size: "3.8 KB" },
  { icon: "📋", title: "Pakalpojumu cenu saraksts PDF", cat: "Pricing", ver: "v1.5", size: "0.4 KB" },
  { icon: "💬", title: "Chatbot knowledge base veidne", cat: "Prompt", ver: "v1.1", size: "1.0 KB" },
  { icon: "🤝", title: "Partnership proposal šablons", cat: "Proposal", ver: "v1.0", size: "1.7 KB" },
  { icon: "📧", title: "Lekciju reminder email sekvence", cat: "Skripts", ver: "v1.2", size: "0.6 KB" },
  { icon: "🌐", title: "SEO audit checklist (LV biznesam)", cat: "Checklist", ver: "v2.0", size: "0.9 KB" },
  { icon: "🎬", title: "TikTok content calendar (30 dienas)", cat: "Brief", ver: "v1.4", size: "1.1 KB" },
];

const CATS = ["Visi", "Proposal", "Skripts", "Skripti", "Outreach", "Pricing", "Prompt", "Workflow", "Brief", "Onboarding", "Legal", "Checklist", "Strategy"];

export default function SablonjuPage() {
  const [active, setActive] = useState("Visi");
  const [copied, setCopied] = useState<number | null>(null);

  const filtered = active === "Visi" ? TEMPLATES : TEMPLATES.filter(t => t.cat === active);

  const handleCopy = (i: number, title: string) => {
    navigator.clipboard.writeText(title).then(() => {
      setCopied(i);
      setTimeout(() => setCopied(null), 1500);
    });
  };

  return (
    <div style={{ color: "var(--d-ink)" }}>
      <h1 className="d-section-title">Šablonu krātuve</h1>
      <p style={{ color: "var(--d-ink3)", fontSize: 14, marginBottom: 24 }}>
        {TEMPLATES.length} šabloni — kopēt, ielīmēt, pārdot
      </p>

      {/* Category filter */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
        {CATS.map(cat => (
          <button key={cat} onClick={() => setActive(cat)}
            className={`d-chip${active === cat ? " d-chip-accent" : ""}`}
            style={{ cursor: "pointer", border: "none" }}>
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
        {filtered.map((t, i) => (
          <div key={i} className="d-card" style={{ padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: "rgba(255,255,255,0.05)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                border: "1px solid var(--d-border)",
              }}>{t.icon}</div>
              <span className="d-chip" style={{ fontSize: 10 }}>{t.cat}</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 500, lineHeight: 1.4, color: "var(--d-ink)", marginBottom: 16 }}>{t.title}</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 12, borderTop: "1px solid var(--d-border)" }}>
              <span className="d-mono" style={{ fontSize: 10, color: "var(--d-ink3)" }}>{t.ver} · {t.size}</span>
              <button
                onClick={() => handleCopy(i, t.title)}
                className="d-btn d-btn-ghost"
                style={{ padding: "5px 12px", fontSize: 11 }}
              >
                {copied === i ? "✓ Nokopēts" : "↓ Lejup."}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
