import React from 'react';

export default function HeroWave() {
  return (
    <div className="absolute bottom-0 left-0 w-full h-[250px] z-20 pointer-events-none overflow-hidden">
      
      {/* Dark Forest Silhouette Layer */}
      <div 
        className="absolute bottom-[-20px] md:bottom-[-50px] left-0 w-full h-[120px] md:h-[200px]"
        style={{
          backgroundImage: `url('/pine-forest.webp')`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'bottom',
          backgroundRepeat: 'no-repeat'
        }}
      ></div>

      {/* White Wavy Layer (overlaps the flat bottom of the trees) */}
      <svg 
        className="absolute bottom-[-1px] left-0 w-full h-[40px] md:h-[80px]" 
        preserveAspectRatio="none" 
        viewBox="0 0 1200 120" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M0 120L0 50C150 110 350 10 600 60C850 110 1050 10 1200 50L1200 120Z" 
          fill="#ffffff" 
        />
      </svg>
    </div>
  );
}
