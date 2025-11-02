import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export function normalizeDate(dateStr: string): string {
  if (dateStr.toLowerCase().includes("present")) return "Present";
  
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

