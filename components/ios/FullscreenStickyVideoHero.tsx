"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ArrowRight,
  Download,
  Mail,
  MapPin,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * FullscreenStickyVideoHero
 *
 * Split layout: hero text on the left, cinematic video on the right.
 * Video has a feathered edge that fades into the page background.
 * Ambilight blur effect behind the video for ambient glow.
 * All original hero content preserved (name, subtitle, badges, CTAs).
 */
export function FullscreenStickyVideoHero() {
  /* ─── Refs ─── */
  const fgVideoRef = useRef<HTMLVideoElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  /* ─── State ─── */
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showSoundBadge, setShowSoundBadge] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  /* ─── Scroll-based parallax ─── */
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.97]);

  /* ─── Mount animation trigger ─── */
  useEffect(() => {
    setIsMounted(true);
  }, []);

  /* ─── Sync both videos ─── */
  const syncVideos = useCallback(() => {
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;
    if (fg && bg && Math.abs(fg.currentTime - bg.currentTime) > 0.1) {
      bg.currentTime = fg.currentTime;
    }
  }, []);

  useEffect(() => {
    const fg = fgVideoRef.current;
    if (!fg) return;
    const handleTimeUpdate = () => syncVideos();
    fg.addEventListener("timeupdate", handleTimeUpdate);
    return () => fg.removeEventListener("timeupdate", handleTimeUpdate);
  }, [syncVideos]);

  /* ─── Play / Pause toggle ─── */
  const togglePlay = useCallback(() => {
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;
    if (!fg || !bg) return;
    if (isPlaying) {
      fg.pause();
      bg.pause();
    } else {
      fg.play();
      bg.play();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  /* ─── Mute / Unmute toggle ─── */
  const toggleMute = useCallback(() => {
    const fg = fgVideoRef.current;
    if (!fg) return;
    fg.muted = !fg.muted;
    setIsMuted(fg.muted);
    if (!fg.muted) setShowSoundBadge(false);
  }, []);

  /* ─── Role badges ─── */
  const roles = [
    "Software Engineer",
    "Software Developer",
    "Mobile App Developer",
    "Machine Learning Engineer",
    "Cloud Engineer",
  ];

  const VIDEO_SRC = "/assets/3dPrithvi.mp4";

  /* ─── Spring-like easing for mount ─── */
  const mountTransition = {
    duration: 1.2,
    ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  };

  return (
    <motion.section
      ref={heroRef}
      style={{ opacity: heroOpacity, scale: heroScale }}
      className="sticky top-0 h-screen w-full overflow-hidden z-0"
    >
      {/* ══════════════════════════════════════════════
          AMBILIGHT — Blurred video behind the main video
          Provides ambient color glow that matches video content.
          ══════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={bgVideoRef}
          src={VIDEO_SRC}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 right-0 w-[60%] h-full object-cover scale-150 opacity-15 dark:opacity-10"
          style={{
            filter: "blur(100px) saturate(1.8)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* ══════════════════════════════════════════════
          MAIN CONTENT — Two-column split layout
          Left: Hero text + badges + CTAs
          Right: Video with feathered edges
          ══════════════════════════════════════════════ */}
      <div className="relative z-[1] h-full flex items-center">
        <div className="w-full max-w-[90rem] mx-auto px-6 sm:px-8 md:px-12 lg:px-16">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-4">

            {/* ─── LEFT COLUMN: Text Content ─── */}
            <div className="flex-1 text-center lg:text-left max-w-2xl lg:max-w-none z-[2]">
              {/* Name */}
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={isMounted ? { opacity: 1, y: 0 } : {}}
                transition={{ ...mountTransition, delay: 0.3 }}
                className="font-bold tracking-tight mb-4"
                style={{
                  fontSize: "clamp(1.75rem, 4.5vw, 4rem)",
                  lineHeight: 1.1,
                }}
              >
                Prithvi Saran Sathyasaran
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isMounted ? { opacity: 1, y: 0 } : {}}
                transition={{ ...mountTransition, delay: 0.4 }}
                className="text-muted-foreground mb-1.5"
                style={{ fontSize: "clamp(1rem, 2.5vw, 1.75rem)" }}
              >
                Software Engineer
              </motion.p>

              {/* Tech focus */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isMounted ? { opacity: 1, y: 0 } : {}}
                transition={{ ...mountTransition, delay: 0.45 }}
                className="text-muted-foreground/60 font-light mb-5"
                style={{ fontSize: "clamp(0.85rem, 1.8vw, 1.15rem)" }}
              >
                Flutter · iOS
              </motion.p>

              {/* Available Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isMounted ? { opacity: 1, scale: 1 } : {}}
                transition={{ ...mountTransition, delay: 0.5 }}
                className="mb-5"
              >
                <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  Available May 2026
                </span>
              </motion.div>

              {/* Role Badges */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={isMounted ? { opacity: 1, y: 0 } : {}}
                transition={{ ...mountTransition, delay: 0.55 }}
                className="mb-5"
              >
                <p className="text-xs text-muted-foreground mb-3 font-medium tracking-wide uppercase">
                  Seeking Full-Time Roles
                </p>
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                  {roles.map((role, index) => (
                    <motion.span
                      key={role}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isMounted ? { opacity: 1, y: 0 } : {}}
                      transition={{
                        ...mountTransition,
                        delay: 0.6 + index * 0.08,
                      }}
                      className="px-3 py-1.5 text-xs md:text-sm rounded-full bg-secondary/50 text-secondary-foreground border border-border/50"
                    >
                      {role}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Location & Education */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={isMounted ? { opacity: 1, y: 0 } : {}}
                transition={{ ...mountTransition, delay: 0.7 }}
                className="flex items-center justify-center lg:justify-start gap-4 text-sm text-muted-foreground mb-8 flex-wrap"
              >
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>Washington, DC</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>M.S. in Computer Science @ GWU &apos;26</span>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isMounted ? { opacity: 1, y: 0 } : {}}
                transition={{ ...mountTransition, delay: 0.8 }}
                className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4"
              >
                <Link href="/projects" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="gap-2 rounded-full w-full sm:w-auto"
                    variant="glass"
                  >
                    See Projects
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="gap-2 rounded-full w-full sm:w-auto"
                    variant="glass"
                  >
                    <Mail className="w-4 h-4" />
                    Contact Me
                  </Button>
                </Link>
                <a
                  href="/assets/PrithviSaranSathyasaran_Resume.pdf"
                  download
                  className="w-full sm:w-auto"
                >
                  <Button
                    size="lg"
                    className="gap-2 rounded-full w-full sm:w-auto"
                    variant="glass"
                  >
                    <Download className="w-4 h-4" />
                    Download Resume
                  </Button>
                </a>
              </motion.div>
            </div>

            {/* ─── RIGHT COLUMN: Video with feathered edges ─── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 40 }}
              animate={isMounted ? { opacity: 1, scale: 1, x: 0 } : {}}
              transition={{ ...mountTransition, delay: 0.2 }}
              className="flex-1 relative w-full max-w-lg lg:max-w-xl xl:max-w-2xl"
            >
              {/* Video container with feathered (fading) edges */}
              <div
                className="relative aspect-[4/5] sm:aspect-[3/4] lg:aspect-[4/5] w-full"
                style={{
                  /* Composite mask: each linear-gradient fades one edge.
                     Multiplied together they create a soft vignette on all sides
                     so the video dissolves seamlessly into the page background. */
                  WebkitMaskImage: [
                    "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)",
                    "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
                  ].join(", "),
                  WebkitMaskComposite: "destination-in",
                  maskImage: [
                    "linear-gradient(to bottom, transparent 0%, black 25%, black 75%, transparent 100%)",
                    "linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)",
                  ].join(", "),
                  maskComposite: "intersect",
                }}
              >
                <video
                  ref={fgVideoRef}
                  src={VIDEO_SRC}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* ─── Glass Controls — Bottom of video area ─── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isMounted ? { opacity: 1, y: 0 } : {}}
                transition={{ ...mountTransition, delay: 1.0 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] flex items-center gap-3"
              >
                {/* "Tap for Sound" Badge */}
                <AnimatePresence>
                  {showSoundBadge && (
                    <motion.button
                      onClick={toggleMute}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{
                        opacity: 0,
                        scale: 0.8,
                        transition: { duration: 0.4 },
                      }}
                      className="relative px-4 py-2 rounded-full text-xs font-medium
                        glass-effect hover:scale-105
                        transition-transform duration-300 cursor-pointer"
                    >
                      {/* Pulsing ring animation */}
                      <span className="absolute inset-0 rounded-full animate-ping-slow bg-primary/10" />
                      <span className="relative flex items-center gap-1.5">
                        <Volume2 className="w-3.5 h-3.5" />
                        Tap for sound
                      </span>
                    </motion.button>
                  )}
                </AnimatePresence>

                {/* Glass Control Bar */}
                <div className="flex items-center gap-1 px-2 py-1.5 rounded-full glass-effect shadow-lg">
                  {/* Play/Pause */}
                  <motion.button
                    onClick={togglePlay}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    className="p-2 rounded-full hover:bg-foreground/10 transition-colors duration-200"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </motion.button>

                  {/* Divider */}
                  <div className="w-px h-4 bg-border" />

                  {/* Mute/Unmute */}
                  <motion.button
                    onClick={toggleMute}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    className="p-2 rounded-full hover:bg-foreground/10 transition-colors duration-200"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
