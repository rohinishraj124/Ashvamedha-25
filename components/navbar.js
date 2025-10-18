import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { IoClose, IoMenu } from "react-icons/io5";

// Make sure the path to your logo is correct
import ashvamedhaLogo from "../assests/demoPhotos/ashvamedhaLogo.png";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const menuData = [
    { title: "Home", path: "/" },
    { title: "Events", path: "/events/Events" },
    { title: "Team", path: "/ourTeam" },
    { title: "Gallery", path: "/gallery" },
    { title: "Leaderboard", path: "/leader" },
  ];

  const handleNavigation = (path) => {
    window.scrollTo(0, 0);
    router.push(path);
    setIsMobileMenuOpen(false); // Close mobile menu on navigation
  };

  const baseLinkClasses = "text-lg font-medium text-white capitalize transition-colors duration-200 hover:text-warm cursor-pointer";

  return (
    <nav className="sticky top-0 left-0 z-[100] h-[70px] w-full bg-black">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <div 
          className="relative h-12 w-14 cursor-pointer"
          onClick={() => handleNavigation('/')}
        >
          <Image
            src={ashvamedhaLogo}
            alt="Ashvamedha Logo"
            layout="fill"
            objectFit="contain"
          />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden h-full items-center justify-center gap-x-8 lg:flex">
          {menuData.map((item) => (
            <li key={item.title}>
              <button onClick={() => handleNavigation(item.path)} className={baseLinkClasses}>
                {item.title}
              </button>
            </li>
          ))}
          <li>
            <a href="https://drive.google.com/file/d/1q8wArG5pp0X8n_0Oql9BiVH1CTC_lQAn/view?usp=sharing" target="_blank" rel="noopener noreferrer" className={baseLinkClasses}>
              Brochure
            </a>
          </li>
          <li>
            <a href="https://drive.google.com/file/d/1InFTI3Zu8qfCHNtCNvprIHpEpjz94Xjg/view?usp=sharing" target="_blank" rel="noopener noreferrer" className={baseLinkClasses}>
              Rulebook
            </a>
          </li>
          <li>
            <button onClick={() => handleNavigation('/Admin/home')} className={baseLinkClasses}>
              Admin
            </button>
          </li>
        </ul>

        {/* Hamburger Icon */}
        <div className="lg:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? (
              <IoClose className="h-8 w-8 text-white" />
            ) : (
              <IoMenu className="h-8 w-8 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 w-full border-t border-gray-800 bg-black/95 backdrop-blur-sm lg:hidden">
          <ul className="flex flex-col items-center gap-y-6 py-8">
            {menuData.map((item) => (
              <li key={item.title}>
                <button onClick={() => handleNavigation(item.path)} className={baseLinkClasses}>
                  {item.title}
                </button>
              </li>
            ))}
            <li>
                <a href="https://drive.google.com/file/d/1q8wArG5pp0X8n_0Oql9BiVH1CTC_lQAn/view?usp=sharing" target="_blank" rel="noopener noreferrer" className={baseLinkClasses}>
                  Brochure
                </a>
            </li>
            <li>
                <a href="https://drive.google.com/file/d/1InFTI3Zu8qfCHNtCNvprIHpEpjz94Xjg/view?usp=sharing" target="_blank" rel="noopener noreferrer" className={baseLinkClasses}>
                  Rulebook
                </a>
            </li>
            <li>
                <button onClick={() => handleNavigation('/Admin/home')} className={baseLinkClasses}>
                  Admin
                </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;