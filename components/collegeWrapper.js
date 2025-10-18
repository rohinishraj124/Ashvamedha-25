import React from "react";
import { useRouter } from "next/router"; // Using Pages Router hook
import { AiOutlineDoubleRight } from "react-icons/ai";

function CollegeWrapper({ collegeInfo, serialNo }) {
  const router = useRouter();

  // Ensure collegeInfo exists and has expected properties
  if (!collegeInfo || typeof collegeInfo.totalScore === 'undefined' || !collegeInfo.collegeName) {
       return null; // Or render a placeholder/error state
   }

  // Use object properties: collegeInfo.totalScore and collegeInfo.collegeName
  return (
    <div className="flex h-20 w-full items-center justify-around border-b-2 border-white pb-2 text-lg text-white">

      {/* Serial Number */}
      <div className="w-[15%] text-center">
        {serialNo + 1}
      </div>

      {/* College Name */}
      <div className="w-1/2 text-center uppercase">
        {collegeInfo.collegeName}
      </div>

      {/* Score */}
      <div className="w-[15%] text-center font-bold">
        {collegeInfo.totalScore}
      </div>

      {/* Navigation Icon - Link to college-specific points page */}
      <div
        className="flex w-[10%] cursor-pointer justify-center text-xl transition-transform duration-200 hover:scale-125 hover:text-warm"
        // Use college name in the path, ensure it's URL-friendly if needed
        onClick={() => router.push(`/points/${encodeURIComponent(collegeInfo.collegeName)}`)}
      >
        <AiOutlineDoubleRight />
      </div>
    </div>
  );
}

export default CollegeWrapper;