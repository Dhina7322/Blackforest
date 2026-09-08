import React from 'react';
import HeroWave from '../../components/common/HeroWave';
import ExpertiseSection from '../../components/home/ExpertiseSection';
import TestimonialSlider from '../../components/home/TestimonialSlider';
import { useSettings } from '../../context/SiteSettingsContext';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  const { settings, openEnquiryModal } = useSettings();
  const siteName = settings?.siteName || 'Blackforest Holidays';

  const pillars = [
    {
      icon: '/assets/images/about-icon-1.png',
      title: 'Bespoke Itineraries',
      desc: 'Crafted around your pace, preferences, and personal travel style.'
    },
    {
      icon: '/assets/images/about-icon-2.png',
      title: 'Best Value & Fares',
      desc: 'Direct partner pricing and exclusive negotiated luxury rates.'
    },
    {
      icon: '/assets/images/about-icon-3.png',
      title: '24/7 Global Support',
      desc: 'Dedicated concierge advisors on call throughout your entire trip.'
    },
    {
      icon: '/assets/images/about-icon-4.png',
      title: 'Handpicked Stays',
      desc: 'Curated boutique villas, iconic heritage hotels, and luxury resorts.'
    }
  ];

  return (
    <div className="bg-white font-sans text-gray-800 animate-fadeIn overflow-x-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative h-[65vh] min-h-[500px] flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0 bg-[#0a1712]">
          <img
            src="https://blackforestholidays.com/wp-content/uploads/2026/07/3.png"
            alt={`About ${siteName}`}
            className="w-full h-full object-cover opacity-70 object-center"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        {/* Content Centered */}
        <div className="relative z-10 text-white flex flex-col items-center text-center pb-8 mt-16">
          <h1 className="text-4xl md:text-5xl lg:text-[60px] font-bold tracking-wider mb-4 drop-shadow-xl font-serif">
            About
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm md:text-base font-light drop-shadow-md tracking-wider">
            <Link to="/" className="hover:text-gray-200 transition-colors">Home</Link>
            <span className="text-gray-300">&gt;</span>
            <span className="text-white">About</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full z-10 text-white">
          <HeroWave />
        </div>
      </section>

      {/* 2. Main Intro & Luxury Section */}
      <section className="pt-20 pb-20 relative z-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Titles */}
          <div className="text-center mb-16">
            <span className="text-[#27B8B1] text-2xl md:text-3xl block mb-2 font-['Caveat',cursive,serif]">
              Travel Dream Begins
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#7cb342] leading-tight">
              Redefining the Way You Explore the World
            </h2>
          </div>

          {/* 3 Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Text Content (span 4) */}
            <div className="md:col-span-4 space-y-8">
              <h3 className="text-3xl md:text-[38px] font-bold text-[#7cb342] leading-tight pr-4">
                Where<br/>
                Luxury Meets<br/>
                Extraordinary<br/>
                Journeys
              </h3>
              
              <div className="text-gray-600 text-[15px] font-light leading-[1.8] space-y-6">
                <p>
                  BlackForest Holidays is a premier luxury travel atelier, curating exceptional experiences since 2010. We are your dedicated travel planner, engineering tailor-made vacations, visa assistance, corporate missions, and bespoke celebrations.
                </p>
                <p>
                  Our destination experts leverage insider access and tourism-board accreditations worldwide to craft itineraries that balance iconic sights with tranquil seclusion.
                </p>
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => openEnquiryModal({ destination: 'Bespoke Travel' })}
                  className="bg-[#10221b] text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-[#7cb342] transition-colors shadow-md rounded-sm cursor-pointer"
                >
                  Discover More
                </button>
              </div>
            </div>

            {/* Middle Column: Images (span 4) */}
            <div className="md:col-span-4 space-y-6">
              <div className="w-full aspect-[4/5] overflow-hidden shadow-sm border border-gray-100">
                <img 
                  src="/assets/images/about-img-1.jpg" 
                  alt="Scenic travel" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                  onError={(e) => {
                    e.target.src = 'https://blackforestholidays.com/wp-content/uploads/2026/08/chapel-golden-pagoda-wat-chiang-man-chiang-mai-north-thailand-scaled.jpg';
                  }}
                />
              </div>
              <div className="w-full aspect-[16/9] overflow-hidden shadow-sm border border-gray-100">
                <img 
                  src="/assets/images/about-img-2.jpg" 
                  alt="Travel adventure" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                  onError={(e) => {
                    e.target.src = 'https://blackforestholidays.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-17-at-20.35.24.jpeg';
                  }}
                />
              </div>
            </div>

            {/* Right Column: Quote Text (span 4) */}
            <div className="md:col-span-4 relative flex h-full">
              {/* Note: The screenshot shows this text starting roughly halfway down the images */}
              <div className="mt-auto mb-24 md:pl-8 flex w-full relative">
                <h3 className="text-2xl lg:text-[28px] font-bold text-[#7cb342] leading-[1.4] pr-6">
                  A Journey Designed For Activities To Make Sure You Enjoy & Stay Thrilled.
                </h3>
                {/* Orange accent block */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-8 bg-[#f29727]"></div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Beyond Travel Section */}
      <section className="pt-8 pb-24 relative z-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-12">
            <h2 className="text-3xl md:text-[38px] font-bold text-[#7cb342] leading-tight mb-4">
              Beyond Travel – We Create Experiences
            </h2>
            <div className="h-[2px] w-16 bg-[#27B8B1]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Block 1 */}
            <div className="space-y-6">
              <div>
                <span className="text-[#27B8B1] text-lg font-['Caveat',cursive,serif] block mb-1">Macau</span>
                <p className="text-gray-500 text-[14px] leading-[1.8] font-light max-w-md">
                  an urban escapes rich in culture, world-class entertainment, fine dining and unparalleled experiences.
                </p>
              </div>
              <div className="w-full aspect-[4/3] overflow-hidden shadow-sm">
                <img 
                  src="https://blackforestholidays.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-17-at-20.35.21-2.jpeg" 
                  alt="James Bond Island" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <h3 className="font-bold text-[#10221b] text-2xl lg:text-[28px] leading-snug">
                Exclusive Escapes For Discerning Travelers
              </h3>
            </div>
            
            {/* Block 2 */}
            <div className="space-y-6">
              <div>
                <span className="text-[#27B8B1] text-lg font-['Caveat',cursive,serif] block mb-1">Phuket</span>
                <p className="text-gray-500 text-[14px] leading-[1.8] font-light max-w-md">
                  Where stunning coastlines meet vibrant culture, offering unforgettable island adventures and luxurious getaways.
                </p>
              </div>
              <div className="w-full aspect-[4/3] overflow-hidden shadow-sm">
                <img 
                  src="https://blackforestholidays.com/wp-content/uploads/2026/08/WhatsApp-Image-2026-08-17-at-20.35.22-1.jpeg" 
                  alt="Hikers" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <h3 className="font-bold text-[#10221b] text-2xl lg:text-[28px] leading-snug">
                Curated Journeys For The Elite Traveler
              </h3>
            </div>
            
          </div>
        </div>
      </section>

      {/* 6. Testimonial Section with authentic background */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none bg-cover bg-bottom" 
          style={{ 
            backgroundImage: 'url("/assets/images/about-testimonial-bg.png")'
          }}
        />
        <div className="relative z-10">
          <TestimonialSlider />
        </div>
      </section>

      {/* 7. Expertise Section */}
      <ExpertiseSection />
      
    </div>
  );
}
