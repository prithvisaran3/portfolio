"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  Briefcase,
  Ellipsis,
  FileText,
  House,
  LayoutGrid,
  Mail,
  Sparkles,
  UserRound,
  type LucideIcon,
} from "lucide-react";
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

// Mobile tab bar: four primary tabs plus More (Apple: no overflow tabs, labels under icons)
const tabItems: { name: string; path: string; icon: LucideIcon }[] = [
  { name: "Home", path: "/", icon: House },
  { name: "Experience", path: "/experience", icon: Briefcase },
  { name: "Projects", path: "/projects", icon: LayoutGrid },
  { name: "Contact", path: "/contact", icon: Mail },
];
const moreItems: { name: string; path: string; icon: LucideIcon }[] = [
  { name: "Skills", path: "/skills", icon: Sparkles },
  { name: "About", path: "/about", icon: UserRound },
  { name: "Resume", path: "/resume", icon: FileText },
];

export function IslandNav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [moreOpen, setMoreOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const moreRef = useRef<HTMLButtonElement>(null);
  const inMore = moreItems.some((item) => item.path === pathname);

  // Flip a boolean only when crossing the threshold, not on every scroll frame
  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 8;
    if (next !== scrolled) setScrolled(next);
  });

  useEffect(() => setMoreOpen(false), [pathname]);

  useEffect(() => {
    if (!moreOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMoreOpen(false);
        moreRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [moreOpen]);

  return (
    <>
      {/* Scroll edge effects: content fades where it meets the floating bars */}
      <div aria-hidden className={cn("edge-fade-top", scrolled ? "opacity-100" : "opacity-0")} />
      <div aria-hidden className="edge-fade-bottom lg:hidden" />

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

      {/* Mobile: slim top island (identity + appearance) */}
      <header className="fixed inset-x-0 top-4 z-50 px-4 lg:hidden">
        <div
          className={cn(
            "glass-chrome flex items-center justify-between rounded-2xl px-4 py-2 transition-shadow duration-300",
            scrolled ? "shadow-2xl" : "shadow-xl"
          )}
        >
          <Link href="/" className="press flex items-center text-lg font-bold" aria-label="Home">
            PS
          </Link>
          <ThemeToggle />
        </div>
      </header>

      {/* Mobile: floating tab bar above the home indicator */}
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 z-50 px-4 lg:hidden"
        style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 12px)" }}
      >
        {/* More: anchored to its tab, grows up and out of it */}
        <AnimatePresence>
          {moreOpen && (
            <motion.div
              id="more-menu"
              initial={{ opacity: 0, scale: 0.92, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 8 }}
              transition={springSnappy}
              style={{ transformOrigin: "bottom right" }}
              className="glass-chrome absolute bottom-full right-4 mb-2 w-52 rounded-2xl p-1.5 shadow-2xl"
            >
              <ul>
                {moreItems.map(({ name, path, icon: Icon }) => {
                  const isActive = pathname === path;
                  return (
                    <li key={path}>
                      <Link
                        href={path}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "press flex min-h-[48px] items-center gap-3 rounded-xl px-3 text-base font-medium",
                          isActive
                            ? "bg-foreground/10 text-[var(--tint-text)]"
                            : "text-foreground/80 hover:bg-foreground/5 hover:text-foreground"
                        )}
                      >
                        <Icon className="h-5 w-5" aria-hidden />
                        {name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="glass-chrome mx-auto grid max-w-md grid-cols-5 rounded-[28px] p-1.5 shadow-2xl">
          {tabItems.map(({ name, path, icon: Icon }) => {
            const isActive = pathname === path;
            return (
              <Link
                key={path}
                href={path}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "press relative flex min-h-[52px] flex-col items-center justify-center gap-0.5 rounded-[22px] text-[11px] font-medium",
                  isActive ? "text-[var(--tint-text)]" : "text-foreground/65"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="tab-pill"
                    className="absolute inset-0 rounded-[22px] bg-foreground/[0.08]"
                    transition={spring}
                  />
                )}
                <Icon className="relative h-[22px] w-[22px]" aria-hidden />
                <span className="relative">{name}</span>
              </Link>
            );
          })}
          <button
            ref={moreRef}
            type="button"
            onClick={() => setMoreOpen((open) => !open)}
            aria-expanded={moreOpen}
            aria-controls="more-menu"
            aria-label={moreOpen ? "Close more pages" : "More pages"}
            className={cn(
              "press relative flex min-h-[52px] flex-col items-center justify-center gap-0.5 rounded-[22px] text-[11px] font-medium",
              inMore || moreOpen ? "text-[var(--tint-text)]" : "text-foreground/65"
            )}
          >
            {inMore && (
              <motion.span
                layoutId="tab-pill"
                className="absolute inset-0 rounded-[22px] bg-foreground/[0.08]"
                transition={spring}
              />
            )}
            <Ellipsis className="relative h-[22px] w-[22px]" aria-hidden />
            <span className="relative">More</span>
          </button>
        </div>
      </nav>

      {/* Tap-outside scrim while More is open */}
      <AnimatePresence>
        {moreOpen && (
          <motion.button
            aria-label="Close more pages"
            tabIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMoreOpen(false)}
            className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
