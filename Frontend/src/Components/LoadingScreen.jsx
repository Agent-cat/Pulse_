import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const LoadingScreen = ({ visible = true }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [shouldRender, setShouldRender] = useState(visible);
  const videoRef = useRef(null);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      setIsExiting(false);
    } else {
      setIsExiting(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 15000); // 15s
      return () => clearTimeout(timer);
    }
  }, [visible]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !shouldRender) return;

    // Ensure decoding begins ASAP
    el.load();

    const tryPlay = () => {
      const p = el.play();
      if (p && typeof p.then === 'function') {
        p.catch(() => {
          // Retry briefly if autoplay was delayed
          setTimeout(() => el.play().catch(() => {}), 200);
        });
      }
    };

    if (el.readyState >= 2) {
      tryPlay();
    } else {
      el.addEventListener('loadeddata', tryPlay, { once: true });
      el.addEventListener('canplay', tryPlay, { once: true });
      return () => {
        el.removeEventListener('loadeddata', tryPlay);
        el.removeEventListener('canplay', tryPlay);
      };
    }
  }, [shouldRender]);

  if (!shouldRender) return null;

  return (
    <div className={`fixed inset-0 bg-black z-[9999] flex items-center justify-center transition-opacity duration-[1600ms] ease-in-out ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
      <video
        ref={videoRef}
        aria-label="Loading animation"
        className="max-w-[50vw] max-h-[50vh] w-auto h-auto object-contain rounded-md shadow-2xl"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        // Optional: add a poster to avoid a black frame before first decode
        // poster="/img/logo-poster.jpg"
      >
        <source src="/img/logo.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

LoadingScreen.propTypes = {
  visible: PropTypes.bool,
};

export default LoadingScreen;