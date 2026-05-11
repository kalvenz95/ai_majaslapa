"use client";

import type { AppLocale } from "@/i18n/routing";
import { StackPlanMarketingPage } from "@/components/marketing/StackPlanMarketingPage";
import { digitalaisStack } from "@/content/marketing/digitalaisStack";
import { useLocale } from "next-intl";

export default function DigitaalaisSpecialistsPage() {
  const locale = useLocale() as AppLocale;
  return (
    <StackPlanMarketingPage
      plan={digitalaisStack[locale]}
      heroLayout="simple"
      topBarRight="spacer"
      playIconFill="#000"
      ctaGradientEnd="#00d4ff"
      ctaTextColor="#000"
      skillsListMode="all"
      heroGlowAlpha={0.07}
    />
  );
}
