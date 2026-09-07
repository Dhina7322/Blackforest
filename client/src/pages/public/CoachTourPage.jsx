import React, { useState } from 'react';
import { useSettings } from '../../context/SiteSettingsContext';
import HeroWave from '../../components/common/HeroWave';
import ExpertiseSection from '../../components/home/ExpertiseSection';
import { ChevronRight, ChevronLeft, MapPin, Calendar, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CoachTourPage() {
  const { settings, openEnquiryModal } = useSettings();
  const siteName = settings?.siteName || 'Blackforest Holidays';

  const packages = [
    {
      id: 1,
      title: "France and Swiss Alps",
      duration: "10 nights / 11 days",
      image: "/assets/images/village-zermatt-matterhorn-switzerland.jpg",
      route: "Paris • Geneva • Interlaken • Zermatt • Zurich",
      tag: "Best Seller"
    },
    {
      id: 2,
      title: "France & Switzerland with Enchanted Alsace",
      duration: "6 nights / 7 days",
      image: "/assets/images/snow-dusts-spires-famed-neuschwanstein-castle.jpg",
      route: "Strasbourg • Colmar • Lucerne • Rhine Falls",
      tag: "Scenic Route"
    },
    {
      id: 3,
      title: "Swiss and Italian Spotlight & Venice",
      duration: "8 nights / 9 days",
      image: "/assets/images/aditya-siva-6rDbvXzIVpQ-unsplash-1-scaled.jpg",
      route: "Milan • Lake Como • Venice • Dolomites • Verona",
      tag: "Cultural Classic"
    },
    {
      id: 4,
      title: "Imperial Europe & Romantic Castles",
      duration: "9 nights / 10 days",
      image: "/assets/images/bridge_bg.jpg",
      route: "Vienna • Prague • Budapest • Salzburg • Munich",
      tag: "Heritage"
    }
  ];

  const [activeIdx, setActiveIdx] = useState(0);

  const nextPackage = () => {
    setActiveIdx((prev) => (prev >= packages.length - 1 ? 0 : prev + 1));
  };

  const prevPackage = () => {
    setActiveIdx((prev) => (prev <= 0 ? packages.length - 1 : prev - 1));
  };

  return (
    <div className="animate-fadeIn bg-[#fbfaf8] font-sans text-gray-800 overflow-x-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative h-[65vh] min-h-[500px] flex flex-col justify-end">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 bg-[#0a1712]">
          <img
            src="/assets/images/backpacker_bg.jpg"
            alt="Coach Tour"
            className="w-full h-full object-cover opacity-80"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/assets/images/corporate-travel.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10221b] via-[#10221b]/40 to-black/60"></div>
        </div>
        
        {/* Content with breadcrumb */}
        <div className="relative z-10 text-white mt-16 flex flex-col items-center pb-32 text-center">
          <span className="text-[#f29727] text-xs uppercase font-bold tracking-[0.25em] mb-2">
            Escorted Group Journeys
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-[60px] font-bold tracking-wider mb-4 drop-shadow-xl font-serif">
            Coach Tours
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm md:text-base font-light drop-shadow-md tracking-wider">
            <Link to="/" className="hover:text-gray-200 transition-colors">Home</Link>
            <span className="text-gray-300">&gt;</span>
            <span className="text-[#f29727]">Coach Tour</span>
          </div>
        </div>

        {/* Wavy Top SVG Mask */}
        <HeroWave />
      </section>

      {/* 2. Popular Packages */}
      <section className="py-20 relative z-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-3xl shadow-lg p-8 sm:p-12 lg:p-16 relative border border-gray-100">
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 items-start">
            
            {/* Left Title & Intro */}
            <div className="lg:col-span-1 space-y-5">
              <span 
                className="text-2xl sm:text-[26px] block mb-1"
                style={{
                  fontFamily: "var(--font-cursive, 'Caveat', cursive, serif)",
                  color: "#27B8B1"
                }}
              >
                European Panorama
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-[#5e963b] leading-tight font-serif">
                Popular<br/>Packages
              </h2>
              <div className="w-12 h-[2px] bg-[#f29727]"></div>
              <p className="text-gray-600 text-sm font-light leading-relaxed pt-2">
                Handcrafted escorted coach tours across Europe and iconic world destinations. Enjoy luxury air-conditioned coaches, expert local tour directors, and reserved hotel accommodations.
              </p>
              
              <div className="pt-4">
                <button
                  onClick={() => openEnquiryModal({ destination: 'Coach Tours' })}
                  className="px-6 py-3 bg-[#10221b] hover:bg-[#5e963b] text-white text-xs font-bold uppercase tracking-widest rounded-sm transition-all shadow-md cursor-pointer"
                >
                  Custom Coach Enquiry
                </button>
              </div>
            </div>

            {/* Right Packages Grid / Carousel */}
            <div className="lg:col-span-3 relative">
              {/* Carousel Controls */}
              <div className="flex items-center justify-end gap-3 mb-6">
                <button 
                  onClick={prevPackage}
                  aria-label="Previous package"
                  className="w-10 h-10 bg-white rounded-full shadow-md border border-gray-100 flex items-center justify-center text-gray-700 hover:text-[#5e963b] hover:border-[#5e963b] transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={nextPackage}
                  aria-label="Next package"
                  className="w-10 h-10 bg-white rounded-full shadow-md border border-gray-100 flex items-center justify-center text-gray-700 hover:text-[#5e963b] hover:border-[#5e963b] transition-all cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {packages.map((pkg) => (
                  <div 
                    key={pkg.id} 
                    onClick={() => openEnquiryModal({ destination: pkg.title })}
                    className="relative rounded-2xl overflow-hidden shadow-md group cursor-pointer border border-gray-100 bg-white flex flex-col h-[460px] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#f29727]/40"
                  >
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden bg-gray-100">
                      <img 
                        src={pkg.image} 
                        alt={pkg.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                      
                      {/* Tag */}
                      <div className="absolute top-3 left-3 bg-[#10221b]/80 backdrop-blur-md text-[#f29727] text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                        {pkg.tag}
                      </div>

                      {/* Duration */}
                      <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-xs font-medium">
                        <Calendar className="w-3.5 h-3.5 text-[#f29727]" />
                        <span>{pkg.duration}</span>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-bold text-[#10221b] text-lg group-hover:text-[#5e963b] transition-colors line-clamp-2 font-serif mb-2">
                          {pkg.title}
                        </h3>
                        <p className="text-gray-500 text-xs flex items-start gap-1.5 font-light leading-relaxed">
                          <MapPin className="w-3.5 h-3.5 text-[#f29727] shrink-0 mt-0.5" />
                          <span>{pkg.route}</span>
                        </p>
                      </div>

                      <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#5e963b] group-hover:text-[#f29727] transition-colors">
                          Enquire Now
                        </span>
                        <div className="w-7 h-7 rounded-full bg-gray-50 group-hover:bg-[#f29727] group-hover:text-white flex items-center justify-center transition-colors">
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Expertise Section */}
      <ExpertiseSection />
      
    </div>
  );
}
