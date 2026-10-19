import { cn } from "@/lib/utils";

interface SkillChipProps {
  name: string;
  // Part of the current production stack; gets a subtle accent
  current?: boolean;
}

// Static label, not a control: no hover lift or pointer cursor. Chips sit directly on
// the backdrop, so a light glass material here never stacks on another glass layer.
export function SkillChip({ name, current = false }: SkillChipProps) {
  return (
    <span
      className={cn(
        "glass-effect inline-flex items-center rounded-full px-4 py-2.5 text-sm font-medium shadow-md",
        current && "ring-1 ring-inset ring-primary/40 text-primary"
      )}
    >
      {name}
    </span>
  );
}
