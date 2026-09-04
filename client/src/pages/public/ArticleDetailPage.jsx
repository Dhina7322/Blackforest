import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import {
  Calendar,
  User,
  Share2,
  BookOpen,
  ArrowLeft,
  ArrowRight,
  MessageSquare,
  Mail,
  Check,
  Tag,
  ZoomIn,
  X,
  Send
} from 'lucide-react';
import { getBlogBySlug, getPublishedBlogs, updateBlog, BLOGS_EVENT } from '../../utils/blogsManager';
import { useToast } from '../../context/ToastContext';
import ExpertiseLogosSection from '../../components/common/ExpertiseLogosSection';

export default function ArticleDetailPage({ forcedSlug }) {
  const { slug: routeSlug } = useParams();
  const location = useLocation();
  const { showToast } = useToast();

  // Determine effective slug
  let slug = forcedSlug || routeSlug;
  if (!slug || slug === 'blog' || slug === 'journal' || slug === 'blogs') {
    slug = 'safety-measures-for-safe-trekking-in-waterfalls';
  }

  const [article, setArticle] = useState(null);
  const [allBlogs, setAllBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [copied, setCopied] = useState(false);

  // Comment form state
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  const loadData = () => {
    setLoading(true);
    const blogs = getPublishedBlogs();
    setAllBlogs(blogs);

    const targetSlug = slug || 'safety-measures-for-safe-trekking-in-waterfalls';
    const found = getBlogBySlug(targetSlug);
    if (found) {
      setArticle(found);
    } else if (blogs.length > 0) {
      setArticle(blogs[0]);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();

    const handleBlogsUpdate = () => {
      loadData();
    };

    window.addEventListener(BLOGS_EVENT, handleBlogsUpdate);
    return () => window.removeEventListener(BLOGS_EVENT, handleBlogsUpdate);
  }, [slug, location.pathname]);

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = article?.title || 'Blackforest Holidays';

    if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (platform === 'pinterest') {
      window.open(`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(article?.coverImage || '')}&description=${encodeURIComponent(title)}`, '_blank');
    } else if (platform === 'mail') {
      window.location.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;
    } else {
      navigator.clipboard.writeText(url);
      setCopied(true);
      showToast('Article link copied to clipboard!', 'info');
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!commentText.trim() || !commentName.trim()) {
      showToast('Please enter your name and comment.', 'error');
      return;
    }

    setSubmittingComment(true);
    const newComment = {
      id: Date.now(),
      author: commentName.trim(),
      email: commentEmail.trim(),
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }) + ` at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      text: commentText.trim()
    };

    const existingComments = Array.isArray(article.comments) ? article.comments : [];
    const updatedComments = [...existingComments, newComment];

    updateBlog(article.id, {
      comments: updatedComments,
      commentsCount: updatedComments.length
    });

    setCommentText('');
    setCommentName('');
    setCommentEmail('');
    setSubmittingComment(false);
    showToast('Your comment has been posted successfully!', 'success');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#ffffff]">
        <div className="flex items-center gap-3 text-[#10221b]">
          <span className="w-8 h-8 border-3 border-[#f29727] border-t-transparent rounded-full animate-spin"></span>
          <span className="font-serif text-lg">Loading article...</span>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-[#ffffff]">
        <BookOpen className="w-16 h-16 text-gray-300 mb-4" />
        <h2 className="text-3xl font-serif font-bold text-[#10221b] mb-2">Article Not Found</h2>
        <p className="text-gray-500 text-sm mb-6 max-w-md">This blog story could not be located or has been archived.</p>
        <Link
          to="/"
          className="px-8 py-3 bg-[#10221b] text-[#f29727] rounded-full text-xs uppercase font-bold tracking-widest hover:bg-[#1b382d] transition-colors"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  // Curated Related Posts (matching exact reference Image 3)
  const relatedPosts = [
    {
      id: 'rel-1',
      title: '10 Tips for best winter hiking experience',
      slug: '10-tips-for-best-winter-hiking-experience',
      category: 'Black & white, Cabinet, Interiors',
      tag: 'Multipurpose',
      coverImage: 'https://blackforestholidays.com/wp-content/uploads/2020/06/blog-007.jpg',
      excerpt: 'Est culpa architecto cum perferendis quasi in nihil aliquam ut temporibus porro. In repellendus similique sit ipsum recusandae At velit doloribus et temporibus dolorem....'
    },
    {
      id: 'rel-2',
      title: 'How to select perfect quality camping tent',
      slug: 'how-to-select-perfect-quality-camping-tent',
      category: 'Black & white, Cabinet, Interiors',
      tag: 'Multipurpose',
      coverImage: 'https://blackforestholidays.com/wp-content/uploads/2020/06/blog-006.jpg',
      excerpt: 'Est culpa architecto cum perferendis quasi in nihil aliquam ut temporibus porro. In repellendus similique sit ipsum recusandae At velit doloribus et temporibus dolorem....'
    },
    {
      id: 'rel-3',
      title: 'Great outdoor adventure photography',
      slug: 'great-outdoor-adventure-photography',
      category: 'Black & white, Cabinet, Interiors',
      tag: 'Multipurpose',
      coverImage: 'https://blackforestholidays.com/wp-content/uploads/2020/06/blog-005.jpg',
      excerpt: 'Est culpa architecto cum perferendis quasi in nihil aliquam ut temporibus porro. In repellendus similique sit ipsum recusandae At velit doloribus et temporibus dolorem....'
    }
  ];

  // Split content for Drop Cap
  const contentParagraphs = (article.content || '')
    .split('\n\n')
    .map((p) => p.trim())
    .filter(Boolean);

  const firstParagraph =
    contentParagraphs[0] ||
    'Est culpa architecto cum perferendis quasi in nihil aliquam ut temporibus porro. In repellendus similique sit ipsum recusandae At velit doloribus et temporibus dolorem. Eum iure eaque aut provident magni et odit voluptas et modi nobis est aperiam eligendi est suscipit galisum ut quia distinctio. Vel delectus harum eos omnis dolores rem perspiciatis totam est rerum Quis aut sequi natus vel quisquam tempore.';

  const firstLetter = firstParagraph.charAt(0);
  const restOfFirstParagraph = firstParagraph.slice(1);

  const secondParagraph =
    contentParagraphs[1] ||
    'Proin tincidunt nunc lorem, nec faucibus mi facilisis eget. Mauris laoreet, nisl id faucibus pellentesque, mi mi tempor enim, sit amet interdum felis nibh a leo. Donec efficitur velit ac nisi rutrum, eu ornare augue tristique. Vivamus accumsan nisl id massa finibus aliquet. Pellentesque blandit ut urna dignissim pulvinar. Aliquam in ultrices ante. Nam condimentum eleifend consectetur. Fusce quam nunc, bibendum eget venenatis a, volutpat at ligula. Ut interdum elit vel ante tincidunt mattis. Aenean dignissim vulputate justo, sed tincidunt sapien laoreet a. Fusce vehicula, turpis sed hendrerit gravida, ante justo accumsan nisi, non congue metus risus a lorem. Quisque eleifend velit id metus ullamcorper tristique. Integer vel commodo ex. Pellentesque sed ultrices tellus.';

  return (
    <div className="bg-[#ffffff] text-[#483e3e] animate-fadeIn min-h-screen">
      {/* Lightbox Modal */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setLightboxImg(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh]">
            <button
              onClick={() => setLightboxImg(null)}
              className="absolute -top-12 right-0 text-white hover:text-[#f29727] p-2 transition-colors cursor-pointer"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={lightboxImg}
              alt="Preview"
              className="max-h-[85vh] w-auto rounded-lg shadow-2xl object-contain"
            />
          </div>
        </div>
      )}

      {/* 1. Exact Hero Section (Match to Image 2) */}
      <section className="relative w-full min-h-[480px] sm:min-h-[540px] md:min-h-[600px] flex flex-col justify-center items-center text-center overflow-hidden bg-[#10221b]">
        {/* Authentic Background Photo (Hikers on Mountain Lake Ridge) */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/blog-hero-bg.png')`,
            backgroundPosition: 'center 35%'
          }}
        />

        {/* Subtle Dark Gradient Overlay for perfect readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/25 to-black/60" />

        {/* Center Title & Breadcrumb */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-36">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] font-sans">
            {article.title}
          </h1>

          {/* Authentic Breadcrumb Row with Slanted Delimiters matching Image 2 */}
          <div className="flex items-center justify-center flex-wrap gap-2 text-xs sm:text-sm md:text-[15px] text-gray-200 font-medium drop-shadow-md">
            <Link to="/" className="hover:text-[#f29727] transition-colors">
              Home
            </Link>
            <span className="text-gray-300 font-bold px-1">&#x25E5;</span>
            <span className="hover:text-[#f29727] cursor-pointer transition-colors">
              {article.category || 'Black & white'}
            </span>
            <span className="text-gray-300 font-bold px-1">&#x25E5;</span>
            <span className="text-gray-300 truncate max-w-[220px] sm:max-w-none">
              {article.title}
            </span>
          </div>
        </div>

        {/* Pine Forest Trees Silhouette & Smooth Organic White Wave Cut (Exact Match to Image 2) */}
        <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none overflow-hidden leading-none">
          <img
            src="/pine-forest.webp"
            alt="Pine Trees Silhouette"
            className="w-full h-24 sm:h-36 md:h-44 object-cover object-bottom"
            style={{
              filter: 'drop-shadow(0 -4px 6px rgba(0,0,0,0.4))'
            }}
          />

          <svg
            className="absolute bottom-[-1px] left-0 w-full h-[50px] sm:h-[80px] md:h-[100px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0 120H1200V81.334C1147.2 46.108 1083.74 38.649 1017.3 64.673 950.849 90.697 881.084 105.151 814.945 92.42 748.807 79.689 676.843 38.077 609.914 26.684 542.985 15.291 482.029 27.535 417.893 54.767 353.757 81.999 283.435 99.789 216.591 97.491 149.747 95.193 83.181 57.062 0 17.5V120Z"
              fill="#ffffff"
            />
          </svg>
        </div>
      </section>

      {/* 2. Main Article Body Container (Match to Image 3) */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        {/* Centered Category Heading in Amber */}
        <div className="text-center mb-3">
          <span className="text-[#f29727] font-bold text-xs sm:text-[13px] tracking-[0.25em] uppercase font-sans">
            BLACK &amp; WHITE, CABINET, INTERIORS
          </span>
        </div>

        {/* Centered Publication Date with Accent Rule */}
        <div className="flex items-center justify-center gap-3 text-gray-400 text-xs tracking-widest uppercase mb-8">
          <span className="w-8 h-px bg-gray-300"></span>
          <span>{article.date || 'JULY 10, 2021'}</span>
          <span className="w-8 h-px bg-gray-300"></span>
        </div>

        {/* Centered Large Featured Image (Man Facing Waterfall Spray) */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl mb-8 bg-gray-100">
          <img
            src={article.coverImage || 'https://blackforestholidays.com/wp-content/uploads/2020/06/blog-010.jpg'}
            alt={article.title}
            className="w-full h-auto max-h-[700px] object-cover"
          />
        </div>

        {/* Post Meta Row (Author left, Social Shares + Comment right) */}
        <div className="flex items-center justify-between py-4 border-b border-gray-200 mb-8">
          {/* Author */}
          <div className="flex items-center gap-3">
            <img
              src="https://secure.gravatar.com/avatar/d8d05b29d856d9ed6cf070046d4d190f2ebefb8864114f1eac44b855ab25c6f7?s=50&d=mm&r=g"
              alt="Blackforest"
              className="w-10 h-10 rounded-full object-cover border border-gray-200"
            />
            <div>
              <span className="text-[11px] text-gray-400 block leading-tight">Written by</span>
              <span className="font-bold text-[#10221b] text-sm">Blackforest</span>
            </div>
          </div>

          {/* Social Share Icons & Comment Count */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => handleShare('facebook')}
              className="w-8 h-8 rounded-full border border-[#f29727] text-[#f29727] hover:bg-[#f29727] hover:text-white flex items-center justify-center transition-colors text-xs"
              title="Facebook"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
            <button
              onClick={() => handleShare('twitter')}
              className="w-8 h-8 rounded-full border border-[#f29727] text-[#f29727] hover:bg-[#f29727] hover:text-white flex items-center justify-center transition-colors text-xs"
              title="Twitter"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </button>
            <button
              onClick={() => handleShare('pinterest')}
              className="w-8 h-8 rounded-full border border-[#f29727] text-[#f29727] hover:bg-[#f29727] hover:text-white flex items-center justify-center transition-colors text-xs"
              title="Pinterest"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.357-.053.225-.174.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.546.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
              </svg>
            </button>
            <button
              onClick={() => handleShare('mail')}
              className="w-8 h-8 rounded-full border border-[#f29727] text-[#f29727] hover:bg-[#f29727] hover:text-white flex items-center justify-center transition-colors text-xs"
              title="Email"
            >
              <Mail className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleShare('copy')}
              className="w-8 h-8 rounded-full border border-[#f29727] text-[#f29727] hover:bg-[#f29727] hover:text-white flex items-center justify-center transition-colors text-xs"
              title="Copy Link"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
            </button>

            <a
              href="#comments"
              className="text-xs font-semibold text-[#10221b] hover:text-[#f29727] ml-2 pl-3 border-l border-gray-300 flex items-center gap-1"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#f29727]" />
              <span>
                {Array.isArray(article.comments) ? article.comments.length : 1} Comment
              </span>
            </a>
          </div>
        </div>

        {/* 3. Drop Cap Paragraph & Body Text (Match to Image 3) */}
        <div className="space-y-6 text-gray-700 text-base leading-[1.85]">
          {/* Paragraph 1 with Drop Cap */}
          <p className="leading-relaxed clear-both text-gray-800">
            <span className="float-left text-6xl font-serif font-bold text-[#10221b] leading-none pt-1 pr-3 select-none">
              {firstLetter}
            </span>
            {restOfFirstParagraph}
          </p>

          {/* Paragraph 2 */}
          <p className="leading-relaxed text-gray-700">
            {secondParagraph}
          </p>

          {/* 4. Dual Image Gallery (Side-by-Side) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-10">
            <div
              className="relative group cursor-pointer overflow-hidden rounded-xl shadow-md bg-gray-100 h-80 sm:h-96"
              onClick={() =>
                setLightboxImg('https://blackforestholidays.com/wp-content/uploads/2021/07/blog-detail-001.jpg')
              }
            >
              <img
                src="https://blackforestholidays.com/wp-content/uploads/2021/07/blog-detail-001.jpg"
                alt="Trekking Detail 1"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-11 h-11 rounded-full bg-white text-[#10221b] flex items-center justify-center shadow-lg">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>
            </div>

            <div
              className="relative group cursor-pointer overflow-hidden rounded-xl shadow-md bg-gray-100 h-80 sm:h-96"
              onClick={() =>
                setLightboxImg('https://blackforestholidays.com/wp-content/uploads/2021/07/blog-detail-002.jpg')
              }
            >
              <img
                src="https://blackforestholidays.com/wp-content/uploads/2021/07/blog-detail-002.jpg"
                alt="Trekking Detail 2"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="w-11 h-11 rounded-full bg-white text-[#10221b] flex items-center justify-center shadow-lg">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          {/* 5. Two-Column Row: Paragraph Left, Quote Callout Right (Match to Image 3) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10 items-center">
            <div className="text-gray-700 leading-relaxed text-sm sm:text-base">
              <p>
                Ex inventore quas qui earum illum et quaerat enim At voluptatibus quidem hic soluta minima et distinctio obcaecati Contrary. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure.
              </p>
            </div>

            {/* Testimonial Quote with Large Amber Quotation Mark */}
            <div className="bg-[#fbfaf8] p-6 sm:p-8 rounded-2xl border-l-4 border-[#f29727] shadow-xs">
              <div className="text-[#f29727] text-4xl font-serif leading-none mb-2 select-none">“</div>
              <blockquote className="text-[#10221b] font-serif italic text-base sm:text-lg mb-3 leading-relaxed">
                Vel saepe possimus sit corporis ipsa et quia fugit vel magnam iure rem voluptate voluptas ut earum tempora.
              </blockquote>
              <div className="text-xs font-bold uppercase tracking-wider text-[#10221b]">
                - Barry Hilligan, Co Founder of Houzy
              </div>
            </div>
          </div>
        </div>

        {/* 6. Previous Story & Next Story Navigation (Match to Image 3) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-10 mt-12 border-t border-gray-200">
          {/* Previous Story */}
          <Link
            to="/safety-measures-for-safe-trekking-in-waterfalls"
            className="group relative overflow-hidden rounded-xl p-5 bg-[#10221b] text-white flex items-center gap-4 hover:shadow-lg transition-all"
          >
            <img
              src="https://blackforestholidays.com/wp-content/uploads/2020/06/blog-007.jpg"
              alt="Previous Story"
              className="w-16 h-16 rounded-lg object-cover shrink-0"
            />
            <div>
              <span className="text-[11px] text-[#f29727] font-bold uppercase tracking-wider block mb-1">
                &larr; Previous Story
              </span>
              <h4 className="font-serif text-sm font-bold text-white line-clamp-2 group-hover:text-[#f29727] transition-colors">
                10 Tips for best winter hiking experience
              </h4>
            </div>
          </Link>

          {/* Next Story */}
          <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 flex flex-col justify-center items-end text-right">
            <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-1">
              Next Story &rarr;
            </span>
            <span className="font-serif text-sm font-bold text-gray-500">
              No story to show!
            </span>
          </div>
        </div>

        {/* 7. Comments Section */}
        <section id="comments" className="pt-12 mt-12 border-t border-gray-200">
          <h3 className="text-2xl font-serif font-bold text-[#10221b] mb-6">
            Comments ( {Array.isArray(article.comments) ? article.comments.length : 1} )
          </h3>

          <div className="space-y-6 mb-12">
            <div className="p-6 bg-[#fbfaf8] rounded-xl border border-gray-100 flex gap-4">
              <img
                src="https://secure.gravatar.com/avatar/d8d05b29d856d9ed6cf070046d4d190f2ebefb8864114f1eac44b855ab25c6f7?s=50&d=mm&r=g"
                alt="adventor"
                className="w-12 h-12 rounded-full object-cover shrink-0 border border-gray-200"
              />
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-bold text-[#10221b] text-sm">adventor</span>
                  <span className="text-xs text-gray-400">July 21, 2021 at 3:11 pm</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Sit amet consectetur adipiscing elit pellentesque habitant morbi. Vulputate mi sit amet mauris commodo quis imperdiet. Dui vivamus arcu felis bibendum ut.
                </p>
              </div>
            </div>

            {Array.isArray(article.comments) &&
              article.comments.slice(1).map((comm) => (
                <div
                  key={comm.id}
                  className="p-6 bg-[#fbfaf8] rounded-xl border border-gray-100 flex gap-4"
                >
                  <img
                    src="https://secure.gravatar.com/avatar/d8d05b29d856d9ed6cf070046d4d190f2ebefb8864114f1eac44b855ab25c6f7?s=50&d=mm&r=g"
                    alt={comm.author}
                    className="w-12 h-12 rounded-full object-cover shrink-0 border border-gray-200"
                  />
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-bold text-[#10221b] text-sm">{comm.author}</span>
                      <span className="text-xs text-gray-400">{comm.date}</span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{comm.text}</p>
                  </div>
                </div>
              ))}
          </div>

          {/* Leave a Reply Form */}
          <div className="bg-[#f8f9f8] p-6 sm:p-8 rounded-2xl border border-gray-200">
            <h4 className="text-xl font-serif font-bold text-[#10221b] mb-2">Leave a Reply</h4>
            <p className="text-xs text-gray-500 mb-6">
              Your email address will not be published. Required fields are marked *
            </p>

            <form onSubmit={handleCommentSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Comment *
                </label>
                <textarea
                  rows={4}
                  required
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Your comment..."
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#f29727] resize-y"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={commentName}
                    onChange={(e) => setCommentName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#f29727]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={commentEmail}
                    onChange={(e) => setCommentEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#f29727]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submittingComment}
                className="px-8 py-3 bg-[#10221b] hover:bg-[#1b382d] text-[#f29727] font-bold text-xs uppercase tracking-widest rounded-full transition-all flex items-center gap-2 shadow-md cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{submittingComment ? 'Posting...' : 'Post Comment'}</span>
              </button>
            </form>
          </div>
        </section>

        {/* 8. Related Posts Section (Exact 3 Cards from Image 3) */}
        <section className="pt-16 mt-16 border-t border-gray-200">
          <h3 className="text-3xl font-serif font-bold text-[#10221b] text-center mb-10">
            Related Posts
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="relative h-52 overflow-hidden bg-gray-100">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#f29727] block mb-1">
                      {post.category}
                    </span>
                    <h4 className="font-serif font-bold text-[#10221b] text-lg group-hover:text-[#f29727] transition-colors line-clamp-2 mb-2 leading-snug">
                      <Link to="/safety-measures-for-safe-trekking-in-waterfalls">{post.title}</Link>
                    </h4>
                    <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                  </div>

                  <Link
                    to="/safety-measures-for-safe-trekking-in-waterfalls"
                    className="inline-block px-5 py-2.5 bg-[#10221b] hover:bg-[#1c382e] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors text-center shadow-sm"
                  >
                    Read More &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 9. Expertise Logos Section (Exact section at bottom of Image 3) */}
      <ExpertiseLogosSection />
    </div>
  );
}
