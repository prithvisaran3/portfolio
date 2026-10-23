"use client";

import { Reveal } from "@/components/ios/Reveal";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, ExternalLink } from "lucide-react";
import { SectionTitle } from "@/components/ios/SectionTitle";
import { GlassCard } from "@/components/ios/GlassCard";
import { Button } from "@/components/ui/button";
import { spring } from "@/lib/motion";
export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <SectionTitle subtitle="Questions, collaborations, or just saying hello">
        Get In Touch
      </SectionTitle>

      <div className="max-w-2xl mx-auto space-y-8">
        {/* Email CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring}
        >
          <GlassCard elevation={2} className="p-8 text-center">
            <Mail className="w-12 h-12 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-2">Email Me</h2>
            <p className="text-muted-foreground mb-6">
              Always happy to connect about healthcare software, AI, and mobile development.
            </p>
            <Button asChild size="lg" className="gap-2 rounded-full select-all" variant="tint">
              <a href="mailto:prithvisaran.s@gmail.com">
                <Mail className="w-4 h-4" />
                prithvisaran.s@gmail.com
              </a>
            </Button>
          </GlassCard>
        </motion.div>

        {/* Social Links */}
        <Reveal>
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
                  <ExternalLink aria-hidden className="w-4 h-4 text-muted-foreground opacity-60 group-hover:opacity-100 transition-opacity" />
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
                  <ExternalLink aria-hidden className="w-4 h-4 text-muted-foreground opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
              </GlassCard>
            </a>
          </div>
        </Reveal>

        {/* Availability */}
        <Reveal>
          <GlassCard elevation={1} className="p-6">
            <h3 className="font-semibold mb-2">Current Status</h3>
            <div className="flex items-center gap-2">
              <span aria-hidden className="w-2.5 h-2.5 rounded-full bg-green-500 ring-4 ring-green-500/20" />
              <p className="text-sm text-muted-foreground">
                Software Engineer at United Theranostics
              </p>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Currently building clinical and revenue cycle software. Open to conversations, collaborations, and interesting problems.
            </p>
          </GlassCard>
        </Reveal>
      </div>
    </div>
  );
}

