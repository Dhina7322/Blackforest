import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import HeroWave from '../../components/common/HeroWave';
import { useSettings } from '../../context/SiteSettingsContext';
import { 
  Search, 
  MapPin, 
  Calendar, 
  Euro, 
  Clock, 
  Check, 
  X, 
  ChevronRight, 
  ChevronDown, 
  SlidersHorizontal, 
  Info, 
  Grid3X3, 
  List, 
  RotateCcw,
  Sparkles,
  Bus,
  ShieldCheck,
  Star
} from 'lucide-react';

// Comprehensive Coach Tours dataset
const INITIAL_TOURS = [
  {
    id: 1,
    title: "France and Swiss Alps",
    countries: ["France", "Switzerland"],
    cities: ["Paris", "Geneva", "Interlaken", "Zermatt", "Zurich"],
    startingCity: "Paris",
    days: 11,
    nights: 10,
    price: 1850,
    image: "/assets/images/yuxin-chen-598Ah85XPiY-unsplash-scaled.jpg",
    tag: "Best Seller",
    travelType: ["Rotary", "Go English"],
    privatizable: true,
    riverCruise: false,
    lastMinute: false,
    preSales: true,
    tripStyle: "Scenic & Mountains",
    route: "Paris • Geneva • Interlaken • Zermatt • Zurich",
    description: "Experience the ultimate European alpine voyage combining the Parisian elegance with the breathtaking peaks of the Swiss Alps, Jungfrau region, and scenic lakes.",
    inclusions: ["Luxury air-conditioned coach with Wi-Fi", "10 nights in 4★ premium hotels", "Daily buffet breakfasts & 4 regional dinners", "Professional English-speaking Tour Director", "Panoramic cogwheel train to Zermatt"],
    itinerary: [
      { day: 1, title: "Arrival in Paris", desc: "Welcome to France! Check-in to your hotel and enjoy an evening orientation walk along the Seine River." },
      { day: 2, title: "Parisian Highlights & Louvre", desc: "Guided tour through Champs-Élysées, Arc de Triomphe, Eiffel Tower photo stop, and free afternoon." },
      { day: 3, title: "Paris to Geneva via Burgundy", desc: "Scenic drive through the vineyards of Burgundy before crossing the Swiss border into cosmopolitan Geneva." },
      { day: 4, title: "Geneva to Interlaken", desc: "Discover Lake Geneva and Chillon Castle, arriving in Interlaken nestled between two turquoise lakes." },
      { day: 5, title: "Jungfrau Region & Lauterbrunnen", desc: "Marvel at the 72 waterfalls of Lauterbrunnen Valley and take an optional excursion to Jungfraujoch Top of Europe." },
      { day: 6, title: "Interlaken to Zermatt", desc: "Journey along the Rhone Valley to Täsch, then board the shuttle train into car-free Zermatt beneath the Matterhorn." },
      { day: 7, title: "Matterhorn Exploration", desc: "Full day in Zermatt. Enjoy scenic hiking trails or take the Gornergrat Bahn for 360-degree glacier panoramas." },
      { day: 8, title: "Zermatt to Lucerne", desc: "Cross picturesque mountain passes and enjoy a boat cruise across Lake Lucerne before visiting Chapel Bridge." },
      { day: 9, title: "Lucerne to Zurich", desc: "Morning in historic Lucerne with Lion Monument, continuing to vibrant Zurich for an afternoon city tour." },
      { day: 10, title: "Rhine Falls & Zurich Old Town", desc: "Excursion to Europe's largest waterfall at Rhine Falls, followed by a celebratory farewell dinner." },
      { day: 11, title: "Departure from Zurich", desc: "Transfer to Zurich Airport after breakfast for your journey home." }
    ]
  },
  {
    id: 2,
    title: "France & Switzerland with Enchanted Alsace",
    countries: ["France", "Switzerland"],
    cities: ["Strasbourg", "Colmar", "Lucerne", "Zurich"],
    startingCity: "Strasbourg",
    days: 7,
    nights: 6,
    price: 1290,
    image: "/assets/images/xavier-coiffic-ByAHlRiTQjo-unsplash-scaled.jpg",
    tag: "Scenic Route",
    travelType: ["Slow", "Go English"],
    privatizable: true,
    riverCruise: true,
    lastMinute: true,
    preSales: true,
    tripStyle: "Cultural Heritage",
    route: "Strasbourg • Colmar • Lucerne • Rhine Falls",
    description: "Fairytale half-timbered villages in Alsace paired with Switzerland's tranquil lakes, snowcapped mountains, and chocolate-making heritage.",
    inclusions: ["Escorted coach transportation", "6 nights accommodation in charming boutique hotels", "Daily breakfasts", "Alsace wine tasting session in Riquewihr", "Lake Lucerne scenic cruise"],
    itinerary: [
      { day: 1, title: "Arrive in Strasbourg", desc: "Explore the UNESCO-listed Grand Île and the magnificent Notre-Dame Cathedral." },
      { day: 2, title: "Alsace Wine Route & Colmar", desc: "Visit fairytale villages of Eguisheim and Riquewihr before spending the evening in Little Venice, Colmar." },
      { day: 3, title: "Colmar to Basel & Lucerne", desc: "Cross the Rhine into Switzerland, stopping in art-rich Basel before heading to idyllic Lucerne." },
      { day: 4, title: "Lucerne & Mount Pilatus", desc: "Ascend Mount Pilatus via the world's steepest cogwheel railway, enjoying alpine views over 73 peaks." },
      { day: 5, title: "Lucerne to Zurich", desc: "Drive along Lake Zurich with a visit to the Swiss National Museum and historic guild houses." },
      { day: 6, title: "Rhine Falls Excursion", desc: "Feel the thundering power of Rhine Falls by boat, with an evening stroll through Zurich's Niederdorf." },
      { day: 7, title: "Zurich Departure", desc: "Tour concludes after breakfast." }
    ]
  },
  {
    id: 3,
    title: "Swiss and Italian Spotlight & Venice",
    countries: ["Switzerland", "Italy"],
    cities: ["Milan", "Lake Como", "Venice", "Dolomites", "Verona"],
    startingCity: "Milan",
    days: 9,
    nights: 8,
    price: 1620,
    image: "/assets/images/willian-justen-de-vasconcellos-4hMET7vYTAQ-unsplash-scaled.jpg",
    tag: "Cultural Classic",
    travelType: ["Rotary", "Pax Club"],
    privatizable: false,
    riverCruise: false,
    lastMinute: false,
    preSales: true,
    tripStyle: "Lakes & Romance",
    route: "Milan • Lake Como • Venice • Dolomites • Verona",
    description: "The glamour of Milan, the romance of Venice's winding canals, and the drama of the UNESCO Dolomites peaks.",
    inclusions: ["Deluxe coach travel", "8 nights in 4★ handpicked hotels", "Private motorboat transfer in Venice", "Gondola ride with music", "English-speaking tour escort throughout"],
    itinerary: [
      { day: 1, title: "Milan Arrival", desc: "Meet your guide and see the Duomo and Galleria Vittorio Emanuele II." },
      { day: 2, title: "Lake Como & Bellagio", desc: "Day trip to Lake Como with private boat to picturesque Bellagio." },
      { day: 3, title: "Milan to Verona & Venice", desc: "Visit Juliet's Balcony and the Roman Arena in Verona en route to Venice." },
      { day: 4, title: "Venice Unveiled", desc: "Guided tour of St. Mark's Square, Doge's Palace, and Murano glassblowing demonstration." },
      { day: 5, title: "The Majestic Dolomites", desc: "Scenic mountain journey to Cortina d'Ampezzo and Lake Misurina." },
      { day: 6, title: "Dolomites Alpine Passes", desc: "Drive through Sella Pass with stops for photos and strudel." },
      { day: 7, title: "Dolomites to Lake Garda", desc: "Travel to Sirmione on the shores of Lake Garda with Scaliger Castle." },
      { day: 8, title: "Lake Garda to Milan", desc: "Return to Milan for an evening farewell dinner in the Navigli district." },
      { day: 9, title: "Arrivederci Milan", desc: "Tour ends with breakfast and airport transfer." }
    ]
  },
  {
    id: 4,
    title: "Imperial Europe & Romantic Castles",
    countries: ["Austria", "Czech Republic", "Hungary", "Germany"],
    cities: ["Vienna", "Prague", "Budapest", "Salzburg", "Munich"],
    startingCity: "Vienna",
    days: 10,
    nights: 9,
    price: 1780,
    image: "/assets/images/willdwind-william-martret-lRrklMtueBg-unsplash-scaled.jpg",
    tag: "Heritage",
    travelType: ["Special India", "Go English"],
    privatizable: true,
    riverCruise: false,
    lastMinute: false,
    preSales: true,
    tripStyle: "Imperial Capitals",
    route: "Vienna • Prague • Budapest • Salzburg • Munich",
    description: "Follow the trail of Habsburg royalty through grand palaces, classical music halls, and medieval cobblestone streets.",
    inclusions: ["Luxury coach transportation", "9 nights hotel stays with breakfast", "Danube river dinner cruise in Budapest", "Schönbrunn Palace audio tour", "Sound of Music Salzburg tour"],
    itinerary: [
      { day: 1, title: "Vienna Arrival", desc: "Welcome to Austria's imperial capital." },
      { day: 2, title: "Imperial Vienna", desc: "Ringstrasse, Hofburg Palace, and Schönbrunn gardens." },
      { day: 3, title: "Vienna to Budapest", desc: "Scenic drive along the Danube into Hungary's vibrant twin city." },
      { day: 4, title: "Budapest Highlights", desc: "Fisherman's Bastion, Matthias Church, and Hungarian Parliament." },
      { day: 5, title: "Budapest to Prague via Bratislava", desc: "Stop in Slovakia's capital before continuing to Golden Prague." },
      { day: 6, title: "Prague Castle & Charles Bridge", desc: "Explore the UNESCO Old Town Square and the Astronomical Clock." },
      { day: 7, title: "Prague to Salzburg", desc: "Enter Austria's Salzkammergut lake district into Mozart's Salzburg." },
      { day: 8, title: "Salzburg to Munich", desc: "Mirabell Gardens, Hohensalzburg Fortress, drive into Bavaria." },
      { day: 9, title: "Bavarian Munich & Neuschwanstein", desc: "Excursion to fairytale Neuschwanstein Castle and Marienplatz." },
      { day: 10, title: "Munich Departure", desc: "Departure after breakfast." }
    ]
  },
  {
    id: 5,
    title: "Aegean Dream: Classical Greece & Islands",
    countries: ["Greece"],
    cities: ["Athens", "Mykonos", "Santorini"],
    startingCity: "Athens",
    days: 13,
    nights: 12,
    price: 2150,
    image: "/assets/images/sergi-ferrete-YXwt-vJ3szA-unsplash-scaled.jpg",
    tag: "Island Hopping",
    travelType: ["Stop", "Go English"],
    privatizable: true,
    riverCruise: true,
    lastMinute: false,
    preSales: false,
    tripStyle: "Islands & Coastlines",
    route: "Athens • Mykonos • Santorini",
    description: "Sun-drenched Aegean islands, whitewashed clifftop villages, turquoise seas, and ancient mythology come alive.",
    inclusions: ["High-speed ferry tickets between islands", "12 nights in seaside hotels", "Acropolis guided tour with entrance tickets", "Sunset catamaran cruise in Santorini with dinner", "All airport & port transfers"],
    itinerary: [
      { day: 1, title: "Athens Welcome", desc: "Check in and relax in the historic Plaka quarter." },
      { day: 2, title: "Acropolis & Parthenon", desc: "Guided walking tour through ancient Greek monuments." },
      { day: 3, title: "Ferry to Mykonos", desc: "Sail across the Aegean Sea to glamorous Mykonos." },
      { day: 4, title: "Mykonos Windmills & Little Venice", desc: "Leisure day exploring cobbled lanes and beaches." },
      { day: 5, title: "Ferry to Santorini", desc: "Arrive in dramatic volcanic Santorini with clifftop vistas." },
      { day: 6, title: "Oia Sunset & Caldera", desc: "Wander blue-domed churches and witness the world's most famous sunset." }
    ]
  },
  {
    id: 6,
    title: "Classical Spain: Andalusian Splendour",
    countries: ["Spain"],
    cities: ["Madrid", "Seville", "Granada", "Barcelona"],
    startingCity: "Madrid",
    days: 8,
    nights: 7,
    price: 1350,
    image: "/assets/images/sutirta-budiman-kjOBqwMUnWw-unsplash-scaled.jpg",
    tag: "Cultural Classic",
    travelType: ["Rotary", "Slow"],
    privatizable: true,
    riverCruise: false,
    lastMinute: true,
    preSales: true,
    tripStyle: "History & Architecture",
    route: "Madrid • Seville • Granada • Barcelona",
    description: "Flamenco rhythms, Moorish palaces of Alhambra, Gaudi's whimsical Barcelona, and lively tapas culture across Spain.",
    inclusions: ["Dedicated air-conditioned touring coach", "7 nights 4★ hotel accommodation", "Alhambra Palace & Generalife entrance", "Authentic Flamenco show in Seville", "Sagrada Familia guided tour"],
    itinerary: [
      { day: 1, title: "Madrid Arrival", desc: "Welcome to Spain's royal capital." },
      { day: 2, title: "Madrid to Toledo & Seville", desc: "Medieval Toledo then continue south into Andalusia." },
      { day: 3, title: "Seville Passion", desc: "Plaza de España, Santa Cruz quarter, and evening Flamenco." },
      { day: 4, title: "Seville to Granada", desc: "Visit the world-renowned Alhambra Palace complex." },
      { day: 5, title: "Granada to Valencia", desc: "Drive along the Costa Blanca into modernist Valencia." },
      { day: 6, title: "Valencia to Barcelona", desc: "Arrive in Barcelona and explore Las Ramblas." },
      { day: 7, title: "Gaudi's Barcelona", desc: "Sagrada Familia, Park Güell, and Gothic Quarter." },
      { day: 8, title: "Farewell Barcelona", desc: "Tour concludes." }
    ]
  },
  {
    id: 7,
    title: "Roaming the United Kingdom & Scottish Highlands",
    countries: ["United Kingdom"],
    cities: ["London", "Edinburgh", "Highlands", "Loch Ness", "York"],
    startingCity: "London",
    days: 7,
    nights: 6,
    price: 1420,
    image: "/assets/images/sean-robertson-5ftxFgXLtkI-unsplash-scaled.jpg",
    tag: "Explorer",
    travelType: ["Go English", "New"],
    privatizable: false,
    riverCruise: false,
    lastMinute: false,
    preSales: true,
    tripStyle: "Castles & Countryside",
    route: "London • Edinburgh • Highlands",
    description: "Towering medieval castles, dramatic Highland lochs, royal London monuments, and historic British pubs.",
    inclusions: ["Modern coach transport", "6 nights 3★-4★ hotels", "Edinburgh Castle admission", "Loch Ness scenic cruise", "English-speaking tour director"],
    itinerary: [
      { day: 1, title: "London Arrival", desc: "Welcome to London with Big Ben & Parliament." },
      { day: 2, title: "London to York", desc: "Visit York Minster and medieval The Shambles." },
      { day: 3, title: "York to Edinburgh", desc: "Cross the Scottish border into Edinburgh." },
      { day: 4, title: "Edinburgh Castle & Royal Mile", desc: "Historic castle tour and Scottish whisky tasting." },
      { day: 5, title: "Scottish Highlands & Loch Ness", desc: "Search for Nessie amidst dramatic Highland peaks." },
      { day: 6, title: "Highlands to Lake District", desc: "Scenic journey through England's Lake District." },
      { day: 7, title: "Return to London", desc: "Tour finishes in central London." }
    ]
  },
  {
    id: 8,
    title: "Majestic Scandinavia: Fjords & Nordic Capitals",
    countries: ["Denmark", "Norway", "Sweden"],
    cities: ["Copenhagen", "Oslo", "Stockholm", "Bergen", "Flåm"],
    startingCity: "Copenhagen",
    days: 12,
    nights: 11,
    price: 2390,
    image: "/assets/images/hendrik-cornelissen-qs4E9t0hJc0-unsplash-scaled.jpg",
    tag: "Nordic Wonders",
    travelType: ["Rotary", "Go English", "Slow"],
    privatizable: true,
    riverCruise: true,
    lastMinute: false,
    preSales: true,
    tripStyle: "Fjords & Nature",
    route: "Copenhagen • Oslo • Stockholm • Fjords",
    description: "Sail through world-famous Norwegian fjords, ride the scenic Flåm Railway, and discover sleek Scandinavian design.",
    inclusions: ["Overnight ferry cruise Copenhagen-Oslo", "11 nights premium hotels", "Sognefjord cruise", "Flåm mountain railway ticket", "Stockholm Vasa Museum entrance"],
    itinerary: [
      { day: 1, title: "Copenhagen Welcome", desc: "Nyhavn harbour and Little Mermaid statue." },
      { day: 2, title: "Copenhagen & Cruise to Oslo", desc: "City tour then board the overnight cruise ship to Norway." },
      { day: 3, title: "Arrive in Oslo", desc: "Vigeland Sculpture Park and Oslo Opera House." },
      { day: 4, title: "Oslo to Sognefjord", desc: "Drive past cascading waterfalls into fjord country." },
      { day: 5, title: "Flåm Railway & Nærøyfjord", desc: "Breathtaking electric boat cruise through UNESCO fjords." },
      { day: 6, title: "Bergen Hanseatic Wharf", desc: "Bryggen wooden houses and Mount Fløyen funicular." },
      { day: 7, title: "Bergen to Geilo", desc: "Cross the Hardangervidda mountain plateau." },
      { day: 8, title: "Geilo to Stockholm", desc: "Travel through Swedish forests into Stockholm." },
      { day: 9, title: "Stockholm Gamla Stan", desc: "Old Town, Royal Palace, and Archipelago cruise." },
      { day: 10, title: "Stockholm Departure", desc: "Tour concludes." }
    ]
  },
  {
    id: 9,
    title: "Wonders of Italy: Rome, Florence, Venice & Amalfi",
    countries: ["Italy"],
    cities: ["Rome", "Florence", "Venice", "Amalfi", "Pompeii"],
    startingCity: "Rome",
    days: 9,
    nights: 8,
    price: 1580,
    image: "/assets/images/ahmed-shabana-ADa9bb3tqR4-unsplash-scaled.jpg",
    tag: "Best Seller",
    travelType: ["Rotary", "Special India"],
    privatizable: true,
    riverCruise: false,
    lastMinute: true,
    preSales: true,
    tripStyle: "Art & Renaissance",
    route: "Rome • Florence • Venice • Amalfi",
    description: "The Colosseum, Vatican Museums, Renaissance art in Florence, Venice's canals, and cliffside Amalfi Coast villages.",
    inclusions: ["Air-conditioned touring bus", "8 nights 4★ hotels", "Colosseum & Roman Forum tour", "Florence Accademia Michelangelo's David", "Pompeii archaeological guide"],
    itinerary: [
      { day: 1, title: "Rome Welcome", desc: "Trevi Fountain, Pantheon, and Piazza Navona." },
      { day: 2, title: "Vatican City & Ancient Rome", desc: "St. Peter's Basilica, Sistine Chapel, and Colosseum." },
      { day: 3, title: "Rome to Florence via Tuscany", desc: "Drive through rolling Tuscan hills with Chianti tasting." },
      { day: 4, title: "Florence Renaissance", desc: "Duomo, Ponte Vecchio, and Uffizi Gallery." },
      { day: 5, title: "Florence to Venice", desc: "Pisa Leaning Tower stop then arrive in Venice." },
      { day: 6, title: "Venice Gondolas & Romance", desc: "St. Mark's Basilica and gondola ride." },
      { day: 7, title: "Venice to Naples & Pompeii", desc: "Explore the frozen ruins of ancient Pompeii." },
      { day: 8, title: "Amalfi Coast Scenic Drive", desc: "Positano cliff views and Sorrento limoncello." },
      { day: 9, title: "Rome Departure", desc: "Return to Rome for departure." }
    ]
  },
  {
    id: 10,
    title: "Central Europe Highlights: Prague, Vienna & Budapest",
    countries: ["Czech Republic", "Austria", "Hungary"],
    cities: ["Prague", "Vienna", "Budapest", "Cesky Krumlov"],
    startingCity: "Prague",
    days: 8,
    nights: 7,
    price: 1380,
    image: "/assets/images/willdwind-william-martret-lRrklMtueBg-unsplash-scaled.jpg",
    tag: "Value Choice",
    travelType: ["Rotary", "Go English"],
    privatizable: true,
    riverCruise: true,
    lastMinute: false,
    preSales: true,
    tripStyle: "Historic Capitals",
    route: "Prague • Vienna • Budapest",
    description: "Three iconic Central European jewels filled with Gothic cathedrals, imperial palaces, and vibrant riverside promenades.",
    inclusions: ["Comfortable coach transport", "7 nights central 4★ hotels", "Prague Castle entry", "Vienna classical concert ticket", "Budapest thermal bath experience"],
    itinerary: [
      { day: 1, title: "Prague Arrival", desc: "Orientation walk in Old Town." },
      { day: 2, title: "Prague In-Depth", desc: "Charles Bridge and St. Vitus Cathedral." },
      { day: 3, title: "Cesky Krumlov to Vienna", desc: "Fairytale medieval town then on to Vienna." },
      { day: 4, title: "Vienna Grandeur", desc: "St. Stephen's Cathedral and Belvedere Palace." },
      { day: 5, title: "Vienna to Budapest", desc: "Journey along the Danube into Hungary." },
      { day: 6, title: "Budapest Bridges & Castle", desc: "Chain Bridge, Buda Castle, and night illumination." },
      { day: 7, title: "Szechenyi Baths & Market", desc: "Relax in thermal waters and shop Central Market." },
      { day: 8, title: "Budapest Departure", desc: "Tour concludes." }
    ]
  },
  {
    id: 11,
    title: "Grand Tour of Portugal & Spain",
    countries: ["Portugal", "Spain"],
    cities: ["Lisbon", "Porto", "Madrid", "Seville", "Sintra"],
    startingCity: "Lisbon",
    days: 11,
    nights: 10,
    price: 1890,
    image: "/assets/images/sutirta-budiman-kjOBqwMUnWw-unsplash-scaled.jpg",
    tag: "Popular",
    travelType: ["Slow", "Pax Club"],
    privatizable: true,
    riverCruise: false,
    lastMinute: false,
    preSales: true,
    tripStyle: "Iberian Explorer",
    route: "Lisbon • Sintra • Porto • Madrid • Seville",
    description: "Pastéis de Belém, Porto's wine cellars, Sintra's colorful palaces, vibrant Madrid, and Andalusia's sun-kissed charm.",
    inclusions: ["Private touring coach", "10 nights 4★ hotels", "Port wine tasting in Douro cellars", "Pena Palace Sintra entry", "Lisbon Fado dinner show"],
    itinerary: [
      { day: 1, title: "Lisbon Arrival", desc: "Belém Tower and Jerónimos Monastery." },
      { day: 2, title: "Sintra & Cascais", desc: "Fairytale Pena Palace and Atlantic coast." },
      { day: 3, title: "Lisbon to Porto via Coimbra", desc: "Historic university town then Porto riverside." },
      { day: 4, title: "Porto Douro River", desc: "Six bridges cruise and Port wine lodges." },
      { day: 5, title: "Porto to Madrid", desc: "Cross the Spanish Meseta into Madrid." },
      { day: 6, title: "Madrid Royal Palace", desc: "Prado Museum and Gran Vía." },
      { day: 7, title: "Madrid to Cordoba & Seville", desc: "Cordoba Mosque-Cathedral and Seville." }
    ]
  },
  {
    id: 12,
    title: "Balkan Discovery: Croatia, Bosnia & Montenegro",
    countries: ["Croatia", "Bosnia", "Montenegro"],
    cities: ["Dubrovnik", "Split", "Mostar", "Kotor", "Plitvice"],
    startingCity: "Dubrovnik",
    days: 10,
    nights: 9,
    price: 1650,
    image: "/assets/images/alexey-starki-91ykdj2WQeg-unsplash-scaled.jpg",
    tag: "Scenic Route",
    travelType: ["Rotary", "Go English"],
    privatizable: true,
    riverCruise: false,
    lastMinute: true,
    preSales: false,
    tripStyle: "Adriatic & Nature",
    route: "Dubrovnik • Kotor • Mostar • Split • Plitvice",
    description: "The walled city of Dubrovnik, sparkling Bay of Kotor, Ottoman bridges in Mostar, and Plitvice's turquoise waterfalls.",
    inclusions: ["Air-conditioned coach throughout", "9 nights accommodation", "Dubrovnik city walls ticket", "Plitvice Lakes National Park entry", "Kotor bay cruise"],
    itinerary: [
      { day: 1, title: "Dubrovnik Arrival", desc: "The Pearl of the Adriatic welcome." },
      { day: 2, title: "Dubrovnik Old Town Walls", desc: "Walk the historic fortifications and Stradun." },
      { day: 3, title: "Montenegro: Bay of Kotor", desc: "Fjord-like bay, Our Lady of the Rocks island." },
      { day: 4, title: "Dubrovnik to Mostar", desc: "Historic Stari Most bridge and bazaar in Bosnia." },
      { day: 5, title: "Mostar to Split", desc: "Diocletian's Roman Palace on the Dalmatian coast." },
      { day: 6, title: "Plitvice Lakes National Park", desc: "16 interconnected cascading emerald lakes." }
    ]
  }
];

