"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, MapPin, GraduationCap } from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/ios/GlassCard";
import { SkillChip } from "@/components/ios/SkillChip";
import { Button } from "@/components/ui/button";
import { reveal, spring } from "@/lib/motion";

const highlights = [
  { value: "10K+", label: "Active users across mobile apps" },
  { value: "12+", label: "Production apps deployed" },
  { value: "5", label: "Companies worked with" },
];

const coreTech = [
  "Python",
  "TypeScript",
  "React",
  "FastAPI",
  "MySQL",
  "PostgreSQL",
  "Google Gemini",
  "AWS",
  "Docker",
  "GitHub Actions",
  "Flutter",
  "SwiftUI",
];

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-20">
      {/* Hero Section */}
      <section className="min-h-[72vh] flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={spring}
          >
            <h1 className="text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-7xl font-bold tracking-[-0.035em] mb-6 px-2">
              Prithvi Saran Sathyasaran
            </h1>

            <p className="text-xl sm:text-2xl md:text-3xl tracking-[-0.01em] text-muted-foreground mb-4 text-balance">
              <a
                href="https://www.linkedin.com/company/united-theranostics/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                Software Engineer @&nbsp;United&nbsp;Theranostics
              </a>
            </p>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6">
              Full-Stack · AI · Healthcare · Mobile
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-muted-foreground mb-12">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4" />
                <span>Washington, DC</span>
              </div>
              <div className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4" />
                <span>M.S. CS, GWU</span>
              </div>
            </div>

            {/* One primary action, two secondary */}
            <div className="mx-auto grid w-full max-w-md grid-cols-2 gap-3 sm:flex sm:max-w-none sm:items-center sm:justify-center sm:gap-4">
              <Button asChild size="lg" variant="tint" className="col-span-2 gap-2 rounded-full">
                <Link href="/projects">
                  See Projects
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="glass" className="gap-2 rounded-full px-4 sm:px-8">
                <Link href="/contact">
                  <Mail className="w-4 h-4" />
                  Contact
                </Link>
              </Button>
              <Button asChild size="lg" variant="glass" className="gap-2 rounded-full px-4 sm:px-8">
                <a href="/assets/PrithviSaranSathyasaran_Resume.pdf" download>
                  <Download className="w-4 h-4" />
                  Resume
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Highlights */}
      <section className="py-20" aria-label="Highlights">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((item) => (
            <motion.div key={item.label} {...reveal}>
              <GlassCard elevation={2} className="p-8 h-full">
                <p className="text-4xl font-bold tracking-[-0.03em] mb-2">{item.value}</p>
                <p className="text-muted-foreground">{item.label}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Tech Stack */}
      <section className="py-20">
        <motion.div {...reveal} className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Core Technologies</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {coreTech.map((tech) => (
              <SkillChip key={tech} name={tech} />
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
