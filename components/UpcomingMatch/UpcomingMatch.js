// Add this directive at the very top of the file
'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import axios from "axios";
import { VscClose } from "react-icons/vsc";

import { server } from "../../constant";
import { setLoading } from "../../redux/appSlice.js";

// Demo assets (ensure paths are correct)
import badminton from "../../assests/demoPhotos/badminton.jpg";
import basketball from "../../assests/demoPhotos/basketball.jpg";
import chess1 from "../../assests/demoPhotos/chess.jpg";
import football from "../../assests/demoPhotos/football.jpg";
import tabletennis from "../../assests/demoPhotos/tt.jpg";
import volleyball from "../../assests/demoPhotos/vb.jpg";

// Data can be moved outside the component
const upcomingmatchImg = [
  { id: 1, sportName: "chess", img: chess1, fixtureName: "chessp" },
  { id: 2, sportName: "badminton", img: badminton, fixtureName: "badmintonp" },
  { id: 3, sportName: "volleyball", img: volleyball, fixtureName: "volleyballp" },
  { id: 4, sportName: "football", img: football, fixtureName: "footballp" },
  { id: 5, sportName: "basketball", img: basketball, fixtureName: "basketballp" },
  { id: 6, sportName: "table-tennis", img: tabletennis, fixtureName: "ttp" },
];

function UpcomingMatch({ isOpen, onClose, sportid }) {
  const dispatch = useDispatch();
  const [fixtureImg, setFixtureImg] = useState(null);

  useEffect(() => {
    // Only fetch data when the modal is opened
    if (isOpen) {
      const getFixtures = async () => {
        try {
          dispatch(setLoading(true));
          const result = upcomingmatchImg.find(({ id }) => id === sportid);
          if (result) {
            const fixturePost = await axios.post(`${server}/upload/name`, {
              folderName: "4th-nov-fixtures",
              name: result.fixtureName,
            });
            setFixtureImg(fixturePost.data.result[0]);
          }
        } catch (error) {
          console.error("Failed to fetch fixture:", error);
        } finally {
          dispatch(setLoading(false));
        }
      };
      
      getFixtures();
    }
  }, [isOpen, sportid, dispatch]); // Effect dependencies

  // Render nothing if the modal is not open
  if (!isOpen) {
    return null;
  }

  return (
    // Popup overlay
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/20">
      
      {/* Popup inner container with glassmorphism and responsive styles */}
      <div className="relative flex h-full w-full flex-col justify-center rounded-lg border-2 border-gray-400
                     bg-gradient-to-br from-white/10 to-transparent backdrop-blur-md shadow-2xl
                     md:h-[90vh] md:w-2/5 md:rounded-2xl">
        
        <button onClick={onClose} className="absolute top-4 right-4 z-10 border-none bg-transparent text-white">
          <VscClose className="h-10 w-10 cursor-pointer" />
        </button>
        
        {/* Image container */}
        <div className="relative h-full w-full overflow-hidden rounded-lg md:rounded-2xl">
          {fixtureImg?.image?.url ? (
            <Image
              src={fixtureImg.image.url}
              alt="Upcoming Match Fixture"
              fill
              style={{ objectFit: 'cover' }}
              priority // Prioritize loading the modal image
            />
          ) : (
            // Simple loading text as a fallback
            <div className="flex h-full w-full items-center justify-center text-white">
              Loading...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UpcomingMatch;