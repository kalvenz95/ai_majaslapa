"use client";

import type { AppLocale } from "@/i18n/routing";
import { StackPlanMarketingPage } from "@/components/marketing/StackPlanMarketingPage";
import { saturaStack } from "@/content/marketing/saturaStack";
import { useLocale } from "next-intl";
import { SaturaIntroLessonContent } from "@/components/marketing/SaturaIntroLessonContent";

export default function SaturaSpecialistsPage() {
  const locale = useLocale() as AppLocale;
  return (
    <StackPlanMarketingPage
      plan={saturaStack[locale]}
      heroLayout="split"
      topBarRight="hiddenCta"
      playIconFill="#fff"
      ctaGradientEnd="#c084fc"
      ctaTextColor="#fff"
      skillsListMode="all"
      heroGlowAlpha={0.08}
      extraAfterFreeLesson={locale === "lv" ? <SaturaIntroLessonContent /> : undefined}
    />
  );
}
