# Quick MongoDB Atlas Setup

## Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/atlas
2. Click "Try Free"
3. Sign up with your email
4. Choose "Shared" (Free tier)

## Step 2: Create Cluster
1. Choose AWS as cloud provider
2. Select a region close to you
3. Keep cluster tier as M0 (Free)
4. Give your cluster a name (e.g., "ReportingCluster")
5. Click "Create Cluster"

## Step 3: Create Database User
1. In Atlas dashboard, go to "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `reportinguser`
5. Password: `Reporting123!` (or create your own)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

## Step 4: Configure Network Access
1. Go to "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

## Step 5: Get Connection String
1. Go to "Clusters"
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password
6. Replace `<dbname>` with `discord_reporting`

## Step 6: Update .env.local
Replace the DATABASE_URL in your .env.local file with your connection string:
```
DATABASE_URL="mongodb+srv://reportinguser:Reporting123!@yourcluster.xxxxx.mongodb.net/discord_reporting?retryWrites=true&w=majority"
```

## Step 7: Test Connection
```bash
npm run db:setup
npm run dev
```

The entire process takes about 5-10 minutes and gives you a free 512MB database that auto-deletes reports after 20 days.