import React from 'react';

export default function ValuePropsSection() {
  const features = [
    {
      id: 1,
      icon: '/assets/images/adven-home-new-icon-01.png',
      title: 'Free cancellation',
      desc: 'Stay flexible with easy and hassle-free cancellation options.'
    },
    {
      id: 2,
      icon: '/assets/images/adven-home-new-icon-02.png',
      title: 'Comprehensive Insurance',
      desc: "Travel with peace of mind knowing you're fully covered."
    },
    {
      id: 3,
      icon: '/assets/images/adven-home-new-icon-03.png',
      title: 'Special Promotions',
      desc: 'Unlock exclusive deals, discounts, and seasonal offers.'
    },
    {
      id: 4,
      icon: '/assets/images/adven-home-new-icon-04.png',
      title: 'Guidance for Every Step',
      desc: 'Expert advice and local insights to help you travel smarter.'
    },
    {
      id: 5,
      icon: '/assets/images/adven-home-new-icon-05.png',
      title: 'Personalized Assistance',
      desc: 'Dedicated support tailored to your unique travel needs.'
    },
    {
      id: 6,
      icon: '/assets/images/adven-home-new-icon-06.png',
      title: 'Seamless Travel Support',
      desc: "From planning to return, we're with you every step of the way."
    }
  ];

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 bg-[#fbfaf8] overflow-hidden">
      {/* Mountain Backpacker Background on the left from uploaded assets */}
      <div 
        className="absolute inset-y-0 left-0 w-full lg:w-1/2 z-0 bg-cover bg-center opacity-85 pointer-events-none hidden sm:block"
        style={{ 
          backgroundImage: "url('/assets/images/liam-pozz-HZvGtncWvyQ-unsplash-scaled.jpg')",
          backgroundPosition: "left bottom"
        }}
      />
      {/* Soft gradient fade for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#fbfaf8]/80 to-[#fbfaf8] lg:from-transparent lg:via-[#fbfaf8]/40 lg:to-[#fbfaf8] z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left spacer for desktop to allow backpacker photo to show prominently */}
          <div className="hidden lg:block lg:col-span-5 h-[420px]" />

          {/* Right Column: Title + 6 Features matching reference layout */}
          <div className="lg:col-span-7 bg-[#fbfaf8]/95 lg:bg-transparent p-6 sm:p-8 rounded-2xl backdrop-blur-sm lg:backdrop-blur-none border border-gray-100 lg:border-none shadow-sm lg:shadow-none">
            
            {/* Eyebrow & Title */}
            <div className="mb-8 sm:mb-10 text-left">
              <span 
                className="text-2xl sm:text-[28px] block mb-1"
                style={{
                  fontFamily: "var(--font-cursive, 'Caveat', cursive, serif)",
                  color: "#27B8B1"
                }}
              >
                Why choose our travel agency
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#5e963b] tracking-wide font-sans">
                We Offer the best
              </h2>
            </div>

            {/* 6 Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7 sm:gap-y-8">
              {features.map((item) => (
                <div key={item.id} className="flex items-start gap-4 group">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-xs border border-gray-100 p-2">
                    <img 
                      src={item.icon} 
                      alt={item.title} 
                      className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h3 className="text-[15px] sm:text-[16px] font-bold text-[#222222] font-sans mb-1 group-hover:text-[#5e963b] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[13px] text-[#666666] leading-relaxed font-light">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
