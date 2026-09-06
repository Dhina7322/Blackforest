import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Plane, FileCheck, Anchor, CheckCircle2, ShieldCheck, Clock, Headphones } from 'lucide-react';
import { useSettings } from '../../context/SiteSettingsContext';

export default function ConciergePage() {
  const location = useLocation();
  const path = location.pathname;
  const { openEnquiryModal } = useSettings();

  let serviceKey = 'overview';
  if (path.includes('flight-booking')) serviceKey = 'flights';
  else if (path.includes('visa-assistance')) serviceKey = 'visas';
  else if (path.includes('cruises')) serviceKey = 'cruises';

  // ----------------------------------------------------
  // DATA STRUCTURE (Populated with Screenshot Details)
  // ----------------------------------------------------
  const details = {
    overview: {
      title: 'VIP Travel Concierge',
      heroImage: '/images/destinations/destinations-151968139378.webp',
      intro: {
        title: 'Effortless Luxury Across Every Journey Milestone',
        text1: 'Our white-glove concierge department handles complex flight routing, expedited visa processing, private aviation, and luxury cruise charters with military precision.',
        text2: 'From the moment you start planning to the day you return home, our dedicated specialists are on call to ensure seamless transitions and unparalleled comfort.',
        image: '/images/destinations/destinations-152348258067.webp',
      },
      list: {
        title: 'Our Concierge Services Include:',
        items: [
          { title: 'Global Flight Booking', desc: 'Commercial first-class and private charter aviation.' },
          { title: 'Visa Assistance', desc: 'Fast-tracked documentation and biometric appointments.' },
          { title: 'Luxury Cruises', desc: 'Yacht charters and premium ocean liners.' }
        ],
        images: [
          '/images/destinations/destinations-152449241293.webp',
          '/images/destinations/destinations-152562529338.webp',
          '/images/destinations/destinations-152639206063.webp',
        ]
      },
      whyChooseUs: {
        title: 'Why Choose BlackForest Holidays?',
        features: [
          { title: 'Dedicated Specialist', desc: 'A personal travel advisor assigned exclusively to manage your travel portfolio.' },
          { title: 'IATA Accredited Standards', desc: 'Direct access to global airline reservation systems (GDS) with zero intermediaries.' },
          { title: '24/7 Global Dispatch', desc: 'Immediate disruption response and live re-booking during unforeseen weather.' },
          { title: 'Exclusive Partnerships', desc: 'Benefit from our preferred status with global luxury brands.' }
        ]
      },
      bottomSection: {
        title: 'Your Journey. Your Style. Your World.',
        desc: 'Experience travel the way it was meant to be—effortless, luxurious, and perfectly tailored to you.',
        quote: 'A Vision Created For The Activities To Make Sure You Enjoy & Get Thrilled.',
        collageImages: [
          '/images/destinations/destinations-152766875296.webp',
          '/images/destinations/destinations-152812726932.webp',
          '/images/destinations/destinations-153012203726.webp'
        ]
      }
    },
    flights: {
      title: 'Flight Booking',
      heroImage: '/images/destinations/destinations-153240884095.webp',
      intro: {
        title: 'Everything You Need For a Seamless Journey',
        text1: 'Take advantage of our preferred airline partnerships, mileage upgrades, complimentary lounge access, and proactive schedule monitoring for international travel.',
        text2: 'Whether it is a family vacation, a corporate retreat, or a solo adventure, we guarantee competitive fares and unmatched convenience from takeoff to landing.',
        image: '/images/destinations/destinations-153310507978.webp',
      },
      list: {
        title: 'Our Flight Booking Services:',
        items: [
          { title: 'Direct Flights & Routes', desc: 'Optimized travel paths to save you time.' },
          { title: 'Priority Check-In', desc: 'Skip the queues and head straight to the lounge.' },
          { title: 'Baggage Allowance Guidance', desc: 'Clear instructions on carry-on and check-in limits.' },
          { title: 'Meal Preferences', desc: 'Pre-arranged dietary meals for long-haul flights.' }
        ],
        images: [
          '/images/destinations/destinations-153456715357.webp', // passengers
          '/images/destinations/destinations-153799619447.webp', // air canada
          '/images/destinations/destinations-153848539908.webp', // passports
        ]
      },
      whyChooseUs: {
        title: 'Why Choose BlackForest Holidays?',
        features: [
          { title: 'Instant Booking & Confirmation', desc: 'We secure your seats immediately across major airlines worldwide.' },
          { title: '24/7 Booking Support', desc: 'Live agents available around the clock to handle emergency changes.' },
          { title: 'Best Price Match Guarantee', desc: 'We utilize IATA credentials to find unpublished fares.' },
          { title: 'Seamless Upgrades', desc: 'Expert mileage and points management for business class bumps.' }
        ]
      },
      bottomSection: {
        title: 'Arrive Smoothly. Travel Comfortably.',
        desc: 'Explore the world with peace of mind. Our flight booking experts handle all the heavy lifting so you can focus on the journey.',
        quote: 'Travel With Confidence. Travel With Protection.',
        collageImages: [
          '/images/destinations/destinations-153868852519.webp', // passport map
          '/images/destinations/destinations-153902014015.webp', // plane wing
          '/images/destinations/destinations-1543783207-e.webp' // passports
        ]
      }
    },
    visas: {
      title: 'Visa Assistance',
      heroImage: '/images/destinations/destinations-1544644181-1.webp',
      intro: {
        title: 'Visa Assistance Made Simple',
        text1: 'Navigating embassy requirements, biometrics appointments, official invitation letters, and multi-entry tourist visas can be overwhelming. We make it easy.',
        text2: 'From Schengen visas for Europe to documentation for the USA, UK, Australia, and Asia, our experts ensure your paperwork is flawless and submitted on time.',
        image: '/images/destinations/destinations-151642612207.webp',
      },
      list: {
        title: 'Your Journey Starts With The Right Documentation:',
        items: [
          { title: 'Expert Documentation', desc: 'Guidance on itinerary, financial proof, and insurance.' },
          { title: 'Biometric Appointments', desc: 'We schedule and prepare you for your consulate visits.' },
          { title: 'Family & Group Visa Assistance', desc: 'Streamlined processing for large travel groups.' },
          { title: 'Visa Renewals', desc: 'Assistance with extending or renewing existing travel permits.' }
        ],
        images: [
          '/images/destinations/destinations-1544735716-3.webp',
          '/images/destinations/destinations-1546708973-b.webp',
          '/images/destinations/destinations-1547471080-7.webp',
        ]
      },
      whyChooseUs: {
        title: 'Why Choose BlackForest Holidays?',
        features: [
          { title: 'High Success Rate', desc: 'Meticulous review of documents guarantees higher approval chances.' },
          { title: 'Up-to-Date Requirements', desc: 'We track changing embassy rules so you don\'t have to.' },
          { title: 'End-to-End Tracking', desc: 'Stay updated on your application status in real time.' },
          { title: 'Corporate Visa Support', desc: 'Specialized handling for business and employment travel visas.' }
        ]
      },
      bottomSection: {
        title: 'Start Your Visa Journey With Confidence',
        desc: 'Don\'t let complicated paperwork stand between you and your next destination. Let our specialists handle the bureaucracy while you plan your itinerary.',
        quote: 'A Vision Created For The Activities To Make Sure You Enjoy & Get Thrilled.',
        collageImages: [
          '/images/destinations/destinations-1548574505-5.webp',
          '/images/destinations/destinations-1552832230-c.webp',
          '/images/destinations/destinations-156555762326.webp'
        ]
      }
    },
    cruises: {
      title: 'Luxury Cruises',
      heroImage: '/images/destinations/destinations-156683794570.webp',
      intro: {
        title: 'Sailing the World’s Most Majestic Waterways',
        text1: 'Charter private yachts, reserve balcony suites on Silversea, Regent Seven Seas, and Royal Caribbean, or glide down European rivers like the Rhine and Danube.',
        text2: 'A cruise offers the ultimate unpack-once luxury. We curate bespoke shore excursions, onboard dining reservations, and premium cabin selections.',
        image: '/images/destinations/destinations-157384398126.webp',
      },
      list: {
        title: 'Our Cruise Specialties:',
        items: [
          { title: 'Ocean Expeditions', desc: 'Transatlantic voyages and Caribbean island hopping.' },
          { title: 'River Cruises', desc: 'Intimate sailings through the heart of Europe and Asia.' },
          { title: 'Private Yacht Charters', desc: 'Fully crewed vessels for ultimate privacy.' },
          { title: 'Pre & Post Cruise Tours', desc: 'Seamless land packages complementing your sailing.' }
        ],
        images: [
          '/images/destinations/destinations-157555095910.webp',
          '/images/destinations/destinations-157889510140.webp',
          '/images/destinations/destinations-158061867259.webp',
        ]
      },
      whyChooseUs: {
        title: 'Why Choose BlackForest Holidays?',
        features: [
          { title: 'Preferred Agency Perks', desc: 'Onboard credits, complimentary upgrades, and exclusive invites.' },
          { title: 'Unbiased Recommendations', desc: 'We pair you with the cruise line that matches your personality.' },
          { title: 'Complete Itinerary Design', desc: 'Flights, transfers, and shore excursions all managed in one place.' },
          { title: 'Group & Charter Experts', desc: 'Specialized coordination for family reunions and corporate groups.' }
        ]
      },
      bottomSection: {
        title: 'Step Aboard Your Next Great Adventure',
        desc: 'Discover hidden coves, iconic ports, and unparalleled onboard service. The ocean is calling, and we are here to ensure you answer in style.',
        quote: 'A Vision Created For The Activities To Make Sure You Enjoy & Get Thrilled.',
        collageImages: [
          '/images/destinations/destinations-158455124667.webp',
          '/images/destinations/destinations-158686163516.webp',
          '/images/destinations/destinations-158939481580.webp'
        ]
      }
    }
  };

  const data = details[serviceKey];
  
  // Carousel Logic
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const carouselImages = data.list.images;

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [carouselImages.length, serviceKey]); // reset timer on route change

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
        <div className="relative z-10 text-white mt-32 md:mt-40 flex flex-col items-center pb-24">
          <h1 className="text-5xl md:text-7xl lg:text-[80px] font-bold tracking-wide mb-6 drop-shadow-2xl text-center">
            {data.title}
          </h1>
          <div className="flex items-center justify-center gap-3 text-lg md:text-2xl font-light drop-shadow-md">
            <Link to="/" className="hover:text-gray-200 transition-colors">Home</Link>
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
                  Blackforest Concierge
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
