#!/usr/bin/env node
/**
 * MongoDB Production Setup Script
 * Run this after setting up your MongoDB Atlas cluster
 * Usage: node scripts/setup-mongodb-production.js
 */

const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function setupMongoDB() {
  const uri = process.env.DATABASE_URL;
  
  if (!uri) {
    console.error('❌ DATABASE_URL not found in environment variables');
    process.exit(1);
  }

  console.log('🚀 Setting up MongoDB Atlas for production...\n');

  const client = new MongoClient(uri);

  try {
    // Connect to MongoDB
    console.log('📡 Connecting to MongoDB Atlas...');
    await client.connect();
    console.log('✅ Connected to MongoDB Atlas successfully!\n');

    const db = client.db();
    
    // Test connection
    await db.admin().ping();
    console.log('🏓 Database ping successful!\n');

    // Create collections with proper indexes
    console.log('📚 Setting up collections and indexes...');

    // Users collection
    const usersCollection = db.collection('users');
    await usersCollection.createIndex({ discordId: 1 }, { unique: true });
    console.log('✅ Users collection indexed');

    // Reports collection
    const reportsCollection = db.collection('reports');
    await reportsCollection.createIndex({ caseNumber: 1 }, { unique: true });
    await reportsCollection.createIndex({ referenceNumber: 1 }, { unique: true });
    await reportsCollection.createIndex({ reporterId: 1 });
    await reportsCollection.createIndex({ status: 1 });
    await reportsCollection.createIndex({ createdAt: 1 });
    
    // TTL index - automatically delete reports after 20 days
    try {
      await reportsCollection.createIndex(
        { createdAt: 1 },
        { expireAfterSeconds: 1728000 } // 20 days
      );
      console.log('✅ Reports collection indexed with TTL');
    } catch (error) {
      if (error.code === 85) { // IndexOptionsConflict
        console.log('✅ TTL index already exists (skipped)');
      } else {
        throw error;
      }
    }

    // Report updates collection
    const updatesCollection = db.collection('report_updates');
    await updatesCollection.createIndex({ reportId: 1 });
    await updatesCollection.createIndex({ staffId: 1 });
    await updatesCollection.createIndex({ createdAt: 1 });
    console.log('✅ Report updates collection indexed');

    console.log('\n🎉 MongoDB Atlas setup completed successfully!');
    console.log('\n📊 Database Information:');
    console.log(`   Database Name: ${db.databaseName}`);
    console.log(`   Collections: users, reports, report_updates`);
    console.log(`   Auto-deletion: Reports expire after 20 days`);
    
    // Test Prisma connection
    console.log('\n🔧 Testing Prisma connection...');
    try {
      const { PrismaClient } = require('@prisma/client');
      const prisma = new PrismaClient();
      
      // Test prisma connection
      await prisma.$connect();
      console.log('✅ Prisma connection successful!');
      await prisma.$disconnect();
    } catch (error) {
      console.log('⚠️  Prisma connection test failed:', error.message);
      console.log('   Run: npx prisma generate');
    }

  } catch (error) {
    console.error('❌ Setup failed:', error);
    
    if (error.message.includes('ENOTFOUND')) {
      console.log('\n💡 Connection troubleshooting:');
      console.log('   1. Check your internet connection');
      console.log('   2. Verify the DATABASE_URL in .env.local');
      console.log('   3. Ensure your IP is whitelisted in MongoDB Atlas');
      console.log('   4. Check database user credentials');
    }
    
    process.exit(1);
  } finally {
    await client.close();
  }
}

if (require.main === module) {
  setupMongoDB();
}

module.exports = { setupMongoDB };