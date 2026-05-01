"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { stripeApi } from "@/lib/api";

interface PricingCheckoutButtonProps {
  plan: "PAMATI" | "IZAUGSME" | "MEISTARS";
  label: string;
  style?: React.CSSProperties;
  className?: string;
  onMouseEnter?: (e: React.MouseEvent) => void;
  onMouseLeave?: (e: React.MouseEvent) => void;
}

export function PricingCheckoutButton({
  plan,
  label,
  style,
  className,
  onMouseEnter,
  onMouseLeave,
}: PricingCheckoutButtonProps) {
  const { isSignedIn } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    if (!isSignedIn) {
      router.push(`/login?redirect=checkout&plan=${plan}`);
      return;
    }

    setLoading(true);
    try {
      const { url } = await stripeApi.createCheckout(plan);
      window.location.href = url;
    } catch {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={className}
      style={{ ...style, cursor: loading ? "wait" : "pointer" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {loading ? "Apstrādā..." : label}
    </button>
  );
}
