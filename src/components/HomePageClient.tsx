"use client";

import { motion, useReducedMotion } from "framer-motion";
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

/** ease-out cubic — entrances (animations.dev pattern) */
const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

function SectionReveal({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) {
    return <div>{children}</div>;
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-56px", amount: 0.12 }}
      transition={{ duration: 0.58, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}

export default function HomePageClient() {
  return (
    <main style={{ background: "var(--bg)", color: "var(--ink)", overflowX: "hidden" }}>
      <Navbar />
      <Hero />
      <SectionReveal>
        <Marquee />
      </SectionReveal>
      <SectionReveal>
        <FastWin />
      </SectionReveal>
      <SectionReveal>
        <Services />
      </SectionReveal>
      <SectionReveal>
        <AILaunchpad />
      </SectionReveal>
      <SectionReveal>
        <Testimonials />
      </SectionReveal>
      <SectionReveal>
        <Pricing />
      </SectionReveal>
      <SectionReveal>
        <CTA />
      </SectionReveal>
      <SectionReveal>
        <Footer />
      </SectionReveal>
    </main>
  );
}
