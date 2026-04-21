"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "./GlassCard";
import { ExternalLink, Smartphone, Github, Award, Trophy, Clock, ChevronDown, ChevronUp } from "lucide-react";

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
    awards?: string[];
    isAwardWinner?: boolean;
    hackathonTime?: string;
    longDescription?: { heading: string; text?: string; items?: string[] }[];
    devpostUrl?: string;
    githubMobileUrl?: string;
    githubAIUrl?: string;
  };
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasStoreLinks = project.appStoreUrl || project.playStoreUrl;
  const isPublished = project.published;

  return (
    <motion.div
      layout
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
                {project.isAwardWinner && project.awards && project.awards.map((awardText, i) => {
                  let hackathonName = "";
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
                    <div key={i} className="flex flex-wrap gap-2">
                      {hackathonName && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border bg-amber-500/20 text-amber-500 border-amber-500/30">
                          <Trophy className="w-3 h-3" />
                          <span>{hackathonName}</span>
                        </span>
                      )}
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full border bg-green-500/20 text-green-500 border-green-500/30">
                        <Award className="w-3 h-3" />
                        <span>{categoryName}</span>
                      </span>
                    </div>
                  );
                })}
                {project.isAwardWinner && project.award && !project.awards && (() => {
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
                {isPublished && (
                  <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-500/20 text-green-500 border border-green-500/30">
                    Live on Stores
                  </span>
                )}
              </div>
              {project.hackathonTime && (
                <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{project.hackathonTime}</span>
                </div>
              )}
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            {project.description}
          </p>

          <div className="mb-4">
            <ul className="text-sm text-muted-foreground space-y-1">
              {project.highlights.slice(0, project.longDescription ? 4 : 2).map((highlight, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {project.longDescription && (
            <div className="mb-4">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                aria-expanded={isExpanded}
              >
                {isExpanded ? (
                  <>
                    <span>Show less</span>
                    <ChevronUp className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span>Read more</span>
                    <ChevronDown className="w-4 h-4" />
                  </>
                )}
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 pb-2 space-y-4 border-t border-border/50 mt-4">
                      {project.longDescription.map((section, idx) => (
                        <div key={idx} className="text-sm">
                          <strong className="text-foreground block mb-1">
                            {section.heading}
                          </strong>
                          {section.text && (
                            <p className="text-muted-foreground leading-relaxed">
                              {section.text}
                            </p>
                          )}
                          {section.items && (
                            <ul className="space-y-1.5 mt-2">
                              {section.items.map((item, itemIdx) => {
                                // Bold parsing for "**Text:**"
                                const parts = item.split("**");
                                return (
                                  <li key={itemIdx} className="flex items-start gap-2 text-muted-foreground">
                                    <span className="text-primary/60 mt-1.5 w-1 h-1 rounded-full bg-primary/60 shrink-0" />
                                    <span>
                                      {parts.length > 2 ? (
                                        <>
                                          {parts.map((part, pIdx) =>
                                            pIdx % 2 !== 0 ? (
                                              <strong key={pIdx} className="text-foreground font-semibold">
                                                {part}
                                              </strong>
                                            ) : (
                                              <span key={pIdx}>{part}</span>
                                            )
                                          )}
                                        </>
                                      ) : (
                                        item
                                      )}
                                    </span>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

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
          <div className="mt-auto pt-4 border-t border-border/50 space-y-2">
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
                {(project.githubMobileUrl || project.githubAIUrl) && (
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
                  </div>
                )}
              </div>
            )}
            {!project.hideGitHubLink && !project.devpostUrl && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors border border-border/50 text-muted-foreground hover:text-foreground"
              >
                <Github className="w-3.5 h-3.5" />
                <span>View on GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

