import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Corrected from 'require'
    },
    collegeName: {
      type: String,
      required: true, // Corrected from 'require'
    },
    email: {
      type: String,
      required: true, // Corrected from 'require'
      lowercase: true,
    },
    phoneNo: {
      type: String, // Changed to String for flexibility (e.g., country codes)
      required: true, // Corrected from 'require'
    },
    idCard: {
      publicId: String,
      url: String,
    },
    gender: {
      type: String,
      required: true, // Corrected from 'require'
    },
    sportName: {
      type: String,
      required: true, // Corrected from 'require'
    },
  },
  {
    timestamps: true,
  }
);

// --- THE FIX ---
// This checks Mongoose's cache for an existing 'Player' model.
// If it exists, it uses the cached model. If not, it creates a new one.
// This prevents the 'OverwriteModelError' during hot-reloads.
export default mongoose.models.Player || mongoose.model("Player", playerSchema);

