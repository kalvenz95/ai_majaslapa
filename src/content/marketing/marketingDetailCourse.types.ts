import type { AppLocale } from "@/i18n/routing";

export type { AppLocale };

export type DetailLessonType = "video" | "text" | "task" | "quiz";

export interface DetailLesson {
  id: string;
  title: string;
  type: DetailLessonType;
  duration: string;
  free?: boolean;
  description?: string;
}

export interface DetailModule {
  id: number;
  title: string;
  duration: string;
  lessons: DetailLesson[];
  /** Optional cover image (e.g. "/ai/card-social.jpg") — renders a premium module card banner. */
  cover?: string;
  /** Optional one-line module summary shown under the title on the module card. */
  summary?: string;
}

export type DetailMarketingCourse = {
  title: string;
  subtitle: string;
  description: string;
  earn: string;
  difficulty: string;
  tag: string;
  totalDuration: string;
  totalLessons: number;
  totalModules: number;
  students: number;
  rating: number;
  instructor: {
    name: string;
    role: string;
    avatar: string;
    bio: string;
    students: number;
    courses: number;
  };
  tools: { name: string; desc: string; color: string }[];
  learn: string[];
  modules: DetailModule[];
};

export type DetailCourseByLocale = Record<AppLocale, DetailMarketingCourse>;
