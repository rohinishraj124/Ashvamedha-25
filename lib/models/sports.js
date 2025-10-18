import mongoose from 'mongoose';

// --- Sub-schema for individual matches ---
const matchSchema = new mongoose.Schema({
  matchName: { type: String, required: true },
  category: { type: String, required: true },
  college1Name: { type: String, required: true },
  college2Name: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  point: { type: Number, required: true },
  collegeWon: { type: String }, // Not required until match is over
});

// --- Sub-schema for participating colleges and their points ---
const collegePointsSchema = new mongoose.Schema({
  collegeName: { type: String, required: true },
  points: { type: Number, default: 0 }
});

// --- Main Schema: One document per sport ---
const sportsSchema = new mongoose.Schema(
  {
    sportsName: {
      type: String,
      required: true,
      unique: true, // Ensures you only have one document for "Football", etc.
    },
    participatingColleges: [collegePointsSchema], // Array of colleges in this sport
    matches: [matchSchema], // Array of all matches for this sport
  },
  {
    timestamps: true,
  }
);

// --- THE FIX ---
// Checks Mongoose's cache for an existing 'Sport' model before creating a new one.
// Replace the current export line with this:
export default mongoose.models.Sport || mongoose.model("Sport", sportsSchema);
