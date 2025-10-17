import React from "react";
import { useRouter } from "next/router";
function Hero() {
  const router = useRouter();

  const handleNavigation = (path) => {
    window.scrollTo(0, 0);
    router.push(path);
  };

  return (
    // The main hero container with the background image and positioning classes applied
    <div className="relative w-full bg-hero-pattern bg-cover bg-center bg-no-repeat" style={{backgroundImage: "url(./assests)"}} >
      <div className="container mx-auto">
        {/* Content wrapper */}
        <div className="flex min-h-screen flex-col items-center justify-center text-center text-white">
          
          {/* Hero Text Information */}
          <div className="flex flex-col items-center">
            <h1 className="text-5xl font-extrabold tracking-wide md:text-7xl lg:text-8xl">
              <span className="text-warm">ASHVA</span>
              <span className="text-white">MEDHA</span>
            </h1>
            <p className="mt-2 text-xl font-semibold tracking-widest md:text-2xl">
              EMPOWER ENDURE EXCEL
            </p>
            <p className="mt-1 text-xl font-medium md:text-2xl">
              1st-3rd NOVEMBER
            </p>
          </div>

          {/* Buttons Section */}
          <div className="mt-12">
            <button
              onClick={() => handleNavigation("/events/Events")}
              className="h-14 transform rounded-lg border-2 border-white bg-transparent px-6 text-base font-bold text-white transition-all duration-300 ease-in-out hover:border-warm hover:bg-warm hover:text-white active:scale-95"
            >
              LIVE SCORES & FIXTURES
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;