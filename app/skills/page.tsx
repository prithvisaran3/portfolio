"use client";

import { useEffect, useState } from "react";
import { motion, type PanInfo } from "framer-motion";
import { SectionTitle } from "@/components/ios/SectionTitle";
import { SkillChip } from "@/components/ios/SkillChip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { spring } from "@/lib/motion";
import skillsData from "@/content/skills.json";

const tabs = [
  { value: "languages", label: "Languages", skills: skillsData.languages },
  { value: "frameworks", label: "Frameworks", skills: skillsData.frameworks },
  { value: "tools", label: "Tools", skills: skillsData.tools },
];

export default function SkillsPage() {
  const [active, setActive] = useState(tabs[0].value);
  const [touch, setTouch] = useState(false);
  const index = tabs.findIndex((t) => t.value === active);

  useEffect(() => {
    setTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  // Swipe between tabs: chips follow the finger, a flick is projected forward, and the
  // first/last tab rubber-band instead of stopping dead
  const onDragEnd = (_: unknown, info: PanInfo) => {
    const projected = info.offset.x + info.velocity.x * 0.2;
    if (projected < -80 && index < tabs.length - 1) setActive(tabs[index + 1].value);
    else if (projected > 80 && index > 0) setActive(tabs[index - 1].value);
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <SectionTitle subtitle="Technologies and tools I work with">
        Skills & Technologies
      </SectionTitle>

      <div className="max-w-4xl mx-auto">
        <Tabs value={active} onValueChange={setActive} className="w-full">
          <TabsList className="grid h-12 w-full grid-cols-3 mb-8 glass-effect">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="press relative h-10 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                {active === tab.value && (
                  <motion.span
                    layoutId="skills-tab-pill"
                    className="absolute inset-0 rounded-sm bg-background shadow-sm"
                    transition={spring}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <motion.div
            drag={touch ? "x" : false}
            dragDirectionLock
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={{ left: index === tabs.length - 1 ? 0.15 : 0.9, right: index === 0 ? 0.15 : 0.9 }}
            dragTransition={{ bounceStiffness: 500, bounceDamping: 45 }}
            onDragEnd={onDragEnd}
          >
            {tabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value} className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  {tab.skills.map((skill, i) => (
                    <SkillChip key={skill.name} name={skill.name} index={i} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </motion.div>
          {touch && (
            <p className="mt-8 text-center text-xs text-muted-foreground">Swipe to switch tabs</p>
          )}
        </Tabs>
      </div>
    </div>
  );
}
