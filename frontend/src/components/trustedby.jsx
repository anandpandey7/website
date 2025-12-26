import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { API_BASE_URL } from "../config/apiConfig";

const TrustedBy = () => {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

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
      }
    };

    fetchClients();
  }, []);

  return (
    <section className="bg-gradient-to-br from-[var(--secondary)] via-[var(--secondary)]/30 to-[var(--accent)]/10 py-20 px-6 overflow-hidden relative">
      {/* Dynamic Background Elements for Visual Appeal */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-[var(--accent)]/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-[var(--primary)]/5 rounded-full blur-2xl animate-bounce"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <p className="text-sm uppercase tracking-widest font-bold mb-4 text-[var(--accent)] drop-shadow-sm animate-fade-in">
            Trusted By Industry Leaders
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--primary)] leading-tight drop-shadow-lg animate-slide-up">
            Our Esteemed Clients
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-[var(--accent)] via-[var(--primary)] to-[var(--accent)] mx-auto mt-6 rounded-full shadow-lg"></div>
          <p className="text-lg md:text-xl text-[var(--primary)]/70 mt-6 max-w-2xl mx-auto leading-relaxed">
            Partnering with innovators to drive excellence and deliver unparalleled results.
          </p>
        </div>


        {/* Swiper Carousel - Added padding to prevent overflow */}
        <div className="relative px-4">
          <Swiper
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
            {clients.map((c, index) => (
              <SwiperSlide key={c._id || index} className="py-4">
                <div
                  onClick={() => navigate(`/clients/${c._id}`)}
                  className="
                    cursor-pointer group relative
                    bg-[var(--secondary)]
                    h-44 px-6 py-3 rounded-xl mb-1.5
                    border-2 border-[var(--primary)] border-opacity-10
                    transition-all duration-300 ease-out
                    flex flex-col items-center justify-center gap-4
                    hover:scale-[1.03]
                    hover:border-[var(--accent)] hover:border-opacity-100
                    focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2
                    shadow-sm hover:shadow-lg
                  "
                  style={{
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`View details for ${c.clientName}`}
                  onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/clients/${c._id}`); }}
                >
                  {/* Hover Background Effect */}
                  <div 
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
                  
                  {/* Logo Container */}
                  <div className="relative z-10 h-20 w-full flex items-center justify-center">
                    <img
                      src={`${API_BASE_URL}${c.logo}`}
                      alt={c.clientName}
                      className="
                        max-h-20 max-w-full w-auto object-contain
                        opacity-90 group-hover:opacity-100
                        group-hover:scale-110
                        transition-all duration-300
                      "
                    />
                  </div>
                  
                  {/* Client Name - Improved visibility */}
                  <span 
                    className="
                      text-sm md:text-base font-semibold text-center
                      text-[var(--primary)]
                      group-hover:text-[var(--accent)]
                      transition-colors duration-300
                      relative z-10
                      line-clamp-2 px-2 w-full
                    "
                    style={{
                      opacity: 0.85,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '1';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '0.85';
                    }}
                  >
                    {c.clientName}
                  </span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

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

export default TrustedBy;