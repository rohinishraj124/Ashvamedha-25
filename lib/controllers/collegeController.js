import Sport from '../models/sports'; // Using Sport model
import { success, error } from '../utils/responseWrapper';
import { mapMatchResultOutput } from '../utils/utils'; // Importing the utility

// Gets the point table for a specific college, showing points per sport
const collegePointTable = async (req, res) => {
    try {
        const { collegeName } = req.body;
        if (!collegeName) {
            return res.status(400).json(error(400, "collegeName is required"));
        }

        // Find all sports where the college is listed as a participant
        const sportsWithCollege = await Sport.find({ "participatingColleges.collegeName": collegeName });

        const pointTable = sportsWithCollege.map(sport => {
            // Find the specific college's data within the sport
            const collegeData = sport.participatingColleges.find(c => c.collegeName === collegeName);
            return {
                sportName: sport.sportsName,
                points: collegeData ? collegeData.points : 0, // Return the points for that sport
            };
        });

        // The original code also tried to map match results, but there was no match data.
        // If you want to include matches won, we would need to adjust the query.
        // For now, this matches the logic from 'totalScore'.
        return res.status(200).json(success(200, pointTable));

    } catch (e) {
        console.error("Error in collegePointTable:", e);
        return res.status(500).json(error(500, e.message));
    }
};

// Calculates the total score for a specific college across all sports
const totalScore = async (req, res) => {
    try {
        const { collegeName } = req.body;
        if (!collegeName) {
            return res.status(400).json(error(400, "collegeName is required"));
        }

        const sportsWithCollege = await Sport.find({ "participatingColleges.collegeName": collegeName });

        // Sum the points from each sport
        let totalPoints = 0;
        sportsWithCollege.forEach(sport => {
            const collegeData = sport.participatingColleges.find(c => c.collegeName === collegeName);
            if (collegeData) {
                totalPoints += collegeData.points;
            }
        });

        return res.status(200).json(success(200, { collegeName, totalScore: totalPoints }));
    } catch (e) {
        console.error("Error in totalScore:", e);
        return res.status(500).json(error(500, e.message));
    }
};

// I've also added this helper function from Adarsh's repo, as it's very useful.
const getAllColleges = async (req, res) => {
    try {
        const sports = await Sport.find({});
        const collegeSet = new Set();

        sports.forEach(sport => {
            sport.participatingColleges.forEach(college => {
                collegeSet.add(college.collegeName);
            });
        });

        const colleges = Array.from(collegeSet);
        return res.status(200).json(success(200, colleges));
    } catch (e) {
        console.error("Error in getAllColleges:", e);
        return res.status(500).json(error(500, e.message));
    }
};

export default {
    collegePointTable,
    totalScore,
    getAllColleges
};