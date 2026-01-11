import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css'; // This MUST be present for marquee styles

import Header from './components/header.jsx';
import HeroSection from './components/hero.jsx';
import ServiceCard from './components/servicescard.jsx';
import TrustedBy from './components/Clients.jsx';
import Footer from './components/footer.jsx';
import AboutSection from './components/about.jsx';
import ContactPage from './components/contact.jsx';
import ClientDetail from "./components/ClientDetail";
import ServiceDetail from "./components/ServiceDetail";
import Career from './components/Carrier.jsx';
// import Portfolio from './components/Portfolio.jsx';
import Testimonials from './components/Testimonials.jsx';
import JobPage from './components/JobPage.jsx';
import Blog from './components/Blog.jsx';
import CertificatesSection from './components/Certificates.jsx';
import OEMPrototypingSection from './components/OEM-Prototyping.jsx';
import ProductShowcase from './components/Product.jsx';
import MarqueeStyleThree from './components/MarqueeStyleThree.jsx';
import Projects from './components/Projects.jsx';

import { API_BASE_URL } from './config/apiConfig';

const App = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/settings`);
        if (!response.ok) throw new Error('Failed to fetch settings');

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
          <div className="text-xl font-semibold text-red-600 mb-2">
            Error Loading Settings
          </div>
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

  const { colours = {} } = settings || {};

  return (
    <Router>
      {/* 🌈 Inject theme colours as CSS variables */}
      <div
        style={{
          '--primary': colours.primary || '#000000',
          '--secondary': colours.secondary || '#ffffff',
          '--accent': colours.accent || '#2563eb',
          '--surface': colours.surface || '#f3f4f6',
        }}
        className="min-h-screen bg-[var(--secondary)] text-[var(--primary)]"
      >
        {/* Header */}
        <Header settings={settings} />

        <Routes>
          {/* HOME */}
          <Route
            path="/"
            element={
              <>
                <HeroSection settings={settings} />
                <TrustedBy />

                <div id="services-section">
                  <ServiceCard />
                </div>
                <ProductShowcase />
                {/* <Portfolio /> */}
                <Testimonials />
                <Projects />
                <MarqueeStyleThree />
                <Blog />
                {/* <div id="about-section">
                  <AboutSection />
                </div> */}
              </>
            }
          />

          {/* SERVICES */}
          <Route path="/services" element={<ServiceCard />} />

          {/* ABOUT */}
          <Route path="/about" element={<AboutSection />} />

          {/* CONTACT */}
          <Route path="/contact" element={<ContactPage settings={settings} />} />

          <Route path="/clients/:id" element={<ClientDetail />} />

          <Route path="/services/:id" element={<ServiceDetail />} />

          <Route path="/careers" element={<Career />} />
          <Route path="/jobs" element={<JobPage />} />

          <Route path="/certifications" element={<CertificatesSection />} />
          
          <Route path="/oem" element={<OEMPrototypingSection />} />
          
        </Routes>

        {/* Footer */}
        <Footer settings={settings} />
      </div>
    </Router>
  );
};

export default App;
