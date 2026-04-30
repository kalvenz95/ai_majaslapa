"use client";
import { useState } from "react";
import Link from "next/link";

const PLAN = {
  name: "Digitālais Speciālists",
  price: "59",
  tagline: "Izveido AI risinājumus biznesiem un pārdod tos par stabilu cenu",
  earn: "500€–1 800€/mēn",
  color: "#00ff88",
  glow: "0,255,136",
  courses: ["Mājaslapa", "Web Chatbot", "AI Asistents uz E-pastiem"],
  stats: { lessons: 38, modules: 5, hours: "9h 20 min", students: 89 },
  learn: [
    "Izveidot profesionālu mājaslapa bez programmēšanas",
    "Pievienot AI chatbot, kas atbild 24/7",
    "Automatizēt e-pasta komunikāciju ar AI",
    "Uzrunāt klientus (aukstie zvani + DM)",
    "Sagatavot profesionālu pakalpojuma piedāvājumu",
    "Veidot ikmēneša atbalsta paketes uzņēmumiem",
    "Izveidot portfolio ar reāliem darbiem",
    "Nopelnīt 500€–1800€ mēnesī kā Digitālais Speciālists",
  ],
  skills: [
    "Kā izveidot portfolio ar reāliem darbiem",
    "Kā uzrunāt klientus (aukstie zvani + DM)",
    "Kā sagatavot profesionālu piedāvājumu",
    "Klientu onboarding process",
    "Ikmēneša atbalsta paketes",
  ],
  modules: [
    {
      id: 1,
      title: "Ievads — Ko nozīmē būt Digitālajam Speciālistam",
      duration: "44 min",
      free: true,
      lessons: [
        {
          id: "1.1",
          title: "Kā uzņēmumi maksā par digitālajiem pakalpojumiem",
          type: "video",
          duration: "10 min",
          free: true,
          description:
            "Uzzini, kāpēc vietējie uzņēmumi arvien vairāk meklē digitālos speciālistus un cik viņi ir gatavi maksāt. Reāli piemēri no Latvijas tirgus — frizētavas, zobārsti, restorāni.",
        },
        { id: "1.2", title: "3 pakalpojumi, ko var pārdot uzreiz (bez pieredzes)", type: "video", duration: "12 min", free: false },
        { id: "1.3", title: "Rīku komplekts iesācējam — ko izmantot", type: "text", duration: "8 min", free: false },
        { id: "1.4", title: "Pirmais klients — reāls piemērs no Rīgas", type: "video", duration: "14 min", free: false },
      ],
    },
    {
      id: 2,
      title: "Mājaslapa — no nulles līdz publicēšanai",
      duration: "2h 40 min",
      free: false,
      lessons: [
        { id: "2.1", title: "Rīku izvēle: Framer, Webflow vai Cursor", type: "video", duration: "20 min", free: false },
        { id: "2.2", title: "Dizaina principi bez pieredzes — ko uzmanīties", type: "video", duration: "25 min", free: false },
        { id: "2.3", title: "Satura struktūra — kā izklāstīt uzņēmuma informāciju", type: "video", duration: "22 min", free: false },
        { id: "2.4", title: "SEO pamati — Google meklēšana un atslēgvārdi", type: "video", duration: "20 min", free: false },
        { id: "2.5", title: "Mobilā versija — pielāgošana visām ierīcēm", type: "video", duration: "18 min", free: false },
        { id: "2.6", title: "Domēns, hostings un publicēšana", type: "video", duration: "15 min", free: false },
        { id: "2.7", title: "Projekta nodošana klientam + rēķins", type: "text", duration: "20 min", free: false },
      ],
    },
    {
      id: 3,
      title: "Web Chatbot — 24/7 automātiskais asistents",
      duration: "2h 10 min",
      free: false,
      lessons: [
        { id: "3.1", title: "Voiceflow iestatīšana — pamati 30 minūtēs", type: "video", duration: "22 min", free: false },
        { id: "3.2", title: "Sarunu loģika: jautājumi, atbildes, scenāriji", type: "video", duration: "25 min", free: false },
        { id: "3.3", title: "Mājaslapa integrācija — 1 koda rinda", type: "video", duration: "18 min", free: false },
        { id: "3.4", title: "Lead vākšana automātiski — veidlapas un e-pasts", type: "video", duration: "20 min", free: false },
        { id: "3.5", title: "Chatbot testēšana un uzlabošana", type: "video", duration: "15 min", free: false },
        { id: "3.6", title: "Pārdot chatbot klientam — kā pamatot cenu", type: "text", duration: "10 min", free: false },
      ],
    },
    {
      id: 4,
      title: "AI Asistents uz E-pastiem",
      duration: "1h 50 min",
      free: false,
      lessons: [
        { id: "4.1", title: "Claude kā darba rīks — kas tas ir un kā darbojas", type: "video", duration: "15 min", free: false },
        { id: "4.2", title: "E-pasta veidnes: jauns klients, atbilde, atgādinājums", type: "text", duration: "20 min", free: false },
        { id: "4.3", title: "Dizaina briifi un projekta apraksti ar AI", type: "video", duration: "18 min", free: false },
        { id: "4.4", title: "Satura ģenerēšana sociālajiem tīkliem", type: "video", duration: "20 min", free: false },
        { id: "4.5", title: "Ikdienas darbu automatizācija — 10 piemēri", type: "text", duration: "17 min", free: false },
        { id: "4.6", title: "Pārdot AI asistenta pakalpojumu klientam", type: "video", duration: "20 min", free: false },
      ],
    },
    {
      id: 5,
      title: "Bizness, Portfolio un Klienti",
      duration: "1h 56 min",
      free: false,
      lessons: [
        { id: "5.1", title: "Portfolio ar reāliem darbiem — kā to uzbūvēt", type: "video", duration: "22 min", free: false },
        { id: "5.2", title: "Aukstie zvani + DM — veidnes un piemēri", type: "text", duration: "18 min", free: false },
        { id: "5.3", title: "Profesionāls cenu piedāvājums — ko iekļaut", type: "video", duration: "20 min", free: false },
        { id: "5.4", title: "Klientu onboarding process — soli pa solim", type: "video", duration: "20 min", free: false },
        { id: "5.5", title: "Ikmēneša atbalsta pakete — kā pārdot atkārtoti", type: "video", duration: "16 min", free: false },
        { id: "5.6", title: "No €0 līdz €1000/mēn — 90 dienu plāns", type: "text", duration: "20 min", free: false },
      ],
    },
  ],
};

