"use client";

import { motion } from "framer-motion";
import { FullscreenStickyVideoHero } from "@/components/ios/FullscreenStickyVideoHero";
import { GlassCard } from "@/components/ios/GlassCard";

export default function HomePage() {
  return (
    <>
      {/* Cinematic Video Hero — sticky, full viewport */}
      <FullscreenStickyVideoHero />

      {/* Scrollable content below the hero */}
      <div className="relative z-10 bg-background">
        <div className="container mx-auto px-4">
          {/* Quick Highlights */}
          <section className="py-20">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <GlassCard interactive elevation={2} className="p-8 h-full">
                    <h3 className="text-4xl font-bold mb-2">10K+</h3>
                    <p className="text-muted-foreground">
                      Active users across mobile apps
                    </p>
                  </GlassCard>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <GlassCard interactive elevation={2} className="p-8 h-full">
                    <h3 className="text-4xl font-bold mb-2">12+</h3>
                    <p className="text-muted-foreground">
                      Production apps deployed
                    </p>
                  </GlassCard>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <GlassCard interactive elevation={2} className="p-8 h-full">
                    <h3 className="text-4xl font-bold mb-2">4</h3>
                    <p className="text-muted-foreground">
                      Professional internships
                    </p>
                  </GlassCard>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Featured Tech Stack */}
          <section className="py-20">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold mb-8">Core Technologies</h2>
                <div className="flex flex-wrap justify-center gap-3">
                  {[
                    "Flutter",
                    "Swift",
                    "Python",
                    "Django",
                    "Firebase",
                    "React",
                    "AWS",
                    "Machine Learning",
                  ].map((tech, index) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.05,
                        type: "spring",
                      }}
                    >
                      <GlassCard
                        interactive
                        elevation={1}
                        className="px-5 py-2.5 inline-block"
                      >
                        <span className="font-medium">{tech}</span>
                      </GlassCard>
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

