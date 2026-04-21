"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectCard } from "./ProjectCard";
import { Brain, Smartphone, Globe } from "lucide-react";

interface Project {
  name: string;
  description: string;
  highlights: string[];
  stack: string[];
  url: string;
  inProgress?: boolean;
  published?: boolean;
  appStoreUrl?: string;
  playStoreUrl?: string;
  hideGitHubLink?: boolean;
  award?: string;
  isAwardWinner?: boolean;
  devpostUrl?: string;
  githubMobileUrl?: string;
  githubAIUrl?: string;
  category?: string;
  badges?: string[];
  detailedSections?: { title: string; content: string | string[] }[];
}

interface ProjectsTabsProps {
  allProjects: Project[];
  mlProjects: Project[];
  mobileProjects: Project[];
  webProjects: Project[];
}

export function ProjectsTabs({
  allProjects,
  mlProjects,
  mobileProjects,
  webProjects,
}: ProjectsTabsProps) {
  const renderProjects = (projects: Project[]) => {
    if (projects.length === 0) {
      return (
        <div className="text-center py-12 text-muted-foreground">
          No projects in this category yet.
        </div>
      );
    }

    return (
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.name}
            project={{
              name: project.name,
              description: project.description,
              highlights: project.highlights,
              stack: project.stack,
              url: project.url,
              inProgress: project.inProgress,
              published: project.published,
              appStoreUrl: project.appStoreUrl,
              playStoreUrl: project.playStoreUrl,
              hideGitHubLink: project.name === "Prommuni - Roommate Finder",
              award: project.award,
              isAwardWinner: project.isAwardWinner,
              devpostUrl: project.devpostUrl,
              githubMobileUrl: project.githubMobileUrl,
              githubAIUrl: project.githubAIUrl,
            }}
            index={index}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8 glass-effect h-auto p-1">
          <TabsTrigger
            value="all"
            className="flex items-center gap-2 py-3 data-[state=active]:bg-background/50"
          >
            <span>All</span>
            <span className="text-xs opacity-70">({allProjects.length})</span>
          </TabsTrigger>
          <TabsTrigger
            value="ml"
            className="flex items-center gap-2 py-3 data-[state=active]:bg-background/50"
          >
            <Brain className="w-4 h-4" />
            <span>ML/AI</span>
            <span className="text-xs opacity-70">({mlProjects.length})</span>
          </TabsTrigger>
          <TabsTrigger
            value="mobile"
            className="flex items-center gap-2 py-3 data-[state=active]:bg-background/50"
          >
            <Smartphone className="w-4 h-4" />
            <span>Mobile</span>
            <span className="text-xs opacity-70">({mobileProjects.length})</span>
          </TabsTrigger>
          <TabsTrigger
            value="web"
            className="flex items-center gap-2 py-3 data-[state=active]:bg-background/50"
          >
            <Globe className="w-4 h-4" />
            <span>Web</span>
            <span className="text-xs opacity-70">({webProjects.length})</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {renderProjects(allProjects)}
        </TabsContent>

        <TabsContent value="ml" className="mt-6">
          {renderProjects(mlProjects)}
        </TabsContent>

        <TabsContent value="mobile" className="mt-6">
          {renderProjects(mobileProjects)}
        </TabsContent>

        <TabsContent value="web" className="mt-6">
          {renderProjects(webProjects)}
        </TabsContent>
      </Tabs>
    </div>
  );
}


