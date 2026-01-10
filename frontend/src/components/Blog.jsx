import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { API_BASE_URL } from "../config/apiConfig";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/posts`);
        const data = await res.json();
        if (data.success) {
          setBlogPosts(data.posts || []);
        }
      } catch (err) {
        console.error("Failed to fetch blog posts", err);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  const truncateText = (text, maxLength = 120) => {
    if (!text) return "";
    return text.length <= maxLength ? text : text.substring(0, maxLength).trim() + "...";
  };

  return (
    <section 
      ref={sectionRef}
      className="py-10 px-6 overflow-hidden relative"
      style={{ backgroundColor: 'var(--secondary)' }}
    >
      {/* Background Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-20" style={{ backgroundColor: 'var(--primary)' }}></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-10" style={{ backgroundColor: 'var(--accent)' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with Animation */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}>
          <h2 className="text-4xl md:text-6xl font-black mb-4" style={{ color: 'var(--primary)' }}>
            Insights & <span style={{ color: 'var(--accent)' }}>Updates</span>
          </h2>
          <div className="w-24 h-1.5 mx-auto rounded-full" style={{ backgroundColor: 'var(--accent)' }}></div>
          <p className="text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--primary)', opacity: 0.7 }}>
            Stay updated with our insights, tips, and industry news.
          </p>
        </div>

        {/* Carousel */}
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Swiper
            modules={[Autoplay, Pagination, Mousewheel, Keyboard]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            loop={true} // Enable loop only if 3 or more posts
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}

            grabCursor={true}
            mousewheel={true}
            keyboard={{ enabled: true }}
            pagination={{
                el: ".swiper-pagination",
                clickable: true,
                dynamicBullets: true,
            }}
            className="pb-16"
          >
            {blogPosts.map((post) => (
              <SwiperSlide key={post._id} className="h-full py-7 px-6">
                <div
                  onClick={() => navigate(`/blog/${post._id}`)}
                  className="group relative h-[500px] flex flex-col
                    backdrop-blur-xl border rounded-[2.5rem]
                    p-6 cursor-pointer transition-all duration-500
                    hover:scale-[1.02] hover:-translate-y-3
                    shadow-[0_10px_40px_rgba(0,0,0,0.075)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.13)]"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    borderColor: "rgba(255,255,255,0.1)",
                  }}
                >
                  {/* Image Container - Full Image with Padding/White Space */}
                  <div className="relative w-full h-64 mb-8 overflow-hidden flex items-center justify-center">
                    <img
                      src={`${API_BASE_URL}${post.image}`}
                      alt={post.title}
                      className="max-w-full max-h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Black Blur Effect on Hover */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                  </div>
                  {/* <div className="relative h-72 p-6 overflow-hidden">
                    <img
                      src={`${API_BASE_URL}${post.image}`}
                      alt={post.title}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div> */}

                  {/* Content */}
                  <div className="flex flex-col flex-grow px-2">
                    <span className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--accent)' }}>
                      {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                    </span>

                    <h3 className="text-2xl md:text-3xl font-bold mb-3 leading-tight transition-colors duration-300 group-hover:text-[var(--accent)]" style={{ color: 'var(--primary)' }}>
                      {post.title}
                    </h3>

                    <p className="text-sm opacity-70 mb-8 line-clamp-3 leading-relaxed" style={{ color: 'var(--primary)' }}>
                      {truncateText(post.description)}
                    </p>

                    {/* Button - Professional Style */}
                    <div className="mt-auto">
                      <button className="group/btn relative overflow-hidden w-full
                        font-bold py-4 rounded-2xl transition-all duration-300
                        flex items-center justify-center gap-2
                        hover:shadow-lg"
                        style={{ backgroundColor: 'var(--accent)', color: 'var(--secondary)' }}
                      >
                        Read Article
                        <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                      </button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="swiper-pagination !bottom-0" />
          </Swiper>
        </div>
      </div>

      <style >{`
        .swiper-pagination-bullet { background: var(--accent); opacity: 0.3; }
        .swiper-pagination-bullet-active { opacity: 1; width: 20px; border-radius: 4px; }

        /* Mobile Adjustments */
        @media (max-width: 640px) {
          .swiper-slide img {
            height: auto;
            max-height: 250px;
            object-fit: cover;
          }

          h3 {
            font-size: 1.5rem; /* Reduce title font size on small screens */
          }

          
        }
      `}</style>
    </section>
  );
};

export default Blog;