const TYPE_ICONS: Record<string, string> = { video: "▶", text: "≡", task: "✓", quiz: "?" };

export default function DigitaalaisSpecialistsPage() {
  const [openModules, setOpenModules] = useState<number[]>([1]);

  const toggle = (id: number) =>
    setOpenModules((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  return (
    <div style={{ background: "#050508", minHeight: "100vh", color: "#fff", fontFamily: "Inter, sans-serif" }}>

      {/* Top bar */}
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)", background: "rgba(5,5,8,0.95)", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: 13, fontWeight: 500, transition: "color 0.2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}>
            <span>←</span> Atpakaļ uz sākumu
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 6, background: `rgba(${PLAN.glow},0.12)`, border: `1px solid rgba(${PLAN.glow},0.3)`, borderRadius: 20, padding: "5px 14px" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: PLAN.color, textTransform: "uppercase", letterSpacing: "0.08em" }}>Digitālais Speciālists · €{PLAN.price}/mēn</span>
          </div>
          <div style={{ width: 120 }} />
        </div>
      </div>

      {/* Hero */}
      <div style={{ background: `linear-gradient(180deg, rgba(${PLAN.glow},0.07) 0%, transparent 100%)`, borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "56px 24px 48px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: `rgba(${PLAN.glow},0.1)`, border: `1px solid rgba(${PLAN.glow},0.25)`, borderRadius: 20, padding: "5px 14px", marginBottom: 20 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: PLAN.color, textTransform: "uppercase", letterSpacing: "0.1em" }}>⭐ Populārākais plāns</span>
          </div>

          <h1 style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 900, lineHeight: 1.15, marginBottom: 16, letterSpacing: "-0.02em", maxWidth: 700 }}>
            Izveido <span style={{ color: PLAN.color }}>AI risinājumus</span> biznesiem un pārdod tos
          </h1>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: 24, maxWidth: 580 }}>
            3 kursi vienā paketē — mājaslapa, chatbot un e-pasta automatizācija. Kompletā prasme pakete Latvijas digitālajam speciālistam.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
            {PLAN.courses.map(c => (
              <span key={c} style={{ background: `rgba(${PLAN.glow},0.08)`, border: `1px solid rgba(${PLAN.glow},0.2)`, borderRadius: 8, padding: "5px 12px", fontSize: 12, fontWeight: 600, color: PLAN.color }}>
                {c}
              </span>
            ))}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
            {[
              { label: "Nodarbības", val: PLAN.stats.lessons },
              { label: "Moduļi", val: PLAN.stats.modules },
              { label: "Kopā laiks", val: PLAN.stats.hours },
              { label: "Studenti", val: PLAN.stats.students },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: 20, fontWeight: 900, color: "#fff" }}>{s.val}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px", display: "grid", gridTemplateColumns: "1fr 340px", gap: 40, alignItems: "start" }}>

        {/* LEFT */}
        <div>
          {/* Ko tu iemācīsies */}
          <div style={{ background: "rgba(13,13,26,0.9)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "28px 32px", marginBottom: 32 }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 20 }}>Ko tu iemācīsies</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px" }}>
              {PLAN.learn.map(item => (
                <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ marginTop: 2, flexShrink: 0 }}>
                    <polyline points="20,6 9,17 4,12" stroke={PLAN.color} strokeWidth="3" />
                  </svg>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum */}
          <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>Kursu saturs</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {PLAN.modules.map(mod => {
              const isOpen = openModules.includes(mod.id);
              return (
                <div key={mod.id} style={{ background: "rgba(13,13,26,0.9)", border: `1px solid ${isOpen && mod.free ? `rgba(${PLAN.glow},0.3)` : "rgba(255,255,255,0.07)"}`, borderRadius: 16, overflow: "hidden", transition: "border-color 0.2s" }}>
                  <button
                    onClick={() => toggle(mod.id)}
                    style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 24px", background: "transparent", border: "none", cursor: "pointer", color: "#fff", gap: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 13, fontWeight: 800,
                        background: mod.free ? `rgba(${PLAN.glow},0.12)` : "rgba(255,255,255,0.05)",
                        color: mod.free ? PLAN.color : "rgba(255,255,255,0.4)",
                        border: mod.free ? `1px solid rgba(${PLAN.glow},0.25)` : "1px solid rgba(255,255,255,0.08)" }}>
                        {mod.free ? mod.id : "🔒"}
                      </div>
                      <div style={{ textAlign: "left", minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{mod.title}</div>
                        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{mod.lessons.length} nodarbības · {mod.duration}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: 18, color: "rgba(255,255,255,0.3)", flexShrink: 0, transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>▾</span>
                  </button>

                  {isOpen && (
                    <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                      {mod.lessons.map((lesson) => (
                        <div key={lesson.id}>
                          {lesson.free ? (
                            <div>
                              <div style={{ margin: "0", background: "#000", position: "relative", aspectRatio: "16/9" }}>
                                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, rgba(${PLAN.glow},0.12) 0%, #0a0a14 100%)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
                                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: PLAN.color, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: `0 0 40px rgba(${PLAN.glow},0.4)`, transition: "transform 0.2s" }}
                                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.1)")}
                                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#000"><polygon points="5,3 19,12 5,21" /></svg>
                                  </div>
                                  <div style={{ textAlign: "center" }}>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{lesson.title}</div>
                                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 4 }}>{lesson.duration} · Bezmaksas priekšskatījums</div>
                                  </div>
                                </div>
                              </div>
                              <div style={{ padding: "20px 24px", background: `rgba(${PLAN.glow},0.03)`, borderTop: `1px solid rgba(${PLAN.glow},0.1)` }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                                  <span style={{ fontSize: 11, fontWeight: 700, background: `rgba(${PLAN.glow},0.12)`, color: PLAN.color, border: `1px solid rgba(${PLAN.glow},0.25)`, borderRadius: 6, padding: "2px 8px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Bezmaksas</span>
                                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{TYPE_ICONS[lesson.type]} video · {lesson.duration}</span>
                                </div>
                                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.65 }}>{lesson.description}</p>
                              </div>
                            </div>
                          ) : (
                            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 24px", borderTop: "1px solid rgba(255,255,255,0.04)", opacity: 0.5 }}>
                              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", minWidth: 24, textAlign: "center" }}>🔒</span>
                              <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>{lesson.title}</div>
                              </div>
                              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", flexShrink: 0 }}>{TYPE_ICONS[lesson.type]} {lesson.duration}</div>
                            </div>
                          )}
                        </div>
                      ))}
                      {!mod.free && (
                        <div style={{ padding: "16px 24px", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>Atslēdz {mod.lessons.length} nodarbības</span>
                          <a href="#checkout" style={{ fontSize: 12, fontWeight: 700, color: PLAN.color, textDecoration: "none", background: `rgba(${PLAN.glow},0.1)`, border: `1px solid rgba(${PLAN.glow},0.2)`, borderRadius: 8, padding: "6px 14px" }}>
                            Iegādāties →
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT — Sticky purchase card */}
        <div style={{ position: "sticky", top: 80 }}>
          <div style={{ background: "rgba(13,13,26,0.95)", border: `1px solid rgba(${PLAN.glow},0.3)`, borderRadius: 24, overflow: "hidden", boxShadow: `0 0 60px rgba(${PLAN.glow},0.1)` }}>
            <div style={{ background: `rgba(${PLAN.glow},0.08)`, padding: "20px 24px", borderBottom: `1px solid rgba(${PLAN.glow},0.15)` }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>Potenciālie ienākumi</div>
              <div style={{ fontSize: 28, fontWeight: 900, color: PLAN.color }}>{PLAN.earn}</div>
            </div>

            <div style={{ padding: "24px" }}>
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 4 }}>
                  <span style={{ fontSize: 40, fontWeight: 900 }}>€{PLAN.price}</span>
                  <span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", fontWeight: 500 }}>/mēnesī</span>
                </div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>Atcel jebkurā laikā</div>
              </div>

              <a href="#checkout" style={{ display: "block", width: "100%", background: `linear-gradient(135deg, ${PLAN.color}, #00d4ff)`, color: "#000", border: "none", borderRadius: 14, padding: "15px 24px", fontSize: 15, fontWeight: 800, cursor: "pointer", textDecoration: "none", textAlign: "center", boxShadow: `0 4px 24px rgba(${PLAN.glow},0.25)`, marginBottom: 12, transition: "transform 0.15s, box-shadow 0.15s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 8px 32px rgba(${PLAN.glow},0.35)`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 4px 24px rgba(${PLAN.glow},0.25)`; }}>
                Sākt Digitālā Speciālista ceļu →
              </a>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textAlign: "center", marginBottom: 24 }}>🛡️ 30 dienu naudas atdošanas garantija</div>

              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Iekļautie kursi</div>
                {[
                  { icon: "🌐", name: "Mājaslapa", desc: "AI dizains, SEO, mobilā versija" },
                  { icon: "💬", name: "Web Chatbot", desc: "24/7 automātiskas atbildes, lead ģenerēšana" },
                  { icon: "🤖", name: "AI Asistents uz E-pastiem", desc: "Automatizēti e-pasti un komunikācija" },
                ].map(c => (
                  <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <span style={{ fontSize: 18 }}>{c.icon}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{c.name}</div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>{c.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 10 }}>Ko vēl iegūsti</div>
                {PLAN.skills.map(s => (
                  <div key={s} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ marginTop: 2, flexShrink: 0 }}>
                      <polyline points="20,6 9,17 4,12" stroke={PLAN.color} strokeWidth="3" />
                    </svg>
                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: 16 }}>
            <Link href="/#pricing" style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}>
              Salīdzināt visas pakas →
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: 1fr 340px"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="gridTemplateColumns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
