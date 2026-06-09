import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ExternalLink, Minimize2, Sparkles, MapPin, Milestone } from "lucide-react";
import { tagbilaranBarangays } from "../data";

// Explicit visual mapping matching real local scenic assets (using original trios)
const barangayImages: Record<string, string> = {
  "Barangay Bool": "/temp/Blood Compact Shrine (28).webp",
  "Barangay Booy": "/temp/Taloto to Manga Coastline (6).webp",
  "Barangay Cabawan": "/temp/Balili Heritage House (4).webp",
  "Barangay Cogon": "/temp/City Lights of Tagbilaran (11).webp",
  "Barangay Dampas": "/webp/Old%20House%20in%20Poblacion%201%20(3).webp",
  "Barangay Dao": "/temp/City Lights of Tagbilaran (9).webp",
  "Barangay Manga": "/temp/Taloto to Manga Coastline (1).webp",
  "Barangay Mansasa": "/temp/Taloto to Manga Coastline (6).webp",
  "Barangay Poblacion I": "/temp/Poblacion 1, Tagbilaran City (2).webp",
  "Barangay Poblacion II": "/temp/Poblacion 1, Tagbilaran City (1).webp",
  "Barangay Poblacion III": "/webp/Old%20House%20in%20Poblacion%201%20(7).webp",
  "Barangay San Isidro": "/temp/Balili Heritage House (4).webp",
  "Barangay Taloto": "/temp/Tubig Dako in Taloto (1).webp",
  "Barangay Tiptip": "/temp/City Lights of Tagbilaran (8).webp",
  "Barangay Ubujan": "/temp/Capt. Salazar Monument (1).webp"
};


