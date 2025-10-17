
import AboutUs from "../components/About/aboutUs.js";
import Footer from "../components/footer.js";
import Hero from "../components/Hero/Hero.js";
import Navbar from "../components/navbar.js";
import React from "react";
import HomeGallery from "../components/homegallery.js";

function Home() {
  return (
    <div className="Home">
      <Navbar />
      <Hero />
      <AboutUs />
      <HomeGallery/>
      <Footer />
    </div>
  );
}
export default Home;
