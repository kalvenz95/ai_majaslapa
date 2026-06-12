"use client";

import Image from "next/image";
import { Reveal } from "@/components/home/Reveal";
import { useTranslations } from "next-intl";
import { Share2, Globe, PhoneCall } from "lucide-react";

type Card = { label: string; range: string; desc: string; math: string };

const icons = [Share2, Globe, PhoneCall];
const themes = [
  { color: "#8B7BFF", glow: "139,123,255", img: "/ai/income-social.jpg" },
  { color: "#34D9C3", glow: "52,217,195", img: "/ai/income-web.jpg" },
  { color: "#FFB86B", glow: "255,184,107", img: "/ai/income-voice.jpg" },
];

export default function IncomeV2() {
  const t = useTranslations("AILaunchpad");
  const cards = (t.raw("cards") ?? []) as Card[];

  return (
    <section style={{ padding: "70px 0 140px", background: "var(--bg)" }}>
      <div className="lp-container" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px" }}>
        <Reveal>
          {/* Dark immersive panel */}
          <div style={{
            position: "relative", overflow: "hidden",
            borderRadius: 34, background: "#0A0A0E",
            border: "1px solid rgba(255,255,255,0.08)",
            padding: "clamp(44px, 6vw, 84px) clamp(24px, 5vw, 72px)",
            boxShadow: "0 50px 120px -40px rgba(13,13,20,0.55)",
          }}>
            {/* glows */}
            <div aria-hidden style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background:
                "radial-gradient(46% 60% at 85% 0%, rgba(109,94,243,0.22), transparent 65%)," +
                "radial-gradient(40% 55% at 5% 100%, rgba(0,191,165,0.14), transparent 62%)",
            }} />

            {/* Header */}
            <div style={{ maxWidth: 700, margin: "0 auto 60px", textAlign: "center", position: "relative" }}>
              <span className="v2-eyebrow v2-eyebrow--light">Ienākumu piemēri</span>
              <h2 className="v2-h2" style={{ fontSize: "clamp(27px, 5.5vw, 64px)", color: "#fff", margin: "18px 0 20px", overflowWrap: "break-word" }}>
                {t("titleA")}<span className="v2-grad">{t("titleB")}</span>
              </h2>
              <p style={{ fontSize: 17, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: 520, margin: "0 auto" }}>
                {t("kicker")}
              </p>
            </div>

            {/* Income cards */}
            <div className="income-v2-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, position: "relative" }}>
              {cards.map((c, i) => {
                const th = themes[i] ?? themes[0];
                const Icon = icons[i] ?? Share2;
                return (
                  <div key={c.label} className="v2-glass income-card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                    {/* AI image header */}
                    <div style={{ position: "relative", height: 132, overflow: "hidden" }}>
                      <Image
                        src={th.img}
                        alt=""
                        fill
                        sizes="(max-width: 920px) 100vw, 33vw"
                        className="income-card-img"
                        style={{ objectFit: "cover" }}
                      />
                      <div aria-hidden style={{ position: "absolute", inset: 0, mixBlendMode: "soft-light", background: `rgba(${th.glow},0.45)` }} />
                      <div aria-hidden style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(10,10,14,0.1) 0%, rgba(10,10,14,0.5) 55%, #0C0C12 100%)" }} />
                      <div style={{
                        position: "absolute", left: 26, bottom: 14,
                        display: "flex", alignItems: "center", gap: 12,
                      }}>
                        <span style={{
                          width: 44, height: 44, borderRadius: 13, flexShrink: 0,
                          background: `linear-gradient(150deg, rgba(${th.glow},0.95), rgba(${th.glow},0.7))`,
                          border: "1px solid rgba(255,255,255,0.25)",
                          boxShadow: `0 12px 28px -8px rgba(${th.glow},0.7), inset 0 1px 0 rgba(255,255,255,0.4)`,
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                          <Icon size={19} color="#0A0A0E" strokeWidth={2} />
                        </span>
                        <span style={{ fontSize: 14, fontWeight: 700, color: "#fff", fontFamily: "var(--font-sans)", letterSpacing: "-0.01em", textShadow: "0 2px 12px rgba(0,0,0,0.6)" }}>
                          {c.label}
                        </span>
                      </div>
                    </div>

                    <div style={{ padding: "24px 28px 30px", display: "flex", flexDirection: "column", gap: 16 }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                        <span style={{ fontSize: "clamp(26px, 3vw, 34px)", fontWeight: 700, fontFamily: "var(--font-sans)", letterSpacing: "-0.04em", color: th.color, lineHeight: 1.05 }}>
                          {c.range}
                        </span>
                      </div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 4 }}>{t("perMonth")}</div>
                    </div>

                    <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, margin: 0, flex: 1 }}>
                      {c.desc}
                    </p>

                    {/* Math chip — concrete arithmetic builds belief */}
                    <div style={{
                      fontFamily: "JetBrains Mono, monospace", fontSize: 11.5, fontWeight: 500,
                      color: `rgba(${th.glow},0.95)`,
                      background: `rgba(${th.glow},0.08)`,
                      border: `1px solid rgba(${th.glow},0.22)`,
                      borderRadius: 10, padding: "10px 13px",
                    }}>
                      {c.math}
                    </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Disclaimer */}
            <p style={{ textAlign: "center", marginTop: 36, fontSize: 12.5, color: "rgba(255,255,255,0.32)", position: "relative" }}>
              {t("footer")}
            </p>
          </div>
        </Reveal>
      </div>

      <style>{`
        .income-card-img { transition: transform 0.5s cubic-bezier(0.16,1,0.3,1); transform: scale(1.02); }
        .income-card:hover .income-card-img { transform: scale(1.08); }
        @media (max-width: 920px) {
          .income-v2-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
