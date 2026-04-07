import { Suspense } from "react";
import { SectionTitle } from "@/components/ios/SectionTitle";
import { RepoCard } from "@/components/ios/RepoCard";
import { GlassCard } from "@/components/ios/GlassCard";
import { getGitHubRepos } from "@/lib/github";
import { createMetadata } from "@/lib/seo";
import featuredProjects from "@/content/featured-projects.json";
import { ProjectsTabs } from "@/components/ios/ProjectsTabs";

interface ProjectWithCategory {
  name: string;
  description: string;
  highlights: string[];
  stack: string[];
  url: string;
  category?: string;
  [key: string]: unknown;
}

export const metadata = createMetadata("Projects", "Explore my mobile and web development projects", "/projects");

async function ProjectsContent() {
  const repos = await getGitHubRepos();

  // Define award winner project (should appear at the very top)
  const awardWinnerName = "BarterBrAIn — AI-Powered Bartering App";

  // Define priority projects order (Top to Bottom after "In Progress")
  const orderedPriorityProjects = [
    "PitchPulse",
    "LLM Fine-Tuning with LoRA",
    "Drillhub",
    "Prommuni - Roommate Finder",
    "Amazon Retail Sales Forecasting",
    "Pawfect - Pet Dating iOS App",
  ];

  // Sort projects: Award winner first, then In Progress, then priority projects (in order), then latest (newest), then older
  const sortedProjects = [...featuredProjects]
    .map((project, originalIndex) => ({ project, originalIndex }))
    .sort((a, b) => {
      const aIsAwardWinner = a.project.name === awardWinnerName ? 1 : 0;
      const bIsAwardWinner = b.project.name === awardWinnerName ? 1 : 0;
      const aInProgress = "inProgress" in a.project && a.project.inProgress ? 1 : 0;
      const bInProgress = "inProgress" in b.project && b.project.inProgress ? 1 : 0;

      const aPriorityIndex = orderedPriorityProjects.indexOf(a.project.name);
      const bPriorityIndex = orderedPriorityProjects.indexOf(b.project.name);
      const aIsPriority = aPriorityIndex !== -1 ? 1 : 0;
      const bIsPriority = bPriorityIndex !== -1 ? 1 : 0;

      // Award winner at the very top
      if (aIsAwardWinner !== bIsAwardWinner) {
        return bIsAwardWinner - aIsAwardWinner;
      }

      // In Progress projects next
      if (aInProgress !== bInProgress) {
        return bInProgress - aInProgress;
      }

      // If both are in-progress, keep original order (newest first based on file order usually, or we can enforce)
      if (aInProgress === 1 && bInProgress === 1) {
        return 0;
      }

      // After in-progress, priority projects next (using explicit order)
      if (aIsPriority && bIsPriority) {
        return aPriorityIndex - bPriorityIndex;
      }

      if (aIsPriority !== bIsPriority) {
        return bIsPriority - aIsPriority;
      }

      // For non-priority projects, sort by original index (newest first)
      // Higher index = newer project (since new projects are added at the end)
      // "iOS Liquid Glass Portfolio" is index 0, so it will naturally be last here.
      return b.originalIndex - a.originalIndex;
    })
    .map(({ project }) => project);

  // Extract repository names from featured projects URLs
  const featuredRepoNames = new Set(
    featuredProjects
      .map((project) => {
        const url = project.url;
        if (!url || !url.includes("github.com")) return null;
        // Extract repo name from URL like "https://github.com/prithvisaran3/repo-name"
        const match = url.match(/github\.com\/[^/]+\/([^/?]+)/);
        return match ? match[1].toLowerCase() : null;
      })
      .filter((name): name is string => name !== null)
  );

  // Additional repos to exclude: LMS, ExSpends, AuraTranslate
  const excludedRepoNames = new Set([
    "oxfordpsych_lms",
    "exspends",
    "auratranslate",
    ...Array.from(featuredRepoNames),
  ]);

  // Only include these specific repos
  const allowedRepoNames = new Set([
    "basic_template",
    "gsoc2025_pocket_paint",
  ]);

  // Filter repositories: only show allowed repos that are not excluded
  const filteredRepos = repos.filter((repo) => {
    const repoName = repo.name.toLowerCase();
    // Must be in allowed list AND not in excluded list
    return allowedRepoNames.has(repoName) && !excludedRepoNames.has(repoName);
  });

  // Projects that should appear in both ML and Mobile categories
  const hybridProjects = new Set([
    "ExSpends AI",
    "BarterBrAIn — AI-Powered Bartering App",
    "AuraTranslate",
  ]);

  // Categorize projects
  const mlProjects = sortedProjects.filter((p) => {
    const category = (p as ProjectWithCategory).category;
    return category === "ml" || hybridProjects.has(p.name);
  });

  const mobileProjects = sortedProjects.filter((p) => {
    const category = (p as ProjectWithCategory).category;
    return category === "mobile" || hybridProjects.has(p.name);
  });

  const webProjects = sortedProjects.filter((p) => (p as ProjectWithCategory).category === "web");
  const allProjects = sortedProjects;

  return (
    <div className="container mx-auto px-4 py-20">
      {/* Stats Section */}
      <section className="mb-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          <GlassCard elevation={1} className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-1">{allProjects.length}</div>
            <div className="text-sm text-muted-foreground">Total Projects</div>
          </GlassCard>
          <GlassCard elevation={1} className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-1">{mlProjects.length}</div>
            <div className="text-sm text-muted-foreground">ML/AI Projects</div>
          </GlassCard>
          <GlassCard elevation={1} className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-1">{mobileProjects.length}</div>
            <div className="text-sm text-muted-foreground">Mobile Apps</div>
          </GlassCard>
          <GlassCard elevation={1} className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-1">{webProjects.length}</div>
            <div className="text-sm text-muted-foreground">Web Projects</div>
          </GlassCard>
        </div>
      </section>

      {/* Categorized Projects */}
      <section className="mb-20">
        <SectionTitle subtitle="Projects organized by technology and domain expertise">
          Featured Projects
        </SectionTitle>

        <ProjectsTabs
          allProjects={allProjects}
          mlProjects={mlProjects}
          mobileProjects={mobileProjects}
          webProjects={webProjects}
        />
      </section>

      {/* GitHub Repositories */}
      <section>
        <SectionTitle subtitle="Latest repositories from GitHub">
          All Repositories
        </SectionTitle>

        <div className="max-w-6xl mx-auto">
          {filteredRepos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRepos.map((repo, index) => (
                <RepoCard key={repo.id} repo={repo} index={index} />
              ))}
            </div>
          ) : (
            <GlassCard elevation={1} className="p-8 text-center">
              <p className="text-muted-foreground">
                Unable to load repositories. Please visit my{" "}
                <a
                  href="https://github.com/prithvisaran3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  GitHub profile
                </a>{" "}
                directly.
              </p>
            </GlassCard>
          )}
        </div>
      </section>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        </div>
      }
    >
      <ProjectsContent />
    </Suspense>
  );
}
