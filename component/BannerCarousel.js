import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import banner1 from "../assets/img/banner18.jpg"
import banner2 from "../assets/img/banner26.png"
import banner3 from "../assets/img/banner25.png"
import banner4 from "../assets/img/banner20.jpg"
import banner5 from "../assets/img/banner22.jpg"

import { useNavigate } from "react-router-dom";
const banners = [
  { id: 1, image:banner1, title: "AIR MAX DN8", desc: "Exploration 4 of 8: Salma Paralluelo by NEWFORMAT" },
  { id: 2, image: banner2, title: "NIKE AIR MAX", desc: "A Moment of Your Style. Just Do It." },
  { id: 3, image: banner3, title: "NIKE AIR MAX", desc: "A Moment of Your Style. Just Do It." },
  { id: 4, image: banner4, title: "NIKE AIR MAX", desc: "A Moment of Your Style. Just Do It." },
  { id: 5, image: banner5, title: "NIKE AIR MAX", desc: "A Moment of Your Style. Just Do It." },
  
];

export default function BannerCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate()
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 5000); // Auto slide sau 4 giây
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <AnimatePresence>
        {banners.map((banner, index) => (
          index === currentIndex && (
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 1 }}
              className="w-full h-full absolute inset-0"
            >
              <img src={banner.image} alt={banner.title} 
              className="w-full h-full object-cover"/>
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <div className="relative text-white text-center px-6 md:px-12">
                <h2 className="text-4xl md:text-6xl font-bold">{banner.title}</h2>
                <p className="mt-2 text-lg">{banner.desc}</p>
                <button onClick={() => navigate("/home")} className="mt-6 px-6 py-3 bg-white text-black font-bold uppercase tracking-wider rounded-lg hover:bg-gray-300 transition" >
                  Shop
                </button>
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Navigation */}
      <button
        onClick={() => setCurrentIndex((currentIndex - 1 + banners.length) % banners.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 p-3 rounded-full hover:bg-opacity-50 transition"
      >
        ⬅
      </button>
      <button
        onClick={() => setCurrentIndex((currentIndex + 1) % banners.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-30 p-3 rounded-full hover:bg-opacity-50 transition"
      >
        ➡
      </button>
    </div>
  );
}
