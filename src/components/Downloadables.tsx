import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Download, 
  FileDown, 
  Search, 
  Sparkles, 
  CheckCircle,
  BookOpen,
  Image as ImageIcon,
  MapPin,
  Check,
  Compass
} from "lucide-react";

interface DownloadableItem {
  id: string;
  title: string;
  description: string;
  category: "Guides" | "Campaigns" | "Assets";
  fileSize: string;
  fileType: string;
  downloadsCount: number;
  fileName: string;
  content?: string;
  realFileUrl?: string;
}

const downloadablesList: DownloadableItem[] = [
  {
    id: "dot-accredited-2026",
    title: "DOT-Accredited Establishments 2026",
    description: "The official, verified directory of Department of Tourism (DOT) accredited hotels, resorts, dine-in establishments, and creative travel services in Tagbilaran City as of April 30, 2026.",
    category: "Guides",
    fileSize: "135 KB",
    fileType: "XLSX",
    downloadsCount: 1420,
    fileName: "DOT-ACCREDITED 2026 AS OF APRIL 30, 2026.xlsx",
    realFileUrl: "/api/download?file=DOT-ACCREDITED 2026 AS OF APRIL 30, 2026.xlsx",
    content: ""
  }
];

export default function Downloadables() {
  const [activeCategory, setActiveCategory] = useState<"All" | "Guides" | "Campaigns" | "Assets">("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);

  const filteredItems = downloadablesList.filter(item => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (item: DownloadableItem) => {
    setDownloadingId(item.id);
    setDownloadSuccessId(null);

    // Programmatically fetch the file as a binary blob to handle HTTP errors gracefully
    if (item.realFileUrl) {
      fetch(item.realFileUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to download: Server returned status ${response.status}`);
          }
          return response.blob();
        })
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", item.fileName);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);

          setDownloadingId(null);
          setDownloadSuccessId(item.id);

          // Reset success checkmark after 3 seconds
          setTimeout(() => {
            setDownloadSuccessId(null);
          }, 3000);
        })
        .catch((error) => {
          console.error("Binary download failed:", error);
          alert(`Could not download file: ${error.message || "Server error"}. Please check if the file exists on the server.`);
          setDownloadingId(null);
        });
    } else {
      // Fallback blob style
      const blob = new Blob([item.content || ""], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", item.fileName);
      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setDownloadingId(null);
      setDownloadSuccessId(item.id);

      // Reset success checkmark after 3 seconds
      setTimeout(() => {
        setDownloadSuccessId(null);
      }, 3000);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 sm:px-12 pt-32 pb-24 text-center flex flex-col items-center justify-center text-white" id="downloadables-page">
      {/* Visual Header Banner aligned elegantly */}
      <div className="max-w-3xl mb-12 mx-auto text-center flex flex-col items-center justify-center" id="downloadables-header">
        
        <h1 className="font-display font-black text-white text-3xl sm:text-5xl tracking-tight leading-none mb-4 text-center">
          Heritage <span className="inline-block text-[#FFD54F] pr-2 text-accent-yellow em">Downloads</span>
        </h1>
        <p className="text-white text-sm sm:text-base leading-relaxed font-sans font-medium text-center">
          Equip yourself with official pamphlets, walking coordinates, cultural heritage portfolios, and offline guides carefully prepared for high-fidelity cultural excursions in Tagbilaran.
        </p>
      </div>

      {/* Utilities Column: Search & Categories */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-10 pb-6 border-b border-white/10" id="downloadables-controls">
        {/* Category Selector */}
        <div className="flex flex-row flex-nowrap overflow-x-auto md:overflow-visible gap-2 whitespace-nowrap pb-1 md:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" id="downloadables-categories">
          {(["All", "Guides", "Campaigns", "Assets"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono tracking-wider font-extrabold transition-all hover:scale-101 border cursor-pointer ${
                activeCategory === cat
                  ? "bg-white text-[#152614] border-white shadow-lg btn-primary-custom font-black"
                  : "bg-[rgba(0,0,0,0.25)] border-[rgba(255,255,255,0.15)] text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative max-w-md w-full" id="downloadables-search-box">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/55" />
          <input
            type="text"
            placeholder="Search documents or resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[rgba(0,0,0,0.25)] border border-[rgba(255,255,255,0.15)] hover:border-white/30 rounded-xl text-white text-xs placeholder:text-white/55 focus:outline-none focus:border-[#FFD54F] focus:bg-white/10 transition-all font-sans"
          />
        </div>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="download-cards-grid">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, idx) => {
            const isDownloading = downloadingId === item.id;
            const isSuccess = downloadSuccessId === item.id;

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-[rgba(0,0,0,0.25)] backdrop-blur-md rounded-3xl p-6 border border-[rgba(255,255,255,0.15)] hover:border-white/30 transition-all flex flex-col justify-between h-[255px] group relative overflow-hidden text-left shadow-lg glass-panel-custom"
              >
                {/* Visual back glow on group hovering */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-transparent to-white/0 group-hover:from-white/5 group-hover:to-white/10 pointer-events-none transition-all duration-500" />
                
                <div>
                  {/* Category Pill removed as requested, leaving only file info justified cleanly */}
                  <div className="flex justify-end items-center mb-4">
                    <span className="font-mono text-[10px] text-white/50 bg-white/5 px-2.5 py-0.5 rounded border border-white/5">
                      {item.fileType} • {item.fileSize}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-white font-sans font-black text-base sm:text-lg tracking-tight group-hover:text-[#FFD54F] transition-colors leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-white text-xs mt-2.5 line-clamp-3 leading-relaxed font-sans font-medium">
                    {item.description}
                  </p>
                </div>

                {/* Card Action footer bar */}
                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-end">
                  <button
                    onClick={() => handleDownload(item)}
                    disabled={isDownloading}
                    className={`px-3.5 py-2 rounded-xl text-[10px] font-mono font-extrabold uppercase tracking-widest transition-all duration-300 flex items-center gap-1.5 cursor-pointer border ${
                      isSuccess
                        ? "bg-emerald-500 hover:bg-emerald-600 border-emerald-500 text-white"
                        : isDownloading
                        ? "bg-white/20 text-white border-white/15 cursor-wait"
                        : "bg-white text-[#0D47A1] border-white shadow-md font-black hover:bg-white/95 btn-primary-custom"
                    }`}
                  >
                    {isSuccess ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        SAVED
                      </>
                    ) : isDownloading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          className="w-3 h-3 border border-stone-850 border-t-transparent rounded-full"
                        />
                        SAVING
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        DOWNLOAD
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredItems.length === 0 && (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 py-16 text-center" id="empty-downloads">
            <Sparkles className="w-8 h-8 text-[#FFD54F] mx-auto opacity-40 animate-pulse mb-3" />
            <h3 className="text-white font-sans font-bold text-base">No Matching Resources</h3>
            <p className="text-[#FFD54F] text-xs mt-1.5">Please check your search filters or try a different term.</p>
          </div>
        )}
      </div>
    </div>
  );
}
