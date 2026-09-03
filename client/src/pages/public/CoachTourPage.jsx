import React from 'react';
import { useSettings } from '../../context/SiteSettingsContext';
import HeroWave from '../../components/common/HeroWave';
import ExpertiseLogosSection from '../../components/common/ExpertiseLogosSection';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function CoachTourPage() {
  const { openEnquiryModal } = useSettings();

  const packages = [
    { title: "France and Swiss Alps", duration: "10 nights / 11 days", image: "https://images.unsplash.com/photo-1502602898657-3e907600e120?auto=format&fit=crop&w=600&q=80" },
    { title: "France and Switzerland with Enchanted Alsace", duration: "6 nights / 7 days", image: "https://images.unsplash.com/photo-1529154036614-a60975f5c760?auto=format&fit=crop&w=600&q=80" },
    { title: "Swiss and Italian Spotlight and Venice", duration: "8 nights / 9 days", image: "https://images.unsplash.com/photo-1520175480921-4edfa2983e0f?auto=format&fit=crop&w=600&q=80" },
  ];

  return (
    <div className="animate-fadeIn bg-[#fbfaf8] font-sans text-gray-800 overflow-x-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative h-[65vh] min-h-[500px] flex flex-col justify-end">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1920&q=80"
            alt="Coach Tour"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Content with breadcrumb */}
        <div className="relative z-10 text-white mt-16 flex flex-col items-center pb-32">
          <h1 className="text-4xl md:text-5xl lg:text-[60px] font-bold tracking-wider mb-4 drop-shadow-xl text-center">
            Coach Tour
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm md:text-base font-light drop-shadow-md tracking-wider">
            <a href="/" className="hover:text-gray-200 transition-colors">Home</a>
            <span className="text-gray-300">&gt;</span>
            <span>Coach Tour</span>
          </div>
        </div>

        {/* Wavy Top SVG Mask */}
        <HeroWave />
      </section>

      {/* 2. Popular Packages */}
      <section className="py-20 relative z-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-3xl shadow-lg p-10 lg:p-16 relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
            
            {/* Left Title */}
            <div className="lg:col-span-1 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-[#10221b] leading-tight">
                Popular<br/>Packages
              </h2>
              <div className="w-12 h-[2px] bg-gray-200"></div>
              <p className="text-gray-500 text-sm font-light leading-relaxed pt-2">
                Handcrafted premium coach tours across Europe and iconic destinations.
              </p>
            </div>

            {/* Right Carousel */}
            <div className="lg:col-span-3 relative">
              {/* Controls */}
              <button className="absolute left-0 top-1/2 -translate-y-1/2 -ml-6 z-20 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-500 hover:text-[#5e963b] transition-all">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="absolute right-0 top-1/2 -translate-y-1/2 -mr-6 z-20 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-500 hover:text-[#5e963b] transition-all">
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="flex gap-6 overflow-hidden py-4 px-2">
                {packages.map((pkg, idx) => (
                  <div key={idx} className="w-1/3 min-w-[280px] h-[450px] relative rounded-xl overflow-hidden shadow-md group cursor-pointer">
                    <img 
                      src={pkg.image} 
                      alt={pkg.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                    <div className="absolute top-4 right-4 bg-[#10221b] text-white p-2 rounded shadow-sm">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 5v16l7-3 7 3V5z"/></svg>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6 text-center text-white space-y-2">
                      <h4 className="font-bold text-lg leading-snug">{pkg.title}</h4>
                      <p className="text-xs text-gray-300">{pkg.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Expertise Section */}
      <ExpertiseLogosSection />
      
    </div>
  );
}
