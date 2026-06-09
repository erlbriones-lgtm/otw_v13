import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  MapPin, 
  ChevronRight, 
  ChevronLeft,
  Send, 
  Compass, 
  BookOpen, 
  CheckCircle, 
  HelpCircle, 
  Clock, 
  Globe, 
  Award, 
  X, 
  RefreshCw,
  Terminal,
  Layers,
  Heart,
  Wifi,
  Battery,
  Signal,
  Phone,
  Eye,
  Target
} from "lucide-react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Downloadables from "./components/Downloadables";
import HeritageMarquee from "./components/HeritageMarquee";
import TagBeats from "./components/TagBeats";
import HeritageDetailView from "./components/HeritageDetailView";
import AboutContact from "./components/AboutContact";
import PlanVisitModal from "./components/PlanVisitModal";
import { TagbilaranDashboard } from "./components/TagbilaranDashboard";
import Saulog from "./components/Saulog";
import Travel from "./components/Travel";

import { tagbilaranLandmarks, tagbilaranBarangays } from "./data";
import { detailedHeritageList } from "./data/heritageDetails";
import { Landmark, LocalStatusResponse, Barangay } from "./types";

export default function App() {
  // Navigation / Theme Styling Switch State
  const [activeView, setActiveView] = useState<"home" | "heritage" | "tagbeats" | "downloadables" | "barangay" | "saulog" | "travel" | "about">("home");
  const [selectedDetailedHeritageId, setSelectedDetailedHeritageId] = useState<string | null>(null);
  const [showPlanVisitModal, setShowPlanVisitModal] = useState(false);

  // Core App states
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeLandmark, setActiveLandmark] = useState<Landmark | null>(tagbilaranLandmarks[0]);



  // Local temperature sync for dynamic Hero
  const [liveTemp, setLiveTemp] = useState<number>(31);
  const [liveWind, setLiveWind] = useState<string>("Gentle breeze");

  // Fetch local status metrics silently on load
  useEffect(() => {
    const checkLiveStats = async () => {
      try {
        const res = await fetch("/api/local-status");
        if (res.ok) {
          const data: LocalStatusResponse = await res.json();
          setLiveTemp(data.weather.temperature);
          setLiveWind(data.weather.condition);
        }
      } catch (e) {
        // Fallbacks already in place
      }
    };
    checkLiveStats();
  }, []);

  const categories = ["All", "Heritage"];

  const filteredLandmarks = selectedCategory === "All"
    ? tagbilaranLandmarks
    : tagbilaranLandmarks.filter(item => item.category === selectedCategory);

  const handleNextLandmark = () => {
    if (!activeLandmark || filteredLandmarks.length === 0) return;
    const currentIndex = filteredLandmarks.findIndex(l => l.id === activeLandmark.id);
    const nextIndex = (currentIndex + 1) % filteredLandmarks.length;
    setActiveLandmark(filteredLandmarks[nextIndex]);
  };

  const handlePrevLandmark = () => {
    if (!activeLandmark || filteredLandmarks.length === 0) return;
    const currentIndex = filteredLandmarks.findIndex(l => l.id === activeLandmark.id);
    const prevIndex = (currentIndex - 1 + filteredLandmarks.length) % filteredLandmarks.length;
    setActiveLandmark(filteredLandmarks[prevIndex]);
  };

  // Auto-slide effect for the Heritage Landmarks Slider
  useEffect(() => {
    if (activeView !== "home" || selectedDetailedHeritageId) return;

    const interval = setInterval(() => {
      handleNextLandmark();
    }, 15000); // Transitions every 15 seconds

    return () => clearInterval(interval);
  }, [activeView, selectedDetailedHeritageId, activeLandmark, filteredLandmarks]);



  // Exact vertical timeline events as seen/inspired by heritagetimeline.jpg
  const heritageMilestones = [
    {
      year: "1565",
      title: "Blood Compact Between Datu Sikatuna and Miguel Lopez de Legazpi",
      description: "A monumental event signifying foreign friendship and ancestral peace, establishing a sacred covenant sealed with blood in Bohol Barangay."
    },
    {
      year: "1595",
      title: "Construction of Baclayon Church",
      description: "Initiated by Jesuit missionaries, this limestone construction becomes one of the premier ancestral stone cathedrals in the Philippines."
    },
    {
      year: "1767",
      title: "Cathedral of St. Joseph the Worker Established",
      description: "Built in the civic heart of Tagbilaran, this majestic limestone and wood neoclassical cathedral becomes a fortress of heritage."
    },
    {
      year: "1966",
      title: "Charter Day of Tagbilaran City",
      description: "Presidential recognition as a chartered city, formalizing Tagbilaran as the administrative, cultural, and craft capital of Bohol."
    },
    {
      year: "2023",
      title: "Global Creative City Initiative nomination",
      description: "Nominated directly for Crafts and Folk Arts, showcasing classic terracota clay potteries and ancestral Dampas hand weaving guilds."
    },
    {
      year: "2026",
      title: "Creative Tech Hub Launch",
      description: "Uniting physical artisanry with high performance digital spaces to empower the next wave of local sustainable designers."
    }
  ];

  const getBackgroundStyle = () => {
    // Elegant, highly vibrant cohesive background overlay optimized for premium brightness:
    // Base is a rich linear-gradient from Cool Forest/Emerald Green (#32e875) to Pine Green (#05461a) at 95vh, and down to Cool Deep Spruce Green (#02200a).
    // On top, we overlay beautiful glowing radial circles using softer, extremely polished white and green gradients.
    const gradientCircles = "radial-gradient(circle at 10% 15%, rgba(255, 255, 255, 0.24) 0%, transparent 50%), radial-gradient(circle at 85% 30%, rgba(50, 232, 117, 0.42) 0%, transparent 65%), radial-gradient(circle at 20% 70%, rgba(5, 70, 26, 0.38) 0%, transparent 60%), radial-gradient(circle at 80% 85%, rgba(255, 255, 255, 0.18) 0%, transparent 50%), linear-gradient(to bottom, #32e875 0%, #05461a 95vh, #02200a 100%)";
    
    if (selectedDetailedHeritageId || activeView === "heritage" || activeView === "travel") {
      return "#ffffff";
    }
    switch (activeView) {
      case "home":
        return "radial-gradient(circle at 15% 15%, rgba(255, 255, 255, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 30%, rgba(50, 232, 117, 0.3) 0%, transparent 60%), linear-gradient(to bottom, #114216 0%, #032107 100%)";
      case "heritage":
        return "#ffffff";
      case "tagbeats":
        return "#ffffff";
      case "downloadables":
        return "radial-gradient(circle at 15% 15%, rgba(255, 255, 255, 0.22) 0%, transparent 55%), radial-gradient(circle at 75% 30%, rgba(50, 232, 117, 0.38) 0%, transparent 65%), radial-gradient(circle at 30% 70%, rgba(5, 70, 26, 0.35) 0%, transparent 60%), radial-gradient(circle at 85% 85%, rgba(255, 255, 255, 0.15) 0%, transparent 50%), linear-gradient(to bottom, #32e875 0%, #05461a 95vh, #02200a 100%)";
      case "barangay":
        return "#ffffff";
      case "saulog":
        return "#ffffff";
      case "travel":
        return "#ffffff";
      case "about":
        return "radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.22) 0%, transparent 50%), radial-gradient(circle at 85% 35%, rgba(50, 232, 117, 0.42) 0%, transparent 60%), radial-gradient(circle at 20% 70%, rgba(5, 70, 26, 0.38) 0%, transparent 60%), radial-gradient(circle at 75% 80%, rgba(255, 255, 255, 0.15) 0%, transparent 50%), linear-gradient(to bottom, #32e875 0%, #05461a 95vh, #02200a 100%)";
      default:
        return gradientCircles;
    }
  };

  const getFooterBackgroundStyle = () => {
    // All the footers should be the darkest color here (#02200a)
    return "#02200a";
  };

  const getFooterBorderColor = () => {
    // Subtle border using Dark Spruce for a gorgeous clean separation
    return "rgba(30, 68, 30, 0.4)";
  };

  return (
    <div 
      className={`min-h-screen transition-all duration-500 font-sans overflow-x-hidden relative ${(selectedDetailedHeritageId || activeView === "heritage" || activeView === "travel" || activeView === "barangay" || activeView === "saulog" || activeView === "tagbeats") ? "text-[#05461a] bg-white animate-fade-in" : "text-white"}`} 
      style={{ background: getBackgroundStyle() }}
      id="digital-tourism-root"
    >
      
      {/* Background Decorative atmosphere layers calibrated per view */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" id="ambient-layers-luminous">
        {activeView === "home" && !selectedDetailedHeritageId && (
          <>
            <div className="absolute top-[-5%] left-[-10%] w-[650px] h-[650px] rounded-full blur-[140px] animate-float-1" style={{ background: "rgba(17, 152, 34, 0.32)" }} />
            <div className="absolute bottom-[20%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[140px] animate-float-2" style={{ background: "rgba(17, 152, 34, 0.3)" }} />
            <div className="absolute top-[40%] left-[20%] w-[500px] h-[500px] rounded-full blur-[130px] animate-float-1" style={{ background: "rgba(42, 114, 33, 0.18)" }} />
          </>
        )}
        {activeView === "heritage" && !selectedDetailedHeritageId && (
          <>
            <div className="absolute top-[-5%] left-[-10%] w-[650px] h-[650px] rounded-full blur-[140px] animate-float-1" style={{ background: "rgba(0, 137, 123, 0.26)" }} />
            <div className="absolute bottom-[20%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[140px] animate-float-2" style={{ background: "rgba(46, 125, 50, 0.26)" }} />
            <div className="absolute top-[40%] left-[20%] w-[500px] h-[500px] rounded-full blur-[130px] animate-float-1" style={{ background: "rgba(0, 150, 136, 0.2)" }} />
          </>
        )}

        {activeView === "downloadables" && !selectedDetailedHeritageId && (
          <>
            <div className="absolute top-[-5%] left-[-10%] w-[650px] h-[650px] rounded-full blur-[140px] animate-float-1" style={{ background: "rgba(21, 101, 192, 0.26)" }} />
            <div className="absolute bottom-[20%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[140px] animate-float-2" style={{ background: "rgba(0, 172, 193, 0.26)" }} />
            <div className="absolute top-[40%] left-[20%] w-[500px] h-[500px] rounded-full blur-[130px] animate-float-1" style={{ background: "rgba(13, 71, 161, 0.2)" }} />
          </>
        )}
        {activeView === "about" && !selectedDetailedHeritageId && (
          <>
            <div className="absolute top-[-5%] left-[-10%] w-[650px] h-[650px] rounded-full blur-[140px] animate-float-1" style={{ background: "rgba(20, 121, 23, 0.22)" }} />
            <div className="absolute bottom-[20%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[140px] animate-float-2" style={{ background: "rgba(82, 199, 85, 0.2)" }} />
            <div className="absolute top-[40%] left-[20%] w-[500px] h-[500px] rounded-full blur-[130px] animate-float-1" style={{ background: "rgba(51, 160, 54, 0.16)" }} />
          </>
        )}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px]" opacity="0.6" />
      </div>

      {/* Dynamic Header Navbar with matching view controls */}
      <Navbar 
        activeView={selectedDetailedHeritageId ? ("" as any) : activeView} 
        setActiveView={(view) => {
          setSelectedDetailedHeritageId(null);
          setActiveView(view);
        }} 
        onPlanVisit={() => {
          setSelectedDetailedHeritageId(null);
          setShowPlanVisitModal(true);
        }}
      />

      {/* Dynamic Main Views container */}
      <AnimatePresence mode="wait">
        {selectedDetailedHeritageId ? (
          <motion.div
            key="heritage-detail-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <HeritageDetailView 
              heritage={detailedHeritageList.find(h => h.id === selectedDetailedHeritageId) || detailedHeritageList[0]}
              onBack={() => {
                setSelectedDetailedHeritageId(null);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </motion.div>
        ) : activeView === "home" ? (
          <motion.div
            key="home-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Immersive luxurious resort bedroom view from HOME.jpg */}
            <Hero 
              onSwitchToHeritage={() => setActiveView("heritage")}
              onPlanVisit={() => {
                setShowPlanVisitModal(true);
              }}
              weatherDescription={liveWind}
              temperature={liveTemp}
            />

            {/* High-end main catalog details - White Background & Premium Green Text */}
            <div className="bg-white text-[#006400] w-full relative z-10 pb-24 pt-16 border-t border-[#32e875]/20" id="home-view-main-container">
              <main className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col gap-12" id="home-view-main">
                
                {/* PART 0: HISTORY OF TAGBILARAN */}
                <section id="tagbilaran-history" className="text-center max-w-4xl mx-auto pt-4">
                  <div className="flex flex-col items-center">
                    {/* Beautiful History Capitalized Title */}
                    <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black tracking-widest text-[#006400] uppercase">
                       History
                    </h2>
                    
                    {/* Paragraphs with customized high-end editorial styling */}
                    <div className="mt-6 space-y-6 text-[#006400] text-sm sm:text-base md:text-lg leading-relaxed font-sans text-justify sm:text-center font-bold max-w-3xl px-4">
                      <p>
                        Shielded from the southwest monsoons by Panglao Island and the north winds by the Maribojoc mountain range, Tagbilaran was formerly called <span className="font-sans italic font-extrabold text-[#38B000]">Tinabilan</span> , meaning "screened" or "shadowed". Another account says it is derived from <span className="font-sans italic font-extrabold text-[#38B000]">Tagubilaan</span> , a contraction from the words <span className="font-sans italic font-bold text-[#38B000]">tagu</span> that means "to hide" and <span className="font-sans italic font-bold text-[#38B000]">Bilaan</span>, a tribe of marauders.
                      </p>
                      <p>
                        For 112 years, Tagbilaran was already an independent town before Bohol became a separate politico-military province from Cebu in 1854. Tagbilaran was made the capital town for the reason that it has a promising harbor. It became a chartered city on July 1, 1966.
                      </p>
                    </div>
 
                    {/* Classic hand-drawn divider separator to gracefully transition sections */}
                    <div className="w-full relative flex items-center justify-center mt-12 mb-6 h-10">
                      <img 
                        src="/temp/divider2.png" 
                        alt="Historical Separator Decor" 
                        className="w-full max-w-3xl sm:max-w-4xl md:max-w-5xl h-10 object-contain pointer-events-none opacity-80" 
                      />
                    </div>
                  </div>
                </section>
 
                {/* PART 1: THE HERITAGE & TECH INFOGRAPHIC GRID (Bento Layout with Saulog Palette) */}
                <section id="heritage-bento" className="scroll-mt-24 text-center">
                  <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto mb-12 gap-8" id="bento-header-wrapper">
                    <div className="w-full text-center">
                      <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#006400] animate-fade-in text-center">
                        The Heritage and Tourism Ecosystem
                      </h2>
                      <p className="text-[#006400] text-sm sm:text-base leading-relaxed mt-4 font-sans font-bold text-center">
                        Explore the historic legacy of Tagbilaran's most celebrated sacred spaces, ancestral landmarks, and immersive cultural archives below.
                      </p>
                    </div>
 
 
                  </div>
 
                  {/* Refined Landmark Card Slider Explorer */}
                  <div className="max-w-4xl mx-auto w-full relative group px-2" id="bento-grid-panel">
                    {/* Flanking Chevron Navigation Controls (Desktop hover only) */}
                    <div className="hidden md:block">
                      <button
                        onClick={handlePrevLandmark}
                        className="absolute left-[-60px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-[#006400]/30 bg-white hover:bg-emerald-50 text-[#006400] flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-lg backdrop-blur-md z-20"
                        aria-label="Previous Landmark"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={handleNextLandmark}
                        className="absolute right-[-60px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-[#006400]/30 bg-white hover:bg-emerald-50 text-[#006400] flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-lg backdrop-blur-md z-20"
                        aria-label="Next Landmark"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </div>
 
                    {/* Centered Active Landmark Detail View */}
                    <div id="bento-detail-viewer" className="w-full">
                      <AnimatePresence mode="wait">
                        {activeLandmark && (
                          <motion.div
                            key={activeLandmark.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                            className="relative w-full rounded-3xl border border-emerald-100/50 bg-black overflow-hidden shadow-2xl text-left text-white glass-panel-custom group"
                          >
                            {/* Banner Image taking up the entire container */}
                            <div className="relative h-[350px] sm:h-[500px] w-full overflow-hidden">
                              <img 
                                src={activeLandmark.imageUrl}
                                alt={activeLandmark.title}
                                className="w-full h-full object-cover opacity-95 transition-transform duration-700 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                              
                              {/* Elegant darkened ambient gradient overlay inside the image */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
 
                    {/* Navigation dots & Mobile tactile arrows below the card */}
                    <div className="flex items-center justify-between mt-8 max-w-4xl mx-auto w-full px-2">
                      {/* Previous Mobile Arrow */}
                      <button
                        onClick={handlePrevLandmark}
                        className="md:hidden w-10 h-10 rounded-full border border-[#006400]/25 bg-white text-[#006400] flex items-center justify-center cursor-pointer active:scale-95 transition-all"
                        aria-label="Previous Landmark"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
 
                      {/* Pagination Indicator Dots */}
                      <div className="flex flex-wrap justify-center gap-2.5 mx-auto">
                        {filteredLandmarks.map((landmark) => (
                          <button
                            key={landmark.id}
                            onClick={() => setActiveLandmark(landmark)}
                            className={`h-2.5 rounded-full transition-all duration-300 ${
                              activeLandmark?.id === landmark.id 
                                ? "w-8 bg-[#006400]" 
                                : "w-2.5 bg-[#006400]/30 hover:bg-[#006400]/60"
                            }`}
                            title={landmark.title}
                          />
                        ))}
                      </div>
 
                      {/* Next Mobile Arrow */}
                      <button
                        onClick={handleNextLandmark}
                        className="md:hidden w-10 h-10 rounded-full border border-[#006400]/25 bg-white text-[#006400] flex items-center justify-center cursor-pointer active:scale-95 transition-all"
                        aria-label="Next Landmark"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </section>

              </main>
            </div>
          </motion.div>
        ) : activeView === "heritage" ? (
          /* HIGH-END INTERACTIVE HISTORIC AND CRAFTS GREEN SLIDER STYLE (inspired by displayher.jpg) */
          <motion.div
            key="heritage-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pt-16 pb-20 w-full flex flex-col items-center"
          >
            {/* DUAL INFINITE MARQUEE CAROUSEL SHOWCASE */}
            <HeritageMarquee onCardClick={(id) => {
              setSelectedDetailedHeritageId(id);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }} />

            {/* HIGH-END INTERACTIVE TIMELINE PLACED DIRECTLY BELOW THE SLIDE DISPLAY */}
            <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 mt-24" id="chronology-timeline">
              <div className="text-center max-w-2xl mx-auto mb-16">
                
                <h3 className="font-display font-black text-2xl sm:text-3xl text-[#05461a] tracking-tight text-center">
                  Tagbilaran Chronicles Timeline
                </h3>
                <p className="text-[#2E7D32]/80 text-xs sm:text-sm mt-3 leading-relaxed font-sans font-medium text-center">
                  Deepen your connection with our long legacy of alliances, resistance, and creative growth by exploring key historical anchor events.
                </p>
              </div>

              {/* Vertical timeline body */}
              <div className="relative w-full text-left" id="timeline-v-body">
                {/* Central Glowing Festive Line */}
                <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#ff5722] via-[#FFD54F] to-[#2E7D32] opacity-70" />

                {/* Loop and render timeline modules */}
                <div className="space-y-12">
                  {heritageMilestones.map((milestone, idx) => {
                     const isEven = idx % 2 === 0;
                     return (
                      <div 
                        key={milestone.year}
                        className={`relative flex flex-col md:flex-row items-stretch md:items-center justify-between w-full md:w-11/12 mx-auto ${
                           isEven ? "md:flex-row-reverse" : ""
                        }`}
                      >
                        {/* Timeline Dot Indicator */}
                        <div className="absolute left-[9px] md:left-1/2 md:-translate-x-1/2 top-6 md:top-auto w-3.5 h-3.5 rounded-full bg-[#05461a] border-2 border-white shadow-md z-10 animate-pulse" />

                        {/* Staggered card container */}
                        <div className="w-full md:w-[45%] text-left pl-10 md:pl-0">
                          <motion.div
                            whileHover={{ scale: 1.01, borderColor: "#05461a", boxShadow: "0 12px 28px rgba(42,114,33,0.06)" }}
                            className="relative p-6 sm:p-7 pl-8 sm:pl-9 rounded-2xl bg-emerald-50/40 border border-emerald-100/70 hover:border-[#05461a] transition-all duration-300 shadow-sm overflow-hidden"
                          >
                            {/* Pure premium Accent left bar */}
                            <div className="absolute left-0 top-0 bottom-0 w-[5px] bg-[#05461a] opacity-80 group-hover:opacity-100 transition-all duration-300" />

                            <span className="font-mono text-xl sm:text-2xl font-black text-[#05461a] block">
                              {milestone.year}
                            </span>
                            <h4 className="font-sans font-black text-[#05461a] text-base sm:text-lg tracking-tight mt-1.5 leading-snug">
                              {milestone.title}
                            </h4>
                            <p className="text-[#2E7D32]/80 text-xs sm:text-sm leading-relaxed mt-2.5 font-medium">
                              {milestone.description}
                            </p>
                            
                            <div className="mt-5 pt-3 border-t border-emerald-100/80 flex items-center justify-end text-[10px] font-mono text-emerald-800/60 uppercase tracking-widest">
                              <span className="font-bold text-[#05461a]">
                                HISTORIC FACT ➔
                              </span>
                            </div>
                          </motion.div>
                        </div>

                        {/* Ghost spacer to maintain structure */}
                        <div className="hidden md:block w-[45%]" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        ) : activeView === "tagbeats" ? (
          <motion.div
            key="tagbeats-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <TagBeats />
          </motion.div>
        ) : activeView === "downloadables" ? (
          <motion.div
            key="downloadables-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Downloadables />
          </motion.div>
        ) : activeView === "barangay" ? (
          <motion.div
            key="barangay-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-white text-[#05461a] pt-14 pb-20 w-full flex flex-col items-center select-none"
            id="barangay-view"
          >
            <TagbilaranDashboard />
          </motion.div>
        ) : activeView === "saulog" ? (
          <motion.div
            key="saulog-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Saulog />
          </motion.div>
        ) : activeView === "travel" ? (
          <motion.div
            key="travel-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Travel />
          </motion.div>
        ) : (
           /* LUXURIOUS ABOUT TAGBILARAN CITY VIEW */
           <motion.div
             key="about-view"
             initial={{ opacity: 0, y: 15 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -15 }}
             transition={{ duration: 0.5, ease: "easeOut" }}
             className="pt-32 pb-24 w-full flex flex-col items-center select-none"
             id="about-view"
           >
             {/* Elegant Top Badge & Hero Title */}
             <div className="max-w-4xl mx-auto text-center px-6 mb-16">
               
               <h1 className="font-display font-black text-white text-4xl sm:text-6xl tracking-tight leading-none mb-6">
                 Tagbilaran <span className="inline-block text-[#FFD54F] pr-3 text-accent-yellow em">City</span>
               </h1>
               <p className="text-white text-sm sm:text-base leading-relaxed max-w-2xl mx-auto font-sans font-medium">
                 Breathe in the living legacy of Bohol's premier creative gateway. From the historic 1565 sandugo covenant to our contemporary global creative nomination, Tagbilaran harmonizes raw heritage with forward-looking sustainable art.
               </p>
             </div>

                          {/* Tagbilaran's Left-aligned Half-size City Hall Photo with Right-aligned Vision & Mission */}
              <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
                  
                  {/* Left Side: Photo Container */}
                  <motion.div
                    initial={{ opacity: 0, x: -32 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="w-full h-[320px] sm:h-[450px] lg:h-auto min-h-[300px] sm:min-h-[420px] relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl flex flex-col justify-end"
                    id="about-cityhall-showcase"
                  >
                    <img
                      src="/webp/cityhall.jpg"
                      alt="Tagbilaran City Hall"
                      id="tagbilaran-cityhall-image"
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-102"
                    />
                    {/* Subtle Overlay to contrast cityhall label */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent z-10 pointer-events-none" />
                    
                    <div className="relative z-20 p-6 sm:p-8 text-left">
                      
                      <h3 className="font-serif text-2xl font-bold text-white tracking-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                        Tagbilaran City Hall
                      </h3>
                    </div>
                  </motion.div>

                  {/* Right Side: Vision & Mission (Clean layouts without backgrounds, borders, vertical accents, or icons) */}
                  <motion.div
                    initial={{ opacity: 0, x: 32 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col justify-start py-4 h-full"
                  >
                                      {/* Vision Section (Plus Jakarta Sans Typography) */}
                    <div 
                      className="text-left pb-6"
                      id="tagbilaran-vision-card-right"
                    >
                      <h4 className="font-jakarta text-xl sm:text-2xl font-black text-[#FFD54F] tracking-wider mb-2 uppercase" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                        Vision
                      </h4>
                      <p className="font-jakarta text-xs sm:text-sm md:text-base text-white font-extrabold leading-relaxed uppercase tracking-wide text-left" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                        "A highly urbanized, resilient and livable city by 2030."
                      </p>
                    </div>

                    {/* Mission Section (Plus Jakarta Sans Typography) */}
                    <div 
                      className="text-left"
                      id="tagbilaran-mission-card-right"
                    >
                      <h4 className="font-jakarta text-xl sm:text-2xl font-black text-[#FFD54F] tracking-wider mb-2 uppercase" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                        Mission
                      </h4>
                      <p className="font-jakarta text-xs sm:text-sm md:text-base text-white/90 leading-relaxed font-extrabold uppercase tracking-wide text-left" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
                        To enrich the eco-cultural heritage, enhance sustainable and inclusive socio-economic growth and build a resilient community anchored in responsive governance.
                      </p>
                    </div>
                  </motion.div>

                </div>
              </div>

<div className="w-full max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 hidden" id="about-stats-grid">
               {[
                 { label: "FOUNDED (SANDUGO)", value: "1565", desc: "First treaty of international friendship", icon: Heart },
                 { label: "GLOBAL NOMINATION", value: "Crafts", desc: "Crafts & folk arts candidate network", icon: Award },
                 { label: "DISTRICT COMMUNITIES", value: "15", desc: "Unique barangays forming the city code", icon: MapPin },
                 { label: "CIVIC HEART", value: "Capital", desc: "Administrative & commercial core of Bohol", icon: Globe },
               ].map((stat, sIdx) => {
                 const StatIcon = stat.icon;
                 return (
                   <motion.div
                     key={sIdx}
                     whileHover={{ scale: 1.02 }}
                     className="bg-[rgba(0,0,0,0.25)] border border-[rgba(255,255,255,0.15)] p-6 rounded-2xl shadow-lg backdrop-blur-md text-left group glass-panel-custom"
                   >
                     <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white mb-4 group-hover:bg-white/25 transition-colors">
                       <StatIcon className="w-5 h-5" />
                     </div>
                     <span className="font-mono text-[9px] text-[#FFD54F] uppercase tracking-widest block font-bold">
                       {stat.label}
                     </span>
                     <span className="font-display font-black text-2xl sm:text-3xl text-white block mt-1">
                       {stat.value}
                     </span>
                     <p className="text-xs text-white mt-1.5 leading-relaxed font-sans font-medium">
                       {stat.desc}
                     </p>
                   </motion.div>
                 );
               })}
             </div>
             {/* Deep Narrative section */}
             <div className="w-full max-w-3xl mx-auto px-6 sm:px-12 mb-20 text-center flex flex-col items-center" id="about-pillars">
               
               {/* Text / Narrative centered */}
               <div className="flex flex-col justify-center text-center items-center">
                 
                 <h2 className="font-display font-black text-white text-3xl sm:text-4xl tracking-tight leading-tight mb-6 text-center">
                   Where Ancient Covenant Meets Digital Future
                 </h2>
                 <div className="space-y-6 text-white/90 text-xs sm:text-sm leading-relaxed font-sans text-center font-medium">
                   <p>
                     Tagbilaran is more than just a geographic capital; it is a spiritual anchor. In 1565, the blood compact between chieftain Sikatuna and explorer Legazpi set a permanent tone of peaceful diplomacy and horizontal alliance.
                   </p>
                   <p>
                     Today, that baseline of peace translates directly into standard-setting local safety, warm community-driven commerce, and a flourishing network of artists, potters, and developers. 
                   </p>
                   <p>
                     As a candidate for the <strong className="text-[#FFD54F]">Global Creative Cities Network</strong>, Tagbilaran represents Boholano craftsmanship—nurtured on the hillsides of Manga and inside the hand-weaving studios of Dampas—forged and celebrated for global eyes.
                   </p>
                 </div>

                 <div className="mt-8 flex justify-center">
                   <button
                     onClick={() => {
                       setActiveView("heritage");
                       window.scrollTo({ top: 0, behavior: "smooth" });
                     }}
                     className="px-6 py-3 bg-white text-[#1A0533] hover:bg-white/95 font-mono text-xs font-bold uppercase rounded-xl transition-all shadow-md cursor-pointer hover:scale-102 btn-primary-custom"
                   >
                     Explore Heritage Collection
                   </button>
                 </div>
               </div>
 
             </div>
 


              
              <AboutContact />
            </motion.div>
        )}
      </AnimatePresence>

      {/* FOOTER: Light Luxury Resort themed Footer */}
      <footer 
        className="relative z-10 px-6 sm:px-12 pb-16 pt-16 border-t transition-colors duration-500" 
        style={{ 
          backgroundColor: getFooterBackgroundStyle(), 
          borderTopColor: getFooterBorderColor() 
        }} 
        id="homepage-footer"
      >
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          {/* Legal Strip */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-white/60 border-t border-white/10 pt-8 gap-4" id="footer-legal-strip">
            <div className="flex items-center gap-3">
              <Compass className="w-4 h-4 text-[#00f5d4] animate-spin-slow" />
              <span>© {new Date().getFullYear()} TAGBILARAN CITY TOURISM OFFICE • CMO STRATCOM</span>
            </div>
          </div>

        </div>
      </footer>

      <PlanVisitModal isOpen={showPlanVisitModal} onClose={() => setShowPlanVisitModal(false)} />

    </div>
  );
}
