import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyAI from "@/components/WhyAI";
import FastWin from "@/components/FastWin";
import Services from "@/components/Services";
import AILaunchpad from "@/components/AILaunchpad";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Tools from "@/components/Tools";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen text-white overflow-x-hidden">
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
        <Navbar />
        <Hero />         {/* 1. Hero */}
        <WhyAI />        {/* 2. Kāpēc AI */}
        <FastWin />      {/* 3. Roadmap */}
        <Services />     {/* 3. Virzieni */}
        <AILaunchpad />  {/* 4. Income */}
        <Testimonials /> {/* 5. Social Proof */}
        <Pricing />      {/* 6. Pricing */}
        <Tools />        {/* 7. Tools */}
        <CTA />          {/* 8. Final CTA */}
        <Footer />
      </div>
    </main>
  );
}
