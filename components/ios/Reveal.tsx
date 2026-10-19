"use client";

import {
  createElement,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  type AnchorHTMLAttributes,
  type CSSProperties,
} from "react";
import { cn } from "@/lib/utils";

interface RevealProps extends AnchorHTMLAttributes<HTMLElement> {
  as?: "div" | "section" | "span" | "a" | "li";
  // Seconds; for short staggers within a group
  delay?: number;
}

// Entrance on arrival, never on scroll: content in the first viewport eases in (CSS
// opacity + transform, off the main thread); anything below the fold is shown at once,
// so scrolling never triggers style changes or repaints.
export const Reveal = forwardRef<HTMLElement, RevealProps>(
  ({ as = "div", delay, className, style, children, ...props }, ref) => {
    const inner = useRef<HTMLElement>(null);
    useImperativeHandle(ref, () => inner.current as HTMLElement);

    useEffect(() => {
      const el = inner.current;
      if (!el) return;
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.dataset.instant = "";
        el.dataset.shown = "";
        return;
      }
      // Next frame, so the initial state is painted and the transition runs
      const frame = requestAnimationFrame(() => {
        el.dataset.shown = "";
      });
      return () => cancelAnimationFrame(frame);
    }, []);

    const merged: CSSProperties | undefined = delay
      ? { ...style, transitionDelay: `${delay}s` }
      : style;

    return createElement(
      as,
      { ref: inner, className: cn("reveal", className), style: merged, ...props },
      children
    );
  }
);

Reveal.displayName = "Reveal";
