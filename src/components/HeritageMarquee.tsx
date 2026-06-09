import { Compass } from "lucide-react";

const bcs = "/webp/Poblacion%201,%20Tagbilaran%20City%20(1).webp";
const baliliOldHouse = "/webp/Old%20House%20in%20Poblacion%201%20(3).webp";
const bloodCompact21 = "/webp/Poblacion%201,%20Tagbilaran%20City%20(2).webp";
const museum2 = "/webp/Poblacion%201,%20Tagbilaran%20City%20(1)%20(1).webp";
const oldHousePob1 = "/webp/Old%20House%20in%20Poblacion%201%20(5).webp";

interface MarqueeCardProps {
  id: string;
  title: string;
  category: string;
  district: string;
  image: string;
  desc: string;
}

const row1Cards: MarqueeCardProps[] = [
  {
    id: "plaza-rizal-historic",
    title: "Plaza Rizal",
    category: "Heritage Park",
    district: "Downtown",
    image: "/webp/Poblacion%201,%20Tagbilaran%20City%20(1).webp",
    desc: "A soothing public square in the heart of downtown, serving as a sanctuary for city birds."
  },
  {
    id: "nm-bohol-area-museum-historic",
    title: "NM Bohol Area Museum",
    category: "Museum",
    district: "Old Capitol",
    image: "/webp/Poblacion%201,%20Tagbilaran%20City%20(2).webp",
    desc: "A spectacular 1860 stone-and-lime tribunal showcasing deep native prehistoric history."
  },
  {
    id: "cathedral-st-joseph-worker-historic",
    title: "Cathedral of St. Joseph the Worker",
    category: "Spanish Church",
    district: "Poblacion",
    image: "/webp/Old%20House%20in%20Poblacion%201%20(5).webp",
    desc: "Centuries-old limestone cathedral decorated with breathtaking local ceiling frescoes."
  },
  {
    id: "garden-cafe",
    title: "Garden Cafe",
    category: "Cultural Cafe",
    district: "Poblacion",
    image: "/webp/Poblacion%201,%20Tagbilaran%20City%20(1)%20(1).webp",
    desc: "A social enterprise serving great food and supporting the deaf community since development."
  },
  {
    id: "reyes-house",
    title: "Reyes House",
    category: "Ancestral House",
    district: "Poblacion",
    image: "/webp/Old%20House%20in%20Poblacion%201%20(3).webp",
    desc: "A mute revolutionary witness to the 1900 secrets of anti-colonial resistance fighters."
  },
  {
    id: "friendship-park-abueva",
    title: "Friendship Park",
    category: "Monument",
    district: "Barangay Bool",
    image: "/webp/Poblacion%201,%20Tagbilaran%20City%20(1).webp",
    desc: "Napoleon Abueva's supreme Sandugo bronze composition marking international diplomacy."
  },
  {
    id: "cpg-heritage-house",
    title: "CPG Heritage House",
    category: "President's Home",
    district: "Poblacion",
    image: "/webp/Old%20House%20in%20Poblacion%201%20(7).webp",
    desc: "The personal estate of President Carlos P. Garcia housing historic chessboards."
  }
];

const row2Cards: MarqueeCardProps[] = [
  {
    id: "balili-house-oasis-lodge",
    title: "Balili House / Oasis Lodge",
    category: "Heritage Lodge",
    district: "Poblacion",
    image: "/webp/Old%20House%20in%20Poblacion%201%20(3).webp",
    desc: "A majestic 1930s chalet masterfully preserved through adaptive civic accommodation."
  },
  {
    id: "capt-francisco-salazar-monument",
    title: "Capt. Salazar Monument",
    category: "WWII Memorial",
    district: "Barangay Ubujan",
    image: "/webp/Poblacion%201,%20Tagbilaran%20City%20(2).webp",
    desc: "Bas-relief tribute honoring the bravery of Salazar and 200 volunteer guerilla warriors."
  },
  {
    id: "casa-rocha",
    title: "Casa Rocha",
    category: "Heritage House",
    district: "Sitio Ubos",
    image: baliliOldHouse,
    desc: "One of the oldest surviving ancestral houses and classic bahay na tisa."
  },
  {
    id: "rocha-suarez-house",
    title: "Rocha-Suarez House",
    category: "Ancestral House",
    district: "Sitio Ubos",
    image: oldHousePob1,
    desc: "A grand Spanish colonial-era ancestral home preserving Sitio Ubos heritage."
  },
  {
    id: "beldia-house",
    title: "Beldia House",
    category: "Historic House",
    district: "Sitio Ubos",
    image: "/webp/Old%20House%20in%20Poblacion%201%20(3).webp",
    desc: "Pre-war residential architecture representing unique wood-and-stone style."
  },
  {
    id: "dalareich-chocolate-house",
    title: "Dalareich Chocolate House",
    category: "Chocolate Heritage",
    district: "Poblacion District",
    image: museum2,
    desc: "A cultural hub celebrating Bohol's rich bean-to-cup cacao traditions."
  },
  {
    id: "cultural-show",
    title: "Cultural Show",
    category: "Cultural Performance",
    district: "Saulog Stage",
    image: bloodCompact21,
    desc: "A live showcase of traditional folk dancers and local performing arts."
  }
];

