import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { createMetadata } from "@/lib/seo";
import { LiquidBackdrop } from "@/components/ios/LiquidBackdrop";
import { IslandNav } from "@/components/ios/IslandNav";
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
        <ThemeProvider 
          attribute="class" 
          defaultTheme="light" 
          enableSystem
          disableTransitionOnChange={false}
        >
          <LiquidBackdrop />
          <IslandNav />
          <main className="relative z-10">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}

