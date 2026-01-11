import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { API_BASE_URL } from '../config/apiConfig';

/* --- Individual Project Card (Self-Contained) --- */
const ProjectCard = ({ project, index, navigate }) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const allImages = [project.logo, ...(project.gallery || [])].filter(Boolean);

  // Requirement: 3-second image rotation
  useEffect(() => {
    if (allImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % allImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [allImages]);

  // Masonry Grid Logic: 1st and 6th items are double-width
  const isLarge = index % 6 === 0 || index % 6 === 5;
  const colClass = isLarge ? "lg:col-span-2 md:col-span-2 col-span-1" : "lg:col-span-1 md:col-span-1 col-span-1";

  return (
    <div 
      onClick={() => navigate(`/clients/${project._id}`)}
      className={`${colClass} group relative h-[450px] overflow-hidden rounded-[30px] bg-white shadow-xl project-anim cursor-pointer`}
    >
      {/* 1. Image Layer */}
      <div className="absolute inset-0 z-0">
        {allImages.map((img, i) => (
          <img
            key={i}
            src={`${API_BASE_URL}${img}`}
            alt={project.projectName}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
              i === currentImgIndex ? "opacity-100 scale-100" : "opacity-0"
            } group-hover:scale-110 transition-transform duration-700`}
          />
        ))}
      </div>

      {/* 2. The Blue Reveal Overlay (Replaces your project-block-three:before) */}
      <div className="absolute inset-0 bg-[#5966EC]/90 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-10 flex flex-col justify-end p-10 rounded-tr-[150px]">
        <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-2">
          {project.projectName}
        </p>
        <h4 className="text-white text-2xl font-bold leading-tight mb-6">
          {project.projectDescription || "Advanced IoT Deployment"}
        </h4>
      </div>

      {/* 3. The Rotating Center Icon */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center z-20 scale-0 rotate-[-45deg] group-hover:scale-100 group-hover:rotate-0 transition-all duration-500 shadow-2xl">
        <svg className="w-6 h-6 text-[#5966EC]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>

      {/* 4. Bottom Info Bar (Visible when NOT hovering) */}
      <div className="absolute bottom-0 left-0 w-full p-6 bg-white/95 backdrop-blur-sm z-5 group-hover:opacity-0 transition-opacity duration-300">
        <span className="text-[#5966EC] text-[10px] font-black uppercase tracking-widest">Dharti Client: {project.clientName}</span>
        <h3 className="text-gray-900 text-lg font-bold truncate mt-1">{project.projectName}</h3>
      </div>
    </div>
  );
};

/* --- Main Section --- */
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/clients`);
        const data = await response.json();
        if (data.success) {
          // Requirement: At least one image must exist
          const filtered = data.projects.filter(p => p.logo || p.gallery?.length > 0);
          setProjects(filtered);
        }
      } catch (err) {
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // GSAP Entrance Animation
  useEffect(() => {
    if (!loading && projects.length > 0) {
      const ctx = gsap.context(() => {
        gsap.from('.project-anim', {
          opacity: 0,
          y: 40,
          duration: 1,
          stagger: 0.1,
          ease: 'power3.out'
        });
      }, sectionRef);
      return () => ctx.revert();
    }
  }, [loading, projects]);

  if (loading) return (
    <div className="h-96 flex flex-col items-center justify-center gap-4 bg-gray-50">
      <div className="w-12 h-12 border-4 border-[#5966EC] border-t-transparent rounded-full animate-spin"></div>
      <p className="font-bold text-[#5966EC] animate-pulse">Syncing Dharti Projects...</p>
    </div>
  );

  return (
    <section ref={sectionRef} id="project" className="relative py-24 px-6 bg-[#F2F1F6] overflow-hidden">
      
      {/* Background Stroke Decorator */}
      {/* CASE STUDY BACKGROUND STROKE */}
      <div className="absolute top-20 left-0 w-full text-center pointer-events-none select-none overflow-hidden opacity-[0.04]">
        <h2 className="text-[18vw] font-black text-black uppercase leading-none" style={{ WebkitTextStroke: '2px black', color: 'transparent' }}>
          Portfolio
        </h2>
      </div>

      

      <div className="max-w-[1400px] mx-auto relative z-10">
        {/* Header Section */}
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 project-anim">
          <div className="lg:col-span-7">
            <span className="flex items-center gap-3 text-[#5966EC] font-bold uppercase tracking-[3px] text-xs mb-4">
              <img className="w-4 h-4" src="/src/assets/sub-title-shape.png" alt="" />
              Selected Works
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight">
              Our <span className="italic font-light text-[var(--primary)]">Projects</span>
            </h2>
          </div>
          <div className="lg:col-span-5 flex items-end">
            <p className="text-gray-500 text-lg leading-relaxed border-l-4 border-[#5966EC] pl-6">
              Showcasing precision-engineered automation and large-scale IoT deployments 
              across industrial and residential sectors.
            </p>
          </div>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project._id} 
              project={project} 
              index={index} 
              navigate={navigate} 
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center project-anim">
          <button 
            onClick={() => navigate('/portfolio')}
            className="inline-flex items-center gap-3 bg-[#222] text-white px-10 py-4 rounded-full font-bold hover:bg-[var(--primary)] transition-all duration-300 shadow-xl active:scale-95"
          >
            Automate Your Future
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;