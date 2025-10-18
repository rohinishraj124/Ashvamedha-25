import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Corrected from 'require'
  },
  email: {
    type: String,
    required: true, // Corrected from 'require'
    unique: true,
    lowercase: true,
  },
  sport: {
    type: String,
    required: true,
    enum: ["football", "badminton", "chess", "tabletennis", "gym", "bgmi", "volleyball", "lawntennis", "basketball", "athletics"]
  },
  password: {
    type: String,
    required: true, // Corrected from 'require'
    select: false,
  }
});

// --- THE FIX ---
// This checks if the 'admin' model is already compiled and cached by Mongoose.
// If it exists, it uses the cached model.
// If it does not exist, it compiles and creates the new model.
// This prevents the 'OverwriteModelError' during hot-reloads in development.
export default mongoose.models.admin || mongoose.model("admin", adminSchema);

