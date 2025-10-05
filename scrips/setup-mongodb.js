#!/usr/bin/env node

/**
 * MongoDB Database Setup Script
 * 
 * This script:
 * 1. Connects to MongoDB
 * 2. Creates the necessary collections
 * 3. Sets up TTL indexes for automatic report deletion after 20 days
 * 4. Creates any necessary indexes for performance
 */

const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function setupDatabase() {
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes('REPLACE_WITH_YOUR')) {
    console.error('❌ DATABASE_URL is not configured!');
    console.error('📖 Please read MONGODB_SETUP.md for setup instructions');
    console.error('🔗 You need to set up a MongoDB database and update your .env.local file');
    process.exit(1);
  }

  const client = new MongoClient(process.env.DATABASE_URL);
  
  try {
    console.log('Connecting to MongoDB...');
    console.log('📡 Connection string:', process.env.DATABASE_URL.replace(/\/\/.*@/, '//<credentials>@'));
    await client.connect();
    console.log('✅ Connected successfully to MongoDB');
    
    const db = client.db();
    
    // Create collections
    console.log('Creating collections...');
    
    // Users collection
    const usersCollection = db.collection('users');
    await usersCollection.createIndex({ discordId: 1 }, { unique: true });
    console.log('✓ Users collection and indexes created');
    
    // Reports collection with TTL
    const reportsCollection = db.collection('reports');
    
    // Create TTL index - documents will be automatically deleted after 20 days
    await reportsCollection.createIndex(
      { createdAt: 1 },
      { 
        expireAfterSeconds: 1728000, // 20 days in seconds
        name: 'report_ttl_index'
      }
    );
    
    // Create other useful indexes
    await reportsCollection.createIndex({ caseNumber: 1 }, { unique: true });
    await reportsCollection.createIndex({ referenceNumber: 1 }, { unique: true });
    await reportsCollection.createIndex({ status: 1 });
    await reportsCollection.createIndex({ urgencyLevel: 1 });
    await reportsCollection.createIndex({ reportType: 1 });
    await reportsCollection.createIndex({ reporterId: 1 });
    
    console.log('✓ Reports collection and indexes created');
    console.log('✓ TTL index set - reports will auto-delete after 20 days');
    
    // Report Updates collection
    const updatesCollection = db.collection('report_updates');
    await updatesCollection.createIndex({ reportId: 1 });
    await updatesCollection.createIndex({ staffId: 1 });
    await updatesCollection.createIndex({ createdAt: -1 });
    
    console.log('✓ Report updates collection and indexes created');
    
    console.log('\n🎉 Database setup completed successfully!');
    console.log('📝 Reports will automatically delete after 20 days from creation');
    console.log('🔗 You can now start your application');
    
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

setupDatabase();