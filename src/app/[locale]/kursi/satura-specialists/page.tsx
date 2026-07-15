"use client";

import { useLocale, useTranslations } from "next-intl";
import type { AppLocale } from "@/i18n/routing";
import { saturaMarketingCourseByLocale } from "@/content/marketing/saturaMarketingCourse";
import { SATURA_MARKET_THEME } from "@/components/marketing/marketingCourseVisualThemes";
import { CourseExperience } from "@/components/course/CourseExperience";

export default function SaturaSpecialistsPage() {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("CoursePages.saturaSpecialists");
  const course = saturaMarketingCourseByLocale[locale];

  return (
    <CourseExperience
      course={course}
      category={t("category")}
      accent="#6D5EF3"
      accent2="#00BFA5"
      glow="109,94,243"
      lessonTheme={SATURA_MARKET_THEME}
      incomeLadder={t.raw("ladder")}
    />
  );
}
