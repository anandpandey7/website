import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from './components/header.jsx';
import HeroSection from './components/hero.jsx';
import ServiceCard from './components/servicescard.jsx';
import TrustedBy from './components/trustedby.jsx';
import Footer from './components/footer.jsx';
import AboutSection from './components/about.jsx';
import ContactPage from './components/contact.jsx';

// API Configuration
import { API_BASE_URL } from './config/apiConfig';


const App = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/settings`);
        if (!response.ok) {
          throw new Error('Failed to fetch settings');
        }
        const data = await response.json();
        if (data.success && data.setting) {
          setSettings(data.setting);
        }
      } catch (err) {
        console.error('Error fetching settings:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);
    // (after fetching settings)
  useEffect(() => {
    if (settings?.colours) {
      const root = document.documentElement;

      root.style.setProperty("--color-primary", settings.colours.primary);
      root.style.setProperty("--color-secondary", settings.colours.secondary);
      root.style.setProperty("--color-accent", settings.colours.accent);
      root.style.setProperty("--color-surface", settings.colours.surface);
    }
  }, [settings]);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="text-xl font-semibold text-red-600 mb-2">Error Loading Settings</div>
          <div className="text-gray-600">{error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <Router>
      {/* Header on all pages with settings */}
      <Header settings={settings} />

      {/* Page Routes */}
      <Routes>

        {/* HOME PAGE */}
        <Route 
          path="/" 
          element={
            <>
              <HeroSection 
              // settings={settings} 
              />
              <TrustedBy />

              <div id="services-section">
                <ServiceCard />
              </div>
              <div id="about-section">
                <AboutSection />
              </div>
            </>
          }
        />

        {/* SERVICES PAGE */}
        <Route path="/services" element={<ServiceCard />} />

        {/* ABOUT PAGE */}
        <Route path="/about" element={<AboutSection />} />

        {/* CONTACT PAGE */}
        <Route path="/contact" element={<ContactPage  />} />

      </Routes>

      {/* Footer on all pages with settings */}
      <Footer 
      // settings={settings} 
      />
    </Router>
  );
};

export default App;