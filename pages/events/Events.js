import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Footer from "../../components/footer.js";
import Navbar from "../../components/navbar.js";

function Events() {
  const router = useRouter();

  const sportsInfo = [
    {
      id: 1,
      sportName: "Chess",
      imgUrl:
        "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1727729822/ashvamedha/events/khcpaoug4b1uegv1q22f.jpg",
      desc: "Chess is the art of thinking ahead, of making complex decisions under pressure",
      theme: "warm",
      nameid: "chess",
    },
    {
      id: 2,
      sportName: "Badminton",
      imgUrl:
        "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1728718553/ashvamedha/events/qeyeqi5joaef13p1kkg2.png",
      desc: "Badminton is not only about winning. It's about playing beautiful, memorable games.",
      theme: "cold",
      nameid: "badminton",
    },
    {
      id: 3,
      sportName: "Volleyball",
      imgUrl:
        "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1727729823/ashvamedha/events/bwneqkxvz129rbzbmr00.jpg",
      desc: "Success in volleyball comes not from individual glory but from seamless teamwork",
      theme: "warm",
      nameid: "volleyball",
    },
    {
      id: 4,
      sportName: "Football",
      imgUrl:
        "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1728718553/ashvamedha/events/fwn1aohwqu16an071qcv.png",
      desc: "Success is no accident. It is hard work, perseverance, learning, studying, sacrifice, and most of all, love of what you are doing or learning to do.",
      theme: "cold",
      nameid: "football",
    },
    {
        id: 5,
        sportName: "Basketball",
        imgUrl:
          "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1727729822/ashvamedha/events/rfmuljtun5pabxcdrlou.jpg",
        desc: "Basketball is like photography. If you don't focus, all you have is the negative.",
        theme: "warm",
        nameid: "basketball",
    },
    {
        id: 6,
        sportName: "Table Tennis",
        imgUrl:
          "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1728718553/ashvamedha/events/nllyabnsse2bhzpcezfb.png",
        desc: "The sound of the ball hitting the table is the sound of opportunity. Don't miss your shot.",
        theme: "cold",
        nameid: "tabletennis",
    },
    {
        id: 7,
        sportName: "BGMI",
        imgUrl:
          "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1727729822/ashvamedha/events/gwbnnstk5f6m2so6m4s4.jpg",
        desc: "Every drop brings a new chance; gear up and make your mark in the battlefield .",
        theme: "warm",
        nameid: "bgmi",
    },
    {
        id: 8,
        sportName: "GYM and WeighLifting",
        imgUrl:
          "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1728721504/ashvamedha/events/dhsxh0cezuu09f1z9zyo.jpg",
        desc: "Every rep is a step closer to becoming the strongest version of yourself",
        theme: "cold",
        nameid: "gym",
    },
    {
        id: 9,
        sportName: "Athletics",
        imgUrl:
          "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1727729822/ashvamedha/events/wdxnqj88su8gu4gus0fc.jpg",
        desc: "Run with purpose, leap with passion, and let every stride take you closer to your dreams.",
        theme: "warm",
        nameid: "athletics",
    },
    {
        id: 10,
        sportName: "Lawn Tennis",
        imgUrl:
          "https://res.cloudinary.com/backend-project-chai-aur-code/image/upload/v1728895226/ashvamedha/events/yaocywewl3qdfk26lnha.jpg",
        desc: "In tennis, every point is a battle, and every match is a journey toward excellence and self-discovery.",
        theme: "cold",
        nameid: "lawntennis",
    },
  ];

  const baseButtonClasses = "m-1 w-44 rounded-lg border bg-transparent px-6 py-3 text-lg font-medium transition-all duration-300 ease-in";
  const warmButtonClasses = "border-warm text-warm hover:bg-warm hover:text-white";
  const coldButtonClasses = "border-cold text-cold hover:bg-cold hover:text-white";

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#151515] text-white">
        <h2 className="flex w-full items-center justify-center pt-10 text-4xl font-bold md:text-5xl">
          <span className="text-warm mr-3">OUR</span>
          <span className="text-white">EVENTS</span>
        </h2>

        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-12">
          {sportsInfo.map((item) => {
            const buttonThemeClass = item.theme === 'warm' ? warmButtonClasses : coldButtonClasses;
            return (
              <div
                key={item.id}
                className="my-10 flex w-full flex-col items-center gap-8 md:flex-row md:justify-around md:odd:flex-row-reverse"
              >
                <div className="relative h-64 w-64 flex-shrink-0 md:h-96 md:w-96">
                  <Image 
                    src={item.imgUrl} 
                    alt={item.sportName}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-2xl border-4 border-white" 
                  />
                </div>
                <div className="flex h-auto w-full flex-col justify-evenly gap-y-6 text-center md:h-80 md:w-[550px]">
                  <div className={`text-3xl font-medium uppercase ${item.theme === 'warm' ? 'text-warm' : 'text-cold'}`}>
                    {item.sportName}
                  </div>
                  <div className="text-lg italic md:text-xl">"{item.desc}"</div>
                  <div className="flex flex-wrap items-center justify-center">
                    <button
                      onClick={() => {
                        window.scrollTo(0, 0);
                        router.push(`/livescore/${item.nameid.toLowerCase()}`);
                      }}
                      className={`${baseButtonClasses} ${buttonThemeClass}`}
                    >
                      Live Score
                    </button>
                    <button
                      onClick={() => {
                        window.scrollTo(0, 0);
                        router.push(`/Fixtures/Fixtures/${item.nameid.toLowerCase()}`);
                      }}
                      className={`${baseButtonClasses} ${buttonThemeClass}`}
                    >
                      Fixtures
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Events;