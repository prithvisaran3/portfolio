"use client";

import { motion } from "framer-motion";
import { GlassCard } from "./GlassCard";

interface SkillChipProps {
  name: string;
  level?: "expert" | "advanced" | "intermediate";
  index: number;
}

const levelColors = {
  expert: "bg-green-500/20 text-green-700 dark:text-green-300",
  advanced: "bg-blue-500/20 text-blue-700 dark:text-blue-300",
  intermediate: "bg-orange-500/20 text-orange-700 dark:text-orange-300",
};

export function SkillChip({ name, level, index }: SkillChipProps) {
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
        className="px-4 py-2.5 inline-block"
      >
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm">{name}</span>
          {level && (
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${levelColors[level]}`}
            >
              {level}
            </span>
          )}
        </div>
      </GlassCard>
    </motion.div>
  );
}

