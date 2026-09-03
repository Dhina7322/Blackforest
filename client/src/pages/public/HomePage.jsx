import React from 'react';
import HeroSection from '../../components/home/HeroSection';
import IntroSection from '../../components/home/IntroSection';
import AdventureSection from '../../components/home/AdventureSection';
import InternationalToursSection from '../../components/home/InternationalToursSection';
import ValuePropsSection from '../../components/home/ValuePropsSection';
import IslandSection from '../../components/home/IslandSection';
import IndiaToursSection from '../../components/home/IndiaToursSection';
import TestimonialSlider from '../../components/home/TestimonialSlider';
import JournalSection from '../../components/home/JournalSection';
import ExpertiseSection from '../../components/home/ExpertiseSection';

export default function HomePage() {
  return (
    <div className="animate-fadeIn">
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Introduction */}
      <IntroSection />

      {/* 3. Adventure Essentials */}
      <AdventureSection />

      {/* 4. International Tour Packages */}
      <InternationalToursSection />

      {/* 5. Services / Value Proposition */}
      <ValuePropsSection />

      {/* 6. Luxury / Island section */}
      <IslandSection />

      {/* 7. Indian Tour Packages */}
      <IndiaToursSection />

      {/* 8. Testimonials */}
      <TestimonialSlider />

      {/* 9. Travel Journal */}
      <JournalSection />

      {/* 10. Expertise */}
      <ExpertiseSection />
    </div>
  );
}
