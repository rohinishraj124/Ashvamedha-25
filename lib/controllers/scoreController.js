import LiveScore from '../models/liveScore';
import { success, error } from '../utils/responseWrapper';

// Creates a new live score entry or updates an existing one.
const setOrUpdateLiveScore = async (req, res) => {
    try {
        const {
            college1Name,
            college1Score,
            college2Name,
            college2Score,
            matchName,
            category,
            sportName,
            editedBy,
            set,
            location,
            college1Logo,
            college2Logo,
        } = req.body;

        // Validate required fields for creating/updating a score
        if (!matchName || !sportName || !category) {
            return res.status(400).json(error(400, "matchName, sportName, and category are required to identify the match"));
        }

        const updateData = {
            college1Name,
            college1Score,
            college2Name,
            college2Score,
            editedBy,
            set,
            location,
            college1Logo,
            college2Logo,
        };
        
        // Remove undefined fields so we don't overwrite existing data with nulls
        Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);

        // Find a match by its unique identifiers and update it.
        // If it doesn't exist (upsert: true), create it.
        const liveScore = await LiveScore.findOneAndUpdate(
            { matchName: matchName.toLowerCase(), sportName: sportName.toLowerCase(), category: category.toLowerCase() },
            { $set: updateData },
            { new: true, upsert: true, runValidators: true }
        );

        return res.status(201).json(success(201, { message: "Live score updated successfully", liveScore }));

    } catch (e) {
        console.error("Error in setOrUpdateLiveScore controller:", e);
        return res.status(500).json(error(500, e.message));
    }
};

// Gets all active live scores for a given sport
const getLiveScore = async (req, res) => {
    try {
        const { sportname } = req.body;
        if (!sportname) {
            return res.status(400).json(error(400, "sportname field is required"));
        }

        const liveScoreInfo = await LiveScore.find({ sportName: sportname.toLowerCase() });
        
        if (!liveScoreInfo.length) {
            return res.status(404).json(error(404, `No active live scores found for ${sportname}`));
        }
        
        return res.status(200).json(success(200, { liveScoreInfo }));
    } catch (e) {
        console.error("Error in getLiveScore controller:", e);
        return res.status(500).json(error(500, e.message));
    }
};

// Deletes a live score entry, typically after a match ends
const deleteLiveScore = async (req, res) => {
    try {
        // We can delete using the same unique fields
        const { matchName, sportName, category } = req.body;
        if (!matchName || !sportName || !category) {
            return res.status(400).json(error(400, "matchName, sportName, and category are required to identify the match to delete"));
        }

        const deletedMatch = await LiveScore.findOneAndDelete({
             matchName: matchName.toLowerCase(),
             sportName: sportName.toLowerCase(),
             category: category.toLowerCase()
        });

        if (!deletedMatch) {
            return res.status(404).json(error(404, "Live score entry not found to delete"));
        }

        return res.status(200).json(success(200, `Live score for '${matchName}' has ended. Remember to update the overall point table.`));
    } catch (e) {
        console.error("Error in deleteLiveScore controller:", e);
        return res.status(500).json(error(500, e.message));
    }
};

export default {
    setOrUpdateLiveScore,
    deleteLiveScore,
    getLiveScore,
};
