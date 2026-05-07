"use client";
import { TrendingDown, Cpu, Briefcase, Banknote } from "lucide-react";

const points = [
  { Icon: TrendingDown, text: "Samazini uzņēmumu izmaksas" },
  { Icon: Cpu, text: "Veido risinājumus bez programmēšanas prasmēm" },
  { Icon: Briefcase, text: "Piedāvā pakalpojumus, kas uzņēmumiem ir nepieciešams" },
  { Icon: Banknote, text: "Pārvērt prasmes ikmēneša ienākumos" },
];

export default function WhyAI() {
  return (
    <section style={{ position: "relative", padding: "80px 24px", display: "flex", justifyContent: "center", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 700, height: 500, background: "color-mix(in oklab, var(--accent) 5%, transparent)", filter: "blur(80px)", pointerEvents: "none" }} />

      <div className="card" style={{ position: "relative", width: "100%", maxWidth: 960, padding: "clamp(28px, 6vw, 64px)", borderColor: "color-mix(in oklab, var(--accent) 20%, transparent)" }}>
        <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 256, height: 1, background: "linear-gradient(90deg, transparent, color-mix(in oklab, var(--accent) 50%, transparent), transparent)" }} />

        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <div className="chip chip-dot">AI prasmes biznesam</div>
        </div>

        <h2 style={{ textAlign: "center", fontFamily: "Inter Tight, sans-serif", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, color: "var(--ink)", marginBottom: 40, fontSize: "clamp(26px, 4vw, 44px)" }}>
          Apgūsti prasmes,{" "}
          <span style={{ color: "var(--accent)" }}>kas uzņēmumiem šobrīd ir vajadzīgas</span>
        </h2>

        <div style={{ background: "var(--bg-2)", border: "1px solid var(--line)", borderRadius: 14, padding: "clamp(20px, 4vw, 32px)", marginBottom: 32 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {points.map((p) => (
              <div key={p.text} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: "color-mix(in oklab, var(--accent) 10%, transparent)", border: "1px solid color-mix(in oklab, var(--accent) 20%, transparent)" }}>
                  <p.Icon size={16} color="var(--accent)" />
                </div>
                <span style={{ fontSize: 14, fontWeight: 500, color: "var(--ink-2)" }}>{p.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 40, display: "flex", flexDirection: "column", gap: 20 }}>
          <p style={{ fontSize: "clamp(17px, 2.5vw, 20px)", color: "var(--ink-2)", lineHeight: 1.7 }}>
            Mākslīgais intelekts kļūst par vienu no augstāk novērtētajām un pieprasītākajām prasmēm
            biznesā — uzņēmumiem ir vajadzīgi cilvēki, kas ar to palīdz{" "}
            <span style={{ color: "var(--accent)", fontWeight: 600 }}>samazināt izmaksas</span>,{" "}
            <span style={{ color: "var(--accent)", fontWeight: 600 }}>strādāt efektīvāk</span> un{" "}
            <span style={{ color: "var(--accent)", fontWeight: 600 }}>iegūt vairāk klientu</span>.
          </p>
          <p style={{ fontSize: "clamp(17px, 2.5vw, 20px)", color: "var(--ink-3)", lineHeight: 1.7 }}>
            Mēs parādām, kā izveidot augstvērtīgu AI pakalpojumu un produktu, un soli pa solim
            iemācām, kā to piedāvāt uzņēmumiem un attīstīt kā savu ikmēneša ienākumu virzienu.
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <a href="#courses" className="btn-primary" style={{ textDecoration: "none" }}>
            Skatīt, kā tas strādā →
          </a>
        </div>
      </div>
    </section>
  );
}
