"use client";

import Image from "next/image";
import { Reveal } from "@/components/home/Reveal";
import { Mic, Check } from "lucide-react";

/* ── AI voice agent — crafted mockup kept as-is ─────────────────── */

function VoiceMock() {
  return (
    <div style={{ width: "66%", borderRadius: 16, background: "#0D0D14", border: "1px solid rgba(255,255,255,0.12)", padding: "16px 18px", boxShadow: "0 18px 44px -14px rgba(13,13,20,0.5)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
        <span style={{ width: 30, height: 30, borderRadius: 999, background: "linear-gradient(135deg, var(--accent), #8B7BFF)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Mic size={13} color="#fff" />
        </span>
        <div>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: "#fff" }}>Ienākošais zvans</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 8.5, color: "rgba(255,255,255,0.45)" }}>
            <span className="v2-pulse" style={{ width: 5, height: 5, borderRadius: 999, background: "#28C840", display: "inline-block" }} />
            AI atbild · 0:18
          </div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 2.5, height: 22 }}>
        {[0.4, 0.8, 0.55, 1, 0.65, 0.4, 0.9, 0.6, 0.95, 0.45, 0.7, 0.5].map((s, i) => (
          <span key={i} className="v2-wave-bar" style={{ flex: 1, height: "100%", borderRadius: 2, background: "linear-gradient(180deg, var(--accent), var(--accent-2))", animationDelay: `${i * 0.09}s`, transform: `scaleY(${s})` }} />
        ))}
      </div>
    </div>
  );
}

/* ── Projects data — photos themed per card; voice keeps its mockup ─ */

type Project = {
  tag: string;
  title: string;
  desc: string;
  glow: string;
  img?: string;
  Mock?: () => React.ReactElement;
};

const projects: Project[] = [
  { tag: "Mājaslapa", title: "AI mājaslapa uzņēmumam", desc: "Moderna lapa ar AI integrācijām — gatava dažu dienu laikā.", glow: "109,94,243", img: "/ai/card-web.jpg" },
  { tag: "Sociālie tīkli", title: "Mēneša satura pakete", desc: "Vizuāļi, teksti un publicēšanas grafiks, veidots ar AI rīkiem.", glow: "0,191,165", img: "/ai/card-social.jpg" },
  { tag: "Automatizācija", title: "WhatsApp automatizācija", desc: "Automātiskas atbildes un pieteikumu apstrāde uzņēmumam.", glow: "0,191,165", img: "/ai/card-chat.jpg" },
  { tag: "Balss AI", title: "AI balss aģents", desc: "Zvanu pieņemšana un rezervācijas — bez cilvēka iesaistes.", glow: "109,94,243", Mock: VoiceMock },
  { tag: "Reklāma", title: "AI reklāmu vizuāļi", desc: "Bildes un video reklāmām, kas piesaista uzmanību un pārdod.", glow: "255,184,107", img: "/ai/card-ad.jpg" },
  { tag: "Portfolio", title: "Tavs personīgais portfolio", desc: "Darbu krājums, kas palīdz iegūt pirmos klientus jau kursa laikā.", glow: "255,184,107", img: "/ai/card-portfolio.jpg" },
];

