import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata(
  "About",
  "Software engineer building AI-assisted revenue cycle and clinical software, with a background in mobile apps.",
  "/about"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
