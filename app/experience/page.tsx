"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { SectionTitle } from "@/components/ios/SectionTitle";
import { GlassCard } from "@/components/ios/GlassCard";
import { resumeData } from "@/lib/resume";
import { useRef } from "react";

export default function ExperiencePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="container mx-auto px-4 py-20">
      <SectionTitle subtitle="Professional journey and career milestones">
        Work Experience
      </SectionTitle>

      <div className="max-w-6xl mx-auto">
        {/* Timeline Container */}
        <div ref={containerRef} className="relative">
          <div className="flex gap-8 lg:gap-12">
            {/* Content Column */}
            <div className="flex-1">
              <div className="space-y-12">
                {resumeData.experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative"
                  >
                    <GlassCard elevation={2} className="p-4 sm:p-6 md:p-8">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                        <div className="flex-1">
                          <h3 className="text-xl sm:text-2xl font-bold mb-2">{exp.role}</h3>
                          <div className="flex items-center gap-2 text-primary font-semibold text-lg mb-3">
                            <Briefcase className="w-5 h-5" />
                            <span>{exp.company}</span>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
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
                          </div>
                        </div>
                      </div>

                      {/* Responsibilities */}
                      <div className="space-y-3 mb-6">
                        {exp.bullets.map((bullet, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <p className="text-muted-foreground leading-relaxed">{bullet}</p>
                          </div>
                        ))}
                      </div>

                      {/* Tech Stack */}
                      {exp.stack && exp.stack.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {exp.stack.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1.5 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </GlassCard>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Side Timeline & Scroll Indicator */}
            <div className="hidden lg:block relative w-1 flex-shrink-0">
              {/* Scroll Progress Indicator */}
              <div className="sticky top-20 h-[calc(100vh-5rem)]">
                <div className="relative h-full w-full">
                  {/* Background track */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary/20 via-primary/40 to-transparent" />
                  
                  {/* Progress fill */}
                  <motion.div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 origin-top bg-gradient-to-b from-primary via-primary/60 to-primary/30"
                    style={{ scaleY }}
                  />

                  {/* Timeline dots */}
                  {resumeData.experience.map((_, index) => {
                    const dotPosition = index / (resumeData.experience.length - 1 || 1);
                    return (
                      <motion.div
                        key={index}
                        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
                        style={{
                          top: `${dotPosition * 100}%`,
                        }}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <div className="w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg" />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Career Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Career Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard interactive elevation={2} className="p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">4</div>
              <p className="text-muted-foreground">Companies</p>
            </GlassCard>
            <GlassCard interactive elevation={2} className="p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">3+ Years</div>
              <p className="text-muted-foreground">Experience</p>
            </GlassCard>
            <GlassCard interactive elevation={2} className="p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">12+</div>
              <p className="text-muted-foreground">Apps Delivered</p>
            </GlassCard>
          </div>
        </motion.div>

        {/* Extracurricular Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold mb-8">Extracurricular Activities</h2>
          <div className="space-y-6">
            <GlassCard elevation={2} className="p-6">
              <h3 className="text-xl font-semibold mb-2">Finance Head, Tamil Literary Association (TLA)</h3>
              <p className="text-sm text-muted-foreground mb-3">January 2022 – January 2023</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3 text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Oversaw the financial operations of the club, focusing on prudent financial management while actively seeking sponsorships to support the club&apos;s endeavours</span>
                </li>
              </ul>
            </GlassCard>

            <GlassCard elevation={2} className="p-6">
              <h3 className="text-xl font-semibold mb-2">Professional Gamer and Streamer, Valorant India</h3>
              <p className="text-sm text-muted-foreground mb-3">January 2020 – March 2022</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3 text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Established a notable presence within the gaming community as a professional gamer and content creator</span>
                </li>
              </ul>
            </GlassCard>

            <GlassCard elevation={2} className="p-6">
              <h3 className="text-xl font-semibold mb-2">App Development Enthusiast</h3>
              <p className="text-sm text-muted-foreground mb-3">Ongoing</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3 text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <span>Creating innovative mobile applications using Swift and Flutter in spare time, exploring cutting-edge technologies and design patterns</span>
                </li>
              </ul>
            </GlassCard>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
