"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { SectionTitle } from "@/components/ios/SectionTitle";
import { GlassCard } from "@/components/ios/GlassCard";
import { resumeData } from "@/lib/resume";
import { useRef, useEffect, useState } from "react";

export default function ExperiencePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [cardPositions, setCardPositions] = useState<number[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Track scroll progress more accurately
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 60%", "end 40%"],
  });

  // Enhanced spring animation for progress bar
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Calculate dot positions based on actual card positions
  useEffect(() => {
    const updatePositions = () => {
      if (!timelineRef.current || cardRefs.current.length === 0) return;

      const timelineTop = timelineRef.current.offsetTop;
      const timelineHeight = timelineRef.current.offsetHeight;

      const positions = cardRefs.current
        .filter((ref) => ref !== null)
        .map((ref) => {
          if (!ref) return 0;
          const cardTop = ref.offsetTop;
          // Position dot at top of card (where connecting line is) - accounting for top-8 (32px)
          const dotPosition = (cardTop - timelineTop + 32) / timelineHeight;
          return Math.max(0, Math.min(1, dotPosition));
        });

      setCardPositions(positions.length > 0 ? positions : []);
    };

    updatePositions();
    window.addEventListener("resize", updatePositions);
    window.addEventListener("scroll", updatePositions);

    // Update after a short delay to ensure layout is complete
    setTimeout(updatePositions, 100);

    return () => {
      window.removeEventListener("resize", updatePositions);
      window.removeEventListener("scroll", updatePositions);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-20">
      <SectionTitle subtitle="Professional journey and career milestones">
        Work Experience
      </SectionTitle>

      <div className="max-w-6xl mx-auto">
        {/* Timeline Container */}
        <div ref={containerRef} className="relative">
          <div className="relative">
            {/* Left Side Timeline */}
            <div
              ref={timelineRef}
              className="absolute left-8 top-0 bottom-0 w-0.5 hidden md:block"
            >
              {/* Background Line */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/40 to-transparent" />

              {/* Animated Progress Fill */}
              <motion.div
                className="absolute top-0 left-0 w-full origin-top bg-gradient-to-b from-primary via-primary/80 to-primary/40 shadow-lg shadow-primary/20"
                style={{ scaleY }}
              />

              {/* Timeline Dots - Positioned at actual card intersections */}
              {resumeData.experience.map((_, index) => {
                // Use calculated positions if available, otherwise fallback to even distribution
                const position =
                  cardPositions[index] !== undefined
                    ? cardPositions[index]
                    : index / (resumeData.experience.length - 1 || 1);

                return (
                  <motion.div
                    key={index}
                    className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                    style={{
                      top: `${position * 100}%`,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{
                      scale: [0, 1.2, 1],
                      opacity: [0, 1, 1],
                    }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                  >
                    {/* Pulsing Glow Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-primary/30 blur-md"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    {/* Main Dot - perfectly aligned */}
                    <div className="relative w-5 h-5 rounded-full bg-primary border-4 border-background shadow-xl shadow-primary/30" />
                  </motion.div>
                );
              })}
            </div>

            {/* Content Cards */}
            <div className="space-y-12 md:ml-20">
              {resumeData.experience.map((exp, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div
                    key={index}
                    ref={(el) => {
                      cardRefs.current[index] = el;
                    }}
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                      duration: 0.7,
                      delay: index * 0.15,
                      type: "spring",
                      stiffness: 100,
                      damping: 20,
                    }}
                    className="relative"
                  >
                    {/* Connecting Line from Timeline - aligned with dot */}
                    <div className="absolute -left-12 top-8 w-12 h-0.5 bg-gradient-to-r from-primary/40 to-transparent hidden md:block" />

                    <motion.div
                      whileHover={{
                        scale: 1.02,
                        y: -4,
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        },
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <GlassCard elevation={2} className="p-4 sm:p-6 md:p-8 relative overflow-hidden">
                        {/* Shimmer Effect on Hover */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full"
                          whileHover={{
                            translateX: "200%",
                            transition: { duration: 0.6 },
                          }}
                        />

                        <div className="relative z-10">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                            <div className="flex-1">
                              <motion.h3
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 + 0.2 }}
                                className="text-xl sm:text-2xl font-bold mb-2"
                              >
                                {exp.role}
                              </motion.h3>
                              <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 + 0.3 }}
                                className="flex items-center gap-2 text-primary font-semibold text-lg mb-3"
                              >
                                <Briefcase className="w-5 h-5" />
                                <span>{exp.company}</span>
                              </motion.div>
                              <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 + 0.4 }}
                                className="flex flex-wrap gap-4 text-sm text-muted-foreground"
                              >
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
                              </motion.div>
                            </div>
                          </div>

                          {/* Responsibilities with Staggered Animation */}
                          <div className="space-y-3 mb-6">
                            {exp.bullets.map((bullet, i) => (
                              <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                  duration: 0.4,
                                  delay: index * 0.15 + 0.5 + i * 0.1,
                                }}
                                className="flex items-start gap-3"
                              >
                                <motion.div
                                  initial={{ scale: 0 }}
                                  whileInView={{ scale: 1 }}
                                  viewport={{ once: true }}
                                  transition={{
                                    duration: 0.3,
                                    delay: index * 0.15 + 0.5 + i * 0.1,
                                    type: "spring",
                                  }}
                                  className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"
                                />
                                <p className="text-muted-foreground leading-relaxed">{bullet}</p>
                              </motion.div>
                            ))}
                          </div>

                          {/* Tech Stack with Fade In */}
                          {exp.stack && exp.stack.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{
                                duration: 0.5,
                                delay: index * 0.15 + 0.8,
                              }}
                              className="flex flex-wrap gap-2"
                            >
                              {exp.stack.map((tech, techIndex) => (
                                <motion.span
                                  key={tech}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  whileInView={{ opacity: 1, scale: 1 }}
                                  viewport={{ once: true }}
                                  transition={{
                                    duration: 0.3,
                                    delay: index * 0.15 + 0.8 + techIndex * 0.05,
                                    type: "spring",
                                  }}
                                  whileHover={{
                                    scale: 1.1,
                                    transition: { duration: 0.2 },
                                  }}
                                  className="px-3 py-1.5 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                                >
                                  {tech}
                                </motion.span>
                              ))}
                            </motion.div>
                          )}
                        </div>
                      </GlassCard>
                    </motion.div>
                  </motion.div>
                );
              })}
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
            {[
              { value: "4", label: "Companies" },
              { value: "3+ Years", label: "Experience" },
              { value: "12+", label: "Apps Delivered" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
              >
                <GlassCard
                  interactive
                  elevation={2}
                  className="p-6 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.5 + index * 0.1,
                      type: "spring",
                    }}
                    className="text-4xl font-bold text-primary mb-2"
                  >
                    {stat.value}
                  </motion.div>
                  <p className="text-muted-foreground">{stat.label}</p>
                </GlassCard>
              </motion.div>
            ))}
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
            {[
              {
                title: "Finance Head, Tamil Literary Association (TLA)",
                period: "January 2022 – January 2023",
                description:
                  "Oversaw the financial operations of the club, focusing on prudent financial management while actively seeking sponsorships to support the club's endeavours",
              },
              {
                title: "Professional Gamer and Streamer, Valorant India",
                period: "January 2020 – March 2022",
                description:
                  "Established a notable presence within the gaming community as a professional gamer and content creator",
              },
              {
                title: "App Development Enthusiast",
                period: "Ongoing",
                description:
                  "Creating innovative mobile applications using Swift and Flutter in spare time, exploring cutting-edge technologies and design patterns",
              },
            ].map((activity, index) => (
              <motion.div
                key={activity.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <GlassCard elevation={2} className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{activity.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{activity.period}</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span>{activity.description}</span>
                    </li>
                  </ul>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
