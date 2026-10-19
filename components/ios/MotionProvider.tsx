"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

// Honors prefers-reduced-motion for every Framer Motion animation: transforms are
// skipped, opacity changes that aid comprehension are kept.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
