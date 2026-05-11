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
    title: t("aiAgentuEksperts.title"),
    description: t("aiAgentuEksperts.description"),
  };
}

export default function AgentCourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
