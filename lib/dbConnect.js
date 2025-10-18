import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

// A global cache for the mongoose connection to avoid creating new connections on every API call in serverless environments.
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // If a connection is already cached, return it
  if (cached.conn) {
    return cached.conn;
  }

  // If a connection promise doesn't exist, create one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("Database connected successfully.");
      return mongoose;
    });
  }
  
  // Wait for the connection promise to resolve
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    // If the connection fails, clear the promise to allow for a retry
    cached.promise = null;
    throw e;
  }
  
  return cached.conn;
}

export default dbConnect;

