import { Metadata } from "next";

const siteConfig = {
  name: "Prithvi Saran Sathyasaran",
  description:
    "Mobile App Developer specializing in Flutter, iOS, and Android. Graduate student at The George Washington University building beautiful, performant cross-platform applications.",
  url: "https://prithvisaran.com",
  ogImage: "/og/og.png",
  links: {
    github: "https://github.com/prithvisaran3",
    linkedin: "https://www.linkedin.com/in/prithvisaransathyasaran/",
    email: "prithvisarans@gwu.edu",
  },
};

export function createMetadata(
  title?: string,
  description?: string,
  path: string = ""
): Metadata {
  const metaTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const metaDescription = description || siteConfig.description;
  const url = `${siteConfig.url}${path}`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: metaTitle,
    description: metaDescription,
    keywords: [
      "Mobile Developer",
      "Flutter Developer",
      "iOS Developer",
      "Android Developer",
      "React Native",
      "SwiftUI",
      "Dart",
      "TypeScript",
      "Full Stack Developer",
      "Prithvi Saran",
    ],
    authors: [{ name: "Prithvi Saran" }],
    creator: "Prithvi Saran",
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      title: metaTitle,
      description: metaDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [siteConfig.ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export { siteConfig };

