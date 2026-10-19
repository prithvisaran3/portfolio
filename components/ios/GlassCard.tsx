import { cn } from "@/lib/utils";
import { forwardRef, HTMLAttributes } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  elevation?: 1 | 2 | 3;
  // Only for surfaces that do something on click: adds hover lift and press feedback
  interactive?: boolean;
}

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")";

// Hover and press are pure CSS (see .glass-interactive in tokens.css), so feedback lands
// on pointer-down with no per-card JavaScript.
export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, elevation = 1, interactive = false, children, ...props }, ref) => {
    const elevationClasses = {
      1: "shadow-lg",
      2: "shadow-xl",
      3: "shadow-2xl",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-3xl",
          "glass-effect",
          elevationClasses[elevation],
          interactive && "glass-interactive cursor-pointer",
          className
        )}
        {...props}
      >
        {/* Inner highlight: light catching the top edge of the material */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)",
          }}
        />

        <div className="relative z-10">{children}</div>

        <div
          className="absolute inset-0 opacity-[var(--noise-opacity)] mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: NOISE, backgroundRepeat: "repeat" }}
        />
      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";
