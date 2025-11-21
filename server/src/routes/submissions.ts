import { Router } from "express";
import Submission from "../models/submissions";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const submissions = await Submission.find();
    res.json({ count: submissions.length, submissions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
});

router.post("/", async (req, res) => {
  try {
    const submission = new Submission(req.body);
    await submission.save();
    res.json({ message: "Submission saved." });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
});

export default router;
