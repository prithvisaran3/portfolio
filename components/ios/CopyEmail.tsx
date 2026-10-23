"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { springSnappy } from "@/lib/motion";

// One-tap copy with completion feedback: the icon morphs to a checkmark and the label
// confirms, announced to screen readers through a polite live region.
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="press glass-effect glass-effect-hover specular inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium"
      aria-label={copied ? "Email copied" : `Copy ${email}`}
    >
      <span className="relative flex h-4 w-4 items-center justify-center">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.span
            key={copied ? "check" : "copy"}
            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
            transition={springSnappy}
            className="flex"
          >
            {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
          </motion.span>
        </AnimatePresence>
      </span>
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}
