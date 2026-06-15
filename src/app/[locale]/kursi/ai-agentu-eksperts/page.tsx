"use client";

import type { ReactNode } from "react";
import { useLocale } from "next-intl";
import type { AppLocale } from "@/i18n/routing";
import { aiAgentStack } from "@/content/marketing/aiAgentStack";
import { VOICE_MARKET_THEME } from "@/components/marketing/marketingCourseVisualThemes";
import { CourseExperience } from "@/components/course/CourseExperience";
import { stackToCourse } from "@/components/course/stackToCourse";
import { AIAgentIntroLessonContent } from "@/components/marketing/AIAgentIntroLessonContent";

const TOOLS = [
  { name: "Retell AI", desc: "Balss aģentu platforma", color: "#E8924A" },
  { name: "ElevenLabs", desc: "Reālistiskas latviešu balsis", color: "#6D5EF3" },
  { name: "n8n", desc: "Automatizācijas plūsmas", color: "#00BFA5" },
  { name: "Make.com", desc: "Vizuālā automatizācija", color: "#FFB86B" },
  { name: "Vonage", desc: "Latvijas tālruņa numuri", color: "#00BFA5" },
  { name: "Twilio", desc: "Zvanu infrastruktūra", color: "#E8924A" },
  { name: "Supabase", desc: "Backend bez koda", color: "#00BFA5" },
  { name: "Bolt.new", desc: "AI aplikāciju veidošana", color: "#6D5EF3" },
];

export default function AIAgentuEkspertsPage() {
  const locale = useLocale() as AppLocale;
  const course = stackToCourse(aiAgentStack[locale], TOOLS);
  const firstLesson = course.modules[0]?.lessons[0]?.id;

  const lessonExtras: Record<string, ReactNode> | undefined =
    locale === "lv" && firstLesson ? { [firstLesson]: <AIAgentIntroLessonContent /> } : undefined;

  return (
    <CourseExperience
      course={course}
      category="AI Aģentu eksperts · Premium"
      accent="#E8924A"
      accent2="#FFB86B"
      glow="232,146,74"
      lessonTheme={VOICE_MARKET_THEME}
      lessonExtras={lessonExtras}
      incomeLadder={[
        { clients: "1. klients", price: "€800–€2 500", note: "Projekts + uzturēšana" },
        { clients: "2 klienti", price: "€1 600–€3 200", note: "Pēc 1–2 mēnešiem" },
        { clients: "3–4 klienti", price: "€3 200–€6 000", note: "Paceltas cenas" },
        { clients: "5+ klienti", price: "€3 200–€9 000", note: "Aģentūras modelis" },
      ]}
    />
  );
}