export const TagbilaranDashboard: React.FC = () => {
  const [selectedBarangayName, setSelectedBarangayName] = useState<string>("Barangay Bool");
  const [isDetailMode, setIsDetailMode] = useState<boolean>(false);

  // Auto scroll to top on change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [isDetailMode]);

  const activeBarangay = tagbilaranBarangays.find(b => b.name === selectedBarangayName) || tagbilaranBarangays[0];
  const activeImage = barangayImages[activeBarangay.name] || "/temp/Poblacion 1, Tagbilaran City (2).webp";

  return (
    <div className="w-full relative min-h-screen bg-white text-[#05461a] select-none overflow-hidden pb-12" id="barangay-dashboard-outer">


      <AnimatePresence mode="wait">
        {!isDetailMode ? (
          /* ================= FIRST VIEW: PORTAL SPLIT SYSTEM ================= */
          <motion.div
            key="split-portal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[1550px] mx-auto px-4 sm:px-8 md:px-12 mt-2 lg:mt-4 grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch relative z-20 min-h-[72vh]"
            id="barangay-split-portal"
          >
            
            {/* COLUMN 1: CLICKABLE LIST (Left Third, shifted left and narrower) */}
            <div className="md:col-span-3 flex flex-col justify-center border-b md:border-b-0 md:border-r border-[#05461a]/10 pr-0 md:pr-6 pb-4 md:pb-0 max-h-[70vh] md:max-h-none overflow-y-auto md:overflow-visible scrollbar-none lg:-ml-6" id="brgy-clickable-list-col">
              <div className="space-y-3 py-4 md:py-0">
                {tagbilaranBarangays.map((brgy) => {
                  const isSelected = brgy.name === selectedBarangayName;
                  const cleanName = brgy.name.replace("Barangay ", "").toUpperCase();

                  return (
                    <button
                      key={brgy.name}
                      onMouseEnter={() => setSelectedBarangayName(brgy.name)}
                      onClick={() => setIsDetailMode(true)}
                      className={`w-full text-left flex items-baseline gap-3 cursor-pointer focus:outline-none group transition-all duration-300 ${
                        isSelected 
                          ? "text-[#38B000] scale-102 font-black pl-2 border-l-2 border-[#38B000]" 
                          : "text-[#05461a]/50 hover:text-[#38B000] hover:pl-1 font-semibold"
                      }`}
                    >
                      <span className="font-sans text-xl sm:text-2xl md:text-3xl font-black tracking-tight leading-none uppercase">
                        {cleanName}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* COLUMN 2: MAIN IMAGE CANVAS (Center, wider column-span and aspect-ratio) */}
            <div className="md:col-span-6 flex items-center justify-center relative mt-4 md:mt-0" id="brgy-image-canvas-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedBarangayName}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="w-full relative aspect-[4/5] md:aspect-[4/3] xl:aspect-[1.12/1] rounded-[24px] overflow-hidden shadow-2xl border border-[#05461a]/15 group bg-[#05461a]/5 cursor-pointer"
                  onClick={() => setIsDetailMode(true)}
                >
                  <img
                    src={activeImage}
                    alt={activeBarangay.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#02200a]/80 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* COLUMN 3: BRIEF DESCRIPTION & ENTRY TO FULLSCREEN (Right Third) */}
            <div className="md:col-span-3 flex flex-col justify-end text-left sm:translate-y-4 md:translate-y-0" id="brgy-desc-action-col">
              <div className="space-y-6 pb-6 pr-2 lg:pl-4">
                <div className="space-y-2">
                  <span className="font-mono text-[9px] tracking-widest text-[#05461a]/60 font-black uppercase block">
                    {activeBarangay.category} COMMUNITY DISTRICT
                  </span>
                  <p className="font-sans text-sm sm:text-base text-[#05461a]/85 leading-relaxed font-semibold">
                    {activeBarangay.desc}
                  </p>
                </div>
              </div>
            </div>

          </motion.div>
        ) : (
          /* ================= SECOND VIEW: CINEMATIC FULLSCREEN DETAIL ================= */
          <motion.div
            key="cinematic-fullscreen"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.55 }}
            className="w-full min-h-screen relative flex flex-col justify-between items-center px-4 md:px-12 py-10 select-none"
            id="barangay-cinematic-view"
          >
            {/* Absolute Background image with custom forest-green / dark vignette cover */}
            <div className="absolute inset-0 z-0">
              <img
                src={activeImage}
                alt={activeBarangay.name}
                className="w-full h-full object-cover transition-opacity duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#02200a]/95 via-[#05461a]/65 to-black/60 backdrop-blur-[1px] pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#02200a] to-transparent pointer-events-none" />
            </div>

            {/* Back button */}
            <div className="w-full max-w-6xl mt-6 z-10 flex text-left">
              <button
                onClick={() => setIsDetailMode(false)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#05461a]/95 hover:bg-[#FF9850] text-[#FFD54F] hover:text-black font-sans font-black tracking-widest text-xs uppercase border border-[#FFD54F]/20 transition-all cursor-pointer pointer-events-auto shadow-xl"
              >
                <ArrowLeft className="w-4 h-4" />
                BACK TO OVERVIEW
              </button>
            </div>

            {/* Content Core: Large centered texts */}
            <div className="w-full max-w-6xl text-center py-12 md:py-20 z-10 space-y-10" id="cinematic-content">
              {/* Giant Name with adaptive scaling (never wraps to 1 letter or truncates with ellipsis) */}
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className={`font-sans font-black text-[#FFD54F] leading-none tracking-tight uppercase drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] text-center break-words select-none px-2 ${
                  activeBarangay.name.replace("Barangay ", "").length > 10 
                    ? "text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[7.5rem]" 
                    : "text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] xl:text-[11.5rem]"
                }`}
              >
                {activeBarangay.name.replace("Barangay ", "")}
              </motion.h2>

              {/* Full descriptive text of the Barangay */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="font-sans text-white text-sm sm:text-base md:text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto font-black drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] text-center px-4"
              >
                {activeBarangay.desc} {activeBarangay.tip ? `Venture to find our ${activeBarangay.tip}.` : ""}
              </motion.p>
            </div>

            {/* Sticky Footnote details */}
            <div className="w-full max-w-6xl z-10 pb-4 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-white/50 gap-3 border-t border-white/10 pt-4">
              <span className="flex items-center gap-1.5 font-bold">
                <MapPin className="w-4 h-4 text-[#FF9800]" />
                TAGBILARAN TOURISM NETWORK DIRECTORY
              </span>
              <span className="uppercase text-[10px] tracking-widest hidden sm:inline font-bold">PROVINCE OF BOHOL, PHILIPPINES</span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
