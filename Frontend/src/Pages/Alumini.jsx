import { useState } from "react";

import { Alumini2024, Alumini2023, Alumini2022 } from "../Constants/team";
import ProfileCard from "../Components/ProfileCard";

const Alumini = () => {
  const [activeYear, setActiveYear] = useState("2024");

  const alumniData = {
    2024: Alumini2024,
    2023: Alumini2023,
    2022: Alumini2022,
  };

  return (
    <div className="w-full min-h-screen blood-donors-background bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 bg-clip-text text-transparent">
              Alumni Gallery
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Meet our distinguished alumni who have made their mark
          </p>
        </div>

        {/* Year Selection Buttons */}
        <div className="flex justify-center mb-12 space-x-4">
          <div className="absolute top-[10%]  left-[5%] w-64 h-64 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <button
            onClick={() => setActiveYear("2022")}
            className={`px-6 py-2 rounded-full text-lg font-semibold transition-colors duration-300 ${
              activeYear === "2022"
                ? "bg-white text-black"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            2022
          </button>
          <button
            onClick={() => setActiveYear("2023")}
            className={`px-6 py-2 rounded-full text-lg font-semibold transition-colors duration-300 ${
              activeYear === "2023"
                ? "bg-white text-black"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            2023
          </button>
          <button
            onClick={() => setActiveYear("2024")}
            className={`px-6 py-2 rounded-full text-lg font-semibold transition-colors duration-300 ${
              activeYear === "2024"
                ? "bg-white text-black"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
            }`}
          >
            2024
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10">
          {alumniData[activeYear].map((member) => (
            <ProfileCard
              key={member.name}
              title={member.role}
              handle={member.name}
              contactText="Contact Me"
              avatarUrl={member.image}
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => {}}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Alumini;
