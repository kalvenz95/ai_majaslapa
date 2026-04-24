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
import ShaderBackground from "@/components/ui/shader-background";

export default function Home() {
  return (
    <main className="min-h-screen text-white overflow-x-hidden">
      <ShaderBackground />
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
    </main>
  );
}
