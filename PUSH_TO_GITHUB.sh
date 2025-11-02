#!/bin/bash

# 🚀 Push to GitHub Script

echo "📤 Pushing your portfolio to GitHub..."
echo ""

# Check if remote exists
if git remote | grep -q "origin"; then
    echo "✅ Remote 'origin' already configured"
    echo ""
    echo "Pushing to GitHub..."
    git push -u origin main
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Successfully pushed to GitHub!"
        echo ""
        echo "🎉 Next steps:"
        echo "1. Go to https://vercel.com/new"
        echo "2. Import your GitHub repository"
        echo "3. Click Deploy"
        echo "4. Your site will be live in 2 minutes!"
    else
        echo ""
        echo "❌ Push failed. Try these commands manually:"
        echo ""
        echo "  git remote -v    # Check your remote URL"
        echo "  git push -u origin main"
    fi
else
    echo "⚠️  No GitHub remote configured yet"
    echo ""
    read -p "Enter your GitHub username: " username
    
    if [ -z "$username" ]; then
        echo "❌ Username cannot be empty"
        exit 1
    fi
    
    read -p "Enter repository name (default: portfolio): " repo
    repo=${repo:-portfolio}
    
    echo ""
    echo "Setting up GitHub remote..."
    git remote add origin "https://github.com/$username/$repo.git"
    
    echo ""
    echo "📤 Pushing to GitHub..."
    git push -u origin main
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Successfully pushed to GitHub!"
        echo ""
        echo "🎉 Your code is now at: https://github.com/$username/$repo"
        echo ""
        echo "Next steps:"
        echo "1. Go to https://vercel.com/new"
        echo "2. Sign in with GitHub"
        echo "3. Import your '$repo' repository"
        echo "4. Click Deploy"
        echo "5. Your site will be live in 2 minutes!"
        echo ""
        echo "📱 Your mobile-responsive portfolio is ready to go live! 🚀"
    else
        echo ""
        echo "❌ Push failed. This might be because:"
        echo "   - Repository doesn't exist on GitHub yet"
        echo "   - You need to create it first at: https://github.com/new"
        echo "   - Authentication issues"
        echo ""
        echo "Create the repository, then run this script again!"
    fi
fi

