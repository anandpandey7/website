import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { API_BASE_URL } from "../config/apiConfig";

const Portfolio = ({ colours = {} }) => {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const navigate = useNavigate();
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/portfolio/`);
        const data = await res.json();
        if (data.success) {
          setPortfolioItems(data.clients || []);
        }
      } catch (err) {
        console.error("Failed to fetch portfolio", err);
      }
    };

    fetchPortfolio();
  }, []);

  const handleExplore = (item) => {
    navigate(`/services/${item._id}`);
  };

  return (
    <section 
      className="bg-gradient-to-br from-[var(--secondary)] via-[var(--secondary)]/30 to-[var(--accent)]/10 py-3 px-6 overflow-hidden relative"
    >
      {/* Dynamic Background Elements for Visual Appeal */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-10 left-10 w-20 h-20 rounded-full blur-xl animate-pulse"
          style={{ backgroundColor: 'var(--accent)', opacity: 0.1 }}
        ></div>
        <div 
          className="absolute bottom-10 right-10 w-32 h-32 rounded-full blur-2xl animate-bounce"
          style={{ backgroundColor: 'var(--primary)', opacity: 0.05 }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-2 sm:mb-18">
          <p 
            className="text-sm uppercase tracking-widest font-bold mb-2 mt-2 sm:mt-4 drop-shadow-sm animate-fade-in"
            style={{ color: 'var(--accent)' }}
          >
            Showcasing Our Work
          </p>
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg animate-slide-up"
            style={{ color: 'var(--primary)' }}
          >
            Our Portfolio
          </h2>
          <div 
            className="w-32 h-1.5 mx-auto mt-6 rounded-full shadow-lg"
            style={{
              background: `linear-gradient(to right, var(--accent), var(--primary), var(--accent))`,
            }}
          ></div>
          <p 
            className="text-lg md:text-xl mt-5 max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--primary)', opacity: 0.7 }}
          >
            Explore our successful projects and innovative solutions delivered to our clients.
          </p>
        </div>

        {/* Swiper Carousel - Added padding to prevent overflow */}
        <div className=" flex justify-center items-center max-w-full mx-auto px-0.5 sm:px-6 mt-1 sm:mt-16">
          <button
                    onClick={() => swiperRef.current?.slidePrev()}
                    className="px-1 py-1 sm:px-2 sm:py-2 bg-[var(--primary)] text-white rounded-4xl mx-0.5 sm:mx-0 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>


          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            modules={[Autoplay, Pagination, Mousewheel, Keyboard]}
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
              delay: 1500,
              disableOnInteraction: false,
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
            className="pb-12"
          >
            {portfolioItems.map((item, index) => (
              <SwiperSlide key={item._id || index} className="py-4 px-5">
                <div
                  className="
                    group relative
                    h-69 px-6 py-3 rounded-xl mb-1.5
                    border-2
                    transition-all duration-300 ease-out
                    flex flex-col items-center justify-center gap-4
                    hover:scale-[1.03]
                    focus:outline-none focus:ring-2 focus:ring-offset-2
                    shadow-sm hover:shadow-lg
                    cursor-pointer
                  "
                  style={{
                    backgroundColor: 'var(--secondary)',
                    borderColor: 'var(--primary)',
                    borderOpacity: 0.1,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  }}
                  onClick={() => navigate(`/clients/${item._id}`)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                    e.currentTarget.style.borderColor = 'var(--accent)';
                    e.currentTarget.style.borderOpacity = '1';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                    e.currentTarget.style.borderColor = 'var(--primary)';
                    e.currentTarget.style.borderOpacity = '0.1';
                  }}
                >
                  {/* Hover Background Effect */}
                  <div 
                    className="absolute inset-0 rounded-xl transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, transparent 0%, var(--accent) 0%, transparent 100%)`,
                      opacity: 0,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '0.03';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '0';
                    }}
                  ></div>
                  
                  {/* Image Container - Using gallery[0] if available, else logo */}
                  <div className="relative z-10 h-32 w-full flex items-center justify-center">
                    <img
                      src={`${API_BASE_URL}${item.gallery && item.gallery[0] ? item.gallery[0] : item.logo}`}
                      alt={item.projectName}
                      className="
                        max-h-32 max-w-full w-auto object-contain
                        opacity-90 group-hover:opacity-100
                        group-hover:scale-110
                        transition-all duration-300
                      "
                    />
                  </div>
                  
                  {/* Project Name and Description */}
                  <div className="relative z-10 text-center px-0 w-full">
                    <span 
                      className="
                        text-sm md:text-base font-semibold
                        group-hover:text-[var(--accent)]
                        transition-colors duration-300
                        line-clamp-1
                      "
                      style={{
                        color: 'var(--primary)',
                        opacity: 0.85,
                      }}
                    >
                      {item.projectName}
                    </span>
                    <p 
                      className="
                        text-xs mt-1
                        transition-colors duration-300
                        line-clamp-3 text-[var(--primary)] opacity-90
                      "
                    >
                      {item.projectDescription}
                    </p>
                    {/* Start and End Dates */}
                    <div className="text-xs mt-2 flex justify-between">
                      <span className="text-[var(--accent)] font-medium">
                        Start: {new Date(item.startDate).toLocaleDateString()}
                      </span>
                      <span className="text-[var(--accent)] font-medium ml-2">
                        End: {new Date(item.endDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="px-1 py-1 sm:px-2 sm:py-2 bg-[var(--primary)] text-white rounded-4xl mx-0.5 sm:mx-0 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Pagination Dots */}
          <div className="swiper-pagination mt-4"></div>
        </div>
      </div>

      {/* Custom Pagination Styling */}
      <style jsx>{`
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
        }
      `}</style>
    </section>
  );
};

export default Portfolio;