import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { experiencesData } from '../../data/experiencesData';
import ExpertiseSection from '../../components/home/ExpertiseSection';
import { useSettings } from '../../context/SiteSettingsContext';

export default function ExperiencesPage() {
  const { slug } = useParams();
  const { openEnquiryModal } = useSettings();

  // Scroll to top on mount/slug change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // If slug is not found in our data, show a simple fallback or the default list view.
  // For now, since the user wants these exact 5 pages, we'll assume the slug matches.
  const data = experiencesData[slug];

  if (!data) {
    return (
      <div className="pt-32 pb-20 text-center min-h-[50vh]">
        <h1 className="text-3xl font-bold">Experience not found</h1>
        <Link to="/" className="text-[#f29727] underline mt-4 inline-block">Return Home</Link>
      </div>
    );
  }

  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselImages = data?.experiencesList?.images || [data?.heroImage, data?.heroImage, data?.heroImage];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000); // Auto slide every 4 seconds
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  const handleNext = () => setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  const handlePrev = () => setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);

  // Helper to get 3 images wrapped around for infinite loop effect
  const getVisibleImages = () => {
    if (!carouselImages || carouselImages.length === 0) return [];
    return [
      carouselImages[currentSlide],
      carouselImages[(currentSlide + 1) % carouselImages.length],
      carouselImages[(currentSlide + 2) % carouselImages.length],
    ];
  };

  return (
    <div className="animate-fadeIn bg-white font-sans text-gray-800 overflow-x-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative h-[65vh] min-h-[500px] flex flex-col justify-end">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={data.heroImage}
            alt={data.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Wavy Top SVG */}
        <div className="relative z-10 w-full text-white mt-auto">
          <svg viewBox="0 0 1920 120" fill="currentColor" preserveAspectRatio="none" className="w-full h-auto max-h-[120px] block">
            <path d="M0,120 L1920,120 L1920,80 C1700,140 1400,20 1000,80 C600,140 300,20 0,80 Z" />
          </svg>
        </div>
      </section>

      {/* 2. Main Content Section */}
      <section className="bg-white -mt-2 pb-20 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start pt-16">
            
            {/* Left Column: Title and text */}
            <div className="space-y-8 lg:pr-8">
              <div>
                <span className="text-[#10221b] font-bold text-sm uppercase tracking-wider block mb-3">
                  {data.title}
                </span>
                <h1 className="text-4xl md:text-[46px] lg:text-[54px] font-bold text-[#5e963b] leading-[1.1] mb-6">
                  {data.intro?.title || "Bespoke Journeys. Exceptional Places. Unforgettable Moments."}
                </h1>
                <div className="w-16 h-[2px] bg-gray-300 mb-8"></div>
              </div>
              
              <div className="space-y-6 text-gray-600 text-[15px] leading-[1.8] font-light">
                <p>
                  {data.intro?.text1 || `Discover a world of extraordinary travel with our ${data.title} Packages, where every journey is thoughtfully designed around you. From private villas and iconic resorts to secluded islands, fine dining, curated experiences, and personalised itineraries, our luxury escapes bring together the finest destinations and experiences around the world.`}
                </p>
                <p>
                  {data.intro?.text2 || "Every detail is crafted to deliver comfort, exclusivity, and unforgettable moments. Whether you're seeking a romantic retreat, a private family getaway, an exclusive island escape, or an unforgettable celebration, Blackforest Holidays creates journeys that go beyond the ordinary."}
                </p>
              </div>

              <div className="pt-6">
                <h3 className="text-xl font-bold text-[#10221b] mb-3">Travel, Your Way</h3>
                <p className="text-gray-600 text-sm font-light">
                  Every luxury journey is different. We take the time to understand your interests, preferences, pace, and expectations before crafting your itinerary.
                </p>
              </div>

              <div className="pt-6">
                <h3 className="text-xl font-bold text-[#10221b] mb-4">Our {data.title} Include:</h3>
                <ul className="space-y-3">
                  {data.experiencesList?.items?.map((item, idx) => (
                    <li key={idx} className="text-sm text-gray-600 font-light">
                      <span className="text-gray-900 font-bold">{idx + 1}. {item.title}</span> — {item.desc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Image with offset border */}
            <div className="relative pt-4 lg:pt-0">
              {/* Cyan Offset Border */}
              <div className="absolute top-8 left-8 right-[-1rem] bottom-[-1rem] border-[6px] border-[#27B8B1] z-0"></div>
              {/* Main Image */}
              <div className="relative z-10 bg-white p-2">
                <img 
                  src={data.intro?.image || data.heroImage} 
                  alt={data.title} 
                  className="w-full h-auto object-cover aspect-[4/3] shadow-lg"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Carousel Section (Image 3 design) */}
      <section className="relative py-20 overflow-hidden group">
        {/* Split Background (gray on left, white on right) */}
        <div className="absolute inset-0 w-full h-full flex z-0 pointer-events-none">
          <div className="w-[30%] h-full bg-[#f6f6f6]"></div>
          <div className="w-[70%] h-full bg-white"></div>
        </div>

        <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 relative z-10 flex items-center justify-between gap-4 md:gap-8">
          
          <button onClick={handlePrev} className="z-20 flex items-center justify-center text-[#10221b] hover:text-[#5e963b] transition-all transform hover:scale-110 hover:-translate-x-2 shrink-0">
            <svg viewBox="0 0 100 40" className="w-16 h-16 sm:w-24 sm:h-24 stroke-current fill-none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M90 20 Q 55 18 10 20" />
              <path d="M 12 20 Q 25 12 30 7" />
              <path d="M 12 20 Q 25 28 30 33" />
            </svg>
          </button>

          <div className="flex-1 overflow-hidden px-2">
            <div className="flex justify-center gap-4 sm:gap-6 md:gap-10 transition-all duration-700 ease-in-out">
              {getVisibleImages().map((img, idx) => (
                <div key={`${currentSlide}-${idx}`} className="w-1/3 max-w-[400px] aspect-square overflow-hidden shadow-lg animate-fadeIn flex-shrink-0">
                  <img 
                    src={img} 
                    alt={`Slide ${idx + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>

          <button onClick={handleNext} className="z-20 flex items-center justify-center text-[#10221b] hover:text-[#5e963b] transition-all transform hover:scale-110 hover:translate-x-2 shrink-0">
            <svg viewBox="0 0 100 40" className="w-16 h-16 sm:w-24 sm:h-24 stroke-current fill-none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 20 Q 45 22 90 20" />
              <path d="M 88 20 Q 75 12 70 7" />
              <path d="M 88 20 Q 75 28 70 33" />
            </svg>
          </button>

        </div>
      </section>

      {/* 4. Why Choose Us / Bottom Grid (Image 4 design) */}
      <section className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <h2 className="text-3xl md:text-4xl font-bold text-[#5e963b] mb-12">
            Why Travel With BlackForest Holidays?
          </h2>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {data.whyChooseUs?.features?.map((feature, idx) => (
              <div key={idx}>
                <h4 className="text-[15px] font-bold text-[#10221b] mb-3">{feature.title}</h4>
                <p className="text-gray-500 text-[13px] font-light leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Collage & Final Pitch */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left: Text */}
            <div className="space-y-8">
              <div>
                <h3 className="text-4xl md:text-[42px] font-bold text-[#5e963b] leading-tight mb-4">
                  Your Journey.<br />Your Style.<br />Your World.
                </h3>
                <div className="w-16 h-[2px] bg-[#f29727]"></div>
              </div>
              
              <p className="text-gray-600 text-[15px] leading-[1.8] font-light max-w-md">
                Whether you dream of waking up in a private overwater villa, exploring the African wilderness, sailing through spectacular coastlines, or discovering hidden European treasures, Blackforest Holidays turns your travel vision into a beautifully crafted journey.
              </p>

              <div>
                <h4 className="text-sm font-bold text-[#10221b] uppercase tracking-wider mb-4">Start Your Luxury Journey</h4>
                <button 
                  onClick={() => openEnquiryModal({ title: `${data.title} Enquiry` })}
                  className="bg-[#10221b] text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-[#5e963b] transition-colors"
                >
                  Enquire Now &rarr;
                </button>
              </div>
            </div>

            {/* Right: Collage */}
            <div className="relative">
              {/* Background faded pine tree silhouette - purely decorative */}
              <div className="absolute top-[-10%] right-[-10%] w-[120%] h-[120%] opacity-[0.03] z-0 pointer-events-none bg-[url('https://upload.wikimedia.org/wikipedia/commons/4/41/Pine_tree_silhouette.svg')] bg-no-repeat bg-right-top bg-contain"></div>
              
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="space-y-4 pt-12">
                  <img src={data.bottomSection?.collageImages?.[0] || 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=600&q=80'} alt="Collage 1" className="w-full h-48 object-cover" />
                  <img src={data.bottomSection?.collageImages?.[1] || 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80'} alt="Collage 2" className="w-full h-56 object-cover" />
                </div>
                <div>
                  <img src={data.bottomSection?.collageImages?.[2] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80'} alt="Collage 3" className="w-full h-[400px] object-cover" />
                  <div className="mt-8">
                    <h4 className="text-[#5e963b] text-2xl font-bold leading-tight pr-4">
                      {data.bottomSection?.quote || "A Vision Created For The Activities To Make Sure You Enjoy & Get Thrilled."}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Expertise Section */}
      <ExpertiseSection />

    </div>
  );
}
