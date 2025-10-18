import React, { useEffect, useState } from "react";
// Removed direct axios import
import apiClient from '../lib/axios'; // Import apiClient
import { collegeList2 } from "../constant"; // Removed server import
import Navbar from "../components/navbar.js";
import Footer from "../components/footer.js";
import CollegeWrapper from "../components/collegeWrapper.js";
// import Loader from "../../components/Loader/Loader.js";

function Leaderboard() {
  const [loading, setLoading] = useState(true);
  const [collegeScore, setCollegeScore] = useState([]);

  useEffect(() => {
    async function fetchScore() {
      try {
        // Use apiClient and correct path for each college
        const scorePromises = collegeList2.map((item) =>
          apiClient.post(`/college/score`, { // Corrected path
            collegeName: item.name,
          })
        );
        const responses = await Promise.all(scorePromises);

        // Map the actual result object { collegeName, totalScore }
        const scores = responses.map((response) => response.data.result); // Get the result object

        // Sort based on the totalScore property
        const sortedScores = scores.sort((a, b) => b.totalScore - a.totalScore);

        setCollegeScore(sortedScores);
      } catch (e) {
        console.error("Error fetching leaderboard scores:", e);
        // Handle error appropriately, maybe set an error state
      } finally {
        setLoading(false);
      }
    }

    fetchScore();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="min-h-screen bg-[#151515]">
      <Navbar />

      {loading ? (
        <div className="flex h-[80vh] items-center justify-center text-white">Loading...</div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="my-8 text-center md:my-10">
            <h2 className="text-4xl font-bold md:text-5xl">
              <span className="text-warm">LEADER</span>
              <span className="text-white">BOARD</span>
            </h2>
          </div>

          <div className="w-11/12 rounded-xl border-2 border-white/50 bg-black/30 p-5 shadow-lg shadow-black/40 backdrop-blur-md md:w-3/5">
            <div className="flex flex-col space-y-4">
              {/* Pass the correct object structure to CollegeWrapper */}
              {collegeScore.map((item, index) => (
                <CollegeWrapper collegeInfo={item} key={item.collegeName || index} serialNo={index} />
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Leaderboard;