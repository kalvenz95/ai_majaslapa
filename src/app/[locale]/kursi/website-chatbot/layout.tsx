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
    title: t("websiteChatbot.title"),
    description: t("websiteChatbot.description"),
  };
}

export default function ChatbotCourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
