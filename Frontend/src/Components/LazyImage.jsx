import { useState, useEffect, memo, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const LazyImage = memo(({
  src,
  alt = '',
  className = '',
  wrapperClassName = '',
  placeholderColor = '#1a1a1a',
  aspectRatio = '16/9',
  objectFit = 'cover',
  priority = false,
  width,
  height,
  onLoad,
  blurDataURL,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '400px', // Start loading 400px before viewport (increased for better UX)
    skip: priority,
    threshold: 0.01, // Trigger as soon as 1% is visible
  });

  const shouldLoad = priority || inView;

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
  }, [onLoad]);

  const handleError = useCallback(() => {
    setHasError(true);
    console.error(`Failed to load image: ${src}`);
  }, [src]);

  useEffect(() => {
    if (shouldLoad && src && !isLoaded && !hasError) {
      const img = new Image();
      
      // Set attributes before src to ensure proper loading
      if (width) img.width = width;
      if (height) img.height = height;
      img.fetchPriority = priority ? 'high' : 'auto';
      img.decoding = 'async';
      
      // Attach handlers before setting src
      img.onload = handleLoad;
      img.onerror = handleError;
      
      // Start loading
      img.src = src;
      
      // Cleanup function
      return () => {
        img.onload = null;
        img.onerror = null;
      };
    }
  }, [shouldLoad, src, isLoaded, hasError, width, height, priority, handleLoad, handleError]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${wrapperClassName}`}
      style={{ aspectRatio: aspectRatio }}
    >
      {/* Blur Placeholder (if provided) */}
      {!isLoaded && !hasError && blurDataURL && (
        <img
          src={blurDataURL}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full blur-md scale-110"
          style={{ 
            objectFit,
            filter: 'blur(20px)',
            transform: 'scale(1.1)',
          }}
        />
      )}

      {/* Shimmer Placeholder (fallback) */}
      {!isLoaded && !hasError && !blurDataURL && (
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: placeholderColor,
            backgroundImage: `linear-gradient(90deg, ${placeholderColor} 0%, rgba(255,255,255,0.05) 50%, ${placeholderColor} 100%)`,
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.5s infinite',
          }}
        />
      )}

      {/* Error State */}
      {hasError && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-gray-900/50"
          style={{ backgroundColor: placeholderColor }}
        >
          <svg 
            className="w-12 h-12 text-gray-600" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
        </div>
      )}

      {/* Actual Image with fade-in animation */}
      {shouldLoad && !hasError && (
        <motion.img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`absolute inset-0 w-full h-full ${className}`}
          style={{ objectFit }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: priority ? 0.15 : 0.3, ease: 'easeOut' }}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          fetchpriority={priority ? 'high' : 'auto'}
          {...props}
        />
      )}

      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
    </div>
  );
});

// Set display name for better debugging
LazyImage.displayName = 'LazyImage';

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
  wrapperClassName: PropTypes.string,
  placeholderColor: PropTypes.string,
  aspectRatio: PropTypes.string,
  objectFit: PropTypes.string,
  priority: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  onLoad: PropTypes.func,
  blurDataURL: PropTypes.string,
};

export default LazyImage;
