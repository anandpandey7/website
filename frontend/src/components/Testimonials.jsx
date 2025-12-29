import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { API_BASE_URL } from "../config/apiConfig";

const Testimonials = ({ colours = {} }) => {
  const [testimonials, setTestimonials] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/testimonials`);
        const data = await res.json();
        if (data.success) {
          setTestimonials(data.clients || []);
        }
      } catch (err) {
        console.error("Failed to fetch testimonials", err);
      }
    };

    fetchTestimonials();
  }, []);

  // Function to render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} style={{ color: 'var(--accent)' }}>★</span>
      );
    }
    if (hasHalfStar) {
      stars.push(
        <span key="half" style={{ color: 'var(--accent)' }}>☆</span>
      );
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} style={{ color: 'var(--primary)', opacity: 0.3 }}>☆</span>
      );
    }
    return stars;
  };

  const handleExplore = (item) => {
    navigate(`/services/${item._id}`);
  };

  return (
    <section 
      className="bg-gradient-to-br py-20 px-6 overflow-hidden relative"
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
        <div className="text-center mb-20">
          <p 
            className="text-sm uppercase tracking-widest font-bold mb-4 drop-shadow-sm animate-fade-in"
            style={{ color: 'var(--accent)' }}
          >
            What Our Clients Say
          </p>
          <h2 
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg animate-slide-up"
            style={{ color: 'var(--primary)' }}
          >
            Testimonials
          </h2>
          <div 
            className="w-32 h-1.5 mx-auto mt-6 rounded-full shadow-lg"
            style={{
              background: `linear-gradient(to right, var(--accent), var(--primary), var(--accent))`,
            }}
          ></div>
          <p 
            className="text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed"
            style={{ color: 'var(--primary)', opacity: 0.7 }}
          >
            Hear from our satisfied clients about their project experiences.
          </p>
        </div>

        {/* Swiper Carousel */}
        <div className="relative px-4">
          <Swiper
            modules={[Autoplay, Pagination, Mousewheel, Keyboard]}
            spaceBetween={28}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
            }}
            loop={true}
            autoplay={{
              delay: 3000,
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
            {testimonials
              .filter(item => item.rating && item.feedback) // Only show testimonials with rating and feedback
              .map((item, index) => (
              <SwiperSlide key={item._id || index} className="py-4 px-5">
                <div
                  className="
                    group relative
                    h-60 px-6 py-6 rounded-xl mb-1.5
                    border-2
                    transition-all duration-300 ease-out
                    flex flex-col justify-between
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
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col h-full">
                    {/* Project Name */}
                    <h3 
                      className="
                        text-lg font-bold mb-2
                        group-hover:text-[var(--accent)]
                        transition-colors duration-300
                      "
                      style={{ color: 'var(--primary)' }}
                    >
                      {item.projectName}
                    </h3>
                    
                    {/* Project Description */}
                    <p 
                      className="
                        text-sm mb-4 flex-grow 
                        line-clamp-2 
                        transition-colors duration-300
                        overflow-hidden 
                        whitespace-normal
                      "
                      style={{ color: 'var(--primary)', opacity: 0.8 }}
                    >
                      {item.projectDescription}
                    </p>
                    
                    {/* Rating */}
                    <div className="mb-4">
                      <div className="flex items-center mb-1">
                        {renderStars(item.rating)}
                        <span 
                          className="ml-2 text-sm font-semibold"
                          style={{ color: 'var(--primary)' }}
                        >
                          {item.rating}/5
                        </span>
                      </div>
                    </div>
                    
                    {/* Feedback */}
                    <blockquote 
                      className="
                        text-sm italic border-l-4 pl-4
                        transition-colors duration-300
                      "
                      style={{ 
                        borderColor: 'var(--accent)',
                        color: 'var(--primary)', 
                        opacity: 0.9 
                      }}
                    >
                      "{item.feedback}"
                    </blockquote>
                  </div>
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

export default Testimonials;