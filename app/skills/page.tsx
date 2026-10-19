"use client";

import { motion } from "framer-motion";
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
          <span aria-hidden className="h-3 w-3 rounded-full ring-1 ring-inset ring-primary/60 bg-primary/10" />
          Highlighted skills are part of my current production stack
        </p>

        {skillGroups.map((group) => {
          const headingId = `skills-${group.title.toLowerCase().replace(/[^a-z]+/g, "-")}`;
          return (
          <motion.section
            key={group.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            aria-labelledby={headingId}
          >
            <h2 id={headingId} className="text-xl sm:text-2xl font-bold mb-4">
              {group.title}
            </h2>
            <div className="flex flex-wrap gap-3">
              {group.skills.map((skill, index) => (
                <SkillChip
                  key={skill.name}
                  name={skill.name}
                  index={index}
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
