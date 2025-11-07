import { useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import LazyImage from './LazyImage';

const InteractiveClubCard = ({ club, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      viewport={{ once: true, margin: '-50px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer will-change-transform contain-paint"
    >
      {/* Background Image */}
      <LazyImage
        src={club.image}
        alt={club.name}
        className="transition-transform duration-300 group-hover:scale-105"
        wrapperClassName="absolute inset-0"
        aspectRatio="auto"
        priority={index < 3}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        {/* Club Icon/Logo */}
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.2 }}
          className="mb-4"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-2xl font-bold text-black shadow-lg shadow-green-500/50">
            {club.icon || club.name.charAt(0)}
          </div>
        </motion.div>

        {/* Club Name */}
        <h3 className="text-2xl font-bold text-white mb-2 special-font">
          {club.name}
        </h3>

        {/* Club Description - Hidden by default, shown on hover */}
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isHovered ? 'auto' : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <p className="text-gray-300 text-sm mb-3 line-clamp-3">
            {club.description}
          </p>
          
          {/* Upcoming Event Badge */}
          {club.upcomingEvent && (
            <div className="flex items-center gap-2 text-xs text-green-400 bg-green-500/10 border border-green-500/30 rounded-full px-3 py-1 w-fit">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
              <span>{club.upcomingEvent}</span>
            </div>
          )}

          {/* Stats */}
          <div className="flex gap-4 mt-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              {club.members || '100+'} members
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              {club.events || '10+'} events
            </span>
          </div>
        </motion.div>

        {/* Hover Arrow */}
        <motion.div
          initial={{ x: -10, opacity: 0 }}
          animate={{
            x: isHovered ? 0 : -10,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
          className="mt-4 flex items-center gap-2 text-green-400 font-semibold text-sm"
        >
          <span>Explore Club</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </motion.div>
      </div>

      {/* Animated Border on Hover */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{
          scale: isHovered ? 1 : 0.95,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="absolute inset-0 border-2 border-green-400/50 rounded-2xl pointer-events-none"
      />
    </motion.div>
  );
};

InteractiveClubCard.propTypes = {
  club: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string,
    icon: PropTypes.string,
    upcomingEvent: PropTypes.string,
    members: PropTypes.string,
    events: PropTypes.string,
  }).isRequired,
  index: PropTypes.number,
};

export default InteractiveClubCard;
