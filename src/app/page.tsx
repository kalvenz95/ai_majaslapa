import { HeroLanding } from "@/components/ui/hero-1";
import Services from "@/components/Services";
import FastWin from "@/components/FastWin";
import Tools from "@/components/Tools";
import AILaunchpad from "@/components/AILaunchpad";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { YellowGlowBackground } from "@/components/ui/background-components";

export default function Home() {
  return (
    <main className="relative min-h-screen text-white overflow-x-hidden">
      <div className="fixed inset-0" style={{ zIndex: 0 }}>
        <YellowGlowBackground />
      </div>
      <div className="relative" style={{ zIndex: 1 }}>
        <HeroLanding
          title="Apgūsti AI rīkus latviski"
          description="Praktiskas lekcijas iesācējiem — bez tehniskas pieredzes."
          navigation={[
            { name: "Kursi", href: "#courses" },
            { name: "Cena", href: "#pricing" },
            { name: "Par mums", href: "#about" },
            { name: "Rezultāti", href: "#results" },
          ]}
          loginText="Pieslēgties"
          loginHref="/login"
          announcementBanner={{
            text: "🇱🇻 Latvijas pirmā AI monetizācijas platforma",
            linkText: "Skatīt kursus",
            linkHref: "#courses",
          }}
          callToActions={[
            { text: "Sākt tagad", href: "#start", variant: "primary" },
            { text: "Uzzināt vairāk", href: "#about", variant: "secondary" },
          ]}
          gradientColors={{
            from: "oklch(0.75 0.18 150)",
            to: "oklch(0.55 0.20 200)",
          }}
        />
        <Services />
        <FastWin />
<Tools />
        <AILaunchpad />
        <Testimonials />
        <Pricing />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}
