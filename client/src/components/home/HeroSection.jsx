import React from 'react';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[88vh] sm:h-[94vh] md:h-[98vh] min-h-[640px] max-h-[1050px] overflow-hidden bg-black flex items-center justify-center">
      {/* 1. Native 1080p60 Full HD Video (Autoplay, Loop, Muted, 0 controls, 0 overlays) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://img.youtube.com/vi/uOvdoLDbJxM/maxresdefault.jpg"
          className="w-full h-full object-cover object-center pointer-events-none select-none"
        >
          <source src="/hero-video-1080p60.mp4" type="video/mp4" />
        </video>
      </div>

      {/* 2. Subtle Top Gradient for Navigation Legibility */}
      <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black/50 via-black/20 to-transparent pointer-events-none z-10" />

      {/* 3. Dramatic Organic White Wave Cutout with pronounced Up-and-Down Crests & Troughs (Matching Image 3) */}
      <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
        <svg
          className="relative block w-full h-[70px] sm:h-[110px] md:h-[150px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
        >
          <path
            d="M0,220 L1440,220 L1440,95 C1360,165 1270,35 1160,55 C1030,80 940,185 820,130 C710,75 620,20 500,55 C380,95 295,190 170,135 C95,95 45,150 0,110 Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  );
}
