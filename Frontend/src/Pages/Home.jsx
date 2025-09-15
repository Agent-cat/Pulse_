import Prism from "../Components/Prism";

const Home = () => {
  return (
    <div className="w-full h-screen bg-black blood-donors-background text-white">
      <Prism
        animationType="rotate"
        timeScale={0.5}
        height={3.5}
        baseWidth={5.5}
        scale={3.6}
        hueShift={0}
        colorFrequency={4}
        noise={0}
        glow={0.6}
      />
      <img
        className="w-96 scale-150 h-64 z-50 left-[40%] absolute top-[40%] "
        src="/img/pulse-logo.png"
        alt=""
      />
    </div>
  );
};

export default Home;
