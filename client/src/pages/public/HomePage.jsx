import React from 'react';
import HeroSection from '../../components/home/HeroSection';
import IntroSection from '../../components/home/IntroSection';
import InternationalToursSection from '../../components/home/InternationalToursSection';
import ValuePropsSection from '../../components/home/ValuePropsSection';
import StatsSection from '../../components/home/StatsSection';
import IndiaToursSection from '../../components/home/IndiaToursSection';
import TestimonialSlider from '../../components/home/TestimonialSlider';
import JournalSection from '../../components/home/JournalSection';
import ExpertiseSection from '../../components/home/ExpertiseSection';

export default function HomePage() {
  return (
    <div className="animate-fadeIn bg-[#f7f9f8]">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Introduction */}
      <IntroSection />

      {/* 3. International Tour Packages */}
      <InternationalToursSection />

      {/* 4. Services / Value Proposition */}
      <ValuePropsSection />
      
      {/* 5. Statistics Circles */}
      <StatsSection />

      {/* 6. Indian Tour Packages */}
      <IndiaToursSection />

      {/* 7. Testimonials */}
      <TestimonialSlider />

      {/* 8. Travel Journal */}
      <JournalSection />

      {/* 9. Expertise */}
      <ExpertiseSection />
    </div>
  );
}
