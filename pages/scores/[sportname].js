import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

// --- Components ---
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import ScoreCard from "../../components/ScoreCard/ScoreCard";

// --- Assets & Constants ---
import live from "../../assests/demoPhotos/live.png";
import { setLoading } from "../../redux/appSlice";

function LiveScorePage() {
  const router = useRouter();
  const { sportname } = router.query;

  const dispatch = useDispatch();
  const [liveScore, setLiveScore] = useState([]);
  const [text, setText] = useState("Searching for live matches ...");

  useEffect(() => {
    if (!router.isReady || !sportname) return;

    // --- Mock fetch function ---
    async function fetchLiveScore() {
      try {
        // TEMPORARY MOCK DATA
        const mockData = {
          cricket: [
            { teamA: "India", teamB: "Australia", score: "120/3", overs: "15.2", status: "Live" },
            { teamA: "England", teamB: "Pakistan", score: "95/2", overs: "10.1", status: "Live" },
          ],
          football: [
            { teamA: "Barcelona", teamB: "Real Madrid", score: "2-1", status: "Live" },
            { teamA: "Liverpool", teamB: "Manchester", score: "1-0", status: "Live" },
          ],
          basketball: [
            { teamA: "Lakers", teamB: "Bulls", score: "78-65", status: "Live" },
            { teamA: "Celtics", teamB: "Heat", score: "82-80", status: "Live" },
          ],
        };

        // Pick mock data by sportname, default to empty
        const liveScores = mockData[sportname.toLowerCase()] || [];

        // Simulate API delay
        await new Promise((res) => setTimeout(res, 500));

        setLiveScore(liveScores);
        dispatch(setLoading(false));
      } catch (err) {
        dispatch(setLoading(false));
        console.log("Mock fetch error:", err);
      }
    }

    // Timeout fallback text
    const textTimeout = setTimeout(() => {
      if (!liveScore.length) setText("No live matches present");
    }, 4000);

    dispatch(setLoading(true));
    fetchLiveScore();

    // Refresh every 2 seconds
    const interval = setInterval(fetchLiveScore, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(textTimeout);
    };
  }, [router.isReady, sportname, dispatch]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <Navbar />
      <div className="h-full w-full mt-5 mb-10 uppercase text-[#141E46]">
        {liveScore.length !== 0 && (
          <div className="mb-5 flex h-[90px] items-center justify-center font-extrabold text-white">
            <div className="text-5xl max-[450px]:text-4xl">
              <img
                src={live}
                className="inline-block w-20 animate-pulse"
                alt="Live Icon"
              />
              {sportname}
            </div>
          </div>
        )}

        <div className="flex h-[90%] flex-col-reverse items-center justify-end">
          {liveScore.length !== 0 ? (
            liveScore.map((item, index) => <ScoreCard key={index} info={item} />)
          ) : (
            <div className="flex min-h-[75vh] flex-col items-center justify-center text-center text-3xl text-orange-600">
              <br />
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
