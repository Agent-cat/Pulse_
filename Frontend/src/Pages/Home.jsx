import LogoLoop from "../Components/LogoLoop";
import Prism from "../Components/Prism";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";

const Home = () => {
  const clubLogos = [
    { src: "/img/home1.webp", alt: "Club 1", href: "#" },
    { src: "/img/home2.webp", alt: "Club 2", href: "#" },
    { src: "/img/home3.webp", alt: "Club 3", href: "#" },
    { src: "/img/home4.webp", alt: "Club 4", href: "#" },
    { src: "/img/home1.webp", alt: "Club 5", href: "#" },
    { src: "/img/home1.webp", alt: "Club 6", href: "#" },
    { src: "/img/home1.webp", alt: "Club 7", href: "#" },
    { src: "/img/home1.webp", alt: "Club 8", href: "#" },
    { src: "/img/home1.webp", alt: "Club 9", href: "#" },
    { src: "/img/home1.webp", alt: "Club 10", href: "#" },
  ];
  return (
    <>
      <div className="w-full h-screen bg-black text-white ">
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
          className="relative w-48 sm:w-64 md:w-80 lg:w-96 scale-100 sm:scale-125 md:scale-150 h-32 sm:h-48 md:h-64  left-1/2 -translate-x-1/2  -top-[50%] -translate-y-1/2 z-20"
          src="/img/pulse-logo.png"
          alt="Pulse Logo"
        />
      </div>

      {/* Clubs Section */}
      <div className="w-full bg-black text-white py-16 px-4 sm:px-8 md:px-16 relative overflow-hidden border-t border-green-500/20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 bg-clip-text text-transparent">
            Our Clubs
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Explore the diverse community of clubs that make Pulse vibrant and dynamic
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <LogoLoop
            logos={clubLogos}
            speed={80}
            direction="left"
            logoHeight={120}
            gap={40}
            pauseOnHover
            scaleOnHover
            fadeOut
            fadeOutColor="#000000"
            ariaLabel="Pulse Clubs"
          />
        </motion.div>
      </div>

      <div className="w-full min-h-screen bg-black text-white py-20 px-4 sm:px-8 md:px-16 relative overflow-hidden">
        {/* Animated Green Blur Balls Background */}


        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, -120, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 right-1/3 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl"
        />

        {/* Content with relative positioning to stay above blur balls */}
        <div className="relative z-10">


          {/* Image Section 1 - Left Image, Right Text */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className="grid md:grid-cols-2 gap-8 items-center mb-20"
          >
            <div className="overflow-hidden rounded-lg shadow-2xl shadow-green-500/20 border border-green-500/20">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                src="/img/home1.webp"
                alt="Pulse Club Innovation"
                className="w-full h-[400px] object-cover"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-green-400">
                Innovation Hub
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                At Pulse Club, we foster a culture of innovation and creativity. Our members collaborate on cutting-edge projects, pushing the boundaries of technology and design to create solutions that matter.
              </p>
            </motion.div>
          </motion.div>

          {/* Image Section 2 - Right Image, Left Text */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className="grid md:grid-cols-2 gap-8 items-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-4 md:order-1"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-emerald-400">
                Community Driven
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Join a vibrant community of like-minded individuals who share your passion for technology. Network, learn, and grow together through workshops, hackathons, and collaborative projects.
              </p>
            </motion.div>
            <div className="overflow-hidden rounded-lg shadow-2xl shadow-emerald-500/20 border border-emerald-500/20 md:order-2">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                src="/img/home2.webp"
                alt="Pulse Club Community"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </motion.div>

          {/* Image Section 3 - Left Image, Right Text */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className="grid md:grid-cols-2 gap-8 items-center mb-20"
          >
            <div className="overflow-hidden rounded-lg shadow-2xl shadow-lime-500/20 border border-lime-500/20">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                src="/img/home3.webp"
                alt="Pulse Club Learning"
                className="w-full h-[400px] object-cover"
              />
            </div>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-lime-400">
                Learn & Grow
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Access exclusive workshops, mentorship programs, and learning resources. Whether you're a beginner or an expert, Pulse Club provides the perfect environment to enhance your skills and knowledge.
              </p>
            </motion.div>
          </motion.div>

          {/* Image Section 4 - Right Image, Left Text */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className="grid md:grid-cols-2 gap-8 items-center mb-20"
          >
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-4 md:order-1"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-teal-400">
                Build Together
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Transform your ideas into reality with the support of our talented community. From concept to deployment, Pulse Club provides the resources, guidance, and collaboration you need to succeed.
              </p>
            </motion.div>
            <div className="overflow-hidden rounded-lg shadow-2xl shadow-teal-500/20 border border-teal-500/20 md:order-2">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                src="/img/home4.webp"
                alt="Pulse Club Building"
                className="w-full h-[400px] object-cover"
              />
            </div>
          </motion.div>

          {/* Call to Action */}

        </div>
      </div>
    </>

  );
};

export default Home;
