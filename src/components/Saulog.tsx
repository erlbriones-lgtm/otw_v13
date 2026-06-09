import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, Music, Sparkles, Volume2, VolumeX, ShieldAlert, Users, Award, Play, Square, Compass } from "lucide-react";

// Synthesized Beating Drum loop using standard Web Audio API (safe, offline-ready! No static audio dependencies)
let audioCtx: AudioContext | null = null;
let intervalId: any = null;

const barangayFestivals = [
  { name: "Cogon", theme: "Weavers of Hope & Baskets", color: "from-[#FFD54F] to-[#FF9800]", costume: "Golden coconut husks & rich woven palm baskets", speed: "115 BPM", highlight: "Dramatic basket tossing choreography representing local livelihoods." },
  { name: "Poblacion I", theme: "Port of Peace & Galleons", color: "from-blue-400 to-blue-700", costume: "Deep sea-blue velvets with gold anchor embellishments", speed: "120 BPM", highlight: "Reenactment of early maritime trade and Spanish galleon arrivals." },
  { name: "Poblacion II", theme: "Civic Craftsmanship & Sovereignty", color: "from-emerald-400 to-emerald-700", costume: "Vibrant green silk panels with polished bamboo reeds", speed: "118 BPM", highlight: "Precision sync formations displaying the historic Casa Real foundation." },
  { name: "Poblacion III", theme: "Fisherfolk of the Golden Harbor", color: "from-cyan-400 to-teal-700", costume: "Hand-painted fish scale armors and net headdresses", speed: "122 BPM", highlight: "Acrobatic wave tossing and synchronized net-throwing mimicry." },
  { name: "Booy", theme: "Clay and Potter's Devotion", color: "from-amber-600 to-amber-900", costume: "Terracotta fabric wraps lined with clay bead collars", speed: "116 BPM", highlight: "Formations sculpting large ceremonial clay pots during the crescendo." },
  { name: "Cabawan", theme: "Abundant Harvesters", color: "from-yellow-400 to-green-700", costume: "Sunflowers and golden dry rice stalk crowns", speed: "114 BPM", highlight: "Traditional harvest step featuring authentic bamboo pestles." },
  { name: "Dampas", theme: "Agricultural Sovereignty & Clay", color: "from-orange-400 to-red-700", costume: "Earthy orange tapestries reflecting the rich local soils", speed: "118 BPM", highlight: "Staccato drum movements honoring the earth's bounty and pottery heritage." },
  { name: "Dao", theme: "The Mighty Dao Tree Guardians", color: "from-green-500 to-emerald-900", costume: "Leafy woodland capes with tall native tree bark crowns", speed: "112 BPM", highlight: "Sprawling branch-like hand structures showing ancestral forest protection." },
  { name: "Manga", theme: "Bountiful Orchard of the South", color: "from-yellow-300 to-lime-600", costume: "Lush mango-yellow silks with vibrant green leafy trims", speed: "120 BPM", highlight: "Dancing under floating fruit canopies with highly rhythmic basket skips." },
  { name: "Mansasa", theme: "Artisans of Shells & Pearl", color: "from-pink-300 to-rose-600", costume: "Iridescent capes reflecting Bohol's legendary pearl shell", speed: "117 BPM", highlight: "Fluid fan-dancing reproducing the rolling waves of the Tagbilaran shore." },
  { name: "San Isidro", theme: "St. Isidore the Farmer's Feast", color: "from-green-400 to-amber-600", costume: "Pastoral green linen vests with woven cornstalk banners", speed: "115 BPM", highlight: "Coordinated spade-and-plow street maneuvers symbolizing labor devotion." },
  { name: "Taloto", theme: "Devotion of the Sacred Well", color: "from-cyan-300 to-blue-600", costume: "Glittery water-ripple fabrics mirroring crystalline springs", speed: "116 BPM", highlight: "Spill-and-splash stage tricks representing the historical holy well." },
  { name: "Tiptip", theme: "Upland Corn and Loam Fields", color: "from-yellow-500 to-orange-700", costume: "Bright yellow tassels with sturdy hemp braided belts", speed: "119 BPM", highlight: "Upbeat high-knee stomping representing robust upland grit and triumph." },
  { name: "Ubujan", theme: "Guards of the Historic Watchtower", color: "from-slate-400 to-slate-700", costume: "Stone-textured chest guards with dynamic torch props", speed: "121 BPM", highlight: "Defensive shield walls celebrating regional watchtower vigilance." },
  { name: "Taloto Hills", theme: "Highland Forest Guardians", color: "from-teal-400 to-emerald-800", costume: "Ornate beaded collars with wild fern headpieces", speed: "116 BPM", highlight: "Highland bird-like hopping depicting community elevation and watchfulness." }
];

