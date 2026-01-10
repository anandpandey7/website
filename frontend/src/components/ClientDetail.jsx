import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../config/apiConfig";

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';



const ClientDetail = () => {
  const swiperRef = useRef(null);
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Prefix API_BASE_URL to relative image src from CKEditor HTML
  const addBaseUrlToImages = (html = "") => {
    return html.replace(
      /<img\s+[^>]*src="([^"]+)"[^>]*>/gi,
      (match, src) => {
        if (
          src.startsWith("http://") ||
          src.startsWith("https://") ||
          src.startsWith("data:")
        ) {
          return match;
        }
        return match.replace(src, `${API_BASE_URL}${src}`);
      }
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0); 
    const fetchClient = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/clients/${id}`);
        const data = await res.json();

        if (data.success) {
          setClient(data.project);
        } else {
          setError("Client not found");
        }
      } catch (err) {
        console.error("Fetch client error:", err);
        setError("Failed to load client");
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[var(--primary)]">
        Loading...
      </div>
    );
  }

  if (error || !client) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[var(--accent)]">
        {error || "Client not found"}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--secondary)] py-12 px-4">
      <div className="max-w-5xl mx-auto bg-[var(--surface)] rounded-xl shadow-lg p-8">

        {/* 🔹 WYSIWYG HTML from CKEditor */}
        <div
          className="prose max-w-none text-[var(--primary)]"
          dangerouslySetInnerHTML={{
            __html: addBaseUrlToImages(
              client.projectLongDescription ||
                "<p>No description provided.</p>"
            ),
          }}
        />
      </div>
      {client.gallery && client.gallery.length > 0 && (
  <div className=" flex justify-center items-center max-w-6xl mx-auto px-0.5 sm:px-6 mt-16">

       <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="px-1 py-1 sm:px-2 sm:py-2 bg-black text-white rounded-4xl mx-0.5 sm:mx-4 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          modules={[Pagination, Scrollbar, A11y]}
          spaceBetween={20} // spacing between slides
          slidesPerView={1} // default
          breakpoints={{
            // when window width >= 640px (tablet)
            640: {
              slidesPerView: 1,
            },
            // when window width >= 768px (small laptop)
            768: {
              slidesPerView: 2,
            },
            // when window width >= 1024px (desktop)
            1024: {
              slidesPerView: 3,
            },
          }}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {client.gallery.map((image, index) => (
            <SwiperSlide key={index}>
              <Card image={image} />
            </SwiperSlide>
          ))}
        </Swiper>


        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="px-1 py-1 sm:px-2 sm:py-2 bg-black text-white rounded-4xl mx-0.5 sm:mx-4 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    )}
    </div>
  );
};

const Card = ({ image }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="pt-20 pb-10 cursor-pointer">
      <img 
        src={`${API_BASE_URL}${image}`}
        alt="Client Image"
        className="w-full h-auto rounded-lg shadow-md"
        onClick={()=>setOpen(true)}
      />
      </div>

      {open &&(
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={() => setOpen(false)}
        >
          <img 
            src={`${API_BASE_URL}${image}`}
            alt="Client Image"
            className="w-screen h-screen object-contain"
          />
        </div>
      )}
    </>
  );
};


export default ClientDetail;
