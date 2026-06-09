import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onSwitchToHeritage: () => void;
  onPlanVisit?: () => void;
  weatherDescription?: string;
  temperature?: number;
}

export default function Hero({ onSwitchToHeritage, onPlanVisit, weatherDescription, temperature }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video || !audio) return;

    const enforceNormalPace = () => {
      video.defaultPlaybackRate = 1.0;
      video.playbackRate = 1.0;
      audio.defaultPlaybackRate = 1.0;
      audio.playbackRate = 1.0;
    };

    // Soft sync avoids stuttering from constant seek clearing buffers
    const syncAudioTime = () => {
      if (Math.abs(audio.currentTime - video.currentTime) > 1.2) {
        audio.currentTime = video.currentTime;
      }
    };

    const unlockAudioOnGesture = () => {
      cleanupPageUnlockListeners();
      if (!isAudioMuted) {
        audio.muted = false;
        // Warm sync time
        audio.currentTime = video.currentTime;
        audio.play().then(() => {
          console.log("[Hero Audio] Audio activated and unmuted successfully via page interaction.");
        }).catch((err) => {
          console.warn("[Hero Audio] Activation play failed:", err);
        });
      }
    };

    const activationEvents = ["click", "touchstart", "mousedown", "keydown"];

    const attachPageUnlockListeners = () => {
      activationEvents.forEach(evt => {
        window.addEventListener(evt, unlockAudioOnGesture, { once: true, passive: true });
      });
    };

    const cleanupPageUnlockListeners = () => {
      activationEvents.forEach(evt => {
        window.removeEventListener(evt, unlockAudioOnGesture);
      });
    };

    // Play flow
    const startAudioPlayback = async () => {
      if (isAudioMuted) {
        audio.muted = true;
        audio.pause();
        return;
      }

      // If not muted in state, try to play unmuted first
      audio.muted = false;
      try {
        await audio.play();
        console.log("[Hero Audio] Standard unmuted autoplay succeeded.");
      } catch (err) {
        console.log("[Hero Audio] Standard unmuted autoplay blocked, playing muted fallback...", err);
        // Fallback: Play muted so it stays synchronized
        audio.muted = true;
        try {
          await audio.play();
          console.log("[Hero Audio] Muted autoplay fallback succeeded.");
        } catch (e) {
          console.error("[Hero Audio] Muted autoplay also failed:", e);
        }
        
        // Register page interaction listeners so the instant they tap/click, it unmutes!
        attachPageUnlockListeners();
      }
    };

    enforceNormalPace();
    startAudioPlayback();

    const onPlay = () => {
      syncAudioTime();
      if (!isAudioMuted) {
        audio.play().catch(() => {});
      }
    };

    const onPause = () => {
      audio.pause();
    };

    const onRateChange = () => {
      enforceNormalPace();
    };

    video.addEventListener("loadedmetadata", enforceNormalPace);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("ratechange", onRateChange);
    video.addEventListener("seeking", syncAudioTime);
    video.addEventListener("timeupdate", syncAudioTime);

    // Sync button muting dynamically
    if (isAudioMuted) {
      audio.muted = true;
      audio.pause();
    } else {
      audio.muted = false;
      audio.play().catch(() => {});
    }

    return () => {
      video.removeEventListener("loadedmetadata", enforceNormalPace);
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ratechange", onRateChange);
      video.removeEventListener("seeking", syncAudioTime);
      video.removeEventListener("timeupdate", syncAudioTime);
      cleanupPageUnlockListeners();
    };
  }, [isAudioMuted]);

  return (
    <section
      id="gateway-hero"
      className="relative min-h-[82vh] xl:min-h-[84vh] flex items-center justify-center bg-transparent px-6 sm:px-12 md:px-16 lg:px-24 pt-40 pb-20 select-none"
    >
      {/* 
        PREMIUM FULL-SCREEN SCROLLING BACKGROUND
        Replaced the living digital masonry columns with a rich, continuous visual backdrop
      */}
      <div 
        id="hero-background-media" 
        className="absolute inset-0 z-0 overflow-hidden bg-transparent"
      >
        {/* Full-bleed background video */}
        <div className="absolute inset-0 select-none transition-opacity duration-1000">
          <video
            ref={videoRef}
            src="/temp/webm/saulog.webm"
            aria-hidden="true"
            muted
            autoPlay
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover filter saturate-[1.12] brightness-[0.75] contrast-[1.02]"
          />
          <audio
            ref={audioRef}
            src="/audio/SAULOG%20AVP%202026%20V3.mp3"
            loop
            muted
            autoPlay
            preload="auto"
            className="hidden"
          />
          {/* Deep environmental tint overlays for maximum readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#152614]/30 via-transparent to-[#152614]/45 pointer-events-none z-15" />
        </div>

        {/* 
          VIGNETTE & LUXURY GLASS/VIBRANT GREEN OVERLAY
          Provides custom-tailored readability: deep vibrant green left-side gradient for sharp white text reading, 
          and balanced forest blend, replacing the black masks with beautiful emerald-green hues.
        */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#32e875]/15 via-transparent to-[#32e875]/15 z-20 pointer-events-none" />
        <div className="absolute inset-0 bg-[#32e875]/2 z-20 pointer-events-none" />
        <div className="absolute inset-0 backdrop-blur-[1px] z-10 pointer-events-none" />

        {/* Soft edge gradients matching parent theme without concealing the masonry carousel */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#32e875]/25 to-transparent z-25 pointer-events-none" />
        
        {/* Floating atmospheric sunbeam of color to enrich scene */}
        <div className="absolute top-1/4 right-[25%] w-96 h-96 rounded-full bg-[#FFD54F]/5 blur-[120px] mix-blend-screen pointer-events-none z-15" />
      </div>

      {/* 
        PREMIUM DYNAMIC IMAGE SEPARATOR
        Uses temp/divider2.png as the separator,
        carefully styled to be perfectly proportioned and seamless.
      */}
      <img 
        src="/temp/divider2.png"
        alt="Heritage Separator Curve"
        className="absolute bottom-[-2px] left-0 w-full overflow-hidden pointer-events-none z-32 h-[11px] sm:h-[16px] md:h-[21px] lg:h-[28px] object-fill select-none"
        id="hero-bottom-artwork-separator"
      />


      {/* Downward transition blend overlaying the home page area directly to connect them seamlessly behind the curves */}
      {/* Removed to allow crisp transition to white background */}

      {/* FOREGROUND MAIN TEXT CONTENT */}
      <div className="relative z-40 w-full max-w-7xl flex flex-col items-center justify-center text-center mx-auto px-4" id="hero-main-content">
        {/* Primary Page Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-display text-[12.5vw] sm:text-[12.5vw] md:text-[12vw] lg:text-[12vw] xl:text-[11.5vw] 2xl:text-[15.5rem] font-black -tracking-[0.01em] text-white leading-none block uppercase text-center w-full whitespace-nowrap"
          id="hero-main-headline"
        >
          <span className="inline-block transform scale-y-[1.15] origin-center text-center w-full">
            TAGBILARAN
          </span>
        </motion.h1>

        {/* Subtitle with elegant Moderniz font inside hero */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="font-moderniz text-[10px] sm:text-xs md:text-sm font-medium tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#38B000] via-[#9EF01A] to-white max-w-3xl mx-auto mt-2 filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.98)] text-center block w-full uppercase"
          id="hero-subtitle"
        >
          WHERE HISTORY MEETS FRIENDSHIP
        </motion.p>
      </div>

      <button
        type="button"
        onClick={() => setIsAudioMuted((prev) => !prev)}
        aria-label={isAudioMuted ? "Unmute background audio" : "Mute background audio"}
        className="absolute bottom-10 right-6 z-50 h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-[#8EE6A8]/85 bg-linear-to-br from-[#66D17F] to-[#49B368] text-[#F2FFF6] transition-transform duration-200 hover:scale-105 active:scale-95 flex items-center justify-center"
      >
        {isAudioMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
    </section>
  );
}
