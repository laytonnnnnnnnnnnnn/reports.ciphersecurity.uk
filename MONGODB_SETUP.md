# MongoDB Setup Guide

## Option 1: MongoDB Atlas (Cloud - Recommended)

1. **Create a MongoDB Atlas Account**:
   - Go to https://www.mongodb.com/atlas
   - Sign up for a free account
   - Create a new cluster (free tier is sufficient)

2. **Configure Database Access**:
   - Go to "Database Access" in the Atlas dashboard
   - Add a new database user
   - Set a username and password (remember these!)
   - Grant "Read and write to any database" permissions

3. **Configure Network Access**:
   - Go to "Network Access" in the Atlas dashboard
   - Add IP address: 0.0.0.0/0 (allows access from anywhere)
   - Or add your specific IP address for better security

4. **Get Connection String**:
   - Go to "Clusters" in the Atlas dashboard
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<database>` with `discord_reporting`

5. **Update .env.local**:
   ```
   DATABASE_URL="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/discord_reporting?retryWrites=true&w=majority"
   ```

## Option 2: Local MongoDB Installation

1. **Install MongoDB Community Edition**:
   - Download from: https://www.mongodb.com/try/download/community
   - Follow installation instructions for Windows
   - Start MongoDB service

2. **Update .env.local**:
   ```
   DATABASE_URL="mongodb://localhost:27017/discord_reporting"
   ```

## After Setup

1. Run the database setup script:
   ```bash
   npm run db:setup
   ```

2. Start your application:
   ```bash
   npm run dev
   ```

## TTL (Time To Live) Feature

The database is configured with a TTL index that automatically deletes reports after 20 days from their creation date. This happens automatically in the background without any action needed from your application.

## Important Notes

- Reports are permanently deleted after 20 days
- The TTL cleanup runs approximately every 60 seconds in MongoDB
- You can adjust the TTL duration by modifying the `expireAfterSeconds` value in the setup script (currently set to 1728000 seconds = 20 days)