import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../../context/SiteSettingsContext';
import HeroWave from '../../components/common/HeroWave';

const CDN = 'https://blackforestholidays.com/wp-content/uploads';

export default function CruisesPage() {
  const { openEnquiryModal } = useSettings();
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselImages = [
    `${CDN}/2026/08/Untitled-design-54.png`,
    `${CDN}/2026/08/Untitled-design-52.png`,
    `${CDN}/2026/08/Untitled-design-51.png`,
    `${CDN}/2026/08/Untitled-design-53.png`,
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!carouselImages.length) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  const handleNext = () => setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  const handlePrev = () => setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);

  const getVisibleImages = () => {
    if (!carouselImages.length) return [];
    return [
      carouselImages[currentSlide],
      carouselImages[(currentSlide + 1) % carouselImages.length],
      carouselImages[(currentSlide + 2) % carouselImages.length],
    ];
  };

  return (
    <div className="animate-fadeIn bg-white font-sans text-gray-800 overflow-x-hidden">

      {/* 1. Hero Section (Matching Screenshot) */}
      <section className="relative h-[65vh] min-h-[500px] flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src={`${CDN}/2026/08/pexels-g-isle-px-210751289-11820070-scaled.jpg`}
            alt="Cruises"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/35 z-0" />
        </div>

        <div className="relative z-10 text-white flex flex-col items-center text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-[60px] font-bold tracking-tight mb-4 drop-shadow-xl font-sans">
            Cruises
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm md:text-base font-light drop-shadow-md tracking-wider">
            <Link to="/" className="hover:text-gray-200 transition-colors">Home</Link>
            <span className="text-[10px] opacity-80">▾</span>
            <span className="text-white">Cruises</span>
          </div>
        </div>

        {/* Hero Wave Divider */}
        <HeroWave />
      </section>

      {/* 2. Intro Section (Matching Screenshot) */}
      <section className="bg-white -mt-2 pb-16 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">

          {/* Row 1: Intro Text and Image with cyan border */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">
            <div className="space-y-8 lg:pr-4">
              <div>
                <span className="text-[#10221b] font-bold text-xs uppercase tracking-[0.2em] block mb-3">
                  Cruises
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold text-[#5e963b] leading-[1.15] mb-6">
                  Discover the World, One Extraordinary Journey at a Time
                </h2>
                <div className="w-24 h-[1.5px] bg-[#18c4c7] mb-8" />
              </div>

              <div className="space-y-6 text-gray-600 font-light leading-relaxed text-[20px]">
                <p>
                  Set sail on unforgettable journeys across the world’s most spectacular coastlines and destinations with our cruise ticket booking services. BlackForest Holidays creates personalised cruise holidays that combine exceptional accommodation, fine dining, entertainment, and extraordinary experiences, allowing you to explore multiple destinations in one seamless and memorable journey.
                </p>
              </div>
            </div>

            <div className="relative pl-6 pt-6 mt-8 lg:mt-0 w-full max-w-lg mx-auto lg:ml-auto">
              <div className="absolute top-0 left-0 w-[95%] h-[95%] border-[3px] border-[#18c4c7] z-0" />
              <img
                src={`${CDN}/2026/08/ChatGPT-Image-Aug-8-2026-06_20_36-PM.png`}
                alt="Discover the World on Cruises"
                className="relative z-10 w-full h-auto object-cover shadow-sm bg-white p-2 aspect-[4/3]"
              />
            </div>
          </div>

          {/* Row 2: Subsequent Content */}
          <div className="space-y-10">
            <div>
              <h3 className="text-xl sm:text-2xl font-sans font-bold text-[#10221b] mb-3">
                Cruising, Curated Around You
              </h3>
              <p className="text-gray-600 font-light leading-relaxed text-[20px]">
                Whether you’re looking for a romantic escape, a family adventure, a luxury voyage, or a group holiday, we help you choose the right cruise, itinerary, cabin, and experiences to match your travel style.
              </p>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-sans font-bold text-[#10221b] mb-4">
                Our Cruise Experiences
              </h3>
              <ul className="space-y-3">
                <li className="text-gray-600 font-light leading-relaxed text-[20px]">
                  <span className="text-gray-800 font-bold">1. Luxury Cruises</span> — Experience world-class service, elegant accommodation, exceptional dining, and unforgettable destinations.
                </li>
                <li className="text-gray-600 font-light leading-relaxed text-[20px]">
                  <span className="text-gray-800 font-bold">2. Family Cruises</span> — Enjoy family-friendly entertainment, activities, facilities, and itineraries designed for every generation.
                </li>
                <li className="text-gray-600 font-light leading-relaxed text-[20px]">
                  <span className="text-gray-800 font-bold">3. Honeymoon Cruises</span> — Celebrate your new beginning with romantic destinations, ocean views, private experiences, and unforgettable moments.
                </li>
                <li className="text-gray-600 font-light leading-relaxed text-[20px]">
                  <span className="text-gray-800 font-bold">4. River Cruises</span> — Discover Europe’s iconic rivers and historic cities through relaxed, scenic journeys.
                </li>
                <li className="text-gray-600 font-light leading-relaxed text-[20px]">
                  <span className="text-gray-800 font-bold">5. Ocean Cruises</span> — Explore spectacular coastlines, islands, and international destinations aboard some of the world’s finest cruise ships.
                </li>
                <li className="text-gray-600 font-light leading-relaxed text-[20px]">
                  <span className="text-gray-800 font-bold">6. Expedition Cruises</span> — Go beyond the ordinary with extraordinary journeys to remote landscapes and remarkable destinations.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-sans font-bold text-[#10221b] mb-3">
                Explore Extraordinary Destinations
              </h3>
              <p className="text-gray-600 font-light leading-relaxed text-[20px]">
                Discover the Mediterranean, Northern Europe, Alaska, the Caribbean, Southeast Asia, the Middle East, Australia &amp; New Zealand, and destinations across the world. From island-hopping through the Mediterranean to exploring the fjords of Norway or relaxing among the turquoise waters of the Caribbean, we help you find the cruise that fits your journey.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Carousel Section (Matching Screenshot) */}
      <section className="relative py-20 overflow-hidden group">
        <div className="absolute inset-0 w-full h-full flex z-0 pointer-events-none">
          <div className="w-[30%] h-full bg-[#f6f6f6]" />
          <div className="w-[70%] h-full bg-white" />
        </div>

        <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 relative z-10 flex items-center justify-between gap-4 md:gap-8">
          <button
            onClick={handlePrev}
            className="z-20 flex items-center justify-center text-[#10221b] hover:text-[#5e963b] transition-all transform hover:scale-110 hover:-translate-x-2 shrink-0 cursor-pointer"
            aria-label="Previous image"
          >
            <svg viewBox="0 0 100 40" className="w-16 h-16 sm:w-24 sm:h-24 stroke-current fill-none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M90 20 Q 55 18 10 20" />
              <path d="M 12 20 Q 25 12 30 7" />
              <path d="M 12 20 Q 25 28 30 33" />
            </svg>
          </button>

          <div className="flex-1 overflow-hidden px-2">
            <div className="flex justify-center gap-4 sm:gap-6 md:gap-10 transition-all duration-700 ease-in-out">
              {getVisibleImages().map((img, idx) => (
                <div key={`${currentSlide}-${idx}`} className="w-1/3 max-w-[400px] aspect-square overflow-hidden shadow-lg animate-fadeIn flex-shrink-0">
                  <img src={img} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            className="z-20 flex items-center justify-center text-[#10221b] hover:text-[#5e963b] transition-all transform hover:scale-110 hover:translate-x-2 shrink-0 cursor-pointer"
            aria-label="Next image"
          >
            <svg viewBox="0 0 100 40" className="w-16 h-16 sm:w-24 sm:h-24 stroke-current fill-none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 20 Q 45 22 90 20" />
              <path d="M 88 20 Q 75 12 70 7" />
              <path d="M 88 20 Q 75 28 70 33" />
            </svg>
          </button>
        </div>
      </section>

      {/* 4. Why Choose Us Section (Matching Screenshot) */}
      <section className="py-24 bg-white relative z-10 overflow-hidden">
        {/* Pine Tree Background Silhouette on Right Edge */}
        <div className="absolute right-0 top-0 bottom-0 w-72 md:w-96 pointer-events-none opacity-25 z-0 overflow-hidden">
          <img
            src={`${CDN}/2026/08/contact-pine-bg-2.jpg`}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-left"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-[#5e963b] mb-4">
            Why Choose BlackForest Holidays?
          </h2>
          <div className="w-16 h-[2px] bg-[#18c4c7] mb-12" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 max-w-4xl">
            <div>
              <h4 className="text-[19px] font-bold text-[#10221b] mb-2 font-sans">
                Expert Cruise Selection
              </h4>
              <p className="text-gray-600 font-light leading-relaxed text-[20px]">
                We help you choose the right cruise line, ship, itinerary, and cabin based on your preferences.
              </p>
            </div>

            <div>
              <h4 className="text-[19px] font-bold text-[#10221b] mb-2 font-sans">
                Personalised Planning
              </h4>
              <p className="text-gray-600 font-light leading-relaxed text-[20px]">
                Every cruise journey can be tailored with flights, hotels, transfers, excursions, and pre- or post-cruise stays.
              </p>
            </div>

            <div>
              <h4 className="text-[19px] font-bold text-[#10221b] mb-2 font-sans">
                Complete Travel Support
              </h4>
              <p className="text-gray-600 font-light leading-relaxed text-[20px]">
                From booking to boarding, our team helps coordinate the essential details of your journey.
              </p>
            </div>

            <div>
              <h4 className="text-[19px] font-bold text-[#10221b] mb-2 font-sans">
                Curated Experiences
              </h4>
              <p className="text-gray-600 font-light leading-relaxed text-[20px]">
                Make the most of every destination with carefully selected shore excursions and travel experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Bottom Section: 3-Column Layout Matching Screenshot */}
      <section className="py-24 bg-white relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

            {/* Column 1: Left - Heading, Text, CTA (Span 4) */}
            <div className="lg:col-span-4 space-y-6">
              <div>
                <h3 className="text-3xl md:text-[36px] font-sans font-bold text-[#5e963b] leading-tight mb-4">
                  Your Journey Begins at Sea
                </h3>
                <div className="w-16 h-[2px] bg-[#18c4c7]" />
              </div>

              <p className="text-gray-600 font-light leading-relaxed text-[20px]">
                Whether you’re dreaming of a romantic Mediterranean voyage, a family cruise through the Caribbean, a luxury river journey through Europe, or an expedition to the world’s remote corners, BlackForest Holidays helps turn your cruise dreams into an extraordinary journey.
              </p>

              <div className="pt-4">
                <h4 className="text-sm font-bold text-[#10221b] uppercase tracking-[0.15em] mb-4">
                  Sail Further, Discover More.
                </h4>
                <button
                  onClick={() => openEnquiryModal({ title: 'Cruise Holidays Enquiry' })}
                  className="bg-[#10221b] text-white px-7 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-[#5e963b] transition-colors shadow-md rounded-sm cursor-pointer"
                >
                  Explore Cruise Holidays &rarr;
                </button>
              </div>
            </div>

            {/* Column 2: Center - Two stacked horizontal images (Span 4) */}
            <div className="lg:col-span-4 space-y-6 pt-4 lg:pt-16">
              <div className="overflow-hidden rounded-sm shadow-md">
                <img
                  src={`${CDN}/2026/08/Horizon-Lounge-Dining-Venue-copy-scaled.avif`}
                  alt="Horizon Lounge Dining Venue"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="overflow-hidden rounded-sm shadow-md">
                <img
                  src={`${CDN}/2026/08/pngtree-cruise-ship-that-is-sitting-on-a-tropical-island-image_2615573.jpg`}
                  alt="Cruise Ship Tropical Island"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Column 3: Right - Tall cruise ship + Compass watermark + Vision Heading (Span 4) */}
            <div className="lg:col-span-4 relative space-y-6">
              {/* Compass Watermark */}
              <div
                className="absolute -top-10 -right-10 w-64 h-64 opacity-15 pointer-events-none bg-contain bg-no-repeat z-0"
                style={{ backgroundImage: `url('${CDN}/2021/07/about-compass.jpg')` }}
              />
              <div className="relative z-10 overflow-hidden rounded-sm shadow-md">
                <img
                  src={`${CDN}/2026/08/ChatGPT-Image-Aug-8-2026-06_49_29-PM.png`}
                  alt="Cruise Ship Voyage"
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="relative z-10 pt-2">
                <h4 className="text-[#5e963b] text-2xl sm:text-[28px] font-bold leading-tight font-sans">
                  A Vision Created For The Activities To Make Sure You Enjoy &amp; Get Thrilled.
                </h4>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
