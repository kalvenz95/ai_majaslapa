"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";

/* Addresses stay here; only the labels come from messages — zipped by index. */
const CHANNEL_ADDRESSES = ["info@chademy.lv", "support@chademy.lv", "partners@chademy.lv"];

type Channel = { label: string };
type Hours = { day: string; time: string };
type ContactError = "INVALID_INPUT" | "SERVER_ERROR" | "NETWORK_ERROR";

export default function KontaktiPage() {
  const t = useTranslations("Kontakti");
  const locale = useLocale();
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<ContactError | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const channels = (t.raw("channels") as Channel[]).map((c, i) => ({ ...c, value: CHANNEL_ADDRESSES[i] }));
  const hours = t.raw("hours") as Hours[];

  const fields = [
    { id: "name", label: t("fieldName"), type: "text", placeholder: t("fieldNamePlaceholder"), key: "name" as const },
    { id: "email", label: t("fieldEmail"), type: "email", placeholder: t("fieldEmailPlaceholder"), key: "email" as const },
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale }),
      });
      const data: { ok: boolean; error?: ContactError } = await res.json();
      if (data.ok) setSent(true);
      else setError(data.error ?? "SERVER_ERROR");
    } catch {
      setError("NETWORK_ERROR");
    } finally {
      setSending(false);
    }
  }

  return (
    <main style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh" }}>
      <Navbar />

      <section style={{ padding: "120px 0 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 60% 50% at 50% 0%, color-mix(in oklab, var(--accent) 7%, transparent), transparent 65%)" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 2 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.15em", color: "var(--ink-3)", textTransform: "uppercase" }}>
            <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--accent)" }} />
            {t("kicker")}
          </span>
          <h1 style={{ fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 1.03, letterSpacing: "-0.04em", fontWeight: 700, margin: "16px 0 0", maxWidth: "14ch" }}>
            {t("titleA")}{" "}
            <span style={{ color: "var(--ink-2)", fontStyle: "italic", fontFamily: "Fraunces, Georgia, serif", fontWeight: 500 }}>
              {t("titleB")}
            </span>
          </h1>
          <p style={{ fontSize: 20, color: "var(--ink-2)", maxWidth: 520, lineHeight: 1.6, marginTop: 24 }}>
            {t("lead")}
          </p>
        </div>
      </section>

      <section style={{ padding: "0 0 120px", borderTop: "1px solid var(--line)" }}>
        <div className="contact-grid" style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 32px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>

          {/* Contact info */}
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 32 }}>{t("infoTitle")}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 48 }}>
              {channels.map((c) => (
                <div key={c.value} style={{ padding: "20px 24px", border: "1px solid var(--line)", borderRadius: 16, background: "var(--bg-1)", display: "flex", flexDirection: "column", gap: 4 }}>
                  <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: "0.12em", color: "var(--ink-3)", textTransform: "uppercase" }}>{c.label}</div>
                  <a href={`mailto:${c.value}`} style={{ fontSize: 16, fontWeight: 600, color: "var(--accent)", textDecoration: "none" }}>{c.value}</a>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 16 }}>{t("responseTitle")}</h3>
            <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.65, marginBottom: 32 }}>
              {t("responseText")}
            </p>

            <div style={{ padding: "20px 24px", border: "1px solid var(--line)", borderRadius: 16, background: "var(--bg-1)" }}>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: "0.12em", color: "var(--ink-3)", textTransform: "uppercase", marginBottom: 12 }}>{t("hoursTitle")}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {hours.map((h) => (
                  <div key={h.day} style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                    <span style={{ color: "var(--ink-2)" }}>{h.day}</span>
                    <span style={{ color: "var(--ink)", fontWeight: 600 }}>{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 32 }}>{t("formTitle")}</h2>
            {sent ? (
              <div style={{ padding: "48px 32px", border: "1px solid color-mix(in oklab, var(--accent) 30%, transparent)", borderRadius: 20, background: "color-mix(in oklab, var(--accent) 5%, var(--bg-1))", textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>✓</div>
                <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>{t("sentTitle")}</h3>
                <p style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.6 }}>{t("sentText")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {fields.map((f) => (
                  <div key={f.id} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "JetBrains Mono, monospace" }}>{f.label}</label>
                    <input
                      type={f.type}
                      required
                      placeholder={f.placeholder}
                      value={form[f.key]}
                      onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                      style={{ background: "var(--bg-2)", border: "1px solid var(--line)", borderRadius: 12, padding: "12px 16px", fontSize: 15, color: "var(--ink)", outline: "none", transition: "border-color 0.15s" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "var(--line-2)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
                    />
                  </div>
                ))}
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "JetBrains Mono, monospace" }}>{t("fieldMessage")}</label>
                  <textarea
                    required
                    placeholder={t("fieldMessagePlaceholder")}
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    style={{ background: "var(--bg-2)", border: "1px solid var(--line)", borderRadius: 12, padding: "12px 16px", fontSize: 15, color: "var(--ink)", outline: "none", resize: "vertical", transition: "border-color 0.15s", fontFamily: "inherit" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--line-2)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
                  />
                </div>
                {error && (
                  <div
                    role="alert"
                    style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 12, padding: "12px 16px", fontSize: 14, color: "rgba(239,68,68,0.95)", lineHeight: 1.5 }}
                  >
                    {t(`errors.${error}`)}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={sending}
                  style={{ background: "var(--accent)", color: "var(--accent-ink)", border: "none", borderRadius: 12, padding: "14px 0", fontWeight: 700, fontSize: 15, cursor: sending ? "not-allowed" : "pointer", opacity: sending ? 0.6 : 1, marginTop: 8, transition: "opacity 0.15s" }}
                  onMouseEnter={(e) => { if (!sending) e.currentTarget.style.opacity = "0.9"; }}
                  onMouseLeave={(e) => { if (!sending) e.currentTarget.style.opacity = "1"; }}
                >
                  {sending ? t("sending") : t("submit")}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>

      <Footer />
    </main>
  );
}
