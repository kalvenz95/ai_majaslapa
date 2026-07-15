"use client";

import { useLocale, useTranslations } from "next-intl";
import type { AppLocale } from "@/i18n/routing";
import { aiAgentStack } from "@/content/marketing/aiAgentStack";
import { VOICE_MARKET_THEME } from "@/components/marketing/marketingCourseVisualThemes";
import { CourseExperience } from "@/components/course/CourseExperience";
import { stackToCourse } from "@/components/course/stackToCourse";

export default function AIAgentuEkspertsPage() {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("CoursePages.aiAgentuEksperts");
  const course = stackToCourse(aiAgentStack[locale]);

  return (
    <CourseExperience
      course={course}
      category={t("category")}
      accent="#E8924A"
      accent2="#FFB86B"
      glow="232,146,74"
      lessonTheme={VOICE_MARKET_THEME}
      incomeLadder={t.raw("ladder")}
    />
  );
}
