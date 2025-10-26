import React from 'react';
import { motion } from 'framer-motion';

const PageTransitionLoader = ({ visible = false }) => {
  if (!visible) return null;
  return (
    <>
      <style>{`
        @keyframes heartbeat {
          0%, 100% {
            transform: scale(1);
          }
          10% {
            transform: scale(1.2);
          }
          20% {
            transform: scale(1);
          }
          30% {
            transform: scale(1.2);
          }
          40% {
            transform: scale(1);
          }
        }
      `}</style>
      
      <motion.div 
        className="fixed top-2 w-full h-screen flex items-center   justify-center sm:top-4 right-2 sm:right-4 z-[9999]  space-x-2 sm:space-x-3 bg-black backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-2.5  border border-green-500/30"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {/* Heartbeat Icon */}
        <motion.div
          className="relative"
          style={{
            animation: 'heartbeat 1.5s ease-in-out infinite',
          }}
        >
          <svg
            width="90"
            height="90"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-green-500"
          >
            <path
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
              fill="currentColor"
              className="opacity-100"
            />
            {/* Pulse line effect */}
            <motion.path
              d="M3 12h4l2-4 4 8 2-4h6"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1, 1, 0],
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </svg>
          
          {/* Glow effect */}
          {/* <motion.div
            className="absolute inset-0 bg-green-500  blur-md opacity-100"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          /> */}
        </motion.div>

        {/* Loading text */}
        {/* <span className="text-green-500  text-md sm:text-6xl font-bold">
          Loading
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ...
          </motion.span>
        </span> */}
      </motion.div>
    </>
  );
};

export default PageTransitionLoader;
