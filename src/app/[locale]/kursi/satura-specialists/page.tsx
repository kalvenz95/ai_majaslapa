"use client";

import type { ReactNode } from "react";
import { useLocale } from "next-intl";
import type { AppLocale } from "@/i18n/routing";
import { saturaMarketingCourseByLocale } from "@/content/marketing/saturaMarketingCourse";
import { SATURA_MARKET_THEME } from "@/components/marketing/marketingCourseVisualThemes";
import { CourseExperience } from "@/components/course/CourseExperience";
import { SaturaIntroLessonContent } from "@/components/marketing/SaturaIntroLessonContent";
import { SaturaLesson12Content } from "@/components/marketing/SaturaLesson12Content";
import { SaturaLesson13Content } from "@/components/marketing/SaturaLesson13Content";
import { SaturaLesson14Content } from "@/components/marketing/SaturaLesson14Content";

const lessonExtras: Record<string, ReactNode> = {
  "1-1": <SaturaIntroLessonContent />,
  "1-2": <SaturaLesson12Content />,
  "1-3": <SaturaLesson13Content />,
  "1-4": <SaturaLesson14Content />,
};

export default function SaturaSpecialistsPage() {
  const locale = useLocale() as AppLocale;
  const course = saturaMarketingCourseByLocale[locale];

  return (
    <CourseExperience
      course={course}
      category="Satura speciālists"
      accent="#6D5EF3"
      accent2="#00BFA5"
      glow="109,94,243"
      lessonTheme={SATURA_MARKET_THEME}
      lessonExtras={locale === "lv" ? lessonExtras : undefined}
      incomeLadder={[
        { clients: "1. klients", price: "€300–€500", note: "Iesācēja cena" },
        { clients: "2 klienti", price: "€600–€1 000", note: "Pēc 1. mēneša" },
        { clients: "3 klienti", price: "€1 200–€1 800", note: "Paceltas cenas" },
        { clients: "4+ klienti", price: "€1 800–€3 500", note: "Premium + upsell" },
      ]}
    />
  );
}
