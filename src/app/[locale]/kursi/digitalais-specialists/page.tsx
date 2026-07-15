"use client";

import { useLocale, useTranslations } from "next-intl";
import type { AppLocale } from "@/i18n/routing";
import { digitalaisStack } from "@/content/marketing/digitalaisStack";
import { CHATBOT_MARKET_THEME } from "@/components/marketing/marketingCourseVisualThemes";
import { CourseExperience } from "@/components/course/CourseExperience";
import { stackToCourse } from "@/components/course/stackToCourse";

export default function DigitaalaisSpecialistsPage() {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("CoursePages.digitalaisSpecialists");
  const course = stackToCourse(digitalaisStack[locale]);

  return (
    <CourseExperience
      course={course}
      category={t("category")}
      accent="#00BFA5"
      accent2="#6D5EF3"
      glow="0,191,165"
      lessonTheme={CHATBOT_MARKET_THEME}
      incomeLadder={t.raw("ladder")}
    />
  );
}
