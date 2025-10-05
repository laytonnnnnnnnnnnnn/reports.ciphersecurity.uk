#!/bin/bash

# Discord Reporting Website Setup Script

set -e

echo "🚀 Discord Reporting Website Setup"
echo "=================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Copy environment template
if [ ! -f ".env.local" ]; then
    echo "📝 Creating environment file..."
    cp .env.example .env.local
    echo "⚠️  Please configure your environment variables in .env.local"
else
    echo "✅ Environment file already exists"
fi

# Setup database
echo "🗄️  Setting up database..."
npx prisma generate
npx prisma db push

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Configure your Discord OAuth app:"
echo "   - Go to https://discord.com/developers/applications"
echo "   - Create a new application"
echo "   - Add redirect URI: http://localhost:3000/api/auth/callback/discord"
echo ""
echo "2. Update .env.local with your Discord credentials:"
echo "   - DISCORD_CLIENT_ID"
echo "   - DISCORD_CLIENT_SECRET"
echo "   - DISCORD_WEBHOOK_URL"
echo "   - STAFF_USER_IDS (your Discord user ID)"
echo "   - NEXTAUTH_SECRET (generate with: openssl rand -base64 32)"
echo ""
echo "3. Start the development server:"
echo "   npm run dev"
echo ""
echo "4. Visit http://localhost:3000"
echo ""
echo "📖 For more information, see README.md"