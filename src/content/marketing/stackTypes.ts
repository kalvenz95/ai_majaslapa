import type { AppLocale } from "@/i18n/routing";

export type StackLessonType = "video" | "text" | "task" | "quiz";

export type StackLesson = {
  id: string;
  title: string;
  type: StackLessonType;
  duration: string;
  free?: boolean;
  description?: string;
};

export type StackModule = {
  id: number;
  title: string;
  duration: string;
  free?: boolean;
  lessons: StackLesson[];
};

export type StackIncludedCourse = { icon: string; name: string; desc: string };

export type StackPlanModel = {
  name: string;
  price: string;
  tagline: string;
  earn: string;
  color: string;
  glow: string;
  courses: string[];
  stats: { lessons: number; modules: number; hours: string; students: number };
  learn: string[];
  skills: string[];
  modules: StackModule[];
  heroPill: string;
  heroBefore: string;
  heroHighlight: string;
  heroAfter: string;
  lead: string;
  topBarPlanLine: string;
  earningRows: { label: string; amount: string }[];
  includedCourses: StackIncludedCourse[];
  ctaPrimary: string;
  /** Optional premium sidebar block (Master plan) */
  premiumBonuses?: string[];
};

export const STACK_TYPE_ICONS: Record<StackLessonType, string> = {
  video: "▶",
  text: "≡",
  task: "✓",
  quiz: "?",
};

export type StackPlanByLocale = Record<AppLocale, StackPlanModel>;
