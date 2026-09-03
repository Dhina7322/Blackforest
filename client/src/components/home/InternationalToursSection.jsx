import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Calendar } from 'lucide-react';

export default function InternationalToursSection() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const autoSlideInterval = useRef(null);

  useEffect(() => {
    // Hardcoded dummy data
    const dummyTours = [
      {
        id: 1,
        slug: 'europe-escape',
        title: '7 DAYS SWISS & PARIS ESCAPE',
        coverImage: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=400&q=80',
        destination: { name: 'EUROPE' }
      },
      {
        id: 2,
        slug: 'dubai-luxury',
        title: '5 DAYS DUBAI LUXURY TOUR',
        coverImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&q=80',
        destination: { name: 'MIDDLE EAST' }
      },
      {
        id: 3,
        slug: 'maldives-retreat',
        title: 'MALDIVES OVERWATER RETREAT',
        coverImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=400&q=80',
        destination: { name: 'INDIAN OCEAN' }
      },
      {
        id: 4,
        slug: 'bali-bliss',
        title: 'BALI CULTURE & BEACHES',
        coverImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80',
        destination: { name: 'SOUTH ASIA' }
      }
    ];
    setTours([...dummyTours, ...dummyTours]); // duplicate for infinite scrolling illusion
    setLoading(false);
  }, []);

  const startAutoSlide = () => {
    stopAutoSlide();
    autoSlideInterval.current = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        // Reset if we reach the end
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
        }
      }
    }, 3000);
  };

  const stopAutoSlide = () => {
    if (autoSlideInterval.current) {
      clearInterval(autoSlideInterval.current);
    }
  };

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, []);

  const scrollTrack = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-24 overflow-hidden bg-[#1a1a1a]">
      {/* Dark overlay background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1920&q=80"
          alt="Dubai Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-between">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Side: Title */}
          <div className="lg:col-span-4 text-white">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold uppercase leading-tight mb-4 tracking-wide font-sans">
              EXPLORE <br className="hidden lg:block" />
              INTERNATIONAL <br className="hidden lg:block" />
              TOUR <br className="hidden lg:block" />
              PACKAGES
            </h2>
            <p className="text-gray-300 text-[13px] max-w-sm mb-8 leading-[1.8]">
              Curated experiences across the globe. From pristine beaches to dazzling cityscapes.
            </p>
          </div>

          {/* Right Side: Slider */}
          <div 
            className="lg:col-span-8 relative"
            onMouseEnter={stopAutoSlide}
            onMouseLeave={startAutoSlide}
            onTouchStart={stopAutoSlide}
            onTouchEnd={startAutoSlide}
          >
            
            {/* Slider Controls */}
            <button
              onClick={() => scrollTrack('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-20 w-8 h-8 bg-black hover:bg-[#1a1a1a] text-white rounded-sm flex items-center justify-center transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => scrollTrack('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-20 w-8 h-8 bg-black hover:bg-[#1a1a1a] text-white rounded-sm flex items-center justify-center transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Slider Track */}
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory py-4 px-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {loading ? (
                <div className="text-white">Loading tours...</div>
              ) : tours.length === 0 ? (
                <div className="text-white">No tours found.</div>
              ) : (
                tours.map((tour, index) => (
                  <Link
                    key={`${tour.id}-${index}`}
                    to={`/tours/${tour.slug}`}
                    className="w-[260px] h-[360px] flex-shrink-0 relative rounded-sm overflow-hidden snap-start group"
                  >
                    <img
                      src={tour.coverImage || 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=400&q=80'}
                      alt={tour.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Dark gradient at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    
                    {/* Badge */}
                    <div className="absolute top-4 right-4 bg-black/60 px-3 py-1 rounded-sm text-white text-[10px] uppercase font-bold tracking-widest shadow-lg">
                      {tour.destination?.name || 'INTERNATIONAL'}
                    </div>

                    {/* Title */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-white font-extrabold text-[18px] uppercase tracking-wider leading-tight">
                        {tour.title}
                      </h3>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Bottom Right Plan Button */}
        <div className="mt-8 flex justify-end">
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-2 border border-[#f29727] text-[#f29727] hover:bg-[#f29727] hover:text-[#10221b] px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>PLAN YOUR TRIP</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
