import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, MapPin, Compass, BookOpen, Plane, ArrowRight } from 'lucide-react';
import { useSettings } from '../../context/SiteSettingsContext';
import { searchService } from '../../services/allServices';

export default function SearchModal() {
  const { isSearchModalOpen, closeSearchModal } = useSettings();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({
    tours: [],
    destinations: [],
    experiences: [],
    articles: []
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!query.trim()) {
      setResults({ tours: [], destinations: [], experiences: [], articles: [] });
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await searchService.searchAll(query);
        if (res.success && res.data) {
          setResults(res.data.results);
        }
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isSearchModalOpen) return null;

  const handleSelect = (url) => {
    closeSearchModal();
    setQuery('');
    navigate(url);
  };

  const totalResults =
    results.tours.length +
    results.destinations.length +
    results.experiences.length +
    results.articles.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Search Header */}
        <div className="p-4 border-b border-gray-100 flex items-center gap-3 bg-gray-50/50">
          <Search className="w-5 h-5 text-[#f29727]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tours, countries, experiences, journals..."
            className="flex-1 bg-transparent text-lg font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-gray-400 hover:text-gray-600 px-2 py-1 rounded bg-gray-100"
            >
              Clear
            </button>
          )}
          <button
            onClick={closeSearchModal}
            className="p-1.5 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-200/50 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search Body */}
        <div className="max-h-[70vh] overflow-y-auto p-5">
          {loading && (
            <div className="flex items-center justify-center py-12 text-gray-400 gap-2">
              <span className="w-5 h-5 border-2 border-[#f29727] border-t-transparent rounded-full animate-spin"></span>
              Searching Blackforest Holidays catalog...
            </div>
          )}

          {!loading && query && totalResults === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Compass className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p className="text-base font-medium">No results found for "{query}"</p>
              <p className="text-xs text-gray-400 mt-1">Try searching for Switzerland, Kerala, Safari, Maldives, or Honeymoon</p>
            </div>
          )}

          {!query && (
            <div className="py-8 text-center text-gray-400">
              <p className="text-sm font-medium">Discover tailored journeys and editorial guides</p>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
                {['Switzerland', 'Kerala', 'Maldives', 'Africa Safari', 'Andaman', 'Honeymoon'].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setQuery(suggestion)}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-[#10221b] hover:text-[#f29727] text-gray-700 text-xs rounded-full transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {!loading && totalResults > 0 && (
            <div className="space-y-6">
              {/* Tours */}
              {results.tours.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                    <Plane className="w-4 h-4 text-[#f29727]" />
                    Tour Packages ({results.tours.length})
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {results.tours.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => handleSelect(`/tours/${t.slug}`)}
                        className="flex items-center gap-3 p-2.5 rounded-xl border border-gray-100 hover:border-[#f29727]/50 hover:bg-amber-50/20 cursor-pointer transition-all"
                      >
                        <img
                          src={t.coverImage || '/images/destinations/aerial-shot-snow-capped-mountains-with-calm-lake-daytime-scaled.jpg.webp'}
                          alt={t.title}
                          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-semibold text-[#10221b] truncate">{t.title}</h4>
                          <p className="text-xs text-gray-500">{t.duration} • {t.category === 'india' ? 'India' : 'International'}</p>
                          <span className="text-xs font-bold text-[#f29727]">${t.price}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-300" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Destinations */}
              {results.destinations.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                    <MapPin className="w-4 h-4 text-[#f29727]" />
                    Destinations ({results.destinations.length})
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {results.destinations.map((d) => (
                      <div
                        key={d.id}
                        onClick={() => handleSelect(`/destinations/${d.slug}`)}
                        className="flex items-center gap-3 p-2 rounded-xl border border-gray-100 hover:border-[#f29727]/50 cursor-pointer transition-all"
                      >
                        <img
                          src={d.thumbnail || d.heroImage || '/images/destinations/alex-vasey-5_Bu25SV6X8-unsplash-1-scaled.jpg.webp'}
                          alt={d.name}
                          className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="truncate">
                          <h4 className="text-sm font-semibold text-[#10221b] truncate">{d.name}</h4>
                          <p className="text-xs text-gray-400 capitalize">{d.region.replace('-', ' ')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Experiences */}
              {results.experiences.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                    <Compass className="w-4 h-4 text-[#f29727]" />
                    Experiences ({results.experiences.length})
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {results.experiences.map((exp) => (
                      <div
                        key={exp.id}
                        onClick={() => handleSelect(`/experiences/${exp.slug}`)}
                        className="flex items-center gap-3 p-2.5 rounded-xl border border-gray-100 hover:border-[#f29727]/50 cursor-pointer transition-all"
                      >
                        <img
                          src={exp.thumbnail || exp.heroImage}
                          alt={exp.name}
                          className="w-14 h-14 object-cover rounded-lg flex-shrink-0"
                        />
                        <div className="truncate">
                          <h4 className="text-sm font-semibold text-[#10221b]">{exp.name}</h4>
                          <p className="text-xs text-gray-500 line-clamp-1">{exp.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Articles */}
              {results.articles.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                    <BookOpen className="w-4 h-4 text-[#f29727]" />
                    Travel Journal ({results.articles.length})
                  </div>
                  <div className="space-y-2">
                    {results.articles.map((art) => (
                      <div
                        key={art.id}
                        onClick={() => handleSelect(`/journal/${art.slug}`)}
                        className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <div>
                          <h4 className="text-sm font-semibold text-[#10221b]">{art.title}</h4>
                          <span className="text-xs text-gray-400">{art.category}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-300" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
