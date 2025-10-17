import React from "react";
import Image from "next/image";
import Footer from "../components/footer";
import Navbar from "../components/navbar";

// Reusable component for a single team member card
const TeamCard = ({ name, position, image, no }) => (
  <div className="flex flex-col items-center text-center">
    <div className="relative h-48 w-48 rounded-full border-2 border-white p-1">
      <Image
        src={image}
        alt={name}
        layout="fill"
        objectFit="cover"
        className="rounded-full"
      />
    </div>
    <div className="mt-4">
      <p className="text-xl font-bold uppercase text-warm">{position}</p>
      <h3 className="mt-1 text-2xl font-semibold text-white">{name}</h3>
      <h3 className="text-lg text-gray-300">{no}</h3>
    </div>
  </div>
);

// Main Page Component
function OurTeam() {
  const chiefCoordinator = [
    {
      name: "Abhishek Jakhar",
      position: "Chief Coordinator",
      image: "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1729327567/ashvamedha/team/z0wu3a16v1k0wgqeyxt5.jpg",
      no: "+91 7976512192",
    },
  ];

  const teamMembers = [
    { name: "Sanskar Kosare", position: "Publicity Co-ordinator", image: "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1728720503/ashvamedha/team/pi1yovzsrbn9xqew5hew.jpg", no: "+91 8208278646" },
    { name: "Mayank Raj", position: "Events Co-ordinator", image: "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1728721046/ashvamedha/team/vplukiobhozebm5pio5t.jpg", no: "+91 7709446384" },
    { name: "Soumyajeet", position: "Sponsorship Co-ordinator", image: "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1728720503/ashvamedha/team/wvxnpci56fgf6qa2uyik.jpg", no: "+91 9836821118" },
    { name: "Adhiraj Dubey", position: "Web&D Co-ordinator", image: "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1728720505/ashvamedha/team/d6pqqqdexscnkvwnoxps.jpg", no: "+91 9589660889" },
    { name: "Tanish", position: "Hospitality Co-ordinator", image: "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1728720504/ashvamedha/team/itligupcge8v6xtmrbiw.jpg", no: "+91 6350108695" },
  ];

  const corehead = [
    { name: "Nishant", position: "Core Head", image: "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1728720504/ashvamedha/team/vlycnaazp2qcrygswxya.jpg", no: "+91 8920481815" },
    { name: "Shivam", position: "Core Head", image: "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1728843691/ashvamedha/team/u5rmar3eivphrscjfm8f.jpg", no: "+91 6378287518" },
    { name: "Nirali", position: "Core Head", image: "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1728720504/ashvamedha/team/vvxkkb0qsq2cd6t7vkvx.jpg", no: "+91 6378233277" },
    { name: "Ghanshyam", position: "Core Head", image: "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1729419882/ashvamedha/team/zpcylfs2qx6vtsnovhur.jpg", no: "+91 8319901135" },
    { name: "Thanvi Reddy", position: "Core Head", image: "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1728720504/ashvamedha/team/vjmjgjyyxwcdksbuoeyj.jpg", no: "+91 9381811060" },
    { name: "Aniket", position: "Core Head", image: "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1728720505/ashvamedha/team/suzhk8pi17d2a9tng3u0.jpg", no: "+91 9798697313" },
    { name: "Dingum", position: "Core Head", image: "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1729402896/ashvamedha/team/xg85qegkihg0luh1th9v.jpg", no: "+91 9366471892" },
    { name: "Vipin Kumar", position: "Core Head", image: "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1728843690/ashvamedha/team/ide1pqdiut3yacmsnbhk.jpg", no: "+91 7082604643" },
    { name: "Rohit Mehta", position: "Core Head", image: "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1728720504/ashvamedha/team/zskuba18jbufnnsvjsic.jpg", no: "+91 9119344248" },
  ];

  return (
    <div className="bg-[#151515]">
      <Navbar />
      <div className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="text-center text-4xl font-bold md:text-5xl">
          <span className="text-warm">OUR</span>
          <span className="text-white"> TEAM</span>
        </h2>

        {/* Chief Coordinator Section */}
        <div className="my-16 flex justify-center">
          {chiefCoordinator.map((member) => (
            <TeamCard key={member.name} {...member} />
          ))}
        </div>

        {/* Coordinators Section */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {teamMembers.map((member) => (
            <TeamCard key={member.name} {...member} />
          ))}
        </div>

        {/* Core Heads Section */}
        <div className="mt-20 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {corehead.map((member) => (
            <TeamCard key={member.name} {...member} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default OurTeam;