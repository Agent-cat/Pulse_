import { useState } from 'react';
import { motion } from 'framer-motion';
import LazyImage from '../Components/LazyImage';

const Team = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const teamMembers = [
    { 
      name: "COMMING SOON", 
      role: "President",
      image: "/img/pngegg.png", 
      gradient: "from-purple-500 to-pink-500",
      description: "Leading Pulse with vision and innovation"
    },
    { 
      name: "MK.RAHUL", 
      role: "Vice President", 
      image:"/img/pulse team/vice - president/rahul.JPG",
      gradient: "from-blue-500 to-cyan-500",
      description: "Coordinating events and team activities"
    },
    { 
      name: "JYOSHNA K", 
      role: "Vice President", 
      image: "/img/pulse team/vice - president/jyo.JPG",
      gradient: "from-green-500 to-emerald-500",
      description: "Managing technical workshops and projects"
    },
    { 
      name: "KAMAL", 
      role: "TESURER", 
      image: "/img/pulse team/teasurer/DSC00295.JPG",
      gradient: "from-orange-500 to-red-500",
      description: "Organizing hackathons and competitions"
    },
    { 
      name: "CHANDRA HASA", 
      role: "REGISTRATION AND CERTIFICATES HEAD", 
      image: "/img/pulse team/r&c/DSC00085.JPG"
,
      gradient: "from-indigo-500 to-purple-500",
      description: "Designing visuals and branding"
    },
    { 
      name: "NAGA SAI RAM", 
      role: "REGISTRATION AND CERTIFICATES HEAD", 
      image: "https://ik.imagekit.io/gopichakradhar/luffy/o2.jpeg?updatedAt=1754289569307",
      gradient: "from-pink-500 to-rose-500",
      description: "Managing digital presence and outreach"
    },
    { 
      name: " SIVESH", 
      role: "TECHNICAL HEAD", 
      image: "/img/pulse team/technical head/siv.JPG",
      gradient: "from-teal-500 to-green-500",
      description: "Conducting technical training sessions"
    },
    { 
      name: " GOKUL", 
      role: "TECHNICAL HEAD", 
      image: "/img/pulse team/technical/DSC00109.JPG",
      gradient: "from-yellow-500 to-orange-500",
      description: "Securing partnerships and funding"
    },
      { 
      name: " SATYA PRAKASH", 
      role: "TECHNICAL HEAD", 
      image: "/img/satya.enc",
      description: "Conducting technical training sessions"
    },
      { 
      name: "SHASHANK", 
      role: "DESIGNING HEAD", 
      image: "/img/pulse team/designing/DSC00088.JPG",
      gradient: "from-teal-500 to-green-500",
      description: "Conducting technical training sessions"
    },
      { 
      name: "JEEVAN ", 
      role: "DESIGNING HEAD", 
      image: "https://ik.imagekit.io/gopichakradhar/luffy/o4.jpeg?updatedAt=1754289569398",
      gradient: "from-teal-500 to-green-500",
      description: "Conducting technical training sessions"
    },
      { 
      name: "HARSHA", 
      role: "DESIGNING HEAD", 
      image: "/img/pulse team/designing/DSC00333.JPG",
      gradient: "from-teal-500 to-green-500",
      description: "Conducting technical training sessions"
    },
      { 
      name: " RAKESH", 
      role: "CAMPUS RELATIONS HEAD", 
      image: "/img/pulse team/cr/DSC00350.JPG",
      gradient: "from-teal-500 to-green-500",
      description: "Conducting technical training sessions"
    },
      { 
      name: " CHAHAT", 
      role: "STAGE MANAGEMENT HEAD", 
      image: "/img/pulse team/stage management/DSC00240.JPG",
      gradient: "from-teal-500 to-green-500",
      description: "Conducting technical training sessions"
    },
      { 
      name: " RAMYA", 
      role: "STAGE MANAGEMENT HEAD", 
      image: "https://ik.imagekit.io/gopichakradhar/luffy/o4.jpeg?updatedAt=1754289569398",
      gradient: "from-teal-500 to-green-500",
      description: "Conducting technical training sessions"
    },
      { 
      name: " PRERNA", 
      role: "STAGE MANAGEMENT HEAD", 
      image: "/img/pulse team/stage management/DSC00204.JPG",
      description: "Conducting technical training sessions"
    },
      { 
      name: " SRAVAN", 
      role: "CULTURALS HEAD", 
      image: "/img/sravan.JPG",
      gradient: "from-teal-500 to-green-500",
      description: "Conducting technical training sessions"
    },
      { 
      name: "MANJU", 
      role: "CULTURALS HEAD", 
      image: "/img/pulse team/culturals/DSC00384.JPG",
      description: "Conducting technical training sessions"
    },
      { 
      name: "BALAJI", 
      role: "CULTURALS HEAD", 
      image: "/img/pulse team/culturals/DSC00063.JPG",
      description: "Conducting technical training sessions"
    },
      { 
      name: "JHANAVI", 
      role: "DRAFTING HEAD", 
      image: "/img/pulse team/drafting/DSC00161.JPG",
      gradient: "from-teal-500 to-green-500",
      description: "Conducting technical training sessions"
    },
      { 
      name: " SONY SRI", 
      role: "BLOOD BANK HEAD", 
      image: "/img/pulse team/drafting/DSC00218.JPG",
      gradient: "from-teal-500 to-green-500",
      description: "Conducting technical training sessions"
    },
      { 
      name: " SAI LAKSHIMI", 
      role: "HR INFO HEAD",
      image: "/img/pulse team/hr info/DSC00186.JPG", 
      gradient: "from-teal-500 to-green-500",
      description: "Conducting technical training sessions"
    },
      
  ];

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 sm:px-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-20 left-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -80, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"
        />
      </div>

      {/* Header Section */}
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <span className="px-6 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-full text-green-400 text-sm font-semibold backdrop-blur-sm">
              Meet Our Team
            </span>
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 bg-clip-text text-transparent special-font">
            The Pulse Team
          </h1>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Dedicated ECE students working together to create amazing experiences and opportunities for the entire department
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative"
            >
              {/* Card Container */}
              <div className="relative h-[450px] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-gray-800 transition-all duration-500 hover:border-green-500/50 hover:shadow-2xl hover:shadow-green-500/20">
                
                {/* Image Section */}
                <div className="relative h-[280px] overflow-hidden">
                  <LazyImage
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    wrapperClassName="w-full h-full"
                    aspectRatio="auto"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t ${member.gradient} opacity-0 group-hover:opacity-40 transition-opacity duration-500`} />
                  
                  {/* Animated Corner Accent */}
                  <motion.div
                    animate={{
                      scale: hoveredCard === index ? [1, 1.2, 1] : 1,
                      opacity: hoveredCard === index ? [0.5, 1, 0.5] : 0,
                    }}
                    transition={{
                      duration: 2,
                      repeat: hoveredCard === index ? Infinity : 0,
                    }}
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${member.gradient} blur-2xl`}
                  />
                </div>

                {/* Content Section */}
                <div className="relative p-6 flex flex-col justify-between h-[170px]">
                  {/* Name & Role */}
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2 special-font group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-green-400 group-hover:to-emerald-500 group-hover:bg-clip-text transition-all duration-300">
                      {member.name}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${member.gradient}`} />
                      <p className="text-green-400 text-sm font-semibold uppercase tracking-wider">
                        {member.role}
                      </p>
                    </div>
                  </div>

                  {/* Description - Shows on Hover */}
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: hoveredCard === index ? 1 : 0,
                      height: hoveredCard === index ? 'auto' : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-400 text-sm leading-relaxed overflow-hidden"
                  >
                    {member.description}
                  </motion.p>

                  {/* Decorative Line */}
                  <motion.div
                    initial={{ width: '30px' }}
                    animate={{
                      width: hoveredCard === index ? '100%' : '30px',
                    }}
                    transition={{ duration: 0.5 }}
                    className={`h-[2px] bg-gradient-to-r ${member.gradient} rounded-full mt-auto`}
                  />
                </div>

                {/* Floating Social Icons - Shows on Hover */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: hoveredCard === index ? 1 : 0,
                    y: hoveredCard === index ? 0 : 20,
                  }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="absolute bottom-6 right-6 flex gap-3"
                >
                  <motion.button
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-green-500/30 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.2, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-green-500/30 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </motion.button>
                </motion.div>

                {/* Glow Effect on Hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-t ${member.gradient} blur-3xl -z-10`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-sm border border-green-500/20 rounded-3xl p-12">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Want to Join Our Team?
            </h3>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              We&apos;re always looking for passionate ECE students to join Pulse and make a difference
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-black font-bold rounded-full hover:from-green-400 hover:to-emerald-500 transition-all duration-300 shadow-lg shadow-green-500/30"
            >
              Apply Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Team;
