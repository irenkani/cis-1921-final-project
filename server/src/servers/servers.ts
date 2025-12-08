/**
 * Penn Marriage Pact Backend Server
 * 
 * This is the main Express server that handles:
 * - API endpoints for survey submissions
 * - Database connections via MongoDB
 * - CORS configuration to allow frontend requests
 */

// Import required modules
import express from "express";
import dotenv from "dotenv";  // For environment variables
import cors from "cors";      // For cross-origin requests
import path from "path";
import connectDB from "../config/db";
import submissionsRouter from "../routes/submissions";

// Load environment variables from .env file (contains MongoDB connection string)
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

// Connect to MongoDB database
connectDB();

// Initialize Express application
const app = express();

// Middleware: Log all incoming requests for debugging
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Middleware: Configure CORS to allow frontend (running on port 8000) to make requests
app.use(cors({
    origin: 'http://localhost:8000',  // Only allow requests from our frontend
    credentials: true,                 // Allow cookies and credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization']      // Allowed headers
}));

// Middleware: Parse incoming JSON request bodies
app.use(express.json());

// Root endpoint - simple health check to verify server is running
app.get("/", (req, res) => {
    res.json({ message: "Penn Marriage Pact API is running!" });
});

// Mount the submissions router at /api/submissions
// All submission-related routes (GET, POST) are handled in routes/submissions.ts
app.use("/api/submissions", submissionsRouter);

// Start the server on specified port (default 3000)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
