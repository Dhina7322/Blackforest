import React, { useEffect } from 'react';
import { Play, ChevronUp } from 'lucide-react';
import { useSettings } from '../../context/SiteSettingsContext';

export default function CorporateTravelPage() {
  const { openEnquiryModal } = useSettings();

  // ----------------------------------------------------
  // CORPORATE TRAVEL DATA STRUCTURE
  // ----------------------------------------------------
  const data = {
    title: 'Corporate Travel',
    heroImage: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1920&q=80',
    intro: {
      title: 'Let us plan your business journey. You focus on the deals.',
      text1: 'At Blackforest Holidays, we understand that corporate travel requires precision, flexibility, and absolute reliability. Our dedicated B2B division handles everything from individual executive travel to large-scale MICE (Meetings, Incentives, Conferences, and Exhibitions) events.',
      text2: 'We optimize your corporate travel policy to reduce costs while maximizing traveler comfort and productivity on the road.',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&w=800&q=80',
    },
    list: {
      title: 'Our Corporate Services:',
      items: [
        { title: 'Executive Travel', desc: 'VIP flight booking, premium transfers, and luxury accommodation.' },
        { title: 'MICE Solutions', desc: 'Complete end-to-end management for offsite meetings and global conferences.' },
        { title: 'Travel Policy Optimization', desc: 'Strategic consulting to minimize corporate travel expenditure.' },
        { title: '24/7 Account Management', desc: 'A dedicated team available around the clock for any disruptions.' }
      ],
      images: [
        'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=600&q=80',
      ]
    },
    whyChooseUs: {
      title: 'Why Choose BlackForest Corporate?',
      features: [
        { title: 'Cost Efficiency', desc: 'Access to negotiated corporate rates across global hotel chains and airlines.' },
        { title: 'Duty of Care', desc: 'Comprehensive traveler tracking and risk management during international trips.' },
        { title: 'Custom Reporting', desc: 'Detailed analytics and expense reports to track your travel ROI.' },
        { title: 'Seamless Technology', desc: 'Modern booking tools that integrate smoothly with your company policies.' }
      ]
    },
    bottomSection: {
      title: 'Elevate Your Business Travel',
      desc: 'Whether it is a critical board meeting in London or a team-building retreat in the Alps, we ensure your team arrives ready to succeed.',
      quote: 'Seamless Journeys For Successful Business Outcomes.',
      collageImages: [
        'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
        'https://images.unsplash.com/photo-1556761175-5973dc0f32b7?auto=format&fit=crop&w=600&q=80'
      ]
    }
  };

  // Carousel Logic
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const carouselImages = data.list.images;

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [carouselImages.length]);

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
      <section className="relative h-[65vh] min-h-[500px] flex flex-col justify-end">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={data.heroImage}
            alt={data.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Content with angled breadcrumb */}
        <div className="relative z-10 text-white mt-16 flex flex-col items-center pb-24">
          <h1 className="text-5xl md:text-7xl lg:text-[80px] font-bold tracking-wide mb-6 drop-shadow-2xl text-center">
            {data.title}
          </h1>
          <div className="flex items-center justify-center gap-3 text-lg md:text-2xl font-light drop-shadow-md">
            <a href="/" className="hover:text-gray-200 transition-colors">Home</a>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="opacity-80 rotate-[-45deg] mt-1">
              <path d="M24 24H0L24 0V24Z" />
            </svg>
            <span>{data.title}</span>
          </div>
        </div>

        {/* Wavy Top SVG Mask */}
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
                  Corporate & B2B Solutions
                </span>
                <h2 className="text-4xl md:text-[46px] lg:text-[54px] font-bold text-[#5e963b] leading-[1.1] mb-6">
                  {data.intro.title}
                </h2>
                <div className="w-16 h-[2px] bg-gray-300 mb-8"></div>
              </div>
              
              <div className="space-y-6 text-gray-600 text-[15px] leading-[1.8] font-light">
                <p>{data.intro.text1}</p>
                <p>{data.intro.text2}</p>
              </div>

              <div className="pt-6">
                <h3 className="text-xl font-bold text-[#10221b] mb-4">{data.list.title}</h3>
                <ul className="space-y-3">
                  {data.list.items.map((item, idx) => (
                    <li key={idx} className="text-sm text-gray-600 font-light">
                      <span className="text-gray-900 font-bold">{idx + 1}. {item.title}</span> — {item.desc}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Image with offset border */}
            <div className="relative pt-4 lg:pt-0">
              <div className="absolute top-8 left-8 right-[-1rem] bottom-[-1rem] border-[6px] border-[#27B8B1] z-0"></div>
              <div className="relative z-10 bg-white p-2">
                <img 
                  src={data.intro.image} 
                  alt={data.title} 
                  className="w-full h-auto object-cover aspect-[4/3] shadow-lg"
                />
              </div>
            </div>

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

      {/* 4. Why Choose Us / Bottom Grid */}
      <section className="py-24 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <h2 className="text-3xl md:text-4xl font-bold text-[#5e963b] mb-12">
            {data.whyChooseUs.title}
          </h2>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
            {data.whyChooseUs.features.map((feature, idx) => (
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
                  {data.bottomSection.title}
                </h3>
                <div className="w-16 h-[2px] bg-[#f29727]"></div>
              </div>
              
              <p className="text-gray-600 text-[15px] leading-[1.8] font-light max-w-md">
                {data.bottomSection.desc}
              </p>

              <div>
                <h4 className="text-sm font-bold text-[#10221b] uppercase tracking-wider mb-4">Start Your Journey</h4>
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
              <div className="absolute top-[-10%] right-[-10%] w-[120%] h-[120%] opacity-[0.03] z-0 pointer-events-none bg-[url('https://upload.wikimedia.org/wikipedia/commons/4/41/Pine_tree_silhouette.svg')] bg-no-repeat bg-right-top bg-contain"></div>
              
              <div className="grid grid-cols-2 gap-4 relative z-10">
                <div className="space-y-4 pt-12">
                  <img src={data.bottomSection.collageImages[0]} alt="Collage 1" className="w-full h-48 object-cover" />
                  <img src={data.bottomSection.collageImages[1]} alt="Collage 2" className="w-full h-56 object-cover" />
                </div>
                <div>
                  <img src={data.bottomSection.collageImages[2]} alt="Collage 3" className="w-full h-[400px] object-cover" />
                  <div className="mt-8">
                    <h4 className="text-[#5e963b] text-2xl font-bold leading-tight pr-4">
                      {data.bottomSection.quote}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Include Expertise Section if desired (often added globally or separately) */}
    </div>
  );
}
