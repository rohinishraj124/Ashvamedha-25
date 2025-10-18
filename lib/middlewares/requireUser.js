import jwt from "jsonwebtoken";
import { error } from "../utils/responseWrapper";
import Admin from "../models/admin";

// This is a higher-order function that wraps an API route handler.
const requireUser = (handler) => async (req, res) => {
  // Check for the Authorization header
  if (
    !req.headers ||
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer ")
  ) {
    return res.status(401).json(error(401, "Authorization header is required"));
  }

  const accessToken = req.headers.authorization.split(" ")[1];

  try {
    // Verify the token using the secret key from your environment variables
    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_PRIVATE_KEY
    );
    
    // Attach the decoded payload's ID to the request object
    req._id = decoded._id;

    // Find the user in the database to ensure they still exist
    const user = await Admin.findById(req._id);
    if (!user) {
      return res.status(404).json(error(404, "User associated with token not found"));
    }

    // Attach the full user object to the request for use in the handler
    req.user = user;

    // If all checks pass, call the original handler function
    return handler(req, res);

  } catch (e) {
    console.error("JWT Verification Error:", e.message);
    // Handle specific JWT errors
    if (e.name === 'TokenExpiredError') {
      return res.status(401).json(error(401, "Access token has expired"));
    }
    return res.status(401).json(error(401, "Invalid access token"));
  }
};

export default requireUser;

