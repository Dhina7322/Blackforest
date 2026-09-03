import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, MapPin, ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react';
import { tourService } from '../../services/allServices';
import { useSettings } from '../../context/SiteSettingsContext';

export default function InternationalToursSection() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeRegion, setActiveRegion] = useState('all');
  const { openEnquiryModal } = useSettings();

  const regions = [
    { id: 'all', label: 'All Destinations' },
    { id: 'europe', label: 'Europe' },
    { id: 'africa', label: 'Africa' },
    { id: 'america', label: 'America' },
    { id: 'asian-countries', label: 'Asia & Far East' },
    { id: 'australia', label: 'Australia' },
    { id: 'indian-ocean', label: 'Indian Ocean' },
    { id: 'middle-east', label: 'Middle East' },
    { id: 'south-asia', label: 'South Asia' }
  ];

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      try {
        const params = { category: 'international', status: 'published' };
        if (activeRegion !== 'all') {
          params.region = activeRegion;
        }
        const res = await tourService.getAll(params);
        if (res.success && res.data) {
          setTours(res.data.tours || []);
        }
      } catch (err) {
        console.error('Error loading international tours:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, [activeRegion]);

  const scrollTrack = (direction) => {
    const track = document.getElementById('international-track');
    if (track) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 bg-[#24221e] text-[#f3efe8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#f29727] font-bold block mb-2">
              Bespoke World Expeditions
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
              Explore International Tour Packages
            </h2>
            <p className="text-[#cfc9be] text-sm mt-2 max-w-xl">
              Handpicked itineraries across six continents crafted with exceptional hotels, private guiding, and seamless concierge support.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/international-tours"
              className="text-xs font-bold uppercase tracking-widest text-[#f29727] hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span>View All Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="hidden sm:flex items-center gap-2 ml-4">
              <button
                onClick={() => scrollTrack('left')}
                aria-label="Scroll left"
                className="w-10 h-10 rounded-full border border-white/20 hover:bg-[#f29727] hover:text-[#10221b] hover:border-[#f29727] flex items-center justify-center transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollTrack('right')}
                aria-label="Scroll right"
                className="w-10 h-10 rounded-full border border-white/20 hover:bg-[#f29727] hover:text-[#10221b] hover:border-[#f29727] flex items-center justify-center transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Region Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {regions.map((r) => (
            <button
              key={r.id}
              onClick={() => setActiveRegion(r.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all whitespace-nowrap ${
                activeRegion === r.id
                  ? 'bg-[#f29727] text-[#10221b] shadow-md'
                  : 'bg-white/5 text-[#f3efe8] hover:bg-white/15 border border-white/10'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Dynamic Card Slider Track */}
        {loading ? (
          <div className="flex items-center justify-center py-24 text-gray-400 gap-2">
            <span className="w-6 h-6 border-2 border-[#f29727] border-t-transparent rounded-full animate-spin"></span>
            Loading international packages...
          </div>
        ) : tours.length === 0 ? (
          <div className="text-center py-16 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-[#cfc9be]">No tour packages found for this region.</p>
          </div>
        ) : (
          <div
            id="international-track"
            className="flex gap-6 overflow-x-auto pb-8 no-scrollbar snap-x snap-mandatory"
          >
            {tours.map((tour) => (
              <div
                key={tour.id}
                className="w-[320px] sm:w-[360px] flex-shrink-0 bg-[#10221b] rounded-2xl overflow-hidden border border-white/10 shadow-xl group hover:border-[#f29727]/50 transition-all duration-300 flex flex-col justify-between snap-start"
              >
                {/* Image & Badges */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={tour.coverImage || 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80'}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#10221b] via-transparent to-black/30" />

                  {/* Top Badge: Type / Region */}
                  <div className="absolute top-3 left-3 px-3 py-1 bg-[#10221b]/80 backdrop-blur-md text-[#f29727] text-[11px] font-bold uppercase tracking-wider rounded-full border border-white/10">
                    {tour.destination?.name || tour.type || 'International'}
                  </div>

                  {/* Rating */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-semibold rounded-full flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-[#f29727] fill-[#f29727]" />
                    <span>{tour.rating || 4.9}</span>
                  </div>

                  {/* Duration */}
                  <div className="absolute bottom-3 left-3 text-xs text-gray-200 flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#f29727]" />
                    <span>{tour.duration}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-white group-hover:text-[#f29727] transition-colors line-clamp-1 mb-2">
                      {tour.title}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">
                      {tour.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 block">Starting From</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-bold text-[#f29727]">${tour.price}</span>
                        {tour.discountPrice && (
                          <span className="text-xs text-gray-500 line-through">${tour.discountPrice}</span>
                        )}
                        <span className="text-[10px] text-gray-400">/ person</span>
                      </div>
                    </div>

                    <Link
                      to={`/tours/${tour.slug}`}
                      className="px-4 py-2 bg-white/10 hover:bg-[#f29727] hover:text-[#10221b] text-white text-xs font-semibold uppercase tracking-wider rounded-lg transition-all flex items-center gap-1"
                    >
                      <span>Explore</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
