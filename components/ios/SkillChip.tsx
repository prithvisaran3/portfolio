import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

interface SkillChipProps {
  name: string;
  // Position in its group, for a short entrance stagger
  index?: number;
  // Part of the current production stack; gets a subtle accent
  current?: boolean;
}

// Pops in once with a short stagger (CSS transition, no overshoot). The outer element
// owns the entrance transform so the chip's hover lift is never overridden.
export function SkillChip({ name, index = 0, current = false }: SkillChipProps) {
  return (
    <Reveal as="span" delay={Math.min(index * 0.025, 0.3)} className="reveal-pop inline-flex">
      <span
        className={cn(
          "glass-chip lift inline-flex items-center rounded-full px-4 py-2.5 text-sm font-medium",
          current && "ring-1 ring-inset ring-primary/40 text-primary"
        )}
      >
        {name}
      </span>
    </Reveal>
  );
}
