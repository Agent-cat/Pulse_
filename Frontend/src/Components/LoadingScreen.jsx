import React, { useState, useEffect } from 'react';

const LoadingScreen = ({ visible = true }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [shouldRender, setShouldRender] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      setIsExiting(false);
    } else {
      setIsExiting(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 1600); 
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!shouldRender) return null;

  const letters = ['P', 'U', 'L', 'S', 'E'];

  return (
    <div className={`fixed inset-0 bg-black z-[9999] flex items-center justify-center transition-opacity duration-[1600ms] ease-in-out ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
      <style>{`
       @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
        @keyframes slideInFade {
          0% {
            opacity: 0;
            transform: translateX(-50px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideOutFade {
          0% {
            opacity: 1;
            transform: translateX(0);
          }
          100% {
            opacity: 0;
            transform: translateX(50px);
          }
        }
        
        
        
        .letter {
          display: inline-block;
          animation: slideInFade 0.6s ease-out forwards, pulse 2s ease-in-out infinite;
          opacity: 0;
          font-family: 'Roboto', sans-serif;
        }
          .roboto-<uniquifier> {
  font-family: "Roboto", sans-serif;
  font-optical-sizing: auto;
  font-weight: <weight>;
  font-style: normal;
  font-variation-settings:
    "width" 100;
}

        
        .letter:nth-child(1) { animation-delay: 0s, 0.6s; }
        .letter:nth-child(2) { animation-delay: 0.1s, 0.7s; }
        .letter:nth-child(3) { animation-delay: 0.2s, 0.8s; }
        .letter:nth-child(4) { animation-delay: 0.3s, 0.9s; }
        .letter:nth-child(5) { animation-delay: 0.4s, 1s; }
        .letter.exit {
          animation: slideOutFade 1.6s ease-in-out forwards !important;
        }
        
        
      `}</style>
      
      <div className="text-green-500 text-5xl sm:text-7xl md:text-8xl lg:text-[150px] font-black tracking-[0.2em] sm:tracking-normal px-4">
        {letters.map((letter, index) => (
          <span key={index} className={`letter ${isExiting ? 'exit' : ''}`}>
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
};

export default LoadingScreen;