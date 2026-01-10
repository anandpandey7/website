import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { API_BASE_URL } from '../config/apiConfig';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// ✅ IMPORT DECORATOR IMAGE (IMPORTANT)
import shape from '../assets/shape-style1.png';


const ProductShowcase = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ SECTION REF FOR SCROLL TRACKING
  const sectionRef = useRef(null);

  // ✅ SCROLL-BASED ROTATION (SECTION ONLY)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/products`);
        const data = await res.json();

        if (data.success) {
          setProduct(data.products || []);
        }
      } catch (err) {
        console.error('Failed to fetch products', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 bg-gray-50 overflow-hidden"
    >
      {/* ================= BACKGROUND DECORATOR ================= */}
      <motion.div
        style={{ rotate }}
        className="absolute -top-60 -left-10 w-full h-max opacity-20 pointer-events-none z-0"
      >
        <img src={shape} alt="decorator" className="w-full h-full " />
      </motion.div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* HEADER */}
        <div className="flex justify-between items-end mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[var(--primary)] font-bold tracking-widest uppercase text-sm">
              Our Innovation
            </span>
            <h2 className="text-4xl font-black text-gray-900 mt-2">
              Featured Products
            </h2>
          </motion.div>

          <div className="hidden md:block text-gray-500 max-w-md text-right">
            Explore our cutting-edge IoT solutions designed for precision and reliability.
          </div>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <p className="text-center text-gray-400 mb-8">Loading products...</p>
        )}

        {/* SWIPER */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-16 !px-2"
        >
          {product.map((item, index) => (
            <SwiperSlide key={item._id}>
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group overflow-hidden h-full flex flex-col"
              >
                {/* IMAGE */}
                
                  <div className="relative h-48 sm:h-64 p-6 overflow-hidden">
                    <img
                      src={`${API_BASE_URL}${item.image}`}
                      alt={item.productName}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[var(--primary)] uppercase">
                    {item.productCategory || 'Device'}
                  </div>
                

                {/* CONTENT */}
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[var(--primary)] transition-colors">
                    {item.productName}
                  </h3>

                  <p className="text-gray-500 text-sm line-clamp-2 mb-6 flex-grow">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto">
                    <div>
                      {item.sellingPrice ? (
                        <>
                          <span className="text-xs text-gray-400 line-through">
                            ₹{item.price}
                          </span>
                          <div className="text-xl font-black">
                            ₹{item.sellingPrice}
                          </div>
                        </>
                      ) : (
                        <div className="text-xl font-black">₹{item.price}</div>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-2 text-[var(--primary)] font-bold text-sm"
                    >
                      View Details →
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ProductShowcase;
