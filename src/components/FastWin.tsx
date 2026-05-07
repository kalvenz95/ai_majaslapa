"use client";
import { Compass, Wrench, FileText, Send, CircleDollarSign } from "lucide-react";

const steps = [
  { step: "01", title: "Izvēlies virzienu", desc: "Sociālie tīkli, automatizācija vai balss aģenti.", Icon: Compass },
  { step: "02", title: "Izveido demo", desc: "Reāls piemērs uzņēmumam.", Icon: Wrench },
  { step: "03", title: "Sagatavo piedāvājumu", desc: "Gatavas veidnes un struktūra.", Icon: FileText },
  { step: "04", title: "Uzrunā uzņēmumus", desc: "Vienkārši teksti un pieeja.", Icon: Send },
  { step: "05", title: "Noslēdz darījumu", desc: "Pirmais klients un ienākums.", Icon: CircleDollarSign },
];

export default function FastWin() {
  return (
    <section id="start" style={{ padding: "96px 24px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, color-mix(in oklab, var(--accent) 20%, transparent), transparent)" }} />

      <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
        <div style={{ marginBottom: 40 }}>
          <p style={{ color: "var(--ink-3)", fontSize: 16, fontStyle: "italic", lineHeight: 1.6, borderLeft: "2px solid color-mix(in oklab, var(--accent) 40%, transparent)", paddingLeft: 16, textAlign: "left", maxWidth: 480, margin: "0 auto" }}>
            "Pirmais klients nāk no darbības,<br />
            nevis no perfekta plāna."
          </p>
        </div>

        <div className="chip chip-dot" style={{ marginBottom: 20 }}>🚀 Ceļvedis</div>
        <h2 style={{ fontFamily: "Inter Tight, sans-serif", fontSize: "clamp(32px,5vw,48px)", fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.03em", marginBottom: 20 }}>
          No nulles līdz <span style={{ color: "var(--accent)" }}>pirmajam klientam</span>
        </h2>
        <p style={{ color: "var(--ink-3)", fontSize: 17, marginBottom: 56, maxWidth: 500, margin: "0 auto 56px", lineHeight: 1.6 }}>
          Strukturēta apmācība, kur apgūsti vienu pieprasītu pakalpojumu
          un sagatavojies darbam ar uzņēmumiem.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 0, textAlign: "left", maxWidth: 480, margin: "0 auto 48px" }}>
          {steps.map((s, i) => (
            <div key={s.step} style={{ display: "flex", alignItems: "stretch", gap: 20 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: 44 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: "color-mix(in oklab, var(--accent) 10%, transparent)",
                  border: "1px solid color-mix(in oklab, var(--accent) 25%, transparent)",
                }}>
                  <s.Icon size={18} color="var(--accent)" />
                </div>
                {i < steps.length - 1 && (
                  <div style={{ width: 1, flex: 1, margin: "4px 0", background: "var(--line)" }} />
                )}
              </div>

              <div style={{ paddingBottom: i < steps.length - 1 ? 24 : 0, paddingTop: 10, flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                  <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "var(--accent)", fontWeight: 700, letterSpacing: "0.1em" }}>{s.step}</span>
                  <h3 style={{ fontWeight: 700, color: "var(--ink)", fontSize: 15 }}>{s.title}</h3>
                </div>
                <p style={{ fontSize: 14, color: "var(--ink-3)", lineHeight: 1.55 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <a href="#courses" className="btn-primary" style={{ textDecoration: "none", display: "inline-flex" }}>
          Skatīt virzienus →
        </a>
      </div>
    </section>
  );
}
