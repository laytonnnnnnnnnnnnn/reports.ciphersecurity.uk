import { PrismaClient } from '@prisma/client'
import { MongoClient } from 'mongodb'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// MongoDB TTL Index Setup
async function setupTTLIndex() {
  try {
    const mongoClient = new MongoClient(process.env.DATABASE_URL!)
    await mongoClient.connect()
    
    const db = mongoClient.db()
    const reportsCollection = db.collection('reports')
    
    // Create TTL index that deletes documents after 20 days (1728000 seconds)
    await reportsCollection.createIndex(
      { "createdAt": 1 },
      { expireAfterSeconds: 1728000 } // 20 days * 24 hours * 60 minutes * 60 seconds
    )
    
    console.log('TTL index created successfully - reports will auto-delete after 20 days')
    await mongoClient.close()
  } catch (error) {
    console.error('Error setting up TTL index:', error)
  }
}

// Set up TTL index on application start (only for MongoDB)
if (process.env.NODE_ENV !== 'test' && process.env.DATABASE_URL?.startsWith('mongodb')) {
  setupTTLIndex()
}