import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema({
  folderName: {
    type: String,
    required: true, // Corrected from 'require'
  },
  image: {
    publicId: String,
    url: String,
  },
  name: {
    type: String,
  },
});

// --- THE FIX ---
// This checks Mongoose's cache for an existing 'Photo' model.
// If it exists, it uses the cached model.
// If it doesn't, it creates a new one.
// This prevents the 'OverwriteModelError' during hot-reloads in development.
export default mongoose.models.Photo || mongoose.model("Photo", photoSchema);

