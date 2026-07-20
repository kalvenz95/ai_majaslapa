"use client";

import { useLocale, useTranslations } from "next-intl";
import type { AppLocale } from "@/i18n/routing";
import { digitalaisStack } from "@/content/marketing/digitalaisStack";
import { CLAUDE_MARKET_THEME } from "@/components/marketing/marketingCourseVisualThemes";
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
      accent="#D97757"
      accent2="#E9A23B"
      glow="217,119,87"
      glow2="243,220,160"
      themeClass="theme-claude"
      taskColor="#BD5D3A"
      quizColor="#C99A2E"
      lessonTheme={CLAUDE_MARKET_THEME}    />
  );
}
