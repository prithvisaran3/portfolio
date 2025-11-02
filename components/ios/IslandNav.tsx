"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Experience", path: "/experience" },
  { name: "Projects", path: "/projects" },
  { name: "Skills", path: "/skills" },
  { name: "About", path: "/about" },
  { name: "Resume", path: "/resume" },
  { name: "Contact", path: "/contact" },
];

export function IslandNav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isOpen, setIsOpen] = useState(false);

  // Subtle scale effect on scroll
  const scale = useTransform(scrollY, [0, 100], [1, 0.95]);
  const paddingY = useTransform(scrollY, [0, 100], [16, 12]);

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        style={{ scale, paddingTop: paddingY, paddingBottom: paddingY }}
        className="sticky top-4 z-50 mx-auto max-w-fit px-4 hidden lg:block"
      >
        <div className="glass-effect rounded-full px-6 py-3 shadow-2xl">
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors rounded-full",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-foreground/10 dark:bg-foreground/5"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </Link>
              );
            })}
            <div className="ml-2 pl-2 border-l border-border">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <motion.nav
        style={{ paddingTop: paddingY, paddingBottom: paddingY }}
        className="sticky top-4 z-50 mx-auto px-4 lg:hidden"
      >
        <div className="glass-effect rounded-2xl px-4 py-3 shadow-2xl">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-lg font-bold">
              PS
            </Link>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg hover:bg-foreground/5 transition-colors"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-border"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "bg-foreground/10 text-foreground"
                          : "text-muted-foreground hover:bg-foreground/5 hover:text-foreground"
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </div>
      </motion.nav>
    </>
  );
}

