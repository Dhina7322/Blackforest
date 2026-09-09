import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { enquiryService } from '../../services/allServices';
import { useSettings } from '../../context/SiteSettingsContext';
import HeroWave from '../../components/common/HeroWave';

export default function ContactPage() {
  const { settings } = useSettings();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    source: '',
    destination: '',
    month: '',
    year: '',
    duration: '',
    travelers: '',
    budget: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        destination: formData.destination,
        travelDate: [formData.month, formData.year].filter(Boolean).join(' '),
        travellers: formData.travelers,
        budget: formData.budget,
        source: formData.source,
        message: formData.duration ? `Duration: ${formData.duration}\n\n${formData.message}` : formData.message,
      };
      
      const res = await enquiryService.create(payload);
      if (res.success) {
        showToast('Message sent successfully! Our team will contact you soon.', 'success');
        setFormData({
          firstName: '', lastName: '', email: '', phone: '', source: '',
          destination: '', month: '', year: '', duration: '', travelers: '', budget: '', message: ''
        });
      } else {
        showToast(res.message || 'Failed to send message', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('An error occurred. Please try again later.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white font-sans text-gray-800 animate-fadeIn overflow-x-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative h-[65vh] min-h-[500px] flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0 bg-[#0a1712]">
          <img
            src="https://blackforestholidays.com/wp-content/uploads/2026/08/buddhist-prayer-flags-himalaya-mountains-annapurna-base-camp-area-nepal-scaled.jpg"
            alt="Contact Us"
            className="w-full h-full object-cover opacity-80"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/assets/images/corporate-travel.jpg';
            }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        {/* Content Centered */}
        <div className="relative z-10 text-white flex flex-col items-center text-center pb-8 mt-16">
          <h1 className="text-4xl md:text-5xl lg:text-[60px] font-bold tracking-wider mb-4 drop-shadow-xl font-serif">
            Contact
          </h1>
          <div className="flex items-center justify-center gap-2 text-sm md:text-base font-light drop-shadow-md tracking-wider">
            <a href="/" className="hover:text-gray-200 transition-colors">Home</a>
            <span className="text-gray-300">&gt;</span>
            <span className="text-white">Contact</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full z-10 text-white">
          <HeroWave />
        </div>
      </section>

      {/* 2. Main Contact Section */}
      <section className="bg-white relative z-20 pt-16 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Intro Section - Full Width Split */}
          <div className="mb-16">
            <span className="text-[#27B8B1] font-bold text-xl md:text-2xl tracking-widest block mb-2 font-['Caveat',cursive,serif]">
              Talk to us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#5e963b] leading-tight mb-8">
              Get in Touch
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 text-gray-500 text-[15px] leading-[1.8] font-light">
              <div className="space-y-4">
                <p>Every unforgettable journey begins with a conversation.</p>
                <p>At BlackForest Holidays, we believe travel should be effortless, inspiring, and personalized. Whether you're exploring a new destination, celebrating a special occasion, or planning a business trip, our experienced travel consultants are ready to assist you from the first inquiry to your safe return.</p>
                <p>Share your travel dreams with us, and we'll create an itinerary designed around your interests, budget, and schedule.</p>
              </div>
              <div className="space-y-4 md:pt-[1.75rem]">
                <p>With years of expertise in global travel planning, we offer carefully curated holiday packages, visa assistance, flight bookings, luxury accommodations, cruises, coach tours, and corporate travel solutions. Our commitment is to provide exceptional service, transparent pricing, and unforgettable travel experiences for every traveler.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left Column: Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-12">
                
                {/* YOUR DETAILS */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-extrabold text-[#10221b] uppercase tracking-widest">YOUR DETAILS</h3>
                  <div className="space-y-5">
                    <div className="space-y-1">
                      <label className="text-gray-500 text-[14px]">First Name*</label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full border-b border-gray-300 px-0 py-2.5 focus:outline-none focus:border-[#5e963b] bg-transparent text-[15px]" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-gray-500 text-[14px]">Last Name*</label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full border-b border-gray-300 px-0 py-2.5 focus:outline-none focus:border-[#5e963b] bg-transparent text-[15px]" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-gray-500 text-[14px]">Email Address*</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full border-b border-gray-300 px-0 py-2.5 focus:outline-none focus:border-[#5e963b] bg-transparent text-[15px]" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-gray-500 text-[14px]">Contact Phone Number*</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="w-full border-b border-gray-300 px-0 py-2.5 focus:outline-none focus:border-[#5e963b] bg-transparent text-[15px]" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-gray-500 text-[14px]">How did you hear about us?*</label>
                      <select name="source" value={formData.source} onChange={handleChange} required className="w-full border border-gray-300 rounded-sm px-3 py-3 focus:outline-none focus:border-[#5e963b] bg-transparent text-[15px] text-gray-700 mt-2">
                        <option value="">—Please choose an option—</option>
                        <option value="google">Google</option>
                        <option value="social">Social Media</option>
                        <option value="friend">Friend / Referral</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* YOUR TRIP */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-extrabold text-[#10221b] uppercase tracking-widest">YOUR TRIP</h3>
                  <div className="space-y-5">
                    <div className="space-y-1">
                      <label className="text-gray-500 text-[14px]">Where would you like to go?*</label>
                      <select name="destination" value={formData.destination} onChange={handleChange} required className="w-full border border-gray-300 rounded-sm px-3 py-3 focus:outline-none focus:border-[#5e963b] bg-transparent text-[15px] text-gray-700 mt-2">
                        <option value="">—Please choose an option—</option>
                        <option value="europe">Europe</option>
                        <option value="asia">Asia</option>
                        <option value="africa">Africa</option>
                        <option value="custom">Custom Location</option>
                      </select>
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-gray-500 text-[14px]">Month</label>
                      <select name="month" value={formData.month} onChange={handleChange} className="w-full border border-gray-300 rounded-sm px-3 py-3 focus:outline-none focus:border-[#5e963b] bg-transparent text-[15px] text-gray-700 mt-2">
                        <option value="">—Please choose an option—</option>
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-gray-500 text-[14px]">Year</label>
                      <select name="year" value={formData.year} onChange={handleChange} className="w-full border border-gray-300 rounded-sm px-3 py-3 focus:outline-none focus:border-[#5e963b] bg-transparent text-[15px] text-gray-700 mt-2">
                        <option value="">—Please choose an option—</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-gray-500 text-[14px]">How Long For?</label>
                      <input type="text" name="duration" value={formData.duration} onChange={handleChange} placeholder="Duration of Trip" className="w-full border-b border-gray-300 px-0 py-2.5 focus:outline-none focus:border-[#5e963b] bg-transparent text-[15px] placeholder:text-gray-300" />
                    </div>

                    <div className="space-y-1">
                      <label className="text-gray-500 text-[14px]">How many people are travelling?*</label>
                      <select name="travelers" value={formData.travelers} onChange={handleChange} required className="w-full border border-gray-300 rounded-sm px-3 py-3 focus:outline-none focus:border-[#5e963b] bg-transparent text-[15px] text-gray-700 mt-2">
                        <option value="">—Please choose an option—</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4+">4+</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-gray-500 text-[14px]">Budget Per Person*</label>
                      <select name="budget" value={formData.budget} onChange={handleChange} required className="w-full border border-gray-300 rounded-sm px-3 py-3 focus:outline-none focus:border-[#5e963b] bg-transparent text-[15px] text-gray-700 mt-2">
                        <option value="">—Please choose an option—</option>
                        <option value="Below ₹50,000">Below ₹50,000</option>
                        <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                        <option value="₹1,00,000 - ₹2,00,000">₹1,00,000 - ₹2,00,000</option>
                        <option value="₹2,00,000 - ₹3,00,000">₹2,00,000 - ₹3,00,000</option>
                        <option value="Above ₹3,00,000">Above ₹3,00,000</option>
                      </select>
                    </div>
                    
                    <div className="space-y-1 pt-4">
                      <label className="text-gray-500 text-[14px]">Any Other Comments or Requests?</label>
                      <textarea name="message" value={formData.message} onChange={handleChange} placeholder="E.g. special occasion, places you'd like to visit, hotel preferences etc." rows="4" className="w-full border border-gray-300 rounded-sm px-3 py-3 focus:outline-none focus:border-[#5e963b] bg-transparent text-[15px] resize-none placeholder:text-gray-300 mt-2"></textarea>
                    </div>
                  </div>
                </div>

                <button type="submit" disabled={loading} className="bg-[#10221b] text-white px-8 py-3.5 text-sm font-bold tracking-widest uppercase hover:bg-[#5e963b] transition-colors rounded-sm shadow-sm disabled:opacity-50 mt-4 cursor-pointer">
                  {loading ? 'Sending...' : 'Send Enquiry'}
                </button>
              </form>
            </div>

            {/* Right Column: Info */}
            <div className="space-y-12 pt-8">

              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold text-[#5e963b]">Contact Info</h3>
                <ul className="space-y-6 text-[15px] font-medium text-[#10221b]">
                  <li className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-[#27B8B1] shrink-0 mt-0.5" />
                    <a href={`tel:${(settings.phone || '+91 94470 12345').replace(/\s+/g, '')}`} className="hover:text-[#5e963b] transition-colors">
                      {settings.phone || '+91 94470 12345'}
                    </a>
                  </li>
                  <li className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-[#27B8B1] shrink-0 mt-0.5" />
                    <a href={`mailto:${settings.email || 'info@blackforestholidays.com'}`} className="hover:text-[#5e963b] transition-colors">
                      {settings.email || 'info@blackforestholidays.com'}
                    </a>
                    {/* Floating Orange Box */}
                    <div className="absolute right-0 w-8 h-8 bg-[#f29727] shadow-sm transform translate-x-1/2"></div>
                  </li>
                  <li className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-[#27B8B1] shrink-0 mt-0.5" />
                    <span className="leading-[1.8] font-light max-w-sm">
                      Head Office: 1st Floor, No 20, 1st Main Rd, Koramangala, Bengaluru, Karnataka 560034
                    </span>
                  </li>
                </ul>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold text-[#5e963b]">Business Hours:</h3>
                <div className="text-[15px] text-[#10221b] space-y-4">
                  <p className="flex justify-between max-w-xs border-b border-gray-100 pb-2">
                    <span className="font-bold">Monday - Friday</span>
                    <span className="font-light text-gray-500">9am - 6pm</span>
                  </p>
                  <p className="flex justify-between max-w-xs border-b border-gray-100 pb-2">
                    <span className="font-bold">Saturday - Sunday</span>
                    <span className="font-light text-gray-500">10am - 4pm</span>
                  </p>
                </div>
              </div>

              <div className="text-gray-500 text-[14px] font-light leading-[1.8] pt-4 max-w-md">
                <p>A strict 24-hour response is guaranteed. For immediate assistance during business hours, please call our Concierge desk. For after-hours emergencies, our dedicated client portal offers a 24/7 direct line to our on-duty specialists.</p>
              </div>

            </div>

          </div>

          {/* Maps Section below the form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-24">
             <div className="space-y-4">
               <h4 className="font-bold text-[#10221b] text-xl">Bangalore Office:</h4>
               <div className="w-full h-64 rounded-xl overflow-hidden shadow-sm border border-gray-200">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.471671958611!2d77.6253457!3d12.9348873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae144e591ff18d%3A0xc3b8a1c97a216447!2sKoramangala%2C%20Bengaluru%2C%20Karnataka%20560034!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
               </div>
             </div>
             <div className="space-y-4">
               <h4 className="font-bold text-[#10221b] text-xl">Coimbatore Office:</h4>
               <div className="w-full h-64 rounded-xl overflow-hidden shadow-sm border border-gray-200">
                 <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.1437877209865!2d76.9535091!3d11.0278146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba858f69d356885%3A0x6b87611636c7a979!2sSaibaba%20Colony%2C%20Coimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
               </div>
             </div>
          </div>

        </div>
      </section>

    </div>
  );
}
