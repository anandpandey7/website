import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { API_BASE_URL } from "../config/apiConfig";

const ServiceCard = ({ service, onExplore, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative flex flex-col w-full max-w-[380px] h-[480px] sm:h-[560px] p-4 rounded-[2.5rem] border border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden transition-all duration-500"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
      }}
    >
      {/* Accent Glow */}
      <div 
        className="absolute -top-24 -right-24 w-48 h-48 blur-[80px] rounded-full group-hover:opacity-40 opacity-20 transition-opacity duration-500" 
        style={{ backgroundColor: 'var(--accent)' }}
      />

      {/* Image Section */}
      {/* <div className="relative shrink-0 w-full h-48 mb-6 rounded-[2rem] overflow-hidden shadow-xl">
        {service.thumbnail ? (
          <img
            src={`${API_BASE_URL}${service.thumbnail}`}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl bg-gray-800/50">⚙️</div>
        )}
      </div> */}
      <div className="relative h-72 p-1 overflow-hidden">
        <img
          src={`${API_BASE_URL}${service.thumbnail}`}
          alt={service.title}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="flex flex-col flex-grow overflow-hidden">
        <h3 className="text-2xl font-bold mb-3 tracking-tight shrink-0" style={{ color: 'var(--primary)' }}>
          {service.title}
        </h3>
        
        <div className="relative flex-grow overflow-hidden mb-4">
          <div className="h-full overflow-y-auto pr-2 pl-1 custom-scrollbar text-sm md:text-base leading-relaxed opacity-80" style={{ color: 'var(--primary)' }}>
            {service.description}
            <div className="h-8" />
          </div>
          <div className="absolute bottom-0 left-0 w-full h-12 pointer-events-none bg-gradient-to-t from-[var(--surface)]/10 to-transparent" />
        </div>

        <div className="mt-auto pt-2 shrink-0">
          <button
            onClick={() => onExplore(service)}
            className="relative w-full py-4 px-6 rounded-2xl font-bold overflow-hidden transition-all duration-300 group/btn active:scale-95 shadow-lg"
            style={{ backgroundColor: 'var(--accent)', color: 'var(--secondary)' }}
          >
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
            <span className="relative z-10 flex items-center justify-center gap-2 tracking-widest uppercase text-[10px]">
              View Service Details
              <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const ServicesManager = () => {
  const [services, setServices] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  const themeStyles = {
    backgroundColor: 'var(--surface)',
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/services`);
        const data = await res.json();
        if (data.success) setServices(data.services);
      } catch (err) { console.error(err); }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 1024);
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handleExplore = (service) => navigate(`/services/${service._id}`);

  return (
    <div className="relative min-h-screen py-6 sm:py-10 px-4 md:px-6 transition-colors duration-500" style={themeStyles}>
      <div className="max-w-7xl mx-auto relative z-10">
        <header className="text-center mb-2 sm:mb-16">
          <motion.h2 initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic" style={{ color: 'var(--primary)' }}>
            Our <span style={{ color: 'var(--accent)' }}>Services</span>
          </motion.h2>
          <div className="h-1.5 w-24 mx-auto mt-4 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
        </header>

        <AnimatePresence>
          {isMobile ? (
            <div className="relative px-2 sm:px-8">
              <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={20}
                slidesPerView={1}
                loop={services.length > 1}
                autoplay={{ delay: 4000 }}
                pagination={{ clickable: true, dynamicBullets: true }}
                navigation={true}
                className="pb-16 mobile-service-swiper"
              >
                {services.map((service, index) => (
                  <SwiperSlide key={service._id} className="flex justify-center py-2">
                    <ServiceCard service={service} index={index} onExplore={handleExplore} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          ) : (
            /* DESKTOP CENTERING LOGIC: 
               We use justify-center on the container. 
               The grid will naturally center the items if the content doesn't fill the row.
            */
            <div className="flex flex-wrap justify-center gap-10">
              {services.map((service, index) => (
                <div key={service._id} className="flex justify-center">
                   <ServiceCard service={service} index={index} onExplore={handleExplore} />
                </div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .mobile-service-swiper .swiper-button-next, 
        .mobile-service-swiper .swiper-button-prev {
          color: var(--accent) !important;
          top: 50% !important;
          transform: translateY(-50%);
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(5px);
          width: 45px;
          height: 45px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.2);
        }
        .mobile-service-swiper .swiper-button-prev { left: 0px !important; }
        .mobile-service-swiper .swiper-button-next { right: 0px !important; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 10px; }
      `}} />
    </div>
  );
};

export default ServicesManager;