import type { AppLocale } from "@/i18n/routing";
import type { DetailMarketingCourse } from "@/content/marketing/marketingDetailCourse.types";
import { websiteChatbotMarketingCourseEn } from "@/content/marketing/websiteChatbotMarketingCourse.en";
import { websiteChatbotMarketingCourseLv } from "@/content/marketing/websiteChatbotMarketingCourse.lv";

export const websiteChatbotMarketingCourseByLocale = {
  lv: websiteChatbotMarketingCourseLv,
  en: websiteChatbotMarketingCourseEn,
} as const satisfies Record<AppLocale, DetailMarketingCourse>;
