import React, { useEffect, useState } from "react";
import axios from "axios";
import { collegeList2, server } from "../constant";
import Navbar from "../components/navbar.js";
import Footer from "../components/footer.js";
import CollegeWrapper from "../components/collegeWrapper.js";
// import Loader from "../../components/Loader/Loader.js";
// import ComingSoon from "../../components/ComingSoon/ComingSoon.js";

function Leaderboard() {
  const [loading, setLoading] = useState(true);
  const [collegeScore, setCollegeScore] = useState([]);

  useEffect(() => {
    async function fetchScore() {
      try {
        const ticketInfos = collegeList2.map((item) =>
          axios.post(`${server}/college/score`, {
            collegeName: item.name,
          })
        );
        const infos = await Promise.all(ticketInfos);
        const array = infos.map((item) => item.data.result);
        const sortedArray = array.sort((a, b) => b[0] - a[0]);
        setCollegeScore(sortedArray);
      } catch (e) {
        console.error("Error fetching leaderboard scores:", e);
      } finally {
        setLoading(false);
      }
    }

    fetchScore();
  }, []);

  return (
    <div className="min-h-screen bg-[#151515]">
      <Navbar />

      {/* <ComingSoon /> */}

      {loading ? (
        // <Loader /> 
        <div className="flex h-[80vh] items-center justify-center text-white">Loading...</div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10">
          <div className="my-8 text-center md:my-10">
            <h2 className="text-4xl font-bold md:text-5xl">
              <span className="text-warm">LEADER</span>
              <span className="text-white">BOARD</span>
            </h2>
          </div>

          {/* Frosted Glass Effect Container */}
          <div className="w-11/12 rounded-xl border-2 border-white/50 bg-black/30 p-5 shadow-lg shadow-black/40 backdrop-blur-md md:w-3/5">
            <div className="flex flex-col space-y-4">
              {collegeScore.map((item, index) => (
                <CollegeWrapper collegeInfo={item} key={index} serialNo={index} />
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