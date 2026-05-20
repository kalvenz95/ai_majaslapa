"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

type TrackCopy = {
  num: string;
  level: string;
  title: string;
  desc: string;
  skills: string[];
  earn: string;
  earnSuffix: string;
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
            <p style={{ fontSize: 18, color: "var(--ink-2)", maxWidth: 640, lineHeight: 1.5 }}>{t("lead")}</p>
          </div>
        </div>

        <div className="lp-three-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {tracksRaw.map((tr) => (
            <article
              key={tr.title}
              style={{
                border: "1px solid var(--line)",
                borderRadius: 28,
                background: "var(--bg-1)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s ease, border-color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--line-2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--line)";
              }}
            >
              <div style={{ aspectRatio: "5/3", position: "relative", overflow: "hidden", background: "var(--bg-3)" }}>
                <img src={tr.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--bg-1) 0%, transparent 40%)", pointerEvents: "none" }} />
                <span style={{ position: "absolute", top: 18, left: 18, zIndex: 2, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(10px)", color: "white", fontFamily: "JetBrains Mono, monospace", fontSize: 11, padding: "6px 12px", borderRadius: 999, letterSpacing: "0.1em", fontWeight: 600 }}>
                  {tr.num}
                </span>
                <span style={{ position: "absolute", top: 18, right: 18, zIndex: 2, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(10px)", color: "white", fontSize: 11, padding: "6px 12px", borderRadius: 999, fontWeight: 500 }}>
                  {tr.level}
                </span>
              </div>
              <div style={{ padding: "24px 26px 26px", flex: 1, display: "flex", flexDirection: "column" }}>
                <h3 style={{ fontSize: 26, letterSpacing: "-0.02em", fontWeight: 600, margin: "0 0 10px", lineHeight: 1.1 }}>{tr.title}</h3>
                <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.55, margin: "0 0 22px" }}>{tr.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
                  {tr.skills.map((s) => (
                    <span key={s} style={{ padding: "5px 11px", borderRadius: 999, fontSize: 11, border: "1px solid var(--line-2)", color: "var(--ink-2)", fontFamily: "JetBrains Mono, monospace" }}>
                      {s}
                    </span>
                  ))}
                </div>
                <div style={{ marginTop: "auto", paddingTop: 18, borderTop: "1px solid var(--line)" }}>
                  <Link href={tr.link} style={{ fontSize: 13, color: "var(--accent)", fontWeight: 600, display: "inline-flex", gap: 6, alignItems: "center", textDecoration: "none" }}>
                    {t("viewCourse")}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
