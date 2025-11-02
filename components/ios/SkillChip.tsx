"use client";

import { motion } from "framer-motion";
import { GlassCard } from "./GlassCard";

interface SkillChipProps {
  name: string;
  index: number;
}

export function SkillChip({ name, index }: SkillChipProps) {
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
        <span className="font-medium text-sm">{name}</span>
      </GlassCard>
    </motion.div>
  );
}

