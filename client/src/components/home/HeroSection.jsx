import React from 'react';
import { Play } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1627896157734-4d7d4388f28b?auto=format&fit=crop&w=1920&q=80"
          alt="Cappadocia Hot Air Balloons"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-4 px-4 text-center mt-12">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white uppercase drop-shadow-xl flex flex-col items-center justify-center gap-2">
          <span className="tracking-widest">DISCOVER</span>
          <span className="text-[#f29727]">THE WORLD</span>
        </h1>
      </div>

      {/* Wavy Bottom SVG Mask */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
        <svg
          className="relative block w-full h-[60px] sm:h-[100px]"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120H1200V81.334C1147.2 46.108 1083.74 38.649 1017.3 64.673 950.849 90.697 881.084 105.151 814.945 92.42 748.807 79.689 676.843 38.077 609.914 26.684 542.985 15.291 482.029 27.535 417.893 54.767 353.757 81.999 283.435 99.789 216.591 97.491 149.747 95.193 83.181 57.062 0 17.5V120Z"
            fill="#ffffff"
          ></path>
        </svg>
      </div>
    </section>
  );
}
