import React from "react";
import { useRouter } from "next/router";

// Components
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import FixtureCard1 from "../../components/FixtureCard/FixtureCard1";
import FixtureCard2 from "../../components/FixtureCard/FixtureCard2";

// Data
import { fixtures } from "../../constant";

export default function FixturesPage() {
  const router = useRouter();
  const { sportname } = router.query;

  // 1. Wait until router and sportname are ready
  if (!router.isReady || !sportname) {
    return (
      <div className="flex min-h-screen items-center justify-center text-center text-xl">
        Loading...
      </div>
    );
  }

  // 2. Determine card type
  const sportsWithCardType2 = ["athletics", "gym", "bgmi"];
  const cardType = sportsWithCardType2.includes(sportname.toLowerCase()) ? 2 : 1;

  // 3. Get today's fixtures
  const today = `day${new Date().getDate()}`;
  const todaysFixtures = fixtures?.[today]?.[sportname.toLowerCase()] || [];

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen flex-col items-center justify-center text-center px-4">
        {todaysFixtures.length > 0 ? (
          <>
            <h1 className="mb-5 mt-16 text-2xl font-bold uppercase md:text-3xl">
              {sportname.charAt(0).toUpperCase() + sportname.slice(1)} Fixtures
            </h1>

            {todaysFixtures.map((item, index) => (
              <div key={index} className="my-2.5 w-full max-w-3xl">
                {cardType === 1 ? (
                  <FixtureCard1 match={item} />
                ) : (
                  <FixtureCard2 match={item} />
                )}
              </div>
            ))}
          </>
        ) : (
          <h1 className="text-2xl font-bold md:text-3xl mt-16">
            No Fixtures Available for {sportname.charAt(0).toUpperCase() + sportname.slice(1)} Today
          </h1>
        )}
      </div>
      <Footer />
    </div>
  );
}
