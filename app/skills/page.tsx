"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ios/SectionTitle";
import { SkillChip } from "@/components/ios/SkillChip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { spring } from "@/lib/motion";
import skillGroups from "@/content/skills.json";

const slug = (title: string) => title.toLowerCase().replace(/[^a-z]+/g, "-");

export default function SkillsPage() {
  const [active, setActive] = useState(slug(skillGroups[0].title));

  return (
    <div className="container mx-auto px-4 py-20">
      <SectionTitle subtitle="Technologies and tools I work with">
        Skills & Technologies
      </SectionTitle>

      <div className="max-w-5xl mx-auto">
        <Tabs value={active} onValueChange={setActive} className="w-full">
          {/* Segmented control: scrolls sideways on phones, centred when it fits */}
          <div className="-mx-4 mb-8 overflow-x-auto px-4 py-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <TabsList className="glass-chrome mx-auto flex h-auto w-max gap-1 rounded-full bg-transparent p-1.5">
              {skillGroups.map((group) => {
                const value = slug(group.title);
                return (
                  <TabsTrigger
                    key={value}
                    value={value}
                    className="press relative rounded-full px-4 py-2 text-sm font-medium text-foreground/65 hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
                  >
                    {active === value && (
                      <motion.span
                        layoutId="skills-tab-pill"
                        className="absolute inset-0 rounded-full bg-background/80 shadow-sm ring-1 ring-foreground/5 dark:bg-foreground/10"
                        transition={spring}
                      />
                    )}
                    <span className="relative z-10">{group.title}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          {skillGroups.map((group) => (
            <TabsContent key={group.title} value={slug(group.title)} className="mt-0 focus-visible:ring-0">
              <div className="mx-auto flex min-h-[9rem] max-w-4xl flex-wrap justify-center gap-3">
                {group.skills.map((skill, index) => (
                  <SkillChip
                    key={skill.name}
                    name={skill.name}
                    index={index}
                    current={"current" in skill && skill.current}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <p className="mt-10 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span aria-hidden className="glass-chip h-4 w-4 rounded-full ring-1 ring-inset ring-primary/40" />
          Highlighted skills are part of my current production stack
        </p>
      </div>
    </div>
  );
}
