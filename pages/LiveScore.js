// Add this directive at the very top of the file
'use client';

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import axios from "axios";

import Navbar from "../components/navbar";
import Footer from "../components/footer";
import ScoreCard from "../components/ScoreCard/ScoreCard.js";
import { server } from "../constant";
import { setLoading } from "../redux/appSlice.js";
import live from "../assests/demoPhotos/live.png";

function LiveScorePage() {
  const [liveScore, setLiveScore] = useState([]);
  const [text, setText] = useState("Searching for live matches ...");
  const dispatch = useDispatch();
  const params = useParams();
  
  // Use a fallback for sportname to prevent errors
  const sportname = params?.sportname || "";

  // Memoize the fetch function to prevent re-creation on every render
  const fetchLiveScore = useCallback(async () => {
    if (!sportname) return; // Don't fetch if sportname is not available yet
    try {
      const result = await axios.post(`${server}/sport/getlivescore`, {
        sportname: sportname.toLowerCase(),
      });
      setLiveScore(result.data.result.liveScoreInfo);
    } catch (err) {
      console.error("Error fetching live score:", err);
      setLiveScore([]); // Clear scores on error
    }
  }, [sportname]);

  useEffect(() => {
    dispatch(setLoading(true));

    // Initial fetch
    fetchLiveScore();

    // Set up the interval to poll for new scores
    const interval = setInterval(fetchLiveScore, 2000); // Polling every 2 seconds

    // Set up a timeout to change the message if no scores are found
    const timeout = setTimeout(() => {
      if (liveScore.length === 0) {
        setText("No live matches are currently in progress.");
      }
    }, 4000);
    
    dispatch(setLoading(false));

    // Cleanup function to clear interval and timeout when the component unmounts
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [fetchLiveScore, dispatch, liveScore.length]);

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