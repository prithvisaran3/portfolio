"use client";

import { Reveal } from "@/components/ios/Reveal";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useDragControls, useMotionValue, useTransform, type PanInfo } from "framer-motion";
import { spring } from "@/lib/motion";
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
  // Offset of the card from the viewport centre, so the sheet grows out of the card
  // that opened it and returns to it on close
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  // Swipe-to-dismiss: drag from the grabber; a flick is projected forward (Apple's
  // decay projection) and the sheet leaves at the finger's velocity
  const dragControls = useDragControls();
  const sheetY = useMotionValue(0);
  const scrimOpacity = useTransform(sheetY, [0, 420], [1, 0.25]);
  const [dismiss, setDismiss] = useState<{ down: boolean; velocity: number }>({ down: false, velocity: 0 });
  // Portals only after mount, so server and first client render match
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const open = () => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      setOrigin({
        x: rect.left + rect.width / 2 - window.innerWidth / 2,
        y: rect.top + rect.height / 2 - window.innerHeight / 2,
      });
    }
    setDismiss({ down: false, velocity: 0 });
    setIsOpen(true);
  };

  const onSheetDragEnd = (_: unknown, info: PanInfo) => {
    const decay = 0.998;
    const projected = info.offset.y + ((info.velocity.y / 1000) * decay) / (1 - decay);
    if (projected > 160) {
      setDismiss({ down: true, velocity: info.velocity.y });
      requestAnimationFrame(close);
    }
  };

  const close = () => {
    setIsOpen(false);
    setSelectedImage(null);
    triggerRef.current?.focus();
  };

  // Dialog behaviour: lock page scroll, move focus in, Esc closes the top-most layer,
  // Tab stays inside the dialog
  useEffect(() => {
    if (!isOpen) return;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        if (selectedImage) setSelectedImage(null);
        else close();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, selectedImage]);
  // Outbound links in priority order; the first becomes the card's one primary action
  const links: ProjectLink[] = [
    project.liveUrl && { href: project.liveUrl, label: "Live Site", icon: Globe },
    project.appStoreUrl && { href: project.appStoreUrl, label: "App Store", icon: Smartphone },
    project.playStoreUrl && { href: project.playStoreUrl, label: "Play Store", icon: Smartphone },
    project.devpostUrl && { href: project.devpostUrl, label: "Devpost", icon: Award },
    project.githubMobileUrl && { href: project.githubMobileUrl, label: "Mobile App", icon: Github },
    project.githubAIUrl && { href: project.githubAIUrl, label: "AI/Cloud", icon: Github },
    project.url && !project.hideGitHubLink && !project.githubMobileUrl && !project.githubAIUrl && {
      href: project.url,
      label: "GitHub",
      icon: Github,
    },
  ].filter(Boolean) as ProjectLink[];
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
      <Reveal key={project.name} delay={Math.min((index % 3) * 0.1, 0.2)} className="h-full">
        <GlassCard
          ref={cardRef}
          interactive
          elevation={2}
          className="p-6 h-full group flex flex-col justify-between"
          onClick={open}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-xl font-semibold tracking-[-0.01em]">
                  {/* Stretched button: the whole card opens the details, and it is reachable by keyboard */}
                  <button
                    ref={triggerRef}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      open();
                    }}
                    aria-haspopup="dialog"
                    className="text-left rounded-md transition-colors group-hover:text-primary focus-visible:outline-none after:absolute after:inset-0 after:rounded-3xl after:content-[''] focus-visible:after:ring-2 focus-visible:after:ring-[color:var(--glass-border-focus)]"
                  >
                    {project.name}
                  </button>
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

            {/* Actions: one tinted primary, the rest neutral */}
            <div className="relative z-20 mt-auto pt-4 border-t border-border/50" onClick={(e) => e.stopPropagation()}>
              <ProjectLinks links={links} size="sm" />
            </div>
          </div>
        </GlassCard>
      </Reveal>

      {/* Modal Popup Overlay */}
      {mounted && createPortal(
      <AnimatePresence custom={dismiss}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10 backdrop-blur-xl"
            onClick={close}
          >
            {/* Dimming lightens as the sheet is dragged away */}
            <motion.div aria-hidden className="absolute inset-0 bg-black/50" style={{ opacity: scrimOpacity }} />
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              custom={dismiss}
              variants={{
                hidden: (d: { down: boolean; velocity: number }) =>
                  d.down
                    ? { y: "110vh", transition: { type: "spring", bounce: 0, duration: 0.45, velocity: d.velocity } }
                    : { scale: 0.6, opacity: 0, x: origin.x * 0.6, y: origin.y * 0.6 },
                visible: { scale: 1, opacity: 1, x: 0, y: 0 },
              }}
              initial="hidden"
              animate="visible"
              exit="hidden"
              transition={spring}
              style={{ y: sheetY }}
              drag="y"
              dragListener={false}
              dragControls={dragControls}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0.05, bottom: 0.9 }}
              dragTransition={{ bounceStiffness: 500, bounceDamping: 45 }}
              onDragEnd={onSheetDragEnd}
              className="relative max-w-4xl w-full"
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

                {/* Grabber: drag down to dismiss (also the drag handle on desktop) */}
                <div
                  onPointerDown={(e) => dragControls.start(e)}
                  className="absolute inset-x-0 top-0 z-20 flex h-8 cursor-grab touch-none items-start justify-center pt-2.5 active:cursor-grabbing"
                  aria-hidden
                >
                  <span className="h-1.5 w-10 rounded-full bg-foreground/20" />
                </div>

                {/* Close Button */}
                <button
                  ref={closeRef}
                  onClick={close}
                  aria-label="Close project details"
                  className="press absolute top-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-foreground/5 hover:bg-foreground/10 text-muted-foreground hover:text-foreground z-20"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Scrollable Content */}
                <div className="relative z-10 max-h-[70vh] overflow-y-auto pr-2 space-y-6 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
                  {/* Title & Badges */}
                  <div>
                    <h2 id={titleId} className="text-2xl sm:text-3xl font-bold tracking-[-0.02em] text-foreground mb-3 pr-10">
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
                          <button
                            type="button"
                            key={idx}
                            onClick={() => setSelectedImage(src)}
                            aria-label={`Enlarge ${project.name} screenshot ${idx + 1}`}
                            className="press relative aspect-[16/9] rounded-lg border border-border/30 overflow-hidden cursor-zoom-in group/img shadow-md hover:shadow-lg bg-black/10"
                          >
                            <img
                              src={src}
                              alt={`${project.name} screenshot ${idx + 1}`}
                              className="object-cover w-full h-full group-hover/img:scale-[1.02] transition-transform duration-300"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions: one tinted primary, the rest neutral */}
                  <div className="pt-6 border-t border-border/50">
                    <ProjectLinks links={links} size="lg" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
      )}

      {/* Selected Image Lightbox Modal */}
      {mounted && selectedImage && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name} screenshot`}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md cursor-zoom-out"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            aria-label="Close screenshot"
            onClick={() => setSelectedImage(null)}
            className="press absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center pointer-events-none">
            <img
              src={selectedImage}
              alt={`${project.name} screenshot, enlarged`}
              className="max-w-full max-h-full object-contain rounded-lg border border-white/10 shadow-2xl pointer-events-auto"
            />
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

interface ProjectLink {
  href: string;
  label: string;
  icon: typeof Github;
}

// Apple's color budget: one prominent (tinted) action per view, the rest monochrome
function ProjectLinks({ links, size }: { links: ProjectLink[]; size: "sm" | "lg" }) {
  if (links.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {links.map(({ href, label, icon: Icon }, i) => (
        <a
          key={href + label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={
            "press flex min-h-[44px] flex-1 items-center justify-center gap-1.5 rounded-xl border px-3 font-semibold " +
            (size === "lg" ? "min-w-[150px] text-sm " : "min-w-[110px] text-xs ") +
            (i === 0
              ? "border-transparent bg-[var(--tint-bg)] text-white shadow-sm hover:bg-[var(--tint-bg-hover)]"
              : "border-foreground/10 bg-foreground/[0.05] text-foreground/80 hover:bg-foreground/10 hover:text-foreground")
          }
        >
          <Icon className="h-3.5 w-3.5" aria-hidden />
          <span>{label}</span>
          <ExternalLink className="h-3 w-3 opacity-70" aria-hidden />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      ))}
    </div>
  );
}
