import mongoose from 'mongoose';

const liveScoreSchema = new mongoose.Schema({
  college1Name: {
    type: String,
    required: true, // Corrected from 'require'
  },
  college1Score: {
    type: String, // Kept as String to match original controller logic
    required: true,
  },
  college1Logo: {
    type: String,
  },
  college2Name: {
    type: String,
    required: true,
  },
  college2Score: {
    type: String, // Kept as String to match original controller logic
    required: true,
  },
  college2Logo: {
    type: String,
  },
  matchName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  editedBy: {
    type: String,
  },
  sportName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
  },
  set: {
    type: String,
  },
}, { timestamps: true }); // Adding timestamps is good practice

// --- THE FIX ---
// This checks Mongoose's cache for an existing 'LiveScore' model.
// If it finds one, it uses it. If not, it creates a new one.
// This prevents the 'OverwriteModelError' during hot-reloads.
export default mongoose.models.LiveScore || mongoose.model("LiveScore", liveScoreSchema);

