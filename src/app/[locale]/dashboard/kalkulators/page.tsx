"use client";
import { useState } from "react";

const SERVICES = [
  { id: "chatbot", label: "Mājas lapas chatbot", price: 1500, ret: 250 },
  { id: "voice", label: "Voice aģents", price: 2800, ret: 500 },
  { id: "video", label: "Faceless video", price: 900, ret: 600 },
  { id: "images", label: "AI bildes", price: 600, ret: 350 },
  { id: "make", label: "Make.com workflow", price: 900, ret: 200 },
  { id: "whatsapp", label: "WhatsApp automatizācija", price: 1200, ret: 300 },
];

export default function KalkulatorsPage() {
  const [serviceId, setServiceId] = useState("chatbot");
  const [clients, setClients] = useState(3);
  const [retainer, setRetainer] = useState(true);

  const s = SERVICES.find(x => x.id === serviceId)!;
  const setup = s.price * clients;
  const monthly = retainer ? s.ret * clients : 0;
  const ninety = setup + monthly * 3;
  const yearly = setup + monthly * 12;

  return (
    <div style={{ color: "var(--d-ink)" }}>
      <h1 className="d-section-title">Ienākumu kalkulators</h1>
      <p style={{ color: "var(--d-ink3)", fontSize: 14, marginBottom: 28 }}>
        Cik tu varētu pelnīt nākamajos 90 dienās
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

        {/* Left — inputs */}
        <div className="d-card" style={{ padding: 24 }}>
          {/* Service */}
          <div style={{ fontSize: 10, color: "var(--d-ink3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>
            1. Pakalpojums
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 24 }}>
            {SERVICES.map(sv => (
              <button key={sv.id} onClick={() => setServiceId(sv.id)}
                style={{
                  textAlign: "left", padding: "11px 14px", borderRadius: 10, cursor: "pointer",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  background: serviceId === sv.id ? "rgba(0,255,136,0.08)" : "rgba(255,255,255,0.03)",
                  border: serviceId === sv.id ? "1px solid rgba(0,255,136,0.25)" : "1px solid var(--d-border)",
                  transition: "all 0.15s",
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 500, color: "var(--d-ink)" }}>{sv.label}</span>
                <span className="d-mono" style={{ fontSize: 12, color: "var(--d-ink3)" }}>€{sv.price.toLocaleString("lv-LV")}</span>
              </button>
            ))}
          </div>

          {/* Clients */}
          <div style={{ fontSize: 10, color: "var(--d-ink3)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>
            2. Klientu skaits
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <input type="range" min={1} max={10} value={clients}
              onChange={e => setClients(+e.target.value)}
              style={{ flex: 1, accentColor: "#00ff88", cursor: "pointer" }} />
            <div className="d-metric" style={{ fontSize: 32, minWidth: 48, textAlign: "right", color: "var(--d-ink)" }}>{clients}</div>
          </div>

          {/* Retainer toggle */}
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            paddingTop: 16, borderTop: "1px solid var(--d-border)",
          }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "var(--d-ink)" }}>Retainer (mēneša pakete)</div>
              <div style={{ fontSize: 11, color: "var(--d-ink3)", marginTop: 2 }}>€{s.ret.toLocaleString("lv-LV")}/mēn × klients</div>
            </div>
            <button onClick={() => setRetainer(!retainer)}
              style={{
                width: 44, height: 26, borderRadius: 999, position: "relative",
                background: retainer ? "#00ff88" : "rgba(255,255,255,0.1)",
                border: "none", cursor: "pointer", transition: "all 0.2s", flexShrink: 0,
              }}>
              <span style={{
                position: "absolute", left: retainer ? 22 : 4, top: 3,
                width: 20, height: 20, borderRadius: 999,
                background: retainer ? "#000" : "rgba(255,255,255,0.6)",
                transition: "left 0.2s",
              }} />
            </button>
          </div>
        </div>

        {/* Right — projection */}
        <div className="d-card d-accent-glow" style={{ padding: 24 }}>
          <div style={{ fontSize: 10, color: "#00ff88", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>
            Tavs 90 dienu prognozējums
          </div>
          <div className="d-metric" style={{ fontSize: 56, lineHeight: 1, color: "var(--d-ink)", marginBottom: 8 }}>
            €{ninety.toLocaleString("lv-LV")}
          </div>
          <div style={{ fontSize: 13, color: "var(--d-ink3)", marginBottom: 28 }}>
            {clients} klient{clients === 1 ? "s" : "i"} · {s.label}{retainer ? " · ar retainer" : ""}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { label: "Setup ienākumi", value: `€${setup.toLocaleString("lv-LV")}` },
              { label: "Mēneša retaineri × 3", value: `€${(monthly * 3).toLocaleString("lv-LV")}` },
              { label: "Pēc 12 mēnešiem (proj.)", value: `€${yearly.toLocaleString("lv-LV")}`, accent: true },
            ].map((row, i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "13px 0",
                borderBottom: i < 2 ? "1px solid var(--d-border)" : "none",
              }}>
                <span style={{ fontSize: 13, color: "var(--d-ink2)" }}>{row.label}</span>
                <span className="d-metric" style={{ fontSize: 18, color: row.accent ? "#00ff88" : "var(--d-ink)" }}>{row.value}</span>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 20, padding: 14,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid var(--d-border)",
            borderRadius: 12, fontSize: 12, lineHeight: 1.6, color: "var(--d-ink2)",
          }}>
            <strong style={{ color: "var(--d-ink)" }}>Realitātes pārbaude:</strong> vidējais students aizver pirmo klientu 5–7 nedēļās. Otrais nāk vieglāk.
          </div>

          <a href="/dashboard/outreach" style={{
            display: "block", textAlign: "center", marginTop: 16,
            background: "#00ff88", color: "#000",
            borderRadius: 12, padding: "13px 20px",
            fontSize: 13, fontWeight: 700, textDecoration: "none",
            transition: "opacity 0.15s",
          }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.85")}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
          >
            Saņemt outreach skriptus →
          </a>
        </div>
      </div>
    </div>
  );
}
