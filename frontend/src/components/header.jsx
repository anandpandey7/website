import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { API_BASE_URL } from "../config/apiConfig";

const NavigationLink = ({ children, onClick, isCompact }) => (
  <button
    onClick={onClick}
    className={`
      relative text-[var(--secondary)]
      hover:text-[var(--accent)] hover:scale-105
      transition-all duration-300 ease-in-out
      font-semibold rounded-lg overflow-hidden
      ${isCompact ? 'px-3 py-1.5 text-sm' : 'px-4 py-2 text-base'}
      before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-[var(--accent)]
      hover:before:w-full before:transition-all before:duration-300
    `}
  >
    {children}
  </button>
);

const Header = ({ settings }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const companyName = settings?.companyName || "Company";
  const companyLogo = settings?.companyLogo;

  const isHomePage = location.pathname === "/";

  const navItems = [
    { name: "Home", action: "navigate", path: "/" },
    { name: "Services/Product", action: "scroll", id: "services-section" },
    { name: "OEM/Prototyping", action: "navigate", path: "/oem" },
    { name: "About", action: "scroll", id: "about-section" },
    { name: "Contact", action: "navigate", path: "/contact" },
  ];

  const filteredNavItems = isHomePage
  ? navItems.filter(item => item.name !== "Home")
  : navItems;


  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('#hero-section');
      const heroHeight = heroSection ? heroSection.offsetHeight : 600;
      
      // Show sticky header after scrolling past hero
      setShowStickyHeader(window.scrollY > heroHeight);
    };

    if (isHomePage) {
      window.addEventListener('scroll', handleScroll);
      handleScroll();
    } else {
      setShowStickyHeader(true); // Always show on other pages
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  const handleNavItemClick = (item) => {
    if (item.action === "scroll") {
      if (window.location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const section = document.getElementById(item.id);
          if (section) section.scrollIntoView({ behavior: "smooth" });
        }, 200);
      } else {
        const section = document.getElementById(item.id);
        if (section) section.scrollIntoView({ behavior: "smooth" });
      }
    }

    if (item.action === "navigate" && item.path) {
      navigate(item.path);
    }
  };

  // Render inline header for hero section (scrolls with page)
  const renderInlineHeader = () => (
    <header className="bg-[var(--primary)] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo / Company Name */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <span className="text-[var(--secondary)] text-2xl font-bold tracking-wide">
              <span className="text-[var(--accent)]">
                {companyName.split(" ")[0]}
              </span>{" "}
              {companyName.split(" ").slice(1).join(" ")}
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-1">
            {filteredNavItems.map((item) => (
              <NavigationLink
                key={item.name}
                onClick={() => handleNavItemClick(item)}
                isCompact={false}
              >
                {item.name}
              </NavigationLink>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[var(--secondary)] p-2 rounded-md hover:text-[var(--accent)] transition"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-[var(--primary)] pb-4 border-t border-[var(--accent)]/30">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <NavigationLink
                key={item.name}
                onClick={() => {
                  handleNavItemClick(item);
                  setIsMenuOpen(false);
                }}
                isCompact={false}
              >
                {item.name}
              </NavigationLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );

  // Render sticky compact header (appears after scrolling)
  const renderStickyHeader = () => (
    <header 
      className={`
        bg-[var(--primary)] 
        shadow-lg 
        sticky top-0 z-50 w-full
        transition-all duration-300 ease-in-out
        ${showStickyHeader ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          
          {/* Logo / Company Name */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            {companyLogo ? (
              <div className="flex items-center gap-3">
                <img 
                  src={API_BASE_URL + companyLogo} 
                  alt={companyName}
                  className="h-10 object-contain rounded-4xl"
                />
                {/* <span className="text-[var(--secondary)] text-lg font-bold tracking-wide">
                  <span className="text-[var(--accent)]">
                    {companyName.split(" ")[0]}
                  </span>
                </span> */}
              </div>
            ) : (
              <span className="text-[var(--secondary)] text-lg font-bold tracking-wide">
                <span className="text-[var(--accent)]">
                  {companyName.split(" ")[0]}
                </span>{" "}
                {companyName.split(" ").slice(1).join(" ")}
              </span>
            )}
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-1">
            {filteredNavItems.map((item) => (
              <NavigationLink
                key={item.name}
                onClick={() => handleNavItemClick(item)}
                isCompact={true}
              >
                {item.name}
              </NavigationLink>
            ))}
          </nav>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[var(--secondary)] p-2 rounded-md hover:text-[var(--accent)] transition"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-[var(--primary)] pb-4 border-t border-[var(--accent)]/30">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <NavigationLink
                key={item.name}
                onClick={() => {
                  handleNavItemClick(item);
                  setIsMenuOpen(false);
                }}
                isCompact={true}
              >
                {item.name}
              </NavigationLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );

  // On home page, show both (inline scrolls away, sticky appears)
  if (isHomePage) {
    return (
      <>
        {renderInlineHeader()}
        {renderStickyHeader()}
      </>
    );
  }

  // On other pages, only show sticky header
  return renderStickyHeader();
};

export default Header;