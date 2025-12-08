/**
 * Submission Model
 * 
 * Defines the MongoDB schema for Penn Marriage Pact survey submissions.
 * Each submission represents one user's completed questionnaire.
 */

import mongoose, { Schema, Document } from "mongoose";

/**
 * TypeScript interface for type safety
 * Defines the structure of a submission document
 */
export interface ISubmission extends Document {
  // Basic Information
  name: string;                              // User's full name
  penn_email: string;                        // Penn email (must be unique - one submission per email)
  
  // Gender & Matching Preferences
  gender: number;                            // User's gender identity (0: Male, 1: Female, 2: Other, 3: Prefer not to say)
  preferred_gender: number;                  // Preferred match gender
  
  // Academic Information
  schools: string;                           // School(s) enrolled in (comma-separated if multiple)
  year_at_penn: number;                      // Academic year (0: Freshman, 1: Sophomore, 2: Junior, 3: Senior)
  preferred_match_years: string;             // Preferred match year(s) (comma-separated)
  
  // Demographics
  race_ethnicity: string;                    // User's race/ethnicity (comma-separated if multiple)
  preferred_match_race_ethnicity: string;    // Preferred match race/ethnicity (comma-separated)
  
  // Personality & Compatibility Questions (all on numeric scales)
  social_events_enjoyment: number;           // How much they enjoy social events
  communication_preference: number;          // Communication style preference
  planning_style: number;                    // Spontaneous vs. planned
  relationship_importance: number;           // How important relationships are
  physical_attraction_priority: number;      // Importance of physical attraction
  
  // Penn-Specific Questions
  locust_walk_reaction: number;              // Response to seeing someone on Locust Walk
  open_to_polygamy: number;                  // Openness to non-monogamous relationships
  
  // Love Languages
  love_language: string;                     // User's love language(s) (comma-separated)
  ideal_love_language: string;               // Ideal partner's love language(s) (comma-separated)
  penn_love_language: number;                // Penn-specific love language preference
  
  // Communication Style
  emotionally_available: number;             // Emotional/time availability
  texting_style: number;                     // How quickly they respond to messages
  
  // Optional
  spotify_wrapped_link: string;              // Optional Spotify Wrapped link
}

/**
 * MongoDB Schema Definition
 * Maps to the "submissions" collection in MongoDB
 */
const SubmissionSchema: Schema = new Schema({
  // Required fields
  name: { type: String, required: true },
  penn_email: { type: String, required: true, unique: true },  // Unique index prevents duplicate submissions
  
  // Optional numeric fields (stored as numbers for easy querying/matching)
  gender: Number,
  preferred_gender: Number,
  year_at_penn: Number,
  social_events_enjoyment: Number,
  communication_preference: Number,
  planning_style: Number,
  relationship_importance: Number,
  physical_attraction_priority: Number,
  locust_walk_reaction: Number,
  open_to_polygamy: Number,
  penn_love_language: Number,
  emotionally_available: Number,
  texting_style: Number,
  
  // String fields (store comma-separated values for multi-select answers)
  schools: String,
  preferred_match_years: String,
  race_ethnicity: String,
  preferred_match_race_ethnicity: String,
  love_language: String,
  ideal_love_language: String,
  spotify_wrapped_link: String,
});

// Create and export the Mongoose model
const Submission = mongoose.model<ISubmission>("Submission", SubmissionSchema);
export default Submission;
