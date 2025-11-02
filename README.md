# iOS Liquid Glass Portfolio

A premium, iOS-inspired portfolio website with liquid glass (frosted acrylic) visuals and buttery smooth animations.

## Features

- 🎨 **iOS-Inspired Design**: Dynamic Island navigation, glass morphism, and Apple HIG principles
- ⚡ **High Performance**: Built with Next.js 14 App Router for optimal speed
- 🌗 **Dark Mode**: Seamless theme switching with next-themes
- 📱 **Fully Responsive**: Beautiful on all devices
- ♿ **Accessible**: WCAG compliant with keyboard navigation and screen reader support
- 🎭 **Smooth Animations**: Framer Motion with spring physics and parallax effects
- 🔍 **SEO Optimized**: Meta tags, sitemap, and Open Graph support

## Tech Stack

- **Framework**: Next.js 14+ (App Router, TypeScript)
- **Styling**: Tailwind CSS + CSS Variables
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React
- **Theme**: next-themes

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                  # Next.js App Router pages
│   ├── page.tsx         # Home page
│   ├── projects/        # Projects page
│   ├── skills/          # Skills page
│   ├── about/           # About page
│   ├── resume/          # Resume page
│   └── contact/         # Contact page
├── components/
│   ├── ios/             # iOS-inspired components
│   │   ├── LiquidBackdrop.tsx
│   │   ├── GlassCard.tsx
│   │   ├── IslandNav.tsx
│   │   └── ...
│   └── ui/              # shadcn/ui components
├── lib/                 # Utilities and data fetching
├── content/             # JSON data for projects and skills
├── styles/              # Global styles and tokens
└── public/              # Static assets
```

## Customization

### Update Personal Info

1. Edit `lib/resume.ts` with your experience, education, and projects
2. Update `content/featured-projects.json` with your featured projects
3. Update `content/skills.json` with your skills
4. Replace `public/Prithvi_Resume.pdf` with your resume PDF
5. Update social links in `lib/seo.ts` and throughout the app

### Customize Theme

Edit `styles/tokens.css` to adjust glass effects, colors, and shadows.

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy with one click

### Other Platforms

This is a standard Next.js app and can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render

## License

MIT License - feel free to use this template for your own portfolio!

## Credits

Designed and developed by Prithvi Saran

