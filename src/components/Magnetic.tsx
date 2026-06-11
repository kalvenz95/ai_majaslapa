"use client";

import { useRef, type ReactNode } from "react";

/**
 * Subtle magnetic hover — the wrapped element drifts toward the cursor and
 * springs back on leave. Pointer-only (ignored on touch / reduced-motion).
 */
export function Magnetic({
  children,
  strength = 0.32,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0px, 0px)";
  };

  return (
    <span
      ref={ref}
      className={className}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ display: "inline-flex", transition: "transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)", willChange: "transform" }}
    >
      {children}
    </span>
  );
}