const ALL_COUNTRIES = ["France", "Switzerland", "Italy", "Spain", "Austria", "Germany", "United Kingdom", "Greece", "Hungary", "Czech Republic", "Denmark", "Norway", "Sweden", "Portugal", "Croatia", "Montenegro", "Bosnia"];
const ALL_CITIES = ["Paris", "Geneva", "Interlaken", "Zermatt", "Zurich", "Strasbourg", "Colmar", "Lucerne", "Milan", "Lake Como", "Venice", "Verona", "Vienna", "Prague", "Budapest", "Salzburg", "Munich", "Athens", "Mykonos", "Santorini", "Madrid", "Seville", "Granada", "Barcelona", "London", "Edinburgh", "Copenhagen", "Oslo", "Stockholm", "Bergen", "Rome", "Florence", "Dubrovnik", "Split", "Lisbon", "Porto"];
const STARTING_CITIES = ["All Starting Cities", "Paris", "Strasbourg", "Milan", "Vienna", "Athens", "Madrid", "London", "Copenhagen", "Rome", "Prague", "Lisbon", "Dubrovnik"];
const TRAVEL_TYPES = [
  { id: "Rotary", label: "Rotary", info: "Rotary International group partner tours" },
  { id: "Stop", label: "Stop", info: "Includes flexible stopover packages" },
  { id: "New", label: "New", info: "Brand new itineraries for 2026/2027" },
  { id: "Go English", label: "Go English", info: "100% English-speaking guided tours" },
  { id: "Slow", label: "Slow", info: "Relaxed pacing with multi-night stays" },
  { id: "Pax Club", label: "Pax Club", info: "Exclusive club perks and discounts" },
  { id: "Arabic", label: "Arabic", info: "Arabic-speaking assistance available" },
  { id: "Special India", label: "Special India", info: "Indian meals & dietary options included" },
];

