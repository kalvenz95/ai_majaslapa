import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { setRequestLocale } from "next-intl/server";

export default async function MisijaPage({
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
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 70% 50% at 30% 0%, color-mix(in oklab, var(--accent) 7%, transparent), transparent 65%)" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 2 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.15em", color: "var(--ink-3)", textTransform: "uppercase" }}>
            <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--accent)" }} />
            Chademy
          </span>
          <h1 style={{ fontSize: "clamp(48px, 7vw, 96px)", lineHeight: 1.03, letterSpacing: "-0.04em", fontWeight: 700, margin: "16px 0 0", maxWidth: "14ch" }}>
            Mūsu{" "}
            <span style={{ background: "linear-gradient(120deg, var(--accent), color-mix(in oklab, var(--accent) 70%, white))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", fontStyle: "italic", fontFamily: "Fraunces, Georgia, serif", fontWeight: 500 }}>
              misija
            </span>
          </h1>
          <p style={{ fontSize: 20, color: "var(--ink-2)", maxWidth: 580, lineHeight: 1.6, marginTop: 24 }}>
            Mēs ticam, ka AI prasmes nav privilēģija — tās ir iespēja ikvienam latvietim.
          </p>
        </div>
      </section>

      <section style={{ padding: "0 0 80px", borderTop: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "80px 32px 0" }}>
          <div style={{ padding: "48px", border: "1px solid var(--line)", borderRadius: 24, background: "var(--bg-1)", marginBottom: 48, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 100% 100%, color-mix(in oklab, var(--accent) 8%, transparent), transparent 60%)", pointerEvents: "none" }} />
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.15em", color: "var(--ink-3)", textTransform: "uppercase", marginBottom: 20 }}>Misijas paziņojums</div>
            <p style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 600, lineHeight: 1.4, letterSpacing: "-0.02em", color: "var(--ink)", position: "relative", zIndex: 1 }}>
              "Padarīt AI monetizāciju pieejamu ikvienam latvietim — sniedzot praktiskas zināšanas, reālus rīkus un kopienas atbalstu, lai jebkurš varētu veidot ienākumus ar mākslīgo intelektu."
            </p>
          </div>

          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 700, letterSpacing: "-0.025em", marginBottom: 32 }}>Mūsu vērtības</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {[
              { title: "Praktiskums virs teorijas", desc: "Katrs kurss, katrs materiāls ir veidots tā, lai to varētu piemērot reālā darbā nākamajā dienā. Mēs nemācam teoriju tās pašas dēļ." },
              { title: "Caurspīdīgums", desc: "Mēs atklāti runājam par to, ko var un ko nevar nopelnīt ar AI. Bez pārspīlētiem solījumiem — tikai reāli piemēri no reāliem studentiem." },
              { title: "Kopiena kā pamats", desc: "Vienatnē mācīties ir grūti. Tāpēc Chademy centrā ir cilvēki — studenti, kuri palīdz viens otram un aug kopā." },
              { title: "Latvieši latvietiem", desc: "Mūsu saturs ir latviešu valodā, ar Latvijas uzņēmumu piemēriem un tirgus realitāti. Mēs saprotam, kāds ir Latvijas uzņēmējs." },
              { title: "Nepārtraukta attīstība", desc: "AI attīstās katru dienu — tāpat arī mūsu kursi. Mēs regulāri atjauninām saturu, lai tu vienmēr strādātu ar jaunākajiem rīkiem." },
            ].map((v, i) => (
              <div key={v.title} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 24, padding: "28px 0", borderBottom: i < 4 ? "1px solid var(--line)" : "none", alignItems: "start" }}>
                <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 13, color: "var(--accent)", fontWeight: 700, paddingTop: 3 }}>0{i + 1}</div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.015em", marginBottom: 8 }}>{v.title}</div>
                  <p style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.65 }}>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "80px 0", borderTop: "1px solid var(--line)", textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "0 32px" }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 20 }}>
            Pievienojies{" "}
            <span style={{ background: "linear-gradient(120deg, var(--accent), color-mix(in oklab, var(--accent) 70%, white))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", fontStyle: "italic", fontFamily: "Fraunces, Georgia, serif", fontWeight: 500 }}>
              misijai
            </span>
          </h2>
          <p style={{ fontSize: 16, color: "var(--ink-2)", lineHeight: 1.65, marginBottom: 32 }}>
            Katrs students, kurš pievienojas Chademy, kļūst par daļu no kustības, kas veido Latvijas digitālo nākotni.
          </p>
          <a href="/#pricing" style={{ display: "inline-block", background: "var(--accent)", color: "var(--accent-ink)", padding: "14px 32px", borderRadius: 12, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
            Sākt bezmaksas →
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
