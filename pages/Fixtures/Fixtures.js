import React from 'react';
import Image from 'next/image';
import { collegeList } from '../../constant';
import vs from "../../assests/demoPhotos/vs2.png"; // Ensure path is correct

// Reusable component to display team info
const CollegeInfo = ({ teamName, getCollegeLogo }) => (

  <div className="flex flex-col items-center justify-evenly text-center">
    <div className="relative h-16 w-16 rounded-full border-2 border-white p-1 md:h-36 md:w-36">
      <Image
        src={getCollegeLogo(teamName?.toLowerCase())}
        alt={`${teamName || "TBD"} logo`}
        layout="fill"
        objectFit="cover"
        className="rounded-full"
      />
    </div>
    <div className="mt-3 text-lg font-semibold uppercase md:text-2xl">
      {teamName || "TBD"}
    </div>
  </div>
);

function FixtureCard1({ match }) {
if (!match) return null; // Safely handle undefined match

const getCollegeLogo = (collegeName) => {
if (!collegeName || collegeName === "tbd") {
return "[https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1730474620/ashvamedha/Colleges/zpvqrtb9wxtohfzwl09u.png](https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1730474620/ashvamedha/Colleges/zpvqrtb9wxtohfzwl09u.png)";
}
const college = collegeList.find((item) => item.name.toLowerCase() === collegeName.toLowerCase());
return college?.logo || "[https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1730474620/ashvamedha/Colleges/zpvqrtb9wxtohfzwl09u.png](https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1730474620/ashvamedha/Colleges/zpvqrtb9wxtohfzwl09u.png)"; // Fallback logo
};

return ( <div className="mb-12 flex w-11/12 flex-col-reverse items-center justify-start rounded-2xl border-2 border-white bg-[#090909] py-6 text-white md:w-3/5">

```
  {/* Match Type */}
  <div className="mt-5 text-center text-xl font-bold uppercase">
    {match?.matchType || "TBD"}
  </div>

  {/* Teams and VS */}
  <div className="flex w-full items-center justify-around md:w-4/5 my-4">
    <CollegeInfo teamName={match?.team1} getCollegeLogo={getCollegeLogo} />
    
    <div className="w-24 md:w-40">
      <Image src={vs} alt="Versus" layout="responsive" />
    </div>

    <CollegeInfo teamName={match?.team2} getCollegeLogo={getCollegeLogo} />
  </div>

  {/* Match Details */}
  <div className="flex w-full flex-col items-center justify-around border-b-2 border-white pb-4 text-center text-lg font-semibold">
    <div className="my-1">{match?.time || "TBD"}</div>
    {match?.category && <div className="my-1 uppercase">{match.category}</div>}
    <div className="my-1">Location: {match?.location || "TBD"}</div>
  </div>
</div>
);
}

export default FixtureCard1;
