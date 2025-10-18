// Add this directive at the very top of the file
'use client';

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation"; // Or 'next/router' if using Pages Router
import apiClient from '../../lib/axios'; // Import the configured axios instance

// Removed 'server' import as it's replaced by apiClient's baseURL
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
  const [isClient, setIsClient] = useState(false); // State for hydration fix

  const loginCtx = useLogin();
  const router = useRouter();
  // Ensure sportName is derived safely after client mount
  const sportName = loginCtx.isLoggedIn ? loginCtx.sport : "";

  // Fetch the list of live scores
  const fetchLiveScores = useCallback(async () => {
    // Only fetch if sportName is available (which implies user is logged in and client mounted)
    if (!sportName) return;
    setLoading(true);
    try {
      // Use apiClient and the correct relative path
      const result = await apiClient.post(`/score/getlivescore`, {
        sportname: sportName.toLowerCase(),
      });
      setLiveScores(result.data.result?.liveScoreInfo || []);
    } catch (err) {
      console.error("Failed to fetch live scores:", err);
      // Display error to user?
      setLiveScores([]); // Clear scores on error
    } finally {
      setLoading(false);
    }
  }, [sportName]); // Dependency is sportName

  // Effect to set client-side flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Effect to fetch scores once client is mounted and sportName is known
  useEffect(() => {
    if (isClient && sportName) {
        fetchLiveScores();
    }
  }, [isClient, sportName, fetchLiveScores]); // Depend on isClient and sportName


  // Handle the form submission to update a score
  async function handleFormSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);

    // Find the category for the selected match
    const selectedMatch = liveScores.find(m => m.matchName === matchName);
    const category = selectedMatch?.category?.toLowerCase();

    if (!category) {
        alert("Could not find category for the selected match. Please refresh.");
        setIsSubmitting(false);
        return;
    }

    try {
      // Use apiClient and the correct relative path for PUT request
      await apiClient.put(`/score/updatelivescore`, {
        matchName: matchName.toLowerCase(), // Controller expects matchName
        sportName: sportName.toLowerCase(), // Controller expects sportName
        category: category, // MUST include category for findOneAndUpdate query
        set: setInfo.toLowerCase(),
        college1Score,
        college2Score,
        // Add other fields if your backend controller expects them for updates
      });
      alert(`Score for "${matchName}" updated successfully!`);
      // Use correct path for redirection
      router.push(`/scores/${sportName}`);
    } catch (error) {
      console.error("Error updating live score:", error);
      const errorMsg = error.response?.data?.message || "Failed to update score. Please try again.";
      alert(errorMsg); // Show specific error if possible
    } finally {
      setIsSubmitting(false);
    }
  }

  // Reusable Tailwind classes for inputs and selects
  const inputClasses = "w-full bg-zinc-800 border-2 border-red-500 rounded p-2.5 text-white transition-colors duration-300 focus:outline-none focus:border-orange-400 hover:border-orange-400";

  // Render loading state or null until client is mounted
  if (!isClient) {
    // Or return a proper loading skeleton/spinner component
    return (
        <>
            <Navbar />
            <div className="flex min-h-screen items-center justify-center p-4 text-white">
                Loading...
            </div>
        </>
    );
  }

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
                  {loading ? "Loading matches..." : (liveScores.length > 0 ? "Select a match" : "No live matches found")}
                </option>
                {liveScores.map((match) => (
                  // Use a unique identifier like _id if available, otherwise combine fields
                  <option key={match._id || `${match.matchName}-${match.category}`} value={match.matchName}>
                    {match.matchName} ({match.college1Name} vs {match.college2Name}) - {match.category}
                  </option>
                ))}
              </select>
            </div>

            {/* Scores */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block font-bold text-orange-500">College 1 Score</label>
                {/* Changed type to text */}
                <input required type="text" value={college1Score} onChange={(e) => setCollege1Score(e.target.value)} className={inputClasses} />
              </div>
              <div>
                <label className="mb-1.5 block font-bold text-orange-500">College 2 Score</label>
                 {/* Changed type to text */}
                <input required type="text" value={college2Score} onChange={(e) => setCollege2Score(e.target.value)} className={inputClasses} />
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