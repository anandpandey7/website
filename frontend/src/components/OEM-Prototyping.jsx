import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// --- Background Components ---

const BackgroundAnimation = () => {
  // Generate random particles for the IoT "Network" feel
  const particles = useMemo(() => Array.from({ length: 15 }), []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* 1. The Tech Grid - Represents Engineering Precision */}
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `linear-gradient(var(--accent) 1px, transparent 1px), 
                           linear-gradient(90deg, var(--accent) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* 2. Moving Scanning Light Effect */}
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: "100%" }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 w-full h-24 opacity-20"
        style={{
          background: `linear-gradient(to bottom, transparent, var(--accent), transparent)`,
        }}
      />

      {/* 3. Floating Data Nodes (Particles) */}
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
            backgroundColor: 'var(--accent)',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(1px)',
          }}
          animate={{
            y: [0, Math.random() * -100, 0],
            x: [0, Math.random() * 50, 0],
            opacity: [0.2, 0.7, 0.2],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// --- Main Content Components ---

const FeatureCard = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ y: -10 }}
    className="group relative p-8 rounded-2xl border border-gray-200/50 backdrop-blur-sm bg-white/60 transition-all duration-500 hover:shadow-2xl"
  >
    <div className="relative z-10">
      <div 
        className="flex items-center justify-center w-14 h-14 rounded-xl mb-6 shadow-lg transform transition-transform group-hover:rotate-6 group-hover:scale-110"
        style={{ backgroundColor: 'var(--accent)', color: 'white' }}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 tracking-tight text-gray-900">{title}</h3>
      <p className="leading-relaxed text-gray-600">
        {description}
      </p>
    </div>
  </motion.div>
);

const OEMPrototypingSection = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden bg-white">
      {/* Inserted Background Animation Library */}
      <BackgroundAnimation />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black mb-6 tracking-tight"
            style={{ color: 'var(--primary)' }}
          >
            OEM & Prototyping Services
            <div className="mt-4 flex justify-center">
              <motion.span 
                initial={{ width: 0 }}
                whileInView={{ width: "6rem" }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="h-1.5 rounded-full" 
                style={{ backgroundColor: 'var(--accent)' }} 
              />
            </div>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-lg max-w-2xl mx-auto leading-relaxed font-medium text-gray-500"
          >
            Bridging the gap between conceptual IoT architecture and mass-market hardware deployment with surgical precision.
          </motion.p>
        </div>

        {/* Interactive Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <FeatureCard
            delay={0.1}
            title="Design & Engineering"
            description="High-precision CAD modeling and firmware architecture tailored for scalable IoT ecosystems."
            icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}
          />

          <FeatureCard
            delay={0.2}
            title="Rapid Prototyping"
            description="Iterate faster with our in-house 3D printing and PCBA rapid-turnaround capabilities."
            icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
          />

          <FeatureCard
            delay={0.3}
            title="OEM Production"
            description="End-to-end manufacturing with rigorous quality control for large-scale hardware deployment."
            icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
          />
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto group"
        >
          {/* Decorative glow behind CTA */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent)] to-[var(--secondary)] rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          
          <div className="relative p-12 text-center bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl">
            <h3 className="text-3xl font-bold mb-4 text-gray-900">Ready to prototype your vision?</h3>
            <p className="text-lg mb-10 text-gray-600">
              Consult with our senior engineers to map out your product roadmap.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 rounded-full font-bold text-white tracking-wide shadow-lg transition-all"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              Contact Engineering Team
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OEMPrototypingSection;