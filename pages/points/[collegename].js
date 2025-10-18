'use client';

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "../../lib/axios"; // Import apiClient
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import PointInfo from "../../components/PointInfo/PointInfo.js";
import { setLoading } from "../../redux/appSlice.js";

const tableHead = {
  sportName: "SPORT",
  category: "CATEGORY",
  college1Name: "OPPONENT", // Use college1Name to match data structure
  point: "POINTS",
};

function PointDetailsPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state?.app?.isLoading ?? false);
  const [pointinfo, setPointinfo] = useState([]);
  const [isClient, setIsClient] = useState(false);

  const params = useParams() || {};
  // Decode the college name from the URL
  const collegename = params?.collegename ? decodeURIComponent(params.collegename) : "";

  useEffect(() => {
    setIsClient(true);
  }, []);

  const fetchPointDetails = useCallback(async () => {
    if (!collegename) return;
    dispatch(setLoading(true));
    try {
      const response = await apiClient.post('/college/match-details', {
        collegeName: collegename,
      });
      // The backend now returns the detailed match list
      setPointinfo(response.data.result || []);
    } catch (error) {
      console.error("Error fetching point details:", error);
      setPointinfo([]); // Clear data on error
    } finally {
      dispatch(setLoading(false));
    }
  }, [collegename, dispatch]);

  useEffect(() => {
    // Only fetch data once the component has mounted and the collegename is available
    if (isClient) {
      fetchPointDetails();
    }
  }, [isClient, fetchPointDetails]);

  const animatedTextStyle = useMemo(
    () => ({
      "--shadow-secondary": "#4299e1",
      "--shadow-tertiary": "#48bb78",
      "--shadow-quaternary": "#f6e05e",
      "--shadow-quinary": "#f56565",
    }),
    []
  );

  if (!isClient || (isLoading && pointinfo.length === 0)) {
     return (<div className="w-full bg-[#151515]"> <Navbar /> <div className="flex h-[85vh] items-center justify-center text-white">Loading...</div> <Footer /> </div>);
  }

  if (!isLoading && pointinfo.length === 0) {
    return (<div className="w-full bg-[#151515]"> <Navbar /> <div className="flex h-[85vh] items-center justify-center text-center text-orange-600"> <h2
      className="font-['bungee',_sans-serif] text-3xl font-normal uppercase text-white animate-shadows animate-move tracking-[0.4rem] md:text-5xl"
      style={animatedTextStyle}
    >
      This team is yet to score! </h2> </div> <Footer /> </div>
    );
  }

  return (
    <div className="w-full bg-[#151515]">
      <Navbar />
      <div className="min-h-screen">
        <h2 className="mb-8 mt-6 text-center text-3xl uppercase md:text-5xl">
          <span className="mr-2.5 text-orange-600">{collegename}</span>
          <span className="text-white">POINTS TABLE</span>
        </h2>

        <div className="mb-5 flex min-h-full flex-col items-center justify-start text-white">
          <PointInfo gameInfo={tableHead} />
          {pointinfo.map((item, index) => (
            <PointInfo
              gameInfo={item}
              key={item._id || index} // Use unique _id from match object
              serialNo={index} // serialNo is not used by PointInfo but kept for consistency
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PointDetailsPage;
