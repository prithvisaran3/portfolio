"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { spring, springSnappy } from "@/lib/motion";
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
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Flip a boolean only when crossing the threshold, not on every scroll frame
  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 8;
    if (next !== scrolled) setScrolled(next);
  });

  useEffect(() => setIsOpen(false), [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <>
      {/* Scroll edge effect: content softens as it slides under the floating nav,
          instead of a hard line. Only shown once something is underneath. */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none fixed inset-x-0 top-0 z-40 h-24 transition-opacity duration-300",
          "bg-gradient-to-b from-background/80 to-transparent backdrop-blur-[2px]",
          "[mask-image:linear-gradient(to_bottom,black_40%,transparent)]",
          scrolled ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Desktop Navigation */}
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 top-4 z-50 mx-auto hidden w-fit px-4 lg:block"
      >
        <div
          className={cn(
            "glass-chrome rounded-full px-3 py-2 transition-shadow duration-300",
            scrolled ? "shadow-2xl" : "shadow-xl"
          )}
        >
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "press relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-foreground/65 hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-foreground/10"
                      transition={spring}
                    />
                  )}
                  <span className="relative z-10">{item.name}</span>
                </Link>
              );
            })}
            <div className="ml-1 border-l border-foreground/10 pl-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav aria-label="Primary" className="fixed inset-x-0 top-4 z-50 px-4 lg:hidden">
        <div
          className={cn(
            "glass-chrome rounded-2xl px-4 py-3 transition-shadow duration-300",
            scrolled ? "shadow-2xl" : "shadow-xl"
          )}
        >
          <div className="flex items-center justify-between">
            <Link href="/" className="press flex items-center text-lg font-bold" aria-label="Home">
              PS
            </Link>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                ref={toggleRef}
                onClick={() => setIsOpen((open) => !open)}
                className="press flex items-center justify-center rounded-xl p-2 hover:bg-foreground/5"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Menu panel overlays the page (no layout shift) and grows out of the toggle */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              id="mobile-menu"
              initial={{ opacity: 0, scale: 0.96, y: -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -6 }}
              transition={springSnappy}
              style={{ transformOrigin: "top right" }}
              className="glass-chrome mt-2 rounded-2xl p-2 shadow-2xl"
            >
              <ul className="flex flex-col">
                {navItems.map((item) => {
                  const isActive = pathname === item.path;
                  return (
                    <li key={item.path}>
                      <Link
                        href={item.path}
                        onClick={() => setIsOpen(false)}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "flex items-center rounded-xl px-4 py-3 text-base font-medium transition-colors",
                          isActive
                            ? "bg-foreground/10 text-foreground"
                            : "text-foreground/75 hover:bg-foreground/5 hover:text-foreground"
                        )}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Tap-outside scrim: dims to focus while the menu is open */}
      <AnimatePresence>
        {isOpen && (
          <motion.button
            aria-label="Close menu"
            tabIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
