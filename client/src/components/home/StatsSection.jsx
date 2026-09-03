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
          {/* Birds */}
          <path fill="#2c3e50" d="M300,200 Q310,190 320,200 Q310,195 300,200 Z" />
          <path fill="#2c3e50" d="M350,150 Q360,140 370,150 Q360,145 350,150 Z" />
          <path fill="#2c3e50" d="M420,100 Q430,90 440,100 Q430,95 420,100 Z" />
          <path fill="#2c3e50" d="M580,180 Q590,170 600,180 Q590,175 580,180 Z" />
          <path fill="#2c3e50" d="M620,140 Q630,130 640,140 Q630,135 620,140 Z" />
          <path fill="#2c3e50" d="M680,220 Q690,210 700,220 Q690,215 680,220 Z" />
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
