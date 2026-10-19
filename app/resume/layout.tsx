import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata(
  "Resume",
  "Education, experience, projects, and certifications of Prithvi Saran Sathyasaran.",
  "/resume"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
