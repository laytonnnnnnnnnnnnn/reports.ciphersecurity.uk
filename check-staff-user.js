#!/usr/bin/env node
/**
 * Check Staff User Script
 * This script checks if a Discord user is marked as staff in the database
 */

const { PrismaClient } = require('@prisma/client');
require('dotenv').config({ path: '.env.local' });

const prisma = new PrismaClient();

async function checkStaffUser() {
  try {
    const discordId = '1164156075549917245'; // Your Discord ID
    
    console.log('🔍 Checking staff status for Discord ID:', discordId);
    
    // Find user in database
    const user = await prisma.user.findUnique({
      where: { discordId: discordId }
    });
    
    if (user) {
      console.log('✅ User found in database:');
      console.log('   ID:', user.id);
      console.log('   Discord ID:', user.discordId);
      console.log('   Username:', user.username);
      console.log('   Is Staff:', user.isStaff);
      
      if (!user.isStaff) {
        console.log('\n⚠️  User is NOT marked as staff. Updating...');
        
        // Update user to be staff
        const updatedUser = await prisma.user.update({
          where: { discordId: discordId },
          data: { isStaff: true }
        });
        
        console.log('✅ User updated! Is Staff:', updatedUser.isStaff);
      } else {
        console.log('✅ User is already marked as staff!');
      }
    } else {
      console.log('❌ User not found in database.');
      console.log('   This means you haven\'t logged in yet.');
      console.log('   Try logging in first, then run this script again.');
    }
    
    // Also check environment variable
    const staffIds = process.env.STAFF_USER_IDS?.split(',') || [];
    console.log('\n📋 Staff IDs from environment:', staffIds);
    
    if (staffIds.includes(discordId)) {
      console.log('✅ Your Discord ID is in STAFF_USER_IDS');
    } else {
      console.log('❌ Your Discord ID is NOT in STAFF_USER_IDS');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkStaffUser();