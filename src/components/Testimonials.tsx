"use client";
import { useState } from "react";

const testimonials = [
  {
    name: "Mārtiņš K.",
    role: "Freelancer, Rīga",
    avatar: "MK",
    text: "Pēc 3 nedēļām Chademy uzrunāju pirmo klientu — restorānu Rīgā. Chatbot uzstādīšana aizgāja gludi, klients bija apmierināts. Tagad strādāju ar 4 klientiem paralēli pamata darbam.",
    rate: "€1,400/mēn",
    course: "Website Chatbot",
  },
  {
    name: "Laura B.",
    role: "Satura veidotāja, Jūrmala",
    avatar: "LB",
    text: "AI faceless video kurss bija tieši tas, ko meklēju. Vienkāršs, prakstisks, bez liekām teorijām. Tagad vadu sociālo mediju saturu 3 vietējiem uzņēmumiem un pati plānoju savu laiku.",
    rate: "€900/mēn",
    course: "AI Faceless Video",
  },
  {
    name: "Raivis D.",
    role: "Mārketinga speciālists",
    avatar: "RD",
    text: "Voice aģentu sistēmu zobārstniecībai saliku kopā pēc kursa. Klients ir sajūsmā — automātiski zvanu atgādinājumi strādā bez iejaukšanās. Projekts — €800, plus €200/mēn uzturēšana.",
    rate: "€800 + €200/mēn",
    course: "Voice Agents",
  },
  {
    name: "Sintija M.",
    role: "Uzņēmēja, Liepāja",
    avatar: "SM",
    text: "Make.com workflow kurss man atvēra acis. Automātiski e-pasti, CRM, rēķini — viss bez rokām. Tagad piedāvāju šo kā pakalpojumu — man ir 5 pastāvīgi klienti.",
    rate: "€1,200/mēn",
    course: "Make.com Workflow",
  },
  {
    name: "Andris T.",
    role: "IT speciālists, Rīga",
    avatar: "AT",
    text: "WhatsApp automāciju zobārstniecībai Rīgā pabeidzu 4 dienās. Build Pack saturs ir detalizēts un prakstisks — viss, kas nepieciešams, lai sāktu piedāvāt šādus risinājumus.",
    rate: "€600 projekts",
    course: "WhatsApp Automācija",
  },
  {
    name: "Elīna V.",
    role: "Grafikas dizainere",
    avatar: "EV",
    text: "AI attēlu kurss papildināja manus dizaina pakalpojumus. Tagad piedāvāju klientiem arī AI reklāmas bannerus. Darba apjoms dubultojies, bet laiks uz to — uz pusēm.",
    rate: "€600/mēn",
    course: "AI Attēlu Ģenerēšana",
  },
];

const stats = [
  { value: "3 ned.", label: "Vidējais laiks līdz pirmajam klientam" },
  { value: "94%", label: "Studentu apmierinātības rādītājs" },
  { value: "350+", label: "Aktīvi studenti Latvijā" },
  { value: "6+", label: "Kursā apgūstamie pakalpojumi" },
];

export default function Testimonials() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="results" style={{ padding: "96px 24px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, var(--line-2), transparent)" }} />

      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div className="chip chip-dot" style={{ marginBottom: 16 }}>🏆 Reāli piemēri</div>
          <h2 style={{ fontFamily: "Inter Tight, sans-serif", fontSize: "clamp(28px,4vw,40px)", fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.02em", marginBottom: 12 }}>
            Cilvēki, kas jau{" "}
            <span style={{ color: "var(--accent)" }}>strādā ar šiem pakalpojumiem</span>
          </h2>
          <p style={{ color: "var(--ink-3)", fontSize: 14, maxWidth: 480, margin: "0 auto", lineHeight: 1.6 }}>
            Piemēri, kā Chademy prasmes var pārvērst reālos pakalpojumos uzņēmumiem.
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32 }}>
          {stats.map((s) => (
            <div key={s.label} className="card" style={{ padding: 16, textAlign: "center" }}>
              <div className="metric" style={{ fontSize: 28, color: "var(--accent)", marginBottom: 4 }}>{s.value}</div>
              <div style={{ fontSize: 12, color: "var(--ink-3)", lineHeight: 1.4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {testimonials.map((t, i) => {
            const isOpen = open === i;
            return (
              <div
                key={t.name}
                className="card"
                style={{
                  overflow: "hidden",
                  borderColor: isOpen ? "var(--line-2)" : "var(--line)",
                  background: isOpen ? "var(--bg-2)" : "var(--bg-1)",
                  transition: "background 0.2s ease, border-color 0.2s ease",
                }}
              >
                {/* Header */}
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{ width: "100%", display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", textAlign: "left", background: "none", border: "none", cursor: "pointer" }}
                >
                  <div className="avatar" style={{ width: 36, height: 36, fontSize: 12, flexShrink: 0, background: isOpen ? "color-mix(in oklab, var(--accent) 20%, var(--bg-3))" : "var(--bg-3)", color: isOpen ? "var(--accent)" : "var(--ink-2)" }}>{t.avatar}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", lineHeight: 1 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "var(--ink-3)", marginTop: 2 }}>{t.role}</div>
                  </div>
                  <span className="chip" style={{ fontSize: 10, display: "none" }} data-sm-show>{t.course}</span>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)", fontFamily: "JetBrains Mono, monospace" }}>{t.rate}</div>
                  </div>
                  <svg
                    width={16} height={16}
                    viewBox="0 0 24 24" fill="none" stroke="var(--ink-3)" strokeWidth={2}
                    style={{ flexShrink: 0, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.3s ease" }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Quote */}
                <div style={{ maxHeight: isOpen ? "200px" : "0px", overflow: "hidden", transition: "max-height 0.35s ease" }}>
                  <div style={{ padding: "0 16px 16px" }}>
                    <div style={{ borderRadius: 12, padding: 16, fontSize: 14, color: "var(--ink-2)", lineHeight: 1.6, fontStyle: "italic", background: "var(--bg-3)", borderLeft: "2px solid color-mix(in oklab, var(--accent) 50%, transparent)" }}>
                      "{t.text}"
                    </div>
                    <div style={{ marginTop: 8 }}>
                      <span className="chip" style={{ fontSize: 10 }}>{t.course}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
