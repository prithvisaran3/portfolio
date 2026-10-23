"use client";

import { SectionTitle } from "@/components/ios/SectionTitle";
import { SkillChip } from "@/components/ios/SkillChip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import skillsData from "@/content/skills.json";

const tabs = [
  { value: "languages", label: "Languages", skills: skillsData.languages },
  { value: "frameworks", label: "Frameworks", skills: skillsData.frameworks },
  { value: "tools", label: "Tools", skills: skillsData.tools },
];

export default function SkillsPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <SectionTitle subtitle="Technologies and tools I work with">
        Skills & Technologies
      </SectionTitle>

      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="languages" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 glass-effect">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="space-y-4">
              <div className="flex flex-wrap gap-3">
                {tab.skills.map((skill, index) => (
                  <SkillChip key={skill.name} name={skill.name} index={index} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
