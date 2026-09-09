import React from 'react';

export default function AboutMemoriesSection() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-white overflow-hidden z-10">
      {/* ── Background Mountain / Forest Silhouettes ── */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.22] flex justify-between items-end overflow-hidden">
        {/* Left mountain graphic */}
        <div className="w-[320px] sm:w-[480px] h-[340px] -translate-x-12 translate-y-6">
          <svg viewBox="0 0 500 350" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-cover">
            <path d="M0 350L120 180L220 270L360 90L500 350H0Z" fill="#88a598" opacity="0.45" />
            <path d="M40 350L180 140L300 240L420 80L500 350H40Z" fill="#587c6e" opacity="0.3" />
            <image href="/pine-forest.webp" x="0" y="240" width="500" height="110" preserveAspectRatio="none" opacity="0.6" />
          </svg>
        </div>

        {/* Right mountain graphic */}
        <div className="w-[320px] sm:w-[480px] h-[340px] translate-x-12 translate-y-6">
          <svg viewBox="0 0 500 350" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-cover scale-x-[-1]">
            <path d="M0 350L120 180L220 270L360 90L500 350H0Z" fill="#88a598" opacity="0.45" />
            <path d="M40 350L180 140L300 240L420 80L500 350H40Z" fill="#587c6e" opacity="0.3" />
            <image href="/pine-forest.webp" x="0" y="240" width="500" height="110" preserveAspectRatio="none" opacity="0.6" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Quote in Mansalva cursive font */}
        <div className="text-center mb-10 sm:mb-14">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl text-[#23b0b2] tracking-wide"
            style={{ fontFamily: "'Mansalva', cursive, sans-serif" }}
          >
            Travel is the only thing you buy that makes you richer
          </h2>
        </div>

        {/* Main Content: Card on Left + Map Image on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: White Elevated Content Card */}
          <div className="lg:col-span-6 xl:col-span-6 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.07)] p-8 sm:p-10 md:p-12 border border-gray-100/90 transition-all duration-300 hover:shadow-[0_14px_50px_rgba(0,0,0,0.1)]">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#44802c] leading-tight mb-4 tracking-tight">
              Let us plan your journey,<br />
              You create the memories.
            </h3>
            
            {/* Golden underline */}
            <div className="w-14 h-[3px] bg-[#c8860b] mb-6 rounded-full" />

            <div className="space-y-4 text-[#555555] text-[14.5px] sm:text-[15px] leading-[1.75] font-normal">
              <p>
                Welcome to <strong className="font-semibold text-[#1c2b25]">BLACK FOREST HOLIDAYS</strong>, your trusted partner in creating unforgettable travel experiences. We believe that every journey should be more than just a trip—it should be a collection of wonderful memories, new discoveries, and meaningful experiences.
              </p>
              <p>
                With our expertise in travel planning, we help individuals, families, couples, and groups plan their perfect getaway. From flights and hotels to customized holiday packages, sightseeing, transportation, and travel assistance, we take care of the details so you can enjoy your journey with confidence.
              </p>
            </div>
          </div>

          {/* Right: Map & Travel Gear Image */}
          <div className="lg:col-span-6 xl:col-span-6 flex justify-center items-center">
            <div className="w-full overflow-hidden rounded-2xl shadow-[0_12px_45px_rgba(0,0,0,0.12)] border border-gray-100/80 group">
              <img
                src="/map-intro.webp"
                alt="Let us plan your journey - Black Forest Holidays"
                className="w-full h-auto max-h-[480px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
