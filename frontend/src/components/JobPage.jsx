import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/apiConfig";
import { Briefcase, MapPin, Clock, Star, Users, Rocket } from "lucide-react";
// Integrated Toastify
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  const [generalForm, setGeneralForm] = useState({
    name: "", email: "", phone: "", details: "", jobName: "", cv: null, jobId: null, jobTitle: null
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/jobs`);
        const data = await res.json();
        if (data.success) setJobs(data.jobs || []);
      } catch (err) {
        console.error("Failed to fetch jobs", err);
        toast.error("Could not load job listings.");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleJobClick = (job) => {
    setSelectedJob(job);
    setGeneralForm({
      ...generalForm,
      jobId: job._id,
      jobTitle: job.title,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e, isModal = false) => {
    e.preventDefault();
    
    // Basic Validation check for file
    if (!generalForm.cv) {
      toast.warning("Please upload your CV before submitting.");
      return;
    }

    const formData = new FormData();
    Object.keys(generalForm).forEach(key => {
      if (generalForm[key]) formData.append(key, generalForm[key]);
    });

    // Show a loading toast for better UX
    const loadId = toast.loading("Submitting your application...");

    try {
      const res = await fetch(`${API_BASE_URL}/api/careers`, {
        method: "POST",
        body: formData
      });
      
      if (res.ok) {
        toast.update(loadId, { 
          render: "Application submitted successfully!", 
          type: "success", 
          isLoading: false, 
          autoClose: 3000 
        });
        
        setGeneralForm({ name: "", email: "", phone: "", details: "", jobName: "", cv: null, jobId: null, jobTitle: null });
        if (isModal) setShowModal(false);
      } else {
        toast.update(loadId, { 
          render: "Failed to submit. Please try again.", 
          type: "error", 
          isLoading: false, 
          autoClose: 3000 
        });
      }
    } catch (err) {
      toast.update(loadId, { 
        render: "Error connecting to server.", 
        type: "error", 
        isLoading: false, 
        autoClose: 3000 
      });
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="bg-gray-50 font-sans">
      {/* Container for Toasts */}
      <ToastContainer position="top-center" autoClose={3000} />

      {/* 1. HERO SECTION */}
      <section className="relative bg-blue-900 py-20 px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-extrabold mb-6 tracking-tight">Shape the Future With Us</h1>
          <p className="text-xl text-blue-100 opacity-90">
            We are looking for passionate individuals to join our mission. Explore our open roles and find your next challenge.
          </p>
        </div>
      </section>

      {/* 2. VALUES / WHY JOIN US SECTION */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Why Work With Us?</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mt-4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ValueCard 
            icon={<Rocket className="w-8 h-8 text-blue-600" />} 
            title="Growth Mindset" 
            desc="Continuous learning opportunities and clear career paths for every team member." 
          />
          <ValueCard 
            icon={<Users className="w-8 h-8 text-blue-600" />} 
            title="Great Culture" 
            desc="A collaborative environment where your voice is heard and diversity is celebrated." 
          />
          <ValueCard 
            icon={<Star className="w-8 h-8 text-blue-600" />} 
            title="Impactful Work" 
            desc="Solve complex problems that make a real difference in the industries we serve." 
          />
        </div>
      </section>

      {/* 3. JOB OPENINGS SECTION */}
      <section className="py-16 bg-white border-t border-gray-100 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-gray-900 flex items-center gap-2">
            <Briefcase /> Current Openings
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
            {jobs.length > 0 ? jobs.map((job) => (
              <div key={job._id} className="group border border-gray-200 rounded-xl p-6 hover:border-blue-500 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600">{job.title}</h3>
                    <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">{job.employmentType}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{job.description}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
                    <span className="flex items-center gap-1"><MapPin size={16}/> {job.location.type} {job.location.city && `(${job.location.city})`}</span>
                    <span className="flex items-center gap-1"><Clock size={16}/> {job.experienceLevel}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleJobClick(job)}
                  className="w-full md:w-max bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                >
                  Apply Now
                </button>
              </div>
            )) : <p className="text-gray-500 italic">No open positions currently. Check back soon!</p>}
          </div>
        </div>
      </section>

      {/* 4. GENERAL APPLICATION FORM */}
      <section className="py-16 bg-gray-50 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Don't see a fit?</h2>
          <p className="text-gray-600 mb-8">Send us your CV anyway! We are always looking for talented people to join our database for future opportunities.</p>
          <form onSubmit={(e) => handleSubmit(e)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput label="Full Name" value={generalForm.name} onChange={(val) => setGeneralForm({...generalForm, name: val})} />
            <FormInput label="Email Address" type="email" value={generalForm.email} onChange={(val) => setGeneralForm({...generalForm, email: val})} />
            <FormInput label="Phone Number" type="tel" value={generalForm.phone} onChange={(val) => setGeneralForm({...generalForm, phone: val})} />
            
            <div className="md:col-span-2">
               <label className="block mb-1" style={{ color: "var(--primary)" }}>Upload CV</label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setGeneralForm({...generalForm, cv: e.target.files[0]})}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Details</label>
              <textarea rows="4" className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setGeneralForm({...generalForm, details: e.target.value})} />
            </div>
            <button type="submit" className="md:col-span-2 bg-blue-600 text-white py-4 rounded-lg font-bold hover:bg-blue-700 transition-all">Submit Application</button>
          </form>
        </div>
      </section>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full relative shadow-2xl">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
            <h2 className="text-2xl font-bold mb-2">Apply for {selectedJob?.title}</h2>
            <p className="text-sm text-gray-500 mb-6">Complete the form below to submit your application.</p>
            <form onSubmit={(e) => handleSubmit(e, true)} className="space-y-4">
              <FormInput label="Full Name" value={generalForm.name} onChange={(val) => setGeneralForm({...generalForm, name: val})} />
              <FormInput label="Email" type="email" value={generalForm.email} onChange={(val) => setGeneralForm({...generalForm, email: val})} />
              
              <div className="grid grid-cols-2 gap-4">
                <FormInput label="Phone" type="tel" value={generalForm.phone} onChange={(val) => setGeneralForm({...generalForm, phone: val})} />
                <div>
                  <label className="block mb-1" style={{ color: "var(--primary)" }}>CV</label>
                  <input 
                    type="file" 
                    accept=".pdf,.doc,.docx" 
                    required 
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" 
                    onChange={(e) => setGeneralForm({...generalForm, cv: e.target.files[0]})} 
                  />
                </div>
              </div>

              <textarea 
                placeholder="Tell us why you're a good fit..." 
                className="w-full p-3 border rounded-lg text-sm" 
                rows="3" 
                onChange={(e) => setGeneralForm({...generalForm, details: e.target.value})} 
              />

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold">Send Application</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

/* --- Helper Components --- */

const ValueCard = ({ icon, title, desc }) => (
  <div className="p-8 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{desc}</p>
  </div>
);

const FormInput = ({ label, type = "text", placeholder, value, onChange }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
      required
    />
  </div>
);

export default JobsPage;