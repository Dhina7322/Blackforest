import React from 'react';
import { Link } from 'react-router-dom';
import { Backpack, Compass, Mountain, ArrowRight } from 'lucide-react';
import { useSettings } from '../../context/SiteSettingsContext';

export default function AdventureSection() {
  const { openEnquiryModal } = useSettings();

  return (
    <section className="py-20 bg-[#10221b] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <span className="text-xs uppercase tracking-widest text-[#f29727] font-bold block mb-2">
          Want em’ Pack em’
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-6">
          Adventure Essentials
        </h2>
        <p className="text-gray-300 text-base max-w-2xl mx-auto mb-8 leading-relaxed">
          From high-altitude Alpine expeditions and tropical island gear to safari photography essentials, explore our curated travel accessories and packing expertise.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/experiences/adventure-nature"
            className="px-8 py-3.5 bg-[#f29727] hover:bg-[#db841a] text-[#10221b] text-xs font-bold uppercase tracking-widest rounded-full shadow-lg transition-all"
          >
            Browse Adventure Trips
          </Link>
          <button
            onClick={() => openEnquiryModal({ title: 'Adventure & Packing Consultation' })}
            className="px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-widest rounded-full border border-white/20 transition-all"
          >
            Request Gear Checklist
          </button>
        </div>
      </div>
    </section>
  );
}
