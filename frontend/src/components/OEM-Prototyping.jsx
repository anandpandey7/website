import React, { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { API_BASE_URL } from '../config/apiConfig';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// --- Helper Components (Defined Outside to prevent Focus Loss) ---

const BackgroundAnimation = () => {
  const particles = useMemo(() => Array.from({ length: 15 }), []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `linear-gradient(var(--accent) 1px, transparent 1px), 
                           linear-gradient(90deg, var(--accent) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: "100%" }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 w-full h-24 opacity-20"
        style={{ background: `linear-gradient(to bottom, transparent, var(--accent), transparent)` }}
      />
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 6 + 2, height: Math.random() * 6 + 2,
            backgroundColor: 'var(--accent)', left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`, filter: 'blur(1px)',
          }}
          animate={{ y: [0, Math.random() * -100, 0], x: [0, Math.random() * 50, 0], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
};

// FormField moved outside so the cursor doesn't jump out on keypress
const FormField = ({ name, placeholder, value, onChange, error, type = "text", isTextArea = false }) => (
  <div className="w-full">
    {isTextArea ? (
      <textarea
        name={name}
        placeholder={placeholder}
        rows="4"
        value={value}
        onChange={onChange}
        className={`border p-3 rounded-xl w-full outline-none transition-all focus:ring-2 bg-white/50 backdrop-blur-sm ${
          error ? "border-red-500 focus:ring-red-200" : "border-gray-200 focus:ring-[var(--accent)]"
        }`}
        style={{ caretColor: 'var(--primary)' }} // Ensures cursor is visible
      />
    ) : (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`border p-3 rounded-xl w-full outline-none transition-all focus:ring-2 bg-white/50 backdrop-blur-sm ${
          error ? "border-red-500 focus:ring-red-200" : "border-gray-200 focus:ring-[var(--accent)]"
        }`}
        style={{ caretColor: 'var(--primary)' }} // Ensures cursor is visible
      />
    )}
    {error && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{error}</p>}
  </div>
);

const FeatureCard = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ y: -10 }}
    className="group relative p-8 rounded-2xl border border-gray-200/50 backdrop-blur-sm shadow-sm bg-white/60 transition-all duration-500 hover:shadow-2xl"
  >
    <div className="relative z-10">
      <div className="flex items-center justify-center w-14 h-14 rounded-xl mb-6 shadow-lg transform transition-transform group-hover:rotate-6 group-hover:scale-110" style={{ backgroundColor: 'var(--accent)', color: 'white' }}>{icon}</div>
      <h3 className="text-xl font-bold mb-3 tracking-tight text-gray-900">{title}</h3>
      <p className="leading-relaxed text-gray-600">{description}</p>
    </div>
  </motion.div>
);

