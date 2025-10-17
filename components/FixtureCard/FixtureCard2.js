import React from 'react';

function FixtureCard2({ match }) {
  return (
    // Main card container with responsive width, border, and background
    <div className="mb-12 w-11/12 rounded-2xl border-2 border-white bg-[#090909] p-6 text-white md:w-3/5">
      
      {/* Container for all match details */}
      <div className="flex flex-col items-center space-y-2 text-center text-lg font-semibold">
        
        {/* Match Type (e.g., FINALS) */}
        <div className="text-xl font-bold uppercase text-warm">
          {match.matchType}
        </div>
        
        {/* Category */}
        <div className="uppercase">
          {match.category}
        </div>
        
        {/* Time */}
        <div>{match.time}</div>
        
        {/* Location */}
        <div className="text-gray-300">
          Location: {match.location}
        </div>
      </div>
    </div>
  );
}

export default FixtureCard2;