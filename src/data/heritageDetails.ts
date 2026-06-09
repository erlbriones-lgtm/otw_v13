const bcs1 = "/webp/Poblacion%201,%20Tagbilaran%20City%20(1).webp";
const bcs2 = "/webp/Poblacion%201,%20Tagbilaran%20City%20(1)%20(1).webp";
const bcs3 = "/webp/Poblacion%201,%20Tagbilaran%20City%20(2).webp";
const bcs4 = "/webp/Poblacion%201,%20Tagbilaran%20City%20(1).webp";
const bcs5 = "/webp/Poblacion%201,%20Tagbilaran%20City%20(1)%20(1).webp";
const bcs6 = "/webp/Poblacion%201,%20Tagbilaran%20City%20(2).webp";

const blades1 = "/webp/Old%20House%20in%20Poblacion%201%20(3).webp";
const blades2 = "/webp/Old%20House%20in%20Poblacion%201%20(3).webp";

const museum1 = "/webp/Poblacion%201,%20Tagbilaran%20City%20(2).webp";
const museum2 = "/webp/Old%20House%20in%20Poblacion%201%20(7).webp";

const cathedral1 = "/webp/Old%20House%20in%20Poblacion%201%20(5).webp";
const cathedral2 = "/webp/Poblacion%201,%20Tagbilaran%20City%20(2).webp";

const house1 = "/webp/Old%20House%20in%20Poblacion%201%20(3).webp";
const house2 = "/webp/Old%20House%20in%20Poblacion%201%20(5).webp";
const house3 = "/webp/Old%20House%20in%20Poblacion%201%20(7).webp";

const spring1 = "/webp/Tubig%20Dako%20in%20Taloto%20(1).webp";
const spring2 = "/webp/Taloto%20to%20Manga%20Coastline%20(1).webp";
const spring3 = "/webp/Taloto%20to%20Manga%20Coastline%20(6).webp";

export interface DetailedHeritage {
  id: string;
  title: string;
  category: string;
  district: string;
  tagline: string;
  mainImage: string;
  images: string[];
  description: string;
  longHistory: string;
  yearEstablished: string;
  facts: { label: string; value: string }[];
  heritageHighlights: string[];
  culturalGuidelines: string[];
  travelTips: string;
  coordinates: string;
}

