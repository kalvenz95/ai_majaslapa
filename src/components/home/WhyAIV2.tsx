"use client";

import Image from "next/image";
import { Reveal } from "@/components/home/Reveal";
import { Clapperboard, Globe, Workflow, Mic2, ArrowRight } from "lucide-react";

/** What you can sell — the four AI service directions. */
const services = [
  {
    Icon: Clapperboard,
    title: "AI saturs",
    desc: "Faceless video, reklāmu vizuāļi un sociālo tīklu saturs uzņēmumiem.",
    color: "#8B7BFF",
    glow: "139,123,255",
    img: "/ai/content.jpg",
  },
  {
    Icon: Globe,
    title: "AI mājaslapas",
    desc: "Modernas mājaslapas, kas piesaista klientus — bez koda zināšanām.",
    color: "#34D9C3",
    glow: "52,217,195",
    img: "/ai/websites.jpg",
  },
  {
    Icon: Workflow,
    title: "Automatizācija",
    desc: "WhatsApp, e-pasti un lead apstrāde — automātiski, bez cilvēka iesaistes.",
    color: "#FFB86B",
    glow: "255,184,107",
    img: "/ai/automation.jpg",
  },
  {
    Icon: Mic2,
    title: "AI balss aģenti",
    desc: "Zvanu pieņemšana un rezervācijas 24/7 — ar AI balss tehnoloģiju.",
    color: "#8B7BFF",
    glow: "139,123,255",
    img: "/ai/voice.jpg",
  },
];

export default function WhyAIV2() {
  return (
    <section id="about" style={{ background: "var(--bg)", padding: "40px 0 70px" }}>
      <div className="lp-container" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
        {/* Dark inset panel — rounded, floats on the light page */}
        <div style={{
          position: "relative", overflow: "hidden",
          borderRadius: 40, background: "#0A0A0E",
          border: "1px solid rgba(255,255,255,0.08)",
          padding: "clamp(56px, 7vw, 110px) clamp(24px, 5vw, 80px)",
          boxShadow: "0 60px 140px -48px rgba(13,13,20,0.55)",
        }}>
          {/* Glows + grid */}
          <div aria-hidden style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background:
              "radial-gradient(42% 50% at 12% 8%, rgba(109,94,243,0.22), transparent 65%)," +
              "radial-gradient(36% 44% at 92% 88%, rgba(0,191,165,0.13), transparent 62%)",
          }} />
          <div aria-hidden style={{
            position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.5,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(70% 70% at 50% 40%, #000 0%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(70% 70% at 50% 40%, #000 0%, transparent 80%)",
          }} />

          <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header — editorial split: heading left, lead right */}
        <div className="whyai-v2-head" style={{ display: "grid", gridTemplateColumns: "1.25fr 0.75fr", gap: 48, alignItems: "end", marginBottom: 64 }}>
          <div>
            <Reveal>
              <span className="v2-eyebrow v2-eyebrow--light">Kāpēc AI prasmes</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="v2-h2" style={{ fontSize: "clamp(38px, 5.8vw, 76px)", color: "#fff", margin: "18px 0 0", maxWidth: "13ch" }}>
                Ko tu iegūsi <span style={{ color: "#A89DFF" }}>Chademy?</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <p style={{ fontSize: 17, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: 0, paddingBottom: 8 }}>
              Ne tikai teoriju. Tu soli pa solim izveido pakalpojumu, portfolio un iegūsti sistēmu klientu piesaistei.
            </p>
          </Reveal>
        </div>

        {/* 4 glass cards */}
        <div className="whyai-v2-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {services.map((s, i) => (
            <Reveal key={s.title} delay={0.06 * i}>
              <div className="v2-glass whyai-card" style={{ padding: 0, height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                {/* AI image header — gradient overlay + colour tint keep text legible */}
                <div style={{ position: "relative", height: 152, overflow: "hidden" }}>
                  <Image
                    src={s.img}
                    alt=""
                    fill
                    sizes="(max-width: 560px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="whyai-card-img"
                    style={{ objectFit: "cover" }}
                  />
                  {/* colour treatment */}
                  <div aria-hidden style={{ position: "absolute", inset: 0, mixBlendMode: "soft-light", background: `rgba(${s.glow},0.45)` }} />
                  {/* dark fade into the card body */}
                  <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,10,14,0.15) 0%, rgba(10,10,14,0.55) 55%, #0A0A0E 100%)" }} />
                  {/* floating icon badge */}
                  <div style={{
                    position: "absolute", left: 22, bottom: 16,
                    width: 48, height: 48, borderRadius: 14,
                    background: `linear-gradient(150deg, rgba(${s.glow},0.95) 0%, rgba(${s.glow},0.7) 100%)`,
                    border: "1px solid rgba(255,255,255,0.25)",
                    boxShadow: `0 12px 30px -8px rgba(${s.glow},0.7), inset 0 1px 0 rgba(255,255,255,0.4)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <s.Icon size={22} color="#0A0A0E" strokeWidth={2} />
                  </div>
                </div>

                <div style={{ padding: "20px 24px 28px" }}>
                  <h3 style={{ fontSize: 19, fontWeight: 700, fontFamily: "var(--font-sans)", letterSpacing: "-0.02em", color: "#fff", margin: "0 0 9px" }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.65, margin: 0 }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal delay={0.2}>
          <div style={{ textAlign: "center", marginTop: 56 }}>
            <a
              href="#courses"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                fontSize: 15.5, fontWeight: 700, color: "#fff",
                padding: "15px 28px", borderRadius: 14,
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.16)",
                backdropFilter: "blur(8px)", textDecoration: "none",
                transition: "background 0.2s ease, border-color 0.2s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "rgba(255,255,255,0.11)";
                el.style.borderColor = "rgba(255,255,255,0.3)";
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = "rgba(255,255,255,0.06)";
                el.style.borderColor = "rgba(255,255,255,0.16)";
                el.style.transform = "";
              }}
            >
              Skatīt kursus <ArrowRight size={16} />
            </a>
          </div>
        </Reveal>
          </div>
        </div>
      </div>

      <style>{`
        .whyai-card-img { transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); transform: scale(1.02); }
        .whyai-card:hover .whyai-card-img { transform: scale(1.08); }
        @media (max-width: 1024px) {
          .whyai-v2-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .whyai-v2-head { grid-template-columns: 1fr !important; gap: 18px !important; align-items: start !important; margin-bottom: 44px !important; }
        }
        @media (max-width: 560px) {
          .whyai-v2-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
