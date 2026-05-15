"use client";

import type { AppLocale } from "@/i18n/routing";
import { StackPlanMarketingPage } from "@/components/marketing/StackPlanMarketingPage";
import { aiAgentStack } from "@/content/marketing/aiAgentStack";
import { useLocale } from "next-intl";
import { AIAgentIntroLessonContent } from "@/components/marketing/AIAgentIntroLessonContent";

export default function AIAgentuEkspertsPage() {
  const locale = useLocale() as AppLocale;
  return (
    <StackPlanMarketingPage
      plan={aiAgentStack[locale]}
      heroLayout="simple"
      topBarRight="spacer"
      playIconFill="#fff"
      ctaGradientEnd="#fbbf24"
      ctaTextColor="#fff"
      skillsListMode="first3"
      heroGlowAlpha={0.08}
      extraAfterFreeLesson={locale === "lv" ? <AIAgentIntroLessonContent /> : undefined}
    />
  );
}
