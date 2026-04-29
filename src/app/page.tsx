import { HeroLanding } from "@/components/ui/hero-1";
import FastWin from "@/components/FastWin";
import Tools from "@/components/Tools";
import AILaunchpad from "@/components/AILaunchpad";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen text-white overflow-x-hidden">
      <div className="fixed inset-0" style={{ zIndex: 0 }}>
        {/* Dark gradient background */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(180deg, #000000 0%, #05080F 20%, #032F3A 40%, #0891b2 70%, #22d3ee 100%)",
        }} />
        <div className="absolute inset-0 opacity-5 bg-repeat" style={{
          backgroundImage: 'url("https://framerusercontent.com/images/6mcf62RlDfRfU61Yg5vb2pefpi4.png")',
          backgroundSize: "149.76px",
        }} />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "linear-gradient(45deg, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(-45deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
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
