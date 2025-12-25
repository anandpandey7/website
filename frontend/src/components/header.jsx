import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavigationLink = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="text-secondary hover:text-accent transition duration-300 font-medium px-4 py-2 rounded-lg"
  >
    {children}
  </button>
);

const Header = ({ settings }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const companyName = settings?.companyName || "Company";
  const companyLogo = settings?.companyLogo;

  const navItems = [
    { name: "Home", action: "navigate", path: "/" },
    { name: "Services/Product", action: "scroll", id: "services-section" },
    { name: "OEM/Prototyping", action: "navigate", path: "/oem" },
    { name: "About", action: "scroll", id: "about-section" },
    { name: "Contact", action: "navigate", path: "/contact" },
  ];

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

  return (
    <header className="bg-primary shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo / Company Name */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <span className="text-secondary text-2xl font-bold tracking-wide">
              <span className="text-accent">
                {companyName.split(" ")[0]}
              </span>{" "}
              {companyName.split(" ").slice(1).join(" ")}
            </span>
          </div>

          {/* Desktop Nav */}
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

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-secondary p-2 rounded-md hover:text-accent transition"
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
        <div className="md:hidden bg-primary pb-4">
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