// --- Modal Component ---
const OEMInquiryModal = ({ isOpen, onClose, domains }) => {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', contactNo1: '', contactNo2: '', 
    address: '', projectDescription: '', organization: '', domain: '', 
    projectReport: null, agreedToTerms: false 
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateField = (name, value) => {
    let error = "";
    // Removed name !== 'contactNo2' to make it mandatory
    if (!value && name !== 'organization' && name !== 'projectReport') {
      error = "This field is required";
    } else {
      if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
        error = "Invalid email address";
      }
      if ((name === 'contactNo1' || name === 'contactNo2') && value && !/^\d{10}$/.test(value)) {
        error = "Enter a valid 10-digit number";
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({ ...prev, [name]: val }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e) => setFormData(prev => ({ ...prev, projectReport: e.target.files[0] }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    if (!formData.agreedToTerms) newErrors.agreedToTerms = "Required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fill all mandatory fields correctly");
      return;
    }

    setLoading(true);
    const submissionData = new FormData();
    Object.keys(formData).forEach(key => {
      if (formData[key]) submissionData.append(key, formData[key]);
    });

    try {
      const res = await fetch(`${API_BASE_URL}/api/oem`, { method: "POST", body: submissionData });
      const data = await res.json();
      if (data.success) {
        toast.success("Inquiry Submitted!");
        onClose();
      } else {
        toast.error(data.message || "Submission failed");
      }
    } catch { 
      toast.error("Server connection error"); 
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-2xl font-bold text-gray-900">OEM Project Inquiry</h2>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors text-xl">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField name="firstName" placeholder="First Name *" value={formData.firstName} onChange={handleChange} error={errors.firstName} />
                <FormField name="lastName" placeholder="Last Name *" value={formData.lastName} onChange={handleChange} error={errors.lastName} />
              </div>
              
              <FormField name="email" type="email" placeholder="Email Address *" value={formData.email} onChange={handleChange} error={errors.email} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField name="contactNo1" placeholder="Primary Contact *" value={formData.contactNo1} onChange={handleChange} error={errors.contactNo1} />
                <FormField name="contactNo2" placeholder="Secondary Contact *" value={formData.contactNo2} onChange={handleChange} error={errors.contactNo2} />
              </div>

              <div className="w-full">
                <select 
                  name="domain" 
                  value={formData.domain}
                  onChange={handleChange} 
                  className={`border p-3 rounded-xl w-full outline-none transition-all focus:ring-2 bg-white/50 ${
                    errors.domain ? "border-red-500 focus:ring-red-200" : "border-gray-200 focus:ring-[var(--accent)]"
                  }`}
                >
                  <option value="">Select Domain *</option>
                  {domains.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
                </select>
                {errors.domain && <p className="text-red-500 text-xs mt-1 ml-1 font-medium">{errors.domain}</p>}
              </div>

              <FormField name="projectDescription" placeholder="Project Description *" isTextArea value={formData.projectDescription} onChange={handleChange} error={errors.projectDescription} />
              <FormField name="address" placeholder="Location/Address *" value={formData.address} onChange={handleChange} error={errors.address} />
              <FormField name="organization" placeholder="Organization (Optional)" value={formData.organization} onChange={handleChange} />
              
              <div className="flex flex-col gap-2 p-1">
                 <label className="text-sm font-semibold text-gray-700">Upload Report (PDF/Images)</label>
                 <input type="file" accept=".pdf,.doc,.docx" name="projectReport" onChange={handleFileChange} className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all" />
              </div>

              <div className="flex flex-col gap-1 py-2">
                <div className="flex items-center gap-2">
                    <input type="checkbox" name="agreedToTerms" checked={formData.agreedToTerms} onChange={handleChange} className="w-4 h-4 rounded text-blue-600 focus:ring-[var(--accent)] cursor-pointer" />
                    <label className="text-sm font-medium text-gray-600">I agree to the terms of service *</label>
                </div>
                {errors.agreedToTerms && <p className="text-red-500 text-xs ml-6">{errors.agreedToTerms}</p>}
              </div>

              <button 
                type="submit"
                disabled={loading} 
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg active:scale-[0.98] disabled:bg-gray-400"
                style={{ backgroundColor: 'var(--accent)' }}
              >
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- Main Section Component ---
const OEMPrototypingSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [domains, setDomains] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchDomains = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/domains`);
        const data = await res.json();
        if (data.success) setDomains(data.domains);
      } catch { toast.error("Failed to load domains"); }
    };
    fetchDomains();
  }, []);

  return (
    <section className="relative py-24 px-4 overflow-hidden bg-white">
      <ToastContainer position="top-center" autoClose={3000} />
      <BackgroundAnimation />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.h2 initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="text-4xl md:text-5xl font-black mb-6 tracking-tight" style={{ color: 'var(--primary)' }}>
            OEM & Prototyping Services
            <div className="mt-4 flex justify-center">
              <motion.span initial={{ width: 0 }} whileInView={{ width: "6rem" }} transition={{ duration: 0.8, delay: 0.5 }} className="h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
            </div>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="text-lg max-w-2xl mx-auto leading-relaxed font-medium text-gray-500">
            Bridging the gap between conceptual IoT architecture and mass-market hardware deployment with surgical precision.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <FeatureCard delay={0.1} title="Design & Engineering" description="High-precision CAD modeling and firmware architecture tailored for scalable IoT ecosystems." icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>} />
          <FeatureCard delay={0.2} title="Rapid Prototyping" description="Iterate faster with our in-house 3D printing and PCBA rapid-turnaround capabilities." icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>} />
          <FeatureCard delay={0.3} title="OEM Production" description="End-to-end manufacturing with rigorous quality control for large-scale hardware deployment." icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>} />
        </div>

        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} className="relative max-w-4xl mx-auto group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent)] to-[var(--secondary)] rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative p-12 text-center bg-white/80 backdrop-blur-xl border border-white/20 rounded-3xl shadow-xl">
            <h3 className="text-3xl font-bold mb-4 text-gray-900">Ready to prototype your vision?</h3>
            <p className="text-lg mb-10 text-gray-600">Consult with our senior engineers to map out your product roadmap.</p>
            <motion.button onClick={() => setIsModalOpen(true)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-12 py-4 rounded-full font-bold text-white shadow-lg transition-all" style={{ backgroundColor: 'var(--accent)' }}>
              Contact Engineering Team
            </motion.button>
          </div>
        </motion.div>
      </div>

      <OEMInquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        domains={domains} 
      />
    </section>
  );
};

export default OEMPrototypingSection;