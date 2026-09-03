import React, { useEffect } from 'react';
import { Play, ChevronUp } from 'lucide-react';
import { useSettings } from '../../context/SiteSettingsContext';

export default function CorporateTravelPage() {
  const { openEnquiryModal } = useSettings();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white min-h-screen relative animate-fadeIn">
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        {/* Background Image / Video Mockup */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1920&q=80"
            alt="Corporate Travel Passengers"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center space-y-4 px-4 text-center mt-12">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white uppercase drop-shadow-xl flex items-center justify-center flex-wrap gap-x-4 gap-y-2">
            <span>CORPORATE</span>
            <button className="text-red-600 bg-white rounded-[16px] sm:rounded-3xl p-1 shadow-lg hover:scale-110 transition-transform flex items-center justify-center">
              <Play className="w-8 h-8 sm:w-12 sm:h-12 fill-current" />
            </button>
            <span>TRAVELS</span>
          </h1>
        </div>

        {/* Wavy Bottom SVG Mask */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
          <svg
            className="relative block w-full h-[50px] sm:h-[80px]"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              fill="#ffffff"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              fill="#ffffff"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              fill="#ffffff"
            ></path>
          </svg>
        </div>
      </section>

      {/* 2. INTRO / ABOUT SECTION */}
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
          <div className="text-center mb-16">
            <h2 
              className="text-3xl md:text-4xl"
              style={{
                fontFamily: "'Caveat', 'Dancing Script', cursive",
                color: "#27B8B1"
              }}
            >
              Travel is the only thing you buy that makes you richer
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mt-12">
            {/* Left Content Area */}
            <div className="space-y-6 bg-white/80 p-4 rounded-xl backdrop-blur-sm lg:bg-transparent lg:p-0">
              <div>
                <h3 className="text-3xl sm:text-4xl font-bold text-[#5e963b] leading-tight mb-4">
                  Let us plan your journey, <br />
                  You create the memories.
                </h3>
                <div className="w-16 h-0.5 bg-[#27B8B1]"></div>
              </div>

              <div className="space-y-4 text-gray-600 text-sm md:text-base leading-relaxed">
                <p>
                  Welcome to <strong>BLACKFOREST HOLIDAYS</strong>, your trusted partner in
                  creating unforgettable travel experiences. We believe that every
                  journey should be more than just a trip—it should be a collection
                  of wonderful memories, new discoveries, and meaningful experiences.
                </p>
                <p>
                  With our expertise in travel planning, we help individuals,
                  families, couples, and groups plan their perfect getaway. From
                  flights and hotels to customized holiday packages, sightseeing,
                  transportation, and travel assistance, we take care of the details
                  so you can enjoy your journey with confidence.
                </p>
              </div>
            </div>

            {/* Right Image Area */}
            <div className="relative z-20">
              <div className="bg-white p-2 shadow-2xl rounded-sm transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80"
                  alt="World map travel planning"
                  className="w-full h-auto object-cover border border-gray-100"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-[#f29727] hover:bg-[#db841a] text-white p-3 rounded-md shadow-lg z-50 transition-all transform hover:-translate-y-1"
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-5 h-5" />
      </button>
    </div>
  );
}
