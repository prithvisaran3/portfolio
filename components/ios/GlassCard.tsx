"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { forwardRef, HTMLAttributes } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  elevation?: 1 | 2 | 3;
  interactive?: boolean;
}

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, elevation = 1, interactive = false, children, onClick }, ref) => {
    const elevationClasses = {
      1: "shadow-lg",
      2: "shadow-xl",
      3: "shadow-2xl",
    };

    return (
      <motion.div
        ref={ref}
        onClick={onClick}
        className={cn(
          "relative overflow-hidden rounded-3xl",
          "glass-effect",
          elevationClasses[elevation],
          interactive && "glass-effect-hover cursor-pointer",
          className
        )}
        whileHover={
          interactive
            ? {
                y: -4,
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                },
              }
            : undefined
        }
        whileTap={interactive ? { scale: 0.98 } : undefined}
      >
        {/* Inner highlight */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10">{children}</div>

        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-[var(--noise-opacity)] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        />
      </motion.div>
    );
  }
);

GlassCard.displayName = "GlassCard";

