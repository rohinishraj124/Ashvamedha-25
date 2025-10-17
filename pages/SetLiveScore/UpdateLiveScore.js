// Add this directive at the very top of the file
'use client';

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation"; // Import Next.js router
import axios from "axios";

import { server } from "../../constant";
import { useLogin } from "../../context/loginContextProvider";
import Navbar from "../../components/navbar";

function UpdateLiveScorePage() {
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [liveScores, setLiveScores] = useState([]);
  const [matchName, setMatchName] = useState("");
  const [college1Score, setCollege1Score] = useState("");
  const [college2Score, setCollege2Score] = useState("");
  const [setInfo, setSetInfo] = useState("");
  
  const loginCtx = useLogin();
  const router = useRouter();
  const sportName = loginCtx.isLoggedIn ? loginCtx.sport : "";

  // Fetch the list of live scores when the component loads or sportName changes
  const fetchLiveScores = useCallback(async () => {
    if (!sportName) return;
    setLoading(true);
    try {
      const result = await axios.post(`${server}/sport/getlivescore`, {
        sportname: sportName.toLowerCase(),
      });
      setLiveScores(result.data.result?.liveScoreInfo || []);
    } catch (err) {
      console.error("Failed to fetch live scores:", err);
      setLiveScores([]); // Clear scores on error
    } finally {
      setLoading(false);
    }
  }, [sportName]);

  useEffect(() => {
    fetchLiveScores();
  }, [fetchLiveScores]);

  // Handle the form submission to update a score
  async function handleFormSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await axios.put(`${server}/sport/updatelivescore`, {
        matchname: matchName.toLowerCase(),
        sportname: sportName.toLowerCase(),
        set: setInfo.toLowerCase(),
        college1Score,
        college2Score,
      });
      alert(`Score for "${matchName}" updated successfully!`);
      // Optionally, navigate away or refresh the scores
      router.push(`/livescore/${sportName}`);
    } catch (error) {
      console.error("Error updating live score:", error);
      alert("Failed to update score. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // Reusable Tailwind classes for inputs and selects for a consistent "fire" theme
  const inputClasses = "w-full bg-zinc-800 border-2 border-red-500 rounded p-2.5 text-white transition-colors duration-300 focus:outline-none focus:border-orange-400 hover:border-orange-400";

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center p-4">
        {loginCtx.isLoggedIn ? (
          <form
            onSubmit={handleFormSubmit}
            className="mx-auto my-24 w-full rounded-lg bg-zinc-900 p-5 text-white shadow-lg shadow-black/50 md:w-2/3 lg:w-1/2 xl:w-1/3"
          >
            <h2 className="mb-6 text-center text-2xl font-bold text-orange-500">UPDATE LIVE SCORE</h2>

            {/* Sport Name (Read-only) */}
            <div>
              <label className="mb-1.5 block font-bold text-orange-500">Sport Name</label>
              <input type="text" value={sportName} readOnly className={`${inputClasses} cursor-not-allowed bg-zinc-700`} />
            </div>

            {/* Select Match */}
            <div className="mt-4">
              <label className="mb-1.5 block font-bold text-orange-500">Select Match to Update</label>
              <select required value={matchName} onChange={(e) => setMatchName(e.target.value)} className={inputClasses}>
                <option value="">
                  {loading ? "Loading matches..." : "Select a match"}
                </option>
                {liveScores.map((match) => (
                  <option key={match._id} value={match.matchName}>
                    {match.matchName} ({match.college1Name} vs {match.college2Name})
                  </option>
                ))}
              </select>
            </div>

            {/* Scores */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block font-bold text-orange-500">College 1 Score</label>
                <input required type="number" value={college1Score} onChange={(e) => setCollege1Score(e.target.value)} className={inputClasses} />
              </div>
              <div>
                <label className="mb-1.5 block font-bold text-orange-500">College 2 Score</label>
                <input required type="number" value={college2Score} onChange={(e) => setCollege2Score(e.target.value)} className={inputClasses} />
              </div>
            </div>

            {/* Set Details */}
            <div className="mt-4">
              <label className="mb-1.5 block font-bold text-orange-500">Set Details / Status</label>
              <input required type="text" value={setInfo} onChange={(e) => setSetInfo(e.target.value)} className={inputClasses} placeholder="e.g., Set 2, Half Time" />
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button type="submit" disabled={isSubmitting || !matchName} className="w-full rounded bg-orange-600 p-2.5 font-bold text-white transition-colors duration-300 hover:bg-orange-400 disabled:cursor-not-allowed disabled:bg-gray-500">
                {isSubmitting ? "Updating..." : "Update Score"}
              </button>
            </div>
          </form>
        ) : (
          <h2 className="text-center text-3xl font-bold text-red-500">
            You are not logged in as an admin!
          </h2>
        )}
      </div>
    </>
  );
}

export default UpdateLiveScorePage;