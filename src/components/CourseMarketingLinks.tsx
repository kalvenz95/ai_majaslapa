"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

/** Full top-bar style back navigation */
export function CourseTopBarHomeLink({
  style,
}: {
  style?: React.CSSProperties;
}) {
  const tc = useTranslations("CoursesChrome");
  return (
    <Link href="/" prefetch={false} style={style}>
      <span>←</span> {tc("topBarBack")}
    </Link>
  );
}

export function CourseFooterComparePlans({
  style,
}: {
  style?: React.CSSProperties;
}) {
  const tc = useTranslations("CoursesChrome");
  return (
    <Link href="/#pricing" prefetch={false} style={style}>
      {tc("comparePlans")}
    </Link>
  );
}
