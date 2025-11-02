"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full bg-transparent" aria-hidden="true" />
    );
  }

  return (
    <motion.button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative w-9 h-9 rounded-full flex items-center justify-center text-foreground hover:bg-foreground/5 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          rotate: theme === "dark" ? 180 : 0,
          scale: theme === "dark" ? 0.8 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {theme === "dark" ? (
          <Moon className="w-5 h-5" />
        ) : (
          <Sun className="w-5 h-5" />
        )}
      </motion.div>
    </motion.button>
  );
}

