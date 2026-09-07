import React from 'react';
import { useSettings } from '../../context/SiteSettingsContext';

export default function IntroSection() {
  const { settings } = useSettings();
  const brandName = settings?.siteName || 'Blackforest Holidays';

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-white z-10">
      {/* Background Mountain Graphics from uploaded assets */}
      <div 
        className="absolute inset-0 z-0 opacity-15 pointer-events-none bg-no-repeat bg-bottom bg-cover"
        style={{ backgroundImage: "url('/assets/images/home-intro-bg.jpg')" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cursive Quote */}
        <div className="text-center mb-12 sm:mb-16 relative z-10">
          <h2 
            className="text-2xl sm:text-3xl md:text-[34px] leading-relaxed"
            style={{
              fontFamily: "var(--font-cursive, 'Caveat', cursive, serif)",
              color: "#27B8B1"
            }}
          >
            Travel is the only thing you buy that makes you richer
          </h2>
        </div>

        <div className="relative">
          {/* Decorative Pine Mask Background */}
          <div className="absolute top-[-40px] left-[-80px] w-full max-w-2xl opacity-10 pointer-events-none z-0 hidden lg:block">
            <img 
              src="/assets/images/mask-pine.jpg" 
              alt="Background Silhouette" 
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Content Area */}
            <div className="bg-white p-6 sm:p-8 lg:p-12 shadow-sm rounded-sm border border-gray-100 max-w-xl mx-auto lg:mr-auto">
              <div className="mb-6">
                <h3 className="text-2xl sm:text-[30px] lg:text-[32px] font-bold text-[#5e963b] leading-tight font-serif tracking-wide">
                  Let us plan your journey,<br />
                  You create the memories.
                </h3>
                <div className="w-12 h-[2px] bg-[#5e963b] mt-4 mb-2"></div>
              </div>

              <div className="space-y-4 text-[#444444] text-[13.5px] sm:text-[14px] leading-[1.8] font-sans font-light tracking-wide">
                <p>
                  Welcome to {brandName.toUpperCase()}, your trusted partner in creating unforgettable travel experiences. We believe that every journey should be more than just a trip—it should be a collection of wonderful memories, new discoveries, and meaningful experiences.
                </p>
                <p>
                  With our expertise in travel planning, we help individuals, families, couples, and groups plan their perfect getaway. From flights and hotels to customized holiday packages, sightseeing, transportation, and travel assistance, we take care of the details so you can enjoy your journey with confidence.
                </p>
              </div>
            </div>

            {/* Right Image Area */}
            <div className="relative z-20 w-full max-w-[520px] mx-auto lg:ml-auto">
              <div className="bg-white shadow-xl overflow-hidden rounded-md border border-gray-100">
                <img
                  src="/assets/images/ChatGPT-Image-Aug-8-2026-09_18_57-PM.png"
                  alt="World map travel planning with hat and plane"
                  className="w-full h-auto object-cover block"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
