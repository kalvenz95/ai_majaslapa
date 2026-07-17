"use client";

import { Reveal } from "@/components/home/Reveal";
import { Link } from "@/i18n/navigation";
import {
  MessageSquareText,
  FileSearch,
  Repeat,
  Gauge,
  Mail,
  Clock,
  ArrowRight,
  Paperclip,
  Sparkles,
} from "lucide-react";
import { useTranslations } from "next-intl";

/** Visuals for the six assistant capabilities — copy lives in the AIAssistants namespace. */
const capabilityVisuals = [
  { Icon: MessageSquareText, glow: "139,123,255" },
  { Icon: FileSearch, glow: "52,217,195" },
  { Icon: Repeat, glow: "255,184,107" },
  { Icon: Gauge, glow: "139,123,255" },
  { Icon: Mail, glow: "52,217,195" },
  { Icon: Clock, glow: "255,184,107" },
];

type Capability = { title: string; desc: string };

/** Crafted assistant-chat mockup — the same "real UI, not stock photo" approach as the lesson player. */
function AssistantMock() {
  const t = useTranslations("AIAssistants");
  const sources = (t.raw("mockSources") ?? []) as string[];

  return (
    <div
      className="v2-float-a"
      style={{
        borderRadius: 24,
        overflow: "hidden",
        background: "#0E0E14",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "0 48px 110px -32px rgba(45,35,95,0.55), 0 16px 40px -16px rgba(10,10,14,0.6)",
      }}
    >
      {/* Assistant header bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 11,
          padding: "15px 18px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          background: "rgba(255,255,255,0.03)",
        }}
      >
        <span
          style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            flexShrink: 0,
            background: "linear-gradient(150deg, var(--accent), #8B7BFF)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 24px -8px rgba(109,94,243,0.7), inset 0 1px 0 rgba(255,255,255,0.35)",
          }}
        >
          <Sparkles size={15} color="#fff" strokeWidth={2.2} />
        </span>
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.01em",
              fontFamily: "var(--font-sans)",
            }}
          >
            {t("mockName")}
          </div>
          <div style={{ fontSize: 10.5, color: "rgba(255,255,255,0.45)" }}>{t("mockRole")}</div>
        </div>
        <span
          style={{
            marginLeft: "auto",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontFamily: "JetBrains Mono, monospace",
            fontSize: 9.5,
            fontWeight: 600,
            letterSpacing: "0.08em",
            color: "#34D9C3",
            border: "1px solid rgba(52,217,195,0.3)",
            background: "rgba(52,217,195,0.08)",
            borderRadius: 999,
            padding: "4px 9px",
            whiteSpace: "nowrap",
          }}
        >
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: 999,
              background: "#34D9C3",
              boxShadow: "0 0 8px #34D9C3",
            }}
          />
          {t("mockStatus")}
        </span>
      </div>

      {/* Conversation */}
      <div style={{ padding: "20px 18px", display: "flex", flexDirection: "column", gap: 14 }}>
        {/* User question */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <div
            style={{
              maxWidth: "82%",
              fontSize: 13,
              lineHeight: 1.6,
              color: "#fff",
              background: "linear-gradient(150deg, rgba(109,94,243,0.9), rgba(109,94,243,0.7))",
              border: "1px solid rgba(255,255,255,0.14)",
              borderRadius: "14px 14px 4px 14px",
              padding: "11px 14px",
            }}
          >
            {t("mockQuestion")}
          </div>
        </div>

        {/* Assistant answer */}
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <div
            style={{
              maxWidth: "88%",
              fontSize: 13,
              lineHeight: 1.65,
              color: "rgba(255,255,255,0.82)",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "14px 14px 14px 4px",
              padding: "12px 14px",
            }}
          >
            {t("mockAnswer")}
            {/* Knowledge sources the answer came from */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 11 }}>
              {sources.map((src) => (
                <span
                  key={src}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 9.5,
                    color: "rgba(255,255,255,0.6)",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 6,
                    padding: "4px 8px",
                  }}
                >
                  <Paperclip size={9} />
                  {src}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Input bar — visual only */}
      <div style={{ padding: "0 18px 18px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.04)",
            padding: "11px 13px",
          }}
        >
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{t("mockPlaceholder")}</span>
          <span
            style={{
              marginLeft: "auto",
              width: 26,
              height: 26,
              borderRadius: 8,
              flexShrink: 0,
              background: "linear-gradient(150deg, var(--accent), #8B7BFF)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ArrowRight size={13} color="#fff" strokeWidth={2.5} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default function AIAssistantsV2() {
  const t = useTranslations("AIAssistants");
  const capabilities = ((t.raw("capabilities") ?? []) as Capability[]).map((c, i) => ({
    ...c,
    ...capabilityVisuals[i],
  }));

  return (
    <section id="ai-asistenti" style={{ background: "var(--bg)", padding: "40px 0 70px" }}>
      <div className="lp-container" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
        {/* Dark inset panel — same premium treatment as the "why AI" panel */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 40,
            background: "#0A0A0E",
            border: "1px solid rgba(255,255,255,0.08)",
            padding: "clamp(56px, 7vw, 110px) clamp(24px, 5vw, 80px)",
            boxShadow: "0 60px 140px -48px rgba(13,13,20,0.55)",
          }}
        >
          {/* Glows + grid */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "radial-gradient(40% 48% at 88% 10%, rgba(109,94,243,0.22), transparent 65%)," +
                "radial-gradient(38% 46% at 8% 90%, rgba(0,191,165,0.14), transparent 62%)",
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              opacity: 0.5,
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px)," +
                "linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
              maskImage: "radial-gradient(70% 70% at 50% 40%, #000 0%, transparent 80%)",
              WebkitMaskImage: "radial-gradient(70% 70% at 50% 40%, #000 0%, transparent 80%)",
            }}
          />

          <div style={{ position: "relative", zIndex: 1 }}>
            {/* Header — editorial split */}
            <div
              className="aia-head"
              style={{
                display: "grid",
                gridTemplateColumns: "1.25fr 0.75fr",
                gap: 48,
                alignItems: "end",
                marginBottom: 64,
              }}
            >
              <div>
                <Reveal>
                  <span className="v2-eyebrow v2-eyebrow--light">{t("kicker")}</span>
                </Reveal>
                <Reveal delay={0.08}>
                  <h2
                    className="v2-h2"
                    style={{
                      fontSize: "clamp(38px, 5.8vw, 76px)",
                      color: "#fff",
                      margin: "18px 0 0",
                      maxWidth: "14ch",
                    }}
                  >
                    {t("titleA")}
                    <span style={{ color: "#A89DFF" }}>{t("titleB")}</span>
                  </h2>
                </Reveal>
              </div>
              <Reveal delay={0.16}>
                <p
                  style={{
                    fontSize: 17,
                    color: "rgba(255,255,255,0.6)",
                    lineHeight: 1.7,
                    margin: 0,
                    paddingBottom: 8,
                  }}
                >
                  {t("leadA")}
                  <strong style={{ color: "#fff", fontWeight: 600 }}>{t("leadStrong")}</strong>
                  {t("leadB")}
                </p>
              </Reveal>
            </div>

            {/* Mockup + capabilities */}
            <div
              className="aia-grid"
              style={{ display: "grid", gridTemplateColumns: "0.95fr 1.05fr", gap: 56, alignItems: "center" }}
            >
              <Reveal delay={0.12} className="aia-visual">
                <AssistantMock />
              </Reveal>

              <div className="aia-caps" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {capabilities.map((c, i) => (
                  <Reveal key={c.title} delay={0.06 * i}>
                    <div
                      className="v2-glass aia-card"
                      style={{
                        height: "100%",
                        padding: "22px 20px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 11,
                      }}
                    >
                      <span
                        style={{
                          width: 38,
                          height: 38,
                          borderRadius: 11,
                          flexShrink: 0,
                          background: `linear-gradient(150deg, rgba(${c.glow},0.95) 0%, rgba(${c.glow},0.65) 100%)`,
                          border: "1px solid rgba(255,255,255,0.25)",
                          boxShadow: `0 10px 26px -8px rgba(${c.glow},0.7), inset 0 1px 0 rgba(255,255,255,0.4)`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <c.Icon size={18} color="#0A0A0E" strokeWidth={2} />
                      </span>
                      <h3
                        style={{
                          fontSize: 15.5,
                          fontWeight: 700,
                          fontFamily: "var(--font-sans)",
                          letterSpacing: "-0.02em",
                          color: "#fff",
                          margin: 0,
                        }}
                      >
                        {c.title}
                      </h3>
                      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: 0 }}>
                        {c.desc}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Reveal delay={0.2}>
              <div style={{ textAlign: "center", marginTop: 56 }}>
                <Link
                  href="/kursi/digitalais-specialists"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    fontSize: 15.5,
                    fontWeight: 700,
                    color: "#fff",
                    padding: "15px 28px",
                    borderRadius: 14,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.16)",
                    backdropFilter: "blur(8px)",
                    textDecoration: "none",
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
                  {t("cta")} <ArrowRight size={16} />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .aia-grid { grid-template-columns: 1fr !important; gap: 44px !important; }
          .aia-visual { max-width: 520px; margin: 0 auto; width: 100%; }
          .aia-head { grid-template-columns: 1fr !important; gap: 18px !important; align-items: start !important; margin-bottom: 44px !important; }
        }
        @media (max-width: 560px) {
          .aia-caps { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
