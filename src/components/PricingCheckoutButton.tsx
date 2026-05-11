"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { stripeApi } from "@/lib/api";

interface PricingCheckoutButtonProps {
  plan: "PAMATI" | "IZAUGSME" | "MEISTARS";
  href: string;
  label: string;
  style?: React.CSSProperties;
  className?: string;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
}

export function PricingCheckoutButton({
  plan,
  href,
  label,
  style,
  className,
  onMouseEnter,
  onMouseLeave,
}: PricingCheckoutButtonProps) {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const tc = useTranslations("Common");

  async function handleClick() {
    if (!isSignedIn) {
      router.push(href);
      return;
    }

    setLoading(true);
    try {
      const { url } = await stripeApi.createCheckout(plan);
      if (url) {
        window.location.href = url;
      } else {
        router.push(href);
        setLoading(false);
      }
    } catch {
      router.push(href);
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={() => void handleClick()}
      disabled={loading}
      className={className}
      style={{ ...style, cursor: loading ? "wait" : "pointer" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {loading ? tc("processing") : label}
    </button>
  );
}
