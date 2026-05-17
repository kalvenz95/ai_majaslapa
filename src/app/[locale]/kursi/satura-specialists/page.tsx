"use client";

import type { AppLocale } from "@/i18n/routing";
import { StackPlanMarketingPage } from "@/components/marketing/StackPlanMarketingPage";
import { saturaStack } from "@/content/marketing/saturaStack";
import { useLocale } from "next-intl";
import { SaturaIntroLessonContent } from "@/components/marketing/SaturaIntroLessonContent";
import { SaturaLesson12Content } from "@/components/marketing/SaturaLesson12Content";
import { SaturaLesson13Content } from "@/components/marketing/SaturaLesson13Content";
import { SaturaLesson14Content } from "@/components/marketing/SaturaLesson14Content";

export default function SaturaSpecialistsPage() {
  const locale = useLocale() as AppLocale;

  const lvLessonContent = {
    "1.1": <SaturaIntroLessonContent />,
    "1.2": <SaturaLesson12Content />,
    "1.3": <SaturaLesson13Content />,
    "1.4": <SaturaLesson14Content />,
  };

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
      lessonExtraContent={locale === "lv" ? lvLessonContent : undefined}
    />
  );
}
