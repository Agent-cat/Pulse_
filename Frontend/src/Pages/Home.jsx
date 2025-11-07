import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Prism from "../Components/Prism";
import LazyImage from "../Components/LazyImage";
import InteractiveClubCard from "../Components/InteractiveClubCard";
import FeaturedCarousel from "../Components/FeaturedCarousel";

const Home = () => {
  // ECE domains organized by Pulse
  const clubs = [
    {
      name: "VLSI Design",
      image: "/src/assets/demoClub.png",
      description: "Mastering chip design, digital circuits, and semiconductor technology",
      icon: "�",
      upcomingEvent: "VLSI Workshop - Dec 15",
      members: "180+",
      events: "12+",
    },
    {
      name: "Embedded Systems",
      image: "/src/assets/demoClub.png",
      description: "Building IoT devices, microcontrollers, and real-time systems",
      icon: "📡",
      upcomingEvent: "IoT Hackathon - Dec 20",
      members: "220+",
      events: "15+",
    },
    {
      name: "Signal Processing",
      image: "/src/assets/demoClub.png",
      description: "Exploring DSP, image processing, and communication systems",
      icon: "📊",
      upcomingEvent: "DSP Challenge - Jan 10",
      members: "150+",
      events: "10+",
    },
    {
      name: "RF & Wireless",
      image: "/src/assets/demoClub.png",
      description: "Working on antenna design, 5G, and wireless communications",
      icon: "📶",
      upcomingEvent: "5G Tech Talk - Dec 28",
      members: "130+",
      events: "8+",
    },
    {
      name: "PCB Design & Fab",
      image: "/src/assets/demoClub.png",
      description: "Designing and fabricating printed circuit boards for real-world projects",
      icon: "🔌",
      upcomingEvent: "PCB Workshop - Jan 5",
      members: "160+",
      events: "14+",
    },
    {
      name: "Power Electronics",
      image: "/src/assets/demoClub.png",
      description: "Studying power systems, converters, and renewable energy solutions",
      icon: "⚡",
      upcomingEvent: "Power Seminar - Jan 12",
      members: "140+",
      events: "9+",
    },
  ];

  // Featured ECE events/activities for carousel
  const featuredItems = [
    {
      image: "/img/home1.webp",
      title: "ECE Innovation Expo 2025",
      description: "Showcase your VLSI designs, embedded projects, and communication systems. Win prizes worth $10,000",
      badge: "Featured Event",
      date: "December 15-17, 2025",
    },
    {
      image: "/img/home2.webp",
      title: "Industry Connect: Semiconductor",
      description: "Network with chip design engineers and learn about careers in VLSI, IC design, and semiconductor technology",
      badge: "Upcoming",
      date: "January 20, 2025",
    },
    {
      image: "/img/home3.webp",
      title: "Hardware Hackathon",
      description: "Build real-world IoT devices, embedded systems, and electronic circuits in 48 hours",
      badge: "Registration Open",
      date: "February 5, 2025",
    },
    {
      image: "/img/home4.webp",
      title: "PCB Design Bootcamp",
      description: "Learn professional PCB layout, schematic design, and circuit simulation from industry experts",
      badge: "Limited Seats",
      date: "January 15, 2025",
    },
    {
      image: "/img/home1.webp",
      title: "Robotics & Automation Workshop",
      description: "Hands-on experience with robotic systems, motor control, and automated circuit design",
      badge: "New Event",
      date: "February 20, 2025",
    },
    {
      image: "/img/home2.webp",
      title: "5G Technology Seminar",
      description: "Deep dive into 5G networks, antenna design, and next-generation wireless communication systems",
      badge: "Tech Talk",
      date: "March 5, 2025",
    },
    {
      image: "/img/home3.webp",
      title: "Embedded Linux Conference",
      description: "Master embedded Linux development, kernel programming, and device driver implementation",
      badge: "Advanced",
      date: "March 15, 2025",
    },
    {
      image: "/img/home4.webp",
      title: "Signal Processing Challenge",
      description: "Compete in real-time DSP applications, audio processing, and image filtering competitions",
      badge: "Competition",
      date: "March 25, 2025",
    },
  ];

  // ECE Alumni testimonials
  const testimonials = [
    {
      name: "Arjun Reddy",
      role: "VLSI Design Engineer, Qualcomm",
      avatar: "AR",
      quote: "Pulse's hands-on VLSI workshops and chip design projects prepared me perfectly for my career in semiconductor industry!",
      color: "from-green-400 to-emerald-500",
    },
    {
      name: "Priya Sharma",
      role: "IoT Solutions Architect, Intel",
      avatar: "PS",
      quote: "Pulse's embedded systems projects gave me practical experience that set me apart in interviews. Now I design IoT systems at Intel!",
      color: "from-blue-400 to-cyan-500",
    },
    {
      name: "Vikram Singh",
      role: "RF Engineer, Nokia",
      avatar: "VS",
      quote: "From signal processing to wireless communications, Pulse's technical activities helped me become an RF engineer at Nokia.",
      color: "from-purple-400 to-pink-500",
    },
  ];

  // ECE Achievement stats
  const stats = [
    { number: "2000+", label: "ECE Students", icon: "👥" },
    { number: "6+", label: "Technical Clubs", icon: "🔬" },
    { number: "50+", label: "Workshops Yearly", icon: "📚" },
    { number: "80+", label: "Hardware Projects", icon: "⚡" },
  ];

  return (
    <>
      {/* Hero Section with Prism and CTA */}
      <div className="relative w-full h-screen bg-black text-white overflow-hidden">
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
          suspendWhenOffscreen={true}
        />
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4 pt-0 pb-16">
          {/* <motion.video
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-48 sm:w-64 md:w-80 lg:w-96 h-auto mb-6"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/img/logo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </motion.video> */}
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            src="/img/pulse-logo.png"
            alt="Pulse Logo"
            className="w-48 sm:w-64 md:w-80 lg:w-96 h-auto mb-6"
          />

          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="text-lg sm:text-xl text-gray-300 text-center max-w-2xl mb-8"
          >
            Official student body of Electronics & Communication Engineering. Organizing events, workshops, and technical activities for ECE students.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.15 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link
              to="/login"
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-black font-bold rounded-full hover:from-green-400 hover:to-emerald-500 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/50"
            >
             Explore
            </Link>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-green-400"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="w-full bg-black py-16 px-4 border-t border-green-500/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Featured Carousel Section */}
      <FeaturedCarousel items={featuredItems} title="Featured Events & Highlights" />

      {/* Faculty Incharges Section */}
      <div className="w-full bg-black text-white py-20 px-4 sm:px-8 md:px-16 relative overflow-hidden border-t border-green-500/20">
        {/* Background Effect */}
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-20 right-20 w-72 h-72 bg-emerald-500/10 rounded-full blur-lg pointer-events-none"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 relative z-10"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 bg-clip-text text-transparent special-font">
            Faculty Incharges of Pulse
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Meet the distinguished faculty members guiding the Pulse ECE student body
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {/* Faculty Card 1 - Dr. M. Suman */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="bg-gradient-to-b from-gray-900 to-black border border-green-500/30 rounded-2xl overflow-hidden shadow-lg shadow-green-500/20 group"
          >
            <div className="relative h-64 overflow-hidden">
              <LazyImage
                src="/src/assets/faculty/dummy.webp"
                alt="Dr. I. Govardhani"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                wrapperClassName="w-full h-full"
                aspectRatio="auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-1 special-font">Dr. I. Govardhani</h3>
              <p className="text-green-400 text-sm font-semibold mb-2">HOD, ECE</p>
              <div className="space-y-1 text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="truncate">govardhani_ec@kluniversity.in</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="bg-gradient-to-b from-gray-900 to-black border border-green-500/30 rounded-2xl overflow-hidden shadow-lg shadow-green-500/20 group"
          >
            <div className="relative h-64 overflow-hidden">
              <LazyImage
                src="/src/assets/faculty/suman.jpg"
                alt="Dr. M. Suman"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                wrapperClassName="w-full h-full"
                aspectRatio="auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-1 special-font">Dr.M.Suman</h3>
              <p className="text-green-400 text-sm font-semibold mb-2">Pulse - Advisory</p>
              <div className="space-y-1 text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="truncate">suman.maloji@kluniversity.in</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Faculty Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="bg-gradient-to-b from-gray-900 to-black border border-green-500/30 rounded-2xl overflow-hidden shadow-lg shadow-green-500/20 group"
          >
            <div className="relative h-64 overflow-hidden">
              <LazyImage
                src="/src/assets/faculty/kavya.jpg"
                alt="Dr. K. Ch. Sri Kavya"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                wrapperClassName="w-full h-full"
                aspectRatio="auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-1 special-font">Dr. K. Ch. Sri Kavya</h3>
              <p className="text-green-400 text-sm font-semibold mb-2">Pulse - Chairperson</p>
              <div className="space-y-1 text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="truncate">kavya@kluniversity.in</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Faculty Card 3 */}
          

          {/* Faculty Card 4 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.02 }}
            className="bg-gradient-to-b from-gray-900 to-black border border-green-500/30 rounded-2xl overflow-hidden shadow-lg shadow-green-500/20 group"
          >
            <div className="relative h-64 overflow-hidden">
              <LazyImage
                src="/src/assets/faculty/srikanth.png"
                alt="Mr. P. Srikanth Reddy"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                wrapperClassName="w-full h-full"
                aspectRatio="auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-1 special-font">Mr. P. Srikanth Reddy</h3>
              <p className="text-green-400 text-sm font-semibold mb-2">Pulse-Incharge</p>
              <div className="space-y-1 text-gray-400 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="truncate">palagani.srikanth@kluniversity.in</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Interactive Clubs Section */}
      <div className="w-full bg-black text-white py-20 px-4 sm:px-8 md:px-16 relative overflow-hidden border-t border-green-500/20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 bg-clip-text text-transparent special-font">
            ECE Technical Domains
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Pulse organizes activities across diverse ECE domains. Explore technical areas that align with your interests.
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club, index) => (
            <InteractiveClubCard key={index} club={club} index={index} />
          ))}
        </div>

        {/* View All Clubs Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/events"
            className="inline-block px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-black font-bold rounded-full hover:from-green-400 hover:to-emerald-500 transition-all duration-300 transform hover:scale-102 shadow-md shadow-green-500/30"
          >
            Explore All Events & Activities
          </Link>
        </motion.div>
      </div>

      {/* Innovation Hub & Community Sections with Visual Storytelling */}
      <div className="w-full min-h-screen bg-black text-white py-20 px-4 sm:px-8 md:px-16 relative overflow-hidden">
        {/* Static Green Blur Ball Background - Better Performance */}
        <div className="absolute bottom-20 right-1/3 w-96 h-96 bg-teal-500/15 rounded-full blur-lg pointer-events-none" />

        {/* Content with relative positioning to stay above blur balls */}
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Image Section 1 - Left Image, Right Text with Testimonial */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2, margin: "0px 0px -100px 0px" }}
            className="grid md:grid-cols-2 gap-12 items-center mb-32"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-green-500/20 border border-green-500/20 group">
              <LazyImage
                src="/img/home1.webp"
                alt="Pulse Club Innovation"
                className="transition-transform duration-200 group-hover:scale-105"
                wrapperClassName="h-[500px]"
                aspectRatio="auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2, margin: "0px 0px -100px 0px" }}
              className="space-y-6"
            >
              <div className="inline-block px-4 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-sm font-semibold">
                � Hardware Innovation
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-green-400 special-font">
                Hardware Innovation
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Pulse organizes workshops and projects in hardware design. From VLSI chips to PCB fabrication, ECE students work on cutting-edge electronic systems that power tomorrow&apos;s technology.
              </p>
              
              {/* Testimonial */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gray-900/50 border border-green-500/20 rounded-xl p-6 backdrop-blur-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-black font-bold text-lg">
                    {testimonials[0].avatar}
                  </div>
                  <div>
                    <p className="text-gray-300 italic mb-3">&ldquo;{testimonials[0].quote}&rdquo;</p>
                    <p className="text-green-400 font-semibold">{testimonials[0].name}</p>
                    <p className="text-gray-500 text-sm">{testimonials[0].role}</p>
                  </div>
                </div>
              </motion.div>

              {/* Stats Pills */}
              <div className="flex flex-wrap gap-3">
                <div className="px-4 py-2 bg-black border border-gray-700 rounded-full text-sm">
                  <span className="text-green-400 font-bold">80+</span>
                  <span className="text-gray-400 ml-1">Hardware Projects</span>
                </div>
                <div className="px-4 py-2 bg-black border border-gray-700 rounded-full text-sm">
                  <span className="text-green-400 font-bold">15+</span>
                  <span className="text-gray-400 ml-1">PCB Designs</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Image Section 2 - Right Image, Left Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2, margin: "0px 0px -100px 0px" }}
            className="grid md:grid-cols-2 gap-12 items-center mb-32"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2, margin: "0px 0px -100px 0px" }}
              className="space-y-6 md:order-1"
            >
              <div className="inline-block px-4 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-semibold">
                🤝 ECE Community
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-emerald-400 special-font">
                Student Community
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Pulse connects ECE students across all years. Collaborate on embedded systems, RF projects, and signal processing challenges. Network with peers, seniors, and industry mentors.
              </p>

              {/* Testimonial */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gray-900/50 border border-emerald-500/20 rounded-xl p-6 backdrop-blur-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center text-black font-bold text-lg">
                    {testimonials[1].avatar}
                  </div>
                  <div>
                    <p className="text-gray-300 italic mb-3">&ldquo;{testimonials[1].quote}&rdquo;</p>
                    <p className="text-emerald-400 font-semibold">{testimonials[1].name}</p>
                    <p className="text-gray-500 text-sm">{testimonials[1].role}</p>
                  </div>
                </div>
              </motion.div>

              {/* Community Highlights */}
              <div className="flex flex-wrap gap-3">
                <div className="px-4 py-2 bg-black border border-gray-700 rounded-full text-sm">
                  <span className="text-emerald-400 font-bold">500+</span>
                  <span className="text-gray-400 ml-1">ECE Members</span>
                </div>
                <div className="px-4 py-2 bg-black border border-gray-700 rounded-full text-sm">
                  <span className="text-emerald-400 font-bold">50+</span>
                  <span className="text-gray-400 ml-1">Technical Workshops</span>
                </div>
              </div>
            </motion.div>
            <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-emerald-500/20 border border-emerald-500/20 md:order-2 group">
              <LazyImage
                src="/img/home2.webp"
                alt="Pulse Club Community"
                className="transition-transform duration-300 group-hover:scale-105"
                wrapperClassName="h-[500px]"
                aspectRatio="auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>

          {/* Image Section 3 - Left Image, Right Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2, margin: "0px 0px -100px 0px" }}
            className="grid md:grid-cols-2 gap-12 items-center mb-32"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-lime-500/20 border border-lime-500/20 group">
              <LazyImage
                src="/img/home3.webp"
                alt="Pulse Club Learning"
                className="transition-transform duration-300 group-hover:scale-105"
                wrapperClassName="h-[500px]"
                aspectRatio="auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2, margin: "0px 0px -100px 0px" }}
              className="space-y-6"
            >
              <div className="inline-block px-4 py-1 bg-lime-500/10 border border-lime-500/30 rounded-full text-lime-400 text-sm font-semibold">
                📚 Technical Learning
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-lime-400 special-font">
                Skill Development
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Pulse conducts workshops on VLSI design tools, embedded programming, circuit simulation, and PCB layout. From Verilog to Arduino, gain hands-on experience with industry-standard technologies.
              </p>

              {/* Progress Indicators / Achievement Badges */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-900/50 border border-lime-500/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-lime-500/20 rounded-full flex items-center justify-center">
                      🏆
                    </div>
                    <div>
                      <p className="text-white font-semibold">Beginner Badge</p>
                      <p className="text-gray-400 text-xs">Complete 3 ECE workshops</p>
                    </div>
                  </div>
                  <span className="text-lime-400 font-bold">✓</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-900/50 border border-lime-500/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-lime-500/20 rounded-full flex items-center justify-center">
                      ⭐
                    </div>
                    <div>
                      <p className="text-white font-semibold">Intermediate Badge</p>
                      <p className="text-gray-400 text-xs">Build 2 hardware projects</p>
                    </div>
                  </div>
                  <div className="w-16 bg-gray-700 rounded-full h-2">
                    <div className="w-2/3 bg-lime-400 h-2 rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-900/50 border border-lime-500/20 rounded-lg opacity-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-lime-500/20 rounded-full flex items-center justify-center">
                      💎
                    </div>
                    <div>
                      <p className="text-white font-semibold">Expert Badge</p>
                      <p className="text-gray-400 text-xs">Lead an ECE workshop</p>
                    </div>
                  </div>
                  <span className="text-gray-500">🔒</span>
                </div>
              </div>

              {/* Testimonial */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gray-900/50 border border-lime-500/20 rounded-xl p-6 backdrop-blur-sm"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-black font-bold text-lg">
                    {testimonials[2].avatar}
                  </div>
                  <div>
                    <p className="text-gray-300 italic mb-3">&ldquo;{testimonials[2].quote}&rdquo;</p>
                    <p className="text-lime-400 font-semibold">{testimonials[2].name}</p>
                    <p className="text-gray-500 text-sm">{testimonials[2].role}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Image Section 4 - Right Image, Left Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2, margin: "0px 0px -100px 0px" }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.2, margin: "0px 0px -100px 0px" }}
              className="space-y-6 md:order-1"
            >
              <div className="inline-block px-4 py-1 bg-teal-500/10 border border-teal-500/30 rounded-full text-teal-400 text-sm font-semibold">
                🛠️ Build Hardware
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-teal-400 special-font">
                Project Support
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Pulse facilitates student projects and provides access to electronics labs, PCB fabrication tools, and testing equipment. Transform your circuit ideas into working prototypes.
              </p>

              {/* Project Highlights */}
              <div className="space-y-3">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-4 bg-gray-900/50 border border-teal-500/20 rounded-lg cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
                    <h4 className="text-white font-semibold">Smart IoT Weather Station</h4>
                  </div>
                  <p className="text-gray-400 text-sm">By ECE Team Alpha • Embedded Systems</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="p-4 bg-gray-900/50 border border-teal-500/20 rounded-lg cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <h4 className="text-white font-semibold">FPGA-based Image Processor</h4>
                  </div>
                  <p className="text-gray-400 text-sm">By ECE Team Beta • VLSI Design</p>
                </motion.div>
              </div>

              <Link
                to="/events"
                className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500/10 border border-teal-500/30 text-teal-400 rounded-full hover:bg-teal-500/20 transition-all duration-300"
              >
                <span>Submit Your Project</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </motion.div>
            <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-teal-500/20 border border-teal-500/20 md:order-2 group">
              <LazyImage
                src="/img/home4.webp"
                alt="Pulse Club Building"
                className="transition-transform duration-300 group-hover:scale-105"
                wrapperClassName="h-[500px]"
                aspectRatio="auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="w-full bg-gradient-to-b from-black to-green-950/20 text-white py-20 px-4 border-t border-green-500/20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 bg-clip-text text-transparent special-font">
            Be Part of Pulse
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join 500+ ECE students who are building the future of electronics and communication systems through Pulse activities
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-black font-bold rounded-full hover:from-green-400 hover:to-emerald-500 transition-all duration-300 transform hover:scale-102 shadow-md shadow-green-500/30"
            >
              Register for Events
            </Link>
            <Link
              to="/events"
              className="px-8 py-4 bg-transparent border-2 border-green-500 text-green-400 font-bold rounded-full hover:bg-green-500/10 transition-all duration-300"
            >
              Browse Events
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Home;
