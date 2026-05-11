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
    title: t("digitalaisSpecialists.title"),
    description: t("digitalaisSpecialists.description"),
  };
}

export default function DigCourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
