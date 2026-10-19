import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata(
  "Experience",
  "Clinical Software Engineer II at United Theranostics, plus mobile engineering roles shipping 12+ production apps.",
  "/experience"
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
