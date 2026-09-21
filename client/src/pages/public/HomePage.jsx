import React from 'react';
import HeroSection from '../../components/home/HeroSection';
import IntroSection from '../../components/home/IntroSection';
import AboutMemoriesSection from '../../components/home/AboutMemoriesSection';
import InternationalToursSection from '../../components/home/InternationalToursSection';
import ValuePropsSection from '../../components/home/ValuePropsSection';
import StatsSection from '../../components/home/StatsSection';
import IndiaToursSection from '../../components/home/IndiaToursSection';
import TestimonialSlider from '../../components/home/TestimonialSlider';
import ExpertiseSection from '../../components/home/ExpertiseSection';
import JournalSection from '../../components/home/JournalSection';

export default function HomePage() {
  return (
    <div className="animate-fadeIn bg-[#f7f9f8]">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Introduction / 6-Card Slider */}
      <IntroSection />

      {/* 3. About & Memories Section */}
      <AboutMemoriesSection />

      {/* 4. International Tour Packages */}
      <InternationalToursSection />

      {/* 5. Services / Value Proposition */}
      <ValuePropsSection />
      
      {/* 6. Statistics Circles */}
      <StatsSection />

      {/* 7. Indian Tour Packages */}
      <IndiaToursSection />

      {/* 8. Testimonials */}
      <TestimonialSlider />

      {/* 9. Expertise Section */}
      <ExpertiseSection />

      {/* 10. Travel Journal */}
      <JournalSection />
    </div>
  );
}
