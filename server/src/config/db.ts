/**
 * Database Configuration Module
 * 
 * Handles MongoDB connection using Mongoose ODM (Object Document Mapper)
 */

import mongoose from "mongoose";

/**
 * Connect to MongoDB database
 * 
 * Uses MONGO_URI from environment variables if available,
 * otherwise falls back to local MongoDB instance.
 * 
 * Connection does not exit process on failure to allow debugging.
 */
const connectDB = async () => {
  try {
    // Get MongoDB connection string from environment or use local default
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/penn-marriage-pact';
    
    console.log("Attempting to connect to MongoDB...");
    
    // Connect to MongoDB using Mongoose
    await mongoose.connect(mongoUri);
    
    console.log("✅ MongoDB connected successfully!");
  } catch (err) {
    // Log error but don't crash the server (useful for debugging)
    console.error("❌ DB connection error:", err);
    console.log("⚠️  Server will continue running but database operations will fail");
    
    // Note: We intentionally don't call process.exit(1) here
    // This allows the server to stay up for debugging purposes
  }
};

export default connectDB;
