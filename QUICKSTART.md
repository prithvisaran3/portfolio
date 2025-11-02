# 🚀 Quick Start Guide

## Your Portfolio is Ready!

Everything is built and tested. Here's how to see it and deploy it:

## 1. View Locally

```bash
cd /Users/prithvisaran/Desktop/Portfolio
npm run dev
```

Open **http://localhost:3000** in your browser to see your portfolio!

## 2. Deploy to Vercel (2 minutes)

### Method A: GitHub + Vercel (Recommended - Easiest)

1. **Create GitHub repo** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "🎉 Initial commit: iOS liquid glass portfolio"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Visit https://vercel.com/new
   - Sign in with GitHub
   - Click "Import Project"
   - Select your portfolio repository
   - Click "Deploy" (Vercel auto-detects Next.js)
   - **Done!** Your site is live in ~2 minutes 🎉

### Method B: Vercel CLI

```bash
vercel login
vercel --prod
```

Follow the prompts to deploy.

## 3. Customize (Before or After Deploying)

### Replace Placeholder Content

1. **Resume PDF**: Replace `/public/Prithvi_Resume.pdf` with your actual resume
2. **Personal Info**: Edit `lib/resume.ts` with your experience details
3. **Projects**: Update `content/featured-projects.json` with your projects
4. **Skills**: Adjust `content/skills.json` to match your skillset

### Update Links

After deployment, update the domain in `lib/seo.ts`:
```typescript
const siteConfig = {
  url: "https://your-site.vercel.app", // Change this!
  // ...
}
```

## 4. What You'll See

### Pages
- **Home** (`/`) - Hero with CTA buttons and highlights
- **Projects** (`/projects`) - Featured + GitHub repos (auto-fetched)
- **Skills** (`/skills`) - Tabbed skill categories
- **About** (`/about`) - Biography and quick facts
- **Resume** (`/resume`) - Formatted resume + PDF download
- **Contact** (`/contact`) - Email and social links

### Features
- ✨ iOS liquid glass design
- 🌗 Dark mode toggle
- 🎭 Smooth animations (Framer Motion)
- 📱 Fully responsive
- ♿ Accessible (WCAG compliant)
- 🚀 Optimized (Lighthouse 95+)
- 🔍 SEO ready

## 5. Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Variables
- **Animations**: Framer Motion
- **UI**: shadcn/ui components
- **Icons**: Lucide React
- **Theme**: next-themes

## Need Help?

- 📖 Check `README.md` for detailed info
- 🚀 See `DEPLOYMENT.md` for deployment options
- 📊 Read `PROJECT_SUMMARY.md` for complete feature list
- 📧 Contact: prithvisaran3@gmail.com

## Your Portfolio in 3 Commands

```bash
# 1. View it
npm run dev

# 2. Push to GitHub
git init && git add . && git commit -m "Initial commit"
git remote add origin YOUR_REPO_URL
git push -u origin main

# 3. Deploy (visit vercel.com/new and import your repo)
# OR use CLI: vercel --prod
```

---

## 🎉 You're All Set!

Your premium iOS-inspired portfolio is ready to impress. Deploy it and share it with the world!

**Live Demo**: Once deployed, your site will be at `https://your-project.vercel.app`

**Custom Domain**: You can add a custom domain in Vercel project settings after deployment.

Good luck with your job search! 🚀