export default function ProjectsV2() {
  return (
    <section id="examples" style={{ padding: "140px 0", background: "#fff", borderTop: "1px solid var(--line)" }}>
      <div className="lp-container" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px" }}>
        {/* Header */}
        <div style={{ maxWidth: 720, margin: "0 auto 72px", textAlign: "center" }}>
          <Reveal><span className="v2-eyebrow">Reāli projekti</span></Reveal>
          <Reveal delay={0.08}>
            <h2 className="v2-h2" style={{ fontSize: "clamp(40px, 6.5vw, 80px)", color: "var(--ink)", margin: "18px 0 22px" }}>
              Ko iespējams <span style={{ color: "var(--teal-ink)" }}>izveidot</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p style={{ fontSize: 18, color: "var(--ink-3)", lineHeight: 1.7, maxWidth: 520, margin: "0 auto" }}>
              Reāli projekti, kurus vari piedāvāt klientiem jau pirmajos mēnešos.
            </p>
          </Reveal>
        </div>

        {/* Cards */}
        <div className="projects-v2-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={0.05 * (i % 3)}>
              <article
                className="projv2-card"
                style={{
                  borderRadius: 24, overflow: "hidden", height: "100%",
                  background: "var(--bg)", border: "1px solid var(--line)",
                  display: "flex", flexDirection: "column",
                  boxShadow: "var(--shadow-sm)",
                  transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, border-color 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "translateY(-6px)";
                  el.style.borderColor = `rgba(${p.glow},0.4)`;
                  el.style.boxShadow = `0 30px 70px -24px rgba(${p.glow},0.45), 0 10px 24px -10px rgba(17,17,17,0.1)`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.transform = "";
                  el.style.borderColor = "var(--line)";
                  el.style.boxShadow = "var(--shadow-sm)";
                }}
              >
                {/* Visual header — themed photo, or the crafted voice mockup */}
                {p.img ? (
                  <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden", borderBottom: "1px solid var(--line)" }}>
                    <Image
                      src={p.img}
                      alt={p.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="projv2-img"
                      style={{ objectFit: "cover" }}
                    />
                    {/* colour treatment — ties photo to the card's accent */}
                    <div aria-hidden style={{ position: "absolute", inset: 0, mixBlendMode: "soft-light", background: `rgba(${p.glow},0.45)` }} />
                    {/* subtle bottom fade for depth */}
                    <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(17,17,17,0) 52%, rgba(17,17,17,0.18) 100%)" }} />
                  </div>
                ) : (
                  <div style={{
                    aspectRatio: "16/10", display: "flex", alignItems: "center", justifyContent: "center",
                    position: "relative", overflow: "hidden",
                    background: `radial-gradient(90% 110% at 50% 115%, rgba(${p.glow},0.22), transparent 70%), linear-gradient(180deg, var(--bg-2), var(--bg))`,
                    borderBottom: "1px solid var(--line)",
                    padding: 18,
                  }}>
                    {p.Mock ? <p.Mock /> : null}
                  </div>
                )}

                {/* Body */}
                <div style={{ padding: "22px 24px 26px", display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                  <span style={{
                    alignSelf: "flex-start",
                    fontFamily: "JetBrains Mono, monospace", fontSize: 9.5, fontWeight: 600,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    color: `rgb(${p.glow.split(",").map((n, j) => j < 3 ? Math.round(Number(n) * 0.82) : n).join(",")})`,
                    background: `rgba(${p.glow},0.09)`, border: `1px solid rgba(${p.glow},0.22)`,
                    borderRadius: 999, padding: "4px 11px", marginBottom: 6,
                  }}>
                    {p.tag}
                  </span>
                  <h3 style={{ fontSize: 18, fontWeight: 700, fontFamily: "var(--font-sans)", letterSpacing: "-0.02em", color: "var(--ink)", margin: 0 }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: 13.5, color: "var(--ink-3)", lineHeight: 1.6, margin: 0 }}>
                    {p.desc}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Reassure strip */}
        <Reveal delay={0.15}>
          <div style={{ display: "flex", justifyContent: "center", gap: 26, flexWrap: "wrap", marginTop: 48 }}>
            {["Veidots kursa laikā", "Gatavs rādīt klientiem", "Ar mentoru atbalstu"].map((r) => (
              <span key={r} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--ink-3)", fontWeight: 500 }}>
                <Check size={13} strokeWidth={3} color="var(--accent-2)" /> {r}
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      <style>{`
        .projv2-img { transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); transform: scale(1.02); }
        .projv2-card:hover .projv2-img { transform: scale(1.08); }
        @media (max-width: 1024px) {
          .projects-v2-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .projects-v2-grid { grid-template-columns: 1fr !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .projv2-img { transition: none; }
        }
      `}</style>
    </section>
  );
}