interface HeritageMarqueeProps {
  onCardClick?: (id: string) => void;
}

export default function HeritageMarquee({ onCardClick }: HeritageMarqueeProps) {
  return (
    <section 
      id="infinite-heritage-marquee" 
      className="w-full pt-4 pb-16 bg-transparent text-[#05461a] overflow-hidden flex flex-col gap-12"
    >
      {/* Header Info */}
      <div className="text-center px-6 max-w-4xl mx-auto flex flex-col items-center select-none">
        <h3 className="font-display font-black text-5xl sm:text-6xl md:text-7xl uppercase tracking-tighter leading-none text-[#05461a] mb-4 text-center">
          Explore Our Heritage
        </h3>
        <p className="text-[#2E7D32]/80 text-sm sm:text-base leading-relaxed font-sans font-medium max-w-xl text-center">
          A continuous, panoramic exposition of Tagbilaran's cultural nodes. <strong className="font-black text-[#05461a]">**Click any card**</strong> below to open its dedicated immersive page with corresponding images, historical guides, and traveler tips.
        </p>
      </div>

      {/* Marquee Wrapper with Pause On Hover capability */}
      <div className="w-full flex flex-col gap-6 select-none relative hover-pause" id="marquee-rows-container">
        
        {/* Row 1: Scrolling Left */}
        <div className="w-full overflow-hidden relative py-2" id="marquee-row-1-wrapper">

          <div className="flex w-max flex-nowrap gap-6 animate-marquee-left" id="marquee-row-1">
            {/* Duplicated once for seamless endless scroll */}
            {[...row1Cards, ...row1Cards].map((card, idx) => (
              <div 
                key={`row1-${idx}`}
                onClick={() => onCardClick?.(card.id)}
                className="w-[280px] sm:w-[320px] shrink-0 bg-white rounded-3xl overflow-hidden border border-emerald-100 hover:border-[#05461a]/40 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.01] cursor-pointer flex flex-col text-left group"
              >
                {/* Image slot */}
                <div className="h-[180px] sm:h-[196px] w-full overflow-hidden relative">
                  <img 
                    src={card.image} 
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#05461a] text-white border border-white/10 backdrop-blur-sm px-3 py-1 rounded-md text-[9px] font-sans font-black tracking-widest uppercase shadow-sm">
                    {card.district}
                  </div>
                </div>

                {/* Content area */}
                <div className="p-6 flex-1 flex flex-col justify-between text-[#05461a]">
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-sans font-black tracking-widest text-[#2E7D32]/70 uppercase block mb-1.5">
                      {card.category}
                    </span>
                    <h4 className="font-sans font-black text-lg text-[#05461a] group-hover:text-[#2E7D32] transition-colors leading-snug">
                       {card.title}
                    </h4>
                    <p className="text-[#2E7D32]/80 text-xs sm:text-sm leading-relaxed mt-2.5 line-clamp-3 font-medium font-sans">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Scrolling Right */}
        <div className="w-full overflow-hidden relative py-2" id="marquee-row-2-wrapper">

          <div className="flex w-max flex-nowrap gap-6 animate-marquee-right" id="marquee-row-2">
            {/* Duplicated once for seamless endless scroll */}
            {[...row2Cards, ...row2Cards].map((card, idx) => (
              <div 
                key={`row2-${idx}`}
                onClick={() => onCardClick?.(card.id)}
                className="w-[280px] sm:w-[320px] shrink-0 bg-white rounded-3xl overflow-hidden border border-emerald-100 hover:border-[#05461a]/40 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-[1.01] cursor-pointer flex flex-col text-left group"
              >
                {/* Image slot */}
                <div className="h-[180px] sm:h-[196px] w-full overflow-hidden relative">
                  <img 
                    src={card.image} 
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-[#05461a] text-white border border-white/10 backdrop-blur-sm px-3 py-1 rounded-md text-[9px] font-sans font-black tracking-widest uppercase shadow-sm">
                    {card.district}
                  </div>
                </div>

                {/* Content area */}
                <div className="p-6 flex-1 flex flex-col justify-between text-[#05461a]">
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-sans font-black tracking-widest text-[#2E7D32]/70 uppercase block mb-1.5">
                      {card.category}
                    </span>
                    <h4 className="font-sans font-black text-lg text-[#05461a] group-hover:text-[#2E7D32] transition-colors leading-snug">
                      {card.title}
                    </h4>
                    <p className="text-[#2E7D32]/80 text-xs sm:text-sm leading-relaxed mt-2.5 line-clamp-3 font-medium font-sans">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
