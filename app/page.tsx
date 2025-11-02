"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, MapPin, Calendar } from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/ios/GlassCard";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-20">
      {/* Hero Section */}
      <section className="min-h-[80vh] flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Available May 2026
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Prithvi Saran Sathyasaran
            </h1>

            <p className="text-2xl md:text-3xl text-muted-foreground mb-4">
              Mobile App Developer
            </p>

            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Flutter · iOS · Android
            </p>

            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-12">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span>Washington, DC</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>M.S. in Computer Science @ GWU &apos;26</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/projects">
                <Button size="lg" className="gap-2 rounded-full" variant="glass">
                  See Projects
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" className="gap-2 rounded-full" variant="glass">
                  <Mail className="w-4 h-4" />
                  Contact Me
                </Button>
              </Link>
              <a href="/assets/PrithviSaranSathyasaran_Resume.pdf" download>
                <Button size="lg" className="gap-2 rounded-full" variant="glass">
                  <Download className="w-4 h-4" />
                  Download Resume
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

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
  );
}

