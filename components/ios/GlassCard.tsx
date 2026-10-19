import { cn } from "@/lib/utils";
import { forwardRef, HTMLAttributes } from "react";

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  elevation?: 1 | 2 | 3;
  // Only for surfaces that do something on click: adds hover lift and press feedback
  interactive?: boolean;
}

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

      </div>
    );
  }
);

GlassCard.displayName = "GlassCard";
