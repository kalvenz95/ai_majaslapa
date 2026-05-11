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
    title: t("saturaSpecialists.title"),
    description: t("saturaSpecialists.description"),
  };
}

export default function SaturaCourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
