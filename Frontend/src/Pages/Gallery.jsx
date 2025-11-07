import DomeGallery from "../Components/DomeGallery";

const Gallery = () => {
  return (
    <div className="w-full h-screen bg-black text-white">
      <DomeGallery minRadius={900} />
    </div>
  );
};

export default Gallery;
