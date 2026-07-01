"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Reveal } from "@/components/home/Reveal";
import { ArrowUpRight } from "lucide-react";

/* ── Website samples — real projects we've built ───────────────────── */
const SITES = [
  {
    title: "La Skrundo",
    niche: "Itāļu kafejnīca un restorāns",
    img: "/portfolio/la-skrundo.png",
    url: "https://la-skrundo.vercel.app",
    accent: "#00BFA5",
    glow: "0,191,165",
  },
  {
    title: "Dessert Eagle",
    niche: "Premium auto detailing studija",
    img: "/portfolio/dessert-deagle.png",
    url: "https://dessert-deagle-site.vercel.app",
    accent: "#6D5EF3",
    glow: "109,94,243",
  },
  {
    title: "Pity Store",
    niche: "Luksusa mājdzīvnieku zīmols",
    img: "/portfolio/pity-store.png",
    url: "https://pity-store.vercel.app/",
    accent: "#FFB86B",
    glow: "255,184,107",
  },
];

function SiteCard({ site, index }: { site: (typeof SITES)[number]; index: number }) {
  const [hover, setHover] = useState(false);
  return (
    <Reveal delay={0.05 * index} style={{ height: "100%" }}>
      <a
        href={site.url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          borderRadius: 22,
          overflow: "hidden",
          textDecoration: "none",
          background: "var(--bg-1)",
          border: `1px solid ${hover ? `rgba(${site.glow},0.5)` : "var(--line)"}`,
          boxShadow: hover
            ? `0 34px 80px -30px rgba(${site.glow},0.5), 0 10px 24px -12px rgba(17,17,17,0.12)`
            : "var(--shadow-sm)",
          transform: hover ? "translateY(-6px)" : "translateY(0)",
          transition: "transform 0.34s cubic-bezier(0.16,1,0.3,1), box-shadow 0.34s ease, border-color 0.3s ease",
        }}
      >
        {/* Browser-framed screenshot */}
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "10px 14px", borderBottom: "1px solid var(--line)", background: "var(--bg-2)" }}>
            <span style={{ width: 9, height: 9, borderRadius: 999, background: "#FF5F57" }} />
            <span style={{ width: 9, height: 9, borderRadius: 999, background: "#FEBC2E" }} />
            <span style={{ width: 9, height: 9, borderRadius: 999, background: "#28C840" }} />
            <span style={{ marginLeft: 8, fontSize: 10.5, color: "var(--ink-4)", fontFamily: "JetBrains Mono, monospace", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {site.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
            </span>
          </div>
          <div style={{ position: "relative", aspectRatio: "16/10", overflow: "hidden", background: "var(--bg-2)" }}>
            <Image
              src={site.img}
              alt={`${site.title} — ${site.niche}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{ objectFit: "cover", objectPosition: "top", transform: hover ? "scale(1.04)" : "scale(1)", transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)" }}
            />
            {/* hover view pill */}
            <span style={{
              position: "absolute", top: 12, right: 12,
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 11.5, fontWeight: 700, color: "#fff",
              padding: "6px 12px", borderRadius: 999,
              background: `rgba(${site.glow},0.92)`, backdropFilter: "blur(4px)",
              boxShadow: `0 8px 20px -6px rgba(${site.glow},0.7)`,
              opacity: hover ? 1 : 0, transform: hover ? "translateY(0)" : "translateY(-6px)",
              transition: "opacity 0.25s ease, transform 0.25s ease",
            }}>
              Apskatīt <ArrowUpRight size={13} strokeWidth={2.6} />
            </span>
          </div>
        </div>

        {/* footer */}
        <div style={{ padding: "18px 20px 20px", display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ width: 9, height: 9, borderRadius: 999, flexShrink: 0, background: site.accent, boxShadow: `0 0 10px ${site.accent}` }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "var(--font-sans)", letterSpacing: "-0.02em", color: "var(--ink)", lineHeight: 1.2 }}>{site.title}</div>
            <div style={{ fontSize: 12.5, color: "var(--ink-3)", marginTop: 2 }}>{site.niche}</div>
          </div>
          <ArrowUpRight size={18} strokeWidth={2.2} color={hover ? site.accent : "var(--ink-4)"} style={{ flexShrink: 0, transition: "color 0.25s ease" }} />
        </div>
      </a>
    </Reveal>
  );
}

/* ── Section ───────────────────────────────────────────────────────── */
export default function DirectionDemosV2() {
  const t = useTranslations("DirectionDemos");

  return (
    <section style={{ padding: "20px 0 140px", background: "var(--bg)" }}>
      <div className="lp-container" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px" }}>
        {/* Header */}
        <div className="dd-head" style={{ display: "grid", gridTemplateColumns: "1.3fr 0.7fr", gap: 48, alignItems: "end", marginBottom: 56 }}>
          <div>
            <Reveal><span className="v2-eyebrow">{t("kicker")}</span></Reveal>
            <Reveal delay={0.08}>
              <h2 className="v2-h2" style={{ fontSize: "clamp(34px, 5vw, 62px)", color: "var(--ink)", margin: "18px 0 0", maxWidth: "16ch" }}>
                {t("titleA")}<span className="v2-grad">{t("titleB")}</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <p style={{ fontSize: 16, color: "var(--ink-3)", lineHeight: 1.7, margin: 0, paddingBottom: 8 }}>
              {t("lead")}
            </p>
          </Reveal>
        </div>

        {/* Website samples grid */}
        <div className="dd-sites-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, alignItems: "stretch" }}>
          {SITES.map((s, i) => (
            <SiteCard key={s.title} site={s} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .dd-sites-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 980px) {
          .dd-head { grid-template-columns: 1fr !important; gap: 16px !important; align-items: start !important; margin-bottom: 40px !important; }
        }
        @media (max-width: 680px) {
          .dd-sites-grid { grid-template-columns: 1fr !important; max-width: 440px; margin: 0 auto; }
        }
      `}</style>
    </section>
  );
}
