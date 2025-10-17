import React from "react";
import { useRouter } from "next/router"; // Changed from react-router-dom
import { AiOutlineDoubleRight } from "react-icons/ai";

function CollegeWrapper({ collegeInfo, serialNo }) {
  const router = useRouter(); // Using the Next.js router

  // The main wrapper with flexbox layout and bottom border
  return (
    <div className="flex h-20 w-full items-center justify-around border-b-2 border-white pb-2 text-lg text-white">
      
      {/* Serial Number */}
      <div className="w-[15%] text-center">
        {serialNo + 1}
      </div>
      
      {/* College Name */}
      <div className="w-1/2 text-center uppercase">
        {collegeInfo[1]}
      </div>

      {/* Score */}
      <div className="w-[15%] text-center font-bold">
        {collegeInfo[0]}
      </div>

      {/* Navigation Icon */}
      <div
        className="flex w-[10%] cursor-pointer justify-center text-xl transition-transform duration-200 hover:scale-125 hover:text-warm"
        onClick={() => router.push(`/leaderboard/${collegeInfo[1]}`)}
      >
        <AiOutlineDoubleRight />
      </div>
    </div>
  );
}

export default CollegeWrapper;