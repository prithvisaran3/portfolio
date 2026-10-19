"use client";

import { Reveal } from "@/components/ios/Reveal";
import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ios/SectionTitle";
import { GlassCard } from "@/components/ios/GlassCard";
import { MapPin, GraduationCap, Briefcase, Smartphone } from "lucide-react";
import { spring } from "@/lib/motion";

const quickFacts = [
  {
    icon: Briefcase,
    label: "Current Role",
    value: "Clinical Software Engineer II",
    detail: "United Theranostics · Remote",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Washington, DC area",
    detail: "Working remotely",
  },
  {
    icon: GraduationCap,
    label: "Education",
    value: "M.S. Computer Science, GWU",
    detail: "GPA 3.74 · May 2026",
    extra: "B.Tech, VIT · 2023",
  },
  {
    icon: Smartphone,
    label: "Track Record",
    value: "12+ production apps",
    detail: "10K+ users · 5 companies",
  },
];

const focusAreas = [
  "Healthcare software (RCM)",
  "LLM document extraction",
  "Human-in-the-loop AI",
  "Full-stack web (React + FastAPI)",
  "Data pipelines & ETL",
  "Cloud infrastructure on AWS",
  "Mobile apps (Flutter, SwiftUI)",
  "Correctness & regression testing",
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <SectionTitle subtitle="Get to know more about me and my journey">
        About Me
      </SectionTitle>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring}
        >
          <GlassCard elevation={2} className="p-5 sm:p-6 md:p-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">Hi, I&apos;m Prithvi Saran Sathyasaran</h2>
            <div className="space-y-4 text-muted-foreground">
            <p>
              I&apos;m a Clinical Software Engineer II at United Theranostics, a radiopharmaceutical cancer care network, where I lead development of our revenue cycle management software. I was promoted from Engineer I within my first month. My work spans AI-assisted charge capture, document pipelines that turn insurance remittances and faxes into structured data, and the production inventory system our treatment centers rely on.
            </p>
            <p>
              I build systems where a wrong number has real consequences, so I design for correctness first: rules engines alongside LLMs, physician-in-the-loop review, dose accounting that fails closed, and a CI gate that replays our full historical corpus before every deploy. Day to day that means Python, FastAPI, React, MySQL, Google Gemini, and AWS.
            </p>
            <p>
              Before healthcare I was a mobile engineer. I shipped 12+ production apps reaching over 10,000 users, including Drillhub and Prommuni on the App Store. I hold an M.S. in Computer Science from The George Washington University and a B.Tech from VIT, and I&apos;m an AWS Certified Cloud Practitioner.
            </p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Quick Facts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickFacts.map((fact) => (
            <Reveal key={fact.label}>
              <GlassCard elevation={2} className="p-6 h-full">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10 shrink-0">
                    <fact.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                      {fact.label}
                    </h3>
                    <p className="font-semibold leading-snug">{fact.value}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{fact.detail}</p>
                    {"extra" in fact && (
                      <p className="text-sm text-muted-foreground">{fact.extra}</p>
                    )}
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>

        {/* Focus Areas */}
        <Reveal>
          <GlassCard elevation={2} className="p-6 sm:p-8">
            <h2 className="text-2xl font-bold mb-4">Focus Areas</h2>
            <div className="flex flex-wrap gap-3">
              {focusAreas.map((area) => (
                <span
                  key={area}
                  className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
                >
                  {area}
                </span>
              ))}
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </div>
  );
}
