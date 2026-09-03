import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Plane, FileCheck, Anchor, CheckCircle2, ShieldCheck, Clock, Headphones } from 'lucide-react';
import { useSettings } from '../../context/SiteSettingsContext';

export default function ConciergePage() {
  const location = useLocation();
  const path = location.pathname;
  const { openEnquiryModal } = useSettings();

  let serviceKey = 'overview';
  if (path.includes('flight-booking')) serviceKey = 'flights';
  else if (path.includes('visa-assistance')) serviceKey = 'visas';
  else if (path.includes('cruises')) serviceKey = 'cruises';

  const details = {
    overview: {
      title: 'VIP Travel Concierge Services',
      subtitle: 'Effortless Luxury Across Every Journey Milestone',
      desc: 'Our white-glove concierge department handles complex flight routing, expedited visa processing, private aviation, and luxury cruise charters with military precision.',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80',
      icon: Headphones
    },
    flights: {
      title: 'Flight Booking & Aviation Concierge',
      subtitle: 'First Class, Business Class & Private Charter Management',
      desc: 'Take advantage of our preferred airline partnerships, mileage upgrades, complimentary lounge access, and proactive schedule monitoring for international travel.',
      image: 'https://images.unsplash.com/photo-1540339832862-474599807836?auto=format&fit=crop&w=1600&q=80',
      icon: Plane
    },
    visas: {
      title: 'Comprehensive Visa Assistance',
      subtitle: 'Hassle-Free Global Travel Documentation',
      desc: 'Navigating embassy requirements, biometrics appointments, official invitation letters, and multi-entry tourist visas for Europe, USA, UK, Australia, and Asia.',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80',
      icon: FileCheck
    },
    cruises: {
      title: 'Luxury Ocean & River Cruises',
      subtitle: 'Sailing the World’s Most Majestic Waterways',
      desc: 'Charter private yachts, reserve balcony suites on Silversea, Regent Seven Seas, and Royal Caribbean, or glide down European rivers like the Rhine and Danube.',
      image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1600&q=80',
      icon: Anchor
    }
  };

  const current = details[serviceKey];
  const IconComponent = current.icon;

  const features = [
    { title: 'Dedicated Specialist', desc: 'A personal travel advisor assigned exclusively to manage your travel portfolio.' },
    { title: 'IATA Accredited Standards', desc: 'Direct access to global airline reservation systems (GDS) with zero intermediaries.' },
    { title: '24/7 Global Dispatch', desc: 'Immediate disruption response and live re-booking during unforeseen weather or flight delays.' }
  ];

  return (
    <div className="animate-fadeIn">
      {/* Hero */}
      <div className="relative h-[55vh] min-h-[420px] bg-[#10221b] text-white flex items-end">
        <div className="absolute inset-0 z-0">
          <img
            src={current.image}
            alt={current.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10221b] via-[#10221b]/60 to-black/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#f29727] mb-3">
            <IconComponent className="w-4 h-4" />
            <span>Blackforest Concierge</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-3">
            {current.title}
          </h1>
          <p className="text-gray-200 text-sm sm:text-base max-w-2xl leading-relaxed">
            {current.desc}
          </p>
        </div>
      </div>

      {/* Content & Service Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto pb-6 mb-16 no-scrollbar">
          <Link
            to="/concierge"
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              serviceKey === 'overview'
                ? 'bg-[#10221b] text-[#f29727] shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Overview
          </Link>
          <Link
            to="/concierge/flight-booking"
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              serviceKey === 'flights'
                ? 'bg-[#10221b] text-[#f29727] shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Flight Booking
          </Link>
          <Link
            to="/concierge/visa-assistance"
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              serviceKey === 'visas'
                ? 'bg-[#10221b] text-[#f29727] shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Visa Assistance
          </Link>
          <Link
            to="/concierge/cruises"
            className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              serviceKey === 'cruises'
                ? 'bg-[#10221b] text-[#f29727] shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            Luxury Cruises
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {features.map((feat, idx) => (
            <div key={idx} className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm space-y-3">
              <span className="text-xs font-bold text-[#f29727] uppercase tracking-wider">0{idx + 1}.</span>
              <h3 className="text-xl font-serif font-bold text-[#10221b]">{feat.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Card */}
        <div className="bg-[#10221b] text-white p-12 rounded-3xl text-center max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl font-serif font-bold text-white">
            Need Expert Concierge Support?
          </h2>
          <p className="text-gray-300 text-sm max-w-xl mx-auto">
            Contact our senior travel specialists to arrange customized airfares, group ticketing, visa applications, or cruise staterooms.
          </p>
          <button
            onClick={() => openEnquiryModal({ title: `Concierge: ${current.title}` })}
            className="px-8 py-3.5 bg-[#f29727] hover:bg-[#db841a] text-[#10221b] text-xs font-bold uppercase tracking-widest rounded-full shadow-lg transition-all"
          >
            Contact Concierge Specialist
          </button>
        </div>
      </div>
    </div>
  );
}