export const detailedHeritageList: DetailedHeritage[] = [
  {
    id: "plaza-rizal-historic",
    title: "Plaza Rizal",
    category: "Heritage Park",
    district: "Downtown Landmark",
    tagline: "Get a breath of fresh air and a soothing respite at the heart of downtown Tagbilaran.",
    mainImage: "/webp/Poblacion%201,%20Tagbilaran%20City%20(1).webp",
    images: ["/webp/Poblacion%201,%20Tagbilaran%20City%20(1).webp", "/webp/Poblacion%201,%20Tagbilaran%20City%20(2).webp"],
    description: "The tour starts at the Plaza Rizal. Get a breath of fresh air and a soothing respite at the heart of downtown Tagbilaran. Plaza Rizal has become a hub for children, residents and tourists alike who delight at the sight of pigeons and the buzzing sound of a thousand city birds who find sanctuary in the green park.",
    longHistory: "Establishment of Plaza Rizal dated back to the Spanish colonial era as the central plaza in front of the St. Joseph Cathedral. Over decades, it has evolved from a historic meeting ground to a lively community park. Plaza Rizal features manicured gardens, safe concrete pathways, and historical markers, all under the shade of century-old acacia trees. It's renowned as a natural bird sanctuary in the middle of a bustling urban center.",
    yearEstablished: "Spanish Era",
    facts: [
      { label: "Location Zone", value: "Poblacion I, Tagbilaran City" },
      { label: "Key Inhabitants", value: "Pigeons and thousands of seasonal city birds" },
      { label: "Surrounding Sites", value: "St. Joseph Cathedral and National Museum" },
      { label: "Main Attractions", value: "Shady pathways, historical markers, and green benches" }
    ],
    heritageHighlights: [
      "Historic Civic Axis: Serves as the zero-kilometer point of Tagbilaran City's heritage walks.",
      "Green Bird Sanctuary: Thousands of city birds swarm the park at dawn and dusk.",
      "Plaza Respite: A tranquil social space bringing together children, elders, and global travelers alike."
    ],
    culturalGuidelines: [
      "Help keep the park pristine: Dispose of any snack wrappers and plastic water bottles in trash bins.",
      "Do not chase, scare, or capture any pigeons or birds nesting in the trees.",
      "Kindly respect shared public items such as monuments, historical markers, and seating areas."
    ],
    travelTips: "Grab a refreshing cold coconut drink from local street vendors nearby, find a shaded bench under the large acacia branches, and watch the hundreds of pigeons gather.",
    coordinates: "9.6432° N, 123.8517° E — Downtown City Plaza"
  },
  {
    id: "nm-bohol-area-museum-historic",
    title: "NM Bohol Area Museum",
    category: "Museum",
    district: "Spanish Era",
    tagline: "Discover Bohol from prehistoric times to the present in a majestic stone-and-lime landmark.",
    mainImage: "/webp/Poblacion%201,%20Tagbilaran%20City%20(2).webp",
    images: ["/webp/Poblacion%201,%20Tagbilaran%20City%20(2).webp", "/webp/Old%20House%20in%20Poblacion%201%20(3).webp"],
    description: "Discover Bohol from prehistoric times to the present at the NM Bohol Area Museum housed in the old Bohol Provincial Capitol. This building was constructed in 1860 to serve as tribunal and military quarters for the Spanish military force. The structure was built in the traditional Spanish construction of stone and lime.",
    longHistory: "Built original as a 'Casa Real' and tribunal, the old Bohol Provincial Capitol was crafted from quarried stone and lime under the guidance of Spanish engineers. After serving generations of provincial leadership, the property was turned over to the National Museum of the Philippines. Extensive restoration revived its high interior columns, arched hallways, and classic stone-clad ground level, keeping pre-colonial artifacts and heritage treasures safe.",
    yearEstablished: "1860 (Capitol) / 2018 (Museum)",
    facts: [
      { label: "Architectural Fabric", value: "Traditional Spanish stone and lime construction" },
      { label: "Historical Role", value: "Tribunal, military quarters, and provincial capitol" },
      { label: "Unique Exhibit", value: "Prehistoric archaeological recoveries and geological charts" },
      { label: "Current Guardian", value: "National Museum of the Philippines" }
    ],
    heritageHighlights: [
      "Stone-and-Lime Fortification: Solid ground structure built to resist dynamic seasonal earthquakes.",
      "Prehistoric Insights: Comprehensive deep dives into ancient Boholano pottery and burial vessels.",
      "Spanish Tribunal Heritage: High-ceilinged courtrooms converted into immersive, modern exhibition halls."
    ],
    culturalGuidelines: [
      "Please sign the guest visitor register at the museum entrance desk.",
      "Strictly no flash photography inside any exhibit galleries to protect antique paint shades.",
      "Maintain a soft, conversational tone of voice to preserve the tranquil academic environment."
    ],
    travelTips: "Visit in the morning hours to get a detailed view of the regional natural history flora displays before the midday crowds arrive.",
    coordinates: "9.6430° N, 123.8531° E — Poblacion II District"
  },
  {
    id: "cathedral-st-joseph-worker-historic",
    title: "Cathedral of St. Joseph the Worker",
    category: "Church",
    district: "Spanish Architecture",
    tagline: "A centuries-old spiritual beacon of Boholanos detailing magnificent ceiling works.",
    mainImage: "/webp/Old%20House%20in%20Poblacion%201%20(5).webp",
    images: ["/webp/Old%20House%20in%20Poblacion%201%20(5).webp", "/webp/Poblacion%201,%20Tagbilaran%20City%20(2).webp"],
    description: "Opposite the NM Bohol Area Museum is the centuries-old church where one can manifest religion as an integral part of the culture of Tagbilaranos and admire the spectacular Spanish architecture. It is one of the six parishes founded in Bohol by the Jesuit missionaries in 1595 and was turned over by the recollects in 1768. The original church built by the Jesuits on this spot was burned in 1798. It was then reconstructed and enlarged around 1839-1855. It had undergone renovations and restorations over the years and the recent additions are the paintings of local artists on the church ceilings and walls.",
    longHistory: "Following the destruction of the initial Jesuit-built structure during a devastating fire in 1798, recursive efforts by Augustinian Recollect builders saw its restoration between 1839 and 1855, employing durable coral limestone blocks. Over successive years, the cathedral evolved continuously, integrating beautiful modern paintwork on its expansive ceiling. These murals were crafted meticulously by local master artists, visually presenting Biblical scenarios and historical religious chronicles.",
    yearEstablished: "1595 (Founded) / 1839-1855 (Rebuilt)",
    facts: [
      { label: "Missionary Origin", value: "Jesuit Missionaries in 1595, passing to Recollects" },
      { label: "Ceiling Murals", value: "Hand-painted religious panels by talented local artists" },
      { label: "Architectural Form", value: "Grand Spanish stone masonry and towering bell arches" },
      { label: "Historic Milestone", value: "Reconstructed and expanded after the great 1798 fire" }
    ],
    heritageHighlights: [
      "Ceiling Masterpieces: Stunning decorative panels demonstrating the rich colors of local spiritual art.",
      "Jesuit Heritage Core: Among the foundational set of historic stone parishes in the entire province of Bohol.",
      "Stone Fortress Aspect: Reinforced solid coral stones protecting the city's parish records for centuries."
    ],
    culturalGuidelines: [
      "Dressing appropriately is required; avoid crop tops, sleeveless shirts, or extremely short trousers.",
      "Remove wide sun hats and sunglasses upon entering the historical nave.",
      "No food, drinks, or pet animals are allowed within the church interior corridor."
    ],
    travelTips: "Walk up slowly to the main altar to appreciate the detailed gold gilding of the central 'retablo' screen, best illuminated under morning lights.",
    coordinates: "9.6433° N, 123.8519° E — Plaza Rizal Boundary"
  },
  {
    id: "garden-cafe",
    title: "Garden Cafe",
    category: "Cultural Cafe",
    district: "Spanish Era",
    tagline: "A unique restaurant serving excellent food and supporting the local deaf community.",
    mainImage: "/webp/Poblacion%201,%20Tagbilaran%20City%20(2).webp",
    images: ["/webp/Poblacion%201,%20Tagbilaran%20City%20(2).webp", "/webp/Old%20House%20in%20Poblacion%201%20(3).webp"],
    description: "Seize the chance to take that Instagram-worthy selfie with Garden Cafe's latest feature, the tarantilla (a horse-drawn covered wagon) which served as the main mode of transportation in Tagbilaran during the Spanish Era in the 1800s. Munch on one of the best-selling items on their menu while you enjoy a unique dining experience being served by hearing-impaired/deaf staff. You may learn a few sign language as the menu includes hand signals to aid customers.",
    longHistory: "Founded as a civic social enterprise, the Garden Cafe not only offers a wonderful, ambient garden dining space but also integrates inclusive work practices. It provides meaningful employment to highly capable hearing-impaired and deaf youth from Tagbilaran. The eatery showcases vintage local artifacts, and is centered around an authentic, beautifully reconstructed 'tarantilla' wagon from the Spanish colonial century, offering customers both physical history and heartwarming social impact.",
    yearEstablished: "Modern Cultural Landmark",
    facts: [
      { label: "Main Feature", value: "Tarantilla (Authentic Spanish-Era horse-drawn wagon)" },
      { label: "Inclusion Model", value: "Fully run and served by trained deaf and hearing-impaired staff" },
      { label: "Menu Guide", value: "Includes hand signals to enable fast customer communication" },
      { label: "Vibe Concept", value: "A lush, leafy garden escape full of antique local trivia" }
    ],
    heritageHighlights: [
      "The Tarantilla Wagon: Pose next to the prime colonial mode of neighborhood transit.",
      "Inclusive Social Harmony: Experience wonderful service using simple, friendly sign-language exchanges.",
      "Culinary Excellence: Savor highly rated local dishes while supporting cooperative social initiatives."
    ],
    culturalGuidelines: [
      "Adopt a friendly, supportive posture: Use the illustrated menu signs to complete your order.",
      "To get a waiter's attention, gently raise your hand or offer a polite friendly wave.",
      "Please respect the dignity and highly professional workspace of the hearing-impaired crew."
    ],
    travelTips: "Be sure to try their native cacao drink or local cakes. The menu showcases step-by-step hand gestures so you can learn simple phrases like 'Thank you' in sign language!",
    coordinates: "9.6425° N, 123.8510° E — Town Center"
  },
  {
    id: "reyes-house",
    title: "Reyes House",
    category: "Ancestral House",
    district: "Revolution History",
    tagline: "A silent witness to the secret strategies of Boholano revolutionary leaders in 1900.",
    mainImage: "/webp/Old%20House%20in%20Poblacion%201%20(3).webp",
    images: ["/webp/Old%20House%20in%20Poblacion%201%20(3).webp", "/webp/Old%20House%20in%20Poblacion%201%20(5).webp"],
    description: "This magnificent abode has been a mute witness to the secret meetings for a resistance against the American colonizers in 1900. While the women were staging a nightly novena in honor of San Roque, the second patron saint of Tagbilaran, the men were plotting their uprising against the Americans in one of the upper rooms. The Boholanos eventually succumbed to American power with their inevitable surrender in December 1901.",
    longHistory: "During the Philippine-American War in 1900, the Reyes House became the clandestine headquarters of the Boholano local resistance movement. To deflect the attention of roving soldiers, the brave women of the household gathered downstairs to conduct vocal novena prayers dedicated to San Roque. Meanwhile, in the upper wooden salon, the local revolutionary leaders finalized strategic combat plans to push back the American army.",
    yearEstablished: "Late 19th Century",
    facts: [
      { label: "Historic Role", value: "Clandestine meetings of the Boholano anti-colonial resistance" },
      { label: "Deception Strategy", value: "Downstairs vocal novena prayers as a military cover-up" },
      { label: "Key Milestone", value: "A principal heritage icon of the 1900-1901 Boholano conflict" },
      { label: "Structural Layout", value: "A grand wooden ancestral masterwork with spacious high salons" }
    ],
    heritageHighlights: [
      "The Sacred Cover: Learn the heroic strategy of the women protecting the upstairs patriots.",
      "Elite Boholano Design: Solid timber framing with large room setups reflecting late-Spanish-era residential forms.",
      "The Echoes of 1900: A preserved interior harboring the patriotic spirit of the early Boholanos."
    ],
    culturalGuidelines: [
      "This property remains a highly respected historical memorial: Maintain clean behavior.",
      "Do not touch or lean on any fragile wood doors, antique frames, or old window lattices.",
      "Remember to speak soft, respectful tones inside the old meeting parlor."
    ],
    travelTips: "Look upward in the high dining paneling to notice the well-placed vents. These allowed messages to be whispered quietly down from the secret rooms down to the trusted family members below.",
    coordinates: "9.6415° N, 123.8509° E — Poblacion District"
  },
  {
    id: "friendship-park-abueva",
    title: "Friendship Park",
    category: "Monument",
    district: "Historical Treaty",
    tagline: "Home of Napoleon Abueva's supreme sculptural masterpiece honoring national friendship.",
    mainImage: "/webp/Blood%20Compact%20Shrine%20(28).webp",
    images: ["/webp/Blood%20Compact%20Shrine%20(28).webp", "/webp/Blood%20Compact%20Shrine%20(2).webp", "/webp/Blood%20Compact%20Shrine%20(31).webp"],
    description: "Be in awe with the sculptural masterpiece of the revered Father of Modern Philippine Sculpture, Boholano National Artist Napoleon Abueva. It depicts the 1st international treaty of friendship between local Chieftain Datu Sikatuna and Spanish Captain Miguel Lopez de Legazpi in 1565. The monument welcomes you to the flourishing Bohol Friendship Park.",
    longHistory: "The Bohol Friendship Park centrates on the immortal bronze sculpture crafted by the 'Father of Modern Philippine Sculpture', Napoleon Abueva. It marks the blood-compact pact ('Sandugo') sworn on March 16, 1565, by Datu Sikatuna, Chieftain of Bohol, and Miguel Lopez de Legazpi, General of the Spanish expedition. The dramatic life-sized composition shows the figures drinking the blood-infused wine cup, signifying a historic first in formal international diplomacy in the region.",
    yearEstablished: "1565 (Pact) / 1997 (Sculpture Group)",
    facts: [
      { label: "Sculptor Icon", value: "Napoleon Abueva (Bohol-born National Artist)" },
      { label: "Historical Event", value: "Sandugo (First treaty of global friendship in the country)" },
      { label: "Site Coordinates", value: "Facing the spectacular open sea of the Bohol Strait" },
      { label: "Cultural Facility", value: "Flourishing landscaping, public gardens, and visitor amphitheaters" }
    ],
    heritageHighlights: [
      "Abueva Bronze: Five dynamic, authentic bronze figures composed around a central wooden trading table.",
      "Friendship Hub: Serves as a national beacon of Visayan hospitality and global cross-cultural goodwill.",
      "Waterfront Promenades: Lush walking gardens lined with local greenery, perfect for coastal strolls."
    ],
    culturalGuidelines: [
      "Climbing on the stone base or the bronze figures is strictly forbidden.",
      "Always dispose of plastic garbage and food leftovers in the official waste bins.",
      "Be professional and polite to the local community members maintaining the public gardens."
    ],
    travelTips: "The park has been beautifully enhanced with seaside walking tracks. Perfect for catching the refreshing sea breezes and taking panoramic photos of the coastal horizon.",
    coordinates: "9.6204° N, 123.8742° E — Barangay Bool Sea Road"
  },
  {
    id: "cpg-heritage-house",
    title: "CPG Heritage House",
    category: "Presidential Heritage",
    district: "Museum",
    tagline: "Explore the intimate home, personal items, and chessboards of President Carlos P. Garcia.",
    mainImage: "/webp/Balili%20Heritage%20House%20(4).webp",
    images: ["/webp/Balili%20Heritage%20House%20(4).webp", "/webp/Old%20House%20in%20Poblacion%201%20(3).webp"],
    description: "Traverse the home of former Philippine President Carlos P. Garcia (CPG). It houses a treasure trove of personal memorabilia of the late president, who was also a renowned poet, orator, lawyer, teacher, chess player, public official, and guerrilla leader. It also features carved chessboards evident of the late president's ardent interest in the game.",
    longHistory: "The CPG Heritage House is the personal estate of the 8th President of the Philippines, Carlos P. Garcia. Serving as a physical museum, the two-story residence exhibits his presidential desk, historic correspondences, traditional clothing, and personal library. Known for his keen intellect and championship chess matches, the mansion displays his custom hand-carved chessboards, representing a deep view into the lifestyle of this brilliant Boholano statesman.",
    yearEstablished: "Mid-20th Century",
    facts: [
      { label: "Honored Figure", value: "Carlos P. Garcia (8th President of the Philippines)" },
      { label: "Key Collectibles", value: "Presidential memorabilia, formal wear, and library archives" },
      { label: "Presidential Hobby", value: "Hand-carved wooden chess boards and tournament pieces" },
      { label: "Other Vocations", value: "Guerrilla leader, acclaimed Visayan poet, master orator" }
    ],
    heritageHighlights: [
      "Orator's Archive: Hand-written poetry manuscript scraps reflecting his love for Visayan literature.",
      "State Desks: The original workspaces from which major post-war economic policies were drafted.",
      "Presidential Chess Sets: Beautifully crafted boards used by CPG during his historic chess matches."
    ],
    culturalGuidelines: [
      "Writing inside the visitor's book at the front lobby is highly encouraged.",
      "Do not touch any paper documents, pens, or chessboards on display.",
      "Filming with tripods or advanced lighting requires booking with the municipal tourism board first."
    ],
    travelTips: "Be sure to look at his collection of chess trophies. President Garcia was a highly active strategist, often challenging visiting world ambassadors to friendly matches.",
    coordinates: "9.6428° N, 123.8521° E — Central Poblacion District"
  },
  {
    id: "balili-house-oasis-lodge",
    title: "Balili House / Oasis Lodge",
    category: "Heritage Lodge",
    district: "Chalet",
    tagline: "A majestic 1930s chalet masterfully preserved through adaptive civic re-use.",
    mainImage: "/webp/Old%20House%20in%20Poblacion%201%20(7).webp",
    images: ["/webp/Old%20House%20in%20Poblacion%201%20(7).webp", "/webp/Balili%20Heritage%20House%20(4).webp"],
    description: "Built by Mr. Eladio Balili, this majestic 1930s chalet is now open for travelers and families as it becomes a lodge, the best example of adaptive re-use of a heritage structure.",
    longHistory: "Erected in the decade of the 1930s by Mr. Eladio Balili, this architectural gem features a high-gabled chalet form with American-colonial-era layout guidelines. To guarantee its structural preservation across modern decades, the mansion underwent a successful transformation into a boutique heritage lodge. This adaptive re-use model allows guests to actively sleep inside living history, keeping local craftsmanship alive.",
    yearEstablished: "1930s",
    facts: [
      { label: "Original Builder", value: "Mr. Eladio Balili (Prominent local resident)" },
      { label: "Structural Type", value: "1930s Wooden Chalet with high-gabled roof lines" },
      { label: "Adaptive Model", value: "Active tourist heritage lodge and community oasis" },
      { label: "Interior Features", value: "Spacious wooden bedrooms, vintage framing, and wrap-around verandas" }
    ],
    heritageHighlights: [
      "Living History: Travelers can book accommodations and actively sleep inside standard 1930s quarters.",
      "Adaptive Mastery: Highlights how historic architecture can be financially self-sustaining without demolition.",
      "Chalet Splendor: Generous, airy window designs keeping the entire building naturally cool."
    ],
    culturalGuidelines: [
      "Inquire politely at the lobby desk if you wish to take photos of the interior salons.",
      "Avoid shouting or making loud noises to maintain a comfortable stay for overnight lodge patrons.",
      "Treat all antique furnishings, timber doors, and structural wood with proper physical care."
    ],
    travelTips: "The wrap-around timber veranda on the second floor is a fabulous spot to read. It captures cool sea breezes from the nearby port district.",
    coordinates: "9.6418° N, 123.8502° E — Poblacion I Heritage Zone"
  },
  {
    id: "capt-francisco-salazar-monument",
    title: "Capt. Francisco Salazar Monument",
    category: "World War II",
    district: "Monument",
    tagline: "The bas-relief shrine honoring the heroism of the 'Behind the Clouds' resistance volunteers.",
    mainImage: "/webp/Poblacion%201,%20Tagbilaran%20City%20(2).webp",
    images: ["/webp/Poblacion%201,%20Tagbilaran%20City%20(2).webp", "/webp/Poblacion%201,%20Tagbilaran%20City%20(1).webp"],
    description: "Engage in an unforgettable experience with a visit to a World War II historical site in Barangay Ubujan, recently restored and enhanced under the City Government. The bas-relief artwork depicts the heroism of local patriots who paid the ultimate price for the freedom and sovereignty of the Filipino people against the Japanese Imperial Army on October 22, 1942. Under the leadership of Capt. Francisco Salazar, Combat Head of the \"Behind the Clouds\" Bohol Guerilla Movement, some 200 volunteers were engaged in one of the bloodiest ambuscades in Bohol against the much superior Japanese Imperial Army.",
    longHistory: "On October 22, 1942, a small but fiercely determined group of Boholano guerrilla fighters, numbering around 200 volunteers under the courageous leadership of Capt. Francisco Salazar, staged a brave ambush against a significantly larger, better-equipped Japanese force in Barangay Ubujan. Operating as the Combat Head of the 'Behind the Clouds' Bohol Guerrilla Movement, Salazar and his troops fought valiantly to defend their homeland. The site features a meticulously detailed bas-relief monument, recently restored by the City Government to honor their supreme historical sacrifice.",
    yearEstablished: "1942 (Event) / Recently Enhanced Shrine",
    facts: [
      { label: "Commanding Officer", value: "Capt. Francisco Salazar (Combat Head of Guerrilla movement)" },
      { label: "Guerrilla Unit", value: "'Behind the Clouds' Bohol Guerrilla Resistance Forces" },
      { label: "Historical Event", value: "The fierce and bloody Battle of Ubujan (October 22, 1942)" },
      { label: "Memorial Form", value: "Scenic bas-relief bronze-finish monument with commemorative wall" }
    ],
    heritageHighlights: [
      "The Bas-Relief Panel: Richly detailed physical figures portraying the raw courage of the guerrilla volunteers.",
      "The Ubujan Battle Site: Standing on the actual location where the historic 1942 ambuscade occurred.",
      "Behind the Clouds Tribute: Honors the legendary clandestine mountain resistance movement of Bohol."
    ],
    culturalGuidelines: [
      "Please maintain a sober, respectful demeanor at this sacred World War II memorial.",
      "Absolutely no vandalism, chalking, or marking on the bas-relief or stone pillars.",
      "Help keep the historical site clean by taking away your personal waste items."
    ],
    travelTips: "Read the historical plaques on the sides of the stone monument carefully. The details offer a gripping, hour-by-hour account of the historic tactical ambush.",
    coordinates: "9.6548° N, 123.8615° E — Barangay Ubujan Memorial Shrine"
  },
  {
    id: "casa-rocha",
    title: "Casa Rocha",
    category: "Heritage House",
    district: "Sitio Ubos",
    tagline: "One of the oldest surviving ancestral houses in Tagbilaran City representing Boholano-Spanish-Chinese styles.",
    mainImage: house1,
    images: [house1, house2, house3],
    description: "One of the oldest surviving ancestral houses in Tagbilaran City located in Sitio Ubos. Casa Rocha is a classic “bahay na bato” showcasing Spanish-Filipino-Chinese architecture. Declared as an Important Cultural Property in 2019, it symbolizes Bohol’s rich trading and cultural history.",
    longHistory: "Fondly recognized as the “Balay na Tisa” because of its historic clay-tiled roof, Casa Rocha stands as a spectacular structural classic. Built during the Spanish colonial epoch using a layout of post-and-beam timbers seated on solid quarried coral stone, the house served as a trade central because of its closeness to the seaside. It showcases traditional wooden lattices and wide sliding sash panels for natural cooling.",
    yearEstablished: "1800s (Declared Important Cultural Property in 2019)",
    facts: [
      { label: "Location Zone", value: "Sitio Ubos, Tagbilaran City, Bohol" },
      { label: "Aka Name", value: "Balay na Tisa" },
      { label: "Primary Material", value: "Coral Stone Base and Hardwood Walls" },
      { label: "Aesthetic Era", value: "Spanish-Filipino-Chinese Bahay na Bato" }
    ],
    heritageHighlights: [
      "Coral Masonry: Massive hand-cut coral blocks lining the entire ground-floor storage zone.",
      "Capiz Sliders: Sliding wooden frames fitted with historic translucent Capiz shells.",
      "Bohol Trade Beacon: Located strategically near the seafront to facilitate early maritime merchant exchange."
    ],
    culturalGuidelines: [
      "Remove dirty outdoor shoes or use designated slippers at the entrance if requested.",
      "Avoid climbing or leaning on fragile antique wooden staircases or balcony balustrades.",
      "Ask permission from the resident keepers prior to taking close-up photos of family heirlooms."
    ],
    travelTips: "Best visited as part of the Sitio Ubos Heritage walking itinerary. Look out for the fine joinery detail beneath the overhanging hardwood eaves.",
    coordinates: "9.6420° N, 123.8504° E — Sitio Ubos Heritage Trail"
  },
  {
    id: "rocha-suarez-house",
    title: "Rocha-Suarez House",
    category: "Ancestral House",
    district: "Sitio Ubos",
    tagline: "A grand Spanish colonial-era ancestral home reflecting traditional Visayan craftsmanship.",
    mainImage: house2,
    images: [house2, house3, house1],
    description: "A grand Spanish colonial-era ancestral home situated in historic Sitio Ubos. Built with sturdy timber frames resting on heavily fortified coral stone bases, it showcases traditional wooden lattice sliding panels and Capiz shell windowpanes that exemplify pre-war Visayan craftsmanship.",
    longHistory: "The Rocha-Suarez House is a beloved ancestral sanctuary in Sitio Ubos that preserves the essence of early Tagbilaran lifestyle during the Spanish colonial epoch. Built with premium native hardwoods like Molave and Narra, its traditional wood-and-stone build (bahay na bato) stands as a monument to regional residential history. Its wide window eaves and Capiz window grilles exemplify sustainable design principles and natural environmental cooling.",
    yearEstablished: "Spanish Colonial Era",
    facts: [
      { label: "Joinery Woods", value: "Narra, Molave, and Antique Yakal Hardwoods" },
      { label: "Architect Style", value: "Filipino-Spanish Residential High-Society" },
      { label: "District Zone", value: "Sitio Ubos Heritage Core Site" },
      { label: "Integration", value: "Beautifully preserved interior design and timber paneling" }
    ],
    heritageHighlights: [
      "Preserved Antique Wood: Traditional frame construction using heavy, pest-resistant timber.",
      "Craftsmanship: Highlights how elite Visayan families blended European decor with tropical utility.",
      "Ubos Zone Gem: A highly photographed and celebrated landmark of Sitio Ubos architectural walks."
    ],
    culturalGuidelines: [
      "Walk gently across the ancient hardwood planks to avoid scratching the historical floors.",
      "Quiet voices are requested inside the corridors to respect the preserving atmosphere.",
      "No littering or chewing gum is allowed within any parts of the old wooden house rooms."
    ],
    travelTips: "Admire the delicate, beautifully shaped wooden 'calado' panels near the ceilings that allow cooling breezes to flow freely through the home.",
    coordinates: "9.6416° N, 123.8508° E — Sitio Ubos District"
  },
  {
    id: "beldia-house",
    title: "Beldia House",
    category: "Historic House",
    district: "Sitio Ubos",
    tagline: "A resilient pre-war residence showcase of traditional Filipino wood-and-stone building techniques.",
    mainImage: house3,
    images: [house3, house1, house2],
    description: "One of the remaining heritage houses in Sitio Ubos known for its preserved Filipino wood-and-stone construction. The house represents pre-war residential architecture in Bohol.",
    longHistory: "Withstanding the transitions of the pre-war American period and WWII, the Beldia House stands as an authentic model of defensive residential layout. It uses traditional post-and-beam framing that sits on heavy stone pads on the lower level, protecting the house from both seasonal flooding and seismic movements common in the Visayas region.",
    yearEstablished: "Pre-War Era",
    facts: [
      { label: "Structural Type", value: "Traditional Bahay na Bato with Stone foundation" },
      { label: "Primary Use", value: "Historic pre-war family residential quarters" },
      { label: "Heritage Status", value: "Priceless piece of early Boholano wood construction" },
      { label: "Key Material", value: "Visayan stone cladding and solid pest-tempered lumber" }
    ],
    heritageHighlights: [
      "Pre-War Resiliency: One of the few residential models to survive major conflicts completely intact.",
      "Wood-and-Stone Synthesis: Beautifully demonstrates how early workers mastered dual-material assemblies.",
      "Ubos Walk Landmark: Visually marks the historic progression of residential shelter designs."
    ],
    culturalGuidelines: [
      "Ensure you stick strictly to designated viewing paths during checking.",
      "Never lean weight against old wooden window frames, partitions, or furniture.",
      "Help maintain this piece of history by disposing of trash strictly in municipal bin receptacles."
    ],
    travelTips: "Look for the iron ring brackets on the lower stone pillars; in historic days, these other-use brackets were used to tether horses and carriage rigs.",
    coordinates: "9.6421° N, 123.8502° E — Sitio Ubos Trail"
  },
  {
    id: "dalareich-chocolate-house",
    title: "Dalareich Chocolate House",
    category: "Chocolate Heritage",
    district: "Poblacion District",
    tagline: "Tracing centuries of local cacao planting and artisan bean-to-cup tablea traditions.",
    mainImage: museum2,
    images: [museum2, museum1, cathedral2],
    description: "A cultural tourist attraction highlighting Bohol’s first artisanal chocolate factory and cacao-growing heritage. Founded to revive local tablea making traditions, it promotes sustainable cooperative farming and lets visitors explore direct bean-to-bar processing techniques.",
    longHistory: "The Dalareich Chocolate House of Tagbilaran stands as an active, sensory tribute to Bohol's cacao-farming lineage. Since colonial times, Boholano family farms have grown premium cacao varieties. Founded by the Polot family, this beloved facility processes cacao on-site, producing award-winning artisanal chocolates and traditional tablea. It serves as an educational center supporting sustainable cooperative cacao agriculture across the province of Bohol.",
    yearEstablished: "Cultural Revival Site",
    facts: [
      { label: "Core Heritage", value: "Artisanal Tablea and cacao processing craftsmanship" },
      { label: "Rural Support", value: "Directly partners with Boholano cacao farming families" },
      { label: "Activity Options", value: "Live cocoa bean roasting and tablea-pressing showcases" },
      { label: "Local Pairing", value: "Sikwate hot drinks with traditional sticky-rice snacks" }
    ],
    heritageHighlights: [
      "Traditional Roasting: Watch direct roasting using authentic local clay pots.",
      "Organic Cacao Focus: Promotes ecological and non-chemical farming methods.",
      "Interactive Learning: Tourists gain deep perspectives on the historic roles of cacao."
    ],
    culturalGuidelines: [
      "Do not touch any hot roasting clay pans, grinding tools, or steel machinery pieces.",
      "Avoid handling raw cocoa bean displays directly to keep materials sterile.",
      "Please listen attentively to the workshop guides during processing demonstrations."
    ],
    travelTips: "Participate in a custom tablea molding class. You get to press your own pure chocolate disc into shape to take home as a high-value, authentic souvenir.",
    coordinates: "9.6436° N, 123.8524° E — Central District"
  },
  {
    id: "cultural-show",
    title: "Cultural Show",
    category: "Cultural Performance",
    district: "Saulog Stage",
    tagline: "An elegant, high-energy live presentation of historical folk choreography and song.",
    mainImage: bcs1,
    images: [bcs1, bcs2, bcs3],
    description: "A live cultural presentation featuring traditional Boholano dances, music, and costumes that preserve local performing arts and traditions.",
    longHistory: "Coordinated in the heart of Tagbilaran's cultural theater circle, the Cultural Show acts as a living portal of Visayan pageantry. Performers wear traditional handloom-woven dresses, using expressive choreography to retell ancient stories. Featuring live musical accompaniment from native string orchestras, the showcase keeps historic art forms vibrant indeed.",
    yearEstablished: "Annual Presentation Cycle",
    facts: [
      { label: "Dance Styles", value: "Kuradang, Tinikling, and traditional sacred pageantry" },
      { label: "Live Ensemble", value: "Classic Boholano string rondallas and native percussion" },
      { label: "Costume fiber", value: "Handwoven local Abaca, Piña, and cotton textiles" },
      { label: "Community", value: "Youth-led preservation groups under city mentoring" }
    ],
    heritageHighlights: [
      "Kuradang Showcase: Learn the fast rhythmic courtship movements of our ancestral dance.",
      "Live Rondalla Music: Upbeat melodies produced entirely on authentic handmade stringed lutes.",
      "Storytelling Medium: Creative historical scenarios expressed through elegant drama."
    ],
    culturalGuidelines: [
      "Refrain from taking flash photography during dynamic acts to ensure dancer safety.",
      "Kindly keep aisles and stage entrance margins clear the whole time.",
      "Stand and express appreciation with warm, polite applause at the finale."
    ],
    travelTips: "Be sure to double-check the performance schedules with local tourism booths beforehand. Shows are extremely popular, particularly during the Saulog festival months.",
    coordinates: "9.6439° N, 123.8512° E — Cultural Assembly Center"
  }
];
