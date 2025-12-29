import React from "react";
import homepageBannerVideo from "../assets/homepage_banner.mp4";
import logoAnimation from "../assets/logo_animation.mp4";

/**
 * HeroSection Component
 * 
 * An upgraded, visually striking hero section with enhanced animations, gradients, and interactive elements.
 * Leverages CSS custom properties (--primary, --secondary, --accent, --surface) for theming.
 */
const HeroSection = () => {
  return (
    <section 
      className="relative bg-gradient-to-br from-[var(--secondary)] via-[var(--secondary)] to-[var(--primary)]/20 py-8 md:pt-0 pb-12 overflow-hidden"
      aria-labelledby="hero-headline"
    >
      {/* Floating Particles Background (Optional: Add via CSS or library) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-2 h-2 bg-[var(--accent)]/30 rounded-full animate-pulse"></div>
        <div className="absolute top-20 right-20 w-1 h-1 bg-[var(--primary)]/40 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-[var(--accent)]/20 rounded-full animate-ping"></div>
        <div className="absolute bottom-30 left-2/3 w-3 h-3 bg-[var(--accent)]/20 rounded-full animate-ping"></div>

        {/* More new effects */}
        <div 
          className=" blur-3xl  sm:blur-xl absolute top-90 left-10 w-20 h-20 rounded-full animate-pulse"
          style={{ backgroundColor: 'var(--accent)', opacity: 0.1 }}
        ></div>
        <div className="absolute top-25 right-5 w-4 h-4 bg-[var(--accent)]/40 rounded-full animate-pulse"></div>
        <div className="absolute top-50 left-3/7 w-2 h-2 bg-[var(--primary)]/60 rounded-full animate-bounce"></div>
        <div className="absolute top-75 right-1/4 w-2 h-2 bg-[var(--accent)]/70 rounded-full animate-ping"></div>
        
        {/* Diagonal and off-center effects */}
        <div className="absolute top-60 left-1/4 w-3 h-3 bg-[var(--primary)]/40 rounded-full animate-pulse"></div>
        <div className="absolute top-80 right-10 w-3 h-3 bg-[var(--accent)]/50 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-3/4 w-2 h-2 bg-[var(--accent)]/30 rounded-full animate-ping"></div>
        <div className="absolute bottom-10 left-1/3 w-2 h-2 bg-[var(--primary)]/30 rounded-full animate-pulse"></div>

        {/* Extra layered effects */}
        <div className="absolute top-35 left-1/5 w-3 h-3 bg-[var(--primary)]/50 rounded-full animate-spin"></div>
        <div className="absolute bottom-50 right-1/2 w-4 h-4 bg-[var(--accent)]/60 rounded-full animate-bounce"></div>
    </div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Grid: Left Content + Right Video */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* Left Side: Animated Logo Video + Text Content */}
          <div className="space-y-6 md:space-y-8">
            
            {/* Logo Animation Video (Plays Once) with Glassmorphism Overlay */}
            <div
              className="
                relative aspect-video
                bg-[var(--surface)]/80 backdrop-blur-md
                rounded-2xl shadow-2xl overflow-hidden
                border border-[var(--primary)]/30
                transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]
                before:absolute before:inset-0 before:bg-gradient-to-t before:from-[var(--accent)]/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500
              "
              role="img"
              aria-label="Company logo animation"
            >
              <video
                src={logoAnimation}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
                preload="metadata"
              />
              {/* Subtle Overlay for Depth */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[var(--primary)]/10"></div>
            </div>
            
            {/* Headline, Description, and CTA */}
            <div className="text-left space-y-4">
              <h1 
                id="hero-headline"
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[var(--primary)] leading-tight drop-shadow-lg"
              >
                Automate Your Future.{" "}
                <span className="text-[var(--accent)] bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] bg-clip-text text-transparent">
                  Today.
                </span>
              </h1>
              
              <p className="text-base md:text-lg text-[var(--primary)]/80 max-w-xl leading-relaxed drop-shadow-sm">
                Leveraging cutting-edge technology to simplify complex processes and drive
                sustainable growth for your business.
              </p>
              
              <a
                href="#get-started"
                className="
                  relative inline-flex items-center justify-center
                  px-8 md:px-10 py-4 md:py-5
                  text-[var(--secondary)]
                  bg-gradient-to-r from-[var(--accent)] to-[var(--primary)]
                  hover:from-[var(--primary)] hover:to-[var(--accent)]
                  focus:from-[var(--primary)] focus:to-[var(--accent)]
                  focus:outline-none focus:ring-4 focus:ring-[var(--accent)]/50 focus:ring-offset-2
                  rounded-full text-base md:text-lg font-semibold
                  shadow-xl transform hover:scale-110 focus:scale-110
                  transition-all duration-300 overflow-hidden
                  before:absolute before:inset-0 before:bg-white/20 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
                "
                aria-label="Get started with our services"
              >
                <span className="relative z-10">Get Started Now</span>
                {/* Ripple Effect */}
                <span className="absolute inset-0 rounded-full bg-white/30 scale-0 hover:scale-150 transition-transform duration-500"></span>
              </a>
            </div>
          </div>
          
          {/* Right Side: Homepage Banner Video (Looped) with Enhanced Effects */}
          <div
            className="
              relative aspect-video md:aspect-[16/20]
              rounded-2xl overflow-hidden
              border-2 border-[var(--accent)]/50
              hover:border-[var(--accent)]
              transition-all duration-500 shadow-2xl hover:shadow-[0_25px_50px_rgba(0,0,0,0.4)]
            "
            role="img"
            aria-label="Homepage banner video showcasing services"
          >
            <video
              src={homepageBannerVideo}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              preload="metadata"
            />
          </div>
        </div>
        
        {/* Upgraded Scroll Indicator */}
        <div className="flex flex-col items-center mt-12 md:mt-16 space-y-2">
          <p className="text-sm md:text-base text-[var(--primary)]/70 font-medium animate-fade-in">Scroll Down</p>
          <div className="relative w-6 h-10 border-2 border-[var(--primary)]/60 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[var(--accent)] rounded-full mt-2 animate-bounce"></div>
          </div>
          <svg 
            className="w-4 h-4 text-[var(--primary)]/60 animate-pulse mt-2" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;