import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { setRequestLocale } from "next-intl/server";

export default async function PrivatumaPolitikaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const sections = [
    {
      title: "1. Vispārīga informācija",
      content: `Šī privātuma politika apraksta, kā SIA "Chademy" (turpmāk — "Chademy", "mēs", "mūsu") apkopo, izmanto un aizsargā personas datus, ko mūsu apmeklētāji un lietotāji sniedz, apmeklējot vietni chademy.lv un izmantojot mūsu pakalpojumus.\n\nMēs apstrādājam personas datus saskaņā ar Eiropas Parlamenta un Padomes Regulu (ES) 2016/679 (VDAR/GDPR) un Latvijas Republikas normatīvajiem aktiem.`,
    },
    {
      title: "2. Kādus datus mēs apkopojam",
      content: `Mēs apkopojam šādus personas datus:\n\n• Reģistrācijas dati: vārds, uzvārds, e-pasta adrese, izvēlētā parole (šifrētā formā).\n• Maksājumu dati: rēķinu informācija (pilnu karšu datus neglabājam — apstrādā drošs maksājumu pakalpojumu sniedzējs).\n• Lietošanas dati: apmeklētās lapas, klikšķi, sesijas ilgums, ierīces un pārlūka informācija.\n• Saziņas dati: ziņas, ko sūtāt mums pa e-pastu vai kontaktu veidlapu.`,
    },
    {
      title: "3. Kāpēc mēs apkopojam datus",
      content: `Personas datus apstrādājam šādiem mērķiem:\n\n• Lai nodrošinātu piekļuvi kursiem un platformas funkcijām.\n• Lai apstrādātu maksājumus un nosūtītu rēķinus.\n• Lai sazinātos ar jums par pasūtījumiem, atjauninājumiem un atbalstu.\n• Lai uzlabotu platformas darbību un lietotāju pieredzi.\n• Lai nosūtītu mārketinga paziņojumus (tikai ar jūsu piekrišanu).`,
    },
    {
      title: "4. Datu glabāšanas termiņš",
      content: `Jūsu personas datus glabājam tik ilgi, cik nepieciešams pakalpojumu sniegšanai vai likumā noteikto pienākumu izpildei:\n\n• Konta dati — kamēr konta ir aktīvs vai līdz dzēšanas pieprasījumam.\n• Maksājumu dati — 5 gadus saskaņā ar grāmatvedības normatīvajiem aktiem.\n• Mārketinga piekrišana — līdz atsaukšanai.`,
    },
    {
      title: "5. Datu nodošana trešajām pusēm",
      content: `Mēs nenodojam jūsu personas datus trešajām pusēm komerciālos nolūkos. Dati var tikt nodoti:\n\n• Maksājumu apstrādātājiem (piemēram, Stripe) — maksājumu drošai apstrādei.\n• Mārketinga rīkiem (piemēram, e-pasta sūtīšanas pakalpojumiem) — tikai ar jūsu piekrišanu.\n• Valsts iestādēm — ja to prasa likums.\n\nVisi pakalpojumu sniedzēji darbojas saskaņā ar GDPR prasībām.`,
    },
    {
      title: "6. Jūsu tiesības",
      content: `Saskaņā ar GDPR jums ir šādas tiesības:\n\n• Piekļuves tiesības — pieprasīt informāciju par glabātajiem datiem.\n• Labošanas tiesības — pieprasīt neprecīzu datu labošanu.\n• Dzēšanas tiesības — pieprasīt datu dzēšanu ("tiesības tikt aizmirstam").\n• Ierobežošanas tiesības — pieprasīt datu apstrādes ierobežošanu.\n• Pārnesamības tiesības — saņemt savus datus mašīnlasāmā formātā.\n• Iebildumu tiesības — iebilst pret datu apstrādi mārketinga vajadzībām.\n\nLai izmantotu šīs tiesības, sazinieties ar mums: info@chademy.lv`,
    },
    {
      title: "7. Sīkdatnes (cookies)",
      content: `Mūsu vietne izmanto sīkdatnes, lai:\n\n• Saglabātu jūsu pieteikšanās sesiju.\n• Analizētu vietnes apmeklējumus (Google Analytics vai līdzīgi rīki).\n• Nodrošinātu mārketinga funkcijas.\n\nJūs varat atspējot sīkdatnes pārlūkprogrammas iestatījumos, taču tas var ietekmēt vietnes darbību.`,
    },
    {
      title: "8. Izmaiņas privātuma politikā",
      content: `Mēs paturam tiesības jebkurā laikā mainīt šo privātuma politiku. Par būtiskām izmaiņām informēsim jūs pa e-pastu vai ar paziņojumu platformā. Turpinot izmantot mūsu pakalpojumus pēc izmaiņām, jūs piekrītat jaunajai politikai.`,
    },
    {
      title: "9. Kontaktinformācija",
      content: `Ja jums ir jautājumi par šo privātuma politiku vai personas datu apstrādi, sazinieties ar mums:\n\nE-pasts: info@chademy.lv\nAdrese: Latvija\n\nPēdējo reizi atjaunināts: 2025. gada janvārī.`,
    },
  ];

  return (
    <main style={{ background: "var(--bg)", color: "var(--ink)", minHeight: "100vh" }}>
      <Navbar />

      <section style={{ padding: "120px 0 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse 60% 40% at 70% 0%, color-mix(in oklab, var(--accent) 5%, transparent), transparent 65%)" }} />
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 2 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: "0.15em", color: "var(--ink-3)", textTransform: "uppercase" }}>
            <span style={{ display: "inline-block", width: 24, height: 1, background: "var(--accent)" }} />
            Juridiskā informācija
          </span>
          <h1 style={{ fontSize: "clamp(40px, 6vw, 80px)", lineHeight: 1.05, letterSpacing: "-0.04em", fontWeight: 700, margin: "16px 0 0", maxWidth: "16ch" }}>
            Privātuma{" "}
            <span style={{ background: "linear-gradient(120deg, var(--accent), color-mix(in oklab, var(--accent) 70%, white))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", fontStyle: "italic", fontFamily: "Fraunces, Georgia, serif", fontWeight: 500 }}>
              politika
            </span>
          </h1>
          <p style={{ fontSize: 16, color: "var(--ink-3)", marginTop: 16, fontFamily: "JetBrains Mono, monospace" }}>
            Pēdējo reizi atjaunināts: 2025. gada janvārī
          </p>
        </div>
      </section>

      <section style={{ padding: "0 0 120px", borderTop: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", padding: "80px 32px 0", display: "flex", flexDirection: "column", gap: 0 }}>
          {sections.map((s, i) => (
            <div
              key={s.title}
              style={{ padding: "36px 0", borderBottom: i < sections.length - 1 ? "1px solid var(--line)" : "none" }}
            >
              <h2 style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.015em", marginBottom: 16, color: "var(--ink)" }}>
                {s.title}
              </h2>
              <div style={{ fontSize: 15, color: "var(--ink-2)", lineHeight: 1.75, whiteSpace: "pre-line" }}>
                {s.content}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
