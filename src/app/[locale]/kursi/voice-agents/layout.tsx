import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "CoursesMeta" });
  return {
    title: t("voiceAgents.title"),
    description: t("voiceAgents.description"),
  };
}

export default function VoiceAgentsCourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
