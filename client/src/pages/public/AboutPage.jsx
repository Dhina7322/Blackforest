import React from 'react';
import { useSettings } from '../../context/SiteSettingsContext';

export default function AboutPage() {
  const { openEnquiryModal } = useSettings();

  return (
    <div className="pt-24 pb-20 bg-white animate-fadeIn">
      {/* Hero Header */}
      <div className="relative bg-[#10221b] text-white py-24 px-4 sm:px-6 lg:px-8 mb-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1920&q=80" 
            alt="About Blackforest Holidays" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white mb-6 uppercase tracking-widest drop-shadow-md">
            About
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Intro Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-[#f29727]">Travel Dreams Begins</h3>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#10221b]">
            Redefining the Way You Explore the World
          </h2>
          <p className="text-gray-600 text-base leading-relaxed pt-4">
            At Blackforest Holidays, we believe that travel is more than just reaching a destination—it's about the transformative experiences, the connections made, and the memories crafted along the way.
          </p>
        </div>

        {/* Two Column Layout: Luxury vs Experiences */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-bold text-[#10221b]">Where Luxury Meets Extraordinary Journeys</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              We specialize in curating bespoke travel itineraries that blend unparalleled luxury with authentic local experiences. Whether you are seeking a private villa in the Maldives or an exclusive safari in the Serengeti, our team ensures every detail is meticulously planned.
            </p>
            <h5 className="text-lg font-bold text-[#5e963b] pt-4">A Journey designed for activities to make sure you enjoy & stay thrilled.</h5>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-bold text-[#10221b]">Beyond Travel - We Create Experiences</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Our travel specialists are not just planners; they are passionate explorers who have personally vetted the world's most luxurious accommodations and experiences. We go above and beyond to grant you access to the inaccessible.
            </p>
          </div>
        </div>

        {/* Curated Journeys Image Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="group relative overflow-hidden rounded-xl shadow-lg">
            <img 
              src="https://blackforestholidays.com/wp-content/uploads/2026/07/Blackforest-about-1.png" 
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?auto=format&fit=crop&w=800&q=80'; }}
              alt="Exclusive Escapes" 
              className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8 text-white">
              <h5 className="text-2xl font-bold font-serif">Exclusive Escapes for Discerning Travelers</h5>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-xl shadow-lg">
            <img 
              src="https://blackforestholidays.com/wp-content/uploads/2026/07/Untitled-design-1.png" 
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1517400508447-f8dd518b86db?auto=format&fit=crop&w=800&q=80'; }}
              alt="Curated Journeys" 
              className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-8 text-white">
              <h5 className="text-2xl font-bold font-serif">Curated Journeys for the Elite Traveler</h5>
            </div>
          </div>
        </div>

        {/* Eden's Trial Section */}
        <div className="bg-[#fbfaf8] p-12 rounded-3xl border border-gray-100 shadow-sm mt-20">
          <div className="text-center space-y-3 mb-12">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#f29727]">The trial everyone loves</h3>
            <h2 className="text-4xl font-serif font-bold text-[#10221b]">Eden's Trial</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center space-y-3">
              <img src="https://blackforestholidays.com/wp-content/uploads/2021/07/about-icon-1.png" alt="Location" className="w-10 h-10 object-contain" />
              <div>
                <h5 className="font-bold text-[#10221b]">Location</h5>
                <p className="text-sm text-gray-500">Masai Mara, Kenya</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <img src="https://blackforestholidays.com/wp-content/uploads/2021/07/about-icon-4.png" alt="Distance" className="w-10 h-10 object-contain" />
              <div>
                <h5 className="font-bold text-[#10221b]">Distance</h5>
                <p className="text-sm text-gray-500">73 km</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <img src="https://blackforestholidays.com/wp-content/uploads/2021/07/about-icon-2.png" alt="Lead Guide" className="w-10 h-10 object-contain" />
              <div>
                <h5 className="font-bold text-[#10221b]">Lead Guide</h5>
                <p className="text-sm text-gray-500">James Conrad</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center space-y-3">
              <img src="https://blackforestholidays.com/wp-content/uploads/2021/07/about-icon-3.png" alt="Difficulty" className="w-10 h-10 object-contain" />
              <div>
                <h5 className="font-bold text-[#10221b]">Difficulty Rating</h5>
                <p className="text-sm text-gray-500">Intermediate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Knowledge Base */}
        <div className="text-center space-y-12">
          <h2 className="text-3xl font-serif font-bold text-[#10221b]">Knowledge Behind Every Journey</h2>
          <div className="flex flex-wrap justify-center gap-8">
            <a href="https://www.peru.travel/" target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:border-[#f29727] transition-all font-bold text-[#10221b]">
              Peru
            </a>
            <a href="https://english.visitkorea.or.kr/" target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:border-[#f29727] transition-all font-bold text-[#10221b]">
              Korea
            </a>
            <a href="https://www.visitgreece.gr/" target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:border-[#f29727] transition-all font-bold text-[#10221b]">
              Greece
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
