import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Compass, ArrowRight, CheckCircle2, CalendarCheck } from 'lucide-react';
import { experienceService } from '../../services/allServices';
import { useSettings } from '../../context/SiteSettingsContext';

export default function ExperiencesPage() {
  const { slug } = useParams();
  const [experiences, setExperiences] = useState([]);
  const [currentExp, setCurrentExp] = useState(null);
  const [loading, setLoading] = useState(true);
  const { openEnquiryModal } = useSettings();

  useEffect(() => {
    const fetchExperiences = async () => {
      setLoading(true);
      try {
        if (slug) {
          const res = await experienceService.getBySlug(slug);
          if (res.success && res.data) {
            setCurrentExp(res.data);
          }
        } else {
          const res = await experienceService.getAll({ status: 'published' });
          if (res.success && res.data) {
            setExperiences(res.data.experiences || []);
          }
        }
      } catch (err) {
        console.error('Error fetching experiences:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fbfaf8]">
        <div className="flex items-center gap-2 text-[#10221b]">
          <span className="w-6 h-6 border-2 border-[#f29727] border-t-transparent rounded-full animate-spin"></span>
          <span>Loading curated experiences...</span>
        </div>
      </div>
    );
  }

  // Single Experience Detail View
  if (slug && currentExp) {
    return (
      <div className="animate-fadeIn">
        <div className="relative h-[60vh] min-h-[460px] bg-[#10221b] text-white flex items-end">
          <div className="absolute inset-0 z-0">
            <img
              src={currentExp.heroImage || currentExp.thumbnail}
              alt={currentExp.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#10221b] via-[#10221b]/60 to-black/40" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
            <span className="px-3 py-1 bg-[#f29727] text-[#10221b] text-xs font-bold uppercase tracking-wider rounded-full inline-block mb-3">
              Curated Experience
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif font-bold text-white mb-4">
              {currentExp.name}
            </h1>
            <p className="text-gray-200 text-base sm:text-lg max-w-2xl leading-relaxed">
              {currentExp.description}
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="prose prose-stone max-w-none text-gray-700 leading-relaxed text-base space-y-6">
            <p>{currentExp.content || currentExp.description}</p>
          </div>

          <div className="mt-12 p-8 bg-[#10221b] text-white rounded-3xl text-center space-y-4">
            <h3 className="text-2xl font-serif font-bold text-white">
              Interested in {currentExp.name}?
            </h3>
            <p className="text-gray-300 text-sm max-w-md mx-auto">
              Our travel specialists will design a custom itinerary centered around this exact travel style.
            </p>
            <button
              onClick={() => openEnquiryModal({ title: `${currentExp.name} Experience` })}
              className="px-8 py-3.5 bg-[#f29727] hover:bg-[#db841a] text-[#10221b] text-xs font-bold uppercase tracking-widest rounded-full shadow-lg transition-all"
            >
              Plan Custom Trip
            </button>
          </div>
        </div>
      </div>
    );
  }

  // List View of all experiences
  return (
    <div className="pt-24 pb-20 bg-[#fbfaf8] animate-fadeIn">
      <div className="bg-[#10221b] text-white py-16 px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-xs uppercase font-bold tracking-widest text-[#f29727] block mb-2">
            Thematic Travel Styles
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">
            Curated Experiences
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
            From wilderness adventures and romantic island escapes to multi-generational family journeys and bespoke luxury retreats.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#f29727]/50 transition-all duration-300 group flex flex-col justify-between"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={exp.thumbnail || exp.heroImage || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'}
                  alt={exp.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-2xl font-serif font-bold text-white">
                  {exp.name}
                </h3>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-6">
                  {exp.description}
                </p>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    to={`/experiences/${exp.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#10221b] group-hover:text-[#f29727] transition-colors"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => openEnquiryModal({ title: `${exp.name} Experience` })}
                    className="text-xs text-gray-400 hover:text-[#10221b] font-medium"
                  >
                    Inquire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
