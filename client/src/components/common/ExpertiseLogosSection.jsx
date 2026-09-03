import React from 'react';
import { Star, ShieldCheck, Trophy, Heart } from 'lucide-react';

export default function ExpertiseLogosSection() {
  const logos = [
    { name: 'Peru', subtitle: 'Travel Specialist', image: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Marca_Per%C3%BA_logo.svg' },
    { name: 'Korea', subtitle: 'Travel Specialist', image: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Imagine_your_Korea_logo.svg' },
    { name: 'Greece', subtitle: 'Tourism Specialist', image: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Visit_Greece_logo.svg' },
    { name: 'Japan', subtitle: 'Travel Specialist', image: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Japan_National_Tourism_Organization_logo.svg' },
    { name: 'IATA', subtitle: 'TIDS Certified', image: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/IATA_logo.svg' },
    { name: 'Portugal', subtitle: 'Tourism Partner', image: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Visit_Portugal_logo.svg' },
    { name: 'Algarve', subtitle: 'Sustainable Experiences', image: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Visit_Algarve_logo.svg' },
    { name: 'Spain', subtitle: 'Destination Specialist', image: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Spain_tourism_logo.svg' },
  ];

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
          <div className="flex items-center justify-center gap-2 text-[#f29727] font-bold tracking-widest text-xs uppercase mb-2">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="rotate-45"><rect width="24" height="24"/></svg>
            OUR EXPERTISE
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="rotate-45"><rect width="24" height="24"/></svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#10221b]">
            Knowledge Behind Every Journey
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed max-w-2xl mx-auto pt-2">
            We are well-traveled consultants continually expanding through tourism board programmes, industry training, and global partnerships to design journeys you can trust.
          </p>
        </div>

        {/* Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
          {logos.map((logo, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
              <div className="w-24 h-16 mb-4 flex items-center justify-center">
                <img src={logo.image} alt={logo.name} className="w-full h-full object-contain" />
              </div>
              <h4 className="font-bold text-[#10221b] text-sm uppercase tracking-wide">{logo.name}</h4>
              <p className="text-gray-500 text-[10px] mt-1 uppercase">{logo.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Dark Green Banner */}
        <div className="bg-[#10221b] rounded-2xl p-8 lg:p-12 text-white">
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
