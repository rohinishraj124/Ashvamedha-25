import Sport from '../models/sports';
import { success, error } from '../utils/responseWrapper';

// Adds a new match result to a sport and updates points
const addMatchResult = async (req, res) => {
    try {
        const {
            matchName,
            college1Name,
            college2Name,
            point,
            collegeWon,
            sportName,
            category,
            date,
            time
        } = req.body;

        // Basic validation
        if (!matchName || !college1Name || !college2Name || !point || !collegeWon || !sportName || !category || !date || !time) {
            return res.status(400).json(error(400, "All fields are required"));
        }

        const sport = await Sport.findOne({ sportsName: sportName });
        if (!sport) {
            return res.status(404).json(error(404, "Sport not found"));
        }

        // Check if the match already exists in the array
        const matchExists = sport.matches.some(match => match.matchName === matchName && match.category === category);
        if (matchExists) {
            return res.status(409).json(error(409, "This match result has already been uploaded for this sport"));
        }

        // Add the new match to the matches array
        sport.matches.push({
            matchName,
            college1Name,
            college2Name,
            point,
            collegeWon,
            category,
            date,
            time
        });

        // Find the winning college in the participatingColleges array and update their score
        const winningCollege = sport.participatingColleges.find(college => college.collegeName === collegeWon);
        if (winningCollege) {
            winningCollege.points += parseInt(point, 10);
        } else {
            // Optional: Handle case where winning college is not in the participants list
            return res.status(404).json(error(404, `Winning college '${collegeWon}' is not a participant in this sport.`));
        }

        await sport.save();

        return res.status(201).json(success(201, { message: "Match result added successfully", match: sport.matches[sport.matches.length - 1] }));

    } catch (e) {
        console.error("Error in addMatchResult controller:", e);
        return res.status(500).json(error(500, e.message));
    }
};


// Get all matches for a specific sport
const getAllMatchesForSport = async (req, res) => {
    try {
        const { sportName } = req.body;
        if (!sportName) {
            return res.status(400).json(error(400, "sportName is required"));
        }

        const sport = await Sport.findOne({ sportsName: sportName });
        if (!sport) {
            return res.status(404).json(error(404, "Sport not found"));
        }

        return res.status(200).json(success(200, sport.matches));
    } catch (e) {
        console.error("Error in getAllMatchesForSport:", e);
        return res.status(500).json(error(500, e.message));
    }
};

// Get upcoming matches across all sports
const getUpcomingMatches = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set time to the beginning of the day for accurate comparison

        const sports = await Sport.find({
            "matches.date": { $gte: today }
        });

        const upcomingMatches = [];
        sports.forEach(sport => {
            sport.matches.forEach(match => {
                if (new Date(match.date) >= today) {
                    upcomingMatches.push({
                        sportName: sport.sportsName,
                        ...match._doc // Spread the rest of the match details
                    });
                }
            });
        });

        return res.status(200).json(success(200, upcomingMatches));

    } catch (e) {
        console.error("Error in getUpcomingMatches:", e);
        return res.status(500).json(error(500, e.message));
    }
};


export default {
    addMatchResult,
    getAllMatchesForSport,
    getUpcomingMatches
};
