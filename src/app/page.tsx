import { HeroLanding } from "@/components/ui/hero-1";
import Services from "@/components/Services";
import FastWin from "@/components/FastWin";
import Tools from "@/components/Tools";
import AILaunchpad from "@/components/AILaunchpad";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { RadialBackground } from "@/components/ui/radial-background";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <RadialBackground />
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
          from: "#6633ee",
          to: "#4f46e5",
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
    </main>
  );
}
