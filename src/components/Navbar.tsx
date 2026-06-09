import { useState, useEffect } from "react";
import { Compass, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const logoUrl = "/webp/TagbilaranLogo.webp";

interface NavbarProps {
  activeView: "home" | "heritage" | "tagbeats" | "downloadables" | "barangay" | "saulog" | "travel" | "about";
  setActiveView: (view: "home" | "heritage" | "tagbeats" | "downloadables" | "barangay" | "saulog" | "travel" | "about") => void;
  onPlanVisit?: () => void;
}

export default function Navbar({ activeView, setActiveView, onPlanVisit }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (view: "home" | "heritage" | "tagbeats" | "downloadables" | "barangay" | "saulog" | "travel" | "about") => {
    setActiveView(view);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        id="main-nav-header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled || isOpen
            ? "bg-gradient-to-r from-[#2ee59d]/95 via-[#38B000]/95 to-[#006400]/95 backdrop-blur-md border-b border-[#32e875]/40 py-1.5 sm:py-2 shadow-lg"
            : "bg-gradient-to-r from-[#2ee59d]/85 via-[#38B000]/80 to-[#006400]/85 backdrop-blur-sm border-b border-[#32e875]/25 py-2 sm:py-2.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between relative w-full h-8 sm:h-9">
          
          {/* Desktop Symmetrical Navigation and Logo */}
          <div className="hidden xl:flex items-center justify-between w-full font-jakarta tracking-wide font-extrabold text-[12px] xl:text-[13px]">
            {/* Left links side */}
            <div className="flex items-center justify-end gap-6 w-[43%] font-jakarta">
              <button
                onClick={() => handleNavClick("home")}
                className={`font-jakarta tracking-wide font-extrabold transition-colors hover:cursor-pointer pb-1 border-b-2 hover:text-[#FFD54F] ${
                  activeView === "home"
                    ? "text-[#FFD54F] border-[#FFD54F]"
                    : "text-white/85 hover:text-[#FFD54F] border-transparent"
                }`}
                id="link-home"
              >
                HOME
              </button>
              
              <button
                onClick={() => handleNavClick("heritage")}
                className={`font-jakarta tracking-wide font-extrabold transition-colors hover:cursor-pointer pb-1 border-b-2 hover:text-[#FFD54F] ${
                  activeView === "heritage"
                    ? "text-[#FFD54F] border-[#FFD54F]"
                    : "text-white/85 hover:text-[#FFD54F] border-transparent"
                }`}
                id="link-heritage"
              >
                HERITAGE
              </button>
              
              <button
                onClick={() => handleNavClick("barangay")}
                className={`font-jakarta tracking-wide font-extrabold transition-colors hover:cursor-pointer pb-1 border-b-2 hover:text-[#FFD54F] ${
                  activeView === "barangay"
                    ? "text-[#FFD54F] border-[#FFD54F]"
                    : "text-white/85 hover:text-[#FFD54F] border-transparent"
                }`}
                id="link-barangay"
              >
                BARANGAY
              </button>

              <button
                onClick={() => handleNavClick("saulog")}
                className={`font-jakarta tracking-wide font-extrabold transition-colors hover:cursor-pointer pb-1 border-b-2 hover:text-[#FFD54F] ${
                  activeView === "saulog"
                    ? "text-[#FFD54F] border-[#FFD54F]"
                    : "text-white/85 hover:text-[#FFD54F] border-transparent"
                }`}
                id="link-saulog"
              >
                SAULOG
              </button>
            </div>

            {/* Centered Logo element */}
            <div 
              onClick={() => handleNavClick("home")}
              className="flex items-center justify-center cursor-pointer group select-none relative z-50 w-[14%]"
              id="nav-logo-centered"
            >
              {!logoFailed ? (
                <img 
                  src={logoUrl} 
                  alt="Tagbilaran Official Seal" 
                  onError={() => setLogoFailed(true)}
                  className="w-8 h-8 sm:w-8.5 sm:h-8.5 object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-110" 
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-lg bg-white/10 flex items-center justify-center border border-white/25 text-[#FFD54F] group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <Compass className="w-4 h-4 sm:w-4.5 sm:h-4.5 animate-[spin_10s_linear_infinite]" />
                </div>
              )}
            </div>

            {/* Right links side */}
            <div className="flex items-center justify-start gap-6 w-[43%] font-jakarta">
              <button
                onClick={() => handleNavClick("tagbeats")}
                className={`font-jakarta tracking-wide font-extrabold transition-colors hover:cursor-pointer pb-1 border-b-2 hover:text-[#FFD54F] ${
                  activeView === "tagbeats"
                    ? "text-[#FFD54F] border-[#FFD54F]"
                    : "text-white/85 hover:text-[#FFD54F] border-transparent"
                }`}
                id="link-tagbeats"
              >
                TAGBEATS
              </button>

              <button
                onClick={() => handleNavClick("downloadables")}
                className={`font-jakarta tracking-wide font-extrabold transition-colors hover:cursor-pointer pb-1 border-b-2 hover:text-[#FFD54F] ${
                  activeView === "downloadables"
                    ? "text-[#FFD54F] border-[#FFD54F]"
                    : "text-white/85 hover:text-[#FFD54F] border-transparent"
                }`}
                id="link-downloadables"
              >
                ASSETS
              </button>

              <button
                onClick={() => handleNavClick("travel")}
                className={`font-jakarta tracking-wide font-extrabold transition-colors hover:cursor-pointer pb-1 border-b-2 hover:text-[#FFD54F] ${
                  activeView === "travel"
                    ? "text-[#FFD54F] border-[#FFD54F]"
                    : "text-white/85 hover:text-[#FFD54F] border-transparent"
                }`}
                id="link-travel"
              >
                TRAVEL
              </button>

              <button
                onClick={() => handleNavClick("about")}
                className={`font-jakarta tracking-wide font-extrabold transition-colors hover:cursor-pointer pb-1 border-b-2 hover:text-[#FFD54F] ${
                  activeView === "about"
                    ? "text-[#FFD54F] border-[#FFD54F]"
                    : "text-white/85 hover:text-[#FFD54F] border-transparent"
                }`}
                id="link-about"
              >
                ABOUT
              </button>
            </div>
          </div>

          {/* Mobile Layout (centered logo with burger on the right) */}
          <div className="flex xl:hidden items-center justify-between w-full h-full relative z-50">
            {/* Left spacing placeholder to visually balance the menu button on the right */}
            <div className="w-8" />

            {/* Centered Logo for Mobile */}
            <div 
              onClick={() => handleNavClick("home")}
              className="flex items-center justify-center cursor-pointer group select-none"
              id="nav-logo-mobile"
            >
              {!logoFailed ? (
                <img 
                  src={logoUrl} 
                  alt="Tagbilaran Official Seal" 
                  onError={() => setLogoFailed(true)}
                  className="w-7 sm:w-7.5 h-7 sm:h-7.5 object-contain drop-shadow-md" 
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-7 sm:w-7.5 h-7 sm:h-7.5 rounded-lg bg-white/10 flex items-center justify-center border border-white/25 text-[#FFD54F]">
                  <Compass className="w-3.5 h-3.5 animate-[spin_10s_linear_infinite]" />
                </div>
              )}
            </div>

            {/* Mobile Burger Toggle UI */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-center p-1 sm:p-1.5 rounded-lg text-white hover:text-[#FFD54F] hover:bg-white/10 active:scale-95 transition-all cursor-pointer h-7.5 w-7.5 sm:h-8 sm:w-8 border border-white/10"
              aria-label="Toggle Navigation Menu"
              id="nav-mobile-toggle"
            >
              {isOpen ? <X className="w-4.5 h-4.5 sm:w-5 sm:h-5 animate-pulse" /> : <Menu className="w-4.5 h-4.5 sm:w-5 sm:h-5" />}
            </button>
          </div>

        </div>
      </motion.header>

      {/* Floating Animated Mobile Sidebar Overlay for Premium touch experience */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay clicking which closes the menu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[44] bg-black/40 backdrop-blur-xs xl:hidden"
            />

            {/* Slide-out Sidebar Drawer on the right side */}
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="fixed inset-y-0 right-0 z-[45] w-[240px] sm:w-[280px] h-full bg-gradient-to-b from-[#2ee59d]/98 via-[#38B000]/98 to-[#006400]/98 backdrop-blur-2xl flex flex-col justify-start overflow-y-auto px-6 sm:px-8 pt-28 pb-12 xl:hidden border-l border-white/10 shadow-2xl"
              id="mobile-drawer-overlay"
            >
              {/* Soft decorative background circles matching brand layout */}
              <div className="absolute top-[-10%] right-[-10%] w-80 h-80 rounded-full bg-[#FFD54F]/10 blur-[90px] pointer-events-none animate-pulse-slow" />
              <div className="absolute bottom-[-10%] left-[-10%] w-80 h-80 rounded-full bg-[#147917]/25 blur-[100px] pointer-events-none animate-pulse-slow" />
              
              <nav className="flex flex-col gap-6 sm:gap-7 text-left relative z-10 w-full" id="mobile-nav-links">
                {[
                  { label: "HOME VIEW PORTAL", id: "home", view: "home" },
                  { label: "HERITAGE COLLECTIVE", id: "heritage", view: "heritage" },
                  { label: "BARANGAY DIRECTORY", id: "barangay", view: "barangay" },
                  { label: "SAULOG SHOWDOWN Arena", id: "saulog", view: "saulog" },
                  { label: "SAULOG FESTIVAL HYMNS", id: "tagbeats", view: "tagbeats" },
                  { label: "RESOURCE DIRECTORY", id: "assets", view: "downloadables" },
                  { label: "EXPLORE & TRAVEL GUIDE", id: "travel", view: "travel" },
                  { label: "THE CIVIC & EXECUTIVE HEART", id: "about", view: "about" }
                ].map((link, lIdx) => (
                  <motion.button
                    key={link.id}
                    initial={{ x: 25, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: lIdx * 0.08 }}
                    onClick={() => handleNavClick(link.view as any)}
                    className={`text-left w-full font-jakarta text-xl sm:text-2xl font-black tracking-wide uppercase transition-all py-1.5 cursor-pointer hover:translate-x-[6px] flex items-center justify-start gap-4 group hover:text-[#FFD54F] ${
                      activeView === link.view ? "text-[#FFD54F]" : "text-white/80"
                    }`}
                  >
                    <span>{link.id.toUpperCase()}</span>
                  </motion.button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
