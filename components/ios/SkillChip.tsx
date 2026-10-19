"use client";

import { motion } from "framer-motion";
import { GlassCard } from "./GlassCard";
import { cn } from "@/lib/utils";

interface SkillChipProps {
  name: string;
  index: number;
  // Part of the current production stack; gets a subtle accent
  current?: boolean;
}

export function SkillChip({ name, index, current = false }: SkillChipProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.3,
        delay: index * 0.03,
        type: "spring",
        stiffness: 200,
      }}
    >
      <GlassCard
        interactive
        elevation={1}
        className={cn("px-4 py-2.5 inline-block", current && "ring-1 ring-inset ring-primary/40")}
      >
        <span className={cn("font-medium text-sm", current && "text-primary")}>{name}</span>
      </GlassCard>
    </motion.div>
  );
}

