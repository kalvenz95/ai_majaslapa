"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

/**
 * Counts the first number inside `value` up from zero when it scrolls into
 * view, preserving every surrounding character (prefix/suffix/spacing). Handles
 * formats like "350+", "94%", "€0", "3 ned.", "26 000".
 */
export function AnimatedNumber({
  value,
  duration = 1500,
  className,
  style,
}: {
  value: string;
  duration?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const numMatch = value.match(/\d[\d\s]*\d|\d/);
  const raw = numMatch?.[0] ?? "";
  const target = raw ? parseInt(raw.replace(/\s/g, ""), 10) : 0;
  const useSpaces = /\d\s\d/.test(raw) || target >= 10000;

  const fmt = (n: number) => {
    const s = String(Math.round(n));
    return useSpaces ? s.replace(/\B(?=(\d{3})+(?!\d))/g, " ") : s;
  };

  const [display, setDisplay] = useState(() =>
    raw ? value.replace(raw, fmt(0)) : value,
  );
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !raw || done.current) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(value);
      done.current = true;
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done.current) return;
        done.current = true;
        io.disconnect();
        const start = performance.now();
        const run = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
          setDisplay(value.replace(raw, fmt(target * eased)));
          if (t < 1) requestAnimationFrame(run);
        };
        requestAnimationFrame(run);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span ref={ref} className={className} style={style}>
      {display}
    </span>
  );
}
