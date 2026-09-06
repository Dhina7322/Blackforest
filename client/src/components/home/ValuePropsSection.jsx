import React from 'react';
import { 
  Map, 
  MapPin, 
  Wrench, 
  Caravan, 
  CalendarCheck, 
  Headphones 
} from 'lucide-react';

export default function ValuePropsSection() {
  const services = [
    {
      id: 1,
      icon: <Map className="w-10 h-10 stroke-[1.2] transition-colors duration-300 group-hover:text-[#f29727]" />,
      title: "Tailor-Made Journeys",
      desc: "Travel experiences thoughtfully designed around your interests, style, and dreams.",
    },
    {
      id: 2,
      icon: <MapPin className="w-10 h-10 stroke-[1.2] transition-colors duration-300 group-hover:text-[#f29727]" />,
      title: "Exceptional Experiences",
      desc: "Discover extraordinary places and unforgettable moments, curated just for you.",
    },
    {
      id: 3,
      icon: <Wrench className="w-10 h-10 stroke-[1.2] transition-colors duration-300 group-hover:text-[#f29727]" />,
      title: "Expert Travel Design",
      desc: "Our experienced travel specialists bring knowledge, care, and attention to every journey.",
    },
    {
      id: 4,
      icon: <Caravan className="w-10 h-10 stroke-[1.2] transition-colors duration-300 group-hover:text-[#f29727]" />,
      title: "Journeys For Every Story",
      desc: "From romantic escapes to family adventures, we create travel experiences that feel truly personal.",
    },
    {
      id: 5,
      icon: <CalendarCheck className="w-10 h-10 stroke-[1.2] transition-colors duration-300 group-hover:text-[#f29727]" />,
      title: "Personalised Itineraries",
      desc: "Detailed day-by-day plans crafted specifically to maximize your time and enjoyment.",
    },
    {
      id: 6,
      icon: <Headphones className="w-10 h-10 stroke-[1.2] transition-colors duration-300 group-hover:text-[#f29727]" />,
      title: "Seamless Travel Support",
      desc: "From your first enquiry to your return home, we ensure every detail is handled flawlessly.",
    }
  ];

  return (
    <section className="relative py-24 bg-[#fbfaf8] overflow-hidden">
      {/* Light mountain/clouds background graphic */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none">
        <img 
          src="/images/destinations/destinations-150389903608.webp" 
          alt="Mountains Background" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Optional/Hidden if they just want the grid directly, but I will keep it matching the previous style, just aligning with the image) */}
        
        {/* 6-Item Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {services.map((srv) => (
            <div key={srv.id} className="flex gap-5 group items-start border-b border-gray-100 pb-8 last:border-0 md:[&:nth-last-child(-n+2)]:border-0 cursor-pointer">
              <div className="text-gray-800 transition-transform duration-300 mt-1">
                {srv.icon}
              </div>
              <div>
                <h3 className="text-[22px] font-bold text-gray-900 group-hover:text-[#f29727] transition-colors duration-300 font-serif mb-2 tracking-wide">
                  {srv.title}
                </h3>
                <p className="text-[15px] text-gray-500 font-light leading-relaxed">
                  {srv.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
