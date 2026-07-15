"use client";

import { useLocale } from "next-intl";
import type { AppLocale } from "@/i18n/routing";
import { digitalaisStack } from "@/content/marketing/digitalaisStack";
import { CHATBOT_MARKET_THEME } from "@/components/marketing/marketingCourseVisualThemes";
import { CourseExperience } from "@/components/course/CourseExperience";
import { stackToCourse } from "@/components/course/stackToCourse";

const TOOLS = [
  { name: "Framer", desc: "Mājaslapa bez koda", color: "#6D5EF3" },
  { name: "WordPress", desc: "CMS un mājaslapas", color: "#00BFA5" },
  { name: "Voiceflow", desc: "AI čatbota būvēšana", color: "#6D5EF3" },
  { name: "Claude", desc: "Saturs un e-pasti", color: "#E8924A" },
  { name: "ChatGPT", desc: "Teksts un atbildes", color: "#00BFA5" },
  { name: "Make.com", desc: "Automatizācija", color: "#FFB86B" },
  { name: "Stripe", desc: "Maksājumi online", color: "#6D5EF3" },
  { name: "Cursor", desc: "AI koda palīgs", color: "#FFB86B" },
];

export default function DigitaalaisSpecialistsPage() {
  const locale = useLocale() as AppLocale;
  const course = stackToCourse(digitalaisStack[locale], TOOLS);

  return (
    <CourseExperience
      course={course}
      category="Mājaslapas & automatizācija"
      accent="#00BFA5"
      accent2="#6D5EF3"
      glow="0,191,165"
      lessonTheme={CHATBOT_MARKET_THEME}
      incomeLadder={[
        { clients: "1. klients", price: "€500–€900", note: "Pirmā mājaslapa" },
        { clients: "2–3 klienti", price: "€1 000–€3 600", note: "Stabils ienākums" },
        { clients: "4–6 klienti", price: "€2 000–€7 200", note: "Pilna slodze" },
        { clients: "Uzturēšana", price: "€150–€400/mēn", note: "Atkārtots ienākums" },
      ]}
    />
  );
}
