import { useState, useMemo, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, User, CreditCard, Info } from "lucide-react";

// Mock data for demonstration
import facultyData from "../Constants/FacultyData.jsx";

// Debounce hook for search optimization
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useMemo(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
};

const formatSpecialTitle = (title) => {
  return title;
};

const Faculty = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredCard, setHoveredCard] = useState(null);

  // Debounce search query for better performance
  const debouncedSearchQuery = useDebounce(searchQuery, 200);

  // Use useMemo to filter the data only when the debounced search query changes
  const filteredFaculty = useMemo(() => {
    if (!debouncedSearchQuery) {
      return facultyData;
    }
    const lowerCaseQuery = debouncedSearchQuery.toLowerCase();
    return facultyData.filter((faculty) =>
      faculty["Name of the Faculty"].toLowerCase().includes(lowerCaseQuery)
    );
  }, [debouncedSearchQuery]);

  // Memoize handlers
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

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
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
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
              onChange={handleSearchChange}
              className="relative w-full p-4 pl-12 rounded-2xl bg-gray-900/80 backdrop-blur-sm text-white border border-emerald-500/30 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300 shadow-xl"
            />
            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400 w-5 h-5" />
          </div>
        </motion.div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                {/* Card Container */}
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative h-[420px] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 border border-emerald-500/20 group-hover:border-emerald-500/50 shadow-xl group-hover:shadow-2xl group-hover:shadow-emerald-500/20 transition-all duration-500"
                >
                  {/* Background Image */}
                  <div className="absolute inset-0">
                    <img
                      src={faculty.image}
                      alt={faculty["Name of the Faculty"]}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Light Gradient Overlay - Only at bottom for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/350 via-transparent to-transparent" />
                    
                    {/* Hover Overlay - Info Background */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredCard === faculty["Emp ID"] ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/80 to-black/60 backdrop-blur-sm"
                    />
                  </div>

                  {/* Content */}
                  <div className="relative h-full p-6">
                    {/* Name - Always Visible at Bottom */}
                    <div className="absolute bottom-6 left-6 right-6 z-20">
                      <h3 className="text-2xl font-bold text-white mb-1 line-clamp-2">
                        {faculty["Name of the Faculty"]}
                      </h3>
                      <p className={`text-sm font-medium ${getDesignationColor(faculty.Designation)}`}>
                        {faculty.Designation}
                      </p>
                    </div>

                    {/* Details - Show on Hover (slides up from bottom) */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: hoveredCard === faculty["Emp ID"] ? 1 : 0,
                        y: hoveredCard === faculty["Emp ID"] ? -80 : 20
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="absolute bottom-6 left-6 right-6 space-y-3 z-10"
                    >
                      {/* Employee ID */}
                      <div className="flex items-center gap-3 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-sm">
                        <CreditCard className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">ID</p>
                          <p className="text-sm text-white font-mono truncate">{faculty["Emp ID"]}</p>
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex items-center gap-3 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-sm">
                        <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Email</p>
                          <a
                            href={`mailto:${faculty["mail ID"]}`}
                            className="text-sm text-white hover:text-emerald-300 transition-colors truncate block"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {faculty["mail ID"]}
                          </a>
                        </div>
                      </div>

                      {/* Room & Cabin */}
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-sm">
                          <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Room</p>
                            <p className="text-sm text-white font-mono truncate">{faculty["Room No"] || "N/A"}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-sm">
                          <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Cabin</p>
                            <p className="text-sm text-white font-mono truncate">{faculty["Cabin No"] || "N/A"}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* More Info Button - Bottom Right */}
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: hoveredCard === faculty["Emp ID"] ? 1 : 0,
                        scale: hoveredCard === faculty["Emp ID"] ? 1 : 0.8
                      }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        // Open faculty profile link in new tab
                        const profileLink = faculty.profileLink || ``;
                        window.open(profileLink, '_blank', 'noopener,noreferrer');
                      }}
                      className="absolute bottom-6 right-6 z-30 flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 rounded-full text-white text-xs font-medium shadow-lg hover:shadow-emerald-500/50 transition-all duration-300"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>More Info</span>
                    </motion.button>
                  </div>

                  {/* Top Accent Line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: hoveredCard === faculty["Emp ID"] ? 1 : 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500"
                    style={{ transformOrigin: "left" }}
                  />
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
                  Your search didn&apos;t match any faculty names. Try adjusting your
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
