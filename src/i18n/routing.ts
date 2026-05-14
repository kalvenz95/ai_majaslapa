import { defineRouting } from "next-intl/routing";

export const locales = ["lv", "en"] as const;
export type AppLocale = (typeof locales)[number];

export const routing = defineRouting({
  locales: [...locales],
  defaultLocale: "lv",
  localePrefix: "always",
  localeDetection: false,
});
