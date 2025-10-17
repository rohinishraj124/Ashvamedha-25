'use client';

import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import PointInfo from "../../components/PointInfo/PointInfo.js";
import { setLoading } from "../../redux/appSlice.js";

const tableHead = {
  sportName: "SPORT",
  category: "CATEGORY",
  college1: "OPPONENT",
  point: "POINTS",
};

function PointDetailsPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state?.app?.isLoading ?? false);
  const [pointinfo, setPointinfo] = useState([]);

  const params = useParams() || {};
  const collegename = params?.collegename ?? "";

  const animatedTextStyle = useMemo(
    () => ({
      "--shadow-secondary": "#4299e1",
      "--shadow-tertiary": "#48bb78",
      "--shadow-quaternary": "#f6e05e",
      "--shadow-quinary": "#f56565",
    }),
    []
  );

  useEffect(() => {
    if (!collegename) return;
    const fetchMockData = async () => {
      dispatch(setLoading(true));
      // simulate network delay
      await new Promise((res) => setTimeout(res, 1000));

      // mock result
      const mockData = [
        { sportName: "Football", category: "Men", college1: "ABC", point: 3 },
        { sportName: "Basketball", category: "Women", college1: "XYZ", point: 2 },
        { sportName: "Cricket", category: "Men", college1: "PQR", point: 1 },
      ];

      setPointinfo(mockData);
      dispatch(setLoading(false));
    };

    fetchMockData();

  }, [collegename, dispatch]);

  if (!isLoading && pointinfo.length === 0) {
    return (<div className="w-full"> <Navbar /> <div className="flex h-[85vh] items-center justify-center text-center text-orange-600"> <h2
      className="font-['bungee',_sans-serif] text-5xl font-normal uppercase text-white animate-shadows animate-move tracking-[0.4rem] md:text-7xl"
      style={animatedTextStyle}
    >
      Your team is yet to score! </h2> </div> <Footer /> </div>
    );
  }

  return (<div className="w-full"> <Navbar /> <div className="min-h-screen"> <h2 className="mb-8 mt-6 text-center text-3xl md:text-5xl"> <span className="mr-2.5 text-orange-600">POINTS</span> <span className="text-white">TABLE</span> </h2>

    {!isLoading && (
      <div className="mb-5 flex min-h-full flex-col items-center justify-start text-white">
        <PointInfo gameInfo={tableHead} />
        {pointinfo.map((item, index) => (
          <PointInfo
            gameInfo={item}
            key={index}
            serialNo={index}
          />
        ))}
      </div>
    )}
  </div>
    <Footer />
  </div>

  );
}

export default PointDetailsPage;
