@echo off
REM Discord Reporting Website Setup Script for Windows

echo 🚀 Discord Reporting Website Setup
echo ==================================

REM Check if Node.js is installed
node -v >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ and try again.
    pause
    exit /b 1
)

echo ✅ Node.js detected: 
node -v

REM Install dependencies
echo 📦 Installing dependencies...
call npm install
if errorlevel 1 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

REM Copy environment template
if not exist ".env.local" (
    echo 📝 Creating environment file...
    copy .env.example .env.local
    echo ⚠️  Please configure your environment variables in .env.local
) else (
    echo ✅ Environment file already exists
)

REM Setup database
echo 🗄️  Setting up database...
call npx prisma generate
call npx prisma db push

echo.
echo ✅ Setup complete!
echo.
echo Next steps:
echo 1. Configure your Discord OAuth app:
echo    - Go to https://discord.com/developers/applications
echo    - Create a new application
echo    - Add redirect URI: http://localhost:3000/api/auth/callback/discord
echo.
echo 2. Update .env.local with your Discord credentials:
echo    - DISCORD_CLIENT_ID
echo    - DISCORD_CLIENT_SECRET
echo    - DISCORD_WEBHOOK_URL
echo    - STAFF_USER_IDS (your Discord user ID)
echo    - NEXTAUTH_SECRET (generate with: openssl rand -base64 32)
echo.
echo 3. Start the development server:
echo    npm run dev
echo.
echo 4. Visit http://localhost:3000
echo.
echo 📖 For more information, see README.md
pause