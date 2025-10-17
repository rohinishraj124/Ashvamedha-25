// Top of the file: app/events/[sportid]/page.js

// This directive is essential for components using hooks and event handlers.
'use client';

import React, { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { AiOutlineDoubleRight } from "react-icons/ai";

// Import your shared components, ensuring the paths are correct for your project structure.
import UpcomingMatch from "../../components/UpcomingMatch/UpcomingMatch.js";
import Navbar from "../../components/navbar.js";

// It's good practice to keep large data arrays in a separate constants file,
// but for completeness, the data is included here.
export const sportsInfo = [
  {
    id: 1,
    sportName: "Chess",
    imgUrl:
      "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1727729822/ashvamedha/events/khcpaoug4b1uegv1q22f.jpg",
    desc: "Chess, the game of intellect and strategy, challenges players to outthink their opponents, anticipate moves, and plan ahead. At the Ashvamedha Chess Championship, we celebrate this timeless battle of wits. Whether you're a seasoned player or just starting, join us for two days of intense competition and camaraderie.",
    date: "2nd-3rd November",
    location: "SES Room No: 218,219",
    registrationLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSd9i_E6j5lr2aquQ3RxkeBOb_-mL9OcEjlplMMVasNJw4iZFg/viewform",
    rulebook:
      "https://drive.google.com/file/d/1InFTI3Zu8qfCHNtCNvprIHpEpjz94Xjg/view?usp=sharing",
    poc: "Srikanth (9392358848)",
    theme: "warm",
  },
  {
    id: 2,
    sportName: "Badminton",
    imgUrl:
      "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1728718553/ashvamedha/events/qeyeqi5joaef13p1kkg2.png",
    desc: "Badminton demands speed, agility, and finesse. Whether you're smashing shuttlecocks or diving for a save, the Ashvamedha Badminton Championship promises intense rallies and thrilling matches.",
    date: "2nd-3rd November",
    location: "Inside SAC Badminton Court",
    registrationLink: "https://forms.gle/RZHEHSQfr8Lar6HFA",
    rulebook:
      "https://drive.google.com/file/d/1InFTI3Zu8qfCHNtCNvprIHpEpjz94Xjg/view?usp=sharing",
    poc: "Harish (6264869374) and Sai Vardhan (8144574654)",
    theme: "cold",
  },
  {
    id: 3,
    sportName: "Volleyball",
    imgUrl:
      "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1727729823/ashvamedha/events/bwneqkxvz129rbzbmr00.jpg",
    desc: "Volleyball is a dynamic sport of coordination and teamwork. Join us for a spirited match at Ashvamedha Sports Arena.",
    date: "2nd-3rd November",
    location: "Volleyball Court 1,2",
    registrationLink: "https://forms.gle/3PL7abtt11sK1HxF7",
    rulebook:
      "https://drive.google.com/file/d/1InFTI3Zu8qfCHNtCNvprIHpEpjz94Xjg/view?usp=sharing",
    poc: "Baman Teja (6304640345)",
    theme: "warm",
  },
  {
    id: 4,
    sportName: "Football",
    imgUrl:
      "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1728718553/ashvamedha/events/fwn1aohwqu16an071qcv.png",
    desc: "Football unites players through skill, teamwork, and passion. Experience the thrill at Ashvamedha Football Tournament.",
    date: "2nd-3rd November",
    location: "Football Ground",
    registrationLink: "https://forms.gle/1toBjx9Ss2oJtbqi9",
    rulebook:
      "https://drive.google.com/file/d/1InFTI3Zu8qfCHNtCNvprIHpEpjz94Xjg/view?usp=sharing",
    poc: "Ajay (9152177679) and Yasas (7847825923)",
    theme: "cold",
  },
  {
    id: 5,
    sportName: "Basketball",
    imgUrl:
      "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1727729822/ashvamedha/events/rfmuljtun5pabxcdrlou.jpg",
    desc: "Basketball is a high-energy game of strategy and skill. Dribble, pass, and shoot your way to glory at Ashvamedha.",
    date: "2nd-3rd November",
    location: "Basketball Court 1,2",
    registrationLink: "https://forms.gle/HhyeT3XzW8qmMYAY6",
    rulebook:
      "https://drive.google.com/file/d/1InFTI3Zu8qfCHNtCNvprIHpEpjz94Xjg/view?usp=sharing",
    poc: "Shivam (6378287518) and Varsha (8002166766)",
    theme: "warm",
  },
  {
    id: 6,
    sportName: "Table Tennis",
    imgUrl:
      "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1728718553/ashvamedha/events/nllyabnsse2bhzpcezfb.png",
    desc: "Lightning-fast reflexes and precision define this thrilling game of ping pong. Witness Ashvamedha’s finest at the table.",
    date: "2nd-3rd November",
    location: "Inside SAC Multi-Purpose Hall",
    registrationLink: "https://forms.gle/AA6bNJrpzKDjDieUA",
    poc: "Thanvi Reddy (9381811060) and Ayush (6367645929)",
    rulebook:
      "https://drive.google.com/file/d/1InFTI3Zu8qfCHNtCNvprIHpEpjz94Xjg/view?usp=sharing",
    theme: "cold",
  },
  {
    id: 7,
    sportName: "BGMI",
    imgUrl:
      "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1727729822/ashvamedha/events/gwbnnstk5f6m2so6m4s4.jpg",
    desc: "Enter the battleground, loot, strategize, and survive. Experience BGMI like never before at Ashvamedha.",
    date: "2nd-3rd November",
    location: "Online",
    registrationLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSeK79UZD1OPOyf_3djG2tUhWAhvMO8VOqh77xP9HO4KwJELaw/viewform",
    poc: "Sanskar Kosare (8208278646)",
    rulebook:
      "https://drive.google.com/file/d/1InFTI3Zu8qfCHNtCNvprIHpEpjz94Xjg/view?usp=sharing",
    theme: "warm",
  },
  {
    id: 8,
    sportName: "GYM & Weightlifting",
    imgUrl:
      "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1728721504/ashvamedha/events/dhsxh0cezuu09f1z9zyo.jpg",
    desc: "A test of strength and perseverance, weightlifting at Ashvamedha celebrates power, focus, and form.",
    date: "2nd-3rd November",
    location: "SAC Gym",
    registrationLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSf1Ib2CKYc8CGiFOyoPLyyBV1cvjqKlH8jfPjQImGfxQCqcAA/viewform",
    poc: "Deekshansh (7225855505) and Tanish (6350108695)",
    rulebook:
      "https://drive.google.com/file/d/1InFTI3Zu8qfCHNtCNvprIHpEpjz94Xjg/view?usp=sharing",
    theme: "cold",
  },
  {
    id: 9,
    sportName: "Athletics",
    imgUrl:
      "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1727729822/ashvamedha/events/wdxnqj88su8gu4gus0fc.jpg",
    desc: "Run, jump, and push your limits. Athletics at Ashvamedha is a celebration of endurance and determination.",
    date: "2nd-3rd November",
    location: "Beside Football Ground",
    registrationLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSeex8BxbszNjeyrJbllYiodsJWSH2TeEsPaDYVRHms1wGrTJw/viewform",
    poc: "Sreenath Reddy (9703040597) and Lukge Jilen (7085758430)",
    rulebook:
      "https://drive.google.com/file/d/1InFTI3Zu8qfCHNtCNvprIHpEpjz94Xjg/view?usp=sharing",
    theme: "warm",
  },
  {
    id: 10,
    sportName: "Lawn Tennis",
    imgUrl:
      "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1728895226/ashvamedha/events/yaocywewl3qdfk26lnha.jpg",
    desc: "Grace and grit meet on the tennis court. Compete in this elegant game of precision and endurance.",
    date: "2nd-3rd November",
    location: "SAC Tennis Courts",
    registrationLink: "https://forms.gle/w2a4Sm1PXMms3qJD6",
    poc: "M Pranavram (8072477461) and Krish Garg (7217530667)",
    rulebook:
      "https://drive.google.com/file/d/1InFTI3Zu8qfCHNtCNvprIHpEpjz94Xjg/view?usp=sharing",
    theme: "cold",
  },
];


function SingleSportPage() {
  const [sportDetail, setSportDetails] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  const params = useParams() || {}; // ✅ prevents null error
  const router = useRouter();

  // safely extract param
  const sportid = params?.sportid ?? "";

  // This effect finds the correct sport details based on the URL parameter.
  useEffect(() => {
    if (sportid) {
      const result = sportsInfo.find((s) => s.id === parseInt(sportid));
      setSportDetails(result || null); // Set to null if not found
    }
  }, [sportid]);

  // useMemo optimizes performance by caching the result of a calculation.
  // Here, it prevents recalculating theme classes on every re-render.
  const themeClasses = useMemo(() => {
    if (!sportDetail) return { text: '', border: '', bg: '', shadow: '' };
    return sportDetail.theme === 'warm'
      ? { text: 'text-orange-500', border: 'border-orange-500', bg: 'bg-orange-500', shadow: 'hover:shadow-[2px_2px_5px_#ff5602]' }
      : { text: 'text-cyan-400', border: 'border-cyan-400', bg: 'bg-cyan-400', shadow: 'hover:shadow-[2px_2px_5px_#36d8fe]' };
  }, [sportDetail]);

  const handleRegistration = () => {
    if (sportDetail?.registrationLink) {
      window.open(sportDetail.registrationLink, '_blank');
    }
  };

  // Display a loading or not-found message until the sport detail is loaded.
  if (!sportDetail) {
    return (
        <div className="flex h-screen items-center justify-center bg-zinc-900 text-white text-2xl">
            Loading event details...
        </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full bg-zinc-900 text-white">
        <div className="relative flex flex-col items-center justify-center">
          
          {/* Top Action Bar */}
          <div className="absolute top-5 z-10 flex w-full flex-col items-center justify-center gap-4 text-center xl:w-[65%] xl:flex-row xl:justify-between">
            <div onClick={handleRegistration} className={`flex cursor-pointer items-center justify-center text-2xl font-bold ${themeClasses.text}`}>
              Register <AiOutlineDoubleRight className="ml-2 text-3xl text-white" />
            </div>
            <div onClick={() => setIsPopupOpen(true)} className={`flex cursor-pointer items-center justify-center text-2xl font-bold ${themeClasses.text}`}>
              Upcoming Matches <AiOutlineDoubleRight className="ml-2 text-3xl text-white" />
            </div>
            <div onClick={() => router.push(`/livescore/${sportDetail.sportName.toLowerCase().replace(/\s+/g, '-')}`)} className={`flex cursor-pointer items-center justify-center text-xl font-bold ${themeClasses.text}`}>
              Live Score <AiOutlineDoubleRight className="ml-2 text-3xl text-white" />
            </div>
          </div>

          {/* Main Content */}
          <div className="relative mt-48 flex w-full flex-col-reverse items-center justify-center px-5 xl:mt-36 xl:w-[65%] xl:flex-row">
            {/* Sport Info */}
            <div className="flex w-full flex-col items-center justify-center text-center xl:w-[70%] xl:ml-10 xl:items-start xl:text-left">
              <h1 className={`mb-2.5 text-4xl font-black xl:text-5xl ${themeClasses.text}`}>{sportDetail.sportName}</h1>
              <p className="mb-4 w-full text-lg leading-relaxed text-gray-300 xl:w-[90%] xl:text-xl">{sportDetail.desc}</p>
              
              <div className="space-y-2 text-lg xl:text-xl">
                <p><span className={`font-semibold ${themeClasses.text}`}>Contact:</span> {sportDetail.poc}</p>
                <p><span className={`font-semibold ${themeClasses.text}`}>Location:</span> {sportDetail.location}</p>
                <p><span className={`font-semibold ${themeClasses.text}`}>Date:</span> {sportDetail.date}</p>
                <a href={sportDetail.rulebook} target="_blank" rel="noopener noreferrer" className="block text-white hover:underline">
                  <span className={`font-semibold ${themeClasses.text}`}>Rulebook:</span> Click here
                </a>
              </div>
              
              <button onClick={handleRegistration} className={`mt-5 h-12 w-full rounded-lg text-xl font-bold text-white transition-all duration-300 ${themeClasses.bg} ${themeClasses.shadow} md:w-1/2`}>
                Register Now
              </button>
            </div>

            {/* Sport Image */}
            <div className="relative mb-5 h-[300px] w-[300px] flex-shrink-0 rounded-2xl border-2 border-gray-700 xl:mb-0 xl:h-[450px] xl:w-[460px]">
              <Image 
                src={sportDetail.imgUrl} 
                alt={`${sportDetail.sportName} event`} 
                fill 
                style={{ objectFit: 'cover' }} 
                className="rounded-2xl" 
                priority // Ensures this important image loads quickly
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Upcoming Matches Popup */}
      <UpcomingMatch 
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        sportid={parseInt(sportid)}
      />
    </>
  );
}

export default SingleSportPage;