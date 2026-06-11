"use client";

import type { ReactNode } from "react";
import type { DetailMarketingCourse } from "@/content/marketing/marketingDetailCourse.types";
import { VOICE_MARKET_THEME } from "@/components/marketing/marketingCourseVisualThemes";
import { MarketingCourseSectionLabel } from "@/components/marketing/MarketingCourseDetailTabs";
import { useTranslations } from "next-intl";
import { EmojiIcon } from "@/components/EmojiIcon";

const A = VOICE_MARKET_THEME.accentHex;
const AG = VOICE_MARKET_THEME.accentGradientCss;
const ABg = VOICE_MARKET_THEME.tintBg;
const ABg2 = VOICE_MARKET_THEME.tintBg2;
const ABorder = VOICE_MARKET_THEME.tintBorder;

function SectionLabel({ children }: { children: ReactNode }) {
  return <MarketingCourseSectionLabel accent={A}>{children}</MarketingCourseSectionLabel>;
}

export function VoiceMarketingOverviewPanelLv({ course }: { course: DetailMarketingCourse }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>

      {/* Hero image + headline */}
      <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", border: `1px solid ${ABorder}` }}>
        <img
          src="https://images.unsplash.com/photo-1589254065878-42c9da997008?w=900&q=80"
          alt="AI balss aģents"
          style={{ width: "100%", height: 280, objectFit: "cover", display: "block" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(5,5,8,0.1) 0%, rgba(5,5,8,0.85) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "rgba(249,115,22,0.08)", mixBlendMode: "multiply" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px 32px" }}>
          {/* Animated sound wave */}
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 3, marginRight: 10 }}>
              {[0.4, 0.7, 1, 0.6, 0.9, 0.5, 0.8, 1, 0.6, 0.4].map((h, i) => (
                <div key={i} style={{ width: 3, height: 18 * h, borderRadius: 2, background: A, animation: `waveBar 0.8s ease-in-out ${i * 0.08}s infinite`, transformOrigin: "bottom" }} />
              ))}
            </div>
            <span style={{ fontSize: 11, color: A, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Balss aģents aktīvs</span>
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.15, color: "#fff", marginBottom: 8 }}>
            Tavs AI asistents zvana,<br />
            <span style={{ background: AG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>kamēr tu dari citu darbu.</span>
          </h2>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>
            Automatizēti zvani, pieraksti un klientu apkalpošana — 24/7, bez koda, bez kavēšanās.
          </p>
        </div>
      </div>

      {/* Platform promise */}
      <div style={{ padding: "22px 28px", borderRadius: 14, background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "flex-start", gap: 16 }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, flexShrink: 0, background: `linear-gradient(135deg, ${ABg}, ${ABg2})`, border: ABorder, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🎯</div>
        <p style={{ fontSize: 14, color: "#ccc", lineHeight: 1.75 }}>
          Šajā kursā tu mācies un <strong style={{ color: "#fff" }}>uzreiz liec zināšanas darbībā</strong>. Tu apgūsi pakalpojumu, ko vari piedāvāt uzņēmumiem par <span style={{ color: A, fontWeight: 700 }}>500€ – 1800€</span>. Nav nepieciešamas programmēšanas zināšanas — tikai vēlme darīt.
        </p>
      </div>

      {/* 3 differentiators */}
      <div>
        <SectionLabel>Kas padara šo atšķirīgu</SectionLabel>
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
          {[
            { icon: "🤖", color: A, title: "Īsts AI, ne ieraksts", desc: "Aģents saprot jautājumus un atbild dinamiski — ne tikai atskaņo iepriekš ierakstītas frāzes" },
            { icon: "🇱🇻", color: "#00d4ff", title: "Latviešu valodā", desc: "Konfigurē aģentu, kurš sarunājas latviešu valodā — pielāgots Latvijas uzņēmumiem" },
            { icon: "⚡", color: "#00ff88", title: "No nulles 1 dienā", desc: "Pirmais darba aģents ir gatavs jau pēc 2–3 stundām. Bez programmēšanas pieredzes" },
          ].map((item) => (
            <div key={item.title} style={{ padding: "22px 20px", borderRadius: 14, background: "#0d0d1a", border: `1px solid ${item.color}22`, transition: "border-color 0.2s, transform 0.2s" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = `${item.color}55`; (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = `${item.color}22`; (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
            >
              <div style={{ marginBottom: 12 }}><EmojiIcon emoji={item.icon} size={24} color={item.color} strokeWidth={1.75} /></div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: "#666", lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Step by step — how it works */}
      <div>
        <SectionLabel>Kā tu uzbuildo pirmo aģentu</SectionLabel>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24, letterSpacing: "-0.02em" }}>6 soļi no nulles līdz darbojošam aģentam</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {[
            { step: "01", title: "Izvēlies nišu un scenāriju", desc: "Zobārstniecība, restorāns, nekustamais īpašums — izlem, kādam biznesam tu veidosi aģentu. Jo konkrētāk, jo labāk.", icon: "🎯", time: "15 min" },
            { step: "02", title: "Izveido kontu un pievienosi balsi", desc: "Reģistrējies instrumentos, izvēlies latviskai ausij patīkamu balsi un konfigurē aģenta personību.", icon: "🎙️", time: "20 min" },
            { step: "03", title: "Uzraksti sarunu skriptu", desc: "Kādus jautājumus klients uzdos? Kā aģents atbildēs? Tev palīdzēs gatavi template.", icon: "📝", time: "30 min" },
            { step: "04", title: "Savienoji ar tālruņa numuru", desc: "Latvijas (+371) numurs ir pieejams. Pēc 10 minūtēm aģentam var piezvanīt no jebkura telefona.", icon: "📞", time: "20 min" },
            { step: "05", title: "Integrē Calendar un CRM", desc: "Aģents automātiski rezervē pierakstus Google Calendar un saglabā klientu datus Google Sheets.", icon: "📅", time: "40 min" },
            { step: "06", title: "Pārdod klientam", desc: "Demo zvans, proposal, līgums — visi dokumenti ir gatavi, tu tikai nosūti un sagaidi 'jā'.", icon: "💰", time: "pārdošana" },
          ].map((s, i, arr) => (
            <div key={s.step} style={{ display: "flex", gap: 20, position: "relative" }}>
              {/* Connector line */}
              {i < arr.length - 1 && (
                <div style={{ position: "absolute", left: 19, top: 56, bottom: 0, width: 2, background: `linear-gradient(to bottom, ${A}44, transparent)`, zIndex: 0 }} />
              )}
              <div style={{ flexShrink: 0, zIndex: 1 }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: `linear-gradient(135deg, ${ABg}, ${ABg2})`, border: ABorder, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
                  {s.icon}
                </div>
              </div>
              <div style={{ paddingBottom: i < arr.length - 1 ? 28 : 0, flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <span style={{ fontSize: 10, fontWeight: 800, color: A, letterSpacing: "0.1em" }}>SOLIS {s.step}</span>
                  <span style={{ fontSize: 10, color: "#444", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", padding: "1px 8px", borderRadius: 4 }}>~{s.time}</span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 5 }}>{s.title}</div>
                <div style={{ fontSize: 13, color: "#666", lineHeight: 1.6 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Use cases image */}
      <div>
        <SectionLabel>Reālie pielietojumi</SectionLabel>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20, letterSpacing: "-0.02em" }}>Kādi biznesi maksā par šo Latvijā</h2>
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
          {[
            {
              img: "https://images.unsplash.com/photo-1629909615184-74f495363b67?w=500&q=80",
              title: "Zobārstniecība",
              desc: "Pierakstu rezervācija, atgādinājumi, atbildes uz biežiem jautājumiem",
              price: "800€–1200€",
              color: "#00d4ff",
            },
            {
              img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80",
              title: "Restorāns",
              desc: "Galda rezervācija, ēdienkartes informācija, darba laiki",
              price: "500€–900€",
              color: "#00ff88",
            },
            {
              img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&q=80",
              title: "Nekustamais īpašums",
              desc: "Lead kvalifikācija, apskates pieteikšana, cenu informācija",
              price: "1000€–1800€",
              color: A,
            },
          ].map((uc) => (
            <div key={uc.title} style={{ borderRadius: 16, overflow: "hidden", border: `1px solid rgba(255,255,255,0.07)`, background: "#0d0d1a" }}>
              <div style={{ position: "relative", height: 140 }}>
                <img src={uc.img} alt={uc.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 30%, rgba(13,13,26,0.95) 100%)" }} />
                <div style={{ position: "absolute", inset: 0, background: `rgba(${uc.color === A ? "249,115,22" : uc.color === "#00d4ff" ? "0,212,255" : "0,255,136"},0.07)`, mixBlendMode: "multiply" }} />
              </div>
              <div style={{ padding: "14px 16px" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{uc.title}</div>
                <div style={{ fontSize: 12, color: "#666", lineHeight: 1.5, marginBottom: 12 }}>{uc.desc}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: uc.color }}>{uc.price}</div>
                <div style={{ fontSize: 10, color: "#444" }}>projekta cena</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What you learn */}
      <div>
        <SectionLabel>Ko tu iemācīsies</SectionLabel>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20, letterSpacing: "-0.02em" }}>No nulles līdz pirmajam klientam</h2>
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {course.learn.map((item, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "14px 16px", borderRadius: 10, background: ABg, border: ABorder }}>
              <div style={{ width: 18, height: 18, borderRadius: 5, background: `rgba(249,115,22,0.2)`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={A} strokeWidth="3"><polyline points="20,6 9,17 4,12" /></svg>
              </div>
              <span style={{ fontSize: 13, color: "#ccc", lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* No coding needed callout */}
      <div style={{ padding: "28px 32px", borderRadius: 16, background: "linear-gradient(135deg, rgba(0,255,136,0.05), rgba(0,212,255,0.04))", border: "1px solid rgba(0,255,136,0.15)", display: "flex", gap: 20, alignItems: "flex-start" }}>
        <div style={{ fontSize: 32, flexShrink: 0 }}>✋</div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 800, color: "#fff", marginBottom: 8 }}>Nav nepieciešamas programmēšanas zināšanas</div>
          <p style={{ fontSize: 13, color: "#777", lineHeight: 1.7, marginBottom: 12 }}>
            Viss kurss ir veidots cilvēkiem bez tehniskas pieredzes. Tu izmantosi vizuālas, no-code platformas — bez koda rakstīšanas, bez termināļa, bez datorzinātnes grādiem. Ja tu spēj izmantot Google Docs, tu spēsi izveidot AI balss aģentu.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {["No-code rīki", "Vizuāls interfeiss", "Soli pa solim", "Latviešu valodā"].map((tag) => (
              <span key={tag} style={{ fontSize: 11, padding: "4px 12px", borderRadius: 20, background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.2)", color: "#00ff88", fontWeight: 600 }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Tech setup visual */}
      <div>
        <SectionLabel>Kā darbojas sistēma</SectionLabel>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20, letterSpacing: "-0.02em" }}>Aģenta arhitektūra — vienkārši</h2>
        <div style={{ padding: "28px", borderRadius: 16, background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 0, justifyContent: "center", flexWrap: "wrap", rowGap: 16 }}>
            {[
              { label: "Klients zvana", icon: "📱", color: "#00ff88" },
              { label: "→" },
              { label: "AI apstrādā", icon: "🧠", color: A },
              { label: "→" },
              { label: "Atbild / Rezervē", icon: "📅", color: "#00d4ff" },
              { label: "→" },
              { label: "Saglabā datus", icon: "📊", color: "#a855f7" },
            ].map((node, i) =>
              "label" in node && node.label === "→" ? (
                <div key={i} style={{ fontSize: 18, color: "#333", padding: "0 8px" }}>→</div>
              ) : (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: `${"color" in node ? node.color : "#fff"}18`, border: `1px solid ${"color" in node ? node.color : "#fff"}33`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>
                    {"icon" in node ? node.icon : ""}
                  </div>
                  <span style={{ fontSize: 11, color: "#555", fontWeight: 600, textAlign: "center", maxWidth: 70 }}>{"label" in node ? node.label : ""}</span>
                </div>
              )
            )}
          </div>
          <div style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
            <p style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>Viss notiek automātiski. Tu iestatī sistēmu vienreiz — tā strādā mūžīgi bez tava iesaistīšanās.</p>
          </div>
        </div>
      </div>

      {/* Course modules overview */}
      <div>
        <SectionLabel>Kursa saturs</SectionLabel>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20, letterSpacing: "-0.02em" }}>{course.totalModules} moduļi · {course.totalLessons} nodarbības</h2>
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {course.modules.map((mod) => (
            <div key={mod.id} style={{ padding: "16px", borderRadius: 12, background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div style={{ width: 24, height: 24, borderRadius: 6, background: ABg, border: ABorder, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: A }}>{mod.id}</div>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{mod.title}</span>
              </div>
              <div style={{ fontSize: 11, color: "#555", marginBottom: 8 }}>{mod.lessons.length} nodarbības · {mod.duration}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {mod.lessons.slice(0, 3).map((l) => (
                  <span key={l.id} style={{ fontSize: 10, padding: "2px 7px", borderRadius: 4, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", color: "#666" }}>
                    {l.type === "task" ? "🎯" : l.type === "text" ? "📄" : "▶"} {l.duration}
                  </span>
                ))}
                {mod.lessons.length > 3 && <span style={{ fontSize: 10, color: "#444", padding: "2px 4px" }}>+{mod.lessons.length - 3}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why this course */}
      <div>
        <SectionLabel>Kāpēc šis kurss</SectionLabel>
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 20, letterSpacing: "-0.02em" }}>Reāli rezultāti, ne tikai teorija</h2>
        <div className="grid-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {[
            { icon: "🎯", title: "Projektu bāzēta", desc: "Katra moduļa beigās ir praktisks uzdevums — portfolio, ko rādīt klientiem." },
            { icon: "📦", title: "Gatavi template", desc: "Sarunu skripti, proposal PDF, onboarding dokuments — viss latviski." },
            { icon: "🇱🇻", title: "Latvijas tirgum", desc: "Cenas, klientu meklēšanas veidi un skripti ir pielāgoti LV realitātei." },
          ].map((item) => (
            <div key={item.title} style={{ padding: "20px", borderRadius: 12, background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ marginBottom: 10 }}><EmojiIcon emoji={item.icon} size={26} color={A} strokeWidth={1.75} /></div>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: "#666", lineHeight: 1.6 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Instructor */}
      <div>
        <SectionLabel>Pasniedzējs</SectionLabel>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 20, padding: "24px", borderRadius: 16, background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, flexShrink: 0, background: AG, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, color: "#000" }}>
            {course.instructor.avatar}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <span style={{ fontSize: 16, fontWeight: 800 }}>{course.instructor.name}</span>
              <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 6, background: ABg, border: ABorder, color: A }}>{course.instructor.role}</span>
            </div>
            <p style={{ fontSize: 13, color: "#777", lineHeight: 1.7, marginBottom: 14 }}>{course.instructor.bio}</p>
            <div style={{ display: "flex", gap: 20 }}>
              <div><div style={{ fontSize: 18, fontWeight: 800, color: A }}>{course.instructor.students}+</div><div style={{ fontSize: 11, color: "#555" }}>studenti</div></div>
              <div><div style={{ fontSize: 18, fontWeight: 800, color: A }}>{course.instructor.courses}</div><div style={{ fontSize: 11, color: "#555" }}>kursi</div></div>
              <div><div style={{ fontSize: 18, fontWeight: 800, color: "#f59e0b" }}>4.9 ★</div><div style={{ fontSize: 11, color: "#555" }}>vidējais vērtējums</div></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div style={{ padding: "40px", borderRadius: 20, background: `linear-gradient(135deg, ${ABg}, ${ABg2})`, border: ABorder, textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(${ABg} 1px, transparent 1px), linear-gradient(90deg, ${ABg} 1px, transparent 1px)`, backgroundSize: "32px 32px" }} />
        <div style={{ position: "relative" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: A, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 12 }}>Mērķis</div>
          <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 8, letterSpacing: "-0.02em" }}>
            Pēc kursa tu esi gatavs izveidot un<br />
            <span style={{ background: AG, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>pārdot AI balss aģentu.</span>
          </h3>
          <p style={{ fontSize: 14, color: "#777", marginBottom: 28 }}>Pievienojies {course.students} studentiem, kas jau apgūst šo kursu.</p>
          <button
            style={{ padding: "15px 44px", borderRadius: 12, border: "none", cursor: "pointer", background: AG, color: "#000", fontWeight: 700, fontSize: 15, letterSpacing: "0.01em", boxShadow: "0 8px 32px rgba(249,115,22,0.35)", transition: "transform 0.2s, box-shadow 0.2s" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 14px 40px rgba(249,115,22,0.5)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 32px rgba(249,115,22,0.35)"; }}
          >
            Sākt kursu — pirmās 2 nodarbības bezmaksas
          </button>
        </div>
      </div>

    </div>
  );
}

export function VoiceMarketingOverviewPanelEn({ course }: { course: DetailMarketingCourse }) {
  const m = useTranslations("CourseMarketingChrome");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
      <div style={{ padding: "28px", borderRadius: 16, background: "#0d0d1a", border: `1px solid rgba(249,115,22,0.22)` }}>
        <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 12, letterSpacing: "-0.02em" }}>{course.title}</h2>
        <p style={{ fontSize: 14, color: "#888", lineHeight: 1.75 }}>{course.description}</p>
      </div>
      <div>
        <MarketingCourseSectionLabel accent={A}>{m("learnSectionLabel")}</MarketingCourseSectionLabel>
        <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 16 }}>{m("headingFromZero")}</h2>
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {course.learn.map((item, i) => (
            <div key={i} style={{ padding: "12px 14px", borderRadius: 10, background: ABg, border: ABorder }}>
              <span style={{ fontSize: 13, color: "#ccc", lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: "24px", borderRadius: 14, background: "#0d0d1a", border: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: A, textTransform: "uppercase", marginBottom: 10 }}>{m("instructorSectionLabel")}</div>
        <div style={{ fontSize: 15, fontWeight: 700 }}>{course.instructor.name}</div>
        <p style={{ fontSize: 13, color: "#777", marginTop: 8, lineHeight: 1.6 }}>{course.instructor.bio}</p>
      </div>
    </div>
  );
}
