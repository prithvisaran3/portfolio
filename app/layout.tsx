import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { createMetadata } from "@/lib/seo";
import { LiquidBackdrop } from "@/components/ios/LiquidBackdrop";
import { IslandNav } from "@/components/ios/IslandNav";
import { MotionProvider } from "@/components/ios/MotionProvider";
import "@/styles/globals.css";

export const metadata: Metadata = createMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:px-4 focus:py-2 glass-chrome"
        >
          Skip to content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          <MotionProvider>
            <LiquidBackdrop />
            <IslandNav />
            <main id="main" className="relative z-10 pt-24">
              {children}
            </main>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

