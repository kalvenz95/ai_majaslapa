"use client";

import type { ReactNode } from "react";
import type { DetailMarketingCourse } from "@/content/marketing/marketingDetailCourse.types";
import { MarketingCourseSectionLabel } from "@/components/marketing/MarketingCourseDetailTabs";
import { useTranslations } from "next-intl";

const P = "#a855f7";

export function SocialCurriculumIntro({ course }: { course: DetailMarketingCourse }) {
  const moduleColors = ["#a855f7", "#ec4899", "#f59e0b", "#00d4ff", "#00ff88", "#8b5cf6"];

  const moduleHighlights: Record<number, string[]> = {
    1: ["Kas ir AI sociālo mediju pārvaldība", "Visi rīki — no bezmaksas versijām", "Kā noteikt cenas no pirmās dienas"],
    2: ["AI faceless video bez parādīšanās kamerā", "Runway ML, HeyGen, CapCut praksē", "Gatavs video pirmajam klientam"],
    3: ["Reklāmas banneri sekundēs ar Canva AI", "Midjourney prompts komerciāliem attēliem", "Facebook, Instagram, LinkedIn komplekts"],
    4: ["Kā veidot konsekventu feed dizainu", "Brand identity ar Midjourney sistēmu", "Carousels, Stories, captions automātiski"],
    5: ["Kur atrast pirmos klientus Latvijā", "Cold outreach skripti — copy-paste gatavi", "Kā vadīt pirmo sarunu un noslēgt darījumu"],
    6: ["Buffer/Later — mēneša saturs 2 stundās", "Klientu atskaites templates", "Kā pārvaldīt 5+ klientus bez stresa"],
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 8 }}>

      {/* Iespēju sadaļa */}
      <div style={{ position: "relative", padding: "28px 32px", borderRadius: 16, background: "linear-gradient(135deg, rgba(168,85,247,0.1) 0%, rgba(236,72,153,0.07) 60%, rgba(5,5,8,0) 100%)", border: "1px solid rgba(168,85,247,0.2)", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(168,85,247,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.03) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div style={{ position: "absolute", top: -60, right: -60, width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle, rgba(236,72,153,0.1), transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "3px 10px", borderRadius: 20, background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.3)", marginBottom: 16 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: P, boxShadow: `0 0 6px ${P}` }} />
            <span style={{ fontSize: 10, color: P, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase" }}>Ko tu iemācīsies šajā kursā</span>
          </div>
          <h3 style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.025em", lineHeight: 1.15, marginBottom: 10, color: "#fff" }}>
            No nulles līdz <span style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>pirmajam klientam</span>
          </h3>
          <p style={{ fontSize: 13.5, color: "#888", lineHeight: 1.7, maxWidth: 560, marginBottom: 22 }}>
            {course.totalModules} bloki. {course.totalLessons} nodarbības. Katrs bloks ved tevi soli tuvāk reālam ienākumam — bez iepriekšējas pieredzes ar AI vai dizainu.
          </p>

          {/* Ienākumu solis */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[
              { label: "Sāc ar", amount: "€300/mēn", note: "1. klients", color: "rgba(168,85,247,0.15)", border: "rgba(168,85,247,0.3)", textColor: P },
              { label: "Pēc 1 mēn.", amount: "€600–€1 000", note: "2 klienti", color: "rgba(236,72,153,0.1)", border: "rgba(236,72,153,0.25)", textColor: "#ec4899" },
              { label: "Stabils ienākums", amount: "€1 500+", note: "3–4 klienti", color: "rgba(0,255,136,0.08)", border: "rgba(0,255,136,0.2)", textColor: "#00ff88" },
            ].map((step, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", padding: "12px 16px", borderRadius: 10, background: step.color, border: `1px solid ${step.border}`, minWidth: 130 }}>
                <span style={{ fontSize: 10, color: "#555", fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>{step.label}</span>
                <span style={{ fontSize: 18, fontWeight: 900, color: step.textColor, letterSpacing: "-0.01em" }}>{step.amount}</span>
                <span style={{ fontSize: 10.5, color: "#555", marginTop: 2 }}>{step.note}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bloku pārskats */}
      <div style={{ padding: "22px 24px", borderRadius: 16, background: "#09090f", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: P, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>Kas tevi sagaida katrā blokā</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {course.modules.map((mod, idx) => {
            const accent = moduleColors[idx] ?? P;
            const highlights = moduleHighlights[mod.id] ?? [];
            return (
              <div
                key={mod.id}
                style={{
                  display: "flex",
                  gap: 14,
                  padding: "14px 0",
                  borderBottom: idx < course.modules.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                }}
              >
                <div style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0, background: `${accent}18`, border: `1px solid ${accent}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: accent, marginTop: 1 }}>
                  {mod.id}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 7, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{mod.title}</span>
                    <span style={{ fontSize: 10, color: "#444", borderLeft: "1px solid rgba(255,255,255,0.06)", paddingLeft: 10 }}>{mod.lessons.length} nodarbības · {mod.duration}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {highlights.map((h, hi) => (
                      <div key={hi} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 14, height: 14, borderRadius: 4, flexShrink: 0, background: `${accent}15`, border: `1px solid ${accent}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="3"><polyline points="20,6 9,17 4,12" /></svg>
                        </div>
                        <span style={{ fontSize: 12, color: "#777", lineHeight: 1.45 }}>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Apakšējā info josla */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {[
          { icon: "🎯", text: `${course.totalLessons} nodarbības ar praktisku uzdevumu` },
          { icon: "⬇️", text: "Lejupielādājami templates un skripti" },
          { icon: "🇱🇻", text: "Pilnībā latviski, Latvijas tirgum" },
        ].map((b) => (
          <div key={b.text} style={{ display: "flex", alignItems: "center", gap: 7, padding: "8px 14px", borderRadius: 8, background: "rgba(168,85,247,0.05)", border: "1px solid rgba(168,85,247,0.12)" }}>
            <span style={{ fontSize: 13 }}>{b.icon}</span>
            <span style={{ fontSize: 11.5, color: "#888" }}>{b.text}</span>
          </div>
        ))}
      </div>

    </div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <MarketingCourseSectionLabel accent={P}>{children}</MarketingCourseSectionLabel>;
}

export function SocialMarketingOverviewPanelLv({ course }: { course: DetailMarketingCourse }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>

      {/* ── HERO SALES SECTION ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>

        {/* Virsraksts */}
        <div style={{ position: "relative", padding: "40px", borderRadius: 20, background: "linear-gradient(135deg, rgba(168,85,247,0.1) 0%, rgba(236,72,153,0.06) 60%, rgba(5,5,8,0) 100%)", border: "1px solid rgba(168,85,247,0.18)", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(168,85,247,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.04) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          <div style={{ position: "absolute", top: -60, right: -60, width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle, rgba(236,72,153,0.12), transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "relative" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 20, background: "rgba(168,85,247,0.12)", border: "1px solid rgba(168,85,247,0.3)", marginBottom: 20 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#a855f7", boxShadow: "0 0 8px #a855f7" }} />
              <span style={{ fontSize: 11, color: "#a855f7", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>Sociālo tīklu pārvaldība</span>
            </div>
            <h2 style={{ fontSize: 32, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 14, color: "#fff" }}>
              Sāc pelnīt ar<br />
              <span style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>sociālo tīklu pārvaldību</span>
            </h2>
            <p style={{ fontSize: 15, color: "#888", lineHeight: 1.75, maxWidth: 580 }}>
              Izveido saturu biznesiem un pārvērt to par stabilu ienākumu avotu
            </p>
          </div>
        </div>

        {/* Platformas solījums */}
        <div style={{ padding: "22px 28px", borderRadius: 14, background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "flex-start", gap: 16 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, flexShrink: 0, background: "linear-gradient(135deg, rgba(168,85,247,0.25), rgba(236,72,153,0.25))", border: "1px solid rgba(168,85,247,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>💡</div>
          <p style={{ fontSize: 14, color: "#ccc", lineHeight: 1.75 }}>
            Šajā platformā tu mācies un uzreiz liec zināšanas darbībā. Tu apgūsi pakalpojumu, ko vari piedāvāt uzņēmumiem par <span style={{ color: "#a855f7", fontWeight: 700 }}>300€ – 1500€ mēnesī</span>.
          </p>
        </div>

        {/* Klientu ienākumu piemērs */}
        <div style={{ padding: "28px", borderRadius: 16, background: "#0d0d1a", border: "1px solid rgba(168,85,247,0.18)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(168,85,247,0.08), transparent 70%)", pointerEvents: "none" }} />
          <div style={{ fontSize: 11, fontWeight: 700, color: "#a855f7", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>Potenciālie ienākumi</div>
          <div style={{ fontSize: 13, color: "#666", marginBottom: 20 }}>Reāls piemērs — 3–4 klienti mēnesī</div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 }}>
            {[
              { clients: "1 klients", price: "€300–€500", suffix: "/mēn", note: "Sākotnējā cena, iesācējs" },
              { clients: "2 klienti", price: "€600–€1 000", suffix: "/mēn", note: "Pēc 1. mēneša" },
              { clients: "3 klienti", price: "€1 200–€1 800", suffix: "/mēn", note: "Paceltas cenas, stabils darbs" },
              { clients: "4 klienti", price: "€1 800–€3 500", suffix: "/mēn", note: "Premium klienti + upsell" },
            ].map((row, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 10, background: i === 3 ? "rgba(168,85,247,0.08)" : "rgba(255,255,255,0.03)", border: `1px solid ${i === 3 ? "rgba(168,85,247,0.25)" : "rgba(255,255,255,0.05)"}` }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: i === 3 ? "rgba(168,85,247,0.2)" : "rgba(255,255,255,0.05)", border: `1px solid ${i === 3 ? "rgba(168,85,247,0.4)" : "rgba(255,255,255,0.08)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: i === 3 ? "#a855f7" : "#555", flexShrink: 0 }}>
                  {i + 1}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: i === 3 ? "#fff" : "#aaa" }}>{row.clients}</div>
                  <div style={{ fontSize: 11, color: "#555", marginTop: 1 }}>{row.note}</div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <span style={{ fontSize: i === 3 ? 17 : 15, fontWeight: 800, background: i === 3 ? "linear-gradient(135deg, #a855f7, #ec4899)" : "none", WebkitBackgroundClip: i === 3 ? "text" : "unset", WebkitTextFillColor: i === 3 ? "transparent" : "#ccc" }}>{row.price}</span>
                  <span style={{ fontSize: 11, color: "#555" }}>{row.suffix}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: "14px 16px", borderRadius: 10, background: "rgba(168,85,247,0.06)", border: "1px solid rgba(168,85,247,0.15)", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 18 }}>💡</span>
            <p style={{ fontSize: 12.5, color: "#888", lineHeight: 1.6, margin: 0 }}>
              Lielākajai daļai studentu pirmais klients nāk <span style={{ color: "#a855f7", fontWeight: 700 }}>3 nedēļu laikā</span>. Ar 3–4 klientiem un paceltu cenu var sasniegt <span style={{ color: "#a855f7", fontWeight: 700 }}>€1 200–€3 500/mēn</span>.
            </p>
          </div>
        </div>

        {/* Ko tu iemācīsies šajā pakā */}
        <div style={{ padding: "28px", borderRadius: 16, background: "#0d0d1a", border: "1px solid rgba(168,85,247,0.12)" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#a855f7", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 18 }}>Šajā pakā tu:</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              "Iemācīsies veidot video bez sejas",
              "Radīsi vizuālus materiālus un reklāmas",
              "Sapratīsi, kā veidot saturu, kas piesaista klientus",
              "Izveidosi savu pirmo pakalpojumu",
              "Sāksi strādāt ar reāliem klientiem",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{ width: 20, height: 20, borderRadius: 6, background: "rgba(168,85,247,0.2)", border: "1px solid rgba(168,85,247,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="3"><polyline points="20,6 9,17 4,12" /></svg>
                </div>
                <span style={{ fontSize: 14, color: "#ccc", lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Priekšrocības */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {[
            { icon: "🔥", text: "Pieprasīts pakalpojums" },
            { icon: "🟢", text: "Piemērots iesācējiem" },
            { icon: "⚡", text: "Ātrākais veids sākt ar AI" },
          ].map((r) => (
            <div key={r.text} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 16px", borderRadius: 10, background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.18)" }}>
              <span style={{ fontSize: 15 }}>{r.icon}</span>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: "#ddd" }}>{r.text}</span>
            </div>
          ))}
        </div>

        {/* Tagline */}
        <div style={{ padding: "24px 28px", borderRadius: 14, background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.05)" }}>
          <p style={{ fontSize: 15, color: "#888", lineHeight: 1.8, marginBottom: 8 }}>
            Sociālie tīkli ir vieta, kur biznesi katru dienu meklē klientus.
          </p>
          <p style={{ fontSize: 16, fontWeight: 700, color: "#fff", lineHeight: 1.6 }}>
            Tu vari būt tas, kurš viņiem palīdz to izdarīt.
          </p>
        </div>

        {/* Mērķis + CTA */}
        <div style={{ padding: "36px", borderRadius: 20, textAlign: "center", background: "linear-gradient(135deg, rgba(168,85,247,0.1), rgba(236,72,153,0.08))", border: "1px solid rgba(168,85,247,0.2)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(168,85,247,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.03) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
          <div style={{ position: "relative" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#a855f7", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 12 }}>Mērķis</div>
            <p style={{ fontSize: 18, fontWeight: 800, color: "#fff", letterSpacing: "-0.01em", marginBottom: 28 }}>
              Pēc šīs pakas tu esi gatavs sākt pelnīt<br />
              <span style={{ background: "linear-gradient(135deg, #a855f7, #ec4899)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ar sociālo tīklu pārvaldību.</span>
            </p>
            <button
              style={{ padding: "15px 44px", borderRadius: 12, border: "none", cursor: "pointer", background: "linear-gradient(135deg, #a855f7, #ec4899)", color: "#fff", fontWeight: 700, fontSize: 15, letterSpacing: "0.01em", boxShadow: "0 8px 32px rgba(168,85,247,0.4)", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 14px 40px rgba(168,85,247,0.5)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 32px rgba(168,85,247,0.4)"; }}
            >
              Sākt kursu
            </button>
          </div>
        </div>

        {/* Iekšējais saturs — pēc pirkuma */}
        <div style={{ borderRadius: 16, overflow: "hidden", border: "1px solid rgba(168,85,247,0.2)" }}>
          <div style={{ padding: "16px 24px", background: "rgba(168,85,247,0.1)", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 16 }}>🔓</span>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#a855f7", textTransform: "uppercase", letterSpacing: "0.07em" }}>Ko redz pēc pirkuma</span>
          </div>
          <div style={{ padding: "24px", background: "#0d0d1a", display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { num: "1", title: "Ievads & pamati", items: ["Kā darbojas šis pakalpojums", "Kā sākt bez pieredzes", "Kā izvēlēties savu nišu"] },
              { num: "2", title: "Video saturs", items: ["Kā veidot faceless video", "Kā rakstīt scenārijus", "Kā radīt uzmanību piesaistošu saturu"] },
              { num: "3", title: "Reklāmu vizuāļi", items: ["Kā izveidot bannerus", "Kā radīt reklāmas materiālus", "Uzdevums: 5 banneru komplekts klientam"] },
              { num: "4", title: "Sociālo tīklu dizains", items: ["Kā veidot Instagram un Facebook feed", "Kā izveidot vienotu stilu", "Kā taisīt carousels, stories un plānot saturu"] },
              { num: "5", title: "Klientu atrašana & pārdošana", items: ["Kur atrast klientus", "Kā uzrakstīt pirmo ziņu", "Kā izveidot piedāvājumu un vadīt sarunu"] },
              { num: "6", title: "Automatizācija & skalēšana", items: ["Kā automatizēt publicēšanu", "Kā veidot atskaites", "Kā strādāt ar vairākiem klientiem"] },
            ].map((mod) => (
              <div key={mod.num} style={{ display: "flex", gap: 16 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, flexShrink: 0, background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#a855f7" }}>
                  {mod.num}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{mod.title}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    {mod.items.map((item, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(168,85,247,0.5)", flexShrink: 0 }} />
                        <span style={{ fontSize: 12.5, color: "#777" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            {/* Rezultāts */}
            <div style={{ padding: "16px 20px", borderRadius: 10, background: "rgba(168,85,247,0.06)", border: "1px solid rgba(168,85,247,0.15)", marginTop: 4 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#a855f7", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 10 }}>Rezultāts</div>
              <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {["Savs pakalpojums", "Gatavi darbi", "Pirmie klienti", "Skaidrs ceļš uz ienākumiem"].map((r) => (
                  <div key={r} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="3"><polyline points="20,6 9,17 4,12" /></svg>
                    <span style={{ fontSize: 12, color: "#999" }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Ko tu iemācīsies */}
      <div>
        <SectionLabel>Ko tu iemācīsies</SectionLabel>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20, letterSpacing: "-0.02em" }}>
          No nulles līdz pirmajam klientam
        </h2>
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {course.learn.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex", alignItems: "flex-start", gap: 10,
                padding: "14px 16px", borderRadius: 10,
                background: "rgba(168,85,247,0.04)", border: "1px solid rgba(168,85,247,0.1)",
              }}
            >
              <div style={{ width: 18, height: 18, borderRadius: 5, background: "rgba(168,85,247,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="3">
                  <polyline points="20,6 9,17 4,12" />
                </svg>
              </div>
              <span style={{ fontSize: 13, color: "#ccc", lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Kursa saturs kopsavilkums */}
      <div>
        <SectionLabel>Kursa saturs</SectionLabel>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20, letterSpacing: "-0.02em" }}>
          {course.totalModules} moduļi · {course.totalLessons} nodarbības
        </h2>
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
          {course.modules.map((mod) => (
            <div
              key={mod.id}
              style={{
                padding: "16px", borderRadius: 12,
                background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: "rgba(168,85,247,0.15)", border: "1px solid rgba(168,85,247,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: "#a855f7" }}>
                  {mod.id}
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{mod.title}</span>
              </div>
              <div style={{ fontSize: 11, color: "#555", marginBottom: 8 }}>
                {mod.lessons.length} nodarbības · {mod.duration}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {mod.lessons.slice(0, 3).map((l) => (
                  <span
                    key={l.id}
                    style={{
                      fontSize: 10, padding: "2px 7px", borderRadius: 4,
                      background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)",
                      color: "#666",
                    }}
                  >
                    {l.type === "task" ? "🎯" : l.type === "text" ? "📄" : "▶"} {l.duration}
                  </span>
                ))}
                {mod.lessons.length > 3 && (
                  <span style={{ fontSize: 10, color: "#444", padding: "2px 4px" }}>+{mod.lessons.length - 3}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Priekšrocības */}
      <div>
        <SectionLabel>Kāpēc šis kurss</SectionLabel>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20, letterSpacing: "-0.02em" }}>
          Reāli rezultāti, ne tikai teorija
        </h2>
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {[
            { icon: "🎯", title: "Projektu bāzēta", desc: "Katra moduļa beigās ir praktisks uzdevums, ko vari iekļaut portfolio." },
            { icon: "📦", title: "Gatavi templates", desc: "Proposal, līgums, onboarding, atskaite — viss lejupielādājams." },
            { icon: "🇱🇻", title: "Latvijas tirgum", desc: "Cold outreach skripti, cenas un stratēģijas Latvijas realitātei." },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                padding: "20px", borderRadius: 12,
                background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: "#666", lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Instructor */}
      <div>
        <SectionLabel>Pasniedzējs</SectionLabel>
        <div
          style={{
            display: "flex", alignItems: "flex-start", gap: 20, padding: "24px",
            borderRadius: 16, background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            style={{
              width: 64, height: 64, borderRadius: 16, flexShrink: 0,
              background: "linear-gradient(135deg, #a855f7, #ec4899)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 20, fontWeight: 800, color: "#fff",
            }}
          >
            {course.instructor.avatar}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <span style={{ fontSize: 16, fontWeight: 800 }}>{course.instructor.name}</span>
              <span
                style={{
                  fontSize: 11, padding: "2px 8px", borderRadius: 6,
                  background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.25)",
                  color: "#a855f7",
                }}
              >
                {course.instructor.role}
              </span>
            </div>
            <p style={{ fontSize: 13, color: "#777", lineHeight: 1.7, marginBottom: 14 }}>
              {course.instructor.bio}
            </p>
            <div style={{ display: "flex", gap: 20 }}>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#a855f7" }}>{course.instructor.students}+</div>
                <div style={{ fontSize: 11, color: "#555" }}>studenti</div>
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#a855f7" }}>{course.instructor.courses}</div>
                <div style={{ fontSize: 11, color: "#555" }}>kursi</div>
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#f59e0b" }}>4.9 ★</div>
                <div style={{ fontSize: 11, color: "#555" }}>vidējais vērtējums</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div
        style={{
          padding: "36px", borderRadius: 20,
          background: "linear-gradient(135deg, rgba(168,85,247,0.12), rgba(236,72,153,0.08))",
          border: "1px solid rgba(168,85,247,0.2)",
          textAlign: "center",
        }}
      >
        <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 8, letterSpacing: "-0.02em" }}>
          Gatavs sākt nopelnīt {course.earn}?
        </h3>
        <p style={{ fontSize: 14, color: "#777", marginBottom: 24 }}>
          Pievienojies {course.students} studentiem kas jau apgūst šo kursu.
        </p>
        <button
          style={{
            padding: "14px 40px", borderRadius: 12, border: "none", cursor: "pointer",
            background: "linear-gradient(135deg, #a855f7, #ec4899)",
            color: "#fff", fontWeight: 700, fontSize: 15,
            boxShadow: "0 8px 30px rgba(168,85,247,0.35)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 40px rgba(168,85,247,0.45)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 30px rgba(168,85,247,0.35)"; }}
        >
          Sākt kursu — pirmās 2 nodarbības bezmaksas
        </button>
      </div>
    </div>
  );
}

export function SocialMarketingOverviewPanelEn({ course }: { course: DetailMarketingCourse }) {
  const m = useTranslations("CourseMarketingChrome");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      <div style={{ padding: "28px", borderRadius: 16, background: "#0d0d1a", border: "1px solid rgba(168,85,247,0.22)" }}>
        <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 12, letterSpacing: "-0.02em" }}>{course.title}</h2>
        <p style={{ fontSize: 15, fontWeight: 700, color: "#bbb", marginBottom: 8 }}>{course.subtitle}</p>
        <p style={{ fontSize: 14, color: "#888", lineHeight: 1.75 }}>{course.description}</p>
      </div>
      <div>
        <MarketingCourseSectionLabel accent={P}>{m("learnSectionLabel")}</MarketingCourseSectionLabel>
        <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>{m("headingFromZero")}</h2>
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {course.learn.map((item, i) => (
            <div key={i} style={{ padding: "12px 14px", borderRadius: 10, background: "rgba(168,85,247,0.06)", border: "1px solid rgba(168,85,247,0.14)" }}>
              <span style={{ fontSize: 13, color: "#ccc", lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: "24px", borderRadius: 14, background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: P, textTransform: "uppercase", marginBottom: 10 }}>{m("instructorSectionLabel")}</div>
        <div style={{ fontSize: 15, fontWeight: 700 }}>{course.instructor.name}</div>
        <p style={{ fontSize: 13, color: "#777", marginTop: 8, lineHeight: 1.6 }}>{course.instructor.bio}</p>
      </div>
    </div>
  );
}