export default function CoachTourDetailPage() {
  const [searchParams] = useSearchParams();
  const { openEnquiryModal } = useSettings();

  // Filters State
  const [countryQuery, setCountryQuery] = useState('');
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedCountriesOnly, setSelectedCountriesOnly] = useState(false);
  const [cityQuery, setCityQuery] = useState('');
  const [selectedCities, setSelectedCities] = useState([]);
  const [startingCity, setStartingCity] = useState('All Starting Cities');
  const [maxPrice, setMaxPrice] = useState(7000);
  const [maxDays, setMaxDays] = useState(30);
  const [privatizableOnly, setPrivatizableOnly] = useState(false);
  const [riverCruiseOnly, setRiverCruiseOnly] = useState(false);
  const [lastMinuteOnly, setLastMinuteOnly] = useState(false);
  const [preSalesOnly, setPreSalesOnly] = useState(false);
  const [selectedTravelTypes, setSelectedTravelTypes] = useState([]);
  const [selectedTripStyle, setSelectedTripStyle] = useState('All');

  // Sorting & View mode
  const [sortBy, setSortBy] = useState('name-asc'); // 'name-asc', 'days-asc', 'days-desc', 'price-asc', 'price-desc'
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Modal State for viewing Itinerary
  const [activeTourModal, setActiveTourModal] = useState(null);

  // Read query params on mount (e.g. ?tour=2)
  useEffect(() => {
    const tourParam = searchParams.get('tour');
    if (tourParam) {
      const found = INITIAL_TOURS.find(t => t.id === Number(tourParam));
      if (found) {
        setActiveTourModal(found);
      }
    }
  }, [searchParams]);

  // Reset Filters
  const handleResetFilters = () => {
    setCountryQuery('');
    setSelectedCountries([]);
    setSelectedCountriesOnly(false);
    setCityQuery('');
    setSelectedCities([]);
    setStartingCity('All Starting Cities');
    setMaxPrice(7000);
    setMaxDays(30);
    setPrivatizableOnly(false);
    setRiverCruiseOnly(false);
    setLastMinuteOnly(false);
    setPreSalesOnly(false);
    setSelectedTravelTypes([]);
    setSelectedTripStyle('All');
  };

  // Toggle Country Tag
  const toggleCountry = (country) => {
    setSelectedCountries(prev => 
      prev.includes(country) ? prev.filter(c => c !== country) : [...prev, country]
    );
  };

  // Toggle City Tag
  const toggleCity = (city) => {
    setSelectedCities(prev => 
      prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]
    );
  };

  // Toggle Travel Type
  const toggleTravelType = (typeId) => {
    setSelectedTravelTypes(prev => 
      prev.includes(typeId) ? prev.filter(t => t !== typeId) : [...prev, typeId]
    );
  };

  // Filtered and Sorted Tours
  const filteredTours = useMemo(() => {
    return INITIAL_TOURS.filter(tour => {
      // Countries filter
      if (selectedCountries.length > 0) {
        if (selectedCountriesOnly) {
          const hasAll = selectedCountries.every(c => tour.countries.includes(c));
          if (!hasAll) return false;
        } else {
          const hasAny = selectedCountries.some(c => tour.countries.includes(c));
          if (!hasAny) return false;
        }
      }

      // Cities filter
      if (selectedCities.length > 0) {
        const hasCity = selectedCities.some(c => tour.cities.includes(c));
        if (!hasCity) return false;
      }

      // Starting City filter
      if (startingCity !== 'All Starting Cities' && tour.startingCity !== startingCity) {
        return false;
      }

      // Price filter
      if (tour.price > maxPrice) return false;

      // Days filter
      if (tour.days > maxDays) return false;

      // Checkboxes
      if (privatizableOnly && !tour.privatizable) return false;
      if (riverCruiseOnly && !tour.riverCruise) return false;
      if (lastMinuteOnly && !tour.lastMinute) return false;
      if (preSalesOnly && !tour.preSales) return false;

      // Travel Type
      if (selectedTravelTypes.length > 0) {
        const hasType = selectedTravelTypes.some(t => tour.travelType.includes(t));
        if (!hasType) return false;
      }

      // Trip Style
      if (selectedTripStyle !== 'All' && tour.tripStyle !== selectedTripStyle) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'name-asc') return a.title.localeCompare(b.title);
      if (sortBy === 'name-desc') return b.title.localeCompare(a.title);
      if (sortBy === 'days-asc') return a.days - b.days;
      if (sortBy === 'days-desc') return b.days - a.days;
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });
  }, [
    selectedCountries, 
    selectedCountriesOnly, 
    selectedCities, 
    startingCity, 
    maxPrice, 
    maxDays, 
    privatizableOnly, 
    riverCruiseOnly, 
    lastMinuteOnly, 
    preSalesOnly, 
    selectedTravelTypes, 
    selectedTripStyle, 
    sortBy
  ]);

  return (
    <div className="animate-fadeIn bg-[#fbfaf8] font-sans text-gray-800 overflow-x-hidden min-h-screen">
      
      {/* 1. Hero Section matching Image 2 */}
      <section className="relative h-[55vh] min-h-[460px] flex flex-col justify-end">
        <div className="absolute inset-0 z-0 bg-[#0a1712]">
          <img
            src="/assets/images/backpacker_bg.jpg"
            alt="Coach Tour Details"
            className="w-full h-full object-cover opacity-80"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/assets/images/corporate-travel.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10221b] via-[#10221b]/40 to-black/60"></div>
        </div>
        
        {/* Content with exact breadcrumb from Image 2 */}
        <div className="relative z-10 text-white mt-16 flex flex-col items-center pb-32 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-[60px] font-bold tracking-wider mb-4 drop-shadow-xl font-serif">
            Coach Tour Details
          </h1>
          <div className="flex items-center justify-center gap-2.5 text-sm md:text-base font-light drop-shadow-md tracking-wider">
            <Link to="/" className="hover:text-[#27B8B1] transition-colors">Home</Link>
            <span className="text-gray-300 text-xs">▾</span>
            <Link to="/coach-tour" className="hover:text-[#27B8B1] transition-colors">Coach Tour</Link>
            <span className="text-gray-300 text-xs">▾</span>
            <span className="text-[#27B8B1] font-medium">Coach Tour Details</span>
          </div>
        </div>

        {/* Curved Wave Mask */}
        <HeroWave />
      </section>

      {/* 2. Top Purple Utility Bar matching Image 2 */}
      <div className="bg-[#6b2c6b] text-white py-2 px-4 sm:px-8 text-xs font-medium relative z-20">
        <div className="max-w-[1400px] mx-auto flex items-center justify-end gap-6">
          <button 
            onClick={handleResetFilters}
            className="flex items-center gap-1.5 hover:text-[#27B8B1] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>New Search</span>
          </button>
          <span className="opacity-40">|</span>
          <button 
            onClick={() => alert("Cookie preferences saved.")}
            className="hover:text-[#27B8B1] transition-colors cursor-pointer"
          >
            Cookies
          </button>
        </div>
      </div>

      {/* 3. Main Multi Filter Section matching Image 2 */}
      <section className="bg-[#242f35] text-white py-8 px-4 sm:px-6 lg:px-8 shadow-xl relative z-20">
        <div className="max-w-[1400px] mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Col 1: Multi Filter Title & Inputs (4 cols) */}
            <div className="lg:col-span-4 space-y-5">
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                  Multi Filter
                </h3>
                {/* Purple decorative underline with downward notch matching Image 2 */}
                <div className="relative mt-2 mb-4">
                  <div className="w-40 h-[3px] bg-[#8e24aa]"></div>
                  <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#8e24aa] ml-6"></div>
                </div>
              </div>

              {/* Country Input */}
              <div className="space-y-1.5">
                <div className="relative">
                  <input
                    type="text"
                    value={countryQuery}
                    onChange={(e) => setCountryQuery(e.target.value)}
                    placeholder="Choose countries..."
                    className="w-full bg-white text-gray-800 text-sm px-4 py-2.5 rounded shadow-inner focus:outline-none focus:ring-2 focus:ring-[#8e24aa]"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
                </div>

                {/* Country Pill Suggestions */}
                <div className="flex flex-wrap gap-1.5 pt-1 max-h-24 overflow-y-auto pr-1">
                  {ALL_COUNTRIES
                    .filter(c => c.toLowerCase().includes(countryQuery.toLowerCase()))
                    .slice(0, 8)
                    .map(c => {
                      const isSel = selectedCountries.includes(c);
                      return (
                        <button
                          key={c}
                          onClick={() => toggleCountry(c)}
                          className={`text-[11px] px-2 py-0.5 rounded transition-all ${
                            isSel 
                              ? 'bg-[#8e24aa] text-white font-semibold' 
                              : 'bg-white/10 text-gray-300 hover:bg-white/20'
                          }`}
                        >
                          {isSel ? `✓ ${c}` : c}
                        </button>
                      );
                    })}
                </div>

                <label className="flex items-center gap-2 text-xs text-gray-300 pt-1 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={selectedCountriesOnly}
                    onChange={(e) => setSelectedCountriesOnly(e.target.checked)}
                    className="rounded border-gray-400 text-[#8e24aa] focus:ring-[#8e24aa] w-3.5 h-3.5"
                  />
                  <span>Selected countries only</span>
                </label>
              </div>

              {/* City Input */}
              <div className="space-y-1.5">
                <div className="relative">
                  <input
                    type="text"
                    value={cityQuery}
                    onChange={(e) => setCityQuery(e.target.value)}
                    placeholder="Choose cities..."
                    className="w-full bg-white text-gray-800 text-sm px-4 py-2.5 rounded shadow-inner focus:outline-none focus:ring-2 focus:ring-[#8e24aa]"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
                </div>
                {/* City Suggestions */}
                {cityQuery && (
                  <div className="flex flex-wrap gap-1 pt-1 max-h-20 overflow-y-auto">
                    {ALL_CITIES
                      .filter(ct => ct.toLowerCase().includes(cityQuery.toLowerCase()))
                      .slice(0, 6)
                      .map(ct => (
                        <button
                          key={ct}
                          onClick={() => { toggleCity(ct); setCityQuery(''); }}
                          className="text-[10px] bg-white/10 text-gray-200 px-2 py-0.5 rounded hover:bg-[#8e24aa]"
                        >
                          + {ct}
                        </button>
                      ))}
                  </div>
                )}
                {selectedCities.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {selectedCities.map(ct => (
                      <span key={ct} className="text-[11px] bg-[#8e24aa] text-white px-2 py-0.5 rounded flex items-center gap-1">
                        {ct}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => toggleCity(ct)} />
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Starting City Dropdown */}
              <div className="space-y-1">
                <span className="text-xs text-[#b39ddb] font-medium block">Starting at:</span>
                <div className="relative">
                  <select
                    value={startingCity}
                    onChange={(e) => setStartingCity(e.target.value)}
                    className="w-full bg-white text-gray-800 text-sm px-4 py-2.5 rounded appearance-none shadow-inner focus:outline-none focus:ring-2 focus:ring-[#8e24aa] cursor-pointer"
                  >
                    {STARTING_CITIES.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-500 absolute right-3 top-3.5 pointer-events-none" />
                </div>
              </div>

            </div>

            {/* Col 2: Price Range & Days Range (4 cols) */}
            <div className="lg:col-span-4 space-y-7">
              
              {/* Price Range */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-[#ce93d8] tracking-wide">
                  Price Range:
                </h4>
                
                <div className="flex items-center justify-between text-xs text-gray-300 font-medium">
                  <span>€ 0</span>
                  <span className="bg-[#8e24aa] text-white font-bold px-2.5 py-0.5 rounded-full text-xs">
                    0 : {maxPrice.toLocaleString()}
                  </span>
                  <span>€ 7,000</span>
                </div>

                <input
                  type="range"
                  min="500"
                  max="7000"
                  step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#8e24aa] cursor-pointer h-2 bg-gray-600 rounded-lg"
                />

                {/* Checkboxes below Price */}
                <div className="space-y-2 pt-1 text-xs text-gray-200">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={privatizableOnly}
                      onChange={(e) => setPrivatizableOnly(e.target.checked)}
                      className="rounded border-gray-400 text-[#8e24aa] focus:ring-[#8e24aa] w-3.5 h-3.5"
                    />
                    <span className="flex items-center gap-1">
                      Privatizable <Info className="w-3 h-3 text-gray-400" />
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={riverCruiseOnly}
                      onChange={(e) => setRiverCruiseOnly(e.target.checked)}
                      className="rounded border-gray-400 text-[#8e24aa] focus:ring-[#8e24aa] w-3.5 h-3.5"
                    />
                    <span>River Cruises</span>
                  </label>
                </div>
              </div>

              {/* Days Range */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-[#ce93d8] tracking-wide">
                  Days Range:
                </h4>

                <div className="flex items-center justify-between text-xs text-gray-300 font-medium">
                  <span>0</span>
                  <span className="bg-[#8e24aa] text-white font-bold px-2.5 py-0.5 rounded-full text-xs">
                    0 : {maxDays}
                  </span>
                  <span>30</span>
                </div>

                <input
                  type="range"
                  min="3"
                  max="30"
                  step="1"
                  value={maxDays}
                  onChange={(e) => setMaxDays(Number(e.target.value))}
                  className="w-full accent-[#8e24aa] cursor-pointer h-2 bg-gray-600 rounded-lg"
                />

                {/* Checkboxes below Days */}
                <div className="space-y-2 pt-1 text-xs text-gray-200">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={lastMinuteOnly}
                      onChange={(e) => setLastMinuteOnly(e.target.checked)}
                      className="rounded border-gray-400 text-[#8e24aa] focus:ring-[#8e24aa] w-3.5 h-3.5"
                    />
                    <span>Last Minute</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={preSalesOnly}
                      onChange={(e) => setPreSalesOnly(e.target.checked)}
                      className="rounded border-gray-400 text-[#8e24aa] focus:ring-[#8e24aa] w-3.5 h-3.5"
                    />
                    <span className="flex items-center gap-1">
                      Pre-sales 27/28 <Info className="w-3 h-3 text-gray-400" />
                    </span>
                  </label>
                </div>
              </div>

            </div>

            {/* Col 3: Travel Type Checkbox Grid (4 cols) */}
            <div className="lg:col-span-4 space-y-5">
              <h4 className="text-sm font-semibold text-[#ce93d8] tracking-wide">
                Travel Type
              </h4>

              {/* 2-Column Checkboxes matching Image 2 */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-xs text-gray-200">
                {TRAVEL_TYPES.map(tt => {
                  const isChecked = selectedTravelTypes.includes(tt.id);
                  return (
                    <label key={tt.id} className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleTravelType(tt.id)}
                        className="rounded border-gray-400 text-[#8e24aa] focus:ring-[#8e24aa] w-3.5 h-3.5"
                      />
                      <span className="flex items-center gap-1 text-gray-300 hover:text-white">
                        {tt.label}
                        {tt.info && <Info className="w-3 h-3 text-gray-400" title={tt.info} />}
                      </span>
                    </label>
                  );
                })}
              </div>

              {/* Trip Styles Button & Pills */}
              <div className="pt-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3.5 py-1.5 rounded bg-[#8e24aa] text-white text-xs font-bold tracking-wider shadow">
                    Trip Styles
                  </span>
                  {["All", "Scenic & Mountains", "Cultural Heritage", "Lakes & Romance", "Islands & Coastlines"].map(style => (
                    <button
                      key={style}
                      onClick={() => setSelectedTripStyle(style)}
                      className={`text-[11px] px-2.5 py-1 rounded transition-all ${
                        selectedTripStyle === style
                          ? 'bg-white text-gray-900 font-bold'
                          : 'bg-white/10 text-gray-300 hover:bg-white/20'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Results Bar & Sorting Toolbar matching Image 2 */}
      <section className="bg-[#37474f] text-white py-3 px-4 sm:px-8 border-t border-gray-600 relative z-20">
        <div className="max-w-[1400px] mx-auto flex flex-wrap items-center justify-between gap-4">
          
          {/* Left: Total Tours Count */}
          <div className="flex items-center gap-3">
            <span className="text-xl sm:text-2xl font-bold tracking-tight text-white font-sans">
              {filteredTours.length} Tours
            </span>
            <span className="text-xs text-gray-300 hidden sm:inline">
              available across Europe & worldwide
            </span>
          </div>

          {/* Right: Sort Pills & View Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Sort: Name */}
            <button
              onClick={() => setSortBy(p => p === 'name-asc' ? 'name-desc' : 'name-asc')}
              className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1 transition-all ${
                sortBy.startsWith('name') 
                  ? 'bg-[#8e24aa] text-white shadow' 
                  : 'bg-white/15 text-gray-200 hover:bg-white/25'
              }`}
            >
              <span>Name</span>
              <span>{sortBy === 'name-asc' ? '↑' : '↓'}</span>
            </button>

            {/* Sort: Days */}
            <button
              onClick={() => setSortBy(p => p === 'days-asc' ? 'days-desc' : 'days-asc')}
              className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1 transition-all ${
                sortBy.startsWith('days') 
                  ? 'bg-[#8e24aa] text-white shadow' 
                  : 'bg-white text-gray-800 hover:bg-gray-100'
              }`}
            >
              <span>Days</span>
              <span>{sortBy === 'days-asc' ? '↑' : sortBy === 'days-desc' ? '↓' : '↕'}</span>
            </button>

            {/* Sort: Price */}
            <button
              onClick={() => setSortBy(p => p === 'price-asc' ? 'price-desc' : 'price-asc')}
              className={`px-3 py-1.5 rounded text-xs font-semibold flex items-center gap-1 transition-all ${
                sortBy.startsWith('price') 
                  ? 'bg-[#8e24aa] text-white shadow' 
                  : 'bg-white text-gray-800 hover:bg-gray-100'
              }`}
            >
              <span>Price</span>
              <span>{sortBy === 'price-asc' ? '↑' : sortBy === 'price-desc' ? '↓' : '↕'}</span>
            </button>

            {/* Grid / List View Toggle */}
            <div className="flex items-center bg-[#8e24aa] rounded overflow-hidden ml-2 shadow">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 transition-colors ${viewMode === 'grid' ? 'bg-[#6a1b9a] text-white' : 'text-white/80 hover:text-white'}`}
                title="Grid View"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 transition-colors ${viewMode === 'list' ? 'bg-[#6a1b9a] text-white' : 'text-white/80 hover:text-white'}`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Tours Listing Grid / List */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto relative z-10">
        
        {filteredTours.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-md max-w-xl mx-auto border border-gray-100 my-8">
            <Bus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Coach Tours Match Your Filters</h3>
            <p className="text-gray-500 text-sm mb-6">
              Try adjusting your price range, selected countries, or travel types to see more available escorted tours.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 bg-[#8e24aa] text-white rounded-full text-xs uppercase font-bold tracking-wider hover:bg-[#7b1fa2] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className={
            viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              : "space-y-6"
          }>
            {filteredTours.map((tour) => (
              <div
                key={tour.id}
                className={`bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group flex ${
                  viewMode === 'grid' ? 'flex-col' : 'flex-col md:flex-row'
                }`}
              >
                {/* Tour Card Image */}
                <div className={`relative overflow-hidden ${
                  viewMode === 'grid' ? 'h-64 w-full' : 'h-64 md:h-auto md:w-80 shrink-0'
                }`}>
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Tag badge */}
                  {tour.tag && (
                    <span className="absolute top-3 left-3 bg-[#10221b]/80 backdrop-blur-md text-[#27B8B1] border border-[#27B8B1]/40 text-[11px] font-bold px-3 py-1 rounded-full">
                      {tour.tag}
                    </span>
                  )}

                  {/* Duration Badge */}
                  <span className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#27B8B1]" />
                    {tour.days} Days / {tour.nights} Nights
                  </span>
                </div>

                {/* Tour Content */}
                <div className="p-6 flex flex-col justify-between flex-1 space-y-4">
                  <div>
                    {/* Country Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {tour.countries.map(c => (
                        <span key={c} className="text-[10px] uppercase font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                          {c}
                        </span>
                      ))}
                      <span className="text-[10px] uppercase font-bold text-[#8e24aa] bg-[#8e24aa]/10 px-2 py-0.5 rounded">
                        Starts: {tour.startingCity}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#10221b] group-hover:text-[#5e963b] transition-colors leading-snug mb-2 font-serif">
                      {tour.title}
                    </h3>

                    {/* Route summary */}
                    <p className="text-xs text-gray-500 font-light leading-relaxed mb-3 flex items-start gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#27B8B1] shrink-0 mt-0.5" />
                      <span>{tour.route}</span>
                    </p>

                    <p className="text-gray-600 text-xs leading-relaxed line-clamp-2 font-light">
                      {tour.description}
                    </p>
                  </div>

                  {/* Inclusions bullets */}
                  <div className="pt-2 border-t border-gray-100">
                    <div className="grid grid-cols-2 gap-1.5 text-[11px] text-gray-600">
                      <span className="flex items-center gap-1">
                        <Bus className="w-3 h-3 text-[#5e963b]" /> AC Luxury Coach
                      </span>
                      <span className="flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-[#5e963b]" /> Tour Director
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-[#5e963b]" /> 4★ Hotels
                      </span>
                      <span className="flex items-center gap-1">
                        <Check className="w-3 h-3 text-[#5e963b]" /> Breakfasts Included
                      </span>
                    </div>
                  </div>

                  {/* Pricing & CTA */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase text-gray-400 block">From</span>
                      <span className="text-2xl font-bold text-[#10221b] font-sans">
                        € {tour.price.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-gray-400 block">per person</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveTourModal(tour)}
                        className="px-4 py-2 rounded-full border border-[#27B8B1] text-[#27B8B1] hover:bg-[#27B8B1] hover:text-white text-xs font-bold uppercase tracking-wider transition-all"
                      >
                        Itinerary
                      </button>

                      <button
                        onClick={() => openEnquiryModal({ 
                          title: `Coach Tour: ${tour.title}`, 
                          destination: tour.title 
                        })}
                        className="px-5 py-2 rounded-full bg-[#10221b] text-white hover:bg-[#5e963b] text-xs font-bold uppercase tracking-wider transition-all shadow"
                      >
                        Book
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </section>

      {/* 6. Itinerary Detail Modal */}
      {activeTourModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative">
            
            {/* Modal Header */}
            <div className="relative h-48 sm:h-56 shrink-0 bg-[#10221b]">
              <img
                src={activeTourModal.image}
                alt={activeTourModal.title}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

              <button
                onClick={() => setActiveTourModal(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-[#27B8B1] transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white">
                <span className="text-[#27B8B1] text-xs uppercase tracking-widest font-bold block mb-1">
                  {activeTourModal.days} Days Escorted Coach Tour • Starting in {activeTourModal.startingCity}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-serif leading-tight drop-shadow">
                  {activeTourModal.title}
                </h2>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              
              {/* Route & Price Summary */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                <div>
                  <span className="text-xs text-gray-500 uppercase block font-semibold">Route</span>
                  <span className="text-sm font-bold text-gray-800">{activeTourModal.route}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-gray-500 uppercase block font-semibold">Starting From</span>
                  <span className="text-2xl font-bold text-[#5e963b]">€ {activeTourModal.price.toLocaleString()}</span>
                </div>
              </div>

              {/* Inclusions */}
              <div>
                <h4 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#f29727]" />
                  What's Included in This Tour
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
                  {activeTourModal.inclusions?.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2 bg-white p-2 rounded border border-gray-100">
                      <Check className="w-4 h-4 text-[#5e963b] shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Day-by-Day Itinerary */}
              <div>
                <h4 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#27B8B1]" />
                  Day-by-Day Tour Itinerary
                </h4>
                <div className="space-y-3">
                  {activeTourModal.itinerary?.map((item) => (
                    <div key={item.day} className="p-4 rounded-xl bg-white border border-gray-200 shadow-sm space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#10221b] text-white text-xs font-bold flex items-center justify-center shrink-0">
                          {item.day}
                        </span>
                        <h5 className="font-bold text-sm text-gray-900 font-sans">
                          {item.title}
                        </h5>
                      </div>
                      <p className="text-xs text-gray-600 pl-8 leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer CTA */}
            <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-4">
              <button
                onClick={() => setActiveTourModal(null)}
                className="text-xs text-gray-500 hover:text-gray-800 font-bold uppercase tracking-wider"
              >
                Close
              </button>

              <button
                onClick={() => {
                  const tour = activeTourModal;
                  setActiveTourModal(null);
                  openEnquiryModal({ 
                    title: `Coach Tour Enquiry: ${tour.title}`, 
                    destination: tour.title 
                  });
                }}
                className="px-8 py-3 bg-[#10221b] text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#5e963b] transition-all shadow-md flex items-center gap-2"
              >
                <span>Enquire &amp; Book Tour</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
