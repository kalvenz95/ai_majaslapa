import AILaunchpad from "@/components/AILaunchpad";
import CTA from "@/components/CTA";
import EasyStart from "@/components/EasyStart";
import FastWin from "@/components/FastWin";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";
import SectionReveal from "@/components/SectionReveal";
import Services from "@/components/Services";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import Tools from "@/components/Tools";
import WhyAI from "@/components/WhyAI";
import { setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  const base =
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || "http://localhost:3000";

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      type: "website",
      locale: locale === "lv" ? "lv_LV" : "en_US",
      url: `${base}/${locale}`,
    },
    alternates: {
      canonical: `${base}/${locale}`,
      languages: {
        lv: `${base}/lv`,
        en: `${base}/en`,
      },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main
      style={{
        background: "var(--bg)",
        color: "var(--ink)",
        overflowX: "hidden",
      }}
    >
      {/* 1. Hero */}
      <Navbar />
      <Hero />

      {/* Marquee — trust signal ticker after hero */}
      <SectionReveal>
        <Marquee />
      </SectionReveal>

      {/* 2. Why AI / Why Now */}
      <SectionReveal>
        <WhyAI />
      </SectionReveal>

      {/* 3. Course Paths */}
      <SectionReveal>
        <Services />
      </SectionReveal>

      {/* 4. How It Works / Roadmap */}
      <SectionReveal>
        <FastWin />
      </SectionReveal>

      {/* 5. Potential Income */}
      <SectionReveal>
        <AILaunchpad />
      </SectionReveal>

      {/* 6. Easy To Start */}
      <SectionReveal>
        <EasyStart />
      </SectionReveal>

      {/* 7. Student / Social Proof */}
      <SectionReveal>
        <Testimonials />
      </SectionReveal>

      {/* 8. Tools / Platform Stack */}
      <SectionReveal>
        <Tools />
      </SectionReveal>

      {/* 9. Pricing */}
      <SectionReveal>
        <Pricing />
      </SectionReveal>

      {/* 10. Final CTA */}
      <SectionReveal>
        <CTA />
      </SectionReveal>

      <SectionReveal>
        <Team />
      </SectionReveal>

      <SectionReveal>
        <Footer />
      </SectionReveal>
    </main>
  );
}
