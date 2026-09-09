import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { experiencesData } from '../../data/experiencesData';
import { useSettings } from '../../context/SiteSettingsContext';

export default function ExperiencesPage() {
  const { slug } = useParams();
  const { openEnquiryModal } = useSettings();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Scroll to top on mount/slug change
  useEffect(() => {
    window.scrollTo(0, 0);
    setCurrentSlide(0);
  }, [slug]);

  const data = experiencesData[slug];

  const carouselImages =
    data?.experiencesList?.images?.length > 0
      ? data.experiencesList.images
      : [data?.heroImage, data?.heroImage, data?.heroImage].filter(Boolean);

  useEffect(() => {
    if (!carouselImages.length) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

  if (!data) {
    return (
      <div className="pt-32 pb-20 text-center min-h-[50vh]">
        <h1 className="text-3xl font-bold">Experience not found</h1>
        <Link to="/" className="text-[#f29727] underline mt-4 inline-block">Return Home</Link>
      </div>
    );
  }

  const handleNext = () => setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  const handlePrev = () => setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);

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
      <section className="relative h-[65vh] min-h-[500px] flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img src={data.heroImage} alt={data.title} className="w-full h-full object-cover" />
          {/* Dark vignette overlay for text readability */}
          <div className="absolute inset-0 bg-black/40 z-0" />
        </div>
        
        {/* Content with breadcrumb perfectly centered */}
        <div className="relative z-10 text-white flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-[60px] font-bold tracking-wider mb-4 drop-shadow-xl font-serif">
            {data.title}
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm md:text-base font-light drop-shadow-md tracking-wider">
            <Link to="/" className="hover:text-gray-200 transition-colors">Home</Link>
            <span className="text-[10px] opacity-80">▾</span>
            <span className="text-white">{data.title}</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full z-10 text-white">
          <svg viewBox="0 0 1920 120" fill="currentColor" preserveAspectRatio="none" className="w-full h-auto max-h-[120px] block">
            <path d="M0,120 L1920,120 L1920,80 C1700,140 1400,20 1000,80 C600,140 300,20 0,80 Z" />
          </svg>
        </div>
      </section>

      {/* 2. Intro Section */}
      <section className="bg-white -mt-2 pb-16 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">

          {/* Row 1: Intro Text and Image (2 Columns) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-16">
            <div className="space-y-8 lg:pr-4">
              <div>
                <span className="text-[#10221b] font-bold text-[16px] uppercase tracking-wider block mb-4">
                  {data.title}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-[54px] font-bold text-[#10221b] leading-[1.1] mb-8">
                  {data.intro?.title}
                </h1>
                <div className="w-24 h-[1px] bg-[#10221b] mb-10"></div>
              </div>

              <div className="space-y-8 text-gray-500 text-[18px] md:text-[20px] leading-[1.8] font-light">
                <p>{data.intro?.text1}</p>
                <p>{data.intro?.text2}</p>
              </div>
            </div>

            <div className="relative pl-6 pt-6 mt-8 lg:mt-0 w-full max-w-lg mx-auto lg:ml-auto">
              <div className="absolute top-0 left-0 w-[95%] h-[95%] border-[3px] border-[#18c4c7] z-0"></div>
              <img
                src={data.intro?.image || data.heroImage}
                alt={data.title}
                className="relative z-10 w-full h-auto object-cover shadow-sm bg-white p-2 aspect-[4/3]"
              />
            </div>
          </div>

          {/* Row 2: Subsequent Content (Full Width) */}
          <div className="space-y-12">
            {data.section2?.title && (
              <div>
                <h3 className="text-[22px] md:text-[24px] font-bold text-[#10221b] mb-4">{data.section2?.title}</h3>
                <p className="text-gray-500 text-[18px] md:text-[20px] leading-[1.8] font-light">{data.section2?.text}</p>
              </div>
            )}

            {data.experiencesList?.items && (
              <div>
                <h3 className="text-[22px] md:text-[24px] font-bold text-[#10221b] mb-6">
                  {data.experiencesList?.includesHeading || `Our ${data.title} Include:`}
                </h3>
                <ul className="space-y-4">
                  {data.experiencesList.items.map((item, idx) => (
                    <li key={idx} className="text-[18px] md:text-[20px] text-gray-500 font-light leading-[1.8]">
                      <span className="text-gray-800 font-bold">{idx + 1}. {item.title}</span> — {item.desc}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(data.destinations?.heading || data.destinations?.text) && (
              <div>
                <h3 className="text-[22px] md:text-[24px] font-bold text-[#10221b] mb-4">
                  {data.destinations?.heading}
                </h3>
                <p className="text-gray-500 text-[18px] md:text-[20px] leading-[1.8] font-light">
                  {data.destinations?.text}
                </p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* 3. Carousel Section */}
      <section className="relative py-20 overflow-hidden group">
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
                  <img src={img} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" />
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

      {/* 4. Why Choose Us / Bottom Grid */}
      <section className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <h2 className="text-3xl md:text-4xl font-bold text-[#5e963b] mb-12">
            {data.whyChooseUs?.heading || 'Why Choose BlackForest Holidays?'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {data.whyChooseUs?.features?.map((feature, idx) => (
              <div key={idx}>
                <h4 className="text-[18px] font-bold text-[#10221b] mb-3">{feature.title}</h4>
                <p className="text-gray-500 text-[16px] font-light leading-[1.8]">{feature.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            <div className="space-y-8">
              <div>
                <h3 className="text-4xl md:text-[42px] font-bold text-[#5e963b] leading-tight mb-4">
                  {data.cta?.heading}
                </h3>
                <div className="w-16 h-[2px] bg-[#f29727]"></div>
              </div>

              <p className="text-gray-600 text-[18px] md:text-[20px] leading-[1.8] font-light max-w-md">
                {data.closing?.text}
              </p>

              <div>
                <h4 className="text-sm font-bold text-[#10221b] uppercase tracking-wider mb-4">
                  {data.closing?.heading}
                </h4>
                <button
                  onClick={() => openEnquiryModal({ title: `${data.title} Enquiry` })}
                  className="bg-[#10221b] text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-[#5e963b] transition-colors"
                >
                  {data.cta?.buttonText || 'Enquire Now'} &rarr;
                </button>
              </div>
            </div>

            <div className="relative">
              <div
                className="absolute top-[-10%] right-[-10%] w-[120%] h-[120%] opacity-[0.05] z-0 pointer-events-none bg-no-repeat bg-right-top bg-contain"
                style={{ backgroundImage: `url('${data.bottomSection?.decorativeImage || ''}')` }}
              ></div>

              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="space-y-4 pt-12">
                  <img src={data.bottomSection?.collageImages?.[0]} alt="Collage 1" className="w-full h-48 object-cover" />
                  <img src={data.bottomSection?.collageImages?.[1]} alt="Collage 2" className="w-full h-56 object-cover" />
                </div>
                <div>
                  <img src={data.bottomSection?.collageImages?.[2]} alt="Collage 3" className="w-full h-[400px] object-cover" />
                  <div className="mt-8">
                    <h4 className="text-[#5e963b] text-2xl font-bold leading-tight pr-4">
                      {data.bottomSection?.quote}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}