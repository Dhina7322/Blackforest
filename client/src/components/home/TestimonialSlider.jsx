import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonialService } from '../../services/allServices';

export default function TestimonialSlider() {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await testimonialService.getAll({ status: 'published' });
        if (res.success && res.data) {
          setTestimonials(res.data);
        }
      } catch (err) {
        console.error('Error loading testimonials:', err);
      }
    };
    fetchTestimonials();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % (testimonials.length || 1));
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % (testimonials.length || 1));
  };

  if (testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  return (
    <section className="py-24 bg-[#10221b] text-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <span className="text-xs uppercase tracking-widest text-[#f29727] font-bold block mb-2">
          Client Testimonial
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white mb-12">
          Stories From Our Discerning Travelers
        </h2>

        {/* Current Testimonial Card */}
        <div className="relative bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl backdrop-blur-md">
          <Quote className="w-12 h-12 text-[#f29727]/30 mx-auto mb-6" />

          {/* Rating */}
          <div className="flex items-center justify-center gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-[#f29727] fill-[#f29727]" />
            ))}
          </div>

          <p className="text-lg sm:text-2xl font-serif italic text-white/95 leading-relaxed mb-8">
            "{current.message}"
          </p>

          {/* Traveler Details */}
          <div className="flex items-center justify-center gap-4">
            <img
              src={current.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}
              alt={current.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-[#f29727]"
            />
            <div className="text-left">
              <h4 className="font-semibold text-base text-white">{current.name}</h4>
              <p className="text-xs text-[#f29727] font-medium">{current.designation} • {current.location}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-white/10">
            <button
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full border border-white/20 hover:bg-[#f29727] hover:text-[#10221b] hover:border-[#f29727] flex items-center justify-center transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs text-gray-400 font-medium tracking-widest">
              {currentIndex + 1} / {testimonials.length}
            </span>
            <button
              onClick={nextTestimonial}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full border border-white/20 hover:bg-[#f29727] hover:text-[#10221b] hover:border-[#f29727] flex items-center justify-center transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
