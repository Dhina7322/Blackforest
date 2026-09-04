import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Calendar } from 'lucide-react';

export default function IndiaToursSection() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);
  const autoSlideInterval = useRef(null);

  useEffect(() => {
    const indianTours = [
      {
        id: 101,
        slug: 'kerala-backwaters',
        title: 'MAGICAL KERALA BACKWATERS',
        destinationLink: '/south-asia',
        destinationName: 'SOUTH ASIA',
        duration: '6 DAYS',
        rating: 'Rated 4.89 / 5 by past travellers',
        description: 'Private houseboats drifting on palm-fringed lagoons, fragrant spice plantations, and Ayurvedic retreats.',
        coverImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 102,
        slug: 'rajasthan-heritage',
        title: 'ROYAL RAJASTHAN HERITAGE',
        destinationLink: '/south-asia',
        destinationName: 'SOUTH ASIA',
        duration: '7 DAYS',
        rating: 'Rated 4.93 / 5 by past travellers',
        description: 'Gilded palace courtyards in Udaipur, amber fortress sunsets in Jaipur, and Thar desert campfires.',
        coverImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 103,
        slug: 'goa-luxury',
        title: 'GOA COASTAL LUXURY',
        destinationLink: '/south-asia',
        destinationName: 'SOUTH ASIA',
        duration: '5 DAYS',
        rating: 'Rated 4.85 / 5 by past travellers',
        description: 'Private catamaran sunset charters, Portuguese colonial architecture, and barefoot beach fine dining.',
        coverImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 104,
        slug: 'himalayan-adventure',
        title: 'HIMALAYAN SPLENDOR & SPITI',
        destinationLink: '/south-asia',
        destinationName: 'SOUTH ASIA',
        duration: '8 DAYS',
        rating: 'Rated 4.91 / 5 by past travellers',
        description: 'Majestic snow peaks, peaceful high-altitude monasteries, serene pine valleys, and mountain passes.',
        coverImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80'
      }
    ];
    // Duplicate for seamless infinite scrolling loop
    setTours([...indianTours, ...indianTours]);
    setLoading(false);
  }, []);

  const startAutoSlide = () => {
    stopAutoSlide();
    autoSlideInterval.current = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 20) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
        }
      }
    }, 3500);
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
      {/* Background image without overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1920&q=80"
          alt="India Palace Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-between">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Side: Title */}
          <div className="lg:col-span-4 text-white">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold uppercase leading-tight mb-4 tracking-wide font-sans">
              EXPLORE <br className="hidden lg:block" />
              INDIAN <br className="hidden lg:block" />
              TOUR <br className="hidden lg:block" />
              PACKAGES
            </h2>
            <p className="text-gray-300 text-[13px] max-w-sm mb-8 leading-[1.8]">
              Discover the incredible heritage, diverse landscapes, and royal palaces of India.
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
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-30 w-9 h-9 bg-black/80 hover:bg-[#10221b] text-white rounded-full flex items-center justify-center transition-all shadow-xl border border-white/10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => scrollTrack('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-30 w-9 h-9 bg-black/80 hover:bg-[#10221b] text-white rounded-full flex items-center justify-center transition-all shadow-xl border border-white/10"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Slider Track with Auto Slide */}
            <div
              ref={scrollRef}
              className="flex gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory py-4 px-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {loading ? (
                <div className="text-white">Loading tours...</div>
              ) : tours.length === 0 ? (
                <div className="text-white">No tours found.</div>
              ) : (
                tours.map((tour, index) => (
                  <div
                    key={`${tour.id}-${index}`}
                    className="w-[280px] sm:w-[300px] h-[430px] sm:h-[460px] flex-shrink-0 relative rounded-xl overflow-hidden snap-start group shadow-2xl border border-white/10 transition-all duration-500"
                  >
                    {/* Background Cover Photo */}
                    <img
                      src={tour.coverImage}
                      alt={tour.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Top Right Duration Badge */}
                    <div className="absolute top-4 right-4 bg-[#10221b]/85 backdrop-blur-sm border border-white/20 px-3 py-1 rounded text-white text-[11px] font-bold uppercase tracking-wider shadow-lg z-20">
                      {tour.duration}
                    </div>

                    {/* Normal State: Subtle Dark Gradient with Title */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-6 flex flex-col justify-end transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
                      <span className="text-[11px] uppercase font-bold tracking-[0.2em] text-[#f29727] mb-1.5 block">
                        {tour.destinationName}
                      </span>
                      <h3 className="text-white font-extrabold text-xl uppercase tracking-wider leading-tight font-sans">
                        {tour.title}
                      </h3>
                    </div>

                    {/* Hover State: Exact match to user's Image 5 */}
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px] p-6 flex flex-col justify-end text-left opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                      <span className="text-[11px] uppercase font-bold tracking-[0.25em] text-white/90 mb-1.5 block">
                        {tour.destinationName}
                      </span>

                      <h3 className="text-xl sm:text-2xl font-extrabold uppercase text-white leading-tight mb-2.5 font-sans tracking-wide">
                        {tour.title}
                      </h3>

                      <p className="text-xs sm:text-[13px] text-gray-200 leading-relaxed mb-3">
                        {tour.description}
                      </p>

                      <span className="italic text-xs text-gray-300 mb-4 block font-serif">
                        {tour.rating}
                      </span>

                      {/* Explore Button Linking directly to the destination */}
                      <Link
                        to={tour.destinationLink}
                        className="w-full py-2.5 px-4 text-center uppercase tracking-[0.2em] font-bold text-xs border border-white text-white hover:bg-white hover:text-[#10221b] transition-all duration-300 shadow-md block"
                      >
                        EXPLORE {tour.destinationName}
                      </Link>
                    </div>
                  </div>
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
