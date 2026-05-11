import CTA from "@/components/CTA";
import FastWin from "@/components/FastWin";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import AILaunchpad from "@/components/AILaunchpad";
import Marquee from "@/components/Marquee";
import Pricing from "@/components/Pricing";
import SectionReveal from "@/components/SectionReveal";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
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
