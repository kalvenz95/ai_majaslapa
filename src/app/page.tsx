import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import FastWin from "@/components/FastWin";
import BuildPack from "@/components/BuildPack";
import Tools from "@/components/Tools";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";

export default function Home() {
  return (
    <main className="relative min-h-screen text-white overflow-x-hidden">
      <div className="fixed inset-0" style={{ zIndex: 0 }}>
        <AnimatedGradientBackground
          startingGap={110}
          Breathing={true}
          breathingRange={6}
          animationSpeed={0.015}
          topOffset={10}
          gradientColors={[
            "#020208",
            "#1a0840",
            "#4a1a9e",
            "#7c3aed",
            "#2e0d6e",
            "#0d0428",
            "#020208",
          ]}
          gradientStops={[28, 42, 54, 62, 72, 86, 100]}
        />
      </div>
      <div className="relative" style={{ zIndex: 1 }}>
        <Navbar />
        <Hero />
        <Services />
        <FastWin />
        <BuildPack />
        <Tools />
        <Testimonials />
        <Pricing />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}
