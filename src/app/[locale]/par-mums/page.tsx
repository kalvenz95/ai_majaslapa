import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { setRequestLocale, getTranslations } from "next-intl/server";

type Stat = { num: string; label: string };
type Card = { title: string; desc: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ParMums" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function ParMusPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ParMums");
  const story = t.raw("story") as string[];
  const stats = t.raw("stats") as Stat[];
  const doCards = t.raw("doCards") as Card[];

  return (
    <main style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh" }}>
      <Navbar />

      <section style={{ padding: "120px 0 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 70% 50% at 60% 0%, color-mix(in oklab, var(--accent) 7%, transparent), transparent 65%)" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 2 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.15em", color: "var(--ink-3)", textTransform: "uppercase" }}>
            <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--accent)" }} />
            {t("kicker")}
          </span>
          <h1 style={{ fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 1.03, letterSpacing: "-0.04em", fontWeight: 700, margin: "16px 0 0", maxWidth: "16ch" }}>
            {t("titleA")}{" "}
            <span style={{ color: "var(--ink-2)", fontStyle: "italic", fontFamily: "Fraunces, Georgia, serif", fontWeight: 500 }}>
              {t("titleB")}
            </span>
          </h1>
          <p style={{ fontSize: 20, color: "var(--ink-2)", maxWidth: 600, lineHeight: 1.6, marginTop: 24 }}>
            {t("lead")}
          </p>
        </div>
      </section>

      <section style={{ padding: "0 0 80px", borderTop: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 32px 0" }}>
          <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <div>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 24 }}>
                {t("storyTitle")}
              </h2>
              {story.map((p, i) => (
                <p key={i} style={{ fontSize: 16, color: "var(--ink-2)", lineHeight: 1.75, marginBottom: i < story.length - 1 ? 20 : 0 }}>
                  {p}
                </p>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {stats.map((s) => (
                <div key={s.label} style={{ padding: "24px 28px", border: "1px solid var(--line)", borderRadius: 18, background: "var(--bg-1)", display: "flex", alignItems: "center", gap: 24 }}>
                  <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.04em", color: "var(--accent)", fontVariantNumeric: "tabular-nums", flexShrink: 0 }}>{s.num}</div>
                  <div style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 0", borderTop: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 700, letterSpacing: "-0.025em", marginBottom: 40 }}>{t("doTitle")}</h2>
          <div className="about-cards" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {doCards.map((c) => (
              <div key={c.title} style={{ padding: "28px 24px", border: "1px solid var(--line)", borderRadius: 20, background: "var(--bg-1)" }}>
                <div style={{ width: 8, height: 8, borderRadius: 999, background: "var(--accent)", marginBottom: 16 }} />
                <h3 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.015em", marginBottom: 12 }}>{c.title}</h3>
                <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.65 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .about-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Footer />
    </main>
  );
}
