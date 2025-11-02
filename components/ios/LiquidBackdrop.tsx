"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

interface Twinkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

export function LiquidBackdrop() {
  const { scrollY } = useScroll();
  const [twinkles, setTwinkles] = useState<Twinkle[]>([]);

  // Parallax transforms
  const blob1Y = useTransform(scrollY, [0, 1000], [0, 200]);
  const blob2Y = useTransform(scrollY, [0, 1000], [0, -150]);
  const blob3Y = useTransform(scrollY, [0, 1000], [0, 100]);

  useEffect(() => {
    // Generate random twinkle positions
    const newTwinkles: Twinkle[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 3,
    }));
    setTwinkles(newTwinkles);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted" />

      {/* Animated gradient blobs with parallax */}
      <motion.div
        style={{ y: blob1Y }}
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-30 dark:opacity-20"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-cyan-500 dark:from-blue-600 dark:to-cyan-600" />
      </motion.div>

      <motion.div
        style={{ y: blob2Y }}
        className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full blur-3xl opacity-25 dark:opacity-15"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600" />
      </motion.div>

      <motion.div
        style={{ y: blob3Y }}
        className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full blur-3xl opacity-20 dark:opacity-10"
        animate={{
          scale: [1, 1.1, 1],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-full h-full bg-gradient-to-br from-orange-500 to-yellow-500 dark:from-orange-600 dark:to-yellow-600" />
      </motion.div>

      {/* Twinkle stars/dots */}
      {twinkles.map((twinkle) => (
        <motion.div
          key={twinkle.id}
          className="absolute rounded-full bg-foreground/10 dark:bg-foreground/5"
          style={{
            left: `${twinkle.x}%`,
            top: `${twinkle.y}%`,
            width: `${twinkle.size}px`,
            height: `${twinkle.size}px`,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: twinkle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />
    </div>
  );
}

