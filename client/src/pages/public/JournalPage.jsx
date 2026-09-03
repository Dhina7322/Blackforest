import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Search, ArrowRight, BookOpen } from 'lucide-react';
import { articleService } from '../../services/allServices';

export default function JournalPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Dispatches' },
    { id: 'Trekking & Safety', label: 'Trekking & Safety' },
    { id: 'Mountain Expeditions', label: 'Mountain Expeditions' },
    { id: 'Gear & Equipment', label: 'Gear & Equipment' },
    { id: 'Travel Guides', label: 'Travel Guides' }
  ];

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const params = { status: 'published' };
        if (selectedCategory !== 'all') params.category = selectedCategory;
        if (search.trim()) params.search = search.trim();

        const res = await articleService.getAll(params);
        if (res.success && res.data) {
          setArticles(res.data.articles || []);
        }
      } catch (err) {
        console.error('Error loading journal articles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [selectedCategory, search]);

  return (
    <div className="pt-24 pb-20 bg-[#fbfaf8] animate-fadeIn">
      {/* Header */}
      <div className="bg-[#10221b] text-white py-16 px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-xs uppercase font-bold tracking-widest text-[#f29727] block mb-2">
            The Blackforest Journal
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">
            Curated Stories for Curious Travelers
          </h1>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto">
            Practical packing guides, mountain expedition safety protocols, and insider destination chronicles from our travel designers.
          </p>

          <div className="max-w-md mx-auto mt-8 relative">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search guides, safety tips, gear..."
              className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-full text-sm text-white placeholder:text-gray-400 focus:outline-none focus:border-[#f29727] backdrop-blur-md"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 overflow-x-auto pb-4 mb-12 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-[#10221b] text-[#f29727] shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20 text-gray-400 gap-2">
            <span className="w-6 h-6 border-2 border-[#f29727] border-t-transparent rounded-full animate-spin"></span>
            Loading travel journal...
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-serif font-bold text-gray-700">No articles found</h3>
            <p className="text-xs text-gray-500 mt-1">Try searching another topic or reset the category filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((art) => (
              <article
                key={art.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#f29727]/50 transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={art.coverImage || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80'}
                    alt={art.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-[#10221b]/80 backdrop-blur-md text-[#f29727] text-[11px] font-bold uppercase tracking-wider rounded-full">
                    {art.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(art.publishedAt || art.createdAt).toLocaleDateString()}</span>
                    </div>

                    <h3 className="text-xl font-serif font-bold text-[#10221b] group-hover:text-[#f29727] transition-colors line-clamp-2 mb-3">
                      {art.title}
                    </h3>

                    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-6">
                      {art.excerpt}
                    </p>
                  </div>

                  <Link
                    to={`/journal/${art.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#10221b] group-hover:text-[#f29727] transition-colors pt-4 border-t border-gray-100"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
