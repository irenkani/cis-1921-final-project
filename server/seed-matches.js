const mongoose = require('mongoose');
require('dotenv').config();

// Use default local MongoDB if MONGO_URI is not set
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/penn-marriage-pact';

const SubmissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  penn_email: { type: String, required: true, unique: true },
  gender: Number,
  preferred_gender: Number,
  schools: String,
  year_at_penn: Number,
  preferred_match_years: String,
  race_ethnicity: String,
  preferred_match_race_ethnicity: String,
  social_events_enjoyment: Number,
  communication_preference: Number,
  planning_style: Number,
  relationship_importance: Number,
  physical_attraction_priority: Number,
  locust_walk_reaction: Number,
  open_to_polygamy: Number,
  love_language: String,
  ideal_love_language: String,
  penn_love_language: Number,
  emotionally_available: Number,
  texting_style: Number,
  spotify_wrapped_link: String,
});

const Submission = mongoose.model('Submission', SubmissionSchema);

// 4 users designed to create 2 perfect matches:
// Match 1: Emma Wilson (F) ↔ Jake Martinez (M)
// Match 2: Sophie Chen (F) ↔ Ryan Thompson (M)
const testUsers = [
  {
    name: "Emma Wilson",
    penn_email: "ewilson@upenn.edu",
    gender: 1,              // Female
    preferred_gender: 0,    // Looking for Male
    schools: "0",           // CAS
    year_at_penn: 2,        // Junior
    preferred_match_years: "2",  // Wants Junior
    race_ethnicity: "6",    // White
    preferred_match_race_ethnicity: "0,1,2,3,4,5,6,7",  // No preference (all races)
    social_events_enjoyment: 8,
    communication_preference: 9,
    planning_style: 7,
    relationship_importance: 9,
    physical_attraction_priority: 7,
    locust_walk_reaction: 0,  // Wave enthusiastically
    open_to_polygamy: 1,      // No
    love_language: "2,3",     // Quality time, Physical touch
    ideal_love_language: "2,3,4",  // Quality time, Physical touch, Words of affirmation
    penn_love_language: 0,    // Walking them back from DRL
    emotionally_available: 0, // Fully available
    texting_style: 1,         // Reply within a few hours
    spotify_wrapped_link: ""
  },
  {
    name: "Jake Martinez",
    penn_email: "jmartinez@upenn.edu",
    gender: 0,              // Male
    preferred_gender: 1,    // Looking for Female
    schools: "0",           // CAS
    year_at_penn: 2,        // Junior
    preferred_match_years: "2",  // Wants Junior
    race_ethnicity: "2",    // Hispanic
    preferred_match_race_ethnicity: "0,1,2,3,4,5,6,7",  // No preference (all races)
    social_events_enjoyment: 8,
    communication_preference: 9,
    planning_style: 7,
    relationship_importance: 9,
    physical_attraction_priority: 7,
    locust_walk_reaction: 0,  // Wave enthusiastically
    open_to_polygamy: 1,      // No
    love_language: "2,3,4",   // Quality time, Physical touch, Words
    ideal_love_language: "2,3",  // Quality time, Physical touch
    penn_love_language: 0,    // Walking them back from DRL
    emotionally_available: 0, // Fully available
    texting_style: 1,         // Reply within a few hours
    spotify_wrapped_link: ""
  },
  {
    name: "Sophie Chen",
    penn_email: "schen@upenn.edu",
    gender: 1,              // Female
    preferred_gender: 0,    // Looking for Male
    schools: "1",           // Wharton
    year_at_penn: 3,        // Senior
    preferred_match_years: "3",  // Wants Senior
    race_ethnicity: "0",    // Asian
    preferred_match_race_ethnicity: "0,1,2,3,4,5,6,7",  // No preference (all races)
    social_events_enjoyment: 6,
    communication_preference: 8,
    planning_style: 9,
    relationship_importance: 10,
    physical_attraction_priority: 8,
    locust_walk_reaction: 1,  // Panic, put AirPods in
    open_to_polygamy: 1,      // No
    love_language: "0,2",     // Acts of service, Quality time
    ideal_love_language: "0,2,4",  // Acts of service, Quality time, Words
    penn_love_language: 2,    // Saving them a seat in lecture
    emotionally_available: 1, // Emotionally available, time unavailable
    texting_style: 2,         // "Sorry just saw this" every 2-3 days
    spotify_wrapped_link: ""
  },
  {
    name: "Ryan Thompson",
    penn_email: "rthompson@upenn.edu",
    gender: 0,              // Male
    preferred_gender: 1,    // Looking for Female
    schools: "1",           // Wharton
    year_at_penn: 3,        // Senior
    preferred_match_years: "3",  // Wants Senior
    race_ethnicity: "6",    // White
    preferred_match_race_ethnicity: "0,1,2,3,4,5,6,7",  // No preference (all races)
    social_events_enjoyment: 6,
    communication_preference: 8,
    planning_style: 9,
    relationship_importance: 10,
    physical_attraction_priority: 8,
    locust_walk_reaction: 3,  // Send a text 3 hours later
    open_to_polygamy: 1,      // No
    love_language: "0,2,4",   // Acts of service, Quality time, Words
    ideal_love_language: "0,2",  // Acts of service, Quality time
    penn_love_language: 2,    // Saving them a seat in lecture
    emotionally_available: 1, // Emotionally available, time unavailable
    texting_style: 1,         // Reply within a few hours
    spotify_wrapped_link: ""
  }
];

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB:', MONGO_URI);
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Submission.deleteMany({});
    console.log('Cleared existing submissions');

    // Insert test users
    const result = await Submission.insertMany(testUsers);
    console.log(`✅ Successfully inserted ${result.length} users!`);
    console.log('\n🎉 Expected Matches:');
    console.log('   Match 1: Emma Wilson ↔ Jake Martinez (Both Junior, CAS, similar values)');
    console.log('   Match 2: Sophie Chen ↔ Ryan Thompson (Both Senior, Wharton, similar values)');

    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

