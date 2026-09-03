import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Award, HeartHandshake, ShieldCheck } from 'lucide-react';
import { useSettings } from '../../context/SiteSettingsContext';

export default function IntroSection() {
  const { openEnquiryModal } = useSettings();

  return (
    <section id="intro-section" className="py-24 bg-[#fbfaf8] relative overflow-hidden">
      {/* Subtle pine background accent */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-block border-b-2 border-[#f29727] pb-1">
              <span className="text-xs uppercase tracking-widest text-[#10221b] font-bold">
                About Blackforest Holidays
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#10221b] leading-tight">
              Let us plan your journey, <br />
              <span className="italic text-[#f29727] font-normal">You create the memories.</span>
            </h2>

            <p className="text-gray-700 text-base leading-relaxed">
              Welcome to <strong>BLACKFOREST HOLIDAYS</strong>, your trusted partner in creating unforgettable travel experiences. We believe that every journey should be more than just a trip—it should be a collection of wonderful memories, new discoveries, and meaningful experiences.
            </p>

            <p className="text-gray-600 text-sm leading-relaxed">
              With our expertise in bespoke travel planning, we help individuals, families, couples, and groups plan their perfect getaway. From flights and handpicked boutique hotels to customized holiday packages, private sightseeing, seamless transportation, and 24/7 dedicated travel assistance, we take care of every detail so you can enjoy your journey with complete confidence.
            </p>

            {/* Value Checkpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs font-semibold text-[#10221b]">
                <CheckCircle2 className="w-4 h-4 text-[#f29727]" />
                <span>Tailored Private Itineraries</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-semibold text-[#10221b]">
                <Award className="w-4 h-4 text-[#f29727]" />
                <span>Certified Global Specialists</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-semibold text-[#10221b]">
                <HeartHandshake className="w-4 h-4 text-[#f29727]" />
                <span>24/7 Concierge Support</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-semibold text-[#10221b]">
                <ShieldCheck className="w-4 h-4 text-[#f29727]" />
                <span>Transparent & Fair Pricing</span>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <button
                onClick={() => openEnquiryModal({ source: 'Homepage Intro Section' })}
                className="px-7 py-3.5 bg-[#10221b] hover:bg-[#1c382e] text-[#f29727] text-xs uppercase font-bold tracking-widest rounded-full shadow-lg transition-all"
              >
                Start Planning
              </button>
              <Link
                to="/about"
                className="text-xs font-bold uppercase tracking-wider text-[#10221b] hover:text-[#f29727] underline transition-colors"
              >
                Read Our Story →
              </Link>
            </div>
          </div>

          {/* Overlapping Editorial Imagery */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Image */}
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1000&q=80"
                  alt="Alpine Scenic Luxury Holiday"
                  className="w-full h-[460px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Floating Sub-Card */}
              <div className="absolute -bottom-8 -left-6 sm:-left-8 bg-[#10221b] text-white p-6 rounded-2xl shadow-2xl border border-white/10 max-w-xs">
                <span className="text-[#f29727] text-3xl font-serif font-bold block mb-1">15+</span>
                <h4 className="text-sm font-semibold tracking-wide text-white">Years of Travel Craftsmanship</h4>
                <p className="text-xs text-gray-300 mt-1">Creating transformative private journeys across 40+ countries.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
