import { API_BASE_URL } from "../config/apiConfig";

const ServiceCard = ({ service, onExplore, index }) => {
  return (
    <div
      className="
        relative
        backdrop-blur-xl
        border rounded-3xl
        shadow-[0_8px_32px_0_rgba(0,0,0,0.3)]
        p-8 flex flex-col items-center text-center max-w-md w-full
        transition-all duration-500
        hover:scale-[1.02] hover:-translate-y-3
        overflow-hidden
      "
      style={{
        animationDelay: `${index * 0.1}s`,
        background: "rgba(255,255,255,0.08)",
        borderColor: "rgba(255,255,255,0.2)",
      }}
    >
      {/* Image */}
      <div className="relative w-full h-56 mb-6 rounded-2xl overflow-hidden shadow-inner group">
        {service.thumbnail ? (
          <img
            src={`${API_BASE_URL}${service.thumbnail}`}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-6xl"
            style={{ background: "var(--surface)", color: "var(--primary)" }}
          >
            🛠️
          </div>
        )}
      </div>

      {/* Title */}
      <h3
        className="text-2xl font-bold mb-3"
        style={{ color: "var(--primary)" }}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p
        className="mb-8 flex-grow text-sm md:text-base"
        style={{ color: "var(--primary)" }}
      >
        {service.description}
      </p>

      <button
        onClick={() => onExplore(service)}
        className="
          group relative overflow-hidden
          font-bold px-10 py-3.5 rounded-2xl
          transition-all duration-300
          hover:shadow-lg active:scale-95 w-full
        "
        style={{ 
          backgroundColor: 'var(--accent)', 
          color: 'var(--secondary)' 
        }}
      >
        <span className="relative z-10 flex items-center justify-center gap-2">
          Explore Solutions
          <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </span>
        {/* Button Hover Glow */}
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
      </button>
    </div>
  );
};

// export default ServiceCard;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { API_BASE_URL } from "../config/apiConfig";
// import ServiceCard from "./ServiceCard";

const ServicesManager = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/services`);
        const data = await res.json();
        if (data.success) {
          setServices(data.services);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchServices();
  }, []);

  const handleExplore = (service) => {
    navigate(`/services/${service._id}`);
  };

  return (
    <div
      className="min-h-screen p-10"
      style={{ backgroundColor: "var(--secondary)" }}
    >
      <h2
        className="text-4xl font-bold text-center mb-12"
        style={{ color: "var(--primary)" }}
      >
        Our Services
      </h2>

      <div className="flex flex-wrap justify-center gap-10">
        {services.map((service, index) => (
          <ServiceCard
            key={service._id}
            service={service}
            index={index}
            onExplore={handleExplore}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicesManager;
