import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function IndiaToursSection() {
  const scrollRef = useRef(null);
  const autoSlideInterval = useRef(null);

  const indianTours = [
    {
      id: 1,
      slug: 'kerala-journey',
      title: 'From Coastlines to Palaces: A Kerala Journey',
      destinationLink: '/destinations/south-asia',
      destinationName: 'Kerala',
      duration: '6 Days',
      rating: 'Rated 4.89 / 5 by past travellers',
      description: "A curated route through Kerala's backwaters, coastline and heritage palaces, blending relaxation with royal history.",
      coverImage: '/assets/images/abhinand-k-s-7RGzoC8gtto-unsplash-scaled.jpg'
    },
    {
      id: 2,
      slug: 'ooty-coonoor',
      title: 'Gems of the Nilgiris: Ooty & Coonoor',
      destinationLink: '/destinations/south-asia',
      destinationName: 'Tamil Nadu',
      duration: '4 Days',
      rating: 'Rated 4.82 / 5 by past travellers',
      description: "Tea gardens, misty hill roads and colonial charm across two of the Nilgiris' most loved hill towns.",
      coverImage: '/assets/images/road-trip-with-raj-sELcHR_bGVs-unsplash-scaled.jpg'
    },
    {
      id: 3,
      slug: 'romantic-andaman',
      title: 'Romantic Andaman Tour Package',
      destinationLink: '/destinations/south-asia',
      destinationName: 'Andaman & Nicobar',
      duration: '6 Days',
      rating: 'Rated 4.93 / 5 by past travellers',
      description: 'White-sand beaches and turquoise waters designed as an intimate island escape for couples.',
      coverImage: '/assets/images/10776551-beach-4852830-scaled.jpg'
    },
    {
      id: 4,
      slug: 'kodaikanal-hills',
      title: 'Kodaikanal: Enchantress of the Hills',
      destinationLink: '/destinations/south-asia',
      destinationName: 'Tamil Nadu',
      duration: '3 Days',
      rating: 'Rated 4.75 / 5 by past travellers',
      description: 'Lakeside walks, pine forests and cool hill-station air on a short, scenic escape to Kodaikanal.',
      coverImage: '/assets/images/chris-lawton-duQ1ulzTJbM-unsplash-scaled.jpg'
    },
    {
      id: 5,
      slug: 'wayanad-nature',
      title: "Wayanad: Retreat into Nature's Paradise",
      destinationLink: '/destinations/south-asia',
      destinationName: 'Kerala',
      duration: '4 Days',
      rating: 'Rated 4.88 / 5 by past travellers',
      description: "Misty plantations, wildlife trails and waterfalls through Kerala's green, unhurried Western Ghats district.",
      coverImage: '/assets/images/ashim-d-silva-S2Q5mdOrrVc-unsplash-scaled.jpg'
    },
    {
      id: 6,
      slug: 'andaman-complete',
      title: 'Andaman Complete Tour Package',
      destinationLink: '/destinations/south-asia',
      destinationName: 'Andaman & Nicobar',
      duration: '10 Days',
      rating: 'Rated 4.91 / 5 by past travellers',
      description: 'The full island circuit — Port Blair, Havelock and Neil Island — for travellers who want to see it all.',
      coverImage: '/assets/images/golden-temple-scaled.jpg'
    }
  ];

  const startAutoSlide = () => {
    stopAutoSlide();
    autoSlideInterval.current = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 20) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
      }
    }, 3800);
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
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-[#10221b]">
      {/* Background Image overlay from uploaded assets */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center opacity-30 mix-blend-luminosity pointer-events-none"
        style={{ backgroundImage: "url('/assets/images/aditya-siva-6rDbvXzIVpQ-unsplash-1-scaled.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#10221b]/95 via-[#10221b]/85 to-[#10221b]/65 z-0 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Side: Title */}
          <div className="lg:col-span-4 text-white text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-[40px] font-extrabold uppercase leading-[1.15] mb-3 sm:mb-4 tracking-wider font-sans">
              EXPLORE <br className="hidden lg:block" />
              INDIAN <br className="hidden lg:block" />
              TOUR <br className="hidden lg:block" />
              PACKAGES
            </h2>
            <p className="text-[#dcd6cd] text-[13.5px] sm:text-[14px] max-w-sm mx-auto lg:mx-0 mb-6 leading-relaxed font-light">
              Handpicked domestic getaways from BlackForest Holidays.
            </p>
            <div className="hidden lg:block">
              <Link
                to="/destinations/south-asia"
                className="inline-block px-6 py-2.5 border border-white/40 hover:border-white text-white hover:bg-white hover:text-[#10221b] text-xs uppercase tracking-widest font-semibold rounded-sm transition-all duration-300"
              >
                Explore All Packages
              </Link>
            </div>
          </div>

          {/* Right Side: Slider */}
          <div 
            className="lg:col-span-8 relative"
            onMouseEnter={stopAutoSlide}
            onMouseLeave={startAutoSlide}
          >
            {/* Slider Controls */}
            <button
              onClick={() => scrollTrack('left')}
              className="hidden sm:flex absolute left-[-14px] top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-black/75 hover:bg-[#10221b] text-white rounded-full items-center justify-center transition-all shadow-xl border border-white/20"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => scrollTrack('right')}
              className="hidden sm:flex absolute right-[-14px] top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-black/75 hover:bg-[#10221b] text-white rounded-full items-center justify-center transition-all shadow-xl border border-white/20"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Slider Track */}
            <div
              ref={scrollRef}
              className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory py-4 px-1"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
            >
              {indianTours.map((tour) => (
                <div
                  key={tour.id}
                  className="w-[260px] sm:w-[285px] h-[420px] sm:h-[460px] flex-shrink-0 relative rounded-lg overflow-hidden snap-start group shadow-2xl border border-white/15 transition-all duration-300"
                >
                  {/* Background Cover Photo */}
                  <img
                    src={tour.coverImage}
                    alt={tour.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Top Right Duration Badge */}
                  <div className="absolute top-4 right-4 bg-[#10221b]/80 backdrop-blur-sm border border-white/25 px-2.5 py-1 rounded text-white text-[11px] font-semibold uppercase tracking-wider shadow z-20">
                    {tour.duration}
                  </div>

                  {/* Normal State */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-5 sm:p-6 flex flex-col justify-end transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
                    <span className="text-[11px] uppercase font-bold tracking-[0.2em] text-[#27B8B1] mb-1 block">
                      {tour.destinationName}
                    </span>
                    <h3 className="text-white font-bold text-base sm:text-lg uppercase tracking-wide leading-tight">
                      {tour.title}
                    </h3>
                  </div>

                  {/* Hover State */}
                  <div className="absolute inset-0 bg-black/85 backdrop-blur-[2px] p-5 sm:p-6 flex flex-col justify-end text-left opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                    <span className="text-[11px] uppercase font-bold tracking-[0.2em] text-[#27B8B1] mb-1.5 block">
                      {tour.destinationName}
                    </span>

                    <h3 className="text-lg sm:text-xl font-bold uppercase text-white leading-tight mb-2 tracking-wide">
                      {tour.title}
                    </h3>

                    <p className="text-xs text-gray-200 leading-relaxed mb-3 line-clamp-3">
                      {tour.description}
                    </p>

                    <span className="italic text-xs text-[#cfc9be] mb-4 block">
                      {tour.rating}
                    </span>

                    <Link
                      to={tour.destinationLink}
                      className="w-full py-2.5 px-4 text-center uppercase tracking-[0.15em] font-semibold text-xs border border-white/80 text-white hover:bg-white hover:text-[#10221b] transition-all duration-300 shadow-md block rounded-sm"
                    >
                      EXPLORE {tour.destinationName}
                    </Link>
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
