// Add this directive at the very top of the file
'use client';

import React from "react";
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Or 'next/router'
import apiClient from '../../lib/axios'; // Import apiClient

// Removed direct axios import
// Removed 'server' import

// Import your assets and context
import vs from "../../assests/demoPhotos/vs2.png"; // Make sure this path is correct
import { useLogin } from "../../context/loginContextProvider";
// Removed 'server' from constant import if no longer needed
// import { server } from "../../constant";

function ScoreCard(props) {
  const loginCtx = useLogin();
  const router = useRouter();

  const handleDelete = async () => {
    // Ensure props.info exists before trying to delete
    if (!props.info?._id || !props.info.matchName || !props.info.sportName || !props.info.category) {
        alert("Cannot delete score: missing required information.");
        return;
    }

    if (window.confirm(`Delete the live score for "${props.info.matchName}"?`)) { // Added match name to confirm
      try {
        // Use apiClient and the correct relative path for DELETE
        const res = await apiClient.delete(`/score/deletelivescore`, {
          // Send required data in the 'data' property for DELETE requests with body
          data: {
            matchName: props.info.matchName,
            sportName: props.info.sportName,
            category: props.info.category
          }
        });
        console.log(res); // Keep for debugging
        if (res.data.statusCode === 200) {
          alert(`Live Score Ended for MatchName : "${props.info.matchName}", Update the points table`);
          router.push("/SetLiveScore/SetPointTableScore"); // Correct path to points update page
        } else {
           alert(res.data.message || "Failed to delete score."); // Show backend message if available
        }
      } catch (error) {
        console.error("Failed to delete the score:", error);
         const errorMsg = error.response?.data?.message || "Error: Could not delete the score. Please try again.";
         alert(errorMsg); // Show specific error if possible (e.g., 401 Unauthorized)
      }
    }
  };

  if (!props.info) {
    return null; // Don't render if info is missing
  }

  // Determine if the current admin's sport matches the score's sport
  const isAdminForThisSport = loginCtx.isLoggedIn && loginCtx.sport === props.info.sportName;

  return (
    <div className="border-2 border-white w-11/12 sm:w-3/5 mb-12 text-white rounded-2xl pb-4 bg-[#090909] flex flex-col-reverse justify-start items-center">

      {/* Admin Buttons - Only show if logged in AND sport matches */}
      {isAdminForThisSport && (
        <div className="mt-4">
          <button
            onClick={handleDelete}
            className="text-red-500 bg-transparent py-1 px-3 mx-2 rounded border border-red-500 hover:bg-red-500 hover:text-white transition-colors duration-200"
          >
            Delete
          </button>
          <button
            onClick={() => router.push(`/SetLiveScore/UpdateLiveScore`)} // Navigate to general update page
            className="text-yellow-400 bg-transparent py-1 px-3 mx-2 rounded border border-yellow-400 hover:bg-yellow-400 hover:text-black transition-colors duration-200"
          >
            Update
          </button>
        </div>
      )}

      {/* Main Score Display */}
      <div className="h-full w-full sm:w-4/5 flex justify-around items-center mt-5 px-2">

        {/* College 1 Info */}
        <div className="flex flex-col justify-evenly items-center text-center text-lg sm:text-2xl w-1/3">
          <div className="relative border-2 border-white rounded-full w-[80px] h-[80px] sm:w-[150px] sm:h-[150px] flex justify-center items-center overflow-hidden bg-gray-700"> {/* Added bg color */}
             {props.info.college1Logo && (
               <Image src={props.info.college1Logo} alt={`${props.info.college1Name} logo`} fill style={{ objectFit: 'cover' }} />
             )}
          </div>
          <div className="name mt-2.5 font-semibold">{props.info.college1Name}</div>
          <div className="score font-bold">{props.info.college1Score}</div>
        </div>

        {/* VS Image */}
        <div className="w-[100px] sm:w-40 scale-75 sm:scale-50">
          <Image src={vs} alt="Versus" width={160} height={160} />
        </div>

        {/* College 2 Info */}
        <div className="flex flex-col justify-evenly items-center text-center text-lg sm:text-2xl w-1/3">
          <div className="relative border-2 border-white rounded-full w-[80px] h-[80px] sm:w-[150px] sm:h-[150px] flex justify-center items-center overflow-hidden bg-gray-700"> {/* Added bg color */}
             {props.info.college2Logo && (
               <Image src={props.info.college2Logo} alt={`${props.info.college2Name} logo`} fill style={{ objectFit: 'cover' }} />
             )}
          </div>
          <div className="name mt-2.5 font-semibold">{props.info.college2Name}</div>
          <div className="score font-bold">{props.info.college2Score}</div>
        </div>
      </div>

      {/* Match Details */}
      <div className="w-full border-b-2 border-white mt-4 flex flex-col justify-around items-center text-lg font-semibold pb-3">
        {/* Conditionally show Match Name for admin */}
        {isAdminForThisSport && (
          <div className="my-1 text-center text-sm text-gray-400">
            {props.info.matchName} (Admin View)
          </div>
        )}
        <div className="my-1 text-center">{props.info.set}</div>
        <div className="my-1 text-center">{props.info.category}</div>
        <div className="my-1 text-center">
          Location: {props.info.location}
        </div>
      </div>
    </div>
  );
}

export default ScoreCard;