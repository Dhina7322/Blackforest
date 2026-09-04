import React, { useState, useEffect, useRef } from 'react';

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
      { threshold: 0.5 }
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
  const { count: countIsland, ref: refIsland } = useCounter(50);
  const { count: countCountries, ref: refCountries } = useCounter(25);
  const { count: countTailor, ref: refTailor } = useCounter(150);

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <svg
          viewBox="0 0 1200 800"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {/* Subtle mountains */}
          <path
            fill="#eef5eb"
            d="M0,800 L0,500 Q150,450 300,550 T700,450 T1000,600 L1200,500 L1200,800 Z"
          />
          <path
            fill="#f5faf3"
            d="M0,800 L0,650 Q200,550 450,650 T850,550 T1200,700 L1200,800 Z"
          />
          {/* Realistic Flying Birds Flock (matching Image 4) */}
          <path fill="#1b2a22" d="M300,180 Q316,160 332,174 Q322,175 316,182 Q310,176 300,180 Z" />
          <path fill="#1b2a22" d="M380,140 Q400,120 420,135 Q408,137 400,146 Q392,138 380,140 Z" />
          <path fill="#1b2a22" d="M480,105 Q505,80 530,100 Q515,103 505,114 Q495,105 480,105 Z" />
          <path fill="#1b2a22" d="M600,150 Q622,130 644,146 Q630,149 622,158 Q614,149 600,150 Z" />
          <path fill="#1b2a22" d="M670,185 Q686,172 702,183 Q692,185 686,192 Q680,185 670,185 Z" />
          <path fill="#1b2a22" d="M540,210 Q558,195 576,206 Q566,209 558,217 Q550,209 540,210 Z" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="space-y-4">
            <h2 
              className="text-4xl md:text-[42px] leading-tight"
              style={{
                fontFamily: "var(--font-cursive)",
                color: "#27B8B1"
              }}
            >
              Your Island Story Begins Here
            </h2>
            <p className="text-gray-500 font-light text-lg max-w-md">
              Experience the world in extraordinary style with our only luxuary tours
            </p>
          </div>

          {/* Right Content - Circles */}
          <div>
            <div className="flex flex-wrap justify-center lg:justify-end gap-6 md:gap-8">
              
              <div ref={refIsland} className="w-[140px] h-[140px] md:w-[160px] md:h-[160px] rounded-full bg-[#10221b] flex flex-col items-center justify-center text-white shadow-xl transition-transform hover:scale-105">
                <span className="text-2xl md:text-3xl font-extrabold mb-1">{countIsland}+</span>
                <span className="text-xs md:text-sm font-semibold tracking-wide">Island</span>
              </div>

              <div ref={refCountries} className="w-[140px] h-[140px] md:w-[160px] md:h-[160px] rounded-full bg-[#10221b] flex flex-col items-center justify-center text-white shadow-xl transition-transform hover:scale-105">
                <span className="text-2xl md:text-3xl font-extrabold mb-1">{countCountries}</span>
                <span className="text-xs md:text-sm font-semibold tracking-wide">Countries</span>
              </div>

              <div ref={refTailor} className="w-[140px] h-[140px] md:w-[160px] md:h-[160px] rounded-full bg-[#10221b] flex flex-col items-center justify-center text-white shadow-xl transition-transform hover:scale-105">
                <span className="text-2xl md:text-3xl font-extrabold mb-1">{countTailor}+</span>
                <span className="text-xs md:text-sm font-semibold tracking-wide">Tailor-Made</span>
              </div>

            </div>
            
            <p className="text-gray-400 font-light text-sm mt-12 text-center lg:text-right max-w-xl ml-auto">
              For BlackForest Holidays, I recommend "Curated Journeys" instead of "Tours" because it sounds more premium and luxurious.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
