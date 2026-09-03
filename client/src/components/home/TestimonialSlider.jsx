import React from 'react';

export default function TestimonialSlider() {
  const testimonials = [
    {
      id: 1,
      name: "Siddharth Dhar",
      time: "1 month ago",
      image: "https://ui-avatars.com/api/?name=Siddharth+Dhar&background=random",
      review: "Managing travel logistics for an entire organisation is no small feat, but Leela from Black Forest Holidays makes it look effortless... Beyond her stellar..."
    },
    {
      id: 2,
      name: "harish kongara",
      time: "2 months ago",
      image: "https://ui-avatars.com/api/?name=harish+kongara&background=random",
      review: "Thank you Leela for your assistance in processing our Schengen visa. The whole process was clearly communicated and all our doubts w..."
    },
    {
      id: 3,
      name: "revathi P",
      time: "3 months ago",
      image: "https://ui-avatars.com/api/?name=revathi+P&background=random",
      review: "I am a Veterinary doctor living in Nilgiris , myself and my daughter had a trip to Germany in the month of April 2026 for a month to visit our..."
    },
    {
      id: 4,
      name: "Shashank S Thakur",
      time: "5 months ago",
      image: "https://ui-avatars.com/api/?name=Shashank+S+Thakur&background=random",
      review: "Very prompt service. No hassle all the activities were handled smoothly. Cheers and thanks to Leela 👍 for the entire VISA process"
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

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white border border-gray-100 rounded-lg shadow-lg p-6 flex flex-col items-center text-center transition-transform hover:-translate-y-1">
              
              {/* Profile Image with Google G */}
              <div className="relative mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm border border-gray-100">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
                    alt="Google" 
                    className="w-4 h-4"
                  />
                </div>
              </div>
              
              {/* Name & Time */}
              <h4 className="text-gray-900 font-bold text-sm mb-1">{t.name}</h4>
              <span className="text-gray-400 text-xs mb-2">{t.time}</span>
              
              {/* Stars & Verified */}
              <div className="flex items-center justify-center gap-1 mb-4">
                {[1,2,3,4,5].map((star) => (
                  <svg key={star} className="w-4 h-4 text-[#fbbc05]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
                  <path d="M12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2Z" fill="#1877F2"/>
                  <path d="M8 12.5L10.5 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              
              {/* Review */}
              <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
                {t.review}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
