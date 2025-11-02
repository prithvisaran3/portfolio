# 🚀 Deploy Your Portfolio in 5 Minutes

## The EASIEST Way (No Complex Setup)

### Step 1: Create GitHub Repository (1 minute)

1. Go to: **https://github.com/new**
2. Repository name: `portfolio`
3. Keep it Public
4. **Don't** check any boxes (no README, no .gitignore)
5. Click "Create repository"

### Step 2: Push Your Code (1 minute)

**Copy your GitHub username and run these commands:**

```bash
cd /Users/prithvisaran/Desktop/Portfolio

# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git branch -M main
git push -u origin main
```

**Example:** If your username is `prithvisaran3`:
```bash
git remote add origin https://github.com/prithvisaran3/portfolio.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy on Vercel (3 minutes)

1. Go to: **https://vercel.com/new**
2. Click "Continue with GitHub"
3. Authorize Vercel
4. Click "Import" next to your `portfolio` repository
5. Vercel will auto-detect Next.js settings
6. Click "Deploy"
7. ✅ **DONE!**

**Your site will be live at:** `https://portfolio-xxxxx.vercel.app`

---

## 🎉 That's It!

You'll get:
- ✅ Live website
- ✅ Free SSL certificate
- ✅ Automatic deployments (every git push updates your site)
- ✅ Free custom domain support

---

## After Deployment

1. **Copy your live URL** (e.g., `https://portfolio-abc123.vercel.app`)

2. **Update the site URL** in your code:
   - Open: `lib/seo.ts`
   - Change line: `url: "https://prithvisaran.com"`
   - To: `url: "https://your-actual-vercel-url.vercel.app"`
   - Push the change:
   ```bash
   git add .
   git commit -m "Update site URL"
   git push
   ```

3. **Share your portfolio!**
   - Add to LinkedIn profile
   - Add to resume
   - Send to recruiters

---

## Need Help?

**If you get stuck, tell me:**
1. Your GitHub username
2. What step you're on

I'll give you the exact commands!

---

## Alternative: Use My Script

Or simply run:
```bash
cd /Users/prithvisaran/Desktop/Portfolio
./QUICK_DEPLOY.sh
```

And follow the prompts!

