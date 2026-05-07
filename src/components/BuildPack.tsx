"use client";
import { MessageSquare, Mic2, Zap, ArrowRight } from "lucide-react";

const buildModules = [
  {
    num: "01",
    title: "Website Chatbot",
    price: "€250–€900",
    retainer: "€150/mēn",
    Icon: MessageSquare,
    steps: ["Veido chatbot demonstrāciju", "Pielāgo uzņēmuma balsij", "Uzstāda mājas lapā", "Apmāca klientu"],
  },
  {
    num: "02",
    title: "WhatsApp + Voice Agents",
    price: "€400–€1800",
    retainer: "€250/mēn",
    Icon: Mic2,
    steps: ["Uzstāda WhatsApp automatizāciju", "Izveido AI balss aģentu", "Integrē ar klienta numuru", "Testē un piegādā klientam"],
  },
  {
    num: "03",
    title: "CRM Automatizācija",
    price: "€400–€1000",
    retainer: "€250/mēn",
    Icon: Zap,
    steps: ["Auditē klienta procesu", "Izveido workflow", "Testa periods", "Nodod un apmāca"],
  },
];

export default function BuildPack() {
  return (
    <section id="about" style={{ padding: "96px 24px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, var(--line-2), transparent)" }} />

      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="chip chip-accent" style={{ marginBottom: 16 }}>Build Pakete</div>
          <h2 style={{ fontFamily: "Inter Tight, sans-serif", fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.03em", marginBottom: 16 }}>
            Augstvērtīgi pakalpojumi.<br />
            <span style={{ color: "var(--accent)" }}>Lielāki ienākumi.</span>
          </h2>
          <p style={{ color: "var(--ink-3)", fontSize: 16, maxWidth: 560, margin: "0 auto", lineHeight: 1.6 }}>
            Kad pamata kursi apgūti — pārej uz premium pakalpojumiem ar ikmēneša reteneru.
            Voice agents, WhatsApp bots, CRM automatizācija — tas ir nākamais līmenis.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16, marginBottom: 48 }}>
          {buildModules.map((mod) => (
            <div key={mod.num} className="card card-hover" style={{ padding: 24 }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "color-mix(in oklab, var(--accent) 10%, transparent)", border: "1px solid color-mix(in oklab, var(--accent) 20%, transparent)" }}>
                  <mod.Icon size={20} color="var(--accent)" />
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "var(--accent)", fontWeight: 700 }}>{mod.num}</span>
                    <h3 style={{ fontFamily: "Inter Tight, sans-serif", fontWeight: 700, color: "var(--ink)", fontSize: 17 }}>{mod.title}</h3>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                {mod.steps.map((step, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "var(--ink-3)" }}>
                    <div style={{ width: 20, height: 20, borderRadius: 999, background: "color-mix(in oklab, var(--accent) 12%, transparent)", color: "var(--accent)", fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontWeight: 700 }}>
                      {i + 1}
                    </div>
                    {step}
                  </div>
                ))}
              </div>

              <div style={{ height: 1, background: "var(--line)", marginBottom: 16 }} />
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <div style={{ fontSize: 11, color: "var(--ink-4)", marginBottom: 2, fontFamily: "JetBrains Mono, monospace" }}>Projekta cena</div>
                  <div style={{ fontWeight: 700, color: "var(--ink)", fontSize: 15 }}>{mod.price}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11, color: "var(--ink-4)", marginBottom: 2, fontFamily: "JetBrains Mono, monospace" }}>Ikmēneša reteners</div>
                  <div style={{ fontWeight: 700, color: "var(--accent)", fontSize: 15 }}>{mod.retainer}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
          <div className="card" style={{ padding: 24, borderColor: "color-mix(in oklab, var(--accent) 20%, transparent)" }}>
            <div className="chip chip-dot" style={{ marginBottom: 16, fontSize: 10 }}>⚡ Ātrais ceļš</div>
            <h4 style={{ fontFamily: "Inter Tight, sans-serif", fontWeight: 700, color: "var(--ink)", fontSize: 18, marginBottom: 8 }}>Pirmie €500 ar AI</h4>
            <p style={{ fontSize: 13, color: "var(--ink-3)", marginBottom: 16, lineHeight: 1.5 }}>Iesācējiem. Ātri pārdodami pakalpojumi, minimāls laiks.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {["AI Faceless Video", "AI Attēli sociālajiem medijiem", "Vienkāršs chatbot"].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--ink-2)" }}>
                  <ArrowRight size={14} color="var(--accent)" /> {item}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--line)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, color: "var(--ink-3)" }}>Sagaidāmais rezultāts</span>
              <span style={{ fontWeight: 700, color: "var(--accent)", fontFamily: "JetBrains Mono, monospace" }}>€300–€700/mēn</span>
            </div>
          </div>

          <div className="card" style={{ padding: 24, background: "color-mix(in oklab, var(--accent) 4%, var(--bg-1))", borderColor: "color-mix(in oklab, var(--accent) 25%, transparent)" }}>
            <div className="chip chip-accent" style={{ marginBottom: 16, fontSize: 10 }}>💎 Build Pakete</div>
            <h4 style={{ fontFamily: "Inter Tight, sans-serif", fontWeight: 700, color: "var(--ink)", fontSize: 18, marginBottom: 8 }}>Aģentūras ceļš</h4>
            <p style={{ fontSize: 13, color: "var(--ink-3)", marginBottom: 16, lineHeight: 1.5 }}>Progresīviem. Lielāki projekti, ikmēneša reteners, skalēšana.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {["WhatsApp + Voice Agents", "Website Chatbot", "CRM automatizācija", "Ikmēneša support reteners"].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--ink-2)" }}>
                  <ArrowRight size={14} color="var(--accent)" /> {item}
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid color-mix(in oklab, var(--accent) 20%, transparent)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 13, color: "var(--ink-3)" }}>Sagaidāmais rezultāts</span>
              <span style={{ fontWeight: 700, color: "var(--accent)", fontFamily: "JetBrains Mono, monospace" }}>€1,500–€4,000/mēn</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
