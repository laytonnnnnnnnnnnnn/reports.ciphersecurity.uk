# VPS Deployment Checklist for reports.ciphersecurity.uk

## ✅ Good News: Your App is Already Production-Ready!
Your application is well-architected and uses environment variables properly. Most configuration changes are handled automatically through environment variables.

## 🔧 Required Manual Changes

### 1. Discord OAuth Application Settings
**⚠️ CRITICAL: Must be done BEFORE deployment**

Go to [Discord Developer Portal](https://discord.com/developers/applications) and update your Discord application:

1. **Navigate to:** Your Discord Application → OAuth2 → General
2. **Update Redirect URIs:**
   - Remove: `http://localhost:3000/api/auth/callback/discord`
   - Add: `https://reports.ciphersecurity.uk/api/auth/callback/discord`
3. **Save Changes**

### 2. Environment Variables Setup
**Create `.env.local` file on your VPS with:**

```bash
# Discord OAuth Configuration (from Discord Developer Portal)
DISCORD_CLIENT_ID=1362054417351704596
DISCORD_CLIENT_SECRET=PCmz3mK4LfuuCvGT3SL1vmGXmYjvST1n

# NextAuth Configuration
NEXTAUTH_URL=https://reports.ciphersecurity.uk
NEXTAUTH_SECRET=GENERATE_A_STRONG_32_CHAR_SECRET_HERE

# Discord Webhook URLs (your existing webhooks will work)
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/1422349789533831280/sLqiL8Jqs-VRXwpe52jJNGVkw0yTJgwX3seNx8xIe27KrtWMlGp6se8EsQKcaG2YFxuL

# Database (you can keep SQLite for now, or switch to MongoDB/PostgreSQL)
DATABASE_URL="file:./dev.db"

# Staff Authentication (your Discord user ID)
STAFF_USER_IDS=1164156075549917245

# Application Settings
APP_NAME="Cipher Systems"
ADMIN_EMAIL=bailey@ciphersecurity.uk
NODE_ENV=production
```

### 3. Generate NextAuth Secret
Run this command on your VPS to generate a secure secret:
```bash
openssl rand -base64 32
```
Replace `GENERATE_A_STRONG_32_CHAR_SECRET_HERE` with the generated value.

## 🚀 Deployment Steps

### 1. Upload Your Code
```bash
# Upload your entire project folder to VPS
# Exclude: node_modules/, .next/, .env.local
```

### 2. Install Dependencies & Build
```bash
cd /path/to/your/project
npm install
npm run build
```

### 3. Start Production Server
```bash
# Option A: Direct start
npm start

# Option B: PM2 (recommended for production)
npm install -g pm2
pm2 start npm --name "cipher-reports" -- start
pm2 startup
pm2 save
```

### 4. Configure Reverse Proxy (Nginx)
```nginx
server {
    listen 80;
    server_name reports.ciphersecurity.uk;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 5. SSL Certificate (Let's Encrypt)
```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d reports.ciphersecurity.uk
```

## ✅ What's Already Working

### Environment-Based Configuration ✅
- All URLs use environment variables
- No hardcoded localhost references
- NextAuth automatically uses NEXTAUTH_URL
- Discord webhooks use environment variables

### API Endpoints ✅
- All API routes are relative (no absolute URLs)
- CORS is handled automatically by Next.js
- Authentication works with any domain

### Database ✅
- Uses environment-based DATABASE_URL
- Current SQLite file will work on VPS
- Can upgrade to MongoDB/PostgreSQL later if needed

### Discord Integration ✅
- Webhook URLs are environment-based
- OAuth configuration updates automatically with NEXTAUTH_URL
- No code changes needed

## 🔍 Post-Deployment Testing Checklist

1. **Basic Functionality:**
   - [ ] Site loads at https://reports.ciphersecurity.uk
   - [ ] Home page displays correctly
   - [ ] About page and legal warning popup work
   - [ ] Reporting guide page loads

2. **Authentication:**
   - [ ] Discord login button works
   - [ ] Redirects to Discord OAuth
   - [ ] Returns to site after authentication
   - [ ] User session persists

3. **Report Submission:**
   - [ ] Anonymous reports submit successfully
   - [ ] Authenticated reports submit successfully
   - [ ] Discord webhook messages appear in your server
   - [ ] Urgency levels display correctly

4. **Interactive Elements:**
   - [ ] Privacy Policy popup works
   - [ ] Terms of Service popup works
   - [ ] All navigation links work

## 🆘 Troubleshooting

### If Discord Login Doesn't Work:
1. Double-check Discord OAuth redirect URI
2. Verify NEXTAUTH_URL in .env.local
3. Check NEXTAUTH_SECRET is set

### If Webhooks Don't Send:
1. Verify DISCORD_WEBHOOK_URL in .env.local
2. Test webhook URL with a curl command
3. Check Discord webhook permissions

### If Site Won't Load:
1. Check nginx configuration
2. Verify SSL certificate
3. Ensure port 3000 is running
4. Check PM2 process status: `pm2 status`

## 📝 Optional Enhancements

### Database Upgrade
If you want better performance, consider upgrading to MongoDB or PostgreSQL:
- Your code already supports it via DATABASE_URL
- No code changes needed, just update the connection string

### Monitoring
Consider adding:
- PM2 monitoring dashboard
- Error logging (Sentry)
- Uptime monitoring

---

## Summary
Your application is **production-ready**! The only manual changes needed are:
1. Update Discord OAuth redirect URI
2. Create .env.local file on VPS
3. Generate NextAuth secret

Everything else will work automatically with your domain! 🎉