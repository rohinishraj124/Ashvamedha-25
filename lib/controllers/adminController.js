import Admin from '../models/admin'; // Note the import path and ES6 syntax
import { success, error } from '../utils/responseWrapper';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      // Using res.status().json() is standard in Next.js API routes
      return res.status(400).json(error(400, "Plz enter Name, Email, and Password"));
    }

    const sport = email.split(".")[0].toLowerCase();
    const sportList = ["football", "badminton", "chess", "tabletennis", "gym", "bgmi", "volleyball", "lawntennis", "basketball", "athletics"];
    if (!sportList.includes(sport)) {
      return res.status(409).json(error(409, "Invalid Email format!! Email must be like 'sportname.ashvamedha@gmail.com'"));
    }

    const oldUser = await Admin.findOne({ email });
    if (oldUser) {
      return res.status(409).json(error(409, "Admin with this email already exists"));
    }

    const hashPassword = await bcrypt.hash(password, 10);
    await Admin.create({
      name: name.toLowerCase(),
      email: email.toLowerCase(),
      password: hashPassword,
      sport: sport
    });

    return res.status(201).json(success(201, "Admin created successfully"));
  } catch (e) {
    console.error("Error in signup controller:", e);
    return res.status(500).json(error(500, e.message));
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json(error(400, "Plz enter email id/password"));
    }

    const sport = email.split(".")[0].toLowerCase();
    const sportList = ["football", "badminton", "chess", "tabletennis", "gym", "bgmi", "volleyball", "lawntennis", "basketball", "athletics"];
    if (!sportList.includes(sport)) {
      return res.status(409).json(error(409, "Email format is invalid!!"));
    }

    const user = await Admin.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json(error(404, "User not registered"));
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(403).json(error(403, "Incorrect password"));
    }

    const accessToken = generateAccessToken({ _id: user._id, sport: user.sport });
    const refreshToken = generateRefreshToken({ _id: user._id, sport: user.sport });
    
    // It's common to set the refresh token in an HTTPOnly cookie for security
    res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 365}`);

    return res.status(200).json(success(200, { accessToken, sport }));
  } catch (e) {
    console.error("Error in login controller:", e);
    return res.status(500).json(error(500, e.message));
  }
};

const verifyToken = async (req, res) => {
  // The user object is attached to req by the middleware
  if (req.user && req.user.sport) {
    return res.status(200).json(success(200, req.user));
  }
  return res.status(401).json(error(401, "Token verification failed."));
};

const refreshAccessToken = async (req, res) => {
  // In Next.js, cookies are automatically parsed.
  const { refreshToken } = req.cookies;
  
  if (!refreshToken) {
    return res.status(401).json(error(401, "Refresh token in cookie is required"));
  }

  try {
    // Remember to use the correct key from your .env.local file
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_PRIVATE_KEY);
    
    const accessToken = generateAccessToken({ _id: decoded._id, sport: decoded.sport });
    
    return res.status(200).json(success(200, { accessToken }));

  } catch (e) {
    console.error("Error in refresh token controller:", e);
    return res.status(401).json(error(401, "Invalid refresh token"));
  }
};

// Internal helper functions
const generateAccessToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
      expiresIn: "1d",
    });
    return token;
  } catch (e) {
    console.error("Error generating access token:", e);
  }
};

const generateRefreshToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
      expiresIn: "1y",
    });
    return token;
  } catch (e) {
    console.error("Error generating refresh token:", e);
  }
};

// Exporting as a default object
export default {
  signup,
  login,
  refreshAccessToken,
  verifyToken
};

