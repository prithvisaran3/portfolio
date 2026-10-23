"use client";

import { Reveal, RevealItem } from "@/components/ios/Reveal";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { SectionTitle } from "@/components/ios/SectionTitle";
import { GlassCard } from "@/components/ios/GlassCard";
import { resumeData } from "@/lib/resume";
import { useRef, useEffect, useState } from "react";

const careerHighlights = [
  { value: "5", label: "Companies" },
  { value: "3+ Years", label: "Experience" },
  { value: "12+", label: "Apps Delivered" },
];

export default function ExperiencePage() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const [cardPositions, setCardPositions] = useState<number[]>([]);
  // Page-space bounds of the timeline, read on layout changes only (not per scroll)
  const bounds = useRef({ start: 0, end: 1 });

  const { scrollY } = useScroll();
  // Scroll-linked fill driven by a motion value: no React re-render while scrolling
  const fill = useTransform(scrollY, (y) => {
    const { start, end } = bounds.current;
    return Math.min(1, Math.max(0, (y - start) / (end - start || 1)));
  });

  // The visible track runs from the first dot to the last, so nothing sticks out past
  // either end; the fill is re-mapped to that span and still meets each dot as it lights
  const span = cardPositions.length
    ? { top: cardPositions[0], height: cardPositions[cardPositions.length - 1] - cardPositions[0] }
    : null;
  const spanRef = useRef({ top: 0, height: 1 });
  if (span) spanRef.current = span;
  const trackFill = useTransform(fill, (v) => {
    const { top, height } = spanRef.current;
    return Math.min(1, Math.max(0, (v - top) / (height || 1)));
  });

  // Dots light up as the progress line reaches them; state changes only when the count does
  const [lit, setLit] = useState(0);
  useMotionValueEvent(fill, "change", (v) => {
    const reached = cardPositions.filter((p) => v >= p - 0.005).length;
    if (reached !== lit) setLit(reached);
  });

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    const measure = () => {
      const rect = timeline.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const vh = window.innerHeight;
      bounds.current = { start: top - vh * 0.6, end: top + rect.height - vh * 0.4 };

      // Dot sits level with each card's connector line (top-8 = 32px)
      const positions = cardRefs.current.map((card) =>
        card ? Math.min(1, Math.max(0, (card.offsetTop + 32) / timeline.offsetHeight)) : 0
      );
      setCardPositions(positions);
      const { start, end } = bounds.current;
      const progress = Math.min(1, Math.max(0, (window.scrollY - start) / (end - start || 1)));
      setLit(positions.filter((p) => progress >= p - 0.005).length);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(timeline);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-20">
      <SectionTitle subtitle="Professional journey and career milestones">
        Work Experience
      </SectionTitle>

      <div className="max-w-6xl mx-auto">
        <div ref={timelineRef} className="relative">
          {/* Left Side Timeline */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 hidden md:block" aria-hidden>
            {span && (
              <div
                className="absolute inset-x-0 overflow-hidden rounded-full"
                style={{ top: `${span.top * 100}%`, height: `${span.height * 100}%` }}
              >
                <div className="absolute inset-0 bg-primary/15" />
                <motion.div
                  className="absolute inset-0 origin-top bg-gradient-to-b from-primary via-primary/80 to-primary/50"
                  style={{ scaleY: trackFill }}
                />
              </div>
            )}
            {cardPositions.map((position, index) => (
              <div
                key={index}
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                style={{ top: `${position * 100}%` }}
              >
                <Reveal variant="pop" className="relative">
                  {index < lit && <span className="pulse-ring absolute inset-0 rounded-full bg-primary/30" />}
                  <div
                    className={`relative h-5 w-5 rounded-full border-4 border-background transition-[background-color,box-shadow,transform] duration-500 ${
                      index < lit
                        ? "scale-110 bg-primary shadow-lg shadow-primary/40"
                        : "bg-muted-foreground/30 shadow-none"
                    }`}
                  />
                </Reveal>
              </div>
            ))}
          </div>

          {/* Content Cards */}
          <div className="space-y-12 md:ml-20">
            {resumeData.experience.map((exp, index) => (
              <Reveal
                key={exp.company}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                variant={index % 2 === 0 ? "left" : "right"}
                className="relative"
              >
                {/* Connecting line from timeline, level with the dot */}
                <div className="absolute -left-12 top-8 w-12 h-0.5 bg-gradient-to-r from-primary/40 to-transparent hidden md:block" />

                <div className="group lift rounded-3xl">
                <GlassCard elevation={2} className="p-5 sm:p-6 md:p-8">
                  <span aria-hidden className="shimmer" />
                  <div className="mb-6">
                    <RevealItem as="h2" delay={0.15} className="text-xl sm:text-2xl font-bold tracking-[-0.015em] mb-2">
                      {exp.roles ? exp.company : exp.role}
                    </RevealItem>
                    <RevealItem variant="left" delay={0.22} className="flex items-center gap-2 text-primary font-semibold text-lg mb-3">
                      <Briefcase className="w-5 h-5" />
                      <span>
                        {exp.roles ? `Promoted · ${exp.roles.length} roles` : exp.company}
                      </span>
                    </RevealItem>
                    <RevealItem variant="fade" delay={0.3} className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      {exp.location && (
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4" />
                          <span>{exp.location}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {exp.start} – {exp.end}
                        </span>
                      </div>
                    </RevealItem>
                  </div>

                  {/* Role progression within one company, newest first */}
                  {exp.roles ? (
                    <div className="relative mb-6 space-y-8 border-l border-primary/25 pl-6">
                      {exp.roles.map((role, r) => (
                        <div key={role.title} className="relative">
                          <span
                            aria-hidden
                            className={`absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-background ${
                              r === 0 ? "bg-primary" : "bg-primary/40"
                            }`}
                          />
                          <RevealItem as="h3" variant="left" delay={0.35 + r * 0.25} className="text-lg font-semibold">
                            {role.title}
                          </RevealItem>
                          <RevealItem as="p" variant="fade" delay={0.4 + r * 0.25} className="mb-3 text-sm text-muted-foreground">
                            {role.start} – {role.end}
                          </RevealItem>
                          <BulletList bullets={role.bullets} baseDelay={0.45 + r * 0.25} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mb-6">
                      <BulletList bullets={exp.bullets} baseDelay={0.38} />
                    </div>
                  )}

                  {exp.stack && exp.stack.length > 0 && (
                    <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
                      {exp.stack.map((tech, t) => (
                        <RevealItem
                          as="li"
                          variant="pop"
                          key={tech}
                          delay={0.6 + Math.min(t * 0.04, 0.4)}
                          className="lift-chip px-3 py-1.5 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                        >
                          {tech}
                        </RevealItem>
                      ))}
                    </ul>
                  )}
                </GlassCard>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Career Highlights */}
        <section className="mt-16">
          <Reveal as="div">
            <h2 className="text-3xl font-bold mb-8 text-center">Career Highlights</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {careerHighlights.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.1}>
                <GlassCard elevation={2} className="lift p-6 text-center">
                  <RevealItem as="p" variant="pop" delay={0.15 + i * 0.1} className="text-4xl font-bold tracking-[-0.03em] text-primary mb-2">
                    {stat.value}
                  </RevealItem>
                  <p className="text-muted-foreground">{stat.label}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

// Bullets slide in one after another once their card is revealed
function BulletList({ bullets, baseDelay }: { bullets: string[]; baseDelay: number }) {
  return (
    <ul className="space-y-3">
      {bullets.map((bullet, i) => (
        <RevealItem
          as="li"
          variant="left"
          key={i}
          delay={baseDelay + Math.min(i * 0.07, 0.5)}
          className="flex items-start gap-3"
        >
          <span aria-hidden className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5 flex-shrink-0" />
          <p className="text-muted-foreground leading-relaxed">{bullet}</p>
        </RevealItem>
      ))}
    </ul>
  );
}
