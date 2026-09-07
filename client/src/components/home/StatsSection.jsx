import React, { useState, useEffect, useRef } from 'react';
import { useSettings } from '../../context/SiteSettingsContext';

// Custom hook for animated counting
const useCounter = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [isVisible, end, duration]);

  return { count, ref };
};

export default function StatsSection() {
  const { count: countIsland, ref: refIsland } = useCounter(30);
  const { count: countCountries, ref: refCountries } = useCounter(10);
  const { count: countTailor, ref: refTailor } = useCounter(40);
  const { settings } = useSettings();
  const brandName = settings?.siteName || 'Blackforest Holidays';

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-white overflow-hidden">
      {/* Background Graphic with Silhouette Mountain from uploaded assets */}
      <div 
        className="absolute inset-0 z-0 opacity-25 pointer-events-none bg-bottom bg-cover"
        style={{ backgroundImage: "url('/assets/images/number-counter-bg.png')" }}
      />

      {/* Decorative Flying Birds Silhouette */}
      <div className="absolute top-6 sm:top-10 left-1/4 sm:left-1/3 z-0 pointer-events-none opacity-60">
        <svg width="220" height="70" viewBox="0 0 220 70" fill="#2d4030" className="w-36 sm:w-56 h-auto">
          <path d="M20,30 Q30,15 40,25 Q35,26 30,32 Q25,27 20,30 Z" />
          <path d="M70,18 Q84,5 98,15 Q90,16 84,23 Q78,17 70,18 Z" />
          <path d="M140,22 Q152,10 164,20 Q156,21 151,27 Q146,21 140,22 Z" />
          <path d="M180,35 Q190,24 200,32 Q194,33 190,38 Q186,33 180,35 Z" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-5 space-y-3 text-center lg:text-left">
            <h2 
              className="text-2xl sm:text-3xl md:text-[38px] leading-tight"
              style={{
                fontFamily: "var(--font-cursive, 'Caveat', cursive, serif)",
                color: "#27B8B1"
              }}
            >
              Your Travel Start Right Here
            </h2>
            <p className="text-[#555555] font-light text-[14px] sm:text-[15px] leading-relaxed max-w-md mx-auto lg:mx-0">
              Experience the world in extraordinary style with our luxury tours and curated holidays.
            </p>
          </div>

          {/* Right Content - 3 Circular Badges */}
          <div className="lg:col-span-7">
            <div className="flex flex-wrap justify-center lg:justify-end gap-5 sm:gap-8">
              
              <div ref={refIsland} className="w-[110px] h-[110px] sm:w-[135px] sm:h-[135px] md:w-[150px] md:h-[150px] rounded-full bg-[#10221b] border-2 border-white/20 flex flex-col items-center justify-center text-white shadow-2xl transition-transform hover:scale-105">
                <span className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-0.5">{countIsland}+</span>
                <span className="text-[11px] sm:text-[12px] md:text-[13px] font-medium tracking-wider text-gray-300">Island</span>
              </div>

              <div ref={refCountries} className="w-[110px] h-[110px] sm:w-[135px] sm:h-[135px] md:w-[150px] md:h-[150px] rounded-full bg-[#10221b] border-2 border-white/20 flex flex-col items-center justify-center text-white shadow-2xl transition-transform hover:scale-105">
                <span className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-0.5">{countCountries}+</span>
                <span className="text-[11px] sm:text-[12px] md:text-[13px] font-medium tracking-wider text-gray-300">Countries</span>
              </div>

              <div ref={refTailor} className="w-[110px] h-[110px] sm:w-[135px] sm:h-[135px] md:w-[150px] md:h-[150px] rounded-full bg-[#10221b] border-2 border-white/20 flex flex-col items-center justify-center text-white shadow-2xl transition-transform hover:scale-105">
                <span className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-0.5">{countTailor}+</span>
                <span className="text-[11px] sm:text-[12px] md:text-[13px] font-medium tracking-wider text-gray-300">Tailor-Made</span>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Description */}
        <div className="mt-12 sm:mt-14 pt-6 sm:pt-8 border-t border-gray-100 text-center">
          <p className="text-[#555555] font-light text-[13.5px] sm:text-[14px] leading-relaxed max-w-2xl mx-auto px-4">
            At {brandName}, we are passionate about curating unforgettable travel experiences tailored to your dreams and interests.
          </p>
        </div>
      </div>
    </section>
  );
}
