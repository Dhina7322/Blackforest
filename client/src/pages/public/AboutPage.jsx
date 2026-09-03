import React from 'react';
import { ShieldCheck, Award, HeartHandshake, Globe, Compass, Users } from 'lucide-react';
import { useSettings } from '../../context/SiteSettingsContext';

export default function AboutPage() {
  const { openEnquiryModal } = useSettings();

  return (
    <div className="pt-24 pb-20 bg-[#fbfaf8] animate-fadeIn">
      {/* Hero Header */}
      <div className="bg-[#10221b] text-white py-20 px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs uppercase font-bold tracking-widest text-[#f29727] block mb-3">
            Our Philosophy & Heritage
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white mb-6 leading-tight">
            Crafting Extraordinary Journeys, One Story at a Time
          </h1>
          <p className="text-[#f3efe8] text-base sm:text-lg font-light leading-relaxed">
            "Travel is the only thing you buy that makes you richer. Let us plan your journey, you create the memories."
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase font-bold tracking-widest text-[#f29727] block">
              Who We Are
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#10221b]">
              Your Trusted Partner in Bespoke Travel
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              At <strong>BLACKFOREST HOLIDAYS</strong>, we believe travel is not merely about visiting destinations—it is an art form of personal discovery, cultural connection, and refined luxury.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              Founded by passionate travelers and certified destination specialists, we have built a reputation for designing flawless itineraries across six continents. Whether you are traversing Swiss mountain peaks on a scenic railway, navigating the emerald backwaters of Kerala on a private luxury houseboat, or soaking in the sunset from an overwater villa in the Maldives, our team manages every detail with meticulous care.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1000&q=80"
                alt="Blackforest Holidays Luxury Travelers"
                className="w-full h-[450px] object-cover"
              />
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-3 text-center">
            <Award className="w-10 h-10 text-[#f29727] mx-auto mb-2" />
            <h3 className="text-lg font-serif font-bold text-[#10221b]">Certified Specialists</h3>
            <p className="text-xs text-gray-600 leading-relaxed">Officially accredited by tourism boards in Peru, Korea, Greece, Japan, Portugal, and Spain.</p>
          </div>

          <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-3 text-center">
            <ShieldCheck className="w-10 h-10 text-[#f29727] mx-auto mb-2" />
            <h3 className="text-lg font-serif font-bold text-[#10221b]">IATA Accredited</h3>
            <p className="text-xs text-gray-600 leading-relaxed">Adhering to the highest global aviation, passenger safety, and reservation standards.</p>
          </div>

          <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-3 text-center">
            <Compass className="w-10 h-10 text-[#f29727] mx-auto mb-2" />
            <h3 className="text-lg font-serif font-bold text-[#10221b]">100% Customized</h3>
            <p className="text-xs text-gray-600 leading-relaxed">No rigid schedules or crowded buses. Every itinerary is planned uniquely for you.</p>
          </div>

          <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-3 text-center">
            <HeartHandshake className="w-10 h-10 text-[#f29727] mx-auto mb-2" />
            <h3 className="text-lg font-serif font-bold text-[#10221b]">24/7 Concierge</h3>
            <p className="text-xs text-gray-600 leading-relaxed">Round-the-clock on-ground assistance from the moment you take off until your safe return.</p>
          </div>
        </div>

        {/* Consultation CTA */}
        <div className="bg-[#10221b] text-white p-12 rounded-3xl text-center max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-serif font-bold text-white">
            Let’s Create Your Next Memory
          </h2>
          <p className="text-gray-300 text-sm max-w-lg mx-auto">
            Schedule a private travel consultation with our senior destination advisors today.
          </p>
          <button
            onClick={() => openEnquiryModal({ source: 'About Us Page CTA' })}
            className="px-8 py-3.5 bg-[#f29727] hover:bg-[#db841a] text-[#10221b] text-xs font-bold uppercase tracking-widest rounded-full shadow-lg transition-all"
          >
            Start Planning With Us
          </button>
        </div>
      </div>
    </div>
  );
}
