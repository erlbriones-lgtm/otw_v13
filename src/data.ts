import { Landmark, Barangay } from "./types";
const slide1 = "/webp/Poblacion%201,%20Tagbilaran%20City%20(2).webp";
const slide2 = "/webp/Poblacion%201,%20Tagbilaran%20City%20(1).webp";
const slide4 = "/webp/Old%20House%20in%20Poblacion%201%20(3).webp";

export const tagbilaranLandmarks: Landmark[] = [
  {
    id: "plaza-rizal-historic",
    title: "Plaza Rizal",
    category: "Heritage",
    description: "Get a breath of fresh air and a soothing respite at the heart of downtown Tagbilaran. Plaza Rizal has become a hub for children, residents and tourists alike who delight at the sight of pigeons and the buzzing sound of a thousand city birds who find sanctuary in the green park.",
    location: "Downtown, Tagbilaran City",
    yearEstablished: "Spanish Era",
    highlight: "Park Sanctuary & Bird Hub",
    imageUrl: "/webp/Poblacion%201,%20Tagbilaran%20City%20(1).webp"
  },
  {
    id: "nm-bohol-area-museum-historic",
    title: "NM Bohol Area Museum",
    category: "Heritage",
    description: "Discover Bohol from prehistoric times to the present at the NM Bohol Area Museum housed in the old Bohol Provincial Capitol. This building was constructed in 1860 to serve as tribunal and military quarters for the Spanish military force. The structure was built in the traditional Spanish construction of stone and lime.",
    location: "Old Provincial Capitol, Tagbilaran City",
    yearEstablished: "1860",
    highlight: "Prehistoric Artifacts & Colonial Architecture",
    imageUrl: "/webp/Poblacion%201,%20Tagbilaran%20City%20(2).webp"
  },
  {
    id: "cathedral-st-joseph-worker-historic",
    title: "Cathedral of St. Joseph the Worker",
    category: "Heritage",
    description: "Opposite the NM Bohol Area Museum is the centuries-old church where one can manifest religion as an integral part of the culture of Tagbilaranos and admire the spectacular Spanish architecture. It is one of the six parishes founded in Bohol by the Jesuit missionaries in 1595. Reconstructed and enlarged around 1839-1855, it has ceiling paintings by local artists.",
    location: "Poblacion, Tagbilaran City",
    yearEstablished: "1595 (Parish) / 1839 (Rebuilt)",
    highlight: "Majestic Spanish Architecture & Ceiling Paintings",
    imageUrl: "/webp/Old%20House%20in%20Poblacion%201%20(5).webp"
  },
  {
    id: "garden-cafe",
    title: "Garden Cafe",
    category: "Heritage",
    description: "Seize the chance to take that Instagram-worthy selfie with Garden Cafe's latest feature, the tarantilla (a horse-drawn covered wagon) which served as the main mode of transportation in Tagbilaran during the Spanish Era in the 1800s. Enjoy a unique dining experience served by hearing-impaired/deaf staff who teach you a few sign language hand signals.",
    location: "Poblacion, Tagbilaran City",
    yearEstablished: "Modern Cultural Landmark",
    highlight: "Tarantilla Wagon & Deaf Sign Language Service",
    imageUrl: "/webp/Poblacion%201,%20Tagbilaran%20City%20(1)%20(1).webp"
  },
  {
    id: "reyes-house",
    title: "Reyes House",
    category: "Heritage",
    description: "This magnificent abode has been a mute witness to the secret meetings for a resistance against the American colonizers in 1900. While the women were staging a nightly novena in honor of San Roque, the second patron saint of Tagbilaran, the men were plotting their uprising against the Americans in one of the upper rooms.",
    location: "Poblacion, Tagbilaran City",
    yearEstablished: "Late 19th Century",
    highlight: "Upper-Room Secret Revolutionary Meetings site",
    imageUrl: "/webp/Old%20House%20in%20Poblacion%201%20(3).webp"
  },
  {
    id: "friendship-park-abueva",
    title: "Friendship Park",
    category: "Heritage",
    description: "Be in awe with the sculptural masterpiece of the revered Father of Modern Philippine Sculpture, Boholano National Artist Napoleon Abueva. It depicts the 1st international treaty of friendship between local Chieftain Datu Sikatuna and Spanish Captain Miguel Lopez de Legazpi in 1565.",
    location: "Barangay Bool, Tagbilaran City",
    yearEstablished: "1565 (Pact) / 1997",
    highlight: "Napoleon Abueva Bronze Masterpiece",
    imageUrl: "/webp/Poblacion%201,%20Tagbilaran%20City%20(1).webp"
  },
  {
    id: "cpg-heritage-house",
    title: "CPG Heritage House",
    category: "Heritage",
    description: "Traverse the home of former Philippine President Carlos P. Garcia (CPG). It houses a treasure trove of personal memorabilia of the late president, who was also a renowned poet, orator, lawyer, teacher, chess player, public official, and guerrilla leader, showcasing his custom handcarved chessboards.",
    location: "Poblacion, Tagbilaran City",
    yearEstablished: "Mid-20th Century",
    highlight: "Carlos P. Garcia Memorabilia & Chessboards",
    imageUrl: "/webp/Old%20House%20in%20Poblacion%201%20(7).webp"
  },
  {
    id: "balili-house-oasis-lodge",
    title: "Balili House / Oasis Lodge",
    category: "Heritage",
    description: "Built by Mr. Eladio Balili, this majestic 1930s chalet is now open for travelers and families as it becomes a lodge, the best example of adaptive re-use of a heritage structure.",
    location: "Poblacion, Tagbilaran City",
    yearEstablished: "1930s",
    highlight: "Adaptive Reuse Heritage Chalet Lodge",
    imageUrl: "/webp/Old%20House%20in%20Poblacion%201%20(3).webp"
  },
  {
    id: "capt-francisco-salazar-monument",
    title: "Capt. Francisco Salazar Monument",
    category: "Heritage",
    description: "The bas-relief artwork depicts the heroism of local patriots against the Japanese Imperial Army on October 22, 1942. Under the leadership of Capt. Francisco Salazar, Combat Head of the \"Behind the Clouds\" Bohol Guerilla Movement, some 200 volunteers engaged in one of the bloodiest ambuscades.",
    location: "Barangay Ubujan, Tagbilaran City",
    yearEstablished: "1942 (Event) / Recently Restored",
    highlight: "Behind the Clouds Guerrilla Movement Memorial",
    imageUrl: "/webp/Poblacion%201,%20Tagbilaran%20City%20(2).webp"
  },
  {
    id: "casa-rocha",
    title: "Casa Rocha",
    category: "Heritage",
    description: "One of the oldest surviving ancestral houses in Tagbilaran City located in Sitio Ubos. Casa Rocha is a classic “bahay na bato” showcasing Spanish-Filipino-Chinese architecture. Declared as an Important Cultural Property in 2019, it symbolizes Bohol’s rich trading and cultural history.",
    location: "Sitio Ubos, Tagbilaran City",
    yearEstablished: "Spanish Colonial Era",
    highlight: "Coral Stone Walls & Hardwood Interiors",
    imageUrl: "/webp/Old%20House%20in%20Poblacion%201%20(7).webp"
  },
  {
    id: "rocha-suarez-house",
    title: "Rocha-Suarez House",
    category: "Heritage",
    description: "A grand Spanish colonial-era ancestral home situated in historic Sitio Ubos. Built with sturdy timber frames resting on heavily fortified coral stone bases, it showcases traditional wooden lattice sliding panels and Capiz shell windowpanes that exemplify pre-war Visayan craftsmanship.",
    location: "Sitio Ubos, Tagbilaran City",
    yearEstablished: "Spanish Colonial Era",
    highlight: "Traditional Wood-and-Stone Architecture",
    imageUrl: "/webp/Old%20House%20in%20Poblacion%201%20(5).webp"
  },
  {
    id: "beldia-house",
    title: "Beldia House",
    category: "Heritage",
    description: "One of the remaining heritage houses in Sitio Ubos known for its preserved Filipino wood-and-stone construction. The house represents pre-war residential architecture in Bohol.",
    location: "Sitio Ubos, Tagbilaran City",
    yearEstablished: "Pre-War Era",
    highlight: "Pre-War Wood-and-Stone Construction",
    imageUrl: "/webp/Old%20House%20in%20Poblacion%201%20(3).webp"
  },
  {
    id: "dalareich-chocolate-house",
    title: "Dalareich Chocolate House",
    category: "Heritage",
    description: "A cultural tourist attraction highlighting Bohol’s first artisanal chocolate factory and cacao-growing heritage. Founded to revive local tablea making traditions, it promotes sustainable cooperative farming and lets visitors explore direct bean-to-bar processing techniques.",
    location: "Poblacion District, Tagbilaran City",
    yearEstablished: "Cultural Revival Site",
    highlight: "Bohol Cacao Farming & Tablea Crafts",
    imageUrl: "/webp/Timapay%20Crisp%20(3).webp"
  },
  {
    id: "cultural-show",
    title: "Cultural Show",
    category: "Heritage",
    description: "A live cultural presentation featuring traditional Boholano dances, music, and costumes that preserve local performing arts and traditions.",
    location: "Cultural Stage, Tagbilaran City",
    yearEstablished: "Ongoing Tradition",
    highlight: "Traditional Visayan Courtship Dances & Music",
    imageUrl: "/webp/Poblacion%201,%20Tagbilaran%20City%20(1).webp"
  }
];

