"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ios/SectionTitle";
import { GlassCard } from "@/components/ios/GlassCard";
import { Calendar, MapPin, GraduationCap, Briefcase } from "lucide-react";
export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <SectionTitle subtitle="Get to know more about me and my journey">
        About Me
      </SectionTitle>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard elevation={2} className="p-4 sm:p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Hi, I&apos;m Prithvi Saran Sathyasaran 👋</h2>
            <div className="space-y-4 text-muted-foreground">
            <p>
              I&apos;m a software engineer at United Theranostics, where I build clinical and revenue cycle software for a radiopharmaceutical cancer care network. I hold an M.S. in Computer Science from The George Washington University and a B.Tech from Vellore Institute of Technology.
            </p>
            <p>
              I started in mobile: across 5 companies I&apos;ve shipped 12+ production apps reaching over 10,000 users, including Drillhub and Prommuni on the App Store. Today I work across the stack, from Python services and AI pipelines to React dashboards and AWS infrastructure, and was promoted to Clinical Software Engineer II within my first month.
            </p>
            <p>
              I care about software that has to be right: systems where a wrong number has real consequences. I enjoy turning messy real-world documents and workflows into reliable, reviewable automation, and I still build mobile and AI side projects in my spare time.
            </p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Quick Facts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <GlassCard interactive elevation={2} className="p-6 h-full">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Location</h3>
                  <p className="text-sm text-muted-foreground">
                    Washington, DC Area • Remote
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <GlassCard interactive elevation={2} className="p-6 h-full">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Current Role</h3>
                  <p className="text-sm text-muted-foreground">
                    Clinical Software Engineer II • United Theranostics
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <GlassCard interactive elevation={2} className="p-6 h-full">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Education</h3>
                  <p className="text-sm text-muted-foreground">
                    M.S. CS @ GWU &apos;26 • B.Tech @ VIT &apos;23
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <GlassCard interactive elevation={2} className="p-6 h-full">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Experience</h3>
                  <p className="text-sm text-muted-foreground">
                    5 companies • 12+ apps • 10K+ users
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Interests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <GlassCard elevation={2} className="p-8">
            <h2 className="text-2xl font-bold mb-4">Interests & Hobbies</h2>
            <div className="flex flex-wrap gap-3">
              {[
                "Mobile UI/UX Design",
                "Machine Learning",
                "Cloud Architecture",
                "Open Source",
                "Agile Development",
                "API Design",
                "Healthcare Software",
                "LLM Applications",
                "Revenue Cycle Automation",
              ].map((interest) => (
                <span
                  key={interest}
                  className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
                >
                  {interest}
                </span>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}

