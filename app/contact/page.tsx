"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, ExternalLink } from "lucide-react";
import { SectionTitle } from "@/components/ios/SectionTitle";
import { GlassCard } from "@/components/ios/GlassCard";
import { Button } from "@/components/ui/button";
export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <SectionTitle subtitle="Let&apos;s work together on your next project">
        Get In Touch
      </SectionTitle>

      <div className="max-w-2xl mx-auto space-y-8">
        {/* Email CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GlassCard elevation={2} className="p-8 text-center">
            <Mail className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-2">Email Me</h2>
            <p className="text-muted-foreground mb-6">
              I&apos;m currently open to new opportunities and always happy to connect!
            </p>
            <a href="mailto:prithvisarans@gwu.edu">
              <Button size="lg" className="gap-2 rounded-full" variant="glass">
                <Mail className="w-4 h-4" />
                prithvisarans@gwu.edu
              </Button>
            </a>
          </GlassCard>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="text-xl font-bold text-center mb-6">Connect With Me</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="https://github.com/prithvisaran3"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GlassCard interactive elevation={2} className="p-6 group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Github className="w-8 h-8" />
                    <div>
                      <p className="font-semibold">GitHub</p>
                      <p className="text-sm text-muted-foreground">@prithvisaran3</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </GlassCard>
            </a>

            <a
              href="https://www.linkedin.com/in/prithvisaransathyasaran/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GlassCard interactive elevation={2} className="p-6 group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Linkedin className="w-8 h-8" />
                    <div>
                      <p className="font-semibold">LinkedIn</p>
                      <p className="text-sm text-muted-foreground">Prithvi Saran</p>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </GlassCard>
            </a>
          </div>
        </motion.div>

        {/* Availability */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <GlassCard elevation={1} className="p-6">
            <h3 className="font-semibold mb-2">Current Status</h3>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              <p className="text-sm text-muted-foreground">
                Available for opportunities starting May 2026
              </p>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              I&apos;m actively seeking full-time roles and internships in mobile app development.
              Open to remote, hybrid, and on-site positions.
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}

