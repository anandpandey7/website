// components/Header.jsx
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

// Reusable navigation button
const NavigationLink = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="text-white hover:text-da-accent transition duration-300 font-medium px-4 py-2 rounded-lg"
  >
    {children}
  </button>
);

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Navigation items
  const navItems = [
  { name: 'Home', action: 'navigate', path: '/' },
  { name: 'Services/Product', action: 'scroll', id: 'services-section' },
  { name: 'OEM/Prototyping', action: 'navigate', path: '/oem' },
  { name: 'About', action: 'scroll', id: 'about-section' },
  { name: 'Contact', action: 'navigate', path: '/contact' },
];


  // Main handler for navigation
  const handleNavItemClick = (item) => {

    // Scroll event
    if (item.action === 'scroll') {
  // If user is not on home page, navigate first
  if (window.location.pathname !== "/") {
    navigate("/", { replace: false });

    // Scroll after route loads
    setTimeout(() => {
      const section = document.getElementById(item.id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }, 200);

  } else {
    // Already on homepage → scroll normally
    const section = document.getElementById(item.id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }
  return;
}

    // Navigate event
    if (item.action === 'navigate' && item.path) {
      navigate(item.path);
      return;
    }
  };

  return (
    <header className="bg-da-primary shadow-lg sticky top-0 z-50">

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-white text-2xl font-bold tracking-wider">
              DHARTI <span className="text-da-accent">AUTOMATION</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <NavigationLink
                key={item.name}
                onClick={() => handleNavItemClick(item)}
              >
                {item.name}
              </NavigationLink>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-da-accent p-2 rounded-md"
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
                      ? "M6 18L18 6M6 6l12 12"  // close icon
                      : "M4 6h16M4 12h16M4 18h16" // hamburger icon
                  }
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-da-primary pb-4">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <NavigationLink
                key={item.name}
                onClick={() => {
                  handleNavItemClick(item);
                  setIsMenuOpen(false);
                }}
              >
                {item.name}
              </NavigationLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
