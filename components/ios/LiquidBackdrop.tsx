"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// Three blurred color fields that drift slowly behind the glass. The drift is a CSS
// transform animation on pre-blurred layers, so the compositor does the work and the
// blur is never re-rasterized. Parallax is a scroll-linked motion value: no re-renders.
export function LiquidBackdrop() {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();

  const blob1Y = useTransform(scrollY, [0, 1000], [0, 200]);
  const blob2Y = useTransform(scrollY, [0, 1000], [0, -150]);
  const blob3Y = useTransform(scrollY, [0, 1000], [0, 100]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted" />

      <motion.div
        style={{ y: reduceMotion ? 0 : blob1Y }}
        className="absolute -top-40 -left-40 h-96 w-96"
      >
        <div className="blob-drift-1 h-full w-full rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 opacity-30 blur-3xl dark:from-blue-600 dark:to-cyan-600 dark:opacity-20" />
      </motion.div>

      <motion.div
        style={{ y: reduceMotion ? 0 : blob2Y }}
        className="absolute top-1/3 -right-40 h-[500px] w-[500px]"
      >
        <div className="blob-drift-2 h-full w-full rounded-full bg-gradient-to-br from-purple-500 to-pink-500 opacity-25 blur-3xl dark:from-purple-600 dark:to-pink-600 dark:opacity-15" />
      </motion.div>

      <motion.div
        style={{ y: reduceMotion ? 0 : blob3Y }}
        className="absolute bottom-0 left-1/3 h-[400px] w-[400px]"
      >
        <div className="blob-drift-3 h-full w-full rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 opacity-20 blur-3xl dark:from-orange-600 dark:to-yellow-600 dark:opacity-10" />
      </motion.div>

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />
    </div>
  );
}
