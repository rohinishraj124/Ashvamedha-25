import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BiCopyright, BiSolidPhoneCall } from "react-icons/bi";
import { FaFacebookSquare, FaInstagram, FaLinkedin } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";

function Footer() {
  const socialLinks = [
    {
      name: "Instagram",
      icon: FaInstagram,
      url: "https://www.instagram.com/ashvamedha_iitbbs/",
      colorClass: "text-[#d11cd1]",
    },
    {
      name: "Facebook",
      icon: FaFacebookSquare,
      url: "https://www.facebook.com/AshvamedhaIITBBS/",
      colorClass: "text-[#1a489e]",
    },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      url: "https://www.linkedin.com/company/ashvamedha-iit-bhubaneswar/mycompany/",
      colorClass: "text-[#1352aa]",
    },
  ];

  return (
    <footer className="w-full border-t-2 border-gray-200 bg-[#151515] text-white">
      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* Main content section */}
        <div className="flex flex-col items-center justify-center text-center lg:flex-row lg:justify-around lg:text-left">
          {/* Left Side: Title, Desc, Socials */}
          <div className="mb-10 lg:mb-0">
            <h1 className="mb-2 text-4xl font-bold">
              <span className="text-warm">ASHVA</span>
              <span>MEDHA</span>
            </h1>
            <h2 className="mb-6 text-lg text-footer-text">
              The Annual Sports Fest of IIT Bhubaneswar
            </h2>
            <div className="flex items-center justify-center gap-4 lg:justify-start">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-lg border-2 border-footer-text transition-transform duration-300 ease-in-out hover:scale-125 hover:brightness-90"
                  >
                    <Icon className={`h-7 w-7 ${social.colorClass}`} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right Side: Address */}
          <div className="w-full max-w-md lg:w-auto">
            <h2 className="mb-4 text-2xl font-semibold">Address</h2>
            <p className="mb-3 flex items-center justify-center text-lg text-footer-text lg:justify-start">
              <HiLocationMarker className="mr-3 h-7 w-7 flex-shrink-0" />
              <span>Gymkhana Office, IIT Bhubaneswar</span>
            </p>
            <p className="mb-3 flex items-center justify-center text-lg text-footer-text lg:justify-start">
              <BiSolidPhoneCall className="mr-3 h-7 w-7 flex-shrink-0" />
              <span>+91 7976512192</span>
            </p>
            <p className="flex items-center justify-center text-lg text-footer-text lg:justify-start">
              <AiOutlineMail className="mr-3 h-7 w-7 flex-shrink-0" />
              <span>coord.ashvamedha@iitbbs.ac.in</span>
            </p>
          </div>
        </div>

        {/* Copyright section */}
        <div className="mt-10 border-t-2 border-white/30 pt-6">
          <div className="flex items-center justify-center text-base text-footer-text">
            <BiCopyright className="mr-2" />
            <p>
              Ashvamedha, <span>All Rights Reserved.</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;