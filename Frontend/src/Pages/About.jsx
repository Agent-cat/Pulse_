import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import "./BloodDonors.css";

const About = () => {
  const heroRef = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const section1InView = useInView(section1Ref, { once: true, margin: "-100px" });
  const section2InView = useInView(section2Ref, { once: true, margin: "-100px" });
  const section3InView = useInView(section3Ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-[10%] left-[5%] w-96 h-96 bg-emerald-500/20 rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-[30%] right-[10%] w-96 h-96 bg-green-400/20 rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-[20%] left-[20%] w-96 h-96 bg-white/10 rounded-full filter blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Hero Section */}
        <motion.div
          ref={heroRef}
          initial={{ opacity: 0, y: -50 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex flex-col items-center justify-center min-h-[50vh] text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={heroInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 bg-clip-text text-transparent">
                ABOUT US
              </span>
            </h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={heroInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl"
          >
            Discover our journey, mission, and the passion that drives us forward
          </motion.p>
        </motion.div>

        {/* KL ECE Section */}
        <motion.div
          ref={section1Ref}
          variants={containerVariants}
          initial="hidden"
          animate={section1InView ? "visible" : "hidden"}
          className="mb-24"
        >
          <motion.div
            variants={itemVariants}
            className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-500 overflow-hidden"
          >
            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-green-500/0 group-hover:from-emerald-500/5 group-hover:to-green-500/5 transition-all duration-500 rounded-3xl" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <motion.div
                variants={imageVariants}
                className="w-full md:w-1/3"
              >
                <div className="relative group/img">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl blur opacity-25 group-hover/img:opacity-50 transition duration-500" />
                  <img
                    src="/img/image.png"
                    alt="KL University Logo"
                    className="relative w-full h-auto rounded-2xl object-contain transform group-hover/img:scale-105 transition-transform duration-500"
                  />
                </div>
              </motion.div>
              
              <motion.div
                variants={itemVariants}
                className="w-full md:w-2/3 text-center md:text-left"
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                  About{" "}
                  <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                    KL ECE
                  </span>
                </h2>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
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
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* About PULSE Section */}
        <motion.div
          ref={section2Ref}
          variants={containerVariants}
          initial="hidden"
          animate={section2InView ? "visible" : "hidden"}
          className="mb-24"
        >
          <motion.div
            variants={itemVariants}
            className="group relative bg-gradient-to-br from-gray-800/30 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-green-400/20 hover:border-green-400/50 transition-all duration-500 overflow-hidden"
          >
            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-400/0 to-emerald-500/0 group-hover:from-green-400/5 group-hover:to-emerald-500/5 transition-all duration-500 rounded-3xl" />
            
            <div className="relative z-10 flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
              <motion.div
                variants={itemVariants}
                className="w-full md:w-2/3 text-center md:text-left"
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                  About{" "}
                  <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                    PULSE
                  </span>
                </h2>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
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
              </motion.div>
              
              <motion.div
                variants={imageVariants}
                className="w-full md:w-1/3"
              >
                <div className="relative group/img">
                  {/* <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur opacity-25 group-hover/img:opacity-50 transition duration-500" /> */}
                  <img
                    src="/img/pulse-logo.png"
                    alt="PULSE Logo"
                    className="relative w-full h-auto rounded-2xl object-contain transform group-hover/img:scale-105 transition-transform duration-500"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* About Zrotriya Section */}
        <motion.div
          ref={section3Ref}
          variants={containerVariants}
          initial="hidden"
          animate={section3InView ? "visible" : "hidden"}
          className="mb-24"
        >
          <motion.div
            variants={itemVariants}
            className="group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-500 overflow-hidden"
          >
            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 to-green-500/0 group-hover:from-emerald-500/5 group-hover:to-green-500/5 transition-all duration-500 rounded-3xl" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <motion.div
                variants={imageVariants}
                className="w-full md:w-1/3"
              >
                <div className="relative group/img">
                  {/* <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl blur opacity-25 group-hover/img:opacity-50 transition duration-500" /> */}
                  <img
                    src="/img/zot.png"
                    alt="Zrotriya Logo"
                    className="relative w-full h-64 object-contain transform group-hover/img:scale-105 transition-transform duration-500"
                  />
                </div>
              </motion.div>
              
              <motion.div
                variants={itemVariants}
                className="w-full md:w-2/3 text-center md:text-left"
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                  About{" "}
                  <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                    Zrotriya
                  </span>
                </h2>
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
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
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative z-10 p-8 text-center"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
            className="h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent mb-8"
          />
          <p className="text-gray-400 text-sm sm:text-base">
            &copy; 2025 Pulse. All rights reserved.
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default About;
