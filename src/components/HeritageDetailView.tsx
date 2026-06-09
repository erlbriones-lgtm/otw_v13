import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Sparkles, 
  CheckCircle, 
  Compass,
  FileText
} from "lucide-react";
import { DetailedHeritage } from "../data/heritageDetails";

interface HeritageDetailViewProps {
  heritage: DetailedHeritage;
  onBack: () => void;
}

export default function HeritageDetailView({ heritage, onBack }: HeritageDetailViewProps) {
  const [activeImage, setActiveImage] = useState<string>(heritage.mainImage);
  const [activeTab, setActiveTab] = useState<"history" | "trivia" | "visit">("history");

  // Sync active image when landmark changes
  useEffect(() => {
    setActiveImage(heritage.mainImage);
  }, [heritage]);

  return (
    <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 pt-32 pb-24 text-left text-[#05461a]" id="heritage-detail-view-container">
      {/* Back Control */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-transparent border border-[#05461a]/20 text-[#05461a] hover:bg-[#05461a]/5 transition-all font-jakarta text-xs font-bold uppercase tracking-wider mb-8 cursor-pointer active:scale-95 btn-secondary-custom"
      >
        <ArrowLeft className="w-4 h-4 text-[#05461a]" /> Back to Exploration
      </button>

      {/* Top Title Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        <div className="lg:col-span-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#05461a]/10 text-[#05461a] border border-[#05461a]/25 rounded-full font-jakarta text-[10px] uppercase tracking-wider font-extrabold mb-4 badge-tag-custom">
            <Compass className="w-3.5 h-3.5 text-[#05461a] animate-spin-slow" /> {heritage.category}
          </span>
          <h1 className="font-display font-black text-[#05461a] text-3xl sm:text-5xl md:text-6xl tracking-tight leading-none mb-4 animate-fade-in">
            {heritage.title}
          </h1>
          <p className="text-[#2E7D32] text-base sm:text-lg font-sans max-w-2xl leading-relaxed font-semibold">
            "{heritage.tagline}"
          </p>
        </div>
      </div>

      {/* Grid: 2-Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Interactive Corresponding Images Gallery (lg:col-span-6) */}
        <div className="lg:col-span-6 flex flex-col gap-5">
          <div className="relative h-[320px] sm:h-[420px] rounded-3xl overflow-hidden border border-emerald-100 bg-emerald-50/20 flex items-center justify-center">
            {/* Background Image Layer */}
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                src={activeImage}
                alt={heritage.title}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
          </div>

          {/* Corresponding Photos Carousel Thumbnails Row */}
          <div>
            <span className="text-[10px] font-jakarta text-gray-500 uppercase tracking-wide font-bold block mb-2.5">
              Available Site Exhibits ({heritage.images.length})
            </span>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
              {heritage.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                    activeImage === img ? "border-[#05461a]/80 scale-[1.03]" : "border-emerald-100 opacity-75 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`${heritage.title} angle ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: In-depth Heritage Records (lg:col-span-6) */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          {/* Bento Panel: Historic Key Facts */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#05461a]/5 border border-emerald-100 text-left shadow-sm backdrop-blur-sm">
              <Calendar className="w-5 h-5 text-[#FFD54F] mb-2" />
              <span className="font-jakarta text-[10px] text-gray-500 uppercase tracking-wide font-bold block">YEAR ANCHORED</span>
              <span className="text-[#05461a] text-base sm:text-lg font-sans font-black mt-1 block">
                {heritage.yearEstablished}
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-[#05461a]/5 border border-emerald-100 text-left shadow-sm backdrop-blur-sm">
              <MapPin className="w-5 h-5 text-[#FFD54F] mb-2" />
              <span className="font-jakarta text-[10px] text-gray-500 uppercase tracking-wide font-bold block">DISTRICT REGION</span>
              <span className="text-[#05461a] text-base sm:text-lg font-sans font-black mt-1 block">
                {heritage.district}
              </span>
            </div>
          </div>

          {/* Interactive Tabbed Panel with historical records, visitor guides, etc */}
          <div className="bg-white rounded-3xl border border-emerald-100 overflow-hidden shadow-sm flex flex-col font-medium">
            <div className="flex border-b border-emerald-100 bg-[#05461a]/5" id="details-tabs-row">
              <button
                onClick={() => setActiveTab("history")}
                className={`flex-1 py-4 text-xs sm:text-sm font-jakarta tracking-wide uppercase font-extrabold border-b-2 transition-all cursor-pointer ${
                  activeTab === "history" 
                    ? "border-[#05461a] text-[#05461a] bg-[#05461a]/10" 
                    : "border-transparent text-gray-400 hover:text-[#05461a]"
                }`}
              >
                Historical Records
              </button>
              <button
                onClick={() => setActiveTab("trivia")}
                className={`flex-1 py-4 text-xs sm:text-sm font-jakarta tracking-wide uppercase font-extrabold border-b-2 transition-all cursor-pointer ${
                  activeTab === "trivia" 
                    ? "border-[#05461a] text-[#05461a] bg-[#05461a]/10" 
                    : "border-transparent text-gray-400 hover:text-[#05461a]"
                }`}
              >
                Cultural Assets
              </button>
              <button
                onClick={() => setActiveTab("visit")}
                className={`flex-1 py-4 text-xs sm:text-sm font-jakarta tracking-wide uppercase font-extrabold border-b-2 transition-all cursor-pointer ${
                  activeTab === "visit" 
                    ? "border-[#05461a] text-[#05461a] bg-[#05461a]/10" 
                    : "border-transparent text-gray-400 hover:text-[#05461a]"
                }`}
              >
                Traveler Guide
              </button>
            </div>

            <div className="p-6 sm:p-8 text-left">
              {activeTab === "history" && (
                <div className="space-y-4 animate-fade-in">
                  <h4 className="font-sans font-black text-[#05461a] text-lg flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#FFD54F]" /> Chronicles Summary
                  </h4>
                  <p className="text-gray-800 text-sm leading-relaxed font-sans font-medium">
                    {heritage.description}
                  </p>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed font-sans font-medium">
                    {heritage.longHistory}
                  </p>
                </div>
              )}

              {activeTab === "trivia" && (
                <div className="space-y-5 animate-fade-in">
                  <h4 className="font-sans font-black text-[#05461a] text-lg flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#FFD54F]" /> Key Architectural &amp; Cultural Elements
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {heritage.facts.map((fact, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-emerald-50/40 border border-emerald-100 text-left">
                        <span className="text-[10px] font-jakarta text-gray-400 block font-bold uppercase">{fact.label}</span>
                        <span className="text-[#05461a] text-xs sm:text-sm font-sans font-semibold mt-0.5 block">{fact.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 mt-4">
                    <span className="text-[10px] font-jakarta text-gray-400 uppercase block font-bold">HERITAGE VALOR HIGHLIGHTS</span>
                    <ul className="space-y-1.5 pl-1 text-xs text-gray-650 font-medium">
                      {heritage.heritageHighlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2 leading-relaxed">
                          <CheckCircle className="w-3.5 h-3.5 text-[#05461a] shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === "visit" && (
                <div className="space-y-4 animate-fade-in">
                  <div>
                    <h4 className="font-sans font-black text-[#05461a] text-sm uppercase">Visiting &amp; Heritage Etiquette</h4>
                    <p className="text-gray-400 text-[11px] mt-0.5 font-semibold">Please observe proper manners when checking physical spots</p>
                  </div>

                  <div className="bg-emerald-50/40 border border-emerald-100 p-4 rounded-xl text-xs text-gray-600 space-y-2 font-medium">
                    {heritage.culturalGuidelines.map((g, idx) => (
                      <div key={idx} className="flex gap-2.5 items-start">
                        <span className="text-[#05461a] font-jakarta text-xs">0{idx + 1}.</span>
                        <span>{g}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 pt-4">
                    <span className="text-[10px] font-jakarta text-gray-400 uppercase block font-bold">TRAVELER PLANNING INSIGHTS</span>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-1.5 font-medium">
                      {heritage.travelTips}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>



        </div>

      </div>
    </div>
  );
}
