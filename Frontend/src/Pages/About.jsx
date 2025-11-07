import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import "./BloodDonors.css";

const About = () => {
  const heroRef = useRef(null);
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);

  const heroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const section1InView = useInView(section1Ref, { once: true, margin: "-150px" });
  const section2InView = useInView(section2Ref, { once: true, margin: "-150px" });
  const section3InView = useInView(section3Ref, { once: true, margin: "-150px" });
  const section4InView = useInView(section4Ref, { once: true, margin: "-150px" });

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
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 bg-clip-text text-transparent">
                About Us
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
            Follow the branches of our story, from roots to heights
          </motion.p>
        </motion.div>

        {/* Timeline Tree Structure */}
        <div className="relative max-w-6xl mx-auto">
          {/* Vertical Line - Tree Trunk */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 hidden md:block">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="w-full bg-gradient-to-b from-emerald-500 via-green-500 to-emerald-600 rounded-full"
            />
          </div>

          {/* Section 1 - KL ECE (Left Branch) */}
          <motion.div
            ref={section1Ref}
            initial={{ opacity: 0, x: -100 }}
            animate={section1InView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-32"
          >
            {/* Branch Line */}
            <div className="absolute left-1/2 top-1/2 w-1/2 h-0.5 bg-gradient-to-l from-emerald-500 to-transparent hidden md:block" />
            
            {/* Node Circle */}
            <motion.div
              initial={{ scale: 0 }}
              animate={section1InView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-500 border-4 border-black shadow-lg shadow-emerald-500/50">
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-full h-full rounded-full bg-emerald-400/50"
                />
              </div>
            </motion.div>

            <div className="md:w-[calc(50%-4rem)] md:pr-12">
              <motion.div
                whileHover={{ scale: 1.02, x: -10 }}
                className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl rounded-3xl p-8 border border-emerald-500/30 hover:border-emerald-500/60 transition-all duration-500 overflow-hidden shadow-2xl"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/5 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  {/* Number Badge */}
                  <motion.div
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={section1InView ? { rotate: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="inline-block mb-4 px-4 py-2 bg-emerald-500/20 border border-emerald-500/50 rounded-full"
                  >
                    <span className="text-emerald-400 font-bold text-sm">01</span>
                  </motion.div>

                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="relative group/img mb-6">
                      <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-60 transition duration-500" />
                      <img
                        src="/img/image.png"
                        alt="KL University"
                        className="relative w-32 h-32 object-contain transform group-hover/img:scale-110 group-hover/img:rotate-3 transition-all duration-500"
                      />
                    </div>
                    
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                      <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                        KL University
                      </span>
                    </h2>
                  </div>

                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                    The K L college of engineering has attained autonomous status in
                    the year 2006 and in February 2009, the Koneru Lakshmaiah
                    Education Foundation Society was recognised as Deemed to be
                    University. K L (Deemed to be) university has been awarded the
                    Highest-grade A++ by NAAC with State-of-the-art facilities.
                  </p>

                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-emerald-500/20 rounded-tr-3xl" />
                  <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-emerald-500/20 rounded-bl-3xl" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Section 2 - PULSE (Right Branch) */}
          <motion.div
            ref={section2Ref}
            initial={{ opacity: 0, x: 100 }}
            animate={section2InView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-32"
          >
            {/* Branch Line */}
            <div className="absolute right-1/2 top-1/2 w-1/2 h-0.5 bg-gradient-to-r from-green-500 to-transparent hidden md:block" />
            
            {/* Node Circle */}
            <motion.div
              initial={{ scale: 0 }}
              animate={section2InView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block"
            >
              <div className="w-8 h-8 rounded-full bg-green-500 border-4 border-black shadow-lg shadow-green-500/50">
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="w-full h-full rounded-full bg-green-400/50"
                />
              </div>
            </motion.div>

            <div className="md:w-[calc(50%-4rem)] md:ml-auto md:pl-12">
              <motion.div
                whileHover={{ scale: 1.02, x: 10 }}
                className="group relative bg-gradient-to-br from-gray-800/60 to-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-green-500/30 hover:border-green-500/60 transition-all duration-500 overflow-hidden shadow-2xl"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-green-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  {/* Number Badge */}
                  <motion.div
                    initial={{ rotate: 180, opacity: 0 }}
                    animate={section2InView ? { rotate: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="inline-block mb-4 px-4 py-2 bg-green-500/20 border border-green-500/50 rounded-full"
                  >
                    <span className="text-green-400 font-bold text-sm">02</span>
                  </motion.div>

                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="relative group/img mb-6">
                      <div className="absolute -inset-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-60 transition duration-500" />
                      <img
                        src="/img/pulse-logo.png"
                        alt="PULSE"
                        className="relative w-32 h-32 object-contain transform group-hover/img:scale-110 group-hover/img:rotate-3 transition-all duration-500"
                      />
                    </div>
                    
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                      <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                        PULSE ECE
                      </span>
                    </h2>
                  </div>

                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                    The student body of ECE - PULSE, is a platform to recognize
                    great talents and nurture skills. It powers every strand in your
                    body with stimulation to work with determination. We conduct
                    flagship events like Idol of ECE, Treasure Hunt, Tejomayam,
                    Iconic Engineer, and Project Expo year on year.
                  </p>

                  {/* Decorative Corner */}
                  <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-green-500/20 rounded-tl-3xl" />
                  <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-green-500/20 rounded-br-3xl" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Section 3 - Zrotriya (Left Branch) */}
          <motion.div
            ref={section3Ref}
            initial={{ opacity: 0, x: -100 }}
            animate={section3InView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-20"
          >
            {/* Branch Line */}
            <div className="absolute left-1/2 top-1/2 w-1/2 h-0.5 bg-gradient-to-l from-emerald-500 to-transparent hidden md:block" />
            
            {/* Node Circle */}
            <motion.div
              initial={{ scale: 0 }}
              animate={section3InView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-600 border-4 border-black shadow-lg shadow-emerald-600/50">
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  className="w-full h-full rounded-full bg-emerald-500/50"
                />
              </div>
            </motion.div>

            <div className="md:w-[calc(50%-4rem)] md:pr-12">
              <motion.div
                whileHover={{ scale: 1.02, x: -10 }}
                className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl rounded-3xl p-8 border border-emerald-600/30 hover:border-emerald-600/60 transition-all duration-500 overflow-hidden shadow-2xl"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/0 via-emerald-500/5 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  {/* Number Badge */}
                  <motion.div
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={section3InView ? { rotate: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="inline-block mb-4 px-4 py-2 bg-emerald-600/20 border border-emerald-600/50 rounded-full"
                  >
                    <span className="text-emerald-400 font-bold text-sm">03</span>
                  </motion.div>

                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="relative group/img mb-6">
                      <div className="absolute -inset-2 bg-gradient-to-r from-emerald-600 to-green-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-60 transition duration-500" />
                      <img
                        src="/img/zot.png"
                        alt="Zrotriya"
                        className="relative w-32 h-32 object-contain transform group-hover/img:scale-110 group-hover/img:rotate-3 transition-all duration-500"
                      />
                    </div>
                    
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                      <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
                        Zrotriya
                      </span>
                    </h2>
                  </div>

                  <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
                    Zrotriya represents innovation and excellence in the ECE
                    department. With a focus on cutting-edge technology and student
                    development, we create an environment for learning and growth,
                    fostering technical expertise and leadership skills among
                    students.
                  </p>

                  {/* Decorative Corner */}
                  <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-emerald-600/20 rounded-tr-3xl" />
                  <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-emerald-600/20 rounded-bl-3xl" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Section 4 - Website Developers (Right Branch) */}
          <motion.div
            ref={section4Ref}
            initial={{ opacity: 0, x: 100 }}
            animate={section4InView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mb-20"
          >
            {/* Branch Line */}
            <div className="absolute right-1/2 top-1/2 w-1/2 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent hidden md:block" />
            
            {/* Node Circle */}
            <motion.div
              initial={{ scale: 0 }}
              animate={section4InView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block"
            >
              <div className="w-8 h-8 rounded-full bg-cyan-500 border-4 border-black shadow-lg shadow-cyan-500/50">
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                  className="w-full h-full rounded-full bg-cyan-400/50"
                />
              </div>
            </motion.div>

            <div className="md:w-[calc(50%-4rem)] md:ml-auto md:pl-12">
              <motion.div
                whileHover={{ scale: 1.02, x: 10 }}
                className="group relative bg-gradient-to-br from-gray-800/60 to-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-cyan-500/30 hover:border-cyan-500/60 transition-all duration-500 overflow-hidden shadow-2xl"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-cyan-500/5 to-blue-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  {/* Number Badge */}
                  <motion.div
                    initial={{ rotate: 180, opacity: 0 }}
                    animate={section4InView ? { rotate: 0, opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="inline-block mb-4 px-4 py-2 bg-cyan-500/20 border border-cyan-500/50 rounded-full"
                  >
                    <span className="text-cyan-400 font-bold text-sm">04</span>
                  </motion.div>

                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="relative group/img mb-6">
                      <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-60 transition duration-500" />
                      <div className="relative w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center transform group-hover/img:scale-110 group-hover/img:rotate-3 transition-all duration-500 border border-cyan-500/30">
                        <svg className="w-20 h-20 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                      </div>
                    </div>
                    
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                      <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                        Website Developers
                      </span>
                    </h2>
                  </div>

                  <div className="space-y-4 text-gray-300 text-sm sm:text-base">
                    <p className="leading-relaxed">
                      This website is crafted and maintained by talented students who combine their technical skills with creative vision.
                    </p>

                    {/* Developer Cards */}
                    <div className="space-y-3 mt-6">
                      {/* Developer 1 */}
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-4 p-4 bg-black/30 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300"
                      >
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          BP
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold text-base">Bhanuprakash Peddi</h3>
                          <p className="text-cyan-400 text-xs">Full-Stack Developer</p>
                          <p className="text-gray-400 text-xs mt-1">React.js • Tailwind CSS • UI/UX</p>
                        </div>
                        <div className="flex gap-2">
                          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-full flex items-center justify-center transition-colors">
                            <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          </a>
                          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-full flex items-center justify-center transition-colors">
                            <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                          </a>
                        </div>
                      </motion.div>

                      {/* Developer 2 */}
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-4 p-4 bg-black/30 rounded-xl border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300"
                      >
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                          AK
                        </div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold text-base">Vishnu Vardhan</h3>
                          <p className="text-cyan-400 text-xs">Full-Stack Developer</p>
                          <p className="text-gray-400 text-xs mt-1">React.js • Tailwind CSS • UI/UX</p>
                        </div>
                        <div className="flex gap-2">
                          <a href="https://github.com/Agent-cat" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-full flex items-center justify-center transition-colors">
                            <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          </a>
                          <a href="https://linkedin.com/in/anirudhkota" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-cyan-500/10 hover:bg-cyan-500/20 rounded-full flex items-center justify-center transition-colors">
                            <svg className="w-4 h-4 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                          </a>
                        </div>
                      </motion.div>
                    </div>

                    <p className="text-gray-400 text-xs text-center mt-6 italic">
                      Built with ❤️ using React.js, Framer Motion, and Tailwind CSS
                    </p>
                  </div>

                  {/* Decorative Corner */}
                  <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-cyan-500/20 rounded-tl-3xl" />
                  <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-cyan-500/20 rounded-br-3xl" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
