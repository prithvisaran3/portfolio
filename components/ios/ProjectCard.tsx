"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "./GlassCard";
import { ExternalLink, Smartphone, Github, Award, Trophy, Globe, X } from "lucide-react";

interface ProjectCardProps {
  project: {
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
    badges?: string[];
    detailedSections?: { title: string; content: string | string[] }[];
    liveUrl?: string;
    screenshots?: string[];
  };
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const hasStoreLinks = project.appStoreUrl || project.playStoreUrl;
  const isPublished = project.published;

  const renderAwards = () => {
    return (
      <>
        {project.isAwardWinner && project.award && (() => {
          const awardText = project.award;
          let hackathonName = "Award Winner";
          let categoryName = awardText;
          
          if (awardText.includes(" – ")) {
            const parts = awardText.split(" – ");
            categoryName = parts[0].trim();
            hackathonName = parts[1].trim();
          } else {
            const dashIndex = awardText.indexOf(" - ");
            if (dashIndex > 0) {
              categoryName = awardText.substring(0, dashIndex).trim();
              hackathonName = awardText.substring(dashIndex + 3).trim();
            }
          }
          
          return (
            <>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border bg-amber-500/20 text-amber-500 border-amber-500/30">
                <Trophy className="w-3 h-3" />
                <span>{hackathonName}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border bg-green-500/20 text-green-500 border-green-500/30">
                <Award className="w-3 h-3" />
                <span>{categoryName}</span>
              </span>
            </>
          );
        })()}
        {project.award && !project.isAwardWinner && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border bg-yellow-500/20 text-yellow-500 border-yellow-500/30">
            <Award className="w-3 h-3" />
            <span>{project.award}</span>
          </span>
        )}
        {project.inProgress && (
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-primary/20 text-primary border border-primary/30">
            In Progress
          </span>
        )}
        {project.badges?.map((badge, i) => (
          <span key={`badge-${i}`} className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:bg-emerald-500/20 dark:text-emerald-400">
            <Award className="w-3 h-3" />
            <span>{badge}</span>
          </span>
        ))}
        {isPublished && (
          <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-500/20 text-green-500 border border-green-500/30">
            Live on Stores
          </span>
        )}
      </>
    );
  };

  return (
    <>
      <motion.div
        key={project.name}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="h-full"
      >
        <GlassCard 
          interactive 
          elevation={2} 
          className="p-6 h-full group flex flex-col justify-between"
          onClick={() => setIsOpen(true)}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {renderAwards()}
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
              {project.description}
            </p>

            <div className="mb-4">
              <ul className="text-sm text-muted-foreground space-y-1">
                {project.highlights.slice(0, 2).map((highlight, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span className="line-clamp-2">{highlight}</span>
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

            {/* Store Links, Devpost, and GitHub */}
            <div className="mt-auto pt-4 border-t border-border/50 space-y-2" onClick={(e) => e.stopPropagation()}>
              {hasStoreLinks && (
                <div className="flex gap-2">
                  {project.appStoreUrl && (
                    <a
                      href={project.appStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-colors border border-border/50"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>App Store</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {project.playStoreUrl && (
                    <a
                      href={project.playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-colors border border-border/50"
                    >
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Play Store</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              )}
              {project.devpostUrl && (
                <div className="flex flex-col gap-2">
                  <a
                    href={project.devpostUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium rounded-lg bg-blue-500/10 hover:bg-blue-500/20 transition-colors border border-blue-500/30 text-blue-400 hover:text-blue-300"
                  >
                    <span>View on Devpost</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  {(project.githubMobileUrl || project.githubAIUrl || (project.url && !project.hideGitHubLink)) && (
                    <div className="flex gap-2">
                      {project.githubMobileUrl && (
                        <a
                          href={project.githubMobileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors border border-border/50 text-muted-foreground hover:text-foreground"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>Mobile App</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {project.githubAIUrl && (
                        <a
                          href={project.githubAIUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors border border-border/50 text-muted-foreground hover:text-foreground"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>AI/Cloud</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {!project.githubMobileUrl && !project.githubAIUrl && project.url && !project.hideGitHubLink && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors border border-border/50 text-muted-foreground hover:text-foreground"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>View on GitHub</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              )}
              {!project.hideGitHubLink && !project.devpostUrl && project.url && (
                <div className="flex flex-wrap gap-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-w-[120px] flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 transition-colors border border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>Live Site</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[120px] flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors border border-border/50 text-muted-foreground hover:text-foreground"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>View on GitHub</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Modal Popup Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/60 backdrop-blur-xl cursor-zoom-out"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative max-w-4xl w-full cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* White/Glass Card container */}
              <div className="relative overflow-hidden rounded-3xl bg-white/95 dark:bg-zinc-900/95 border border-white/20 dark:border-white/10 shadow-2xl p-6 md:p-10 backdrop-blur-2xl">
                {/* Inner highlight */}
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%)",
                  }}
                />

                {/* Noise texture */}
                <div
                  className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat",
                  }}
                />

                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-muted-foreground hover:text-foreground z-20"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Scrollable Content */}
                <div className="relative z-10 max-h-[70vh] overflow-y-auto pr-2 space-y-6 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                  {/* Title & Badges */}
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
                      {project.name}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {renderAwards()}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div className="space-y-2">
                      <strong className="text-foreground block font-semibold text-sm sm:text-base">Key Highlights</strong>
                      <ul className="text-sm text-muted-foreground space-y-2 pl-1">
                        {project.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Stack */}
                  <div className="space-y-2">
                    <strong className="text-foreground block font-semibold text-sm sm:text-base">Technologies Used</strong>
                    <div className="flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Detailed Sections */}
                  {project.detailedSections && project.detailedSections.length > 0 && (
                    <div className="space-y-6 pt-4 border-t border-border/50">
                      {project.detailedSections.map((section, i) => (
                        <div key={i} className="space-y-2">
                          <h4 className="text-base sm:text-lg font-semibold text-foreground">{section.title}</h4>
                          <div className="text-sm text-muted-foreground leading-relaxed">
                            {Array.isArray(section.content) ? (
                              <ul className="list-disc pl-5 space-y-1.5">
                                {section.content.map((item, j) => (
                                  <li key={j}>{item}</li>
                                ))}
                              </ul>
                            ) : (
                              <p>{section.content}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Screenshots */}
                  {project.screenshots && project.screenshots.length > 0 && (
                    <div className="pt-6 border-t border-border/50">
                      <strong className="text-foreground block mb-3 font-semibold text-sm sm:text-base">Project Gallery</strong>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {project.screenshots.map((src, idx) => (
                          <div
                            key={idx}
                            onClick={() => setSelectedImage(src)}
                            className="relative aspect-[16/9] rounded-lg border border-border/30 overflow-hidden cursor-zoom-in group/img shadow-md hover:shadow-lg transition-all duration-300 bg-black/10"
                          >
                            <img
                              src={src}
                              alt={`${project.name} screenshot ${idx + 1}`}
                              className="object-cover w-full h-full group-hover/img:scale-[1.02] transition-transform duration-300"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Footer Action Links inside modal */}
                  <div className="pt-6 border-t border-border/50 flex flex-wrap gap-3">
                    {hasStoreLinks && (
                      <div className="flex gap-2 w-full sm:w-auto">
                        {project.appStoreUrl && (
                          <a
                            href={project.appStoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-lg bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-colors border border-border/50 text-foreground"
                          >
                            <Smartphone className="w-3.5 h-3.5" />
                            <span>App Store</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        {project.playStoreUrl && (
                          <a
                            href={project.playStoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-lg bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-colors border border-border/50 text-foreground"
                          >
                            <Smartphone className="w-3.5 h-3.5" />
                            <span>Play Store</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    )}

                    {project.devpostUrl && (
                      <a
                        href={project.devpostUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-[150px] flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-lg bg-blue-500/10 hover:bg-blue-500/20 transition-colors border border-blue-500/30 text-blue-400 hover:text-blue-300"
                      >
                        <span>View on Devpost</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}

                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-[150px] flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 transition-colors border border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>Live Site</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}

                    {project.url && !project.hideGitHubLink && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-[150px] flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors border border-border/50 text-muted-foreground hover:text-foreground"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>View on GitHub</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Image Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center pointer-events-none">
            <img
              src={selectedImage}
              alt="Screenshot zoom"
              className="max-w-full max-h-full object-contain rounded-lg border border-white/10 shadow-2xl pointer-events-auto"
            />
          </div>
        </div>
      )}
    </>
  );
}
