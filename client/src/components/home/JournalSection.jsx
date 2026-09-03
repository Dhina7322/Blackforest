import React from 'react';
import { Link } from 'react-router-dom';

export default function JournalSection() {
  const articles = [
    {
      id: 1,
      tag: "Trekking",
      title: "Top 10 must-see spots for nature lovers",
      image: "https://images.unsplash.com/photo-1522069169874-c58e57ce8fb7?auto=format&fit=crop&w=600&q=80",
      slug: "top-10-must-see-spots"
    },
    {
      id: 2,
      tag: "Culture",
      title: "Unforgettable cultural experiences in Kyoto",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80",
      slug: "kyoto-culture"
    },
    {
      id: 3,
      tag: "Camping",
      title: "How to safely pack for a backcountry camping trip",
      image: "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&w=600&q=80",
      slug: "camping-guide"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-12">
          <span className="text-[#27B8B1] font-semibold text-sm uppercase tracking-wider block mb-2">
            Travel blog & guide
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#5e963b]">
            Curated Stories For Curious Travelers
          </h2>
        </div>

        {/* 3 Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div key={article.id} className="bg-white rounded-lg overflow-hidden group">
              <div className="relative h-64 overflow-hidden rounded-lg mb-4">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="px-2">
                <span className="text-[#f29727] text-xs font-bold uppercase tracking-widest mb-2 block">
                  • {article.tag}
                </span>
                <h3 className="text-gray-900 font-bold text-lg leading-snug mb-3 hover:text-[#27B8B1] transition-colors cursor-pointer">
                  {article.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link 
            to="/journal" 
            className="inline-block px-8 py-3 bg-[#f29727] hover:bg-[#db841a] text-white font-bold text-sm uppercase tracking-wider rounded transition-colors shadow-sm"
          >
            View All
          </Link>
        </div>

      </div>
    </section>
  );
}
