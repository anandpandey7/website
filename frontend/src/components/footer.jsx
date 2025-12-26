import React from "react";
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaYoutube, FaPinterest, FaSnapchat, FaReddit, FaWhatsapp, FaTumblr, FaGoogle, FaQuora, FaWeixin, FaDiscord } from "react-icons/fa";
import { API_BASE_URL } from "../config/apiConfig";

const Footer = ({ settings }) => {
  // Extract settings data with fallbacks
  const companyName = settings?.companyName || "Company";
  const companyLogo = settings?.companyLogo;
  const phoneNo = settings?.phoneNo || "+91 00000 00000";
  const email = settings?.email || "support@company.com";
  const location = settings?.location || "Location, City, Country";
  const description = settings?.description || "Driving innovation with tailored solutions.";
  const social = settings?.social || {};

  // Map social platforms to icons
  const socialIcons = {
    facebook: { icon: FaFacebook, label: "Facebook" },
    instagram: { icon: FaInstagram, label: "Instagram" },
    linkedin: { icon: FaLinkedin, label: "LinkedIn" },
    twitter: { icon: FaTwitter, label: "Twitter" },
    youtube: { icon: FaYoutube, label: "YouTube" },
    pinterest: { icon: FaPinterest, label: "Pinterest" },
    snapchat: { icon: FaSnapchat, label: "Snapchat" },
    reddit: { icon: FaReddit, label: "Reddit" },
    whatsapp: { icon: FaWhatsapp, label: "WhatsApp" },
    tumblr: { icon: FaTumblr, label: "Tumblr" },
    googleMyBusiness: { icon: FaGoogle, label: "Google My Business" },
    quora: { icon: FaQuora, label: "Quora" },
    wechat: { icon: FaWeixin, label: "WeChat" },
    discord: { icon: FaDiscord, label: "Discord" },
  };

  // Filter and map active social links
  const activeSocials = Object.entries(social).filter(([key, url]) => url && url.trim() !== "").map(([key, url]) => ({
    key,
    url,
    ...socialIcons[key],
  }));

  return (
    <footer 
      className="relative bg-[var(--primary)] pt-16 pb-10 overflow-hidden"
      style={{
        '--primary': settings?.colours?.primary || '#000000',
        '--secondary': settings?.colours?.secondary || '#ffffff',
        '--accent': settings?.colours?.accent || '#2563eb',
        '--surface': settings?.colours?.surface || '#f3f4f6',
      }}
    >
      {/* Background Overlay for Depth */}
      <div className="absolute inset-0 bg-[var(--accent)]/5 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--accent)] to-[var(--primary)]"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
        
        {/* Company Info with Logo */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            {companyLogo && (
              <img 
                src={API_BASE_URL + companyLogo} 
                alt={companyName} 
                className="h-12 w-auto object-contain drop-shadow-lg rounded-4xl" 
              />
            )}
            <h3 className="text-2xl font-bold text-[var(--secondary)] drop-shadow-md">{companyName}</h3>
          </div>
          <p className="text-[var(--secondary)]/80 leading-relaxed animate-fade-in">
            {description}
          </p>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-[var(--accent)] drop-shadow-sm">Contact Us</h3>
          <p className="text-[var(--secondary)]/80 flex items-center gap-2">
            <span className="text-[var(--accent)]">📍</span> {location}
          </p>
          <p className="text-[var(--secondary)]/80 flex items-center gap-2">
            <span className="text-[var(--accent)]">📞</span> {phoneNo}
          </p>
          <p className="text-[var(--secondary)]/80 flex items-center gap-2">
            <span className="text-[var(--accent)]">📧</span> {email}
          </p>
        </div>

        {/* Social Media */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-[var(--accent)] drop-shadow-sm">Follow Us</h3>
          <div className="flex flex-wrap gap-4 text-2xl">
            {activeSocials.map(({ key, url, icon: Icon, label }) => (
              <a 
                key={key} 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[var(--secondary)] hover:text-[var(--accent)] hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/50 rounded-full p-2"
                aria-label={label}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar with Enhanced Styling */}
      <div className="text-center mt-10 border-t border-[var(--secondary)]/20 pt-6 text-[var(--secondary)]/70 text-sm animate-slide-up">
        © {new Date().getFullYear()} {companyName}. All rights reserved. | 
        <a href="#" className="hover:text-[var(--accent)] ml-2 transition-colors">Privacy Policy</a> | 
        <a href="#" className="hover:text-[var(--accent)] ml-2 transition-colors">Terms of Service</a>
      </div>
    </footer>
  );
};

export default Footer;