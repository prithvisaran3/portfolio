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
              I&apos;m a passionate mobile app developer and graduate student at The George Washington University
              pursuing my M.S. in Computer Science. With a strong foundation from my B.Tech at Vellore Institute
              of Technology, I specialize in building scalable, performant cross-platform applications using
              Flutter, Swift, and modern backend technologies.
            </p>
            <p>
              My professional journey spans 4 companies and 12+ production applications reaching over 10,000 active users.
              From Cloud Jovy to Prommuni to Limitless 360, I&apos;ve consistently delivered impactful solutions by combining
              clean architecture, agile methodologies, and cutting-edge technologies like Firebase, AWS, and Machine Learning.
            </p>
            <p>
              Beyond mobile development, I&apos;m deeply interested in machine learning and cloud computing. Whether it&apos;s
              building predictive models for Amazon retail sales forecasting or architecting scalable backends with Django and Node.js,
              I thrive on solving complex technical challenges and creating exceptional user experiences.
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
                    Washington, DC • Open to Remote
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
                  <h3 className="font-semibold mb-1">Availability</h3>
                  <p className="text-sm text-muted-foreground">
                    May 2026 • Full-time &amp; Internships
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
                    4 internships • 12+ apps • 10K+ users
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

