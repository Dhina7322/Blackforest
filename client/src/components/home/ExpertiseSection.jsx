import React, { useState, useEffect } from 'react';
import { ShieldCheck, Award, Globe, CheckCircle2 } from 'lucide-react';
import { expertiseService } from '../../services/allServices';

export default function ExpertiseSection() {
  const [expertiseList, setExpertiseList] = useState([]);

  useEffect(() => {
    const fetchExpertise = async () => {
      try {
        const res = await expertiseService.getAll({ status: 'published' });
        if (res.success && res.data) {
          setExpertiseList(res.data);
        }
      } catch (err) {
        console.error('Error loading expertise:', err);
      }
    };
    fetchExpertise();
  }, []);

  const pillars = [
    { title: 'Target Markets', desc: 'Deep on-ground relationships with premier hoteliers and local operators.' },
    { title: 'Expert Knowledge', desc: 'Destination specialists certified by international national tourism boards.' },
    { title: 'Trusted Expertise', desc: 'Over 15 years crafting verified private journeys with zero compromise.' },
    { title: 'Better Journeys', desc: 'Authentic encounters that connect you directly with local cultures.' },
    { title: 'Committed to You', desc: '24/7 dedicated personal concierge from reservation to return.' }
  ];

  return (
    <section className="py-24 bg-[#10221b] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#f29727] font-bold block mb-2">
            Blackforest Holidays
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
            Knowledge Behind Every Journey
          </h2>
          <p className="text-gray-300 text-sm mt-3">
            Accredited by international travel boards and leading tourism organizations worldwide.
          </p>
        </div>

        {/* Partner Logos & Accreditations */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 mb-16">
          {expertiseList.map((item) => (
            <a
              key={item.id}
              href={item.link || '#'}
              target={item.link ? '_blank' : '_self'}
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#f29727]/50 hover:bg-white/10 transition-all duration-300 flex flex-col items-center justify-center text-center group"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden mb-2 border border-white/20 group-hover:border-[#f29727]">
                <img
                  src={item.logo || 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=100&q=80'}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                />
              </div>
              <span className="text-xs font-semibold text-gray-200 group-hover:text-[#f29727] transition-colors leading-tight">
                {item.name}
              </span>
            </a>
          ))}
        </div>

        {/* 5 Strategic Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 pt-12 border-t border-white/10">
          {pillars.map((p, idx) => (
            <div key={idx} className="space-y-2">
              <span className="text-[#f29727] text-xs font-bold uppercase tracking-widest block">
                0{idx + 1}.
              </span>
              <h4 className="text-base font-serif font-bold text-white">
                {p.title}
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
