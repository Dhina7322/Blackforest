import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export default function FloatingActions() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fadeIn">
      {/* Single, clean scroll-to-top button */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="w-10 h-10 sm:w-11 sm:h-11 bg-[#f29727] hover:bg-[#db841a] text-white rounded-lg shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
      >
        <ChevronUp className="w-5 h-5 stroke-[2.5]" />
      </button>
    </div>
  );
}
