import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { API_BASE_URL } from '../config/apiConfig'

const Projects = ({ onProjectClick }) => {
  const sectionRef = useRef(null)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentImages, setCurrentImages] = useState({})

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/clients`)
        const data = await response.json()
        
        if (data.success) {
          const validProjects = data.projects.filter(p => 
            p.logo || (p.gallery && p.gallery.length > 0)
          )
          setProjects(validProjects)
          
          const initialImages = {}
          validProjects.forEach(p => {
            const allImages = [p.logo, ...(p.gallery || [])].filter(Boolean)
            initialImages[p._id] = allImages[0]
          })
          setCurrentImages(initialImages)
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  useEffect(() => {
    if (projects.length === 0) return

    const interval = setInterval(() => {
      setCurrentImages(prev => {
        const updated = { ...prev }
        
        projects.forEach(project => {
          const allImages = [project.logo, ...(project.gallery || [])].filter(Boolean)
          if (allImages.length > 1) {
            const currentIndex = allImages.indexOf(prev[project._id])
            const nextIndex = (currentIndex + 1) % allImages.length
            updated[project._id] = allImages[nextIndex]
          }
        })
        
        return updated
      })
    }, 4000) // Slightly slower for premium feel

    return () => clearInterval(interval)
  }, [projects])

  useEffect(() => {
    if (projects.length === 0) return

    const ctx = gsap.context(() => {
      gsap.from('.project-card', {
        opacity: 0,
        y: 80, // More pronounced lift
        duration: 1.2, // Slower for elegance
        stagger: 0.15,
        ease: 'power4.out' // Smoother easing
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [projects])

  const getGridClass = (index) => {
    const pattern = [
      'lg:col-span-2',
      'lg:col-span-1',
      'lg:col-span-1',
      'lg:col-span-1',
      'lg:col-span-1',
      'lg:col-span-2'
    ]
    return pattern[index % pattern.length]
  }

  const handleProjectClick = (projectId) => {
    if (onProjectClick) {
      onProjectClick(projectId)
    } else {
      window.location.href = `/clients/${projectId}`
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4 border-gray-400"></div>
          <p className="text-lg font-medium text-gray-700">
            Loading exceptional projects...
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="backdrop-blur-sm rounded-2xl p-8 max-w-md border border-gray-200 bg-white/80">
          <p className="text-lg font-medium text-gray-800">
            ⚠️ Error loading projects
          </p>
          <p className="mt-2 text-gray-600">
            {error}
          </p>
        </div>
      </div>
    )
  }

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen py-20 px-4 relative overflow-hidden bg-gray-50"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl bg-gray-200/20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl bg-gray-300/10 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20 space-y-6">
          <div className="inline-block">
            <span className="text-sm font-semibold tracking-widest uppercase px-6 py-3 rounded-full border border-gray-300 bg-white/50 text-gray-700">
              Selected Works
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
            Showcasing{' '}
            <span className="text-amber-600">Your Projects</span> {/* Subtle gold accent */}
          </h1>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed text-gray-600">
            Exceptional craftsmanship meets innovative design in our curated portfolio.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {projects.map((project, index) => {
            const imageUrl = currentImages[project._id] 
              ? `${API_BASE_URL}${currentImages[project._id]}`
              : '/placeholder-image.jpg'

            return (
              <div
                key={project._id}
                className={`project-card ${getGridClass(index)} group cursor-pointer`}
                onClick={() => handleProjectClick(project._id)}
              >
                <div className="relative h-full bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-lg transition-all duration-700 hover:shadow-2xl hover:shadow-gray-300/50 group-hover:-translate-y-2">
                  {/* Image Container */}
                  <div className="relative h-80 overflow-hidden">
                    <img 
                      src={imageUrl}
                      alt={project.projectName}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
                      onError={(e) => {
                        e.target.src = '/placeholder-image.jpg'
                      }}
                    />
                    {/* Subtle Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Minimal Hover Icon */}
                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center transform translate-x-12 group-hover:translate-x-0 transition-all duration-500 shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3 bg-white/90 backdrop-blur-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold tracking-wider uppercase text-gray-500">
                        {project.clientName}
                      </span>
                      {project.rating > 0 && (
                        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-100">
                          <svg className="w-3 h-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-xs font-medium text-amber-700">{project.rating}</span>
                        </div>
                      )}
                    </div>
                    <h3 className="text-2xl font-bold leading-tight text-gray-900 group-hover:text-amber-600 transition-colors duration-300">
                      {project.projectName}
                    </h3>
                    <p className="text-sm line-clamp-2 text-gray-600">
                      {project.projectDescription}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA Button */}
        {
          <div className="text-center">
            <button className="group relative inline-flex items-center gap-3 font-semibold px-10 py-5 rounded-full bg-gray-900 text-white hover:bg-amber-600 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-amber-300/50 transform hover:scale-105">
              <span>Contact For Automation</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        }
      </div>
    </section>
  )
}

export default Projects