import React from 'react';

import hotelImage from '../assets/hotelimage.png';
import agricultureImage from '../assets/agricultureimage.png';
import industrialImage from '../assets/industrialimage.png';
import hospitalImage from '../assets/hospitalimage.png';
import homeImage from '../assets/homeimage.png';


const ServiceCard = ({ image, title, description, buttonText = "Explore Solutions" }) => {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center text-center max-w-md w-full transition-transform hover:scale-105">
      {/* Image Container */}
      <div className="w-full h-64 mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
        {image ? (
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-blue-300 text-6xl">🏢</div>
        )}
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
        {description}
      </p>

      {/* Button */}
      <button className="border border-blue-400 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold px-8 py-3 rounded-lg transition-all">
        {buttonText}
      </button>

    </div>
  );
};

// Example usage with demo data
const ServiceCardDemo = () => {
  const exampleCards = [
    {
      image: homeImage,
      title: "Home Solutions",
      description: "Pre-built recipes as simple IoT solutions or accelerators for verticals that can be used as-is or customised to fit requirements."
    },
    {
      image: hospitalImage,
      title: "Hospital Services",
      description: "Scalable cloud infrastructure solutions designed to grow with your business needs and optimize performance."
    },
    {
      image: hotelImage,
      title: "Hotel Services",
      description: "Scalable cloud infrastructure solutions designed to grow with your business needs and optimize performance."
    },
    {
      image: agricultureImage,
      title: "Agriculture Services",
      description: "Scalable cloud infrastructure solutions designed to grow with your business needs and optimize performance."
    },
    {
      image: industrialImage,
      title: "Industrial Services",
      description: "Scalable cloud infrastructure solutions designed to grow with your business needs and optimize performance."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {exampleCards.map((card, index) => (
          <ServiceCard
            key={index}
            image={card.image}
            title={card.title}
            description={card.description}
          />
        ))}
      </div>
    </div>
  );
};

export default ServiceCardDemo;