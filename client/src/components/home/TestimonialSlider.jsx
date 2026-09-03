import React from 'react';
import { Star } from 'lucide-react';

export default function TestimonialSlider() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Jenkins",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
      review: "We just returned from our family trip to Europe, and it was perfect! The itinerary was flawless."
    },
    {
      id: 2,
      name: "David Chen",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      review: "Incredible attention to detail. Our honeymoon in the Maldives was absolutely magical thanks to the team."
    },
    {
      id: 3,
      name: "Emma Watson",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
      review: "Highly recommend their corporate travel services. They organized our company retreat seamlessly."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#5e963b] mb-2">
            Client Testimonial
          </h2>
        </div>

        {/* 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white border border-gray-100 rounded-lg shadow-lg p-8 flex flex-col items-center text-center transition-transform hover:-translate-y-1">
              {/* Profile Image */}
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-100 mb-4 shadow-sm">
                <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
              </div>
              
              {/* Name */}
              <h4 className="text-gray-900 font-bold mb-1">{t.name}</h4>
              
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="w-4 h-4 text-[#f29727] fill-[#f29727]" />
                ))}
              </div>
              
              {/* Review */}
              <p className="text-gray-500 text-sm leading-relaxed italic">
                "{t.review}"
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
