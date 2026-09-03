import React from 'react';

export default function IntroSection() {
  return (
    <section className="relative py-20 overflow-hidden bg-white z-10">
      {/* Decorative Mountain Background Silhouette */}
      <div className="absolute top-10 left-0 w-full h-[120%] opacity-20 pointer-events-none z-0 hidden md:block">
        <svg
          viewBox="0 0 1200 800"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <path
            fill="#6b8e23"
            d="M0,800 L0,400 Q150,250 300,450 T700,300 T1000,500 L1200,350 L1200,800 Z"
          />
          <path
            fill="#8fbc8f"
            d="M0,800 L0,550 Q200,400 450,550 T850,400 T1200,600 L1200,800 Z"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cursive Quote */}
        <div className="text-center mb-16 relative z-10">
          <h2 
            className="text-3xl md:text-[32px]"
            style={{
              fontFamily: "var(--font-cursive)",
              color: "#27B8B1"
            }}
          >
            Travel is the only thing you buy that makes you richer
          </h2>
        </div>

        <div className="relative">
          {/* Decorative Mask Background */}
          <div className="absolute top-[-40px] left-[-80px] w-full max-w-2xl opacity-10 pointer-events-none z-0 hidden lg:block">
            <img 
              src="https://blackforestholidays.com/wp-content/uploads/2021/07/mask-pine.jpg.webp" 
              alt="Background Silhouette" 
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
            {/* Left Content Area */}
            <div className="bg-white p-8 lg:p-12 shadow-sm lg:max-w-md mx-auto lg:mr-auto">
              <div className="mb-6">
                <h3 className="text-[26px] sm:text-[32px] font-bold text-[#5e963b] leading-tight font-serif tracking-wide">
                  Let us plan your journey,<br />
                  You create the memories.
                </h3>
                <div className="w-12 h-[1px] bg-black mt-6 mb-2"></div>
              </div>

              <div className="space-y-4 text-[#333333] text-[13px] leading-[1.8] font-sans font-light tracking-wide">
                <p>
                  Welcome to BLACKFOREST HOLIDAYS, your trusted partner in creating unforgettable travel experiences. We believe that every journey should be more than just a trip—it should be a collection of wonderful memories, new discoveries, and meaningful experiences.
                </p>
                <p>
                  With our expertise in travel planning, we help individuals, families, couples, and groups plan their perfect getaway. From flights and hotels to customized holiday packages, sightseeing, transportation, and travel assistance, we take care of the details so you can enjoy your journey with confidence.
                </p>
              </div>
            </div>

            {/* Right Image Area */}
            <div className="relative z-20 w-full max-w-[500px] mx-auto lg:ml-auto">
              <div className="bg-white shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80"
                  alt="World map travel planning"
                  className="w-full h-auto object-cover block"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