export const creativeMilestones = [
  {
    year: "1565",
    title: "The Pact of Bohol",
    description: "Datu Sikatuna and Miguel López de Legazpi join hands and perform the legendary blood compact, creating a global foundation of peace and mutual friendship."
  },
  {
    year: "1724",
    title: "Heritage Foundation",
    description: "Construction of the original historical stone fortress of St. Joseph Cathedral, anchoring the city's growth around a dedicated cultural district."
  },
  {
    year: "1966",
    title: "Charter Day of Tagbilaran",
    description: "Tagbilaran officially transitions into a chartered city, solidifying its place as the administrative and economic focal point of Bohol."
  },
  {
    year: "2023",
    title: "Global Creative City Initiative",
    description: "Tagbilaran spearheads its global creative initiative in Crafts and Folk Arts, putting local clay pottery and hand weaving on the world map."
  },
  {
    year: "2026",
    title: "Digital Cultural Era",
    description: "Launching state of the art interactive digital portals and decentralized maker hubs that foster creative tech and eco tourism."
  }
];

export const tagbilaranBarangays: Barangay[] = [
  {
    name: "Barangay Bool",
    heritage: "Sandugo Pact Ground Zero",
    desc: "The monumental core of peaceful alliance, holding Napoleon Abueva's iconic bronze Blood Compact Monument. Offers magnificent cliffside overlooks of the Mindanao Sea.",
    tip: "the historic March 1565 Blood Compact Site in Bool",
    category: "Historic"
  },
  {
    name: "Barangay Booy",
    heritage: "Coastal Gateway & Faith",
    desc: "A sprawling coastal neighborhood boasting historic local chapels, pristine cliffside views, educational hubs, and the scenic active fishing communities.",
    tip: "coastal paths and suburban heritage in Booy",
    category: "Coastal"
  },
  {
    name: "Barangay Cabawan",
    heritage: "Grassland Ridges & Farms",
    desc: "The gorgeous countryside heart of the city, presenting quiet green rolling hills, rustic inland trails, and family led eco agriculture farms.",
    tip: "rural grasslands and interior eco tourism in Cabawan",
    category: "Inland"
  },
  {
    name: "Barangay Cogon",
    heritage: "High Density Civic Hub",
    desc: "Our most populated commercial nerve center. Home to Plaza Marcela, dense bustling streets, business offices, and a key transportation intersection.",
    tip: "bustling city life and commercial centers of Cogon",
    category: "Commercial"
  },
  {
    name: "Barangay Dampas",
    heritage: "Handweaving & Blade Forging",
    desc: "The undisputed capital of historic local craft, where master weavers operate handlooms and veteran metalworkers hand craft traditional Boholano blades.",
    tip: "artisan handweaving and custom blade forging in Dampas",
    category: "Historic"
  },
  {
    name: "Barangay Dao",
    heritage: "Transit & Retail Epicenter",
    desc: "Host to the massive Bohol Integrated Bus Terminal (IBT) and the sprawling Island City Mall, serving as the commercial and transport engine of the province.",
    tip: "bus terminal connections and mall shopping in Dao",
    category: "Commercial"
  },
  {
    name: "Barangay Manga",
    heritage: "Seaside Terracotta Potteries",
    desc: "Famous for preservation of wood fired clay brick ovens and pottery sheds turning out elegant terracotta jars. Features a dynamic local fish port.",
    tip: "artisan pottery making and seaside kilns in Manga",
    category: "Coastal"
  },
  {
    name: "Barangay Mansasa",
    heritage: "Overlooks & Ancient Springs",
    desc: "A gorgeous cliffside ward overlooking the Tagbilaran strait, preserving colonial era water springs and majestic panoramic sea views.",
    tip: "scenic straits and historic natural springs of Mansasa",
    category: "Coastal"
  },
  {
    name: "Barangay Poblacion I",
    heritage: "St. Joseph Cathedral Heart",
    desc: "The historic religious nucleus. Home to the towering limestone St. Joseph the Worker Cathedral, Town Plaza Rizal, and City Hall.",
    tip: "St. Joseph Cathedral and the central Plaza Rizal of Poblacion I",
    category: "Historic"
  },
  {
    name: "Barangay Poblacion II",
    heritage: "Bohol National Museum District",
    desc: "The intellectual capital, anchoring the historic old Capitol (Bohol National Museum), major university campuses, and the central financial sector.",
    tip: "Bohol National Museum and educational centers of Poblacion II",
    category: "Urban"
  },
  {
    name: "Barangay Poblacion III",
    heritage: "Historic Ferry Seaport",
    desc: "The active maritime gateway of Tagbilaran, home to the main passenger seaport and blocks of beautifully preserved Spanish colonial ancestral homes.",
    tip: "heritage walking tours and coastal ferry port in Poblacion III",
    category: "Coastal"
  },
  {
    name: "Barangay San Isidro",
    heritage: "Artisanal Clay & Eco-Gardens",
    desc: "Renowned for its abundance of natural clay deposits mined by local potters. Retains a peaceful atmosphere with family run farms.",
    tip: "clay mines and sustainable eco gardens of San Isidro",
    category: "Inland"
  },
  {
    name: "Barangay Taloto",
    heritage: "Tubig Dako Spring & Mangroves",
    desc: "Holds the clean fresh water Tubig Dako cave spring sanctuary. Borders gorgeous coastlines, serene seaside properties, and dense mangroves.",
    tip: "Tubig Dako fresh spring and eco tourism in Taloto",
    category: "Coastal"
  },
  {
    name: "Barangay Tiptip",
    heritage: "Upland Residential Growth",
    desc: "A beautiful hillside inland neighborhood experiencing steady development while retaining pristine limestone quarries and quiet rustic woodland lanes.",
    tip: "hillside trails and local suburban growth in Tiptip",
    category: "Inland"
  },
  {
    name: "Barangay Ubujan",
    heritage: "University Ridges & Battlegrounds",
    desc: "Commanding cliffside ocean views, anchoring Holy Name University campus, and preserving the historic sites of the heroic revolutionary battles.",
    tip: "university campuses and historical battlegrounds in Ubujan",
    category: "Coastal"
  }
];

