import React, { useState, useEffect } from 'react';
import { getPublishedExpertiseCards, EXPERTISE_EVENT, initialTenPartners } from '../../utils/expertiseManager';

export const expertisePartners = initialTenPartners;

export default function ExpertiseSection() {
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

  if (!partnerCards || partnerCards.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-[#fbfaf8] text-center border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Area matching Image 2 */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-2 text-[#c59b27] font-bold text-xs sm:text-sm uppercase tracking-[0.25em] mb-3">
            <span>◆</span>
            <span>OUR EXPERTISE</span>
            <span>◆</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#10221b] mb-4 tracking-tight font-sans">
            Knowledge Behind Every Journey
          </h2>
          <p className="text-[#555555] text-sm sm:text-[15px] max-w-2xl mx-auto font-normal leading-relaxed">
            Our destination specialists continually expand their knowledge through tourism-board programmes, industry training and global certifications to design journeys you can trust.
          </p>

          {/* Golden Infinity Loop Ornament matching Image 2 */}
          <div className="flex justify-center mt-5">
            <svg width="44" height="22" viewBox="0 0 44 22" fill="none" stroke="#c59b27" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11C18 3 6 3 6 11C6 19 18 19 22 11C26 3 38 3 38 11C38 19 26 19 22 11Z" />
            </svg>
          </div>
        </div>

        {/* 10 Expertise Partner Cards Grid (5x2) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
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
                    e.target.src = '/assets/site/white_logo.png';
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

        {/* Dark Green Pill Bar with 4 Benefits matching screenshot */}
        <div className="mt-14 bg-[#10221b] text-white rounded-2xl p-6 sm:p-8 shadow-xl max-w-5xl mx-auto border border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-[#c59b27] flex items-center justify-center text-xl text-[#c59b27] flex-shrink-0">
                ♙
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#f3efe8]">Expert Knowledge</h4>
                <p className="text-xs text-[#cfc9be]">Destination training & global insights</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-[#c59b27] flex items-center justify-center text-xl text-[#c59b27] flex-shrink-0">
                ⌂
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#f3efe8]">Trusted Expertise</h4>
                <p className="text-xs text-[#cfc9be]">Certified by leading tourism boards</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-[#c59b27] flex items-center justify-center text-xl text-[#c59b27] flex-shrink-0">
                ◎
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#f3efe8]">Better Journeys</h4>
                <p className="text-xs text-[#cfc9be]">Meaningful & enriching experiences</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full border border-[#c59b27] flex items-center justify-center text-xl text-[#c59b27] flex-shrink-0">
                ♡
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#f3efe8]">Committed to You</h4>
                <p className="text-xs text-[#cfc9be]">Continuous learning for travellers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Commitment Note */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-500 max-w-2xl mx-auto italic font-sans">
          <span className="text-[#c59b27]">♧</span>
          <span>Our partnerships reflect our commitment to providing authentic experiences and exceptional journeys worldwide.</span>
        </div>

      </div>
    </section>
  );
}
