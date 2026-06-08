"use client";

import type { AppLocale } from "@/i18n/routing";
import { StackPlanMarketingPage } from "@/components/marketing/StackPlanMarketingPage";
import { digitalaisStack } from "@/content/marketing/digitalaisStack";
import { useLocale } from "next-intl";
import { DigitaalaisIntroLessonContent } from "@/components/marketing/DigitaalaisIntroLessonContent";
import { MajaslapaFunkcijuPiemeri } from "@/components/marketing/MajaslapaFunkcijuPiemeri";

const MajaslapaModuleVideo = (
  <div style={{ marginTop: 12, borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", position: "relative", paddingBottom: "56.25%", height: 0 }}>
    <iframe
      src="https://www.loom.com/embed/16119329d7d54cc7be87af6856a6d6b1"
      frameBorder={0}
      allowFullScreen
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
    />
  </div>
);

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
      curriculumVariant="showcase"
      extraAfterFreeLesson={locale === "lv" ? <DigitaalaisIntroLessonContent /> : undefined}
      moduleExtraContent={{
        2: (
          <>
            {MajaslapaModuleVideo}
            {locale === "lv" && <MajaslapaFunkcijuPiemeri />}
          </>
        ),
      }}
    />
  );
}
