// Add this directive at the very top of the file
'use client';

import React from "react";
import Image from "next/image"; // Import Next.js Image component
import { useRouter } from "next/navigation"; // Import Next.js router hook

function SportsCard(props) {
  const router = useRouter();

  // A guard clause to prevent rendering if info is missing
  if (!props.info) {
    return null;
  }

  return (
    // The 'group' class enables styling children on parent hover
    <div
      onClick={() => router.push(`/events/${props.info.id}`)}
      className="group relative h-[300px] w-[300px] cursor-pointer overflow-hidden rounded-[20px] border-[3px] border-[#030027] bg-[radial-gradient(#111_50%,#000_100%)] shadow-[0px_3px_16px_#2a2846] transition-all duration-300 ease-out"
    >
      <Image
        src={props.info.imgUrl}
        alt={`${props.info.sportName} event image`}
        fill // Makes the image fill the parent container
        style={{ objectFit: 'cover' }} // Equivalent to object-fit: cover
        className="transition-all duration-300 ease-out group-hover:-translate-y-5 group-hover:scale-110 group-hover:opacity-30"
      />
      <div className="absolute bottom-0 left-0 w-full p-4 text-center text-[#FF6F0F]">
        <h3 className="mb-5 text-3xl font-bold opacity-0 transition-all duration-300 ease-out translate-y-[30px] group-hover:-translate-y-[100px] group-hover:opacity-100">
          {props.info.sportName}
        </h3>
      </div>
    </div>
  );
}

export default SportsCard;