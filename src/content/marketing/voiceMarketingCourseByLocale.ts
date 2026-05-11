import type { AppLocale } from "@/i18n/routing";
import type { DetailMarketingCourse } from "@/content/marketing/marketingDetailCourse.types";
import { voiceMarketingCourseEn } from "@/content/marketing/voiceMarketingCourse.en";
import { voiceMarketingCourseLv } from "@/content/marketing/voiceMarketingCourse.lv";

export const voiceMarketingCourseByLocale = {
  lv: voiceMarketingCourseLv,
  en: voiceMarketingCourseEn,
} as const satisfies Record<AppLocale, DetailMarketingCourse>;
