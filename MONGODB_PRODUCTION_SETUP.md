# MongoDB Atlas Production Setup Guide

## Prerequisites

- MongoDB Atlas account
- Node.js installed
- Project repository cloned

## Step-by-Step Setup

### 1. Create MongoDB Atlas Cluster

1. **Go to MongoDB Atlas**: [https://cloud.mongodb.com](https://cloud.mongodb.com)
2. **Create a new project**: "Discord Reporting System"
3. **Build a cluster**:
   - **Deployment Type**: Serverless or Dedicated
   - **Cloud Provider**: AWS/Google Cloud/Azure
   - **Region**: Choose closest to your users
   - **Cluster Tier**: 
     - Development: M0 (Free)
     - Production: M2 or higher
   - **Cluster Name**: `reporting-cluster`

### 2. Configure Database Security

#### Database Access:
1. Go to **Security** → **Database Access**
2. **Add New Database User**:
   - Authentication Method: Password
   - Username: `reportinguser`
   - Password: Generate secure password (save it!)
   - Database User Privileges: **Atlas Admin** or **Read and write to any database**

#### Network Access:
1. Go to **Security** → **Network Access**
2. **Add IP Address**:
   - Development: `0.0.0.0/0` (anywhere - temporary only!)
   - Production: Your server's specific IP addresses

### 3. Get Connection String

1. Go to **Database** → **Connect**
2. Choose **Connect your application**
3. Select **Node.js** driver
4. Copy the connection string
5. It will look like: `mongodb+srv://reportinguser:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

### 4. Configure Environment Variables

1. Update `.env.local` with your actual values:

```bash
DATABASE_URL="mongodb+srv://reportinguser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/discord_reporting_prod?retryWrites=true&w=majority&appName=ReportingSystem"
```

### 5. Run Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run our MongoDB setup script
node scripts/setup-mongodb-production.js
```

### 6. Test Connection

```bash
# Start your application
npm run dev

# Try submitting a report to test database connectivity
```

## Production Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user configured with strong password
- [ ] Network access restricted to production IPs only
- [ ] Connection string updated in environment variables
- [ ] Database indexes created
- [ ] TTL (Time To Live) indexes set for automatic cleanup
- [ ] Prisma client generated
- [ ] Application tested with database

## Security Best Practices

1. **Strong Passwords**: Use complex passwords for database users
2. **IP Restrictions**: Only whitelist necessary IP addresses
3. **Environment Variables**: Never commit credentials to version control
4. **Regular Backups**: Set up automated backups in MongoDB Atlas
5. **Monitoring**: Enable MongoDB Atlas monitoring and alerts

## Troubleshooting

### Connection Issues:
- Check internet connectivity
- Verify DATABASE_URL format
- Ensure IP is whitelisted
- Check database user credentials

### Prisma Issues:
- Run `npx prisma generate`
- Check schema syntax
- Verify MongoDB connection string format

### Performance Issues:
- Monitor database metrics in Atlas
- Check index usage
- Consider upgrading cluster tier

## Production Environment Setup

For production deployment, use:

```bash
# Copy production template
cp .env.production .env.local

# Fill in actual production values
# Deploy to your hosting platform (Vercel, Railway, etc.)
```

## Database Maintenance

- Reports automatically delete after 20 days (TTL index)
- Monitor storage usage in Atlas dashboard
- Regular backups are handled by Atlas
- Consider data archival for compliance