import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Clock,
  Star,
  MapPin,
  CalendarCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronDown,
  ShieldCheck,
  Share2,
  Heart,
  Compass,
  ArrowRight
} from 'lucide-react';
import { tourService } from '../../services/allServices';
import { useSettings } from '../../context/SiteSettingsContext';
import { useToast } from '../../context/ToastContext';

export default function TourDetailPage() {
  const { slug } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openDay, setOpenDay] = useState(1);
  const [openFaq, setOpenFaq] = useState(null);
  const { openEnquiryModal } = useSettings();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchTour = async () => {
      setLoading(true);
      try {
        const res = await tourService.getBySlug(slug);
        if (res.success && res.data) {
          setTour(res.data);
        }
      } catch (err) {
        console.error('Error fetching tour detail:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTour();
  }, [slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: tour?.title,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard!', 'info');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fbfaf8]">
        <div className="flex items-center gap-2 text-[#10221b]">
          <span className="w-6 h-6 border-2 border-[#f29727] border-t-transparent rounded-full animate-spin"></span>
          <span>Loading tour itinerary details...</span>
        </div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-[#fbfaf8]">
        <Compass className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-serif font-bold text-[#10221b] mb-2">Tour Not Found</h2>
        <p className="text-gray-500 text-sm mb-6">The tour package you are looking for is unavailable or has expired.</p>
        <Link
          to="/international-tours"
          className="px-6 py-2.5 bg-[#10221b] text-[#f29727] rounded-full text-xs uppercase font-bold tracking-wider"
        >
          Browse All Tours
        </Link>
      </div>
    );
  }

  const itinerary = Array.isArray(tour.itinerary) ? tour.itinerary : [];
  const highlights = Array.isArray(tour.highlights) ? tour.highlights : [];
  const inclusions = Array.isArray(tour.inclusions) ? tour.inclusions : [];
  const exclusions = Array.isArray(tour.exclusions) ? tour.exclusions : [];
  const terms = Array.isArray(tour.terms) ? tour.terms : [];
  const faqs = Array.isArray(tour.faq) ? tour.faq : [];

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <div className="relative h-[65vh] min-h-[500px] bg-[#10221b] text-white flex items-end">
        <div className="absolute inset-0 z-0">
          <img
            src={tour.coverImage || 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1600&q=80'}
            alt={tour.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10221b] via-[#10221b]/60 to-black/50" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-[#f29727] text-[#10221b] text-xs font-bold uppercase tracking-wider rounded-full">
              {tour.destination?.name || tour.type}
            </span>
            <div className="flex items-center gap-1 text-xs text-white bg-black/50 px-2.5 py-1 rounded-full backdrop-blur-md">
              <Star className="w-3.5 h-3.5 text-[#f29727] fill-[#f29727]" />
              <span className="font-semibold">{tour.rating || 4.9}</span>
              <span className="text-gray-300">({tour.reviewCount || 15} reviews)</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-white bg-black/50 px-2.5 py-1 rounded-full backdrop-blur-md">
              <Clock className="w-3.5 h-3.5 text-[#f29727]" />
              <span>{tour.duration}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-4 leading-tight">
            {tour.title}
          </h1>

          {tour.location && (
            <div className="flex items-center gap-2 text-sm text-gray-200">
              <MapPin className="w-4 h-4 text-[#f29727]" />
              <span>{tour.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Itinerary Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Details, Itinerary, Inclusions */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview */}
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-[#f29727] block mb-2">
                Experience Overview
              </span>
              <h2 className="text-3xl font-serif font-bold text-[#10221b] mb-4">
                About This Journey
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {tour.description || tour.shortDescription}
              </p>
            </div>

            {/* Highlights */}
            {highlights.length > 0 && (
              <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                <span className="text-xs uppercase font-bold tracking-widest text-[#f29727] block mb-2">
                  Trip Essentials
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#10221b] mb-6">
                  Signature Highlights
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {highlights.map((hl, index) => (
                    <div key={index} className="flex items-start gap-3 text-sm text-gray-700">
                      <CheckCircle2 className="w-5 h-5 text-[#f29727] flex-shrink-0 mt-0.5" />
                      <span className="leading-snug">{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Day by Day Itinerary Accordion */}
            {itinerary.length > 0 && (
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#f29727] block mb-2">
                  Daily Program
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#10221b] mb-6">
                  Day-by-Day Itinerary
                </h3>

                <div className="space-y-4">
                  {itinerary.map((dayItem) => {
                    const isOpen = openDay === dayItem.day;
                    return (
                      <div
                        key={dayItem.day}
                        className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm transition-all"
                      >
                        <button
                          onClick={() => setOpenDay(isOpen ? null : dayItem.day)}
                          className="w-full p-5 sm:p-6 flex items-center justify-between text-left hover:bg-gray-50/80 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <span className="w-10 h-10 rounded-full bg-[#10221b] text-[#f29727] font-bold text-xs flex items-center justify-center flex-shrink-0">
                              D{dayItem.day}
                            </span>
                            <div>
                              <span className="text-[11px] font-bold uppercase tracking-wider text-[#f29727]">
                                Day {dayItem.day}
                              </span>
                              <h4 className="text-base sm:text-lg font-serif font-bold text-[#10221b]">
                                {dayItem.title}
                              </h4>
                            </div>
                          </div>
                          <ChevronDown
                            className={`w-5 h-5 text-gray-400 transition-transform ${
                              isOpen ? 'rotate-180 text-[#f29727]' : ''
                            }`}
                          />
                        </button>

                        {isOpen && (
                          <div className="px-6 pb-6 pt-2 border-t border-gray-100 space-y-4 animate-fadeIn">
                            <p className="text-sm text-gray-600 leading-relaxed">
                              {dayItem.description}
                            </p>

                            {dayItem.activities && dayItem.activities.length > 0 && (
                              <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block mb-2">
                                  Included Activities:
                                </span>
                                <div className="flex flex-wrap gap-2">
                                  {dayItem.activities.map((act, i) => (
                                    <span
                                      key={i}
                                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                                    >
                                      • {act}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}

                            {dayItem.image && (
                              <div className="mt-4 rounded-xl overflow-hidden h-64">
                                <img
                                  src={dayItem.image}
                                  alt={dayItem.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Inclusions */}
              <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-200">
                <div className="flex items-center gap-2 mb-4 text-emerald-800 font-serif font-bold text-lg">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <h4>Package Inclusions</h4>
                </div>
                <ul className="space-y-2.5 text-xs text-gray-700">
                  {inclusions.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div className="bg-rose-50/50 p-6 rounded-2xl border border-rose-200">
                <div className="flex items-center gap-2 mb-4 text-rose-800 font-serif font-bold text-lg">
                  <XCircle className="w-5 h-5 text-rose-600" />
                  <h4>Package Exclusions</h4>
                </div>
                <ul className="space-y-2.5 text-xs text-gray-700">
                  {exclusions.map((exc, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold">✕</span>
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Terms & Policies */}
            {terms.length > 0 && (
              <div className="p-6 bg-gray-50 rounded-2xl border border-gray-200 text-xs text-gray-600 space-y-2">
                <h4 className="font-bold text-[#10221b] uppercase tracking-wider mb-2">
                  Terms & Booking Conditions
                </h4>
                <ul className="list-disc list-inside space-y-1">
                  {terms.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* FAQs */}
            {faqs.length > 0 && (
              <div>
                <span className="text-xs uppercase font-bold tracking-widest text-[#f29727] block mb-2">
                  Common Inquiries
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#10221b] mb-6">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-3">
                  {faqs.map((faq, i) => {
                    const isOpen = openFaq === i;
                    return (
                      <div
                        key={i}
                        className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                      >
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : i)}
                          className="w-full p-4 text-left flex items-center justify-between text-sm font-semibold text-[#10221b] hover:bg-gray-50"
                        >
                          <span>{faq.question}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-gray-400 transition-transform ${
                              isOpen ? 'rotate-180 text-[#f29727]' : ''
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="p-4 pt-1 text-xs text-gray-600 border-t border-gray-100 leading-relaxed">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Booking / Price Card */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-[#10221b] text-white p-8 rounded-3xl shadow-2xl border border-white/10 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-gray-400 block">Starting Price</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-[#f29727]">${tour.price}</span>
                    {tour.discountPrice && (
                      <span className="text-sm text-gray-400 line-through">${tour.discountPrice}</span>
                    )}
                    <span className="text-xs text-gray-400">/ person</span>
                  </div>
                </div>
                <button
                  onClick={handleShare}
                  aria-label="Share tour"
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={() => openEnquiryModal({ title: tour.title, destination: tour.destination?.name })}
                  className="w-full py-4 bg-[#f29727] hover:bg-[#db841a] text-[#10221b] text-xs font-bold uppercase tracking-widest rounded-full shadow-lg transition-all flex items-center justify-center gap-2 transform hover:scale-102"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Inquire This Package</span>
                </button>
              </div>

              <p className="text-center text-[11px] text-gray-400 leading-relaxed">
                * Prices are indicative based on double occupancy. Custom upgrades for private aircraft and 5-star suites available.
              </p>

              <div className="pt-6 border-t border-white/10 space-y-3 text-xs text-gray-300">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#f29727]" />
                  <span>100% Tailored Private Touring</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#f29727]" />
                  <span>Pre-screened Luxury Accommodations</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#f29727]" />
                  <span>24/7 On-Ground Blackforest Concierge</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
