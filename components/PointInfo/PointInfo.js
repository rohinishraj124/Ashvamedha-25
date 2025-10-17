// Add this directive at the very top of the file
'use client';

import { useParams } from "next/navigation"; // Import the hook from next/navigation
import React from "react";

function PointInfo(props) {
  // useParams works the same way in Next.js
  const params = useParams();

  // A helper function to safely get the opponent's name
  const getOpponentName = () => {
    if (!props.gameInfo) return "TBD";
    // params.collegename will be a string, e.g., "iit-bhubaneswar"
    // props.gameInfo.college1 might be "IIT Bhubaneswar"
    // A robust comparison should ignore case and special characters if needed
    // For now, a simple toLowerCase() comparison is a good improvement
    const currentCollege = (params.collegename || "").toString().toLowerCase();
    const college1 = (props.gameInfo.college1 || "").toLowerCase();

    return college1 === currentCollege 
      ? props.gameInfo.college2 
      : props.gameInfo.college1;
  };

  // Shared classes for all info cells to reduce repetition
  const cellClasses = "flex justify-center items-center font-bold text-xs sm:text-sm md:text-base";

  return (
    // Main container with mobile-first responsive classes
    <div className="flex w-[95%] items-center justify-around rounded border-2 border-white uppercase 
                   h-[50px] m-[5px] 
                   sm:h-[60px] sm:w-[98%] 
                   md:h-20 md:w-4/5 md:m-2.5">
      
      <div className={`${cellClasses} w-1/5 md:w-[30%]`}>
        {props?.gameInfo?.category}
      </div>

      <div className={`${cellClasses} w-[30%] sm:w-1/5`}>
        {getOpponentName()}
      </div>

      <div className={`${cellClasses} w-1/5`}>
        {props?.gameInfo?.point}
      </div>

      <div className={`${cellClasses} w-1/5 sm:w-[30%]`}>
        {props?.gameInfo?.sportName}
      </div>
    </div>
  );
}

export default PointInfo;