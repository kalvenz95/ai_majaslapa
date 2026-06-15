import type { DetailMarketingCourse } from "@/content/marketing/marketingDetailCourse.types";
import type { StackPlanModel } from "@/content/marketing/stackTypes";

type ToolEntry = { name: string; desc: string; color: string };

/**
 * Adapts a stack-plan model (used by AI Aģentu / Digitālais courses) to the
 * DetailMarketingCourse shape that CourseExperience consumes. Stack modules and
 * lessons are structurally compatible, so they pass through directly.
 */
export function stackToCourse(plan: StackPlanModel, tools: ToolEntry[] = []): DetailMarketingCourse {
  return {
    title: plan.name,
    subtitle: plan.tagline,
    description: plan.lead,
    earn: plan.earn,
    difficulty: "",
    tag: "",
    totalDuration: plan.stats.hours,
    totalLessons: plan.stats.lessons,
    totalModules: plan.stats.modules,
    students: plan.stats.students,
    rating: 4.9,
    instructor: { name: "", role: "", avatar: "", bio: "", students: 0, courses: 0 },
    tools,
    learn: plan.learn,
    modules: plan.modules,
  };
}
