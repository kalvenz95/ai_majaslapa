import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { setRequestLocale } from "next-intl/server";

export default async function ParMusPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh" }}>
      <Navbar />

      <section style={{ padding: "120px 0 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 70% 50% at 60% 0%, color-mix(in oklab, var(--accent) 7%, transparent), transparent 65%)" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 2 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.15em", color: "var(--ink-3)", textTransform: "uppercase" }}>
            <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--accent)" }} />
            Chademy
          </span>
          <h1 style={{ fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 1.03, letterSpacing: "-0.04em", fontWeight: 700, margin: "16px 0 0", maxWidth: "16ch" }}>
            Par{" "}
            <span style={{ color: "var(--ink-2)", fontStyle: "italic", fontFamily: "Fraunces, Georgia, serif", fontWeight: 500 }}>
              Chademy
            </span>
          </h1>
          <p style={{ fontSize: 20, color: "var(--ink-2)", maxWidth: 600, lineHeight: 1.6, marginTop: 24 }}>
            Latvijas pirmā praktiskā AI monetizācijas platforma — izveidota cilvēkiem, kuri vēlas nopelnīt ar mākslīgo intelektu.
          </p>
        </div>
      </section>

      <section style={{ padding: "0 0 80px", borderTop: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 32px 0" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <div>
              <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 24 }}>
                Mūsu stāsts
              </h2>
              <p style={{ fontSize: 16, color: "var(--ink-2)", lineHeight: 1.75, marginBottom: 20 }}>
                Chademy dzima no vienkāršas atziņas: AI nav tikai lielo uzņēmumu instruments. Ikviens latvietis var iemācīties to lietot un veidot no tā ienākumus — nepieciešamas tikai pareizās zināšanas un praktisks atbalsts.
              </p>
              <p style={{ fontSize: 16, color: "var(--ink-2)", lineHeight: 1.75, marginBottom: 20 }}>
                Mēs nevis pastāstām teoriju — mēs parādām, kā korekti izmantot AI rīkus, kā uzrunāt pirmos klientus un kā izveidot stabilus ikmēneša ienākumus sniedzot AI pakalpojumus Latvijas un Eiropas uzņēmumiem.
              </p>
              <p style={{ fontSize: 16, color: "var(--ink-2)", lineHeight: 1.75 }}>
                Šodien Chademy ir vairāk nekā 350 aktīvi studenti Latvijā, kuri katru nedēļu apgūst jaunas prasmes un pārvērš tās reālos ienākumos.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { num: "350+", label: "Aktīvi studenti Latvijā" },
                { num: "94%", label: "Studentu apmierinātības rādītājs" },
                { num: "3 ned.", label: "Vidējais laiks līdz pirmajam klientam" },
                { num: "6+", label: "Apgūstami AI pakalpojumu veidi" },
              ].map((s) => (
                <div key={s.num} style={{ padding: "24px 28px", border: "1px solid var(--line)", borderRadius: 18, background: "var(--bg-1)", display: "flex", alignItems: "center", gap: 24 }}>
                  <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.04em", color: "var(--accent)", fontVariantNumeric: "tabular-nums", flexShrink: 0 }}>{s.num}</div>
                  <div style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 0", borderTop: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 700, letterSpacing: "-0.025em", marginBottom: 40 }}>Ko mēs darām</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {[
              { title: "Praktiski kursi", desc: "Katrs kurss ir veidots tā, lai tu pēc pirmās nedēļas jau varētu piedāvāt pakalpojumu reāliem klientiem. Nav liekas teorijas — tikai tas, kas strādā." },
              { title: "Kopiena & atbalsts", desc: "Pievienojies aktīvai kopienai, kurā studenti dalās ar pieredzi, palīdz viens otram un svin pirmos panākumus kopā." },
              { title: "Gatavs uzņēmējdarbības modelis", desc: "Mēs nevis māca AI — mēs māca, kā ar AI nopelnīt. Katrs kurss ietver cenu stratēģiju, klientu uzrunāšanas veidnes un reālus ienākumu piemērus." },
            ].map((c) => (
              <div key={c.title} style={{ padding: "28px 24px", border: "1px solid var(--line)", borderRadius: 20, background: "var(--bg-1)" }}>
                <div style={{ width: 8, height: 8, borderRadius: 999, background: "var(--accent)", marginBottom: 16 }} />
                <h3 style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.015em", marginBottom: 12 }}>{c.title}</h3>
                <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.65 }}>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .about-cards { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Footer />
    </main>
  );
}
