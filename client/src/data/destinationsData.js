// Comprehensive destinations data for Blackforest Holidays
// Matches exact content, online images, tabs, and flip-cards from blackforestholidays.com

export const allDestinationsData = {
  africa: {
    name: 'Africa',
    slug: 'africa',
    heroImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1920&q=80',
    tagline: 'Untamed Wilderness & Safaris',
    statsHeading: 'Escape to extraordinary wild frontiers',
    statsDesc: 'From untamed savannahs to secluded coastal lagoons, discover safari journeys designed around you.',
    intro: {
      title: "Luxury Escapes Across Africa's Untamed Wonders",
      description: "Discover the diverse beauty of Africa with the best travel agency for Africa, where every destination offers a unique story waiting to be explored. From the vibrant cities and scenic coastlines of South Africa to the iconic wildlife safaris of Kenya and Tanzania, experience nature in its purest form. Step into history in Egypt’s ancient wonders, wander through Morocco’s colorful souks, or unwind in the tropical paradise of Mauritius and Seychelles. Explore the dramatic landscapes of Namibia, the rich wildlife of Botswana, the serene hills of Rwanda, and the majestic Victoria Falls in Zimbabwe. With expertly crafted journeys and personalized experiences, the best travel agency for Africa helps you discover the perfect blend of adventure, culture, and luxury like nowhere else.",
      img1: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80',
      img2: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1000&q=80'
    },
    tabs: {
      tab1: {
        label: 'Why Blackforest Holidays?',
        subtitle: 'Every Journey Feels Legendary',
        title: 'Where Wild Safaris Meet Luxury Retreats',
        description: 'At Black Forest Holidays, we go beyond just planning trips — we create unforgettable travel experiences. With personalized itineraries, expert guidance, and end-to-end travel services, we ensure every journey is seamless, exciting, and tailored to your needs. Backed by a passionate team and a strong network, we deliver trusted, value-driven holidays across India and the world.',
        image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80'
      },
      tab2: {
        label: 'Destinations',
        subtitle: 'Our Curated Footprint',
        title: 'Island Blues to Mountain Views : Your Next Dream Escape',
        items: [
          { name: 'South Africa', desc: 'A blend of vibrant cities, scenic coastlines, and wildlife safaris. Cape Town, Garden Route, and Big Five adventures.' },
          { name: 'Kenya', desc: 'Home to iconic safaris and the Great Migration spectacle. Maasai Mara, rich culture, and vast savannahs.' },
          { name: 'Tanzania', desc: 'Wild landscapes with Serengeti safaris and Mount Kilimanjaro. Zanzibar’s beaches and untamed natural beauty.' },
          { name: 'Egypt', desc: 'Ancient wonders, pyramids, and timeless Nile River journeys. A destination rich in history, culture, and architectural marvels.' },
          { name: 'Morocco', desc: 'Colorful souks, desert dunes, and stunning architecture. Marrakech, Sahara, and coastal charm.' },
          { name: 'Mauritius', desc: 'A tropical paradise with white-sand beaches and luxury resorts. Perfect for relaxation and island escapes.' },
          { name: 'Seychelles', desc: 'Pristine beaches, turquoise waters, and granite rock formations. An exclusive luxury getaway.' },
          { name: 'Namibia', desc: 'Dramatic deserts, dunes, and unique wildlife landscapes. Sossusvlei, Etosha, and surreal natural beauty.' },
          { name: 'Botswana', desc: 'Untouched wilderness and premium safari experiences. Okavango Delta and rich wildlife encounters.' }
        ],
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80'
      },
      tab3: {
        label: 'Highlights',
        subtitle: 'Signature Experiences',
        title: 'Unforgettable Highlights',
        highlights: [
          '1. Cape Town views, Garden Route drives & Big Five safaris',
          '2. Maasai Mara wildlife & the Great Migration spectacle',
          '3. Serengeti safaris, Kilimanjaro peaks & Zanzibar beaches',
          '4. Pyramids, Nile cruises & ancient wonders',
          '5. White-sand beaches & luxury island resorts',
          '6. Okavango Delta & untouched safari experiences',
          '7. Gorilla trekking & lush green landscapes'
        ],
        image: 'https://images.unsplash.com/photo-1547471080-7fc2caa7f5a6?auto=format&fit=crop&w=1200&q=80'
      }
    },
    countries: [
      { name: 'South Africa', image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80', desc: 'Cape Town & Kruger Safaris' },
      { name: 'Kenya', image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80', desc: 'Maasai Mara & Great Migration' },
      { name: 'Tanzania', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80', desc: 'Serengeti & Zanzibar Sands' },
      { name: 'Egypt', image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=800&q=80', desc: 'Pyramids of Giza & Nile Cruises' },
      { name: 'Morocco', image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=800&q=80', desc: 'Marrakech Souks & Sahara Dunes' },
      { name: 'Mauritius', image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=800&q=80', desc: 'Tropical Luxury & Coral Reefs' },
      { name: 'Seychelles', image: 'https://images.unsplash.com/photo-1589979481223-deb893043163?auto=format&fit=crop&w=800&q=80', desc: 'Turquoise Waters & Granite Atolls' },
      { name: 'Namibia', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80', desc: 'Sossusvlei Dunes & Etosha' },
      { name: 'Botswana', image: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80', desc: 'Okavango Delta Wilderness' },
      { name: 'Rwanda', image: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=800&q=80', desc: 'Mountain Gorilla Trekking' },
      { name: 'Victoria Falls', image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=800&q=80', desc: 'The Smoke That Thunders' }
    ]
  },

  america: {
    name: 'America',
    slug: 'america',
    heroImage: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1920&q=80',
    tagline: 'From Coast to Coast',
    statsHeading: 'Escape to extraordinary landscapes',
    statsDesc: 'From vibrant iconic skylines to snow-capped Rockies and Caribbean shores, discover journeys designed around you.',
    intro: {
      title: 'From City Lights To Tropical Nights: Explore The Americas',
      description: 'From the soaring skyline of New York to the pristine wilderness of Banff and the sun-drenched beaches of Rio and Cancun. Black Forest Holidays curates peerless journeys across North and South America, blending iconic urban luxury with unforgettable natural spectacles.',
      img1: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80',
      img2: 'https://images.unsplash.com/photo-1506146332389-18140dc7b2fb?auto=format&fit=crop&w=800&q=80'
    },
    tabs: {
      tab1: {
        label: 'Why Blackforest Holidays?',
        subtitle: 'Every Journey Feels Legendary',
        title: 'Where Adventure Meets Paradise',
        description: 'At Black Forest Holidays, we go beyond just planning trips — we create unforgettable travel experiences. With personalized itineraries, expert guidance, and end-to-end travel services, we ensure every journey is seamless, exciting, and tailored to your needs.',
        image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=1200&q=80'
      },
      tab2: {
        label: 'Destinations',
        subtitle: 'Pan-American Escapes',
        title: 'Sun, Sea & Stunning Escapes Across the Pacific',
        items: [
          { name: 'United States', desc: 'A mix of iconic cities, national parks, and diverse landscapes. Experience New York, California, and breathtaking road trips.' },
          { name: 'Canada', desc: 'Vast wilderness, mountains, and scenic natural beauty. Explore Banff, Niagara Falls, and vibrant multicultural cities.' },
          { name: 'Mexico', desc: 'Rich heritage, beaches, and colorful traditions. Discover Cancun, Mayan ruins, and lively culture.' },
          { name: 'Brazil', desc: 'A vibrant blend of beaches, rainforests, and city life. Experience Rio, Amazon adventures, and Carnival energy.' },
          { name: 'Argentina', desc: 'European charm meets stunning natural landscapes. Explore Buenos Aires, Patagonia, and wine regions.' },
          { name: 'Peru', desc: 'Ancient history set against dramatic mountain scenery. Visit Machu Picchu and experience rich Incan culture.' }
        ],
        image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=1200&q=80'
      },
      tab3: {
        label: 'Highlights',
        subtitle: 'Signature Experiences',
        title: 'Americas Highlights',
        highlights: [
          '1. Iconic cities, national parks & diverse landscapes',
          '2. Mountains, lakes & breathtaking Canadian wilderness',
          '3. Rio vibes, Amazon rainforest & Carnival energy',
          '4. Atacama Desert to Patagonia extremes',
          '5. Turquoise waters & luxury Caribbean escapes',
          '6. Punta Cana beaches & Caribbean charm',
          '7. Machu Picchu sunrise & Incan heritage'
        ],
        image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1200&q=80'
      }
    },
    countries: [
      { name: 'United States', image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80', desc: 'New York, California & Grand Canyon' },
      { name: 'Canada', image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=800&q=80', desc: 'Banff, Rocky Mountains & Niagara' },
      { name: 'Mexico', image: 'https://images.unsplash.com/photo-1518638150340-f706e86654de?auto=format&fit=crop&w=800&q=80', desc: 'Cancun, Riviera Maya & Oaxaca' },
      { name: 'Brazil', image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=800&q=80', desc: 'Rio de Janeiro & Amazon Basin' },
      { name: 'Chile', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80', desc: 'Atacama Desert & Torres del Paine' },
      { name: 'Bahamas', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80', desc: 'Crystal Lagoons & Exuma Cays' },
      { name: 'Dominican Republic', image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=800&q=80', desc: 'Punta Cana Luxury Coast' },
      { name: 'Jamaica', image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=800&q=80', desc: 'Montego Bay & Caribbean Rhythm' },
      { name: 'Peru', image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=80', desc: 'Machu Picchu & Cusco Valley' },
      { name: 'Argentina', image: 'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?auto=format&fit=crop&w=800&q=80', desc: 'Buenos Aires & Patagonia Glaciers' }
    ]
  },

  'asian-countries': {
    name: 'Asian Countries',
    slug: 'asian-countries',
    heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1920&q=80',
    tagline: 'Heritage to Himalayas',
    statsHeading: 'Escape to extraordinary heritage & horizons',
    statsDesc: 'From ancient Kyoto shrines to futuristic skylines, night markets, and tropical lagoons, discover journeys designed around you.',
    intro: {
      title: 'Serene Landscapes & Timeless Wonders Across Asia',
      description: 'From serene bamboo groves and ancient Kyoto temples to futuristic skylines, bustling street food bazaars, and secluded tropical islands. Asia captivates the senses at every turn. Black Forest Holidays opens the door to bespoke cultural immersions and ultra-luxurious retreats across the Orient.',
      img1: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80',
      img2: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=800&q=80'
    },
    tabs: {
      tab1: {
        label: 'Why Blackforest Holidays?',
        subtitle: 'Every Journey Feels Legendary',
        title: 'Where Heritage Meets Modern Wonder',
        description: 'At Black Forest Holidays, we go beyond just planning trips — we create unforgettable travel experiences. With personalized itineraries, expert guidance, and end-to-end travel services, we ensure every journey is seamless, exciting, and tailored to your needs.',
        image: 'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1200&q=80'
      },
      tab2: {
        label: 'Destinations',
        subtitle: 'Serene landscapes & pristine escapes',
        title: 'Our Destinations in Asia & South East Asia',
        items: [
          { name: 'Japan', desc: 'Where timeless traditions meet refined modern elegance. From serene temples to futuristic cities.' },
          { name: 'South Korea', desc: 'A vibrant blend of innovation, culture, and dynamic city life alongside rich heritage.' },
          { name: 'China', desc: 'A land of ancient wonders and grand imperial legacy from the Great Wall to modern marvels.' },
          { name: 'Hong Kong', desc: 'Where dazzling skylines meet world-class luxury, fine dining, and endless energy.' },
          { name: 'Singapore', desc: 'A dynamic city of modern elegance, iconic skylines, and world-class luxury.' },
          { name: 'Thailand', desc: 'A vibrant blend of golden temples, bustling night markets, and exotic island sanctuaries.' },
          { name: 'Bali', desc: 'A tropical paradise of lush rice terraces, serene temples, and ultra-luxury cliffside villas.' },
          { name: 'Vietnam', desc: 'A land of timeless beauty, from limestone karsts in Ha Long Bay to rich street culture.' }
        ],
        image: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80'
      },
      tab3: {
        label: 'Highlights',
        subtitle: 'Curated Encounters',
        title: 'Asian Highlights',
        highlights: [
          '1. Seamless blend of ancient traditions & futuristic cityscapes',
          '2. Trendsetting culture, vibrant night markets & modern experiences',
          '3. Iconic landmarks, rich heritage & imperial history',
          '4. Dazzling skylines, luxury shopping & harbour views',
          '5. Scenic landscapes, rice terraces & cultural charm',
          '6. Peaceful monasteries, Himalayan beauty & spiritual journeys',
          '7. Majestic mountains, sacred temples & tropical islands'
        ],
        image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=1200&q=80'
      }
    },
    countries: [
      { name: 'Japan', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80', desc: 'Tokyo, Kyoto & Mt. Fuji' },
      { name: 'South Korea', image: 'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=800&q=80', desc: 'Seoul, Busan & Jeju Island' },
      { name: 'China', image: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=800&q=80', desc: 'The Great Wall & Forbidden City' },
      { name: 'Hong Kong', image: 'https://images.unsplash.com/photo-1506970845246-18f21d533b20?auto=format&fit=crop&w=800&q=80', desc: 'Victoria Harbour & Skyline' },
      { name: 'Macau', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80', desc: 'Colonial Ruins & Luxury Resorts' },
      { name: 'Taiwan', image: 'https://images.unsplash.com/photo-1470004914212-05527e49370b?auto=format&fit=crop&w=800&q=80', desc: 'Taipei 101 & Sun Moon Lake' },
      { name: 'Singapore', image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=800&q=80', desc: 'Marina Bay & Sentosa Luxury' },
      { name: 'Thailand', image: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?auto=format&fit=crop&w=800&q=80', desc: 'Bangkok Temples & Phuket Sands' },
      { name: 'Bali', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80', desc: 'Ubud Terraces & Uluwatu Cliffs' },
      { name: 'Malaysia', image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=800&q=80', desc: 'Kuala Lumpur & Langkawi' },
      { name: 'Vietnam', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80', desc: 'Ha Long Bay & Da Nang' },
      { name: 'Cambodia', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80', desc: 'Majestic Temples of Angkor' },
      { name: 'Philippines', image: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=800&q=80', desc: 'Palawan Lagoons & Boracay' }
    ]
  },

  australia: {
    name: 'Australia',
    slug: 'australia',
    heroImage: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1920&q=80',
    tagline: 'Your Island Story Begins Here',
    statsHeading: 'Escape to extraordinary ocean paradises',
    statsDesc: 'From the Great Barrier Reef to New Zealand fjords and private Pacific atolls, discover journeys designed around you.',
    intro: {
      title: 'Island Dreams & Ocean Blues Across The Pacific',
      description: 'Discover the untamed coastlines, sun-bleached coral reefs, and ancient desert landscapes of Australia, New Zealand, and the South Pacific islands. From the Sydney Opera House to the fjords of Milford Sound and private island atolls in Fiji, luxury meets boundless wonder.',
      img1: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?auto=format&fit=crop&w=800&q=80',
      img2: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=800&q=80'
    },
    tabs: {
      tab1: {
        label: 'Why Blackforest Holidays?',
        subtitle: 'Every Journey Feels Legendary',
        title: "From Australia's Shores to Bora Bora's Paradise",
        description: 'At Black Forest Holidays, we design tailor-made journeys across Oceania and the Pacific. Indulge in private reef yachts, helicopter tours over glaciers, and stays in the world’s most prestigious lodges.',
        image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80'
      },
      tab2: {
        label: 'Destinations',
        subtitle: 'Pacific Escapes',
        title: 'Islands, Reefs & Dramatic Wilderness',
        items: [
          { name: 'Sydney & NSW', desc: 'World-famous harbour, iconic opera house, and golden Bondi beaches.' },
          { name: 'Melbourne & Victoria', desc: 'Art-filled laneways, culinary culture, and Great Ocean Road vistas.' },
          { name: 'Great Barrier Reef', desc: 'The world’s largest coral reef system, pristine islands, and marine wonder.' },
          { name: 'New Zealand', desc: 'Snow-capped southern alps, crystalline lakes, and adrenaline-fueled Queenstown.' },
          { name: 'Fiji Islands', desc: 'Secluded island sanctuaries, vibrant coral reefs, and warm Polynesian hospitality.' }
        ],
        image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80'
      },
      tab3: {
        label: 'Highlights',
        subtitle: 'Down Under Highlights',
        title: 'Signature Pacific Moments',
        highlights: [
          '1. Private catamaran sailing across the Great Barrier Reef',
          '2. Sunset over Sydney Harbour with private opera box seats',
          '3. Helicopter flights over New Zealand’s Milford Sound',
          '4. Stargazing under pristine desert skies in Uluru',
          '5. Luxury overwater bungalow escapes in Bora Bora & Fiji',
          '6. Wine tasting through Barossa Valley and Marlborough',
          '7. Wildlife encounters with kangaroos, koalas & marine life'
        ],
        image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=1200&q=80'
      }
    },
    countries: [
      { name: 'Sydney & NSW', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80', desc: 'Opera House & Bondi' },
      { name: 'Great Barrier Reef', image: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80', desc: 'Whitsundays & Corals' },
      { name: 'Melbourne', image: 'https://images.unsplash.com/photo-1514395462725-fb4566210144?auto=format&fit=crop&w=800&q=80', desc: 'Laneways & Coastal Roads' },
      { name: 'New Zealand', image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=800&q=80', desc: 'Queenstown & Fjords' },
      { name: 'Fiji', image: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=800&q=80', desc: 'Private Coral Atolls' },
      { name: 'Bora Bora', image: 'https://images.unsplash.com/photo-1532408840957-031d8034aeef?auto=format&fit=crop&w=800&q=80', desc: 'Overwater Bungalow Luxury' }
    ]
  },

  europe: {
    name: 'Europe',
    slug: 'europe',
    heroImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1920&q=80',
    tagline: 'Alpine Wonder & Royal Heritage',
    statsHeading: 'Escape to extraordinary European grandeur',
    statsDesc: 'From scenic Swiss alpine rails to sunlit Mediterranean coastlines and royal capitals, discover journeys designed around you.',
    intro: {
      title: 'Timeless Grandeur & Alpine Elegance Across Europe',
      description: 'Step into a world of fairytale castles, historic palaces, snow-dusted alpine summits, and Mediterranean coastlines. Whether traversing the Swiss Alps by panoramic train, savoring vintage wines in Tuscany, or exploring grand Parisian avenues, our bespoke European journeys embody elegance.',
      img1: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80',
      img2: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=800&q=80'
    },
    tabs: {
      tab1: {
        label: 'Why Blackforest Holidays?',
        subtitle: 'Every Journey Feels Legendary',
        title: 'Where Old World Charm Meets Bespoke Luxury',
        description: 'From VIP museum viewings to private chauffeur drives across the Dolomites and reservations at Michelin-starred restaurants, Black Forest Holidays provides seamless European itineraries designed for discerning travelers.',
        image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80'
      },
      tab2: {
        label: 'Destinations',
        subtitle: 'The Grand European Circuit',
        title: 'Castles, Canals & Alpine Splendor',
        items: [
          { name: 'Switzerland', desc: 'Alpine peaks, scenic railways like Glacier Express, and pristine lakes in Lucerne & Interlaken.' },
          { name: 'France', desc: 'The glamour of Paris, sun-drenched vineyards in Bordeaux, and azure waters of the French Riviera.' },
          { name: 'Italy', desc: 'Timeless art in Rome and Florence, romantic gondolas in Venice, and dramatic cliffs of Amalfi.' },
          { name: 'United Kingdom', desc: 'Royal London heritage, rolling Cotswolds countryside, and romantic Scottish Highlands.' },
          { name: 'Greece', desc: 'Whitewashed Aegean villages, clifftop sunsets in Santorini, and ancient Acropolis ruins.' }
        ],
        image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80'
      },
      tab3: {
        label: 'Highlights',
        subtitle: 'European Highlights',
        title: 'Unrivaled European Experiences',
        highlights: [
          '1. First-class Glacier Express journey across the Swiss Alps',
          '2. Private sunset boat charters along the Amalfi Coast',
          '3. VIP after-hours tours of the Louvre and Vatican Museums',
          '4. Fairytale castle visits in Bavaria and the Loire Valley',
          '5. Clifftop luxury suites overlooking Santorini caldera',
          '6. Exclusive wine tastings in Tuscany, Bordeaux & Champagne',
          '7. Chasing the Northern Lights in Finnish Lapland & Iceland'
        ],
        image: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=1200&q=80'
      }
    },
    countries: [
      { name: 'Switzerland', image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80', desc: 'Alps, Zermatt & Interlaken' },
      { name: 'France', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80', desc: 'Paris, Côte d’Azur & Provence' },
      { name: 'Italy', image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=800&q=80', desc: 'Rome, Venice & Amalfi' },
      { name: 'United Kingdom', image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80', desc: 'London & Scottish Highlands' },
      { name: 'Spain', image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=800&q=80', desc: 'Barcelona, Madrid & Seville' },
      { name: 'Greece', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80', desc: 'Santorini & Athens Acropolis' },
      { name: 'Austria', image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?auto=format&fit=crop&w=800&q=80', desc: 'Vienna & Salzburg Alps' },
      { name: 'Germany', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80', desc: 'Bavaria & The Black Forest' }
    ]
  },

  'indian-ocean': {
    name: 'Indian Ocean',
    slug: 'indian-ocean',
    heroImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1920&q=80',
    tagline: 'Your Island Story Begins Here',
    statsHeading: 'Escape to extraordinary islands',
    statsDesc: 'From secluded beaches to unforgettable adventures, discover island journeys designed around you.',
    intro: {
      title: 'Turquoise Lagoons & Private Overwater Atolls',
      description: 'Unwind in the zenith of tropical luxury across the Indian Ocean. From bespoke overwater bungalows in the Maldives to the granite boulders of Seychelles and the emerald peaks of Mauritius, each private sanctuary promises pure relaxation and barefoot opulence.',
      img1: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=800&q=80',
      img2: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=800&q=80'
    },
    tabs: {
      tab1: {
        label: 'Why Blackforest Holidays?',
        subtitle: 'Every Journey Feels Legendary',
        title: 'The Pinnacle of Island Seclusion',
        description: 'We curate private seaplane transfers, romantic candlelit sandbank dinners, and private yacht charters throughout the world’s most pristine ocean sanctuaries.',
        image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80'
      },
      tab2: {
        label: 'Destinations',
        subtitle: 'Ocean Sanctuaries',
        title: 'Atolls of Pure Indulgence',
        items: [
          { name: 'Maldives', desc: 'World-renowned overwater villas, underwater restaurants, and luminous bioluminescent waters.' },
          { name: 'Mauritius', desc: 'Championship golf resorts, dramatic waterfalls, and tranquil coral reefs.' },
          { name: 'Seychelles', desc: 'Bespoke granite-lined beaches like Anse Source d’Argent and rare wildlife sanctuaries.' },
          { name: 'Zanzibar', desc: 'Ancient spice markets in Stone Town combined with pristine white-sand shores.' }
        ],
        image: 'https://images.unsplash.com/photo-1589979481223-deb893043163?auto=format&fit=crop&w=1200&q=80'
      },
      tab3: {
        label: 'Highlights',
        subtitle: 'Signature Moments',
        title: 'Island Highlights',
        highlights: [
          '1. Seaplane arrivals over turquoise coral atolls',
          '2. Dining 5 meters underwater surrounded by marine life',
          '3. Private sunset dolphin cruises on traditional dhonis',
          '4. Snorkeling with gentle manta rays and whale sharks',
          '5. Luxury spa treatments over gently lapping ocean waves',
          '6. Private desert island picnics on secluded sandbanks',
          '7. Helipad transfers to private island residences'
        ],
        image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=1200&q=80'
      }
    },
    countries: [
      { name: 'Maldives', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80', desc: 'Overwater Villa Luxury' },
      { name: 'Mauritius', image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&w=800&q=80', desc: 'Coral Lagoons & Waterfalls' },
      { name: 'Seychelles', image: 'https://images.unsplash.com/photo-1589979481223-deb893043163?auto=format&fit=crop&w=800&q=80', desc: 'Granite Boulders & Turquoise Bays' },
      { name: 'Zanzibar', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80', desc: 'Spice Coast & White Sands' }
    ]
  },

  'middle-east': {
    name: 'Middle East',
    slug: 'middle-east',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=80',
    tagline: 'Desert Dunes & Gilded Skylines',
    statsHeading: 'Escape to extraordinary Arabian wonders',
    statsDesc: 'From futuristic architectural icons to starlit desert camps and ancient rock citadels, discover journeys designed around you.',
    intro: {
      title: 'Gilded Skylines & Desert Splendors Across Arabia',
      description: 'Experience an enchanting world where ultra-modern architecture meets thousands of years of Arabian hospitality. From the world’s tallest marvels and luxury shopping in Dubai and Abu Dhabi to the red desert sands of Oman and the rose-red rock city of Petra.',
      img1: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
      img2: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80'
    },
    tabs: {
      tab1: {
        label: 'Why Blackforest Holidays?',
        subtitle: 'Every Journey Feels Legendary',
        title: 'Where Arabian Wonder Meets Modern Luxury',
        description: 'Black Forest Holidays provides royal treatment: private luxury desert camps under starry skies, VIP dune buggy expeditions, and reservations at the most elite establishments in the Middle East.',
        image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80'
      },
      tab2: {
        label: 'Destinations',
        subtitle: 'Arabian Jewels',
        title: 'Desert Dunes & Futuristic Horizons',
        items: [
          { name: 'Dubai', desc: 'Burj Khalifa, private superyacht charters, indoor ski slopes, and the Palm Jumeirah.' },
          { name: 'Abu Dhabi', desc: 'The magnificent Sheikh Zayed Grand Mosque, Louvre Abu Dhabi, and desert palaces.' },
          { name: 'Oman', desc: 'Dramatically sculpted wadis, historic fortresses, and luxury glamping in Wahiba Sands.' },
          { name: 'Jordan', desc: 'The ancient Nabataean wonder of Petra, Wadi Rum red dunes, and floating in the Dead Sea.' }
        ],
        image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80'
      },
      tab3: {
        label: 'Highlights',
        subtitle: 'Signature Experiences',
        title: 'Middle Eastern Highlights',
        highlights: [
          '1. VIP penthouse views from the Burj Khalifa peak',
          '2. Luxury glamping in Oman’s Wahiba Sands with private campfire banquet',
          '3. Candlelit walk through Petra’s Siq canyon by night',
          '4. Private helicopter tour over Dubai’s Palm and world islands',
          '5. Sunset yacht cruise along Dubai Marina and Arabian Gulf',
          '6. Architecture tour of Sheikh Zayed Mosque and Louvre Abu Dhabi',
          '7. Floating in the mineral-rich waters of the Dead Sea'
        ],
        image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1200&q=80'
      }
    },
    countries: [
      { name: 'Dubai', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80', desc: 'Burj Khalifa & Palm Marina' },
      { name: 'Abu Dhabi', image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80', desc: 'Grand Mosque & Saadiyat Island' },
      { name: 'Oman', image: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=800&q=80', desc: 'Muscat, Wadis & Wahiba Sands' },
      { name: 'Jordan', image: 'https://images.unsplash.com/photo-1579606032836-db40159f7b4d?auto=format&fit=crop&w=800&q=80', desc: 'Ancient Petra & Wadi Rum' },
      { name: 'Qatar', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80', desc: 'Doha Skyline & Souq Waqif' }
    ]
  },

  'south-asia': {
    name: 'South Asia',
    slug: 'south-asia',
    heroImage: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1920&q=80',
    tagline: 'Heritage to Himalayas',
    statsHeading: 'Escape to extraordinary peaks & palaces',
    statsDesc: 'From the high Himalayas of Bhutan & Nepal to the tranquil backwaters of Kerala and Ceylon tea hills.',
    intro: {
      title: 'Sacred Peaks & Tropical Serenity Across South Asia',
      description: 'Embark on a soulful odyssey across South Asia. From the misty tea hills and ancient Sigiriya citadel of Sri Lanka to the tranquil Himalayan monasteries of Bhutan and the soaring snowy pinnacles of Nepal, experience journeys steeped in spiritual grace and natural majesty.',
      img1: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80',
      img2: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80'
    },
    tabs: {
      tab1: {
        label: 'Why Blackforest Holidays?',
        subtitle: 'Every Journey Feels Legendary',
        title: 'Spiritual Wonder & Unrivaled Serenity',
        description: 'Our South Asian journeys connect you deeply with ancient roots while surrounding you in the refined luxury of boutique heritage retreats and private mountain sanctuaries.',
        image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=1200&q=80'
      },
      tab2: {
        label: 'Destinations',
        subtitle: 'Himalayan & Tropical Realms',
        title: 'Ancient Kingdoms & Serene Valleys',
        items: [
          { name: 'Sri Lanka', desc: 'Ancient rock citadels, scenic blue train rides through tea country, and leopard safaris.' },
          { name: 'Bhutan', desc: 'The Kingdom of Gross National Happiness, cliffside Tiger’s Nest monastery, and sacred valleys.' },
          { name: 'Nepal', desc: 'Mount Everest scenic flights, ancient temples in Kathmandu, and serene Pokhara lakeside.' },
          { name: 'India', desc: 'Royal Rajasthan forts, Kerala backwaters, Kashmir snowscapes, and the Taj Mahal.' }
        ],
        image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80'
      },
      tab3: {
        label: 'Highlights',
        subtitle: 'Soulful Highlights',
        title: 'South Asian Wonders',
        highlights: [
          '1. Climbing the ancient sky palace of Sigiriya in Sri Lanka',
          '2. Scenic blue train journey through Ella tea plantations',
          '3. Hike to the sacred Paro Taktsang (Tiger’s Nest) in Bhutan',
          '4. Scenic sunrise mountain flight over Mount Everest',
          '5. Houseboat cruise on the tranquil backwaters of Kerala',
          '6. Royal Maharaja palace stays across Rajasthan',
          '7. Shikara boat rides on Dal Lake in Kashmir'
        ],
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
      }
    },
    countries: [
      { name: 'Sri Lanka', image: 'https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=800&q=80', desc: 'Sigiriya & Ceylon Tea Hills' },
      { name: 'Bhutan', image: 'https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=800&q=80', desc: 'Tiger’s Nest & Himalayan Valleys' },
      { name: 'Nepal', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80', desc: 'Everest Panoramas & Pokhara' },
      { name: 'India', image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80', desc: 'Taj Mahal & Royal Palaces' },
      { name: 'Kerala', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80', desc: 'Backwaters & Spice Hills' },
      { name: 'Kashmir', image: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=800&q=80', desc: 'Dal Lake & Gulmarg Snow' }
    ]
  }
};