const festivalEvents = [
  { date: "April 20", title: "Novena Processions", desc: "The official spiritual dawn. Nine nights of sacred vigils and traditional brass brand marches winding through the historic city streets." },
  { date: "April 25", title: "Saulog Festival Queen Pageant", desc: "A showcase of Boholano poise, intellect, and heritage advocacy. Cultural ambassadors wear breathtaking couture depicting local legends." },
  { date: "April 30", title: "Grand Street Dancing Soapbox", desc: "The absolute climax. All 15 barangays take over the main avenues in a 3-kilometer synchronized street dancing marathon." },
  { date: "May 1", title: "Feast of San Jose the Worker", desc: "The ultimate fiesta. Solemn concelebrated masses, grand processional floats, and open-home traditional Boholano banquets." }
];

export default function Saulog() {
  const [selectedBrgy, setSelectedBrgy] = useState(barangayFestivals[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [beatType, setBeatType] = useState<"fiesta" | "samba" | "steady">("fiesta");

  // Web Audio synthesizer for the Saulog Beat soundboard!
  const startSynthesizer = (type: "fiesta" | "samba" | "steady") => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }

    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      if (audioCtx.state === "suspended") {
        audioCtx.resume();
      }

      setIsPlaying(true);
      setBeatType(type);

      let step = 0;
      const bpm = type === "fiesta" ? 120 : type === "samba" ? 132 : 105;
      const intervalMs = (60 / bpm) * 1000 / 2; // Eighth notes

      const playClassicFiestaBeat = (s: number) => {
        if (!audioCtx) return;
        
        // Synth bass drum
        if (s % 8 === 0 || s % 8 === 3 || s % 8 === 6) {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          
          osc.frequency.setValueAtTime(140, audioCtx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(45, audioCtx.currentTime + 0.15);
          
          gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
          
          osc.start();
          osc.stop(audioCtx.currentTime + 0.25);
        }

        // Festive Woodblocks/Agogo Bells
        if (s % 4 === 1 || s % 4 === 2 || s % 8 === 5) {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          
          const pitch = s % 8 === 5 ? 880 : 1046; // Alternating high-low agogo bells
          osc.type = "sine";
          osc.frequency.setValueAtTime(pitch, audioCtx.currentTime);
          
          gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.08);
          
          osc.start();
          osc.stop(audioCtx.currentTime + 0.1);
        }

        // Snare/Shaker roll
        if (s % 2 !== 0) {
          const bufferSize = audioCtx.sampleRate * 0.04;
          const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
          }

          const noiseSrc = audioCtx.createBufferSource();
          noiseSrc.buffer = buffer;
          
          const noiseGain = audioCtx.createGain();
          noiseSrc.connect(noiseGain);
          noiseGain.connect(audioCtx.destination);
          
          const vol = s % 4 === 3 ? 0.08 : 0.04;
          noiseGain.gain.setValueAtTime(vol, audioCtx.currentTime);
          noiseGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.035);
          
          noiseSrc.start();
        }
      };

      const playSambaCarnivalBeat = (s: number) => {
        if (!audioCtx) return;

        // Double Surdo (Bass)
        if (s % 8 === 0 || s % 8 === 1 || s % 8 === 4 || s % 8 === 6) {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.frequency.setValueAtTime(110, audioCtx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(32, audioCtx.currentTime + 0.18);
          gain.gain.setValueAtTime(0.6, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.22);
          osc.start();
          osc.stop(audioCtx.currentTime + 0.25);
        }

        // Tamborim high click
        if (s % 8 === 2 || s % 8 === 3 || s % 8 === 5 || s % 8 === 7) {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.type = "triangle";
          osc.frequency.setValueAtTime(1600, audioCtx.currentTime);
          gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);
          osc.start();
          osc.stop(audioCtx.currentTime + 0.051);
        }
      };

      const playSteadyProcessionBeat = (s: number) => {
        if (!audioCtx) return;

        // Processional Heavy Marching Drum
        if (s % 4 === 0 || s % 8 === 6) {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.type = "sine";
          osc.frequency.setValueAtTime(120, audioCtx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.3);
          gain.gain.setValueAtTime(0.55, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
          osc.start();
          osc.stop(audioCtx.currentTime + 0.4);
        }

        // Heavy Cathedral Bell Tolling
        if (s % 16 === 1) {
          const osc1 = audioCtx.createOscillator();
          const osc2 = audioCtx.createOscillator();
          const gainNode = audioCtx.createGain();
          
          osc1.connect(gainNode);
          osc2.connect(gainNode);
          gainNode.connect(audioCtx.destination);
          
          osc1.type = "sine";
          osc2.type = "triangle";
          osc1.frequency.setValueAtTime(320, audioCtx.currentTime); 
          osc2.frequency.setValueAtTime(323, audioCtx.currentTime); // Slight detune for realistic bell hum
          
          gainNode.gain.setValueAtTime(0.18, audioCtx.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.8);
          
          osc1.start();
          osc2.start();
          osc1.stop(audioCtx.currentTime + 2.0);
          osc2.stop(audioCtx.currentTime + 2.0);
        }
      };

      intervalId = setInterval(() => {
        if (type === "fiesta") {
          playClassicFiestaBeat(step);
        } else if (type === "samba") {
          playSambaCarnivalBeat(step);
        } else {
          playSteadyProcessionBeat(step);
        }
        step = (step + 1) % 16;
      }, intervalMs);

    } catch (err) {
      console.warn("Web Audio failed to boot or is restricted:", err);
    }
  };

  const stopSynthesizer = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
    setIsPlaying(false);
  };

  return (
    <div className="w-full bg-white text-[#05461a] pt-32 pb-24 px-4 sm:px-6 md:px-12 select-none" id="saulog-full-view">
      
      {/* 1. Header Hero with Vibrant Festive Vibes */}
      <div className="max-w-6xl mx-auto text-center mb-16" id="saulog-hero">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-[#FF8F00] font-mono text-[10px] sm:text-xs font-black tracking-widest uppercase mb-6 shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FFB300] animate-spin-slow" />
          The Soul of Tagbilaran Fiesta
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-sans font-black text-4xl sm:text-6xl md:text-7xl text-[#05461a] tracking-tight leading-none mb-6"
        >
          SAULOG <span className="inline-block text-[#FF9800] text-accent-yellow relative">TAGBILARAN</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#2E7D32] text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto font-sans font-semibold"
        >
          An explosion of syncopated drum beats, stunning heirloom costumes, and devotional street choreography. Derived from the Visayan word <strong className="text-[#FF9800]">"saulog"</strong> meaning to celebrate, this annual legacy carnival unites the 15 historic districts of our premier creative port city.
        </motion.p>
      </div>

      {/* 2. Audio Beating Soundboard section */}
      <div className="max-w-5xl mx-auto mb-20" id="saulog-soundboard">
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50/70 to-amber-50/60 rounded-3xl border border-emerald-100/90 p-8 sm:p-10 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 text-left">
              <div className="flex items-center gap-2 text-rose-600 font-mono text-xs font-black tracking-widest uppercase mb-2">
                <Music className="w-4 h-4 animate-bounce" /> Live Rhythm Synth
              </div>
              <h2 className="font-sans font-black text-2xl sm:text-3xl text-[#05461a] tracking-tight leading-tight">
                Feel the Saulog Beat
              </h2>
              <p className="text-sm text-[#2E7D32] mt-3 leading-relaxed font-semibold">
                Dance to the heartbeat of the festival. Play our interactive, browser-synthesized acoustic percussion loops to feel the real energy of Tagbilaran's street performers.
              </p>
              
              {/* Play/Stop controls */}
              <div className="mt-6 flex flex-wrap gap-2.5">
                {isPlaying ? (
                  <button
                    onClick={stopSynthesizer}
                    className="flex items-center gap-2 px-5 py-3 bg-[#05461a] text-white rounded-2xl font-mono text-xs font-bold uppercase hover:bg-emerald-900 transition-all cursor-pointer shadow-sm hover:scale-[1.02] active:scale-95"
                  >
                    <Square className="w-3.5 h-3.5" /> Stop Rhythms
                  </button>
                ) : (
                  <button
                    onClick={() => startSynthesizer(beatType)}
                    className="flex items-center gap-2 px-5 py-3 bg-[#FF9800] text-white rounded-2xl font-mono text-xs font-bold uppercase hover:bg-[#E65100] transition-all cursor-pointer shadow-sm hover:scale-[1.02] active:scale-95 animate-pulse"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" /> Play Beats
                  </button>
                )}
              </div>
            </div>

            {/* Simulated loop choosing interface */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { type: "fiesta", title: "Street Showdown", tempo: "120 BPM", desc: "Traditional drum bells, agogos and rapid whistle blows." },
                { type: "samba", title: "Fiesta Samba", tempo: "132 BPM", desc: "Uptempo Latin fusion with massive sub bass drum beats." },
                { type: "steady", title: "Solemn Procession", tempo: "105 BPM", desc: "Stately drum marches married with cathedral toll bells." }
              ].map((style) => (
                <button
                  key={style.type}
                  onClick={() => {
                    startSynthesizer(style.type as any);
                  }}
                  className={`p-5 rounded-2xl text-left border transition-all duration-300 cursor-pointer flex flex-col justify-between h-40 ${
                    isPlaying && beatType === style.type
                      ? "bg-white border-[#05461a] shadow-md ring-2 ring-emerald-600/10 scale-[1.02]"
                      : "bg-[#05461a]/5 hover:bg-white border-emerald-100/60 hover:border-emerald-300"
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="font-mono text-[9px] font-black text-[#2E7D32] bg-emerald-50 px-2 py-0.5 rounded-full uppercase">
                        {style.tempo}
                      </span>
                      {isPlaying && beatType === style.type && (
                        <span className="flex gap-0.5 h-3 items-end">
                          <span className="w-0.75 bg-[#05461a] animate-[shaker_0.8s_ease-in-out_infinite_alternate]" style={{ height: "100%" }} />
                          <span className="w-0.75 bg-[#FF9800] animate-[shaker_0.5s_ease-in-out_infinite_alternate]" style={{ height: "60%" }} />
                          <span className="w-0.75 bg-teal-600 animate-[shaker_0.7s_ease-in-out_infinite_alternate]" style={{ height: "80%" }} />
                        </span>
                      )}
                    </div>
                    <h3 className="font-sans font-bold text-sm text-[#05461a] mt-3">
                      {style.title}
                    </h3>
                  </div>
                  <p className="text-[11px] text-[#2E7D32]/80 leading-relaxed font-semibold mt-1">
                    {style.desc}
                  </p>
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* 3. Interactive Barangay Arena Selector (15 Barangays) */}
      <div className="max-w-6xl mx-auto mb-20" id="saulog-barangay-arena">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="font-sans font-black text-3xl text-[#05461a] tracking-tight">
            15 Barangays street showdown
          </h2>
          <p className="text-sm text-[#2E7D32] mt-2 font-semibold">
            All fifteen residential sectors showcase distinct themes reflecting local crafts, coastal lore, clay pottery, or upland harvests. Select one below to explore their performance profile.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: 15 Grid items buttons */}
          <div className="lg:col-span-5 grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-3 gap-2 overflow-y-auto max-h-[460px] pr-2 scrollbar-none">
            {barangayFestivals.map((brgy) => {
              const worksSelected = selectedBrgy.name === brgy.name;
              return (
                <button
                  key={brgy.name}
                  onClick={() => setSelectedBrgy(brgy)}
                  className={`p-3 rounded-xl border text-center transition-all duration-200 cursor-pointer font-sans font-bold text-xs ${
                    worksSelected
                      ? "bg-[#05461a] text-[#FFD54F] border-[#05461a] shadow-md scale-102"
                      : "bg-[#05461a]/5 hover:bg-white text-[#05461a] border-emerald-100/50 hover:border-emerald-300"
                  }`}
                  id={`btn-saulog-${brgy.name.toLowerCase().replace(/\s/g, "-")}`}
                >
                  {brgy.name}
                </button>
              );
            })}
          </div>

          {/* Right panel: Information Showcase Card of selected Barangay */}
          <div className="lg:col-span-7 h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedBrgy.name}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-emerald-50/30 border border-emerald-100/90 rounded-3xl p-6 sm:p-8 text-left relative overflow-hidden flex flex-col justify-between h-full min-h-[400px]"
              >
                {/* Background decorative wash based on chosen theme colored gradient */}
                <div className={`absolute -right-24 -top-24 w-60 h-60 rounded-full bg-gradient-to-br ${selectedBrgy.color} opacity-20 blur-4xl`} />
                
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-emerald-100/80 pb-5">
                    <div>
                      <span className="font-mono text-[9px] font-black text-[#FF9800] bg-orange-50 border border-orange-100 px-3 py-1 rounded-full uppercase tracking-wider">
                        CHAMPIONSHIP PROFILE
                      </span>
                      <h3 className="font-sans font-black text-2xl sm:text-3xl text-[#05461a] mt-2">
                        Barangay {selectedBrgy.name}
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-xs font-black text-[#2E7D32] block">TEMPO RHYTHM</span>
                      <span className="font-mono text-base font-black text-[#05461a]">{selectedBrgy.speed}</span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-5">
                    <div>
                      <h4 className="font-mono text-[10px] font-black text-[#2E7D32]/80 uppercase tracking-widest">
                        CREATIVE PERFORMANCE THEME
                      </h4>
                      <p className="font-sans font-black text-[#05461a] text-lg mt-1">
                        {selectedBrgy.theme}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-mono text-[10px] font-black text-[#2E7D32]/80 uppercase tracking-widest">
                        HANDMADE CRAFT COSTUMES
                      </h4>
                      <p className="font-sans font-bold text-sm text-[#2E7D32] mt-1">
                        {selectedBrgy.costume}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-mono text-[10px] font-black text-[#2E7D32]/80 uppercase tracking-widest">
                        SPECTACULAR CLIMAX FORMATION
                      </h4>
                      <p className="font-sans font-bold text-sm text-[#2E7D32] mt-1 text-justify">
                        {selectedBrgy.highlight}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-emerald-100/60 flex items-center justify-between text-xs font-mono text-[#2E7D32]/70">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Compass className="w-4 h-4 text-[#FF9800]" /> Saulog Showdown Arena
                  </span>
                  <span className="uppercase font-bold tracking-wider">Official Entry ➔</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>

      {/* 4. Core Festival Events Schedule Calendar */}
      <div className="max-w-6xl mx-auto mb-20" id="saulog-schedule">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-sans font-black text-3xl text-[#05461a] tracking-tight">
            The Fiesta Milestone Calendar
          </h2>
          <p className="text-sm text-[#2E7D32] mt-2 font-semibold">
            Plan your visit during our peak golden month of celebration. The festivities span multiple high-impact cultural events culminating on May Day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {festivalEvents.map((evt, idx) => (
            <motion.div
              key={evt.title}
              whileHover={{ y: -4, borderColor: "#05461a", boxShadow: "0 10px 25px rgba(5, 70, 26, 0.05)" }}
              className="p-6 rounded-2xl bg-gradient-to-b from-white to-emerald-50/10 border border-emerald-100/60 transition-all duration-300 text-left flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-base font-black text-[#FF9800] bg-orange-50 leading-none py-1.5 px-3 rounded-xl border border-orange-100 inline-block">
                  {evt.date}
                </span>
                <h3 className="font-sans font-black text-lg text-[#05461a] mt-5 tracking-tight leading-snug">
                  {evt.title}
                </h3>
                <p className="text-xs text-[#2E7D32] leading-relaxed mt-2.5 font-semibold text-justify">
                  {evt.desc}
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-emerald-50 flex justify-end text-[10px] font-mono text-[#FF9800]/95 font-bold uppercase tracking-widest">
                Event Details ➔
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 5. Pure Cultural Pillar Highlights */}
      <div className="max-w-6xl mx-auto" id="saulog-pillars">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="p-8 rounded-2xl bg-emerald-50/25 border border-emerald-100/80 text-left">
            <div className="w-10 h-10 rounded-xl bg-[#05461a]/5 flex items-center justify-center text-[#05461a] mb-5">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-sans font-black text-xl text-[#05461a] tracking-tight">
              Community Spirit
            </h3>
            <p className="text-xs sm:text-sm text-[#2E7D32] leading-relaxed mt-2 font-semibold text-justify">
              Each street choreography requires months of arduous collaborative practice among residential guilds, maintaining solidarity across neighbors, youths, and senior craftsmen.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-emerald-50/25 border border-emerald-100/80 text-left">
            <div className="w-10 h-10 rounded-xl bg-[#05461a]/5 flex items-center justify-center text-[#05461a] mb-5">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-sans font-black text-xl text-[#05461a] tracking-tight">
              Honoring San Jose
            </h3>
            <p className="text-xs sm:text-sm text-[#2E7D32] leading-relaxed mt-2 font-semibold text-justify">
              With origins rooted in devotional grace, the dances symbolize thanks for the abundant harvests, sheltered marine harbors, and the physical safety of our historic city.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-emerald-50/25 border border-emerald-100/80 text-left">
            <div className="w-10 h-10 rounded-xl bg-[#05461a]/5 flex items-center justify-center text-[#05461a] mb-5">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="font-sans font-black text-xl text-[#05461a] tracking-tight">
              Creative Preservation
            </h3>
            <p className="text-xs sm:text-sm text-[#2E7D32] leading-relaxed mt-2 font-semibold text-justify">
              By using purely organic Boholano fibers, bamboo frame molds, and traditional clay decorations, Saulog serves as an active living design preserve for folk arts.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
