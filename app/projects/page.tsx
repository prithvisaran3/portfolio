import { Suspense } from "react";
import { SectionTitle } from "@/components/ios/SectionTitle";
import { RepoCard } from "@/components/ios/RepoCard";
import { GlassCard } from "@/components/ios/GlassCard";
import { getGitHubRepos } from "@/lib/github";
import { createMetadata } from "@/lib/seo";
import featuredProjects from "@/content/featured-projects.json";
import { ExternalLink, Smartphone, Github } from "lucide-react";
import { motion } from "framer-motion";

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
          {featuredProjects.map((project, index) => {
            const hasStoreLinks = "appStoreUrl" in project || "playStoreUrl" in project;
            const isPublished = "published" in project && project.published;
            
            return (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="h-full"
              >
                <GlassCard interactive elevation={2} className="p-6 h-full group">
                  <div className="flex flex-col h-full">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                          {project.name}
                        </h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {"inProgress" in project && project.inProgress && (
                            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary/20 text-primary border border-primary/30">
                              In Progress
                            </span>
                          )}
                          {isPublished && (
                            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-500/20 text-green-500 border border-green-500/30">
                              Live on Stores
                            </span>
                          )}
                        </div>
                      </div>
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

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.stack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Store Links and GitHub */}
                    <div className="mt-auto pt-4 border-t border-border/50 space-y-2">
                      {hasStoreLinks && (
                        <div className="flex gap-2">
                          {"appStoreUrl" in project && project.appStoreUrl && (
                            <a
                              href={project.appStoreUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-colors border border-border/50"
                            >
                              <Smartphone className="w-3.5 h-3.5" />
                              <span>App Store</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          {"playStoreUrl" in project && project.playStoreUrl && (
                            <a
                              href={project.playStoreUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-colors border border-border/50"
                            >
                              <Smartphone className="w-3.5 h-3.5" />
                              <span>Play Store</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      )}
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors border border-border/50 text-muted-foreground hover:text-foreground"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>View on GitHub</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
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

