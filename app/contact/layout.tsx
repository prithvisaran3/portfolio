import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata(
  "Contact",
  "Get in touch with Prithvi Saran Sathyasaran by email, GitHub, or LinkedIn.",
  "/contact"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
