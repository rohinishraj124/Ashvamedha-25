// Add this directive at the very top of the file
'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Correct import for Pages Router if needed, or stick to 'next/router'
import apiClient from '../../lib/axios'; // Use apiClient

import { collegeList } from "../../constant"; // Removed 'server' import if not needed elsewhere
import { useLogin } from "../../context/loginContextProvider";
import Navbar from "../../components/navbar";

function SetLiveScorePage() {
  const [loading, setLoading] = useState(false);
  const [matchName, setMatchName] = useState("");
  const [college1Name, setCollege1Name] = useState("");
  const [college2Name, setCollege2Name] = useState("");
  const [college1Score, setCollege1Score] = useState("");
  const [college2Score, setCollege2Score] = useState("");
  const [setInfo, setSetInfo] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  // --- State to track client-side mounting ---
  const [isClient, setIsClient] = useState(false);

  const loginCtx = useLogin();
  const router = useRouter();
  const sportName = loginCtx.isLoggedIn ? loginCtx.sport : "";

  // --- Set isClient to true after mounting ---
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Helper function to get logo URL
  const getCollegeLogo = (name) => {
    const college = collegeList.find((item) => item.name.toLowerCase() === name.toLowerCase());
    return college ? college.logo : "";
  };

  async function handleLiveScore(e) {
    // ... (keep your existing handleLiveScore function - no changes needed here)
    e.preventDefault();
    if (college1Name.toLowerCase() === college2Name.toLowerCase() && college1Name !== "") {
      return alert("Both colleges must be different!");
    }
    setLoading(true);
    try {
      const response = await apiClient.post(`/score/setlivescore`, {
        college1Name: college1Name.toLowerCase(),
        college2Name: college2Name.toLowerCase(),
        college1Logo: getCollegeLogo(college1Name),
        college2Logo: getCollegeLogo(college2Name),
        college1Score,
        college2Score,
        sportName: sportName.toLowerCase(),
        matchName: matchName.toLowerCase(),
        set: setInfo.toLowerCase(),
        category: category.toLowerCase(),
        editedBy: `${sportName.toLowerCase()} admin`,
        location: location.toLowerCase(),
      });

      if (response.data.statusCode === 201) {
        alert("Created Successfully. Confirm it in the livescore section.");
        router.push(`/scores/${sportName}`);
      } else {
        alert(response.data.message || "Submission failed. Please check the details and try again.");
      }
    } catch (error) {
      console.error("Error setting Live Score:", error);
      const errorMsg = error.response?.data?.message || "An error occurred. Please try again later.";
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  // Reusable Tailwind classes
  const inputClasses = "w-full bg-zinc-800 border-2 border-red-500 rounded p-2.5 text-white transition-colors duration-300 focus:outline-none focus:border-orange-400 hover:border-orange-400";

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center px-4">
        {/* --- Defer rendering until client has mounted --- */}
        {!isClient ? (
          // Optional: Show a loading indicator during the brief moment before mounting
          <div className="text-white">Loading...</div>
        ) : loginCtx.isLoggedIn ? ( // Now check login state only on client
          <form
            onSubmit={handleLiveScore}
            className="mx-auto my-24 w-full rounded-lg bg-zinc-900 p-5 text-white shadow-lg shadow-black/50 md:w-2/3 lg:w-1/2 xl:w-1/3"
          >
            {/* ... (rest of your form content remains the same) ... */}
             <h2 className="mb-6 text-center text-2xl font-bold text-orange-500">CREATE LIVE MATCH</h2>

            {/* Sport Name (Read-only) */}
            <div>
              <label className="mb-1.5 block font-bold text-orange-500">Sport Name</label>
              <input type="text" value={sportName} readOnly className={`${inputClasses} cursor-not-allowed bg-zinc-700`} />
            </div>

            {/* Match Name */}
            <div className="mt-4">
              <label htmlFor="matchName" className="mb-1.5 block font-bold text-orange-500">Match Name</label>
              <input required type="text" id="matchName" value={matchName} onChange={(e) => setMatchName(e.target.value)} className={inputClasses} />
            </div>

            {/* College 1 and Score */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block font-bold text-orange-500">College 1</label>
                <select required value={college1Name} onChange={(e) => setCollege1Name(e.target.value)} className={inputClasses}>
                  <option value="">Select a college</option>
                  {collegeList.map((c) => <option key={`${c.name}-1`} value={c.name}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block font-bold text-orange-500">Score</label>
                <input required type="text" value={college1Score} onChange={(e) => setCollege1Score(e.target.value)} className={inputClasses} />
              </div>
            </div>

            {/* College 2 and Score */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block font-bold text-orange-500">College 2</label>
                <select required value={college2Name} onChange={(e) => setCollege2Name(e.target.value)} className={inputClasses}>
                  <option value="">Select a college</option>
                  {collegeList.map((c) => <option key={`${c.name}-2`} value={c.name}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block font-bold text-orange-500">Score</label>
                <input required type="text" value={college2Score} onChange={(e) => setCollege2Score(e.target.value)} className={inputClasses} />
              </div>
            </div>

            {/* Category */}
            <div className="mt-4">
              <label className="mb-1.5 block font-bold text-orange-500">Category</label>
              <select required value={category} onChange={(e) => setCategory(e.target.value)} className={inputClasses}>
                <option value="">Select category</option>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="mixed">Mixed</option>
              </select>
            </div>

            {/* Set Details */}
            <div className="mt-4">
              <label className="mb-1.5 block font-bold text-orange-500">Set Details / Status</label>
              <input required type="text" value={setInfo} onChange={(e) => setSetInfo(e.target.value)} className={inputClasses} placeholder="e.g., Set 2, Half Time, Live" />
            </div>

            {/* Location */}
            <div className="mt-4">
              <label className="mb-1.5 block font-bold text-orange-500">Location</label>
              <input required type="text" value={location} onChange={(e) => setLocation(e.target.value)} className={inputClasses} placeholder="e.g., Main Court, Field 1" />
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button type="submit" disabled={loading} className="w-full rounded bg-orange-600 p-2.5 font-bold text-white transition-colors duration-300 hover:bg-orange-400 disabled:cursor-not-allowed disabled:bg-gray-500">
                {loading ? "Submitting..." : "Create Match"}
              </button>
            </div>
          </form>
        ) : ( // else (if not logged in, but client has mounted)
          <h2 className="mt-40 text-center text-3xl font-bold text-red-500">You are not logged in as an admin!</h2>
        )}
      </div>
    </>
  );
}

export default SetLiveScorePage;