import React, { useState, useEffect } from 'react';
import { Star, ShieldCheck, Trophy, Heart } from 'lucide-react';
import { getPublishedExpertiseCards, EXPERTISE_EVENT } from '../../utils/expertiseManager';

export default function ExpertiseLogosSection() {
  const [partnerCards, setPartnerCards] = useState(() => getPublishedExpertiseCards());

  useEffect(() => {
    const handleUpdate = () => {
      setPartnerCards(getPublishedExpertiseCards());
    };
    window.addEventListener(EXPERTISE_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener(EXPERTISE_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const benefits = [
    { title: 'EXPERT KNOWLEDGE', desc: 'Destination training and global insights.', icon: Star },
    { title: 'TRUSTED EXPERTISE', desc: 'Certified by leading tourism boards and industry bodies.', icon: ShieldCheck },
    { title: 'BETTER JOURNEYS', desc: 'Knowledge that creates meaningful and enriching experiences.', icon: Trophy },
    { title: 'COMMITTED TO YOU', desc: 'Continuous learning for travellers, always.', icon: Heart },
  ];

  return (
    <section className="py-24 bg-[#fbfaf8] relative z-10 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Area */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="flex items-center justify-center gap-2 text-[#c59b27] font-bold tracking-widest text-xs uppercase mb-2">
            <span className="w-1.5 h-1.5 bg-[#c59b27] rotate-45 transform"></span>
            OUR EXPERTISE
            <span className="w-1.5 h-1.5 bg-[#c59b27] rotate-45 transform"></span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#10221b]">
            Knowledge Behind Every Journey
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto pt-2">
            We are well-traveled consultants continually expanding through tourism board programmes, industry training, and global partnerships to design journeys you can trust.
          </p>

          {/* Golden Center Flourish */}
          <div className="flex justify-center mt-4">
            <svg width="40" height="20" viewBox="0 0 40 20" fill="none" stroke="#c59b27" strokeWidth="1.5">
              <path d="M20 10 C 14 2, 4 2, 4 10 C 4 18, 14 18, 20 10 Z" fill="none"/>
              <path d="M20 10 C 26 2, 36 2, 36 10 C 36 18, 26 18, 20 10 Z" fill="none"/>
              <circle cx="20" cy="10" r="2" fill="#c59b27" />
            </svg>
          </div>
        </div>

        {/* 10 Expertise Partner Cards Grid (5x2) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6 mb-16">
          {partnerCards.map((partner) => (
            <a
              key={partner.id}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-2xl border border-[#ece8df] p-5 sm:p-6 flex flex-col items-center justify-between text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#c59b27] group min-h-[220px]"
            >
              {/* Logo container */}
              <div className="w-full h-24 flex items-center justify-center p-1 mb-2">
                <img 
                  src={partner.image} 
                  alt={partner.name} 
                  className="max-h-20 max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/120x60?text=' + partner.name;
                  }}
                />
              </div>

              {/* Decorative Divider with Diamond */}
              <div className="w-full flex items-center justify-center my-3">
                <div className="flex-1 h-[1px] bg-[#e4ddd0] group-hover:bg-[#c59b27]/40 transition-colors"></div>
                <span className="mx-2.5 w-1.5 h-1.5 bg-[#c59b27] rotate-45 transform"></span>
                <div className="flex-1 h-[1px] bg-[#e4ddd0] group-hover:bg-[#c59b27]/40 transition-colors"></div>
              </div>

              {/* Text Info */}
              <div className="w-full pt-1">
                <h4 className="font-bold text-[#10221b] text-sm sm:text-[15px] uppercase tracking-wider font-sans group-hover:text-[#c59b27] transition-colors">
                  {partner.name}
                </h4>
                <p className="text-gray-500 text-xs mt-1 font-normal leading-tight">
                  {partner.subtitle}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Dark Green Banner */}
        <div className="bg-[#10221b] rounded-2xl p-8 lg:p-12 text-white shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div key={idx} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center text-[#f29727]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs uppercase tracking-wider mb-2">{b.title}</h5>
                    <p className="text-gray-400 text-[11px] leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-12 pt-6 border-t border-gray-800 text-center flex items-center justify-center gap-4 text-[10px] text-gray-400 uppercase tracking-widest">
             <div className="w-12 h-[1px] bg-gray-700"></div>
             Our partnerships reflect our commitment to providing authentic experiences and exceptional journeys worldwide.
             <div className="w-12 h-[1px] bg-gray-700"></div>
          </div>
        </div>

      </div>
    </section>
  );
}
