"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useHasMounted } from "@/hooks/useHasMounted";

/** ease-out cubic — entrances (animations.dev pattern) */
const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

export default function SectionReveal({ children }: { children: React.ReactNode }) {
  const hasMounted = useHasMounted();
  const reduceMotion = useReducedMotion();
  if (hasMounted && reduceMotion) {
    return <div>{children}</div>;
  }
  return (
    <motion.div
      initial={{ opacity: 1, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px", amount: 0.08 }}
      transition={{ duration: 0.48, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
