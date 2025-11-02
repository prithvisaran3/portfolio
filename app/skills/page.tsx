"use client";

import { SectionTitle } from "@/components/ios/SectionTitle";
import { SkillChip } from "@/components/ios/SkillChip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import skillsData from "@/content/skills.json";

export default function SkillsPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <SectionTitle subtitle="Technologies and tools I work with">
        Skills & Technologies
      </SectionTitle>

      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="languages" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 glass-effect">
            <TabsTrigger value="languages">Languages</TabsTrigger>
            <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="languages" className="space-y-4">
            <div className="flex flex-wrap gap-3">
              {skillsData.languages.map((skill, index) => (
                <SkillChip
                  key={skill.name}
                  name={skill.name}
                  index={index}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="frameworks" className="space-y-4">
            <div className="flex flex-wrap gap-3">
              {skillsData.frameworks.map((skill, index) => (
                <SkillChip
                  key={skill.name}
                  name={skill.name}
                  index={index}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tools" className="space-y-4">
            <div className="flex flex-wrap gap-3">
              {skillsData.tools.map((skill, index) => (
                <SkillChip
                  key={skill.name}
                  name={skill.name}
                  index={index}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

