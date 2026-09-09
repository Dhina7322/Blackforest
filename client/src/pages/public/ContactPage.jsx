import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Sparkles, MessageSquare, ShieldCheck, Compass } from 'lucide-react';
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
        source: formData.source || 'Website Contact Page',
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

  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-white font-sans text-gray-800 animate-fadeIn overflow-x-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative h-[55vh] min-h-[460px] flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0 bg-[#0a1712]">
          <img
            src="https://blackforestholidays.com/wp-content/uploads/2026/08/buddhist-prayer-flags-himalaya-mountains-annapurna-base-camp-area-nepal-scaled.jpg"
            alt="Contact Us"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
        </div>

        {/* Hero Content - Perfectly Centered */}
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto text-white">
          <div className="text-[#27B8B1] font-bold text-xl md:text-2xl mb-2" style={{ fontFamily: "'Mansalva', cursive, sans-serif" }}>
            Reach Out to Our Specialists
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
            Contact Us
          </h1>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-300">
            <a href="/" className="hover:text-white transition-colors">Home</a>
            <span>•</span>
            <span className="text-[#27B8B1]">Contact</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full z-10 text-white">
          <HeroWave />
        </div>
      </section>

      {/* 2. Main Contact Section - Centered Layout */}
      <section className="bg-[#fbfcfa] relative z-20 pt-16 sm:pt-20 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Intro Section - Centered Heading & Subtitle */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span
              className="text-[#27B8B1] font-bold text-2xl md:text-3xl block mb-2"
              style={{ fontFamily: "'Mansalva', cursive, sans-serif" }}
            >
              Talk to us
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#10221b] tracking-tight mb-6">
              Get in Touch
            </h2>
            <p className="text-gray-600 text-sm sm:text-[15px] leading-relaxed font-normal">
              Every unforgettable journey begins with a conversation. Whether you're exploring a new destination, celebrating a honeymoon, or planning corporate travel, our experienced travel consultants are ready to craft your bespoke itinerary.
            </p>
          </div>

          {/* Centered 2-Column Luxury Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left Column: Form Card (7 Cols) */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 lg:p-12 rounded-2xl border border-gray-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.05)]">
              <form onSubmit={handleSubmit} className="space-y-10">
                
                {/* YOUR DETAILS */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#5e963b]" />
                    <h3 className="text-lg font-bold text-[#10221b] uppercase tracking-wider">
                      Your Details
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-gray-600 text-xs font-semibold uppercase tracking-wider">First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        placeholder="John"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10221b] focus:bg-white transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-gray-600 text-xs font-semibold uppercase tracking-wider">Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        placeholder="Doe"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10221b] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-gray-600 text-xs font-semibold uppercase tracking-wider">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10221b] focus:bg-white transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-gray-600 text-xs font-semibold uppercase tracking-wider">Phone Number *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10221b] focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-gray-600 text-xs font-semibold uppercase tracking-wider">How did you hear about us? *</label>
                    <select
                      name="source"
                      value={formData.source}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10221b] focus:bg-white transition-all text-gray-700 cursor-pointer"
                    >
                      <option value="">— Please choose an option —</option>
                      <option value="Google Search">Google Search</option>
                      <option value="Social Media (Instagram/Facebook)">Social Media (Instagram/Facebook)</option>
                      <option value="Friend / Family Referral">Friend / Family Referral</option>
                      <option value="Corporate Partner">Corporate Partner</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* YOUR TRIP */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27B8B1]" />
                    <h3 className="text-lg font-bold text-[#10221b] uppercase tracking-wider">
                      Your Trip Preferences
                    </h3>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-gray-600 text-xs font-semibold uppercase tracking-wider">Where would you like to go? *</label>
                    <select
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10221b] focus:bg-white transition-all text-gray-700 cursor-pointer"
                    >
                      <option value="">— Select Destination —</option>
                      <option value="Switzerland & Alpine Wonderland">Switzerland & Alpine Wonderland</option>
                      <option value="Maldives & Indian Ocean Atolls">Maldives & Indian Ocean Atolls</option>
                      <option value="Japan & Southeast Asia Odyssey">Japan & Southeast Asia Odyssey</option>
                      <option value="Dubai & Arabian Desert Highlights">Dubai & Arabian Desert Highlights</option>
                      <option value="Kerala – God’s Own Country">Kerala – God’s Own Country</option>
                      <option value="Kenya & Serengeti Wildlife Safari">Kenya & Serengeti Wildlife Safari</option>
                      <option value="Australia & New Zealand Wonders">Australia & New Zealand Wonders</option>
                      <option value="Andaman & Nicobar Islands">Andaman & Nicobar Islands</option>
                      <option value="United States & California Coast">United States & California Coast</option>
                      <option value="Sri Lanka & South Asian Heritage">Sri Lanka & South Asian Heritage</option>
                      <option value="Custom Location / Other">Custom Location / Other</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-gray-600 text-xs font-semibold uppercase tracking-wider">Travel Month</label>
                      <select
                        name="month"
                        value={formData.month}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10221b] focus:bg-white transition-all text-gray-700 cursor-pointer"
                      >
                        <option value="">— Select Month —</option>
                        {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(m => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-gray-600 text-xs font-semibold uppercase tracking-wider">Travel Year</label>
                      <select
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10221b] focus:bg-white transition-all text-gray-700 cursor-pointer"
                      >
                        <option value="">— Select Year —</option>
                        {Array.from({ length: 3 }, (_, i) => currentYear + i).map((yr) => (
                          <option key={yr} value={yr}>{yr}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-gray-600 text-xs font-semibold uppercase tracking-wider">Duration of Trip</label>
                      <input
                        type="text"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        placeholder="e.g. 7 Days, 2 Weeks"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10221b] focus:bg-white transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-gray-600 text-xs font-semibold uppercase tracking-wider">Number of Travelers *</label>
                      <select
                        name="travelers"
                        value={formData.travelers}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10221b] focus:bg-white transition-all text-gray-700 cursor-pointer"
                      >
                        <option value="">— Select Travelers —</option>
                        <option value="1 Solo Traveler">1 Solo Traveler</option>
                        <option value="2 Couple / Adults">2 Couple / Adults</option>
                        <option value="3-5 Small Group / Family">3-5 Small Group / Family</option>
                        <option value="6+ Large Group / Corporate">6+ Large Group / Corporate</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-gray-600 text-xs font-semibold uppercase tracking-wider">Budget Per Person *</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10221b] focus:bg-white transition-all text-gray-700 cursor-pointer"
                    >
                      <option value="">— Select Budget —</option>
                      <option value="Below ₹50,000">Below ₹50,000</option>
                      <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                      <option value="₹1,00,000 - ₹2,00,000">₹1,00,000 - ₹2,00,000</option>
                      <option value="₹2,00,000 - ₹3,00,000">₹2,00,000 - ₹3,00,000</option>
                      <option value="Above ₹3,00,000">Above ₹3,00,000</option>
                    </select>
                  </div>
                  
                  <div className="space-y-1.5 pt-2">
                    <label className="text-gray-600 text-xs font-semibold uppercase tracking-wider">Special Requests & Comments</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about special occasions, preferred hotels, sightseeing activities, or pacing..."
                      rows="4"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#10221b] focus:bg-white transition-all resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-[#10221b] hover:bg-black text-white text-sm font-bold tracking-widest uppercase transition-all duration-200 rounded-xl shadow-md hover:shadow-lg disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Submitting Enquiry...' : 'Send Travel Enquiry'}</span>
                </button>
              </form>
            </div>

            {/* Right Column: Contact Info & Support Box (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Primary Contact Dark Card */}
              <div className="bg-[#10221b] text-white p-8 sm:p-10 rounded-2xl shadow-xl relative overflow-hidden border border-[#1b352b]">
                <div className="relative z-10 space-y-8">
                  
                  <div>
                    <span className="text-[#27B8B1] text-xs font-bold uppercase tracking-widest block mb-1">
                      Direct Concierge
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                      Contact Information
                    </h3>
                  </div>

                  <ul className="space-y-6 text-sm">
                    <li className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-[#27B8B1]">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs text-gray-400 block mb-0.5">Call or WhatsApp</span>
                        <a
                          href={`tel:${(settings.phone || '+91 94470 12345').replace(/\s+/g, '')}`}
                          className="font-semibold text-white hover:text-[#27B8B1] transition-colors text-base"
                        >
                          {settings.phone || '+91 94470 12345'}
                        </a>
                      </div>
                    </li>

                    <li className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-[#27B8B1]">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs text-gray-400 block mb-0.5">Email Inquiries</span>
                        <a
                          href={`mailto:${settings.email || 'info@blackforestholidays.com'}`}
                          className="font-semibold text-white hover:text-[#27B8B1] transition-colors text-base break-all"
                        >
                          {settings.email || 'info@blackforestholidays.com'}
                        </a>
                      </div>
                    </li>

                    <li className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-[#27B8B1]">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-xs text-gray-400 block mb-0.5">Head Office</span>
                        <span className="text-gray-300 leading-relaxed font-light block">
                          1st Floor, No 20, 1st Main Rd, Koramangala, Bengaluru, Karnataka 560034
                        </span>
                      </div>
                    </li>
                  </ul>

                  {/* Business Hours */}
                  <div className="pt-6 border-t border-white/15 space-y-4">
                    <div className="flex items-center gap-2 text-[#27B8B1]">
                      <Clock className="w-4 h-4" />
                      <h4 className="text-xs font-bold uppercase tracking-wider text-white">Working Hours</h4>
                    </div>
                    <div className="space-y-2.5 text-xs text-gray-300">
                      <div className="flex justify-between border-b border-white/10 pb-2">
                        <span>Monday – Friday</span>
                        <span className="font-semibold text-white">9:00 AM – 6:00 PM</span>
                      </div>
                      <div className="flex justify-between border-b border-white/10 pb-2">
                        <span>Saturday – Sunday</span>
                        <span className="font-semibold text-white">10:00 AM – 4:00 PM</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Service Assurance Card */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-xs space-y-3.5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-gray-900 text-sm">24-Hour Lead Turnaround</h4>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Every inquiry receives personalized attention from our certified destination curators within 24 hours. For urgent holiday bookings, feel free to call our direct line.
                </p>
              </div>

            </div>

          </div>

          {/* 3. Centered Maps Section - Clean & Borderless */}
          <div className="mt-14 pt-12 border-t border-gray-200/80">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span
                className="text-[#27B8B1] font-bold text-xl md:text-2xl block mb-1"
                style={{ fontFamily: "'Mansalva', cursive, sans-serif" }}
              >
                Locate Us
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#10221b]">
                Our Office Locations
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Bangalore Office Map */}
              <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden shadow-md">
                <iframe 
                  title="Bangalore Office Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.471671958611!2d77.6253457!3d12.9348873!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae144e591ff18d%3A0xc3b8a1c97a216447!2sKoramangala%2C%20Bengaluru%2C%20Karnataka%20560034!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Coimbatore Office Map */}
              <div className="w-full h-80 sm:h-96 rounded-2xl overflow-hidden shadow-md">
                <iframe 
                  title="Coimbatore Office Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.1437877209865!2d76.9535091!3d11.0278146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba858f69d356885%3A0x6b87611636c7a979!2sSaibaba%20Colony%2C%20Coimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
