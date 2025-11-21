const mongoose = require('mongoose');
require('dotenv').config();

async function clearDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Drop the entire submissions collection
    await mongoose.connection.db.dropCollection('submissions');
    console.log('✅ Successfully cleared submissions collection!');

    await mongoose.connection.close();
    console.log('Database connection closed');
  } catch (error) {
    if (error.message.includes('ns not found')) {
      console.log('Collection already empty or does not exist');
    } else {
      console.error('❌ Error clearing database:', error);
    }
    process.exit(1);
  }
}

clearDatabase();

