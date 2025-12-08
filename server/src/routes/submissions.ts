/**
 * Submissions Routes
 * 
 * Handles all API endpoints related to survey submissions:
 * - GET /api/submissions - Retrieve all submissions
 * - POST /api/submissions - Create a new submission
 */

import { Router } from "express";
import Submission from "../models/submissions";

const router = Router();

/**
 * GET /api/submissions
 * 
 * Retrieves all survey submissions from the database.
 * Useful for viewing all responses or feeding into a matching algorithm.
 * 
 * @returns {Object} JSON with count and array of all submissions
 */
router.get("/", async (req, res) => {
  try {
    // Fetch all submission documents from MongoDB
    const submissions = await Submission.find();
    
    // Return count and full list of submissions
    res.json({ count: submissions.length, submissions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
});

/**
 * POST /api/submissions
 * 
 * Creates a new survey submission.
 * Validates that the email hasn't been used before (enforced by unique index).
 * 
 * @param {Object} req.body - The submission data (see ISubmission interface)
 * @returns {Object} Success message or error details
 */
router.post("/", async (req, res) => {
  try {
    // Log the incoming data for debugging
    console.log("📝 Received submission data:", JSON.stringify(req.body, null, 2));
    
    // Create new submission document from request body
    const submission = new Submission(req.body);
    
    // Save to MongoDB (will throw error if email already exists)
    await submission.save();
    
    console.log("✅ Submission saved successfully!");
    res.json({ message: "Submission saved." });
    
  } catch (error: any) {
    console.error("❌ Error saving submission:");
    console.error(error);
    
    // Check for MongoDB duplicate key error (code 11000)
    // This happens when someone tries to submit with an email that's already in the database
    if (error.code === 11000) {
      return res.status(400).json({ 
        error: "This email has already been submitted. Each email can only submit once." 
      });
    }
    
    // Generic error response for other types of errors
    res.status(400).json({ 
      error: error.message || "Failed to save submission",
      details: error
    });
  }
});

export default router;
