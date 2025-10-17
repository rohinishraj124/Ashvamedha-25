import React, { useState } from "react";
import Image from "next/image"; // Using Next.js optimized Image component
import { AiOutlineClose } from "react-icons/ai";
// import Loader from "../Loader/Loader.js"; // Assuming you have this component

// Helper function to convert custom grid classes to Tailwind CSS classes
const convertGridClasses = (cname) => {
  if (!cname) return "";
  return cname
    .split(" ")
    .map((cls) => {
      const [type, val] = cls.split("-");
      if (type === "w") return `col-span-${Math.round(val)}`;
      if (type === "h") return `row-span-${Math.round(val)}`;
      return "";
    })
    .join(" ");
};

function SportGallery() {
  const [model, setModel] = useState(false);
  const [tempImgSrc, setTempImgSrc] = useState("");
  // const isLoading = false; // For demonstration, assuming loading is false

  const getImg = (imgSrc) => {
    setTempImgSrc(imgSrc);
    setModel(true);
  };

  const galleryPhotos = [
    { cname: "w-3 h-2", imgScr: "https://res.cloudinary.com/dxncseph9/image/upload/v1728639380/DSC_4762_uakyft.jpg", imgText: "Nature" },
    { cname: "w-3 h-3", imgScr: "https://res.cloudinary.com/dxncseph9/image/upload/v1728639379/DSC_2192_idwuyh.jpg", imgText: "People" },
    { cname: "h-2", imgScr: "https://res.cloudinary.com/dxncseph9/image/upload/v1728639379/DSC_2192_idwuyh.jpg", imgText: "Sports" },
    { cname: "w-2", isHeading: true, text: "EVENTS" },
    { cname: "w-4 h-1", imgScr: "https://res.cloudinary.com/dxncseph9/image/upload/v1728639375/DSC_1778_j4yrym.jpg", imgText: "Food" },
    { cname: "", imgScr: "https://res.cloudinary.com/dxncseph9/image/upload/v1728639375/DSC_4681_idmqyv.jpg", imgText: "Travel1" },
    { cname: "", imgScr: "https://res.cloudinary.com/dxncseph9/image/upload/v1728639371/DSC_1858_s0oj4b.jpg", imgText: "Travel2" },
    { cname: "h-2", imgScr: "https://res.cloudinary.com/dxncseph9/image/upload/v1728639367/DSC_3960_t4biwn.jpg", imgText: "Art" },
    { cname: "h-2", imgScr: "https://res.cloudinary.com/dxncseph9/image/upload/v1728639364/C0901T01_n5un0c.jpg", imgText: "Car1" },
    { cname: "w-2 h-3", imgScr: "https://res.cloudinary.com/dxncseph9/image/upload/v1728639363/_MG_9899_lww8mu.jpg", imgText: "car3" },
    { cname: "w-1 h-3", imgScr: "https://res.cloudinary.com/dxncseph9/image/upload/v1728639363/DSC_3978_hoswft.jpg", imgText: "Car4" },
    { cname: "w-3 h-2", imgScr: "https://res.cloudinary.com/dxncseph9/image/upload/v1728639362/DSC_4663_jz2ij7.jpg", imgText: "Car5" },
    { cname: "w-3 h-2", imgScr: "https://res.cloudinary.com/dxncseph9/image/upload/v1728639362/C0792T01_dwry5z.jpg", imgText: "Car6" },
    { cname: "w-1 h-1", imgScr: "https://res.cloudinary.com/dxncseph9/image/upload/v1728639361/_MG_0006_oarboo.jpg", imgText: "Car7" },
    { cname: "w-1 h-3", imgScr: "https://res.cloudinary.com/dxncseph9/image/upload/v1728639358/DSC_2257_t2b0jy.jpg", imgText: "Car8" },
    { cname: "w-2 h-2", imgScr: "https://res.cloudinary.com/dxncseph9/image/upload/v1728639359/_MG_9884_htw0ev.jpg", imgText: "Car10" },
    { cname: "w-3 h-2", imgScr: "https://res.cloudinary.com/dxncseph9/image/upload/v1728639355/DSC_2975_odbjk4.jpg", imgText: "Car11" },
    { cname: "w-2 h-1", isHeading: true, text: "CELEBRATIONS" },
    { cname: "w-3 h-2", imgScr: "https://res.cloudinary.com/dxncseph9/image/upload/v1728639353/_MG_9439_exywqc.jpg", imgText: "Nature" },
    { cname: "w-3 h-3", imgScr: "https://res.cloudinary.com/dxncseph9/image/upload/v1728639350/_MG_0249_zjbkqk.jpg", imgText: "People" },
    { cname: "h-2 w-2", imgScr: "https://res.cloudinary.com/dxncseph9/image/upload/v1728639347/_MG_0135_q8hp4v.jpg", imgText: "Sport1" },
    { cname: "h-1 w-1", imgScr: "https://res.cloudinary.com/dxncseph9/image/upload/v1728639345/_MG_0250_ywpdff.jpg", imgText: "Sport1" },
  ];

  return (
    <>
      {/* {isLoading ? <Loader /> : ( */}
      <div className="bg-[#151515] py-10">
        <h1 className="flex h-[150px] items-center justify-center text-4xl font-bold md:text-5xl">
          <span className="text-warm">ASHVA</span>
          <span className="text-white">MEDHA-</span>
          <span className="text-warm">2023</span>
        </h1>

        {/* --- Image Modal --- */}
        <div
          className={`fixed top-0 left-0 z-[999] flex h-full w-full items-center justify-center bg-black/90 p-5 transition-all duration-500 ease-in-out
            ${model ? "visible scale-100 opacity-100" : "invisible scale-90 opacity-0"}`}
        >
          <img
            src={tempImgSrc}
            alt="Enlarged view"
            className="block h-auto w-auto max-h-full max-w-full"
          />
          <AiOutlineClose
            onClick={() => setModel(false)}
            className="fixed top-5 right-5 h-10 w-10 cursor-pointer rounded-full bg-black/50 p-2 text-white"
          />
        </div>

        {/* --- Masonry Grid --- */}
        <div className="mx-auto grid max-w-7xl grid-flow-dense auto-rows-gallery grid-cols-1 gap-2.5 sm:grid-cols-6">
          {galleryPhotos.map((item, index) => {
            const gridClasses = convertGridClasses(item.cname);
            const responsiveClasses = "sm:col-span-1"; // Fallback for mobile

            return item.isHeading ? (
              <div key={index} className={`flex h-full items-center justify-center sm:${gridClasses || 'col-span-2'}`}>
                <div className="text-3xl font-extrabold text-white md:text-5xl">{item.text}</div>
              </div>
            ) : (
              <div key={index} className={`${responsiveClasses} sm:${gridClasses}`}>
                <div
                  className="group relative h-full w-full cursor-pointer overflow-hidden rounded-md"
                  onClick={() => getImg(item.imgScr)}
                >
                  <div className="absolute top-0 left-0 z-10 h-full w-full bg-black/20 transition-opacity duration-300 group-hover:bg-black/50"></div>
                  <Image
                    src={item.imgScr}
                    alt={item.imgText}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-500 ease-in-out group-hover:scale-125"
                  />
                  <div className="pointer-events-none absolute top-1/2 left-1/2 z-20 w-full -translate-x-1/2 -translate-y-1/2 p-4 text-center text-2xl text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-hover:animate-move-down">
                    {item.imgText}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* )} */}
    </>
  );
}

export default SportGallery;