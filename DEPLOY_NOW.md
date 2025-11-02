# 🚀 Deploy Your Portfolio NOW

Your portfolio is ready! Choose your preferred deployment method:

---

## ✅ Option 1: Vercel (Recommended - Easiest for Next.js)

### Method A: Via GitHub (No Command Line Needed)

**Step 1: Push to GitHub**
1. Go to https://github.com/new
2. Create a new repository named `portfolio`
3. **Don't** initialize with README

**Step 2: Push your code**
```bash
cd /Users/prithvisaran/Desktop/Portfolio
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

**Step 3: Deploy on Vercel**
1. Go to https://vercel.com/new
2. Click "Import Project"
3. Select your GitHub repository
4. Click "Deploy"
5. ✅ **DONE!** Your site will be live in 2 minutes!

### Method B: Via Vercel CLI (Fastest)

```bash
cd /Users/prithvisaran/Desktop/Portfolio

# Login to Vercel (opens browser)
vercel login

# Deploy
vercel --prod

# Follow the prompts, it will give you a live URL!
```

---

## ✅ Option 2: GitHub Pages (Free Forever)

GitHub Pages works great for static sites. We need to add a few configurations:

**Step 1: Update Next.js config**

Create/update `next.config.js`:
```javascript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/portfolio' : '',
}
module.exports = nextConfig
```

**Step 2: Add GitHub Actions workflow**

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

**Step 3: Push to GitHub and enable Pages**

```bash
cd /Users/prithvisaran/Desktop/Portfolio
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

Then:
1. Go to your repo Settings → Pages
2. Source: Deploy from branch → `gh-pages`
3. Save

**Your site will be at**: `https://YOUR_USERNAME.github.io/portfolio/`

---

## ✅ Option 3: Netlify (Also Easy)

**Via GitHub:**
1. Push code to GitHub (see above)
2. Go to https://app.netlify.com/start
3. Connect GitHub
4. Select your repository
5. Build command: `npm run build`
6. Publish directory: `.next`
7. Click "Deploy"

**Via Netlify CLI:**
```bash
npm install -g netlify-cli
cd /Users/prithvisaran/Desktop/Portfolio
netlify deploy --prod
```

---

## 🎯 FASTEST Way (Vercel via GitHub - 5 Minutes)

**I recommend this approach:**

### Step 1: Create GitHub Repository (1 min)
Visit: https://github.com/new
- Name: `portfolio`
- Click "Create repository"

### Step 2: Push Your Code (1 min)
```bash
cd /Users/prithvisaran/Desktop/Portfolio
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy on Vercel (3 min)
1. Visit: https://vercel.com/new
2. Sign in with GitHub
3. Click "Import Project"
4. Select your `portfolio` repository
5. Vercel auto-detects Next.js settings
6. Click "Deploy"
7. ✅ **LIVE IN 2 MINUTES!**

You'll get a URL like: `https://portfolio-xxxxx.vercel.app`

---

## 📝 What's Already Done

✅ Git initialized
✅ All files committed
✅ .gitignore configured
✅ Build tested (successful)
✅ All dependencies installed

**You just need to:**
1. Create a GitHub repo
2. Push the code
3. Deploy on Vercel

---

## 🆘 Need Help?

### If you want me to guide you step-by-step:

**Tell me:**
- Your GitHub username
- Which deployment method you prefer (Vercel, GitHub Pages, or Netlify)

I can provide exact commands for your situation!

---

## 💡 Recommended: Vercel

**Why Vercel?**
- ✅ Built by Next.js creators
- ✅ Zero configuration needed
- ✅ Free SSL certificate
- ✅ Automatic deployments on push
- ✅ Free custom domain support
- ✅ Best performance for Next.js
- ✅ Free forever for personal projects

---

## 🎉 After Deployment

Once deployed:

1. **Update SEO** - Change URL in `lib/seo.ts`:
```typescript
url: "https://your-actual-site.vercel.app"
```

2. **Custom Domain** (Optional):
   - Buy domain (Namecheap, GoDaddy, etc.)
   - Add to Vercel/Netlify settings
   - Update DNS records

3. **Share Your Portfolio:**
   - Add to LinkedIn profile
   - Add to resume
   - Share on Twitter
   - Send to recruiters!

---

**Ready to deploy?** Let me know which method you prefer and I can provide exact commands!

