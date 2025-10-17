import React from "react";
import Image from "next/image";
import CounterUpPage from "./CounterUpPage.js"; // Assuming this component is in the same directory

// Import your local image file
import merch from "../../assests/aboutusassets/merch.png";

function AboutUs() {
  return (
    <div id="hello" className="w-full min-h-screen bg-[#151515] text-white py-16 px-4">
      <div className="mx-auto max-w-7xl">
        
        {/* About Us Section */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold md:text-5xl">
            <span className="text-warm">ABOUT </span>
            <span className="text-white">US</span>
          </h1>
          <div className="max-w-4xl mx-auto mt-8">
            <div className="text-justify text-lg text-footer-text md:text-xl">
              <p className="mb-6">
                Welcome to Ashvamedha, IIT Bhubaneswar's annual sports fest! Driven by our passion for sports, we aim to promote fitness, competition, and camaraderie. More than just a sports event, Ashvamedha celebrates teamwork and sportsmanship.
              </p>
              <p className="mb-6">
                This year, we offer a wide range of activities for all skill levels. Whether you’re a seasoned athlete or just looking for fun, Ashvamedha has something for everyone.
              </p>
              <p>
                Join us for an exciting week of sports, competition, and celebration, and help make Ashvamedha 2024 an unforgettable experience!
              </p>
            </div>
          </div>
        </div>

        {/* Counter Section */}
        <div className="w-full my-16">
          <CounterUpPage />
        </div>

        {/* Merchandise Section */}
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold md:text-5xl">
            <span className="text-warm">OUR </span>
            <span className="text-white">MERCHANDISE</span>
          </h1>
          <div className="flex flex-col items-center justify-center w-full mt-8">
            <div className="w-full px-4 sm:w-4/5 md:w-3/5 lg:w-2/5">
              <Image
                src={merch}
                alt="Ashvamedha T-shirt Merchandise"
                layout="responsive"
                placeholder="blur" // Optional: for a better loading experience
              />
            </div>
            <div className="mt-8">
              <a
                href="https://forms.gle/iap77hortfY7i6jf8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 text-xl font-semibold text-black transition-colors duration-300 border-2 rounded-lg cursor-pointer bg-warm border-warm hover:bg-transparent hover:text-warm"
              >
                GET YO<span className="text-white">UR MERCH!!</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AboutUs;