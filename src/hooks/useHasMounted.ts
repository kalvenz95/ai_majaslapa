"use client";

import { useEffect, useState } from "react";

/**
 * Returns false on the server and on the client's first render, then true after mount.
 * Use to gate any branch that depends on browser-only APIs (e.g. matchMedia-based hooks
 * like useReducedMotion) so the hydration pass always matches the server-rendered markup.
 */
export function useHasMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
