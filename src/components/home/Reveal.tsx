"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useHasMounted } from "@/hooks/useHasMounted";
import type { ReactNode } from "react";

const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

/**
 * Scroll-into-view reveal with optional stagger delay.
 * Used inside V2 homepage sections for element-level entrances.
 */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  style,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const hasMounted = useHasMounted();
  const reduceMotion = useReducedMotion();
  if (hasMounted && reduceMotion) {
    return <div className={className} style={style}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}
