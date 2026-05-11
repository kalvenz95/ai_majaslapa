import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import FastWin from "@/components/FastWin";
import Services from "@/components/Services";
import AILaunchpad from "@/components/AILaunchpad";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ background: "var(--bg)", color: "var(--ink)", overflowX: "hidden" }}>
      <Navbar />
      <Hero />
      <Marquee />
      <FastWin />
      <Services />
      <AILaunchpad />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
