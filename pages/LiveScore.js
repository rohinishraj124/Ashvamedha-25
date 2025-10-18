// Add this directive at the very top of the file
'use client';

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useParams } from "next/navigation"; // Use next/navigation for App Router, or next/router for Pages Router
import { useDispatch } from "react-redux";
import apiClient from '../lib/axios'; // Import the configured axios instance

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ScoreCard from "../components/ScoreCard/ScoreCard.js";
// Removed 'server' import as it's replaced by apiClient
import { setLoading } from "../redux/appSlice.js";
import live from "../assests/demoPhotos/live.png"; // Ensure this path is correct

function LiveScorePage() {
  const [liveScore, setLiveScore] = useState([]);
  const [text, setText] = useState("Searching for live matches ...");
  const dispatch = useDispatch();
  const params = useParams(); // Use useParams hook

  // Safely get sportname from params
  const sportname = params?.sportname || "";

  // Memoize the fetch function
  const fetchLiveScore = useCallback(async () => {
    if (!sportname) return;
    try {
      // Use apiClient and the correct relative path
      const result = await apiClient.post(`/score/getlivescore`, {
        sportname: sportname.toLowerCase(),
      });
      // Access data based on the success wrapper structure
      setLiveScore(result.data.result?.liveScoreInfo || []);
    } catch (err) {
      console.error("Error fetching live score:", err);
       // Handle cases where the API returns a 404 specifically
       if (err.response && err.response.status === 404) {
         setLiveScore([]); // No scores found is not necessarily a console error
         setText("No live matches are currently in progress."); // Update text immediately
       } else {
         setLiveScore([]); // Clear scores on other errors
       }
    }
  }, [sportname]); // Dependency is sportname

  useEffect(() => {
    // Only set loading initially
    dispatch(setLoading(true));

    // Initial fetch, then set loading to false
    fetchLiveScore().finally(() => {
      dispatch(setLoading(false));
    });

    // Set up polling interval
    const interval = setInterval(fetchLiveScore, 2000); // Poll every 2 seconds

    // Set up timeout for fallback text
    const timeout = setTimeout(() => {
      // Check current state when timeout executes
      if (liveScore.length === 0) {
        setText("No live matches are currently in progress.");
      }
    }, 4000);

    // Cleanup interval and timeout on unmount
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
    // Dependencies: fetchLiveScore (stable via useCallback) and dispatch (stable)
  }, [fetchLiveScore, dispatch]); // Removed liveScore.length

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <Navbar />
      <div className="mb-10 mt-5 w-full text-neutral-800 uppercase">

        {/* Live Score Header */}
        {liveScore.length > 0 && (
          <div className="mb-5 flex h-[90px] items-center justify-center font-extrabold text-white">
            <div className="flex items-center text-4xl md:text-5xl">
              <Image src={live} alt="Live" className="w-20 animate-pulse" />
              <span className="ml-4">{sportname}</span>
            </div>
          </div>
        )}

        {/* Score Content Area */}
        <div className="flex h-full flex-col-reverse items-center justify-end">
          {liveScore.length > 0 ? (
            liveScore.map((item) => <ScoreCard key={item._id} info={item} />)
          ) : (
            <div className="flex min-h-[75vh] flex-col items-center justify-center text-center text-3xl text-orange-600">
              {text}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LiveScorePage;