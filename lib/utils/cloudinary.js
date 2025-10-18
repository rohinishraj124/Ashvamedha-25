import { v2 as cloudinary } from 'cloudinary';

// Configure the Cloudinary instance with your credentials.
// It's crucial that you have these environment variables set in your .env.local file.
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

// Export the configured instance for use in other files.
export default cloudinary;

