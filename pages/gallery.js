import React from "react";
import Footer from "../components/footer.js";
import Navbar from "../components/navbar.js";
import SportGallery from "../components/sportGallery.js";

function Gallery() {
  return (
    // The background color from your SCSS has been applied here.
    <div className="bg-[#151515]">
      <Navbar />
      <SportGallery />
      <Footer />
    </div>
  );
}

export default Gallery;