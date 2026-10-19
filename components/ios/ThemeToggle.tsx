"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { springSnappy } from "@/lib/motion";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Use resolvedTheme to handle system theme properly
  const currentTheme = mounted ? (resolvedTheme || theme) : "light";
  const isDark = currentTheme === "dark";
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  if (!mounted) {
    return (
      <button
        className="relative flex h-9 w-9 items-center justify-center rounded-full bg-transparent"
        aria-label="Toggle theme"
        disabled
      >
        <Sun className="h-5 w-5 opacity-50" />
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="press relative flex h-9 w-9 items-center justify-center rounded-full text-foreground hover:bg-foreground/5"
      aria-label={label}
      title={label}
    >
      {/* Icons cross-fade and rotate in place; no remount jump */}
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={currentTheme}
          initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
          transition={springSnappy}
          className="flex"
        >
          {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
