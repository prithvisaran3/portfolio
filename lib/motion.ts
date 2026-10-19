import type { Transition, Variants } from "framer-motion";

// Shared motion tokens. Critically damped (bounce 0) by default, per Apple's
// guidance: overshoot is reserved for momentum gestures, which this site has none of.
export const spring: Transition = { type: "spring", bounce: 0, duration: 0.4 };
export const springSnappy: Transition = { type: "spring", bounce: 0, duration: 0.3 };

// One-shot reveal for content entering the viewport: short, no stagger chains,
// so nothing stays invisible while a reader is already looking at it.
export const reveal = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.05 },
  transition: { type: "spring", bounce: 0, duration: 0.45 },
} as const;

export const fadeScale: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
};
