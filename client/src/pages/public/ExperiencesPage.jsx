import React, { useEffect } from 'react';
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

  return (
    <div className="animate-fadeIn bg-white font-sans text-gray-800">
      
      {/* 1. Hero Section */}
      <section className="relative h-[65vh] min-h-[500px] flex items-center justify-center text-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={data.heroImage}
            alt={data.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-white mt-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide mb-4 drop-shadow-lg">
            {data.title}
          </h1>
          <p className="text-sm md:text-base tracking-widest uppercase font-medium drop-shadow-md">
            {data.subtitle}
          </p>
        </div>

        {/* Bottom Mask SVG (Jagged Pine edge) */}
        <div className="absolute bottom-[-2px] left-0 w-full z-20 pointer-events-none text-white">
          <svg viewBox="0 0 1920 150" fill="currentColor" preserveAspectRatio="none" className="w-full h-auto max-h-[150px]">
            <path d="M0,150 L1920,150 L1920,111.9 C1920,111.9 1845.8,72.6 1774.2,87.6 C1702.5,102.6 1656.6,128.8 1555,109.1 C1453.3,89.4 1395,30.3 1295,45.3 C1195,60.3 1152.5,116.6 1045,99.7 C937.5,82.8 894.1,28.4 785,39.7 C675.8,51 635,97.8 522.5,86.6 C410,75.3 355,12.8 250,31.6 C145,50.3 75.8,92.2 0,92.2 L0,150 Z" />
          </svg>
        </div>
      </section>

      {/* 2. Intro Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text */}
          <div className="space-y-6">
            <div>
              <span className="text-[#27B8B1] font-cursive text-2xl italic block mb-2">{data.title}</span>
              <h2 className="text-3xl md:text-[38px] font-bold text-[#10221b] leading-tight">
                {data.intro.title}
              </h2>
            </div>
            
            <div className="space-y-4 text-gray-600 text-sm md:text-[15px] leading-relaxed font-light">
              <p>{data.intro.text1}</p>
              <p>{data.intro.text2}</p>
            </div>
          </div>

          {/* Right Image with Offset Border */}
          <div className="relative p-6">
            <div className="absolute top-0 right-0 w-[90%] h-[90%] border-[6px] border-[#27B8B1] z-0"></div>
            <img 
              src={data.intro.image} 
              alt={data.intro.title} 
              className="relative z-10 w-full h-auto object-cover shadow-2xl"
            />
          </div>

        </div>
      </section>

      {/* 3. Experiences List Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h3 className="text-2xl font-bold text-[#10221b] mb-6 border-b pb-4">
          {data.experiencesList.title}
        </h3>
        
        <div className="space-y-4 mb-16">
          {data.experiencesList.items.map((item, index) => (
            <p key={index} className="text-[15px] text-gray-700 font-light leading-relaxed">
              <strong className="font-bold text-[#10221b]">{index + 1}. {item.title} —</strong> {item.desc}
            </p>
          ))}
        </div>

        {/* 3 Images Row */}
        <div>
          <h4 className="text-xl font-bold text-[#10221b] mb-4">Explore Extraordinary Destinations</h4>
          <p className="text-gray-600 text-sm font-light mb-8">
            Discover breathtaking landscapes, vibrant cultures, and unforgettable adventures across the globe.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.experiencesList.images.map((img, idx) => (
              <div key={idx} className="aspect-[4/3] overflow-hidden group">
                <img 
                  src={img} 
                  alt={`Destination ${idx + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us Section */}
      <section className="py-20 bg-[#f9faf9] mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Left: 2x2 Grid */}
            <div className="lg:col-span-7">
              <h2 className="text-3xl md:text-4xl font-bold text-[#5e963b] mb-12">
                {data.whyChooseUs.title}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
                {data.whyChooseUs.features.map((feature, idx) => (
                  <div key={idx}>
                    <h4 className="text-lg font-bold text-[#10221b] mb-3">{feature.title}</h4>
                    <p className="text-gray-600 text-sm font-light leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Next Adventure / Collage */}
            <div className="lg:col-span-5 relative">
              <div className="mb-10 lg:pr-10">
                <h3 className="text-[#5e963b] text-2xl font-bold mb-4">{data.bottomSection.title}</h3>
                <p className="text-gray-600 text-sm font-light leading-relaxed mb-6">
                  {data.bottomSection.desc}
                </p>
                <button 
                  onClick={() => openEnquiryModal({ title: `${data.title} Enquiry` })}
                  className="bg-[#10221b] text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#5e963b] transition-colors shadow-lg"
                >
                  {data.bottomSection.buttonText}
                </button>
              </div>

              {/* Collage Images */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img src={data.bottomSection.collageImages[0]} alt="Collage 1" className="w-full h-48 object-cover shadow-md" />
                  <img src={data.bottomSection.collageImages[1]} alt="Collage 2" className="w-full h-40 object-cover shadow-md" />
                </div>
                <div className="pt-8">
                  <img src={data.bottomSection.collageImages[2]} alt="Collage 3" className="w-full h-56 object-cover shadow-md" />
                </div>
              </div>

              {/* Green Quote Below Collage */}
              <div className="mt-8">
                <h4 className="text-[#5e963b] text-2xl font-bold max-w-sm">
                  {data.bottomSection.quote}
                </h4>
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
