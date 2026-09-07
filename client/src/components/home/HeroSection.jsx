import React, { useState } from 'react';
import { Play, X } from 'lucide-react';

export default function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="relative w-full h-[85vh] sm:h-[90vh] md:h-[95vh] min-h-[520px] sm:min-h-[620px] max-h-[1050px] overflow-hidden bg-black flex items-center justify-center">
      {/* Background Image / Video Poster using uploaded assets */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/assets/images/corporate-travel.jpg"
          alt="Luxury Corporate & Leisure Travels"
          className="w-full h-full object-cover object-[center_30%] sm:object-center pointer-events-none select-none"
        />
        {/* Subtle Dark Overlay for contrast */}
        <div className="absolute inset-0 bg-black/35 pointer-events-none" />
      </div>

      {/* Top Gradient for Navigation Legibility */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/70 via-black/30 to-transparent pointer-events-none z-10" />

      {/* Center Interactive Content & Play Button */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-widest text-white mb-6 drop-shadow-lg font-sans">
          CORPORATE TRAVELS
        </h1>

        {/* YouTube / Video Red Play Button */}
        <button
          onClick={() => setIsPlaying(true)}
          aria-label="Play Travel Experience Video"
          className="w-16 h-11 sm:w-20 sm:h-14 bg-[#FF0000] rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-[#cc0000] cursor-pointer group"
        >
          <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white fill-white ml-1 transition-transform group-hover:scale-105" />
        </button>
      </div>

      {/* Video Modal Player */}
      {isPlaying && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fadeIn">
          <button
            onClick={() => setIsPlaying(false)}
            className="absolute top-6 right-6 text-white hover:text-[#f29727] p-2 rounded-full bg-white/10"
            aria-label="Close video"
          >
            <X className="w-8 h-8" />
          </button>
          <div className="w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-2xl bg-black">
            <iframe
              src="https://www.youtube.com/embed/uOvdoLDbJxM?autoplay=1"
              title="Corporate Travels Video"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Dramatic Organic White Wave Cutout transition at bottom */}
      <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
        <svg
          className="relative block w-full h-[60px] sm:h-[100px] md:h-[140px]"
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
