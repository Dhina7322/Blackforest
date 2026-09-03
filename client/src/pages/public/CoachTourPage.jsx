import React from 'react';
import { Bus, Users, ShieldCheck, MapPin, CalendarCheck, CheckCircle2 } from 'lucide-react';
import { useSettings } from '../../context/SiteSettingsContext';

export default function CoachTourPage() {
  const { openEnquiryModal } = useSettings();

  const benefits = [
    { title: 'Executive Luxury Fleet', desc: 'Mercedes and Setra touring coaches with extra legroom, onboard Wi-Fi, and panoramic sightseeing windows.' },
    { title: 'Expert Tour Directors', desc: 'Experienced bilingual tour managers guiding you through every historical milestone with cultural insight.' },
    { title: 'Luggage Porterage Included', desc: 'Door-to-door luggage handling at every hotel stop for completely effortless group travel.' },
    { title: 'Carefully Paced Itineraries', desc: 'Balanced travel times with ample leisure hours, photo stops, and authentic culinary inclusions.' }
  ];

  return (
    <div className="pt-24 pb-20 bg-[#fbfaf8] animate-fadeIn">
      {/* Header */}
      <div className="bg-[#10221b] text-white py-16 px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-xs uppercase font-bold tracking-widest text-[#f29727] block mb-2">
            Escorted Group Expeditions
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">
            Luxury Coach Tours
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
            Experience the camaraderie, comfort, and scenic beauty of escorted European and Indian road journeys in premium coaches.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((b, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-3">
              <span className="text-xs font-bold text-[#f29727] uppercase tracking-wider">0{idx + 1}.</span>
              <h3 className="text-lg font-serif font-bold text-[#10221b]">{b.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#10221b] text-white p-10 sm:p-14 rounded-3xl text-center max-w-3xl mx-auto space-y-6">
          <Bus className="w-12 h-12 text-[#f29727] mx-auto" />
          <h2 className="text-3xl font-serif font-bold text-white">
            Upcoming Coach Departures & Custom Charters
          </h2>
          <p className="text-gray-300 text-sm max-w-xl mx-auto">
            Book individual seats on our seasonal European tours or charter private coaches for community, family, and association groups.
          </p>
          <button
            onClick={() => openEnquiryModal({ source: 'Coach Tour Page', title: 'Coach Tour Package Inquiry' })}
            className="px-8 py-3.5 bg-[#f29727] hover:bg-[#db841a] text-[#10221b] text-xs font-bold uppercase tracking-widest rounded-full shadow-lg transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Inquire Coach Schedules</span>
          </button>
        </div>
      </div>
    </div>
  );
}
