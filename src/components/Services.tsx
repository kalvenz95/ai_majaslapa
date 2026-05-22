"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type TrackCopy = {
  num: string;
  level: string;
  badge?: string;
  title: string;
  desc: string;
  skills: string[];
  earn: string;
  earnSuffix: string;
  cta?: string;
  link: string;
  img?: string;
};

const DEFAULT_IMGS = [
  "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=900&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=900&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=900&auto=format&fit=crop&q=80",
];

export default function Services() {
  const t = useTranslations("Services");
  const tracksRaw = ((t.raw("tracks") ?? []) as TrackCopy[]).map((tr, idx) => ({
    ...tr,
    img: tr.img ?? DEFAULT_IMGS[idx],
  }));

  return (
    <section id="courses" className="lp-section" style={{ padding: "120px 0", position: "relative", borderTop: "1px solid var(--line)", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 50% 70% at 100% 50%, color-mix(in oklab, var(--accent) 12%, transparent), transparent 65%), radial-gradient(ellipse 35% 35% at 15% 15%, color-mix(in oklab, var(--accent) 5%, transparent), transparent 55%)" }} />

      <div className="lp-container" style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 1 }}>
        <div className="lp-header-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "end", marginBottom: 64 }}>
          <div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.15em", color: "var(--ink-3)", textTransform: "uppercase" as const }}>
              <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--accent)" }} />
              {t("kicker")}
            </span>
            <h2 style={{ fontSize: "clamp(40px, 6vw, 84px)", lineHeight: 1.05, letterSpacing: "-0.035em", fontWeight: 600, margin: "16px 0 0", maxWidth: "14ch" }}>
              {t("titleA")}
              <span style={{ background: "linear-gradient(120deg, var(--accent), color-mix(in oklab, var(--accent) 70%, white))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", fontStyle: "italic", fontFamily: "Fraunces, Georgia, serif", fontWeight: 500 }}>
                {t("titleB")}
              </span>
            </h2>
          </div>
          <div style={{ paddingBottom: 8 }}>
            <p style={{ fontSize: 18, color: "var(--ink-2)", maxWidth: 640, lineHeight: 1.55 }}>{t("lead")}</p>
          </div>
        </div>

        <div className="lp-three-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {tracksRaw.map((tr, idx) => {
            const isPremium = idx === 2;
            const isPopular = idx === 1;

            return (
              <article
                key={tr.title}
                style={{
                  border: `1px solid ${isPremium ? "color-mix(in oklab, var(--accent) 30%, transparent)" : "var(--line)"}`,
                  borderRadius: 28,
                  background: isPremium
                    ? "linear-gradient(180deg, color-mix(in oklab, var(--accent) 7%, var(--bg-1)) 0%, var(--bg-1) 55%)"
                    : "var(--bg-1)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  transition: "transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-5px)";
                  if (isPremium) {
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 24px 64px -16px color-mix(in oklab, var(--accent) 20%, transparent)";
                  } else {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--line-2)";
                  }
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "";
                  (e.currentTarget as HTMLElement).style.boxShadow = "";
                  (e.currentTarget as HTMLElement).style.borderColor = isPremium
                    ? "color-mix(in oklab, var(--accent) 30%, transparent)"
                    : "var(--line)";
                }}
              >
                {/* Image header */}
                <div style={{ aspectRatio: "16/9", position: "relative", overflow: "hidden", background: "var(--bg-3)", flexShrink: 0 }}>
                  <img
                    src={tr.img}
                    alt=""
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    loading="lazy"
                  />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--bg-1) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)", pointerEvents: "none" }} />
                  {isPremium && (
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, color-mix(in oklab, var(--accent) 15%, transparent) 0%, transparent 60%)", pointerEvents: "none" }} />
                  )}
                  <span style={{ position: "absolute", top: 16, left: 16, zIndex: 2, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(12px)", color: "white", fontFamily: "JetBrains Mono, monospace", fontSize: 11, padding: "5px 10px", borderRadius: 999, letterSpacing: "0.08em", fontWeight: 700 }}>
                    {tr.num}
                  </span>
                </div>

                {/* Card content */}
                <div style={{ padding: "22px 24px 26px", flex: 1, display: "flex", flexDirection: "column", gap: 0 }}>

                  {/* Badge */}
                  {tr.badge && (
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      padding: "4px 10px",
                      borderRadius: 999,
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.07em",
                      textTransform: "uppercase" as const,
                      fontFamily: "JetBrains Mono, monospace",
                      background: isPremium ? "var(--accent)" : isPopular ? "color-mix(in oklab, var(--accent) 14%, transparent)" : "color-mix(in oklab, var(--accent) 10%, transparent)",
                      color: isPremium ? "var(--accent-ink)" : "var(--accent)",
                      border: isPremium ? "none" : "1px solid color-mix(in oklab, var(--accent) 28%, transparent)",
                      alignSelf: "flex-start",
                      marginBottom: 14,
                    }}>
                      {tr.badge}
                    </span>
                  )}

                  {/* Title */}
                  <h3 style={{ fontSize: 22, letterSpacing: "-0.025em", fontWeight: 700, margin: "0 0 7px", lineHeight: 1.15, color: "var(--ink)" }}>
                    {tr.title}
                  </h3>

                  {/* Subtitle */}
                  <p style={{ fontSize: 13.5, color: "var(--ink-3)", lineHeight: 1.5, margin: "0 0 18px" }}>
                    {tr.desc}
                  </p>

                  {/* Income range */}
                  <div style={{ display: "flex", alignItems: "baseline", gap: 5, marginBottom: 22, padding: "11px 14px", background: "var(--bg-2)", borderRadius: 10, border: `1px solid ${isPremium ? "color-mix(in oklab, var(--accent) 20%, transparent)" : "var(--line)"}` }}>
                    <span style={{ fontSize: 20, fontWeight: 700, color: "var(--accent)", letterSpacing: "-0.03em" }}>{tr.earn}</span>
                    <span style={{ fontSize: 12, color: "var(--ink-3)", fontFamily: "JetBrains Mono, monospace" }}>{tr.earnSuffix}</span>
                  </div>

                  {/* Benefit bullets */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 24 }}>
                    {tr.skills.map((s) => (
                      <div key={s} style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                        <svg style={{ flexShrink: 0, marginTop: 2 }} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.8">
                          <polyline points="20,6 9,17 4,12" />
                        </svg>
                        <span style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.45 }}>{s}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href={tr.link}
                    style={{
                      marginTop: "auto",
                      display: "block",
                      textAlign: "center",
                      textDecoration: "none",
                      padding: "12px 16px",
                      borderRadius: 13,
                      fontSize: 13.5,
                      fontWeight: 600,
                      letterSpacing: "-0.01em",
                      background: isPremium ? "var(--accent)" : "var(--bg-2)",
                      color: isPremium ? "var(--accent-ink)" : "var(--ink)",
                      border: isPremium ? "none" : "1px solid var(--line-2)",
                      transition: "filter 0.15s ease, background 0.15s ease, transform 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (isPremium) {
                        (e.currentTarget as HTMLAnchorElement).style.filter = "brightness(1.08)";
                      } else {
                        (e.currentTarget as HTMLAnchorElement).style.background = "var(--bg-3)";
                        (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--accent)";
                        (e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.filter = "";
                      (e.currentTarget as HTMLAnchorElement).style.background = isPremium ? "var(--accent)" : "var(--bg-2)";
                      (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--line-2)";
                      (e.currentTarget as HTMLAnchorElement).style.color = isPremium ? "var(--accent-ink)" : "var(--ink)";
                    }}
                  >
                    {tr.cta ?? t("viewCourse")}
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
