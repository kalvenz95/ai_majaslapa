"use client";

import Link from "next/link";
import type { ReactNode } from "react";

/** Must be client: hover handlers cannot live in Server Components. */
export function CourseLinkCard({
  href,
  color,
  children,
}: {
  href: string;
  color: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="block rounded-2xl p-5 transition-all duration-200"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
        textDecoration: "none",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.border = `1px solid ${color}40`;
        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.border = "1px solid rgba(255,255,255,0.07)";
        (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
      }}
    >
      {children}
    </Link>
  );
}
