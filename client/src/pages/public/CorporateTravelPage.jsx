import React from 'react';
import HeroWave from '../../components/common/HeroWave';
import ExpertiseLogosSection from '../../components/common/ExpertiseLogosSection';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function CorporateTravelPage() {
  return (
    <div className="bg-white font-sans text-gray-800 animate-fadeIn overflow-x-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex flex-col justify-end">
        <div className="absolute inset-0 z-0 bg-[#0a1712]">
          <img
            src="/images/destinations/destinations-158997948122.webp"
            alt="Corporate Travel"
            className="w-full h-full object-cover opacity-70"
          />
        </div>
        
        <div className="relative z-10 text-white mt-16 flex flex-col items-center pb-32">
          <h1 className="text-4xl md:text-5xl lg:text-[60px] font-bold tracking-wider mb-4 drop-shadow-xl text-center">
            Corporate Travel
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm md:text-base font-light drop-shadow-md tracking-wider">
            <a href="/" className="hover:text-gray-200 transition-colors">Home</a>
            <span className="text-gray-300">&gt;</span>
            <span>Corporate Travel</span>
          </div>
        </div>
        <HeroWave />
      </section>

      {/* 2. Main Split Content Section */}
      <section className="py-20 md:py-28 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            
            {/* Left Content */}
            <div className="space-y-6">
              <span className="text-[#10221b] font-bold text-sm tracking-widest block uppercase">Corporate Travel</span>
              <h2 className="text-4xl md:text-[42px] font-bold text-[#7cb342] leading-tight pb-4">
                Business Travel,
                <br />
                Thoughtfully Managed
                <div className="h-1 w-24 bg-[#a5d6a7] mt-4"></div>
              </h2>
              
              <div className="text-gray-600 text-sm font-light leading-relaxed space-y-4">
                <p>At Blackforest Holidays, we tailor every aspect of your itinerary. From our initial consultation through to welcoming you home, we are committed to making sure that every detail of your journey is exactly as you imagined.</p>
                <p>Our commitment is to offer you exceptional travel planning services combined with our 24/7 client care.</p>
                <p className="font-bold text-[#10221b]">Here's What You Can Expect:</p>
                <ul className="space-y-2">
                  <li><strong>1. Dedicated Travel Management</strong> – A personal travel manager who handles all the details of your trip.</li>
                  <li><strong>2. Cost-Conscious Solutions</strong> – Strategic partnerships allowing for negotiated rates and cost savings.</li>
                  <li><strong>3. Personalized Service</strong> – From flexible booking policies to tailored loyalty programs, we put your needs first.</li>
                  <li><strong>4. Seamless Coordination</strong> – Flawless execution from airport transfers to ground transport and event planning.</li>
                  <li><strong>5. 24/7 Global Support</strong> – A dedicated contact person handling your itinerary, available for you around the clock.</li>
                  <li><strong>6. Expert Planners</strong> – Reliable and experienced planners handling your corporate events and travel itineraries.</li>
                  <li><strong>7. Meetings & Conferences</strong> – End-to-end event planning for small team offsites to large-scale conferences.</li>
                  <li><strong>8. Corporate Group Travel</strong> – Hassle-free management of incentive trips and group travel for large groups of employees.</li>
                  <li><strong>9. Executive Travel</strong> – VIP arrangements for C-level executives ensuring priority and privacy.</li>
                  <li><strong>10. Travel Policy Enforcement</strong> – Automated expense tracking and compliance with your corporate travel policies.</li>
                  <li><strong>11. Risk Management</strong> – Real-time updates and emergency support to ensure employee safety and peace of mind.</li>
                </ul>
                <p className="font-bold text-[#10221b] pt-4">Corporate Travel Across The Planet</p>
                <p>Whether you're travelling for an important meeting, attending a conference, or organizing a team retreat, we ensure a seamless and productive travel experience.</p>
              </div>
            </div>

            {/* Right Content - Images */}
            <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-auto lg:h-[800px]">
              <div className="absolute top-0 right-0 w-[90%] h-[55%] rounded-xl overflow-hidden shadow-lg z-10 border-[10px] border-[#27B8B1]">
                <img src="/images/destinations/destinations-159642284654.webp" alt="Team planning" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-0 left-0 w-[70%] h-[50%] rounded-xl overflow-hidden shadow-2xl z-20">
                <img src="/images/destinations/destinations-160058515434.webp" alt="Corporate discussion" className="w-full h-full object-cover" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Image Carousel Section */}
      <section className="py-10 pb-20 w-full overflow-hidden relative">
        <div className="max-w-[1400px] mx-auto px-4 relative flex items-center justify-center">
          
          <button className="absolute left-2 md:left-8 z-10 p-2 text-gray-500 hover:text-black transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-[85%]">
            <div className="aspect-[4/5] overflow-hidden shadow-sm">
              <img src="/images/destinations/destinations-160221605609.webp" alt="Boardroom meeting" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="aspect-[4/5] overflow-hidden shadow-sm">
              <img src="/images/destinations/doing-business-morocco.jpg.webp" alt="Airport waiting" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="aspect-[4/5] overflow-hidden shadow-sm">
              <img src="/images/destinations/dotzero-B_F3hj-Z_Sc-unsplash-scaled.jpg.webp" alt="Writing in planner" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>

          <button className="absolute right-2 md:right-8 z-10 p-2 text-gray-500 hover:text-black transition-colors">
            <ArrowRight className="w-6 h-6" />
          </button>

        </div>
      </section>

      {/* 4. Why Choose Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-16 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#7cb342] mb-4">
              Why Choose BlackForest Holidays?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            
            <div className="space-y-4">
              <h3 className="font-bold text-[#10221b] text-lg">Dedicated Travel Management</h3>
              <p className="text-gray-600 text-sm font-light leading-relaxed">Our focused strategy provides you the best routing and the most efficient fares.</p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-bold text-[#10221b] text-lg">Cost-Conscious Solutions</h3>
              <p className="text-gray-600 text-sm font-light leading-relaxed">We leverage extensive supplier relationships and technology to optimize costs without compromising quality.</p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-bold text-[#10221b] text-lg">Seamless Coordination</h3>
              <p className="text-gray-600 text-sm font-light leading-relaxed">Flight bookings, ground transfers, hotel stays and meetings—we coordinate everything seamlessly from start to finish.</p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-bold text-[#10221b] text-lg">24/7 Global Support</h3>
              <p className="text-gray-600 text-sm font-light leading-relaxed">Our dedicated consultants are available around the clock to support you with changes, cancellations, or emergencies wherever you are.</p>
            </div>
            
          </div>
        </div>
      </section>

      {/* 5. Travel Smarter Section */}
      <section className="py-20 md:py-32 relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Left Content */}
            <div className="space-y-8">
              <h2 className="text-4xl md:text-[46px] font-bold text-[#7cb342] leading-tight">
                Travel Smarter.
                <br />
                Move Further.
                <div className="h-1 w-24 bg-[#a5d6a7] mt-6"></div>
              </h2>
              
              <div className="text-gray-600 text-[15px] font-light leading-[1.8]">
                <p>Let Blackforest Holidays elevate your business travel experience. To partner with us and leverage our strategic travel management solutions to achieve better control over your travel expenditures, enhance traveler satisfaction, and drive overall business success.</p>
              </div>

              <div className="bg-white border border-gray-100 p-8 shadow-xl mt-12 rounded max-w-sm">
                <h3 className="text-xl font-bold text-[#10221b] mb-8 leading-tight">
                  Your Business Stays
                  <br />
                  Further Ahead.
                  <br />
                  Your Travel Support.
                </h3>
                <a href="/contact" className="inline-block bg-[#10221b] text-white px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#7cb342] transition-colors shadow-md rounded-sm">
                  Start Your Journey
                </a>
              </div>
            </div>

            {/* Right Images Collage */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 mt-12">
                  <div className="aspect-[4/5] rounded overflow-hidden shadow-lg">
                    <img src="/images/destinations/drone-photo-kuwait-city-kuwait-tower-from-sky-scaled.jpg.webp" alt="Airport terminal" className="w-full h-full object-cover" />
                  </div>
                  <div className="aspect-[4/5] rounded overflow-hidden shadow-lg">
                    <img src="/images/destinations/fabien-bellanger-pdjx5z2fpr0-unsplash-scaled.jpg.webp" alt="Business travel" className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="aspect-[3/4] rounded overflow-hidden shadow-lg">
                    <img src="/images/destinations/famous-eiffel-tower-paris-with-gorgeous-colors-scaled.jpg.webp" alt="Airport lounge" className="w-full h-full object-cover" />
                  </div>
                  <div className="pt-8 pl-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-[#7cb342] leading-tight">
                      A Vision
                      <br />Created For
                      <br />The Activities
                      <br />To Make Sure
                      <br />You Enjoy &
                      <br />Get Thrilled.
                    </h3>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Expertise Section */}
      <ExpertiseLogosSection />
      
    </div>
  );
}
