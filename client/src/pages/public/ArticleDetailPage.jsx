import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft, Share2, BookOpen } from 'lucide-react';
import { articleService } from '../../services/allServices';
import { useSettings } from '../../context/SiteSettingsContext';
import { useToast } from '../../context/ToastContext';

export default function ArticleDetailPage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const { openEnquiryModal } = useSettings();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const res = await articleService.getBySlug(slug);
        if (res.success && res.data) {
          setArticle(res.data);
        }
      } catch (err) {
        console.error('Error fetching article:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article?.title,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Article link copied to clipboard!', 'info');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fbfaf8]">
        <div className="flex items-center gap-2 text-[#10221b]">
          <span className="w-6 h-6 border-2 border-[#f29727] border-t-transparent rounded-full animate-spin"></span>
          <span>Loading dispatch...</span>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-[#fbfaf8]">
        <BookOpen className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-2xl font-serif font-bold text-[#10221b] mb-2">Article Not Found</h2>
        <p className="text-gray-500 text-sm mb-6">This journal post could not be found or has been archived.</p>
        <Link
          to="/journal"
          className="px-6 py-2.5 bg-[#10221b] text-[#f29727] rounded-full text-xs uppercase font-bold tracking-wider"
        >
          Return to Journal
        </Link>
      </div>
    );
  }

  const tags = Array.isArray(article.tags) ? article.tags : [];

  return (
    <div className="animate-fadeIn">
      {/* Hero Banner */}
      <div className="relative h-[55vh] min-h-[420px] bg-[#10221b] text-white flex items-end">
        <div className="absolute inset-0 z-0">
          <img
            src={article.coverImage || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80'}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10221b] via-[#10221b]/60 to-black/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-[#f29727] text-[#10221b] text-xs font-bold uppercase tracking-wider rounded-full">
              {article.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-gray-300">
              <Calendar className="w-3.5 h-3.5" />
              <span>{new Date(article.publishedAt || article.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white mb-4 leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center justify-between pt-2 border-t border-white/20">
            <div className="flex items-center gap-2 text-xs text-gray-300">
              <User className="w-4 h-4 text-[#f29727]" />
              <span>By {article.author?.name || 'Blackforest Travel Specialist'}</span>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-white"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link
          to="/journal"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#10221b] hover:text-[#f29727] mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Stories</span>
        </Link>

        <div className="prose prose-stone max-w-none text-gray-800 leading-relaxed text-base space-y-6">
          <p className="text-lg font-serif italic text-gray-600 border-l-4 border-[#f29727] pl-4 py-1">
            {article.excerpt}
          </p>

          <div className="whitespace-pre-line text-sm sm:text-base leading-relaxed text-gray-700">
            {article.content}
          </div>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap pt-8 mt-12 border-t border-gray-200">
            <Tag className="w-4 h-4 text-gray-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Related:</span>
            {tags.map((t, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
              >
                #{t}
              </span>
            ))}
          </div>
        )}

        {/* Plan a Trip CTA Banner */}
        <div className="mt-16 bg-[#10221b] text-white p-10 rounded-3xl text-center space-y-4">
          <span className="text-xs uppercase font-bold tracking-widest text-[#f29727] block">
            Inspired to Journey?
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Let Us Craft Your Tailored Itinerary
          </h3>
          <p className="text-gray-300 text-xs sm:text-sm max-w-md mx-auto">
            Our destination experts are ready to turn these stories into your real-world memories.
          </p>
          <button
            onClick={() => openEnquiryModal({ source: `Article: ${article.title}` })}
            className="px-8 py-3.5 bg-[#f29727] hover:bg-[#db841a] text-[#10221b] text-xs font-bold uppercase tracking-widest rounded-full shadow-lg transition-all"
          >
            Plan Your Vacation
          </button>
        </div>
      </div>
    </div>
  );
}
