import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { articleService } from '../../services/allServices';

export default function JournalSection() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await articleService.getAll({ status: 'published', limit: 3 });
        if (res.success && res.data) {
          setArticles(res.data.articles || []);
        }
      } catch (err) {
        console.error('Error loading articles:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  return (
    <section className="py-24 bg-[#fbfaf8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#f29727] font-bold block mb-2">
              Recent news feed
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#10221b] leading-tight">
              Curated Stories for Curious Travelers
            </h2>
            <p className="text-gray-600 text-sm mt-2 max-w-xl">
              Practical guides, trail safety advice, and insider travel chronicles from our destination specialists.
            </p>
          </div>

          <Link
            to="/journal"
            className="text-xs font-bold uppercase tracking-widest text-[#10221b] hover:text-[#f29727] transition-colors flex items-center gap-1.5"
          >
            <span>Visit Travel Journal</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16 text-gray-400 gap-2">
            <span className="w-6 h-6 border-2 border-[#f29727] border-t-transparent rounded-full animate-spin"></span>
            Loading articles...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((art) => (
              <article
                key={art.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#f29727]/40 transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="relative h-56 overflow-hidden">
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
                    <span>Read Full Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
