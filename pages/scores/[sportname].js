// Add this directive at the very top of the file
'use client';

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image"; // Import Image for the 'live' icon
import { useRouter } from "next/router"; // Using Pages Router hook
import { useDispatch } from "react-redux";
import apiClient from '../../lib/axios'; // Import the configured axios instance

// --- Components ---
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import ScoreCard from "../../components/ScoreCard/ScoreCard";

// --- Assets & Constants ---
import live from "../../assests/demoPhotos/live.png"; // Correct path for the image
import { setLoading } from "../../redux/appSlice";

function SportLiveScorePage() { // Renamed component for clarity
  const router = useRouter();
  const { sportname } = router.query; // Get sportname from query params

  const dispatch = useDispatch();
  const [liveScore, setLiveScore] = useState([]);
  const [text, setText] = useState("Searching for live matches ...");

  // --- Actual fetch function using apiClient ---
  const fetchLiveScore = useCallback(async () => {
    // Wait until router is ready and sportname is available
    if (!router.isReady || !sportname) return;

    try {
      // Use apiClient and the correct path
      const result = await apiClient.post(`/score/getlivescore`, {
        sportname: String(sportname).toLowerCase(), // Ensure sportname is lowercase string
      });

      // Access data based on success wrapper
      setLiveScore(result.data.result?.liveScoreInfo || []);

      // If scores are fetched, clear the "searching" text
      if (result.data.result?.liveScoreInfo?.length > 0) {
           setText(""); // Clear text if scores found
       }

    } catch (err) {
      console.error("Error fetching live score:", err);
      // Handle 404 specifically - means no scores found for that sport
      if (err.response && err.response.status === 404) {
        setLiveScore([]);
        setText("No live matches are currently in progress.");
      } else {
        // Handle other errors
        setLiveScore([]);
        setText("Failed to load live scores."); // More informative error text
      }
    }
  }, [router.isReady, sportname]); // Dependencies for fetch function

  useEffect(() => {
    // Only proceed if router is ready
    if (!router.isReady) return;

    // Set loading only on initial fetch setup
    dispatch(setLoading(true));

    // Perform initial fetch
    fetchLiveScore().finally(() => {
      dispatch(setLoading(false)); // Set loading false after initial attempt
    });

    // Set up polling interval
    const interval = setInterval(fetchLiveScore, 2000); // Poll every 2 seconds

    // Set up timeout for fallback text (only runs if initial fetch is slow/fails)
    const timeout = setTimeout(() => {
        // Check state *when timeout executes*
      if (liveScore.length === 0 && text === "Searching for live matches ...") {
        setText("No live matches are currently in progress.");
      }
    }, 4000);

    // Cleanup function
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
    // Dependencies: fetchLiveScore (stable via useCallback) and dispatch (stable)
  }, [fetchLiveScore, dispatch, router.isReady]); // Added router.isReady dependency

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <Navbar />
      {/* Changed text color class for visibility on default background */}
      <div className="h-full w-full mt-5 mb-10 uppercase text-white">
        {liveScore.length > 0 && sportname && ( // Added sportname check
          <div className="mb-5 flex h-[90px] items-center justify-center font-extrabold text-white">
            <div className="flex items-center text-4xl md:text-5xl"> {/* Adjusted text size */}
              {/* Use Next.js Image component */}
              <Image
                src={live}
                width={80} // Provide explicit width
                height={80} // Provide explicit height based on aspect ratio
                className="inline-block animate-pulse" // Removed w-20, using width/height props
                alt="Live Icon"
              />
              <span className="ml-4">{String(sportname)}</span> {/* Ensure sportname is string */}
            </div>
          </div>
        )}

        <div className="flex h-full flex-col-reverse items-center justify-end"> {/* Changed h-[90%] to h-full */}
          {liveScore.length > 0 ? (
            liveScore.map((item) => <ScoreCard key={item._id || index} info={item} />) // Use _id for key if available
          ) : (
            <div className="flex min-h-[75vh] flex-col items-center justify-center text-center text-3xl text-orange-600">
              {/* Removed <br /> */}
              {text}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

// Ensure the component name matches the file name export convention if needed
export default SportLiveScorePage; // Renamed export