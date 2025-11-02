"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

  // Subtle scale effect on scroll
  const scale = useTransform(scrollY, [0, 100], [1, 0.95]);
  const paddingY = useTransform(scrollY, [0, 100], [16, 12]);

  return (
    <motion.nav
      style={{ scale, paddingTop: paddingY, paddingBottom: paddingY }}
      className="sticky top-4 z-50 mx-auto max-w-fit px-4"
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
  );
}

