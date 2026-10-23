import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SkillChipProps {
  name: string;
  // Position in its group, for the entrance stagger
  index?: number;
  className?: string;
}

// The original glass chip: pops in with a short stagger and lifts on hover. It uses the
// blur-free chip material, since dozens of live backdrop blurs were what made this page
// drop frames; at chip size the two read the same.
export function SkillChip({ name, index = 0, className }: SkillChipProps) {
  return (
    <Reveal as="span" variant="pop" delay={Math.min(index * 0.03, 0.45)} className="inline-flex">
      <span
        className={cn(
          "glass-chip lift-chip relative inline-flex cursor-default items-center overflow-hidden rounded-3xl px-4 py-2.5 shadow-lg",
          className
        )}
      >
        {/* Inner highlight, as on GlassCard */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)" }}
        />
        <span className="relative text-sm font-medium">{name}</span>
      </span>
    </Reveal>
  );
}
