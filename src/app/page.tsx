import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import FastWin from "@/components/FastWin";
import Tools from "@/components/Tools";
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
        <Navbar />
        <Hero />
        <Services />
        <FastWin />
<Tools />
        <Testimonials />
        <Pricing />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}
