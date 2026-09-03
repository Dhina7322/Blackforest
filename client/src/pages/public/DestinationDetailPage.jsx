import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Clock, Star, CalendarCheck, ArrowRight, Compass, ShieldCheck } from 'lucide-react';
import { destinationService } from '../../services/allServices';
import { useSettings } from '../../context/SiteSettingsContext';

export default function DestinationDetailPage() {
  const { slug } = useParams();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const { openEnquiryModal } = useSettings();

  useEffect(() => {
    const fetchDestination = async () => {
      setLoading(true);
      try {
        const res = await destinationService.getBySlug(slug);
        if (res.success && res.data) {
          setDestination(res.data);
        }
      } catch (err) {
        console.error('Error loading destination detail:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDestination();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fbfaf8]">
        <div className="flex items-center gap-2 text-[#10221b]">
          <span className="w-6 h-6 border-2 border-[#f29727] border-t-transparent rounded-full animate-spin"></span>
          <span>Loading destination itinerary...</span>
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-[#fbfaf8]">
        <Compass className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-serif font-bold text-[#10221b] mb-2">Destination Not Found</h2>
        <p className="text-gray-500 text-sm mb-6">The requested destination could not be located in our database.</p>
        <Link
          to="/destinations"
          className="px-6 py-2.5 bg-[#10221b] text-[#f29727] rounded-full text-xs uppercase font-bold tracking-wider"
        >
          Return to Destinations
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      {/* Hero Banner */}
      <div className="relative h-[65vh] min-h-[480px] bg-[#10221b] text-white flex items-end">
        <div className="absolute inset-0 z-0">
          <img
            src={destination.heroImage || destination.thumbnail || 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1600&q=80'}
            alt={destination.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10221b] via-[#10221b]/50 to-black/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#f29727] mb-3">
            <MapPin className="w-4 h-4" />
            <span>{destination.country || destination.region.replace('-', ' ')}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white mb-4">
            {destination.name}
          </h1>

          <p className="text-gray-200 text-base sm:text-lg max-w-3xl leading-relaxed">
            {destination.shortDescription}
          </p>
        </div>
      </div>

      {/* Main Content & Packages Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Description & Highlights */}
          <div className="lg:col-span-8 space-y-12">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#f29727] block mb-2">
                Destination Overview
              </span>
              <h2 className="text-3xl font-serif font-bold text-[#10221b] mb-6">
                About The Journey
              </h2>
              <div className="prose prose-stone max-w-none text-gray-700 leading-relaxed text-sm sm:text-base space-y-4">
                <p>{destination.description || destination.shortDescription}</p>
              </div>
            </div>

            {/* Curated Tour Packages for this Destination */}
            {destination.packages && destination.packages.length > 0 && (
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#f29727] block mb-2">
                  Featured Itineraries
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#10221b] mb-6">
                  Recommended Packages for {destination.name}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {destination.packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl hover:border-[#f29727]/50 transition-all group flex flex-col justify-between"
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={pkg.coverImage || destination.thumbnail}
                          alt={pkg.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/60 text-white text-xs font-semibold rounded-full flex items-center gap-1">
                          <Star className="w-3 h-3 text-[#f29727] fill-[#f29727]" />
                          <span>{pkg.rating || 4.9}</span>
                        </div>
                        <div className="absolute bottom-3 left-3 text-xs text-white font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#f29727]" />
                          <span>{pkg.duration}</span>
                        </div>
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-base font-serif font-bold text-[#10221b] group-hover:text-[#f29727] transition-colors mb-2">
                            {pkg.title}
                          </h4>
                          <p className="text-xs text-gray-600 line-clamp-2 mb-4">
                            {pkg.shortDescription}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                          <span className="text-sm font-bold text-[#10221b]">From ${pkg.price}</span>
                          <Link
                            to={`/tours/${pkg.slug}`}
                            className="px-3.5 py-1.5 bg-[#10221b] text-[#f29727] hover:bg-[#1c382e] rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center gap-1"
                          >
                            <span>Details</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Photo Gallery */}
            {destination.gallery && destination.gallery.length > 0 && (
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#f29727] block mb-2">
                  Visual Discovery
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#10221b] mb-6">
                  Destination Gallery
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {destination.gallery.map((imgUrl, i) => (
                    <div key={i} className="h-44 rounded-xl overflow-hidden shadow">
                      <img
                        src={imgUrl}
                        alt={`${destination.name} gallery ${i + 1}`}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Booking / Enquiry Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-[#10221b] text-white p-8 rounded-3xl shadow-2xl border border-white/10 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-[#f29727] block">
                Bespoke Planning
              </span>
              <h3 className="text-2xl font-serif font-bold text-white leading-snug">
                Ready to Experience {destination.name}?
              </h3>
              <p className="text-gray-300 text-xs leading-relaxed">
                Connect with our certified destination specialist. We design private routes, reserve premier accommodations, and handle all visa and logistics.
              </p>

              <div className="space-y-3 pt-2">
                <button
                  onClick={() => openEnquiryModal({ destination: destination.name })}
                  className="w-full py-3.5 bg-[#f29727] hover:bg-[#db841a] text-[#10221b] text-xs font-bold uppercase tracking-widest rounded-full shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Customize Itinerary</span>
                </button>
              </div>

              <div className="pt-6 border-t border-white/10 space-y-2.5 text-xs text-gray-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#f29727]" />
                  <span>Private Chauffeur & Guides</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#f29727]" />
                  <span>Flexible Date Rescheduling</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#f29727]" />
                  <span>24/7 Dedicated Concierge</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
