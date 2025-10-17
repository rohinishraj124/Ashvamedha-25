// Add this directive at the very top of the file
'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import Next.js router
import axios from "axios";

import { server, collegeList2 } from "../../constant";
import { useLogin } from "../../context/loginContextProvider";
import Navbar from "../../components/navbar";

function SetPointTableScorePage() {
  const [loading, setLoading] = useState(false);
  const [matchName, setMatchName] = useState("");
  const [college1Name, setCollege1Name] = useState("");
  const [college2Name, setCollege2Name] = useState("");
  const [collegeWon, setCollegeWon] = useState("");
  const [point, setPoint] = useState("");
  const [category, setCategory] = useState("");

  const router = useRouter(); // Use the Next.js router
  const loginCtx = useLogin();
  const sportName = loginCtx.isLoggedIn ? loginCtx.sport : "";

  async function handleFormSubmit(e) {
    e.preventDefault();
    if (college1Name === college2Name && college1Name !== "") {
      return alert("The two colleges must be different!");
    }
    setLoading(true);
    try {
      const response = await axios.post(`${server}/match/`, {
        college1Name,
        college2Name,
        collegeWon,
        point,
        matchName,
        category,
        sportName,
        editedBy: `${sportName.toLowerCase()} admin`,
      });

      if (response.data.statusCode === 201) {
        alert("Points table updated successfully!");
        router.push(`/leaderboard/${collegeWon}`);
      } else {
        alert(response.data.message || "An unknown error occurred.");
      }
    } catch (error) {
      console.error("Error updating points table:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Reusable Tailwind classes for inputs and selects for a consistent "fire" theme
  const inputClasses = "w-full bg-zinc-800 border-2 border-red-500 rounded p-2.5 text-white transition-colors duration-300 focus:outline-none focus:border-orange-400 hover:border-orange-400";

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center p-4">
        {loginCtx.isLoggedIn ? (
          <form
            onSubmit={handleFormSubmit}
            className="mx-auto my-24 w-full rounded-lg bg-zinc-900 p-5 text-white shadow-lg shadow-black/50 md:w-2/3 lg:w-1/2 xl:w-1/3"
          >
            <h2 className="mb-6 text-center text-2xl font-bold text-orange-500">
              UPDATE POINTS TABLE
            </h2>

            {/* Sport Name (Read-only) */}
            <div>
              <label className="mb-1.5 block font-bold text-orange-500">Sport Name</label>
              <input type="text" value={sportName} readOnly className={`${inputClasses} cursor-not-allowed bg-zinc-700`} />
            </div>

            {/* Match Name */}
            <div className="mt-4">
              <label className="mb-1.5 block font-bold text-orange-500">Match Name</label>
              <input required type="text" value={matchName} onChange={(e) => setMatchName(e.target.value)} className={inputClasses} />
            </div>

            {/* College 1 and 2 Selection */}
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block font-bold text-orange-500">College 1</label>
                <select required value={college1Name} onChange={(e) => setCollege1Name(e.target.value)} className={inputClasses}>
                  <option value="">Select College 1</option>
                  {collegeList2.map((c) => (<option key={`${c.name}-1`} value={c.name}>{c.name}</option>))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block font-bold text-orange-500">College 2</label>
                <select required value={college2Name} onChange={(e) => setCollege2Name(e.target.value)} className={inputClasses}>
                  <option value="">Select College 2</option>
                  {collegeList2.map((c) => (<option key={`${c.name}-2`} value={c.name}>{c.name}</option>))}
                </select>
              </div>
            </div>

            {/* Winning College */}
            <div className="mt-4">
              <label className="mb-1.5 block font-bold text-orange-500">Winning College</label>
              <select required value={collegeWon} onChange={(e) => setCollegeWon(e.target.value)} className={inputClasses}>
                <option value="">Select winning college</option>
                {college1Name && <option value={college1Name}>{college1Name}</option>}
                {college2Name && <option value={college2Name}>{college2Name}</option>}
              </select>
            </div>

            {/* Category and Points */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block font-bold text-orange-500">Category</label>
                <select required value={category} onChange={(e) => setCategory(e.target.value)} className={inputClasses}>
                  <option value="">Select category</option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="mixed">Mixed</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block font-bold text-orange-500">Points Awarded</label>
                <input required type="number" value={point} onChange={(e) => setPoint(e.target.value)} className={inputClasses} />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button type="submit" disabled={loading} className="w-full rounded bg-orange-600 p-2.5 font-bold text-white transition-colors duration-300 hover:bg-orange-400 disabled:cursor-not-allowed disabled:bg-gray-500">
                {loading ? "Updating..." : "Update Points"}
              </button>
            </div>
          </form>
        ) : (
          <h2 className="text-center text-3xl font-bold text-red-500">
            You are not logged in as an admin!
          </h2>
        )}
      </div>
    </>
  );
}

export default SetPointTableScorePage;