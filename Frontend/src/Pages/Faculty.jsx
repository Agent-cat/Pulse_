import React, { useState, useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, User, CreditCard } from "lucide-react";

// Mock data for demonstration
import facultyData from "../Constants/FacultyData.jsx";

const formatSpecialTitle = (title) => {
  return title;
};

const Faculty = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);

  // Use useMemo to filter the data only when the search query changes
  const filteredFaculty = useMemo(() => {
    if (!searchQuery) {
      return facultyData;
    }
    const lowerCaseQuery = searchQuery.toLowerCase();
    return facultyData.filter((faculty) =>
      faculty["Name of the Faculty"].toLowerCase().includes(lowerCaseQuery)
    );
  }, [searchQuery]);

  const getDesignationColor = (designation) => {
    if (designation.includes("Head") || designation.includes("Professor")) {
      return "text-green-300";
    } else if (designation.includes("Associate")) {
      return "text-emerald-300";
    } else {
      return "text-green-400";
    }
  };

  const headerRef = useRef(null);
  const searchRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const searchInView = useInView(searchRef, { once: true });

  return (
    <div className="min-h-screen bg-black text-white  p-4 sm:p-8 font-sans relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-[15%] left-[10%] w-96 h-96 bg-emerald-500/20 rounded-full filter blur-3xl"
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
          className="absolute top-[40%] right-[15%] w-96 h-96 bg-green-400/20 rounded-full filter blur-3xl"
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
          className="absolute bottom-[20%] left-[25%] w-96 h-96 bg-white/10 rounded-full filter blur-3xl"
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

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <motion.header
          ref={headerRef}
          initial={{ opacity: 0, y: -50 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="py-12 text-center relative"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={headerInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold mb-4">
              <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 bg-clip-text text-transparent">
                {formatSpecialTitle("FACULTY")}
              </span>
            </h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={headerInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-6 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Discover our distinguished ECE faculty members and their expertise
          </motion.p>
        </motion.header>

        {/* Search Bar */}
        <motion.div
          ref={searchRef}
          initial={{ opacity: 0, y: 20 }}
          animate={searchInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12 flex justify-center"
        >
          <div className="relative w-full max-w-md group">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-2xl blur"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <input
              type="text"
              placeholder="Search faculty by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="relative w-full p-4 pl-12 rounded-2xl bg-gray-900/80 backdrop-blur-sm text-white border border-emerald-500/30 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300 shadow-xl"
            />
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400 w-5 h-5" />
          </div>
        </motion.div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredFaculty.length > 0 ? (
            filteredFaculty.map((faculty, index) => (
              <motion.div
                key={faculty["Emp ID"]}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative"
                onMouseEnter={() => setHoveredCard(faculty["Emp ID"])}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-green-400/20 rounded-3xl blur-xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Main card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-sm rounded-3xl border border-emerald-500/20 hover:border-emerald-500/50 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-emerald-400/10 transition-all duration-500"
                >
                  {/* Top accent line */}
                  <motion.div
                    className="h-1 bg-gradient-to-r from-emerald-400 to-green-400"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{ transformOrigin: "left" }}
                  />

                  <div className="p-8">
                    {/* Header */}
                    <div className="mb-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-2xl font-bold text-white group-hover:text-green-300 font-circular-web transition-colors duration-300">
                          {faculty["Name of the Faculty"]}
                        </h3>
                      </div>
                      <p
                        className={`text-base font-medium ${getDesignationColor(
                          faculty.Designation
                        )} mb-1`}
                      >
                        {faculty.Designation}
                      </p>
                    </div>

                    {/* Details Grid */}
                    <div className="space-y-4">
                      {/* Employee ID */}
                      <div className="flex items-center space-x-4 p-3 rounded-xl bg-gray-800/50 border border-gray-700/30 group-hover:border-green-400/30 transition-all duration-300">
                        <div className="flex-shrink-0 w-10 h-10 bg-green-400/10 rounded-xl flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-green-400" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                            Employee ID
                          </p>
                          <p className="text-white font-mono">
                            {faculty["Emp ID"]}
                          </p>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex items-center space-x-4 p-3 rounded-xl bg-gray-800/50 border border-gray-700/30 group-hover:border-green-400/30 transition-all duration-300">
                        <div className="flex-shrink-0 w-10 h-10 bg-green-400/10 rounded-xl flex items-center justify-center">
                          <Mail className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                            Email
                          </p>
                          <a
                            href={`mailto:${faculty["mail ID"]}`}
                            className="text-white hover:text-green-300 transition-colors duration-200 truncate block font-mono text-sm"
                          >
                            {faculty["mail ID"]}
                          </a>
                        </div>
                      </div>

                      {/* Location Info */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-800/50 border border-gray-700/30 group-hover:border-green-400/30 transition-all duration-300">
                          <div className="flex-shrink-0 w-10 h-10 bg-green-400/10 rounded-xl flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-green-400" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                              Room
                            </p>
                            <p className="text-white font-mono">
                              {faculty["Room No"] || "N/A"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-800/50 border border-gray-700/30 group-hover:border-green-400/30 transition-all duration-300">
                          <div className="flex-shrink-0 w-10 h-10 bg-green-400/10 rounded-xl flex items-center justify-center">
                            <MapPin className="w-5 h-5 text-green-400" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                              Cabin
                            </p>
                            <p className="text-white font-mono">
                              {faculty["Cabin No"] || "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom accent for hovered card */}
                  {hoveredCard === faculty["Emp ID"] && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-green-400"
                    />
                  )}
                </motion.div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="col-span-full text-center py-20"
            >
              <div className="relative">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-800 to-gray-700 rounded-3xl flex items-center justify-center"
                >
                  <User className="w-12 h-12 text-gray-500" />
                </motion.div>
                <motion.h3
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-3xl font-bold text-gray-400 mb-3"
                >
                  No Faculty Found
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-gray-500 text-lg max-w-md mx-auto"
                >
                  Your search didn't match any faculty names. Try adjusting your
                  search terms.
                </motion.p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Faculty;
