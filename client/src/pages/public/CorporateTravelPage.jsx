import React from 'react';
import { Briefcase, Award, Users, Globe, ShieldCheck, CalendarCheck } from 'lucide-react';
import { useSettings } from '../../context/SiteSettingsContext';

export default function CorporateTravelPage() {
  const { openEnquiryModal } = useSettings();

  const services = [
    { title: 'Executive & MICE Journeys', desc: 'Comprehensive Meetings, Incentives, Conferences, and Exhibitions logistics globally.' },
    { title: 'Corporate Retreats & Offsites', desc: 'Inspiring coastal and mountain venues for leadership summits and strategic retreats.' },
    { title: 'Dedicated Account Manager', desc: 'Centralized billing, real-time travel expense reporting, and corporate airline negotiations.' },
    { title: 'VIP Airport Meet & Greets', desc: 'Tarmac transfers, priority lounge access, and expedited fast-track immigration services.' }
  ];

  return (
    <div className="pt-24 pb-20 bg-[#fbfaf8] animate-fadeIn">
      {/* Banner */}
      <div className="bg-[#10221b] text-white py-16 px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-xs uppercase font-bold tracking-widest text-[#f29727] block mb-2">
            Executive Mobility & MICE
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">
            Corporate Travel Management
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
            Delivering strategic business travel solutions, high-impact international conferences, and luxury corporate incentive escapes.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((srv, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-3">
              <span className="text-xs font-bold text-[#f29727] uppercase tracking-wider">0{idx + 1}.</span>
              <h3 className="text-lg font-serif font-bold text-[#10221b]">{srv.title}</h3>
              <p className="text-xs text-gray-600 leading-relaxed">{srv.desc}</p>
            </div>
          ))}
        </div>

        {/* Corporate Request Form Card */}
        <div className="bg-[#10221b] text-white p-10 sm:p-14 rounded-3xl text-center max-w-3xl mx-auto space-y-6">
          <Briefcase className="w-12 h-12 text-[#f29727] mx-auto" />
          <h2 className="text-3xl font-serif font-bold text-white">
            Plan Your Next Corporate Delegation
          </h2>
          <p className="text-gray-300 text-sm max-w-xl mx-auto">
            Discuss customized group ticketing, venue selection, and bespoke company retreat agendas with our Corporate Desk.
          </p>
          <button
            onClick={() => openEnquiryModal({ source: 'Corporate Travel Page', title: 'Corporate & MICE Travel Enquiry' })}
            className="px-8 py-3.5 bg-[#f29727] hover:bg-[#db841a] text-[#10221b] text-xs font-bold uppercase tracking-widest rounded-full shadow-lg transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Request Corporate Proposal</span>
          </button>
        </div>
      </div>
    </div>
  );
}
