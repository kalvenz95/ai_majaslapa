import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import Navbar from "@/components/Navbar";
import Team from "@/components/Team";

import HeroV2 from "@/components/home/HeroV2";
import WhyAIV2 from "@/components/home/WhyAIV2";
import DirectionsV2 from "@/components/home/DirectionsV2";
import DirectionDemosV2 from "@/components/home/DirectionDemosV2";
import HowItWorksV2 from "@/components/home/HowItWorksV2";
import IncomeV2 from "@/components/home/IncomeV2";
import NoSkillsV2 from "@/components/home/NoSkillsV2";
import ProjectsV2 from "@/components/home/ProjectsV2";
import LiveVoiceAgents from "@/components/home/LiveVoiceAgents";
import CommunityV2 from "@/components/home/CommunityV2";
import ToolsV2 from "@/components/home/ToolsV2";
import PricingV2 from "@/components/home/PricingV2";
import FAQV2 from "@/components/home/FAQV2";
import FinalCTAV2 from "@/components/home/FinalCTAV2";

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
        /* clip (not hidden) — hidden creates a scroll container and breaks position:sticky */
        overflowX: "clip",
      }}
    >
      <Navbar />

      {/* 1. Hero — what Chademy is, at a glance */}
      <HeroV2 />

      {/* Tool ticker — trust signal */}
      <Marquee />

      {/* 2. Why AI skills matter (dark immersive) */}
      <WhyAIV2 />

      {/* 3. Choose your direction */}
      <DirectionsV2 />

      {/* 3b. Direction demos — live product mockups */}
      <DirectionDemosV2 />

      {/* 4. How it works */}
      <HowItWorksV2 />

      {/* 5. Income examples (dark panel) */}
      <IncomeV2 />

      {/* 6. No technical skills needed */}
      <NoSkillsV2 />

      {/* 7. Real project examples */}
      <ProjectsV2 />

      {/* 7c. Live voice agents — talk to our Vapi agents in the browser */}
      <LiveVoiceAgents />

      {/* 8. Community + results */}
      <CommunityV2 />

      {/* People behind the platform */}
      <Team />

      {/* 9. Tools you will learn */}
      <ToolsV2 />

      {/* 10. Pricing */}
      <PricingV2 />

      {/* 11. FAQ */}
      <FAQV2 />

      {/* 12. Final CTA (dark) */}
      <FinalCTAV2 />

      <Footer />
    </main>
  );
}
