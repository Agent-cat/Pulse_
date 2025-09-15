import "./BloodDonors.css";
const About = () => {
  return (
    <div className=" min-h-screen bg-black text-white font-sans overflow-hidden relative blood-donors-background">
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-green-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-[30%] right-[10%] w-64 h-64 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[20%] left-[20%] w-64 h-64 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <section className="container mx-auto p-4 relative z-10">
        {/* Hero Section */}
        <div className="relative flex flex-col items-center justify-center min-h-[50vh] text-center mb-24">
          <div className="relative inline-block px-10 py-5 rounded-[50px] bg-white bg-opacity-5 backdrop-blur-md border border-white border-opacity-20 shadow-lg">
            <h1 className="text-6xl md:text-8xl font-bold text-green-400 tracking-wider">
              ABOUT US
            </h1>
            <svg
              className="absolute inset-0 top-4 w-full h-full"
              viewBox="0 0 124 52"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="stroke-green-400"
                d="M0.5 36.5H84L86.5 27.5L89 51L90.5 1L94 41.5L96.5 36.5H124"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
        </div>

        <div className="p-8 my-16 bg-[#1a1a1a] rounded-tl-[100px] rounded-br-[100px] shadow-lg flex flex-col md:flex-row items-center gap-8 border-l-4 border-green-500 transform transition-transform hover:scale-[1.01]">
          <div className="w-full md:w-1/3">
            <img
              src="/img/image.png"
              alt="KL University Logo"
              className="w-full h-auto rounded-2xl object-contain"
            />
          </div>
          <div className="w-full md:w-2/3 text-center md:text-left">
            <h2 className="text-4xl font-bold mb-4">
              About <span className="text-green-500">KL ECE</span>
            </h2>
            <p className="text-lg text-gray-300">
              The K L college of engineering has attained autonomous status in
              the year 2006 and in February 2009, the Koneru Lakshmaiah
              Education Foundation Society was recognised as Deemed to be
              University. In short Koneru Lakshmaiah Education Foundation is
              named as K L (Deemed to be) university. K L (Deemed to be)
              university has been awarded the Highest-grade A++ by NAAC. It has
              been approved by all India Council for technical Education, New
              Delhi. A State-of-the-art Data centre with advanced servers
              provides a highly interactive learning environment with
              full-fledged hardware and software training facilities.
            </p>
          </div>
        </div>

        {/* About PULSE Section */}
        <div className="p-8 my-16 bg-[#1a1a1a] rounded-tr-[100px] rounded-bl-[100px] shadow-lg flex flex-col-reverse md:flex-row items-center gap-8 border-r-4 border-green-400 transform transition-transform hover:scale-[1.01]">
          <div className="w-full md:w-2/3 text-center md:text-left">
            <h2 className="text-4xl font-bold mb-4">
              About <span className="text-green-400">PULSE</span>
            </h2>
            <p className="text-lg text-gray-300">
              The student body of the Department of Electronics and
              Communication Engineering [ECE] PULSE, is a small effort to
              recognize great talents, a platform to enhance and nurture one's
              skills, a path for students to progress. It is not only an
              opportunity for students to enhance their talents but also on the
              whole It's a place to find something which can give value and
              meaning to the student life. As the name goes P-U-L-S-E, it powers
              every strand in your body and leaves you with a stimulation to
              work every-day with the goal and determination to stand out in the
              crowd and get success. Team Pulse has been conducting critically
              acclaimed flagship events year on year, such as the Idol of ECE,
              Treasure hunt, Tejomayam, Iconic Engineer, Project Expo and
              Renovate for students of Electronics department.
            </p>
          </div>
          <div className="w-full md:w-1/3">
            <img
              src="/img/pulse-logo.png"
              alt="PULSE Logo"
              className="w-full rounded-xl h-auto object-contain"
            />
          </div>
        </div>

        {/* About Zrotriya Section */}
        <div className="p-8 my-16 bg-[#1a1a1a] rounded-tl-[100px] rounded-br-[100px] shadow-lg flex flex-col md:flex-row items-center gap-8 border-l-4 border-green-500 transform transition-transform hover:scale-[1.01]">
          <div className="w-full md:w-1/3">
            <img
              src="/img/zot.png"
              alt="Zrotriya Logo"
              className="w-full h-72 object-contain"
            />
          </div>
          <div className="w-full md:w-2/3 text-center md:text-left">
            <h2 className="text-4xl font-bold mb-4">
              About <span className="text-green-500">Zrotriya</span>
            </h2>
            <p className="text-lg text-gray-300">
              [Note: This text is a placeholder. Please replace it with content
              specific to Zrotriya.] The K L college of engineering has attained
              autonomous status in the year 2006 and in February 2009, the
              Koneru Lakshmaiah Education Foundation Society was recognised as
              Deemed to be University. In short Koneru Lakshmaiah Education
              Foundation is named as K L (Deemed to be) university. K L (Deemed
              to be) university has been awarded the Highest-grade A++ by NAAC.
              It has been approved by all India Council for technical Education,
              New Delhi. A State-of-the-art Data centre with advanced servers
              provides a highly interactive learning environment with
              full-fledged hardware and software training facilities.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="p-8 text-center text-gray-500">
        <p>&copy; 2025 Pulse. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
