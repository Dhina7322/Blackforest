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
      <section className="relative h-[60vh] min-h-[500px] flex flex-col justify-end">
        <div className="absolute inset-0 z-0 bg-[#0a1712]">
          <img
            src="/assets/images/ABOUT-US.png"
            alt={`About ${siteName}`}
            className="w-full h-full object-cover opacity-75 object-center"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/assets/images/Blackforest-about-1.png';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10221b] via-[#10221b]/40 to-black/60" />
        </div>
        
        <div className="relative z-10 text-white mt-16 flex flex-col items-center pb-32">
          <span className="text-[#f29727] text-xs uppercase font-bold tracking-[0.25em] mb-2">
            The Artists Of Travel
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-[60px] font-bold tracking-wider mb-4 drop-shadow-xl text-center">
            About Us
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm md:text-base font-light drop-shadow-md tracking-wider">
            <Link to="/" className="hover:text-gray-200 transition-colors">Home</Link>
            <span className="text-gray-300">&gt;</span>
            <span className="text-[#f29727]">About Us</span>
          </div>
        </div>
        <HeroWave />
      </section>

      {/* 2. Intro Section */}
      <section className="pt-20 pb-12 relative z-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span 
            className="text-2xl sm:text-[28px] block mb-1"
            style={{
              fontFamily: "var(--font-cursive, 'Caveat', cursive, serif)",
              color: "#27B8B1"
            }}
          >
            Travel Dream Begins
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-[#5e963b] leading-tight max-w-4xl mx-auto font-serif">
            Redefining the Way You Explore the World
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            At {siteName}, travel is more than ticking off destinations. It is an art of curating transformative journeys, authentic cultures, and seamless moments that stay with you forever.
          </p>
        </div>
      </section>

      {/* 3. Four Value Pillars */}
      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((p, idx) => (
              <div 
                key={idx} 
                className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-center flex flex-col items-center group hover:-translate-y-1"
              >
                <div className="w-16 h-16 rounded-full bg-[#f29727]/10 flex items-center justify-center p-3 mb-4 group-hover:scale-110 transition-transform">
                  <img 
                    src={p.icon} 
                    alt={p.title} 
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <h3 className="font-bold text-[#10221b] text-base mb-2 font-sans">
                  {p.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed font-light">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Luxury Meets Extraordinary */}
      <section className="py-16 md:py-24 relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left Content */}
            <div className="space-y-8">
              <h2 className="text-3xl md:text-[40px] font-bold text-[#5e963b] leading-tight font-serif">
                Where
                <br />
                Luxury Meets
                <br />
                Extraordinary
                <br />
                Journeys
              </h2>
              
              <div className="text-gray-600 text-[14px] font-light leading-[1.8] space-y-4 max-w-lg">
                <p>
                  {siteName} is a premier luxury travel atelier, curating exceptional experiences since 2010. We are your dedicated travel planner, engineering tailor-made vacations, visa assistance, corporate missions, and bespoke celebrations.
                </p>
                <p>
                  Our destination experts leverage insider access and tourism-board accreditations worldwide to craft itineraries that balance iconic sights with tranquil seclusion.
                </p>
              </div>

              <div className="pt-2">
                <button 
                  onClick={() => openEnquiryModal({ destination: 'Bespoke Travel' })}
                  className="inline-block bg-[#10221b] text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-[#5e963b] transition-colors shadow-md rounded-sm cursor-pointer"
                >
                  Start Your Journey
                </button>
              </div>
            </div>

            {/* Right Images Collage */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 mt-12">
                  <div className="aspect-[4/5] rounded-xl overflow-hidden shadow-lg border border-gray-100">
                    <img 
                      src="/assets/images/about-img-1.jpg" 
                      alt="Scenic travel" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                      onError={(e) => {
                        e.target.src = '/assets/images/about-compass.jpg';
                      }}
                    />
                  </div>
                  <div className="aspect-[16/9] rounded-xl overflow-hidden shadow-lg border border-gray-100">
                    <img 
                      src="/assets/images/about-img-2.jpg" 
                      alt="Travel adventure" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                      onError={(e) => {
                        e.target.src = '/assets/images/about-map.jpg';
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="aspect-square rounded-xl overflow-hidden shadow-lg border border-gray-100">
                    <img 
                      src="/assets/images/about-img-3.png" 
                      alt="Mountain adventure" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                      onError={(e) => {
                        e.target.src = '/assets/images/corporate-travel.jpg';
                      }}
                    />
                  </div>
                  <div className="pt-6 pl-2">
                    <h3 className="text-xl md:text-2xl font-bold text-[#5e963b] leading-snug font-serif">
                      A Journey Designed For Activities To Make Sure You Enjoy & Stay Thrilled.
                    </h3>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. Beyond Travel Section */}
      <section className="py-20 md:py-28 bg-[#fbfaf8] border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-14 text-center sm:text-left">
            <span 
              className="text-2xl sm:text-[26px] block mb-1"
              style={{
                fontFamily: "var(--font-cursive, 'Caveat', cursive, serif)",
                color: "#27B8B1"
              }}
            >
              Curated Escapes
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-[#5e963b] font-serif mb-4">
              Beyond Travel – We Create Experiences
            </h2>
            <div className="h-[2px] w-16 bg-[#27B8B1]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
            
            {/* Block 1 */}
            <div className="space-y-5 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className="space-y-1">
                <span className="text-[#f29727] text-xs tracking-widest uppercase font-bold block">
                  Metropolitan & Culture
                </span>
                <p className="text-gray-600 text-[13px] leading-relaxed">
                  Urban escapes rich in culture, world-class entertainment, fine dining and unparalleled experiences.
                </p>
              </div>
              <div className="w-full aspect-[16/10] overflow-hidden rounded-xl shadow-sm">
                <img 
                  src="/assets/images/WhatsApp-Image-2026-07-30-at-12.52.36-1.jpeg" 
                  alt="Urban travel" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                  onError={(e) => {
                    e.target.src = '/assets/images/Untitled-design.png';
                  }}
                />
              </div>
              <h3 className="font-bold text-[#10221b] text-xl leading-snug font-serif">
                Exclusive Escapes For Discerning Travelers
              </h3>
            </div>
            
            {/* Block 2 */}
            <div className="space-y-5 bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className="space-y-1">
                <span className="text-[#f29727] text-xs tracking-widest uppercase font-bold block">
                  Islands & Coasts
                </span>
                <p className="text-gray-600 text-[13px] leading-relaxed">
                  Where stunning coastlines meet vibrant culture, offering unforgettable island adventures and luxurious getaways.
                </p>
              </div>
              <div className="w-full aspect-[16/10] overflow-hidden rounded-xl shadow-sm">
                <img 
                  src="/assets/images/WhatsApp-Image-2026-07-30-at-12.52.36-2.jpeg" 
                  alt="Island travel" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" 
                  onError={(e) => {
                    e.target.src = '/assets/images/Untitled-design-1.png';
                  }}
                />
              </div>
              <h3 className="font-bold text-[#10221b] text-xl leading-snug font-serif">
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
