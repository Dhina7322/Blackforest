import React from 'react';
import { useSettings } from '../../context/SiteSettingsContext';

export default function IntroSection() {
  const { settings } = useSettings();
  const brandName = settings?.siteName || 'Blackforest Holidays';

  return (
    <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden bg-white z-10">
      {/* Mountain silhouettes framing the section - matching reference image */}
      {/* Left mountain silhouette with pine texture */}
      <div 
        className="absolute top-8 -left-12 sm:-left-6 w-[340px] sm:w-[480px] lg:w-[560px] h-[400px] sm:h-[500px] pointer-events-none z-0 opacity-25 hidden sm:block"
        style={{
          clipPath: "polygon(0% 100%, 0% 32%, 12% 28%, 22% 16%, 32% 12%, 46% 22%, 58% 24%, 72% 38%, 88% 44%, 100% 100%)"
        }}
      >
        <img 
          src="/assets/images/mask-pine.jpg" 
          alt="Mountain Forest Silhouette Left" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right mountain silhouette with pine texture */}
      <div 
        className="absolute top-16 -right-12 sm:-right-8 w-[320px] sm:w-[450px] lg:w-[520px] h-[380px] sm:h-[460px] pointer-events-none z-0 opacity-20 hidden md:block"
        style={{
          clipPath: "polygon(0% 50%, 15% 42%, 28% 36%, 42% 24%, 56% 16%, 70% 20%, 85% 30%, 100% 34%, 100% 100%, 0% 100%)"
        }}
      >
        <img 
          src="/assets/images/mask-pine.jpg" 
          alt="Mountain Forest Silhouette Right" 
          className="w-full h-full object-cover transform scale-x-[-1]"
        />
      </div>

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left Content Area */}
            <div className="bg-white p-7 sm:p-9 lg:p-12 shadow-md rounded-md border-none max-w-xl mx-auto lg:mr-auto">
              <div className="mb-6">
                <h3 className="text-2xl sm:text-[30px] lg:text-[32px] font-bold text-[#5e963b] leading-[1.25] font-sans tracking-wide">
                  Let us plan your journey,<br />
                  You create the memories.
                </h3>
                {/* Gold/tan accent bar matching reference */}
                <div className="w-14 h-[2.5px] bg-[#c89d59] mt-4 mb-4"></div>
              </div>

              <div className="space-y-4 text-[#444444] text-[14px] sm:text-[14.5px] leading-[1.85] font-sans font-light tracking-wide">
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
              <div className="bg-white shadow-xl overflow-hidden rounded-md border-none">
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
