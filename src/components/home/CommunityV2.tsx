"use client";

import { Reveal } from "@/components/home/Reveal";
import { AnimatedNumber } from "@/components/AnimatedNumber";
import { Magnetic } from "@/components/Magnetic";
import { Link } from "@/i18n/navigation";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

/** Photos only — quote copy comes from the Community namespace, zipped by index. */
const quotePhotos = [
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&q=85&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&q=85&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&q=85&fit=crop&crop=faces",
];

/** Only the middle stat is accented. */
const statAccent = [false, true, false];

type Quote = { name: string; role: string; text: string; amt: string };
type Stat = { val: string; label: string };

function Stars() {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#F4B942" stroke="none">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

export default function CommunityV2() {
  const t = useTranslations("Community");
  const quotes = ((t.raw("quotes") ?? []) as Quote[]).map((q, i) => ({
    ...q,
    photo: quotePhotos[i],
  }));
  const stats = ((t.raw("stats") ?? []) as Stat[]).map((s, i) => ({
    ...s,
    accent: statAccent[i],
  }));
  const communityPerks = (t.raw("perks") ?? []) as string[];

  return (
    <section id="results" style={{ padding: "140px 0", background: "var(--bg)", borderTop: "1px solid var(--line)" }}>
      <div className="lp-container" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px" }}>
        {/* Header */}
        <div style={{ maxWidth: 700, margin: "0 auto 64px", textAlign: "center" }}>
          <Reveal><span className="v2-eyebrow">{t("kicker")}</span></Reveal>
          <Reveal delay={0.08}>
            <h2 className="v2-h2" style={{ fontSize: "clamp(40px, 6.5vw, 80px)", color: "var(--ink)", margin: "18px 0 22px" }}>
              {t("titleA")}<span style={{ color: "var(--accent)" }}>{t("titleB")}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p style={{ fontSize: 18, color: "var(--ink-3)", lineHeight: 1.7, maxWidth: 520, margin: "0 auto" }}>
              {t("lead")}
            </p>
          </Reveal>
        </div>

        {/* Big stats */}
        <Reveal delay={0.1}>
          <div className="comm-v2-stats" style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
            borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)",
            marginBottom: 64,
          }}>
            {stats.map((s, i) => (
              <div key={i} className="comm-v2-stat" style={{ padding: "36px 24px", textAlign: "center", borderRight: i < 2 ? "1px solid var(--line)" : "none" }}>
                <AnimatedNumber
                  value={s.val}
                  style={{ display: "block", fontSize: "clamp(40px, 5vw, 56px)", fontWeight: 700, fontFamily: "var(--font-sans)", letterSpacing: "-0.05em", color: s.accent ? "var(--accent)" : "var(--ink)", lineHeight: 1 }}
                />
                <div style={{ fontSize: 13, color: "var(--ink-3)", marginTop: 10 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Quote cards */}
        <div className="comm-v2-quotes" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 72 }}>
          {quotes.map((q, i) => (
            <Reveal key={q.name} delay={0.06 * i}>
              <figure className="lp-card" style={{
                margin: 0, height: "100%",
                background: "#fff", border: "1px solid var(--line)", borderRadius: 22,
                padding: "26px 26px 22px", display: "flex", flexDirection: "column", gap: 15,
              }}>
                <Stars />
                <blockquote style={{ margin: 0, fontSize: 14.5, color: "var(--ink-2)", lineHeight: 1.7 }}>
                  “{q.text}”
                </blockquote>
                <figcaption style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: 16, borderTop: "1px solid var(--line)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ width: 40, height: 40, borderRadius: 999, flexShrink: 0, padding: 2, background: "linear-gradient(135deg, var(--accent), var(--accent-2))" }}>
                      <img src={q.photo} alt={q.name} width={36} height={36} loading="lazy"
                        style={{ width: "100%", height: "100%", borderRadius: 999, objectFit: "cover", display: "block", border: "2px solid #fff" }} />
                    </span>
                    <span>
                      <span style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>{q.name}</span>
                      <span style={{ display: "block", fontSize: 11, color: "var(--ink-3)", marginTop: 1 }}>{q.role}</span>
                    </span>
                  </div>
                  <span style={{ fontSize: 13.5, fontWeight: 700, color: "var(--teal-ink)", letterSpacing: "-0.02em", fontFamily: "var(--font-sans)" }}>
                    {q.amt}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        {/* Community strip — dark band with avatar cluster */}
        <Reveal delay={0.1}>
          <div className="comm-v2-band" style={{
            position: "relative", overflow: "hidden",
            background: "#0D0D14", borderRadius: 28,
            border: "1px solid rgba(255,255,255,0.08)",
            padding: "clamp(32px, 4.5vw, 52px) clamp(26px, 5vw, 56px)",
            display: "grid", gridTemplateColumns: "1.2fr auto", gap: 40, alignItems: "center",
            boxShadow: "0 40px 100px -32px rgba(13,13,20,0.5)",
          }}>
            <div aria-hidden style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              background: "radial-gradient(50% 90% at 100% 50%, rgba(109,94,243,0.22), transparent 65%)",
            }} />
            <div style={{ position: "relative" }}>
              <h3 className="v2-h2" style={{ fontSize: "clamp(26px, 3.6vw, 40px)", color: "#fff", margin: "0 0 12px" }}>
                {t("bandTitleA")}<span style={{ color: "#A89DFF" }}>{t("bandTitleB")}</span>
              </h3>
              <p style={{ fontSize: 15.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.65, maxWidth: 460, margin: "0 0 22px" }}>
                {t("bandLead")}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 22px", maxWidth: 460 }}>
                {communityPerks.map((p) => (
                  <span key={p} style={{ display: "inline-flex", alignItems: "center", gap: 9, fontSize: 13.5, fontWeight: 500, color: "rgba(255,255,255,0.75)" }}>
                    <Check size={13} strokeWidth={3} color="var(--accent-2)" /> {p}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ position: "relative", textAlign: "center" }}>
              {/* Avatar cluster */}
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 18 }}>
                {quotes.map((q, i) => (
                  <img key={q.name} src={q.photo} alt="" width={52} height={52} loading="lazy"
                    style={{ width: 52, height: 52, borderRadius: 999, objectFit: "cover", border: "3px solid #0D0D14", marginLeft: i > 0 ? -14 : 0, position: "relative", zIndex: 3 - i }} />
                ))}
                <span style={{
                  width: 52, height: 52, borderRadius: 999, marginLeft: -14, position: "relative",
                  background: "linear-gradient(135deg, var(--accent), #8B7BFF)", border: "3px solid #0D0D14",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#fff", fontSize: 12, fontWeight: 700, fontFamily: "var(--font-sans)",
                }}>
                  +347
                </span>
              </div>
              <Magnetic>
                <Link href="/register" className="btn-primary" style={{ textDecoration: "none", fontSize: 15.5, padding: "15px 30px", borderRadius: 14 }}>
                  {t("bandCta")}
                </Link>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .comm-v2-quotes { grid-template-columns: 1fr !important; }
          .comm-v2-stats { grid-template-columns: 1fr !important; }
          .comm-v2-stat { border-right: none !important; border-bottom: 1px solid var(--line); padding: 26px 16px !important; }
          .comm-v2-stat:last-child { border-bottom: none; }
          .comm-v2-band { grid-template-columns: 1fr !important; text-align: left; }
          .comm-v2-band > div:last-child { text-align: left; }
          .comm-v2-band .btn-primary { width: 100%; }
          .comm-v2-band > div:last-child > div:first-child { justify-content: flex-start !important; }
        }
      `}</style>
    </section>
  );
}
