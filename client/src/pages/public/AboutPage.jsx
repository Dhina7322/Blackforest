import React from 'react';
import HeroWave from '../../components/common/HeroWave';
import ExpertiseLogosSection from '../../components/common/ExpertiseLogosSection';
import TestimonialSlider from '../../components/home/TestimonialSlider';

export default function AboutPage() {
  return (
    <div className="bg-white font-sans text-gray-800 animate-fadeIn overflow-x-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex flex-col justify-end">
        <div className="absolute inset-0 z-0 bg-[#0a1712]">
          <img
            src="/images/destinations/destinations-151363526997.webp"
            alt="About Blackforest Holidays"
            className="w-full h-full object-cover opacity-70"
          />
        </div>
        
        <div className="relative z-10 text-white mt-16 flex flex-col items-center pb-32">
          <h1 className="text-4xl md:text-5xl lg:text-[60px] font-bold tracking-wider mb-4 drop-shadow-xl text-center">
            About
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm md:text-base font-light drop-shadow-md tracking-wider">
            <a href="/" className="hover:text-gray-200 transition-colors">Home</a>
            <span className="text-gray-300">&gt;</span>
            <span>About</span>
          </div>
        </div>
        <HeroWave />
      </section>

      {/* 2. Intro Section */}
      <section className="pt-20 pb-16 relative z-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-[#27B8B1] font-bold text-lg tracking-widest block font-['Caveat',cursive,serif]">Travel Dream Begins</span>
          <h2 className="text-4xl md:text-[42px] font-bold text-[#7cb342] leading-tight max-w-4xl mx-auto">
            Redefining the Way You Explore the World
          </h2>
        </div>
      </section>

      {/* 3. Luxury Meets Extraordinary */}
      <section className="py-12 md:py-20 relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            
            {/* Left Content */}
            <div className="space-y-8">
              <h2 className="text-3xl md:text-[40px] font-bold text-[#7cb342] leading-tight">
                Where
                <br />
                Luxury Meets
                <br />
                Extraordinary
                <br />
                Journeys
              </h2>
              
              <div className="text-gray-600 text-[14px] font-light leading-[1.8] space-y-6 max-w-sm">
                <p>Blackforest Holidays is a premier luxury travel agency, curating exceptional experiences since 2010. We are your one-stop travel planner, to design your perfect holiday and create custom itineraries.</p>
                <p>Our goal is to assist in planning the entire vacation matching your requirements to ensure that every travel experience is meticulously memorable.</p>
              </div>

              <a href="/contact" className="inline-block bg-[#10221b] text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#7cb342] transition-colors shadow-md rounded-sm mt-8">
                Start Your Journey
              </a>
            </div>

            {/* Right Images Collage */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 mt-20">
                  <div className="aspect-[4/5] rounded overflow-hidden shadow-lg">
                    <img src="/images/destinations/destinations-151428240104.webp" alt="Bali temple" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-[16/9] rounded overflow-hidden shadow-lg">
                    <img src="/images/destinations/destinations-151439546272.webp" alt="Safari jeep" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="aspect-square rounded overflow-hidden shadow-lg">
                    <img src="/images/destinations/destinations-151642612207.webp" alt="Mountain peak" className="w-full h-full object-cover" />
                  </div>
                  <div className="pt-8 pl-4">
                    <h3 className="text-2xl md:text-[28px] font-bold text-[#7cb342] leading-tight">
                      A Journey
                      <br />Designed For
                      <br />Activities To
                      <br />Make Sure
                      <br />You Enjoy &
                      <br />Stay Thrilled.
                    </h3>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Beyond Travel Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#7cb342] mb-4">
              Beyond Travel – We Create Experiences
            </h2>
            <div className="h-[2px] w-16 bg-[#27B8B1]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Block 1: Macau */}
            <div className="space-y-6">
              <div className="space-y-2 max-w-sm">
                <span className="text-gray-400 text-xs tracking-widest uppercase block">Macau</span>
                <p className="text-gray-600 text-[13px] leading-relaxed">an urban escape rich in culture, world-class entertainment, fine dining and unparalleled experiences.</p>
              </div>
              <div className="w-full aspect-[4/3] overflow-hidden shadow-md">
                <img src="/images/destinations/destinations-151648363826.webp" alt="Macau travel" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <h3 className="font-bold text-[#10221b] text-2xl max-w-xs leading-tight">Exclusive Escapes For Discerning Travelers</h3>
            </div>
            
            {/* Block 2: Phuket */}
            <div className="space-y-6">
              <div className="space-y-2 max-w-sm">
                <span className="text-gray-400 text-xs tracking-widest uppercase block">Phuket</span>
                <p className="text-gray-600 text-[13px] leading-relaxed">where stunning coastlines meet vibrant culture, offering unforgettable island adventures and luxurious getaways.</p>
              </div>
              <div className="w-full aspect-[4/3] overflow-hidden shadow-md">
                <img src="/images/destinations/destinations-151655089392.webp" alt="Phuket travel" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <h3 className="font-bold text-[#10221b] text-2xl max-w-xs leading-tight">Curated Journeys For The Elite Traveler</h3>
            </div>
            
          </div>
        </div>
      </section>

      {/* 5. Testimonial Section */}
      <section className="py-24 bg-[#fbfaf8] relative overflow-hidden">
        {/* Faint Mountain Background */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'url("/images/destinations/destinations-151850956290.webp")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <span className="text-[#27B8B1] font-bold text-xl tracking-widest block font-['Caveat',cursive,serif]">Client Testimonial</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#7cb342]">
              Savoring your Taste Buds
            </h2>
          </div>
          <TestimonialSlider />
        </div>
      </section>

      {/* 6. Expertise Section */}
      <ExpertiseLogosSection />
      
    </div>
  );
}
