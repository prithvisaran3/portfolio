# Deployment Guide

## Quick Deploy to Vercel

### Option 1: Deploy via GitHub (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: iOS liquid glass portfolio"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"
   - Your site will be live in ~2 minutes!

### Option 2: Deploy via Vercel CLI

1. **Login to Vercel**
   ```bash
   vercel login
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

3. **Follow the prompts** to link your project

## Environment Setup

No environment variables are required for basic functionality. The GitHub API works without authentication but has rate limits. To increase limits:

1. Create a GitHub Personal Access Token at https://github.com/settings/tokens
2. Add to Vercel environment variables:
   ```
   GITHUB_TOKEN=your_token_here
   ```
3. Update `lib/github.ts` to use the token in the fetch headers

## Custom Domain

After deployment, you can add a custom domain in Vercel:
1. Go to your project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Update `siteConfig.url` in `lib/seo.ts`

## Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Verify GitHub API integration works
- [ ] Test dark mode toggle
- [ ] Check mobile responsiveness
- [ ] Test navigation across all pages
- [ ] Verify PDF download works
- [ ] Run Lighthouse audit (aim for 95+ scores)
- [ ] Test with screen reader for accessibility
- [ ] Check Open Graph preview on social media

## Performance Optimization

The site is already optimized, but for best results:
- Replace placeholder PDF with actual resume
- Add real project images in `/public/projects/`
- Consider adding your own OG image in `/app/opengraph-image.tsx`
- Monitor Core Web Vitals in Vercel Analytics

## Troubleshooting

**Build fails**: Run `npm run build` locally to see errors
**GitHub API rate limited**: Add GITHUB_TOKEN environment variable
**Styles not loading**: Clear `.next` cache and rebuild
**Images not loading**: Check image paths and `next.config.js` configuration

## Analytics (Optional)

To add Vercel Analytics:
```bash
npm install @vercel/analytics
```

Then add to `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

// In your layout return:
<Analytics />
```

## Support

For issues or questions about this portfolio:
- Check the README.md
- Review Next.js documentation
- Contact: prithvisaran3@gmail.com

