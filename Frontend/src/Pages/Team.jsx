import React, { useState, useEffect } from 'react';

const Team = () => {
  const teamMembers = [
    { name: "Luffy", role: "Founder", image: "https://ik.imagekit.io/gopichakradhar/luffy/o1.jpeg?updatedAt=1754289569411" },
    { name: "Monkey D. Luffy", role: "Creative Director", image: "https://ik.imagekit.io/gopichakradhar/luffy/o2.jpeg?updatedAt=1754289569307" },
    { name: "Luffy chan", role: "Lead Developer", image: "https://ik.imagekit.io/gopichakradhar/luffy/o4.jpeg?updatedAt=1754289569398" },
    { name: "Lucy", role: "UX Designer", image: "https://ik.imagekit.io/gopichakradhar/luffy/o3.jpeg?updatedAt=1754289569422" },
    { name: "Luffy kun", role: "Marketing Manager", image: "https://ik.imagekit.io/gopichakradhar/luffy/o5.jpeg?updatedAt=1754289569406" },
    { name: "Monkey chan", role: "Product Manager", image: "https://ik.imagekit.io/gopichakradhar/luffy/o6.jpeg?updatedAt=1754289569438" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showNameRole, setShowNameRole] = useState(true);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  const [dragStart, setDragStart] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const updateCarousel = (newIndex) => {
    if (isAnimating) return;

    setIsAnimating(true);
    const normalizedIndex = (newIndex + teamMembers.length) % teamMembers.length;

    setShowNameRole(false);

    setTimeout(() => {
      setCurrentIndex(normalizedIndex);
      setShowNameRole(true);
    }, 300);

    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  };

  const getCardPosition = (index) => {
    const offset = (index - currentIndex + teamMembers.length) % teamMembers.length;

    if (offset === 0) return 'center';
    if (offset === 1) return 'down-1';
    if (offset === 2) return 'down-2';
    if (offset === teamMembers.length - 1) return 'up-1';
    if (offset === teamMembers.length - 2) return 'up-2';
    return 'hidden';
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') {
        updateCarousel(currentIndex - 1);
      } else if (e.key === 'ArrowDown') {
        updateCarousel(currentIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isAnimating]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollIndicator(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleDragStart = (y) => {
    setDragStart(y);
    setIsDragging(true);
  };

  const handleDragEnd = (y) => {
    if (!isDragging) return;
    setIsDragging(false);

    const swipeThreshold = 50;
    const diff = dragStart - y;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        updateCarousel(currentIndex + 1); // Dragged/Swiped Up
      } else {
        updateCarousel(currentIndex - 1); // Dragged/Swiped Down
      }
    }
  };

  const handleDragMove = (e) => {
    if (isDragging) {
      e.preventDefault(); // Prevents text selection during drag
    }
  };

  return (
    <div className="min-h-screen flex  flex-col items-center justify-center bg-black overflow-hidden py-5 md:py-20">
      <div className="flex flex-col md:flex-row w-full max-w-[1200px] md:h-[80vh] gap-10 md:gap-[60px] items-center justify-center px-4">
        {/* Carousel Section */}
        <div className="flex-1 flex justify-center items-center w-full md:w-auto">
          <div className="w-full max-w-[500px] h-[70vh] relative" style={{ perspective: '1000px' }}>

            {/* Carousel Track */}
            <div
              className="w-[450px] h-full flex flex-col justify-center items-center relative transition-transform duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
              style={{
                transformStyle: 'preserve-3d',
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
              onMouseDown={(e) => { e.preventDefault(); handleDragStart(e.clientY); }}
              onMouseUp={(e) => handleDragEnd(e.clientY)}
              onMouseMove={handleDragMove}
              onMouseLeave={() => { if (isDragging) setIsDragging(false); }}
              onTouchStart={(e) => handleDragStart(e.changedTouches[0].screenY)}
              onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].screenY)}
            >
              {teamMembers.map((member, index) => {
                const position = getCardPosition(index);

                const getTransform = () => {
                  if (position === 'center') return 'scale(1.1) translateZ(0)';
                  if (position === 'up-1') return 'translateY(-150px) scale(0.9) translateZ(-100px)';
                  if (position === 'up-2') return 'translateY(-300px) scale(0.8) translateZ(-300px)';
                  if (position === 'down-1') return 'translateY(150px) scale(0.9) translateZ(-100px)';
                  if (position === 'down-2') return 'translateY(300px) scale(0.8) translateZ(-300px)';
                  return '';
                };

                const getOpacity = () => {
                  if (position === 'center') return 1;
                  if (position === 'up-1' || position === 'down-1') return 0.9;
                  if (position === 'up-2' || position === 'down-2') return 0.7;
                  return 0;
                };

                const getZIndex = () => {
                  if (position === 'center') return 10;
                  if (position === 'up-1' || position === 'down-1') return 5;
                  if (position === 'up-2' || (position === 'down-2')) return 1;
                  return 0;
                };

                return (
                  <div
                    key={index}
                    onClick={() => { if (position !== 'center') updateCarousel(index); }}
                    className="absolute  w-[400px] h-[225px] bg-white rounded-[20px] overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.15)] cursor-pointer transition-all duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
                    style={{
                      transform: getTransform(),
                      opacity: position === 'hidden' ? 0 : getOpacity(),
                      zIndex: getZIndex(),
                      pointerEvents: position === 'hidden' ? 'none' : 'auto',
                      cursor: position === 'center' ? 'default' : 'pointer'
                    }}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className={`w-full h-full object-cover transition-all duration-[800ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${position !== 'center' ? 'grayscale' : ''}`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="flex-1 flex flex-col justify-center items-center gap-10 md:pl-10 w-full md:w-auto">
          {/* Member Info */}
          <div className={`text-center mt-5 transition-opacity duration-500 ${showNameRole ? 'opacity-100' : 'opacity-0'}`}>
            <h2 className="text-[#082A7B] text-[1.8rem] md:text-[2rem] font-bold mb-2 relative inline-block">
              {teamMembers[currentIndex].name}
              <span className="absolute top-full left-[-60px] md:left-[-100px] w-10 md:w-20 h-0.5 bg-[#082A7B]"></span>
              <span className="absolute top-full right-[-60px] md:right-[-100px] w-10 md:w-20 h-0.5 bg-[#082A7B]"></span>
            </h2>
            <p className="text-[#848696] text-base md:text-xl font-medium opacity-80 uppercase tracking-[0.1em] py-[5px] -mt-[10px]">
              {teamMembers[currentIndex].role}
            </p>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-[10px] mt-[30px]">
            {teamMembers.map((_, index) => (
              <div
                key={index}
                onClick={() => updateCarousel(index)}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${index === currentIndex
                  ? 'bg-[#082A7B] scale-125'
                  : 'bg-[#082A7B]/20'
                  }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <div
          className="fixed bottom-5 md:bottom-[30px] right-5 md:right-[30px] bg-[#082A7B]/80 text-white px-3 md:px-4 py-2 rounded-[20px] text-xs md:text-sm text-center z-[1000] backdrop-blur-[10px] border border-white/20 font-medium leading-none animate-[scrollFadeOut_5s_ease-in-out_forwards]"
        >
          scroll
          <span className="text-[0.7rem] opacity-90 block mt-0.5">↕</span>
        </div>
      )}

      <style>{`
        @keyframes scrollFadeOut {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          10% {
            opacity: 1;
            transform: scale(1);
          }
          90% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0.8);
            visibility: hidden;
          }
        }
      `}</style>
    </div>
  );
};

export default Team;
