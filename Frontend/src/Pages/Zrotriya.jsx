import LightRays from "../Components/LightRays";

const Zrotriya = () => {
  return (
    <div className="w-full bg-black pt-20 text-white h-screen ">
      <LightRays
        raysOrigin="top-center"
        raysColor="#ffffff"
        raysSpeed={1.5}
        lightSpread={0.8}
        rayLength={1.2}
        followMouse={true}
        mouseInfluence={0.1}
        noiseAmount={0.1}
        distortion={0.05}
        className="custom-rays"
      />
      <img
        className="w-96 scale-150 h-80 z-50 left-[40%] absolute top-[40%] "
        src="/img/zot.png"
        alt=""
      />
    </div>
  );
};

export default Zrotriya;
