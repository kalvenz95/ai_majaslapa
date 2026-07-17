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

/* Package 2 lives in the Claude-inspired warm register — cream, light yellow, terracotta. */
const CLAUDE_FILL = "linear-gradient(140deg, #E9A23B 0%, #D97757 55%, #BD5D3A 100%)";

/** Visuals for the six assistant capabilities — copy lives in the AIAssistants namespace. */
const capabilityVisuals = [
  { Icon: MessageSquareText, glow: "217,119,87" },
  { Icon: FileSearch, glow: "233,162,59" },
  { Icon: Repeat, glow: "230,201,122" },
  { Icon: Gauge, glow: "217,119,87" },
  { Icon: Mail, glow: "233,162,59" },
  { Icon: Clock, glow: "230,201,122" },
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
        background: "linear-gradient(170deg, #FFFDF9 0%, #FBF3E6 100%)",
        border: "1px solid rgba(217,119,87,0.22)",
        boxShadow: "0 48px 110px -32px rgba(189,93,58,0.45), 0 16px 40px -16px rgba(233,162,59,0.30), inset 0 1px 0 rgba(255,255,255,0.9)",
      }}
    >
      {/* Assistant header bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 11,
          padding: "15px 18px",
          borderBottom: "1px solid rgba(217,119,87,0.14)",
          background: "rgba(255,255,255,0.6)",
        }}
      >
        <span
          style={{
            width: 32,
            height: 32,
            borderRadius: 10,
            flexShrink: 0,
            background: CLAUDE_FILL,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 10px 24px -8px rgba(189,93,58,0.7), inset 0 1px 0 rgba(255,255,255,0.4)",
          }}
        >
          <Sparkles size={15} color="#FFF8F0" strokeWidth={2.2} />
        </span>
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: "#2B1B12",
              letterSpacing: "-0.01em",
              fontFamily: "var(--font-sans)",
            }}
          >
            {t("mockName")}
          </div>
          <div style={{ fontSize: 10.5, color: "#8A7365" }}>{t("mockRole")}</div>
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
            color: "#B5642F",
            border: "1px solid rgba(217,119,87,0.3)",
            background: "rgba(243,220,160,0.35)",
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
              background: "#D97757",
              boxShadow: "0 0 8px rgba(217,119,87,0.9)",
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
              color: "#FFF8F0",
              background: CLAUDE_FILL,
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: "14px 14px 4px 14px",
              padding: "11px 14px",
              boxShadow: "0 10px 22px -10px rgba(189,93,58,0.6)",
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
              color: "#55423A",
              background: "rgba(255,255,255,0.85)",
              border: "1px solid rgba(217,119,87,0.18)",
              borderRadius: "14px 14px 14px 4px",
              padding: "12px 14px",
              boxShadow: "0 8px 20px -14px rgba(189,93,58,0.5)",
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
                    color: "#8A5638",
                    background: "rgba(243,220,160,0.30)",
                    border: "1px solid rgba(217,119,87,0.20)",
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
            border: "1px solid rgba(217,119,87,0.18)",
            background: "rgba(255,255,255,0.75)",
            padding: "11px 13px",
          }}
        >
          <span style={{ fontSize: 12, color: "#A08B7C" }}>{t("mockPlaceholder")}</span>
          <span
            style={{
              marginLeft: "auto",
              width: 26,
              height: 26,
              borderRadius: 8,
              flexShrink: 0,
              background: CLAUDE_FILL,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 8px 18px -8px rgba(189,93,58,0.7)",
            }}
          >
            <ArrowRight size={13} color="#FFF8F0" strokeWidth={2.5} />
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
    <section id="ai-asistenti" className="theme-claude" style={{ background: "var(--bg)", padding: "40px 0 70px" }}>
      <div className="lp-container" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px" }}>
        {/* Warm cream inset panel — Package 2's Claude-inspired identity */}
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 40,
            background: "linear-gradient(168deg, #FFFDF9 0%, #FDF5E9 48%, #FAEBD6 100%)",
            border: "1px solid rgba(217,119,87,0.22)",
            padding: "clamp(56px, 7vw, 110px) clamp(24px, 5vw, 80px)",
            boxShadow: "0 60px 140px -48px rgba(189,93,58,0.35), 0 20px 50px -24px rgba(233,162,59,0.22), inset 0 1px 0 rgba(255,255,255,0.9)",
          }}
        >
          {/* Soft warm gradients + grid */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "radial-gradient(44% 52% at 88% 8%, rgba(243,220,160,0.75), transparent 66%)," +
                "radial-gradient(40% 48% at 6% 92%, rgba(217,119,87,0.16), transparent 64%)",
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              opacity: 0.55,
              backgroundImage:
                "linear-gradient(rgba(189,93,58,0.05) 1px, transparent 1px)," +
                "linear-gradient(90deg, rgba(189,93,58,0.05) 1px, transparent 1px)",
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
                  <span className="v2-eyebrow">{t("kicker")}</span>
                </Reveal>
                <Reveal delay={0.08}>
                  <h2
                    className="v2-h2"
                    style={{
                      fontSize: "clamp(38px, 5.8vw, 76px)",
                      color: "var(--ink)",
                      margin: "18px 0 0",
                      maxWidth: "14ch",
                    }}
                  >
                    {t("titleA")}
                    <span className="claude-grad">{t("titleB")}</span>
                  </h2>
                </Reveal>
              </div>
              <Reveal delay={0.16}>
                <p
                  style={{
                    fontSize: 17,
                    color: "var(--ink-3)",
                    lineHeight: 1.7,
                    margin: 0,
                    paddingBottom: 8,
                  }}
                >
                  {t("leadA")}
                  <strong style={{ color: "var(--ink)", fontWeight: 600 }}>{t("leadStrong")}</strong>
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
                      className="aia-card claude-cap"
                      style={{
                        height: "100%",
                        padding: "22px 20px",
                        borderRadius: 22,
                        display: "flex",
                        flexDirection: "column",
                        gap: 11,
                        background: "linear-gradient(150deg, rgba(255,255,255,0.95), rgba(253,244,231,0.85))",
                        border: "1px solid rgba(217,119,87,0.18)",
                        boxShadow: "0 14px 34px -20px rgba(189,93,58,0.5), inset 0 1px 0 rgba(255,255,255,0.9)",
                        transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.25s ease, box-shadow 0.25s ease",
                      }}
                    >
                      <span
                        style={{
                          width: 38,
                          height: 38,
                          borderRadius: 11,
                          flexShrink: 0,
                          background: `linear-gradient(150deg, rgba(${c.glow},1) 0%, rgba(${c.glow},0.72) 100%)`,
                          border: "1px solid rgba(255,255,255,0.5)",
                          boxShadow: `0 10px 26px -8px rgba(${c.glow},0.75), inset 0 1px 0 rgba(255,255,255,0.55)`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <c.Icon size={18} color="#3A2312" strokeWidth={2.1} />
                      </span>
                      <h3
                        style={{
                          fontSize: 15.5,
                          fontWeight: 700,
                          fontFamily: "var(--font-sans)",
                          letterSpacing: "-0.02em",
                          color: "var(--ink)",
                          margin: 0,
                        }}
                      >
                        {c.title}
                      </h3>
                      <p style={{ fontSize: 13, color: "var(--ink-3)", lineHeight: 1.6, margin: 0 }}>
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
                    color: "#FFF8F0",
                    padding: "15px 28px",
                    borderRadius: 14,
                    background: CLAUDE_FILL,
                    border: "1px solid rgba(255,255,255,0.25)",
                    textDecoration: "none",
                    boxShadow: "0 16px 38px -12px rgba(189,93,58,0.6), inset 0 1px 0 rgba(255,255,255,0.35)",
                    transition: "box-shadow 0.2s ease, transform 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.boxShadow = "0 22px 48px -12px rgba(189,93,58,0.72), inset 0 1px 0 rgba(255,255,255,0.35)";
                    el.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.boxShadow = "0 16px 38px -12px rgba(189,93,58,0.6), inset 0 1px 0 rgba(255,255,255,0.35)";
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
        .claude-cap:hover {
          transform: translateY(-5px);
          border-color: rgba(217,119,87,0.34);
          box-shadow: 0 26px 54px -22px rgba(189,93,58,0.55), inset 0 1px 0 rgba(255,255,255,0.9);
        }
        @media (prefers-reduced-motion: reduce) {
          .claude-cap:hover { transform: none; }
        }
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
