import React, { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { ArrowRight, CalendarCheck, CheckCircle2, Hash, Compass, ArrowLeft } from 'lucide-react';
import { destinationService } from '../../services/allServices';
import { useSettings } from '../../context/SiteSettingsContext';
import { allDestinationsData } from '../../data/destinationsData';
import { isDestinationPublished, DESTINATIONS_EVENT } from '../../utils/destinationsManager';
import { getPublishedExpertiseCards, EXPERTISE_EVENT } from '../../utils/expertiseManager';

// Dynamic Counter Hook for 0 -> end animation (Image 3 & 4 request)
function AnimatedCounter({ end, duration = 1800, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    let startTime = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Smooth ease-out exponential curve
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [started, end, duration]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function DestinationDetailPage({ forcedSlug }) {
  const { slug: routeSlug } = useParams();
  const location = useLocation();
  const { openEnquiryModal } = useSettings();

  // Determine slug from props, route params, or pathname (/africa, /america, etc.)
  const resolvedSlug = (
    forcedSlug ||
    routeSlug ||
    location.pathname.replace(/^\/(destinations\/)?/, '').replace(/\/$/, '') ||
    'africa'
  ).toLowerCase();

  const [activeTab, setActiveTab] = useState(1);
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPublished, setIsPublished] = useState(() => isDestinationPublished(resolvedSlug));
  const [partnerCards, setPartnerCards] = useState(() => getPublishedExpertiseCards());

  // Fallback to our rich curated dataset
  const staticData = allDestinationsData[resolvedSlug] || allDestinationsData['africa'];

  useEffect(() => {
    const updatePublishStatus = () => {
      setIsPublished(isDestinationPublished(resolvedSlug));
    };
    const updatePartners = () => {
      setPartnerCards(getPublishedExpertiseCards());
    };

    updatePublishStatus();
    updatePartners();

    window.addEventListener(DESTINATIONS_EVENT, updatePublishStatus);
    window.addEventListener(EXPERTISE_EVENT, updatePartners);
    window.addEventListener('storage', updatePublishStatus);
    window.addEventListener('storage', updatePartners);

    return () => {
      window.removeEventListener(DESTINATIONS_EVENT, updatePublishStatus);
      window.removeEventListener(EXPERTISE_EVENT, updatePartners);
      window.removeEventListener('storage', updatePublishStatus);
      window.removeEventListener('storage', updatePartners);
    };
  }, [resolvedSlug]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveTab(1);

    const fetchDestination = async () => {
      setLoading(true);
      try {
        const res = await destinationService.getBySlug(resolvedSlug);
        if (res.success && res.data) {
          setDestination(res.data);
        }
      } catch (err) {
        console.warn('Using curated destination data for:', resolvedSlug);
      } finally {
        setLoading(false);
      }
    };

    fetchDestination();
  }, [resolvedSlug]);

  const name = destination?.name || staticData.name;
  const heroImage = destination?.heroImage || staticData.heroImage;
  const intro = staticData.intro;
  const tabs = staticData.tabs;
  const countries = staticData.countries || [];

  // If unpublished by admin, do not show on website
  if (!isPublished) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 py-32 bg-[#fbfaf8]">
        <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mb-6 shadow-sm">
          <Compass className="w-8 h-8 animate-pulse" />
        </div>
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#f29727] mb-2 block">
          Destination Unavailable
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#10221b] mb-4">
          {name} is Currently Unpublished
        </h1>
        <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed">
          This destination portfolio is currently inactive or undergoing seasonal curation. Please explore our other destinations or contact our concierge.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/destinations"
            className="px-7 py-3 bg-[#10221b] text-[#f29727] rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#1c382e] shadow-lg transition-all flex items-center gap-2"
          >
            <span>Explore Other Destinations</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/"
            className="px-7 py-3 bg-white text-gray-700 border border-gray-200 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-gray-50 shadow-sm transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white animate-fadeIn w-full overflow-x-hidden min-h-screen">
      {/* 1. Hero Banner with Pine Forest Trees (Image 1) & Proportional Heading Size */}
      <section className="relative w-full h-[64vh] min-h-[480px] flex flex-col items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt={name}
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000"
          />
          {/* Dark vignette overlay */}
          <div className="absolute inset-0 bg-black/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/35" />
        </div>

        {/* Hero Content - Heading Size Reduced to Elegant Proportion */}
        <div className="relative z-10 text-center px-4 mt-6 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-3 drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)] capitalize tracking-tight leading-tight">
            {name}
          </h1>
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium tracking-wide text-white/95 drop-shadow-md">
            <Link to="/" className="hover:text-[#f29727] transition-colors">Home</Link>
            <span className="text-[10px] opacity-80">▾</span>
            <span className="text-white font-semibold">{name}</span>
          </div>
        </div>

        {/* Pine Forest Silhouette (using client/public/pine-forest.webp) & Organic Wave Cut */}
        <div className="absolute bottom-0 left-0 w-full z-20 pointer-events-none overflow-hidden leading-none">
          {/* The pine trees silhouette image from public folder */}
          <img
            src="/pine-forest.webp"
            alt="Black Forest Pine Trees"
            className="w-full h-24 sm:h-36 md:h-44 object-cover object-bottom"
            style={{
              filter: 'drop-shadow(0 -3px 5px rgba(0,0,0,0.35))'
            }}
          />

          {/* Smooth Organic Wave Cut into pure white page background */}
          <svg
            className="absolute bottom-[-1px] left-0 w-full h-[45px] sm:h-[75px] md:h-[90px]"
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

      {/* 2. Intro Section with Cursive Tagline (Image 2 style) & Staggered Imagery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Cursive Tagline, Heading, Paragraph, and Lower Image */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              {/* Cursive cyan tagline from user's Image 2 */}
              <span
                className="block text-2xl sm:text-3xl md:text-4xl text-[#1dc5ce] mb-2 tracking-wide font-normal"
                style={{ fontFamily: "'Mansalva', cursive" }}
              >
                {staticData.tagline || 'Heritage to Himalayas'}
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#5ba14a] leading-[1.15] mb-6">
                {intro.title}
              </h2>
              <div className="text-gray-700 leading-relaxed text-sm sm:text-base space-y-4 font-normal">
                <p>{intro.description}</p>
              </div>
            </div>

            {/* Overlapping Lower Image */}
            <div className="relative w-full max-w-lg h-[240px] sm:h-[300px] rounded-xl overflow-hidden shadow-xl border border-gray-100">
              <img
                src={intro.img1}
                alt={`${name} feature`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Right Column: Tall Portrait Image */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-md h-[460px] sm:h-[580px] rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
              <img
                src={intro.img2}
                alt={`${name} highlight portrait`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Jet-Tabs Navigation Bar */}
      <section className="w-full bg-[#e6eee5] border-y border-[#d5e0d4] sticky top-20 z-30 shadow-sm">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-center divide-x divide-[#c7d6c6]">
            <button
              onClick={() => setActiveTab(1)}
              className={`flex-1 py-4 sm:py-5 px-3 text-center text-xs sm:text-sm font-semibold tracking-wider transition-all uppercase ${
                activeTab === 1
                  ? 'bg-[#10221b] text-[#f29727] shadow-inner font-bold'
                  : 'text-[#10221b] hover:bg-[#dce6db]'
              }`}
            >
              Why Blackforest Holidays?
            </button>
            <button
              onClick={() => setActiveTab(2)}
              className={`flex-1 py-4 sm:py-5 px-3 text-center text-xs sm:text-sm font-semibold tracking-wider transition-all uppercase ${
                activeTab === 2
                  ? 'bg-[#10221b] text-[#f29727] shadow-inner font-bold'
                  : 'text-[#10221b] hover:bg-[#dce6db]'
              }`}
            >
              Destinations
            </button>
            <button
              onClick={() => setActiveTab(3)}
              className={`flex-1 py-4 sm:py-5 px-3 text-center text-xs sm:text-sm font-semibold tracking-wider transition-all uppercase ${
                activeTab === 3
                  ? 'bg-[#10221b] text-[#f29727] shadow-inner font-bold'
                  : 'text-[#10221b] hover:bg-[#dce6db]'
              }`}
            >
              Highlights
            </button>
          </div>
        </div>
      </section>

      {/* 4. Jet-Tabs Dynamic Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Tab 1: Why Blackforest Holidays? */}
        {activeTab === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center animate-fadeIn">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#10221b] block">
                {tabs.tab1.subtitle}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#5ba14a] leading-tight">
                {tabs.tab1.title}
              </h2>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {tabs.tab1.description}
              </p>
              <div className="pt-4 flex items-center gap-4">
                <button
                  onClick={() => openEnquiryModal({ destination: name })}
                  className="px-8 py-3.5 bg-[#10221b] hover:bg-[#1c382e] text-[#f29727] font-bold text-xs uppercase tracking-widest rounded-full shadow-lg transition-all flex items-center gap-2"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Customize Itinerary</span>
                </button>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="w-full h-[360px] sm:h-[440px] rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
                <img
                  src={tabs.tab1.image}
                  alt={tabs.tab1.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Destinations */}
        {activeTab === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center animate-fadeIn">
            <div className="lg:col-span-6 space-y-6 max-h-[600px] overflow-y-auto pr-4 no-scrollbar">
              <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#10221b] block">
                {tabs.tab2.subtitle}
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#5ba14a] leading-tight">
                {tabs.tab2.title}
              </h2>
              <div className="space-y-4 pt-2">
                {tabs.tab2.items.map((item, idx) => (
                  <div key={idx} className="border-b border-gray-200/80 pb-3.5">
                    <h4 className="text-base font-bold text-[#10221b] mb-1 font-serif">
                      {item.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="w-full h-[400px] sm:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-gray-100 sticky top-32">
                <img
                  src={tabs.tab2.image}
                  alt={tabs.tab2.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Highlights */}
        {activeTab === 3 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center animate-fadeIn">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase font-bold tracking-[0.25em] text-[#10221b] block">
                {tabs.tab3.subtitle}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#5ba14a] leading-tight">
                {tabs.tab3.title}
              </h2>
              <div className="space-y-3 pt-2">
                {tabs.tab3.highlights.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#5ba14a] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="w-full h-[360px] sm:h-[440px] rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
                <img
                  src={tabs.tab3.image}
                  alt={tabs.tab3.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 5. Section with Animated Counting & Flying Birds Flock (Image 3 & 4) */}
      <section className="w-full bg-gradient-to-b from-white via-[#f3f8f3] to-white py-20 border-t border-gray-100 relative overflow-hidden">
        {/* Soft mountain wave background contours */}
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 400" fill="none">
            <path d="M0,200 C300,120 600,280 1200,150 L1200,400 L0,400 Z" fill="#e2ede2" />
            <path d="M0,280 C400,220 800,320 1200,240 L1200,400 L0,400 Z" fill="#d7e6d7" />
          </svg>
        </div>

        {/* Flock of Flying Birds (as in user Image 4) */}
        <div className="absolute top-3 sm:top-5 left-1/4 sm:left-1/3 z-10 pointer-events-none opacity-80 select-none">
          <svg className="w-64 sm:w-80 h-14 sm:h-18" viewBox="0 0 320 70" fill="#1b2a22">
            {/* Bird 1 */}
            <path d="M20,35 Q32,24 44,32 Q36,33 32,38 Q28,34 20,35 Z" />
            {/* Bird 2 */}
            <path d="M75,20 Q90,7 105,17 Q95,19 90,25 Q85,20 75,20 Z" />
            {/* Bird 3 (higher center) */}
            <path d="M140,10 Q158,-5 175,7 Q165,10 158,16 Q150,11 140,10 Z" />
            {/* Bird 4 */}
            <path d="M225,25 Q240,13 255,23 Q245,25 240,31 Q235,25 225,25 Z" />
            {/* Bird 5 (small distant bird) */}
            <path d="M275,42 Q285,35 295,41 Q288,43 285,47 Q282,43 275,42 Z" />
            {/* Bird 6 (lower right) */}
            <path d="M190,48 Q202,39 214,46 Q207,48 202,53 Q197,48 190,48 Z" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Side: Cursive Tagline, Heading, Paragraph, Brand Tag */}
            <div className="lg:col-span-6 space-y-5">
              <span
                className="block text-2xl sm:text-3xl text-[#1dc5ce] tracking-wide font-normal"
                style={{ fontFamily: "'Mansalva', cursive" }}
              >
                {staticData.tagline || 'Your Island Story Begins Here'}
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#10221b] leading-tight">
                {staticData.statsHeading || 'Escape to extraordinary islands'}
              </h2>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-lg">
                {staticData.statsDesc || 'From secluded beaches to unforgettable adventures, discover island journeys designed around you.'}
              </p>

              {/* Brand Tag #ventura */}
              <div className="pt-2 flex items-center gap-2 text-sm font-bold text-[#10221b]">
                <span className="p-1 rounded bg-[#10221b] text-white">
                  <Hash className="w-3.5 h-3.5" />
                </span>
                <span className="tracking-wide lowercase font-sans text-base">ventura</span>
              </div>
            </div>

            {/* Right Side: 3 Dark Circular Counters with Animated Counting */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6">
                {/* Counter Circle 1: 50+ */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#10221b] text-white flex flex-col items-center justify-center text-center p-2 shadow-xl border-2 border-white/10 transition-transform hover:scale-105">
                  <span className="text-xl sm:text-2xl font-bold font-serif text-white">
                    <AnimatedCounter end={50} suffix="+" />
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-medium text-gray-200 mt-0.5 leading-tight">
                    Island Destinations
                  </span>
                </div>

                {/* Counter Circle 2: 25 */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#10221b] text-white flex flex-col items-center justify-center text-center p-2 shadow-xl border-2 border-white/10 transition-transform hover:scale-105">
                  <span className="text-xl sm:text-2xl font-bold font-serif text-white">
                    <AnimatedCounter end={25} />
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-medium text-gray-200 mt-0.5 leading-tight">
                    Countries
                  </span>
                </div>

                {/* Counter Circle 3: 150+ */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#10221b] text-white flex flex-col items-center justify-center text-center p-2 shadow-xl border-2 border-white/10 transition-transform hover:scale-105">
                  <span className="text-xl sm:text-2xl font-bold font-serif text-white">
                    <AnimatedCounter end={150} suffix="+" />
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-medium text-gray-200 mt-0.5 leading-tight">
                    Tailor-Made Journeys
                  </span>
                </div>
              </div>

              {/* Sub-note text from Image 4 */}
              <p className="text-xs text-gray-500 leading-relaxed max-w-md italic">
                For Blackforest Holidays, I recommend &ldquo;Curated Journeys&rdquo; instead of &ldquo;Tours&rdquo; because it sounds more premium and luxurious.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. "Our Destinations" Section with Compact Cards (Exact Image 5 Proportions) */}
      <section id="our-destinations" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#5ba14a] mb-3">
            Our Destinations
          </h2>
          <p className="text-sm text-gray-500 max-w-xl mx-auto">
            Hover or click to explore signature retreats and personalized itineraries across {name}.
          </p>
        </div>

        {/* Compact 3D Flip Card Grid (matching Image 5 with reduced height) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {countries.map((c, i) => (
            <div
              key={i}
              className="group perspective-1000 h-[180px] sm:h-[210px] cursor-pointer"
              onClick={() => openEnquiryModal({ destination: `${c.name} (${name})` })}
            >
              <div className="flip-card-inner relative w-full h-full rounded-2xl shadow-md group-hover:shadow-xl transition-all duration-700">
                {/* Front Side: Cover Photo + Centered Country Name */}
                <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl overflow-hidden border border-gray-100/50">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)] font-sans">
                      {c.name}
                    </h3>
                  </div>
                </div>

                {/* Back Side: Rich Details & Inquire CTA */}
                <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl overflow-hidden bg-[#10221b] text-white p-5 sm:p-6 flex flex-col justify-between border border-[#f29727]/30 shadow-2xl">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#f29727] font-bold block mb-1">
                      {name} Destination
                    </span>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2">
                      {c.name}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-gray-300 leading-relaxed line-clamp-2 sm:line-clamp-3">
                      {c.desc || `Discover bespoke luxury itineraries and curated excursions in ${c.name}.`}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openEnquiryModal({ destination: `${c.name} (${name})` });
                      }}
                      className="px-4 py-1.5 bg-[#f29727] hover:bg-[#db841a] text-[#10221b] rounded-full text-[11px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 shadow-md"
                    >
                      <span>Inquire Now</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <span className="text-[10px] text-gray-400 font-medium">
                      Bespoke Route
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Parallax Promotional Luxury Banner (Image 3: Nature/Tours/Places Background) */}
      <section
        className="relative w-full h-[60vh] min-h-[440px] flex items-center justify-center overflow-hidden bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: `url('/luxury-lens-bg.jpg')`
        }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <span className="text-[#5ba14a] font-bold text-xs sm:text-sm tracking-[0.3em] uppercase mb-3 block">
            START A TRIP NOW
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-4 leading-tight drop-shadow-md">
            Discover India Through a Lens of Luxury
          </h2>
          <p className="text-base sm:text-lg text-gray-200 mb-8 font-serif italic tracking-wide">
            Everything you need for an adventure.
          </p>
          <Link
            to="/contact"
            className="px-10 py-3.5 bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#10221b] transition-all duration-300 text-xs font-bold uppercase tracking-[0.25em] shadow-lg"
          >
            CONTACT US
          </Link>
        </div>

        {/* Top Wave Mask */}
        <div className="absolute top-[-1px] left-0 w-full overflow-hidden leading-none z-20">
          <svg
            className="relative block w-full h-[40px] sm:h-[70px]"
            style={{ transform: 'rotate(180deg)' }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0 120H1200V81.334C1147.2 46.108 1083.74 38.649 1017.3 64.673 950.849 90.697 881.084 105.151 814.945 92.42 748.807 79.689 676.843 38.077 609.914 26.684 542.985 15.291 482.029 27.535 417.893 54.767 353.757 81.999 283.435 99.789 216.591 97.491 149.747 95.193 83.181 57.062 0 17.5V120Z"
              fill="#ffffff"
            ></path>
          </svg>
        </div>

        {/* Bottom Wave Mask */}
        <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-none z-20">
          <svg
            className="relative block w-full h-[40px] sm:h-[70px]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0 120H1200V81.334C1147.2 46.108 1083.74 38.649 1017.3 64.673 950.849 90.697 881.084 105.151 814.945 92.42 748.807 79.689 676.843 38.077 609.914 26.684 542.985 15.291 482.029 27.535 417.893 54.767 353.757 81.999 283.435 99.789 216.591 97.491 149.747 95.193 83.181 57.062 0 17.5V120Z"
              fill="#ffffff"
            ></path>
          </svg>
        </div>
      </section>

      {/* 8. Expertise / Knowledge Behind Every Journey Section (Matching Image 1) */}
      <section className="bg-[#fbfaf8] py-20 border-t border-gray-100 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <div className="flex items-center justify-center gap-2 text-[#c59b27] font-bold text-xs uppercase tracking-[0.25em] mb-2">
              <span className="w-1.5 h-1.5 bg-[#c59b27] rotate-45 transform"></span>
              OUR EXPERTISE
              <span className="w-1.5 h-1.5 bg-[#c59b27] rotate-45 transform"></span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#10221b] mb-4">
              Knowledge Behind Every Journey
            </h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto font-normal leading-relaxed">
              We are well-traveled consultants continually expanding through tourism board programmes, industry training, and global partnerships to design journeys you can trust.
            </p>
            {/* Golden Center Flourish Ornament */}
            <div className="flex justify-center mt-5">
              <svg width="40" height="20" viewBox="0 0 40 20" fill="none" stroke="#c59b27" strokeWidth="1.5">
                <path d="M20 10 C 14 2, 4 2, 4 10 C 4 18, 14 18, 20 10 Z" fill="none"/>
                <path d="M20 10 C 26 2, 36 2, 36 10 C 36 18, 26 18, 20 10 Z" fill="none"/>
                <circle cx="20" cy="10" r="2" fill="#c59b27" />
              </svg>
            </div>
          </div>

          {/* 10 Expertise Partner Cards Grid (5x2) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
            {partnerCards.map((partner) => (
              <a
                key={partner.id}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl border border-[#ece8df] p-5 sm:p-6 flex flex-col items-center justify-between text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#c59b27] group min-h-[220px]"
              >
                <div className="w-full h-24 flex items-center justify-center p-1 mb-2">
                  <img 
                    src={partner.image} 
                    alt={partner.name} 
                    className="max-h-20 max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/120x60?text=' + partner.name;
                    }}
                  />
                </div>

                <div className="w-full flex items-center justify-center my-3">
                  <div className="flex-1 h-[1px] bg-[#e4ddd0] group-hover:bg-[#c59b27]/40 transition-colors"></div>
                  <span className="mx-2.5 w-1.5 h-1.5 bg-[#c59b27] rotate-45 transform"></span>
                  <div className="flex-1 h-[1px] bg-[#e4ddd0] group-hover:bg-[#c59b27]/40 transition-colors"></div>
                </div>

                <div className="w-full pt-1">
                  <h4 className="font-bold text-[#10221b] text-sm sm:text-[15px] uppercase tracking-wider font-sans group-hover:text-[#c59b27] transition-colors">
                    {partner.name}
                  </h4>
                  <p className="text-gray-500 text-xs mt-1 font-normal leading-tight">
                    {partner.subtitle}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

