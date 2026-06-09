import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ZoomIn, Compass } from "lucide-react";

const travelImages = [
  "/webp/Blood Compact Shrine (28).webp",
  "/webp/City Lights of Tagbilaran (11).webp",
  "/webp/Taloto to Manga Coastline (6).webp",
  "/webp/Balili Heritage House (4).webp",
  "/webp/Old House in Poblacion 1 (7).webp",
  "/webp/Tubig Dako in Taloto (1).webp",
  "/webp/Poblacion 1, Tagbilaran City (1).webp",
  "/webp/Bohol Blades (1).webp",
  "/webp/Blood Compact Shrine (31).webp",
  "/webp/Blood Compact Shrine (32).webp"
];

export default function Travel() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx + 1) % travelImages.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx - 1 + travelImages.length) % travelImages.length);
    }
  };

  return (
    <div className="w-full bg-white pt-32 pb-20 px-4 sm:px-6 md:px-12 select-none min-h-screen" id="travel-view-container">
      
      {/* Luxurious Header Hero */}
      <div className="max-w-6xl mx-auto text-center mb-12" id="travel-header-intro">
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-sans font-black text-4xl sm:text-6xl text-[#05461a] tracking-tight leading-none mb-6"
        >
          EXPLORE <span className="text-[#FF9800]">TAGBILARAN</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#2E7D32] text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto font-sans font-semibold"
        >
          Welcome to the creative capital of Bohol. Framed by idyllic coral ports, deep Jesuit history, and sandugo legends, Tagbilaran is the ultimate launcher for your Visayan eco-adventure.
        </motion.p>
      </div>

      {/* Immersive Pure Image Grid */}
      <div className="max-w-6xl mx-auto mt-6" id="travel-image-grid-root">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {travelImages.map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="relative group overflow-hidden rounded-2xl bg-black cursor-pointer aspect-[4/3] shadow-sm hover:shadow-xl transition-shadow duration-300"
              onClick={() => setSelectedIdx(index)}
              id={`travel-img-card-${index}`}
            >
              <img
                src={src}
                className="w-full h-full object-cover transition-all duration-500 transform group-hover:scale-105 group-hover:opacity-90"
                alt="Tagbilaran Scene"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              
              {/* Subtle hover icon overlay */}
              <div className="absolute inset-0 bg-transparent group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="p-3 bg-white/90 text-emerald-950 rounded-full shadow-lg scale-90 group-hover:scale-100 transition-transform duration-300">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox / Slider Component with absolute zero text dependency */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 select-none"
            onClick={() => setSelectedIdx(null)}
            id="travel-lightbox-backdrop"
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedIdx(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 cursor-pointer pointer-events-auto"
              id="travel-lightbox-close"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Left navigation arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 cursor-pointer pointer-events-auto text-xl font-bold font-mono"
              id="travel-lightbox-prev"
            >
              ‹
            </button>

            {/* Image viewer container */}
            <motion.div
              key={selectedIdx}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl max-h-[80vh] flex items-center justify-center overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={travelImages[selectedIdx]}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                alt="Tagbilaran view fullscreen"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Right navigation arrow */}
            <button
              onClick={handleNext}
              className="absolute right-6 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-200 cursor-pointer pointer-events-auto text-xl font-bold font-mono"
              id="travel-lightbox-next"
            >
              ›
            </button>

            {/* Micro Dot indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {travelImages.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIdx(dotIdx);
                  }}
                  className={`h-2 rounded-full transition-all duration-200 ${
                    selectedIdx === dotIdx ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
