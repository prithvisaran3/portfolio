"use client";

import { Reveal } from "@/components/ios/Reveal";
import { ReactNode } from "react";

interface SectionTitleProps {
  children: ReactNode;
  subtitle?: string;
  // Page titles are h1; use h2 for a secondary section on the same page
  as?: "h1" | "h2";
}

export function SectionTitle({ children, subtitle, as: Heading = "h1" }: SectionTitleProps) {
  return (
    <Reveal className="mb-12 text-center">
      <Heading className="text-4xl md:text-5xl font-bold tracking-[-0.025em] leading-[1.05] mb-3">
        {children}
      </Heading>
      {subtitle && (
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
