import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Mousewheel, Keyboard, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { motion, useInView } from "framer-motion";
import { API_BASE_URL } from "../config/apiConfig";

const TrustedBy = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/clients`);
        const data = await res.json();
        if (data.success) {
          setClients(data.projects || []);
        }
      } catch (err) {
        console.error("Failed to fetch clients", err);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  // Variants for enhanced animations (now defined here)
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.5 } },
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const headerItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: { scaleX: 1, transition: { duration: 1, delay: 0.8, ease: "easeInOut" } },
  };

  const slideContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const slideVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: 90 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      rotateY: 0, 
      transition: { 
        duration: 0.7, 
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
      } 
    },
  };

  return (
    <motion.section
      ref={ref}
      className="bg-gradient-to-br from-[var(--secondary)] via-[var(--secondary)]/30 to-[var(--accent)]/10 pb-3 sm:pb-10 pt-5 sm:pt-9 px-2 sm:px-6 overflow-hidden relative"
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Enhanced Dynamic Background Elements */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        variants={backgroundVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-[var(--accent)]/10 rounded-full blur-xl"
          variants={floatingVariants}
          animate={isInView ? "animate" : false}
        ></motion.div>
        <motion.div
          className="absolute bottom-10 right-10 w-32 h-32 bg-[var(--primary)]/5 rounded-full blur-2xl"
          variants={floatingVariants}
          animate={isInView ? "animate" : false}
          transition={{ delay: 1 }}
        ></motion.div>
        <motion.div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-[var(--accent)]/5 rounded-full blur-lg"
          variants={floatingVariants}
          animate={isInView ? "animate" : false}
          transition={{ delay: 2 }}
        ></motion.div>
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header with Staggered Animations */}
        <motion.div
          className="text-center mb-6 sm:mb-20"
          variants={headerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.p
            className="text-sm uppercase tracking-widest font-bold mb-4 text-[var(--accent)] drop-shadow-sm"
            variants={headerItemVariants}
          >
            Trusted By Industry Leaders
          </motion.p>
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--primary)] leading-tight drop-shadow-lg"
            variants={headerItemVariants}
          >
            Our Esteemed Clients
          </motion.h2>
          <motion.div
            className="w-32 h-1.5 bg-gradient-to-r from-[var(--accent)] via-[var(--primary)] to-[var(--accent)] mx-auto mt-3 sm:mt-6 rounded-full shadow-lg"
            variants={lineVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            style={{ originX: 0.5 }}
          ></motion.div>
          <motion.p
            className="text-lg md:text-xl text-[var(--primary)]/70 mt-10 sm:mt-6 max-w-2xl mx-auto leading-relaxed"
            variants={headerItemVariants}
          >
            Partnering with innovators to drive excellence and deliver unparalleled results.
          </motion.p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <motion.div
            className="flex justify-center items-center py-10 sm:py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-12 h-12 border-4 border-[var(--accent)] border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            ></motion.div>
          </motion.div>
        )}

        {/* Swiper Carousel */}
        {!loading && (
          <motion.div
            className="relative px-4"
            variants={slideContainerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <Swiper
              modules={[Autoplay, Pagination, Mousewheel, Keyboard, Navigation]}
              spaceBetween={28}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: 5 },
              }}
              loop={true}
              autoplay={{
                delay: 2000,
                disableOnInteraction: true,
                pauseOnMouseEnter: true,
              }}
              grabCursor={true}
              mousewheel={true}
              keyboard={{ enabled: true }}
              pagination={{
                el: ".swiper-pagination",
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              className="pb-12"
            >
              {clients.map((c, index) => (
                <SwiperSlide key={c._id || index} className="py-4 px-3">
                  <motion.div
                    onClick={() => navigate(`/clients/${c._id}`)}
                    className="
                      cursor-pointer group relative
                      bg-[var(--secondary)]
                      h-44 px-6 py-3 rounded-xl mb-1.5
                      border-2 border-[var(--primary)] border-opacity-10
                      flex flex-col items-center justify-center gap-4
                      focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2
                      shadow-sm
                    "
                    variants={slideVariants}
                    whileHover={{
                      scale: 1.05,
                      rotateY: -5,
                      boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
                      borderColor: 'var(--accent)',
                      borderOpacity: 1,
                      transition: { duration: 0.3, ease: "easeOut" },
                    }}
                    whileTap={{ scale: 0.95 }}
                    role="button"
                    tabIndex={0}
                    aria-label={`View details for ${c.clientName}`}
                    onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/clients/${c._id}`); }}
                  >
                    {/* Enhanced Hover Background Effect */}
                    <motion.div
                      className="absolute inset-0 rounded-xl"
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ opacity: 0.05, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      style={{
                        background: `linear-gradient(135deg, transparent 0%, var(--accent) 50%, transparent 100%)`,
                      }}
                    ></motion.div>
                    
                    {/* Logo Container with Enhanced Animation */}
                    <motion.div
                      className="relative z-10 flex items-center justify-center h-14 sm:h-20 w-full"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.img
                        src={`${API_BASE_URL}${c.logo}`}
                        alt={c.clientName}
                        className="
                          max-h-14 sm:max-h-20
                          max-w-[120px] sm:max-w-full
                          w-auto object-contain mt-3
                          opacity-90
                        "
                        whileHover={{ scale: 1.15, opacity: 1, rotate: 2 }}
                        transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                      />
                    </motion.div>
                    
                    {/* Client Name with Improved Animation */}
                    <motion.span
                      className="
                        text-sm mt-6 md:text-base font-semibold text-center
                        text-[var(--primary)]
                        relative z-10 md:mt-1
                        line-clamp-2 px-2 w-full
                      "
                      initial={{ opacity: 0.85 }}
                      whileHover={{ opacity: 1, color: 'var(--accent)', scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      {c.clientName}
                    </motion.span>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Navigation and Pagination Container */}
            <div className="flex justify-center items-center gap-4 mt-4">
              <div className="swiper-button-prev">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </div>

              <div className="swiper-pagination"></div>
              <div className="swiper-button-next">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Enhanced Custom Pagination and Navigation Styling */}
      <style>{`
        .swiper-pagination-bullet {
          background: var(--accent);
          opacity: 0.4;
          width: 8px;
          height: 8px;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          width: 24px;
          border-radius: 4px;
          transform: scale(1.2);
        }
        .swiper-button-next,
        .swiper-button-prev {
          position: static !important;
          color: var(--accent);
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          cursor: pointer;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: var(--accent);
          color: white;
          transform: scale(1.1);
        }
        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 10px;
          font-weight: ;
        }
      `}</style>
    </motion.section>
  );
};

export default TrustedBy;