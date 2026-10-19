import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata(
  "Skills",
  "Languages, frameworks, AI/ML, cloud, and healthcare domain skills across full-stack, AI, and mobile work.",
  "/skills"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
