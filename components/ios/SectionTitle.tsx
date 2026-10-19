"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { reveal } from "@/lib/motion";

interface SectionTitleProps {
  children: ReactNode;
  subtitle?: string;
  // Page titles are h1; use h2 for a secondary section on the same page
  as?: "h1" | "h2";
}

export function SectionTitle({ children, subtitle, as: Heading = "h1" }: SectionTitleProps) {
  return (
    <motion.div {...reveal} className="mb-12 text-center">
      <Heading className="text-4xl md:text-5xl font-bold tracking-[-0.025em] leading-[1.05] mb-3">
        {children}
      </Heading>
      {subtitle && (
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
