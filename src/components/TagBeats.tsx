import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX, 
  Download, 
  Disc, 
  Search, 
  Music, 
  RotateCcw, 
  Sparkles, 
  Check, 
  Compass,
  ArrowRight
} from "lucide-react";

interface Track {
  id: string;
  title: string;
  fileName: string;
  url: string;
  artist: string;
  duration: string;
  category: string;
  fileSize: string;
}

export default function TagBeats() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Audio Playback State
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  
  // Notification state
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);
  const [logoFailed, setLogoFailed] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  if (!audioRef.current && typeof window !== "undefined") {
    audioRef.current = new Audio();
  }
  const progressInputRef = useRef<HTMLInputElement | null>(null);

  // Keep refs of key changing states to prevent re-installing event listeners on every state update
  const isLoopingRef = useRef(isLooping);
  const tracksRef = useRef(tracks);
  const currentTrackIndexRef = useRef(currentTrackIndex);

  useEffect(() => {
    isLoopingRef.current = isLooping;
  }, [isLooping]);

  useEffect(() => {
    tracksRef.current = tracks;
  }, [tracks]);

  useEffect(() => {
    currentTrackIndexRef.current = currentTrackIndex;
  }, [currentTrackIndex]);

  // Fetch music list dynamically from server
  useEffect(() => {
    const fetchMusic = async () => {
      try {
        const res = await fetch("/api/music-files");
        if (res.ok) {
          const data = await res.json();
          setTracks(data);
          if (data.length > 0) {
            setCurrentTrackIndex(0);
          }
        }
      } catch (err) {
        console.error("Failed to load music tracks dynamically:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMusic();
  }, []);

  // 1. Initialize and handle Audio Element event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };
    
    const onEnded = () => {
      if (isLoopingRef.current) {
        audio.currentTime = 0;
        audio.play().catch((err) => {
          console.warn("Looped audio play failed:", err);
        });
      } else {
        const currentTracks = tracksRef.current;
        const currentIdx = currentTrackIndexRef.current;
        if (currentTracks.length > 1) {
          const nextIdx = (currentIdx + 1) % currentTracks.length;
          setCurrentTrackIndex(nextIdx);
          setIsPlaying(true);
        } else {
          setIsPlaying(false);
        }
      }
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  // 2. Synchronize track source (URL) when track changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || tracks.length === 0 || currentTrackIndex < 0) return;

    const activeTrack = tracks[currentTrackIndex];
    if (!activeTrack) return;

    const targetUrl = activeTrack.url;
    
    // Check if the source is already mapped, decoding URI components for comparison consistency
    const decodeSafe = (url: string) => {
      try {
        return decodeURIComponent(url);
      } catch (e) {
        return url;
      }
    };

    const currentSrc = audio.src;
    const decodedCurrent = decodeSafe(currentSrc);
    const decodedTarget = decodeSafe(targetUrl);

    const isSame = decodedCurrent === decodedTarget || 
                   decodedCurrent.endsWith(decodedTarget) || 
                   (decodedTarget.startsWith("/") && decodedCurrent.endsWith(window.location.host + decodedTarget));
    
    if (!isSame) {
      audio.src = targetUrl;
      audio.load();
    }
  }, [currentTrackIndex, tracks]);

  // 3. Synchronize playing / paused state
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || tracks.length === 0) return;

    if (isPlaying) {
      audio.play().catch((err) => {
        console.warn("Audio element play failed or was blocked by browser autoplay settings:", err);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  // 4. Synchronize volume & mute
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (tracks.length === 0) return;
    setIsPlaying(!isPlaying);
  };

  const selectTrack = (index: number) => {
    if (index >= 0 && index < tracks.length) {
      setCurrentTrackIndex(index);
      setIsPlaying(true);
    }
  };

  const handleNextTrack = () => {
    if (tracks.length === 0) return;
    const nextIdx = (currentTrackIndex + 1) % tracks.length;
    selectTrack(nextIdx);
  };

  const handlePrevTrack = () => {
    if (tracks.length === 0) return;
    const prevIdx = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    selectTrack(prevIdx);
  };

  const handleScrubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPercent = parseFloat(e.target.value);
    if (audioRef.current && duration > 0) {
      const newTime = (newPercent / 100) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (secondsValue: number) => {
    if (isNaN(secondsValue) || !isFinite(secondsValue)) return "0:00";
    const mins = Math.floor(secondsValue / 60);
    const secs = Math.floor(secondsValue % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleDownload = (track: Track) => {
    // Programmatically fetch as a binary blob for reliable offline export
    fetch(track.url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server returned status ${response.status}`);
        }
        return response.blob();
      })
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", track.fileName);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        setDownloadSuccessId(track.id);
        // Reset success banner after 3 seconds
        setTimeout(() => {
          setDownloadSuccessId(null);
        }, 3000);
      })
      .catch((error) => {
        console.error("Audio download failed:", error);
        alert(`Could not download track: ${error.message || "Network error"}. Please make sure the audio file exists on the server.`);
      });
  };

  const filteredTracks = tracks.filter(track => 
    track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    track.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeTrack = currentTrackIndex >= 0 && tracks[currentTrackIndex] ? tracks[currentTrackIndex] : null;

  return (
    <div className="w-full relative" id="tagbeats-portal">
      
      {/* 
        PREMIUM GATES-HERO HEADER SECTION
        Replicates the Homepage Hero layout but inherits the dynamic, elegant page background
      */}
      <section 
        id="tagbeats-gateway-hero"
        className="relative flex items-center justify-center pt-20 sm:pt-24 pb-2 sm:pb-2 select-none overflow-hidden"
      >
        {/* Clean, empty bg media to inherit the pure white parent background with green gradient on top */}
        <div id="tagbeats-hero-bg-media" className="absolute inset-0 z-0 overflow-hidden pointer-events-none" />
  
        {/* Premium Featured Artwork Image at the top, touching left-to-right edges */}
        <div className="relative z-40 w-full max-w-full flex flex-col items-center justify-center text-center mx-auto" id="tagbeats-hero-text">
          <motion.img 
            src="/temp/longbkk.jpg" 
            alt="TagBeats Featured Backdrop" 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="w-full object-fill sm:object-cover select-none shadow-2xl filter drop-shadow-[0_12px_36px_rgba(0,0,0,0.3)] mb-6 sm:mb-10"
          />

          <motion.img 
            src="/temp/TAGBEATSREAL.png" 
            alt="TagBeats Logo Title" 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="max-h-[170px] sm:max-h-[210px] md:max-h-[265px] lg:max-h-[310px] max-w-[95%] object-contain select-none filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)] px-4 mb-4"
          />
        </div>
      </section>

      {/* 
        MAIN CONTENT BODY
        Applies white background and high-contrast green branding below the curve
      */}
      <div className="bg-white text-[#006400] w-full relative z-10 pb-24 pt-0" id="tagbeats-main-body-container">
        <main className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col gap-6" id="tagbeats-portal-main">
          
          {/* Explanatory introduction text in standard content view */}
          <div className="max-w-3xl mx-auto text-center mb-2 flex flex-col items-center justify-center" id="tagbeats-body-intro">
            <p className="text-[#006400] text-sm sm:text-base leading-relaxed font-sans font-bold text-center">
              Drown in the rich acoustic soul of the City of Peace and Friendship. Experience original local hymns, Saulog festivity anthems, and neoclassical suites composed by Tagbilaran's creative ensembles.
            </p>
          </div>

          {/* Directory Status Check with emerald styling */}
          {tracks.length === 0 && !loading && (
            <div className="bg-emerald-50 border border-emerald-100/70 p-8 rounded-3xl text-center mb-10 max-w-2xl mx-auto text-left font-medium" id="empty-folder-hint">
              <Music className="w-10 h-10 text-[#006400]/70 mx-auto mb-4 animate-bounce" />
              <h3 className="text-[#006400] font-sans font-extrabold text-base mb-2">No audio tracks detected in audio</h3>
              <p className="text-[#006400]/80 text-xs leading-relaxed font-sans font-medium mb-4">
                The scanner checked the directory <code className="bg-emerald-100/50 px-2 py-1 rounded text-[#006400] text-[11px] font-mono">/audio</code>, but it seems to be empty.
              </p>
              <div className="text-xs bg-white p-4 rounded-xl border border-emerald-100 text-[#006400]/70 mb-4 font-mono">
                <strong>How to add your songs:</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-stone-600">
                  <li>Place your <code className="text-[#006400] font-bold">.mp3</code> files directly into the <code className="text-[#006400] font-bold">/audio</code> folder in the project folder root.</li>
                  <li>Refresh this page, and the application will dynamically load, play, and make them available for download automatically!</li>
                </ul>
              </div>
            </div>
          )}

          {/* Main Music Studio Interface: Bento Layout */}
          {!loading && tracks.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full text-left" id="tagbeats-studio-grid">
              
              {/* Left Panel: Active Music Deck (lg:col-span-5) */}
              <div className="lg:col-span-5 flex flex-col gap-6" id="audio-deck-column">
                <div className="bg-white border border-emerald-100/80 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden select-none" id="white-deck-card">
                  
                  {/* Backglow Ambient Atmosphere */}
                  <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-emerald-50/40 blur-[60px] pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-44 h-44 rounded-full bg-emerald-50/45 blur-[60px] pointer-events-none" />
                  
                  {/* Spinning Disc visualizer */}
                  <div className="flex flex-col items-center py-6 text-center" id="vinyl-center-display">
                    <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-gradient-to-tr from-emerald-950 to-emerald-800/40 p-2 border border-emerald-900/15 flex items-center justify-center shadow-2xl">
                      {/* Vinyl Texture Lines */}
                      <div className="absolute inset-2 border-4 border-dashed border-emerald-950/20 rounded-full" />
                      <div className="absolute inset-8 border border-white/5 rounded-full" />
                      <div className="absolute inset-16 border border-emerald-200/10 rounded-full" />
                      
                      {/* The central rotating album art */}
                      <motion.div 
                        animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                        transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-emerald-950 border-[3px] border-[#006400] flex items-center justify-center shadow-lg relative"
                      >
                        <Music className="w-8 h-8 text-emerald-200" />
                        <div className="absolute w-4 h-4 rounded-full bg-white border-2 border-emerald-950 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                      </motion.div>
                    </div>

                    {/* Song Meta Descriptions */}
                    <h2 className="text-[#006400] font-sans font-black text-lg sm:text-xl tracking-tight mt-6 leading-tight">
                      {activeTrack ? activeTrack.title : "No Track Selected"}
                    </h2>
                    <p className="text-[#006400] text-xs sm:text-sm mt-1.5 font-mono tracking-wider font-extrabold uppercase">
                      {activeTrack ? activeTrack.artist : "Unknown Performer"}
                    </p>
                    <span className="mt-3 px-3 py-1 rounded bg-emerald-50 border border-emerald-100 text-[9px] font-mono uppercase tracking-widest text-[#006400] font-extrabold badge-tag-custom">
                      {activeTrack ? activeTrack.category : "Midi Track"}
                    </span>
                  </div>

                  {/* Graphical Spectrometer Wave (Mocked/Mathematical Audio Wave) */}
                  <div className="h-10 w-full flex items-end justify-center gap-1 my-4 px-6 overflow-hidden" id="bars-spectrometer">
                    {(Array.from({ length: 24 })).map((_, idx) => {
                      return (
                        <motion.div
                          key={idx}
                          animate={isPlaying ? {
                            height: [
                              "4px", 
                              `${Math.floor(10 + Math.random() * 32)}px`, 
                              "4px"
                            ]
                          } : { height: "4px" }}
                          transition={{
                            repeat: Infinity,
                            duration: 0.6 + (idx % 4) * 0.15,
                            ease: "easeInOut"
                          }}
                          className="w-1.5 rounded-t-sm bg-gradient-to-t from-[#006400] to-emerald-400"
                        />
                      );
                    })}
                  </div>

                  {/* Progress Tracker Slider bar */}
                  <div className="space-y-1 pb-4" id="tracker-container">
                    <input
                      ref={progressInputRef}
                      type="range"
                      min="0"
                      max="100"
                      value={duration > 0 ? (currentTime / duration) * 100 : 0}
                      onChange={handleScrubChange}
                      className="w-full accent-[#006400] h-1.5 bg-emerald-50 rounded-lg cursor-pointer transition-all hover:bg-emerald-100/60"
                    />
                    <div className="flex justify-between items-center text-[10px] font-mono text-stone-500">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* Primary Audio Buttons row */}
                  <div className="flex items-center justify-between pt-2 border-t border-stone-100" id="audio-buttons-row">
                    {/* Loop trigger button */}
                    <button
                      onClick={() => setIsLooping(!isLooping)}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                        isLooping 
                          ? "text-[#006400] border-[#006400]/30 bg-emerald-50" 
                          : "text-stone-400 border-transparent hover:text-stone-700"
                      }`}
                      title="Loop Current Track"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    {/* Track controls segment */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handlePrevTrack}
                        className="p-3 rounded-full bg-emerald-50 hover:bg-emerald-100/60 text-[#006400] border border-emerald-100/30 active:scale-95 transition-all cursor-pointer"
                      >
                        <SkipBack className="w-4 h-4 fill-[#006400]" />
                      </button>

                      <button
                        onClick={togglePlay}
                        className="p-4 sm:p-5 rounded-full bg-[#006400] hover:bg-[#38B000] text-white hover:scale-103 shadow-lg hover:shadow-emerald-900/10 font-extrabold active:scale-95 transition-all cursor-pointer flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 btn-primary-custom"
                      >
                        {isPlaying ? (
                          <Pause className="w-6 h-6 fill-white text-white stroke-[2.5]" />
                        ) : (
                          <Play className="w-6 h-6 fill-white text-white translate-x-0.5 stroke-[2.5]" />
                        )}
                      </button>

                      <button
                        onClick={handleNextTrack}
                        className="p-3 rounded-full bg-emerald-50 hover:bg-emerald-100/60 text-[#006400] border border-emerald-100/30 active:scale-95 transition-all cursor-pointer"
                      >
                        <SkipForward className="w-4 h-4 fill-[#006400]" />
                      </button>
                    </div>

                    {/* Volume slider controls */}
                    <div className="flex items-center gap-2 relative group" id="volume-fader-control">
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-2.5 rounded-xl text-stone-500 hover:text-stone-800 transition-all cursor-pointer"
                      >
                        {isMuted || volume === 0 ? (
                          <VolumeX className="w-4 h-4 text-stone-400" />
                        ) : (
                          <Volume2 className="w-4 h-4 text-[#006400]" />
                        )}
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={isMuted ? 0 : volume}
                        onChange={(e) => {
                           setVolume(parseFloat(e.target.value));
                           setIsMuted(false);
                        }}
                        className="w-16 accent-[#006400] h-1 bg-stone-100 rounded-lg cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Explicit Download Action Card inside active deck */}
                  <div className="mt-6 bg-emerald-50/50 border border-emerald-100/40 rounded-2xl p-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#006400] font-extrabold block">AVAILABLE FOR OFFLINE EXPORT</span>
                      <span className="text-[11px] font-sans text-stone-600 block mt-0.5 text-ellipsis overflow-hidden">High definition audio track</span>
                    </div>
                    {activeTrack && (
                      <button
                        onClick={() => handleDownload(activeTrack)}
                        className={`px-4 py-2 rounded-xl text-[10px] font-mono font-extrabold uppercase tracking-widest flex items-center gap-1.5 border transition-all cursor-pointer ${
                          downloadSuccessId === activeTrack.id
                            ? "bg-emerald-600 border-[#10b981] text-white"
                            : "bg-[#006400] hover:bg-[#38B000] text-white border-transparent shadow-md font-black btn-primary-custom"
                        }`}
                      >
                        {downloadSuccessId === activeTrack.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            SAVED
                          </>
                        ) : (
                          <>
                            <Download className="w-3.5 h-3.5" />
                            DOWNLOAD
                          </>
                        )}
                      </button>
                    )}
                  </div>

                </div>
              </div>

              {/* Right Panel: Playlist Directory (lg:col-span-7) */}
              <div className="lg:col-span-7 flex flex-col gap-6" id="playlist-column">
                
                {/* Playlist search bar */}
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center p-5 rounded-3xl bg-emerald-50/30 border border-emerald-100/60" id="playlist-header-nav">
                  <h3 className="font-sans font-black text-[#006400] text-base sm:text-lg flex items-center gap-2 select-none">
                    <Music className="w-4 h-4 text-[#006400]" /> Compositions Index
                  </h3>
                  
                  <div className="relative max-w-sm w-full" id="playlist-search-box">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                    <input
                      type="text"
                      placeholder="Search tracks, genres..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-white border border-emerald-100/60 hover:border-emerald-200 rounded-xl text-stone-800 text-xs focus:outline-none focus:border-[#006400] focus:bg-emerald-50/20 transition-all font-sans placeholder-stone-400"
                    />
                  </div>
                </div>

                {/* List Table wrapper of playlist */}
                <div className="bg-white rounded-3xl border border-emerald-100/80 divide-y divide-emerald-50 overflow-hidden shadow-md" id="audio-playlist-list">
                  {filteredTracks.map((track, idx) => {
                    const isSelected = activeTrack?.id === track.id;
                    
                    return (
                      <div
                        key={track.id}
                        className={`p-4 sm:p-5 flex items-center justify-between transition-all cursor-pointer select-none border-l-[3px] ${
                          isSelected 
                            ? "bg-emerald-50/60 border-[#006400] text-[#006400] shadow-inner font-bold" 
                            : "hover:bg-emerald-50/10 border-transparent text-stone-700"
                        }`}
                        onClick={() => selectTrack(idx)}
                      >
                        <div className="flex items-center gap-4 text-left">
                          {/* Play State Indicator Bullet */}
                          <div className="w-6 h-6 rounded-md bg-emerald-50/60 border border-emerald-100/30 flex items-center justify-center text-[10px] font-mono font-bold text-[#006400]">
                            {isSelected && isPlaying ? (
                              <motion.div 
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 1 }}
                                className="w-2.5 h-2.5 rounded-full bg-[#10b981]"
                              />
                            ) : (
                              <span className="text-[#006400]/70">{(idx + 1).toString().padStart(2, "0")}</span>
                            )}
                          </div>

                          {/* Track details descriptions */}
                          <div>
                            <h4 className={`font-sans font-black text-sm tracking-tight ${
                              isSelected ? "text-[#006400]" : "text-stone-800"
                            }`}>
                              {track.title}
                            </h4>
                            <p className="text-stone-500 text-xs mt-0.5 font-medium flex items-center gap-1.5 sm:gap-2.5">
                              <span>{track.artist}</span>
                              <span className="w-1 h-1 rounded-full bg-[#006400]/20" />
                              <span className="text-[10px] font-mono bg-emerald-50 border border-emerald-100/20 px-2 py-0.5 rounded text-[#006400] badge-tag-custom">{track.category}</span>
                            </p>
                          </div>
                        </div>

                        {/* Action buttons on the row side */}
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-xs text-stone-600 bg-stone-50 border border-stone-100 px-2.5 py-1 rounded-md">
                            {track.duration}
                          </span>
                          
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownload(track);
                            }}
                            className={`p-2 rounded-lg border border-transparent hover:border-emerald-100/50 text-[#006400]/50 hover:text-[#006400] transition-all cursor-pointer ${
                              downloadSuccessId === track.id ? "bg-emerald-50 text-emerald-600" : ""
                            }`}
                            title="Download MP3 File"
                          >
                            {downloadSuccessId === track.id ? (
                              <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                            ) : (
                              <Download className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {filteredTracks.length === 0 && (
                    <div className="py-16 text-center" id="empty-playlist">
                      <Sparkles className="w-8 h-8 text-[#006400] mx-auto opacity-35 animate-pulse mb-3" />
                      <h3 className="text-stone-700 font-sans font-bold text-sm">No Music Matches</h3>
                      <p className="text-stone-500 text-xs mt-1 bg-stone-50 border border-stone-100 inline-block px-3 py-1 rounded-full">Try searching for other local music files</p>
                    </div>
                  )}
                </div>

              </div>

            </div>
          )}

          {/* Loading state spinner */}
          {loading && (
            <div className="py-24 text-center" id="music-studio-loading">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                className="w-10 h-10 border-4 border-[#006400] border-t-transparent rounded-full mx-auto mb-4"
              />
              <span className="font-mono text-xs text-[#006400] uppercase tracking-widest font-extrabold block animate-pulse">Scanning track database...</span>
            </div>
          )}

        </main>
      </div>

    </div>
  );
}
