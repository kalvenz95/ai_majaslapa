"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";

export default function KontaktiPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <main style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh" }}>
      <Navbar />

      <section style={{ padding: "120px 0 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 60% 50% at 50% 0%, color-mix(in oklab, var(--accent) 7%, transparent), transparent 65%)" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 2 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.15em", color: "var(--ink-3)", textTransform: "uppercase" }}>
            <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--accent)" }} />
            Sazinies ar mums
          </span>
          <h1 style={{ fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 1.03, letterSpacing: "-0.04em", fontWeight: 700, margin: "16px 0 0", maxWidth: "14ch" }}>
            Sazinies{" "}
            <span style={{ background: "linear-gradient(120deg, var(--accent), color-mix(in oklab, var(--accent) 70%, white))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", fontStyle: "italic", fontFamily: "Fraunces, Georgia, serif", fontWeight: 500 }}>
              ar mums
            </span>
          </h1>
          <p style={{ fontSize: 20, color: "var(--ink-2)", maxWidth: 520, lineHeight: 1.6, marginTop: 24 }}>
            Jautājumi par kursiem, sadarbību vai tehniski jautājumi — raksti mums.
          </p>
        </div>
      </section>

      <section style={{ padding: "0 0 120px", borderTop: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 32px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>

          {/* Contact info */}
          <div>
            <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 32 }}>Kontaktinformācija</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 48 }}>
              {[
                { label: "E-pasts", value: "info@chademy.lv", href: "mailto:info@chademy.lv" },
                { label: "Atbalsts", value: "support@chademy.lv", href: "mailto:support@chademy.lv" },
                { label: "Sadarbība", value: "partners@chademy.lv", href: "mailto:partners@chademy.lv" },
              ].map((c) => (
                <div key={c.label} style={{ padding: "20px 24px", border: "1px solid var(--line)", borderRadius: 16, background: "var(--bg-1)", display: "flex", flexDirection: "column", gap: 4 }}>
                  <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: "0.12em", color: "var(--ink-3)", textTransform: "uppercase" }}>{c.label}</div>
                  <a href={c.href} style={{ fontSize: 16, fontWeight: 600, color: "var(--accent)", textDecoration: "none" }}>{c.value}</a>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.01em", marginBottom: 16 }}>Atbildes laiks</h3>
            <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.65, marginBottom: 32 }}>
              Uz e-pastiem atbildam 1 darba dienas laikā. Kopienas jautājumiem — parasti dažu stundu laikā.
            </p>

            <div style={{ padding: "20px 24px", border: "1px solid var(--line)", borderRadius: 16, background: "var(--bg-1)" }}>
              <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: "0.12em", color: "var(--ink-3)", textTransform: "uppercase", marginBottom: 12 }}>Darba laiks</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  { day: "Pirmdiena – Piektdiena", time: "09:00 – 18:00" },
                  { day: "Sestdiena – Svētdiena", time: "Slēgts" },
                ].map((h) => (
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
            <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 32 }}>Nosūti ziņu</h2>
            {sent ? (
              <div style={{ padding: "48px 32px", border: "1px solid color-mix(in oklab, var(--accent) 30%, transparent)", borderRadius: 20, background: "color-mix(in oklab, var(--accent) 5%, var(--bg-1))", textAlign: "center" }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>✓</div>
                <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>Ziņa nosūtīta!</h3>
                <p style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.6 }}>Mēs sazināsimies ar tevi 1 darba dienas laikā.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { id: "name", label: "Vārds", type: "text", placeholder: "Tavs vārds", key: "name" as const },
                  { id: "email", label: "E-pasts", type: "email", placeholder: "tava@epasts.lv", key: "email" as const },
                ].map((f) => (
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
                  <label style={{ fontSize: 12, fontWeight: 600, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: "0.08em", fontFamily: "JetBrains Mono, monospace" }}>Ziņa</label>
                  <textarea
                    required
                    placeholder="Kā varam palīdzēt?"
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                    style={{ background: "var(--bg-2)", border: "1px solid var(--line)", borderRadius: 12, padding: "12px 16px", fontSize: 15, color: "var(--ink)", outline: "none", resize: "vertical", transition: "border-color 0.15s", fontFamily: "inherit" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "var(--line-2)")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "var(--line)")}
                  />
                </div>
                <button
                  type="submit"
                  style={{ background: "var(--accent)", color: "var(--accent-ink)", border: "none", borderRadius: 12, padding: "14px 0", fontWeight: 700, fontSize: 15, cursor: "pointer", marginTop: 8, transition: "opacity 0.15s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  Nosūtīt ziņu →
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
