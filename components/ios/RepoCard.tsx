"use client";

import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink } from "lucide-react";
import { GlassCard } from "./GlassCard";
import { GitHubRepo, getLanguageColor } from "@/lib/github";

interface RepoCardProps {
  repo: GitHubRepo;
  index: number;
}

export function RepoCard({ repo, index }: RepoCardProps) {
  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <GlassCard interactive elevation={2} className="p-6 h-full group">
        <div className="flex flex-col h-full">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
              {repo.name}
            </h3>
            <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-2">
            {repo.description || "No description available"}
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            {repo.language && (
              <div className="flex items-center gap-1.5">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getLanguageColor(repo.language) }}
                />
                <span>{repo.language}</span>
              </div>
            )}
            {repo.stargazers_count > 0 && (
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                <span>{repo.stargazers_count}</span>
              </div>
            )}
            {repo.forks_count > 0 && (
              <div className="flex items-center gap-1">
                <GitFork className="w-4 h-4" />
                <span>{repo.forks_count}</span>
              </div>
            )}
          </div>

          {repo.topics.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {repo.topics.slice(0, 3).map((topic) => (
                <span
                  key={topic}
                  className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
                >
                  {topic}
                </span>
              ))}
            </div>
          )}
        </div>
      </GlassCard>
    </motion.a>
  );
}

