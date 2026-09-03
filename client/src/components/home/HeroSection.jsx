import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, CalendarCheck, ChevronDown } from 'lucide-react';
import { useSettings } from '../../context/SiteSettingsContext';

export default function HeroSection() {
  const { openEnquiryModal } = useSettings();

  const scrollToNext = () => {
    const nextSection = document.getElementById('intro-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#10221b] text-white overflow-hidden">
      {/* Background Video / Imagery */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=2000&q=85"
          alt="Blackforest Holidays Luxury Travel"
          className="w-full h-full object-cover object-center scale-105 animate-pulse duration-10000"
        />
        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#10221b] via-[#10221b]/60 to-black/70" />
        <div className="absolute inset-0 bg-[#10221b]/30 backdrop-brightness-95" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6 animate-fadeIn">
          <span className="w-2 h-2 rounded-full bg-[#f29727] animate-ping" />
          <span className="text-xs uppercase tracking-widest text-[#f29727] font-semibold">
            Bespoke Luxury & Experiential Journeys
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold tracking-tight text-white leading-tight sm:leading-none mb-6">
          Travel is the only thing you buy that makes you richer
        </h1>

        <p className="text-lg sm:text-2xl font-light italic text-[#f3efe8] max-w-2xl mx-auto mb-10 leading-relaxed">
          "Let us plan your journey, <br className="hidden sm:inline" />
          You create the memories."
        </p>

        {/* Dual Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => openEnquiryModal({ source: 'Homepage Hero CTA' })}
            className="w-full sm:w-auto px-8 py-4 bg-[#f29727] hover:bg-[#db841a] text-[#10221b] font-bold text-xs uppercase tracking-widest rounded-full shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Plan Your Journey</span>
          </button>

          <Link
            to="/destinations"
            className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs uppercase tracking-widest rounded-full border border-white/30 backdrop-blur-md transition-all flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4 text-[#f29727]" />
            <span>Explore Destinations</span>
          </Link>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <button
        onClick={scrollToNext}
        aria-label="Scroll to introduction"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 p-2 text-white/60 hover:text-[#f29727] transition-colors animate-bounce"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </section>
  );
}
