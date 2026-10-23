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

// One shared observer for every reveal on the page
let observer: IntersectionObserver | null = null;
function observe(el: Element) {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.shown = "";
            observer?.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
  }
  observer.observe(el);
  return () => observer?.unobserve(el);
}

type Variant = "up" | "left" | "right" | "pop" | "fade";

interface RevealProps extends AnchorHTMLAttributes<HTMLElement> {
  as?: "div" | "section" | "span" | "a" | "li";
  variant?: Variant;
  // Seconds
  delay?: number;
}

// Scroll reveal: the element (and any <RevealItem> inside it) animates in as it enters the
// viewport. A single attribute flip per element drives CSS transitions on opacity and
// transform, so the browser animates off the main thread instead of running a JS spring
// per element.
export const Reveal = forwardRef<HTMLElement, RevealProps>(
  ({ as = "div", variant = "up", delay, className, style, children, ...props }, ref) => {
    const inner = useRef<HTMLElement>(null);
    useImperativeHandle(ref, () => inner.current as HTMLElement);

    useEffect(() => {
      const el = inner.current;
      if (!el) return;
      return observe(el);
    }, []);

    return createElement(
      as,
      {
        ref: inner,
        className: cn("reveal", `reveal-${variant}`, className),
        style: delay ? ({ ...style, "--d": `${delay}s` } as CSSProperties) : style,
        ...props,
      },
      children
    );
  }
);
Reveal.displayName = "Reveal";

interface RevealItemProps extends AnchorHTMLAttributes<HTMLElement> {
  as?: "div" | "span" | "li" | "p" | "h2" | "h3";
  variant?: Variant;
  delay?: number;
}

// Child of a <Reveal>: animates when its parent is revealed, after `delay`, so text inside
// a card can stagger in without each line needing its own observer.
export function RevealItem({
  as = "div",
  variant = "up",
  delay = 0,
  className,
  style,
  children,
  ...props
}: RevealItemProps) {
  return createElement(
    as,
    {
      className: cn("reveal-item", `reveal-${variant}`, className),
      style: { ...style, "--d": `${delay}s` } as CSSProperties,
      ...props,
    },
    children
  );
}
