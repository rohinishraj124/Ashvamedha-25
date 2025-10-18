import Player from '../models/player'; // Corrected import
import { success, error } from '../utils/responseWrapper';

// Player registration
const register = async (req, res) => {
  try {
    const { name, email, collegeName, phoneNo, gender, sportName } = req.body;
    if (!name || !email || !collegeName || !sportName || !gender || !phoneNo) {
      return res.status(400).json(error(400, "All fields are required"));
    }

    // Use findOne to check if a single player already exists
    const oldUser = await Player.findOne({ email, name, sportName });
    if (oldUser) {
      return res.status(409).json(error(409, `Player '${name}' is already registered for '${sportName}'`));
    }

    const playerInfo = await Player.create({
      name,
      email,
      collegeName,
      phoneNo,
      gender,
      sportName,
    });

    return res.status(201).json(success(201, { playerInfo }));
  } catch (e) {
    console.error("Error in player register controller:", e);
    return res.status(500).json(error(500, e.message));
  }
};

// Get a list of players, filtered by sportName and collegeName
const playerList = async (req, res) => {
  try {
    const { sportName, collegeName } = req.body;
    if (!sportName || !collegeName) {
        return res.status(400).json(error(400, "Both sportName and collegeName are required"));
    }

    // Corrected Mongoose query: find all players matching both fields
    const players = await Player.find({ sportName, collegeName });
    
    return res.status(200).json(success(200, { players }));
  } catch (e) {
    console.error("Error in playerList controller:", e);
    return res.status(500).json(error(500, e.message));
  }
};

export default {
  register,
  playerList,
};