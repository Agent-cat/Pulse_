import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectCoverflow } from 'swiper/modules';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import LazyImage from './LazyImage';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

const FeaturedCarousel = ({ items, title = 'Featured' }) => {
  return (
    <div className="w-full py-16 bg-black relative overflow-hidden">
      {/* Animated background blurs - Optimized */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-20 left-20 w-96 h-96 bg-green-500/10 rounded-full blur-lg"
      />
      
      <motion.div
        animate={{
          x: [0, -80, 0],
          y: [0, 100, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-lg"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 via-emerald-500 to-teal-400 bg-clip-text text-transparent special-font mb-4">
            {title}
          </h2>
          <p className="text-gray-400 text-lg">
            Discover what makes Pulse special
          </p>
        </motion.div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={3}
          spaceBetween={30}
          lazy={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 300,
            modifier: 1,
            slideShadows: false,
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          loop={true}
          loopAdditionalSlides={3}
          loopedSlides={items?.length}
          initialSlide={1}
          watchSlidesProgress={true}
          speed={700}
          slideToClickedSlide={true}
          allowTouchMove={true}
          centerInsufficientSlides={true}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 25,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          className="featured-swiper"
        >
          {items?.map((item, index) => (
            <SwiperSlide key={`${item.title}-${index}`}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative h-[500px] rounded-2xl overflow-hidden border border-green-500/20 shadow-2xl shadow-green-500/10 bg-black"
              >
                <LazyImage
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  wrapperClassName="w-full h-full"
                  aspectRatio="auto"
                  objectFit="cover"
                  priority={index < 3}
                />
                
                {/* Gradient Overlay - Optimized for all cards visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {item.badge && (
                      <span className="inline-block px-3 py-1 bg-green-500/20 border border-green-500/50 rounded-full text-green-400 text-xs font-semibold mb-3">
                        {item.badge}
                      </span>
                    )}
                    <h3 className="text-3xl font-bold mb-2 special-font">
                      {item.title}
                    </h3>
                    <p className="text-gray-300 text-base mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    {item.date && (
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        <span>{item.date}</span>
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style>{`
        .featured-swiper {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 50px 0;
          overflow: hidden !important;
        }

        .featured-swiper .swiper-wrapper {
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        .featured-swiper .swiper-slide {
          background-position: center;
          background-size: cover;
          width: 380px !important;
          height: 500px;
          opacity: 0.8;
          visibility: visible;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          transform: scale(0.95) translateZ(0);
          will-change: transform, opacity;
        }

        /* Middle event - 100% opacity (Active/Centered) */
        .featured-swiper .swiper-slide-active {
          opacity: 1 !important;
          visibility: visible !important;
          z-index: 10;
          transform: scale(1) translateZ(0) !important;
        }

        /* Left event - 80% opacity (Previous) */
        .featured-swiper .swiper-slide-prev {
          opacity: 0.8 !important;
          visibility: visible !important;
          z-index: 5;
          transform: scale(0.95) translateZ(0) !important;
        }

        /* Right event - 80% opacity (Next) */
        .featured-swiper .swiper-slide-next {
          opacity: 0.8 !important;
          visibility: visible !important;
          z-index: 5;
          transform: scale(0.95) translateZ(0) !important;
        }

        /* Handle duplicate slides for seamless infinite looping */
        .featured-swiper .swiper-slide-duplicate-active {
          opacity: 1 !important;
          visibility: visible !important;
          z-index: 10;
          transform: scale(1) translateZ(0) !important;
        }
        
        .featured-swiper .swiper-slide-duplicate-prev,
        .featured-swiper .swiper-slide-duplicate-next {
          opacity: 0.8 !important;
          visibility: visible !important;
          z-index: 5;
          transform: scale(0.95) translateZ(0) !important;
        }

        /* Hide all other slides except visible ones and duplicates after Swiper initializes */
        .featured-swiper.swiper-initialized .swiper-slide:not(.swiper-slide-active):not(.swiper-slide-prev):not(.swiper-slide-next):not(.swiper-slide-duplicate-active):not(.swiper-slide-duplicate-prev):not(.swiper-slide-duplicate-next) {
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none;
        }

        /* Ensure images in visible slides are shown */
        .featured-swiper .swiper-slide-active > div,
        .featured-swiper .swiper-slide-prev > div,
        .featured-swiper .swiper-slide-next > div {
          visibility: visible !important;
          opacity: 1 !important;
        }

        /* Hover effect only on visible slides */
        .featured-swiper .swiper-slide-active:hover,
        .featured-swiper .swiper-slide-prev:hover,
        .featured-swiper .swiper-slide-next:hover {
          opacity: 1 !important;
          transform: scale(1.02) translateZ(0) !important;
        }

        @media (max-width: 1024px) {
          .featured-swiper .swiper-slide {
            width: 320px !important;
            height: 450px;
          }
        }

        @media (max-width: 768px) {
          .featured-swiper {
            max-width: 100%;
            padding: 40px 20px;
          }
          
          .featured-swiper .swiper-slide {
            width: 280px !important;
            height: 400px;
          }

          /* Show only active slide on mobile */
          .featured-swiper .swiper-slide-prev,
          .featured-swiper .swiper-slide-next {
            opacity: 0.5 !important;
            transform: scale(0.85) translateZ(0) !important;
          }
        }

        @media (max-width: 480px) {
          .featured-swiper .swiper-slide {
            width: 260px !important;
            height: 380px;
          }

          /* Hide side slides on very small screens */
          .featured-swiper .swiper-slide-prev,
          .featured-swiper .swiper-slide-next {
            opacity: 0 !important;
            visibility: hidden !important;
          }
        }

        .featured-swiper .swiper-pagination {
          bottom: 10px;
        }

        .featured-swiper .swiper-pagination-bullet {
          background: #10b981;
          opacity: 0.5;
          transition: all 0.3s ease;
        }

        .featured-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          background: #10b981;
          transform: scale(1.2);
        }

        .featured-swiper .swiper-pagination-bullet:hover {
          opacity: 0.8;
          transform: scale(1.1);
        }

        .featured-swiper .swiper-button-next,
        .featured-swiper .swiper-button-prev {
          color: #10b981;
          background: rgba(0, 0, 0, 0.8);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 2px solid rgba(16, 185, 129, 0.3);
          transition: all 0.3s ease;
          backdrop-filter: blur(8px);
        }

        .featured-swiper .swiper-button-next:hover,
        .featured-swiper .swiper-button-prev:hover {
          background: rgba(16, 185, 129, 0.2);
          border-color: rgba(16, 185, 129, 0.6);
          transform: scale(1.1);
        }

        .featured-swiper .swiper-button-next:after,
        .featured-swiper .swiper-button-prev:after {
          font-size: 18px;
          font-weight: bold;
        }

        @media (max-width: 768px) {
          .featured-swiper .swiper-button-next,
          .featured-swiper .swiper-button-prev {
            width: 36px;
            height: 36px;
          }
          
          .featured-swiper .swiper-button-next:after,
          .featured-swiper .swiper-button-prev:after {
            font-size: 14px;
          }
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

FeaturedCarousel.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      badge: PropTypes.string,
      date: PropTypes.string,
    })
  ).isRequired,
  title: PropTypes.string,
};

export default FeaturedCarousel;
