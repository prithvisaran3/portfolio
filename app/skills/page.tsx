"use client";

import { motion } from "framer-motion";
import { reveal } from "@/lib/motion";
import { SectionTitle } from "@/components/ios/SectionTitle";
import { SkillChip } from "@/components/ios/SkillChip";
import skillGroups from "@/content/skills.json";

export default function SkillsPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <SectionTitle subtitle="Technologies and tools I work with">
        Skills & Technologies
      </SectionTitle>

      <div className="max-w-4xl mx-auto space-y-12">
        <p className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span aria-hidden className="glass-effect h-4 w-4 rounded-full ring-1 ring-inset ring-primary/40" />
          Highlighted skills are part of my current production stack
        </p>

        {skillGroups.map((group) => {
          const headingId = `skills-${group.title.toLowerCase().replace(/[^a-z]+/g, "-")}`;
          return (
          <motion.section
            key={group.title}
            {...reveal}
            aria-labelledby={headingId}
          >
            <h2 id={headingId} className="text-xl sm:text-2xl font-semibold mb-4">
              {group.title}
            </h2>
            <div className="flex flex-wrap gap-3">
              {group.skills.map((skill) => (
                <SkillChip
                  key={skill.name}
                  name={skill.name}
                  current={"current" in skill && skill.current}
                />
              ))}
            </div>
          </motion.section>
          );
        })}
      </div>
    </div>
  );
}
