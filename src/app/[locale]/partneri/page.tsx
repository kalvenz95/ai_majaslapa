"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

type ValidError = "INVALID_CODE" | "MISSING_CODE" | "SERVER_ERROR" | "NETWORK_ERROR";

interface ValidResult {
  valid: boolean;
  code?: string;
  discountPct?: number;
  partnerName?: string | null;
  error?: ValidError;
}

type Step = { t: string; d: string };

export default function PartneriPage() {
  const t = useTranslations("Partneri");
  const { isSignedIn } = useAuth();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ValidResult | null>(null);

  const steps = t.raw("steps") as Step[];

  // Auto-aizpilda un pārbauda kodu no dalīšanās saites (?ref=KODS)
  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get("ref");
    if (ref) {
      setCode(ref.toUpperCase());
      validate(ref);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function validate(raw: string) {
    const clean = raw.trim();
    if (!clean) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/affiliate/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: clean }),
      });
      const data: ValidResult = await res.json();
      setResult(data);
    } catch {
      setResult({ valid: false, error: "NETWORK_ERROR" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh" }}>
      <Navbar />

      {/* Hero */}
      <section style={{ padding: "128px 0 56px", position: "relative", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(ellipse 60% 50% at 50% 0%, color-mix(in oklab, var(--accent) 8%, transparent), transparent 65%)",
          }}
        />
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px", position: "relative", zIndex: 2 }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 11,
              letterSpacing: "0.15em",
              color: "var(--ink-3)",
              textTransform: "uppercase",
            }}
          >
            <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--accent)" }} />
            {t("kicker")}
          </span>
          <h1
            style={{
              fontSize: "clamp(40px, 6.4vw, 84px)",
              lineHeight: 1.04,
              letterSpacing: "-0.04em",
              fontWeight: 700,
              margin: "16px 0 0",
              maxWidth: "16ch",
            }}
          >
            {t("titleA")}{" "}
            <span style={{ color: "var(--accent)", fontStyle: "italic", fontFamily: "Fraunces, Georgia, serif", fontWeight: 500 }}>
              {t("titleB")}
            </span>
          </h1>
          <p style={{ fontSize: 19, color: "var(--ink-2)", maxWidth: 560, lineHeight: 1.6, marginTop: 22 }}>
            {t("lead")}
          </p>
        </div>
      </section>

      {/* Koda ievade */}
      <section style={{ padding: "0 0 96px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px" }}>
          <div
            style={{
              maxWidth: 560,
              background: "var(--bg-1)",
              border: "1px solid var(--line)",
              borderRadius: 22,
              padding: "clamp(24px, 4vw, 40px)",
              boxShadow: "0 24px 60px -32px rgba(0,0,0,0.5)",
            }}
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                validate(code);
              }}
            >
              <label
                htmlFor="ref-code"
                style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--ink-2)", marginBottom: 10 }}
              >
                {t("codeLabel")}
              </label>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <input
                  id="ref-code"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder={t("codePlaceholder")}
                  autoComplete="off"
                  style={{
                    flex: "1 1 220px",
                    background: "var(--bg-2)",
                    border: "1px solid var(--line)",
                    borderRadius: 12,
                    padding: "14px 16px",
                    color: "var(--ink)",
                    fontSize: 16,
                    fontFamily: "JetBrains Mono, monospace",
                    letterSpacing: "0.06em",
                    outline: "none",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
                />
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading || !code.trim()}
                  style={{
                    padding: "14px 22px",
                    borderRadius: 12,
                    fontSize: 14,
                    opacity: loading || !code.trim() ? 0.6 : 1,
                    cursor: loading || !code.trim() ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? t("checking") : t("activate")}
                </button>
              </div>
            </form>

            {/* Rezultāts */}
            {result && result.valid && (
              <div
                style={{
                  marginTop: 22,
                  background: "color-mix(in oklab, var(--accent) 10%, transparent)",
                  border: "1px solid color-mix(in oklab, var(--accent) 40%, transparent)",
                  borderRadius: 14,
                  padding: "18px 20px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                  <span
                    style={{
                      display: "grid",
                      placeItems: "center",
                      width: 26,
                      height: 26,
                      borderRadius: 999,
                      background: "var(--accent)",
                      color: "var(--accent-ink)",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                  <strong style={{ fontSize: 16, fontWeight: 700 }}>
                    {t("successTitle", { pct: result.discountPct ?? 0 })}
                  </strong>
                </div>
                <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.55, margin: 0 }}>
                  {t.rich("successBody", {
                    code: result.code ?? "",
                    partner: result.partnerName ? ` (${result.partnerName})` : "",
                    mono: (c) => <strong style={{ fontFamily: "JetBrains Mono, monospace" }}>{c}</strong>,
                  })}
                </p>
                <Link
                  href="/#pricing"
                  className="btn-primary"
                  style={{ marginTop: 16, display: "inline-flex", padding: "11px 20px", borderRadius: 10, fontSize: 14 }}
                >
                  {t("choosePlan")}
                </Link>
              </div>
            )}

            {result && !result.valid && (
              <div
                style={{
                  marginTop: 22,
                  background: "rgba(239,68,68,0.08)",
                  border: "1px solid rgba(239,68,68,0.3)",
                  borderRadius: 14,
                  padding: "16px 20px",
                  fontSize: 14,
                  color: "rgba(239,68,68,0.95)",
                }}
              >
                {t(`errors.${result.error ?? "INVALID_CODE"}`)}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Kļūsti par partneri */}
      <section style={{ padding: "0 0 120px", borderTop: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "80px 24px 0" }}>
          <div style={{ display: "grid", gap: 48, gridTemplateColumns: "minmax(0,1fr)", alignItems: "start" }} className="partneri-grid">
            <div>
              <span
                style={{
                  fontFamily: "JetBrains Mono, monospace",
                  fontSize: 11,
                  letterSpacing: "0.15em",
                  color: "var(--ink-3)",
                  textTransform: "uppercase",
                }}
              >
                {t("becomeKicker")}
              </span>
              <h2 style={{ fontSize: "clamp(28px, 3.6vw, 44px)", fontWeight: 700, letterSpacing: "-0.03em", margin: "14px 0 16px", maxWidth: "18ch" }}>
                {t("becomeTitleA")}{" "}
                <span style={{ fontStyle: "italic", fontFamily: "Fraunces, Georgia, serif", fontWeight: 500, color: "var(--ink-2)" }}>
                  {t("becomeTitleB")}
                </span>
              </h2>
              <p style={{ fontSize: 17, color: "var(--ink-2)", lineHeight: 1.65, maxWidth: 520, marginBottom: 28 }}>
                {t("becomeLead")}
              </p>
              {isSignedIn ? (
                <Link
                  href="/dashboard/partneri"
                  className="btn-primary"
                  style={{ display: "inline-flex", padding: "13px 24px", borderRadius: 12, fontSize: 15 }}
                >
                  {t("openPanel")}
                </Link>
              ) : (
                <Link
                  href="/register"
                  className="btn-primary"
                  style={{ display: "inline-flex", padding: "13px 24px", borderRadius: 12, fontSize: 15 }}
                >
                  {t("createAccount")}
                </Link>
              )}
            </div>

            {/* Soļi */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {steps.map((s, i) => (
                <div
                  key={s.t}
                  style={{
                    display: "flex",
                    gap: 16,
                    background: "var(--bg-1)",
                    border: "1px solid var(--line)",
                    borderRadius: 16,
                    padding: "18px 20px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "JetBrains Mono, monospace",
                      fontSize: 13,
                      fontWeight: 700,
                      color: "var(--accent)",
                      flexShrink: 0,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{s.t}</div>
                    <div style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.5 }}>{s.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <style>{`
        @media (min-width: 860px) {
          .partneri-grid { grid-template-columns: 1.1fr 0.9fr; gap: 64px; }
        }
      `}</style>
    </main>
  );
}
