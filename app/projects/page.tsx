import { Suspense } from "react";
import { SectionTitle } from "@/components/ios/SectionTitle";
import { RepoCard } from "@/components/ios/RepoCard";
import { GlassCard } from "@/components/ios/GlassCard";
import { ProjectCard } from "@/components/ios/ProjectCard";
import { getGitHubRepos } from "@/lib/github";
import { createMetadata } from "@/lib/seo";
import featuredProjects from "@/content/featured-projects.json";

export const metadata = createMetadata("Projects", "Explore my mobile and web development projects", "/projects");

async function ProjectsContent() {
  const repos = await getGitHubRepos();

  // Sort projects: In Progress first, then latest (newest), then older
  const sortedProjects = [...featuredProjects]
    .map((project, originalIndex) => ({ project, originalIndex }))
    .sort((a, b) => {
      const aInProgress = "inProgress" in a.project && a.project.inProgress ? 1 : 0;
      const bInProgress = "inProgress" in b.project && b.project.inProgress ? 1 : 0;
      
      // In Progress projects first
      if (aInProgress !== bInProgress) {
        return bInProgress - aInProgress;
      }
      
      // For non-in-progress projects, sort by original index (newest first)
      // Higher index = newer project (since new projects are added at the end)
      if (aInProgress === 0 && bInProgress === 0) {
        return b.originalIndex - a.originalIndex;
      }
      
      // For in-progress projects, keep original order
      return 0;
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

  return (
    <div className="container mx-auto px-4 py-20">
      {/* Featured Projects */}
      <section className="mb-20">
        <SectionTitle subtitle="Hand-picked projects showcasing mobile development expertise">
          Featured Projects
        </SectionTitle>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {sortedProjects.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={{
                name: project.name,
                description: project.description,
                highlights: project.highlights,
                stack: project.stack,
                url: project.url,
                inProgress: "inProgress" in project && project.inProgress ? true : undefined,
                published: "published" in project && project.published ? true : undefined,
                appStoreUrl: "appStoreUrl" in project ? project.appStoreUrl : undefined,
                playStoreUrl: "playStoreUrl" in project ? project.playStoreUrl : undefined,
              }}
              index={index}
            />
          ))}
        </div>
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

