import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  MapPin, 
  Compass, 
  Car, 
  Ship, 
  Map, 
  Route, 
  CheckCircle, 
  ArrowRight,
  TrendingUp,
  Tag
} from "lucide-react";

interface PlanVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PlanVisitModal({ isOpen, onClose }: PlanVisitModalProps) {
  // Prevent body scroll when modal is open using safe useEffect
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "unset";
      }
    }
    return () => {
      if (typeof window !== "undefined") {
        document.body.style.overflow = "unset";
      }
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8" id="plan-visit-modal-container">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0c051a]/92 backdrop-blur-md"
            id="plan-visit-backdrop"
          />

          {/* Modal Card Layout */}
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="relative w-full max-w-6xl h-[90vh] md:h-[85vh] bg-gradient-to-b from-[#181124] to-[#0d0714] border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-left"
            id="plan-visit-card"
          >
            {/* Top Close Glow Indicator */}
            <div className="absolute right-0 top-0 w-80 h-80 bg-[#FFD54F]/5 rounded-full blur-3xl pointer-events-none" />

            {/* Header section of Modal */}
            <div className="relative z-10 px-6 sm:px-10 py-6 border-b border-white/10 flex items-center justify-between" id="plan-visit-header">
              <div className="text-left">
                <span className="text-[9px] font-mono text-[#FFD54F] tracking-[0.25em] font-extrabold uppercase bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                  TRAVEL CONCIERGE &amp; RESERVATIONS
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-3xl text-white tracking-tight mt-3">
                  Plan Your Tagbilaran Escape
                </h2>
                <p className="text-white/60 text-xs sm:text-sm mt-1 max-w-xl font-medium">
                  Curated itineraries, route mockups, and local transit logs to help you journey seamlessly through our historic creative capital.
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center cursor-pointer transition-transform hover:scale-105 active:scale-95"
                title="Close Window"
                id="close-plan-visit-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Main Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-12" id="plan-visit-scrollable-content">
              
              {/* SECTION 1: HOW TO GET THERE (INTERACTIVE ROUTE MOCKUP) */}
              <div className="space-y-6" id="section-transit-guide">
                <div className="flex items-center gap-2">
                  <span className="text-[#FFD54F] font-mono text-xs font-black">01 //</span>
                  <h3 className="font-sans font-extrabold text-white text-lg tracking-tight uppercase">
                    Journey Guide: How to Get to our Heritage spots
                  </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Transit Methods description */}
                  <div className="lg:col-span-5 space-y-6 bg-white/5 border border-white/5 rounded-2xl p-6" id="transit-routes-list">
                    <h4 className="font-sans font-black text-white text-base tracking-tight mb-2">
                      Arrival Points to Tagbilaran
                    </h4>
                    
                    <div className="space-y-4">
                      {/* From Panglao Island */}
                      <div className="flex items-start gap-3.5 pb-4 border-b border-white/5">
                        <div className="w-9 h-9 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mt-1 shrink-0">
                          <Car className="w-4 h-4" />
                        </div>
                        <div>
                          <h5 className="font-sans font-extrabold text-xs text-white uppercase tracking-wider">From Panglao Airport (TAG)</h5>
                          <p className="text-[11px] text-white/60 leading-relaxed mt-1 font-medium">
                            Take a pre-booked service van or local metered taxi via the Panglao-Tagbilaran bridge network. Experience an scenic coastal drive direct to Tagbilaran downtown plaza.
                          </p>
                          <span className="text-[10px] font-mono text-[#00f5d4] block mt-1.5 font-bold">⏱ Transit: ~25-30 Mins</span>
                        </div>
                      </div>

                      {/* From Cebu City (Via Ferry) */}
                      <div className="flex items-start gap-3.5 pb-4 border-b border-white/5">
                        <div className="w-9 h-9 rounded-lg bg-[#FFD54F]/10 border border-[#FFD54F]/20 flex items-center justify-center text-[#FFD54F] mt-1 shrink-0">
                          <Ship className="w-4 h-4" />
                        </div>
                        <div>
                          <h5 className="font-sans font-extrabold text-xs text-white uppercase tracking-wider">From Cebu Pier 1 (Via High-Speed Ferry)</h5>
                          <p className="text-[11px] text-white/60 leading-relaxed mt-1 font-medium">
                            Board daily boats (OceanJet or SuperCat) arriving at the newly renovated Tagbilaran City Port. Our welcoming creative hubs start right outside the container dock doors.
                          </p>
                          <span className="text-[10px] font-mono text-[#FFD54F] block mt-1.5 font-bold">⏱ Transit: ~2 Hours</span>
                        </div>
                      </div>

                      {/* Moving inside the City */}
                      <div className="flex items-start gap-3.5">
                        <div className="w-9 h-9 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mt-1 shrink-0">
                          <Compass className="w-4 h-4 animate-spin-slow" />
                        </div>
                        <div>
                          <h5 className="font-sans font-extrabold text-xs text-white uppercase tracking-wider">Navigating Within Tagbilaran</h5>
                          <p className="text-[11px] text-white/60 leading-relaxed mt-1 font-medium">
                            Flag down our unique, visually artistic tricycle taxis (featuring Bible verses on the back as mandated by city code!) or take cheap local barangay jeepneys to districts like Manga or Dampas.
                          </p>
                          <span className="text-[10px] font-mono text-purple-400 block mt-1.5 font-bold">🚕 Rates: ₱15 - ₱150 relative to zone</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Visual Route Map Placeholder & Mockup Map Graphics */}
                  <div className="lg:col-span-7 flex flex-col justify-between bg-[#130d1c] border border-white/10 rounded-2xl p-6 relative overflow-hidden" id="transit-map-mockup">
                    {/* Decorative Map Grid Gridlines */}
                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />
                    
                    {/* Map Interface Overlay HEADER */}
                    <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/15">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10px] font-mono text-white/70 tracking-widest uppercase font-extrabold">LIVE HERITAGE COMPASS ROUTE MAP</span>
                      </div>
                      <span className="text-[9px] font-mono text-[#FFD54F] border border-[#FFD54F]/20 px-2.5 py-0.5 rounded bg-[#FFD54F]/5">
                        BOHOL HEADQUARTERS
                      </span>
                    </div>

                    {/* Interactive-looking graphic mockup */}
                    <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 my-6 py-4" id="waypoint-flow">
                      {/* Waypoint 1: Port */}
                      <div className="bg-black/40 border border-white/5 rounded-xl p-3 text-center flex flex-col items-center group hover:border-[#FFD54F]/30 transition-all">
                        <div className="w-8 h-8 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-2">
                          <Ship className="w-4 h-4" />
                        </div>
                        <span className="text-[8px] font-mono text-sky-400 font-bold block uppercase">Point A</span>
                        <h6 className="text-[11px] font-sans font-extrabold text-white truncate w-full mt-1">Tagbilaran Port</h6>
                        <span className="text-[9px] font-sans text-white/40 block mt-0.5">Maritime Ingress</span>
                      </div>

                      {/* Waypoint 2: Cathedral Plaza */}
                      <div className="bg-black/40 border border-white/5 rounded-xl p-3 text-center flex flex-col items-center group hover:border-[#FFD54F]/30 transition-all">
                        <div className="w-8 h-8 rounded-full bg-[#FFD54F]/10 border border-[#FFD54F]/20 text-[#FFD54F] flex items-center justify-center mb-2">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <span className="text-[8px] font-mono text-[#FFD54F] font-bold block uppercase">Plaza Hub</span>
                        <h6 className="text-[11px] font-sans font-extrabold text-white truncate w-full mt-1">Heritage Cathedral</h6>
                        <span className="text-[9px] font-sans text-white/40 block mt-0.5">St. Joseph (1724)</span>
                      </div>

                      {/* Waypoint 3: Manga District */}
                      <div className="bg-black/40 border border-white/5 rounded-xl p-3 text-center flex flex-col items-center group hover:border-[#FFD54F]/30 transition-all">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2">
                          <Route className="w-4 h-4" />
                        </div>
                        <span className="text-[8px] font-mono text-emerald-400 font-bold block uppercase">Craft North</span>
                        <h6 className="text-[11px] font-sans font-extrabold text-white truncate w-full mt-1">Manga Pottery</h6>
                        <span className="text-[9px] font-sans text-white/40 block mt-0.5">Terracotta Barns</span>
                      </div>

                      {/* Waypoint 4: Blood Compact */}
                      <div className="bg-black/40 border border-white/5 rounded-xl p-3 text-center flex flex-col items-center group hover:border-[#FFD54F]/30 transition-all">
                        <div className="w-8 h-8 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-2">
                          <Compass className="w-4 h-4" />
                        </div>
                        <span className="text-[8px] font-mono text-rose-400 font-bold block uppercase">Treaty Spot</span>
                        <h6 className="text-[11px] font-sans font-extrabold text-white truncate w-full mt-1">Bool Landmark</h6>
                        <span className="text-[9px] font-sans text-white/40 block mt-0.5">Blood Compact (1565)</span>
                      </div>
                    </div>

                    {/* Image Placeholder on How to Get to Spot - Referrer Policies applied */}
                    <div className="relative group overflow-hidden rounded-xl border border-white/10" id="route-image-container">
                      <div className="absolute inset-0 bg-[#000]/30 z-10 group-hover:bg-[#000]/10 transition-colors" />
                      <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/60 backdrop-blur border border-white/10 font-mono text-[9px] text-white">
                        <Map className="w-3 h-3 text-[#FFD54F]" />
                        <span>INTER-DISTRICT TOURIST HIGHWAY</span>
                      </div>
                      
                      <img 
                        src="https://picsum.photos/seed/tagbilaranroute/800/250" 
                        alt="Tagbilaran Scenic Heritage Route Landmark" 
                        className="w-full h-28 object-cover filter brightness-75 group-hover:scale-105 transition-transform duration-700" 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>
              </div>


              {/* SECTION 2: CURATED TAGBILARAN CITY TOUR PACKAGES 1 & 2 */}
              <div className="space-y-6" id="section-tour-packages">
                <div className="flex items-center justify-between border-t border-white/10 pt-10">
                  <div className="flex items-center gap-2">
                    <span className="text-[#FFD54F] font-mono text-xs font-black">02 //</span>
                    <h3 className="font-sans font-extrabold text-white text-lg tracking-tight uppercase">
                      Curated Tour Packages
                    </h3>
                  </div>
                  <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest font-bold">
                    Official Department of Tourism Vetted
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="tour-packages-grid">
                  
                  {/* TOUR PACKAGE 1 CARD */}
                  <div 
                    className="group bg-gradient-to-b from-[#1c1429] to-[#120b1c] border border-white/10 hover:border-[#FFD54F]/40 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-lg relative overflow-hidden transition-all duration-300 hover:-translate-y-1 block hover:shadow-[#FFD54F]/5 text-left"
                    id="tour-package-1"
                  >
                    {/* Ribbon Accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD54F]/5 rounded-full blur-2xl pointer-events-none" />

                    <div>
                      {/* Image Placeholder with high quality Picsum seed - referrer policy applied */}
                      <div className="relative rounded-2xl overflow-hidden border border-white/5 mb-5 h-44 sm:h-48">
                        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-3 py-1 rounded bg-[#FFD54F] font-sans font-black text-[9px] text-[#1A0533] uppercase shadow-lg">
                          <TrendingUp className="w-3.5 h-3.5" />
                          <span>MOST POPULAR • HALF DAY</span>
                        </div>
                        <img 
                          src="https://picsum.photos/seed/sikatunawalk/600/400" 
                          alt="Tagbilaran City Tour Package 1 - Heritage walk" 
                          className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700" 
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Header and Package Metadata */}
                      <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full self-start w-fit text-[9px] font-mono text-[#FFD54F] uppercase tracking-wider font-extrabold">
                        <Tag className="w-3 h-3" />
                        <span>Package Code: CMO-PKG-01</span>
                      </div>

                      <h4 className="font-sans font-black text-xl text-white mt-3.5 group-hover:text-[#FFD54F] transition-colors leading-tight">
                        Tagbilaran City Tour Package 1
                      </h4>
                      <p className="font-serif text-white/50 text-[10.5px] mt-0.5">
                        "Sikatuna's Heritage Walk &amp; Historical Covenant"
                      </p>

                      <p className="text-white/70 text-xs mt-3 leading-relaxed font-sans font-medium">
                        Unveil the deep administrative, historical, and sacred lineage of Bohol's center. Embark on structured paths tracing early friendship pacts, St. Joseph Cathedral's monumental stone plazas, and dampas hand-weaving looms.
                      </p>

                      {/* Package Inclusions and details */}
                      <div className="mt-5 space-y-2.5 pb-5 border-b border-white/10">
                        <h5 className="text-[10px] font-mono text-white/40 tracking-widest font-bold uppercase">WHAT'S INCLUDED:</h5>
                        <ul className="grid grid-cols-1 gap-2 text-xs font-sans text-white/90">
                          <li className="flex items-center gap-2 text-white/80">
                            <CheckCircle className="w-3.5 h-3.5 text-[#FFD54F] shrink-0" />
                            <span>Experienced licensed regional historian guide</span>
                          </li>
                          <li className="flex items-center gap-2 text-white/80">
                            <CheckCircle className="w-3.5 h-3.5 text-[#FFD54F] shrink-0" />
                            <span>Private air-conditioned shuttle transport between spots</span>
                          </li>
                          <li className="flex items-center gap-2 text-white/80">
                            <CheckCircle className="w-3.5 h-3.5 text-[#FFD54F] shrink-0" />
                            <span>Scenic overlooks &amp; entrance fees at Sandugo Shrine</span>
                          </li>
                          <li className="flex items-center gap-2 text-white/80">
                            <CheckCircle className="w-3.5 h-3.5 text-[#FFD54F] shrink-0" />
                            <span>Boholano delicacy pairing (Calamay &amp; native cacao tea)</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Booking & Cost Summary */}
                    <div className="mt-6 flex items-center justify-between font-mono">
                      <div>
                        <span className="text-[8.5px] text-white/40 block uppercase tracking-widest leading-none">Starting from</span>
                        <span className="text-xl font-bold text-white tracking-tight mt-1.5 block">₱1,199 <span className="text-[10px] font-normal text-white/50">/ guest</span></span>
                      </div>
                      
                      <button 
                        onClick={() => {
                          alert("Thank you for your interest! Tour Package 1 is booked. Our tourism officer will contact you inside 24 hours.");
                        }}
                        className="px-5 py-2 rounded-xl bg-[#FFD54F] hover:bg-[#FFD54F]/90 text-[#1A0533] text-xs font-mono font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md inline-flex items-center gap-1.5"
                      >
                        <span>Reserve</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>


                  {/* TOUR PACKAGE 2 CARD */}
                  <div 
                    className="group bg-gradient-to-b from-[#1c1429] to-[#120b1c] border border-white/10 hover:border-teal-400/40 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-lg relative overflow-hidden transition-all duration-300 hover:-translate-y-1 block hover:shadow-teal-400/5 text-left"
                    id="tour-package-2"
                  >
                    {/* Ribbon Accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-400/5 rounded-full blur-2xl pointer-events-none" />

                    <div>
                      {/* Image Placeholder with high quality Picsum seed - referrer policy applied */}
                      <div className="relative rounded-2xl overflow-hidden border border-white/5 mb-5 h-44 sm:h-48">
                        <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-3 py-1 rounded bg-teal-400 font-sans font-black text-[9px] text-[#1A0533] uppercase shadow-lg">
                          <TrendingUp className="w-3.5 h-3.5 animate-pulse" />
                          <span>EXCEPTIONAL • FULL-DAY IMMERSIVE</span>
                        </div>
                        <img 
                          src="https://picsum.photos/seed/terracottaweave/600/400" 
                          alt="Tagbilaran City Tour Package 2 - Arts and traditional pottery masterclass" 
                          className="w-full h-full object-cover filter brightness-90 group-hover:scale-105 transition-transform duration-700" 
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Header and Package Metadata */}
                      <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full self-start w-fit text-[9px] font-mono text-teal-400 uppercase tracking-wider font-extrabold">
                        <Tag className="w-3 h-3" />
                        <span>Package Code: CMO-PKG-02</span>
                      </div>

                      <h4 className="font-sans font-black text-xl text-white mt-3.5 group-hover:text-teal-400 transition-colors leading-tight">
                        Tagbilaran City Tour Package 2
                      </h4>
                      <p className="font-serif text-white/50 text-[10.5px] mt-0.5">
                        "Earth, Terracotta Pottery, and Loom Weavings Masterclass"
                      </p>

                      <p className="text-white/70 text-xs mt-3 leading-relaxed font-sans font-medium">
                        Connect intimately with our UNESCO Creative City Nomination assets. Dive deep into the pottery yards of Manga to work high-fired earthen clay with master guildsmen, followed by heritage loom shuttle lessons in Dampas.
                      </p>

                      {/* Package Inclusions and details */}
                      <div className="mt-5 space-y-2.5 pb-5 border-b border-white/10">
                        <h5 className="text-[10px] font-mono text-white/40 tracking-widest font-bold uppercase">WHAT'S INCLUDED:</h5>
                        <ul className="grid grid-cols-1 gap-2 text-xs font-sans text-white/90">
                          <li className="flex items-center gap-2 text-white/80">
                            <CheckCircle className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                            <span>1.5-Hour hand-on terracotta pottery wheel masterclass</span>
                          </li>
                          <li className="flex items-center gap-2 text-white/80">
                            <CheckCircle className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                            <span>Raw materials, personal clay block, and kiln firing service</span>
                          </li>
                          <li className="flex items-center gap-2 text-white/80">
                            <CheckCircle className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                            <span>Private guided shuttle tour across 4 craft districts</span>
                          </li>
                          <li className="flex items-center gap-2 text-white/80">
                            <CheckCircle className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                            <span>Ocean-view seafood buffet lunch + fresh coconut juice</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Booking & Cost Summary */}
                    <div className="mt-6 flex items-center justify-between font-mono">
                      <div>
                        <span className="text-[8.5px] text-white/40 block uppercase tracking-widest leading-none">Starting from</span>
                        <span className="text-xl font-bold text-white tracking-tight mt-1.5 block">₱2,499 <span className="text-[10px] font-normal text-white/50">/ guest</span></span>
                      </div>
                      
                      <button 
                        onClick={() => {
                          alert("Thank you for your interest! Tour Package 2 is booked. Our tourism officer will contact you inside 24 hours.");
                        }}
                        className="px-5 py-2 rounded-xl bg-teal-400 hover:bg-teal-500 text-[#1A0533] text-xs font-mono font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-md inline-flex items-center gap-1.5"
                      >
                        <span>Reserve</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>

                </div>
              </div>


              {/* SECTION 3: TRAVELER NOTES & PHONE HOTLINES */}
              <div className="bg-black/30 border border-white/5 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center justify-between text-xs" id="quick-alert-concierge">
                <div className="space-y-1.5 flex-1 max-w-2xl text-left">
                  <h5 className="font-mono font-extrabold text-[#00f5d4] uppercase tracking-wider">
                    IMPORTANT TRAVEL ADVISORY • DEPARTMENT OF AFFAIRS
                  </h5>
                  <p className="font-sans text-white/70 leading-relaxed">
                    Tagbilaran is dedicated to low-impact, sustainable preservation. We kindly prompt all guests to follow native practices: carry reusable drinking flasks, support local Manga pottery collectives directly, and preserve ancient historical stone structures. 
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-xl flex flex-col items-center justify-center shrink-0 min-w-[200px]">
                  <span className="text-[9px] font-mono text-white/55 block uppercase font-bold tracking-widest">EMERGENCY TOURIST LINE</span>
                  <span className="text-md font-sans text-white font-extrabold mt-1 tracking-wide">📞 (038) 411-2222</span>
                  <span className="text-[10px] font-mono text-[#FFD54F] block tracking-wide uppercase mt-1">Local Ext. 167</span>
                </div>
              </div>

            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
