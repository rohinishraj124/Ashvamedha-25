// components/Loader/Loader.js

import React from 'react';
import Image from 'next/image';

// Import your logo assets
import logomashaal from '../../assests/ashvamedhaLogo.png';
import logomashaal2 from '../../assests/ashvamedhaLogo copy.png';
import logomashaal3 from '../../assests/ashvamedhaLogo copy 2.png';
import logomashaal4 from '../../assests/ashvamedhaLogo copy 3.png';

// An array to make mapping cleaner
const logoFrames = [
  { src: logomashaal4, delay: '0.6s' },
  { src: logomashaal3, delay: '0.4s' },
  { src: logomashaal2, delay: '0.2s' },
  { src: logomashaal, delay: '0s' },
];

function Loader() {
  return (
    // Full-screen overlay container
    <div className="fixed inset-0 z-[1000] flex h-screen w-screen items-center justify-center bg-black">
      
      {/* Container for the fading images */}
      <div className="relative h-24 w-24">
        {logoFrames.map((logo, index) => (
          <div
            key={index}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-imagefade"
            style={{ animationDelay: logo.delay }} // Apply staggered delay
          >
            <Image
              src={logo.src}
              alt="Ashvamedha logo fading"
              width={100}
              height={100}
              priority={true} // Helps load the initial image faster
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Loader;