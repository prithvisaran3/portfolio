#!/bin/bash

# 🚀 Quick Deploy Script for Your Portfolio
# This script will guide you through deployment

echo "🎉 Portfolio Quick Deploy Script"
echo "================================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "✅ Initializing git..."
    git init
    git add .
    git commit -m "Initial commit: Complete portfolio"
else
    echo "✅ Git already initialized"
fi

echo ""
echo "Choose your deployment method:"
echo "1. Vercel (Recommended - Best for Next.js)"
echo "2. GitHub Pages"
echo "3. Netlify"
echo "4. Just push to GitHub (deploy later)"
echo ""
read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo ""
        echo "🚀 Deploying to Vercel..."
        echo ""
        echo "First, let's login to Vercel (this will open your browser):"
        vercel login
        echo ""
        echo "Now deploying to production..."
        vercel --prod
        echo ""
        echo "✅ Done! Your site is live!"
        echo "Check the URL above ⬆️"
        ;;
    2)
        echo ""
        echo "📘 GitHub Pages Deployment"
        echo ""
        read -p "Enter your GitHub username: " username
        read -p "Enter repository name (e.g., portfolio): " repo
        
        echo ""
        echo "Pushing to GitHub..."
        git remote add origin "https://github.com/$username/$repo.git"
        git branch -M main
        git push -u origin main
        
        echo ""
        echo "✅ Pushed to GitHub!"
        echo ""
        echo "Next steps:"
        echo "1. Go to: https://github.com/$username/$repo/settings/pages"
        echo "2. Enable GitHub Pages"
        echo "3. Your site will be at: https://$username.github.io/$repo/"
        ;;
    3)
        echo ""
        echo "🔷 Netlify Deployment"
        echo ""
        echo "Installing Netlify CLI..."
        npm install -g netlify-cli
        echo ""
        echo "Deploying to Netlify..."
        netlify deploy --prod
        echo ""
        echo "✅ Done! Check the URL above ⬆️"
        ;;
    4)
        echo ""
        echo "📘 Pushing to GitHub"
        echo ""
        read -p "Enter your GitHub username: " username
        read -p "Enter repository name (e.g., portfolio): " repo
        
        echo ""
        echo "Pushing to GitHub..."
        git remote add origin "https://github.com/$username/$repo.git"
        git branch -M main
        git push -u origin main
        
        echo ""
        echo "✅ Pushed to GitHub!"
        echo ""
        echo "To deploy later:"
        echo "- Vercel: https://vercel.com/new"
        echo "- Netlify: https://app.netlify.com/start"
        echo "- GitHub Pages: Enable in repo settings"
        ;;
    *)
        echo "Invalid choice. Please run the script again."
        ;;
esac

echo ""
echo "🎉 Deployment process complete!"
echo ""
echo "Next steps:"
echo "1. Update the site URL in lib/seo.ts"
echo "2. Share your portfolio on LinkedIn"
echo "3. Add to your resume"
echo "4. Apply to jobs!"
echo ""
echo "Good luck! 🚀"

