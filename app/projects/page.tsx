import { Suspense } from "react";
import { SectionTitle } from "@/components/ios/SectionTitle";
import { RepoCard } from "@/components/ios/RepoCard";
import { GlassCard } from "@/components/ios/GlassCard";
import { getGitHubRepos } from "@/lib/github";
import { createMetadata } from "@/lib/seo";
import featuredProjects from "@/content/featured-projects.json";
import { ExternalLink } from "lucide-react";

export const metadata = createMetadata("Projects", "Explore my mobile and web development projects", "/projects");

async function ProjectsContent() {
  const repos = await getGitHubRepos();

  return (
    <div className="container mx-auto px-4 py-20">
      {/* Featured Projects */}
      <section className="mb-20">
        <SectionTitle subtitle="Hand-picked projects showcasing mobile development expertise">
          Featured Projects
        </SectionTitle>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {featuredProjects.map((project) => (
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <GlassCard interactive elevation={2} className="p-6 h-full group">
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    {project.description}
                  </p>

                  <div className="mb-4">
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {project.highlights.slice(0, 2).map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </a>
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

