import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from './components/header.jsx';
import HeroSection from './components/hero.jsx';
import ServiceCard from './components/servicescard.jsx';
import TrustedBy from './components/trustedby.jsx';
import Footer from './components/footer.jsx';
import AboutSection from './components/about.jsx';
import ContactPage from './components/contact.jsx';

const App = () => {
  return (
    <Router>
      {/* Header on all pages */}
      <Header />

      {/* Page Routes */}
      <Routes>

        {/* HOME PAGE */}
        <Route 
          path="/" 
          element={
            <>
              <HeroSection />
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

        <Route path="/contact" element={<ContactPage />} />

      </Routes>

      {/* Footer on all pages */}
      <Footer />
    </Router>
  );
};

export default App;
