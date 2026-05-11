"use client";

import { motion, useReducedMotion } from "framer-motion";

/** ease-out cubic — entrances (animations.dev pattern) */
const EASE_OUT = [0.215, 0.61, 0.355, 1] as const;

export default function SectionReveal({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) {
    return <div>{children}</div>;
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-56px", amount: 0.12 }}
      transition={{ duration: 0.58, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
