import React from "react";
import DomeGallery from "../Components/DomeGallery";

const Gallery = () => {
  return (
    <div className="w-full h-screen bg-black text-white">
      <DomeGallery minRadius={1400} />
    </div>
  );
};

export default Gallery;
