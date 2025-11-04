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

  // Sort projects: In Progress projects first, then published, then others
  const sortedProjects = [...featuredProjects].sort((a, b) => {
    const aInProgress = "inProgress" in a && a.inProgress ? 1 : 0;
    const bInProgress = "inProgress" in b && b.inProgress ? 1 : 0;
    const aPublished = "published" in a && a.published ? 1 : 0;
    const bPublished = "published" in b && b.published ? 1 : 0;
    
    // In Progress projects first
    if (aInProgress !== bInProgress) {
      return bInProgress - aInProgress;
    }
    // Then published projects
    if (aPublished !== bPublished) {
      return bPublished - aPublished;
    }
    // Keep original order for others
    return 0;
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
          {repos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repos.map((repo, index) => (
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

