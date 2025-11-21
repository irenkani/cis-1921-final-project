import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connectDB from "../config/db";
import submissionsRouter from "../routes/submissions";

dotenv.config({ path: path.resolve(__dirname, "../../.env") });
connectDB();

const app = express();

// Log all requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// Add CORS middleware to allow frontend requests
app.use(cors({
    origin: 'http://localhost:8000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Penn Marriage Pact API is running!" });
});

app.use("/api/submissions", submissionsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
