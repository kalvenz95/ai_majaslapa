import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FastWin from "@/components/FastWin";
import AILaunchpad from "@/components/AILaunchpad";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Tools from "@/components/Tools";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen text-white overflow-x-hidden">
      {/* Fixed background */}
      <div className="fixed inset-0" style={{ zIndex: 0 }}>
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
      </div>

      <div className="relative" style={{ zIndex: 1 }}>
        {/* 1. Navbar */}
        <Navbar />

        {/* 2. Hero */}
        <Hero />

        {/* 3. Roadmap */}
        <FastWin />

        {/* 4. Income bloks */}
        <AILaunchpad />

        {/* 6. Social proof */}
        <Testimonials />

        {/* 7. Pricing */}
        <Pricing />

        {/* 8. Tools */}
        <Tools />

        {/* 9. Final CTA */}
        <CTA />

        {/* 10. Footer */}
        <Footer />
      </div>
    </main>
  );
}
