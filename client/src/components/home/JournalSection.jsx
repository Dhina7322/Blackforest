import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getPublishedBlogs, BLOGS_EVENT } from '../../utils/blogsManager';

export default function JournalSection() {
  const [articles, setArticles] = useState(() => getPublishedBlogs().slice(0, 3));

  useEffect(() => {
    const handleUpdate = () => {
      setArticles(getPublishedBlogs().slice(0, 3));
    };
    window.addEventListener(BLOGS_EVENT, handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener(BLOGS_EVENT, handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  if (!articles || articles.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-12">
          <span className="text-[#27B8B1] font-semibold text-xs sm:text-sm uppercase tracking-wider block mb-2 font-sans">
            Travel blog & guide
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#5e963b] font-serif tracking-tight">
            Curated Stories For Curious Travelers
          </h2>
        </div>

        {/* 3 Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link
              key={article.id}
              to={`/blog/${article.slug}`}
              className="bg-white rounded-lg overflow-hidden group block transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative h-64 overflow-hidden rounded-lg mb-4 bg-gray-100">
                <img 
                  src={article.coverImage} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/destinations/destinations-1503614472-8.webp';
                  }}
                />
              </div>
              <div className="px-1">
                <span className="text-[#f29727] text-xs font-bold uppercase tracking-widest mb-2 block font-sans">
                  • {article.category}
                </span>
                <h3 className="text-gray-900 font-bold text-lg sm:text-xl leading-snug mb-3 group-hover:text-[#27B8B1] transition-colors font-sans line-clamp-2">
                  {article.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link 
            to="/blog" 
            className="inline-block px-8 py-3 bg-[#f29727] hover:bg-[#db841a] text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded transition-colors shadow-md"
          >
            View All
          </Link>
        </div>

      </div>
    </section>
  );
}
