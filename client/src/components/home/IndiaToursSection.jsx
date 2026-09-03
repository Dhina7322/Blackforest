import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, MapPin, ArrowRight } from 'lucide-react';
import { tourService } from '../../services/allServices';

export default function IndiaToursSection() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIndiaTours = async () => {
      try {
        const res = await tourService.getAll({ category: 'india', status: 'published' });
        if (res.success && res.data) {
          setTours(res.data.tours || []);
        }
      } catch (err) {
        console.error('Error loading India tours:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchIndiaTours();
  }, []);

  return (
    <section className="py-24 bg-[#fbfaf8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#f29727] font-bold block mb-2">
              Incredible Journeys Across India
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#10221b] leading-tight">
              Explore Indian Tour Packages
            </h2>
            <p className="text-gray-600 text-sm mt-2 max-w-xl">
              From tranquil backwaters and tea-scented hill stations to turquoise Andaman coral archipelagos, explore authentic Indian hospitality.
            </p>
          </div>

          <Link
            to="/india-tours"
            className="text-xs font-bold uppercase tracking-widest text-[#10221b] hover:text-[#f29727] transition-colors flex items-center gap-1.5"
          >
            <span>View All India Packages</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-gray-400 gap-2">
            <span className="w-6 h-6 border-2 border-[#f29727] border-t-transparent rounded-full animate-spin"></span>
            Loading Indian tours...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tours.map((tour) => (
              <div
                key={tour.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#f29727]/50 transition-all duration-300 group flex flex-col justify-between"
              >
                {/* Tour Card Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={tour.coverImage || 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80'}
                    alt={tour.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur-md text-[#10221b] text-xs font-bold rounded-full flex items-center gap-1 shadow">
                    <Star className="w-3.5 h-3.5 text-[#f29727] fill-[#f29727]" />
                    <span>{tour.rating || 5.0}</span>
                  </div>

                  <div className="absolute bottom-3 left-3 text-xs text-white flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#f29727]" />
                    <span>{tour.duration}</span>
                  </div>
                </div>

                {/* Tour Card Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {tour.location && (
                      <div className="flex items-center gap-1 text-xs text-gray-400 font-medium mb-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#f29727]" />
                        <span className="truncate">{tour.location}</span>
                      </div>
                    )}
                    <h3 className="text-lg font-serif font-bold text-[#10221b] group-hover:text-[#f29727] transition-colors line-clamp-2 mb-2">
                      {tour.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
                      {tour.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-gray-400 block">From</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-bold text-[#10221b]">${tour.price}</span>
                        {tour.discountPrice && (
                          <span className="text-xs text-gray-400 line-through">${tour.discountPrice}</span>
                        )}
                        <span className="text-[10px] text-gray-400">/ person</span>
                      </div>
                    </div>

                    <Link
                      to={`/tours/${tour.slug}`}
                      className="px-4 py-2 bg-[#10221b] hover:bg-[#1c382e] text-[#f29727] text-xs font-semibold uppercase tracking-wider rounded-lg transition-all flex items-center gap-1"
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
