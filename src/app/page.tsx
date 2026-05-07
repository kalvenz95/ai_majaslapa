import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyAI from "@/components/WhyAI";
import FastWin from "@/components/FastWin";
import Services from "@/components/Services";
import AILaunchpad from "@/components/AILaunchpad";
import EasyStart from "@/components/EasyStart";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import BuildPack from "@/components/BuildPack";
import Tools from "@/components/Tools";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ background: "var(--bg)", color: "var(--ink)" }}>
      {/* Subtle radial accent glows — fixed behind all content */}
      <div className="fixed inset-0" style={{ zIndex: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 80% 50% at 15% 0%, color-mix(in oklab, var(--accent) 6%, transparent), transparent 60%), radial-gradient(ellipse 60% 40% at 85% 100%, color-mix(in oklab, var(--accent) 3%, transparent), transparent 55%)",
        }} />
      </div>

      <div className="relative" style={{ zIndex: 1 }}>
        <Navbar />
        <Hero />         {/* 1. Hero */}
        <WhyAI />        {/* 2. Kāpēc AI */}
        <FastWin />      {/* 3. Roadmap */}
        <Services />     {/* 3. Virzieni */}
        <AILaunchpad />  {/* 4. Income */}
        <EasyStart />    {/* 5. No-code */}
        <Testimonials /> {/* 6. Social Proof */}
        <Pricing />      {/* 6. Pricing */}
        <BuildPack />    {/* 7. Par mums / Build Pack */}
        <Tools />        {/* 8. Tools */}
        <CTA />          {/* 8. Final CTA */}
        <Footer />
      </div>
    </main>
  );
}
