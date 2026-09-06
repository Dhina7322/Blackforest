import React from 'react';
import { Link } from 'react-router-dom';
import { Palmtree, Compass, Sparkles, ArrowRight } from 'lucide-react';
import { useSettings } from '../../context/SiteSettingsContext';

export default function IslandSection() {
  const { openEnquiryModal } = useSettings();

  return (
    <section className="py-24 bg-[#10221b] text-white relative overflow-hidden">
      {/* Background Graphic Accents */}
      <div className="absolute inset-0 z-0 opacity-20">
        <img
          src="/images/destinations/destinations-149397604037.webp"
          alt="Maldives Island Luxury"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#10221b]/90" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#f29727] font-bold block">
              Bespoke Atoll Hideaways
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
              Your Island Story <br />
              <span className="italic text-[#f29727]">Begins Here</span>
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed">
              Step from your private overwater deck into warm, luminescent lagoons. We specialize in premier island hideaways across the Maldives, Mauritius, Seychelles, and Andaman Islands.
            </p>

            {/* Tri-pillar Island Features */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                <Palmtree className="w-5 h-5 text-[#f29727] mx-auto mb-1.5" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Private Atolls</h4>
                <p className="text-[11px] text-gray-400 mt-0.5">Secluded Retreats</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                <Compass className="w-5 h-5 text-[#f29727] mx-auto mb-1.5" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Seaplane Access</h4>
                <p className="text-[11px] text-gray-400 mt-0.5">Panoramic Transfers</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                <Sparkles className="w-5 h-5 text-[#f29727] mx-auto mb-1.5" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Tailor-Made</h4>
                <p className="text-[11px] text-gray-400 mt-0.5">Bespoke Perks</p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => openEnquiryModal({ destination: 'Maldives Overwater Luxury' })}
                className="px-8 py-3.5 bg-[#f29727] hover:bg-[#db841a] text-[#10221b] text-xs font-bold uppercase tracking-widest rounded-full shadow-lg transition-all"
              >
                Plan Island Escape
              </button>
              <Link
                to="/experiences/island-holidays"
                className="text-xs font-bold uppercase tracking-wider text-white hover:text-[#f29727] underline transition-colors"
              >
                Explore Island Portfolio →
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src="/images/destinations/destinations-149644222666.webp"
                alt="Maldives Overwater Villas"
                className="rounded-2xl shadow-xl w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
              />
              <img
                src="/images/destinations/destinations-150159490735.webp"
                alt="Tropical Lagoon Sunset"
                className="rounded-2xl shadow-xl w-full h-44 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="space-y-4 pt-8">
              <img
                src="/images/destinations/destinations-150260289865.webp"
                alt="Pristine Island Beach"
                className="rounded-2xl shadow-xl w-full h-44 object-cover hover:scale-105 transition-transform duration-500"
              />
              <img
                src="/images/destinations/destinations-150317711927.webp"
                alt="Island Dining"
                className="rounded-2xl shadow-xl w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
