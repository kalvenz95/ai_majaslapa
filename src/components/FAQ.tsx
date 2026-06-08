"use client";
import { useState } from "react";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "Vai man jābūt tehniskām zināšanām?",
    a: "Nē. Kursi veidoti tā, lai ikviens varētu sākt no nulles — soli pa solim, ar praktiskiem piemēriem un bez programmēšanas.",
  },
  {
    q: "Cik ātri varu sagaidīt pirmos rezultātus?",
    a: "Vidēji studenti atrod pirmo klientu 2–4 nedēļu laikā pēc kursa sākšanas, ja seko struktūrai un pielieto iemācīto.",
  },
  {
    q: "Cik daudz laika nedēļā jāvelta mācībām?",
    a: "4–6 stundas nedēļā parasti ir pietiekami, lai redzētu reālu progresu — vari mācīties savā tempā.",
  },
  {
    q: "Kā es atradīšu pirmos klientus?",
    a: "Kursā ir atsevišķa sadaļa par klientu meklēšanu — soļi, ziņojumu veidnes un reāli piemēri, ko izmantot uzreiz.",
  },
  {
    q: "Vai varu mācīties līdzās darbam vai studijām?",
    a: "Jā. Platforma ir veidota elastīgam grafikam — visi materiāli paliek pieejami, un vari mācīties jebkurā laikā.",
  },
  {
    q: "Kas notiek pēc kursa pabeigšanas?",
    a: "Paliec kopienā, saglabā piekļuvi materiāliem un saņem atbalstu, turpinot attīstīt savu pakalpojumu virzienu.",
  },
  {
    q: "Ko darīt, ja kaut kas neizdodas?",
    a: "Mentori un kopiena ir blakus ikvienā solī — uzdod jautājumus un saņem konkrētu palīdzību, nevis vispārīgus padomus.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" style={{ padding: "120px 24px", position: "relative", borderTop: "1px solid var(--line)" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div className="chip chip-dot" style={{ marginBottom: 20, display: "inline-flex" }}>Biežāk uzdotie jautājumi</div>
          <h2 style={{ fontFamily: "Inter Tight, sans-serif", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.1, color: "var(--ink)", fontSize: "clamp(28px, 5vw, 48px)" }}>
            Jautājumi, kas <span style={{ color: "var(--accent)" }}>rodas bieži</span>
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={item.q}
                style={{
                  border: "1px solid " + (isOpen ? "color-mix(in oklab, var(--accent) 26%, var(--line))" : "var(--line)"),
                  borderRadius: 16,
                  background: "var(--bg-1)",
                  overflow: "hidden",
                  transition: "border-color 0.2s ease",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    padding: "18px 22px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    font: "inherit",
                  }}
                >
                  <span style={{ fontSize: 15.5, fontWeight: 600, letterSpacing: "-0.01em", color: "var(--ink)" }}>
                    {item.q}
                  </span>
                  <span
                    style={{
                      flexShrink: 0,
                      width: 30,
                      height: 30,
                      borderRadius: 9,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: isOpen ? "var(--accent)" : "var(--bg-2)",
                      color: isOpen ? "var(--accent-ink)" : "var(--ink-3)",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), background 0.2s ease, color 0.2s ease",
                    }}
                  >
                    <Plus size={15} />
                  </span>
                </button>

                <div
                  style={{
                    display: "grid",
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    transition: "grid-template-rows 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  <div style={{ overflow: "hidden" }}>
                    <p style={{ margin: 0, padding: "0 22px 20px", fontSize: 14.5, color: "var(--ink-2)", lineHeight: 1.65, maxWidth: "60ch" }}>
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
