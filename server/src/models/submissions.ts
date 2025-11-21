import mongoose, { Schema, Document } from "mongoose";

export interface ISubmission extends Document {
  name: string;
  penn_email: string;
  gender: number;
  preferred_gender: number;
  schools: string;
  year_at_penn: number;
  preferred_match_years: string;
  race_ethnicity: string;
  preferred_match_race_ethnicity: string;
  social_events_enjoyment: number;
  communication_preference: number;
  planning_style: number;
  relationship_importance: number;
  physical_attraction_priority: number;
}

const SubmissionSchema: Schema = new Schema({
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
});

const Submission = mongoose.model<ISubmission>("Submission", SubmissionSchema);
export default Submission;
